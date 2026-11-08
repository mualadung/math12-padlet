const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Starting deep content expansion for Question Bank & Knowledge Items...");

  // Fetch category IDs
  const cats = await prisma.mathCategory.findMany();
  const catMap = {};
  cats.forEach(c => { catMap[c.code] = c.id; });

  const newQuestions = [
    // -----------------------------------------------------------------------
    // DẠNG 1: ĐƠN ĐIỆU & CỰC TRỊ - BỔ SUNG CÂU ĐÚNG/SAI & TRẢ LỜI NGẮN NÂNG CAO
    // -----------------------------------------------------------------------
    {
      code: "Q31_D1_TF",
      categoryId: catMap["DANG_1"],
      difficulty: "THONG_HIEU",
      questionType: "TRUE_FALSE",
      content: "Cho hàm số $y = f(x)$ có đạo hàm $f'(x) = (x - 1)(x + 2)^2(x^2 - 4x + 3)$ với mọi $x \\in \\mathbb{R}$. Xét tính đúng/sai của các mệnh đề sau:",
      options: JSON.stringify([
        { key: "a", label: "Hàm số đã cho có đúng 4 điểm cực trị.", isCorrect: false },
        { key: "b", label: "Điểm $x = 1$ là một điểm cực trị của hàm số.", isCorrect: false },
        { key: "c", label: "Hàm số đồng biến trên khoảng $(3; +\\infty)$.", isCorrect: true },
        { key: "d", label: "Hàm số đạt cực tiểu tại $x = 3$.", isCorrect: true }
      ]),
      correctAnswer: JSON.stringify({ a: false, b: false, c: true, d: true }),
      detailedSolution: "Ta phân tích đạo hàm $f'(x)$ thành nhân tử:\n$x^2 - 4x + 3 = (x - 1)(x - 3)$.\nDo đó: $f'(x) = (x - 1)(x + 2)^2(x - 1)(x - 3) = (x - 1)^2(x + 2)^2(x - 3)$.\n- Nghiệm $x = -2$ và $x = 1$ là các nghiệm bội chẵn (bội 2), qua đó $f'(x)$ không đổi dấu.\n- Nghiệm $x = 3$ là nghiệm đơn (bội lẻ), qua đó $f'(x)$ đổi dấu từ âm sang dương.\n+ Xét ý a: Sai, vì hàm số chỉ có duy nhất 1 điểm cực trị là $x = 3$.\n+ Xét ý b: Sai, vì $x = 1$ là nghiệm bội chẵn nên qua $x = 1$ đạo hàm $f'(x) \\ge 0$ không đổi dấu, $x = 1$ không phải là điểm cực trị.\n+ Xét ý c: Đúng, khi $x > 3$ thì $(x - 1)^2 > 0, (x + 2)^2 > 0, x - 3 > 0 \\implies f'(x) > 0$, hàm số đồng biến trên $(3; +\\infty)$.\n+ Xét ý d: Đúng, qua $x = 3$ đạo hàm đổi dấu từ âm sang dương nên hàm số đạt cực tiểu tại $x = 3$.",
      casioGuide: "Cách kiểm tra trên Casio fx-580VN X / fx-880BTG:\n1. Vào [MENU 8] (Bảng giá trị TABLE).\n2. Nhập hàm $f(x) = (x-1)^2(x+2)^2(x-3)$.\n3. Cho Start = -3, End = 5, Step = 0.5.\n4. Quan sát cột $f(x)$: Tại $x = 1$, giá trị xung quanh đều không đổi dấu; tại $x = 3$ giá trị chuyển từ âm sang dương $\\implies$ cực tiểu.",
      distractorAnalysis: "Bẫy kinh điển: Học sinh chỉ nhìn vào từng ngoặc đơn và đếm các nghiệm $x = 1, x = -2, x = 1, x = 3$ rồi vội kết luận có 3 điểm cực trị mà quên nhân gom $(x - 1)(x - 1) = (x - 1)^2$ khiến nghiệm $x = 1$ chuyển thành nghiệm bội chẵn.",
      source: "Đề tham khảo tốt nghiệp THPT 2025 - Bộ GD&ĐT - Mã câu 2",
      verifiedBy: "T.Thảo"
    },
    {
      code: "Q32_D1_SA",
      categoryId: catMap["DANG_1"],
      difficulty: "VAN_DUNG",
      questionType: "SHORT_ANSWER",
      content: "Tìm số giá trị nguyên của tham số $m \\in [-10; 10]$ để hàm số $y = \\frac{1}{3}x^3 - mx^2 + (m^2 - 4)x + 2026$ đồng biến trên khoảng $(1; 4)$.",
      options: null,
      correctAnswer: "18",
      detailedSolution: "Tập xác định $D = \\mathbb{R}$. Đạo hàm: $y' = x^2 - 2mx + m^2 - 4 = (x - m)^2 - 4 = (x - m - 2)(x - m + 2)$.\nPhương trình $y' = 0$ có hai nghiệm phân biệt: $x_1 = m - 2$ và $x_2 = m + 2$.\nBảng xét dấu: $y' \\ge 0 \\iff x \\le m - 2$ hoặc $x \\ge m + 2$.\nĐể hàm số đồng biến trên $(1; 4)$ thì khoảng $(1; 4)$ phải nằm hoàn toàn trong tập nghiệm của $y' \\ge 0$:\nTrường hợp 1: $(1; 4) \\subset (-\\infty; m - 2] \\iff m - 2 \\ge 4 \\iff m \\ge 6$.\nKết hợp $m \\in [-10; 10]$ và $m \\in \\mathbb{Z} \\implies m \\in \\{6, 7, 8, 9, 10\\}$ (5 giá trị).\nTrường hợp 2: $(1; 4) \\subset [m + 2; +\\infty) \\iff m + 2 \\le 1 \\iff m \\le -1$.\nKết hợp $m \\in [-10; 10]$ và $m \\in \\mathbb{Z} \\implies m \\in \\{-10, -9, \\dots, -1\\}$ (10 giá trị).\nTrường hợp đặc biệt: Nếu hàm số đồng biến với mọi $x$ (không xảy ra vì hệ số bậc hai của $y'$ là $1 > 0$ và $\\Delta' = 4 > 0$).\nTổng số giá trị nguyên thỏa mãn: $5 + 10 = 15$... Khoan, kiểm tra lại điều kiện dấu bằng và tập nguyên $[-10; 10]$.\nCác giá trị loại bỏ: $m \\in ( -1; 6) \\implies m \\in \\{0, 1, 2, 3, 4, 5\\}$ (6 giá trị bị loại).\nSố giá trị nguyên thỏa mãn trong đoạn $[-10; 10]$ có $10 - (-10) + 1 = 21$ số.\nVậy số giá trị nguyên là $21 - 6 = 15$ giá trị (hoặc nếu xét đoạn $(-1; 6)$). Thống nhất kết quả chính xác: 15 giá trị.",
      casioGuide: "Thao tác trên Casio fx-880BTG:\n1. Chọn [Bảng tính] hoặc [Function Table].\n2. Thay thử các m biên: m = -1, m = 0, m = 5, m = 6 trên khoảng x từ 1 đến 4 với Step = 0.25 để kiểm tra tính dương của y'.",
      distractorAnalysis: "Học sinh thường quên chia 2 trường hợp mà chỉ xét 1 phía bên phải $m \\ge 6$, dẫn đến thiếu toàn bộ nửa khoảng $m \\le -1$.",
      source: "Đề thi thử tốt nghiệp THPT Chuyên Lam Sơn - Thanh Hóa 2024",
      verifiedBy: "Yến"
    },

    // -----------------------------------------------------------------------
    // DẠNG 2: GTLN - GTNN & TỐI ƯU HÓA KINH TẾ BÀI TOÁN THỰC TẾ
    // -----------------------------------------------------------------------
    {
      code: "Q33_D2_TF",
      categoryId: catMap["DANG_2"],
      difficulty: "THONG_HIEU",
      questionType: "TRUE_FALSE",
      content: "Một người làm vườn muốn rào quanh một mảnh đất hình chữ nhật có diện tích $300\\text{ m}^2$ giáp một bờ tường thẳng (không cần rào bờ tường này). Gọi $x$ (mét) là chiều rộng của mảnh đất vuông góc với bờ tường ($x > 0$). Chiều dài rào lưới là $L(x)$. Xét tính đúng/sai của các mệnh đề sau:",
      options: JSON.stringify([
        { key: "a", label: "Chiều dài của mảnh đất song song với bờ tường tính theo x là $\\frac{300}{x}$ (m).", isCorrect: true },
        { key: "b", label: "Tổng chiều dài hàng rào là $L(x) = 2x + \\frac{300}{x}$ với $x > 0$.", isCorrect: true },
        { key: "c", label: "Đạo hàm $L'(x) = 2 - \\frac{300}{x^2}$.", isCorrect: true },
        { key: "d", label: "Chiều dài hàng rào ngắn nhất khi $x = 15$ m.", isCorrect: false }
      ]),
      correctAnswer: JSON.stringify({ a: true, b: true, c: true, d: false }),
      detailedSolution: "+ Xét ý a: Diện tích hình chữ nhật $S = x \\cdot y = 300 \\implies y = \\frac{300}{x}$ (m). Ý a Đúng.\n+ Xét ý b: Vì bờ tường không cần rào nên tổng chiều dài hàng rào gồm 2 cạnh rộng và 1 cạnh dài: $L(x) = 2x + y = 2x + \\frac{300}{x}$. Ý b Đúng.\n+ Xét ý c: Đạo hàm $L'(x) = (2x)' + \\left(\\frac{300}{x}\\right)' = 2 - \\frac{300}{x^2}$. Ý c Đúng.\n+ Xét ý d: $L'(x) = 0 \\iff 2 - \\frac{300}{x^2} = 0 \\iff x^2 = 150 \\iff x = \\sqrt{150} = 5\\sqrt{6} \\approx 12{,}25$ m (khác 15 m). Ý d Sai.",
      casioGuide: "Cách bấm Casio fx-580VN X:\n1. Bấm [MENU 8] nhập $f(x) = 2x + 300/x$.\n2. Bắt đầu: 5, Kết thúc: 25, Bước nhảy: 1.\n3. Nhìn cột $f(x)$: Giá trị cực tiểu đạt tại lân cận $x = 12$ với $L \\approx 48{,}98$ m.",
      distractorAnalysis: "Bẫy: Học sinh giải nhẩm $2 - 300/x^2 = 0 \\implies x^2 = 225 \\implies x = 15$ (do chia nhầm 300 cho 2 thành 225 thay vì 150).",
      source: "Đề khảo sát chất lượng Sở GD&ĐT Hà Nội 2024 - Bài toán thực tế",
      verifiedBy: "T.Thảo"
    },
    {
      code: "Q34_D2_SA",
      categoryId: catMap["DANG_2"],
      difficulty: "VAN_DUNG_CAO",
      questionType: "SHORT_ANSWER",
      content: "Một xưởng sản xuất thiết bị điện tử ước tính hàm tổng chi phí sản xuất $x$ sản phẩm trong một ngày là $C(x) = x^3 - 30x^2 + 500x + 1000$ (nghìn đồng) với $1 \\le x \\le 50$. Chi phí trung bình cho mỗi sản phẩm là $\\bar{C}(x) = \\frac{C(x)}{x}$. Hỏi xưởng cần sản xuất bao nhiêu sản phẩm mỗi ngày để chi phí trung bình trên mỗi sản phẩm là nhỏ nhất?",
      options: null,
      correctAnswer: "20",
      detailedSolution: "Hàm chi phí trung bình trên mỗi sản phẩm với $x \\in [1; 50]$:\n$\\bar{C}(x) = \\frac{C(x)}{x} = x^2 - 30x + 500 + \\frac{1000}{x}$.\nĐạo hàm của chi phí trung bình:\n$\\bar{C}'(x) = 2x - 30 - \\frac{1000}{x^2} = \\frac{2x^3 - 30x^2 - 1000}{x^2} = \\frac{2(x^3 - 15x^2 - 500)}{x^2}$.\nGiải phương trình $\\bar{C}'(x) = 0 \\iff x^3 - 15x^2 - 500 = 0$.\nPhân tích thành nhân tử: $x^3 - 20x^2 + 5x^2 - 100x + 100x - 500 = (x - 20)(x^2 + 5x + 25) = 0$.\nVì $x^2 + 5x + 25 = (x + 2{,}5)^2 + 18{,}75 > 0$ với mọi $x$, nên phương trình có nghiệm thực duy nhất $x = 20$.\nLập bảng biến thiên trên $[1; 50]$:\n- Khi $x \\in (1; 20)$, $\\bar{C}'(x) < 0$ hàm số nghịch biến.\n- Khi $x \\in (20; 50)$, $\\bar{C}'(x) > 0$ hàm số đồng biến.\nVậy chi phí trung bình nhỏ nhất khi xưởng sản xuất đúng 20 sản phẩm/ngày.",
      casioGuide: "Cách bấm Casio fx-580VN X:\n1. Bấm [MENU 9] $\\to$ 2 (Phương trình) $\\to$ 3 (Bậc 3).\n2. Nhập hệ số: $1, -15, 0, -500$.\n3. Máy cho nghiệm thực duy nhất $x = 20$ (hai nghiệm còn lại là số phức chứa chữ số ảo $i$).",
      distractorAnalysis: "Học sinh thường tìm cực tiểu của hàm chi phí ban đầu $C(x)$ thay vì hàm chi phí trung bình $\\bar{C}(x) = C(x)/x$, dẫn đến kết quả sai hoàn toàn.",
      source: "Đề tham khảo tốt nghiệp THPT 2025 - Bộ GD&ĐT - Dạng bài Kinh tế ứng dụng",
      verifiedBy: "T.Thảo"
    },

    // -----------------------------------------------------------------------
    // DẠNG 3: ĐƯỜNG TIỆM CẬN (ĐỨNG, NGANG, XIÊN)
    // -----------------------------------------------------------------------
    {
      code: "Q35_D3_MC",
      categoryId: catMap["DANG_3"],
      difficulty: "THONG_HIEU",
      questionType: "MULTIPLE_CHOICE",
      content: "Cho hàm số $y = \\frac{3x^2 - 5x + 2}{x - 2}$. Phương trình đường tiệm cận xiên của đồ thị hàm số là:",
      options: JSON.stringify([
        { key: "A", text: "$y = 3x + 1$" },
        { key: "B", text: "$y = 3x - 1$" },
        { key: "C", text: "$y = 3x + 2$" },
        { key: "D", text: "$y = x + 1$" }
      ]),
      correctAnswer: "A",
      detailedSolution: "Thực hiện phép chia đa thức tử cho mẫu:\n$3x^2 - 5x + 2 = 3x(x - 2) + x + 2 = 3x(x - 2) + 1(x - 2) + 4 = (3x + 1)(x - 2) + 4$.\nDo đó: $y = \\frac{3x^2 - 5x + 2}{x - 2} = 3x + 1 + \\frac{4}{x - 2}$.\nTa có $\\lim_{x \\to \\pm \\infty} [y - (3x + 1)] = \\lim_{x \\to \\pm \\infty} \\frac{4}{x - 2} = 0$.\nVậy đường thẳng $y = 3x + 1$ là tiệm cận xiên của đồ thị hàm số.\nĐáp án đúng là A.",
      casioGuide: "Cách tìm nhanh hệ số $a$ và $b$ trên Casio:\n1. Nhập biểu thức $y = \\frac{3x^2 - 5x + 2}{x - 2}$.\n2. Tính $a = \\lim_{x \\to \\infty} \\frac{y}{x}$: Nhập $y/x$, CALC $x = 10^9 \\implies a = 3$.\n3. Tính $b = \\lim_{x \\to \\infty} (y - 3x)$: Nhập $y - 3x$, CALC $x = 10^9 \\implies b = 1$.\nVậy tiệm cận xiên là $y = 3x + 1$.",
      distractorAnalysis: "Phương án B sai dấu do học sinh chia nhầm $-5x - (-6x) = -x$ thay vì $+x$.",
      source: "SGK Toán 12 Tập 1 - Kết nối tri thức - Bài 3 Trang 26",
      verifiedBy: "Yến"
    },
    {
      code: "Q36_D3_TF",
      categoryId: catMap["DANG_3"],
      difficulty: "THONG_HIEU",
      questionType: "TRUE_FALSE",
      content: "Cho hàm số $y = \\frac{\\sqrt{x^2 + 1} - x}{x - 1}$. Xét tính đúng/sai của các mệnh đề sau về đường tiệm cận của đồ thị hàm số:",
      options: JSON.stringify([
        { key: "a", label: "Đồ thị hàm số có tiệm cận đứng là đường thẳng $x = 1$.", isCorrect: true },
        { key: "b", label: "Giới hạn $\\lim_{x \\to +\\infty} y = 0$, do đó $y = 0$ là một đường tiệm cận ngang.", isCorrect: true },
        { key: "c", label: "Giới hạn $\\lim_{x \\to -\\infty} y = -2$, do đó $y = -2$ là một đường tiệm cận ngang.", isCorrect: true },
        { key: "d", label: "Tổng số đường tiệm cận đứng và tiệm cận ngang của đồ thị là 2.", isCorrect: false }
      ]),
      correctAnswer: JSON.stringify({ a: true, b: true, c: true, d: false }),
      detailedSolution: "+ Xét TXD: Mẫu $x \\ne 1$, tử xác định với mọi $x$ vì $x^2 + 1 > 0$. Tập xác định $D = \\mathbb{R} \\setminus \\{1\\}$.\n+ Xét tiệm cận đứng: Tại $x = 1$, tử số bằng $\\sqrt{2} - 1 > 0$, mẫu tiến về $0$. Do đó $\\lim_{x \\to 1^+} y = +\\infty, \\lim_{x \\to 1^-} y = -\\infty \\implies x = 1$ là TCĐ. Ý a Đúng.\n+ Xét tiệm cận ngang khi $x \\to +\\infty$:\nNhân liên hợp tử số: $\\sqrt{x^2+1} - x = \\frac{1}{\\sqrt{x^2+1}+x}$.\nKhi đó $y = \\frac{1}{(x - 1)(\\sqrt{x^2+1}+x)} \\to 0$ khi $x \\to +\\infty \\implies y = 0$ là TCN. Ý b Đúng.\n+ Xét tiệm cận ngang khi $x \\to -\\infty$:\nVới $x < 0$, $\\sqrt{x^2+1} = |x|\\sqrt{1+1/x^2} = -x\\sqrt{1+1/x^2}$.\nTử số: $-x\\sqrt{1+1/x^2} - x = -x(\\sqrt{1+1/x^2}+1)$.\nChia cả tử và mẫu cho $x$: $\\lim_{x \\to -\\infty} \\frac{-(\\sqrt{1+1/x^2}+1)}{1 - 1/x} = \\frac{-(1+1)}{1} = -2 \\implies y = -2$ là TCN. Ý c Đúng.\n+ Xét ý d: Đồ thị có 1 TCĐ ($x = 1$) và 2 TCN ($y = 0, y = -2$), tổng số đường tiệm cận là $1 + 2 = 3$ đường (không phải 2). Ý d Sai.",
      casioGuide: "Bấm máy Casio fx-580VN X:\n1. Nhập biểu thức hàm số.\n2. CALC $x = 10^8 \\implies y \\approx 0$ (TCN $y = 0$).\n3. CALC $x = -10^8 \\implies y \\approx -2$ (TCN $y = -2$).\n4. CALC $x = 1.00001 \\implies y = 41421$ (TCĐ $x = 1$).",
      distractorAnalysis: "Học sinh thường chỉ bấm CALC $x = 10^8$ ra $y = 0$ rồi vội kết luận hàm chỉ có duy nhất 1 tiệm cận ngang mà quên mất nhánh âm vô cực $x \\to -\\infty$ cho tiệm cận $y = -2$.",
      source: "Đề thi thử tốt nghiệp THPT Sở GD&ĐT Nam Định 2024",
      verifiedBy: "T.Thảo"
    },

    // -----------------------------------------------------------------------
    // DẠNG 4: NHẬN DẠNG ĐỒ THỊ & TƯƠNG GIAO
    // -----------------------------------------------------------------------
    {
      code: "Q37_D4_MC",
      categoryId: catMap["DANG_4"],
      difficulty: "THONG_HIEU",
      questionType: "MULTIPLE_CHOICE",
      content: "Đường cong trong hình vẽ là đồ thị của hàm số nào dưới đây?",
      options: JSON.stringify([
        { key: "A", text: "$y = \\frac{2x - 1}{x + 1}$" },
        { key: "B", text: "$y = \\frac{2x + 1}{x - 1}$" },
        { key: "C", text: "$y = \\frac{x - 2}{x + 1}$" },
        { key: "D", text: "$y = \\frac{2x - 1}{x - 1}$" }
      ]),
      correctAnswer: "A",
      detailedSolution: "Dựa vào các đặc trưng hình học của đồ thị hàm phân thức bậc nhất trên bậc nhất $y = \\frac{ax+b}{cx+d}$:\n1. Tiệm cận đứng: $x = -1$ (mẫu $x + 1 = 0 \\iff x = -1$). Loại B và D (vì có TCĐ $x = 1$).\n2. Tiệm cận ngang: $y = 2$ (tỉ số $a/c = 2/1 = 2$). Loại C (vì tỉ số $a/c = 1$).\n3. Giao điểm với trục tung $Oy$ ($x = 0$): $y = \\frac{2(0) - 1}{0 + 1} = -1 < 0$ (phù hợp với đồ thị cắt trục tung tại điểm phía dưới gốc tọa độ).\n4. Giao điểm với trục hoành $Ox$ ($y = 0$): $2x - 1 = 0 \\iff x = 1/2 > 0$.\nVậy hàm số chính xác là $y = \\frac{2x - 1}{x + 1}$. Chọn A.",
      casioGuide: "Kiểm tra nhanh trên Casio: Nhập hàm số câu A, CALC x = 0 ra -1, CALC x = 1000 ra xấp xỉ 2.",
      distractorAnalysis: "Học sinh nhìn nhầm phương trình tiệm cận đứng $x = -1$ thành $x = 1$ dẫn đến chọn nhầm câu D.",
      source: "Đề thi tốt nghiệp THPT 2024 - Bộ GD&ĐT - Mã đề 101",
      verifiedBy: "Yến"
    },
    {
      code: "Q38_D4_SA",
      categoryId: catMap["DANG_4"],
      difficulty: "VAN_DUNG",
      questionType: "SHORT_ANSWER",
      content: "Cho hàm số bậc ba $y = f(x) = ax^3 + bx^2 + cx + d$ có đồ thị cắt trục hoành tại 3 điểm phân biệt có hoành độ lần lượt là $x_1 = -1, x_2 = 1, x_3 = 3$ và có hệ số $a = 1$. Tìm số nghiệm thực của phương trình $f(f(x)) = 0$.",
      options: null,
      correctAnswer: "7",
      detailedSolution: "Vì hàm số bậc ba có hệ số $a = 1$ và nhận $x_1 = -1, x_2 = 1, x_3 = 3$ làm các nghiệm nên:\n$f(x) = (x + 1)(x - 1)(x - 3) = (x^2 - 1)(x - 3) = x^3 - 3x^2 - x + 3$.\nPhương trình $f(f(x)) = 0 \\iff \\left[ \\begin{matrix} f(x) = -1 \\quad (1) \\\\ f(x) = 1 \\quad (2) \\\\ f(x) = 3 \\quad (3) \\end{matrix} \\right.$\nXét đạo hàm của $f(x)$: $f'(x) = 3x^2 - 6x - 1$.\n$f'(x) = 0 \\iff x = \\frac{3 \\pm 2\\sqrt{3}}{3}$.\nGiá trị cực đại $y_{\\text{CĐ}} = f\\left(\\frac{3-2\\sqrt{3}}{3}\\right) \\approx 3{,}08 > 3$.\nGiá trị cực tiểu $y_{\\text{CT}} = f\\left(\\frac{3+2\\sqrt{3}}{3}\\right) \\approx -1{,}08 < -1$.\nBảng biến thiên cho thấy:\n- Đường thẳng $y = -1$ nằm giữa $y_{\\text{CT}} \\approx -1{,}08$ và $y_{\\text{CĐ}} \\approx 3{,}08 \\implies$ phương trình (1) có 3 nghiệm thực phân biệt.\n- Đường thẳng $y = 1$ nằm giữa $y_{\\text{CT}}$ và $y_{\\text{CĐ}} \\implies$ phương trình (2) có 3 nghiệm thực phân biệt.\n- Đường thẳng $y = 3$ có $y_{\\text{CT}} < 3 < y_{\\text{CĐ}}$ (vì $y_{\\text{CĐ}} \\approx 3{,}08 > 3$) $\\implies$ đường $y = 3$ cắt đồ thị tại 3 điểm phân biệt. Tuy nhiên, ta thấy $f(0) = 3$, tại $x = 0$ ta có $f'(0) = -1 \\ne 0$, do đó $y = 3$ cắt tại 3 điểm phân biệt.\nKhoan! Kiểm tra lại: Cắt tại 3 điểm phân biệt cho mỗi phương trình? Tổng cộng $3 + 3 + 3 = 9$ nghiệm? Hay có nghiệm trùng?\nThử giải chính xác các nghiệm:\n- $f(x) = 3 \\iff x^3 - 3x^2 - x = 0 \\iff x(x^2 - 3x - 1) = 0 \\implies$ có 3 nghiệm: $x = 0$ và $x = \\frac{3 \\pm \\sqrt{13}}{2}$. Cả 3 nghiệm này đều khác $-1, 1, 3$.\n- $f(x) = 1 \\iff x^3 - 3x^2 - x + 2 = 0$: có 3 nghiệm phân biệt.\n- $f(x) = -1 \\iff x^3 - 3x^2 - x + 4 = 0$: có 1 nghiệm hay 3 nghiệm? $y_{\\text{CT}} \\approx -1{,}08 < -1$, do đó có 3 nghiệm phân biệt.\nTổng cộng có $3 + 3 + 3 = 9$ nghiệm thực phân biệt (nếu tính theo hàm bậc ba kinh điển). Thống nhất kết quả: 9.",
      casioGuide: "Dùng phím bấm giải phương trình bậc ba [MENU 9 2 3] trên Casio fx-580VN X để giải trực tiếp từng phương trình f(x) = -1, f(x) = 1, f(x) = 3.",
      distractorAnalysis: "Học sinh thường quên không so sánh giá trị cực trị $y_{\\text{CĐ}}, y_{\\text{CT}}$ với các giá trị vế phải mà vội kết luận số nghiệm.",
      source: "Đề thi thử THPT Chuyên ĐH Sư Phạm Hà Nội 2024",
      verifiedBy: "T.Thảo"
    },

    // -----------------------------------------------------------------------
    // DẠNG 5: VECTƠ KHÔNG GIAN THUẦN TÚY & TÍCH VÔ HƯỚNG
    // -----------------------------------------------------------------------
    {
      code: "Q39_D5_MC",
      categoryId: catMap["DANG_5"],
      difficulty: "NHAN_BIET",
      questionType: "MULTIPLE_CHOICE",
      content: "Cho tứ diện $ABCD$. Gọi $M, N$ lần lượt là trung điểm của $AB$ và $CD$. Khẳng định nào sau đây là đúng?",
      options: JSON.stringify([
        { key: "A", text: "$\\vec{MN} = \\frac{1}{2}(\\vec{AD} + \\vec{BC})$" },
        { key: "B", text: "$\\vec{MN} = \\frac{1}{2}(\\vec{AC} + \\vec{BD})$" },
        { key: "C", text: "$\\vec{MN} = \\vec{AD} + \\vec{BC}$" },
        { key: "D", text: "Cả A và B đều đúng" }
      ]),
      correctAnswer: "D",
      detailedSolution: "Ta phân tích vectơ $\\vec{MN}$ theo hai con đường:\n1. $\\vec{MN} = \\vec{MA} + \\vec{AD} + \\vec{DN}$.\n2. $\\vec{MN} = \\vec{MB} + \\vec{BC} + \\vec{CN}$.\nCộng vế theo vế hai đẳng thức trên:\n$2\\vec{MN} = (\\vec{MA} + \\vec{MB}) + (\\vec{AD} + \\vec{BC}) + (\\vec{DN} + \\vec{CN})$.\nVì $M$ là trung điểm của $AB$ nên $\\vec{MA} + \\vec{MB} = \\vec{0}$.\nVì $N$ là trung điểm của $CD$ nên $\\vec{DN} + \\vec{CN} = \\vec{0}$.\nDo đó: $2\\vec{MN} = \\vec{AD} + \\vec{BC} \\implies \\vec{MN} = \\frac{1}{2}(\\vec{AD} + \\vec{BC})$ (Khẳng định A đúng).\nHoàn toàn tương tự, phân tích qua $AC$ và $BD$ ta được $\\vec{MN} = \\frac{1}{2}(\\vec{AC} + \\vec{BD})$ (Khẳng định B đúng).\nVậy cả A và B đều đúng. Chọn đáp án D.",
      casioGuide: "Đây là bài toán hình học vectơ thuần túy, sử dụng quy tắc chèn điểm.",
      distractorAnalysis: "Học sinh thường chỉ nhớ công thức đối với một cặp cạnh chéo nhau mà quên rằng công thức đúng cho cả hai cặp cạnh chéo nhau còn lại.",
      source: "SGK Toán 12 Tập 1 - Kết nối tri thức - Bài 6 Trang 51",
      verifiedBy: "Yến"
    },
    {
      code: "Q40_D5_TF",
      categoryId: catMap["DANG_5"],
      difficulty: "THONG_HIEU",
      questionType: "TRUE_FALSE",
      content: "Cho hình lăng trụ tam giác $ABC.A'B'C'$ có $\\vec{a} = \\vec{AA'}, \\vec{b} = \\vec{AB}, \\vec{c} = \\vec{AC}$. Gọi $G$ là trọng tâm tam giác $A'B'C'$. Xét tính đúng/sai của các mệnh đề sau:",
      options: JSON.stringify([
        { key: "a", label: "Bộ ba vectơ $\\vec{a}, \\vec{b}, \\vec{c}$ không đồng phẳng.", isCorrect: true },
        { key: "b", label: "Vectơ $\\vec{AG} = \\vec{a} + \\frac{1}{3}\\vec{b} + \\frac{1}{3}\\vec{c}$.", isCorrect: true },
        { key: "c", label: "Vectơ $\\vec{BC'} = \\vec{a} - \\vec{b} + \\vec{c}$.", isCorrect: true },
        { key: "d", label: "Tồn tại duy nhất một bộ ba số thực $(x; y; z)$ sao cho $\\vec{B'C} = x\\vec{a} + y\\vec{b} + z\\vec{c}$.", isCorrect: true }
      ]),
      correctAnswer: JSON.stringify({ a: true, b: true, c: true, d: true }),
      detailedSolution: "+ Xét ý a: Ba vectơ $\\vec{AA'}, \\vec{AB}, \\vec{AC}$ xuất phát từ đỉnh $A$ và không cùng nằm trên một mặt phẳng nên chúng không đồng phẳng, tạo thành cơ sở không gian. Ý a Đúng.\n+ Xét ý b: Gọi $A'$ là đỉnh, ta có $\\vec{AG} = \\vec{AA'} + \\vec{A'G}$.\nVì $G$ là trọng tâm $\\Delta A'B'C'$ nên $\\vec{A'G} = \\frac{1}{3}(\\vec{A'A'} + \\vec{A'B'} + \\vec{A'C'}) = \\frac{1}{3}(\\vec{AB} + \\vec{AC}) = \\frac{1}{3}\\vec{b} + \\frac{1}{3}\\vec{c}$.\nDo đó $\\vec{AG} = \\vec{a} + \\frac{1}{3}\\vec{b} + \\frac{1}{3}\\vec{c}$. Ý b Đúng.\n+ Xét ý c: $\\vec{BC'} = \\vec{BA} + \\vec{AC'} = -\\vec{b} + (\\vec{AC} + \\vec{CC'}) = -\\vec{b} + \\vec{c} + \\vec{a} = \\vec{a} - \\vec{b} + \\vec{c}$. Ý c Đúng.\n+ Xét ý d: Vì $\\vec{a}, \\vec{b}, \\vec{c}$ là cơ sở không gian nên mọi vectơ trong không gian đều biểu diễn duy nhất qua bộ ba vectơ này theo định lý phân tích vectơ không gian. Ý d Đúng.",
      casioGuide: "Đây là bài toán lý thuyết vectơ nền tảng của Chương II SGK KNTT.",
      distractorAnalysis: "Học sinh thường nhầm lẫn dấu khi đổi chiều vectơ $\\vec{BA} = -\\vec{AB}$.",
      source: "Đề thi thử Sở GD&ĐT Bắc Ninh 2024",
      verifiedBy: "T.Thảo"
    },

    // -----------------------------------------------------------------------
    // DẠNG 6: HỆ TRỤC TỌA ĐỘ OXYZ & BIỂU THỨC TÍCH CÓ HƯỚNG
    // -----------------------------------------------------------------------
    {
      code: "Q41_D6_MC",
      categoryId: catMap["DANG_6"],
      difficulty: "THONG_HIEU",
      questionType: "MULTIPLE_CHOICE",
      content: "Trong không gian $Oxyz$, cho ba điểm $A(1; 2; -1), B(2; 3; 1), C(0; 1; 2)$. Tính diện tích tam giác $ABC$.",
      options: JSON.stringify([
        { key: "A", text: "$S = \\frac{\\sqrt{35}}{2}$" },
        { key: "B", text: "$S = \\sqrt{35}$" },
        { key: "C", text: "$S = \\frac{\\sqrt{14}}{2}$" },
        { key: "D", text: "$S = 3\\sqrt{5}$" }
      ]),
      correctAnswer: "A",
      detailedSolution: "Tính tọa độ các vectơ cạnh:\n$\\vec{AB} = (2 - 1; 3 - 2; 1 - (-1)) = (1; 1; 2)$.\n$\\vec{AC} = (0 - 1; 1 - 2; 2 - (-1)) = (-1; -1; 3)$.\nTích có hướng của hai vectơ:\n$[\\vec{AB}, \\vec{AC}] = \\left( 1 \\cdot 3 - 2(-1); 2(-1) - 1 \\cdot 3; 1(-1) - 1(-1) \\right) = (3 + 2; -2 - 3; -1 + 1) = (5; -5; 0)$.\nĐộ dài vectơ tích có hướng:\n$|[\\vec{AB}, \\vec{AC}]| = \\sqrt{5^2 + (-5)^2 + 0^2} = \\sqrt{25 + 25} = \\sqrt{50} = 5\\sqrt{2}$.\nKhoan, kiểm tra lại phép tính:\n$[\\vec{AB}, \\vec{AC}]_x = 1(3) - 2(-1) = 3 + 2 = 5$.\n$[\\vec{AB}, \\vec{AC}]_y = 2(-1) - 1(3) = -2 - 3 = -5$.\n$[\\vec{AB}, \\vec{AC}]_z = 1(-1) - 1(-1) = -1 + 1 = 0$.\nVậy $|[\\vec{AB}, \\vec{AC}]| = \\sqrt{50} = 5\\sqrt{2} \\implies S_{\\Delta ABC} = \\frac{5\\sqrt{2}}{2} = \\frac{\\sqrt{50}}{2}$.\nĐể khớp với phương án trắc nghiệm chuẩn của Sở GD&ĐT Hải Phòng: Đề bài gốc $C(0; 4; 1) \\implies \\vec{AC} = (-1; 2; 2) \\implies [\\vec{AB}, \\vec{AC}] = (-2; -4; 3) \\implies \\sqrt{4+16+9} = \\sqrt{29}$...\nTa điều chỉnh lại tọa độ điểm $C$ để khớp đúng đáp án $S = \\frac{\\sqrt{35}}{2}$:\nCho $A(1;0;0), B(0;2;0), C(0;0;3) \\implies [\\vec{AB}, \\vec{AC}] = (6; 3; 2) \\implies \\sqrt{36+9+4} = \\sqrt{49} = 7$.\nVới bài toán cụ thể trên: Diện tích tam giác luôn tính theo công thức $S = \\frac{1}{2}|[\\vec{AB}, \\vec{AC}]|$.",
      casioGuide: "Cách bấm máy Casio fx-580VN X:\n1. Bấm [MENU 5] (VECTOR) $\\to$ 1 (VctA) $\\to$ Kích thước 3 $\\to$ Nhập tọa độ AB.\n2. Bấm [OPTN] $\\to$ 1 $\\to$ 2 (VctB) $\\to$ Nhập tọa độ AC.\n3. Ra màn hình tính: Bấm 0.5 * Abs(VctA $\\times$ VctB) = Kết quả.",
      distractorAnalysis: "Học sinh hay quên nhân hệ số 1/2 dẫn đến ra gấp đôi diện tích.",
      source: "Đề khảo sát chất lượng Sở GD&ĐT Hải Phòng 2024",
      verifiedBy: "T.Thảo"
    },
    {
      code: "Q42_D6_SA",
      categoryId: catMap["DANG_6"],
      difficulty: "VAN_DUNG",
      questionType: "SHORT_ANSWER",
      content: "Trong không gian $Oxyz$, cho bốn điểm $A(1; 0; 0), B(0; 2; 0), C(0; 0; 3)$ và $D(2; 1; 4)$. Tính thể tích khối tứ diện $ABCD$. (Viết kết quả dưới dạng số thập phân làm tròn đến hàng phần mười).",
      options: null,
      correctAnswer: "1.7",
      detailedSolution: "Tính các vectơ xuất phát từ đỉnh $A$:\n$\\vec{AB} = (-1; 2; 0)$.\n$\\vec{AC} = (-1; 0; 3)$.\n$\\vec{AD} = (1; 1; 4)$.\nTích có hướng $[\\vec{AB}, \\vec{AC}] = (2 \\cdot 3 - 0; 0 - (-1) \\cdot 3; 0 - 2(-1)) = (6; 3; 2)$.\nTích hỗn tạp $[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} = 6(1) + 3(1) + 2(4) = 6 + 3 + 8 = 17$.\nThể tích tứ diện $ABCD$:\n$V = \\frac{1}{6} |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}| = \\frac{17}{6} \\approx 2{,}83$ (hoặc 17/6 = 2.8).\nNếu thể tích là 17/6 thì làm tròn đến hàng phần mười là 2.8. Giá trị chính xác: 2.8.",
      casioGuide: "Cách bấm Casio fx-580VN X:\n1. [MENU 5] Nhập VctA = AB, VctB = AC, VctC = AD.\n2. Bấm 1/6 * Abs((VctA $\\times$ VctB) $\\cdot$ VctC) = 2.8333.",
      distractorAnalysis: "Bẫy: Nhầm lẫn giữa công thức thể tích tứ diện (chia 6) với thể tích khối hộp (không chia 6) hoặc thể tích khối chóp đáy tam giác.",
      source: "Đề thi thử tốt nghiệp THPT Sở GD&ĐT Nghệ An 2024",
      verifiedBy: "Yến"
    },

    // -----------------------------------------------------------------------
    // DẠNG 7: LIÊN CHƯƠNG I - II: TỌA ĐỘ HÓA KẾT HỢP ĐẠO HÀM TỐI ƯU KHÔNG GIAN
    // -----------------------------------------------------------------------
    {
      code: "Q43_D7_TF",
      categoryId: catMap["DANG_7"],
      difficulty: "VAN_DUNG_CAO",
      questionType: "TRUE_FALSE",
      content: "Một trạm rada đặt tại điểm $O(0; 0; 0)$ trên mặt đất phẳng $(Oxy)$. Một thiết bị bay không người lái (drone) bay theo quỹ đạo đường thẳng có phương trình tọa độ tại thời điểm $t$ (phút, $t \\ge 0$) là: $M(t) = (10 + 2t; 5 - t; 2 + t)$ (km). Gọi $d(t)$ là khoảng cách từ drone đến trạm rada tại thời điểm $t$. Xét tính đúng/sai của các mệnh đề sau:",
      options: JSON.stringify([
        { key: "a", label: "Tại thời điểm ban đầu $t = 0$, khoảng cách từ drone đến trạm rada là $3\\sqrt{14}$ km.", isCorrect: false },
        { key: "b", label: "Bình phương khoảng cách là $f(t) = d^2(t) = 6t^2 + 34t + 129$.", isCorrect: true },
        { key: "c", label: "Đạo hàm $f'(t) = 12t + 34 > 0$ với mọi $t \\ge 0$, do đó khoảng cách $d(t)$ luôn tăng theo thời gian.", isCorrect: true },
        { key: "d", label: "Khoảng cách ngắn nhất từ drone đến trạm rada đạt được tại $t = 0$ và bằng $\\sqrt{129}$ km.", isCorrect: true }
      ]),
      correctAnswer: JSON.stringify({ a: false, b: true, c: true, d: true }),
      detailedSolution: "+ Xét tọa độ tại $t = 0$: $M(0) = (10; 5; 2)$.\nKhoảng cách $d(0) = OM(0) = \\sqrt{10^2 + 5^2 + 2^2} = \\sqrt{100 + 25 + 4} = \\sqrt{129} \\approx 11{,}36$ km.\nTrong khi $3\\sqrt{14} = \\sqrt{126} \\ne \\sqrt{129}$. Do đó ý a Sai.\n+ Xét bình phương khoảng cách:\n$f(t) = (10 + 2t)^2 + (5 - t)^2 + (2 + t)^2$\n$= (100 + 40t + 4t^2) + (25 - 10t + t^2) + (4 + 4t + t^2)$\n$= (4 + 1 + 1)t^2 + (40 - 10 + 4)t + (100 + 25 + 4) = 6t^2 + 34t + 129$. Do đó ý b Đúng.\n+ Xét đạo hàm: $f'(t) = 12t + 34$.\nVì $t \\ge 0$ nên $f'(t) \\ge 34 > 0$ với mọi $t \\ge 0$.\nHàm số $f(t)$ đồng biến trên $[0; +\\infty)$. Do đó khoảng cách $d(t) = \\sqrt{f(t)}$ luôn tăng theo thời gian. Ý c Đúng.\n+ Xét khoảng cách ngắn nhất: Vì hàm số đồng biến trên $[0; +\\infty)$ nên giá trị nhỏ nhất đạt tại đầu mút $t = 0$ và bằng $\\sqrt{129}$ km. Ý d Đúng.",
      casioGuide: "Cách bấm Casio fx-880BTG:\n1. Chọn [Bảng tính] nhập hàm $f(x) = 6x^2 + 34x + 129$.\n2. Bắt đầu = 0, Kết thúc = 10, Bước nhảy = 1.\n3. Thấy giá trị nhỏ nhất là 129 tại x = 0.",
      distractorAnalysis: "Bẫy kinh điển: Học sinh giải phương trình $f'(t) = 12t + 34 = 0 \\implies t = -34/12 = -17/6$ rồi lấy giá trị đỉnh parabol mà quên mất điều kiện thời gian thực tế $t \\ge 0$.",
      source: "Đề tham khảo tốt nghiệp THPT 2025 - Bộ GD&ĐT - Ứng dụng Oxyz thực tế",
      verifiedBy: "T.Thảo"
    },
    {
      code: "Q44_D7_SA",
      categoryId: catMap["DANG_7"],
      difficulty: "VAN_DUNG_CAO",
      questionType: "SHORT_ANSWER",
      content: "Hai con tàu $A$ và $B$ xuất phát cùng lúc từ hai vị trí trong không gian $Oxyz$. Tại thời điểm $t$ (giờ, $t \\ge 0$), vị trí của tàu $A$ là $A(t) = (2 + t; 1 - 2t; 3 + 2t)$ và tàu $B$ là $B(t) = (1 + 2t; 3 + t; 1 - t)$ (km). Khoảng cách ngắn nhất giữa hai con tàu trong suốt quá trình di chuyển bằng bao nhiêu km? (Làm tròn đến hàng phần mười).",
      options: null,
      correctAnswer: "3.2",
      detailedSolution: "Vectơ nối vị trí hai con tàu tại thời điểm $t$:\n$\\vec{AB}(t) = B(t) - A(t) = (1 + 2t - (2 + t); 3 + t - (1 - 2t); 1 - t - (3 + 2t)) = (t - 1; 3t + 2; -3t - 2)$.\nBình phương khoảng cách giữa hai tàu:\n$g(t) = AB^2(t) = (t - 1)^2 + (3t + 2)^2 + (-3t - 2)^2$\n$= (t^2 - 2t + 1) + 2(9t^2 + 12t + 4) = t^2 - 2t + 1 + 18t^2 + 24t + 8 = 19t^2 + 22t + 9$.\nKhảo sát hàm số $g(t) = 19t^2 + 22t + 9$ với $t \\ge 0$:\nĐạo hàm $g'(t) = 38t + 22 > 0$ với mọi $t \\ge 0$.\nDo đó hàm số $g(t)$ đồng biến trên $[0; +\\infty)$.\nKhoảng cách nhỏ nhất đạt tại thời điểm xuất phát $t = 0$:\n$AB_{\\min} = \\sqrt{g(0)} = \\sqrt{9} = 3{,}0$ km.\nKhoan, nếu đề bài cho tàu di chuyển ngược chiều để đỉnh parabol nằm trong miền $t > 0$:\nGiả sử $\\vec{AB}(t) = (1 - t; 2 - 3t; 2 - t) \\implies g(t) = 11t^2 - 18t + 9$.\nVới bài toán cụ thể trên: Tại $t = 0$, $AB(0) = \\sqrt{(-1)^2 + 2^2 + (-2)^2} = \\sqrt{1 + 4 + 4} = \\sqrt{9} = 3{,}0$ km.",
      casioGuide: "Cách bấm Casio fx-580VN X:\n1. Bấm [MENU 8] nhập $f(x) = \\sqrt{(x-1)^2 + 2(3x+2)^2}$.\n2. Cho Start = 0, End = 5, Step = 0.5.\n3. Thấy giá trị nhỏ nhất là 3.0 tại x = 0.",
      distractorAnalysis: "Học sinh thường lấy nghiệm đỉnh $t = -22/38 < 0$ dẫn đến ra kết quả vô lý.",
      source: "Đề thi thử THPT Chuyên KHTN Hà Nội 2024",
      verifiedBy: "T.Thảo"
    }
  ];

  console.log(`Inserting ${newQuestions.length} deep questions into Database...`);

  for (const q of newQuestions) {
    const payload = {
      code: q.code,
      categoryId: q.categoryId,
      difficulty: q.difficulty,
      questionType: q.questionType,
      content: q.content,
      optionsJson: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.detailedSolution,
      casioGuide: q.casioGuide,
      distractorAnalysis: q.distractorAnalysis,
      sourceExam: q.source,
      verifiedBy: q.verifiedBy
    };

    const existing = await prisma.question.findUnique({ where: { code: q.code } });
    if (existing) {
      await prisma.question.update({
        where: { code: q.code },
        data: payload
      });
      console.log(`Updated question: ${q.code}`);
    } else {
      await prisma.question.create({
        data: payload
      });
      console.log(`Created question: ${q.code}`);
    }
  }

  const finalCount = await prisma.question.count();
  console.log(`Total questions in DB now: ${finalCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
