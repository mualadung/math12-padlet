const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function inspectDb() {
  const categories = await prisma.mathCategory.findMany({
    include: {
      _count: {
        select: { questions: true }
      }
    },
    orderBy: { order: 'asc' }
  });

  console.log('=== Current MathCategories in DB ===');
  categories.forEach(c => {
    console.log(`${c.code} (${c.chapter}) - ${c.title}: ${c._count.questions} questions`);
  });

  const totalQuestions = await prisma.question.count();
  console.log(`\nTotal Questions in DB: ${totalQuestions}`);

  const questionsByType = await prisma.question.groupBy({
    by: ['questionType'],
    _count: true
  });
  console.log('Questions by questionType:', questionsByType);

  const questionsByDiff = await prisma.question.groupBy({
    by: ['difficulty'],
    _count: true
  });
  console.log('Questions by difficulty:', questionsByDiff);
}

inspectDb().finally(() => prisma.$disconnect());
