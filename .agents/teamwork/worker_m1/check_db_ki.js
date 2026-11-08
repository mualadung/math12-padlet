const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verify() {
  const k = await prisma.knowledgeItem.findFirst({ where: { order: 9 } });
  console.log('KnowledgeItem 9 Notes:', k.notes);
  if (k.notes.includes('\u000b')) {
    console.error('FAIL: KnowledgeItem.notes still contains \\u000b!');
    process.exit(1);
  } else {
    console.log('PASS: KnowledgeItem.notes has NO control characters (0x0B eliminated!).');
  }
}
verify().finally(() => prisma.$disconnect());
