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

function normalize(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[\s\$\\\{\}\(\)\_\^\,\.\:\;\=\+\-\*\/\[\]\<\>]/g, '').trim();
}

async function main() {
  const dbQs = await prisma.question.findMany();
  const mm = loadTsModule('src/app/mindmap/mindmapQuestions.ts');
  const bank = mm.REAL_QUESTIONS_BANK;
  
  console.log('--- Checking all 50 mindmap questions against all 55 DB questions ---');
  let matchCount = 0;
  for (const [topic, qs] of Object.entries(bank)) {
    for (const q of qs) {
      const qNorm = normalize(q.content);
      for (const dbQ of dbQs) {
        const dbNorm = normalize(dbQ.content);
        // check exact norm match or 30-char substring match
        const subLen = 35;
        let isMatch = false;
        if (qNorm === dbNorm) {
          isMatch = true;
        } else if (qNorm.length > subLen && dbNorm.includes(qNorm.substring(0, subLen))) {
          isMatch = true;
        } else if (dbNorm.length > subLen && qNorm.includes(dbNorm.substring(0, subLen))) {
          isMatch = true;
        }
        if (isMatch) {
          matchCount++;
          console.log(`MATCH [${matchCount}]: MM ${topic} - ${q.id} (${q.code}) <==> DB ${dbQ.code} (${dbQ.categoryId})`);
          console.log(`   MM: ${q.content.substring(0, 70)}...`);
          console.log(`   DB: ${dbQ.content.substring(0, 70)}...`);
        }
      }
    }
  }
  console.log(`Total matches found: ${matchCount}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
