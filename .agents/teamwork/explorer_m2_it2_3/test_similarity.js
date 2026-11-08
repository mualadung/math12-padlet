const fs = require('fs');
const ts = require('typescript');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function loadTs(file) {
  const code = fs.readFileSync(file, 'utf8');
  const transpiled = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} };
  new Function('exports', 'module', 'require', transpiled)(mod.exports, mod, require);
  return mod.exports;
}

function normalizeContent(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\$\$[\s\S]*?\$\$/g, (m) => m.replace(/\$/g, ''))
    .replace(/\$[^\$]+?\$/g, (m) => m.replace(/\$/g, ''))
    .replace(/[.,;:?!()\[\]{}\"'\\\/~`@#%^&*_+=<>|–—\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function getWordNGrams(text, n = 3) {
  const norm = normalizeContent(text);
  const words = norm.split(' ').filter(w => w.length > 0);
  if (words.length < n) return new Set([words.join(' ')]);
  const grams = new Set();
  for (let i = 0; i <= words.length - n; i++) {
    grams.add(words.slice(i, i + n).join(' '));
  }
  return grams;
}

function jaccard(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let inter = 0;
  for (const item of setA) {
    if (setB.has(item)) inter++;
  }
  const union = setA.size + setB.size - inter;
  return union === 0 ? 0 : inter / union;
}

function extractMathFormulas(text) {
  if (!text || typeof text !== 'string') return [];
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
  const matches = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    const raw = m[0];
    const isBlock = raw.startsWith('$$');
    const math = isBlock ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim();
    // Normalize math: remove spaces, lowercase
    const clean = math.replace(/\s+/g, '').toLowerCase();
    if (clean.length > 0) {
      matches.push(clean);
    }
  }
  return matches;
}

async function run() {
  const db = await prisma.question.findMany();
  const mm = loadTs('src/app/mindmap/mindmapQuestions.ts').REAL_QUESTIONS_BANK;
  const mmList = [];
  for (const [k, list] of Object.entries(mm)) {
    for (const q of list) mmList.push({...q, topic: k});
  }

  const pairs = [
    { mm: 'Q05_D1', db: 'Q05_D1_MC' },
    { mm: 'Q15_T3', db: 'Q09_D2_SA' },
    { mm: 'Q19_T4', db: 'Q13_D3_SA' },
    { mm: 'Q22_T5', db: 'Q15_D4_MC' },
    { mm: 'Q48_T10', db: 'Q25_D7_TF' },
    { mm: 'Q49_T10', db: 'Q26_D7_SA' },
  ];

  console.log('=== 3-GRAM JACCARD FOR 6 CONFIRMED DUPLICATES ===');
  for (const p of pairs) {
    const qM = mmList.find(q => q.id === p.mm);
    const qD = db.find(q => q.code === p.db);
    const gM = getWordNGrams(qM.content, 3);
    const gD = getWordNGrams(qD.content, 3);
    const sim = jaccard(gM, gD);
    const fM = extractMathFormulas(qM.content);
    const fD = extractMathFormulas(qD.content);
    const commonF = fM.filter(f => fD.includes(f));
    console.log(`${p.mm} vs ${p.db}:`);
    console.log(`   3-gram Jaccard: ${(sim * 100).toFixed(2)}% (M: ${gM.size}, D: ${gD.size})`);
    console.log(`   Common formulas: ${JSON.stringify(commonF)}`);
    console.log(`   MM content: "${qM.content.slice(0, 90)}..."`);
    console.log(`   DB content: "${qD.content.slice(0, 90)}..."`);
  }

  console.log('\n=== PAIRS WITH 3-GRAM JACCARD > 0.40 ===');
  for (const qM of mmList) {
    const gM = getWordNGrams(qM.content, 3);
    for (const qD of db) {
      const gD = getWordNGrams(qD.content, 3);
      const sim = jaccard(gM, gD);
      if (sim > 0.40) {
        console.log(`[Jaccard ${(sim * 100).toFixed(2)}%] MM ${qM.id} (${qM.topic}) vs DB ${qD.code}`);
      }
    }
  }

  await prisma.$disconnect();
}

run();

async function inspectPairs() {
  const db = await prisma.question.findMany();
  const mm = loadTs('src/app/mindmap/mindmapQuestions.ts').REAL_QUESTIONS_BANK;
  const mmList = [];
  for (const [k, list] of Object.entries(mm)) {
    for (const q of list) mmList.push({...q, topic: k});
  }

  const inspect = [
    { m: 'Q10_T2', d: 'Q01_D1_MC' },
    { m: 'Q18_T4', d: 'Q12_D3_TF' },
    { m: 'Q33_T7', d: 'Q19_D5_TF' },
    { m: 'Q15_T3', d: 'Q09_D2_SA' },
  ];
  for (const pair of inspect) {
    const mmQ = mmList.find(q => q.id === pair.m);
    const dbQ = db.find(q => q.code === pair.d);
    console.log('====================================');
    console.log('PAIR: ' + pair.m + ' vs ' + pair.d);
    console.log('MM content: ' + mmQ?.content);
    console.log('MM source:  ' + mmQ?.source);
    console.log('DB content: ' + dbQ?.content);
    console.log('DB source:  ' + dbQ?.sourceExam);
  }
}
inspectPairs();
