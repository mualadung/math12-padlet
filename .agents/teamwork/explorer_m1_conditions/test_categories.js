const { validateMath } = require('./katex_validator');

const categories7 = [
  {
    code: "DANG_1",
    chapter: "Chương I",
    title: "Dạng 1: Xét tính đơn điệu và cực trị của hàm số",
    identifySigns: "Đề bài yêu cầu tìm khoảng đồng biến/nghịch biến, tìm điểm cực trị, giá trị cực trị của hàm số (bậc ba, hàm phân thức bậc nhất/bậc nhất, bậc hai/bậc nhất, hàm vô tỉ) hoặc tìm tham số $m$ để hàm số đơn điệu/có cực trị trên khoảng $K$.",
    coreKnowledge: "1. Đơn điệu: Cho $f(x)$ liên tục trên $K \\subseteq \\mathbb{R}$, khả vi trên khoảng tương ứng. $f'(x) \\ge 0$ (hoặc $\\le 0$) $\\forall x \\in K$ và $f'(x)=0$ chỉ tại hữu hạn điểm $\\implies$ hàm đồng biến (nghịch biến) trên $K$.\n2. Cực trị: Điểm $x_0 \\in D$, $f(x)$ liên tục tại $x_0$ và $f'(x)$ đổi dấu khi qua $x_0$. Quy tắc 2: $f'(x_0)=0$ và $f''(x_0) < 0 \\implies$ Cực đại ($f''(x_0) > 0 \\implies$ Cực tiểu).\n3. Hàm bậc ba $y=ax^3+bx^2+cx+d$ ($a \\ne 0$): có 2 cực trị $\\iff \\Delta'_{y'} = b^2 - 3ac > 0$. Hàm phân thức $y=\\frac{ax+b}{cx+d}$ ($c \\ne 0, ad-bc \\ne 0$) có $y' = \\frac{ad-bc}{(cx+d)^2} \\ne 0$ luôn cùng dấu trên từng khoảng $(-\\infty; -d/c)$ và $(-d/c; +\\infty)$ nên không có cực trị.\n4. Hàm phân thức bậc hai/bậc nhất $y=\\frac{ax^2+bx+c}{px+q}$ ($a \\ne 0, p \\ne 0, aq^2-bpq+cp^2 \\ne 0$): $D = \\mathbb{R} \\setminus \\{-q/p\\}$, dấu của $y'$ là dấu của tam thức bậc hai ở tử.",
    methodSteps: "Bước 1: Tìm tập xác định $D$ (chú ý điều kiện mẫu thức khác 0, biểu thức trong căn bậc hai không âm).\nBước 2: Tính đạo hàm $y'$, tìm các nghiệm của $y'=0$ và các điểm làm $y'$ không xác định.\nBước 3: Lập bảng xét dấu của $y'$ hoặc bảng biến thiên hoàn chỉnh (lưu ý gạch 2 sọc tại điểm gián đoạn).\nBước 4: Đối chiếu điều kiện tập xác định và đưa ra kết luận chuẩn xác (nêu từng khoảng rời nhau bằng từ 'và', cấm dùng ký hiệu $\\cup$ hoặc $\\setminus$).",
    commonMistakes: "1. Quên tìm tập xác định dẫn đến kết luận đồng biến trên $\\mathbb{R} \\setminus \\{x_0\\}$ hoặc dùng ký hiệu $\\cup$ thay vì chữ 'và'.\n2. Nhầm lẫn giữa 'điểm cực trị của hàm số' ($x$), 'cực trị/giá trị cực trị' ($y$) và 'điểm cực trị của đồ thị hàm số' ($M(x; y)$).\n3. Coi nghiệm bội chẵn của $y'=0$ là điểm cực trị.\n4. Quên điều kiện điểm gián đoạn nằm ngoài khoảng khi tìm tham số $m$ để hàm phân thức đơn điệu trên khoảng $(\\alpha; \\beta)$."
  },
  {
    code: "DANG_2",
    chapter: "Chương I",
    title: "Dạng 2: Giá trị lớn nhất - Giá trị nhỏ nhất & Bài toán tối ưu thực tiễn",
    identifySigns: "Đề bài yêu cầu tìm GTLN, GTNN của hàm số trên đoạn đóng $[a; b]$, trên khoảng mở $(a; b)$ hoặc bài toán bằng lời văn tối ưu hóa chi phí sản xuất, lợi nhuận bán hàng, thể tích hộp, diện tích rào chắn.",
    coreKnowledge: "1. Định lý Weierstrass: Hàm liên tục trên đoạn đóng $[a; b] \\subseteq D$ luôn đạt GTLN và GTNN. $\\max_{[a; b]} f(x) = \\max \\{ f(a), f(b), f(x_i) \\}$, $\\min_{[a; b]} f(x) = \\min \\{ f(a), f(b), f(x_i) \\}$ với $x_i \\in (a; b)$ thỏa $f'(x_i)=0$ hoặc $f'$ không xác định.\n2. Trên khoảng mở $(a; b)$: Bắt buộc tính giới hạn hai đầu mút và lập bảng biến thiên.\n3. Hàm chứa trị tuyệt đối: $\\max_{[a; b]} |f(x)| = \\frac{|M+m| + |M-m|}{2}$; $\\min_{[a; b]} |f(x)| = 0$ nếu $m \\le 0 \\le M$.\n4. Mô hình kinh tế: Lợi nhuận $P(x) = R(x) - C(x)$ với sản lượng $x > 0$. Chi phí trung bình $\\bar{C}(x) = \\frac{C(x)}{x}$ (mẫu $x > 0$), tối ưu khi $C'(x) = \\bar{C}(x)$. Bất đẳng thức Cauchy $a + b \\ge 2\\sqrt{ab}$ cho các số dương.",
    methodSteps: "Bước 1: Đặt biến số $x$ phù hợp và tìm điều kiện tự nhiên của biến ($x > 0$, miền đoạn giới hạn).\nBước 2: Thiết lập hàm mục tiêu $f(x)$ thể hiện đại lượng cần tối ưu.\nBước 3: Tính đạo hàm $f'(x)$, giải $f'(x)=0$ để tìm điểm dừng trên miền xác định.\nBước 4: Lập bảng biến thiên hoặc so sánh giá trị tại các điểm tới hạn và biên để kết luận GTLN/GTNN.",
    commonMistakes: "1. Quên đặt điều kiện thực tế cho biến số dẫn đến lấy nghiệm âm hoặc nghiệm không thực tế.\n2. Nhầm lẫn giữa 'giá trị của biến số $x$ để hàm đạt max' với 'chính giá trị max của hàm'.\n3. Quên điều kiện mẫu số khác 0 trên đoạn đóng $[a; b]$ trong bài toán tìm tham số $m$."
  },
  {
    code: "DANG_3",
    chapter: "Chương I",
    title: "Dạng 3: Đường tiệm cận của đồ thị hàm số (Đứng, Ngang, Xiên)",
    identifySigns: "Đề bài hỏi số đường tiệm cận, phương trình tiệm cận đứng, ngang, xiên của đồ thị hàm phân thức hữu tỉ hoặc hàm chứa căn thức bậc hai.",
    coreKnowledge: "1. Tiệm cận ngang: Đường thẳng $y = y_0$ nếu $\\lim_{x \\to +\\infty} f(x) = y_0$ hoặc $\\lim_{x \\to -\\infty} f(x) = y_0$ (yêu cầu TXD không bị chặn trên hoặc dưới).\n2. Tiệm cận đứng: Đường thẳng $x = x_0$ nếu $\\lim_{x \\to x_0^\\pm} f(x) = \\pm \\infty$ (yêu cầu $x_0$ là điểm tụ của TXD).\n3. Tiệm cận xiên: Đường thẳng $y = ax + b$ ($a \\ne 0$) với $a = \\lim_{x \\to \\pm \\infty} \\frac{f(x)}{x} \\ne 0$ và $b = \\lim_{x \\to \\pm \\infty} [f(x) - ax]$. Đối với hàm $y=\\frac{ax^2+bx+c}{px+q}$ ($a \\ne 0, p \\ne 0, aq^2-bpq+cp^2 \\ne 0$), chia đa thức ra $y = \\frac{a}{p}x + \\frac{bp-aq}{p^2} + \\frac{r}{px+q}$.\n4. Hàm chứa căn thức: $\\sqrt{x^2} = x$ khi $x \\to +\\infty$ và $\\sqrt{x^2} = -x$ khi $x \\to -\\infty$. Nhân lượng liên hợp khi gặp dạng $\\infty - \\infty$.",
    methodSteps: "Bước 1: Tìm TXD của hàm số (giải điều kiện căn $\\ge 0$, mẫu $\\ne 0$).\nBước 2: Tìm tiệm cận ngang bằng cách tính giới hạn khi $x \\to +\\infty$ và $x \\to -\\infty$ (hoặc bấm CALC $x = 10^9$ và $x = -10^9$).\nBước 3: Tìm tiệm cận đứng bằng cách giải nghiệm mẫu số, triệt tiêu hết với nghiệm của tử số trước khi kết luận.\nBước 4: Tìm tiệm cận xiên nếu bậc tử lớn hơn bậc mẫu đúng 1 bậc bằng cách chia đa thức.",
    commonMistakes: "1. Vội vàng kết luận mọi nghiệm của mẫu số đều là tiệm cận đứng mà không kiểm tra xem có bị triệt tiêu với tử số hay không.\n2. Quên dấu trừ khi rút $x$ ra khỏi căn thức ở nhánh âm vô cực $x \\to -\\infty$ dẫn đến sót hoặc sai dấu tiệm cận ngang."
  },
  {
    code: "DANG_4",
    chapter: "Chương I",
    title: "Dạng 4: Khảo sát, nhận dạng đồ thị và bài toán tương giao đồ thị hàm số",
    identifySigns: "Đề bài cho hình vẽ đồ thị hoặc bảng biến thiên, yêu cầu xác định công thức hàm số, dấu các hệ số $a, b, c, d$, hoặc tìm số nghiệm của phương trình $f(x)=m$ / $f(u(x))=m$, viết phương trình tiếp tuyến, tìm tâm đối xứng.",
    coreKnowledge: "1. Quy tắc nhận diện 5 bước: 1) Nhánh ngoài cùng bên phải ($x \\to +\\infty$) $\\implies$ dấu hệ số cao nhất $a$; 2) Giao với trục tung $Oy$ ($x=0$) $\\implies$ hệ số tự do; 3) Tọa độ điểm cực trị; 4) Các đường tiệm cận; 5) Giao với trục hoành hoặc điểm đặc biệt.\n2. Tương giao: Số nghiệm của $f(x)=m$ bằng số giao điểm giữa đồ thị $y=f(x)$ và đường thẳng $y=m$.\n3. Tiếp tuyến tại $M_0(x_0; y_0)$: $y = f'(x_0)(x - x_0) + y_0$. Tiếp tuyến song song $y = ax+b \\implies f'(x_0) = a$ và $y_0 - ax_0 \\ne b$. Tiếp tuyến vuông góc $\\implies f'(x_0) \\cdot a = -1$.\n4. Tâm đối xứng: Hàm bậc ba có tâm đối xứng là điểm uốn $I(-b/(3a); y_0)$; hàm phân thức bậc 1/bậc 1 có tâm đối xứng là giao 2 tiệm cận $I(-d/c; a/c)$; hàm bậc 2/bậc 1 có tâm đối xứng là giao TCĐ và TCX.",
    methodSteps: "Bước 1: Xác định thể loại đồ thị (bậc ba, nhất biến, bậc 2 trên bậc 1).\nBước 2: Nhìn nhánh ngoài cùng bên phải để xác định dấu của hệ số $a$.\nBước 3: Kiểm tra giao điểm với trục $Oy$, các đường tiệm cận và tâm đối xứng.\nBước 4: Thử tọa độ các điểm đặc biệt để loại trừ phương án sai.",
    commonMistakes: "1. Nhầm dấu hệ số bậc cao nhất $a$ khi nhìn vào nhánh bên trái thay vì nhánh ngoài cùng bên phải.\n2. Lẫn lộn giữa tiếp tuyến TẠI một điểm trên đồ thị và tiếp tuyến ĐI QUA một điểm bên ngoài.\n3. Quên loại trừ trường hợp tiếp tuyến trùng với đường thẳng cho trước khi làm bài toán tiếp tuyến song song."
  },
  {
    code: "DANG_5",
    chapter: "Chương II",
    title: "Dạng 5: Vectơ trong không gian và các phép toán hình học thuần túy",
    identifySigns: "Đề bài cho các khối đa diện quen thuộc (hình hộp, tứ diện, hình chóp, lăng trụ), yêu cầu tính độ dài vectơ, tính tích vô hướng, góc giữa hai vectơ hoặc phân tích một vectơ theo 3 vectơ không đồng phẳng.",
    coreKnowledge: "1. Quy tắc 3 điểm: $\\vec{AB} + \\vec{BC} = \\vec{AC}$; $\\vec{AB} - \\vec{AC} = \\vec{CB}$.\n2. Quy tắc hình bình hành: $\\vec{AB} + \\vec{AD} = \\vec{AC}$ ($ABCD$ là hình bình hành).\n3. Quy tắc hình hộp: $\\vec{AC'} = \\vec{AB} + \\vec{AD} + \\vec{AA'}$ ($ABCD.A'B'C'D'$ là hình hộp).\n4. Phân tích cơ sở: Ba vectơ $\\vec{a}, \\vec{b}, \\vec{c} \\ne \\vec{0}$ không đồng phẳng $\\implies \\forall \\vec{v}$, $\\exists! (x; y; z): \\vec{v} = x\\vec{a} + y\\vec{b} + z\\vec{c}$.\n5. Tích vô hướng: $\\vec{u} \\cdot \\vec{v} = |\\vec{u}| \\cdot |\\vec{v}| \\cos(\\vec{u}, \\vec{v})$. Khi $\\vec{u}, \\vec{v} \\ne \\vec{0}$, $\\cos(\\vec{u}, \\vec{v}) = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|}$ ($0^\\circ \\le \\text{góc} \\le 180^\\circ$). Điều kiện vuông góc: $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$.",
    methodSteps: "Bước 1: Chọn một đỉnh làm gốc và xác định bộ ba vectơ cơ sở không đồng phẳng gắn với 3 cạnh xuất phát từ đỉnh đó.\nBước 2: Biểu diễn các vectơ cần tính qua ba vectơ cơ sở.\nBước 3: Tính toán độ dài, tích vô hướng của các vectơ cơ sở dựa trên kích thước và góc của khối đa diện.\nBước 4: Áp dụng công thức tính góc và độ dài để đưa ra kết quả.",
    commonMistakes: "1. Nhầm lẫn giữa góc giữa 2 vectơ (có thể tù $> 90^\\circ$) và góc giữa 2 đường thẳng (luôn $\\le 90^\\circ$).\n2. Quên dấu trừ khi đảo chiều vectơ: $\\vec{BA} = -\\vec{AB}$.\n3. Sử dụng bộ ba vectơ cơ sở bị đồng phẳng."
  },
  {
    code: "DANG_6",
    chapter: "Chương II",
    title: "Dạng 6: Hệ trục tọa độ Oxyz, biểu thức tọa độ của vectơ và ứng dụng",
    identifySigns: "Đề bài cho tọa độ các điểm, vectơ trong không gian $Oxyz$; yêu cầu tính độ dài, góc, diện tích tam giác, thể tích khối tứ diện, khoảng cách, mặt cầu hoặc cực trị tâm tỉ cự.",
    coreKnowledge: "1. Hệ tọa độ $Oxyz$: 3 trục vuông góc, $|\\vec{i}|=|\\vec{j}|=|\\vec{k}|=1$. $\\vec{u}=(x; y; z) \\implies |\\vec{u}| = \\sqrt{x^2+y^2+z^2} \\ge 0$. Tích vô hướng: $\\vec{u}\\cdot\\vec{v} = x_1x_2+y_1y_2+z_1z_2$.\n2. Cùng phương: $\\vec{u} = k\\vec{v}$ ($k \\ne 0$). Ba điểm thẳng hàng: $[\\vec{AB}, \\vec{AC}] = \\vec{0}$.\n3. Tích có hướng: $[\\vec{u}, \\vec{v}] = (u_2v_3-u_3v_2; u_3v_1-u_1v_3; u_1v_2-u_2v_1)$. Tính chất: $[\\vec{u}, \\vec{v}] \\perp \\vec{u}$ và $[\\vec{u}, \\vec{v}] \\perp \\vec{v}$.\n4. Diện tích tam giác: $S_{\\Delta ABC} = \\frac{1}{2} |[\\vec{AB}, \\vec{AC}]| > 0$ khi $A, B, C$ không thẳng hàng.\n5. Thể tích tứ diện: $V_{ABCD} = \\frac{1}{6} |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}| > 0$ khi $A, B, C, D$ không đồng phẳng. Thể tích hộp: $V = |[\\vec{AB}, \\vec{AD}] \\cdot \\vec{AA'}|$.\n6. Khoảng cách điểm đến đường thẳng: $d(M, \\Delta) = \\frac{|[\\vec{AM}, \\vec{u}]|}{|\\vec{u}|}$ ($|\\vec{u}| > 0$).\n7. Mặt cầu $(S): x^2+y^2+z^2-2ax-2by-2cz+d=0$ có tâm $I(a; b; c)$, bán kính $R = \\sqrt{a^2+b^2+c^2-d} > 0$ khi và chỉ khi $a^2+b^2+c^2-d > 0$.\n8. Tâm tỉ cự: $\\sum k_i \\ne 0 \\implies I = \\frac{\\sum k_i A_i}{\\sum k_i}$, $|\\sum k_i \\vec{MA_i}| = |\\sum k_i| \\cdot MI$.",
    methodSteps: "Bước 1: Tính tọa độ các vectơ: ngọn trừ gốc $\\vec{AB} = (x_B-x_A; y_B-y_A; z_B-z_A)$.\nBước 2: Sử dụng chức năng VECTOR của máy tính Casio [MENU 5] để nạp dữ liệu VctA, VctB, VctC.\nBước 3: Thực hiện các phép nhân có hướng, vô hướng và tính độ dài.\nBước 4: Rút gọn kết quả về phân số tối giản hoặc căn thức chuẩn.",
    commonMistakes: "1. Lấy tọa độ gốc trừ ngọn khi tính tọa độ vectơ.\n2. Nhầm lẫn giữa công thức diện tích tam giác (hệ số $\\frac{1}{2}$) và thể tích tứ diện (hệ số $\\frac{1}{6}$).\n3. Quên điều kiện $a^2+b^2+c^2-d > 0$ của phương trình mặt cầu hoặc quên chia cho hệ số $A$ khi phương trình có dạng $Ax^2+Ay^2+Az^2...$\n4. Áp dụng tâm tỉ cự khi tổng các hệ số $\\sum k_i = 0$."
  },
  {
    code: "DANG_7",
    chapter: "Liên chương I-II",
    title: "Dạng 7: Tọa độ hóa Oxyz kết hợp đạo hàm giải bài toán cực trị không gian thực tế",
    identifySigns: "Bài toán thực tế thiết kế công trình kiến trúc, khoảng cách an toàn ngắn nhất giữa hai máy bay / drone, trạm quan sát radar dò tìm mục tiêu, tối ưu vị trí đường ống dẫn dầu nối các điểm trong không gian $Oxyz$ qua mặt đất.",
    coreKnowledge: "1. Phương pháp tọa độ hóa: Chọn gốc tọa độ $O$ tại đỉnh có 3 cạnh vuông góc đôi một, gắn các tia $Ox, Oy, Oz$ chuẩn hóa đơn vị.\n2. Phương trình tham số chuyển động: Điểm $M(t) = (x_0 + at; y_0 + bt; z_0 + ct)$ với thời gian thực tế $t \\in [t_1; t_2]$ ($t \\ge 0$).\n3. Hàm khoảng cách: $d(t) = \\sqrt{f(t)}$. Vì căn thức đồng biến với biểu thức dưới căn trên $[0; +\\infty)$, $\\min d(t) = \\sqrt{\\min f(t)}$. Dùng đạo hàm $f'(t)=0$ hoặc bấm máy Casio Table.\n4. Điểm đối xứng qua mặt phẳng: Hai điểm $A, B$ cùng phía so với mặt phẳng $(\\alpha) \\implies MA + MB = MA' + MB \\ge A'B$ (với $A'$ đối xứng với $A$ qua $(\\alpha)$). Dấu bằng xảy ra khi $M = A'B \\cap (\\alpha)$.",
    methodSteps: "Bước 1: Đọc đề bài, gắn hệ trục tọa độ $Oxyz$ thích hợp nhất vào không gian bài toán.\nBước 2: Xác định tọa độ các điểm cố định và tọa độ các điểm di động theo tham số thời gian $t \\ge 0$.\nBước 3: Lập biểu thức khoảng cách hoặc chi phí $f(t)$ cần tối ưu.\nBước 4: Khảo sát hàm số $f(t)$ bằng đạo hàm trên miền giới hạn của $t$ để tìm giá trị nhỏ nhất/lớn nhất.",
    commonMistakes: "1. Quên giới hạn của tham số thời gian $t \\ge 0$ (nếu nghiệm đỉnh parabol rơi vào vùng $t < 0$ thì giá trị nhỏ nhất đạt tại đầu mút $t = 0$).\n2. Gắn nhầm vị trí các trục tọa độ hoặc tính sai tỉ lệ đơn vị (km, m, giờ, phút).\n3. Không lấy điểm đối xứng khi hai điểm nằm cùng phía đối với mặt phẳng phản xạ."
  }
];

console.log('Testing KaTeX on 7 Categories...');
let cOk = true;
for (const c of categories7) {
  if (!validateMath(c.identifySigns, c.code + ' identifySigns')) cOk = false;
  if (!validateMath(c.coreKnowledge, c.code + ' coreKnowledge')) cOk = false;
  if (!validateMath(c.methodSteps, c.code + ' methodSteps')) cOk = false;
  if (!validateMath(c.commonMistakes, c.code + ' commonMistakes')) cOk = false;
}
console.log('Categories test result:', cOk ? 'ALL 7 PASSED!' : 'FAILED!');
