const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const katex = require('katex');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function loadTsModule(relativePath) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const code = fs.readFileSync(absolutePath, 'utf8');
  const transpiled = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} };
  const fn = new Function('exports', 'module', 'require', '__filename', '__dirname', transpiled);
  fn(mod.exports, mod, require, absolutePath, path.dirname(absolutePath));
  return mod.exports;
}

function findControlChars(text) {
  if (!text) return [];
  const matches = [];
  const regex = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    matches.push({ index: m.index, code: '0x' + m[0].charCodeAt(0).toString(16).padStart(4, '0') });
  }
  return matches;
}

function extractAndValidateFormulas(text, context) {
  if (!text) return { formulas: 0, errors: [], unicodeWarnings: [] };
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
  let m;
  let count = 0;
  const errors = [];
  const unicodeWarnings = [];

  while ((m = regex.exec(text)) !== null) {
    count++;
    const raw = m[0];
    const isBlock = raw.startsWith('$$');
    const math = isBlock ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim();

    // Check for unescaped Vietnamese chars outside \text{}
    // Specifically $Đ$ or similar
    if (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/.test(math)) {
      // Check if it's enclosed in \text{}
      const withoutText = math.replace(/\\text\{[^}]*\}/g, '');
      if (/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/.test(withoutText)) {
        unicodeWarnings.push({ context, formula: raw, issue: 'Vietnamese text in math mode outside \\text{}' });
      }
    }

    try {
      katex.renderToString(math, {
        displayMode: isBlock,
        throwOnError: true,
      });
    } catch (err) {
      errors.push({ context, formula: raw, error: err.message });
    }
  }

  return { formulas: count, errors, unicodeWarnings };
}

async function audit() {
  console.log('=== STEP 1: AUDITING machData.ts ===');
  const machData = loadTsModule('src/app/mindmap/machData.ts');
  const tree = machData.TREE_DATA;

  let totalMachFormulas = 0;
  let machErrors = [];
  let machUnicode = [];
  let machControlChars = [];

  for (const ch of tree.chapters) {
    for (const tp of ch.topics) {
      for (const mt of tp.mathTypes) {
        const fields = [
          { name: 'theory', val: mt.details?.theory },
          { name: 'signs', val: mt.details?.signs },
          { name: 'methods', val: mt.details?.methods },
          { name: 'mistakes', val: mt.details?.mistakes },
          { name: 'sampleQuestion.content', val: mt.details?.sampleQuestion?.content },
          { name: 'sampleQuestion.answer', val: mt.details?.sampleQuestion?.answer },
        ];

        for (const f of fields) {
          if (!f.val) continue;
          const cc = findControlChars(f.val);
          if (cc.length > 0) machControlChars.push({ ctx: `${mt.code}.${f.name}`, cc });

          const res = extractAndValidateFormulas(f.val, `${mt.code}.${f.name}`);
          totalMachFormulas += res.formulas;
          machErrors.push(...res.errors);
          machUnicode.push(...res.unicodeWarnings);
        }
      }
    }
  }

  console.log(`machData formulas tested: ${totalMachFormulas}`);
  console.log(`machData KaTeX parse errors (throwOnError: true): ${machErrors.length}`);
  console.log(`machData Unicode in math mode warnings: ${machUnicode.length}`);
  console.log(`machData illegal control characters: ${machControlChars.length}`);

  if (machErrors.length > 0) {
    console.error('machData errors sample:', machErrors.slice(0, 5));
  }
  if (machUnicode.length > 0) {
    console.error('machData unicode sample:', machUnicode.slice(0, 5));
  }

  console.log('\n=== STEP 2: AUDITING PRISMA DATABASE (dev.db) ===');
  const categories = await prisma.mathCategory.findMany();
  const knowledgeItems = await prisma.knowledgeItem.findMany();
  const questions = await prisma.question.findMany();

  console.log(`Categories: ${categories.length}, KnowledgeItems: ${knowledgeItems.length}, Questions: ${questions.length}`);

  let dbFormulas = 0;
  let dbErrors = [];
  let dbControlChars = [];

  for (const k of knowledgeItems) {
    const fields = [
      { name: 'formulaLatex', val: k.formulaLatex },
      { name: 'conditions', val: k.conditions },
      { name: 'notes', val: k.notes },
    ];
    for (const f of fields) {
      if (!f.val) continue;
      const cc = findControlChars(f.val);
      if (cc.length > 0) dbControlChars.push({ ctx: `KnowledgeItem[${k.title}].${f.name}`, cc });
      const res = extractAndValidateFormulas(f.val, `KnowledgeItem[${k.title}].${f.name}`);
      dbFormulas += res.formulas;
      dbErrors.push(...res.errors);
    }
  }

  for (const c of categories) {
    const fields = [
      { name: 'identifySigns', val: c.identifySigns },
      { name: 'coreKnowledge', val: c.coreKnowledge },
      { name: 'methodSteps', val: c.methodSteps },
      { name: 'commonMistakes', val: c.commonMistakes },
    ];
    for (const f of fields) {
      if (!f.val) continue;
      const cc = findControlChars(f.val);
      if (cc.length > 0) dbControlChars.push({ ctx: `MathCategory[${c.code}].${f.name}`, cc });
      const res = extractAndValidateFormulas(f.val, `MathCategory[${c.code}].${f.name}`);
      dbFormulas += res.formulas;
      dbErrors.push(...res.errors);
    }
  }

  for (const q of questions) {
    const fields = [
      { name: 'content', val: q.content },
      { name: 'explanation', val: q.explanation },
      { name: 'distractorAnalysis', val: q.distractorAnalysis },
    ];
    for (const f of fields) {
      if (!f.val) continue;
      const cc = findControlChars(f.val);
      if (cc.length > 0) dbControlChars.push({ ctx: `Question[${q.code}].${f.name}`, cc });
      const res = extractAndValidateFormulas(f.val, `Question[${q.code}].${f.name}`);
      dbFormulas += res.formulas;
      dbErrors.push(...res.errors);
    }
  }

  console.log(`Database formulas tested: ${dbFormulas}`);
  console.log(`Database KaTeX parse errors (throwOnError: true): ${dbErrors.length}`);
  console.log(`Database illegal control characters: ${dbControlChars.length}`);

  if (dbErrors.length > 0) {
    console.error('DB errors sample:', dbErrors.slice(0, 5));
  }
  if (dbControlChars.length > 0) {
    console.error('DB control chars sample:', dbControlChars);
  }

  console.log('\n=== STEP 3: AUDITING DOMAIN CONDITIONS COVERAGE ===');
  let typeConditionsAudit = [];
  for (const ch of tree.chapters) {
    for (const tp of ch.topics) {
      for (const mt of tp.mathTypes) {
        const theory = mt.details?.theory || '';
        const hasD = /(\$D\b|tập\s*xác\s*định|txd|miền\s*xác\s*định)/i.test(theory);
        const hasNonzero = /(\\ne\s*0|\\neq\s*0|khác\s*0|>\s*0)/i.test(theory);
        const hasNonneg = /(\\ge\s*0|\\geq\s*0|không\s*âm)/i.test(theory);
        const hasVectorNonzero = /(\\vec\{0\}|vectơ\s*khác|vecto\s*khác|cùng\s*phương|vuông\s*góc|không\s*đồng\s*phẳng)/i.test(theory);
        
        typeConditionsAudit.push({
          code: mt.code,
          title: mt.title,
          isCh1: ch.id === 'CH1',
          hasD,
          hasNonzero,
          hasNonneg,
          hasVectorNonzero,
          theoryLength: theory.length,
        });
      }
    }
  }

  console.log(`Total sub-types audited for domain conditions: ${typeConditionsAudit.length}`);
  const shortTheories = typeConditionsAudit.filter(t => t.theoryLength < 50);
  console.log(`Sub-types with short theory (< 50 chars): ${shortTheories.length}`);

  await prisma.$disconnect();
}

audit().catch(console.error);
