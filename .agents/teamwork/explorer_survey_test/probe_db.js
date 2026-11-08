const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  const qs = await p.question.findMany({
    select: { id: true, code: true, sourceExam: true, casioGuide: true, categoryId: true, content: true, explanation: true, optionsJson: true, distractorAnalysis: true }
  });
  console.log('Total questions in DB:', qs.length);

  const noSource = qs.filter(q => !q.sourceExam || !q.sourceExam.trim());
  const tagSource = qs.filter(q => q.sourceExam && q.sourceExam.includes('[Nguồn:'));
  const noTagSource = qs.filter(q => q.sourceExam && !q.sourceExam.includes('[Nguồn:'));
  const withCasio = qs.filter(q => q.casioGuide && q.casioGuide.trim());
  const dualCasio = qs.filter(q => q.casioGuide && (q.casioGuide.includes('580') || q.casioGuide.includes('fx-580')) && (q.casioGuide.includes('880') || q.casioGuide.includes('fx-880')));

  console.log('--- SOURCE TAG ANALYSIS ---');
  console.log('Total with source:', qs.length - noSource.length);
  console.log('With explicit [Nguồn: ...] tag:', tagSource.length);
  console.log('Without [Nguồn: ...] tag (plain string):', noTagSource.length);
  if (noTagSource.length > 0) {
    console.log('Sample without tag:', noTagSource.slice(0, 3).map(q => q.sourceExam));
  }

  console.log('--- CASIO ANALYSIS ---');
  console.log('With Casio guide:', withCasio.length, '/', qs.length);
  console.log('With dual Casio (both 580 and 880):', dualCasio.length, '/', qs.length);
  if (withCasio.length > 0) {
    console.log('Sample Casio guides (first 3):');
    withCasio.slice(0, 3).forEach(q => console.log(`[${q.code}]: ${q.casioGuide}`));
  }

  // Distribution by Category
  const cats = await p.mathCategory.findMany({
    include: { _count: { select: { questions: true } } }
  });
  console.log('--- CATEGORY QUESTION COUNT ---');
  cats.forEach(c => {
    console.log(`${c.code} (${c.title}): ${c._count.questions} questions`);
  });

  await p.$disconnect();
}

run().catch(console.error);
