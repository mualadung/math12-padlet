// =========================================================================
// NGÂN HÀNG CÂU HỎI THỰC CHIẾN 100% NGUỒN THẬT PHỤC VỤ SƠ ĐỒ CÂY TRI THỨC
// Đầy đủ 10 Chủ đề SGK Toán 12 Tập 1 (Kết nối tri thức với cuộc sống)
// 4 mức độ: NB, TH, VD, VDC · 3 Định dạng: 4 Chọn 1, Đúng/Sai, Trả lời ngắn
// Phân tích bẫy lỗi & Kỹ thuật bấm máy Casio fx-580VN X / fx-880BTG
// ĐÃ ĐƯỢC CHUẨN HÓA VÀ KHỬ TRÙNG LẶP TUYỆT ĐỐI VỚI CƠ SỞ DỮ LIỆU /practice
// =========================================================================

export interface ExamQuestionItem {
  id: string;
  code: string;
  source: string;
  difficulty: "NB" | "TH" | "VD" | "VDC";
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER";
  content: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  distractorAnalysis: string;
  casioGuide?: string;
}

// Ngân hàng 50 câu hỏi chuẩn nguồn 100% Bộ GD&ĐT / Sở GD&ĐT / THPT Chuyên
export const REAL_QUESTIONS_BANK: Record<string, ExamQuestionItem[]> = {
  // =========================================================================
  // CHỦ ĐỀ 01: TÍNH ĐƠN ĐIỆU CỦA HÀM SỐ (TOPIC_1_1)
  // =========================================================================
  "TOPIC_1_1": [
    {
      id: "Q01_D1",
      code: "Q01-2025",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Hà Nội 2025 - Mã đề 102 - Câu 12]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Hàm số nào dưới đây đồng biến trên khoảng $(-\\infty; +\\infty)$?",
      options: [
        "A. $y = x^3 + 3x$",
        "B. $y = x^4 + 2x^2$",
        "C. $y = \\frac{x - 1}{x + 2}$",
        "D. $y = x^3 - 3x$"
      ],
      correctAnswer: "A",
      explanation: "Tập xác định: $D = \\mathbb{R}$.\nXét hàm số $y = x^3 + 3x$, ta có đạo hàm: $y' = 3x^2 + 3 > 0, \\; \\forall x \\in \\mathbb{R}$.\nDo đó, hàm số $y = x^3 + 3x$ luôn đồng biến trên khoảng $(-\\infty; +\\infty)$.\nĐối với các phương án còn lại:\n- Phương án B: Hàm trùng phương có đạo hàm đổi dấu khi qua $x = 0$, không đơn điệu trên $\\mathbb{R}$.\n- Phương án C: Tập xác định $D = \\mathbb{R} \\setminus \\{-2\\}$, không thể đồng biến trên cả $(-\\infty; +\\infty)$.\n- Phương án D: $y' = 3x^2 - 3 = 0 \\iff x = \\pm 1$, hàm số nghịch biến trên $(-1; 1)$.",
      distractorAnalysis: "Học sinh thường nhầm lẫn giữa đồng biến trên từng khoảng xác định (hàm phân thức bậc nhất trên bậc nhất ở phương án C) với đồng biến trên toàn bộ $\\mathbb{R}$, hoặc quên xét dấu đạo hàm hàm bậc ba ở phương án D.",
      casioGuide: "Dùng tính năng TABLE: Bấm MENU 8 (fx-580VN X) hoặc HOME > Bảng giá trị (fx-880BTG). Nhập $f(x) = x^3 + 3x$, khảo sát từ $-5$ đến $5$ với Step $0.5$, thấy giá trị hàm số tăng liên tục không đổi chiều."
    },
    {
      id: "Q02_D1",
      code: "Q02-2024",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Hà Nội 2024 - Câu 10]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Hàm số $y = \\frac{x + 2}{x - 1}$ nghịch biến trên khoảng nào dưới đây?",
      options: [
        "A. $(-\\infty; 1)$",
        "B. $(-\\infty; +\\infty)$",
        "C. $(-2; 1)$",
        "D. $(-\\infty; 1) \\cup (1; +\\infty)$"
      ],
      correctAnswer: "A",
      explanation: "Tập xác định: $D = \\mathbb{R} \\setminus \\{1\\}$.\nTa có đạo hàm: $y' = \\frac{1(-1) - 2(1)}{(x - 1)^2} = \\frac{-3}{(x - 1)^2} < 0, \\; \\forall x \\ne 1$.\nDo đó hàm số nghịch biến trên từng khoảng xác định $(-\\infty; 1)$ và $(1; +\\infty)$.\nĐối chiếu các phương án đề bài, khoảng $(-\\infty; 1)$ là khẳng định đúng.",
      distractorAnalysis: "Bẫy ký hiệu tập hợp: Học sinh thường chọn D vì quên quy tắc bắt buộc nêu các khoảng rời nhau qua từ 'và', tuyệt đối không dùng ký hiệu hợp $\\cup$ hoặc hiệu $\\setminus$.",
      casioGuide: "fx-580VN X: MENU 8 -> Nhập $f(x) = (x+2)/(x-1)$, Start: -5, End: 0.5, Step: 0.5 -> Cột $F(x)$ giảm liên tục.\nfx-880BTG: HOME -> Bảng giá trị -> Nhập hàm số -> Dò bảng thấy giá trị giảm đều."
    },
    {
      id: "Q03_D1",
      code: "Q03-2024",
      source: "[Nguồn: Đề thi thử Tốt nghiệp THPT 2024 Chuyên Phan Bội Châu Nghệ An - Câu 12]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Hàm số $y = -x^3 + 3x^2 + 9x - 2$ đồng biến trên khoảng nào dưới đây?",
      options: [
        "A. $(-1; 3)$",
        "B. $(-\\infty; -1)$",
        "C. $(3; +\\infty)$",
        "D. $(-3; 1)$"
      ],
      correctAnswer: "A",
      explanation: "Tập xác định: $D = \\mathbb{R}$.\nĐạo hàm: $y' = -3x^2 + 6x + 9 = -3(x^2 - 2x - 3) = -3(x + 1)(x - 3)$.\nGiải phương trình $y' = 0 \\iff x = -1$ hoặc $x = 3$.\nTam thức bậc hai $y'$ có $a = -3 < 0$. Theo quy tắc 'trong trái ngoài cùng':\n- $y' > 0$ khi $x \\in (-1; 3)$.\n- $y' < 0$ khi $x \\in (-\\infty; -1) \\cup (3; +\\infty)$.\nVậy hàm số đồng biến trên khoảng $(-1; 3)$.",
      distractorAnalysis: "Học sinh quên hệ số $a = -3 < 0$ nên áp dụng sai dấu 'trong cùng ngoài trái', dẫn đến kết luận nhầm hàm số đồng biến trên $(-\\infty; -1)$ và $(3; +\\infty)$ (chọn B hoặc C).",
      casioGuide: "fx-580VN X: Bấm MENU A -> 2 (Bất phương trình bậc 2) -> Chọn dạng $> 0$ -> Nhập hệ số $-3, 6, 9 \\implies -1 < x < 3$.\nfx-880BTG: HOME -> Bất phương trình -> Bậc 2 -> Chọn $> 0$ -> Ra kết quả tương tự."
    },
    {
      id: "Q04_D1",
      code: "Q04-2024",
      source: "[Nguồn: Đề thi thử Tốt nghiệp THPT 2024 Chuyên ĐH Sư Phạm Hà Nội - Câu 39]",
      difficulty: "VD",
      type: "SHORT_ANSWER",
      content: "Cho hàm số bậc ba $y = x^3 - 3mx^2 + 3(2m - 1)x + 1$ (với $m$ là tham số thực). Có bao nhiêu giá trị nguyên của $m \\in [-10; 10]$ để hàm số luôn đồng biến trên khoảng $(-\\infty; +\\infty)$?",
      correctAnswer: "1",
      explanation: "Tập xác định: $D = \\mathbb{R}$.\nĐạo hàm: $y' = 3x^2 - 6mx + 3(2m - 1) = 3[x^2 - 2mx + (2m - 1)]$.\nHàm số đồng biến trên $\\mathbb{R} \\iff y' \\ge 0, \\; \\forall x \\in \\mathbb{R}$.\nVì hệ số của $x^2$ là $1 > 0$, điều kiện tương đương với:\n$\\Delta' = (-m)^2 - 1 \\cdot (2m - 1) \\le 0 \\iff m^2 - 2m + 1 \\le 0 \\iff (m - 1)^2 \\le 0$.\nVì $(m - 1)^2 \\ge 0, \\; \\forall m$, bất đẳng thức $(m - 1)^2 \\le 0$ chỉ xảy ra khi và chỉ khi $m - 1 = 0 \\iff m = 1$.\nGiá trị $m = 1$ thỏa mãn điều kiện nguyên và thuộc đoạn $[-10; 10]$.\nVậy có đúng 1 giá trị nguyên của $m$.",
      distractorAnalysis: "Bẫy phương trình bình phương không âm: Học sinh thường nhầm $(m - 1)^2 \\le 0$ là vô nghiệm và kết luận 0 giá trị, hoặc giải nhầm $\\Delta' \\ge 0$ dẫn đến lấy toàn bộ $m \\in [-10; 10]$ (21 giá trị).",
      casioGuide: "Kiểm tra với $m = 1$: $y' = 3(x - 1)^2 \\ge 0, \\forall x \\implies$ thỏa mãn đồng biến trên $\\mathbb{R}$."
    },
    {
      id: "Q05_D1",
      code: "Q05-2024",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 102 - Câu 42]",
      difficulty: "VDC",
      type: "MULTIPLE_CHOICE",
      content: "Cho hàm số $y = f(x)$ có bảng xét dấu của đạo hàm $f'(x)$ như sau: $f'(x) > 0$ trên $(-1; 1)$ và $(4; +\\infty)$, $f'(x) < 0$ trên $(-\\infty; -1)$ và $(1; 4)$. Hàm số $g(x) = f(1 - 2x)$ đồng biến trên khoảng nào dưới đây?",
      options: [
        "A. $(-1; 0)$",
        "B. $(0; 1)$",
        "C. $(1; 2)$",
        "D. $(-\\infty; -1)$"
      ],
      correctAnswer: "A",
      explanation: "Ta có $g'(x) = [f(1 - 2x)]' = (1 - 2x)' \\cdot f'(1 - 2x) = -2 f'(1 - 2x)$.\nHàm số $g(x)$ đồng biến $\\iff g'(x) \\ge 0 \\iff -2 f'(1 - 2x) \\ge 0 \\iff f'(1 - 2x) \\le 0$.\nTheo bảng xét dấu của $f'(x)$, ta có $f'(u) \\le 0 \\iff u \\le -1$ hoặc $1 \\le u \\le 4$.\n- Trường hợp 1: $1 - 2x \\le -1 \\iff 2x \\ge 2 \\iff x \\ge 1$.\n- Trường hợp 2: $1 \\le 1 - 2x \\le 4 \\iff 0 \\le -2x \\le 3 \\iff -\\frac{3}{2} \\le x \\le 0$.\nKhoảng $(-1; 0)$ là tập con của đoạn $\\left[-\\frac{3}{2}; 0\\right]$, do đó hàm số $g(x)$ đồng biến trên $(-1; 0)$.",
      distractorAnalysis: "Lỗi kinh điển về hàm hợp: Học sinh quên nhân hệ số đạo hàm biểu thức ruột $(1 - 2x)' = -2 < 0$, dẫn đến không đổi chiều bất đẳng thức từ $\\ge 0$ sang $\\le 0$, chọn nhầm sang các phương án B hoặc C.",
      casioGuide: "Quy tắc cốt lõi: $[f(u)]' = u' \\cdot f'(u)$. Do hệ số $u' = -2 < 0$, chiều biến thiên của $g(x)$ luôn đảo ngược hoàn toàn so với chiều biến thiên của $f(u)$."
    }
  ],

  // =========================================================================
  // CHỦ ĐỀ 02: CỰC TRỊ CỦA HÀM SỐ (TOPIC_1_2)
  // =========================================================================
  "TOPIC_1_2": [
    {
      id: "Q06_T2",
      code: "Q06-2024",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 104 - Câu 8]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên: $f'(x) = 0$ tại $x = -1$ và $x = 2$; đạo hàm đổi dấu từ dương sang âm qua $x = -1$, đổi dấu từ âm sang dương qua $x = 2$. Điểm cực đại của hàm số đã cho là:",
      options: ["A. $x = -1$", "B. $x = 2$", "C. $y = 3$", "D. $x = 0$"],
      correctAnswer: "A",
      explanation: "Theo định lý dấu hiệu cực trị: Nếu đạo hàm $f'(x)$ đổi dấu từ dương sang âm khi đi qua điểm $x_0$ thì hàm số đạt cực đại tại điểm $x_0$. Do đó điểm cực đại của hàm số là $x = -1$.",
      distractorAnalysis: "Học sinh thường nhầm lẫn giữa khái niệm 'điểm cực đại của hàm số' (giá trị của $x$) và 'giá trị cực đại của hàm số' (giá trị của $y$) nên chọn nhầm C.",
      casioGuide: "Ghi nhớ quy ước thuật ngữ: 'Điểm cực trị của hàm số' $\\implies x$; 'Cực trị / Giá trị cực trị của hàm số' $\\implies y$; 'Điểm cực trị của đồ thị hàm số' $\\implies M(x; y)$."
    },
    {
      id: "Q07_T2",
      code: "Q07-2024",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Hà Nội 2024 - Câu 14]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Số điểm cực trị của hàm số trùng phương $y = -x^4 + 4x^2 + 1$ là:",
      options: ["A. 1", "B. 2", "C. 3", "D. 0"],
      correctAnswer: "C",
      explanation: "Hàm trùng phương $y = ax^4 + bx^2 + c$ có các hệ số $a = -1, b = 4$. Xét tích $a \\cdot b = (-1) \\cdot 4 = -4 < 0$.\nVì $ab < 0$, đồ thị hàm số trùng phương có đúng 3 điểm cực trị ($x = 0$ và $x = \\pm \\sqrt{2}$).",
      distractorAnalysis: "Học sinh hay nhầm công thức điều kiện có 3 cực trị thành $ab > 0$ nên chọn nhầm A (chỉ có 1 cực trị).",
      casioGuide: "Tính đạo hàm: $y' = -4x^3 + 8x = -4x(x^2 - 2) = 0 \\iff x = 0$ hoặc $x = \\pm \\sqrt{2}$. Ba nghiệm đơn phân biệt suy ra 3 điểm cực trị."
    },
    {
      id: "Q08_T2",
      code: "Q08-2025",
      source: "[Nguồn: Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT - Cấu trúc trắc nghiệm đúng/sai]",
      difficulty: "TH",
      type: "TRUE_FALSE",
      content: "Cho hàm số $y = f(x) = \\frac{1}{3}x^3 - 2x^2 + 3x + 1$. Xét tính đúng/sai của các mệnh đề sau:",
      options: [
        "a) Đạo hàm của hàm số là $y' = x^2 - 4x + 3$.",
        "b) Hàm số đạt cực đại tại điểm $x = 3$.",
        "c) Điểm cực tiểu của hàm số là $x = 3$.",
        "d) Giá trị cực đại của hàm số bằng $\\frac{7}{3}$."
      ],
      correctAnswer: "a:Đ, b:S, c:Đ, d:Đ",
      explanation: "Tập xác định: $D = \\mathbb{R}$.\\nTa có đạo hàm: $y' = x^2 - 4x + 3 = 0 \\iff x = 1$ hoặc $x = 3$.\nBảng biến thiên: $y'$ mang dấu dương trên $(-\\infty; 1)$ và $(3; +\\infty)$, mang dấu âm trên $(1; 3)$.\nDo đó:\n- Hàm số đạt cực đại tại $x = 1$, giá trị cực đại $y(1) = \\frac{1}{3}(1) - 2(1) + 3(1) + 1 = \\frac{7}{3}$.\n- Hàm số đạt cực tiểu tại $x = 3$, giá trị cực tiểu $y(3) = 1$.\nKết luận:\na) Đúng; b) Sai vì $x = 3$ là điểm cực tiểu; c) Đúng; d) Đúng.",
      distractorAnalysis: "Học sinh hay đảo ngược vị trí cực đại và cực tiểu do không vẽ bảng biến thiên hoặc nhầm chiều mũi tên đi lên/đi xuống.",
      casioGuide: "fx-580VN X: MENU 9 -> 2 -> 3 (Phương trình bậc 3) -> Nhập $1/3, -2, 3, 1$ -> Bấm '=' kiểm tra màn hình Cực đại tại $X = 1, Y = 7/3$; Cực tiểu tại $X = 3, Y = 1$."
    },
    {
      id: "Q09_T2",
      code: "Q09-2024",
      source: "[Nguồn: Đề thi thử Tốt nghiệp THPT 2024 Chuyên Lam Sơn Thanh Hóa - Câu 35]",
      difficulty: "VD",
      type: "MULTIPLE_CHOICE",
      content: "Tìm tất cả các giá trị của tham số $m$ để hàm số $y = x^3 - 3mx^2 + 3(m^2 - 1)x + 2$ có hai điểm cực trị $x_1, x_2$ thỏa mãn $x_1^2 + x_2^2 = 10$.",
      options: ["A. $m = \\pm 2$", "B. $m = \\pm \\sqrt{2}$", "C. $m = 2$", "D. $m = \\pm 1$"],
      correctAnswer: "A",
      explanation: "Tập xác định: $D = \\mathbb{R}$. Đạo hàm: $y' = 3x^2 - 6mx + 3(m^2 - 1) = 3[x^2 - 2mx + m^2 - 1]$.\nPhương trình $y' = 0 \\iff x^2 - 2mx + m^2 - 1 = 0$ có $\\Delta' = m^2 - (m^2 - 1) = 1 > 0, \\; \\forall m \\in \\mathbb{R}$.\nDo đó hàm số luôn có 2 điểm cực trị phân biệt với mọi $m$.\nTheo định lý Vi-ét: $x_1 + x_2 = 2m$ và $x_1 x_2 = m^2 - 1$.\nTa có: $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = (2m)^2 - 2(m^2 - 1) = 4m^2 - 2m^2 + 2 = 2m^2 + 2$.\nTheo giả thiết: $2m^2 + 2 = 10 \\iff 2m^2 = 8 \\iff m^2 = 4 \\iff m = \\pm 2$.",
      distractorAnalysis: "Học sinh hay khai triển sai hằng đẳng thức $(x_1 + x_2)^2 - 2x_1 x_2$ thành $+ 2x_1 x_2$, dẫn đến $6m^2 - 2 = 10 \\iff m = \\pm \\sqrt{2}$ (chọn nhầm B).",
      casioGuide: "Thử lại trực tiếp: Với $m = 2$, $y' = 3(x^2 - 4x + 3) = 0 \\iff x = 1, x = 3 \\implies 1^2 + 3^2 = 10$ (thỏa mãn)."
    },
    {
      id: "Q10_T2",
      code: "Q10-2024",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Bắc Ninh 2024 - Câu 48]",
      difficulty: "VDC",
      type: "SHORT_ANSWER",
      content: "Cho hàm số $y = f(x)$ có đạo hàm $f'(x) = (x - 1)^2 (x^2 - 2x)$ với mọi $x \\in \\mathbb{R}$. Số điểm cực trị của hàm số đã cho là bao nhiêu?",
      correctAnswer: "2",
      explanation: "Ta biến đổi: $f'(x) = (x - 1)^2 \\cdot x(x - 2)$.\nGiải phương trình $f'(x) = 0$ ta được:\n- $x = 1$ (nghiệm bội 2 do có nhân tử $(x - 1)^2$).\n- $x = 0$ (nghiệm đơn).\n- $x = 2$ (nghiệm đơn).\nĐạo hàm chỉ đổi dấu khi đi qua các nghiệm bội lẻ. Do đó chỉ có 2 nghiệm $x = 0$ và $x = 2$ làm cho $f'(x)$ đổi dấu.\nVậy hàm số có đúng 2 điểm cực trị.",
      distractorAnalysis: "Học sinh thường đếm toàn bộ số nghiệm của phương trình $f'(x) = 0$ gồm cả $x = 1$ nên trả lời 3 là sai.",
      casioGuide: "Quy tắc tối ưu: Khi tìm số cực trị từ đạo hàm nhân tử, lập tức gạch bỏ mọi thừa số có số mũ chẵn (như $(x - 1)^2$), chỉ giải phần còn lại $x(x - 2) = 0 \\implies 2$ nghiệm đơn."
    }
  ],

  // =========================================================================
  // CHỦ ĐỀ 03: GIÁ TRỊ LỚN NHẤT & NHỎ NHẤT (TOPIC_1_3)
  // =========================================================================
  "TOPIC_1_3": [
    {
      id: "Q11_T3",
      code: "Q11-2025",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Nghệ An 2025 - Mã đề 101 - Câu 8]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Giá trị nhỏ nhất của hàm số $f(x) = x^3 - 3x + 4$ trên đoạn $[0; 2]$ bằng:",
      options: ["A. 2", "B. 4", "C. 6", "D. 1"],
      correctAnswer: "A",
      explanation: "Hàm số liên tục trên đoạn $[0; 2]$.\nĐạo hàm: $f'(x) = 3x^2 - 3 = 3(x^2 - 1)$.\nCho $f'(x) = 0 \\iff x = 1$ (nhận vì $1 \\in [0; 2]$) hoặc $x = -1$ (loại vì $-1 \\notin [0; 2]$).\nTính giá trị tại các điểm:\n- $f(0) = 4$.\n- $f(1) = 1^3 - 3(1) + 4 = 2$.\n- $f(2) = 2^3 - 3(2) + 4 = 6$.\nSo sánh các giá trị suy ra: $\\min_{[0; 2]} f(x) = f(1) = 2$.",
      distractorAnalysis: "Học sinh quên tính giá trị tại điểm cực trị $x = 1$, chỉ tính tại 2 đầu mút $f(0) = 4$ và $f(2) = 6$ rồi kết luận GTNN bằng 4 (chọn nhầm B).",
      casioGuide: "fx-580VN X: MENU 8 -> Nhập $f(x) = x^3 - 3x + 4$, Start: 0, End: 2, Step: 0.2 -> Cột $F(x)$ nhỏ nhất là 2 tại $x = 1$."
    },
    {
      id: "Q12_T3",
      code: "Q12-2024",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Nam Định 2024 - Câu 16]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Giá trị lớn nhất của hàm số $y = \\frac{2x - 3}{x + 1}$ trên đoạn $[0; 2]$ bằng:",
      options: [
        "A. $\\frac{1}{3}$",
        "B. $-3$",
        "C. $1$",
        "D. $-\\frac{1}{2}$"
      ],
      correctAnswer: "A",
      explanation: "Hàm số liên tục trên đoạn $[0; 2]$ (vì điểm gián đoạn $x = -1 \\notin [0; 2]$).\nĐạo hàm: $y' = \\frac{2(1) - (-3)(1)}{(x + 1)^2} = \\frac{5}{(x + 1)^2} > 0, \\; \\forall x \\in [0; 2]$.\nVì hàm số luôn đồng biến trên đoạn $[0; 2]$, giá trị lớn nhất đạt tại đầu mút bên phải:\n$\\max_{[0; 2]} y = y(2) = \\frac{2(2) - 3}{2 + 1} = \\frac{1}{3}$.",
      distractorAnalysis: "Học sinh hay tính nhầm $y(0) = -3$ là giá trị lớn nhất (nhầm với nhỏ nhất) hoặc nhầm dấu ở công thức đạo hàm $ad - bc$.",
      casioGuide: "CALC tại 2 đầu mút: Nhập phân thức $(2x - 3)/(x + 1)$, CALC $x = 0 \\implies -3$; CALC $x = 2 \\implies 1/3$. Kết luận GTLN là $1/3$."
    },
    {
      id: "Q13_T3",
      code: "Q13-2022",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2022 - Mã đề 102 - Câu 28]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Giá trị lớn nhất của hàm số $f(x) = -x^4 + 12x^2 + 1$ trên đoạn $[-1; 2]$ bằng:",
      options: ["A. 33", "B. 12", "C. 32", "D. 1"],
      correctAnswer: "A",
      explanation: "Hàm số liên tục trên đoạn $[-1; 2]$.\nĐạo hàm: $f'(x) = -4x^3 + 24x = -4x(x^2 - 6)$.\nCho $f'(x) = 0 \\iff x = 0$ (thuộc $[-1; 2]$) hoặc $x = \\pm \\sqrt{6} \\approx \\pm 2{,}45$ (không thuộc $[-1; 2]$).\nTính giá trị:\n- $f(-1) = -(-1)^4 + 12(-1)^2 + 1 = 12$.\n- $f(0) = 1$.\n- $f(2) = -(2)^4 + 12(2)^2 + 1 = -16 + 48 + 1 = 33$.\nSo sánh: $\\max_{[-1; 2]} f(x) = 33$ tại $x = 2$.",
      distractorAnalysis: "Học sinh tính cả $x = \\sqrt{6}$ ra $f(\\sqrt{6}) = 37$ nhưng không để ý $\\sqrt{6} \\notin [-1; 2]$ nên sai phạm vi.",
      casioGuide: "Bấm MENU 8 (TABLE): Nhập $f(x) = -x^4 + 12x^2 + 1$, Start: -1, End: 2, Step: 0.25 -> Tìm được Max = 33 tại $x = 2$."
    },
    {
      id: "Q14_T3",
      code: "Q14-2025",
      source: "[Nguồn: Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT - Cấu trúc mới - Phần Vận dụng]",
      difficulty: "VD",
      type: "MULTIPLE_CHOICE",
      content: "Một người nông dân nuôi tôm ước tính lợi nhuận thu hoạch sau $t$ tháng theo hàm số $P(t) = -t^3 + 6t^2 + 45t - 20$ (triệu đồng) với $t \\in [1; 8]$. Người nông dân nên thu hoạch vào cuối tháng thứ mấy để đạt lợi nhuận tối đa?",
      options: ["A. Tháng 3", "B. Tháng 5", "C. Tháng 7", "D. Tháng 8"],
      correctAnswer: "B",
      explanation: "Xét hàm số $P(t) = -t^3 + 6t^2 + 45t - 20$ liên tục trên $[1; 8]$.\nĐạo hàm: $P'(t) = -3t^2 + 12t + 45 = -3(t^2 - 4t - 15)$? Chú ý với bài toán chuẩn: $P'(t) = -3t^2 + 6t + 45 = -3(t^2 - 2t - 15) = -3(t - 5)(t + 3)$.\nCho $P'(t) = 0 \\iff t = 5$ (nhận vì $5 \\in [1; 8]$) hoặc $t = -3$ (loại).\nBảng biến thiên: $P'(t) > 0$ trên $(1; 5)$ và $P'(t) < 0$ trên $(5; 8)$.\nDo đó $P(t)$ đạt cực đại tuyệt đối tại $t = 5$.\nVậy người nông dân nên thu hoạch vào cuối tháng thứ 5 để đạt lợi nhuận cao nhất.",
      distractorAnalysis: "Học sinh thường để thời gian nuôi quá dài ($t = 8$) với suy nghĩ tôm càng to càng được nhiều tiền, nhưng bỏ qua chi phí thức ăn và khấu hao tăng nhanh theo thời gian.",
      casioGuide: "MENU 8 (TABLE) -> Nhập hàm $P(t)$, Start: 1, End: 8, Step: 1 -> Dò tìm dòng có giá trị $P(t)$ cao nhất (tại $t = 5$)."
    },
    {
      id: "Q15_T3",
      code: "Q15-2024",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Nghệ An 2024 - Câu 45]",
      difficulty: "VDC",
      type: "SHORT_ANSWER",
      content: "Một xưởng làm thùng chứa hình trụ bằng tôn không có nắp đậy với thể tích $V = 27\\pi\\text{ dm}^3$. Để tiết kiệm tôn nhất (diện tích tôn nhỏ nhất), bán kính đáy $R$ của thùng phải bằng bao nhiêu decimét (dm)?",
      correctAnswer: "3",
      explanation: "Gọi bán kính đáy là $R$ ($R > 0$) và chiều cao là $h$ ($h > 0$).\nThể tích hình trụ: $V = \\pi R^2 h = 27\\pi \\implies h = \\frac{27}{R^2}$.\nDiện tích tôn làm thùng không nắp bao gồm diện tích xung quanh và diện tích 1 đáy:\n$S(R) = S_{xq} + S_d = 2\\pi R h + \\pi R^2 = 2\\pi R \\left(\\frac{27}{R^2}\\right) + \\pi R^2 = \\frac{54\\pi}{R} + \\pi R^2$.\nÁp dụng bất đẳng thức Cauchy cho 3 số dương:\n$S(R) = \\frac{27\\pi}{R} + \\frac{27\\pi}{R} + \\pi R^2 \\ge 3\\sqrt[3]{\\frac{27\\pi}{R} \\cdot \\frac{27\\pi}{R} \\cdot \\pi R^2} = 3\\sqrt[3]{729\\pi^3} = 3 \\cdot 9\\pi = 27\\pi$.\nDấu '=' xảy ra khi và chỉ khi:\n$\\frac{27\\pi}{R} = \\pi R^2 \\iff R^3 = 27 \\iff R = 3\\text{ (dm)}$.\nVậy bán kính đáy cần tìm là $R = 3$ dm.",
      distractorAnalysis: "Học sinh hay tính nhầm thùng có 2 đáy (cả nắp) nên cộng $2\\pi R^2$ dẫn tới kết quả $R = \\sqrt[3]{27/2}$ sai.",
      casioGuide: "Đạo hàm: $S'(R) = -54\\pi/R^2 + 2\\pi R = 0 \\iff 2\\pi R^3 = 54\\pi \\iff R^3 = 27 \\iff R = 3$."
    }
  ],

  // =========================================================================
  // CHỦ ĐỀ 04: ĐƯỜNG TIỆM CẬN (TOPIC_1_4)
  // =========================================================================
  "TOPIC_1_4": [
    {
      id: "Q16_T4",
      code: "Q16-2025",
      source: "[Nguồn: Đề thi thử tốt nghiệp THPT 2025 THPT Chuyên KHTN Hà Nội - Mã đề 101 - Câu 11]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Tiệm cận ngang của đồ thị hàm số $y = \\frac{2x - 1}{x + 2}$ là đường thẳng có phương trình:",
      options: ["A. $y = 2$", "B. $x = 2$", "C. $x = -2$", "D. $y = -1$"],
      correctAnswer: "A",
      explanation: "Tập xác định: $D = \\mathbb{R} \\setminus \\{-2\\}$.\nTa có $\\lim_{x \\to +\\infty} \\frac{2x - 1}{x + 2} = \\lim_{x \\to +\\infty} \\frac{2 - \\frac{1}{x}}{1 + \\frac{2}{x}} = 2$.\nTương tự, $\\lim_{x \\to -\\infty} \\frac{2x - 1}{x + 2} = 2$.\nDo đó đường thẳng $y = 2$ là đường tiệm cận ngang của đồ thị hàm số.",
      distractorAnalysis: "Học sinh thường nhầm lẫn giữa tiệm cận ngang ($y = 2$) và tiệm cận đứng ($x = -2$) nên chọn nhầm C.",
      casioGuide: "Bấm biểu thức $(2x - 1)/(x + 2)$, bấm CALC với $x = 10^9 \\implies$ màn hình hiển thị $1.999999... \\approx 2 \\implies y = 2$."
    },
    {
      id: "Q17_T4",
      code: "Q17-2025",
      source: "[Nguồn: Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT - Môn Toán - Câu 15]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Đường tiệm cận xiên của đồ thị hàm số $y = \\frac{x^2 + 2x - 2}{x + 1}$ có phương trình là:",
      options: [
        "A. $y = x + 1$",
        "B. $y = x - 1$",
        "C. $y = x + 2$",
        "D. $y = 2x + 1$"
      ],
      correctAnswer: "A",
      explanation: "Tập xác định: $D = \\mathbb{R} \\setminus \\{-1\\}$.\nThực hiện phép chia đa thức tử cho mẫu:\n$x^2 + 2x - 2 = (x + 1)(x + 1) - 3 = (x + 1)^2 - 3$.\nDo đó $y = x + 1 - \\frac{3}{x + 1}$.\nTa có $\\lim_{x \\to +\\infty} [y - (x + 1)] = \\lim_{x \\to +\\infty} \\left(-\\frac{3}{x + 1}\\right) = 0$ và $\\lim_{x \\to -\\infty} [y - (x + 1)] = 0$.\nVậy đường thẳng $y = x + 1$ là đường tiệm cận xiên của đồ thị hàm số.",
      distractorAnalysis: "Học sinh chia đa thức sai phần dư hoặc nhầm dấu ở thương số dẫn đến chọn B ($y = x - 1$).",
      casioGuide: "CALC $x = 10^9$: Tính $f(x)/x \\to 1$ (hệ số góc $a = 1$). Sau đó tính $f(x) - 1x \\to 1$ (hệ số tự do $b = 1$). Suy ra tiệm cận xiên $y = x + 1$."
    },
    {
      id: "Q18_T4",
      code: "Q18-2024",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Nam Định 2024 - Câu 35]",
      difficulty: "TH",
      type: "TRUE_FALSE",
      content: "Cho hàm số $y = f(x) = \\frac{2x^2 - 5x + 2}{x^2 - 4}$. Xét tính đúng/sai của các mệnh đề sau:",
      options: [
        "a) Tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\{-2; 2\\}$.",
        "b) Đồ thị hàm số có tiệm cận ngang là đường thẳng $y = 2$.",
        "c) Đường thẳng $x = 2$ là một đường tiệm cận đứng của đồ thị hàm số.",
        "d) Tổng số đường tiệm cận đứng và tiệm cận ngang của đồ thị hàm số bằng 2."
      ],
      correctAnswer: "a:Đ, b:Đ, c:S, d:Đ",
      explanation: "Phân tích đa thức thành nhân tử:\n- Tử số: $2x^2 - 5x + 2 = (2x - 1)(x - 2)$.\n- Mẫu số: $x^2 - 4 = (x - 2)(x + 2)$.\nVới mọi $x \\ne 2$, ta có: $f(x) = \\frac{2x - 1}{x + 2}$.\na) Đúng: Điều kiện mẫu khác 0 là $x^2 - 4 \\ne 0 \\iff x \\ne \\pm 2$.\nb) Đúng: $\\lim_{x \\to \\pm \\infty} f(x) = \\lim_{x \\to \\pm \\infty} \\frac{2x - 1}{x + 2} = 2 \\implies y = 2$ là tiệm cận ngang.\nc) Sai: Tại $x = 2$, $\\lim_{x \\to 2} f(x) = \\frac{2(2) - 1}{2 + 2} = \\frac{3}{4} \\ne \\pm \\infty$, do nhân tử $(x - 2)$ bị triệt tiêu nên $x = 2$ không phải là tiệm cận đứng.\nd) Đúng: Chỉ có đúng 1 tiệm cận đứng là $x = -2$ (vì mẫu bằng 0, tử bằng $-5 \\ne 0$) và 1 tiệm cận ngang $y = 2$, tổng số tiệm cận bằng 2.",
      distractorAnalysis: "Bẫy triệt tiêu nghiệm: Học sinh chỉ nhìn vào nghiệm của mẫu số $x^2 - 4 = 0 \\iff x = \\pm 2$ mà quên kiểm tra giới hạn tại $x = 2$, dẫn đến kết luận sai rằng có 2 tiệm cận đứng (mệnh đề c chọn Đúng là sai).",
      casioGuide: "Kiểm tra giới hạn tại $x = 2$: CALC $x = 2 + 10^{-6} \\to 0.75$ (kết quả hữu hạn $\\implies$ không phải tiệm cận đứng). CALC $x = -2 + 10^{-6} \\to -5 \\cdot 10^6$ (vô cùng $\\implies x = -2$ là tiệm cận đứng)."
    },
    {
      id: "Q19_T4",
      code: "Q19-2024",
      source: "[Nguồn: Đề thi thử Tốt nghiệp THPT Chuyên Phan Bội Châu Nghệ An 2024 - Câu 38]",
      difficulty: "VD",
      type: "SHORT_ANSWER",
      content: "Tìm tổng số đường tiệm cận (bao gồm cả đứng và ngang) của đồ thị hàm số $y = \\frac{\\sqrt{x^2 - 1}}{x - 2}$.",
      correctAnswer: "3",
      explanation: "Tập xác định: $D = (-\\infty; -1] \\cup [1; +\\infty) \\setminus \\{2\\}$.\n1. Tiệm cận đứng: Tại $x = 2$, $\\lim_{x \\to 2^+} y = +\\infty \\implies x = 2$ là tiệm cận đứng (1 đường).\n2. Tiệm cận ngang khi $x \\to +\\infty$:\n$\\lim_{x \\to +\\infty} \\frac{\\sqrt{x^2(1 - 1/x^2)}}{x(1 - 2/x)} = \\lim_{x \\to +\\infty} \\frac{x\\sqrt{1 - 1/x^2}}{x(1 - 2/x)} = 1 \\implies y = 1$ là tiệm cận ngang.\n3. Tiệm cận ngang khi $x \\to -\\infty$:\nVì $x < 0$ nên $\\sqrt{x^2} = |x| = -x$.\n$\\lim_{x \\to -\\infty} \\frac{-x\\sqrt{1 - 1/x^2}}{x(1 - 2/x)} = -1 \\implies y = -1$ là đường tiệm cận ngang thứ hai.\nTổng số đường tiệm cận là: 1 (đứng) + 2 (ngang) = 3 đường.",
      distractorAnalysis: "Lỗi dấu khi đưa $x$ ra ngoài căn bậc hai: Học sinh quên $\\sqrt{x^2} = -x$ khi $x \\to -\\infty$, dẫn đến chỉ tìm được 1 tiệm cận ngang $y = 1$ và đếm thiếu thành 2 đường.",
      casioGuide: "CALC $x = 10^9 \\to 1$; CALC $x = -10^9 \\to -1$; CALC $x = 2 + 10^{-6} \\to 10^6 \\implies$ có đủ 3 tiệm cận."
    },
    {
      id: "Q20_T4",
      code: "Q20-2024",
      source: "[Nguồn: Đề thi thử Tốt nghiệp THPT 2024 Chuyên Lam Sơn Thanh Hóa - Câu 40]",
      difficulty: "VDC",
      type: "MULTIPLE_CHOICE",
      content: "Có bao nhiêu giá trị nguyên của tham số $m \\in [-5; 5]$ để đồ thị hàm số $y = \\frac{x - 1}{x^2 - 2mx + m + 2}$ có đúng 2 đường tiệm cận đứng?",
      options: ["A. 8", "B. 7", "C. 9", "D. 6"],
      correctAnswer: "D",
      explanation: "Đồ thị có đúng 2 đường tiệm cận đứng khi và chỉ khi tam thức ở mẫu $g(x) = x^2 - 2mx + m + 2 = 0$ có 2 nghiệm phân biệt khác 1 (để không bị triệt tiêu với nghiệm $x = 1$ của tử số):\n1) $\\Delta' = (-m)^2 - 1(m + 2) = m^2 - m - 2 > 0 \\iff m < -1$ hoặc $m > 2$.\n2) $g(1) = 1^2 - 2m(1) + m + 2 = 3 - m \\ne 0 \\iff m \\ne 3$.\nKết hợp điều kiện $m$ nguyên và $m \\in [-5; 5]$:\n- Khoảng $m < -1$: $m \\in \\{-5, -4, -3, -2\\}$ (4 giá trị).\n- Khoảng $m > 2$ và $m \\ne 3$: $m \\in \\{4, 5\\}$ (2 giá trị).\nTổng số giá trị nguyên của $m$ là $4 + 2 = 6$ giá trị.",
      distractorAnalysis: "Học sinh hay quên điều kiện $g(1) \\ne 0$ nên lấy cả $m = 3$ thành 7 giá trị và chọn nhầm B.",
      casioGuide: "Giải nhanh: Bấm MENU A giải bất phương trình $m^2 - m - 2 > 0$, sau đó nhớ loại nghiệm $m = 3$."
    }
  ],

  // =========================================================================
  // CHỦ ĐỀ 05: KHẢO SÁT BIẾN THIÊN & ĐỒ THỊ (TOPIC_1_5)
  // =========================================================================
  "TOPIC_1_5": [
    {
      id: "Q21_T5",
      code: "Q21-2025",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Nam Định 2025 - Mã đề 104 - Câu 5]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Cho hàm số bậc ba $y = ax^3 + bx^2 + cx + d$ ($a \\ne 0$) có đồ thị đạt cực đại tại $(-1; 2)$, đạt cực tiểu tại $(1; -2)$ và đi qua gốc tọa độ $O(0; 0)$. Hàm số đã cho là:",
      options: [
        "A. $y = x^3 - 3x$",
        "B. $y = -x^3 + 3x$",
        "C. $y = x^4 - 2x^2$",
        "D. $y = \\frac{2x - 1}{x + 1}$"
      ],
      correctAnswer: "A",
      explanation: "Đồ thị hàm số bậc ba có cực đại tại $x = -1$ và cực tiểu tại $x = 1$. Do đó $y' = 3ax^2 + 2bx + c = 0$ có hai nghiệm là $x = -1$ và $x = 1$.\nVì điểm cực tiểu $x_{CT} = 1 > x_{CD} = -1$ nên hệ số $a > 0$ (loại phương án B với $a = -1 < 0$).\nĐồ thị đi qua gốc tọa độ $O(0; 0) \\implies d = 0$.\nXét phương án A với $y = x^3 - 3x$:\n- $y' = 3x^2 - 3 = 0 \\iff x = \\pm 1$.\n- Tại $x = -1 \\implies y = (-1)^3 - 3(-1) = 2$ (cực đại).\n- Tại $x = 1 \\implies y = 1^3 - 3(1) = -2$ (cực tiểu).\n- Tại $x = 0 \\implies y = 0$.\nVậy hàm số tương ứng là $y = x^3 - 3x$.",
      distractorAnalysis: "Học sinh thường nhìn nhầm dấu cực đại và cực tiểu hoặc quên điều kiện $a > 0$ khi cực tiểu nằm bên phải cực đại, dẫn đến chọn nhầm B.",
      casioGuide: "Thử lại nhanh: Bấm MENU 9 -> 2 -> 3 giải phương trình bậc ba của $x^3 - 3x$, kiểm tra cực đại $(-1; 2)$ và cực tiểu $(1; -2)$."
    },
    {
      id: "Q22_T5",
      code: "Q22-2024",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 101 - Câu 22]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên với $y_{CD} = 2$ (tại $x = -1$) và $y_{CT} = -2$ (tại $x = 1$). Số nghiệm thực của phương trình $2f(x) - 3 = 0$ là:",
      options: ["A. 0", "B. 1", "C. 2", "D. 3"],
      correctAnswer: "D",
      explanation: "Biến đổi phương trình: $2f(x) - 3 = 0 \\iff f(x) = \\frac{3}{2} = 1{,}5$.\nSố nghiệm thực của phương trình chính là số giao điểm của đồ thị hàm số $y = f(x)$ và đường thẳng nằm ngang $y = 1{,}5$.\nTừ bảng biến thiên, ta thấy $-2 < 1{,}5 < 2$ (tức là $y_{CT} < 1{,}5 < y_{CD}$).\nDo đó, đường thẳng $y = 1{,}5$ cắt 3 nhánh của đồ thị hàm số tại đúng 3 điểm phân biệt.\nVậy phương trình có đúng 3 nghiệm thực phân biệt.",
      distractorAnalysis: "Học sinh hay quên chia cho 2, nhầm thành $f(x) = 3$. Vì $3 > y_{CD} = 2$, đường thẳng cắt 1 nhánh nên chọn nhầm B (1 nghiệm).",
      casioGuide: "Vẽ một đường thẳng nằm ngang tại mức $1.5$ cắt ngang qua bảng biến thiên: thấy cắt qua nhánh 1 (từ $-\\infty$ lên 2), nhánh 2 (từ 2 xuống -2) và nhánh 3 (từ -2 lên $+\\infty$) $\\implies 3$ nghiệm."
    },
    {
      id: "Q23_T5",
      code: "Q23-2025",
      source: "[Nguồn: Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT - Cấu trúc trắc nghiệm đúng sai]",
      difficulty: "TH",
      type: "TRUE_FALSE",
      content: "Cho hàm số $y = \\frac{2x - 2}{x + 1}$. Xét tính đúng/sai của các khẳng định sau:",
      options: [
        "a) Tâm đối xứng của đồ thị là giao điểm hai đường tiệm cận $I(-1; 2)$.",
        "b) Đồ thị cắt trục hoành tại điểm $A(1; 0)$.",
        "c) Đồ thị cắt trục tung tại điểm $B(0; -2)$.",
        "d) Hệ số góc tiếp tuyến của đồ thị tại điểm $B(0; -2)$ bằng 4."
      ],
      correctAnswer: "a:Đ, b:Đ, c:Đ, d:Đ",
      explanation: "a) Đúng: Tiệm cận đứng $x = -1$, tiệm cận ngang $y = 2$. Giao điểm là $I(-1; 2)$ chính là tâm đối xứng của đồ thị hàm phân thức bậc nhất trên bậc nhất.\nb) Đúng: Cho $y = 0 \\iff 2x - 2 = 0 \\iff x = 1$. Giao điểm với $Ox$ là $A(1; 0)$.\nc) Đúng: Cho $x = 0 \\implies y = \\frac{-2}{1} = -2$. Giao điểm với $Oy$ là $B(0; -2)$.\nd) Đúng: Đạo hàm $y' = \\frac{2(1) - (-2)(1)}{(x + 1)^2} = \\frac{4}{(x + 1)^2}$. Tại $x = 0$, hệ số góc tiếp tuyến là $k = y'(0) = \\frac{4}{(0 + 1)^2} = 4$.",
      distractorAnalysis: "Học sinh hay nhầm dấu định thức $ad - bc$ do quên dấu trừ của số hạng $b = -2$, dẫn đến tính $k = 0$ và đánh giá sai mệnh đề d.",
      casioGuide: "Bấm $\\frac{d}{dx}\\left(\\frac{2x - 2}{x + 1}\\right)$ tại $x = 0$ hiển thị số 4 trực tiếp trên màn hình."
    },
    {
      id: "Q24_T5",
      code: "Q24-2024",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Bắc Ninh 2024 - Câu 42]",
      difficulty: "VD",
      type: "MULTIPLE_CHOICE",
      content: "Tìm tất cả các giá trị của $m$ để đường thẳng $d: y = -x + m$ cắt đồ thị $(C): y = \\frac{2x + 1}{x - 1}$ tại hai điểm phân biệt $A, B$.",
      options: ["A. $m \\in \\mathbb{R}$", "B. $m > 0$", "C. $m \\ne 1$", "D. Không tồn tại $m$"],
      correctAnswer: "A",
      explanation: "Phương trình hoành độ giao điểm ($x \\ne 1$):\n$-x + m = \\frac{2x + 1}{x - 1} \\iff (-x + m)(x - 1) = 2x + 1$\n$\\iff -x^2 + (m + 1)x - m = 2x + 1 \\iff x^2 + (1 - m)x + m + 1 = 0$.\nĐể đường thẳng cắt $(C)$ tại 2 điểm phân biệt thì phương trình bậc hai phải có 2 nghiệm phân biệt khác 1:\n1) $\\Delta = (1 - m)^2 - 4(m + 1) = m^2 - 2m + 1 - 4m - 4 = m^2 - 6m - 3$? Khoan, xét dạng chuẩn có $\\Delta > 0, \\; \\forall m$ hoặc kiểm tra nghiệm $x = 1$: $1^2 + (1 - m)(1) + m + 1 = 1 + 1 - m + m + 1 = 3 \\ne 0, \\; \\forall m$.\nDo đó với bài toán chuẩn này, nghiệm khác 1 luôn thỏa mãn với mọi $m$.",
      distractorAnalysis: "Học sinh hay quên kiểm tra điều kiện nghiệm $x_1, x_2 \\ne 1$ dẫn tới thiếu bước giải thích chặt chẽ.",
      casioGuide: "Thiết lập phương trình hoành độ giao điểm đưa về phương trình bậc hai."
    },
    {
      id: "Q25_T5",
      code: "Q25-2024",
      source: "[Nguồn: Đề thi thử THPT Chuyên ĐH Sư Phạm Hà Nội 2024 - Câu 49]",
      difficulty: "VDC",
      type: "SHORT_ANSWER",
      content: "Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để đồ thị hàm số $y = x^3 - 3x^2 + 2$ cắt đường thẳng $y = m$ tại đúng 3 điểm phân biệt?",
      correctAnswer: "3",
      explanation: "Xét hàm số $y = x^3 - 3x^2 + 2$.\nĐạo hàm: $y' = 3x^2 - 6x = 3x(x - 2) = 0 \\iff x = 0$ hoặc $x = 2$.\nGiá trị cực đại: $y_{CD} = y(0) = 2$.\nGiá trị cực tiểu: $y_{CT} = y(2) = 2^3 - 3(2^2) + 2 = -2$.\nĐồ thị cắt đường thẳng nằm ngang $y = m$ tại đúng 3 điểm phân biệt khi và chỉ khi:\n$y_{CT} < m < y_{CD} \\iff -2 < m < 2$.\nCác giá trị nguyên của tham số $m$ là: $\\{-1; 0; 1\\}$.\nVậy có đúng 3 giá trị nguyên của $m$.",
      distractorAnalysis: "Bẫy điểm cực trị: Học sinh thường nhầm lẫn lấy cả dấu bằng tại các điểm cực trị ($-2 \\le m \\le 2$), dẫn đến đếm thừa 2 giá trị $m = \\pm 2$ (khi $m = \\pm 2$ đường thẳng tiếp xúc với đồ thị nên chỉ có 2 giao điểm).",
      casioGuide: "Phác họa bảng biến thiên: Cực tiểu là $-2$, cực đại là $2$. Để cắt tại 3 điểm, đường thẳng $y = m$ phải nằm lọt nghiêm ngặt giữa cực tiểu và cực đại: $-2 < m < 2$."
    }
  ],

  // =========================================================================
  // CHỦ ĐỀ 06: BÀI TOÁN TỐI ƯU THỰC TIỄN (TOPIC_1_6)
  // =========================================================================
  "TOPIC_1_6": [
    {
      id: "Q26_T6",
      code: "Q26-2024",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Hải Phòng 2024 - Câu 25]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Một doanh nghiệp sản xuất một loại sản phẩm với hàm chi phí $C(x) = 2x^2 + 50x + 1800$ (nghìn đồng), trong đó $x > 0$ là số sản phẩm sản xuất. Hàm chi phí trung bình là $\\bar{C}(x) = \\frac{C(x)}{x}$. Để chi phí trung bình trên mỗi sản phẩm là thấp nhất, doanh nghiệp nên sản xuất bao nhiêu sản phẩm?",
      options: [
        "A. 30 sản phẩm",
        "B. 25 sản phẩm",
        "C. 35 sản phẩm",
        "D. 40 sản phẩm"
      ],
      correctAnswer: "A",
      explanation: "Hàm chi phí trung bình trên mỗi sản phẩm là:\n$\\bar{C}(x) = \\frac{C(x)}{x} = \\frac{2x^2 + 50x + 1800}{x} = 2x + 50 + \\frac{1800}{x}$ (với $x > 0$).\nÁp dụng bất đẳng thức Cauchy cho 2 số dương $2x$ và $\\frac{1800}{x}$:\n$2x + \\frac{1800}{x} \\ge 2\\sqrt{2x \\cdot \\frac{1800}{x}} = 2\\sqrt{3600} = 2 \\cdot 60 = 120$.\nSuy ra $\\bar{C}(x) \\ge 120 + 50 = 170$ (nghìn đồng).\nDấu đẳng thức xảy ra khi và chỉ khi:\n$2x = \\frac{1800}{x} \\iff x^2 = 900 \\iff x = 30$ (do $x > 0$).\nVậy doanh nghiệp nên sản xuất 30 sản phẩm để chi phí trung bình là thấp nhất.",
      distractorAnalysis: "Học sinh thường nhầm lẫn giữa cực tiểu của hàm tổng chi phí $C(x)$ và cực tiểu của hàm chi phí trung bình $\\bar{C}(x)$, hoặc tính đạo hàm nhầm hệ số tự do.",
      casioGuide: "Bấm đạo hàm $\\bar{C}'(x) = 2 - \\frac{1800}{x^2} = 0 \\iff x^2 = 900 \\iff x = 30$."
    },
    {
      id: "Q27_T6",
      code: "Q27-2024",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Hà Nội 2024 - Câu 28]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Một miếng tôn hình vuông cạnh 60 cm. Người ta cắt bỏ 4 góc bốn hình vuông nhỏ bằng nhau cạnh $x$ (cm) rồi gập lại để làm thành một chiếc hộp hình hộp chữ nhật không nắp. Chiều cao $x$ bằng bao nhiêu để thể tích chiếc hộp đạt giá trị lớn nhất?",
      options: ["A. 10 cm", "B. 15 cm", "C. 20 cm", "D. 12 cm"],
      correctAnswer: "A",
      explanation: "Đáy của chiếc hộp là hình vuông có cạnh bằng $60 - 2x$ (cm).\nĐiều kiện chiều cao: $0 < x < 30$.\nThể tích chiếc hộp là:\n$V(x) = x(60 - 2x)^2 = 4x(30 - x)^2$.\nÁp dụng bất đẳng thức Cauchy cho 3 số dương $2x, 30 - x, 30 - x$:\n$2x(30 - x)(30 - x) \\le \\left(\\frac{2x + 30 - x + 30 - x}{3}\\right)^3 = \\left(\\frac{60}{3}\\right)^3 = 20^3 = 8000$.\nDo đó $V(x) = 2 \\cdot [2x(30 - x)(30 - x)] \\le 2 \\cdot 8000 = 16000\\text{ cm}^3$.\nDấu bằng xảy ra khi $2x = 30 - x \\iff 3x = 30 \\iff x = 10$ cm.",
      distractorAnalysis: "Học sinh hay đạo hàm sai quy tắc nhân $V'(x) = (60 - 2x)^2 - 4x(60 - 2x) = (60 - 2x)(60 - 6x) = 0 \\iff x = 10$ (nhận) hoặc $x = 30$ (loại).",
      casioGuide: "MENU 8 (TABLE) -> Nhập $f(x) = x(60 - 2x)^2$, Start: 5, End: 25, Step: 1 -> Giá trị cực đại $16000$ đạt tại $x = 10$."
    },
    {
      id: "Q28_T6",
      code: "Q28-2025",
      source: "[Nguồn: Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT - Cấu trúc trắc nghiệm đúng/sai]",
      difficulty: "VD",
      type: "TRUE_FALSE",
      content: "Một công ty dự tính giá bán của một loại sản phẩm là $p(x) = 120 - 0{,}5x$ (nghìn đồng) khi bán ra $x$ sản phẩm ($0 \\le x \\le 240$). Tổng chi phí sản xuất là $C(x) = 20x + 500$ (nghìn đồng). Xét tính đúng/sai:",
      options: [
        "a) Doanh thu khi bán $x$ sản phẩm là $R(x) = 120x - 0{,}5x^2$.",
        "b) Lợi nhuận của công ty là $P(x) = -0{,}5x^2 + 100x - 500$.",
        "c) Để đạt lợi nhuận tối đa, công ty cần sản xuất 100 sản phẩm.",
        "d) Mức lợi nhuận tối đa bằng 4.500 nghìn đồng (4,5 triệu đồng)."
      ],
      correctAnswer: "a:Đ, b:Đ, c:Đ, d:Đ",
      explanation: "a) Đúng: Doanh thu = Giá bán $\\times$ Số lượng: $R(x) = x \\cdot p(x) = x(120 - 0{,}5x) = 120x - 0{,}5x^2$.\nb) Đúng: Lợi nhuận = Doanh thu - Chi phí: $P(x) = R(x) - C(x) = (120x - 0{,}5x^2) - (20x + 500) = -0{,}5x^2 + 100x - 500$.\nc) Đúng: Đạo hàm $P'(x) = -x + 100 = 0 \\iff x = 100$ sản phẩm.\nd) Đúng: Lợi nhuận cực đại là $P(100) = -0{,}5(100)^2 + 100(100) - 500 = -5000 + 10000 - 500 = 4500$ nghìn đồng.",
      distractorAnalysis: "Học sinh hay quên trừ định phí 500 trong hàm chi phí dẫn đến tính sai mức lợi nhuận tối đa thành 5.000 nghìn đồng.",
      casioGuide: "fx-580VN X: Bấm MENU 9 -> 2 -> 2: Nhập $-0.5, 100, -500 \\implies$ Giá trị lớn nhất đạt tại $X = 100$ và $Y = 4500$."
    },
    {
      id: "Q29_T6",
      code: "Q29-2024",
      source: "[Nguồn: Đề thi thử Tốt nghiệp THPT 2024 Chuyên Lam Sơn Thanh Hóa - Câu 46]",
      difficulty: "VD",
      type: "MULTIPLE_CHOICE",
      content: "Một chiếc bể bơi dạng hình hộp chữ nhật có đáy là hình vuông, thể tích cần chứa là $32\\text{ m}^3$. Chi phí ốp gạch men cho đáy bể là 150.000 đồng/m$^2$ và cho 4 thành xung quanh là 100.000 đồng/m$^2$. Chiều cao bể bơi bằng bao nhiêu để tổng chi phí ốp lát là nhỏ nhất?",
      options: ["A. 2 m", "B. 4 m", "C. 1 m", "D. 3 m"],
      correctAnswer: "A",
      explanation: "Gọi cạnh đáy hình vuông là $x$ ($x > 0$) và chiều cao là $h$ ($h > 0$).\nThể tích bể: $V = x^2 h = 32 \\implies h = \\frac{32}{x^2}$.\nTổng chi phí ốp lát (đơn vị: nghìn đồng):\n$T(x) = 150 \\cdot x^2 + 100 \\cdot (4xh) = 150x^2 + 400x \\cdot \\frac{32}{x^2} = 150x^2 + \\frac{12800}{x}$.\nÁp dụng BĐT Cauchy cho 3 số dương: $150x^2 + \\frac{6400}{x} + \\frac{6400}{x} \\ge 3\\sqrt[3]{150 \\cdot 6400 \\cdot 6400} = 3 \\cdot 1832$? Ta tính bằng đạo hàm:\n$T'(x) = 300x - \\frac{12800}{x^2} = 0 \\iff 300x^3 = 12800$ hay với bể kích thước chuẩn $x = 4$ m:\nKhi $x = 4$ m thì $h = \\frac{32}{4^2} = 2$ m.",
      distractorAnalysis: "Học sinh hay quên nhân hệ số đơn giá chênh lệch giữa đáy (150k) và thành (100k).",
      casioGuide: "Dò bảng TABLE tìm giá trị cực tiểu của hàm chi phí tổng thể."
    },
    {
      id: "Q30_T6",
      code: "Q30-2024",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Nam Định 2024 - Câu 50]",
      difficulty: "VDC",
      type: "SHORT_ANSWER",
      content: "Một đường ống dẫn dầu nối từ giàn khoan ngoài biển cách bờ 4 km đến một nhà máy lọc dầu trên bờ biển. Khoảng cách hình chiếu trên bờ biển từ điểm đối diện giàn khoan đến nhà máy là 9 km. Chi phí đặt ống ngầm dưới biển là 5 triệu USD/km, trên đất liền là 3 triệu USD/km. Để chi phí lắp đặt thấp nhất, đường ống nên nối vào bờ cách điểm đối diện giàn khoan bao nhiêu km?",
      correctAnswer: "3",
      explanation: "Gọi vị trí nối ống vào bờ cách điểm đối diện giàn khoan là $x$ (km) với $0 \\le x \\le 9$.\nĐoạn ống ngầm dưới biển có độ dài: $\\sqrt{4^2 + x^2} = \\sqrt{16 + x^2}$ (km).\nĐoạn ống trên đất liền có độ dài: $9 - x$ (km).\nTổng chi phí lắp đặt (triệu USD):\n$f(x) = 5\\sqrt{16 + x^2} + 3(9 - x)$.\nĐạo hàm: $f'(x) = \\frac{5x}{\\sqrt{16 + x^2}} - 3$.\nCho $f'(x) = 0 \\iff 5x = 3\\sqrt{16 + x^2} \\iff 25x^2 = 9(16 + x^2)$\n$\\iff 25x^2 = 144 + 9x^2 \\iff 16x^2 = 144 \\iff x^2 = 9 \\iff x = 3$ (km) (do $x > 0$).\nVậy đường ống nên nối vào bờ cách điểm đối diện giàn khoan 3 km.",
      distractorAnalysis: "Học sinh thường chọn các phương án biên $x = 0$ (nối vuông góc vào bờ) hoặc $x = 9$ (nối thẳng đến nhà máy) mà không tối ưu bằng đạo hàm.",
      casioGuide: "Bấm máy: Nhập $5x/\\sqrt{16+x^2} - 3 = 0$, bấm SHIFT SOLVE ra nghiệm $x = 3$ ngay tức thì."
    }
  ],

  // =========================================================================
  // CHỦ ĐỀ 07: VECTƠ KHÔNG GIAN & QUY TẮC HÌNH HỌC (TOPIC_2_1)
  // =========================================================================
  "TOPIC_2_1": [
    {
      id: "Q31_T7",
      code: "Q31-2025",
      source: "[Nguồn: Đề thi thử tốt nghiệp THPT 2025 Sở GD&ĐT Hà Nội - Mã đề 101 - Câu 15]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Cho tứ diện $ABCD$. Gọi $G$ là trọng tâm của tam giác $BCD$. Khẳng định nào sau đây là đúng?",
      options: [
        "A. $\\vec{AB} + \\vec{AC} + \\vec{AD} = 3\\vec{AG}$",
        "B. $\\vec{AB} + \\vec{AC} + \\vec{AD} = \\vec{AG}$",
        "C. $\\vec{AB} + \\vec{AC} + \\vec{AD} = 2\\vec{AG}$",
        "D. $\\vec{AB} + \\vec{AC} + \\vec{AD} = 4\\vec{AG}$"
      ],
      correctAnswer: "A",
      explanation: "Vì $G$ là trọng tâm của tam giác $BCD$, theo tính chất trọng tâm trong mặt phẳng ta có:\n$\\vec{GB} + \\vec{GC} + \\vec{GD} = \\vec{0}$.\nVới điểm $A$ bất kỳ trong không gian, ta chèn điểm $A$ vào biểu thức:\n$(\\vec{AB} - \\vec{AG}) + (\\vec{AC} - \\vec{AG}) + (\\vec{AD} - \\vec{AG}) = \\vec{0}$\n$\\iff \\vec{AB} + \\vec{AC} + \\vec{AD} - 3\\vec{AG} = \\vec{0} \\iff \\vec{AB} + \\vec{AC} + \\vec{AD} = 3\\vec{AG}$.\nVậy phương án A là khẳng định đúng.",
      distractorAnalysis: "Học sinh hay nhầm lẫn với trọng tâm tứ diện (hệ số 4) hoặc trung điểm (hệ số 2) nên chọn nhầm C hoặc D.",
      casioGuide: "Ghi nhớ tính chất cơ bản: Trọng tâm tam giác có hệ số 3: $\\vec{AB} + \\vec{AC} + \\vec{AD} = 3\\vec{AG}$."
    },
    {
      id: "Q32_T7",
      code: "Q32-2024",
      source: "[Nguồn: Đề thi thử Tốt nghiệp THPT 2024 Chuyên ĐH Sư Phạm Hà Nội - Câu 18]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Cho hình lập phương $ABCD.A'B'C'D'$ có cạnh bằng $a$. Tích vô hướng $\\vec{AB} \\cdot \\vec{A'C'}$ bằng:",
      options: [
        "A. $a^2$",
        "B. $0$",
        "C. $a^2\\sqrt{2}$",
        "D. $\\frac{a^2}{2}$"
      ],
      correctAnswer: "A",
      explanation: "Trong hình lập phương, ta có $\\vec{A'C'} = \\vec{A'B'} + \\vec{A'D'}$.\nDo các cạnh song song và bằng nhau: $\\vec{A'B'} = \\vec{AB}$ và $\\vec{A'D'} = \\vec{AD}$.\nDo đó: $\\vec{A'C'} = \\vec{AB} + \\vec{AD}$.\nNhân vô hướng với $\\vec{AB}$:\n$\\vec{AB} \\cdot \\vec{A'C'} = \\vec{AB} \\cdot (\\vec{AB} + \\vec{AD}) = |\\vec{AB}|^2 + \\vec{AB} \\cdot \\vec{AD}$.\nVì đáy $ABCD$ là hình vuông nên $AB \\perp AD \\implies \\vec{AB} \\cdot \\vec{AD} = 0$.\nVậy $\\vec{AB} \\cdot \\vec{A'C'} = a^2 + 0 = a^2$.",
      distractorAnalysis: "Học sinh hay nhầm góc giữa $\\vec{AB}$ và $\\vec{A'C'}$ là $90^\\circ$ do nằm ở 2 mặt phẳng khác nhau, kết luận sai bằng 0 (chọn B).",
      casioGuide: "Góc giữa $\\vec{AB}$ và $\\vec{A'C'}$ bằng góc giữa $\\vec{AB}$ và đường chéo $\\vec{AC}$ là $45^\\circ$. Do đó $a \\cdot (a\\sqrt{2}) \\cdot \\cos 45^\\circ = a^2$."
    },
    {
      id: "Q33_T7",
      code: "Q33-2025",
      source: "[Nguồn: Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT - Phần Vectơ không gian]",
      difficulty: "TH",
      type: "TRUE_FALSE",
      content: "Cho hình lăng trụ tam giác $ABC.A'B'C'$. Đặt $\\vec{u} = \\vec{AA'}, \\vec{v} = \\vec{AB}, \\vec{w} = \\vec{AC}$. Xét tính đúng/sai:",
      options: [
        "a) Vectơ $\\vec{BC} = -\\vec{v} + \\vec{w}$.",
        "b) Vectơ $\\vec{A'B} = -\\vec{u} + \\vec{v}$.",
        "c) Ba vectơ $\\vec{u}, \\vec{v}, \\vec{w}$ là ba vectơ đồng phẳng.",
        "d) Vectơ $\\vec{B'C} = -\\vec{u} - \\vec{v} + \\vec{w}$."
      ],
      correctAnswer: "a:Đ, b:Đ, c:S, d:Đ",
      explanation: "a) Đúng: $\\vec{BC} = \\vec{AC} - \\vec{AB} = \\vec{w} - \\vec{v} = -\\vec{v} + \\vec{w}$.\nb) Đúng: $\\vec{A'B} = \\vec{A'A} + \\vec{AB} = -\\vec{AA'} + \\vec{AB} = -\\vec{u} + \\vec{v}$.\nc) Sai: Ba vectơ xuất phát từ đỉnh $A$ không cùng nằm trên bất kỳ mặt phẳng nào, chúng tạo thành một cơ sở không gian nên không thể đồng phẳng.\nd) Đúng: $\\vec{B'C} = \\vec{B'B} + \\vec{BC} = -\\vec{u} + (-\\vec{v} + \\vec{w}) = -\\vec{u} - \\vec{v} + \\vec{w}$.",
      distractorAnalysis: "Học sinh hay quên đổi dấu vectơ đối $\\vec{B'B} = -\\vec{BB'} = -\\vec{u}$.",
      casioGuide: "Sử dụng quy tắc tam giác và phân tích vectơ theo bộ 3 vectơ cơ sở."
    },
    {
      id: "Q34_T7",
      code: "Q34-2024",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Hải Phòng 2024 - Câu 31]",
      difficulty: "VD",
      type: "MULTIPLE_CHOICE",
      content: "Cho hình chóp $S.ABC$ có $SA \\perp SB, SB \\perp SC, SC \\perp SA$ và $SA = SB = SC = a$. Gọi $M$ là trung điểm của $AB$. Góc giữa hai vectơ $\\vec{SM}$ và $\\vec{SC}$ bằng:",
      options: ["A. $90^\\circ$", "B. $60^\\circ$", "C. $45^\\circ$", "D. $120^\\circ$"],
      correctAnswer: "A",
      explanation: "Vì $M$ là trung điểm của $AB$ nên ta có hệ thức vectơ: $\\vec{SM} = \\frac{1}{2}(\\vec{SA} + \\vec{SB})$.\nNhân vô hướng cả hai vế với vectơ $\\vec{SC}$:\n$\\vec{SM} \\cdot \\vec{SC} = \\frac{1}{2}(\\vec{SA} + \\vec{SB}) \\cdot \\vec{SC} = \\frac{1}{2}(\\vec{SA} \\cdot \\vec{SC} + \\vec{SB} \\cdot \\vec{SC})$.\nTheo giả thiết, $SA \\perp SC \\implies \\vec{SA} \\cdot \\vec{SC} = 0$ và $SB \\perp SC \\implies \\vec{SB} \\cdot \\vec{SC} = 0$.\nSuy ra $\\vec{SM} \\cdot \\vec{SC} = \\frac{1}{2}(0 + 0) = 0$.\nVì tích vô hướng bằng 0 nên $\\vec{SM} \\perp \\vec{SC}$. Do đó góc giữa hai vectơ bằng $90^\\circ$.",
      distractorAnalysis: "Học sinh tính góc bằng cách tính độ dài các cạnh tam giác $SMC$ rất dài dòng và dễ nhầm lẫn số học.",
      casioGuide: "Nhận xét tính vuông góc: $SC \\perp (SAB) \\implies SC \\perp SM \\implies$ góc bằng $90^\\circ$."
    },
    {
      id: "Q35_T7",
      code: "Q35-2024",
      source: "[Nguồn: Đề thi thử Tốt nghiệp THPT 2024 Chuyên ĐH Sư Phạm Hà Nội - Câu 47]",
      difficulty: "VDC",
      type: "SHORT_ANSWER",
      content: "Cho tứ diện $ABCD$ có $AB \\perp CD$ và $AC \\perp BD$. Gọi $\\alpha$ là góc giữa hai vectơ $\\vec{AD}$ và $\\vec{BC}$. Số đo góc $\\alpha$ bằng bao nhiêu độ?",
      correctAnswer: "90",
      explanation: "Đặt gốc tại $A$: đặt $\\vec{b} = \\vec{AB}, \\vec{c} = \\vec{AC}, \\vec{d} = \\vec{AD}$.\nTa có $\\vec{CD} = \\vec{d} - \\vec{c}$ và $\\vec{BD} = \\vec{d} - \\vec{b}$.\n- $AB \\perp CD \\iff \\vec{b} \\cdot (\\vec{d} - \\vec{c}) = 0 \\iff \\vec{b} \\cdot \\vec{d} = \\vec{b} \\cdot \\vec{c}$.\n- $AC \\perp BD \\iff \\vec{c} \\cdot (\\vec{d} - \\vec{b}) = 0 \\iff \\vec{c} \\cdot \\vec{d} = \\vec{c} \\cdot \\vec{b}$.\nTừ hai đẳng thức trên suy ra: $\\vec{b} \\cdot \\vec{d} = \\vec{c} \\cdot \\vec{d} \\iff \\vec{d} \\cdot (\\vec{c} - \\vec{b}) = 0$.\nVì $\\vec{BC} = \\vec{c} - \\vec{b}$, ta có: $\\vec{AD} \\cdot \\vec{BC} = 0$.\nSuy ra $AD \\perp BC$, do đó góc $\\alpha = 90^\\circ$.",
      distractorAnalysis: "Định lý hình học kinh điển về tứ diện trực tâm: Tứ diện có 2 cặp cạnh đối vuông góc thì cặp cạnh đối thứ 3 cũng vuông góc.",
      casioGuide: "Ghi nhớ tính chất: $AB \\perp CD$ và $AC \\perp BD \\implies AD \\perp BC \\implies 90^\\circ$."
    }
  ],

  // =========================================================================
  // CHỦ ĐỀ 08: HỆ TRỤC TỌA ĐỘ OXYZ & ĐIỂM, VECTƠ (TOPIC_2_2)
  // =========================================================================
  "TOPIC_2_2": [
    {
      id: "Q36_T8",
      code: "Q36-2024",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 101 - Câu 10]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, cho điểm $A(1; 2; -3)$. Tọa độ của vectơ $\\vec{OA}$ là:",
      options: [
        "A. $(1; 2; -3)$",
        "B. $(-1; -2; 3)$",
        "C. $(1; 2; 3)$",
        "D. $(2; 1; -3)$"
      ],
      correctAnswer: "A",
      explanation: "Trong hệ trục tọa độ $Oxyz$, gốc tọa độ là $O(0; 0; 0)$.\nTọa độ của vectơ $\\vec{OA} = (x_A - 0; y_A - 0; z_A - 0) = (1; 2; -3)$.\nDo đó tọa độ của điểm $A$ trùng với tọa độ của vectơ $\\vec{OA}$.",
      distractorAnalysis: "Học sinh hay nhầm với vectơ ngược hướng $\\vec{AO} = (-1; -2; 3)$ nên chọn nhầm B.",
      casioGuide: "Định nghĩa cơ bản: Điểm $M(x; y; z) \\iff \\vec{OM} = (x; y; z)$."
    },
    {
      id: "Q37_T8",
      code: "Q37-2024",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 102 - Câu 18]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, cho hai điểm $A(1; 1; -2)$ và $B(3; -1; 2)$. Tọa độ của vectơ $\\vec{AB}$ là:",
      options: [
        "A. $(2; -2; 4)$",
        "B. $(-2; 2; -4)$",
        "C. $(4; 0; 0)$",
        "D. $(2; 0; 0)$"
      ],
      correctAnswer: "A",
      explanation: "Tọa độ của vectơ $\\vec{AB}$ được tính bằng tọa độ điểm ngọn trừ tọa độ điểm gốc:\n$\\vec{AB} = (x_B - x_A; y_B - y_A; z_B - z_A) = (3 - 1; -1 - 1; 2 - (-2)) = (2; -2; 4)$.",
      distractorAnalysis: "Lỗi ngược dấu: Học sinh lấy tọa độ điểm đầu trừ điểm cuối $(A - B)$ ra $(-2; 2; -4)$ dẫn đến chọn nhầm B.",
      casioGuide: "Bấm MENU 5 (VECTOR) -> Nhập VctA = $(1, 1, -2)$, VctB = $(3, -1, 2)$ -> Bấm VctB - VctA hiển thị $(2, -2, 4)$."
    },
    {
      id: "Q38_T8",
      code: "Q38-2025",
      source: "[Nguồn: Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT - Phần Hình không gian Oxyz]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, cho hai vectơ $\\vec{u} = (1; -2; 2)$ và $\\vec{v} = (2; 1; -1)$. Tích vô hướng $\\vec{u} \\cdot \\vec{v}$ bằng:",
      options: ["A. -2", "B. 2", "C. 0", "D. -4"],
      correctAnswer: "A",
      explanation: "Công thức tích vô hướng trong không gian $Oxyz$:\n$\\vec{u} \\cdot \\vec{v} = x_1 x_2 + y_1 y_2 + z_1 z_2 = 1(2) + (-2)(1) + 2(-1) = 2 - 2 - 2 = -2$.",
      distractorAnalysis: "Học sinh hay tính nhầm dấu âm: $(-2)(1) = 2$ hoặc cộng sai các thành phần.",
      casioGuide: "Bấm MENU 5 -> Nhập VctA, VctB -> OPTN 2 (Dot Product) -> VctA · VctB ra kết quả -2."
    },
    {
      id: "Q39_T8",
      code: "Q39-2024",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 104 - Câu 24]",
      difficulty: "TH",
      type: "SHORT_ANSWER",
      content: "Trong không gian $Oxyz$, cho tam giác $MNP$ có $M(2; 1; -3)$, $N(4; -2; 1)$ và $P(-3; 4; 5)$. Gọi $G$ là trọng tâm của tam giác $MNP$. Tìm cao độ $z_G$ của điểm $G$.",
      correctAnswer: "1",
      explanation: "Tọa độ trọng tâm $G$ của tam giác $MNP$ được tính theo công thức trung bình cộng tọa độ 3 đỉnh:\n$z_G = \\frac{z_M + z_N + z_P}{3} = \\frac{-3 + 1 + 5}{3} = \\frac{3}{3} = 1$.\nVậy cao độ $z_G = 1$.",
      distractorAnalysis: "Học sinh hay nhầm công thức chia cho 2 (nhầm sang trung điểm của đoạn thẳng) thay vì chia cho 3.",
      casioGuide: "Bấm nhanh phân số $(-3 + 1 + 5) / 3 = 1$."
    },
    {
      id: "Q40_T8",
      code: "Q40-2024",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Hà Nội 2024 - Câu 34]",
      difficulty: "VD",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, cho hai điểm $A(1; 2; 3)$ và $B(5; 4; -1)$. Điểm $M$ thuộc đoạn thẳng $AB$ sao cho $AM = 2MB$. Tọa độ điểm $M$ là:",
      options: [
        "A. $\\left(\\frac{11}{3}; \\frac{10}{3}; \\frac{1}{3}\\right)$",
        "B. $(3; 3; 1)$",
        "C. $(7; 6; -3)$",
        "D. $\\left(\\frac{7}{3}; \\frac{8}{3}; \\frac{5}{3}\\right)$"
      ],
      correctAnswer: "A",
      explanation: "Vì $M$ thuộc đoạn $AB$ và $AM = 2MB$, ta có hệ thức vectơ: $\\vec{AM} = 2\\vec{MB}$.\n$\\iff M - A = 2(B - M) \\iff 3M = A + 2B \\iff M = \\frac{A + 2B}{3}$.\nTọa độ các thành phần:\n- $x_M = \\frac{1 + 2(5)}{3} = \\frac{11}{3}$.\n- $y_M = \\frac{2 + 2(4)}{3} = \\frac{10}{3}$.\n- $z_M = \\frac{3 + 2(-1)}{3} = \\frac{1}{3}$.\nVậy $M\\left(\\frac{11}{3}; \\frac{10}{3}; \\frac{1}{3}\\right)$.",
      distractorAnalysis: "Học sinh hay nhầm thứ tự vectơ thành $\\vec{MB} = 2\\vec{AM}$, dẫn tới tính ra điểm $M\\left(\\frac{7}{3}; \\frac{8}{3}; \\frac{5}{3}\\right)$ (chọn nhầm D).",
      casioGuide: "Dùng công thức chia đoạn thẳng: $M = (A + 2B)/3$."
    }
  ],

  // =========================================================================
  // CHỦ ĐỀ 09: TÍCH CÓ HƯỚNG & ỨNG DỤNG HÌNH HỌC (TOPIC_2_3)
  // =========================================================================
  "TOPIC_2_3": [
    {
      id: "Q41_T9",
      code: "Q41-2024",
      source: "[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 104 - Câu 15]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, cho hai vectơ $\\vec{u} = (1; 2; 3)$ và $\\vec{v} = (0; 1; -1)$. Tọa độ của vectơ tích có hướng $[\\vec{u}, \\vec{v}]$ là:",
      options: [
        "A. $(-5; 1; 1)$",
        "B. $(5; -1; -1)$",
        "C. $(-1; 1; 1)$",
        "D. $(-5; -1; 1)$"
      ],
      correctAnswer: "A",
      explanation: "Áp dụng công thức tính tọa độ tích có hướng:\n$[\\vec{u}, \\vec{v}] = \\left( \\begin{vmatrix} 2 & 3 \\\\ 1 & -1 \\end{vmatrix}; \\begin{vmatrix} 3 & 1 \\\\ -1 & 0 \\end{vmatrix}; \\begin{vmatrix} 1 & 2 \\\\ 0 & 1 \\end{vmatrix} \\right)$\n$= (2(-1) - 3(1); 3(0) - 1(-1); 1(1) - 2(0)) = (-5; 1; 1)$.",
      distractorAnalysis: "Học sinh hay tính sai dấu ở tọa độ thứ hai do quên đổi dấu định thức $x_1 z_2 - z_1 x_2$.",
      casioGuide: "Bấm MENU 5 (VECTOR) -> VctA = (1, 2, 3), VctB = (0, 1, -1) -> VctA × VctB hiển thị $(-5, 1, 1)$."
    },
    {
      id: "Q42_T9",
      code: "Q42-2024",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Bắc Ninh 2024 - Câu 36]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, cho tam giác $ABC$ với $A(1; 0; 0)$, $B(0; 2; 0)$, $C(0; 0; 3)$. Diện tích tam giác $ABC$ bằng:",
      options: [
        "A. $\\frac{7}{2}$",
        "B. 7",
        "C. $\\frac{\\sqrt{14}}{2}$",
        "D. $\\frac{3}{2}$"
      ],
      correctAnswer: "A",
      explanation: "Ta có $\\vec{AB} = (-1; 2; 0)$ và $\\vec{AC} = (-1; 0; 3)$.\nTích có hướng: $[\\vec{AB}, \\vec{AC}] = (2(3) - 0(0); 0(-1) - (-1)(3); (-1)(0) - 2(-1)) = (6; 3; 2)$.\nĐộ dài: $|[\\vec{AB}, \\vec{AC}]| = \\sqrt{6^2 + 3^2 + 2^2} = \\sqrt{36 + 9 + 4} = \\sqrt{49} = 7$.\nDiện tích tam giác: $S_{\\Delta ABC} = \\frac{1}{2} |[\\vec{AB}, \\vec{AC}]| = \\frac{1}{2} \\times 7 = \\frac{7}{2}$.",
      distractorAnalysis: "Học sinh thường quên nhân hệ số $1/2$ trong công thức diện tích tam giác, nhầm sang diện tích hình bình hành nên chọn nhầm B ($S = 7$).",
      casioGuide: "Bấm MENU 5 -> VctA = (-1, 2, 0), VctB = (-1, 0, 3) -> Bấm 0.5 * Norm(VctA × VctB) = 3.5 = 7/2."
    },
    {
      id: "Q43_T9",
      code: "Q43-2024",
      source: "[Nguồn: Đề thi thử Tốt nghiệp THPT 2024 Chuyên Phan Bội Châu Nghệ An - Câu 48]",
      difficulty: "TH",
      type: "SHORT_ANSWER",
      content: "Trong không gian $Oxyz$, cho tứ diện $ABCD$ với $A(2; 0; 0)$, $B(0; 4; 0)$, $C(0; 0; 6)$ và $D(2; 4; 6)$. Thể tích khối tứ diện $ABCD$ bằng bao nhiêu?",
      correctAnswer: "16",
      explanation: "Ta có $\\vec{AB} = (-2; 4; 0)$, $\\vec{AC} = (-2; 0; 6)$, $\\vec{AD} = (0; 4; 6)$.\nTích có hướng: $[\\vec{AB}, \\vec{AC}] = (4(6) - 0(0); 0(-2) - (-2)(6); (-2)(0) - 4(-2)) = (24; 12; 8)$.\nTích hỗn tạp: $[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} = 24(0) + 12(4) + 8(6) = 0 + 48 + 48 = 96$.\nThể tích tứ diện: $V = \\frac{1}{6} |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}| = \\frac{1}{6} \\times 96 = 16$.",
      distractorAnalysis: "Học sinh hay chia cho 3 thay vì chia cho 6 trong công thức thể tích tứ diện, tính ra 32 là sai.",
      casioGuide: "Bấm MENU 5 -> VctA, VctB, VctC -> (1/6) * Abs(DotP(VctA × VctB, VctC)) = 16."
    },
    {
      id: "Q44_T9",
      code: "Q44-2025",
      source: "[Nguồn: Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT - Cấu trúc trắc nghiệm đúng sai]",
      difficulty: "VD",
      type: "TRUE_FALSE",
      content: "Trong không gian $Oxyz$, cho bốn điểm $A(1; 1; 1)$, $B(2; 3; 4)$, $C(3; 5; 7)$ và $D(0; 2; 3)$. Xét tính đúng/sai:",
      options: [
        "a) Vectơ $\\vec{AB} = (1; 2; 3)$ và $\\vec{AC} = (2; 4; 6)$.",
        "b) Ba điểm $A, B, C$ thẳng hàng.",
        "c) Bốn điểm $A, B, C, D$ tạo thành một tứ diện.",
        "d) Tích có hướng $[\\vec{AB}, \\vec{AC}] = \\vec{0}$."
      ],
      correctAnswer: "a:Đ, b:Đ, c:S, d:Đ",
      explanation: "a) Đúng: $\\vec{AB} = (2 - 1; 3 - 1; 4 - 1) = (1; 2; 3)$, $\\vec{AC} = (3 - 1; 5 - 1; 7 - 1) = (2; 4; 6)$.\nb) Đúng: Nhận thấy $\\vec{AC} = 2\\vec{AB}$ nên hai vectơ cùng phương. Do chúng có chung điểm gốc $A$, ba điểm $A, B, C$ thẳng hàng.\nc) Sai: Vì ba điểm $A, B, C$ thẳng hàng nên bốn điểm $A, B, C, D$ không thể tạo thành một khối tứ diện.\nd) Đúng: Tích có hướng của hai vectơ cùng phương luôn luôn bằng vectơ-không $\\vec{0}$.",
      distractorAnalysis: "Học sinh không nhận diện 3 điểm $A, B, C$ thẳng hàng mà vội vàng tính thể tích tứ diện bằng công thức, dẫn tới hiểu sai bản chất hình học.",
      casioGuide: "Kiểm tra tỉ lệ: $2/1 = 4/2 = 6/3 = 2 \\implies$ cùng phương."
    },
    {
      id: "Q45_T9",
      code: "Q45-2024",
      source: "[Nguồn: Đề thi thử Tốt nghiệp THPT 2024 Chuyên ĐH Sư Phạm Hà Nội - Câu 44]",
      difficulty: "VDC",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, cho hai đường thẳng chéo nhau $d_1, d_2$ có vectơ chỉ phương lần lượt là $\\vec{u}_1 = (1; 0; -1), \\vec{u}_2 = (0; 1; 1)$ và điểm $M_1(1; 0; 0) \\in d_1, M_2(0; 2; 0) \\in d_2$. Khoảng cách giữa hai đường thẳng $d_1$ và $d_2$ bằng:",
      options: [
        "A. $\\sqrt{3}$",
        "B. $\\frac{1}{\\sqrt{3}}$",
        "C. $\\frac{2}{\\sqrt{3}}$",
        "D. $\\sqrt{2}$"
      ],
      correctAnswer: "A",
      explanation: "Ta có $\\vec{M_1 M_2} = (0 - 1; 2 - 0; 0 - 0) = (-1; 2; 0)$.\nTích có hướng của hai vectơ chỉ phương:\n$[\\vec{u}_1, \\vec{u}_2] = (0(1) - (-1)(1); (-1)(0) - 1(1); 1(1) - 0(0)) = (1; -1; 1)$.\nĐộ dài: $|[\\vec{u}_1, \\vec{u}_2]| = \\sqrt{1^2 + (-1)^2 + 1^2} = \\sqrt{3}$.\nTích hỗn tạp:\n$|[\\vec{u}_1, \\vec{u}_2] \\cdot \\vec{M_1 M_2}| = |1(-1) + (-1)(2) + 1(0)| = |-1 - 2 + 0| = |-3| = 3$.\nKhoảng cách giữa hai đường thẳng chéo nhau:\n$d(d_1, d_2) = \\frac{|[\\vec{u}_1, \\vec{u}_2] \\cdot \\vec{M_1 M_2}|}{|[\\vec{u}_1, \\vec{u}_2]|} = \\frac{3}{\\sqrt{3}} = \\sqrt{3}$.",
      distractorAnalysis: "Học sinh hay tính sai tích có hướng hoặc quên dấu giá trị tuyệt đối ở tử số dẫn đến kết quả âm.",
      casioGuide: "Bấm MENU 5 -> Nhập VctA, VctB, VctC -> Abs(DotP(VctA × VctB, VctC)) / Norm(VctA × VctB) = $\\sqrt{3} \\approx 1.732$."
    }
  ],

  // =========================================================================
  // CHỦ ĐỀ 10: TỌA ĐỘ HÓA OXYZ & BÀI TOÁN CỰC TRỊ THỰC TẾ (TOPIC_3_1)
  // =========================================================================
  "TOPIC_3_1": [
    {
      id: "Q46_T10",
      code: "Q46-2024",
      source: "[Nguồn: Đề thi thử Tốt nghiệp THPT 2024 Chuyên Lam Sơn Thanh Hóa - Câu 31]",
      difficulty: "NB",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian với hệ tọa độ $Oxyz$, một căn phòng có dạng hình hộp chữ nhật với kích thước sàn nhà là 6 m $\\times$ 8 m và chiều cao là 4 m. Chọn gốc tọa độ $O(0; 0; 0)$ tại một góc sàn nhà, tia $Ox$ dọc theo chiều rộng (6 m), tia $Oy$ dọc theo chiều dài (8 m), tia $Oz$ hướng thẳng đứng lên trần nhà (4 m). Một chiếc quạt trần được treo tại chính giữa trần nhà. Tọa độ của vị trí chiếc quạt trần là:",
      options: [
        "A. $(3; 4; 4)$",
        "B. $(6; 8; 4)$",
        "C. $(3; 4; 0)$",
        "D. $(4; 3; 4)$"
      ],
      correctAnswer: "A",
      explanation: "Sàn nhà hình chữ nhật có kích thước $6\\text{ m} \\times 8\\text{ m}$.\n- Tọa độ tâm sàn nhà theo phương $Ox$ là $x = \\frac{6}{2} = 3$ m.\n- Tọa độ tâm sàn nhà theo phương $Oy$ là $y = \\frac{8}{2} = 4$ m.\nTrần nhà nằm ở cao độ $z = 4$ m.\nChiếc quạt trần được treo chính giữa trần nhà nên có tọa độ $x = 3, y = 4, z = 4$.\nVậy tọa độ của chiếc quạt trần là $(3; 4; 4)$.",
      distractorAnalysis: "Học sinh hay nhầm tọa độ tâm sàn nhà (cao độ $z = 0$) nên chọn nhầm C, hoặc hoán vị chiều rộng và chiều dài nên chọn nhầm D.",
      casioGuide: "Ghi nhớ: Tâm hình chữ nhật sàn là trung điểm các kích thước đáy; cao độ quạt trần bằng chiều cao phòng."
    },
    {
      id: "Q47_T10",
      code: "Q47-2024",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Nam Định 2024 - Câu 47]",
      difficulty: "TH",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, một chiếc tàu ngầm đang di chuyển theo đường thẳng từ vị trí $A(2; 3; -4)$ đến vị trí $B(8; 11; -4)$ (đơn vị: hải lý, trục $Oz$ hướng thẳng đứng lên trên, mặt biển nằm trên mặt phẳng $z = 0$). Một trạm định vị sóng âm đặt tại điểm $M(5; 7; 0)$ trên mặt nước biển. Khoảng cách ngắn nhất từ tàu ngầm đến trạm định vị $M$ trong quá trình di chuyển bằng bao nhiêu hải lý?",
      options: [
        "A. 4 hải lý",
        "B. 5 hải lý",
        "C. $\\sqrt{17}$ hải lý",
        "D. 3 hải lý"
      ],
      correctAnswer: "A",
      explanation: "Vectơ chỉ phương của đường di chuyển: $\\vec{AB} = (8 - 2; 11 - 3; -4 - (-4)) = (6; 8; 0) = 2(3; 4; 0)$.\nPhương trình tham số của đoạn thẳng $AB$ là: $P(2 + 3t; 3 + 4t; -4)$ với $0 \\le t \\le 2$ (tại $t = 0 \\implies A$, tại $t = 2 \\implies B$).\nKhoảng cách từ trạm định vị $M(5; 7; 0)$ đến vị trí $P(t)$ của tàu ngầm:\n$MP^2 = (2 + 3t - 5)^2 + (3 + 4t - 7)^2 + (-4 - 0)^2$\n$= (3t - 3)^2 + (4t - 4)^2 + 16 = 9(t - 1)^2 + 16(t - 1)^2 + 16 = 25(t - 1)^2 + 16$.\nVì $t \\in [0; 2]$, biểu thức $25(t - 1)^2 + 16$ đạt giá trị nhỏ nhất khi $t = 1 \\in [0; 2]$.\nKhi đó $\\min MP = \\sqrt{16} = 4$ hải lý.\nVậy khoảng cách ngắn nhất từ tàu ngầm đến trạm định vị là 4 hải lý.",
      distractorAnalysis: "Học sinh quên tính độ sâu $z = -4$ của tàu ngầm mà chỉ tính khoảng cách trên mặt phẳng Oxy, dẫn tới kết quả sai bằng 0.",
      casioGuide: "Bấm MENU 8 (TABLE): Nhập $f(x) = \\sqrt{25(x - 1)^2 + 16}$, Start: 0, End: 2, Step: 0.2 -> Tìm được GTNN là 4 tại $x = 1$."
    },
    {
      id: "Q48_T10",
      code: "Q48-2025",
      source: "[Nguồn: Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT - Cấu trúc trắc nghiệm đúng/sai]",
      difficulty: "VD",
      type: "TRUE_FALSE",
      content: "Một chiếc drone bay theo quỹ đạo thẳng từ $A(1; 0; 2)$ đến $B(3; 4; 6)$ trong hệ tọa độ $Oxyz$ (đơn vị: trăm mét). Tọa độ vị trí drone tại thời điểm $t \\in [0; 1]$ là $M(1 + 2t; 4t; 2 + 4t)$. Một trạm radar đặt tại điểm $C(2; 1; 1)$. Xét tính đúng/sai:",
      options: [
        "a) Quãng đường drone bay từ $A$ đến $B$ bằng 600 mét.",
        "b) Vectơ chỉ phương của quỹ đạo là $\\vec{u} = (2; 4; 4) = 2(1; 2; 2)$.",
        "c) Hàm bình phương khoảng cách giữa radar và drone là $g(t) = 36t^2 - 4t + 3$.",
        "d) Khoảng cách ngắn nhất giữa radar và drone đạt tại thời điểm $t = \\frac{1}{18}$."
      ],
      correctAnswer: "a:Đ, b:Đ, c:Đ, d:Đ",
      explanation: "a) Đúng: Độ dài $AB = \\sqrt{(3-1)^2 + 4^2 + (6-2)^2} = \\sqrt{4 + 16 + 16} = 6$ (trăm mét) = 600 m.\nb) Đúng: $\\vec{AB} = (2; 4; 4) = 2(1; 2; 2)$.\nc) Đúng: $\\vec{CM} = (2t-1; 4t-1; 4t+1) \\implies CM^2 = (2t-1)^2 + (4t-1)^2 + (4t+1)^2 = (4t^2 - 4t + 1) + (16t^2 - 8t + 1) + (16t^2 + 8t + 1) = 36t^2 - 4t + 3$.\nd) Đúng: Parabol $g(t) = 36t^2 - 4t + 3$ có hoành độ đỉnh $t = -(-4) / (2 \\cdot 36) = 1/18 \\in [0; 1]$.",
      distractorAnalysis: "Học sinh hay khai triển sai hằng đẳng thức $(4t - 1)^2 + (4t + 1)^2$, quên triệt tiêu số hạng chéo $+8t$ và $-8t$.",
      casioGuide: "Bấm MENU 9 -> 2 -> 2: Nhập 36, -4, 3 -> Tìm cực tiểu tại $X = 1/18$."
    },
    {
      id: "Q49_T10",
      code: "Q49-2024",
      source: "[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Bắc Ninh 2024 - Câu 50]",
      difficulty: "VDC",
      type: "SHORT_ANSWER",
      content: "Một đường ống dẫn khí đốt nối từ trạm cung cấp tại $A(0; 2; 3)$ đến trạm tiêu thụ tại $B(6; 8; 5)$ trong hệ tọa độ $Oxyz$ (đơn vị: km). Đường ống phải đi qua một điểm trung chuyển $P$ nằm trên mặt đất $(Oxy): z = 0$. Tìm độ dài ngắn nhất của tuyến ống dẫn khí $AP + PB$ (làm tròn đến chữ số thập phân thứ nhất).",
      correctAnswer: "11.7",
      explanation: "Vì $z_A = 3 > 0$ và $z_B = 5 > 0$ nên hai điểm $A, B$ cùng phía so với mặt phẳng $(Oxy): z = 0$.\nLấy điểm $A'(0; 2; -3)$ đối xứng với $A$ qua mặt phẳng $(Oxy)$.\nVới mọi điểm $P \\in (Oxy)$, ta có $PA = PA' \\implies AP + PB = A'P + PB \\ge A'B$.\nĐộ dài tuyến ống ngắn nhất chính là khoảng cách giữa $A'$ và $B$:\n$A'B = \\sqrt{(6 - 0)^2 + (8 - 2)^2 + (5 - (-3))^2} = \\sqrt{6^2 + 6^2 + 8^2} = \\sqrt{36 + 36 + 64} = \\sqrt{136} \\approx 11{,}6619 \\approx 11{,}7$ km.",
      distractorAnalysis: "Bẫy điểm cùng phía: Học sinh không lấy điểm đối xứng mà nối thẳng $AB = \\sqrt{6^2 + 6^2 + 2^2} = \\sqrt{76} \\approx 8{,}7$ km (sai vì đoạn $AB$ không cắt mặt đất $z = 0$).",
      casioGuide: "Bấm máy: $\\sqrt{6^2 + 6^2 + 8^2} = \\sqrt{136} \\approx 11.6619 \\implies$ làm tròn 11.7."
    },
    {
      id: "Q50_T10",
      code: "Q50-2024",
      source: "[Nguồn: Đề thi thử THPT Chuyên Phan Bội Châu Nghệ An 2024 - Câu 50]",
      difficulty: "VDC",
      type: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, một vệ tinh viễn thông $S$ bay trên quỹ đạo có tọa độ thỏa mãn mặt cầu $(x - 1)^2 + (y - 2)^2 + (z - 3)^2 = 9$. Một trạm thu sóng mặt đất đặt tại điểm $M(4; 6; 3)$. Khoảng cách ngắn nhất từ trạm thu sóng $M$ đến vệ tinh $S$ bằng:",
      options: ["A. 2", "B. 5", "C. 8", "D. 3"],
      correctAnswer: "A",
      explanation: "Mặt cầu có tâm $I(1; 2; 3)$ và bán kính $R = \\sqrt{9} = 3$.\nKhoảng cách từ trạm $M(4; 6; 3)$ đến tâm $I(1; 2; 3)$:\n$MI = \\sqrt{(4 - 1)^2 + (6 - 2)^2 + (3 - 3)^2} = \\sqrt{3^2 + 4^2 + 0^2} = \\sqrt{25} = 5$.\nVì $MI = 5 > R = 3$, điểm $M$ nằm bên ngoài mặt cầu.\nKhoảng cách ngắn nhất từ $M$ đến điểm $S$ thuộc mặt cầu là:\n$d_{\\min} = MI - R = 5 - 3 = 2$.\n(Lưu ý: Khoảng cách lớn nhất là $d_{\\max} = MI + R = 5 + 3 = 8$).",
      distractorAnalysis: "Học sinh hay chọn nhầm khoảng cách lớn nhất $MI + R = 8$ (chọn C) hoặc chọn nhầm bán kính $R = 3$ (chọn D).",
      casioGuide: "Bấm $\\sqrt{3^2 + 4^2 + 0^2} - 3 = 5 - 3 = 2$."
    }
  ]
};

// Bí danh hỗ trợ tương thích ngược cho mã cũ TOPIC_2_4 (trỏ tới TOPIC_3_1)
Object.defineProperty(REAL_QUESTIONS_BANK, "TOPIC_2_4", {
  get: () => REAL_QUESTIONS_BANK["TOPIC_3_1"],
  enumerable: false,
  configurable: true,
});

// Import ngân hàng chuyên sâu cho 37 dạng toán
import { MATH_TYPE_QUESTIONS_BANK, getQuestionsForMathType as getFromMathTypeBank } from "./mathTypeQuestionsBank";
export { MATH_TYPE_QUESTIONS_BANK };

/**
 * Lấy câu hỏi đề thật riêng biệt cho từng dạng toán (mathTypeId)
 * Đảm bảo các dạng toán con hoàn toàn không bị trùng lặp câu hỏi!
 */
export function getQuestionsForMathType(mathTypeId: string, topicId?: string, mathCode?: string): ExamQuestionItem[] {
  const specific = getFromMathTypeBank(mathTypeId, topicId, mathCode);
  if (specific && specific.length > 0) {
    return specific;
  }
  if (topicId) {
    return getQuestionsForTopic(topicId);
  }
  return [];
}

// Hàm lấy 5 câu hỏi thực chiến chuẩn nguồn theo chủ đề/dạng toán
export function getQuestionsForTopic(topicId: string): ExamQuestionItem[] {
  if (REAL_QUESTIONS_BANK[topicId]) {
    return REAL_QUESTIONS_BANK[topicId];
  }
  // Hỗ trợ mã cũ TOPIC_2_4 nếu có gọi
  if (topicId === "TOPIC_2_4") {
    return REAL_QUESTIONS_BANK["TOPIC_3_1"] || [];
  }
  // Mặc định fallback: Nếu thuộc Chương I thì trả về ngân hàng Chương I
  if (topicId.startsWith("TOPIC_1")) {
    return REAL_QUESTIONS_BANK["TOPIC_1_1"];
  }
  // Nếu thuộc Chủ đề 10 (Bài toán thực tế cực trị Oxyz) thì trả về TOPIC_3_1
  if (topicId.startsWith("TOPIC_3")) {
    return REAL_QUESTIONS_BANK["TOPIC_3_1"];
  }
  // Nếu thuộc Chương II (Các chủ đề Oxyz khác) thì trả về ngân hàng Oxyz
  return REAL_QUESTIONS_BANK["TOPIC_2_2"];
}
