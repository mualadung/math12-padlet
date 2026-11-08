const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function loadTsModule(relativePath) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const code = fs.readFileSync(absolutePath, 'utf8');
  const transpiled = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} };
  const fn = new Function('exports', 'module', 'require', '__filename', '__dirname', transpiled);
  fn(mod.exports, mod, require, absolutePath, path.dirname(absolutePath));
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

async function checkDup() {
  const dbQuestions = await prisma.question.findMany();
  const mindmapMod = loadTsModule('src/app/mindmap/mindmapQuestions.ts');
  const bank = mindmapMod.REAL_QUESTIONS_BANK;
  const allMm = [];
  for (const k of Object.keys(bank)) {
    for (const q of bank[k]) {
      allMm.push({ ...q, topicKey: k });
    }
  }

  console.log('Checking duplication between DB (' + dbQuestions.length + ') and Mindmap (' + allMm.length + ')...');
  const crossDups = [];
  for (const dbQ of dbQuestions) {
    const normDb = normalizeContent(dbQ.content);
    if (normDb.length < 25) continue;
    for (const mmQ of allMm) {
      const normMm = normalizeContent(mmQ.content);
      if (normMm.length < 25) continue;
      if (normDb === normMm || (normDb.length > 50 && normMm.includes(normDb.substring(0, 50)))) {
        crossDups.push({
          dbCode: dbQ.code,
          mmCode: mmQ.code,
          topic: mmQ.topicKey,
          dbContent: dbQ.content.substring(0, 60),
          mmContent: mmQ.content.substring(0, 60)
        });
      }
    }
  }
  console.log('Cross duplicates count:', crossDups.length);
  crossDups.forEach(d => {
    console.log(`DB [${d.dbCode}] <-> Mindmap [${d.mmCode} in ${d.topic}]: ${d.dbContent}`);
  });

  // Also check internal Mindmap dups
  console.log('\nChecking internal Mindmap duplicates...');
  const internalMmDups = [];
  for (let i = 0; i < allMm.length; i++) {
    const q1 = allMm[i];
    const norm1 = normalizeContent(q1.content);
    if (norm1.length < 25) continue;
    for (let j = i + 1; j < allMm.length; j++) {
      const q2 = allMm[j];
      const norm2 = normalizeContent(q2.content);
      if (norm1 === norm2) {
        internalMmDups.push({ q1Code: q1.code, q2Code: q2.code });
      }
    }
  }
  console.log('Internal Mindmap duplicates count:', internalMmDups.length);
  internalMmDups.forEach(d => console.log(`Internal Dup: ${d.q1Code} == ${d.q2Code}`));

  fs.writeFileSync('scripts/audit_dup_result.json', JSON.stringify({ crossDups, internalMmDups }, null, 2), 'utf8');
}

checkDup().then(() => prisma.$disconnect());
