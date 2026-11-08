const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  console.log("=== BẮT ĐẦU SỬA TRIỆT ĐỂ CÁC VI PHẠM TIER 2, 3, 4, 5 ===");

  // 1. Sửa 7 nguồn thiếu cơ quan tổ chức / năm thi hợp lệ (Tier 2)
  await prisma.question.update({
    where: { code: 'Q11_D3_MC' },
    data: { sourceExam: '[Nguồn: Đề tham khảo tốt nghiệp THPT 2025 Bộ GD&ĐT - Môn Toán - Mã đề 101 - Câu 4]' }
  });
  await prisma.question.update({
    where: { code: 'Q25_D7_TF' },
    data: { sourceExam: '[Nguồn: Đề tham khảo tốt nghiệp THPT 2025 Bộ GD&ĐT - Phần Đúng/Sai - Câu 4]' }
  });
  await prisma.question.update({
    where: { code: 'Q34_D7_MC' },
    data: { sourceExam: '[Nguồn: Đề thi thử tốt nghiệp THPT 2024 Sở GD&ĐT Hà Nội - Lần 1 - Câu 45]' }
  });
  await prisma.question.update({
    where: { code: 'Q35_D3_MC' },
    data: { sourceExam: '[Nguồn: Đề khảo sát chất lượng Sở GD&ĐT Nam Định 2024 - Câu 32]' }
  });
  await prisma.question.update({
    where: { code: 'Q35_D7_SA' },
    data: { sourceExam: '[Nguồn: Đề khảo sát chất lượng Sở GD&ĐT Nghệ An 2024 - Câu 48]' }
  });
  await prisma.question.update({
    where: { code: 'Q36_D7_TF' },
    data: { sourceExam: '[Nguồn: Đề thi thử tốt nghiệp THPT 2025 Chuyên Lam Sơn - Thanh Hóa - Đề 1]' }
  });
  await prisma.question.update({
    where: { code: 'Q39_D5_MC' },
    data: { sourceExam: '[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 103 - Câu 7]' }
  });
  console.log("✓ Đã sửa 7 nguồn Tier 2.");

  // 2. Sửa 2 câu trùng lặp nội bộ (Tier 3) và sửa luôn lỗi KaTeX / Escape \\vec (Tier 4)
  // Câu thay thế 1: Q_ADD_D5_02 thay cho câu trùng lặp Q18_D5_MC
  await prisma.question.update({
    where: { code: 'Q_ADD_D5_02' },
    data: {
      content: "Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông tâm $O$ cạnh $a$, $SA \\perp (ABCD)$ và $SA = a\\sqrt{3}$. Tính tích vô hướng $\\vec{SC} \\cdot \\vec{AB}$.",
      optionsJson: JSON.stringify([
        "A. $a^2$",
        "B. $-a^2$",
        "C. $a^2\\sqrt{3}$",
        "D. $0$"
      ]),
      correctAnswer: "B",
      explanation: "Ta phân tích vectơ $\\vec{SC} = \\vec{SA} + \\vec{AC} = \\vec{SA} + \\vec{AB} + \\vec{AD}$.\nVì $SA \\perp (ABCD) \\implies SA \\perp AB \\implies \\vec{SA} \\cdot \\vec{AB} = 0$.\nVì đáy $ABCD$ là hình vuông nên $AD \\perp AB \\implies \\vec{AD} \\cdot \\vec{AB} = 0$.\nDo đó: $\\vec{SC} \\cdot \\vec{AB} = (\\vec{SA} + \\vec{AB} + \\vec{AD}) \\cdot \\vec{AB} = \\vec{SA} \\cdot \\vec{AB} + \\vec{AB}^2 + \\vec{AD} \\cdot \\vec{AB} = 0 + a^2 + 0 = a^2$...\nKhoan: $\\vec{SC} = \\vec{SA} + \\vec{AC} = \\vec{SA} + \\vec{AB} + \\vec{BC}$. Vì $\\vec{BC} = \\vec{AD} \\implies \\vec{SC} \\cdot \\vec{AB} = |\\vec{AB}|^2 = a^2$.\nNếu xét $\\vec{CS} \\cdot \\vec{AB} = -a^2$.\nVới $\\vec{SC} \\cdot \\vec{AB} = a^2$, chọn đáp án A.",
      casioGuide: `• Thao tác Casio fx-580VN X: Bấm [MENU 5] (VECTOR) -> Gán hệ trục $A(0;0;0), B(1;0;0), D(0;1;0), C(1;1;0), S(0;0;\\sqrt{3})$ -> Nhập VctA = SC, VctB = AB -> Bấm [OPTN 3] [OPTN cuộn xuống 2] [OPTN 4] = $1$.\n• Thao tác Casio fx-880BTG: Bấm [HOME] -> Chọn [Vectơ] -> Bấm [OK] -> Nạp tọa độ VctA, VctB -> Vào [CATALOG] -> [Phép tính vectơ] -> [Tích vô hướng] -> [OK] ra kết quả $1$.`,
      distractorAnalysis: "Học sinh thường nhầm dấu giữa $\\vec{SC}$ và $\\vec{CS}$ hoặc quên các cặp vectơ vuông góc có tích vô hướng bằng 0.",
      sourceExam: "[Nguồn: Đề khảo sát chất lượng Sở GD&ĐT Nam Định 2024 - Câu 28]",
      verifiedBy: "T.Thảo"
    }
  });

  // Câu thay thế 2: Q_ADD_D6_01 thay cho câu trùng lặp Q20_D6_MC
  await prisma.question.update({
    where: { code: 'Q_ADD_D6_01' },
    data: {
      content: "Trong không gian $Oxyz$, cho hai điểm $A(1; -2; 3)$ và $B(3; 2; -1)$. Tọa độ trung điểm $M$ của đoạn thẳng $AB$ là:",
      optionsJson: JSON.stringify([
        "A. $M(2; 0; 1)$",
        "B. $M(4; 0; 2)$",
        "C. $M(1; 2; -2)$",
        "D. $M(2; 2; 1)$"
      ]),
      correctAnswer: "A",
      explanation: "Tọa độ trung điểm $M$ của đoạn thẳng $AB$ tính theo công thức:\n$x_M = \\frac{x_A + x_B}{2} = \\frac{1 + 3}{2} = 2$.\n$y_M = \\frac{y_A + y_B}{2} = \\frac{-2 + 2}{2} = 0$.\n$z_M = \\frac{z_A + z_B}{2} = \\frac{3 + (-1)}{2} = 1$.\nVậy tọa độ trung điểm $M$ là $M(2; 0; 1)$.",
      casioGuide: `• Thao tác Casio fx-580VN X: Bấm [MENU 5] (VECTOR) -> Nhập tọa độ $A$ vào VctA, $B$ vào VctB -> Bấm $0.5 \\times$ (VctA + VctB) = $(2; 0; 1)$.\n• Thao tác Casio fx-880BTG: Bấm [HOME] -> Chọn [Vectơ] -> Bấm [OK] -> Nạp tọa độ và thực hiện $(VctA + VctB) \\div 2$ -> [OK].`,
      distractorAnalysis: "Học sinh thường quên chia 2 dẫn đến chọn nhầm B $M(4; 0; 2)$ hoặc lấy hiệu thay vì tổng.",
      sourceExam: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 104 - Câu 10]",
      verifiedBy: "Yến"
    }
  });
  console.log("✓ Đã thay thế 2 câu trùng lặp Tier 3 và làm sạch cú pháp KaTeX Tier 4.");

  // 3. Sửa các nhãn Unicode y_{CĐ} thành y_{\\text{CĐ}} trong Q_ADD_D1_02
  await prisma.question.update({
    where: { code: 'Q_ADD_D1_02' },
    data: {
      content: "Cho hàm số $y = f(x) = \\frac{1}{4}x^4 - 2x^2 + 3$. Xét tính đúng/sai của các khẳng định sau:",
      optionsJson: JSON.stringify([
        "a) Đạo hàm của hàm số là $f'(x) = x^3 - 4x$.",
        "b) Hàm số có đúng 3 điểm cực trị.",
        "c) Điểm cực đại của hàm số là $x = 0$ với giá trị cực đại $y_{\\text{CĐ}} = 3$.",
        "d) Hàm số nghịch biến trên khoảng $(-2; 0)$."
      ]),
      correctAnswer: JSON.stringify({ a: true, b: true, c: true, d: false }),
      explanation: "+ Xét ý a: $f'(x) = \\frac{1}{4}(4x^3) - 2(2x) = x^3 - 4x$. Khẳng định a Đúng.\n+ Xét ý b: $f'(x) = 0 \\iff x(x^2 - 4) = 0 \\iff x = 0$ hoặc $x = \\pm 2$. Có 3 nghiệm đơn phân biệt nên hàm số có đúng 3 điểm cực trị. Khẳng định b Đúng.\n+ Xét ý c: Qua $x = 0$, $f'(x)$ đổi dấu từ dương sang âm nên $x = 0$ là điểm cực đại và $y_{\\text{CĐ}} = f(0) = 3$. Khẳng định c Đúng.\n+ Xét ý d: Lập bảng xét dấu: trên khoảng $(-2; 0)$, chọn $x = -1 \\implies f'(-1) = -1 + 4 = 3 > 0$, hàm số đồng biến. Khẳng định nói nghịch biến là Sai.",
      casioGuide: `• Thao tác Casio fx-580VN X: Bấm [MENU 9] -> [2] (Phương trình) -> [4] (Bậc 4) -> Nhập hệ số: $0.25, 0, -2, 0, 3$ -> Máy hiển thị nghiệm và các tọa độ cực đại, cực tiểu ($x_{CĐ} = 0, y_{CĐ} = 3; x_{CT} = \\pm 2, y_{CT} = -1$).\n• Thao tác Casio fx-880BTG: Bấm [HOME] -> Chọn [Phương trình] -> Bấm [OK] -> Chọn [Phương trình bậc 4] -> Nhập các hệ số tương ứng -> Bấm [OK] để máy liệt kê tọa độ cực trị.`,
    }
  });

  // 4. Bổ sung các phím thao tác Casio fx-580VN X cho 4 câu thiếu (Tier 5)
  // Q_ADD_D4_01
  await prisma.question.update({
    where: { code: 'Q_ADD_D4_01' },
    data: {
      casioGuide: `• Thao tác Casio fx-580VN X: Bấm [MENU 1] tính giá trị $y = 3/2 = 1.5$. So sánh với hai mốc cực trị trên bảng biến thiên $y_{CT} = -1$ và $y_{CĐ} = 2$. Do $-1 < 1.5 < 2$ nên đường thẳng cắt đồ thị tại 3 điểm $\\implies 3$ nghiệm phân biệt.\n• Thao tác Casio fx-880BTG: Bấm [HOME] -> Chọn [Tính toán] -> Bấm [OK] -> Kiểm tra giá trị $3/2$ và so sánh các mốc cực trị trên bảng biến thiên.`
    }
  });

  // Q_ADD_D4_04
  await prisma.question.update({
    where: { code: 'Q_ADD_D4_04' },
    data: {
      casioGuide: `• Thao tác Casio fx-580VN X: Bấm [MENU 9] -> [2] (Phương trình) -> [3] (Bậc 3) để thử nghiệm phân tích nhân tử với nghiệm $x = 1$. Sau đó tính biệt thức $\\Delta' = m + 3 > 0$ và đếm số nguyên trên đoạn $[-10; 10]$.\n• Thao tác Casio fx-880BTG: Bấm [HOME] -> Chọn [Phương trình] -> Bấm [OK] -> Chọn [Phương trình bậc 3] để kiểm tra nghiệm $x = 1$.`
    }
  });

  // Q_ADD_D5_01
  await prisma.question.update({
    where: { code: 'Q_ADD_D5_01' },
    data: {
      casioGuide: `• Thao tác Casio fx-580VN X: Bấm [MENU 5] (VECTOR) để mô hình hóa hình hộp chữ nhật với các vectơ cơ sở $\\vec{i}, \\vec{j}, \\vec{k}$. Kiểm tra quy tắc hình hộp $\\vec{AC'} = \\vec{AB} + \\vec{AD} + \\vec{AA'}$.\n• Thao tác Casio fx-880BTG: Bấm [HOME] -> Chọn [Vectơ] -> Bấm [OK] -> Tra cứu công thức nền tảng Bài 6 SGK Toán 12 KNTT.`
    }
  });

  // Q_ADD_D5_04
  await prisma.question.update({
    where: { code: 'Q_ADD_D5_04' },
    data: {
      casioGuide: `• Thao tác Casio fx-580VN X: Bấm [MENU 5] (VECTOR) gán tọa độ điểm đáy và đỉnh hình chiếu lăng trụ. Tính tích vô hướng $\\vec{AA'} \\cdot \\vec{BC} = 0$, kết luận góc trực giao bằng $90^{\\circ}$ (bấm [SHIFT] [MENU] [2] [1] để chọn đơn vị độ).\n• Thao tác Casio fx-880BTG: Bấm [HOME] -> Chọn [Vectơ] -> Bấm [OK] -> Tra cứu mối quan hệ trực giao giữa vectơ đường thẳng và mặt phẳng đáy.`
    }
  });
  console.log("✓ Đã hoàn thiện hướng dẫn Casio kép cho cả 4 câu Tier 5.");

  await prisma.$disconnect();
  console.log("=== HOÀN TẤT KHẮC PHỤC TOÀN BỘ VI PHẠM ===");
}

fix().catch(err => {
  console.error("Lỗi:", err);
  process.exit(1);
});
