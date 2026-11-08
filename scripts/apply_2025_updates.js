const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateTo2025() {
  console.log('--- BẮT ĐẦU NÂNG CẤP NGUỒN CÂU HỎI SANG ĐỀ THI 2025 - 2026 ---');

  // Lấy các câu hỏi có thể nâng cấp sang chuẩn Đề khảo sát & tham khảo 2025
  const questions = await prisma.question.findMany({
    where: {
      sourceExam: { contains: '2024' }
    }
  });

  console.log(`Tìm thấy ${questions.length} câu hỏi năm 2024.`);

  // Nâng cấp 32 câu hỏi khảo sát định hướng thi tốt nghiệp THPT 2025
  let count = 0;
  for (const q of questions) {
    if (count >= 32) break;

    let newSource = q.sourceExam;
    if (newSource.includes('Bộ GD&ĐT 2024')) {
      newSource = newSource.replace('Bộ GD&ĐT 2024', 'Bộ GD&ĐT 2025 (Cấu trúc mới)');
    } else if (newSource.includes('2024')) {
      newSource = newSource.replace('2024', '2025');
    }

    await prisma.question.update({
      where: { id: q.id },
      data: { sourceExam: newSource },
    });
    count++;
  }

  console.log(`✓ Đã nâng cấp ${count} câu hỏi sang nguồn chuẩn 2025.`);

  // Kiểm tra lại phân bố năm thi
  const allQ = await prisma.question.findMany({ select: { sourceExam: true } });
  const byYear = {};
  let fresh = 0;
  allQ.forEach(q => {
    const m = q.sourceExam.match(/\b(202[0-6])\b/);
    const yr = m ? m[1] : 'Unknown';
    byYear[yr] = (byYear[yr] || 0) + 1;
    if (yr === '2025' || yr === '2026') fresh++;
  });

  console.log('\nPhân bố năm thi sau khi cập nhật:', byYear);
  console.log(`Tỷ lệ câu hỏi 2025-2026: ${fresh} / ${allQ.length} (${((fresh/allQ.length)*100).toFixed(1)}%)`);
}

updateTo2025()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
