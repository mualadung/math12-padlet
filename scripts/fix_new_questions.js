const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  console.log('--- KHẮC PHỤC 2 CÂU TRÙNG LẶP VÀ CHUẨN HÓA CASIO KÉP FX-580 & FX-880 ---');

  // 1. Thay thế Q_D1_ADD_03 (Tránh trùng với Mindmap Q25-2024)
  await prisma.question.update({
    where: { code: 'Q_D1_ADD_03' },
    data: {
      content: "Tìm tất cả các giá trị của tham số $m$ để hàm số bậc bốn $y = x^4 - 2(m + 1)x^2 + m^2$ có 3 điểm cực trị tạo thành 3 đỉnh của một tam giác có diện tích bằng 1.",
      optionsJson: JSON.stringify([
        "A. $m = 0$",
        "B. $m = 1$",
        "C. $m = -1$",
        "D. $m = 2$"
      ]),
      correctAnswer: "A",
      explanation: "Đạo hàm: $y' = 4x^3 - 4(m + 1)x = 4x(x^2 - (m + 1))$. Hàm số có 3 điểm cực trị $\\iff m + 1 > 0 \\iff m > -1$. Ba điểm cực trị là $A(0; m^2), B(\\sqrt{m+1}; -2m - 1), C(-\\sqrt{m+1}; -2m - 1)$. Tam giác $ABC$ cân tại $A$, cạnh đáy $BC = 2\\sqrt{m+1}$, chiều cao $AH = m^2 - (-2m - 1) = (m + 1)^2$. Diện tích: $S = \\frac{1}{2} BC \\cdot AH = \\sqrt{m+1} \\cdot (m+1)^2 = (m+1)^{5/2} = 1 \\iff m + 1 = 1 \\iff m = 0$ (nhận vì $0 > -1$).",
      distractorAnalysis: "Học sinh quên điều kiện hàm số có 3 cực trị m > -1 hoặc tính sai khoảng cách chiều cao AH.",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 1 kiểm tra (m+1)^5 = 1 với m = 0.\nCasio fx-880BTG: Dùng màn hình [HOME] -> Phép tính số -> Thử m = 0, nhấn [OK].",
      sourceExam: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2021 - Mã đề 104 - Câu 45]",
    },
  });
  console.log('✓ Đã cập nhật Q_D1_ADD_03.');

  // 2. Thay thế Q_D5_ADD_03 (Tránh trùng với Mindmap Q32-2024)
  await prisma.question.update({
    where: { code: 'Q_D5_ADD_03' },
    data: {
      content: "Cho hình lăng trụ đứng $ABC.A'B'C'$ có đáy $ABC$ là tam giác vuông cân tại $A$ với $AB = a$, cạnh bên $AA' = a\\sqrt{2}$. Tính góc giữa hai vectơ $\\vec{BC}$ và $\\vec{A'C'}$.",
      optionsJson: JSON.stringify([
        "A. $45^\\circ$",
        "B. $135^\\circ$",
        "C. $60^\\circ$",
        "D. $90^\\circ$"
      ]),
      correctAnswer: "A",
      explanation: "Vì $ABC.A'B'C'$ là hình lăng trụ đứng nên mặt phẳng đáy $(ABC)$ song song với đáy $(A'B'C')$, suy ra $\\vec{A'C'} = \\vec{AC}$. Do đó: $(\\vec{BC}, \\vec{A'C'}) = (\\vec{BC}, \\vec{AC})$. Trong tam giác $ABC$ vuông cân tại $A$, góc $\\widehat{ACB} = 45^\\circ$. Chú ý hướng của hai vectơ: $\\vec{CB} \\cdot \\vec{CA} = |CB||CA|\\cos 45^\\circ$. Hai vectơ $\\vec{BC}$ và $\\vec{AC}$ có đuôi $C$ nối tiếp: $\\vec{BC} \\cdot \\vec{AC} = -\\vec{CB} \\cdot \\vec{AC} = -(-\\vec{CB} \\cdot \\vec{CA}) = CB \\cdot CA \\cos 45^\\circ > 0$. Vậy góc giữa hai vectơ là $45^\\circ$.",
      distractorAnalysis: "Học sinh chọn 135 độ vì nhầm hướng ngược chiều của một trong hai vectơ.",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 5 gán tọa độ -> [OPTN] 3 tính Angle(VctA, VctB) = 45 độ.\nCasio fx-880BTG: Dùng [HOME] -> Ứng dụng Vectơ -> Phép tính vectơ -> Góc giữa 2 vectơ, nhấn [OK].",
      sourceExam: "[Nguồn: Đề thi thử tốt nghiệp THPT 2024 Sở GD&ĐT Vĩnh Phúc - Câu 32]",
    },
  });
  console.log('✓ Đã cập nhật Q_D5_ADD_03.');

  // 3. Chuẩn hóa Casio cho các câu còn lại
  const casioUpdates = [
    {
      code: "Q_D1_ADD_04",
      guide: "Casio fx-580VN X: Bấm [MENU] 9 -> 2 -> 2 giải phương trình bậc hai (x - 1)^2 = 2 - m để tìm điều kiện có 2 nghiệm phân biệt.\nCasio fx-880BTG: Dùng [HOME] -> Phương trình bậc hai -> Nhập hệ số và nhấn [OK]."
    },
    {
      code: "Q_D3_ADD_01",
      guide: "Casio fx-580VN X: Nhập phân thức -> Bấm [CALC] x = 10^9 ra kết quả xấp xỉ 3 -> Tiệm cận ngang y = 3.\nCasio fx-880BTG: Bấm [HOME] -> Phép tính số -> Nhập hàm số -> Bấm [TOOLS] hoặc [VARIABLE] gán x = 10^9, nhấn [OK]."
    },
    {
      code: "Q_D3_ADD_02",
      guide: "Casio fx-580VN X: Bấm [MENU] 1 -> Hệ số a = lim y/x (CALC 10^9) = 2; b = lim (y - 2x) = -3 -> Tiệm cận xiên y = 2x - 3.\nCasio fx-880BTG: Bấm [HOME] -> Phép tính số -> Dùng phím [TOOLS] gán x = 10^9 để tính giới hạn hệ số a và b, nhấn [OK]."
    },
    {
      code: "Q_D3_ADD_03",
      guide: "Casio fx-580VN X: Bấm [CALC] x = 10^9 ra 2; [CALC] x = -10^9 ra -2 -> Có 2 tiệm cận ngang y = 2 và y = -2.\nCasio fx-880BTG: Bấm [HOME] -> Phép tính số -> Gán x = 10^9 và x = -10^9 bằng [TOOLS], nhấn [OK] để đọc kết quả 2 và -2."
    },
    {
      code: "Q_D3_ADD_04",
      guide: "Casio fx-580VN X: Bấm [CALC] x = 2 + 10^-6 ra -1 (hữu hạn, loại); Bấm [CALC] x = 3 + 10^-6 ra 10^6 (vô cực) -> Có 1 TCĐ x = 3.\nCasio fx-880BTG: Bấm [HOME] -> Phép tính số -> Dùng [TOOLS] thử x = 3 + 10^-6 để kiểm tra giới hạn vô cực, nhấn [OK]."
    },
    {
      code: "Q_D4_ADD_01",
      guide: "Casio fx-580VN X: Bấm [MENU] 1 kiểm tra nhanh ad - bc: 2(-1) - (-3)(1) = 1 > 0 chọn A.\nCasio fx-880BTG: Bấm [HOME] -> Phép tính số -> Tính nhẩm tích chéo ad - bc > 0 và nhấn [OK]."
    },
    {
      code: "Q_D4_ADD_03",
      guide: "Casio fx-580VN X: Bấm [MENU] 9 -> 2 -> 2 giải phương trình hoành độ giao điểm x^2 - (m-1)x + m + 1 = 0 với m = 0 để kiểm tra nghiệm.\nCasio fx-880BTG: Bấm [HOME] -> Phương trình bậc hai -> Nhập hệ số và nhấn [OK]."
    },
    {
      code: "Q_D4_ADD_04",
      guide: "Casio fx-580VN X: Bấm [MENU] 8 lập bảng giá trị của hàm số f(x^2) với Step 0.5 để quan sát 4 giao điểm.\nCasio fx-880BTG: Bấm [HOME] -> Bảng giá trị -> Nhập hàm số và nhấn [OK] để xem bảng giá trị."
    },
    {
      code: "Q_D5_ADD_02",
      guide: "Casio fx-580VN X: Bấm [MENU] 1 ghi nhớ hệ số 1/4 cho trọng tâm tứ diện 4 đỉnh: OG = (OA + OB + OC + OD)/4.\nCasio fx-880BTG: Bấm [HOME] -> Phép tính số -> Nắm chắc công thức vectơ không gian và nhấn [OK]."
    },
    {
      code: "Q_D5_ADD_04",
      guide: "Casio fx-580VN X: Bấm [MENU] 1 -> Bấm SHIFT COS (1 / căn(3)) = 54.7356 độ -> Chọn 54,7 độ.\nCasio fx-880BTG: Bấm [HOME] -> Phép tính số -> Bấm [CATALOG] -> Lượng giác -> arccos(1/căn(3)), nhấn [OK]."
    },
    {
      code: "Q_D6_ADD_02",
      guide: "Casio fx-580VN X: Bấm [MENU] 5 gán VctA(1,2,0), VctB(-1,1,3), VctC(0,-2,5) -> Tọa độ D = VctA + VctC - VctB = (2; -1; 2).\nCasio fx-880BTG: Bấm [HOME] -> Ứng dụng Vectơ -> Tính VctA + VctC - VctB, nhấn [OK]."
    },
    {
      code: "Q_D6_ADD_03",
      guide: "Casio fx-580VN X: Bấm [MENU] 1 giải phương trình tích vô hướng 5m - 2 = 0 ra m = 2/5.\nCasio fx-880BTG: Bấm [HOME] -> Phép tính số -> Giải phương trình 5x - 2 = 0 và nhấn [OK]."
    },
    {
      code: "Q_D6_ADD_04",
      guide: "Casio fx-580VN X: Bấm [MENU] 1 tính thể tích tứ diện vuông V = (1/6) * 1 * 2 * 4 = 4/3.\nCasio fx-880BTG: Bấm [HOME] -> Phép tính số -> Nhập (1/6)*1*2*4 và nhấn [OK]."
    },
    {
      code: "Q_D7_ADD_01",
      guide: "Casio fx-580VN X: Bấm [MENU] 1 tính (120 * 80) / căn(120^2 + 80^2) = 240 / căn(13) approx 66.56 km.\nCasio fx-880BTG: Bấm [HOME] -> Phép tính số -> Nhập biểu thức đường cao tam giác vuông và nhấn [OK]."
    },
    {
      code: "Q_D7_ADD_02",
      guide: "Casio fx-580VN X: Bấm [MENU] 1 tính căn(9^2 + 12^2 + 15^2) + căn(12^2 + 16^2 + 15^2) = 15*căn(2) + 25 approx 46.21 -> 46.2.\nCasio fx-880BTG: Bấm [HOME] -> Phép tính số -> Nhập tổng hai căn bậc hai và nhấn [OK]."
    },
    {
      code: "Q_D7_ADD_03",
      guide: "Casio fx-580VN X: Bấm [MENU] 1 tính khoảng cách từ điểm A(2, 3, -4) đến mặt phẳng (Oxy): d = |-4| = 4 km.\nCasio fx-880BTG: Bấm [HOME] -> Phép tính số -> Đọc trị tuyệt đối cao độ z và nhấn [OK]."
    },
    {
      code: "Q_D7_ADD_04",
      guide: "Casio fx-580VN X: Bấm [MENU] 1 tính cao độ trọng tâm z_G = (6 + 0 + 0)/3 = 2 mét.\nCasio fx-880BTG: Bấm [HOME] -> Phép tính số -> Tính (6 + 0 + 0)/3 và nhấn [OK]."
    }
  ];

  for (const item of casioUpdates) {
    await prisma.question.update({
      where: { code: item.code },
      data: { casioGuide: item.guide },
    });
  }

  console.log(`✓ Đã chuẩn hóa hướng dẫn Casio kép fx-580 & fx-880 cho ${casioUpdates.length} câu hỏi.`);
}

fix()
  .catch(e => {
    console.error('Lỗi:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
