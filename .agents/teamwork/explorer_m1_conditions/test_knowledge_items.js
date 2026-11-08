const { validateMath } = require('./katex_validator');

const knowledgeItems10 = [
  {
    chapter: "Chương I",
    lesson: "Bài 1: Tính đơn điệu và cực trị của hàm số",
    title: "1. Định lý mở rộng về tính đơn điệu của hàm số",
    formulaLatex: "f'(x) \\ge 0 \\; (\\le 0), \\; \\forall x \\in K \\text{ và } f'(x)=0 \\text{ tại hữu hạn điểm} \\implies f(x) \\text{ đồng biến (nghịch biến) trên } K",
    conditions: "Hàm số $y=f(x)$ xác định và liên tục trên khoảng/đoạn/nửa khoảng $K \\subseteq \\mathbb{R}$ và có đạo hàm trên khoảng tương ứng của $K$. Tập các điểm làm $f'(x)=0$ là tập hữu hạn điểm cô lập, không chứa bất kỳ khoảng con nào của $K$.",
    notes: "Nếu $f'(x) > 0, \\; \\forall x \\in K$ thì hàm số đồng biến trên $K$. Tuyệt đối không dùng ký hiệu hợp ($\\cup$) hoặc gạch chéo ($\\setminus$) khi nêu các khoảng đồng biến, nghịch biến (phải nêu rời rạc từng khoảng nối bằng từ 'và').",
    sourceBook: "SGK Toán 12 Tập 1 - Kết nối tri thức, Bài 1, Trang 7-10",
    order: 1
  },
  {
    chapter: "Chương I",
    lesson: "Bài 1: Tính đơn điệu và cực trị của hàm số",
    title: "2. Điều kiện đủ để hàm số có cực trị (Dấu hiệu 1 & Dấu hiệu 2)",
    formulaLatex: "\\begin{cases} f'(x) \\text{ đổi dấu từ dương sang âm qua } x_0 \\implies x_0 \\text{ là điểm cực đại} \\\\ f'(x) \\text{ đổi dấu từ âm sang dương qua } x_0 \\implies x_0 \\text{ là điểm cực tiểu} \\\\ f'(x_0)=0, \\, f''(x_0) < 0 \\implies x_0 \\text{ là điểm cực đại}; \\quad f'(x_0)=0, \\, f''(x_0) > 0 \\implies x_0 \\text{ là điểm cực tiểu} \\end{cases}",
    conditions: "Hàm số $y=f(x)$ xác định và liên tục tại điểm $x_0 \\in D$. Điểm $x_0$ có thể làm $f'(x_0)=0$ hoặc $f'(x_0)$ không xác định. Đối với Quy tắc 2: bắt buộc phải có đạo hàm cấp hai liên tục tại lân cận $x_0$ và $f''(x_0) \\ne 0$.",
    notes: "Nghiệm bội chẵn của phương trình $f'(x)=0$ không làm đạo hàm đổi dấu nên không là điểm cực trị. Phân biệt rõ điểm cực trị của hàm số ($x_0$), giá trị cực trị ($y_0 = f(x_0)$) và điểm cực trị của đồ thị ($M(x_0; y_0)$).",
    sourceBook: "SGK Toán 12 Tập 1 - Kết nối tri thức, Bài 1, Trang 11-15",
    order: 2
  },
  {
    chapter: "Chương I",
    lesson: "Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số",
    title: "3. Quy tắc tìm GTLN và GTNN trên đoạn và trên khoảng",
    formulaLatex: "\\max_{[a; b]} f(x) = \\max \\{ f(a), f(b), f(x_1), \\dots, f(x_k) \\}, \\quad \\min_{[a; b]} f(x) = \\min \\{ f(a), f(b), f(x_1), \\dots, f(x_k) \\}",
    conditions: "Định lý Weierstrass: Hàm số $y=f(x)$ phải xác định và liên tục trên đoạn đóng $[a; b] \\subseteq D$. Các điểm $x_i \\in (a; b)$ là các điểm tại đó $f'(x_i)=0$ hoặc $f'(x_i)$ không tồn tại hữu hạn.",
    notes: "Nếu tìm GTLN-GTNN trên khoảng mở $(a; b)$ bắt buộc phải lập bảng biến thiên và tính các giới hạn tại hai đầu mút $\\lim_{x \\to a^+} f(x)$ và $\\lim_{x \\to b^-} f(x)$. Nếu giới hạn tiến ra $\\pm \\infty$ thì không tồn tại $\\max/\\min$.",
    sourceBook: "SGK Toán 12 Tập 1 - Kết nối tri thức, Bài 2, Trang 17-21",
    order: 3
  },
  {
    chapter: "Chương I",
    lesson: "Bài 3: Đường tiệm cận của đồ thị hàm số",
    title: "4. Định nghĩa và cách xác định Tiệm cận Đứng, Ngang và Xiên",
    formulaLatex: "\\begin{cases} \\lim_{x \\to \\pm \\infty} f(x) = y_0 \\implies y=y_0 \\text{ là Tiệm cận ngang} \\\\ \\lim_{x \\to x_0^+} f(x) = \\pm \\infty \\text{ (hoặc } x \\to x_0^-) \\implies x=x_0 \\text{ là Tiệm cận đứng} \\\\ y = ax + b \\; (a \\ne 0) \\text{ với } a = \\lim_{x \\to \\pm \\infty} \\frac{f(x)}{x}, \\; b = \\lim_{x \\to \\pm \\infty} [f(x) - ax] \\implies \\text{Tiệm cận xiên} \\end{cases}",
    conditions: "Tiệm cận ngang yêu cầu tập xác định $D$ không bị chặn (chứa $+\\infty$ hoặc $-\\infty$). Tiệm cận đứng yêu cầu $x_0$ là điểm tụ của $D$. Tiệm cận xiên yêu cầu hệ số góc $a \\ne 0$ và $\\lim_{x \\to \\pm \\infty} [f(x) - (ax+b)] = 0$.",
    notes: "Đối với hàm phân thức hữu tỉ $y = \\frac{P(x)}{Q(x)}$, cần phân tích nhân tử để triệt tiêu hết nghiệm chung giữa tử và mẫu trước khi kết luận số lượng đường tiệm cận đứng.",
    sourceBook: "SGK Toán 12 Tập 1 - Kết nối tri thức, Bài 3, Trang 23-28",
    order: 4
  },
  {
    chapter: "Chương I",
    lesson: "Bài 4: Khảo sát sự biến thiên và vẽ đồ thị hàm số",
    title: "5. Khảo sát 3 dạng đồ thị hàm số trọng tâm",
    formulaLatex: "\\text{1) } y = ax^3+bx^2+cx+d \\; (a \\ne 0); \\quad \\text{2) } y = \\frac{ax+b}{cx+d} \\; (ad-bc \\ne 0, c \\ne 0); \\quad \\text{3) } y = \\frac{ax^2+bx+c}{px+q} \\; (a \\ne 0, p \\ne 0, aq^2-bpq+cp^2 \\ne 0)",
    conditions: "Hàm bậc ba có tâm đối xứng là điểm uốn $I\\left(-\\frac{b}{3a}; f\\left(-\\frac{b}{3a}\\right)\\right)$ với $a \\ne 0$. Hàm nhất biến có tâm đối xứng là giao điểm của 2 đường tiệm cận $I\\left(-\\frac{d}{c}; \\frac{a}{c}\\right)$ với $c \\ne 0, ad - bc \\ne 0$. Hàm hữu tỉ bậc 2 trên bậc 1 có tâm đối xứng là giao điểm của tiệm cận đứng $x = -q/p$ và tiệm cận xiên với tử không chia hết cho mẫu.",
    notes: "Nghiên cứu kỹ điểm uốn, tiệm cận và các giao điểm với trục tọa độ để nhận diện chuẩn xác bảng biến thiên và đồ thị.",
    sourceBook: "SGK Toán 12 Tập 1 - Kết nối tri thức, Bài 4, Trang 30-38",
    order: 5
  },
  {
    chapter: "Chương I",
    lesson: "Bài 5: Ứng dụng đạo hàm giải bài toán tối ưu thực tiễn",
    title: "6. Mô hình hóa bài toán tối ưu hóa (Kinh tế, Kỹ thuật, Hình học)",
    formulaLatex: "P(x) = R(x) - C(x) \\implies P'(x) = 0 \\iff R'(x) = C'(x) \\text{ (Doanh thu cận biên bằng Chi phí cận biên)}",
    conditions: "Biến số mô hình phải thỏa mãn miền giá trị thực tế: sản lượng $x > 0$ (hoặc $x \\in [x_{\\min}; x_{\\max}]$), kích thước hình học $x > 0, r > 0, h > 0$, thời gian $t \\ge 0$. Chi phí trung bình $\\bar{C}(x) = \\frac{C(x)}{x}$ yêu cầu mẫu $x > 0$.",
    notes: "Lợi nhuận đạt cực đại khi $R'(x) = C'(x)$ và $R''(x) < C''(x)$. Với bài toán hình học, sử dụng đạo hàm hoặc bất đẳng thức Cauchy $a + b \\ge 2\\sqrt{ab}$ cho các số dương để tìm giá trị tối ưu.",
    sourceBook: "SGK Toán 12 Tập 1 - Kết nối tri thức, Bài 5, Trang 40-45",
    order: 6
  },
  {
    chapter: "Chương II",
    lesson: "Bài 6: Vectơ trong không gian",
    title: "7. Quy tắc hình hộp, tích vô hướng và tính chất góc trong không gian",
    formulaLatex: "\\vec{AC'} = \\vec{AB} + \\vec{AD} + \\vec{AA'}; \\quad \\vec{u} \\cdot \\vec{v} = |\\vec{u}| \\cdot |\\vec{v}| \\cdot \\cos(\\vec{u}, \\vec{v}); \\quad \\cos(\\vec{u}, \\vec{v}) = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|}",
    conditions: "$ABCD.A'B'C'D'$ là hình hộp trong không gian (3 cạnh chung gốc không đồng phẳng). Hai vectơ $\\vec{u}, \\vec{v} \\ne \\vec{0}$ khi tính góc (mẫu $|\\vec{u}||\\vec{v}| > 0$). Quy ước: $\\vec{0} \\cdot \\vec{u} = 0$. Hai vectơ vuông góc khi và chỉ khi tích vô hướng bằng 0: $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$.",
    notes: "Góc giữa 2 vectơ nằm trong đoạn $[0^\\circ; 180^\\circ]$ (có thể tù), trong khi góc giữa 2 đường thẳng luôn nằm trong đoạn $[0^\\circ; 90^\\circ]$.",
    sourceBook: "SGK Toán 12 Tập 1 - Kết nối tri thức, Bài 6, Trang 47-53",
    order: 7
  },
  {
    chapter: "Chương II",
    lesson: "Bài 7: Hệ trục tọa độ trong không gian",
    title: "8. Tọa độ điểm, vectơ, khoảng cách, trung điểm và trọng tâm",
    formulaLatex: "M = \\left( \\frac{x_A+x_B}{2}; \\frac{y_A+y_B}{2}; \\frac{z_A+z_B}{2} \\right); \\quad G = \\left( \\frac{x_A+x_B+x_C}{3}; \\frac{y_A+y_B+y_C}{3}; \\frac{z_A+z_B+z_C}{3} \\right)",
    conditions: "Trong không gian $Oxyz$ với 3 trục vuông góc từng đôi một và có cùng độ dài vectơ đơn vị: $|\\vec{i}| = |\\vec{j}| = |\\vec{k}| = 1, \\; \\vec{i} \\cdot \\vec{j} = \\vec{j} \\cdot \\vec{k} = \\vec{k} \\cdot \\vec{i} = 0$. Ba điểm $A, B, C$ không thẳng hàng khi tạo tam giác ($\\vec{AB}$ không cùng phương $\\vec{AC}$).",
    notes: "Khoảng cách giữa hai điểm: $AB = \\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2 + (z_B-z_A)^2} \\ge 0$. Trọng tâm tứ diện $ABCD$ chia mẫu số cho 4.",
    sourceBook: "SGK Toán 12 Tập 1 - Kết nối tri thức, Bài 7, Trang 55-61",
    order: 8
  },
  {
    chapter: "Chương II",
    lesson: "Bài 8: Biểu thức tọa độ của các phép toán vectơ",
    title: "9. Tích có hướng của hai vectơ và ứng dụng tính diện tích, thể tích",
    formulaLatex: "[\\vec{u}, \\vec{v}] = \\left( \\begin{vmatrix} u_2 & u_3 \\\\ v_2 & v_3 \\end{vmatrix}; \\begin{vmatrix} u_3 & u_1 \\\\ v_3 & v_1 \\end{vmatrix}; \\begin{vmatrix} u_1 & u_2 \\\\ v_1 & v_2 \\end{vmatrix} \\right); \\quad S_{\\Delta ABC} = \\frac{1}{2} |[\\vec{AB}, \\vec{AC}]|; \\quad V_{ABCD} = \\frac{1}{6} |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|",
    conditions: "Hệ tọa độ chuẩn $Oxyz$. Tính chất trực giao: $[\\vec{u}, \\vec{v}] \\perp \\vec{u}$ và $[\\vec{u}, \\vec{v}] \\perp \\vec{v}$. Ba điểm $A, B, C$ tạo thành tam giác $\\iff [\\vec{AB}, \\vec{AC}] \\ne \\vec{0}$. Bốn điểm $A, B, C, D$ tạo thành khối tứ diện $\\iff [\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} \\ne 0$.",
    notes: "Tích có hướng $[\\vec{u}, \\vec{v}] = \\vec{0} \\iff \\vec{u}, \\vec{v}$ cùng phương. Phương trình mặt cầu $(S): x^2+y^2+z^2-2ax-2by-2cz+d=0$ có bán kính $R = \\sqrt{a^2+b^2+c^2-d} > 0$ khi và chỉ khi $a^2+b^2+c^2-d > 0$.",
    sourceBook: "SGK Toán 12 Tập 1 - Kết nối tri thức, Bài 8, Trang 63-71",
    order: 9
  },
  {
    chapter: "Liên chương I-II",
    lesson: "Tích hợp Chương I & Chương II",
    title: "10. Cực trị hình học không gian Oxyz bằng phương pháp đạo hàm",
    formulaLatex: "d(t) = \\sqrt{f(t)} \\implies \\min d(t) = \\sqrt{\\min f(t)} \\quad \\text{với } f'(t) = 0 \\text{ và } t \\in [t_1; t_2]",
    conditions: "Mô hình hóa hình học vào hệ trục $Oxyz$, xác định tọa độ các điểm di động phụ thuộc vào tham số thời gian $t \\in [t_1; t_2]$ với $t \\ge 0$. Hàm bình phương khoảng cách $f(t) \\ge 0, \\; \\forall t$.",
    notes: "Vì hàm căn bậc hai đồng biến trên $[0; +\\infty)$, giá trị nhỏ nhất của khoảng cách $d(t)$ đạt tại cùng thời điểm với giá trị nhỏ nhất của $f(t)$. Đỉnh parabol $t_0 = -B/(2A)$ nếu rơi ra ngoài đoạn thời gian thực tế thì giá trị cực trị đạt tại đầu mút.",
    sourceBook: "SGK Toán 12 Tập 1 - Kết nối tri thức, Ôn tập cuối chương I & II, Trang 72-76",
    order: 10
  }
];

console.log('Testing KaTeX on 10 KnowledgeItems...');
let kOk = true;
for (const k of knowledgeItems10) {
  if (!validateMath(k.formulaLatex, k.title + ' formulaLatex')) kOk = false;
  if (!validateMath(k.conditions, k.title + ' conditions')) kOk = false;
  if (!validateMath(k.notes, k.title + ' notes')) kOk = false;
}
console.log('KnowledgeItems test result:', kOk ? 'ALL 10 PASSED!' : 'FAILED!');
