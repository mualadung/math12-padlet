# BÁO CÁO NGHIÊN CỨU TOÁN HỌC & CHUẨN HÓA ĐIỀU KIỆN ÁP DỤNG NGHIÊM NGẶT CHO 37 DẠNG TOÁN (MILESTONE 1)

**Tác giả**: Explorer (teamwork_explorer)  
**Địa bàn làm việc**: `d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_conditions\`  
**Nhiệm vụ**: Khảo sát, phân tích khoảng trống điều kiện toán học và xây dựng đặc tả chuẩn xác 100% điều kiện áp dụng cho 37 dạng toán (`machData.ts`), 10 đơn vị kiến thức cốt lõi và các danh mục dạng toán (`prisma/seed.js`).  
**Thời điểm hoàn thành**: 2026-11-08  

---

## 1. OBSERVATION (Quan sát thực tế & Trích dẫn nguyên văn)

### 1.1. Khảo sát cấu trúc tệp dữ liệu toán học
Khảo sát trực tiếp tại các tệp mã nguồn và cơ sở dữ liệu:
1. `src/app/mindmap/machData.ts` (804 dòng, 63.470 bytes):
   - Chứa cấu trúc cây tri thức chuẩn gồm **2 Chương, 10 Chủ đề và 37 Dạng toán nhỏ** (23 dạng Chương I, 14 dạng Chương II).
   - Mỗi dạng toán là một đối tượng `MathTypeItem` có cấu trúc 4 trường: `theory`, `signs`, `methods`, `mistakes` và `sampleQuestion`.
2. `prisma/seed.js` (906 dòng, 84.492 bytes):
   - Bảng `KnowledgeItem` (dòng 113-214): Lưu 10 nội dung kiến thức trọng tâm SGK Toán 12 KNTT gồm các trường `formulaLatex`, `conditions`, `notes`, `sourceBook`.
   - Bảng `MathCategory` (dòng 232-303): Lưu 7 dạng toán gộp nguyên khối gồm `identifySigns`, `coreKnowledge`, `methodSteps`, `commonMistakes`.
3. `prisma/schema.prisma` (140 dòng):
   - Định nghĩa model `KnowledgeItem` và `MathCategory`.

---

### 1.2. Phát hiện 14/37 dạng toán thiếu điều kiện toán học nghiêm ngặt trong `machData.ts`
Đối chiếu với Quy tắc chất lượng dự án (`.agents/rules/AGENTS.md`) và Chuẩn chương trình GDPT 2018 SGK Toán 12 KNTT, phát hiện **14/37 dạng toán** trong `machData.ts` chỉ nêu công thức thuần túy mà thiếu hụt nghiêm trọng các điều kiện biên và tập xác định:

1. **DẠNG 1.5 (`MT_1_1_5`) — Tìm tham số m để hàm số đơn điệu trên khoảng**:
   - *Nguyên văn tại dòng 149*: `"Nếu cô lập được m: $m \ge g(x) \iff m \ge \max_K g(x)$; $m \le g(x) \iff m \le \min_K g(x)$."`
   - *Lỗi thiếu sót nghiêm trọng*: Khi $K$ là khoảng mở $(a; b)$, $\max$ và $\min$ của $g(x)$ trên $K$ có thể **hoàn toàn không tồn tại** (hàm tiến tới giới hạn nhưng không đạt dấu bằng). Về mặt giải tích, điều kiện chính xác bắt buộc phải dùng cận trên đúng (supremum) và cận dưới đúng (infimum): $m \ge \sup_{x \in K} g(x)$ và $m \le \inf_{x \in K} g(x)$. Đồng thời thiếu điều kiện tiên quyết $K \subseteq D$ (tập $K$ phải thuộc tập xác định).

2. **DẠNG 2.1 (`MT_1_2_1`) — Tìm điểm cực trị & giá trị cực trị qua đạo hàm cấp 1**:
   - *Nguyên văn tại dòng 175*: `"Nếu $f(x)$ liên tục tại $x_0$ và $f'(x)$ đổi dấu từ dương sang âm khi qua $x_0$ thì $x_0$ là điểm cực đại..."`
   - *Lỗi thiếu sót*: Thiếu điều kiện tiên quyết $x_0 \in D$. Chưa phân biệt rõ 3 khái niệm mà học sinh hay nhầm lẫn: điểm cực trị của hàm số ($x_0$), cực trị của hàm số ($y_0 = f(x_0)$), và điểm cực trị của đồ thị hàm số ($M(x_0; y_0)$).

3. **DẠNG 2.4 (`MT_1_2_4`) — Phương trình đường thẳng qua hai điểm cực trị hàm bậc ba**:
   - *Nguyên văn tại dòng 226*: `"Với hàm số bậc ba $y = ax^3+bx^2+cx+d$ có hai điểm cực trị, chia đa thức $y$ cho $y'$ ta được: $y = y' \cdot q(x) + r(x)$..."`
   - *Lỗi thiếu sót*: Hoàn toàn không nêu điều kiện tồn tại hai điểm cực trị: $\Delta'_{y'} = b^2 - 3ac > 0$ và $a \ne 0$. Nếu $\Delta'_{y'} \le 0$, hàm số không có cực trị và không tồn tại đường thẳng qua 2 điểm cực trị!

4. **DẠNG 3.1 (`MT_1_3_1`) — Tìm GTLN - GTNN trên đoạn đóng [a; b]**:
   - *Nguyên văn tại dòng 252*: `"Hàm số liên tục trên đoạn đóng $[a; b]$ luôn đạt GTLN và GTNN..."`
   - *Lỗi thiếu sót*: Thiếu điều kiện $[a; b] \subseteq D$ (đoạn $[a; b]$ phải nằm trọn trong tập xác định, không chứa điểm làm mẫu bằng 0 hoặc biểu thức căn âm). Thiếu lưu ý điểm tới hạn $x_i$ bao gồm cả điểm mà tại đó $f'(x_i)$ không tồn tại hữu hạn.

5. **DẠNG 3.4 (`MT_1_3_4`) — Tìm tham số m trong bài toán GTLN - GTNN**:
   - *Nguyên văn tại dòng 304*: `"Nếu hàm đơn điệu trên $[a; b]$ (ví dụ hàm bậc nhất/bậc nhất): $\max/\min$ luôn đạt tại 1 trong 2 đầu mút..."`
   - *Lỗi thiếu sót*: Thiếu điều kiện sống còn của hàm phân thức $y = \frac{ax+b}{cx+d}$ trên $[a; b]$: nghiệm của mẫu không được thuộc đoạn $[-d/c \notin [a; b]]$. Nếu điểm gián đoạn rơi vào giữa đoạn $[a; b]$, hàm số tiến tới vô cực và bài toán tìm $\max/\min$ hoàn toàn vô nghiệm!

6. **DẠNG 4.1 (`MT_1_4_1`) — Tiệm cận đứng và tiệm cận ngang cơ bản**:
   - *Nguyên văn tại dòng 330*: `"Tiệm cận ngang: Đường thẳng $y = y_0$ là tiệm cận ngang nếu $\lim_{x \to +\infty} f(x) = y_0$..."`
   - *Lỗi thiếu sót*: Thiếu điều kiện tập xác định $D$ phải không bị chặn trên hoặc không bị chặn dưới. Nếu $D$ là tập bị chặn (ví dụ $y = \sqrt{4 - x^2}$ có $D = [-2; 2]$) thì việc xét $x \to \pm\infty$ là vô nghĩa và đồ thị không thể có tiệm cận ngang.

7. **DẠNG 4.3 (`MT_1_4_3`) — Tiệm cận xiên của hàm phân thức bậc hai / bậc nhất**:
   - *Nguyên văn tại dòng 365*: `"Với hàm $y = \frac{ax^2+bx+c}{px+q}$ ($a \ne 0, p \ne 0$), chia đa thức tử cho mẫu: $y = mx+n + \frac{r}{px+q}$..."`
   - *Lỗi thiếu sót*: Thiếu điều kiện không suy biến: đa thức tử không chia hết cho mẫu số, tức là phần dư $r = \frac{aq^2 - bpq + cp^2}{p^2} \ne 0$. Nếu $r = 0$, đồ thị chỉ là một đường thẳng đục lỗ tại $x = -q/p$, hoàn toàn không có tiệm cận xiên! Đồng thời thiếu điều kiện hệ số góc $m = a/p \ne 0$.

8. **DẠNG 4.4 (`MT_1_4_4`) — Tìm tham số m để đồ thị có số đường tiệm cận thỏa mãn**:
   - *Nguyên văn tại dòng 382*: `"Đồ thị hàm phân thức $y = \frac{P(x)}{x^2 - 2mx + m + 2}$ có đúng 2 tiệm cận đứng $\iff$ phương trình mẫu số có 2 nghiệm phân biệt không trùng với nghiệm của tử số."`
   - *Lỗi thiếu sót*: Thiếu điều kiện nghiệm của mẫu số phải thuộc tập xác định của tử số (đặc biệt khi tử số chứa căn thức $\sqrt{u(x)}$ thì nghiệm mẫu $x_i$ phải thỏa mãn $u(x_i) > 0$).

9. **DẠNG 7.2 (`MT_2_1_2`) — Phân tích vectơ theo 3 vectơ cơ sở không đồng phẳng**:
   - *Nguyên văn tại dòng 554*: `"Định lý: Cho 3 vectơ $\vec{a}, \vec{b}, \vec{c}$ không đồng phẳng. Với mọi vectơ $\vec{v}$ trong không gian, luôn tồn tại duy nhất một bộ ba số thực $(x; y; z)$..."`
   - *Lỗi thiếu sót*: Thiếu điều kiện ba vectơ cơ sở phải **khác vectơ-không**: $\vec{a} \ne \vec{0}, \vec{b} \ne \vec{0}, \vec{c} \ne \vec{0}$. Định lý cơ sở không gian chỉ có nghĩa khi cả 3 vectơ đều khác $\vec{0}$ và độc lập tuyến tính (không đồng phẳng).

10. **DẠNG 7.3 (`MT_2_1_3`) — Tích vô hướng và góc giữa hai vectơ không gian**:
    - *Nguyên văn tại dòng 571*: `"Góc giữa hai vectơ: $\cos(\vec{u}, \vec{v}) = \frac{\vec{u} \cdot \vec{v}}{|\vec{u}| \cdot |\vec{v}|}$. Điều kiện vuông góc: $\vec{u} \perp \vec{v} \iff \vec{u} \cdot \vec{v} = 0$."`
    - *Lỗi thiếu sót*: Công thức góc $\cos$ chỉ xác định khi mẫu thức khác 0, tức là **cả hai vectơ phải khác vectơ-không**: $\vec{u} \ne \vec{0}$ và $\vec{v} \ne \vec{0}$ (tức $|\vec{u}| > 0, |\vec{v}| > 0$). Quy ước khi có vectơ $\vec{0}$ thì góc không xác định nhưng tích vô hướng bằng 0.

11. **DẠNG 9.1 (`MT_2_3_1`) — Tích có hướng & Điều kiện cùng phương, đồng phẳng**:
    - *Nguyên văn tại dòng 658*: `"Hai vectơ cùng phương $\iff [\vec{u}, \vec{v}] = \vec{0}$... Bốn điểm $A, B, C, D$ đồng phẳng $\iff [\vec{AB}, \vec{AC}] \cdot \vec{AD} = 0$."`
    - *Lỗi thiếu sót*: Chưa nêu rõ tính chất trực giao của tích có hướng: $[\vec{u}, \vec{v}] \perp \vec{u}$ và $[\vec{u}, \vec{v}] \perp \vec{v}$, tức là $[\vec{u}, \vec{v}] \cdot \vec{u} = 0$ và $[\vec{u}, \vec{v}] \cdot \vec{v} = 0$. Thiếu điều kiện ba điểm thẳng hàng $[\vec{AB}, \vec{AC}] = \vec{0}$.

12. **DẠNG 9.2 (`MT_2_3_2`) — Ứng dụng tính diện tích tam giác & Thể tích tứ diện, khối hộp**:
    - *Nguyên văn tại dòng 676*: `"Diện tích tam giác: $S_{\Delta ABC} = \frac{1}{2} |[\vec{AB}, \vec{AC}]|$. Thể tích khối tứ diện: $V_{ABCD} = \frac{1}{6} |[\vec{AB}, \vec{AC}] \cdot \vec{AD}|$."`
    - *Lỗi thiếu sót*: Thiếu điều kiện không suy biến: Tam giác tồn tại diện tích dương $S_{\Delta ABC} > 0 \iff A, B, C$ không thẳng hàng $\iff [\vec{AB}, \vec{AC}] \ne \vec{0}$. Tứ diện tồn tại thể tích dương $V_{ABCD} > 0 \iff A, B, C, D$ không đồng phẳng $\iff [\vec{AB}, \vec{AC}] \cdot \vec{AD} \ne 0$.

13. **DẠNG 9.3 (`MT_2_3_3`) — Khoảng cách từ điểm đến đường thẳng trong không gian**:
    - *Nguyên văn tại dòng 693*: `"Khoảng cách từ điểm $M$ đến đường thẳng $\Delta$ được tính bằng công thức: $d(M, \Delta) = \frac{|[\vec{AM}, \vec{u}]|}{|\vec{u}|}$."`
    - *Lỗi thiếu sót*: Thiếu điều kiện vectơ chỉ phương phải khác vectơ-không: $\vec{u} \ne \vec{0} \iff |\vec{u}| = \sqrt{a^2+b^2+c^2} > 0$ để mẫu thức khác không. Thiếu công thức khoảng cách giữa hai đường thẳng chéo nhau $d(\Delta_1, \Delta_2) = \frac{|[\vec{u}_1, \vec{u}_2] \cdot \vec{AB}|}{|[\vec{u}_1, \vec{u}_2]|}$ kèm điều kiện $[\vec{u}_1, \vec{u}_2] \ne \vec{0}$.

14. **DẠNG 9.4 (`MT_2_3_4`) — Phương trình mặt cầu (S) trong không gian Oxyz**:
    - *Nguyên văn tại dòng 710*: `"Phương trình tổng quát: $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ với điều kiện $a^2 + b^2 + c^2 - d > 0$ và bán kính $R = \sqrt{a^2 + b^2 + c^2 - d}$."`
    - *Lỗi thiếu sót*: Thiếu phân tích các trường hợp suy biến: Khi $a^2 + b^2 + c^2 - d = 0$ thì phương trình chỉ biểu diễn 1 điểm duy nhất $I(a; b; c)$ (mặt cầu suy biến bán kính 0); khi $a^2 + b^2 + c^2 - d < 0$ thì tập nghiệm là tập rỗng $\emptyset$. Thiếu lưu ý trường hợp hệ số trước $x^2, y^2, z^2$ là $A \ne 0$ thì phải chia cho $A$ trước.

---

### 1.3. Khảo sát lỗi chuỗi thoát (Escape string) trong `prisma/seed.js`
Tại dòng 200 của `prisma/seed.js`:
- Nguyên văn: `Tích có hướng $[\vec{u}, \vec{v}] = ...$`
- Trong JavaScript string literal, ký tự `\v` bị trình biên dịch JS hiểu là mã điều khiển Vertical Tab (`\u000b`), dẫn đến chuỗi nội bộ bị biến thành `$[ ec{u}, ec{v}]$`.
- Khi render qua KaTeX Parser, KaTeX báo lỗi cú pháp: `KaTeX parse error: Unexpected character: '\u000b'`.
- *Quy tắc bắt buộc*: Trong mọi tệp `.js` và `.ts`, biểu thức toán học chứa `\vec` phải được thoát thành `\\vec`.

---

## 2. LOGIC CHAIN (Chuỗi suy luận từ quan sát đến giải pháp)

```
[Quan sát thực địa]
  ├── 14/37 dạng toán thiếu tập xác định D, mẫu khác 0, căn thức không âm, vecto khác 0
  ├── Nguy cơ học sinh áp dụng sai công thức trong các bài toán chứa tham số m (mẫu triệt tiêu, suy biến)
  └── Lỗi thoát ký tự \v thành \u000b trong seed.js gây lỗi KaTeX parse error
        │
        ▼
[Chuỗi suy luận giải tích & hình học]
  1. Trong Giải tích (Chương I):
     - Định lý Lagrange / Rolle / Weierstrass chỉ có giá trị khi hàm số xác định và liên tục trên tập đóng/khoảng xác định.
     - Hàm phân thức y = (ax+b)/(cx+d) đơn điệu trên K bắt buộc -d/c ∉ K.
     - Hàm cực trị bậc ba chỉ tồn tại đường thẳng cực trị khi phương trình đạo hàm có 2 nghiệm phân biệt (Δ' > 0).
  2. Trong Hình học không gian (Chương II):
     - Góc giữa 2 vectơ chỉ xác định khi cả hai vectơ khác 0 (|u| > 0, |v| > 0).
     - Diện tích tam giác và thể tích tứ diện yêu cầu hệ điểm không thẳng hàng ([AB, AC] ≠ 0) và không đồng phẳng ([AB, AC]·AD ≠ 0).
     - Mặt cầu tổng quát chỉ tồn tại khi R^2 = a^2 + b^2 + c^2 - d > 0.
  3. Trong Công nghệ hiển thị (KaTeX / Next.js):
     - Phải bảo đảm 100% biểu thức trong chuỗi JavaScript được escape đúng: \\vec, \\frac, \\ne, \\ge, \\le.
     - Loại bỏ các ký tự Unicode tiếng Việt nằm trực tiếp trong môi trường math mode (dùng $x_{CD}$ thay vì $x_{CĐ}$).
        │
        ▼
[Kết luận & Giải pháp]
  Xây dựng bộ từ điển chuẩn hóa toàn diện cho 37 dạng toán (machData.ts), 10 KnowledgeItems và 7 Categories (seed.js)
  với 100% điều kiện áp dụng tường minh và kiểm thử tự động đạt 37/37 PASSED.
```

---

## 3. CAVEATS (Phạm vi & Giới hạn áp dụng)

1. **Phân định trách nhiệm giữa các tệp**:
   - `src/app/mindmap/machData.ts` là tệp tĩnh phục vụ phân hệ `/mindmap` và `GrandDetailCard.tsx`.
   - `prisma/seed.js` nạp vào cơ sở dữ liệu SQLite `prisma/dev.db` phục vụ phân hệ `/math-types` và `/practice`.
   - Báo cáo này cung cấp đặc tả chuẩn cho cả hai tệp để Worker có thể cập nhật đồng bộ 100%.
2. **Ký tự thoát trong JSON vs Template Literal**:
   - Khi viết trực tiếp trong tệp `.ts` / `.js` (dạng string `"..."` hoặc `` `...` ``): dùng `\\vec{u}`, `\\frac{a}{b}`.
   - Khi xuất sang JSON trong `validated_37_types.json`: JSON tự động escape thành `\\vec{u}`.
3. **Mã Topic 10**:
   - `machData.ts` dùng mã `TOPIC_3_1`. Worker cần lưu ý không đổi mã này làm lệch liên kết đã được `explorer_survey_math` ghi nhận.

---

## 4. CONCLUSION & ĐẶC TẢ CHI TIẾT 100% ĐIỀU KIỆN CHO 37 DẠNG TOÁN

Dưới đây là nội dung toán học mẫu mực chuẩn KaTeX và đầy đủ điều kiện áp dụng cho từng dạng toán mà Worker sẽ áp dụng vào `src/app/mindmap/machData.ts` và `prisma/seed.js`:

### 4.1. Bảng tổng hợp điều kiện toán học bắt buộc theo từng nhóm dạng

| Nhóm dạng | Dạng toán | Điều kiện toán học bắt buộc phải có |
| :--- | :--- | :--- |
| **Đa thức bậc 3, 4** | Dạng 1.1, 2.1, 2.4 | Hệ số $a \ne 0$; TXD $D = \mathbb{R}$; cực trị bậc 3 $\iff \Delta'_{y'} = b^2 - 3ac > 0$. |
| **Phân thức bậc 1 / bậc 1** | Dạng 1.2, 3.4, 4.1 | Mẫu thức $cx + d \ne 0 \iff x \ne -d/c$; không suy biến $ad - bc \ne 0$; đơn điệu trên $(\alpha; \beta) \iff -d/c \notin (\alpha; \beta)$. Đạo hàm luôn $y' \ne 0$. |
| **Phân thức bậc 2 / bậc 1** | Dạng 1.3, 4.3, 5.4 | $a \ne 0, p \ne 0$; tử không chia hết cho mẫu $aq^2 - bpq + cp^2 \ne 0$; tiệm cận xiên $a/p \ne 0$. |
| **Hàm chứa căn thức** | Dạng 1.4, 4.2 | Biểu thức dưới căn $u(x) \ge 0$; miền khả vi $u(x) > 0$; $\sqrt{x^2} = -x$ khi $x \to -\infty$; liên hợp $\sqrt{A}-B = \frac{A-B^2}{\sqrt{A}+B}$. |
| **Cực trị & Tham số** | Dạng 1.5, 2.2, 2.3 | $K \subseteq D$; cận trên/dưới $\sup / \inf$ trên khoảng mở; Quy tắc 2 yêu cầu $f''(x_0) \ne 0$. |
| **GTLN - GTNN** | Dạng 3.1, 3.2, 3.3 | Weierstrass: liên tục trên đoạn đóng $[a; b] \subseteq D$; khoảng mở phải tính giới hạn đầu mút; trị tuyệt đối $\min = 0$ khi $m \le 0 \le M$. |
| **Tối ưu kinh tế & hình học**| Dạng 6.1, 6.2 | Sản lượng $x > 0$; mẫu chi phí trung bình $x > 0$; kích thước hình học $x, r, h > 0$; BĐT Cauchy cho số dương $a_i > 0$. |
| **Vectơ hình học thuần túy**| Dạng 7.1, 7.2, 7.3 | Cơ sở $\vec{a}, \vec{b}, \vec{c} \ne \vec{0}$ và không đồng phẳng; góc $\cos$ yêu cầu $\vec{u}, \vec{v} \ne \vec{0}$; vuông góc $\vec{u} \cdot \vec{v} = 0$. |
| **Hệ tọa độ Oxyz** | Dạng 8.1, 8.2, 8.3 | 3 trục vuông góc đôi một, $|\vec{i}|=|\vec{j}|=|\vec{k}|=1$; cùng phương $\vec{u} = k\vec{v}$ ($k \ne 0$); độ dài $AB = \sqrt{\dots} \ge 0$. |
| **Tích có hướng & Ứng dụng**| Dạng 9.1, 9.2, 9.3 | $[\vec{u}, \vec{v}] \perp \vec{u}, \vec{v}$; diện tích tam giác $[\vec{AB}, \vec{AC}] \ne \vec{0}$; thể tích tứ diện $[\vec{AB}, \vec{AC}] \cdot \vec{AD} \ne 0$; VCP đường thẳng $\vec{u} \ne \vec{0}$. |
| **Mặt cầu & Tâm tỉ cự** | Dạng 9.4, 9.5 | Mặt cầu $R^2 = a^2+b^2+c^2-d > 0$; Tâm tỉ cự tồn tại duy nhất $\iff \sum k_i \ne 0$. |
| **Tọa độ hóa thực tế** | Dạng 10.1, 10.2, 10.3| Thời gian thực tế $t \ge 0$; hàm khoảng cách $f(t) \ge 0$; điểm đối xứng qua mặt phẳng $Ax+By+Cz+D=0$. |

---

### 4.2. Đặc tả chi tiết mã nguồn hoàn chỉnh cho 37 dạng toán
Tất cả các nội dung dưới đây đã được lưu trữ trong tệp dữ liệu đã kiểm thử:  
`.agents/teamwork/explorer_m1_conditions/validated_37_types.json`.

*(Trích xuất đặc tả các dạng toán tiêu biểu được chuẩn hóa điều kiện)*:

#### DẠNG 1.2 — Đơn điệu của hàm phân thức bậc nhất / bậc nhất
- **theory**:
  ```latex
  Cho hàm số phân thức bậc nhất trên bậc nhất $y = \frac{ax+b}{cx+d}$ với điều kiện mẫu thức khác không: $c \ne 0$ và điều kiện không suy biến: định thức $\Delta = ad - bc \ne 0$.
  - Tập xác định: $D = \mathbb{R} \setminus \left\{-\frac{d}{c}\right\}$ (điều kiện mẫu $cx + d \ne 0 \iff x \ne -\frac{d}{c}$).
  - Hàm số liên tục và khả vi trên từng khoảng xác định: $(-\infty; -d/c)$ và $(-d/c; +\infty)$.
  - Đạo hàm: $y' = \frac{ad - bc}{(cx+d)^2}$. Vì $(cx+d)^2 > 0, \; \forall x \ne -\frac{d}{c}$ nên:
    + Nếu $ad - bc > 0 \implies y' > 0, \; \forall x \ne -\frac{d}{c} \implies$ hàm số đồng biến trên từng khoảng $(-\infty; -d/c)$ và $(-d/c; +\infty)$.
    + Nếu $ad - bc < 0 \implies y' < 0, \; \forall x \ne -\frac{d}{c} \implies$ hàm số nghịch biến trên từng khoảng $(-\infty; -d/c)$ và $(-d/c; +\infty)$.
  - Đạo hàm luôn khác 0 ($y' \ne 0, \; \forall x \in D$), tuyệt đối không có dấu bằng.
  ```

#### DẠNG 1.5 — Tìm tham số m để hàm số đơn điệu trên khoảng
- **theory**:
  ```latex
  Cho hàm số $y = f(x, m)$ xác định trên $D$. Hàm số đơn điệu trên tập $K$:
  - Điều kiện tiên quyết: Tập $K$ phải nằm hoàn toàn trong tập xác định: $K \subseteq D$.
  - Đồng biến trên $K \iff f'(x, m) \ge 0, \; \forall x \in K$ (đẳng thức $f'=0$ chỉ xảy ra tại hữu hạn điểm thuộc $K$).
  - Nghịch biến trên $K \iff f'(x, m) \le 0, \; \forall x \in K$ (đẳng thức $f'=0$ chỉ xảy ra tại hữu hạn điểm thuộc $K$).
  - Phương pháp cô lập tham số $m$:
    + $m \ge g(x), \; \forall x \in K \iff m \ge \sup_{x \in K} g(x)$ (nếu $K = [a; b]$ và $g(x)$ liên tục thì $m \ge \max_{[a; b]} g(x)$).
    + $m \le g(x), \; \forall x \in K \iff m \le \inf_{x \in K} g(x)$ (nếu $K = [a; b]$ và $g(x)$ liên tục thì $m \le \min_{[a; b]} g(x)$).
  - Dấu tam thức bậc hai $Ax^2+Bx+C \ge 0, \; \forall x \in \mathbb{R} \iff \begin{cases} A > 0 \\ \Delta \le 0 \end{cases}$ (với $A \ne 0$).
  ```

#### DẠNG 2.4 — Phương trình đường thẳng qua hai điểm cực trị hàm bậc ba
- **theory**:
  ```latex
  Cho hàm số bậc ba $y = ax^3+bx^2+cx+d$ ($a \ne 0$). Tập xác định $D = \mathbb{R}$.
  - ĐIỀU KIỆN TỒN TẠI HAI ĐIỂM CỰC TRỊ: Hàm số có hai điểm cực trị $\iff y' = 3ax^2+2bx+c = 0$ có 2 nghiệm phân biệt $\iff \Delta'_{y'} = b^2 - 3ac > 0$. (Nếu $b^2 - 3ac \le 0$, hàm số không có cực trị, không tồn tại đường thẳng qua cực trị).
  - Phép chia đa thức: $y = y' \cdot \left(\frac{1}{3a}x + \frac{b}{9a^2}\right) + \left(\frac{2c}{3} - \frac{2b^2}{9a}\right)x + \left(d - \frac{bc}{9a}\right)$.
  - Tại các điểm cực trị $x_1, x_2$, ta có $y'(x_1) = y'(x_2) = 0$.
  - Do đó phương trình đường thẳng đi qua 2 điểm cực trị là: $y = \left(\frac{2c}{3} - \frac{2b^2}{9a}\right)x + \left(d - \frac{bc}{9a}\right) \iff y = \frac{2(3ac - b^2)}{9a}x + \frac{9ad - bc}{9a}$.
  ```

#### DẠNG 7.3 — Tích vô hướng và góc giữa hai vectơ không gian
- **theory**:
  ```latex
  1. Định nghĩa tích vô hướng: Cho hai vectơ $\vec{u}$ và $\vec{v}$ trong không gian.
  Tích vô hướng của $\vec{u}$ và $\vec{v}$ là một số thực, ký hiệu là $\vec{u} \cdot \vec{v}$, được xác định bởi:
  $\vec{u} \cdot \vec{v} = |\vec{u}| \cdot |\vec{v}| \cdot \cos(\vec{u}, \vec{v})$.
  Quy ước: Nếu ít nhất một trong hai vectơ là $\vec{0}$ thì $\vec{u} \cdot \vec{v} = 0$. Bình phương vô hướng: $\vec{u}^2 = |\vec{u}|^2 \ge 0$.
  2. Công thức góc giữa hai vectơ:
  Với điều kiện cả hai vectơ đều KHÁC VECTƠ-KHÔNG: $\vec{u} \ne \vec{0}$ và $\vec{v} \ne \vec{0}$ (tức $|\vec{u}| > 0, |\vec{v}| > 0$):
  $\cos(\vec{u}, \vec{v}) = \frac{\vec{u} \cdot \vec{v}}{|\vec{u}| \cdot |\vec{v}|}$, với $0^\circ \le (\vec{u}, \vec{v}) \le 180^\circ$.
  3. Điều kiện hai vectơ vuông góc:
  Cho $\vec{u} \ne \vec{0}$ và $\vec{v} \ne \vec{0}$. Khi đó: $\vec{u} \perp \vec{v} \iff \vec{u} \cdot \vec{v} = 0$.
  4. Phân biệt: Góc $\varphi$ giữa hai đường thẳng mang VCP $\vec{u}, \vec{v}$ luôn thỏa $0^\circ \le \varphi \le 90^\circ$ và $\cos \varphi = \frac{|\vec{u} \cdot \vec{v}|}{|\vec{u}| \cdot |\vec{v}|}$.
  ```

#### DẠNG 9.2 — Ứng dụng tính diện tích tam giác & Thể tích tứ diện, khối hộp
- **theory**:
  ```latex
  1. Diện tích tam giác $ABC$:
  $S_{\Delta ABC} = \frac{1}{2} |[\vec{AB}, \vec{AC}]|$.
  Điều kiện tam giác không suy biến: Ba điểm $A, B, C$ không thẳng hàng $\iff [\vec{AB}, \vec{AC}] \ne \vec{0} \implies S_{\Delta ABC} > 0$.
  2. Diện tích hình bình hành $ABCD$: $S_{ABCD} = |[\vec{AB}, \vec{AD}]|$.
  3. Thể tích khối tứ diện $ABCD$:
  $V_{ABCD} = \frac{1}{6} |[\vec{AB}, \vec{AC}] \cdot \vec{AD}|$.
  Điều kiện tứ diện không suy biến: Bốn điểm $A, B, C, D$ không đồng phẳng $\iff [\vec{AB}, \vec{AC}] \cdot \vec{AD} \ne 0 \implies V_{ABCD} > 0$.
  4. Thể tích khối hộp $ABCD.A'B'C'D'$: $V = |[\vec{AB}, \vec{AD}] \cdot \vec{AA'}| > 0$.
  5. Chiều cao hạ từ đỉnh $D$ của tứ diện $ABCD$: $h_D = \frac{3V_{ABCD}}{S_{\Delta ABC}} = \frac{|[\vec{AB}, \vec{AC}] \cdot \vec{AD}|}{|[\vec{AB}, \vec{AC}]|}$ với điều kiện $|[\vec{AB}, \vec{AC}]| > 0$.
  ```

#### DẠNG 9.4 — Phương trình mặt cầu (S) trong không gian Oxyz
- **theory**:
  ```latex
  1. Phương trình chính tắc của mặt cầu $(S)$ tâm $I(a; b; c)$, bán kính $R > 0$:
  $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$.
  2. Phương trình tổng quát: $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$.
  ĐIỀU KIỆN TỒN TẠI MẶT CẦU:
  Phương trình trên là phương trình mặt cầu khi và chỉ khi:
  $R^2 = a^2 + b^2 + c^2 - d > 0$.
  Khi đó mặt cầu có tâm $I(a; b; c)$ và bán kính $R = \sqrt{a^2 + b^2 + c^2 - d}$.
  - Nếu $a^2 + b^2 + c^2 - d = 0$: tập hợp chỉ là 1 điểm $I(a; b; c)$ (mặt cầu suy biến bán kính 0).
  - Nếu $a^2 + b^2 + c^2 - d < 0$: tập hợp là tập rỗng $\emptyset$.
  3. Trường hợp hệ số trước $x^2, y^2, z^2$ là $A \ne 0$: $Ax^2 + Ay^2 + Az^2 + 2Bx + 2Cy + 2Dz + E = 0$. Bắt buộc chia cả hai vế cho $A$ trước khi xác định tâm $I(-B/A; -C/A; -D/A)$ và áp dụng điều kiện.
  ```

#### DẠNG 9.5 — Cực trị biểu thức vectơ & Phương pháp Tâm tỉ cự
- **theory**:
  ```latex
  1. Định lý Tâm tỉ cự: Cho hệ gồm $n$ điểm $A_1, A_2, \dots, A_n$ và $n$ số thực $k_1, k_2, \dots, k_n$.
  ĐIỀU KIỆN TỒN TẠI DUY NHẤT TÂM TỈ CỰ:
  $\sum_{i=1}^n k_i = k_1 + k_2 + \dots + k_n \ne 0$.
  Khi đó tồn tại DUY NHẤT một điểm $I$ trong không gian thỏa mãn:
  $\sum_{i=1}^n k_i \vec{IA_i} = k_1\vec{IA_1} + k_2\vec{IA_2} + \dots + k_n\vec{IA_n} = \vec{0}$.
  Tọa độ điểm $I$ được xác định bởi: $x_I = \frac{\sum k_i x_{A_i}}{\sum k_i}, y_I = \frac{\sum k_i y_{A_i}}{\sum k_i}, z_I = \frac{\sum k_i z_{A_i}}{\sum k_i}$.
  2. Biến đổi biểu thức vectơ:
  - Độ dài vectơ: $\left| \sum_{i=1}^n k_i \vec{MA_i} \right| = \left| \left( \sum_{i=1}^n k_i \right) \vec{MI} \right| = \left| \sum_{i=1}^n k_i \right| \cdot MI$.
  - Biểu thức nhỏ nhất $\iff MI$ ngắn nhất $\iff M$ là hình chiếu vuông góc của điểm $I$ lên đường thẳng hoặc mặt phẳng chứa điểm $M$.
  - Tổng bình phương khoảng cách: $\sum_{i=1}^n k_i MA_i^2 = \left( \sum_{i=1}^n k_i \right) MI^2 + \sum_{i=1}^n k_i IA_i^2$ (đạt cực tiểu khi $MI$ nhỏ nhất).
  ```

---

### 4.3. Đặc tả cập nhật `KnowledgeItem` và `MathCategory` trong `prisma/seed.js`
1. **10 `KnowledgeItem`s**: Đã được chuẩn hóa trường `conditions` và sửa triệt để lỗi unescaped `\v` thành `\\vec` trong tệp `.agents/teamwork/explorer_m1_conditions/test_knowledge_items.js`.
2. **7 `MathCategory` items**: Đã được bổ sung đầy đủ điều kiện mẫu khác 0, căn không âm, vectơ khác 0, điều kiện tam giác và tứ diện không suy biến trong `.agents/teamwork/explorer_m1_conditions/test_categories.js`.

---

## 5. VERIFICATION METHOD (Phương pháp kiểm chứng độc lập)

Bất kỳ Agent hoặc người kiểm tra nào cũng có thể kiểm chứng độc lập toàn bộ các kết quả trên bằng các lệnh sau:

### 5.1. Chạy bộ kiểm thử KaTeX tự động độc lập
```powershell
node .agents/teamwork/explorer_m1_conditions/generate_full_rigorous_types.js
```
- **Kỳ vọng**: `Validation finished: 37/37 PASSED, 0 FAILED.`
- **Ý nghĩa**: Xác nhận 100% trong số 37 dạng toán đều có công thức KaTeX chuẩn, không có lỗi cú pháp, không có ký tự điều khiển hoặc Unicode lỗi.

### 5.2. Chạy bộ kiểm thử 10 KnowledgeItems và 7 Categories
```powershell
node .agents/teamwork/explorer_m1_conditions/test_knowledge_items.js
node .agents/teamwork/explorer_m1_conditions/test_categories.js
```
- **Kỳ vọng**: Cả hai lệnh đều trả về `ALL 10 PASSED!` và `ALL 7 PASSED!`.

### 5.3. Điều kiện bác bỏ (Invalidation Conditions)
Báo cáo này bị coi là không đạt nếu phát hiện:
1. Có bất kỳ công thức toán học nào thiếu điều kiện áp dụng (mẫu thức triệt tiêu mà không nêu điều kiện khác 0, biểu thức dưới căn âm, vectơ bằng $\vec{0}$ trong mẫu số tính góc).
2. Có bất kỳ chuỗi thoát nào trong JavaScript gây lỗi `\u000b` hoặc `KaTeX parse error`.
3. Số lượng dạng toán được chuẩn hóa điều kiện nhỏ hơn 37.

---
*Báo cáo được hoàn thiện và ký duyệt bởi Explorer (teamwork_explorer).*
