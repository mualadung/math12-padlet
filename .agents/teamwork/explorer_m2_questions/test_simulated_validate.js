const fs = require('fs');
const ts = require('typescript');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

async function testSimulated() {
  const proposed = loadTsModule('.agents/teamwork/explorer_m2_questions/proposed_mindmapQuestions.ts');
  const dbQuestions = await prisma.question.findMany();
  
  const allMindmapQuestions = [];
  for (const [topicKey, qList] of Object.entries(proposed.REAL_QUESTIONS_BANK)) {
    for (const q of qList) {
      allMindmapQuestions.push({ ...q, topicKey });
    }
  }

  // Tier 3 duplication check exactly as in validate_all.js
  let failures = [];
  for (const dbQ of dbQuestions) {
    const normDb = normalizeContent(dbQ.content);
    if (normDb.length < 25) continue;
    for (const mmQ of allMindmapQuestions) {
      const normMm = normalizeContent(mmQ.content);
      if (normMm.length < 25) continue;
      if (normDb === normMm || (normDb.length > 50 && normMm.includes(normDb.substring(0, 50)))) {
        failures.push(`Trùng lặp: DB [${dbQ.code}] vs MM [${mmQ.code} - ${mmQ.topicKey}]`);
      }
    }
  }

  console.log('Tier 3 cross duplicates with simulated proposed data:', failures.length);
  if (failures.length > 0) {
    failures.forEach(f => console.log('  ', f));
  } else {
    console.log('CONGRATS: All Tier 3 cross duplicates between DB and Mindmap are RESOLVED (0 failures)!');
  }
}
testSimulated().catch(console.error).finally(() => prisma.$disconnect());
