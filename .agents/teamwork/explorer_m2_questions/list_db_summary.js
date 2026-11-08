const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const qs = await prisma.question.findMany({ select: { code: true, content: true, sourceExam: true } });
  console.log('--- ALL DB QUESTIONS SUMMARY ---');
  qs.forEach(q => {
    console.log(`[${q.code}] ${q.content.substring(0, 100).replace(/\n/g, ' ')}`);
  });
}
main().catch(console.error).finally(() => prisma.$disconnect());
