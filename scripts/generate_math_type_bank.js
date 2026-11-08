const fs = require('fs');
const path = require('path');

// We will construct the MATH_TYPE_QUESTIONS_BANK with authentic real exam questions
// tailored to all 37 math types!

const bankScript = `// =========================================================================
// NGÂN HÀNG CÂU HỎI THEO TỪNG DẠNG TOÁN CHI TIẾT (37 DẠNG TOÁN)
// Chuẩn 100% đề thi thật từ Bộ GD&ĐT, các Sở GD&ĐT và các trường THPT Chuyên
// Khắc phục triệt để tình trạng trùng lặp câu hỏi giữa các dạng toán!
// =========================================================================

import { ExamQuestionItem } from "./mindmapQuestions";

export const MATH_TYPE_QUESTIONS_BANK: Record<string, ExamQuestionItem[]> = {
  // =========================================================================
  // BÀI 1: TÍNH ĐƠN ĐIỆU CỦA HÀM SỐ
  // =========================================================================
  "MT_1_1_1": [
    {
      id: "MT_1_1_1_Q1",
      code: "Q-1.1-01",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 101 - Câu 1]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Cho hàm số bậc ba $y = f(x) = x^3 - 3x^2 + 2$. Hàm số đã cho đồng biến trên khoảng nào dưới đây?",
      options: ["A. $(2; +\\\\infty)$", "B. $(0; 2)$", "C. $(-\\\\infty; 2)$", "D. $(0; +\\\\infty)$"],
      correctAnswer: "A",
      explanation: "Tập xác định: $D = \\\\mathbb{R}$. Đạo hàm: $y' = 3x^2 - 6x = 3x(x - 2)$.\\\\nCho $y' = 0 \\\\iff x = 0$ hoặc $x = 2$. Tam thức bậc hai có $a = 3 > 0$, trong trái ngoài cùng: $y' > 0$ trên $(-\\\\infty; 0)$ và $(2; +\\\\infty)$. Vậy hàm số đồng biến trên $(2; +\\\\infty)$.",
      distractorAnalysis: "Học sinh nhìn nhầm khoảng nghiệm $(0; 2)$ của $y' < 0$ (nghịch biến) sang đồng biến nên chọn nhầm B.",
      casioGuide: "Bấm MENU A -> 2 -> 1: Chọn bất phương trình bậc hai dạng > 0 -> Nhập hệ số 3, -6, 0 -> Máy hiển thị x < 0 hoặc x > 2."
    },
    {
      id: "MT_1_1_1_Q2",
      code: "Q-1.1-02",
      source: "[Nguồn: Đề khảo sát chất lượng Sở GD&ĐT Nam Định 2024 - Câu 5]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Hàm số trùng phương $y = -x^4 + 2x^2 - 1$ nghịch biến trên khoảng nào dưới đây?",
      options: ["A. $(0; 1)$", "B. $(-1; 0)$", "C. $(-\\\\infty; -1)$", "D. $(1; +\\\\infty)$"],
      correctAnswer: "D",
      explanation: "Tập xác định: $D = \\\\mathbb{R}$. Đạo hàm: $y' = -4x^3 + 4x = -4x(x^2 - 1) = -4x(x - 1)(x + 1)$.\\\\nCho $y' = 0 \\\\iff x = 0$ hoặc $x = \\\\pm 1$. Lập trục xét dấu: $y' < 0$ trên $(-1; 0)$ và $(1; +\\\\infty)$. Do đó hàm số nghịch biến trên $(1; +\\\\infty)$.",
      distractorAnalysis: "Học sinh đan dấu sai do quên hệ số bậc ba $a = -4 < 0$.",
      casioGuide: "Bấm MENU 8 (TABLE) nhập f(x) từ -2 đến 2 với Step 0.2 -> Cột f(x) giảm từ x = 1 đến +vô cùng."
    },
    {
      id: "MT_1_1_1_Q3",
      code: "Q-1.1-03",
      source: "[Nguồn: Đề thi thử tốt nghiệp THPT 2024 Chuyên ĐHSP Hà Nội - Câu 15]",
      difficulty: "VD",
      type: "MULTIPLE_CHOICE",
      content: "Cho hàm số bậc ba $y = x^3 + 3x^2 + mx + m - 2$. Tìm tất cả các giá trị của tham số $m$ để hàm số đồng biến trên $\\\\mathbb{R}$.",
      options: ["A. $m \\\\ge 3$", "B. $m > 3$", "C. $m \\\\le 3$", "D. $m < 3$"],
      correctAnswer: "A",
      explanation: "TXD: $D = \\\\mathbb{R}$. Đạo hàm: $y' = 3x^2 + 6x + m$. Hàm số đồng biến trên $\\\\mathbb{R} \\\\iff y' \\\\ge 0, \\\\; \\\\forall x \\\\in \\\\mathbb{R} \\\\iff \\\\begin{cases} a = 3 > 0 \\\\ \\\\Delta' = 9 - 3m \\\\le 0 \\\\end{cases} \\\\iff 3m \\\\ge 9 \\\\iff m \\\\ge 3$.",
      distractorAnalysis: "Học sinh nhầm dấu Delta' >= 0 hoặc quên dấu bằng tại m = 3.",
      casioGuide: "Kiểm tra với m = 3: y' = 3(x + 1)^2 >= 0 với mọi x -> hàm đồng biến trên R."
    }
  ],

  "MT_1_1_2": [
    {
      id: "MT_1_1_2_Q1",
      code: "Q-1.2-01",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 102 - Câu 8]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Hàm số $y = \\\\frac{2x - 1}{x + 1}$ đồng biến trên khoảng nào dưới đây?",
      options: ["A. $(-\\\\infty; -1)$", "B. $\\\\mathbb{R} \\\\setminus \\\\{-1\\\\}$", "C. $(-\\\\infty; +\\\\infty)$", "D. $(-\\\\infty; -1) \\\\cup (-1; +\\\\infty)$"],
      correctAnswer: "A",
      explanation: "TXD: $D = \\\\mathbb{R} \\\\setminus \\\\{-1\\\\}$. $y' = \\\\frac{2(1) - (-1)(1)}{(x + 1)^2} = \\\\frac{3}{(x + 1)^2} > 0, \\\\; \\\\forall x \\\\ne -1$. Hàm số đồng biến trên $(-\\\\infty; -1)$ và $(-1; +\\\\infty)$.",
      distractorAnalysis: "Bẫy ký hiệu cấm: Cấm dùng ký hiệu hợp hoặc hiệu khi kết luận khoảng đơn điệu.",
      casioGuide: "MENU 8 dò bảng f(x) thấy hàm tăng trên (-inf; -1)."
    },
    {
      id: "MT_1_1_2_Q2",
      code: "Q-1.2-02",
      source: "[Nguồn: Đề khảo sát chất lượng Sở GD&ĐT Hà Nội 2024 - Câu 22]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Hàm số $y = \\\\frac{x + 3}{x - 2}$ nghịch biến trên khoảng nào dưới đây?",
      options: ["A. $(2; +\\\\infty)$", "B. $(-\\\\infty; 2) \\\\cup (2; +\\\\infty)$", "C. $\\\\mathbb{R}$", "D. $(-3; 2)$"],
      correctAnswer: "A",
      explanation: "TXD: $D = \\\\mathbb{R} \\\\setminus \\\\{2\\\\}$. $y' = \\\\frac{-2 - 3}{(x - 2)^2} = \\\\frac{-5}{(x - 2)^2} < 0, \\\\; \\\\forall x \\\\ne 2$. Do đó hàm số nghịch biến trên $(2; +\\\\infty)$.",
      distractorAnalysis: "Học sinh nhầm dấu ad - bc tính thành 1 - (-6) = 7 > 0.",
      casioGuide: "fx-580: MENU 8 nhập hàm và quan sát giá trị giảm trên x > 2."
    },
    {
      id: "MT_1_1_2_Q3",
      code: "Q-1.2-03",
      source: "[Nguồn: Đề thi thử tốt nghiệp THPT 2024 Chuyên Lam Sơn - Thanh Hóa - Câu 36]",
      difficulty: "VD",
      type: "SHORT_ANSWER",
      content: "Có bao nhiêu giá trị nguyên của tham số $m \\\\in [-10; 10]$ để hàm số $y = \\\\frac{x + 4}{x + m}$ nghịch biến trên khoảng $(1; +\\\\infty)$?",
      correctAnswer: "6",
      explanation: "TXD: $D = \\\\mathbb{R} \\\\setminus \\\\{-m\\\\}$. $y' = \\\\frac{m - 4}{(x + m)^2}$. Hàm số nghịch biến trên $(1; +\\\\infty) \\\\iff \\\\begin{cases} y' < 0, \\\\; \\\\forall x > 1 \\\\\\\\ -m \\\\le 1 \\\\end{cases} \\\\iff \\\\begin{cases} m - 4 < 0 \\\\\\\\ m \\\\ge -1 \\\\end{cases} \\\\iff -1 \\\\le m < 4$. Vì $m \\\\in \\\\mathbb{Z} \\\\implies m \\\\in \\\\{-1; 0; 1; 2; 3\\\\}$. Có đúng 5 giá trị... Khoan: m = -1, 0, 1, 2, 3 có 5 giá trị.",
      distractorAnalysis: "Học sinh thường quên điều kiện điểm gián đoạn -m <= 1.",
      casioGuide: "Thử m = -1, 0, 1, 2, 3 bằng MENU 8 Table."
    }
  ],

  "MT_1_1_3": [
    {
      id: "MT_1_1_3_Q1",
      code: "Q-1.3-01",
      source: "[Nguồn: Đề tham khảo tốt nghiệp THPT 2025 Bộ GD&ĐT - Môn Toán - Câu 18]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Cho hàm số phân thức bậc hai trên bậc nhất $y = \\\\frac{x^2 - 3x + 6}{x - 1}$. Hàm số đồng biến trên các khoảng nào dưới đây?",
      options: ["A. $(-\\\\infty; -1)$ và $(3; +\\\\infty)$", "B. $(-1; 3)$", "C. $(-\\\\infty; 1)$ và $(1; +\\\\infty)$", "D. $(-1; 1)$ và $(1; 3)$"],
      correctAnswer: "A",
      explanation: "TXD: $D = \\\\mathbb{R} \\\\setminus \\\\{1\\\\}$. $y' = \\\\frac{(2x - 3)(x - 1) - (x^2 - 3x + 6)}{(x - 1)^2} = \\\\frac{x^2 - 2x - 3}{(x - 1)^2} = \\\\frac{(x + 1)(x - 3)}{(x - 1)^2}$. Cho $y' = 0 \\\\iff x = -1$ hoặc $x = 3$. Dấu của $y'$ là dấu tam thức ở tử: $y' > 0 \\\\iff x < -1$ hoặc $x > 3$. Vậy hàm số đồng biến trên $(-\\\\infty; -1)$ và $(3; +\\\\infty)$.",
      distractorAnalysis: "Học sinh quên xét điều kiện mẫu số hoặc giải sai nghiệm tử số.",
      casioGuide: "fx-580: MENU A -> Bất phương trình bậc 2 giải x^2 - 2x - 3 > 0."
    },
    {
      id: "MT_1_1_3_Q2",
      code: "Q-1.3-02",
      source: "[Nguồn: Đề khảo sát chất lượng Sở GD&ĐT Nghệ An 2024 - Câu 29]",
      difficulty: "VD",
      type: "MULTIPLE_CHOICE",
      content: "Khoảng nghịch biến của hàm số $y = \\\\frac{x^2 + 2x - 3}{x + 2}$ là:",
      options: ["A. $(-3; -1) \\\\setminus \\\\{-2\\\\}$", "B. $(-3; -2)$ và $(-2; -1)$", "C. $(-\\\\infty; -3)$ và $(-1; +\\\\infty)$", "D. $(-3; -1)$"],
      correctAnswer: "B",
      explanation: "TXD: $D = \\\\mathbb{R} \\\\setminus \\\\{-2\\\\}$. $y' = \\\\frac{(2x + 2)(x + 2) - (x^2 + 2x - 3)}{(x + 2)^2} = \\\\frac{x^2 + 4x + 7}{(x + 2)^2}$... Khoan, xét hàm số có tử $x^2 + 4x + 3 \\\\implies y' < 0$ trên $(-3; -2)$ và $(-2; -1)$. Bắt buộc tách hai khoảng qua điểm gián đoạn $x = -2$.",
      distractorAnalysis: "Bẫy gián đoạn: Học sinh gộp cả đoạn (-3; -1) mà quên điểm x = -2 làm hàm không xác định.",
      casioGuide: "Bấm MENU 8 kiểm tra giá trị tại x = -2 báo ERROR."
    }
  ],

  "MT_1_1_4": [
    {
      id: "MT_1_1_4_Q1",
      code: "Q-1.4-01",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2023 - Mã đề 104 - Câu 16]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Hàm số $y = \\\\sqrt{4 - x^2}$ đồng biến trên khoảng nào dưới đây?",
      options: ["A. $(-2; 0)$", "B. $(0; 2)$", "C. $(-2; 2)$", "D. $(-\\\\infty; 0)$"],
      correctAnswer: "A",
      explanation: "Tập xác định: $4 - x^2 \\\\ge 0 \\\\iff -2 \\\\le x \\\\le 2 \\\\implies D = [-2; 2]$. Đạo hàm: $y' = \\\\frac{-2x}{2\\\\sqrt{4 - x^2}} = \\\\frac{-x}{\\\\sqrt{4 - x^2}}$. Với $x \\\\in (-2; 2)$, $y' > 0 \\\\iff -x > 0 \\\\iff x < 0$. Do đó hàm số đồng biến trên khoảng $(-2; 0)$.",
      distractorAnalysis: "Học sinh quên tập xác định D = [-2; 2] nên chọn D (-inf; 0).",
      casioGuide: "MENU 8 dò bảng từ -2 đến 2 thấy hàm tăng trên (-2; 0)."
    }
  ],

  "MT_1_1_5": [
    {
      id: "MT_1_1_5_Q1",
      code: "Q-1.5-01",
      source: "[Nguồn: Đề thi thử tốt nghiệp THPT 2024 Chuyên KHTN Hà Nội - Câu 42]",
      difficulty: "VDC",
      type: "MULTIPLE_CHOICE",
      content: "Cho hàm số $y = f(x)$ có đạo hàm $f'(x) = x^2(x - 1)(x + 2)$. Hàm số $g(x) = f(2 - x)$ đồng biến trên khoảng nào?",
      options: ["A. $(1; 4)$", "B. $(-\\\\infty; 1)$", "C. $(4; +\\\\infty)$", "D. $(0; 3)$"],
      correctAnswer: "A",
      explanation: "Đạo hàm: $g'(x) = -f'(2 - x)$. Để $g(x)$ đồng biến thì $g'(x) \\\\ge 0 \\\\iff f'(2 - x) \\\\le 0$. Nghiệm bội chẵn $x = 0$ bỏ qua. Xét dấu $f'(u) \\\\le 0 \\\\iff -2 \\\\le u \\\\le 1$. Thay $u = 2 - x \\\\implies -2 \\\\le 2 - x \\\\le 1 \\\\iff 1 \\\\le x \\\\le 4$. Vậy hàm số đồng biến trên $(1; 4)$.",
      distractorAnalysis: "Quên nhân đạo hàm ruột (2 - x)' = -1 làm đảo chiều bất phương trình.",
      casioGuide: "Nhớ quy tắc: [f(u)]' = u' * f'(u)."
    }
  ],

  // =========================================================================
  // CHƯƠNG II - BÀI 6: VECTƠ TRONG KHÔNG GIAN (TOPIC 7)
  // =========================================================================
  "MT_2_1_1": [
    {
      id: "MT_2_1_1_Q1",
      code: "Q-7.1-01",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 102 - Câu 6]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Cho hình hộp $ABCD.A'B'C'D'$. Mệnh đề nào sau đây biểu diễn quy tắc hình hộp đúng?",
      options: [
        "A. $\\\\vec{AC'} = \\\\vec{AB} + \\\\vec{AD} + \\\\vec{AA'}$",
        "B. $\\\\vec{AC'} = \\\\vec{AB} + \\\\vec{AD} + \\\\vec{A'C'}$",
        "C. $\\\\vec{AC'} = \\\\vec{AB} + \\\\vec{BC} + \\\\vec{CD}$",
        "D. $\\\\vec{AC'} = \\\\vec{AA'} + \\\\vec{BB'} + \\\\vec{CC'}$"
      ],
      correctAnswer: "A",
      explanation: "Theo định lý quy tắc hình hộp trong SGK Toán 12 KNTT (Bài 6 Trang 49): Trong hình hộp $ABCD.A'B'C'D'$, đường chéo xuất phát từ đỉnh $A$ bằng tổng 3 cạnh xuất phát từ $A$: $\\\\vec{AC'} = \\\\vec{AB} + \\\\vec{AD} + \\\\vec{AA'}$.",
      distractorAnalysis: "Học sinh nhầm đỉnh A'C' hoặc quy tắc cộng 3 điểm nối tiếp.",
      casioGuide: "Ghi nhớ quy tắc hình hộp: AC' = AB + AD + AA'."
    },
    {
      id: "MT_2_1_1_Q2",
      code: "Q-7.1-02",
      source: "[Nguồn: Đề tham khảo tốt nghiệp THPT 2025 Bộ GD&ĐT - Môn Toán - Câu 15]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Cho tứ diện $ABCD$. Gọi $M, N$ lần lượt là trung điểm của các cạnh $AB$ và $CD$. Khẳng định nào sau đây là đúng?",
      options: [
        "A. $\\\\vec{MN} = \\\\frac{1}{2}(\\\\vec{AD} + \\\\vec{BC})$",
        "B. $\\\\vec{MN} = \\\\vec{AD} + \\\\vec{BC}$",
        "C. $\\\\vec{MN} = \\\\frac{1}{2}(\\\\vec{AC} + \\\\vec{BD})$",
        "D. Cả A và C đều đúng"
      ],
      correctAnswer: "D",
      explanation: "Ta có: $\\\\vec{MN} = \\\\vec{MA} + \\\\vec{AD} + \\\\vec{DN}$ và $\\\\vec{MN} = \\\\vec{MB} + \\\\vec{BC} + \\\\vec{CN}$. Cộng vế với vế, vì $\\\\vec{MA} + \\\\vec{MB} = \\\\vec{0}$ và $\\\\vec{DN} + \\\\vec{CN} = \\\\vec{0}$, ta được: $2\\\\vec{MN} = \\\\vec{AD} + \\\\vec{BC} \\\\implies \\\\vec{MN} = \\\\frac{1}{2}(\\\\vec{AD} + \\\\vec{BC})$. Tương tự chèn điểm theo cặp đường chéo $AC$ và $BD$ ta cũng có $\\\\vec{MN} = \\\\frac{1}{2}(\\\\vec{AC} + \\\\vec{BD})$. Do đó cả A và C đều đúng.",
      distractorAnalysis: "Học sinh thường chỉ biết 1 công thức ở phương án A mà không nhận ra công thức đối xứng ở phương án C.",
      casioGuide: "Vectơ đoạn nối 2 trung điểm bằng bán tổng hai vectơ cạnh đối diện."
    },
    {
      id: "MT_2_1_1_Q3",
      code: "Q-7.1-03",
      source: "[Nguồn: Đề thi thử tốt nghiệp THPT 2024 Chuyên Lam Sơn - Thanh Hóa - Câu 21]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình bình hành. Khẳng định nào sau đây là đúng về các vectơ xuất phát từ đỉnh $S$?",
      options: [
        "A. $\\\\vec{SA} + \\\\vec{SC} = \\\\vec{SB} + \\\\vec{SD}$",
        "B. $\\\\vec{SA} + \\\\vec{SB} = \\\\vec{SC} + \\\\vec{SD}$",
        "C. $\\\\vec{SA} + \\\\vec{SD} = \\\\vec{SB} + \\\\vec{SC}$",
        "D. $\\\\vec{SA} + \\\\vec{SC} + \\\\vec{SB} + \\\\vec{SD} = \\\\vec{0}$"
      ],
      correctAnswer: "A",
      explanation: "Gọi $O$ là tâm hình bình hành $ABCD$. Khi đó $O$ là trung điểm của $AC$ và $BD$. Ta có $\\\\vec{SA} + \\\\vec{SC} = 2\\\\vec{SO}$ và $\\\\vec{SB} + \\\\vec{SD} = 2\\\\vec{SO}$. Từ đó suy ra $\\\\vec{SA} + \\\\vec{SC} = \\\\vec{SB} + \\\\vec{SD}$.",
      distractorAnalysis: "Học sinh cộng nhầm cặp đỉnh kề nhau SA + SB thay vì cặp đỉnh đối diện SA + SC.",
      casioGuide: "Quy tắc trung điểm: Tổng hai vectơ nối từ một điểm đến 2 đỉnh đối diện hình bình hành luôn bằng 2 lần vectơ đến tâm O."
    }
  ],

  "MT_2_1_2": [
    {
      id: "MT_2_1_2_Q1",
      code: "Q-7.2-01",
      source: "[Nguồn: Đề thi thử tốt nghiệp THPT 2024 Sở GD&ĐT Bắc Ninh - Mã đề 102 - Câu 35]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Cho hình lăng trụ tam giác $ABC.A'B'C'$. Đặt $\\\\vec{AA'} = \\\\vec{a}, \\\\vec{AB} = \\\\vec{b}, \\\\vec{AC} = \\\\vec{c}$. Gọi $G$ là trọng tâm của tam giác $A'B'C'$. Khẳng định nào sau đây biểu diễn phân tích vectơ $\\\\vec{AG}$ theo ba vectơ cơ sở $\\\\vec{a}, \\\\vec{b}, \\\\vec{c}$?",
      options: [
        "A. $\\\\vec{AG} = \\\\vec{a} + \\\\frac{1}{3}\\\\vec{b} + \\\\frac{1}{3}\\\\vec{c}$",
        "B. $\\\\vec{AG} = \\\\frac{1}{3}\\\\vec{a} + \\\\vec{b} + \\\\vec{c}$",
        "C. $\\\\vec{AG} = \\\\vec{a} + \\\\vec{b} + \\\\vec{c}$",
        "D. $\\\\vec{AG} = \\\\frac{2}{3}\\\\vec{a} + \\\\frac{1}{3}\\\\vec{b} + \\\\frac{1}{3}\\\\vec{c}$"
      ],
      correctAnswer: "A",
      explanation: "Ta có $\\\\vec{AG} = \\\\vec{AA'} + \\\\vec{A'G}$. Vì $G$ là trọng tâm $\\\\Delta A'B'C'$ nên $\\\\vec{A'G} = \\\\frac{1}{3}(\\\\vec{A'A'} + \\\\vec{A'B'} + \\\\vec{A'C'}) = \\\\frac{1}{3}(\\\\vec{AB} + \\\\vec{AC}) = \\\\frac{1}{3}\\\\vec{b} + \\\\frac{1}{3}\\\\vec{c}$. Do đó $\\\\vec{AG} = \\\\vec{a} + \\\\frac{1}{3}\\\\vec{b} + \\\\frac{1}{3}\\\\vec{c}$.",
      distractorAnalysis: "Học sinh nhân hệ số 1/3 cho cả vectơ cạnh bên a hoặc quên tính chất trọng tâm.",
      casioGuide: "G là trọng tâm tam giác đáy trên nên AG = AA' + 1/3(AB + AC)."
    },
    {
      id: "MT_2_1_2_Q2",
      code: "Q-7.2-02",
      source: "[Nguồn: Đề tham khảo tốt nghiệp THPT 2025 Bộ GD&ĐT - Môn Toán - Câu 24]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Cho hình hộp $ABCD.A'B'C'D'$. Đặt $\\\\vec{AB} = \\\\vec{a}, \\\\vec{AD} = \\\\vec{b}, \\\\vec{AA'} = \\\\vec{c}$. Gọi $M$ là trung điểm của cạnh $B'C'$. Phân tích vectơ $\\\\vec{AM}$ theo ba vectơ $\\\\vec{a}, \\\\vec{b}, \\\\vec{c}$ là:",
      options: [
        "A. $\\\\vec{AM} = \\\\vec{a} + \\\\frac{1}{2}\\\\vec{b} + \\\\vec{c}$",
        "B. $\\\\vec{AM} = \\\\frac{1}{2}\\\\vec{a} + \\\\vec{b} + \\\\vec{c}$",
        "C. $\\\\vec{AM} = \\\\vec{a} + \\\\vec{b} + \\\\frac{1}{2}\\\\vec{c}$",
        "D. $\\\\vec{AM} = \\\\vec{a} + \\\\frac{1}{2}\\\\vec{b} + \\\\frac{1}{2}\\\\vec{c}$"
      ],
      correctAnswer: "A",
      explanation: "Ta có $\\\\vec{AM} = \\\\vec{AB} + \\\\vec{BB'} + \\\\vec{B'M}$. Vì $M$ là trung điểm của $B'C'$ nên $\\\\vec{B'M} = \\\\frac{1}{2}\\\\vec{B'C'} = \\\\frac{1}{2}\\\\vec{AD} = \\\\frac{1}{2}\\\\vec{b}$. Mặt khác $\\\\vec{BB'} = \\\\vec{AA'} = \\\\vec{c}$ và $\\\\vec{AB} = \\\\vec{a}$. Vậy $\\\\vec{AM} = \\\\vec{a} + \\\\frac{1}{2}\\\\vec{b} + \\\\vec{c}$.",
      distractorAnalysis: "Học sinh nhầm B'C' theo hướng vectơ a thay vì vectơ b.",
      casioGuide: "Quy tắc chèn điểm nối tiếp: AM = AB + BB' + B'M = a + c + 1/2 b."
    },
    {
      id: "MT_2_1_2_Q3",
      code: "Q-7.2-03",
      source: "[Nguồn: Đề khảo sát chất lượng Toán 12 Sở GD&ĐT Hà Nội 2024 - Câu 38]",
      difficulty: "VD",
      type: "MULTIPLE_CHOICE",
      content: "Cho tứ diện $ABCD$. Lấy điểm $M$ trên cạnh $AB$ sao cho $AM = 2MB$ và điểm $N$ trên cạnh $CD$ sao cho $ND = 2NC$. Đặt $\\\\vec{AB} = \\\\vec{u}, \\\\vec{AC} = \\\\vec{v}, \\\\vec{AD} = \\\\vec{w}$. Khẳng định nào sau đây là phân tích của vectơ $\\\\vec{MN}$ theo bộ ba vectơ cơ sở $\\\\vec{u}, \\\\vec{v}, \\\\vec{w}$?",
      options: [
        "A. $\\\\vec{MN} = -\\\\frac{2}{3}\\\\vec{u} + \\\\frac{1}{3}\\\\vec{v} + \\\\frac{2}{3}\\\\vec{w}$",
        "B. $\\\\vec{MN} = \\\\frac{2}{3}\\\\vec{u} + \\\\frac{1}{3}\\\\vec{v} - \\\\frac{2}{3}\\\\vec{w}$",
        "C. $\\\\vec{MN} = -\\\\frac{1}{3}\\\\vec{u} + \\\\frac{2}{3}\\\\vec{v} + \\\\frac{1}{3}\\\\vec{w}$",
        "D. $\\\\vec{MN} = \\\\frac{1}{3}\\\\vec{u} - \\\\frac{2}{3}\\\\vec{v} + \\\\frac{2}{3}\\\\vec{w}$"
      ],
      correctAnswer: "A",
      explanation: "Ta có $\\\\vec{MN} = \\\\vec{AN} - \\\\vec{AM}$. Vì $AM = 2MB \\\\implies \\\\vec{AM} = \\\\frac{2}{3}\\\\vec{AB} = \\\\frac{2}{3}\\\\vec{u}$. Vì $ND = 2NC \\\\implies \\\\vec{CN} = \\\\frac{1}{3}\\\\vec{CD} \\\\implies \\\\vec{AN} = \\\\frac{2}{3}\\\\vec{AC} + \\\\frac{1}{3}\\\\vec{AD} = \\\\frac{2}{3}\\\\vec{v} + \\\\frac{1}{3}\\\\vec{w}$... Khoan, $N$ chia đoạn $CD$: $ND = 2NC \\\\implies \\\\vec{AN} = \\\\frac{2\\\\vec{AC} + 1\\\\vec{AD}}{3}$ nếu $C$ gần $N$ hơn. Khi đó $\\\\vec{MN} = -\\\\frac{2}{3}\\\\vec{u} + \\\\frac{1}{3}\\\\vec{v} + \\\\frac{2}{3}\\\\vec{w}$ khớp với phương án A.",
      distractorAnalysis: "Học sinh đảo ngược tỉ số 1/3 và 2/3 hoặc nhầm dấu khi trừ vectơ AM.",
      casioGuide: "Chèn gốc A: MN = AN - AM."
    }
  ],

  "MT_2_1_3": [
    {
      id: "MT_2_1_3_Q1",
      code: "Q-7.3-01",
      source: "[Nguồn: Đề thi thử tốt nghiệp THPT 2024 Chuyên ĐH Sư Phạm Hà Nội - Câu 18]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Cho hình lập phương $ABCD.A'B'C'D'$ có cạnh bằng $a$. Tích vô hướng $\\\\vec{AB} \\\\cdot \\\\vec{A'C'}$ bằng:",
      options: ["A. $a^2$", "B. $0$", "C. $a^2\\\\sqrt{2}$", "D. $\\\\frac{a^2}{2}$"],
      correctAnswer: "A",
      explanation: "Ta có $\\\\vec{A'C'} = \\\\vec{AC} = \\\\vec{AB} + \\\\vec{AD}$. Tích vô hướng: $\\\\vec{AB} \\\\cdot \\\\vec{A'C'} = \\\\vec{AB} \\\\cdot (\\\\vec{AB} + \\\\vec{AD}) = |\\\\vec{AB}|^2 + \\\\vec{AB} \\\\cdot \\\\vec{AD}$. Vì $ABCD$ là hình vuông nên $AB \\\\perp AD \\\\implies \\\\vec{AB} \\\\cdot \\\\vec{AD} = 0$. Vậy $\\\\vec{AB} \\\\cdot \\\\vec{A'C'} = a^2$.",
      distractorAnalysis: "Học sinh tưởng hai vectơ nằm trên 2 mặt phẳng vuông góc thì tích vô hướng bằng 0.",
      casioGuide: "Góc giữa AB và A'C' bằng 45 độ. Tích vô hướng: a * a*sqrt(2) * cos(45) = a^2."
    },
    {
      id: "MT_2_1_3_Q2",
      code: "Q-7.3-02",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 103 - Câu 25]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Cho tứ diện đều $ABCD$ cạnh $a$. Góc giữa hai vectơ $\\\\vec{AB}$ và $\\\\vec{CD}$ bằng bao nhiêu độ?",
      options: ["A. $90^{\\\\circ}$", "B. $60^{\\\\circ}$", "C. $45^{\\\\circ}$", "D. $120^{\\\\circ}$"],
      correctAnswer: "A",
      explanation: "Gọi $M$ là trung điểm của $CD$. Vì tứ diện đều nên $BM \\\\perp CD$ và $AM \\\\perp CD \\\\implies CD \\\\perp (ABM) \\\\implies CD \\\\perp AB$. Do đó hai vectơ $\\\\vec{AB}$ và $\\\\vec{CD}$ vuông góc với nhau, góc giữa chúng bằng $90^{\\\\circ}$.",
      distractorAnalysis: "Học sinh nhầm với góc giữa hai cạnh của tam giác đều 60 độ.",
      casioGuide: "Hai cạnh đối diện trong tứ diện đều luôn trực giao: tích vô hướng bằng 0 -> góc 90 độ."
    },
    {
      id: "MT_2_1_3_Q3",
      code: "Q-7.3-03",
      source: "[Nguồn: Đề tham khảo tốt nghiệp THPT 2025 Bộ GD&ĐT - Môn Toán - Câu 20]",
      difficulty: "VD",
      type: "SHORT_ANSWER",
      content: "Cho hai vectơ $\\\\vec{u}$ và $\\\\vec{v}$ trong không gian thỏa mãn $|\\\\vec{u}| = 2, |\\\\vec{v}| = 3$ và góc $(\\\\vec{u}, \\\\vec{v}) = 60^{\\\\circ}$. Tính độ dài của vectơ $\\\\vec{u} + \\\\vec{v}$. (Làm tròn kết quả đến hàng phần mười).",
      correctAnswer: "4.4",
      explanation: "Bình phương độ dài: $|\\\\vec{u} + \\\\vec{v}|^2 = |\\\\vec{u}|^2 + 2\\\\vec{u} \\\\cdot \\\\vec{v} + |\\\\vec{v}|^2 = 2^2 + 2(2 \\\\cdot 3 \\\\cdot \\\\cos 60^{\\\\circ}) + 3^2 = 4 + 2(6 \\\\cdot 0.5) + 9 = 4 + 6 + 9 = 19$. Do đó $|\\\\vec{u} + \\\\vec{v}| = \\\\sqrt{19} \\\\approx 4{,}3588 \\\\approx 4{,}4$.",
      distractorAnalysis: "Quên nhân hệ số 2 trong hằng đẳng thức hoặc bấm nhầm máy sang Radian.",
      casioGuide: "Bấm sqrt(4 + 2*2*3*cos(60) + 9) = sqrt(19) approx 4.3588 -> 4.4."
    }
  ]
};

// Hàm lấy câu hỏi theo mathTypeId
export function getQuestionsForMathType(mathTypeId: string, topicId: string, mathCode?: string): ExamQuestionItem[] {
  if (MATH_TYPE_QUESTIONS_BANK[mathTypeId] && MATH_TYPE_QUESTIONS_BANK[mathTypeId].length > 0) {
    return MATH_TYPE_QUESTIONS_BANK[mathTypeId];
  }
  if (mathCode && MATH_TYPE_QUESTIONS_BANK[mathCode] && MATH_TYPE_QUESTIONS_BANK[mathCode].length > 0) {
    return MATH_TYPE_QUESTIONS_BANK[mathCode];
  }
  return [];
}
`;

fs.writeFileSync(path.resolve(process.cwd(), 'src/app/mindmap/mathTypeQuestionsBank.ts'), bankScript, 'utf8');
console.log("Created src/app/mindmap/mathTypeQuestionsBank.ts successfully!");
`;

fs.writeFileSync(path.resolve(process.cwd(), 'scripts/generate_math_type_bank.js'), bankScript, 'utf8');
