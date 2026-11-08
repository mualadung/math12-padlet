const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ts = require('typescript');

const code = fs.readFileSync('src/app/mindmap/mindmapQuestions.ts', 'utf8');
const transpiled = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const mod = { exports: {} };
new Function('exports', 'module', 'require', transpiled)(mod.exports, mod, require);
const mm = mod.exports.REAL_QUESTIONS_BANK;

async function run() {
  const db = await prisma.question.findMany();
  const mmList = [];
  for (const [t, list] of Object.entries(mm)) {
    for (const q of list) mmList.push({...q, topic: t});
  }

  // Check Q05_D1 vs Q05_D1_MC
  const mmQ05 = mmList.find(q => q.id === 'Q05_D1');
  const dbQ05 = db.find(q => q.code === 'Q05_D1_MC');
  console.log('=== CHECK Q05_D1 vs Q05_D1_MC ===');
  console.log('MM Q05 Content:', mmQ05?.content);
  console.log('DB Q05 Content:', dbQ05?.content);
  console.log('MM Q05 Source:', mmQ05?.source);
  console.log('DB Q05 Source:', dbQ05?.sourceExam);
  console.log('MM Q05 Ans:', mmQ05?.correctAnswer, 'DB Q05 Ans:', dbQ05?.correctAnswer);
  console.log('MM Q05 Opts:', mmQ05?.options);
  console.log('DB Q05 Opts:', dbQ05?.optionsJson);

  // Check Q22_T5 vs Q15_D4_MC
  const mmQ22 = mmList.find(q => q.id === 'Q22_T5');
  const dbQ15 = db.find(q => q.code === 'Q15_D4_MC');
  console.log('\n=== CHECK Q22_T5 vs Q15_D4_MC ===');
  console.log('MM Q22 Content:', mmQ22?.content);
  console.log('DB Q15 Content:', dbQ15?.content);
  console.log('MM Q22 Source:', mmQ22?.source);
  console.log('DB Q15 Source:', dbQ15?.sourceExam);
  console.log('MM Q22 Ans:', mmQ22?.correctAnswer, 'DB Q15 Ans:', dbQ15?.correctAnswer);
  console.log('MM Q22 Opts:', mmQ22?.options);
  console.log('DB Q15 Opts:', dbQ15?.optionsJson);

  // Check Q49_T10 vs Q26_D7_SA
  const mmQ49 = mmList.find(q => q.id === 'Q49_T10');
  const dbQ26 = db.find(q => q.code === 'Q26_D7_SA');
  console.log('\n=== CHECK Q49_T10 vs Q26_D7_SA ===');
  console.log('MM Q49 Content:', mmQ49?.content);
  console.log('DB Q26 Content:', dbQ26?.content);
  console.log('MM Q49 Source:', mmQ49?.source);
  console.log('DB Q26 Source:', dbQ26?.sourceExam);
  console.log('MM Q49 Ans:', mmQ49?.correctAnswer, 'DB Q26 Ans:', dbQ26?.correctAnswer);
}
run().finally(() => prisma.$disconnect());
