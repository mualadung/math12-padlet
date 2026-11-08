const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const qCount = await prisma.question.count();
  console.log("Total Questions in DB:", qCount);

  const byCat = await prisma.question.groupBy({
    by: ['categoryId', 'questionType'],
    _count: { id: true }
  });
  console.log("Distribution:", byCat);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
