const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function dump() {
  const members = await prisma.teamMember.findMany();
  const reviews = await prisma.peerReview.findMany();
  const categories = await prisma.mathCategory.findMany();
  const questions = await prisma.question.findMany();
  const knowledge = await prisma.knowledgeItem.findMany();

  console.log('Dumping SQLite dev.db:');
  console.log('- Team members:', members.length);
  console.log('- Peer reviews:', reviews.length);
  console.log('- Categories:', categories.length);
  console.log('- Questions:', questions.length);
  console.log('- Knowledge items:', knowledge.length);

  const cleanMembers = members.map(m => {
    const { createdAt, updatedAt, ...rest } = m;
    return rest;
  });

  const cleanReviews = reviews.map(r => {
    const { createdAt, updatedAt, ...rest } = r;
    return rest;
  });

  const cleanCategories = categories.map(c => {
    const { createdAt, updatedAt, ...rest } = c;
    return rest;
  });

  const cleanQuestions = questions.map(q => {
    const { createdAt, updatedAt, ...rest } = q;
    return rest;
  });

  const cleanKnowledge = knowledge.map(k => {
    const { createdAt, updatedAt, ...rest } = k;
    return rest;
  });

  const data = {
    knowledge: cleanKnowledge,
    categories: cleanCategories,
    members: cleanMembers,
    reviews: cleanReviews,
    questions: cleanQuestions
  };

  fs.writeFileSync('prisma/master_data.json', JSON.stringify(data, null, 2), 'utf-8');
  console.log('Exported prisma/master_data.json successfully!');
}

dump()
  .catch(console.error)
  .finally(async () => { await prisma.$disconnect(); });
