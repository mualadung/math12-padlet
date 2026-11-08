const fs = require('fs');
const ts = require('typescript');
const katex = require('katex');
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

function extractMath(str) {
  if (!str || typeof str !== 'string') return [];
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
  const matches = [];
  let m;
  while ((m = regex.exec(str)) !== null) {
    const raw = m[0];
    const isBlock = raw.startsWith('$$');
    const math = isBlock ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim();
    matches.push({ raw, math, isBlock });
  }
  return matches;
}

function checkFormulas(items, sourceName) {
  let totalFormulas = 0;
  let errors = [];

  for (const item of items) {
    const formulas = extractMath(item.text);
    totalFormulas += formulas.length;
    for (const f of formulas) {
      try {
        katex.renderToString(f.math, {
          displayMode: f.isBlock,
          throwOnError: true
        });
      } catch (err) {
        errors.push({
          source: sourceName,
          id: item.id,
          field: item.field,
          formula: f.raw,
          error: err.message
        });
      }
    }
  }

  return { totalFormulas, errors };
}

async function run() {
  console.log('=== KATEX SYNTAX INTEGRITY AUDIT ===');

  // 1. Prisma DB: Questions
  const dbQs = await p.question.findMany();
  const dbItems = [];
  for (const q of dbQs) {
    dbItems.push({ id: q.code, field: 'content', text: q.content });
    dbItems.push({ id: q.code, field: 'explanation', text: q.explanation });
    dbItems.push({ id: q.code, field: 'casioGuide', text: q.casioGuide || '' });
    dbItems.push({ id: q.code, field: 'distractorAnalysis', text: q.distractorAnalysis });
    dbItems.push({ id: q.code, field: 'optionsJson', text: q.optionsJson || '' });
  }
  const dbRes = checkFormulas(dbItems, 'DB Question');

  // 2. Prisma DB: Categories & Knowledge
  const cats = await p.mathCategory.findMany();
  const catItems = [];
  for (const c of cats) {
    catItems.push({ id: c.code, field: 'identifySigns', text: c.identifySigns });
    catItems.push({ id: c.code, field: 'coreKnowledge', text: c.coreKnowledge });
    catItems.push({ id: c.code, field: 'methodSteps', text: c.methodSteps });
    catItems.push({ id: c.code, field: 'commonMistakes', text: c.commonMistakes });
  }
  const catRes = checkFormulas(catItems, 'DB MathCategory');

  const knowItems = await p.knowledgeItem.findMany();
  const kItems = [];
  for (const k of knowItems) {
    kItems.push({ id: k.id, field: 'formulaLatex', text: k.formulaLatex });
    kItems.push({ id: k.id, field: 'conditions', text: k.conditions });
    kItems.push({ id: k.id, field: 'notes', text: k.notes || '' });
  }
  const kRes = checkFormulas(kItems, 'DB KnowledgeItem');

  // 3. Mindmap Questions
  const tsCode = fs.readFileSync('src/app/mindmap/mindmapQuestions.ts', 'utf8');
  const jsCode = ts.transpileModule(tsCode, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} };
  new Function('module', 'exports', 'require', jsCode)(mod, mod.exports, require);
  const mmBank = mod.exports.REAL_QUESTIONS_BANK;

  const mmItems = [];
  for (const topic in mmBank) {
    for (const q of mmBank[topic]) {
      mmItems.push({ id: `${topic}/${q.code}`, field: 'content', text: q.content });
      mmItems.push({ id: `${topic}/${q.code}`, field: 'explanation', text: q.explanation });
      mmItems.push({ id: `${topic}/${q.code}`, field: 'casioGuide', text: q.casioGuide || '' });
      mmItems.push({ id: `${topic}/${q.code}`, field: 'distractorAnalysis', text: q.distractorAnalysis });
      if (q.options) {
        q.options.forEach((opt, idx) => {
          mmItems.push({ id: `${topic}/${q.code}`, field: `options[${idx}]`, text: opt });
        });
      }
    }
  }
  const mmRes = checkFormulas(mmItems, 'MindmapQuestions');

  // 4. MachData
  const machTs = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8');
  const machFormulas = extractMath(machTs);
  let machErrors = [];
  for (const f of machFormulas) {
    try {
      katex.renderToString(f.math, { displayMode: f.isBlock, throwOnError: true });
    } catch (e) {
      machErrors.push({ source: 'machData.ts', formula: f.raw, error: e.message });
    }
  }

  // Summary
  const grandTotal = dbRes.totalFormulas + catRes.totalFormulas + kRes.totalFormulas + mmRes.totalFormulas + machFormulas.length;
  const allErrors = [...dbRes.errors, ...catRes.errors, ...kRes.errors, ...mmRes.errors, ...machErrors];

  console.log(`Total formulas scanned across all datasets: ${grandTotal}`);
  console.log(`- DB Questions: ${dbRes.totalFormulas} formulas, ${dbRes.errors.length} errors`);
  console.log(`- DB MathCategory: ${catRes.totalFormulas} formulas, ${catRes.errors.length} errors`);
  console.log(`- DB KnowledgeItem: ${kRes.totalFormulas} formulas, ${kRes.errors.length} errors`);
  console.log(`- Mindmap Questions: ${mmRes.totalFormulas} formulas, ${mmRes.errors.length} errors`);
  console.log(`- MachData: ${machFormulas.length} formulas, ${machErrors.length} errors`);
  console.log(`\nTOTAL SYNTAX ERRORS FOUND: ${allErrors.length}`);

  if (allErrors.length > 0) {
    console.log('\nTop Error details:');
    allErrors.slice(0, 10).forEach((err, i) => {
      console.log(`${i+1}. [${err.source}] ${err.id || ''} (${err.field || ''}): ${err.formula}`);
      console.log(`   -> Error: ${err.error}`);
    });
  }

  await p.$disconnect();
}

run().catch(console.error);
