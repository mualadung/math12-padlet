const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanUnicodeD() {
  const qs = await prisma.question.findMany();
  let count = 0;
  for (const q of qs) {
    let changed = false;
    let content = q.content;
    let explanation = q.explanation;
    let casioGuide = q.casioGuide;

    // Replace CĐ with \text{CĐ} inside math mode $...$
    const fixD = (str) => {
      if (!str) return str;
      return str.replace(/\$([^\$]+)\$/g, (m, math) => {
        const fixedMath = math
          .replace(/_\{CĐ\}/g, '_{\\text{CĐ}}')
          .replace(/_\{CT\}/g, '_{\\text{CT}}')
          .replace(/y_\{CĐ\}/g, 'y_{\\text{CĐ}}')
          .replace(/x_\{CĐ\}/g, 'x_{\\text{CĐ}}')
          .replace(/y_\{CT\}/g, 'y_{\\text{CT}}')
          .replace(/x_\{CT\}/g, 'x_{\\text{CT}}');
        return `$${fixedMath}$`;
      });
    };

    const newContent = fixD(content);
    const newExpl = fixD(explanation);
    const newCasio = fixD(casioGuide);

    if (newContent !== content || newExpl !== explanation || newCasio !== casioGuide) {
      await prisma.question.update({
        where: { id: q.id },
        data: {
          content: newContent,
          explanation: newExpl,
          casioGuide: newCasio,
        }
      });
      count++;
    }
  }
  console.log(`Cleaned Unicode Đ in ${count} questions.`);
  await prisma.$disconnect();
}

cleanUnicodeD().catch(console.error);
