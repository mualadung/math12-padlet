const fs = require('fs');
const ts = require('typescript');
const katex = require('katex');
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

function transpileFile(path) {
  const code = fs.readFileSync(path, 'utf8');
  const js = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} };
  new Function('module', 'exports', 'require', js)(mod, mod.exports, require);
  return mod.exports;
}

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

function testKaTeX(math, isBlock) {
  try {
    katex.renderToString(math, { displayMode: isBlock, throwOnError: true });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

function normalize(str) {
  return (str || '').replace(/\s+/g, ' ').trim().toLowerCase();
}

async function runUnifiedValidation() {
  console.log('================================================================');
  console.log('   AUTOMATED VERIFICATION SUITE PROTOTYPE (EXPLORER TEST)');
  console.log('================================================================\n');

  let totalFailures = 0;

  // -------------------------------------------------------------------------
  // 1. PRACTICE QUESTION COUNT PER MATH TYPE (TARGET: >= 10)
  // -------------------------------------------------------------------------
  console.log('>>> [1/5] CHECKING QUESTION COUNTS (TARGET >= 10 PER TYPE)...');
  const categories = await p.mathCategory.findMany({
    include: { _count: { select: { questions: true } } },
    orderBy: { order: 'asc' }
  });

  let countIssues = 0;
  for (const cat of categories) {
    const count = cat._count.questions;
    const passed = count >= 10;
    if (!passed) countIssues++;
    console.log(`  ${passed ? '✓' : '✗'} [${cat.code}] ${cat.title}: ${count}/10 questions ${passed ? 'PASSED' : 'FAILED (Deficit: ' + (10 - count) + ')'}`);
  }
  if (countIssues > 0) totalFailures++;
  console.log(`  -> Result: ${categories.length - countIssues}/${categories.length} categories pass threshold.\n`);

  // -------------------------------------------------------------------------
  // 2. SOURCE TAG VERIFICATION ([Nguồn: ...])
  // -------------------------------------------------------------------------
  console.log('>>> [2/5] CHECKING EXAM SOURCE TAGS ([Nguồn: ...])...');
  const dbQuestions = await p.question.findMany();
  let dbMissingTag = 0;
  for (const q of dbQuestions) {
    if (!q.sourceExam || !q.sourceExam.startsWith('[Nguồn:')) {
      dbMissingTag++;
    }
  }

  const mmBank = transpileFile('src/app/mindmap/mindmapQuestions.ts').REAL_QUESTIONS_BANK;
  let mmTotal = 0;
  let mmMissingTag = 0;
  const mmQuestions = [];
  for (const t in mmBank) {
    mmBank[t].forEach(q => {
      mmTotal++;
      mmQuestions.push({ topic: t, ...q });
      if (!q.source || !q.source.startsWith('[Nguồn:')) {
        mmMissingTag++;
      }
    });
  }

  const totalQuestionsScanned = dbQuestions.length + mmTotal;
  const totalMissingTag = dbMissingTag + mmMissingTag;
  if (totalMissingTag > 0) totalFailures++;
  console.log(`  - DB Questions: ${dbQuestions.length - dbMissingTag}/${dbQuestions.length} have [Nguồn: ...] tag.`);
  console.log(`  - Mindmap Questions: ${mmTotal - mmMissingTag}/${mmTotal} have [Nguồn: ...] tag.`);
  console.log(`  -> Result: ${totalMissingTag} questions lack proper [Nguồn: ...] tag.\n`);

  // -------------------------------------------------------------------------
  // 3. KATEX SYNTAX INTEGRITY CHECK
  // -------------------------------------------------------------------------
  console.log('>>> [3/5] CHECKING KATEX SYNTAX INTEGRITY ACROSS ALL DATASETS...');
  let formulaCount = 0;
  let katexErrors = [];

  function checkStringMath(str, context) {
    if (!str) return;
    const list = extractMath(str);
    for (const item of list) {
      formulaCount++;
      const res = testKaTeX(item.math, item.isBlock);
      if (!res.ok) {
        katexErrors.push({ context, formula: item.raw, error: res.error });
      }
    }
  }

  // Check DB questions
  for (const q of dbQuestions) {
    checkStringMath(q.content, `DB Question [${q.code}].content`);
    checkStringMath(q.explanation, `DB Question [${q.code}].explanation`);
    checkStringMath(q.casioGuide, `DB Question [${q.code}].casioGuide`);
    checkStringMath(q.distractorAnalysis, `DB Question [${q.code}].distractorAnalysis`);
    if (q.optionsJson) {
      try {
        const opts = JSON.parse(q.optionsJson);
        if (Array.isArray(opts)) opts.forEach((o, i) => checkStringMath(o, `DB Question [${q.code}].options[${i}]`));
      } catch (e) {}
    }
  }

  // Check DB categories & knowledge
  for (const c of categories) {
    checkStringMath(c.identifySigns, `DB Category [${c.code}].identifySigns`);
    checkStringMath(c.coreKnowledge, `DB Category [${c.code}].coreKnowledge`);
    checkStringMath(c.methodSteps, `DB Category [${c.code}].methodSteps`);
    checkStringMath(c.commonMistakes, `DB Category [${c.code}].commonMistakes`);
  }
  const kItems = await p.knowledgeItem.findMany();
  for (const k of kItems) {
    checkStringMath(k.formulaLatex, `DB KnowledgeItem [${k.id}].formulaLatex`);
    checkStringMath(k.conditions, `DB KnowledgeItem [${k.id}].conditions`);
    checkStringMath(k.notes, `DB KnowledgeItem [${k.id}].notes`);
  }

  // Check Mindmap questions
  for (const q of mmQuestions) {
    checkStringMath(q.content, `Mindmap [${q.topic}/${q.code}].content`);
    checkStringMath(q.explanation, `Mindmap [${q.topic}/${q.code}].explanation`);
    checkStringMath(q.casioGuide, `Mindmap [${q.topic}/${q.code}].casioGuide`);
    checkStringMath(q.distractorAnalysis, `Mindmap [${q.topic}/${q.code}].distractorAnalysis`);
    if (q.options) q.options.forEach((o, i) => checkStringMath(o, `Mindmap [${q.topic}/${q.code}].options[${i}]`));
  }

  // Check MachData
  const treeData = transpileFile('src/app/mindmap/machData.ts').TREE_DATA;
  function crawlObj(obj, path) {
    if (!obj) return;
    if (typeof obj === 'string') checkStringMath(obj, `machData.${path}`);
    else if (Array.isArray(obj)) obj.forEach((it, i) => crawlObj(it, `${path}[${i}]`));
    else if (typeof obj === 'object') {
      for (const k in obj) crawlObj(obj[k], `${path}.${k}`);
    }
  }
  crawlObj(treeData, 'TREE_DATA');

  if (katexErrors.length > 0) totalFailures++;
  console.log(`  - Total formulas audited: ${formulaCount}`);
  console.log(`  - KaTeX syntax errors: ${katexErrors.length}`);
  if (katexErrors.length > 0) {
    katexErrors.forEach((e, i) => console.log(`    ${i+1}. [${e.context}]: ${e.formula} -> ${e.error}`));
  }
  console.log(`  -> Result: ${katexErrors.length === 0 ? 'PASSED' : 'FAILED'}\n`);

  // -------------------------------------------------------------------------
  // 4. DUPLICATION DETECTION
  // -------------------------------------------------------------------------
  console.log('>>> [4/5] CHECKING QUESTION DUPLICATIONS (DB vs MINDMAP vs SAMPLES)...');
  let duplicateCount = 0;
  const duplicatesList = [];

  for (const dbQ of dbQuestions) {
    const dNorm = normalize(dbQ.content);
    for (const mmQ of mmQuestions) {
      const mNorm = normalize(mmQ.content);
      if (dNorm === mNorm || (dNorm.length > 30 && mNorm.includes(dNorm.slice(0, 30)))) {
        duplicateCount++;
        duplicatesList.push({ db: dbQ.code, mm: mmQ.code, snippet: dNorm.slice(0, 40) });
      }
    }
  }
  if (duplicateCount > 0) totalFailures++;
  console.log(`  - Cross-dataset duplicates (DB vs Mindmap): ${duplicateCount}`);
  if (duplicateCount > 0) {
    console.log(`  - Sample duplicates (first 3):`);
    duplicatesList.slice(0, 3).forEach(d => console.log(`    DB ${d.db} <==> Mindmap ${d.mm}: "${d.snippet}..."`));
  }
  console.log(`  -> Result: ${duplicateCount === 0 ? 'PASSED' : 'FAILED'}\n`);

  // -------------------------------------------------------------------------
  // 5. DUAL CASIO INSTRUCTION CHECK (fx-580VN X AND fx-880BTG)
  // -------------------------------------------------------------------------
  console.log('>>> [5/5] CHECKING DUAL CASIO INSTRUCTIONS (fx-580 & fx-880)...');
  let dbDualCasio = 0;
  let mmDualCasio = 0;

  function isDualCasio(text) {
    if (!text) return false;
    const has580 = text.includes('580') || text.includes('fx-580') || text.includes('MENU 8') || text.includes('MENU 9') || text.includes('MENU 5');
    const has880 = text.includes('880') || text.includes('fx-880') || text.includes('HOME') || text.includes('Bảng tính') || text.includes('CATALOG');
    return has580 && has880;
  }

  for (const q of dbQuestions) {
    if (isDualCasio(q.casioGuide)) dbDualCasio++;
  }
  for (const q of mmQuestions) {
    if (isDualCasio(q.casioGuide)) mmDualCasio++;
  }

  const dbDualRate = ((dbDualCasio / dbQuestions.length) * 100).toFixed(1);
  const mmDualRate = ((mmDualCasio / mmTotal) * 100).toFixed(1);
  if (dbDualCasio < dbQuestions.length || mmDualCasio < mmTotal) totalFailures++;

  console.log(`  - DB Questions with Dual Casio: ${dbDualCasio}/${dbQuestions.length} (${dbDualRate}%)`);
  console.log(`  - Mindmap Questions with Dual Casio: ${mmDualCasio}/${mmTotal} (${mmDualRate}%)`);
  console.log(`  -> Result: ${dbDualCasio === dbQuestions.length && mmDualCasio === mmTotal ? 'PASSED' : 'FAILED'}\n`);

  // -------------------------------------------------------------------------
  // OVERALL AUDIT SUMMARY
  // -------------------------------------------------------------------------
  console.log('================================================================');
  console.log(`OVERALL SUITE RESULT: ${totalFailures === 0 ? 'ALL CHECKS PASSED' : totalFailures + ' CHECK(S) FAILED'}`);
  console.log('================================================================');

  await p.$disconnect();
}

runUnifiedValidation().catch(console.error);
