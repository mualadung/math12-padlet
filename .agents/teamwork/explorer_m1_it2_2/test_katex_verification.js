const katex = require('katex');

const theory41 = `1. Tiệm cận ngang: Đường thẳng $y = y_0$ là tiệm cận ngang của đồ thị hàm số $y = f(x)$ nếu ít nhất một trong các điều kiện sau được thỏa mãn:
$\\lim_{x \\to +\\infty} f(x) = y_0$ hoặc $\\lim_{x \\to -\\infty} f(x) = y_0$.
Điều kiện tiên quyết: Tập xác định $D$ phải không bị chặn trên (để có $x \\to +\\infty$) hoặc không bị chặn dưới (để có $x \\to -\\infty$).
2. Tiệm cận đứng: Đường thẳng $x = x_0$ là tiệm cận đứng của đồ thị hàm số $y = f(x)$ nếu ít nhất một trong các điều kiện sau được thỏa mãn:
$\\lim_{x \\to x_0^+} f(x) = \\pm \\infty$ hoặc $\\lim_{x \\to x_0^-} f(x) = \\pm \\infty$.
Điều kiện tiên quyết: Điểm $x_0$ phải là điểm tụ của $D$ (tức hàm số xác định trên ít nhất một khoảng kề bên $x_0$).
3. Hàm phân thức $y = \\frac{P(x)}{Q(x)}$:
- Điều kiện xác định: Mẫu thức khác không, tức $Q(x) \\ne 0$. Tập xác định: $D = \\{x \\in \\mathbb{R} \\mid Q(x) \\ne 0\\}$.
- Đường thẳng $x = x_0$ là tiệm cận đứng $\\iff Q(x_0) = 0$ ($x_0 \\notin D$ và $x_0$ là điểm tụ của $D$) và sau khi triệt tiêu mọi nhân tử chung với tử số $P(x)$, nghiệm $x_0$ vẫn còn ở mẫu thức (bậc của nhân tử $(x - x_0)$ ở mẫu lớn hơn ở tử $\\implies \\lim_{x \\to x_0^\\pm} \\frac{P(x)}{Q(x)} = \\pm \\infty$).`;

const methods41 = `Bước 1: Tìm tập xác định $D$ (giải điều kiện mẫu thức khác 0: $Q(x) \\ne 0 \\implies D = \\{x \\in \\mathbb{R} \\mid Q(x) \\ne 0\\}$).
Bước 2: Tiệm cận ngang: So sánh bậc của $P(x)$ và $Q(x)$ khi $x \\to \\pm \\infty$:
- Bậc tử < Bậc mẫu $\\implies y = 0$.
- Bậc tử = Bậc mẫu $\\implies y = a_n / b_n$.
- Bậc tử > Bậc mẫu $\\implies$ Không có TCN.
Bước 3: Tiệm cận đứng: Giải phương trình mẫu số $Q(x) = 0$. Rút gọn nhân tử chung với tử số $P(x)$ để xác định các nghiệm thực sự làm mẫu triệt tiêu.`;

const theory43 = `1. Định nghĩa: Đường thẳng $y = ax + b$ ($a \\ne 0$) là tiệm cận xiên của đồ thị hàm số $y = f(x)$ nếu:
$\\lim_{x \\to +\\infty} [f(x) - (ax + b)] = 0$ hoặc $\\lim_{x \\to -\\infty} [f(x) - (ax + b)] = 0$.
Hệ số xác định bởi công thức Cauchy: $a = \\lim_{x \\to \\pm\\infty} \\frac{f(x)}{x}$ ($a \\ne 0$) và $b = \\lim_{x \\to \\pm\\infty} [f(x) - ax]$.
2. Hàm phân thức bậc hai trên bậc nhất $y = \\frac{ax^2+bx+c}{px+q}$:
- Điều kiện xác định: Mẫu thức khác không $px + q \\ne 0 \\iff x \\ne -\\frac{q}{p}$. Tập xác định: $D = \\mathbb{R} \\setminus \\left\\{-\\frac{q}{p}\\right\\}$.
- Điều kiện tồn tại tiệm cận xiên: $a \\ne 0, \\; p \\ne 0$ và điều kiện không suy biến $aq^2 - bpq + cp^2 \\ne 0$ (tử số không chia hết cho mẫu số, phần dư $r \\ne 0$).
- Thực hiện phép chia đa thức tử cho mẫu:
$y = \\left(\\frac{a}{p}x + \\frac{bp - aq}{p^2}\\right) + \\frac{r}{px+q}$ với phần dư $r = \\frac{aq^2 - bpq + cp^2}{p^2} \\ne 0$.
- Do $\\lim_{x \\to \\pm\\infty} \\frac{r}{px+q} = 0$, phương trình đường tiệm cận xiên là: $y = \\frac{a}{p}x + \\frac{bp - aq}{p^2}$ (hệ số góc $a/p \\ne 0$).
- Đồ thị còn có đúng 1 tiệm cận đứng là đường thẳng $x = -\\frac{q}{p}$.`;

const methods43 = `Bước 1: Tìm tập xác định $D = \\mathbb{R} \\setminus \\left\\{-\\frac{q}{p}\\right\\}$ (điều kiện mẫu $px + q \\ne 0 \\iff x \\ne -\\frac{q}{p}$). Kiểm tra bậc tử lớn hơn bậc mẫu đúng 1 bậc và tử không chia hết cho mẫu ($aq^2 - bpq + cp^2 \\ne 0$).
Bước 2: Thực hiện phép chia đa thức tử cho mẫu để tách thành dạng $y = mx + n + \\frac{r}{px+q}$.
Bước 3: Phần thương bậc nhất $y = mx + n$ chính là phương trình đường tiệm cận xiên.
Bước 4: Bấm máy tính Casio: Dùng phép chia đa thức hoặc tính giới hạn $a = \\lim y/x$ và $b = \\lim (y - ax)$.`;

const theory101 = `Mô hình chuyển động trong không gian $Oxyz$:
- Vật thể $M_1(t) = (x_1 + a_1t; y_1 + b_1t; z_1 + c_1t)$ và $M_2(t) = (x_2 + a_2t; y_2 + b_2t; z_2 + c_2t)$.
- Điều kiện chuyển động thực tế: Các vectơ vận tốc phải khác vectơ-không: $\\vec{v}_1 = (a_1; b_1; c_1) \\ne \\vec{0}$ ($a_1^2 + b_1^2 + c_1^2 > 0$) và $\\vec{v}_2 = (a_2; b_2; c_2) \\ne \\vec{0}$ ($a_2^2 + b_2^2 + c_2^2 > 0$) với tốc độ chuyển động $v_1 = |\\vec{v}_1| > 0$ và $v_2 = |\\vec{v}_2| > 0$.
- Điều kiện thời gian thực tế: $t \\in [t_{\\min}; t_{\\max}]$ với $t \\ge 0$ (thời gian không âm).
- Hàm khoảng cách: $d(t) = |\\vec{M_1M_2}| = \\sqrt{f(t)}$ với:
$f(t) = [(x_2 - x_1) + (a_2 - a_1)t]^2 + [(y_2 - y_1) + (b_2 - b_1)t]^2 + [(z_2 - z_1) + (c_2 - c_1)t]^2 \\ge 0, \\; \\forall t$.
- Biểu thức $f(t) = At^2 + Bt + C$ là tam thức bậc hai với hệ số $A = |\\vec{v}_2 - \\vec{v}_1|^2 = (a_2-a_1)^2 + (b_2-b_1)^2 + (c_2-c_1)^2 \\ge 0$.
- Nếu hai vật thể có vận tốc khác nhau ($\\vec{v}_1 \\ne \\vec{v}_2 \\iff \\vec{v}_2 - \\vec{v}_1 \\ne \\vec{0}$) thì $A > 0$, parabol quay bề lõm lên trên.
- Nếu hai vật thể có cùng vận tốc ($\\vec{v}_1 = \\vec{v}_2$) thì khoảng cách không đổi: $d(t) = |\\vec{M_1(0)M_2(0)}| = \\text{const}$.
- Vì hàm căn bậc hai $y = \\sqrt{u}$ đồng biến trên $[0; +\\infty)$ nên: $\\min d(t) = \\sqrt{\\min f(t)}$ trên miền $t \\in [t_{\\min}; t_{\\max}]$.
- Đỉnh parabol tại $t_0 = -\\frac{B}{2A}$. So sánh giá trị $t_0$ với đoạn $[t_{\\min}; t_{\\max}]$ để kết luận thời điểm và khoảng cách ngắn nhất.`;

const allTexts = [
  { name: 'theory41', text: theory41 },
  { name: 'methods41', text: methods41 },
  { name: 'theory43', text: theory43 },
  { name: 'methods43', text: methods43 },
  { name: 'theory101', text: theory101 }
];

const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
let totalMatches = 0;
let errors = 0;

for (const item of allTexts) {
  let match;
  regex.lastIndex = 0;
  console.log(`\n=== Checking ${item.name} ===`);
  while ((match = regex.exec(item.text)) !== null) {
    totalMatches++;
    const raw = match[0];
    const isBlock = raw.startsWith('$$');
    const math = isBlock ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim();
    try {
      katex.renderToString(math, { displayMode: isBlock, throwOnError: true });
      console.log(`  [OK] ${math}`);
    } catch (e) {
      console.error(`  [FAIL] ${math}: ${e.message}`);
      errors++;
    }
  }
}

console.log(`\nResults: ${totalMatches} formulas verified, ${errors} errors.`);
if (errors === 0) {
  console.log('SUCCESS: All formulas in all 5 text blocks pass strict KaTeX validation!');
} else {
  process.exit(1);
}
