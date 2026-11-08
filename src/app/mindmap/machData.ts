// =========================================================================
// CƠ SỞ DỮ LIỆU CÂY TRI THỨC TOÁN 12 (TẬP 1) - CHUẨN SGK KẾT NỐI TRI THỨC
// Cấu trúc phân cấp chính xác:
// [Gốc: Toán 12] ➔ [Chương I & II] ➔ [Chủ đề] ➔ [Hiện ngay Dạng toán] ➔ [Thẻ 4 Tab]
// =========================================================================

export interface DetailContent {
  theory: string;
  signs: string;
  methods: string;
  mistakes: string;
  sampleQuestion?: {
    code: string;
    content: string;
    answer: string;
    casio?: string;
  };
}

export interface MathTypeItem {
  id: string;
  code: string;
  title: string;
  difficulty?: "NB" | "TH" | "VD" | "VDC";
  details: DetailContent;
}

export interface TopicItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  color: string;
  mathTypes: MathTypeItem[];
}

export interface ChapterItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  color: string;
  topics: TopicItem[];
}

export interface RootKnowledgeTree {
  id: string;
  title: string;
  subtitle: string;
  chapters: ChapterItem[];
}

export const TREE_DATA: RootKnowledgeTree = {
  "id": "root_math12",
  "title": "TOÁN 12 - KẾT NỐI TRI THỨC",
  "subtitle": "SƠ ĐỒ CÂY TRI THỨC TOÀN DIỆN · TẬP 1",
  "chapters": [
    {
      "id": "CH1",
      "number": "CHƯƠNG 01",
      "title": "ỨNG DỤNG ĐẠO HÀM ĐỂ KHẢO SÁT VÀ VẼ ĐỒ THỊ HÀM SỐ",
      "subtitle": "Bài 1 ➔ Bài 5 · 6 Chủ đề · 23 Dạng toán thực chiến",
      "color": "olive",
      "topics": [
        {
          "id": "TOPIC_1_1",
          "number": "01",
          "title": "Tính đơn điệu của hàm số",
          "subtitle": "Dấu đạo hàm · Khoảng biến thiên",
          "color": "olive",
          "mathTypes": [
            {
              "id": "MT_1_1_1",
              "code": "DẠNG 1.1",
              "title": "Xét đơn điệu của hàm đa thức (Bậc ba, bậc bốn)",
              "difficulty": "NB",
              "details": {
                "theory": "1. Định lý tổng quát: Cho hàm số $y=f(x)$ xác định và liên tục trên khoảng, đoạn hoặc nửa khoảng $K \\subseteq \\mathbb{R}$, có đạo hàm trên khoảng tương ứng của $K$.\n- Nếu $f'(x) \\ge 0$ (hoặc $\\le 0$) $\\forall x \\in K$ và $f'(x)=0$ chỉ tại một số hữu hạn điểm thì $f(x)$ đồng biến (hoặc nghịch biến) trên $K$.\n2. Hàm bậc ba $y = ax^3+bx^2+cx+d$ ($a \\ne 0$): TXD $D = \\mathbb{R}$. Đạo hàm $y' = 3ax^2+2bx+c$ có $\\Delta'_{y'} = b^2 - 3ac$.\n- Hàm số đồng biến trên $\\mathbb{R} \\iff y' \\ge 0, \\; \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a > 0 \\\\ \\Delta'_{y'} \\le 0 \\end{cases}$.\n- Hàm số nghịch biến trên $\\mathbb{R} \\iff y' \\le 0, \\; \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a < 0 \\\\ \\Delta'_{y'} \\le 0 \\end{cases}$.\n3. Hàm trùng phương $y = ax^4+bx^2+c$ ($a \\ne 0$): TXD $D = \\mathbb{R}$, $y' = 4ax^3+2bx = 2x(2ax^2+b)$, không bao giờ đơn điệu trên toàn bộ $\\mathbb{R}$.",
                "signs": "Đề bài cho hàm đa thức bậc ba $y = ax^3+bx^2+cx+d$ hoặc bậc bốn trùng phương $y = ax^4+bx^2+c$, yêu cầu tìm các khoảng đồng biến, nghịch biến hoặc tìm tham số $m$ để hàm đơn điệu trên $\\mathbb{R}$.",
                "methods": "Bước 1: Xác định tập xác định $D = \\mathbb{R}$.\nBước 2: Tính đạo hàm $y' = f'(x)$, giải phương trình $y' = 0$ tìm các nghiệm thực phân biệt.\nBước 3: Lập bảng xét dấu của $y'$ (dùng quy tắc trong trái - ngoài cùng với tam thức bậc hai hoặc đan dấu qua nghiệm bội lẻ).\nBước 4: Kết luận khoảng đồng biến ($y' > 0$) và khoảng nghịch biến ($y' < 0$). Nêu từng khoảng rời nhau bằng từ 'và', tuyệt đối không dùng ký hiệu hợp $\\cup$.",
                "mistakes": "Dùng ký hiệu $\\cup$ hoặc $\\setminus$ để kết luận (ví dụ: $(-\\infty; 1) \\cup (2; +\\infty)$ là SAI hoàn toàn về mặt toán học, bắt buộc dùng từ 'và'). Quên xét trường hợp $a = 0$ khi đề bài chứa tham số ở hệ số bậc cao nhất.",
                "sampleQuestion": {
                  "code": "Q01_D1_NB",
                  "content": "Hàm số $y = x^3 - 3x^2 + 2$ đồng biến trên khoảng nào dưới đây?",
                  "answer": "C. $(-\\infty; 0)$ và $(2; +\\infty)$",
                  "casio": "Bấm [MENU 8] Table: nhập f(x), Start = -3, End = 5, Step = 0.5 để quan sát bảng giá trị tăng hay giảm."
                }
              }
            },
            {
              "id": "MT_1_1_2",
              "code": "DẠNG 1.2",
              "title": "Đơn điệu của hàm phân thức bậc nhất / bậc nhất",
              "difficulty": "TH",
              "details": {
                "theory": "Cho hàm số phân thức bậc nhất trên bậc nhất $y = \\frac{ax+b}{cx+d}$ với điều kiện mẫu thức khác không: $c \\ne 0$ và điều kiện không suy biến: định thức $\\Delta = ad - bc \\ne 0$.\n- Tập xác định: $D = \\mathbb{R} \\setminus \\left\\{-\\frac{d}{c}\\right\\}$ (điều kiện mẫu $cx + d \\ne 0 \\iff x \\ne -\\frac{d}{c}$).\n- Hàm số liên tục và khả vi trên từng khoảng xác định: $(-\\infty; -d/c)$ và $(-d/c; +\\infty)$.\n- Đạo hàm: $y' = \\frac{ad - bc}{(cx+d)^2}$. Vì $(cx+d)^2 > 0, \\; \\forall x \\ne -\\frac{d}{c}$ nên:\n  + Nếu $ad - bc > 0 \\implies y' > 0, \\; \\forall x \\ne -\\frac{d}{c} \\implies$ hàm số đồng biến trên từng khoảng $(-\\infty; -d/c)$ và $(-d/c; +\\infty)$.\n  + Nếu $ad - bc < 0 \\implies y' < 0, \\; \\forall x \\ne -\\frac{d}{c} \\implies$ hàm số nghịch biến trên từng khoảng $(-\\infty; -d/c)$ và $(-d/c; +\\infty)$.\n- Đạo hàm luôn khác 0 ($y' \\ne 0, \\; \\forall x \\in D$), tuyệt đối không có dấu bằng.",
                "signs": "Hàm phân thức dạng $y = \\frac{ax+b}{cx+d}$, hỏi khoảng đồng biến/nghịch biến hoặc tìm tham số $m$ để hàm số đơn điệu trên khoảng $(\\alpha; \\beta)$.",
                "methods": "Bước 1: Tìm TXD $D = \\mathbb{R} \\setminus \\{-d/c\\}$ (điều kiện $cx + d \\ne 0$).\nBước 2: Tính định thức tử số: $\\Delta = ad - bc$.\nBước 3: Xác định chiều biến thiên:\n- Nếu $\\Delta > 0 \\implies$ đồng biến trên $(-\\infty; -d/c)$ và $(-d/c; +\\infty)$.\n- Nếu $\\Delta < 0 \\implies$ nghịch biến trên $(-\\infty; -d/c)$ và $(-d/c; +\\infty)$.\nBước 4: Với bài toán chứa tham số trên khoảng $(\\alpha; \\beta)$, thiết lập hệ điều kiện: $ad - bc > 0$ (hoặc $< 0$) và $-d/c \\notin (\\alpha; \\beta)$.",
                "mistakes": "Thêm dấu bằng vào điều kiện đạo hàm $y' \\ge 0$ (đối với hàm nhất biến, $y' = 0$ làm hàm suy biến thành hằng số). Quên điều kiện điểm gián đoạn không thuộc khoảng cần xét: $-d/c \\notin (\\alpha; \\beta)$.",
                "sampleQuestion": {
                  "code": "Q02_D1_MC",
                  "content": "Hàm số $y = \\frac{2x - 1}{x + 1}$ đồng biến trên khoảng nào dưới đây?",
                  "answer": "A. $(-\\infty; -1)$",
                  "casio": "Nhập đạo hàm d/dx tại x bất kỳ khác -1 xem kết quả luôn dương."
                }
              }
            },
            {
              "id": "MT_1_1_3",
              "code": "DẠNG 1.3",
              "title": "Đơn điệu của hàm phân thức bậc hai / bậc nhất",
              "difficulty": "TH",
              "details": {
                "theory": "Cho hàm số $y = \\frac{ax^2+bx+c}{px+q}$ với điều kiện: $a \\ne 0, \\; p \\ne 0$ và điều kiện không suy biến: đa thức tử không chia hết cho mẫu, tức là $aq^2 - bpq + cp^2 \\ne 0$.\n- Tập xác định: $D = \\mathbb{R} \\setminus \\left\\{-\\frac{q}{p}\\right\\}$ (điều kiện mẫu $px + q \\ne 0$).\n- Hàm số liên tục và khả vi trên hai khoảng xác định: $(-\\infty; -q/p)$ và $(-q/p; +\\infty)$.\n- Đạo hàm: $y' = \\frac{apx^2 + 2aqx + (bq - cp)}{(px+q)^2}$.\n- Vì mẫu số $(px+q)^2 > 0, \\; \\forall x \\ne -q/p$, nên dấu của $y'$ là dấu của tam thức bậc hai ở tử số $g(x) = apx^2 + 2aqx + (bq - cp)$ trên miền $x \\ne -q/p$.",
                "signs": "Hàm phân thức có bậc tử lớn hơn bậc mẫu đúng 1 bậc, yêu cầu tìm các khoảng đơn điệu hoặc lập bảng biến thiên.",
                "methods": "Bước 1: Tìm TXD $D = \\mathbb{R} \\setminus \\{-q/p\\}$.\nBước 2: Tính đạo hàm $y' = \\frac{g(x)}{(px+q)^2}$, giải phương trình tử số $g(x) = 0$.\nBước 3: Lập bảng biến thiên: Đặt điểm gián đoạn $x = -q/p$ có dấu hai gạch không xác định trên cả dòng $y'$ và $y$.\nBước 4: Xét dấu tam thức bậc hai $g(x)$ và kết luận các khoảng đơn điệu.",
                "mistakes": "Quên gạch hai sọc tại điểm làm mẫu bằng $0$ ($x = -q/p$) trong bảng biến thiên dẫn đến gộp cả hai khoảng làm một khoảng duy nhất.",
                "sampleQuestion": {
                  "code": "Q03_D1_TH",
                  "content": "Tìm khoảng nghịch biến của hàm số $y = \\frac{x^2 - 3x + 5}{x - 1}$?",
                  "answer": "B. $(-1; 1)$ và $(1; 3)$",
                  "casio": "Dùng [MENU 8] khảo sát bảng giá trị trên [-3; 5] với bước 0.5."
                }
              }
            },
            {
              "id": "MT_1_1_4",
              "code": "DẠNG 1.4",
              "title": "Đơn điệu của hàm số chứa căn thức vô tỉ",
              "difficulty": "VD",
              "details": {
                "theory": "1. Xét hàm số $y = \\sqrt{u(x)}$:\n- Điều kiện xác định: Biểu thức dưới căn không âm: $u(x) \\ge 0$.\n- Tập xác định: $D = \\{x \\in \\mathbb{R} \\mid u(x) \\ge 0\\}$.\n- Điều kiện khả vi: Hàm số có đạo hàm trên miền trong $D' = \\{x \\in \\mathbb{R} \\mid u(x) > 0\\}$.\n- Đạo hàm: $y' = \\frac{u'(x)}{2\\sqrt{u(x)}}, \\; \\forall x \\in D'$.\n- Vì mẫu số $2\\sqrt{u(x)} > 0$ trên $D'$ nên dấu của $y'$ là dấu của $u'(x)$ trên $D'$. Tại điểm biên làm $u(x)=0$, đạo hàm không tồn tại hữu hạn.\n2. Xét hàm căn bậc ba $y = \\sqrt[3]{u(x)}$: TXD $D = \\mathbb{R}$. Khả vi khi $u(x) \\ne 0$ với $y' = \\frac{u'(x)}{3\\sqrt[3]{u^2(x)}}$. Dấu của $y'$ cùng dấu với $u'(x)$.",
                "signs": "Hàm số chứa căn bậc hai $\\sqrt{ax^2+bx+c}$ hoặc $\\sqrt{a - x^2}$ hoặc tổng hiệu căn thức.",
                "methods": "Bước 1: Giải bất phương trình $u(x) \\ge 0$ để tìm tập xác định $D$.\nBước 2: Tính đạo hàm $y' = \\frac{u'(x)}{2\\sqrt{u(x)}}$ trên miền $u(x) > 0$.\nBước 3: Giải phương trình $u'(x) = 0$ tìm các nghiệm thuộc miền $u(x) > 0$.\nBước 4: Lập bảng xét dấu $y'$ trên tập xác định $D$ (gạch bỏ phần ngoài $D$) và kết luận.",
                "mistakes": "Quên tìm điều kiện $u(x) \\ge 0$ dẫn đến lấy nghiệm đạo hàm nằm ngoài tập xác định hoặc kết luận khoảng đơn điệu vượt ra ngoài $D$.",
                "sampleQuestion": {
                  "code": "Q04_D1_VD",
                  "content": "Hàm số $y = \\sqrt{4 - x^2}$ nghịch biến trên khoảng nào?",
                  "answer": "C. $(0; 2)$ (TXD là $[-2; 2]$, đạo hàm $y' = -x/\\sqrt{4-x^2}$)"
                }
              }
            },
            {
              "id": "MT_1_1_5",
              "code": "DẠNG 1.5",
              "title": "Tìm tham số m để hàm số đơn điệu trên khoảng",
              "difficulty": "VD",
              "details": {
                "theory": "Cho hàm số $y = f(x, m)$ xác định trên $D$. Hàm số đơn điệu trên tập $K$:\n- Điều kiện tiên quyết: Tập $K$ phải nằm hoàn toàn trong tập xác định: $K \\subseteq D$.\n- Đồng biến trên $K \\iff f'(x, m) \\ge 0, \\; \\forall x \\in K$ (đẳng thức $f'=0$ chỉ xảy ra tại hữu hạn điểm thuộc $K$).\n- Nghịch biến trên $K \\iff f'(x, m) \\le 0, \\; \\forall x \\in K$ (đẳng thức $f'=0$ chỉ xảy ra tại hữu hạn điểm thuộc $K$).\n- Phương pháp cô lập tham số $m$:\n  + $m \\ge g(x), \\; \\forall x \\in K \\iff m \\ge \\sup_{x \\in K} g(x)$ (nếu $K = [a; b]$ và $g(x)$ liên tục thì $m \\ge \\max_{[a; b]} g(x)$).\n  + $m \\le g(x), \\; \\forall x \\in K \\iff m \\le \\inf_{x \\in K} g(x)$ (nếu $K = [a; b]$ và $g(x)$ liên tục thì $m \\le \\min_{[a; b]} g(x)$).\n- Dấu tam thức bậc hai $Ax^2+Bx+C \\ge 0, \\; \\forall x \\in \\mathbb{R} \\iff \\begin{cases} A > 0 \\\\ \\Delta \\le 0 \\end{cases}$ (với $A \\ne 0$).",
                "signs": "Đề bài chứa tham số $m$, yêu cầu tìm $m$ để hàm số đồng biến hoặc nghịch biến trên khoảng $(a; b)$ hoặc trên toàn bộ $\\mathbb{R}$.",
                "methods": "Cách 1 (Cô lập m): Biến đổi $f'(x, m) \\ge 0 \\iff m \\ge g(x)$ (hoặc $m \\le g(x)$). Khảo sát hàm $g(x)$ trên $K$ bằng đạo hàm hoặc bảng biến thiên để tìm cực trị hoặc cận trên/cận dưới.\nCách 2 (Tam thức bậc hai): Nếu $f'(x)$ là tam thức bậc hai không cô lập được $m$, sử dụng định lý dấu tam thức bậc hai hoặc so sánh nghiệm với các mút của khoảng.",
                "mistakes": "Dùng trực tiếp giá trị lớn nhất / nhỏ nhất trên khoảng mở $(a; b)$ mà không kiểm tra xem hàm số có đạt được giá trị đó hay không (phải dùng cận trên / cận dưới hoặc giới hạn tại đầu mút). Quên điều kiện điểm gián đoạn nằm ngoài khoảng cần xét.",
                "sampleQuestion": {
                  "code": "Q32_D1_SA",
                  "content": "Tìm số giá trị nguyên của tham số $m \\in [-10; 10]$ để $y = \\frac{1}{3}x^3 - mx^2 + (m^2 - 4)x + 2026$ đồng biến trên $(1; 4)$?",
                  "answer": "15 giá trị nguyên"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_1_2",
          "number": "02",
          "title": "Cực trị của hàm số",
          "subtitle": "Cực đại · Cực tiểu · Đạo hàm cấp hai",
          "color": "rust",
          "mathTypes": [
            {
              "id": "MT_1_2_1",
              "code": "DẠNG 2.1",
              "title": "Tìm điểm cực trị & giá trị cực trị qua đạo hàm cấp 1",
              "difficulty": "NB",
              "details": {
                "theory": "1. Định nghĩa cực trị: Cho hàm số $y=f(x)$ xác định trên $D$ và $x_0 \\in D$. Điểm $x_0$ gọi là điểm cực đại (cực tiểu) nếu tồn tại khoảng mở $(a; b) \\subseteq D$ chứa $x_0$ sao cho $f(x) < f(x_0)$ (hoặc $f(x) > f(x_0)$) với mọi $x \\in (a; b) \\setminus \\{x_0\\}$.\n2. Dấu hiệu 1 (Đổi dấu đạo hàm): Giả sử $f(x)$ liên tục tại $x_0$ và có đạo hàm trên lân cận đục lỗ của $x_0$:\n- Nếu $f'(x)$ đổi dấu từ dương sang âm khi qua $x_0 \\implies x_0$ là điểm cực đại.\n- Nếu $f'(x)$ đổi dấu từ âm sang dương khi qua $x_0 \\implies x_0$ là điểm cực tiểu.\n- Điểm $x_0$ có thể làm $f'(x_0)=0$ hoặc $f'(x_0)$ không xác định, nhưng $f(x)$ bắt buộc phải xác định và liên tục tại $x_0$.\n3. Nghiệm bội lẻ làm đạo hàm đổi dấu $\\implies$ sinh ra cực trị. Nghiệm bội chẵn không làm đổi dấu $\\implies$ không là cực trị.",
                "signs": "Đề bài cho bảng biến thiên, đồ thị hàm số, hoặc biểu thức đạo hàm $f'(x)$ đã phân tích thành nhân tử, hỏi số điểm cực trị.",
                "methods": "Bước 1: Tìm tập xác định $D$ của hàm số.\nBước 2: Tính $f'(x)$, giải phương trình $f'(x) = 0$ và tìm các điểm làm $f'(x)$ không xác định.\nBước 3: Lập bảng xét dấu $f'(x)$. Đếm các nghiệm bội lẻ (nghiệm đổi dấu).\nBước 4: Kết luận chính xác điểm cực trị ($x$), giá trị cực trị ($y$) và điểm cực trị của đồ thị ($M(x; y)$).",
                "mistakes": "Lẫn lộn giữa 'điểm cực trị của hàm số' ($x$) và 'cực trị/giá trị cực trị' ($y$) và 'điểm cực trị của đồ thị' ($M(x; y)$). Đếm cả nghiệm bội chẵn của đạo hàm.",
                "sampleQuestion": {
                  "code": "Q01_D1_MC",
                  "content": "Cho $f'(x) = x(x - 2)^2(x + 3)$. Số điểm cực trị của hàm số là bao nhiêu?",
                  "answer": "B. 2 điểm cực trị ($x = 0$ và $x = -3$)"
                }
              }
            },
            {
              "id": "MT_1_2_2",
              "code": "DẠNG 2.2",
              "title": "Tìm cực trị bằng đạo hàm cấp hai (Quy tắc 2 Fermat)",
              "difficulty": "TH",
              "details": {
                "theory": "Cho hàm số $y=f(x)$ có đạo hàm cấp một trên khoảng mở $(a; b)$ chứa $x_0$, và tồn tại đạo hàm cấp hai $f''(x_0)$:\n- Nếu $f'(x_0) = 0$ và $f''(x_0) < 0 \\implies x_0$ là điểm cực đại của hàm số.\n- Nếu $f'(x_0) = 0$ và $f''(x_0) > 0 \\implies x_0$ là điểm cực tiểu của hàm số.\n- Lưu ý điều kiện giới hạn: Nếu $f'(x_0) = 0$ và $f''(x_0) = 0$, quy tắc không cho kết luận. Bắt buộc phải quay lại Quy tắc 1 (xét dấu của $f'(x)$) hoặc xét đạo hàm cấp cao hơn.",
                "signs": "Hàm số lượng giác $y = \\sin x, \\cos x$ hoặc bài toán tìm tham số $m$ để hàm số đạt cực đại, cực tiểu tại điểm $x_0$ cụ thể.",
                "methods": "Bước 1: Tìm TXD và tính đạo hàm $f'(x)$ và $f''(x)$.\nBước 2: Giải điều kiện cần: $f'(x_0) = 0$ để tìm các giá trị tham số $m$.\nBước 3: Thay từng giá trị $m$ vào $f''(x_0)$:\n- Nếu $f''(x_0) < 0 \\implies$ nhận $m$ cho trường hợp cực đại.\n- Nếu $f''(x_0) > 0 \\implies$ nhận $m$ cho trường hợp cực tiểu.\n- Nếu $f''(x_0) = 0 \\implies$ thử lại bằng bảng biến thiên.",
                "mistakes": "Nhầm dấu của đạo hàm cấp hai: nhầm $f''(x_0) > 0$ là cực đại (thực tế $f'' > 0$ là bề lõm quay lên $\\implies$ cực tiểu). Bỏ qua việc kiểm tra lại khi $f''(x_0) = 0$.",
                "sampleQuestion": {
                  "code": "Q05_D2_TH",
                  "content": "Tìm $m$ để hàm số $y = x^3 - 3mx^2 + 9x - 1$ đạt cực tiểu tại $x = 3$?",
                  "answer": "m = 2 (tính $y' = 3x^2 - 6mx + 9 = 0 \\implies m=2$, thay vào $y''(3) = 6(3) - 12 = 6 > 0$)"
                }
              }
            },
            {
              "id": "MT_1_2_3",
              "code": "DẠNG 2.3",
              "title": "Cực trị của hàm hợp y = f(u(x)) & Đồ thị đạo hàm f'(x)",
              "difficulty": "VDC",
              "details": {
                "theory": "Xét hàm hợp $g(x) = f(u(x))$. Điều kiện: $u(x)$ khả vi trên khoảng $K$ và $f(u)$ khả vi trên miền giá trị $u(K)$.\n- Đạo hàm hàm hợp: $g'(x) = [f(u(x))]' = u'(x) \\cdot f'(u(x))$.\n- Phương trình xác định điểm tới hạn: $g'(x) = 0 \\iff \\left[ \\begin{array}{l} u'(x) = 0 \\\\ f'(u(x)) = 0 \\iff u(x) = t_i \\end{array} \\right.$ (với $t_i$ là các nghiệm của phương trình $f'(t) = 0$).\n- Điều kiện tạo cực trị: Điểm $x_0$ là điểm cực trị của $g(x) \\iff g'(x)$ đổi dấu khi qua $x_0$.\n- Chỉ các nghiệm bội lẻ của $u'(x) = 0$ và các giao điểm cắt ngang (nghiệm bội lẻ) của phương trình $u(x) = t_i$ (với $t_i$ là nghiệm bội lẻ của $f'(t) = 0$) mới là điểm cực trị.",
                "signs": "Đề bài cho đồ thị hoặc bảng biến thiên của đạo hàm $f'(x)$, hỏi số điểm cực trị của hàm hợp $g(x) = f(ax+b)$ hoặc $f(x^2-2x)$ hoặc $f(u(x)) + h(x)$.",
                "methods": "Bước 1: Tính đạo hàm $g'(x) = u'(x) \\cdot f'(u(x))$.\nBước 2: Giải $u'(x) = 0$ tìm các nghiệm đơn $x_k$.\nBước 3: Dựa vào đồ thị $f'(t)$, xác định các hoành độ giao điểm cắt ngang $t_1, t_2, \\dots, t_n$ của $f'(t)$ với trục hoành (loại bỏ các điểm tiếp xúc).\nBước 4: Giải các phương trình $u(x) = t_i$ tìm số nghiệm đơn phân biệt không trùng với nghiệm $u'(x) = 0$.\nBước 5: Tổng số điểm cực trị bằng tổng số nghiệm đơn thu được.",
                "mistakes": "Lấy cả các điểm tiếp xúc của đồ thị $f'(t)$ với trục hoành (điểm tiếp xúc là nghiệm kép, không làm đổi dấu đạo hàm nên không sinh ra cực trị).",
                "sampleQuestion": {
                  "code": "Q31_D1_TF",
                  "content": "Cho $f'(x) = (x-1)^2(x+2)^2(x-3)$. Hàm số $g(x) = f(2 - x)$ có bao nhiêu điểm cực trị?",
                  "answer": "1 điểm cực trị (tại $x = -1$)"
                }
              }
            },
            {
              "id": "MT_1_2_4",
              "code": "DẠNG 2.4",
              "title": "Phương trình đường thẳng qua hai điểm cực trị hàm bậc ba",
              "difficulty": "VD",
              "details": {
                "theory": "Cho hàm số bậc ba $y = ax^3+bx^2+cx+d$ ($a \\ne 0$). Tập xác định $D = \\mathbb{R}$.\n- ĐIỀU KIỆN TỒN TẠI HAI ĐIỂM CỰC TRỊ: Hàm số có hai điểm cực trị $\\iff y' = 3ax^2+2bx+c = 0$ có 2 nghiệm phân biệt $\\iff \\Delta'_{y'} = b^2 - 3ac > 0$. (Nếu $b^2 - 3ac \\le 0$, hàm số không có cực trị, không tồn tại đường thẳng qua cực trị).\n- Phép chia đa thức: $y = y' \\cdot \\left(\\frac{1}{3a}x + \\frac{b}{9a^2}\\right) + \\left(\\frac{2c}{3} - \\frac{2b^2}{9a}\\right)x + \\left(d - \\frac{bc}{9a}\\right)$.\n- Tại các điểm cực trị $x_1, x_2$, ta có $y'(x_1) = y'(x_2) = 0$.\n- Do đó phương trình đường thẳng đi qua 2 điểm cực trị là: $y = \\left(\\frac{2c}{3} - \\frac{2b^2}{9a}\\right)x + \\left(d - \\frac{bc}{9a}\\right) \\iff y = \\frac{2(3ac - b^2)}{9a}x + \\frac{9ad - bc}{9a}$.",
                "signs": "Viết phương trình đường thẳng đi qua hai điểm cực trị của đồ thị hàm bậc ba, hoặc tìm tham số $m$ để đường thẳng qua 2 cực trị vuông góc / song song với đường thẳng khác.",
                "methods": "Bước 1: Tìm điều kiện tồn tại 2 điểm cực trị: $a \\ne 0$ và $\\Delta'_{y'} = b^2 - 3ac > 0$.\nBước 2: Lấy đa thức $y$ chia cho $y' = 3ax^2+2bx+c$ bằng phép chia đa thức lấy phần dư bậc nhất $R(x) = Ax + B$.\nBước 3: Đường thẳng cần tìm chính là $y = Ax + B$.\nBước 4: Bấm máy tính Casio: MENU 2 (Số phức), nhập biểu thức $y - \\frac{y' \\cdot y''}{18a}$ rồi CALC $x = i$.",
                "mistakes": "Quên kiểm tra điều kiện $\\Delta'_{y'} > 0$ trước khi viết phương trình, dẫn đến viết phương trình đường thẳng khi hàm số hoàn toàn không có cực trị.",
                "sampleQuestion": {
                  "code": "Q06_D2_VD",
                  "content": "Viết phương trình đường thẳng đi qua 2 điểm cực trị của $y = x^3 - 3x^2 + 1$?",
                  "answer": "y = -2x + 1 (chia cho $y' = 3x^2 - 6x$ ra phần dư $-2x + 1$)"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_1_3",
          "number": "03",
          "title": "Giá trị lớn nhất & nhỏ nhất của hàm số",
          "subtitle": "Đoạn đóng · Khoảng mở · Hàm trị tuyệt đối",
          "color": "gold",
          "mathTypes": [
            {
              "id": "MT_1_3_1",
              "code": "DẠNG 3.1",
              "title": "Tìm GTLN - GTNN trên đoạn đóng [a; b]",
              "difficulty": "NB",
              "details": {
                "theory": "1. ĐỊNH LÝ WEIERSTRASS: Mọi hàm số $y=f(x)$ xác định và liên tục trên đoạn đóng $[a; b]$ đều luôn đạt được giá trị lớn nhất và giá trị nhỏ nhất trên đoạn đó.\n- Điều kiện áp dụng: $[a; b] \\subseteq D$ (hàm số phải xác định và liên tục trên toàn bộ đoạn $[a; b]$, không có điểm gián đoạn hoặc mẫu triệt tiêu trên đoạn).\n2. Công thức tính nhanh:\n$\\max_{[a; b]} f(x) = \\max \\{ f(a), f(b), f(x_1), \\dots, f(x_k) \\}$,\n$\\min_{[a; b]} f(x) = \\min \\{ f(a), f(b), f(x_1), \\dots, f(x_k) \\}$,\nvới $x_i \\in (a; b)$ là các điểm mà tại đó $f'(x_i) = 0$ hoặc $f'(x_i)$ không tồn tại hữu hạn.",
                "signs": "Đề bài cho đoạn đóng $[a; b]$, yêu cầu tìm giá trị lớn nhất (GTLN) và giá trị nhỏ nhất (GTNN) của hàm số $y=f(x)$.",
                "methods": "Bước 1: Kiểm tra hàm số xác định và liên tục trên $[a; b]$.\nBước 2: Tính đạo hàm $f'(x)$, giải phương trình $f'(x) = 0$ tìm các nghiệm $x_i \\in (a; b)$ (loại bỏ các nghiệm nằm ngoài khoảng mở $(a; b)$).\nBước 3: Tính các giá trị $f(a), f(b)$ và $f(x_i)$.\nBước 4: So sánh các giá trị tính được để kết luận số lớn nhất là $\\max$ và số nhỏ nhất là $\\min$.",
                "mistakes": "Lấy cả các nghiệm $x_i$ nằm ngoài khoảng mở $(a; b)$. Áp dụng quy tắc tính nhanh cho khoảng mở $(a; b)$ mà không lập bảng biến thiên.",
                "sampleQuestion": {
                  "code": "Q06_D2_MC",
                  "content": "Giá trị nhỏ nhất của $f(x) = x^4 - 2x^2 + 3$ trên đoạn $[0; 2]$ bằng bao nhiêu?",
                  "answer": "A. 2 (đạt tại $x = 1$)",
                  "casio": "Bấm [MENU 8] Table: nhập hàm số, Start = 0, End = 2, Step = 0.2 để đọc min/max."
                }
              }
            },
            {
              "id": "MT_1_3_2",
              "code": "DẠNG 3.2",
              "title": "Tìm GTLN - GTNN trên khoảng mở (a; b) hoặc nửa khoảng",
              "difficulty": "TH",
              "details": {
                "theory": "Trên khoảng mở $(a; b)$ hoặc vô hạn $(a; +\\infty), (-\\infty; b)$, hàm số liên tục chưa chắc đã đạt GTLN hoặc GTNN.\n- Điều kiện cần và đủ:\n  + Bắt buộc phải lập bảng biến thiên của hàm số trên khoảng $K \\subseteq D$.\n  + Tính các giới hạn tại hai đầu mút: $L_a = \\lim_{x \\to a^+} f(x)$ và $L_b = \\lim_{x \\to b^-} f(x)$.\n  + Nếu tồn tại đầu mút mà giới hạn tiến tới $+\\infty$ (hoặc $-\\infty$) thì hàm số không có GTLN (hoặc không có GTNN).\n  + Nếu hàm số liên tục trên khoảng $(a; b)$ và chỉ có DUY NHẤT một điểm cực trị $x_0 \\in (a; b)$:\n    * Nếu $x_0$ là điểm cực đại $\\implies \\max_{(a; b)} f(x) = f(x_0)$.\n    * Nếu $x_0$ là điểm cực tiểu $\\implies \\min_{(a; b)} f(x) = f(x_0)$.",
                "signs": "Đề bài yêu cầu tìm GTLN, GTNN trên khoảng mở $(a; b)$, nửa khoảng $[a; b)$ hoặc miền vô hạn $(0; +\\infty)$.",
                "methods": "Bước 1: Tính đạo hàm $f'(x)$, tìm các nghiệm $x_i \\in (a; b)$.\nBước 2: Tính các giới hạn tại các đầu mút mở của khoảng bằng phép tính giới hạn hoặc phím CALC trên Casio ($x \\to a + 10^{-6}$, $x \\to 10^6$).\nBước 3: Lập bảng biến thiên hoàn chỉnh có điền đầy đủ giá trị cực trị và các giới hạn đầu mút.\nBước 4: Dựa vào chiều biến thiên kết luận $\\max, \\min$ (nếu có).",
                "mistakes": "Nhầm lẫn giá trị giới hạn tại đầu mút mở là giá trị lớn nhất hoặc nhỏ nhất (tại đầu mút mở hàm không bao giờ đạt được dấu bằng, do đó chỉ là cận trên/cận dưới chứ không phải $\\max/\\min$).",
                "sampleQuestion": {
                  "code": "Q07_D3_TH",
                  "content": "Tìm giá trị nhỏ nhất của $f(x) = x + \\frac{4}{x}$ trên $(0; +\\infty)$?",
                  "answer": "4 (đạt tại $x = 2$, có thể dùng BĐT Cauchy: $x + 4/x \\ge 2\\sqrt{4} = 4$)"
                }
              }
            },
            {
              "id": "MT_1_3_3",
              "code": "DẠNG 3.3",
              "title": "GTLN & GTNN của hàm chứa dấu giá trị tuyệt đối |f(x)|",
              "difficulty": "VD",
              "details": {
                "theory": "Xét hàm số $y = |f(x)|$ trên đoạn đóng $[a; b]$ với điều kiện $f(x)$ liên tục trên $[a; b]$.\n- Đặt $M = \\max_{[a; b]} f(x)$ và $m = \\min_{[a; b]} f(x)$. Khi đó:\n  + Giá trị lớn nhất: $\\max_{[a; b]} |f(x)| = \\max \\{ |M|, |m| \\} = \\frac{|M + m| + |M - m|}{2}$.\n  + Giá trị nhỏ nhất:\n    * Nếu $m \\le 0 \\le M$ (tức $m \\cdot M \\le 0$): đồ thị $y = f(x)$ cắt hoặc tiếp xúc trục hoành $\\implies \\min_{[a; b]} |f(x)| = 0$.\n    * Nếu $m > 0$: $\\min_{[a; b]} |f(x)| = m$.\n    * Nếu $M < 0$: $\\min_{[a; b]} |f(x)| = |M| = -M$.\n- Bất đẳng thức tối ưu tham số: Với hàm $y = |f(x) + m|$ trên $[a; b]$, ta có: $\\max_{[a; b]} |f(x) + m| \\ge \\frac{M - m}{2}$. Đẳng thức xảy ra khi và chỉ khi $m = -\\frac{M + m_0}{2}$.",
                "signs": "Tìm GTLN, GTNN của hàm số chứa dấu giá trị tuyệt đối $y = |f(x)|$ hoặc tìm tham số $m$ để $\\max_{[a; b]} |f(x) + m| \\le k$.",
                "methods": "Bước 1: Khảo sát hàm số lõi $u(x) = f(x)$ không chứa trị tuyệt đối trên $[a; b]$ để tìm $M = \\max u(x)$ và $m = \\min u(x)$.\nBước 2: Sử dụng bất đẳng thức $|u(x)| \\le k \\iff -k \\le u(x) \\le k, \\; \\forall x \\in [a; b] \\iff \\begin{cases} M \\le k \\\\ m \\ge -k \\end{cases}$.\nBước 3: Giải hệ bất phương trình tìm khoảng giá trị của tham số $m$.\nBước 4: Đối chiếu điều kiện và kết luận.",
                "mistakes": "Chỉ giải điều kiện cận trên $f(x) \\le k$ mà quên điều kiện cận dưới $f(x) \\ge -k$. Quên trường hợp đồ thị cắt trục hoành thì giá trị nhỏ nhất bằng 0.",
                "sampleQuestion": {
                  "code": "CH1_D2_VD02",
                  "content": "Tìm m để giá trị lớn nhất của $y = |x^3 - 3x + m|$ trên $[0; 2]$ đạt giá trị nhỏ nhất?",
                  "answer": "m = -1 (đạt tại tâm đối xứng của dải giá trị [-2; 2])"
                }
              }
            },
            {
              "id": "MT_1_3_4",
              "code": "DẠNG 3.4",
              "title": "Tìm tham số m trong bài toán GTLN - GTNN",
              "difficulty": "VD",
              "details": {
                "theory": "Bài toán cho $\\max_{[a; b]} f(x, m) = K$ hoặc $\\min_{[a; b]} f(x, m) = K$.\n- Điều kiện tiên quyết: Đoạn $[a; b]$ phải nằm trong tập xác định của hàm số với mọi giá trị $m$ cần tìm: $[a; b] \\subseteq D_m$.\n- Trường hợp hàm phân thức bậc nhất/bậc nhất $y = \\frac{ax+b}{cx+d}$:\n  + Điều kiện mẫu thức khác không trên toàn bộ đoạn $[a; b]$: $-\\frac{d}{c} \\notin [a; b] \\iff -d/c < a$ hoặc $-d/c > b$.\n  + Điều kiện không suy biến: $ad - bc \\ne 0$.\n  + Vì hàm số luôn đơn điệu trên $[a; b]$ nên $\\max$ và $\\min$ luôn đạt tại một trong hai đầu mút: $\\{f(a); f(b)\\}$.",
                "signs": "Đề bài cho hàm phân thức bậc nhất/bậc nhất hoặc hàm đa thức chứa tham số $m$, cho biết trước $\\max$ hoặc $\\min$ trên đoạn $[a; b]$, yêu cầu tìm $m$.",
                "methods": "Bước 1: Đặt điều kiện để hàm số xác định trên $[a; b]$ (đặc biệt mẫu số khác 0 trên $[a; b]$).\nBước 2: Tính đạo hàm $y'$.\n- Nếu $y'$ có dấu cố định (nhất biến): xét 2 trường hợp $y' > 0$ và $y' < 0$.\n- Với mỗi trường hợp, gán $\\max/\\min$ vào đầu mút tương ứng để giải tìm $m$.\nBước 3: Thử lại các giá trị $m$ vừa tìm được vào điều kiện ban đầu để loại bỏ nghiệm ngoại lai.",
                "mistakes": "Quên đặt điều kiện mẫu số khác 0 trên toàn bộ đoạn $[a; b]$, dẫn đến nhận giá trị $m$ làm hàm số gián đoạn trên $[a; b]$.",
                "sampleQuestion": {
                  "code": "Q08_D3_VD",
                  "content": "Tìm $m$ để giá trị lớn nhất của $y = \\frac{x - m}{x + 1}$ trên $[0; 1]$ bằng 2?",
                  "answer": "m = -3 (thử m = -3 có $y = (x+3)/(x+1)$ nghịch biến $\\implies \\max = y(0) = 3$ sai, kiểm tra kỹ nghiệm)"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_1_4",
          "number": "04",
          "title": "Đường tiệm cận của đồ thị hàm số",
          "subtitle": "Đứng · Ngang · Tiệm cận xiên",
          "color": "ink",
          "mathTypes": [
            {
              "id": "MT_1_4_1",
              "code": "DẠNG 4.1",
              "title": "Tiệm cận đứng và tiệm cận ngang cơ bản",
              "difficulty": "NB",
              "details": {
                "theory": "1. Tiệm cận ngang: Đường thẳng $y = y_0$ là tiệm cận ngang của đồ thị hàm số $y = f(x)$ nếu ít nhất một trong các điều kiện sau được thỏa mãn:\n$\\lim_{x \\to +\\infty} f(x) = y_0$ hoặc $\\lim_{x \\to -\\infty} f(x) = y_0$.\nĐiều kiện tiên quyết: Tập xác định $D$ phải không bị chặn trên (để có $x \\to +\\infty$) hoặc không bị chặn dưới (để có $x \\to -\\infty$).\n2. Tiệm cận đứng: Đường thẳng $x = x_0$ là tiệm cận đứng của đồ thị hàm số $y = f(x)$ nếu ít nhất một trong các điều kiện sau được thỏa mãn:\n$\\lim_{x \\to x_0^+} f(x) = \\pm \\infty$ hoặc $\\lim_{x \\to x_0^-} f(x) = \\pm \\infty$.\nĐiều kiện tiên quyết: Điểm $x_0$ phải là điểm tụ của $D$ (tức hàm số xác định trên ít nhất một khoảng kề bên $x_0$).\n3. Hàm phân thức $y = \\frac{P(x)}{Q(x)}$:\n- Điều kiện xác định: Mẫu thức khác không, tức $Q(x) \\ne 0$. Tập xác định: $D = \\{x \\in \\mathbb{R} \\mid Q(x) \\ne 0\\}$.\n- Đường thẳng $x = x_0$ là tiệm cận đứng $\\iff Q(x_0) = 0$ ($x_0 \\notin D$ và $x_0$ là điểm tụ của $D$) và sau khi triệt tiêu mọi nhân tử chung với tử số $P(x)$, nghiệm $x_0$ vẫn còn ở mẫu thức (bậc của nhân tử $(x - x_0)$ ở mẫu lớn hơn ở tử $\\implies \\lim_{x \\to x_0^\\pm} \\frac{P(x)}{Q(x)} = \\pm \\infty$).",
                "signs": "Hàm phân thức hữu tỉ $y = \\frac{P(x)}{Q(x)}$, hỏi số lượng đường tiệm cận đứng, ngang hoặc phương trình của chúng.",
                "methods": "Bước 1: Tìm tập xác định $D$ (giải điều kiện mẫu thức khác 0: $Q(x) \\ne 0 \\implies D = \\{x \\in \\mathbb{R} \\mid Q(x) \\ne 0\\}$).\nBước 2: Tiệm cận ngang: So sánh bậc của $P(x)$ và $Q(x)$ khi $x \\to \\pm \\infty$:\n- Bậc tử < Bậc mẫu $\\implies y = 0$.\n- Bậc tử = Bậc mẫu $\\implies y = a_n / b_n$.\n- Bậc tử > Bậc mẫu $\\implies$ Không có TCN.\nBước 3: Tiệm cận đứng: Giải phương trình mẫu số $Q(x) = 0$. Rút gọn nhân tử chung với tử số $P(x)$ để xác định các nghiệm thực sự làm mẫu triệt tiêu.",
                "mistakes": "Vội vàng kết luận mọi nghiệm của mẫu số đều là tiệm cận đứng mà không kiểm tra xem nghiệm đó có bị triệt tiêu hết bởi tử số hay không.",
                "sampleQuestion": {
                  "code": "Q12_D3_TF",
                  "content": "Xét tiệm cận của đồ thị hàm số $y = \\frac{x^2 - x - 2}{x^2 - 4}$.",
                  "answer": "Đồ thị có 1 TCĐ $x = -2$ (nghiệm $x=2$ bị triệt tiêu) và 1 TCN $y = 1$.",
                  "casio": "Nhập hàm, CALC x = 10^9 ra 1 (TCN), CALC x = -2.0001 ra số vô cùng lớn (TCĐ)."
                }
              }
            },
            {
              "id": "MT_1_4_2",
              "code": "DẠNG 4.2",
              "title": "Tiệm cận của hàm số chứa căn thức (Lưu ý dấu âm tại -∞)",
              "difficulty": "TH",
              "details": {
                "theory": "Cho hàm số $y = f(x)$ chứa căn thức bậc hai $\\sqrt{u(x)}$.\n- Điều kiện xác định: Biểu thức dưới căn $u(x) \\ge 0$.\n- Đưa biến $x$ ra ngoài căn thức:\n  + Khi $x \\to +\\infty$ ($x > 0$): $\\sqrt{x^2 \\cdot v(x)} = |x|\\sqrt{v(x)} = x\\sqrt{v(x)}$.\n  + Khi $x \\to -\\infty$ ($x < 0$): $\\sqrt{x^2 \\cdot v(x)} = |x|\\sqrt{v(x)} = -x\\sqrt{v(x)}$ (QUAN TRỌNG: dấu âm).\n- Dạng vô định $\\infty - \\infty$: Khi tính $\\lim_{x \\to \\pm\\infty} (\\sqrt{ax^2+bx+c} + px)$ với $\\sqrt{a} = |p|$, bắt buộc phải nhân lượng liên hợp:\n$\\sqrt{A} - B = \\frac{A - B^2}{\\sqrt{A} + B}$ với điều kiện mẫu $\\sqrt{A} + B \\ne 0$.",
                "signs": "Hàm số dạng $y = \\frac{\\sqrt{ax^2+bx+c}}{px+q}$ hoặc $y = \\sqrt{ax^2+bx+c} - px$, hỏi số đường tiệm cận ngang.",
                "methods": "Bước 1: Tìm TXD của hàm số (giải $u(x) \\ge 0$ và mẫu khác 0). Kiểm tra xem miền xác định có chứa $+\\infty$ và $-\\infty$ không.\nBước 2: Tính $\\lim_{x \\to +\\infty} y$ bằng cách chia cả tử và mẫu cho $x$ ($x > 0$).\nBước 3: Tính $\\lim_{x \\to -\\infty} y$ bằng cách chia cho $x$ (lưu ý đưa vào trong căn thành $x^2$ và đặt dấu trừ phía trước căn).\nBước 4: Kết luận các đường tiệm cận ngang $y = y_1$ và $y = y_2$.",
                "mistakes": "Quên dấu trừ khi rút $x$ ra khỏi căn thức ở nhánh âm vô cực $x \\to -\\infty$ dẫn đến tính sai dấu của tiệm cận ngang.",
                "sampleQuestion": {
                  "code": "Q36_D3_TF",
                  "content": "Tìm các đường tiệm cận ngang của đồ thị $y = \\frac{\\sqrt{x^2+1}-x}{x-1}$?",
                  "answer": "Có 2 TCN: $y = 0$ (khi $x \\to +\\infty$) và $y = -2$ (khi $x \\to -\\infty$)."
                }
              }
            },
            {
              "id": "MT_1_4_3",
              "code": "DẠNG 4.3",
              "title": "Tiệm cận xiên của hàm phân thức bậc hai / bậc nhất",
              "difficulty": "TH",
              "details": {
                "theory": "1. Định nghĩa: Đường thẳng $y = ax + b$ ($a \\ne 0$) là tiệm cận xiên của đồ thị hàm số $y = f(x)$ nếu:\n$\\lim_{x \\to +\\infty} [f(x) - (ax + b)] = 0$ hoặc $\\lim_{x \\to -\\infty} [f(x) - (ax + b)] = 0$.\nHệ số xác định bởi công thức Cauchy: $a = \\lim_{x \\to \\pm\\infty} \\frac{f(x)}{x}$ ($a \\ne 0$) và $b = \\lim_{x \\to \\pm\\infty} [f(x) - ax]$.\n2. Hàm phân thức bậc hai trên bậc nhất $y = \\frac{ax^2+bx+c}{px+q}$:\n- Điều kiện xác định: Mẫu thức khác không $px + q \\ne 0 \\iff x \\ne -\\frac{q}{p}$. Tập xác định: $D = \\mathbb{R} \\setminus \\left\\{-\\frac{q}{p}\\right\\}$.\n- Điều kiện tồn tại tiệm cận xiên: $a \\ne 0, \\; p \\ne 0$ và điều kiện không suy biến $aq^2 - bpq + cp^2 \\ne 0$ (tử số không chia hết cho mẫu số, phần dư $r \\ne 0$).\n- Thực hiện phép chia đa thức tử cho mẫu:\n$y = \\left(\\frac{a}{p}x + \\frac{bp - aq}{p^2}\\right) + \\frac{r}{px+q}$ với phần dư $r = \\frac{aq^2 - bpq + cp^2}{p^2} \\ne 0$.\n- Do $\\lim_{x \\to \\pm\\infty} \\frac{r}{px+q} = 0$, phương trình đường tiệm cận xiên là: $y = \\frac{a}{p}x + \\frac{bp - aq}{p^2}$ (hệ số góc $a/p \\ne 0$).\n- Đồ thị còn có đúng 1 tiệm cận đứng là đường thẳng $x = -\\frac{q}{p}$.",
                "signs": "Đồ thị hàm phân thức có bậc tử lớn hơn bậc mẫu đúng 1 đơn vị, yêu cầu tìm phương trình đường tiệm cận xiên.",
                "methods": "Bước 1: Tìm tập xác định $D = \\mathbb{R} \\setminus \\left\\{-\\frac{q}{p}\\right\\}$ (điều kiện mẫu $px + q \\ne 0 \\iff x \\ne -\\frac{q}{p}$). Kiểm tra bậc tử lớn hơn bậc mẫu đúng 1 bậc và tử không chia hết cho mẫu ($aq^2 - bpq + cp^2 \\ne 0$).\nBước 2: Thực hiện phép chia đa thức tử cho mẫu để tách thành dạng $y = mx + n + \\frac{r}{px+q}$.\nBước 3: Phần thương bậc nhất $y = mx + n$ chính là phương trình đường tiệm cận xiên.\nBước 4: Bấm máy tính Casio: Dùng phép chia đa thức hoặc tính giới hạn $a = \\lim y/x$ và $b = \\lim (y - ax)$.",
                "mistakes": "Chia nhầm dấu hệ số tự do dẫn đến sai số hạng tự do $n$ của tiệm cận xiên. Quên điều kiện $a \\ne 0$ (nếu $a = 0$ thì đó là tiệm cận ngang chứ không phải tiệm cận xiên).",
                "sampleQuestion": {
                  "code": "Q35_D3_MC",
                  "content": "Tìm tiệm cận xiên của đồ thị $y = \\frac{3x^2 - 5x + 2}{x - 2}$?",
                  "answer": "A. $y = 3x + 1$ (chia ra $y = 3x + 1 + 4/(x - 2)$)"
                }
              }
            },
            {
              "id": "MT_1_4_4",
              "code": "DẠNG 4.4",
              "title": "Tìm tham số m để đồ thị có số đường tiệm cận thỏa mãn",
              "difficulty": "VD",
              "details": {
                "theory": "Xét đồ thị hàm phân thức $y = \\frac{P(x)}{Q(x, m)}$:\n- Tiệm cận ngang: So sánh bậc của $P(x)$ và $Q(x, m)$. Nếu $\\deg P \\le \\deg Q$, đồ thị có ít nhất 1 TCN $y = y_0$.\n- Tiệm cận đứng: Phương trình mẫu $Q(x, m) = 0$ phải có nghiệm thực thuộc tập xác định của tử số và không bị triệt tiêu bởi nghiệm của tử $P(x) = 0$.\n- Trường hợp mẫu bậc hai $Q(x) = Ax^2 + Bx + C = 0$: Có 2 tiệm cận đứng $\\iff \\begin{cases} A \\ne 0 \\\\ \\Delta = B^2 - 4AC > 0 \\\\ P(x_1) \\ne 0, \\; P(x_2) \\ne 0 \\end{cases}$.\n- Nếu tử số có căn thức $\\sqrt{u(x)}$: Nghiệm mẫu phải thỏa mãn điều kiện $u(x_i) > 0$.",
                "signs": "Đề bài chứa tham số $m$, yêu cầu tìm $m$ để đồ thị có đúng 1, 2 hoặc 3 đường tiệm cận; hoặc các đường tiệm cận tạo với trục tọa độ một hình phẳng có diện tích cho trước.",
                "methods": "Bước 1: Xác định số đường tiệm cận ngang cố định bằng cách tính giới hạn khi $x \\to \\pm\\infty$.\nBước 2: Suy ra số lượng tiệm cận đứng cần có từ tổng số tiệm cận đề bài yêu cầu.\nBước 3: Thiết lập điều kiện cho phương trình mẫu số $Q(x, m) = 0$: có nghiệm phân biệt, nghiệm khác nghiệm của tử số, và nghiệm thỏa mãn điều kiện căn thức ở tử (nếu có).\nBước 4: Giải hệ điều kiện và kết luận giá trị $m$.",
                "mistakes": "Quên kiểm tra điều kiện nghiệm của mẫu làm tử số bằng 0, dẫn đến thừa nghiệm tiệm cận đứng bị triệt tiêu.",
                "sampleQuestion": {
                  "code": "Q13_D4_VD",
                  "content": "Tìm $m$ để đồ thị $y = \\frac{x - 1}{x^2 - 2mx + 4}$ có đúng 2 đường tiệm cận đứng?",
                  "answer": "m > 2 hoặc m < -2 và $m \\ne 5/2$"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_1_5",
          "number": "05",
          "title": "Khảo sát sự biến thiên & Đồ thị hàm số",
          "subtitle": "Biến thiên · Tương giao · Tiếp tuyến · Đối xứng",
          "color": "sage",
          "mathTypes": [
            {
              "id": "MT_1_5_1",
              "code": "DẠNG 5.1",
              "title": "Quy tắc 5 bước nhận diện đồ thị & Bảng biến thiên",
              "difficulty": "NB",
              "details": {
                "theory": "Quy tắc 5 bước chuẩn mực nhận diện đồ thị hàm số:\n1. Bước 1: Nhánh ngoài cùng bên phải ($x \\to +\\infty$): Nếu đi lên $\\implies a > 0$; nếu đi xuống $\\implies a < 0$.\n2. Bước 2: Giao điểm với trục tung $Oy$ ($x = 0$): Tọa độ $(0; d)$ xác định trực tiếp hệ số tự do $d$.\n3. Bước 3: Tọa độ các điểm cực trị (nếu có): Nghiệm của $y' = 0$ và giá trị cực trị tương ứng trên hệ trục.\n4. Bước 4: Các đường tiệm cận (đối với hàm phân thức):\n- Hàm nhất biến $y = \\frac{ax+b}{cx+d}$ ($c \\ne 0, ad - bc \\ne 0$): TCĐ $x = -d/c$, TCN $y = a/c$.\n- Hàm bậc hai trên bậc nhất $y = \\frac{ax^2+bx+c}{px+q}$ ($a \\ne 0, p \\ne 0$): TCĐ $x = -q/p$, TCX $y = \\frac{a}{p}x + \\frac{bp-aq}{p^2}$.\n5. Bước 5: Giao điểm với trục hoành $Ox$ ($y = 0$) hoặc các điểm đặc biệt có tọa độ nguyên.",
                "signs": "Đề bài cho hình vẽ đường cong đồ thị hoặc bảng biến thiên, yêu cầu xác định công thức hàm số tương ứng hoặc dấu các hệ số $a, b, c, d$.",
                "methods": "Bước 1: Nhìn nhánh ngoài cùng bên phải để loại các phương án ngược dấu hệ số cao nhất $a$.\nBước 2: Nhìn giao điểm với trục tung $Oy$ để xác định dấu hệ số tự do $d$.\nBước 3: Nhìn tiệm cận đứng và tiệm cận ngang/xiên để loại trừ các phương án sai tiệm cận.\nBước 4: Thay tọa độ một điểm cực trị hoặc điểm đặc biệt $(x_0; y_0)$ vào các phương án còn lại để chọn đáp án duy nhất.",
                "mistakes": "Nhìn nhánh bên trái thay vì nhánh ngoài cùng bên phải dẫn đến xác định ngược dấu hệ số cao nhất $a$.",
                "sampleQuestion": {
                  "code": "Q37_D4_MC",
                  "content": "Đường cong có TCĐ $x = -1$, TCN $y = 2$ và cắt $Oy$ tại $(0; -1)$ là đồ thị của hàm số nào?",
                  "answer": "A. $y = \\frac{2x - 1}{x + 1}$"
                }
              }
            },
            {
              "id": "MT_1_5_2",
              "code": "DẠNG 5.2",
              "title": "Bài toán tương giao đồ thị & Biện luận số nghiệm f(x) = m",
              "difficulty": "TH",
              "details": {
                "theory": "1. Định lý tương giao: Cho hai hàm số $y = f(x)$ và $y = g(x)$ xác định trên cùng tập $D$. Số nghiệm thực của phương trình hoành độ giao điểm $f(x) = g(x)$ bằng đúng số giao điểm của hai đồ thị $(C_1): y = f(x)$ và $(C_2): y = g(x)$ trên $D$.\n2. Biện luận phương trình $f(x) = m$:\n- Nghiệm là hoành độ các giao điểm của đồ thị $(C): y = f(x)$ và đường thẳng nằm ngang $d: y = m$.\n- Tiếp xúc tại đỉnh cực trị ứng với nghiệm kép (nghiệm bội chẵn).\n- Cắt xuyên qua đồ thị ứng với nghiệm đơn (nghiệm bội lẻ).\n3. Phương trình hàm hợp $f(u(x)) = m$:\n- Đặt ẩn phụ $t = u(x)$ với điều kiện $t \\in T$ (miền giá trị của hàm $u(x)$ trên miền xác định của $x$).\n- Giải tìm các nghiệm $t_i \\in T$ thỏa mãn $f(t) = m$.\n- Với mỗi $t_i$, giải phương trình $u(x) = t_i$ để suy ra số nghiệm $x$ thực tương ứng.",
                "signs": "Đề bài cho đồ thị hoặc bảng biến thiên của $y=f(x)$, yêu cầu biện luận số nghiệm của phương trình $f(x) = m$ hoặc $f(u(x)) = m$.",
                "methods": "Bước 1: Biến đổi phương trình đề bài về dạng chuẩn $f(x) = g(m)$.\nBước 2: Vẽ đường thẳng nằm ngang $y = g(m)$ cắt đồ thị hàm số.\nBước 3: So sánh vị trí tương đối của $g(m)$ với các giá trị cực đại $y_{CD}$ và cực tiểu $y_{CT}$.\nBước 4: Kết luận khoảng giá trị của $m$ ứng với số nghiệm yêu cầu.",
                "mistakes": "Nhầm lẫn giữa giá trị cực trị ($y$) và điểm cực trị ($x$) khi đặt điều kiện giao điểm (đường thẳng $y = m$ phải so sánh với giá trị $y$ chứ không phải hoành độ $x$).",
                "sampleQuestion": {
                  "code": "Q10_D5_TH",
                  "content": "Cho hàm số $y=f(x)$ có bảng biến thiên với $y_{\\text{CĐ}}=3, y_{\\text{CT}}=-1$. Tìm $m$ để $f(x) = m$ có 3 nghiệm phân biệt?",
                  "answer": "-1 < m < 3"
                }
              }
            },
            {
              "id": "MT_1_5_3",
              "code": "DẠNG 5.3",
              "title": "Phương trình tiếp tuyến của đồ thị hàm số",
              "difficulty": "TH",
              "details": {
                "theory": "Cho hàm số $y = f(x)$ có đồ thị $(C)$, xác định trên tập $D$.\n- Điều kiện tồn tại tiếp tuyến tại $M_0(x_0; y_0) \\in (C)$: Hàm số phải có đạo hàm hữu hạn tại điểm $x_0 \\in D$.\n- Phương trình tiếp tuyến của $(C)$ tại $M_0(x_0; y_0)$:\n$y = f'(x_0)(x - x_0) + y_0$ với $y_0 = f(x_0)$. Hệ số góc tiếp tuyến là $k = f'(x_0)$.\n- Điều kiện song song / vuông góc:\n  + Tiếp tuyến song song với đường thẳng $d: y = ax + b \\iff \\begin{cases} f'(x_0) = a \\\\ f(x_0) - ax_0 \\ne b \\end{cases}$ (loại trừ trường hợp tiếp tuyến trùng với $d$).\n  + Tiếp tuyến vuông góc với đường thẳng $d: y = ax + b$ ($a \\ne 0$) $\\iff f'(x_0) \\cdot a = -1 \\iff f'(x_0) = -\\frac{1}{a}$.",
                "signs": "Viết phương trình tiếp tuyến tại tiếp điểm $M_0(x_0; y_0)$, tiếp tuyến biết trước hệ số góc $k$, hoặc tiếp tuyến đi qua một điểm $A(x_A; y_A)$ cho trước.",
                "methods": "Trường hợp 1 (Tiếp tuyến tại điểm $M_0(x_0; y_0)$): Tính $y_0 = f(x_0)$ và $k = f'(x_0)$, ráp trực tiếp vào công thức.\nTrường hợp 2 (Tiếp tuyến biết hệ số góc $k$): Giải phương trình $f'(x_0) = k$ tìm tiếp điểm $x_0$, sau đó viết phương trình tiếp tuyến và kiểm tra điều kiện không trùng nhau.\nTrường hợp 3 (Tiếp tuyến đi qua điểm $A(x_A; y_A)$): Lập hệ phương trình tiếp xúc $\\begin{cases} f(x_0) = k(x_A - x_0) + y_A \\\\ f'(x_0) = k \\end{cases}$ để giải tìm tọa độ tiếp điểm $x_0$.",
                "mistakes": "Lẫn lộn giữa tiếp tuyến TẠI một điểm thuộc đồ thị và tiếp tuyến ĐI QUA một điểm bên ngoài. Quên loại bỏ trường hợp tiếp tuyến trùng với đường thẳng cho trước khi giải bài toán song song.",
                "sampleQuestion": {
                  "code": "Q14_D4_MC",
                  "content": "Viết phương trình tiếp tuyến của $y = x^3 - 3x + 2$ tại điểm có hoành độ $x_0 = 2$?",
                  "answer": "A. $y = 9x - 14$"
                }
              }
            },
            {
              "id": "MT_1_5_4",
              "code": "DẠNG 5.4",
              "title": "Tâm đối xứng và trục đối xứng của đồ thị hàm số",
              "difficulty": "TH",
              "details": {
                "theory": "1. Định nghĩa tâm đối xứng: Điểm $I(x_0; y_0)$ là tâm đối xứng của đồ thị $(C): y = f(x) \\iff \\forall x \\in D \\implies 2x_0 - x \\in D$ và $f(2x_0 - x) + f(x) = 2y_0$.\n2. Đồ thị hàm số bậc ba $y = ax^3+bx^2+cx+d$ ($a \\ne 0$): Luôn nhận điểm uốn $I(x_0; y_0)$ làm tâm đối xứng, trong đó $x_0 = -\\frac{b}{3a}$ (nghiệm của $y'' = 6ax + 2b = 0$) và $y_0 = f(x_0)$.\n3. Đồ thị hàm phân thức $y = \\frac{ax+b}{cx+d}$ ($c \\ne 0, ad - bc \\ne 0$): Luôn nhận giao điểm của hai đường tiệm cận $I(-d/c; a/c)$ làm tâm đối xứng.\n4. Đồ thị hàm phân thức bậc hai trên bậc nhất $y = \\frac{ax^2+bx+c}{px+q}$ ($a \\ne 0, p \\ne 0$): Luôn nhận giao điểm của đường tiệm cận đứng $x = -q/p$ và đường tiệm cận xiên làm tâm đối xứng.",
                "signs": "Tìm tọa độ tâm đối xứng của đồ thị hàm số, hoặc tìm tham số $m$ để tâm đối xứng thuộc một đường thẳng hay parabol cho trước.",
                "methods": "Bước 1: Nhận diện loại hàm số (bậc ba, nhất biến, bậc 2 trên bậc 1).\nBước 2: Tìm tọa độ điểm đối xứng:\n- Với hàm bậc 3: Giải $y'' = 0 \\implies x_0 = -b/(3a)$, thay vào hàm số tìm $y_0 = f(x_0)$.\n- Với hàm phân thức: Tìm giao điểm của 2 đường tiệm cận $\\implies I(x_0; y_0)$.\nBước 3: Thay tọa độ $I(x_0; y_0)$ vào điều kiện đề bài để tìm $m$.",
                "mistakes": "Tính tung độ $y_0$ bằng cách thay $x_0$ vào đạo hàm $y'$ thay vì thay vào hàm số ban đầu $y = f(x)$.",
                "sampleQuestion": {
                  "code": "Q15_D5_TH",
                  "content": "Tìm tọa độ tâm đối xứng của đồ thị hàm số $y = x^3 - 3x^2 + 4$?",
                  "answer": "I(1; 2) (vì $y'' = 6x - 6 = 0 \\implies x = 1, y(1) = 2$)"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_1_6",
          "number": "06",
          "title": "Ứng dụng đạo hàm giải bài toán tối ưu thực tiễn",
          "subtitle": "Mô hình hóa kinh tế · Tối ưu hình học bao bì",
          "color": "terracotta",
          "mathTypes": [
            {
              "id": "MT_1_6_1",
              "code": "DẠNG 6.1",
              "title": "Tối ưu hóa kinh tế (Chi phí biên, Doanh thu, Lợi nhuận)",
              "difficulty": "VD",
              "details": {
                "theory": "Mô hình toán học kinh tế:\n- Biến sản lượng: $x > 0$ (hoặc $x \\in [x_{\\min}; x_{\\max}]$ theo công suất nhà máy).\n- Hàm tổng chi phí $C(x)$ với chi phí cận biên $MC(x) = C'(x)$.\n- Hàm chi phí trung bình: $\\bar{C}(x) = \\frac{C(x)}{x}$ (điều kiện mẫu $x > 0$). Chi phí trung bình đạt cực tiểu khi $\\bar{C}'(x) = 0 \\iff \\frac{C'(x) \\cdot x - C(x)}{x^2} = 0 \\iff C'(x) = \\frac{C(x)}{x} \\iff MC(x) = \\bar{C}(x)$ (Chi phí cận biên bằng Chi phí trung bình).\n- Hàm doanh thu: $R(x) = x \\cdot p(x)$ với $p(x) > 0$ là hàm giá bán. Doanh thu cận biên $MR(x) = R'(x)$.\n- Hàm lợi nhuận: $P(x) = R(x) - C(x)$.\n- Điều kiện tối đa hóa lợi nhuận: Lợi nhuận cực đại khi $P'(x) = 0 \\iff R'(x) = C'(x)$ (Doanh thu cận biên bằng Chi phí cận biên) và $P''(x) < 0$.",
                "signs": "Bài toán bằng lời văn kinh tế: xác định mức sản lượng để chi phí sản xuất trung bình thấp nhất, doanh thu lớn nhất, lợi nhuận tối đa.",
                "methods": "Bước 1: Đặt biến số sản lượng $x > 0$.\nBước 2: Thiết lập hàm mục tiêu (Chi phí trung bình $\\bar{C}(x)$, Doanh thu $R(x)$ hoặc Lợi nhuận $P(x)$).\nBước 3: Tính đạo hàm bậc một và giải phương trình đạo hàm bằng 0 để tìm điểm dừng.\nBước 4: Kiểm tra dấu đạo hàm cấp hai hoặc lập bảng biến thiên để khẳng định điểm cực trị tối ưu.",
                "mistakes": "Tìm cực tiểu của tổng chi phí $C(x)$ thay vì chi phí trung bình $\\bar{C}(x) = C(x)/x$. Quên điều kiện sản lượng $x > 0$.",
                "sampleQuestion": {
                  "code": "Q34_D2_SA",
                  "content": "Cho $C(x) = x^3 - 30x^2 + 500x + 1000$. Tìm $x$ để chi phí trung bình $\\bar{C}(x)$ nhỏ nhất?",
                  "answer": "20 sản phẩm/ngày"
                }
              }
            },
            {
              "id": "MT_1_6_2",
              "code": "DẠNG 6.2",
              "title": "Tối ưu hóa hình học thực tiễn (Thể tích, Diện tích tôn, Rào chắn)",
              "difficulty": "VD",
              "details": {
                "theory": "Thiết lập mô hình bài toán cực trị hình học:\n- Điều kiện hình học tự nhiên của các biến: kích thước độ dài cạnh $x > 0$, bán kính $r > 0$, chiều cao $h > 0$.\n- Mối quan hệ liên kết (ràng buộc): Biểu diễn các đại lượng phụ qua biến số chính (ví dụ từ thể tích không đổi $V = \\pi r^2 h = V_0 \\implies h = \\frac{V_0}{\\pi r^2}$ với điều kiện $r > 0$).\n- Hàm mục tiêu: $f(x)$ thể hiện đại lượng cần tối ưu (diện tích toàn phần $S_{tp}$, chiều dài dây rào $L$, v.v.).\n- Khảo sát tìm cực trị bằng đạo hàm trên miền xác định $x \\in (0; +\\infty)$ hoặc áp dụng bất đẳng thức Cauchy (AM-GM) cho các số dương: $a + b \\ge 2\\sqrt{ab}$ (dấu bằng khi $a = b > 0$), hoặc $a + b + c \\ge 3\\sqrt[3]{abc}$ (dấu bằng khi $a = b = c > 0$).",
                "signs": "Bài toán gấp hộp không nắp có thể tích lớn nhất, làm vỏ lon hình trụ tốn ít kim loại nhất, rào mảnh đất có chi phí thấp nhất.",
                "methods": "Bước 1: Chọn ẩn số chính thích hợp và đặt điều kiện hình học tự nhiên ($x > 0$).\nBước 2: Dựa vào giả thiết cố định (thể tích, diện tích đáy) rút đại lượng phụ theo ẩn chính.\nBước 3: Thiết lập hàm mục tiêu $f(x)$ cho đại lượng cần tối ưu hóa.\nBước 4: Tìm giá trị lớn nhất / nhỏ nhất của hàm mục tiêu bằng đạo hàm hoặc bấm Table Casio.",
                "mistakes": "Quên kiểm tra điều kiện hình học tự nhiên của ẩn số. Áp dụng bất đẳng thức Cauchy khi các số hạng chưa bảo đảm luôn dương.",
                "sampleQuestion": {
                  "code": "Q33_D2_TF",
                  "content": "Rào mảnh đất $300\\text{ m}^2$ giáp bờ tường thẳng bằng chiều dài lưới rào $L(x) = 2x + 300/x$. Tìm $x$ để hàng rào ngắn nhất?",
                  "answer": "x = 5\\sqrt{6} \\approx 12{,}25 m"
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "CH2",
      "number": "CHƯƠNG 02",
      "title": "VECTƠ VÀ HỆ TRỤC TỌA ĐỘ TRONG KHÔNG GIAN",
      "subtitle": "Bài 6 ➔ Bài 8 · 4 Chủ đề · 14 Dạng toán thực chiến",
      "color": "cyan",
      "topics": [
        {
          "id": "TOPIC_2_1",
          "number": "07",
          "title": "Vectơ không gian & Các quy tắc hình học",
          "subtitle": "Quy tắc hình hộp · Phân tích cơ sở · Tích vô hướng",
          "color": "cyan",
          "mathTypes": [
            {
              "id": "MT_2_1_1",
              "code": "DẠNG 7.1",
              "title": "Quy tắc 3 điểm, hình bình hành & Quy tắc hình hộp",
              "difficulty": "NB",
              "details": {
                "theory": "1. Quy tắc 3 điểm: Với 3 điểm $A, B, C$ bất kỳ trong không gian:\n$\\vec{AB} + \\vec{BC} = \\vec{AC}$ và $\\vec{AB} - \\vec{AC} = \\vec{CB}$.\n2. Quy tắc hình bình hành: Nếu $ABCD$ là hình bình hành (4 điểm đồng phẳng) thì:\n$\\vec{AB} + \\vec{AD} = \\vec{AC}$.\n3. Quy tắc hình hộp: Cho hình hộp $ABCD.A'B'C'D'$ trong không gian (3 cạnh xuất phát từ một đỉnh không đồng phẳng):\nVectơ đường chéo xuất phát từ đỉnh $A$: $\\vec{AC'} = \\vec{AB} + \\vec{AD} + \\vec{AA'}$.\n4. Tính chất trung điểm và trọng tâm:\n- $M$ là trung điểm đoạn thẳng $AB \\iff \\vec{MA} + \\vec{MB} = \\vec{0} \\iff \\vec{OA} + \\vec{OB} = 2\\vec{OM}$ với mọi điểm $O$.\n- $G$ là trọng tâm tam giác $ABC \\iff \\vec{GA} + \\vec{GB} + \\vec{GC} = \\vec{0} \\iff \\vec{OA} + \\vec{OB} + \\vec{OC} = 3\\vec{OG}$ với mọi điểm $O$.\n- $G$ là trọng tâm tứ diện $ABCD \\iff \\vec{GA} + \\vec{GB} + \\vec{GC} + \\vec{GD} = \\vec{0} \\iff \\vec{OA} + \\vec{OB} + \\vec{OC} + \\vec{OD} = 4\\vec{OG}$ với mọi điểm $O$.\n5. Quy ước vectơ-không: $\\vec{AA} = \\vec{0}$, $\\vec{a} + \\vec{0} = \\vec{a}$, $|\\vec{0}| = 0$.",
                "signs": "Bài toán cho các khối đa diện quen thuộc (hình hộp, tứ diện, lăng trụ), yêu cầu thu gọn biểu thức vectơ hoặc chứng minh đẳng thức vectơ.",
                "methods": "Bước 1: Chọn một đỉnh chung làm gốc quy chiếu.\nBước 2: Sử dụng quy tắc chèn điểm xen kẽ, quy tắc ba điểm và quy tắc hình bình hành để đưa về các vectơ cạnh.\nBước 3: Thu gọn các hệ số và kết luận.",
                "mistakes": "Nhầm lẫn chiều vectơ khi đổi đỉnh (quên dấu trừ: $\\vec{BA} = -\\vec{AB}$). Nhầm lẫn tỉ số trọng tâm tam giác ($1/3$) với trọng tâm tứ diện ($1/4$).",
                "sampleQuestion": {
                  "code": "Q39_D5_MC",
                  "content": "Cho tứ diện ABCD, M và N là trung điểm AB và CD. Biểu diễn vectơ MN theo AD và BC?",
                  "answer": "D. $\\vec{MN} = \\frac{1}{2}(\\vec{AD} + \\vec{BC})$"
                }
              }
            },
            {
              "id": "MT_2_1_2",
              "code": "DẠNG 7.2",
              "title": "Phân tích vectơ theo 3 vectơ cơ sở không đồng phẳng",
              "difficulty": "TH",
              "details": {
                "theory": "1. ĐIỀU KIỆN ĐỒNG PHẲNG CỦA BA VECTƠ:\nBa vectơ $\\vec{a}, \\vec{b}, \\vec{c}$ gọi là đồng phẳng nếu giá của chúng cùng song song với một mặt phẳng.\nĐiều kiện cần và đủ: Nếu hai vectơ $\\vec{a}, \\vec{b}$ không cùng phương, thì $\\vec{a}, \\vec{b}, \\vec{c}$ đồng phẳng $\\iff$ tồn tại duy nhất cặp số $(m; n) \\in \\mathbb{R}^2$ sao cho $\\vec{c} = m\\vec{a} + n\\vec{b}$.\n2. ĐỊNH LÝ PHÂN TÍCH THEO BA VECTƠ CƠ SỞ:\nCho ba vectơ $\\vec{a}, \\vec{b}, \\vec{c}$ KHÁC VECTƠ-KHÔNG ($\\vec{a} \\ne \\vec{0}, \\vec{b} \\ne \\vec{0}, \\vec{c} \\ne \\vec{0}$) VÀ KHÔNG ĐỒNG PHẲNG.\nKhi đó với mọi vectơ $\\vec{v}$ trong không gian, luôn tồn tại DUY NHẤT một bộ ba số thực $(x; y; z)$ sao cho:\n$\\vec{v} = x\\vec{a} + y\\vec{b} + z\\vec{c}$.\nBộ ba số $(x; y; z)$ gọi là tọa độ của vectơ $\\vec{v}$ đối với cơ sở $\\{\\vec{a}, \\vec{b}, \\vec{c}\\}$.",
                "signs": "Cho tứ diện $ABCD$ hoặc hình hộp, yêu cầu phân tích một vectơ đường chéo hoặc đoạn nối qua ba vectơ cạnh xuất phát từ một đỉnh.",
                "methods": "Bước 1: Chọn một đỉnh làm gốc và xác định bộ ba vectơ cơ sở không đồng phẳng xuất phát từ đỉnh đó (ví dụ $\\vec{AB}, \\vec{AC}, \\vec{AD}$).\nBước 2: Sử dụng quy tắc chèn điểm liên tiếp để biểu diễn vectơ cần tìm qua các đoạn thẳng thành phần.\nBước 3: Sử dụng tỉ số chia đoạn thẳng (trung điểm tỉ số $1/2$, trọng tâm tam giác $1/3$, trọng tâm tứ diện $1/4$).\nBước 4: Nhóm các hệ số theo từng vectơ cơ sở.",
                "mistakes": "Nhầm lẫn tỉ số chia đoạn của trọng tâm tam giác với trung điểm đoạn thẳng. Sử dụng ba vectơ cơ sở bị đồng phẳng.",
                "sampleQuestion": {
                  "code": "Q40_D5_TF",
                  "content": "Cho lăng trụ $ABC.A'B'C'$. Gọi $G$ là trọng tâm $\\Delta A'B'C'$. Biểu diễn $\\vec{AG}$ theo $\\vec{AA'}, \\vec{AB}, \\vec{AC}$?",
                  "answer": "$\\vec{AG} = \\vec{AA'} + \\frac{1}{3}\\vec{AB} + \\frac{1}{3}\\vec{AC}$"
                }
              }
            },
            {
              "id": "MT_2_1_3",
              "code": "DẠNG 7.3",
              "title": "Tích vô hướng và góc giữa hai vectơ không gian",
              "difficulty": "TH",
              "details": {
                "theory": "1. Định nghĩa tích vô hướng: Cho hai vectơ $\\vec{u}$ và $\\vec{v}$ trong không gian.\nTích vô hướng của $\\vec{u}$ và $\\vec{v}$ là một số thực, ký hiệu là $\\vec{u} \\cdot \\vec{v}$, được xác định bởi:\n$\\vec{u} \\cdot \\vec{v} = |\\vec{u}| \\cdot |\\vec{v}| \\cdot \\cos(\\vec{u}, \\vec{v})$.\nQuy ước: Nếu ít nhất một trong hai vectơ là $\\vec{0}$ thì $\\vec{u} \\cdot \\vec{v} = 0$. Bình phương vô hướng: $\\vec{u}^2 = |\\vec{u}|^2 \\ge 0$.\n2. Công thức góc giữa hai vectơ:\nVới điều kiện cả hai vectơ đều KHÁC VECTƠ-KHÔNG: $\\vec{u} \\ne \\vec{0}$ và $\\vec{v} \\ne \\vec{0}$ (tức $|\\vec{u}| > 0, |\\vec{v}| > 0$):\n$\\cos(\\vec{u}, \\vec{v}) = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|}$, với $0^\\circ \\le (\\vec{u}, \\vec{v}) \\le 180^\\circ$.\n3. Điều kiện hai vectơ vuông góc:\nCho $\\vec{u} \\ne \\vec{0}$ và $\\vec{v} \\ne \\vec{0}$. Khi đó: $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$.\n4. Phân biệt: Góc $\\varphi$ giữa hai đường thẳng mang VCP $\\vec{u}, \\vec{v}$ luôn thỏa $0^\\circ \\le \\varphi \\le 90^\\circ$ và $\\cos \\varphi = \\frac{|\\vec{u} \\cdot \\vec{v}|}{|\\vec{u}| \\cdot |\\vec{v}|}$.",
                "signs": "Tính góc giữa hai vectơ, tính độ dài đoạn thẳng trong khối đa diện hoặc chứng minh hai đường thẳng vuông góc.",
                "methods": "Bước 1: Đưa hai vectơ về chung một gốc hoặc phân tích theo bộ ba vectơ cơ sở đã biết độ dài và góc đôi một.\nBước 2: Tính tích vô hướng bằng cách nhân đa thức và thay giá trị góc đã biết.\nBước 3: Tính độ dài từng vectơ: $|\\vec{u}| = \\sqrt{\\vec{u}^2}$.\nBước 4: Áp dụng công thức tính $\\cos(\\vec{u}, \\vec{v})$ và tra bảng suy ra số đo góc.",
                "mistakes": "Nhầm lẫn góc giữa hai vectơ (có thể tù $> 90^\\circ$) với góc giữa hai đường thẳng (luôn nhọn hoặc vuông $\\le 90^\\circ$, không bao giờ tù).",
                "sampleQuestion": {
                  "code": "Q21_D5_MC",
                  "content": "Cho lăng trụ tam giác đều $ABC.A'B'C'$ có tất cả các cạnh bằng $a$. Tính góc giữa $\\vec{AB}$ và $\\vec{A'C'}$?",
                  "answer": "C. $60^{\\circ}$"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_2_2",
          "number": "08",
          "title": "Hệ trục tọa độ Oxyz & Tọa độ điểm, vectơ",
          "subtitle": "Tọa độ điểm & vectơ · Trung điểm · Đối xứng",
          "color": "emerald",
          "mathTypes": [
            {
              "id": "MT_2_2_1",
              "code": "DẠNG 8.1",
              "title": "Biểu thức tọa độ của các phép toán vectơ trong Oxyz",
              "difficulty": "NB",
              "details": {
                "theory": "1. Hệ trục tọa độ chuẩn $Oxyz$: Gồm 3 trục $Ox, Oy, Oz$ đôi một vuông góc, mang 3 vectơ đơn vị $\\vec{i}, \\vec{j}, \\vec{k}$ thỏa mãn:\n$|\\vec{i}| = |\\vec{j}| = |\\vec{k}| = 1$ và $\\vec{i} \\cdot \\vec{j} = \\vec{j} \\cdot \\vec{k} = \\vec{k} \\cdot \\vec{i} = 0$.\nVectơ $\\vec{u} = (x; y; z) \\iff \\vec{u} = x\\vec{i} + y\\vec{j} + z\\vec{k}$.\n2. Cho $\\vec{u} = (x_1; y_1; z_1)$ và $\\vec{v} = (x_2; y_2; z_2)$:\n- Phép cộng / trừ: $\\vec{u} \\pm \\vec{v} = (x_1 \\pm x_2; y_1 \\pm y_2; z_1 \\pm z_2)$.\n- Phép nhân với số thực $k \\in \\mathbb{R}$: $k\\vec{u} = (kx_1; ky_1; kz_1)$.\n- Hai vectơ bằng nhau: $\\vec{u} = \\vec{v} \\iff x_1 = x_2, y_1 = y_2, z_1 = z_2$.\n- Tích vô hướng: $\\vec{u} \\cdot \\vec{v} = x_1x_2 + y_1y_2 + z_1z_2$.\n- Độ dài vectơ: $|\\vec{u}| = \\sqrt{x_1^2 + y_1^2 + z_1^2} \\ge 0$ (đẳng thức $=0 \\iff \\vec{u} = \\vec{0}$).\n- Hai vectơ vuông góc: $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = x_1x_2 + y_1y_2 + z_1z_2 = 0$.\n- Điều kiện hai vectơ cùng phương: Cho $\\vec{v} \\ne \\vec{0}$. $\\vec{u}$ cùng phương $\\vec{v} \\iff \\exists k \\in \\mathbb{R}: \\vec{u} = k\\vec{v} \\iff x_1 = kx_2, y_1 = ky_2, z_1 = kz_2$. Khi $x_2, y_2, z_2 \\ne 0$: $\\frac{x_1}{x_2} = \\frac{y_1}{y_2} = \\frac{z_1}{z_2} = k$.",
                "signs": "Tìm tọa độ vectơ tổng, hiệu, tính tích vô hướng, độ dài vectơ hoặc tìm điều kiện để hai vectơ vuông góc / cùng phương.",
                "methods": "Bước 1: Xác định chính xác tọa độ các vectơ thành phần.\nBước 2: Thực hiện phép toán đại số tương ứng trên từng thành phần tọa độ $x, y, z$.\nBước 3: Sử dụng máy tính Casio [MENU 5] (VECTOR) để kiểm tra kết quả.",
                "mistakes": "Cộng nhầm tọa độ $x$ với $y$. Chia cho 0 khi áp dụng tỉ số cùng phương mà không xét trường hợp có thành phần tọa độ bằng 0.",
                "sampleQuestion": {
                  "code": "Q24_D6_MC",
                  "content": "Trong Oxyz, cho $\\vec{a}=(1;2;-3)$ và $\\vec{b}=(2;0;1)$. Tọa độ vectơ $\\vec{u} = 2\\vec{a} + \\vec{b}$ là gì?",
                  "answer": "(4; 4; -5)",
                  "casio": "Vào [MENU 5] Vector: nhập VctA, VctB rồi tính 2*VctA + VctB."
                }
              }
            },
            {
              "id": "MT_2_2_2",
              "code": "DẠNG 8.2",
              "title": "Tọa độ trung điểm, trọng tâm tam giác & trọng tâm tứ diện",
              "difficulty": "NB",
              "details": {
                "theory": "1. Vectơ tạo bởi hai điểm $A(x_A; y_A; z_A)$ và $B(x_B; y_B; z_B)$:\n$\\vec{AB} = (x_B - x_A; y_B - y_A; z_B - z_A)$. Hai điểm phân biệt $\\iff \\vec{AB} \\ne \\vec{0}$.\n2. Tọa độ trung điểm $M$ của đoạn thẳng $AB$:\n$M = \\left( \\frac{x_A + x_B}{2}; \\frac{y_A + y_B}{2}; \\frac{z_A + z_B}{2} \\right)$.\n3. Tọa độ trọng tâm $G$ của tam giác $ABC$ (điều kiện $A, B, C$ không thẳng hàng):\n$G = \\left( \\frac{x_A + x_B + x_C}{3}; \\frac{y_A + y_B + y_C}{3}; \\frac{z_A + z_B + z_C}{3} \\right)$.\n4. Tọa độ trọng tâm $G$ của tứ diện $ABCD$ (điều kiện $A, B, C, D$ không đồng phẳng):\n$G = \\left( \\frac{x_A + x_B + x_C + x_D}{4}; \\frac{y_A + y_B + y_C + y_D}{4}; \\frac{z_A + z_B + z_C + z_D}{4} \\right)$.\n5. Điều kiện 3 điểm thẳng hàng: $A, B, C$ thẳng hàng $\\iff \\vec{AB}$ cùng phương $\\vec{AC} \\iff \\exists k \\in \\mathbb{R}: \\vec{AB} = k\\vec{AC}$.",
                "signs": "Cho tọa độ các điểm trong $Oxyz$, yêu cầu tìm tọa độ trung điểm, trọng tâm tam giác, trọng tâm tứ diện hoặc điểm thứ tư của hình bình hành.",
                "methods": "Bước 1: Ghi rõ công thức trung bình cộng tương ứng (chia 2 cho trung điểm, chia 3 cho tam giác, chia 4 cho tứ diện).\nBước 2: Thay số cẩn thận, chú ý dấu âm của tọa độ.\nBước 3: Với hình bình hành $ABCD$: áp dụng tính chất hai đường chéo cắt nhau tại trung điểm $\\implies A + C = B + D \\implies D = A + C - B$.",
                "mistakes": "Lấy tọa độ gốc trừ ngọn khi tính vectơ $\\vec{AB}$ (phải lấy $B - A$). Nhầm chia 2 của trung điểm khi tính trọng tâm tam giác (phải chia 3).",
                "sampleQuestion": {
                  "code": "Q25_D6_MC",
                  "content": "Trong Oxyz, cho $A(1; 2; 3), B(3; -2; 1)$. Tọa độ trung điểm M của đoạn thẳng AB là gì?",
                  "answer": "B. $M(2; 0; 2)$"
                }
              }
            },
            {
              "id": "MT_2_2_3",
              "code": "DẠNG 8.3",
              "title": "Khoảng cách, hình chiếu vuông góc & Điểm đối xứng",
              "difficulty": "TH",
              "details": {
                "theory": "1. Khoảng cách giữa hai điểm $A(x_A; y_A; z_A)$ và $B(x_B; y_B; z_B)$:\n$AB = |\\vec{AB}| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2 + (z_B - z_A)^2}$.\nĐiều kiện: Biểu thức dưới căn luôn không âm $\\ge 0$; $AB = 0 \\iff A \\equiv B$.\n2. Tọa độ hình chiếu vuông góc của điểm $M(x_0; y_0; z_0)$:\n- Lên các mặt phẳng tọa độ:\n  + Lên $(Oxy): z = 0 \\implies M_1(x_0; y_0; 0)$; khoảng cách $d(M, (Oxy)) = |z_0|$.\n  + Lên $(Oyz): x = 0 \\implies M_2(0; y_0; z_0)$; khoảng cách $d(M, (Oyz)) = |x_0|$.\n  + Lên $(Ozx): y = 0 \\implies M_3(x_0; 0; z_0)$; khoảng cách $d(M, (Ozx)) = |y_0|$.\n- Lên các trục tọa độ:\n  + Lên trục $Ox \\implies M_x(x_0; 0; 0)$; khoảng cách $d(M, Ox) = \\sqrt{y_0^2 + z_0^2}$.\n  + Lên trục $Oy \\implies M_y(0; y_0; 0)$; khoảng cách $d(M, Oy) = \\sqrt{x_0^2 + z_0^2}$.\n  + Lên trục $Oz \\implies M_z(0; 0; z_0)$; khoảng cách $d(M, Oz) = \\sqrt{x_0^2 + y_0^2}$.\n3. Tọa độ điểm đối xứng của $M(x_0; y_0; z_0)$:\n- Qua mặt phẳng $(Oxy) \\implies M'(x_0; y_0; -z_0)$.\n- Qua trục $Ox \\implies M''(x_0; -y_0; -z_0)$.\n- Qua gốc tọa độ $O \\implies M'''(-x_0; -y_0; -z_0)$.",
                "signs": "Tìm tọa độ hình chiếu vuông góc, điểm đối xứng của một điểm qua các trục tọa độ hoặc các mặt phẳng tọa độ; tính khoảng cách giữa hai điểm.",
                "methods": "Bước 1: Xác định đối tượng chiếu hoặc đối xứng (trục hay mặt phẳng).\nBước 2: Áp dụng quy tắc vàng:\n- Hình chiếu: 'Khuyết trục nào thì tọa độ trục đó bằng 0'.\n- Điểm đối xứng: 'Khuyết trục nào thì tọa độ trục đó đổi dấu'.\nBước 3: Viết tọa độ kết quả và tính khoảng cách nếu đề bài yêu cầu.",
                "mistakes": "Đổi dấu cả các thành phần tọa độ không bị khuyết khi tìm điểm đối xứng.",
                "sampleQuestion": {
                  "code": "Q28_D6_TH",
                  "content": "Trong Oxyz, hình chiếu vuông góc của điểm $M(2; -3; 5)$ lên mặt phẳng $(Oxy)$ có tọa độ là gì?",
                  "answer": "M'(2; -3; 0)"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_2_3",
          "number": "09",
          "title": "Tích có hướng và ứng dụng hình học không gian",
          "subtitle": "Tích có hướng · Thể tích · Mặt cầu · Tâm tỉ cự",
          "color": "violet",
          "mathTypes": [
            {
              "id": "MT_2_3_1",
              "code": "DẠNG 9.1",
              "title": "Tích có hướng & Điều kiện cùng phương, đồng phẳng",
              "difficulty": "TH",
              "details": {
                "theory": "Cho hai vectơ $\\vec{u} = (u_1; u_2; u_3)$ và $\\vec{v} = (v_1; v_2; v_3)$. Tích có hướng $[\\vec{u}, \\vec{v}]$ là một vectơ xác định bởi định thức cấp hai:\n$[\\vec{u}, \\vec{v}] = \\left( \\begin{vmatrix} u_2 & u_3 \\\\ v_2 & v_3 \\end{vmatrix}; \\begin{vmatrix} u_3 & u_1 \\\\ v_3 & v_1 \\end{vmatrix}; \\begin{vmatrix} u_1 & u_2 \\\\ v_1 & v_2 \\end{vmatrix} \\right) = (u_2v_3 - u_3v_2; u_3v_1 - u_1v_3; u_1v_2 - u_2v_1)$.\n- Tính chất trực giao: $[\\vec{u}, \\vec{v}] \\perp \\vec{u}$ và $[\\vec{u}, \\vec{v}] \\perp \\vec{v} \\iff [\\vec{u}, \\vec{v}] \\cdot \\vec{u} = 0$ và $[\\vec{u}, \\vec{v}] \\cdot \\vec{v} = 0$.\n- Điều kiện hai vectơ cùng phương: $\\vec{u}, \\vec{v}$ cùng phương $\\iff [\\vec{u}, \\vec{v}] = \\vec{0} = (0; 0; 0)$.\n- Điều kiện ba điểm thẳng hàng: $A, B, C$ thẳng hàng $\\iff [\\vec{AB}, \\vec{AC}] = \\vec{0}$.\n- Điều kiện ba vectơ đồng phẳng: Ba vectơ $\\vec{u}, \\vec{v}, \\vec{w}$ đồng phẳng $\\iff [\\vec{u}, \\vec{v}] \\cdot \\vec{w} = 0$.\n- Điều kiện bốn điểm đồng phẳng: Bốn điểm $A, B, C, D$ đồng phẳng $\\iff [\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} = 0$.",
                "signs": "Kiểm tra tính thẳng hàng của 3 điểm, tính đồng phẳng của 4 điểm hoặc tìm vectơ pháp tuyến của mặt phẳng đi qua 3 điểm.",
                "methods": "Bước 1: Tính tọa độ các vectơ liên quan.\nBước 2: Sử dụng chức năng VECTOR của máy tính Casio ([MENU 5]) để gán VctA, VctB.\nBước 3: Thực hiện phép nhân có hướng VctA $\\times$ VctB.\nBước 4: Kiểm tra điều kiện bằng vectơ $\\vec{0}$ hoặc tính tích vô hướng với vectơ thứ ba để kiểm tra điều kiện bằng 0.",
                "mistakes": "Tính nhầm dấu ở tọa độ thứ hai (tung độ) khi tính bằng tay: thành phần $y = u_3v_1 - u_1v_3 = -(u_1v_3 - u_3v_1)$ có dấu trừ phía trước.",
                "sampleQuestion": {
                  "code": "CH2_D6_TF01",
                  "content": "Trong Oxyz, cho $A(1;0;2), B(2;-1;3), C(0;2;1)$. Tính diện tích tam giác ABC?",
                  "answer": "S = \\frac{\\sqrt{2}}{2}",
                  "casio": "Bấm [MENU 5] nhập VctA, VctB rồi tính 0.5 * Abs(VctA $\\times$ VctB)."
                }
              }
            },
            {
              "id": "MT_2_3_2",
              "code": "DẠNG 9.2",
              "title": "Ứng dụng tính diện tích tam giác & Thể tích tứ diện, khối hộp",
              "difficulty": "TH",
              "details": {
                "theory": "1. Diện tích tam giác $ABC$:\n$S_{\\Delta ABC} = \\frac{1}{2} |[\\vec{AB}, \\vec{AC}]|$.\nĐiều kiện tam giác không suy biến: Ba điểm $A, B, C$ không thẳng hàng $\\iff [\\vec{AB}, \\vec{AC}] \\ne \\vec{0} \\implies S_{\\Delta ABC} > 0$.\n2. Diện tích hình bình hành $ABCD$: $S_{ABCD} = |[\\vec{AB}, \\vec{AD}]|$.\n3. Thể tích khối tứ diện $ABCD$:\n$V_{ABCD} = \\frac{1}{6} |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|$.\nĐiều kiện tứ diện không suy biến: Bốn điểm $A, B, C, D$ không đồng phẳng $\\iff [\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} \\ne 0 \\implies V_{ABCD} > 0$.\n4. Thể tích khối hộp $ABCD.A'B'C'D'$: $V = |[\\vec{AB}, \\vec{AD}] \\cdot \\vec{AA'}| > 0$.\n5. Chiều cao hạ từ đỉnh $D$ của tứ diện $ABCD$: $h_D = \\frac{3V_{ABCD}}{S_{\\Delta ABC}} = \\frac{|[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|}{|[\\vec{AB}, \\vec{AC}]|}$ với điều kiện $|[\\vec{AB}, \\vec{AC}]| > 0$.",
                "signs": "Tính diện tích tam giác trong không gian, tính thể tích khối tứ diện, khối hộp hoặc tính chiều cao kẻ từ một đỉnh của tứ diện.",
                "methods": "Bước 1: Tính tọa độ các vectơ chung gốc $A$: $\\vec{AB}, \\vec{AC}, \\vec{AD}$.\nBước 2: Bấm Casio [MENU 5]: Nhập VctA, VctB, VctC.\nBước 3: Diện tích tam giác: Bấm $0.5 \\times \\text{Abs}(\\text{VctA} \\times \\text{VctB})$.\nBước 4: Thể tích tứ diện: Bấm $\\frac{1}{6} \\times \\text{Abs}((\\text{VctA} \\times \\text{VctB}) \\cdot \\text{VctC})$.",
                "mistakes": "Nhầm lẫn giữa hệ số $1/2$ của diện tích tam giác và hệ số $1/6$ của thể tích khối tứ diện. Quên dấu trị tuyệt đối bên ngoài tích hỗn tạp dẫn đến kết quả thể tích bị âm.",
                "sampleQuestion": {
                  "code": "Q42_D6_SA",
                  "content": "Trong Oxyz, cho $A(1;0;0), B(0;2;0), C(0;0;3), D(2;1;4)$. Tính thể tích khối tứ diện ABCD?",
                  "answer": "17/6 \\approx 2.8"
                }
              }
            },
            {
              "id": "MT_2_3_3",
              "code": "DẠNG 9.3",
              "title": "Khoảng cách từ điểm đến đường thẳng trong không gian",
              "difficulty": "VD",
              "details": {
                "theory": "1. Khoảng cách từ điểm đến đường thẳng:\nCho đường thẳng $\\Delta$ đi qua điểm $A(x_A; y_A; z_A)$ và có vectơ chỉ phương $\\vec{u} = (a; b; c)$.\nĐIỀU KIỆN VECTƠ CHỈ PHƯƠNG KHÁC $\\vec{0}$: $\\vec{u} \\ne \\vec{0} \\iff |\\vec{u}| = \\sqrt{a^2 + b^2 + c^2} > 0$.\nKhoảng cách từ điểm $M(x_M; y_M; z_M)$ đến đường thẳng $\\Delta$:\n$d(M, \\Delta) = \\frac{|[\\vec{AM}, \\vec{u}]|}{|\\vec{u}|}$. (Điều kiện mẫu $|\\vec{u}| > 0$; $d(M, \\Delta) = 0 \\iff M \\in \\Delta$).\n2. Khoảng cách giữa hai đường thẳng chéo nhau $\\Delta_1$ (qua $A$, VCP $\\vec{u}_1 \\ne \\vec{0}$) và $\\Delta_2$ (qua $B$, VCP $\\vec{u}_2 \\ne \\vec{0}$):\nĐiều kiện chéo nhau: $[\\vec{u}_1, \\vec{u}_2] \\cdot \\vec{AB} \\ne 0 \\implies [\\vec{u}_1, \\vec{u}_2] \\ne \\vec{0}$.\n$d(\\Delta_1, \\Delta_2) = \\frac{|[\\vec{u}_1, \\vec{u}_2] \\cdot \\vec{AB}|}{|[\\vec{u}_1, \\vec{u}_2]|}$ (mẫu số $|[\\vec{u}_1, \\vec{u}_2]| > 0$).",
                "signs": "Tính khoảng cách từ điểm $M$ đến đường thẳng $\\Delta$, hoặc tính khoảng cách giữa hai đường thẳng chéo nhau trong không gian $Oxyz$.",
                "methods": "Bước 1: Xác định tọa độ điểm $A \\in \\Delta$ và vectơ chỉ phương $\\vec{u}$.\nBước 2: Tính vectơ $\\vec{AM}$.\nBước 3: Tính tích có hướng $[\\vec{AM}, \\vec{u}]$ và độ dài $|[\\vec{AM}, \\vec{u}]|$.\nBước 4: Chia cho độ dài của vectơ chỉ phương $|\\vec{u}|$.",
                "mistakes": "Nhầm lẫn công thức khoảng cách đến đường thẳng (dùng tích có hướng) với công thức khoảng cách đến mặt phẳng (dùng tích vô hướng).",
                "sampleQuestion": {
                  "code": "CH12_D7_SA01",
                  "content": "Trạm phát sóng tại $A(2;4;5)$. Máy bay bay thẳng từ $B(0;10;2)$ đến $C(6;1;8)$. Khoảng cách ngắn nhất từ máy bay đến trạm là bao nhiêu?",
                  "answer": "3.48 km"
                }
              }
            },
            {
              "id": "MT_2_3_4",
              "code": "DẠNG 9.4",
              "title": "Phương trình mặt cầu (S) trong không gian Oxyz",
              "difficulty": "TH",
              "details": {
                "theory": "1. Phương trình chính tắc của mặt cầu $(S)$ tâm $I(a; b; c)$, bán kính $R > 0$:\n$(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$.\n2. Phương trình tổng quát: $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$.\nĐIỀU KIỆN TỒN TẠI MẶT CẦU:\nPhương trình trên là phương trình mặt cầu khi và chỉ khi:\n$R^2 = a^2 + b^2 + c^2 - d > 0$.\nKhi đó mặt cầu có tâm $I(a; b; c)$ và bán kính $R = \\sqrt{a^2 + b^2 + c^2 - d}$.\n- Nếu $a^2 + b^2 + c^2 - d = 0$: tập hợp chỉ là 1 điểm $I(a; b; c)$ (mặt cầu suy biến bán kính 0).\n- Nếu $a^2 + b^2 + c^2 - d < 0$: tập hợp là tập rỗng $\\emptyset$.\n3. Trường hợp hệ số trước $x^2, y^2, z^2$ là $A \\ne 0$: $Ax^2 + Ay^2 + Az^2 + 2Bx + 2Cy + 2Dz + E = 0$. Bắt buộc chia cả hai vế cho $A$ trước khi xác định tâm $I(-B/A; -C/A; -D/A)$ và áp dụng điều kiện.",
                "signs": "Xác định tâm và bán kính mặt cầu, tìm điều kiện tham số $m$ để phương trình là phương trình mặt cầu, hoặc viết phương trình mặt cầu đường kính $AB$.",
                "methods": "Bước 1: Đưa phương trình về dạng hệ số trước $x^2, y^2, z^2$ bằng 1.\nBước 2: Tìm $a, b, c$ bằng cách chia các hệ số của $x, y, z$ cho $-2$.\nBước 3: Xác định hệ số tự do $d$.\nBước 4: Thiết lập điều kiện tồn tại mặt cầu: $a^2 + b^2 + c^2 - d > 0$.\nBước 5: Tính bán kính $R = \\sqrt{a^2 + b^2 + c^2 - d}$.",
                "mistakes": "Quên chia cho hệ số $A$ khi phương trình có dạng $2x^2 + 2y^2 + 2z^2...$ dẫn đến tính sai tâm và bán kính. Quên điều kiện $R^2 > 0$ lấy cả dấu bằng.",
                "sampleQuestion": {
                  "code": "Q27_D6_MC",
                  "content": "Mặt cầu $(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 16$ có tâm $I$ và bán kính $R$ là gì?",
                  "answer": "C. $I(1; -2; 3)$ và $R = 4$"
                }
              }
            },
            {
              "id": "MT_2_3_5",
              "code": "DẠNG 9.5",
              "title": "Cực trị biểu thức vectơ & Phương pháp Tâm tỉ cự",
              "difficulty": "VDC",
              "details": {
                "theory": "1. Định lý Tâm tỉ cự: Cho hệ gồm $n$ điểm $A_1, A_2, \\dots, A_n$ và $n$ số thực $k_1, k_2, \\dots, k_n$.\nĐIỀU KIỆN TỒN TẠI DUY NHẤT TÂM TỈ CỰ:\n$\\sum_{i=1}^n k_i = k_1 + k_2 + \\dots + k_n \\ne 0$.\nKhi đó tồn tại DUY NHẤT một điểm $I$ trong không gian thỏa mãn:\n$\\sum_{i=1}^n k_i \\vec{IA_i} = k_1\\vec{IA_1} + k_2\\vec{IA_2} + \\dots + k_n\\vec{IA_n} = \\vec{0}$.\nTọa độ điểm $I$ được xác định bởi: $x_I = \\frac{\\sum k_i x_{A_i}}{\\sum k_i}, y_I = \\frac{\\sum k_i y_{A_i}}{\\sum k_i}, z_I = \\frac{\\sum k_i z_{A_i}}{\\sum k_i}$.\n2. Biến đổi biểu thức vectơ:\n- Độ dài vectơ: $\\left| \\sum_{i=1}^n k_i \\vec{MA_i} \\right| = \\left| \\left( \\sum_{i=1}^n k_i \\right) \\vec{MI} \\right| = \\left| \\sum_{i=1}^n k_i \\right| \\cdot MI$.\n- Biểu thức nhỏ nhất $\\iff MI$ ngắn nhất $\\iff M$ là hình chiếu vuông góc của điểm $I$ lên đường thẳng hoặc mặt phẳng chứa điểm $M$.\n- Tổng bình phương khoảng cách: $\\sum_{i=1}^n k_i MA_i^2 = \\left( \\sum_{i=1}^n k_i \\right) MI^2 + \\sum_{i=1}^n k_i IA_i^2$ (đạt cực tiểu khi $MI$ nhỏ nhất).",
                "signs": "Tìm điểm $M$ thuộc mặt phẳng tọa độ $(Oxy)$ hoặc mặt cầu $(S)$ sao cho $|\\vec{MA} + 2\\vec{MB} - \\vec{MC}|$ hoặc $MA^2 + 2MB^2 - MC^2$ đạt giá trị nhỏ nhất.",
                "methods": "Bước 1: Kiểm tra điều kiện tổng các hệ số: $\\sum k_i \\ne 0$.\nBước 2: Tìm tọa độ điểm tâm tỉ cự $I$ theo công thức trọng số.\nBước 3: Rút gọn biểu thức về dạng $|\\sum k_i| \\cdot MI$ hoặc $(\\sum k_i)MI^2 + C$.\nBước 4: Tìm điểm $M$ trên miền giới hạn sao cho khoảng cách $MI$ ngắn nhất (hình chiếu vuông góc của $I$ lên mặt phẳng hoặc giao điểm với mặt cầu).",
                "mistakes": "Tính sai mẫu số tổng hệ số $\\sum k_i$. Áp dụng tâm tỉ cự khi tổng các hệ số $\\sum k_i = 0$ (khi đó biểu thức là vectơ không đổi, không phụ thuộc điểm $M$).",
                "sampleQuestion": {
                  "code": "Q42_D6_SA",
                  "content": "Trong Oxyz, cho $A(1;0;0), B(0;2;0), C(0;0;3)$. Tìm tọa độ trọng tâm $G$ của tam giác ABC?",
                  "answer": "G(1/3; 2/3; 1)"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_3_1",
          "number": "10",
          "title": "Tọa độ hóa Oxyz giải bài toán cực trị không gian thực tế",
          "subtitle": "Radar chuyển động · Vị trí đường ống · Khối đa diện",
          "color": "terracotta",
          "mathTypes": [
            {
              "id": "MT_3_1_1",
              "code": "DẠNG 10.1",
              "title": "Khoảng cách ngắn nhất giữa hai vật thể chuyển động theo t",
              "difficulty": "VD",
              "details": {
                "theory": "Mô hình chuyển động trong không gian $Oxyz$:\n- Vật thể $M_1(t) = (x_1 + a_1t; y_1 + b_1t; z_1 + c_1t)$ và $M_2(t) = (x_2 + a_2t; y_2 + b_2t; z_2 + c_2t)$.\n- Điều kiện chuyển động thực tế: Các vectơ vận tốc phải khác vectơ-không: $\\vec{v}_1 = (a_1; b_1; c_1) \\ne \\vec{0}$ ($a_1^2 + b_1^2 + c_1^2 > 0$) và $\\vec{v}_2 = (a_2; b_2; c_2) \\ne \\vec{0}$ ($a_2^2 + b_2^2 + c_2^2 > 0$) với tốc độ chuyển động $v_1 = |\\vec{v}_1| > 0$ và $v_2 = |\\vec{v}_2| > 0$.\n- Điều kiện thời gian thực tế: $t \\in [t_{\\min}; t_{\\max}]$ với $t \\ge 0$ (thời gian không âm).\n- Hàm khoảng cách: $d(t) = |\\vec{M_1M_2}| = \\sqrt{f(t)}$ với:\n$f(t) = [(x_2 - x_1) + (a_2 - a_1)t]^2 + [(y_2 - y_1) + (b_2 - b_1)t]^2 + [(z_2 - z_1) + (c_2 - c_1)t]^2 \\ge 0, \\; \\forall t$.\n- Biểu thức $f(t) = At^2 + Bt + C$ là tam thức bậc hai với hệ số $A = |\\vec{v}_2 - \\vec{v}_1|^2 = (a_2-a_1)^2 + (b_2-b_1)^2 + (c_2-c_1)^2 \\ge 0$.\n- Nếu hai vật thể có vận tốc khác nhau ($\\vec{v}_1 \\ne \\vec{v}_2 \\iff \\vec{v}_2 - \\vec{v}_1 \\ne \\vec{0}$) thì $A > 0$, parabol quay bề lõm lên trên.\n- Nếu hai vật thể có cùng vận tốc ($\\vec{v}_1 = \\vec{v}_2$) thì khoảng cách không đổi: $d(t) = |\\vec{M_1(0)M_2(0)}| = \\text{const}$.\n- Vì hàm căn bậc hai $y = \\sqrt{u}$ đồng biến trên $[0; +\\infty)$ nên: $\\min d(t) = \\sqrt{\\min f(t)}$ trên miền $t \\in [t_{\\min}; t_{\\max}]$.\n- Đỉnh parabol tại $t_0 = -\\frac{B}{2A}$. So sánh giá trị $t_0$ với đoạn $[t_{\\min}; t_{\\max}]$ để kết luận thời điểm và khoảng cách ngắn nhất.",
                "signs": "Bài toán thực tế hai máy bay bay theo đường thẳng, hai tàu thủy di chuyển trên biển, tìm khoảng cách an toàn ngắn nhất và thời điểm đạt khoảng cách đó.",
                "methods": "Bước 1: Chọn gốc tọa độ $O$ và các trục $Ox, Oy, Oz$ phù hợp với bài toán thực tế.\nBước 2: Viết phương trình chuyển động của từng vật thể theo tham số thời gian $t \\ge 0$ với các vectơ vận tốc $\\vec{v}_1, \\vec{v}_2 \\ne \\vec{0}$.\nBước 3: Thiết lập hàm bình phương khoảng cách $f(t) = d^2(t) = At^2 + Bt + C$.\nBước 4: Tìm đỉnh parabol $t_0 = -B/(2A)$. Nếu $t_0$ thuộc miền thời gian thì $\\min = \\sqrt{f(t_0)}$; nếu $t_0 < 0$ thì $\\min$ đạt tại $t = 0$.\nBước 5: Bấm Table Casio để kiểm tra lại giá trị nhỏ nhất.",
                "mistakes": "Quên điều kiện thực tế của thời gian $t \\ge 0$. Nếu đỉnh parabol rơi vào vùng âm $t_0 < 0$ mà vẫn lấy $t_0$ thì sẽ bị sai bản chất thực tế (khi đó khoảng cách ngắn nhất đạt tại $t = 0$).",
                "sampleQuestion": {
                  "code": "Q43_D7_TF",
                  "content": "Một trạm rada đặt tại $O(0;0;0)$. Drone bay theo $M(t) = (10+2t; 5-t; 2+t)$ (km) với $t \\ge 0$. Khoảng cách ngắn nhất bằng bao nhiêu?",
                  "answer": "\\sqrt{129} \\approx 11{,}36 km (đạt tại t = 0 vì f'(t) > 0 với mọi t >= 0)"
                }
              }
            },
            {
              "id": "MT_3_1_2",
              "code": "DẠNG 10.2",
              "title": "Tối ưu hóa vị trí đường ống / cáp điện qua mặt đất (Điểm đối xứng)",
              "difficulty": "VD",
              "details": {
                "theory": "Bài toán: Cho hai điểm $A(x_A; y_A; z_A)$ và $B(x_B; y_B; z_B)$ và mặt phẳng $(\\alpha): Ax + By + Cz + D = 0$ ($A^2+B^2+C^2 > 0$). Tìm điểm $M \\in (\\alpha)$ sao cho tổng khoảng cách $MA + MB$ nhỏ nhất.\n- ĐIỀU KIỆN VỊ TRÍ TƯƠNG ĐỐI:\n  + Xét dấu của $f(A) = Ax_A + By_A + Cz_A + D$ và $f(B) = Ax_B + By_B + Cz_B + D$.\n  + Trường hợp 1 (Khác phía): $f(A) \\cdot f(B) < 0 \\implies$ Đoạn thẳng $AB$ cắt $(\\alpha)$ tại $M_0$. Khi đó với mọi $M \\in (\\alpha)$: $MA + MB \\ge AB$. Đẳng thức xảy ra khi và chỉ khi $M \\equiv M_0 = AB \\cap (\\alpha)$.\n  + Trường hợp 2 (Cùng phía): $f(A) \\cdot f(B) > 0$. Lấy điểm $A'$ đối xứng với $A$ qua mặt phẳng $(\\alpha)$ (khi đó $A'A \\perp (\\alpha)$ và trung điểm của $A'A$ thuộc $(\\alpha)$). Khi đó $A'$ và $B$ nằm khác phía đối với $(\\alpha)$, và $MA = MA'$.\n    Ta có: $MA + MB = MA' + MB \\ge A'B$.\n    Giá trị nhỏ nhất bằng $A'B$, đạt được khi và chỉ khi $M = A'B \\cap (\\alpha)$.\n  + Với mặt phẳng $(Oxy): z = 0$: $A, B$ cùng phía khi $z_A \\cdot z_B > 0$; điểm đối xứng của $A(x_A; y_A; z_A)$ là $A'(x_A; y_A; -z_A)$.",
                "signs": "Bài toán lắp đặt trạm trung chuyển trên mặt đất, đặt đường ống dẫn dầu nối hai mỏ dầu qua bờ sông, kéo đường dây điện chi phí ngắn nhất.",
                "methods": "Bước 1: Kiểm tra hai điểm $A, B$ nằm cùng phía hay khác phía so với mặt phẳng phản xạ.\nBước 2: Nếu cùng phía: Tìm tọa độ điểm đối xứng $A'$ của $A$ qua mặt phẳng.\nBước 3: Chiều dài ngắn nhất chính là độ dài đoạn thẳng $A'B = \\sqrt{(x_B-x_{A'})^2 + (y_B-y_{A'})^2 + (z_B-z_{A'})^2}$.\nBước 4: Viết phương trình đường thẳng $A'B$ và tìm giao điểm với mặt phẳng nếu đề bài yêu cầu tìm vị trí đặt trạm.",
                "mistakes": "Không kiểm tra tính cùng phía/khác phía mà tính trực tiếp độ dài $AB$ khi hai điểm cùng phía, dẫn đến đường ống không đi qua mặt đất.",
                "sampleQuestion": {
                  "code": "Q26_D7_SA",
                  "content": "Đường ống nối $A(0;2;3)$ và $B(6;8;5)$ qua điểm $P$ trên mặt phẳng $z = 0$. Độ dài ngắn nhất của tuyến đường ống bằng bao nhiêu km?",
                  "answer": "11.7 km (lấy điểm đối xứng $A'(0;2;-3) \\implies A'B = \\sqrt{6^2+6^2+8^2} = \\sqrt{136} \\approx 11{,}7$ km)"
                }
              }
            },
            {
              "id": "MT_3_1_3",
              "code": "DẠNG 10.3",
              "title": "Tọa độ hóa khối đa diện (Lăng trụ, Chóp) giải bài toán thực tế",
              "difficulty": "VDC",
              "details": {
                "theory": "Phương pháp tọa độ hóa khối hình học không gian:\n- ĐIỀU KIỆN CHỌN HỆ TRỤC: Gốc tọa độ $O$ phải đặt tại một đỉnh hoặc chân đường cao có 3 đường thẳng chứa 3 tia $Ox, Oy, Oz$ ĐÔI MỘT VUÔNG GÓC ($\\vec{i} \\cdot \\vec{j} = 0, \\vec{j} \\cdot \\vec{k} = 0, \\vec{k} \\cdot \\vec{i} = 0$) và chuẩn hóa độ dài đơn vị $|\\vec{i}| = |\\vec{j}| = |\\vec{k}| = 1$.\n- Chuyển bài toán hình học cổ điển thành bài toán giải tích tọa độ:\n  1. Khoảng cách giữa hai đường thẳng chéo nhau $\\Delta_1$ (qua $A$, VCP $\\vec{u}_1$) và $\\Delta_2$ (qua $B$, VCP $\\vec{u}_2$):\n     $d(\\Delta_1, \\Delta_2) = \\frac{|[\\vec{u}_1, \\vec{u}_2] \\cdot \\vec{AB}|}{|[\\vec{u}_1, \\vec{u}_2]|}$ (với điều kiện $[\\vec{u}_1, \\vec{u}_2] \\ne \\vec{0}$).\n  2. Góc giữa hai mặt phẳng $(\\alpha)$ và $(\\beta)$ có VTPT $\\vec{n}_1 \\ne \\vec{0}, \\vec{n}_2 \\ne \\vec{0}$:\n     $\\cos((\\alpha), (\\beta)) = \\frac{|\\vec{n}_1 \\cdot \\vec{n}_2|}{|\\vec{n}_1| \\cdot |\\vec{n}_2|}$ ($0^\\circ \\le \\text{góc} \\le 90^\\circ$).\n  3. Khoảng cách từ điểm $M$ đến mặt phẳng $(P): Ax + By + Cz + D = 0$ ($A^2+B^2+C^2 > 0$):\n     $d(M, (P)) = \\frac{|Ax_M + By_M + Cz_M + D|}{\\sqrt{A^2 + B^2 + C^2}}$.",
                "signs": "Mô hình kiến trúc thực tế tòa nhà, mái che sân vận động, khung giàn thép hình chóp/lăng trụ yêu cầu tính góc dốc, khoảng cách lắp đặt xà gồ.",
                "methods": "Bước 1: Chọn gốc $O$ tại đỉnh có 3 cạnh đôi một vuông góc (hoặc chân đường vuông góc kẻ từ đỉnh xuống đáy).\nBước 2: Xác định tọa độ của tất cả các đỉnh liên quan theo kích thước đề bài cho.\nBước 3: Viết vectơ chỉ phương của các đường thẳng và vectơ pháp tuyến của các mặt phẳng (dùng tích có hướng).\nBước 4: Áp dụng công thức giải tích tọa độ để tính góc hoặc khoảng cách.",
                "mistakes": "Chọn gốc tọa độ tại vị trí không có 3 đường đôi một vuông góc dẫn đến sai toàn bộ hệ quy chiếu. Nhầm lẫn công thức góc giữa hai mặt phẳng (dùng trị tuyệt đối tích vô hướng) với góc giữa hai vectơ.",
                "sampleQuestion": {
                  "code": "CH12_D7_VD03",
                  "content": "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có $AB=1, AD=2, AA'=3$. Tính khoảng cách giữa hai đường thẳng $AC$ và $B'D'$?",
                  "answer": "3.0 (bằng độ dài đoạn vuông góc chung $AA' = 3$)"
                }
              }
            }
          ]
        }
      ]
    }
  ]
};
