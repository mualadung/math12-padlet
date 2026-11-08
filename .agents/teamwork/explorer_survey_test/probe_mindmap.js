const fs = require('fs');
const ts = require('typescript');
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

// Transpile and load mindmapQuestions.ts
const tsCode = fs.readFileSync('src/app/mindmap/mindmapQuestions.ts', 'utf8');
const jsCode = ts.transpileModule(tsCode, {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
}).outputText;

const mod = { exports: {} };
const fn = new Function('module', 'exports', 'require', jsCode);
fn(mod, mod.exports, require);
const REAL_QUESTIONS_BANK = mod.exports.REAL_QUESTIONS_BANK;

async function run() {
  const dbQuestions = await p.question.findMany();
  await p.$disconnect();

  let mmTotal = 0;
  let mmWithSourceTag = 0;
  let mmDualCasio = 0;
  let mmNoCasio = 0;
  const mmList = [];

  for (const topic in REAL_QUESTIONS_BANK) {
    const list = REAL_QUESTIONS_BANK[topic];
    mmTotal += list.length;
    list.forEach(q => {
      mmList.push({ topic, ...q });
      if (q.source && q.source.includes('[Nguồn:')) {
        mmWithSourceTag++;
      }
      if (q.casioGuide) {
        if ((q.casioGuide.includes('580') || q.casioGuide.includes('fx-580')) &&
            (q.casioGuide.includes('880') || q.casioGuide.includes('fx-880'))) {
          mmDualCasio++;
        }
      } else {
        mmNoCasio++;
      }
    });
  }

  console.log('--- MINDMAP QUESTIONS BANK ---');
  console.log('Total mindmap questions:', mmTotal);
  console.log('With [Nguồn: ...] tag:', mmWithSourceTag, '/', mmTotal);
  console.log('Sample mindmap sources (first 3):', mmList.slice(0, 3).map(q => q.source));
  console.log('With dual Casio:', mmDualCasio, '/', mmTotal);
  console.log('No Casio guide:', mmNoCasio, '/', mmTotal);
  console.log('Sample Casio guides (first 3):', mmList.slice(0, 3).map(q => q.casioGuide));

  // Duplication check between DB and Mindmap
  console.log('--- DUPLICATION ANALYSIS: DB vs MINDMAP ---');
  let duplicateCount = 0;
  const duplicates = [];

  for (const dbQ of dbQuestions) {
    const cleanDb = dbQ.content.replace(/\s+/g, ' ').trim();
    for (const mmQ of mmList) {
      const cleanMm = mmQ.content.replace(/\s+/g, ' ').trim();
      // Match if content is identical or very similar (substring length >= 30)
      if (cleanDb === cleanMm || (cleanDb.length > 30 && cleanMm.includes(cleanDb.slice(0, 35)))) {
        duplicateCount++;
        duplicates.push({
          dbCode: dbQ.code,
          mmCode: mmQ.code,
          mmTopic: mmQ.topic,
          preview: cleanDb.slice(0, 50) + '...'
        });
      }
    }
  }

  console.log('Duplicates between DB and Mindmap:', duplicateCount);
  if (duplicates.length > 0) {
    console.log('Duplicate examples (first 5):', duplicates.slice(0, 5));
  }

  // Also check intra-mindmap duplicates
  let intraMmDup = 0;
  for (let i = 0; i < mmList.length; i++) {
    for (let j = i + 1; j < mmList.length; j++) {
      if (mmList[i].content.replace(/\s+/g, ' ').trim() === mmList[j].content.replace(/\s+/g, ' ').trim()) {
        intraMmDup++;
        console.log(`Intra-mindmap duplicate: ${mmList[i].code} vs ${mmList[j].code}`);
      }
    }
  }
  console.log('Intra-mindmap duplicates:', intraMmDup);

  // Also check intra-DB duplicates
  let intraDbDup = 0;
  for (let i = 0; i < dbQuestions.length; i++) {
    for (let j = i + 1; j < dbQuestions.length; j++) {
      if (dbQuestions[i].content.replace(/\s+/g, ' ').trim() === dbQuestions[j].content.replace(/\s+/g, ' ').trim()) {
        intraDbDup++;
        console.log(`Intra-DB duplicate: ${dbQuestions[i].code} vs ${dbQuestions[j].code}`);
      }
    }
  }
  console.log('Intra-DB duplicates:', intraDbDup);
}

run().catch(console.error);
