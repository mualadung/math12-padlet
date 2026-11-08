const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ts = require('typescript');

function loadTsModule(relPath) {
  const code = fs.readFileSync(relPath, 'utf8');
  const result = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  });
  const m = { exports: {} };
  const fn = new Function('module', 'exports', 'require', result.outputText);
  fn(m, m.exports, require);
  return m.exports;
}

function normalizeContent(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[\s\$\\\{\}\(\)\_\^\,\.\:\;\=\+\-\*\/\[\]\<\>]/g, '').trim();
}

async function main() {
  const dbQuestions = await prisma.question.findMany();
  const mm = loadTsModule('src/app/mindmap/mindmapQuestions.ts');
  const mindmapBank = mm.REAL_QUESTIONS_BANK || {};
  const allMindmapQuestions = [];
  for (const [topicKey, qList] of Object.entries(mindmapBank)) {
    if (Array.isArray(qList)) {
      for (const q of qList) {
        allMindmapQuestions.push({ ...q, topicKey });
      }
    }
  }

  console.log('Total DB questions:', dbQuestions.length);
  console.log('Total Mindmap questions:', allMindmapQuestions.length);

  const dupes = [];
  for (const dbQ of dbQuestions) {
    const normDb = normalizeContent(dbQ.content);
    if (normDb.length < 25) continue;
    for (const mmQ of allMindmapQuestions) {
      const normMm = normalizeContent(mmQ.content);
      if (normMm.length < 25) continue;
      if (normDb === normMm || (normDb.length > 50 && normMm.includes(normDb.substring(0, 50)))) {
        dupes.push({
          dbCode: dbQ.code,
          dbContent: dbQ.content,
          mmTopic: mmQ.topicKey,
          mmCode: mmQ.code || mmQ.id,
          mmTitle: mmQ.title,
          mmContent: mmQ.content
        });
      }
    }
  }

  console.log('Total cross dupes found:', dupes.length);
  dupes.forEach((d, idx) => {
    console.log(`[${idx+1}] DB: ${d.dbCode} <==> MM (${d.mmTopic}): ${d.mmCode} "${d.mmTitle}"`);
    console.log(`     DB Content: ${d.dbContent.substring(0, 90)}...`);
    console.log(`     MM Content: ${d.mmContent.substring(0, 90)}...`);
  });

  // Also check internal Mindmap duplicates
  const internalMmDupes = [];
  for (let i = 0; i < allMindmapQuestions.length; i++) {
    const q1 = allMindmapQuestions[i];
    const norm1 = normalizeContent(q1.content);
    if (norm1.length < 25) continue;
    for (let j = i + 1; j < allMindmapQuestions.length; j++) {
      const q2 = allMindmapQuestions[j];
      const norm2 = normalizeContent(q2.content);
      if (norm1 === norm2) {
        internalMmDupes.push({ q1: q1.code || q1.id, q2: q2.code || q2.id, content: q1.content });
      }
    }
  }
  console.log('Total internal MM dupes:', internalMmDupes.length);

  const failures = [];
  // 3.1
  for (const dbQ of dbQuestions) {
    const normDb = normalizeContent(dbQ.content);
    if (normDb.length < 25) continue;
    for (const mmQ of allMindmapQuestions) {
      const normMm = normalizeContent(mmQ.content);
      if (normMm.length < 25) continue;
      if (normDb === normMm || (normDb.length > 50 && normMm.includes(normDb.substring(0, 50)))) {
        failures.push({
          type: 'DB_vs_MM',
          msg: `${dbQ.code} vs ${mmQ.code || mmQ.id} (${mmQ.topicKey})`
        });
      }
    }
  }
  // 3.2
  for (let i = 0; i < dbQuestions.length; i++) {
    const q1 = dbQuestions[i];
    const norm1 = normalizeContent(q1.content);
    if (norm1.length < 25) continue;
    for (let j = i + 1; j < dbQuestions.length; j++) {
      const q2 = dbQuestions[j];
      const norm2 = normalizeContent(q2.content);
      if (norm1 === norm2) {
        failures.push({
          type: 'DB_INTERNAL',
          msg: `${q1.code} vs ${q2.code}`
        });
      }
    }
  }
  // 3.3
  for (let i = 0; i < allMindmapQuestions.length; i++) {
    const q1 = allMindmapQuestions[i];
    const norm1 = normalizeContent(q1.content);
    if (norm1.length < 25) continue;
    for (let j = i + 1; j < allMindmapQuestions.length; j++) {
      const q2 = allMindmapQuestions[j];
      const norm2 = normalizeContent(q2.content);
      if (norm1 === norm2) {
        failures.push({
          type: 'MM_INTERNAL',
          msg: `${q1.code || q1.id} vs ${q2.code || q2.id}`
        });
      }
    }
  }

  console.log('Total Tier 3 failures:', failures.length);
  failures.forEach(f => console.log(f.type + ':', f.msg));
}
main().catch(console.error).finally(() => prisma.$disconnect());

