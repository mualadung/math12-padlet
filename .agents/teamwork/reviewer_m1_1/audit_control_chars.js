const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function checkDatabase() {
  console.log('=== CHECKING SQLITE DATABASE ===');
  const models = ['knowledgeItem', 'mathCategory', 'question', 'examTopic', 'teamMember'];
  let totalBadChars = 0;
  
  for (const m of models) {
    if (!prisma[m]) {
      console.log(`Model ${m} not found on prisma client, skipping`);
      continue;
    }
    const rows = await prisma[m].findMany();
    console.log(`Checking table ${m}: ${rows.length} rows`);
    for (const r of rows) {
      for (const [col, val] of Object.entries(r)) {
        if (typeof val === 'string') {
          for (let i = 0; i < val.length; i++) {
            const code = val.charCodeAt(i);
            if (code < 32 && code !== 10 && code !== 13 && code !== 9) {
              console.log(`[ALERT] Control char 0x${code.toString(16).padStart(2, '0')} at ${m}.${col} (id: ${r.id}): "${val.substring(Math.max(0, i - 15), i + 15)}"`);
              totalBadChars++;
            }
          }
        }
      }
    }
  }
  console.log(`Total control characters in SQLite: ${totalBadChars}`);
  return totalBadChars;
}

function checkSourceFiles() {
  console.log('\n=== CHECKING SOURCE & DATA FILES ===');
  const filesToCheck = [
    'src/app/mindmap/machData.ts',
    'src/app/mindmap/mindmapQuestions.ts',
    'prisma/seed.js',
    'src/app/math-types/page.tsx',
    'src/app/practice/page.tsx'
  ];
  let fileBadChars = 0;
  for (const f of filesToCheck) {
    const fullPath = path.resolve(f);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, 'utf8');
    let badInFile = 0;
    for (let i = 0; i < content.length; i++) {
      const code = content.charCodeAt(i);
      if (code < 32 && code !== 10 && code !== 13 && code !== 9) {
        console.log(`[ALERT] Control char 0x${code.toString(16).padStart(2, '0')} in ${f} at index ${i}`);
        badInFile++;
        fileBadChars++;
      }
    }
    console.log(`File ${f}: ${content.length} chars, ${badInFile} control chars`);
  }
  console.log(`Total control characters in checked files: ${fileBadChars}`);
  return fileBadChars;
}

async function main() {
  try {
    const dbErrors = await checkDatabase();
    const fileErrors = checkSourceFiles();
    if (dbErrors === 0 && fileErrors === 0) {
      console.log('\n>>> PASS: Zero control characters / vertical tabs found in DB and data files! <<<');
    } else {
      console.log(`\n>>> FAIL: Found ${dbErrors} in DB, ${fileErrors} in files! <<<`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
