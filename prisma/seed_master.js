const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function seedMaster() {
  console.log('================================================================================');
  console.log('               MASTER DATA SEED: 106 CÂU HỎI & 8 THÀNH VIÊN                     ');
  console.log('================================================================================');

  const jsonPath = path.join(__dirname, 'master_data.json');
  if (!fs.existsSync(jsonPath)) {
    throw new Error('Không tìm thấy tệp prisma/master_data.json!');
  }

  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(raw);

  // 1. Knowledge items
  for (const k of data.knowledge) {
    const { id, ...rest } = k;
    await prisma.knowledgeItem.upsert({
      where: { id },
      update: rest,
      create: { id, ...rest },
    });
  }
  console.log(`✓ Đã nạp thành công ${data.knowledge.length} mục kiến thức SGK`);

  // 2. Categories
  for (const c of data.categories) {
    const { id, ...rest } = c;
    await prisma.mathCategory.upsert({
      where: { code: c.code },
      update: rest,
      create: { id, ...rest },
    });
  }
  console.log(`✓ Đã nạp thành công ${data.categories.length} dạng toán`);

  // 3. Team members
  for (const m of data.members) {
    const { id, ...rest } = m;
    await prisma.teamMember.upsert({
      where: { name: m.name },
      update: rest,
      create: { id, ...rest },
    });
  }
  console.log(`✓ Đã nạp thành công ${data.members.length} thành viên nhóm`);

  // 4. Peer reviews
  for (const r of data.reviews) {
    const { id, ...rest } = r;
    await prisma.peerReview.upsert({
      where: { id },
      update: rest,
      create: { id, ...rest },
    });
  }
  console.log(`✓ Đã nạp thành công ${data.reviews.length} phiếu đánh giá chéo 2 chiều`);

  // 5. Questions
  for (const q of data.questions) {
    const { id, ...rest } = q;
    await prisma.question.upsert({
      where: { code: q.code },
      update: rest,
      create: { id, ...rest },
    });
  }
  console.log(`✓ Đã nạp thành công ${data.questions.length} câu hỏi đề thi thật 100%`);
  console.log('================================================================================');
  console.log(' >>> SEED MASTER THÀNH CÔNG RỰC RỠ! DỮ LIỆU ĐÃ ĐƯỢC ĐỒNG BỘ 100% <<< ');
}

seedMaster()
  .catch((e) => {
    console.error('Lỗi khi seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
