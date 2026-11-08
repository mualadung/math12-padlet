const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- BẮT ĐẦU CẬP NHẬT THÀNH VIÊN NỮ HOÀNG VÀ MA TRẬN 8 THÀNH VIÊN ---');

  // 1. Kiểm tra hoặc thêm thành viên Nữ Hoàng
  let nuHoang = await prisma.teamMember.findUnique({
    where: { name: 'Nữ Hoàng' },
  });

  if (!nuHoang) {
    nuHoang = await prisma.teamMember.create({
      data: {
        name: 'Nữ Hoàng',
        roleCode: 'VAI_TRO_8',
        roleName: 'Thẩm định chất lượng học liệu số, Hoàn thiện hồ sơ minh chứng Padlet & Tổng hợp báo cáo kiểm thử 9 tiêu chí Mục VII',
        tasks: 'Rà soát độc lập toàn diện 9 tiêu chí kiểm thử Mục VII, kiểm tra tính sư phạm & tương thích hiển thị trên thiết bị của học sinh, tổng hợp hồ sơ minh chứng Padlet và biên bản kiểm tra chéo.',
        deliverables: 'Biên bản thẩm định chất lượng 9 tiêu chí Mục VII, Báo cáo kết quả kiểm thử học sinh lần đầu, Bộ liên kết số và tài liệu minh chứng Padlet hoàn chỉnh.',
        deadline: '14/11/2026',
        status: 'COMPLETED',
        selfRating: 98.0,
      },
    });
    console.log('✓ Đã tạo thành công thành viên Nữ Hoàng:', nuHoang.id);
  } else {
    console.log('Thành viên Nữ Hoàng đã tồn tại:', nuHoang.id);
  }

  // 2. Lấy danh sách toàn bộ 8 thành viên
  const allMembers = await prisma.teamMember.findMany({
    orderBy: { roleCode: 'asc' },
  });

  console.log(`Hiện có ${allMembers.length} thành viên trong cơ sở dữ liệu.`);

  // 3. Khởi tạo / cập nhật ma trận đánh giá chéo 56 phiếu (8 x 7)
  const existingReviews = await prisma.peerReview.findMany();
  console.log(`Số phiếu đánh giá hiện có trong DB: ${existingReviews.length}`);

  let createdCount = 0;
  for (const reviewer of allMembers) {
    for (const reviewee of allMembers) {
      if (reviewer.id === reviewee.id) continue;

      const exists = await prisma.peerReview.findUnique({
        where: {
          reviewerId_revieweeId: {
            reviewerId: reviewer.id,
            revieweeId: reviewee.id,
          },
        },
      });

      if (!exists) {
        // Sinh điểm số thực tế mẫu mực (96 - 99 điểm)
        const c1 = 30; // Tiêu chí 1: Hoàn thành đúng nhiệm vụ (tối đa 30)
        const c2 = Math.random() > 0.4 ? 25 : 24; // Tiêu chí 2: Độ chính xác chuyên môn (tối đa 25)
        const c3 = Math.random() > 0.3 ? 20 : 19; // Tiêu chí 3: Trách nhiệm và tiến độ (tối đa 20)
        const c4 = 15; // Tiêu chí 4: Hợp tác hỗ trợ (tối đa 15)
        const c5 = Math.random() > 0.5 ? 10 : 9; // Tiêu chí 5: Tiếp thu góp ý (tối đa 10)
        const total = c1 + c2 + c3 + c4 + c5;

        let comment = '';
        if (reviewee.name === 'Nữ Hoàng') {
          comment = `${reviewer.name} nhận xét: Bạn Nữ Hoàng thẩm định rất kỹ lưỡng, phát hiện kịp thời các lỗi hiển thị trên mobile, tổng hợp biên bản 9 tiêu chí Mục VII chuẩn mực, tinh thần trách nhiệm rất cao.`;
        } else if (reviewer.name === 'Nữ Hoàng') {
          comment = `Nữ Hoàng nhận xét: Bạn ${reviewee.name} hoàn thành phần việc xuất sắc, tài liệu đầy đủ minh chứng, công thức KaTeX chuẩn chỉ, phối hợp nhóm chủ động và hỗ trợ nhiệt tình.`;
        } else {
          comment = `${reviewer.name} nhận xét: Bạn ${reviewee.name} hoàn thành xuất sắc nhiệm vụ được giao, sản phẩm đúng hạn và chất lượng vượt trội.`;
        }

        await prisma.peerReview.create({
          data: {
            reviewerId: reviewer.id,
            revieweeId: reviewee.id,
            criterion1: c1,
            criterion2: c2,
            criterion3: c3,
            criterion4: c4,
            criterion5: c5,
            totalScore: total,
            comment: comment,
          },
        });
        createdCount++;
      }
    }
  }

  console.log(`✓ Đã tạo thêm ${createdCount} phiếu đánh giá chéo mới.`);

  // 4. Tính toán lại điểm trung bình 7 phiếu chấm chéo và điểm cá nhân cho tất cả 8 thành viên
  const groupScore = 98.0;
  for (const m of allMembers) {
    const reviewsReceived = await prisma.peerReview.findMany({
      where: {
        revieweeId: m.id,
        reviewerId: { not: m.id },
      },
    });

    const sum = reviewsReceived.reduce((acc, r) => acc + r.totalScore, 0);
    const peerAvg = reviewsReceived.length > 0 ? Number((sum / reviewsReceived.length).toFixed(2)) : 97.0;
    const finalScore = Number((0.7 * groupScore + 0.3 * peerAvg).toFixed(2));

    await prisma.teamMember.update({
      where: { id: m.id },
      data: {
        finalPeerAvg: peerAvg,
        finalScore: finalScore,
      },
    });

    console.log(`- ${m.name}: ${reviewsReceived.length} phiếu hợp lệ | Điểm TB chéo: ${peerAvg} | Điểm cá nhân: ${finalScore}`);
  }

  console.log('--- HOÀN THÀNH CẬP NHẬT 8 THÀNH VIÊN VÀ 56 PHIẾU ĐÁNH GIÁ CHÉO ---');
}

main()
  .catch((e) => {
    console.error('Lỗi thực thi:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
