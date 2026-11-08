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

function testFormula(math, isBlock) {
  try {
    katex.renderToString(math, {
      displayMode: isBlock,
      throwOnError: true
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function run() {
  console.log('====================================================');
  console.log('   FULL REPOSITORY KATEX SYNTAX INTEGRITY AUDIT');
  console.log('====================================================');

  let totalFormulas = 0;
  let errors = [];

  // Helper to test text
  function auditText(text, context) {
    if (!text) return;
    const list = extractMath(text);
    for (const item of list) {
      totalFormulas++;
      const res = testFormula(item.math, item.isBlock);
      if (!res.ok) {
        errors.push({
          context,
          raw: item.raw,
          math: item.math,
          error: res.error
        });
      }
    }
  }

  // 1. Prisma DB Questions
  const questions = await p.question.findMany();
  for (const q of questions) {
    auditText(q.content, `DB Question [${q.code}].content`);
    auditText(q.explanation, `DB Question [${q.code}].explanation`);
    auditText(q.casioGuide, `DB Question [${q.code}].casioGuide`);
    auditText(q.distractorAnalysis, `DB Question [${q.code}].distractorAnalysis`);
    if (q.optionsJson) {
      try {
        const opts = JSON.parse(q.optionsJson);
        if (Array.isArray(opts)) {
          opts.forEach((opt, idx) => auditText(opt, `DB Question [${q.code}].optionsJson[${idx}]`));
        } else if (typeof opts === 'object') {
          for (const k in opts) auditText(opts[k], `DB Question [${q.code}].optionsJson.${k}`);
        }
      } catch (e) {
        // Not JSON
      }
    }
  }

  // 2. Prisma DB Math Categories
  const categories = await p.mathCategory.findMany();
  for (const c of categories) {
    auditText(c.title, `DB MathCategory [${c.code}].title`);
    auditText(c.identifySigns, `DB MathCategory [${c.code}].identifySigns`);
    auditText(c.coreKnowledge, `DB MathCategory [${c.code}].coreKnowledge`);
    auditText(c.methodSteps, `DB MathCategory [${c.code}].methodSteps`);
    auditText(c.commonMistakes, `DB MathCategory [${c.code}].commonMistakes`);
  }

  // 3. Prisma DB Knowledge Items
  const kItems = await p.knowledgeItem.findMany();
  for (const k of kItems) {
    auditText(k.title, `DB KnowledgeItem [${k.id}].title`);
    auditText(k.formulaLatex, `DB KnowledgeItem [${k.id}].formulaLatex`);
    auditText(k.conditions, `DB KnowledgeItem [${k.id}].conditions`);
    auditText(k.notes, `DB KnowledgeItem [${k.id}].notes`);
  }

  // 4. Mindmap Questions (mindmapQuestions.ts)
  const mmTs = fs.readFileSync('src/app/mindmap/mindmapQuestions.ts', 'utf8');
  const mmJs = ts.transpileModule(mmTs, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mmMod = { exports: {} };
  new Function('module', 'exports', 'require', mmJs)(mmMod, mmMod.exports, require);
  const mmBank = mmMod.exports.REAL_QUESTIONS_BANK;

  for (const topic in mmBank) {
    for (const q of mmBank[topic]) {
      auditText(q.content, `Mindmap [${topic}/${q.code}].content`);
      auditText(q.explanation, `Mindmap [${topic}/${q.code}].explanation`);
      auditText(q.casioGuide, `Mindmap [${topic}/${q.code}].casioGuide`);
      auditText(q.distractorAnalysis, `Mindmap [${topic}/${q.code}].distractorAnalysis`);
      if (q.options) {
        q.options.forEach((opt, idx) => auditText(opt, `Mindmap [${topic}/${q.code}].options[${idx}]`));
      }
    }
  }

  // 5. MachData TREE_DATA
  const machTs = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8');
  const machJs = ts.transpileModule(machTs, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const machMod = { exports: {} };
  new Function('module', 'exports', 'require', machJs)(machMod, machMod.exports, require);
  const treeData = machMod.exports.TREE_DATA;

  function crawlMach(obj, path) {
    if (!obj) return;
    if (typeof obj === 'string') {
      auditText(obj, `machData.${path}`);
    } else if (Array.isArray(obj)) {
      obj.forEach((item, idx) => crawlMach(item, `${path}[${idx}]`));
    } else if (typeof obj === 'object') {
      for (const k in obj) {
        crawlMach(obj[k], `${path}.${k}`);
      }
    }
  }
  crawlMach(treeData, 'TREE_DATA');

  // Results
  console.log(`\nAudit completed successfully.`);
  console.log(`Total LaTeX formulas audited: ${totalFormulas}`);
  console.log(`Total syntax errors: ${errors.length}`);

  if (errors.length > 0) {
    console.log('\nSyntax Errors List:');
    errors.forEach((err, idx) => {
      console.log(`\n${idx + 1}. Context: ${err.context}`);
      console.log(`   Formula: ${err.raw}`);
      console.log(`   Error: ${err.error}`);
    });
  }

  await p.$disconnect();
}

run().catch(console.error);
