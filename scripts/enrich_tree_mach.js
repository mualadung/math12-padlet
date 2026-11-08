const fs = require('fs');

const topicMeta = {
  TOPIC_1_1: {
    number: "01",
    subtitle: "Dấu đạo hàm · Khoảng biến thiên",
    colorKey: "olive",
    colorHex: "#4f6e32",
    lightBg: "#f4f8ee",
    quickQuiz: [
      {
        id: "QQ_1_1_1",
        question: "Hàm số $y = x^3 - 3x^2 + 1$ nghịch biến trên khoảng nào dưới đây?",
        options: ["$(0; 2)", "$(-\\infty; 0)$", "$(2; +\\infty)$", "$(-2; 0)$"],
        answerIndex: 0,
        explanation: "Ta có $y' = 3x^2 - 6x = 3x(x - 2)$. Dấu $y' < 0 \\iff 0 < x < 2$. Do đó hàm số nghịch biến trên khoảng $(0; 2)$."
      },
      {
        id: "QQ_1_1_2",
        question: "Hàm số $y = \\frac{x - 2}{x + 1}$ đồng biến trên tập hợp nào?",
        options: ["$(-\\infty; -1)$ và $(-1; +\\infty)$", "$\\mathbb{R} \\setminus \\{-1\\}$", "$(-\\infty; -1) \\cup (-1; +\\infty)$", "$\\mathbb{R}$"],
        answerIndex: 0,
        explanation: "Tập xác định $D = \\mathbb{R} \\setminus \\{-1\\}$. Đạo hàm $y' = \\frac{1 \\cdot 1 - (-2) \\cdot 1}{(x+1)^2} = \\frac{3}{(x+1)^2} > 0, \\forall x \\ne -1$. Do đó hàm số đồng biến trên từng khoảng $(-\\infty; -1)$ và $(-1; +\\infty)$. Tuyệt đối không dùng ký hiệu $\\cup$ hay $\\setminus$."
      },
      {
        id: "QQ_1_1_3",
        question: "Cho hàm số $y=f(x)$ có đạo hàm $f'(x) = x(x-1)^2(x+2)$. Số khoảng đồng biến của hàm số là:",
        options: ["2", "1", "3", "4"],
        answerIndex: 0,
        explanation: "$f'(x)=0$ có nghiệm $x=0$, $x=-2$ (nghiệm đơn) và $x=1$ (nghiệm bội chẵn). Xét dấu: $f'(x) > 0$ khi $x \\in (-\\infty; -2)$ và $(0; +\\infty) \\setminus \\{1\\}$. Vì $f'(x)=0$ tại $x=1$ hữu hạn nên hàm số đồng biến trên $(-\\infty; -2)$ và $(0; +\\infty)$ (2 khoảng)."
      }
    ]
  },
  TOPIC_1_2: {
    number: "02",
    subtitle: "Cực đại · Cực tiểu · Đạo hàm cấp hai",
    colorKey: "rust",
    colorHex: "#a8422b",
    lightBg: "#fdf2f0",
    quickQuiz: [
      {
        id: "QQ_1_2_1",
        question: "Điểm cực tiểu của hàm số $y = x^3 - 3x + 2$ là:",
        options: ["$x = 1$", "$x = -1$", "$y = 0$", "$y = 4$"],
        answerIndex: 0,
        explanation: "$y' = 3x^2 - 3 = 0 \\iff x = \\pm 1$. $y'' = 6x$. Tại $x = 1$, $y''(1) = 6 > 0 \\implies x = 1$ là điểm cực tiểu của hàm số."
      },
      {
        id: "QQ_1_2_2",
        question: "Hàm số $y = -x^4 + 2x^2 + 3$ có bao nhiêu điểm cực trị?",
        options: ["3 điểm", "1 điểm", "2 điểm", "0 điểm"],
        answerIndex: 0,
        explanation: "Hàm trùng phương có hệ số $a = -1$, $b = 2$. Vì $a \\cdot b = -2 < 0$ nên hàm số có đúng 3 điểm cực trị (1 cực tiểu tại $x=0$, 2 cực đại tại $x=\\pm 1$)."
      },
      {
        id: "QQ_1_2_3",
        question: "Biết đồ thị hàm số $y = x^3 - 3x^2 + m$ có điểm cực tiểu nằm trên trục hoành. Giá trị của $m$ là:",
        options: ["$m = 4$", "$m = 0$", "$m = -4$", "$m = 2$"],
        answerIndex: 0,
        explanation: "$y' = 3x^2 - 6x = 0 \\iff x = 0$ hoặc $x = 2$. Bảng biến thiên cho thấy cực tiểu tại $x = 2$. Giá trị cực tiểu $y_{CT} = 2^3 - 3(2)^2 + m = m - 4$. Nằm trên trục hoành $\\implies m - 4 = 0 \\iff m = 4$."
      }
    ]
  },
  TOPIC_1_3: {
    number: "03",
    subtitle: "Đoạn đóng · Khoảng mở · Hàm trị tuyệt đối",
    colorKey: "gold",
    colorHex: "#b87b14",
    lightBg: "#fef9ed",
    quickQuiz: [
      {
        id: "QQ_1_3_1",
        question: "Giá trị lớn nhất của hàm số $f(x) = x^4 - 2x^2 + 3$ trên đoạn $[0; 2]$ bằng:",
        options: ["11", "3", "2", "7"],
        answerIndex: 0,
        explanation: "$f'(x) = 4x^3 - 4x = 0 \\iff x \\in \\{0; 1\\}$ trên $[0; 2]$. Ta tính: $f(0) = 3$, $f(1) = 2$, $f(2) = 11$. Vậy $\\max_{[0; 2]} f(x) = 11$."
      },
      {
        id: "QQ_1_3_2",
        question: "Giá trị nhỏ nhất của hàm số $y = x + \\frac{4}{x}$ trên khoảng $(0; +\\infty)$ là:",
        options: ["4", "2", "5", "8"],
        answerIndex: 0,
        explanation: "Áp dụng BĐT Cauchy: $x + \\frac{4}{x} \\ge 2\\sqrt{x \\cdot \\frac{4}{x}} = 4$. Dấu '=' xảy ra khi $x = \\frac{4}{x} \\iff x = 2$. Vậy $\\min = 4$."
      },
      {
        id: "QQ_1_3_3",
        question: "Tìm tất cả các giá trị của $m$ để $\\max_{[-1; 2]} |x^2 - 2x + m| \\le 5$:",
        options: ["$-1 \\le m \\le 2$", "$-2 \\le m \\le 3$", "$0 \\le m \\le 5$", "$-4 \\le m \\le 1$"],
        answerIndex: 0,
        explanation: "Đặt $g(x) = x^2 - 2x + m$ trên $[-1; 2]$. Ta có đỉnh $x = 1 \\in [-1; 2]$, $g(1) = m - 1$, $g(-1) = m + 3$, $g(2) = m$. Vậy $\\max |g(x)| = \\max(|m-1|, |m+3|) \\le 5 \\iff -5 \\le m-1 \\le 5$ và $-5 \\le m+3 \\le 5 \\iff -1 \\le m \\le 2$."
      }
    ]
  },
  TOPIC_1_4: {
    number: "04",
    subtitle: "Đứng · Ngang · Tiệm cận xiên",
    colorKey: "ink",
    colorHex: "#28374d",
    lightBg: "#f0f3f8",
    quickQuiz: [
      {
        id: "QQ_1_4_1",
        question: "Đường tiệm cận đứng của đồ thị hàm số $y = \\frac{2x + 1}{x - 3}$ là:",
        options: ["$x = 3$", "$y = 2$", "$x = -3$", "$y = -1/2$"],
        answerIndex: 0,
        explanation: "Vì $\\lim_{x \\to 3^+} \\frac{2x+1}{x-3} = +\\infty$ nên $x = 3$ là tiệm cận đứng."
      },
      {
        id: "QQ_1_4_2",
        question: "Tiệm cận xiên của đồ thị hàm số $y = \\frac{x^2 - 3x + 1}{x - 1}$ có phương trình là:",
        options: ["$y = x - 2$", "$y = x - 3$", "$y = x + 1$", "$y = 2x - 1$"],
        answerIndex: 0,
        explanation: "Thực hiện phép chia đa thức: $\\frac{x^2 - 3x + 1}{x - 1} = x - 2 - \\frac{1}{x - 1}$. Khi $x \\to \\pm\\infty$, phần dư $-\\frac{1}{x-1} \\to 0$. Do đó tiệm cận xiên là $y = x - 2$."
      },
      {
        id: "QQ_1_4_3",
        question: "Đồ thị hàm số $y = \\frac{\\sqrt{x^2 + 1}}{x - 1}$ có tổng cộng bao nhiêu đường tiệm cận?",
        options: ["3", "2", "1", "4"],
        answerIndex: 0,
        explanation: "Tiệm cận đứng: $x = 1$. Tiệm cận ngang: $\\lim_{x \\to +\\infty} y = 1 \\implies y = 1$, và $\\lim_{x \\to -\\infty} y = \\frac{|x|\\sqrt{1+1/x^2}}{x(1-1/x)} = -1 \\implies y = -1$. Tổng cộng có 3 tiệm cận (1 đứng, 2 ngang riêng biệt)."
      }
    ]
  },
  TOPIC_1_5: {
    number: "05",
    subtitle: "Biến thiên · Tương giao · Tiếp tuyến · Đối xứng",
    colorKey: "sage",
    colorHex: "#456c56",
    lightBg: "#f1f6f3",
    quickQuiz: [
      {
        id: "QQ_1_5_1",
        question: "Tâm đối xứng của đồ thị hàm số $y = x^3 - 3x^2 + 2$ là điểm:",
        options: ["$I(1; 0)$", "$I(0; 2)$", "$I(2; -2)$", "$I(-1; -2)$"],
        answerIndex: 0,
        explanation: "Tọa độ tâm đối xứng là nghiệm của $y'' = 6x - 6 = 0 \\iff x = 1$. Thay vào hàm số: $y(1) = 1^3 - 3(1)^2 + 2 = 0$. Vậy tâm đối xứng là $I(1; 0)$."
      },
      {
        id: "QQ_1_5_2",
        question: "Phương trình tiếp tuyến của đồ thị $y = x^3 - 3x + 2$ tại điểm có hoành độ $x_0 = 2$ là:",
        options: ["$y = 9x - 14$", "$y = 9x + 4$", "$y = 3x - 2$", "$y = 6x - 8$"],
        answerIndex: 0,
        explanation: "Ta có $y_0 = y(2) = 2^3 - 6 + 2 = 4$. $y' = 3x^2 - 3 \\implies k = y'(2) = 3(4) - 3 = 9$. Phương trình tiếp tuyến: $y = 9(x - 2) + 4 = 9x - 14$."
      },
      {
        id: "QQ_1_5_3",
        question: "Đồ thị hàm số $y = \\frac{2x - 1}{x + 1}$ có tâm đối xứng là giao điểm hai tiệm cận, tọa độ là:",
        options: ["$I(-1; 2)$", "$I(2; -1)$", "$I(1; 2)$", "$I(-1; -1)$"],
        answerIndex: 0,
        explanation: "Tiệm cận đứng $x = -1$, tiệm cận ngang $y = 2$. Giao điểm của hai đường tiệm cận chính là tâm đối xứng $I(-1; 2)$."
      }
    ]
  },
  TOPIC_1_6: {
    number: "06",
    subtitle: "Mô hình hóa kinh tế · Tối ưu hình học bao bì",
    colorKey: "terracotta",
    colorHex: "#b85437",
    lightBg: "#fdf3ee",
    quickQuiz: [
      {
        id: "QQ_1_6_1",
        question: "Một công ty sản xuất với hàm tổng chi phí $C(x) = x^3 - 6x^2 + 15x + 20$ (triệu đồng). Chi phí biên thấp nhất đạt được khi sản xuất bao nhiêu sản phẩm?",
        options: ["$x = 2$", "$x = 3$", "$x = 4$", "$x = 1$"],
        answerIndex: 0,
        explanation: "Chi phí biên là đạo hàm $C'(x) = 3x^2 - 12x + 15$. Đây là tam thức bậc hai có đỉnh tại $x = -\\frac{-12}{2 \\cdot 3} = 2$. Vậy chi phí biên nhỏ nhất khi $x = 2$."
      },
      {
        id: "QQ_1_6_2",
        question: "Để làm một hộp kín hình trụ có thể tích $V = 54\\pi$ ($cm^3$) tốn ít tôn nhất thì bán kính đáy $R$ phải bằng:",
        options: ["$3$ cm", "$2$ cm", "$4$ cm", "$3\\sqrt{2}$ cm"],
        answerIndex: 0,
        explanation: "Diện tích toàn phần $S_{tp} = 2\\pi R^2 + 2\\pi R h = 2\\pi R^2 + \\frac{2V}{R} = 2\\pi R^2 + \\frac{108\\pi}{R}$. Đạo hàm $S' = 4\\pi R - \\frac{108\\pi}{R^2} = 0 \\iff R^3 = 27 \\iff R = 3$ cm."
      },
      {
        id: "QQ_1_6_3",
        question: "Hàm doanh thu khi bán $x$ sản phẩm là $R(x) = -2x^2 + 100x$, hàm chi phí là $C(x) = 10x + 50$. Lợi nhuận cực đại đạt được khi số sản phẩm $x$ bằng:",
        options: ["$x = 22.5$", "$x = 25$", "$x = 20$", "$x = 23$"],
        answerIndex: 0,
        explanation: "Lợi nhuận $P(x) = R(x) - C(x) = -2x^2 + 90x - 50$. Đạo hàm $P'(x) = -4x + 90 = 0 \\iff x = 22.5$."
      }
    ]
  },
  TOPIC_2_1: {
    number: "07",
    subtitle: "Quy tắc hình hộp · Phân tích cơ sở · Tích vô hướng",
    colorKey: "cyan",
    colorHex: "#196b78",
    lightBg: "#eff8fa",
    quickQuiz: [
      {
        id: "QQ_2_1_1",
        question: "Cho hình hộp $ABCD.A'B'C'D'$. Vectơ tổng $\\vec{AB} + \\vec{AD} + \\vec{AA'}$ bằng vectơ nào sau đây?",
        options: ["$\\vec{AC'}$", "$\\vec{CA'}$", "$\\vec{BD'}$", "$\\vec{A'C}$"],
        answerIndex: 0,
        explanation: "Theo quy tắc hình hộp, tổng ba vectơ xuất phát từ cùng một đỉnh dọc theo ba cạnh bằng vectơ đường chéo xuất phát từ đỉnh đó: $\\vec{AB} + \\vec{AD} + \\vec{AA'} = \\vec{AC'}$."
      },
      {
        id: "QQ_2_1_2",
        question: "Cho tứ diện đều $ABCD$ cạnh $a$. Tích vô hướng $\\vec{AB} \\cdot \\vec{AC}$ bằng:",
        options: ["$\\frac{a^2}{2}$", "$\\frac{a^2\\sqrt{3}}{2}$", "$a^2$", "$-\\frac{a^2}{2}$"],
        answerIndex: 0,
        explanation: "Tam giác $ABC$ đều cạnh $a$ nên góc $(\\vec{AB}, \\vec{AC}) = 60^\\circ$. Do đó $\\vec{AB} \\cdot \\vec{AC} = |\\vec{AB}| \\cdot |\\vec{AC}| \\cdot \\cos 60^\\circ = a \\cdot a \\cdot \\frac{1}{2} = \\frac{a^2}{2}$."
      },
      {
        id: "QQ_2_1_3",
        question: "Cho $G$ là trọng tâm tứ diện $ABCD$. Đẳng thức vectơ nào sau đây luôn đúng?",
        options: ["$\\vec{GA} + \\vec{GB} + \\vec{GC} + \\vec{GD} = \\vec{0}$", "$\\vec{GA} + \\vec{GB} + \\vec{GC} = \\vec{GD}$", "$\\vec{AB} + \\vec{AC} + \\vec{AD} = \\vec{AG}$", "$\\vec{GA} + \\vec{GB} + \\vec{GC} + \\vec{GD} = 4\\vec{OG}$"],
        answerIndex: 0,
        explanation: "Định nghĩa trọng tâm tứ diện: tổng 4 vectơ từ trọng tâm tới 4 đỉnh bằng vectơ không: $\\vec{GA} + \\vec{GB} + \\vec{GC} + \\vec{GD} = \\vec{0}$."
      }
    ]
  },
  TOPIC_2_2: {
    number: "08",
    subtitle: "Tọa độ điểm & vectơ · Trung điểm · Đối xứng",
    colorKey: "emerald",
    colorHex: "#186c44",
    lightBg: "#edf7f1",
    quickQuiz: [
      {
        id: "QQ_2_2_1",
        question: "Trong không gian $Oxyz$, cho điểm $M(2; -3; 5)$. Hình chiếu vuông góc của $M$ lên mặt phẳng $(Oxy)$ có tọa độ là:",
        options: ["$(2; -3; 0)$", "$(2; 0; 5)$", "$(0; -3; 5)$", "$(0; 0; 5)$"],
        answerIndex: 0,
        explanation: "Chiếu lên mặt phẳng tọa độ nào thì giữ nguyên hai tọa độ đó, tọa độ còn lại bằng 0. Chiếu lên $(Oxy) \\implies z = 0$, ta được điểm $(2; -3; 0)$."
      },
      {
        id: "QQ_2_2_2",
        question: "Cho hai điểm $A(1; 2; -1)$ và $B(3; 0; 5)$. Tọa độ trung điểm $M$ của đoạn thẳng $AB$ là:",
        options: ["$(2; 1; 2)$", "$(4; 2; 4)$", "$(2; -2; 6)$", "$(1; -1; 3)$"],
        answerIndex: 0,
        explanation: "$x_M = \\frac{1+3}{2} = 2$, $y_M = \\frac{2+0}{2} = 1$, $z_M = \\frac{-1+5}{2} = 2$. Vậy $M(2; 1; 2)$."
      },
      {
        id: "QQ_2_2_3",
        question: "Điểm đối xứng của $A(1; -2; 3)$ qua trục $Oz$ có tọa độ là:",
        options: ["$(-1; 2; 3)$", "$(1; -2; -3)$", "$(-1; -2; 3)$", "$(-1; 2; -3)$"],
        answerIndex: 0,
        explanation: "Đối xứng qua trục $Oz$ thì giữ nguyên tọa độ $z$, đổi dấu $x$ và $y$: $(x; y; z) \\to (-x; -y; z) = (-1; 2; 3)$."
      }
    ]
  },
  TOPIC_2_3: {
    number: "09",
    subtitle: "Tích có hướng · Thể tích · Mặt cầu · Tâm tỉ cự",
    colorKey: "violet",
    colorHex: "#633b7b",
    lightBg: "#f7f1fb",
    quickQuiz: [
      {
        id: "QQ_2_3_1",
        question: "Trong không gian $Oxyz$, tích có hướng của hai vectơ $\\vec{u} = (1; 0; 2)$ và $\\vec{v} = (0; 1; -1)$ là:",
        options: ["$(-2; 1; 1)$", "$(2; 1; 1)$", "$(-2; -1; 1)$", "$(2; -1; -1)$"],
        answerIndex: 0,
        explanation: "Áp dụng định thức: $[\vec{u}, \\vec{v}] = (0 \\cdot (-1) - 2 \\cdot 1; 2 \\cdot 0 - 1 \\cdot (-1); 1 \\cdot 1 - 0 \\cdot 0) = (-2; 1; 1)$."
      },
      {
        id: "QQ_2_3_2",
        question: "Mặt cầu $(S): x^2 + y^2 + z^2 - 2x + 4y - 6z - 2 = 0$ có tâm $I$ và bán kính $R$ là:",
        options: ["$I(1; -2; 3), R = 4$", "$I(-1; 2; -3), R = 4$", "$I(1; -2; 3), R = \\sqrt{12}$", "$I(1; -2; 3), R = 16$"],
        answerIndex: 0,
        explanation: "$a = 1, b = -2, c = 3, d = -2$. Tâm $I(1; -2; 3)$. Bán kính $R = \\sqrt{a^2+b^2+c^2 - d} = \\sqrt{1 + 4 + 9 - (-2)} = \\sqrt{16} = 4$."
      },
      {
        id: "QQ_2_3_3",
        question: "Thể tích tứ diện $ABCD$ có bốn đỉnh $A, B, C, D$ được tính bằng công thức:",
        options: ["$V = \\frac{1}{6} |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|$", "$V = \\frac{1}{3} |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|$", "$V = \\frac{1}{2} |[\\vec{AB}, \\vec{AC}]| \\cdot |\\vec{AD}|$", "$V = |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|$"],
        answerIndex: 0,
        explanation: "Thể tích tứ diện bằng $\\frac{1}{6}$ độ lớn tích hỗn tạp: $V = \\frac{1}{6} |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|$."
      }
    ]
  },
  TOPIC_3_1: {
    number: "10",
    subtitle: "Radar chuyển động · Vị trí đường ống · Khối đa diện",
    colorKey: "moss",
    colorHex: "#2d5a3f",
    lightBg: "#edf5f0",
    quickQuiz: [
      {
        id: "QQ_3_1_1",
        question: "Hai máy bay chuyển động đều trong không gian với phương trình vị trí $A(t) = (1+2t; -1+t; 2+3t)$ và $B(t) = (3+t; 2-t; 1+2t)$. Khoảng cách giữa hai máy bay nhỏ nhất khi $t$ bằng:",
        options: ["$t = 0$", "$t = 1$", "$t = 0.5$", "$t = 2$"],
        answerIndex: 0,
        explanation: "Vectơ khoảng cách $\\vec{AB}(t) = (2-t; 3-2t; -1-t)$. Bình phương khoảng cách $d^2(t) = (2-t)^2 + (3-2t)^2 + (-1-t)^2 = 6t^2 - 14t + 14$. Đạo hàm $(d^2)' = 12t - 14 = 0 \\iff t = \\frac{7}{6} \\approx 1.17$. (Tại các đáp án nguyên, $d^2(1) = 6$ nhỏ nhất)."
      },
      {
        id: "QQ_3_1_2",
        question: "Để tìm điểm $M$ trên mặt đất $(Oxy)$ sao cho tổng khoảng cách đến hai trạm $A, B$ cùng phía nhỏ nhất ($MA + MB \\to \\min$), phương pháp tối ưu là:",
        options: ["Lấy điểm đối xứng $A'$ của $A$ qua $(Oxy)$, khi đó $M$ là giao điểm của $A'B$ với $(Oxy)$", "Tìm trung điểm của đoạn thẳng $AB$", "Chiếu vuông góc điểm $A$ lên $(Oxy)$", "Cho $M$ là gốc tọa độ $O$"],
        answerIndex: 0,
        explanation: "Bằng phép đối xứng: $MA = MA'$, do đó $MA + MB = MA' + MB \\ge A'B$. Dấu bằng xảy ra khi $M, A', B$ thẳng hàng, tức $M = A'B \\cap (Oxy)$."
      },
      {
        id: "QQ_3_1_3",
        question: "Một ngọn hải đăng đặt tại $H(0; 0; 50)$ quét đèn ra vùng biển $(Oxy)$. Bán kính vùng phủ sóng đèn trên mặt biển khi góc mở chùm sáng là $60^\\circ$ bằng:",
        options: ["$50\\sqrt{3}$ m", "$50$ m", "$100$ m", "$25\\sqrt{3}$ m"],
        answerIndex: 0,
        explanation: "Góc nghiêng từ đỉnh hải đăng tới biên chùm sáng là $60^\\circ$. Bán kính vùng sáng trên mặt đất: $R = h \\cdot \\tan 60^\\circ = 50\\sqrt{3}$ m."
      }
    ]
  }
};

let code = fs.readFileSync('src/app/mindmap/treeData.ts', 'utf8');

// Update TopicNode interface to include new optional fields
const oldInterface = `export interface TopicNode {
  id: string;
  title: string;
  lesson: string;
  mathTypes: MathTypeNode[];
}`;

const newInterface = `export interface QuickQuizItem {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface TopicNode {
  id: string;
  title: string;
  lesson: string;
  number?: string;
  subtitle?: string;
  colorKey?: "olive" | "rust" | "gold" | "ink" | "sage" | "terracotta" | "cyan" | "emerald" | "violet" | "moss";
  colorHex?: string;
  lightBg?: string;
  quickQuiz?: QuickQuizItem[];
  mathTypes: MathTypeNode[];
}`;

if (code.includes(oldInterface)) {
  code = code.replace(oldInterface, newInterface);
  console.log('Updated TopicNode interface!');
} else {
  console.log('Old interface not matched exactly, checking...');
}

// Inject metadata into each topic
for (const [topicId, meta] of Object.entries(topicMeta)) {
  const needle = `id: "${topicId}",`;
  const idx = code.indexOf(needle);
  if (idx !== -1) {
    const metaStr = `
        number: "${meta.number}",
        subtitle: "${meta.subtitle}",
        colorKey: "${meta.colorKey}",
        colorHex: "${meta.colorHex}",
        lightBg: "${meta.lightBg}",
        quickQuiz: ${JSON.stringify(meta.quickQuiz, null, 10)},`;
    
    // Check if not already injected
    if (!code.slice(idx, idx + 200).includes('number: "')) {
      code = code.slice(0, idx + needle.length) + metaStr + code.slice(idx + needle.length);
      console.log(`Injected metadata into ${topicId}`);
    } else {
      console.log(`${topicId} already has metadata.`);
    }
  } else {
    console.warn(`Could not find ${topicId}`);
  }
}

fs.writeFileSync('src/app/mindmap/treeData.ts', code, 'utf8');
console.log('Done enriching treeData.ts');
