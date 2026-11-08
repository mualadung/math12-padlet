const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ts = require('typescript');

const code = fs.readFileSync('src/app/mindmap/mindmapQuestions.ts', 'utf8');
const transpiled = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const mod = { exports: {} };
new Function('exports', 'module', 'require', transpiled)(mod.exports, mod, require);
const mm = mod.exports.REAL_QUESTIONS_BANK;

async function inventory() {
  const db = await prisma.question.findMany();
  const summary = [];

  for (const [topic, list] of Object.entries(mm)) {
    for (const q of list) {
      summary.push({
        id: q.id,
        code: q.code,
        topic,
        type: q.type,
        difficulty: q.difficulty,
        source: q.source,
        contentLen: q.content ? q.content.length : 0,
        hasOpts: Array.isArray(q.options) && q.options.length > 0,
        answer: q.correctAnswer,
        hasExplanation: typeof q.explanation === 'string' && q.explanation.length > 20,
        hasDistractor: typeof q.distractorAnalysis === 'string' && q.distractorAnalysis.length > 10,
        hasCasio: typeof q.casioGuide === 'string' && q.casioGuide.length > 10,
      });
    }
  }

  console.log(`Total questions in REAL_QUESTIONS_BANK: ${summary.length}`);
  const byTopic = {};
  summary.forEach(s => {
    byTopic[s.topic] = (byTopic[s.topic] || 0) + 1;
  });
  console.log('Distribution by topic:', byTopic);

  const byType = {};
  summary.forEach(s => {
    byType[s.type] = (byType[s.type] || 0) + 1;
  });
  console.log('Distribution by type:', byType);

  const byDiff = {};
  summary.forEach(s => {
    byDiff[s.difficulty] = (byDiff[s.difficulty] || 0) + 1;
  });
  console.log('Distribution by difficulty:', byDiff);

  const missingFields = summary.filter(s => !s.hasExplanation || !s.hasDistractor || !s.answer);
  console.log('Questions with missing fields:', missingFields.length);
}

inventory().finally(() => prisma.$disconnect());
