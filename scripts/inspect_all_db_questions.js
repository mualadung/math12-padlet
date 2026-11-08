const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function inspect() {
  const qs = await prisma.question.findMany({
    include: { category: true },
    orderBy: { code: 'asc' }
  });

  console.log(`Loaded ${qs.length} questions from DB.`);
  const summary = qs.map(q => ({
    code: q.code,
    category: q.category.code,
    type: q.questionType,
    source: q.sourceExam,
    hasCasio: !!q.casioGuide,
    casioLength: q.casioGuide?.length || 0
  }));

  console.log(JSON.stringify(summary.slice(0, 15), null, 2));
  await prisma.$disconnect();
}

inspect().catch(console.error);
