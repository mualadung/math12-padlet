const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findUnicodeD() {
  const questions = await prisma.question.findMany();
  for (const q of questions) {
    const fields = [
      { name: 'content', val: q.content },
      { name: 'explanation', val: q.explanation },
      { name: 'distractorAnalysis', val: q.distractorAnalysis }
    ];
    for (const f of fields) {
      if (!f.val) continue;
      const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
      let m;
      while ((m = regex.exec(f.val)) !== null) {
        if (m[0].includes('Đ') && !m[0].includes('\\text')) {
          console.log(`Question ${q.code} ${f.name}: formula = ${m[0]}`);
        }
      }
    }
  }
  const cats = await prisma.mathCategory.findMany();
  for (const c of cats) {
    const fields = [
      { name: 'coreKnowledge', val: c.coreKnowledge },
      { name: 'identifySigns', val: c.identifySigns },
      { name: 'methodSteps', val: c.methodSteps },
      { name: 'commonMistakes', val: c.commonMistakes }
    ];
    for (const f of fields) {
      if (!f.val) continue;
      const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
      let m;
      while ((m = regex.exec(f.val)) !== null) {
        if (m[0].includes('Đ') && !m[0].includes('\\text')) {
          console.log(`Category ${c.code} ${f.name}: formula = ${m[0]}`);
        }
      }
    }
  }
  await prisma.$disconnect();
}

findUnicodeD().catch(console.error);
