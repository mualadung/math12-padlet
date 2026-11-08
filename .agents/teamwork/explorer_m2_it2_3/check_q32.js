const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const q32 = await prisma.question.findFirst({ where: { code: 'Q32_D1_SA' } });
  const q04 = await prisma.question.findFirst({ where: { code: 'Q04_D1_SA' } });
  console.log('Q04_D1_SA:', q04?.content);
  console.log('Q32_D1_SA:', q32?.content);
  await prisma.$disconnect();
}
check();
