const { validateMath } = require('./katex_validator');

const mathTypes37 = [
  // -------------------------------------------------------------
  // TOPIC 01: TÍNH ĐƠN ĐIỆU CỦA HÀM SỐ (BÀI 1)
  // -------------------------------------------------------------
  {
    id: "MT_1_1_1",
    code: "DẠNG 1.1",
    title: "Xét đơn điệu của hàm đa thức (Bậc ba, bậc bốn)",
    difficulty: "NB",
    theory: "1. Định lý tổng quát: Cho hàm số $y=f(x)$ xác định và liên tục trên khoảng, đoạn hoặc nửa khoảng $K \\subseteq \\mathbb{R}$, có đạo hàm trên khoảng tương ứng của $K$.\n- Nếu $f'(x) \\ge 0$ (hoặc $\\le 0$) $\\forall x \\in K$ và $f'(x)=0$ chỉ tại một số hữu hạn điểm thì $f(x)$ đồng biến (hoặc nghịch biến) trên $K$.\n2. Hàm bậc ba $y = ax^3+bx^2+cx+d$ ($a \\ne 0$): TXD $D = \\mathbb{R}$. Đạo hàm $y' = 3ax^2+2bx+c$ có $\\Delta'_{y'} = b^2 - 3ac$.\n- Hàm số đồng biến trên $\\mathbb{R} \\iff y' \\ge 0, \\; \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a > 0 \\\\ \\Delta'_{y'} \\le 0 \\end{cases}$.\n- Hàm số nghịch biến trên $\\mathbb{R} \\iff y' \\le 0, \\; \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a < 0 \\\\ \\Delta'_{y'} \\le 0 \\end{cases}$.\n3. Hàm trùng phương $y = ax^4+bx^2+c$ ($a \\ne 0$): TXD $D = \\mathbb{R}$, $y' = 4ax^3+2bx = 2x(2ax^2+b)$, không bao giờ đơn điệu trên toàn bộ $\\mathbb{R}$.",
    signs: "Đề bài cho hàm đa thức bậc ba $y = ax^3+bx^2+cx+d$ hoặc bậc bốn trùng phương $y = ax^4+bx^2+c$, yêu cầu tìm các khoảng đồng biến, nghịch biến hoặc tìm điều kiện tham số $m$ để hàm đơn điệu trên $\\mathbb{R}$.",
    methods: "Bước 1: Xác định tập xác định $D = \\mathbb{R}$.\nBước 2: Tính đạo hàm $y' = f'(x)$, giải phương trình $y' = 0$ tìm các nghiệm thực phân biệt.\nBước 3: Lập bảng xét dấu của $y'$ (dùng quy tắc 'trong trái - ngoài cùng' với tam thức bậc hai hoặc đan dấu qua nghiệm bội lẻ).\nBước 4: Kết luận khoảng đồng biến ($y' > 0$) và khoảng nghịch biến ($y' < 0$). Nêu từng khoảng rời nhau bằng từ 'và', không dùng ký hiệu hợp $\\cup$.",
    mistakes: "Dùng ký hiệu $\\cup$ hoặc $\\setminus$ để kết luận (ví dụ: $(-\\infty; 1) \\cup (2; +\\infty)$ là SAI hoàn toàn về mặt toán học, bắt buộc dùng từ 'và'). Quên xét trường hợp $a = 0$ khi đề bài chứa tham số ở hệ số bậc cao nhất."
  },
  {
    id: "MT_1_1_2",
    code: "DẠNG 1.2",
    title: "Đơn điệu của hàm phân thức bậc nhất / bậc nhất",
    difficulty: "TH",
    theory: "Cho hàm số phân thức bậc nhất trên bậc nhất $y = \\frac{ax+b}{cx+d}$ với điều kiện mẫu thức khác không: $c \\ne 0$ và điều kiện không suy biến: định thức $\\Delta = ad - bc \\ne 0$.\n- Tập xác định: $D = \\mathbb{R} \\setminus \\left\\{-\\frac{d}{c}\\right\\}$ (điều kiện mẫu $cx + d \\ne 0 \\iff x \\ne -\\frac{d}{c}$).\n- Hàm số liên tục và khả vi trên từng khoảng xác định: $(-\\infty; -d/c)$ và $(-d/c; +\\infty)$.\n- Đạo hàm: $y' = \\frac{ad - bc}{(cx+d)^2}$. Vì $(cx+d)^2 > 0, \\; \\forall x \\ne -\\frac{d}{c}$ nên:\n  + Nếu $ad - bc > 0 \\implies y' > 0, \\; \\forall x \\ne -\\frac{d}{c} \\implies$ hàm số đồng biến trên từng khoảng $(-\\infty; -d/c)$ và $(-d/c; +\\infty)$.\n  + Nếu $ad - bc < 0 \\implies y' < 0, \\; \\forall x \\ne -\\frac{d}{c} \\implies$ hàm số nghịch biến trên từng khoảng $(-\\infty; -d/c)$ và $(-d/c; +\\infty)$.\n- Đạo hàm luôn khác 0 ($y' \\ne 0, \\; \\forall x \\in D$), tuyệt đối không có dấu bằng.",
    signs: "Hàm phân thức dạng $y = \\frac{ax+b}{cx+d}$, hỏi khoảng đồng biến/nghịch biến hoặc tìm tham số $m$ để hàm số đơn điệu trên khoảng $(\\alpha; \\beta)$.",
    methods: "Bước 1: Tìm TXD $D = \\mathbb{R} \\setminus \\{-d/c\\}$ (điều kiện $cx + d \\ne 0$).\nBước 2: Tính định thức tử số: $\\Delta = ad - bc$.\nBước 3: Xác định chiều biến thiên:\n- Nếu $\\Delta > 0 \\implies$ đồng biến trên $(-\\infty; -d/c)$ và $(-d/c; +\\infty)$.\n- Nếu $\\Delta < 0 \\implies$ nghịch biến trên $(-\\infty; -d/c)$ và $(-d/c; +\\infty)$.\nBước 4: Với bài toán chứa tham số trên khoảng $(\\alpha; \\beta)$, thiết lập hệ điều kiện: $\\begin{cases} ad - bc > 0 \\text{ (hoặc } < 0) \\\\ -d/c \\notin (\\alpha; \\beta) \\end{cases}$.",
    mistakes: "Thêm dấu bằng vào điều kiện đạo hàm $y' \\ge 0$ (đối với hàm nhất biến, $y' = 0$ sẽ làm hàm số suy biến thành đường thẳng $y = a/c$). Quên điều kiện điểm gián đoạn không thuộc khoảng cần xét: $-d/c \\notin (\\alpha; \\beta)$."
  },
  {
    id: "MT_1_1_3",
    code: "DẠNG 1.3",
    title: "Đơn điệu của hàm phân thức bậc hai / bậc nhất",
    difficulty: "TH",
    theory: "Cho hàm số $y = \\frac{ax^2+bx+c}{px+q}$ với điều kiện: $a \\ne 0, \\; p \\ne 0$ và điều kiện không suy biến: đa thức tử không chia hết cho mẫu, tức là $aq^2 - bpq + cp^2 \\ne 0$.\n- Tập xác định: $D = \\mathbb{R} \\setminus \\left\\{-\\frac{q}{p}\\right\\}$ (điều kiện mẫu $px + q \\ne 0$).\n- Hàm số liên tục và khả vi trên hai khoảng xác định: $(-\\infty; -q/p)$ và $(-q/p; +\\infty)$.\n- Đạo hàm: $y' = \\frac{apx^2 + 2aqx + (bq - cp)}{(px+q)^2}$.\n- Vì mẫu số $(px+q)^2 > 0, \\; \\forall x \\ne -q/p$, nên dấu của $y'$ là dấu của tam thức bậc hai ở tử số $g(x) = apx^2 + 2aqx + (bq - cp)$ trên miền $x \\ne -q/p$.",
    signs: "Hàm phân thức có bậc tử lớn hơn bậc mẫu đúng 1 bậc, yêu cầu tìm các khoảng đơn điệu hoặc lập bảng biến thiên.",
    methods: "Bước 1: Tìm TXD $D = \\mathbb{R} \\setminus \\{-q/p\\}$.\nBước 2: Tính đạo hàm $y' = \\frac{g(x)}{(px+q)^2}$, giải phương trình tử số $g(x) = 0$.\nBước 3: Lập bảng biến thiên: Đặt điểm gián đoạn $x = -q/p$ có dấu hai gạch không xác định trên cả dòng $y'$ và $y$.\nBước 4: Xét dấu tam thức bậc hai $g(x)$ và kết luận các khoảng đơn điệu.",
    mistakes: "Quên gạch hai sọc tại điểm làm mẫu bằng $0$ ($x = -q/p$) trong bảng biến thiên dẫn đến gộp cả hai khoảng làm một khoảng duy nhất."
  },
  {
    id: "MT_1_1_4",
    code: "DẠNG 1.4",
    title: "Đơn điệu của hàm số chứa căn thức vô tỉ",
    difficulty: "VD",
    theory: "1. Xét hàm số $y = \\sqrt{u(x)}$:\n- Điều kiện xác định: Biểu thức dưới căn không âm: $u(x) \\ge 0$.\n- Tập xác định: $D = \\{x \\in \\mathbb{R} \\mid u(x) \\ge 0\\}$.\n- Điều kiện khả vi: Hàm số có đạo hàm trên miền trong $D' = \\{x \\in \\mathbb{R} \\mid u(x) > 0\\}$.\n- Đạo hàm: $y' = \\frac{u'(x)}{2\\sqrt{u(x)}}, \\; \\forall x \\in D'$.\n- Vì mẫu số $2\\sqrt{u(x)} > 0$ trên $D'$ nên dấu của $y'$ là dấu của $u'(x)$ trên $D'$. Tại điểm biên làm $u(x)=0$, đạo hàm không tồn tại hữu hạn.\n2. Xét hàm căn bậc ba $y = \\sqrt[3]{u(x)}$: TXD $D = \\mathbb{R}$. Khả vi khi $u(x) \\ne 0$ với $y' = \\frac{u'(x)}{3\\sqrt[3]{u^2(x)}}$. Dấu của $y'$ cùng dấu với $u'(x)$.",
    signs: "Hàm số chứa căn bậc hai $\\sqrt{ax^2+bx+c}$ hoặc $\\sqrt{a - x^2}$ hoặc tổng hiệu căn thức.",
    methods: "Bước 1: Giải bất phương trình $u(x) \\ge 0$ để tìm tập xác định $D$.\nBước 2: Tính đạo hàm $y' = \\frac{u'(x)}{2\\sqrt{u(x)}}$ trên miền $u(x) > 0$.\nBước 3: Giải phương trình $u'(x) = 0$ tìm các nghiệm thuộc miền $u(x) > 0$.\nBước 4: Lập bảng xét dấu $y'$ trên tập xác định $D$ (gạch bỏ phần ngoài $D$) và kết luận.",
    mistakes: "Quên tìm điều kiện $u(x) \\ge 0$ dẫn đến lấy nghiệm đạo hàm nằm ngoài tập xác định hoặc kết luận khoảng đơn điệu vượt ra ngoài $D$."
  },
  {
    id: "MT_1_1_5",
    code: "DẠNG 1.5",
    title: "Tìm tham số m để hàm số đơn điệu trên khoảng",
    difficulty: "VD",
    theory: "Cho hàm số $y = f(x, m)$ xác định trên $D$. Hàm số đơn điệu trên tập $K$:\n- Điều kiện tiên quyết: Tập $K$ phải nằm hoàn toàn trong tập xác định: $K \\subseteq D$.\n- Đồng biến trên $K \\iff f'(x, m) \\ge 0, \\; \\forall x \\in K$ (đẳng thức $f'=0$ chỉ xảy ra tại hữu hạn điểm thuộc $K$).\n- Nghịch biến trên $K \\iff f'(x, m) \\le 0, \\; \\forall x \\in K$ (đẳng thức $f'=0$ chỉ xảy ra tại hữu hạn điểm thuộc $K$).\n- Phương pháp cô lập tham số $m$:\n  + $m \\ge g(x), \\; \\forall x \\in K \\iff m \\ge \\sup_{x \\in K} g(x)$ (nếu $K = [a; b]$ và $g(x)$ liên tục thì $m \\ge \\max_{[a; b]} g(x)$).\n  + $m \\le g(x), \\; \\forall x \\in K \\iff m \\le \\inf_{x \\in K} g(x)$ (nếu $K = [a; b]$ và $g(x)$ liên tục thì $m \\le \\min_{[a; b]} g(x)$).\n- Dấu tam thức bậc hai $Ax^2+Bx+C \\ge 0, \\; \\forall x \\in \\mathbb{R} \\iff \\begin{cases} A > 0 \\\\ \\Delta \\le 0 \\end{cases}$ (với $A \\ne 0$).",
    signs: "Đề bài chứa tham số $m$, yêu cầu tìm $m$ để hàm số đồng biến hoặc nghịch biến trên khoảng $(a; b)$ hoặc trên toàn bộ $\\mathbb{R}$.",
    methods: "Cách 1 (Cô lập m): Biến đổi $f'(x, m) \\ge 0 \\iff m \\ge g(x)$ (hoặc $m \\le g(x)$). Khảo sát hàm $g(x)$ trên $K$ bằng đạo hàm hoặc bảng biến thiên để tìm $\\max/\\min$ hoặc $\\sup/\\inf$.\nCách 2 (Tam thức bậc hai): Nếu $f'(x)$ là tam thức bậc hai không cô lập được $m$, sử dụng định lý dấu tam thức bậc hai hoặc so sánh nghiệm với các mút của khoảng.",
    mistakes: "Dùng trực tiếp $\\max/\\min$ trên khoảng mở $(a; b)$ mà không kiểm tra xem hàm số có đạt được giá trị đó hay không (phải dùng $\\sup/\\inf$ hoặc giới hạn tại đầu mút). Quên điều kiện điểm gián đoạn nằm ngoài khoảng cần xét."
  },

  // -------------------------------------------------------------
  // TOPIC 02: CỰC TRỊ CỦA HÀM SỐ (BÀI 1)
  // -------------------------------------------------------------
  {
    id: "MT_1_2_1",
    code: "DẠNG 2.1",
    title: "Tìm điểm cực trị & giá trị cực trị qua đạo hàm cấp 1",
    difficulty: "NB",
    theory: "1. Định nghĩa cực trị: Cho hàm số $y=f(x)$ xác định trên $D$ và $x_0 \\in D$. Điểm $x_0$ gọi là điểm cực đại (cực tiểu) nếu tồn tại khoảng mở $(a; b) \\subseteq D$ chứa $x_0$ sao cho $f(x) < f(x_0)$ (hoặc $f(x) > f(x_0)$) với mọi $x \\in (a; b) \\setminus \\{x_0\\}$.\n2. Dấu hiệu 1 (Đổi dấu đạo hàm): Giả sử $f(x)$ liên tục tại $x_0$ và có đạo hàm trên lân cận đục lỗ của $x_0$:\n- Nếu $f'(x)$ đổi dấu từ dương sang âm khi qua $x_0 \\implies x_0$ là điểm cực đại.\n- Nếu $f'(x)$ đổi dấu từ âm sang dương khi qua $x_0 \\implies x_0$ là điểm cực tiểu.\n- Điểm $x_0$ có thể làm $f'(x_0)=0$ hoặc $f'(x_0)$ không xác định, nhưng $f(x)$ bắt buộc phải xác định và liên tục tại $x_0$.\n3. Nghiệm bội lẻ làm đạo hàm đổi dấu $\\implies$ sinh ra cực trị. Nghiệm bội chẵn không làm đổi dấu $\\implies$ không là cực trị.",
    signs: "Đề bài cho bảng biến thiên, đồ thị hàm số, hoặc biểu thức đạo hàm $f'(x)$ đã phân tích thành nhân tử, hỏi số điểm cực trị.",
    methods: "Bước 1: Tìm tập xác định $D$ của hàm số.\nBước 2: Tính $f'(x)$, giải phương trình $f'(x) = 0$ và tìm các điểm làm $f'(x)$ không xác định.\nBước 3: Lập bảng xét dấu $f'(x)$. Đếm các nghiệm bội lẻ (nghiệm đổi dấu).\nBước 4: Kết luận chính xác điểm cực trị ($x$), giá trị cực trị ($y$) và điểm cực trị của đồ thị ($M(x; y)$).",
    mistakes: "Lẫn lộn giữa 'điểm cực trị của hàm số' ($x$) và 'cực trị/giá trị cực trị' ($y$) và 'điểm cực trị của đồ thị' ($M(x; y)$). Đếm cả nghiệm bội chẵn của đạo hàm."
  },
  {
    id: "MT_1_2_2",
    code: "DẠNG 2.2",
    title: "Tìm cực trị bằng đạo hàm cấp hai (Quy tắc 2 Fermat)",
    difficulty: "TH",
    theory: "Cho hàm số $y=f(x)$ có đạo hàm cấp một trên khoảng mở $(a; b)$ chứa $x_0$, và tồn tại đạo hàm cấp hai $f''(x_0)$:\n- Nếu $f'(x_0) = 0$ và $f''(x_0) < 0 \\implies x_0$ là điểm cực đại của hàm số.\n- Nếu $f'(x_0) = 0$ và $f''(x_0) > 0 \\implies x_0$ là điểm cực tiểu của hàm số.\n- Lưu ý điều kiện giới hạn: Nếu $f'(x_0) = 0$ và $f''(x_0) = 0$, quy tắc không cho kết luận. Bắt buộc phải quay lại Quy tắc 1 (xét dấu của $f'(x)$) hoặc xét đạo hàm cấp cao hơn.",
    signs: "Hàm số lượng giác $y = \\sin x, \\cos x$ hoặc bài toán tìm tham số $m$ để hàm số đạt cực đại, cực tiểu tại điểm $x_0$ cụ thể.",
    methods: "Bước 1: Tìm TXD và tính đạo hàm $f'(x)$ và $f''(x)$.\nBước 2: Giải điều kiện cần: $f'(x_0) = 0$ để tìm các giá trị tham số $m$.\nBước 3: Thay từng giá trị $m$ vào $f''(x_0)$:\n- Nếu $f''(x_0) < 0 \\implies$ nhận $m$ cho trường hợp cực đại.\n- Nếu $f''(x_0) > 0 \\implies$ nhận $m$ cho trường hợp cực tiểu.\n- Nếu $f''(x_0) = 0 \\implies$ thử lại bằng bảng biến thiên.",
    mistakes: "Nhầm dấu của đạo hàm cấp hai: nhầm $f''(x_0) > 0$ là cực đại (thực tế $f'' > 0$ là bề lõm quay lên $\\implies$ cực tiểu). Bỏ qua việc kiểm tra lại khi $f''(x_0) = 0$."
  },
  {
    id: "MT_1_2_3",
    code: "DẠNG 2.3",
    title: "Cực trị của hàm hợp y = f(u(x)) & Đồ thị đạo hàm f'(x)",
    difficulty: "VDC",
    theory: "Xét hàm hợp $g(x) = f(u(x))$. Điều kiện: $u(x)$ khả vi trên khoảng $K$ và $f(u)$ khả vi trên miền giá trị $u(K)$.\n- Đạo hàm hàm hợp: $g'(x) = [f(u(x))]' = u'(x) \\cdot f'(u(x))$.\n- Phương trình xác định điểm tới hạn: $g'(x) = 0 \\iff \\left[ \\begin{array}{l} u'(x) = 0 \\\\ f'(u(x)) = 0 \\iff u(x) = t_i \\end{array} \\right.$ (với $t_i$ là các nghiệm của phương trình $f'(t) = 0$).\n- Điều kiện tạo cực trị: Điểm $x_0$ là điểm cực trị của $g(x) \\iff g'(x)$ đổi dấu khi qua $x_0$.\n- Chỉ các nghiệm bội lẻ của $u'(x) = 0$ và các giao điểm cắt ngang (nghiệm bội lẻ) của phương trình $u(x) = t_i$ (với $t_i$ là nghiệm bội lẻ của $f'(t) = 0$) mới là điểm cực trị.",
    signs: "Đề bài cho đồ thị hoặc bảng biến thiên của đạo hàm $f'(x)$, hỏi số điểm cực trị của hàm hợp $g(x) = f(ax+b)$ hoặc $f(x^2-2x)$ hoặc $f(u(x)) + h(x)$.",
    methods: "Bước 1: Tính đạo hàm $g'(x) = u'(x) \\cdot f'(u(x))$.\nBước 2: Giải $u'(x) = 0$ tìm các nghiệm đơn $x_k$.\nBước 3: Dựa vào đồ thị $f'(t)$, xác định các hoành độ giao điểm cắt ngang $t_1, t_2, \\dots, t_n$ của $f'(t)$ với trục hoành (loại bỏ các điểm tiếp xúc).\nBước 4: Giải các phương trình $u(x) = t_i$ tìm số nghiệm đơn phân biệt không trùng với nghiệm $u'(x) = 0$.\nBước 5: Tổng số điểm cực trị bằng tổng số nghiệm đơn thu được.",
    mistakes: "Lấy cả các điểm tiếp xúc của đồ thị $f'(t)$ với trục hoành (điểm tiếp xúc là nghiệm kép, không làm đổi dấu đạo hàm nên không sinh ra cực trị)."
  },
  {
    id: "MT_1_2_4",
    code: "DẠNG 2.4",
    title: "Phương trình đường thẳng qua hai điểm cực trị hàm bậc ba",
    difficulty: "VD",
    theory: "Cho hàm số bậc ba $y = ax^3+bx^2+cx+d$ ($a \\ne 0$). Tập xác định $D = \\mathbb{R}$.\n- ĐIỀU KIỆN TỒN TẠI HAI ĐIỂM CỰC TRỊ: Hàm số có hai điểm cực trị $\\iff y' = 3ax^2+2bx+c = 0$ có 2 nghiệm phân biệt $\\iff \\Delta'_{y'} = b^2 - 3ac > 0$. (Nếu $b^2 - 3ac \\le 0$, hàm số không có cực trị, không tồn tại đường thẳng qua cực trị).\n- Phép chia đa thức: $y = y' \\cdot \\left(\\frac{1}{3a}x + \\frac{b}{9a^2}\\right) + \\left(\\frac{2c}{3} - \\frac{2b^2}{9a}\\right)x + \\left(d - \\frac{bc}{9a}\\right)$.\n- Tại các điểm cực trị $x_1, x_2$, ta có $y'(x_1) = y'(x_2) = 0$.\n- Do đó phương trình đường thẳng đi qua 2 điểm cực trị là: $y = \\left(\\frac{2c}{3} - \\frac{2b^2}{9a}\\right)x + \\left(d - \\frac{bc}{9a}\\right) \\iff y = \\frac{2(3ac - b^2)}{9a}x + \\frac{9ad - bc}{9a}$.",
    signs: "Viết phương trình đường thẳng đi qua hai điểm cực trị của đồ thị hàm bậc ba, hoặc tìm tham số $m$ để đường thẳng qua 2 cực trị vuông góc / song song với đường thẳng khác.",
    methods: "Bước 1: Tìm điều kiện tồn tại 2 điểm cực trị: $a \\ne 0$ và $\\Delta'_{y'} = b^2 - 3ac > 0$.\nBước 2: Lấy đa thức $y$ chia cho $y' = 3ax^2+2bx+c$ bằng phép chia đa thức lấy phần dư bậc nhất $R(x) = Ax + B$.\nBước 3: Đường thẳng cần tìm chính là $y = Ax + B$.\nBước 4: Bấm máy tính Casio: MENU 2 (Số phức), nhập biểu thức $y - \\frac{y' \\cdot y''}{18a}$ rồi CALC $x = i$.",
    mistakes: "Quên kiểm tra điều kiện $\\Delta'_{y'} > 0$ trước khi viết phương trình, dẫn đến viết phương trình đường thẳng khi hàm số hoàn toàn không có cực trị."
  }
];

console.log('Testing KaTeX on first 4 types...');
let pass = true;
for (const t of mathTypes37) {
  if (!validateMath(t.theory, t.code + ' theory')) pass = false;
  if (!validateMath(t.signs, t.code + ' signs')) pass = false;
  if (!validateMath(t.methods, t.code + ' methods')) pass = false;
  if (!validateMath(t.mistakes, t.code + ' mistakes')) pass = false;
}
console.log('Test result:', pass ? 'ALL PASSED!' : 'FAILED!');
