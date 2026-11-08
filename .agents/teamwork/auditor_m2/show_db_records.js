const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function showDb() {
  const codes = ['Q05_D1_MC', 'Q13_D3_SA', 'Q15_D4_MC', 'Q26_D7_SA'];
  const qs = await prisma.question.findMany({ where: { code: { in: codes } } });
  for (const q of qs) {
    console.log(`\n=================== [${q.code}] ===================`);
    console.log(`SourceExam: ${q.sourceExam}`);
    console.log(`Content: ${q.content}`);
    console.log(`OptionsJson: ${q.optionsJson}`);
    console.log(`CorrectAnswer: ${q.correctAnswer}`);
  }
}
showDb().finally(() => prisma.$disconnect());
