const fs = require('fs');
const ts = require('typescript');
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

function transpileFile(path) {
  const code = fs.readFileSync(path, 'utf8');
  const js = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} };
  new Function('module', 'exports', 'require', js)(mod, mod.exports, require);
  return mod.exports;
}

async function run() {
  const dbQs = await p.question.findMany();
  await p.$disconnect();

  const mmBank = transpileFile('src/app/mindmap/mindmapQuestions.ts').REAL_QUESTIONS_BANK;
  const mmQs = [];
  for (const topic in mmBank) {
    mmBank[topic].forEach(q => mmQs.push({ topic, ...q }));
  }

  const treeData = transpileFile('src/app/mindmap/machData.ts').TREE_DATA;
  const sampleQs = [];
  function findSamples(obj, path = '') {
    if (!obj) return;
    if (obj.sampleQuestion) {
      sampleQs.push({ path, ...obj.sampleQuestion });
    }
    if (Array.isArray(obj)) {
      obj.forEach((item, idx) => findSamples(item, `${path}[${idx}]`));
    } else if (typeof obj === 'object') {
      for (const k in obj) {
        findSamples(obj[k], `${path}.${k}`);
      }
    }
  }
  findSamples(treeData);

  console.log('=== DATASET INVENTORY ===');
  console.log(`1. Practice DB Questions: ${dbQs.length}`);
  console.log(`2. Mindmap Questions: ${mmQs.length}`);
  console.log(`3. MachData Sample Questions: ${sampleQs.length}`);

  function normalize(str) {
    return (str || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  // Cross check 1: DB vs Mindmap
  let dupDbMm = 0;
  for (const d of dbQs) {
    const dNorm = normalize(d.content);
    for (const m of mmQs) {
      const mNorm = normalize(m.content);
      if (dNorm === mNorm || (dNorm.length > 30 && mNorm.includes(dNorm.slice(0, 30)))) {
        dupDbMm++;
      }
    }
  }

  // Cross check 2: DB vs Sample Questions
  let dupDbSample = 0;
  for (const d of dbQs) {
    const dNorm = normalize(d.content);
    for (const s of sampleQs) {
      const sNorm = normalize(s.content);
      if (dNorm === sNorm || (dNorm.length > 30 && sNorm.includes(dNorm.slice(0, 30)))) {
        dupDbSample++;
      }
    }
  }

  // Cross check 3: Mindmap vs Sample Questions
  let dupMmSample = 0;
  for (const m of mmQs) {
    const mNorm = normalize(m.content);
    for (const s of sampleQs) {
      const sNorm = normalize(s.content);
      if (mNorm === sNorm || (mNorm.length > 30 && sNorm.includes(mNorm.slice(0, 30)))) {
        dupMmSample++;
      }
    }
  }

  console.log('\n=== DUPLICATION MATRIX ===');
  console.log(`- Duplicates between Practice DB & Mindmap: ${dupDbMm}`);
  console.log(`- Duplicates between Practice DB & Math-Types Samples: ${dupDbSample}`);
  console.log(`- Duplicates between Mindmap & Math-Types Samples: ${dupMmSample}`);
}

run().catch(console.error);
