const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const qs = await prisma.question.findMany({
    include: { category: true }
  });
  console.log(`Total questions in DB: ${qs.length}`);
  const counts = {};
  qs.forEach(q => {
    const code = q.category?.code || 'UNKNOWN';
    counts[code] = (counts[code] || 0) + 1;
  });
  console.log('Counts per category:', counts);
  await prisma.$disconnect();
}

check().catch(console.error);
