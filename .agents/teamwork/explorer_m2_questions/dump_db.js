const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const qs = await prisma.question.findMany({ include: { category: true }, orderBy: { code: 'asc' } });
  console.log('Total DB questions:', qs.length);
  qs.forEach((q, i) => {
    console.log(`[${i+1}] code:${q.code} | cat:${q.category ? q.category.code : q.categoryId} | diff:${q.difficulty} | type:${q.questionType}`);
    console.log(`    sourceExam: ${q.sourceExam}`);
    console.log(`    content: ${q.content.replace(/\n/g, ' ').substring(0, 90)}...`);
  });
}
main().catch(console.error).finally(() => prisma.$disconnect());
