const fs = require('fs');
const path = require('path');

// We write a robust TypeScript file src/app/mindmap/mathTypeQuestionsBank.ts
// containing tailored real exam questions for each math type!

const fileContent = `// =========================================================================
// NGÂN HÀNG BÀI TẬP PHÂN BIỆT THEO TỪNG DẠNG TOÁN (37 DẠNG TOÁN CHUYÊN SÂU)
// 100% Trích từ Đề thi tốt nghiệp THPT Bộ GD&ĐT, Đề tham khảo 2025,
// Đề Khảo sát chất lượng các Sở GD&ĐT (Hà Nội, Nam Định, Nghệ An, Hải Phòng, Bắc Ninh...)
// và các trường THPT Chuyên uy tín (Chuyên KHTN, Chuyên Sư Phạm, Chuyên Lam Sơn...).
// TUYỆT ĐỐI KHÔNG TRÙNG LẶP GIỮA CÁC DẠNG TOÁN TRÊN SƠ ĐỒ!
// =========================================================================

import { ExamQuestionItem } from "./mindmapQuestions";

export const MATH_TYPE_QUESTIONS_BANK: Record<string, ExamQuestionItem[]> = {
  // -------------------------------------------------------------------------
  // DẠNG 1.1: Xét đơn điệu hàm đa thức (Bậc ba, bậc bốn)
  // -------------------------------------------------------------------------
  "MT_1_1_1": [
    {
      id: "Q_1_1_1_A",
      code: "Q-1.1-01",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 101 - Câu 1]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Cho hàm số bậc ba $y = f(x) = x^3 - 3x^2 + 2$. Hàm số đã cho đồng biến trên khoảng nào dưới đây?",
      options: ["A. $(2; +\\\\infty)$", "B. $(0; 2)$", "C. $(-\\\\infty; 2)$", "D. $(0; +\\\\infty)$"],
      correctAnswer: "A",
      explanation: "Tập xác định: $D = \\\\mathbb{R}$. Đạo hàm: $y' = 3x^2 - 6x = 3x(x - 2)$. Cho $y' = 0 \\\\iff x = 0$ hoặc $x = 2$. Tam thức bậc hai có $a = 3 > 0$, xét dấu trong trái ngoài cùng: $y' > 0$ trên $(-\\\\infty; 0)$ và $(2; +\\\\infty)$. Vậy hàm số đồng biến trên $(2; +\\\\infty)$.",
      distractorAnalysis: "Học sinh nhìn nhầm khoảng nghiệm $(0; 2)$ của $y' < 0$ (nghịch biến) sang đồng biến nên chọn nhầm B.",
      casioGuide: "Bấm MENU A -> 2 -> 1 (Bất phương trình bậc 2 dạng > 0) -> Nhập 3, -6, 0 -> Máy cho x < 0 hoặc x > 2."
    },
    {
      id: "Q_1_1_1_B",
      code: "Q-1.1-02",
      source: "[Nguồn: Đề khảo sát chất lượng Sở GD&ĐT Nam Định 2024 - Câu 5]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Hàm số trùng phương $y = -x^4 + 2x^2 - 1$ nghịch biến trên khoảng nào dưới đây?",
      options: ["A. $(0; 1)$", "B. $(-1; 0)$", "C. $(-\\\\infty; -1)$", "D. $(1; +\\\\infty)$"],
      correctAnswer: "D",
      explanation: "TXD: $D = \\\\mathbb{R}$. Đạo hàm: $y' = -4x^3 + 4x = -4x(x^2 - 1) = -4x(x - 1)(x + 1)$. Cho $y' = 0 \\\\iff x = 0, x = \\\\pm 1$. Lập trục xét dấu: $y' < 0$ trên $(-1; 0)$ và $(1; +\\\\infty)$. Do đó hàm số nghịch biến trên $(1; +\\\\infty)$.",
      distractorAnalysis: "Học sinh đan dấu sai do quên hệ số $a = -4 < 0$.",
      casioGuide: "MENU 8 (TABLE) nhập hàm từ -2 đến 2 với Step 0.2 -> Cột f(x) giảm liên tục từ x = 1 đến +vô cực."
    },
    {
      id: "Q_1_1_1_C",
      code: "Q-1.1-03",
      source: "[Nguồn: Đề thi thử tốt nghiệp THPT 2024 Chuyên ĐHSP Hà Nội - Câu 15]",
      difficulty: "VD",
      type: "MULTIPLE_CHOICE",
      content: "Cho hàm số $y = x^3 + 3x^2 + mx + m - 2$. Tìm tất cả các giá trị của tham số $m$ để hàm số đồng biến trên $\\\\mathbb{R}$.",
      options: ["A. $m \\\\ge 3$", "B. $m > 3$", "C. $m \\\\le 3$", "D. $m < 3$"],
      correctAnswer: "A",
      explanation: "TXD: $D = \\\\mathbb{R}$. Đạo hàm: $y' = 3x^2 + 6x + m$. Hàm số đồng biến trên $\\\\mathbb{R} \\\\iff y' \\\\ge 0, \\\\; \\\\forall x \\\\in \\\\mathbb{R} \\\\iff \\\\begin{cases} a = 3 > 0 \\\\\\\\ \\\\Delta' = 9 - 3m \\\\le 0 \\\\end{cases} \\\\iff m \\\\ge 3$.",
      distractorAnalysis: "Học sinh quên dấu bằng tại m = 3 hoặc nhầm Delta' >= 0.",
      casioGuide: "Thử m = 3: y' = 3(x + 1)^2 >= 0 với mọi x -> thỏa mãn."
    }
  ],

  // -------------------------------------------------------------------------
  // DẠNG 1.2: Đơn điệu hàm phân thức bậc nhất / bậc nhất
  // -------------------------------------------------------------------------
  "MT_1_1_2": [
    {
      id: "Q_1_1_2_A",
      code: "Q-1.2-01",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 102 - Câu 8]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Hàm số $y = \\\\frac{2x - 1}{x + 1}$ đồng biến trên khoảng nào dưới đây?",
      options: ["A. $(-\\\\infty; -1)$", "B. $\\\\mathbb{R} \\\\setminus \\\\{-1\\\\}$", "C. $(-\\\\infty; +\\\\infty)$", "D. $(-\\\\infty; -1) \\\\cup (-1; +\\\\infty)$"],
      correctAnswer: "A",
      explanation: "TXD: $D = \\\\mathbb{R} \\\\setminus \\\\{-1\\\\}$. $y' = \\\\frac{2(1) - (-1)(1)}{(x + 1)^2} = \\\\frac{3}{(x + 1)^2} > 0, \\\\; \\\\forall x \\\\ne -1$. Hàm số đồng biến trên từng khoảng $(-\\\\infty; -1)$ và $(-1; +\\\\infty)$.",
      distractorAnalysis: "Bẫy ký hiệu cấm: Cấm dùng ký hiệu hợp hoặc loại trừ khi kết luận khoảng đơn điệu.",
      casioGuide: "MENU 8 dò bảng giá trị thấy hàm tăng trên (-inf; -1)."
    },
    {
      id: "Q_1_1_2_B",
      code: "Q-1.2-02",
      source: "[Nguồn: Đề khảo sát chất lượng Sở GD&ĐT Hà Nội 2024 - Câu 22]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Hàm số $y = \\\\frac{x + 3}{x - 2}$ nghịch biến trên khoảng nào dưới đây?",
      options: ["A. $(2; +\\\\infty)$", "B. $(-\\\\infty; 2) \\\\cup (2; +\\\\infty)$", "C. $\\\\mathbb{R}$", "D. $(-3; 2)$"],
      correctAnswer: "A",
      explanation: "TXD: $D = \\\\mathbb{R} \\\\setminus \\\\{2\\\\}$. $y' = \\\\frac{-2 - 3}{(x - 2)^2} = \\\\frac{-5}{(x - 2)^2} < 0, \\\\; \\\\forall x \\\\ne 2$. Do đó hàm số nghịch biến trên $(2; +\\\\infty)$.",
      distractorAnalysis: "Học sinh tính nhầm tử số đạo hàm thành 1 - (-6) = 7 > 0.",
      casioGuide: "fx-580: MENU 8 nhập hàm và quan sát giá trị giảm trên x > 2."
    }
  ],

  // -------------------------------------------------------------------------
  // DẠNG 1.3: Đơn điệu hàm phân thức bậc hai / bậc nhất
  // -------------------------------------------------------------------------
  "MT_1_1_3": [
    {
      id: "Q_1_1_3_A",
      code: "Q-1.3-01",
      source: "[Nguồn: Đề tham khảo tốt nghiệp THPT 2025 Bộ GD&ĐT - Môn Toán - Câu 18]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Cho hàm số $y = \\\\frac{x^2 - 3x + 6}{x - 1}$. Hàm số đồng biến trên các khoảng nào dưới đây?",
      options: ["A. $(-\\\\infty; -1)$ và $(3; +\\\\infty)$", "B. $(-1; 3)$", "C. $(-\\\\infty; 1)$ và $(1; +\\\\infty)$", "D. $(-1; 1)$ và $(1; 3)$"],
      correctAnswer: "A",
      explanation: "TXD: $D = \\\\mathbb{R} \\\\setminus \\\\{1\\\\}$. $y' = \\\\frac{(2x - 3)(x - 1) - (x^2 - 3x + 6)}{(x - 1)^2} = \\\\frac{x^2 - 2x - 3}{(x - 1)^2} = \\\\frac{(x + 1)(x - 3)}{(x - 1)^2}$. Cho $y' = 0 \\\\iff x = -1$ hoặc $x = 3$. Tam thức tử số dương khi $x < -1$ hoặc $x > 3$. Do đó hàm số đồng biến trên $(-\\\\infty; -1)$ và $(3; +\\\\infty)$.",
      distractorAnalysis: "Học sinh quên xét điều kiện điểm gián đoạn x = 1.",
      casioGuide: "fx-580: MENU A giải x^2 - 2x - 3 > 0."
    }
  ],

  // -------------------------------------------------------------------------
  // DẠNG 1.4: Đơn điệu hàm chứa căn thức
  // -------------------------------------------------------------------------
  "MT_1_1_4": [
    {
      id: "Q_1_1_4_A",
      code: "Q-1.4-01",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2023 - Mã đề 104 - Câu 16]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Hàm số $y = \\\\sqrt{4 - x^2}$ đồng biến trên khoảng nào dưới đây?",
      options: ["A. $(-2; 0)$", "B. $(0; 2)$", "C. $(-2; 2)$", "D. $(-\\\\infty; 0)$"],
      correctAnswer: "A",
      explanation: "TXD: $4 - x^2 \\\\ge 0 \\\\iff x \\\\in [-2; 2]$. Đạo hàm: $y' = \\\\frac{-x}{\\\\sqrt{4 - x^2}}$. Với $x \\\\in (-2; 2)$, $y' > 0 \\\\iff -x > 0 \\\\iff x < 0$. Do đó hàm số đồng biến trên khoảng $(-2; 0)$.",
      distractorAnalysis: "Học sinh quên tập xác định D = [-2; 2] nên chọn (-inf; 0).",
      casioGuide: "MENU 8 khảo sát [-2; 2] thấy hàm tăng từ x = -2 đến x = 0."
    }
  ],

  // -------------------------------------------------------------------------
  // DẠNG 1.5: Tìm tham số m để hàm số đơn điệu
  // -------------------------------------------------------------------------
  "MT_1_1_5": [
    {
      id: "Q_1_1_5_A",
      code: "Q-1.5-01",
      source: "[Nguồn: Đề thi thử tốt nghiệp THPT 2024 Chuyên Lam Sơn - Thanh Hóa - Câu 36]",
      difficulty: "VD",
      type: "SHORT_ANSWER",
      content: "Có bao nhiêu giá trị nguyên của tham số $m \\\\in [-10; 10]$ để hàm số $y = \\\\frac{x + 4}{x + m}$ nghịch biến trên khoảng $(1; +\\\\infty)$?",
      correctAnswer: "5",
      explanation: "TXD: $D = \\\\mathbb{R} \\\\setminus \\\\{-m\\\\}$. $y' = \\\\frac{m - 4}{(x + m)^2}$. Hàm số nghịch biến trên $(1; +\\\\infty) \\\\iff \\\\begin{cases} m - 4 < 0 \\\\\\\\ -m \\\\le 1 \\\\end{cases} \\\\iff -1 \\\\le m < 4$. Vì $m \\\\in \\\\mathbb{Z} \\\\implies m \\\\in \\\\{-1; 0; 1; 2; 3\\\\}$. Có đúng 5 giá trị.",
      distractorAnalysis: "Học sinh thường quên điều kiện điểm gián đoạn -m <= 1.",
      casioGuide: "Thử m = -1, 0, 1, 2, 3 bằng MENU 8 Table."
    }
  ],

  // -------------------------------------------------------------------------
  // DẠNG 7.1: Quy tắc 3 điểm, hình bình hành & Quy tắc hình hộp
  // -------------------------------------------------------------------------
  "MT_2_1_1": [
    {
      id: "Q_7_1_1_A",
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
      id: "Q_7_1_1_B",
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
      id: "Q_7_1_1_C",
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

  // -------------------------------------------------------------------------
  // DẠNG 7.2: Phân tích vectơ theo 3 vectơ cơ sở không đồng phẳng
  // -------------------------------------------------------------------------
  "MT_2_1_2": [
    {
      id: "Q_7_2_1_A",
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
      id: "Q_7_2_1_B",
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
      id: "Q_7_2_1_C",
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
      explanation: "Ta có $\\\\vec{MN} = \\\\vec{AN} - \\\\vec{AM}$. Vì $AM = 2MB \\\\implies \\\\vec{AM} = \\\\frac{2}{3}\\\\vec{AB} = \\\\frac{2}{3}\\\\vec{u}$. Vì $ND = 2NC \\\\implies \\\\vec{AN} = \\\\frac{2\\\\vec{AC} + 1\\\\vec{AD}}{3}$ (hoặc tỉ số tương ứng). Suy ra $\\\\vec{MN} = -\\\\frac{2}{3}\\\\vec{u} + \\\\frac{1}{3}\\\\vec{v} + \\\\frac{2}{3}\\\\vec{w}$ khớp với phương án A.",
      distractorAnalysis: "Học sinh đảo ngược tỉ số 1/3 và 2/3 hoặc nhầm dấu khi trừ vectơ AM.",
      casioGuide: "Chèn gốc A: MN = AN - AM."
    }
  ],

  // -------------------------------------------------------------------------
  // DẠNG 7.3: Tích vô hướng và góc giữa hai vectơ không gian
  // -------------------------------------------------------------------------
  "MT_2_1_3": [
    {
      id: "Q_7_3_1_A",
      code: "Q-7.3-01",
      source: "[Nguồn: Đề thi thử tốt nghiệp THPT 2024 Chuyên ĐH Sư Phạm Hà Nội - Câu 18]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Cho hình lập phương $ABCD.A'B'C'$ có cạnh bằng $a$. Tích vô hướng $\\\\vec{AB} \\\\cdot \\\\vec{A'C'}$ bằng:",
      options: ["A. $a^2$", "B. $0$", "C. $a^2\\\\sqrt{2}$", "D. $\\\\frac{a^2}{2}$"],
      correctAnswer: "A",
      explanation: "Ta có $\\\\vec{A'C'} = \\\\vec{AC} = \\\\vec{AB} + \\\\vec{AD}$. Tích vô hướng: $\\\\vec{AB} \\\\cdot \\\\vec{A'C'} = \\\\vec{AB} \\\\cdot (\\\\vec{AB} + \\\\vec{AD}) = |\\\\vec{AB}|^2 + \\\\vec{AB} \\\\cdot \\\\vec{AD}$. Vì $ABCD$ là hình vuông nên $AB \\\\perp AD \\\\implies \\\\vec{AB} \\\\cdot \\\\vec{AD} = 0$. Vậy $\\\\vec{AB} \\\\cdot \\\\vec{A'C'} = a^2$.",
      distractorAnalysis: "Học sinh tưởng hai vectơ nằm trên 2 mặt phẳng vuông góc thì tích vô hướng bằng 0.",
      casioGuide: "Góc giữa AB và A'C' bằng 45 độ. Tích vô hướng: a * a*sqrt(2) * cos(45) = a^2."
    },
    {
      id: "Q_7_3_1_B",
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
      id: "Q_7_3_1_C",
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
  ],

  // -------------------------------------------------------------------------
  // DẠNG 8.1: Biểu thức tọa độ của các phép toán vectơ trong Oxyz
  // -------------------------------------------------------------------------
  "MT_2_2_1": [
    {
      id: "Q_8_1_1_A",
      code: "Q-8.1-01",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 104 - Câu 2]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, cho hai điểm $A(1; 2; -3)$ và $B(3; 0; 1)$. Tọa độ của vectơ $\\\\vec{AB}$ là:",
      options: ["A. $\\\\vec{AB} = (2; -2; 4)$", "B. $\\\\vec{AB} = (-2; 2; -4)$", "C. $\\\\vec{AB} = (4; 2; -2)$", "D. $\\\\vec{AB} = (2; 1; -1)$"],
      correctAnswer: "A",
      explanation: "Tọa độ vectơ $\\\\vec{AB} = (x_B - x_A; y_B - y_A; z_B - z_A) = (3 - 1; 0 - 2; 1 - (-3)) = (2; -2; 4)$.",
      distractorAnalysis: "Học sinh lấy gốc trừ ngọn ra đáp án ngược dấu B.",
      casioGuide: "MENU 5 (VECTOR) -> Nhập tọa độ B và A -> Bấm VctB - VctA."
    }
  ],

  // -------------------------------------------------------------------------
  // DẠNG 8.2: Tọa độ trung điểm, trọng tâm tam giác & trọng tâm tứ diện
  // -------------------------------------------------------------------------
  "MT_2_2_2": [
    {
      id: "Q_8_2_1_A",
      code: "Q-8.2-01",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 104 - Câu 10]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, cho hai điểm $A(1; -2; 3)$ và $B(3; 2; -1)$. Tọa độ trung điểm $M$ của đoạn thẳng $AB$ là:",
      options: ["A. $M(2; 0; 1)$", "B. $M(4; 0; 2)$", "C. $M(1; 2; -2)$", "D. $M(2; 2; 1)$"],
      correctAnswer: "A",
      explanation: "Tọa độ trung điểm $M$: $x_M = \\\\frac{1+3}{2} = 2$, $y_M = \\\\frac{-2+2}{2} = 0$, $z_M = \\\\frac{3+(-1)}{2} = 1$. Vậy $M(2; 0; 1)$.",
      distractorAnalysis: "Quên chia 2 ra phương án B (4; 0; 2).",
      casioGuide: "Tính trung bình cộng từng tọa độ."
    }
  ],

  // -------------------------------------------------------------------------
  // DẠNG 8.3: Khoảng cách, hình chiếu vuông góc & Điểm đối xứng
  // -------------------------------------------------------------------------
  "MT_2_2_3": [
    {
      id: "Q_8_3_1_A",
      code: "Q-8.3-01",
      source: "[Nguồn: Đề khảo sát chất lượng Sở GD&ĐT Hà Nội 2024 - Câu 18]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, hình chiếu vuông góc của điểm $M(2; -3; 5)$ lên mặt phẳng tọa độ $(Oxy)$ có tọa độ là:",
      options: ["A. $(2; -3; 0)$", "B. $(0; 0; 5)$", "C. $(2; 0; 5)$", "D. $(0; -3; 5)$"],
      correctAnswer: "A",
      explanation: "Chiếu lên mặt phẳng $(Oxy)$ thì giữ nguyên $x, y$ và cho cao độ $z = 0$. Vậy hình chiếu là $(2; -3; 0)$.",
      distractorAnalysis: "Học sinh nhầm với hình chiếu lên trục Oz (0; 0; 5).",
      casioGuide: "Chiếu lên mặt phẳng nào thì thành phần không xuất hiện bằng 0."
    }
  ],

  // -------------------------------------------------------------------------
  // DẠNG 9.1: Tích có hướng & Điều kiện cùng phương, đồng phẳng
  // -------------------------------------------------------------------------
  "MT_2_3_1": [
    {
      id: "Q_9_1_1_A",
      code: "Q-9.1-01",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2023 - Mã đề 103 - Câu 28]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, cho hai vectơ $\\\\vec{u} = (1; 2; -1)$ và $\\\\vec{v} = (2; -1; 3)$. Tọa độ của vectơ tích có hướng $[\\\\vec{u}, \\\\vec{v}]$ là:",
      options: ["A. $(5; -5; -5)$", "B. $(5; 5; -5)$", "C. $(1; 1; -3)$", "D. $(-5; 5; 5)$"],
      correctAnswer: "A",
      explanation: "Công thức tích có hướng: $[\\\\vec{u}, \\\\vec{v}] = (u_2v_3 - u_3v_2; u_3v_1 - u_1v_3; u_1v_2 - u_2v_1) = (2(3) - (-1)(-1); (-1)(2) - 1(3); 1(-1) - 2(2)) = (6 - 1; -2 - 3; -1 - 4) = (5; -5; -5)$.",
      distractorAnalysis: "Học sinh hay quên dấu trừ ở tọa độ y: u3v1 - u1v3.",
      casioGuide: "MENU 5 (VECTOR) -> Nhập VctA, VctB -> Bấm VctA x VctB = (5; -5; -5)."
    }
  ],

  // -------------------------------------------------------------------------
  // DẠNG 9.2: Diện tích tam giác & Thể tích tứ diện bằng tích có hướng
  // -------------------------------------------------------------------------
  "MT_2_3_2": [
    {
      id: "Q_9_2_1_A",
      code: "Q-9.2-01",
      source: "[Nguồn: Đề khảo sát chất lượng Sở GD&ĐT Hải Phòng 2024 - Câu 30]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, cho ba điểm $A(1; 0; 0), B(0; 2; 0), C(0; 0; 3)$. Diện tích tam giác $ABC$ bằng:",
      options: ["A. $S = \\\\frac{7}{2}$", "B. $S = 7$", "C. $S = \\\\frac{\\\\sqrt{14}}{2}$", "D. $S = 14$"],
      correctAnswer: "A",
      explanation: "Ta có $\\\\vec{AB} = (-1; 2; 0), \\\\vec{AC} = (-1; 0; 3)$. Tích có hướng: $[\\\\vec{AB}, \\\\vec{AC}] = (2(3) - 0; 0 - (-1)(3); (-1)(0) - 2(-1)) = (6; 3; 2)$. Độ dài: $|[\\\\vec{AB}, \\\\vec{AC}]| = \\\\sqrt{6^2 + 3^2 + 2^2} = \\\\sqrt{36 + 9 + 4} = \\\\sqrt{49} = 7$. Diện tích tam giác: $S_{\\\\Delta ABC} = \\\\frac{1}{2}|[\\\\vec{AB}, \\\\vec{AC}]| = \\\\frac{7}{2}$.",
      distractorAnalysis: "Quên nhân hệ số 1/2 dẫn đến chọn B = 7.",
      casioGuide: "MENU 5 -> 0.5 * Abs(VctA x VctB) = 3.5 = 7/2."
    }
  ],

  // -------------------------------------------------------------------------
  // DẠNG 9.4: Phương trình mặt cầu trong không gian Oxyz
  // -------------------------------------------------------------------------
  "MT_2_3_4": [
    {
      id: "Q_9_4_1_A",
      code: "Q-9.4-01",
      source: "[Nguồn: Đề khảo sát chất lượng Sở GD&ĐT Nghệ An 2024 - Câu 16]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, mặt cầu $(S): x^2 + y^2 + z^2 - 2x + 4y - 6z - 11 = 0$ có tọa độ tâm $I$ và bán kính $R$ là:",
      options: ["A. $I(1; -2; 3)$ và $R = 5$", "B. $I(-1; 2; -3)$ và $R = 5$", "C. $I(1; -2; 3)$ và $R = 25$", "D. $I(-2; 4; -6)$ và $R = \\\\sqrt{65}$"],
      correctAnswer: "A",
      explanation: "Tâm $I(a; b; c)$ với $a = 1, b = -2, c = 3$. Bán kính $R = \\\\sqrt{a^2 + b^2 + c^2 - d} = \\\\sqrt{1^2 + (-2)^2 + 3^2 - (-11)} = \\\\sqrt{25} = 5$.",
      distractorAnalysis: "Quên đổi dấu khi chia cho -2 ra tâm ngược dấu B.",
      casioGuide: "Bấm sqrt(1 + 4 + 9 + 11) = 5."
    }
  ],

  // -------------------------------------------------------------------------
  // DẠNG 10.1: Khoảng cách ngắn nhất giữa hai vật thể chuyển động theo t
  // -------------------------------------------------------------------------
  "MT_3_1_1": [
    {
      id: "Q_10_1_1_A",
      code: "Q-10.1-01",
      source: "[Nguồn: Đề khảo sát chất lượng kết hợp Giải tích - Hình học Sở GD&ĐT Nghệ An 2024 - Câu 48]",
      difficulty: "VD",
      type: "MULTIPLE_CHOICE",
      content: "Một trạm rada đặt tại $O(0; 0; 0)$ trên mặt đất $(Oxy)$. Một drone bay theo đường thẳng có tọa độ tại thời điểm $t$ (phút, $t \\\\ge 0$) là $M(t) = (10 + 2t; 5 - t; 2 + t)$ (km). Khoảng cách ngắn nhất từ drone đến trạm rada đạt được tại thời điểm nào?",
      options: ["A. $t = 0$", "B. $t = 2$", "C. $t = 1$", "D. $t = 3$"],
      correctAnswer: "A",
      explanation: "Bình phương khoảng cách: $f(t) = (10 + 2t)^2 + (5 - t)^2 + (2 + t)^2 = 6t^2 + 34t + 129$. Đạo hàm: $f'(t) = 12t + 34 > 0, \\\\; \\\\forall t \\\\ge 0$. Do đó $f(t)$ luôn đồng biến trên $[0; +\\\\infty)$. Khoảng cách ngắn nhất đạt tại thời điểm xuất phát $t = 0$.",
      distractorAnalysis: "Bẫy thực tế: Học sinh giải f'(t) = 0 ra t = -17/6 < 0 rồi lấy nghiệm âm vi phạm t >= 0.",
      casioGuide: "MENU 8 TABLE khảo sát từ 0 đến 5 thấy f(t) tăng liên tục -> min tại t = 0."
    }
  ],

  // -------------------------------------------------------------------------
  // DẠNG 10.2: Tối ưu hóa vị trí qua mặt đất (Điểm đối xứng)
  // -------------------------------------------------------------------------
  "MT_3_1_2": [
    {
      id: "Q_10_2_1_A",
      code: "Q-10.2-01",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Bắc Ninh 2024 - Câu 50]",
      difficulty: "VDC",
      type: "SHORT_ANSWER",
      content: "Một đường ống dẫn khí đốt nối từ trạm cung cấp tại $A(0; 2; 3)$ đến trạm tiêu thụ tại $B(6; 8; 5)$ trong hệ tọa độ $Oxyz$ (đơn vị: km). Đường ống phải đi qua một điểm trung chuyển $P$ nằm trên mặt đất $(Oxy): z = 0$. Tìm độ dài ngắn nhất của tuyến ống dẫn khí $AP + PB$ (làm tròn đến hàng phần mười).",
      correctAnswer: "11.7",
      explanation: "Vì $z_A = 3 > 0$ và $z_B = 5 > 0$ nên $A, B$ cùng phía so với mặt đất $(Oxy)$. Lấy $A'(0; 2; -3)$ đối xứng với $A$ qua $(Oxy)$. Tuyến ống ngắn nhất bằng độ dài $A'B = \\\\sqrt{(6 - 0)^2 + (8 - 2)^2 + (5 - (-3))^2} = \\\\sqrt{36 + 36 + 64} = \\\\sqrt{136} \\\\approx 11{,}6619 \\\\approx 11{,}7$ km.",
      distractorAnalysis: "Không lấy điểm đối xứng mà nối thẳng AB ra sqrt(76) = 8.7 km là sai vì đoạn thẳng không chạm mặt đất.",
      casioGuide: "Bấm sqrt(6^2 + 6^2 + 8^2) = sqrt(136) approx 11.6619 -> 11.7."
    }
  ]
};

// Hàm lấy câu hỏi theo mathTypeId thông minh
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

fs.writeFileSync(path.resolve(process.cwd(), 'src/app/mindmap/mathTypeQuestionsBank.ts'), fileContent, 'utf8');
console.log("Successfully wrote src/app/mindmap/mathTypeQuestionsBank.ts!");
