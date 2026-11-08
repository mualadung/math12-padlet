# BÁO CÁO ĐIỀU TRA KHẢO SÁT & ĐẶC TẢ ĐIỀU KIỆN TOÁN HỌC (EXPLORER HANDOFF REPORT)
## KHẮC PHỤC TRIỆT ĐỂ CÁC ĐIỀU KIỆN TOÁN HỌC TRONG `src/app/mindmap/machData.ts` (MILESTONE 1 - ITERATION 2)

- **Người thực hiện**: Explorer (`teamwork_explorer`)
- **Vai trò**: investigation, synthesis
- **Thư mục làm việc**: `d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_it2_2\`
- **Milestone**: Milestone 1 — Iteration 2 (Remediation of Challenger 1 findings)
- **Caller (Orchestrator)**: `51012427-609d-48ef-a8a3-ce0355def37c`
- **Thời điểm hoàn thành**: 2026-11-08T06:05:00Z
- **Trạng thái**: ✅ **SẴN SÀNG CHUYỂN GIAO CHO WORKER M1 TRIỂN KHAI**

---

## 1. OBSERVATION (QUAN SÁT TRỰC ĐỊA & BẰNG CHỨNG THỰC NGHIỆM)

Thực hiện kiểm tra trực tiếp mã nguồn `src/app/mindmap/machData.ts` và đối chiếu với báo cáo thẩm định đối kháng của Challenger 1 (`.agents/teamwork/challenger_m1_1/handoff.md`), ghi nhận các phát hiện cụ thể tại từng phân dạng toán:

### 1.1. DẠNG 4.1 (`MT_1_4_1` - Tiệm cận đứng và tiệm cận ngang cơ bản)
- **Vị trí**: `src/app/mindmap/machData.ts`, dòng 324 đến dòng 341.
- **Nội dung hiện tại (`details.theory`)**:
  ```typescript
  "theory": "1. Tiệm cận ngang: Đường thẳng $y = y_0$ là tiệm cận ngang của đồ thị hàm số $y = f(x)$ nếu ít nhất một trong các điều kiện sau được thỏa mãn:\n$\\lim_{x \\to +\\infty} f(x) = y_0$ hoặc $\\lim_{x \\to -\\infty} f(x) = y_0$.\nĐiều kiện tiên quyết: Tập xác định $D$ phải không bị chặn trên (để có $x \\to +\\infty$) hoặc không bị chặn dưới (để có $x \\to -\\infty$).\n2. Tiệm cận đứng: Đường thẳng $x = x_0$ là tiệm cận đứng của đồ thị hàm số $y = f(x)$ nếu ít nhất một trong các điều kiện sau được thỏa mãn:\n$\\lim_{x \\to x_0^+} f(x) = \\pm \\infty$ hoặc $\\lim_{x \\to x_0^-} f(x) = \\pm \\infty$.\nĐiều kiện tiên quyết: Điểm $x_0$ phải là điểm tụ của $D$ (tức hàm số xác định trên ít nhất một khoảng kề bên $x_0$).\n3. Hàm phân thức $y = \\frac{P(x)}{Q(x)}$: $x = x_0$ là TCĐ $\\iff Q(x_0) = 0$ và sau khi triệt tiêu mọi nhân tử chung với tử số $P(x)$, nghiệm $x_0$ vẫn còn ở mẫu thức.",
  ```
- **Hiện tượng thiếu sót**:
  - Tại mục 3, hàm phân thức $y = \frac{P(x)}{Q(x)}$ được đưa ra mà **hoàn toàn không nêu điều kiện tồn tại của phân thức (mẫu thức khác 0: $Q(x) \ne 0$)** và không nêu **Tập xác định $D = \{x \in \mathbb{R} \mid Q(x) \ne 0\}$**.
  - Phần `methods` ở Bước 1 ghi `"Bước 1: Tìm tập xác định $D$."` mà chưa giải thích rõ điều kiện giải $Q(x) \ne 0$.

### 1.2. DẠNG 4.3 (`MT_1_4_3` - Tiệm cận xiên của hàm phân thức bậc hai / bậc nhất)
- **Vị trí**: `src/app/mindmap/machData.ts`, dòng 360 đến dòng 375.
- **Nội dung hiện tại (`details.theory`)**:
  ```typescript
  "theory": "1. Định nghĩa: Đường thẳng $y = ax + b$ ($a \\ne 0$) là tiệm cận xiên của đồ thị hàm số $y = f(x)$ nếu:\n$\\lim_{x \\to +\\infty} [f(x) - (ax + b)] = 0$ hoặc $\\lim_{x \\to -\\infty} [f(x) - (ax + b)] = 0$.\nHệ số xác định bởi công thức Cauchy: $a = \\lim_{x \\to \\pm\\infty} \\frac{f(x)}{x}$ ($a \\ne 0$) và $b = \\lim_{x \\to \\pm\\infty} [f(x) - ax]$.\n2. Hàm phân thức bậc hai trên bậc nhất $y = \\frac{ax^2+bx+c}{px+q}$:\n- Điều kiện: $a \\ne 0, \\; p \\ne 0$ và $aq^2 - bpq + cp^2 \\ne 0$ (tử số không chia hết cho mẫu số).\n- Thực hiện phép chia đa thức tử cho mẫu:\n$y = \\left(\\frac{a}{p}x + \\frac{bp - aq}{p^2}\\right) + \\frac{r}{px+q}$ với phần dư $r \\ne 0$.\n- Do $\\lim_{x \\to \\pm\\infty} \\frac{r}{px+q} = 0$, phương trình đường tiệm cận xiên là: $y = \\frac{a}{p}x + \\frac{bp - aq}{p^2}$ (hệ số góc $a/p \\ne 0$).",
  ```
- **Hiện tượng thiếu sót**:
  - Tại mục 2, điều kiện chỉ ghi $a \ne 0, p \ne 0$ và tử không chia hết cho mẫu ($aq^2 - bpq + cp^2 \ne 0$), nhưng **bỏ sót hoàn toàn điều kiện xác định của mẫu thức $px + q \ne 0 \iff x \ne -q/p$** và **Tập xác định $D = \mathbb{R} \setminus \{-q/p\}$**.
  - Phần `methods` ở Bước 1 ghi `"Bước 1: Kiểm tra bậc tử lớn hơn bậc mẫu 1 bậc..."` mà bỏ quên bước tìm tập xác định $D$.

### 1.3. DẠNG 10.1 (`MT_3_1_1` - Khoảng cách ngắn nhất giữa hai vật thể chuyển động theo t)
- **Vị trí**: `src/app/mindmap/machData.ts`, dòng 748 đến dòng 763.
- **Nội dung hiện tại (`details.theory`)**:
  ```typescript
  "theory": "Mô hình chuyển động trong không gian $Oxyz$:\n- Vật thể $M_1(t) = (x_1 + a_1t; y_1 + b_1t; z_1 + c_1t)$ và $M_2(t) = (x_2 + a_2t; y_2 + b_2t; z_2 + c_2t)$.\n- Điều kiện thời gian thực tế: $t \\in [t_{\\min}; t_{\\max}]$ với $t \\ge 0$ (thời gian không âm).\n- Hàm khoảng cách: $d(t) = |\\vec{M_1M_2}| = \\sqrt{f(t)}$ với:\n$f(t) = [(x_2 - x_1) + (a_2 - a_1)t]^2 + [(y_2 - y_1) + (b_2 - b_1)t]^2 + [(z_2 - z_1) + (c_2 - c_1)t]^2 \\ge 0, \\; \\forall t$.\n- Biểu thức $f(t) = At^2 + Bt + C$ là tam thức bậc hai với $A = (a_2-a_1)^2 + (b_2-b_1)^2 + (c_2-c_1)^2 \\ge 0$.\n- Nếu hai vật thể di chuyển theo hai hướng vận tốc không cùng phương thì $A > 0$.\n- Vì hàm căn bậc hai $y = \\sqrt{u}$ đồng biến trên $[0; +\\infty)$ nên: $\\min d(t) = \\sqrt{\\min f(t)}$ trên miền $t \\in [t_{\\min}; t_{\\max}]$.\n- Đỉnh parabol tại $t_0 = -\\frac{B}{2A}$. So sánh giá trị $t_0$ với đoạn $[t_{\\min}; t_{\\max}]$ để kết luận thời điểm và khoảng cách ngắn nhất.",
  ```
- **Hiện tượng thiếu sót**:
  - Mô hình chuyển động của vật thể thực tế $M_1(t)$ và $M_2(t)$ có các vectơ vận tốc là $\vec{v}_1 = (a_1; b_1; c_1)$ và $\vec{v}_2 = (a_2; b_2; c_2)$, nhưng **chưa nêu điều kiện hiển nhiên của vật thể chuyển động thực tế là các vectơ vận tốc phải khác vectơ-không ($\vec{v}_1, \vec{v}_2 \ne \vec{0} \iff a_i^2 + b_i^2 + c_i^2 > 0$) với tốc độ $v_1, v_2 > 0$**.
  - Phần `methods` ở Bước 2 cũng chưa nêu điều kiện các vectơ vận tốc $\vec{v}_1, \vec{v}_2 \ne \vec{0}$.

---

## 2. LOGIC CHAIN (CHUỖI LẬP LUẬN TỪ QUAN SÁT ĐẾN GIẢI PHÁP)

1. **Chuẩn mực SGK Toán 12 KNTT & Tiêu chí Dự án**:
   - Theo Mục III (Quy tắc 1 của Project Rules): *"Bắt buộc nêu rõ điều kiện: Bất kỳ công thức hay định lý nào đều phải kèm Tập xác định ($D$), điều kiện hàm số liên tục, khả vi, mẫu thức khác $0$... Trong hình học không gian tọa độ: điều kiện vectơ khác vectơ-không ($\vec{a} \ne \vec{0}$)..."*.
   - Việc thiếu vắng các điều kiện này khiến học liệu chưa đạt độ hoàn thiện mức 90–100 điểm, dễ làm học sinh mất điểm trong các câu trắc nghiệm Đúng/Sai hoặc bẫy câu hỏi thi THPT.

2. **Tính khép kín và an toàn của KaTeX Parser**:
   - Đã kiểm tra cách bộ phân tích `MathRenderer.tsx` tách biểu thức theo regex `/(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g`.
   - Các công thức KaTeX nội dòng (`$...$`) không được chứa ký tự xuống dòng `\n`. Do đó, mọi công thức bổ sung phải nằm gọn gàng trên một dòng text hoặc sử dụng block math `$$...$$` độc lập.
   - Khi viết trong tệp TypeScript (`machData.ts`), các ký tự gạch chéo ngược phải được nhân đôi (`\\ne`, `\\frac`, `\\mathbb{R}`, `\\left\\{...\\right\\}`).

3. **Thực nghiệm Kiểm chứng KaTeX Strict Renderer**:
   - Đã thiết lập harness kiểm thử `test_katex_verification.js` nạp trực tiếp toàn bộ 5 đoạn văn bản đề xuất với 89 biểu thức KaTeX độc lập và chạy `katex.renderToString(math, { throwOnError: true })`.
   - **Kết quả thực nghiệm**: 89/89 biểu thức KaTeX vượt qua kiểm thử với 0 lỗi cú pháp.

---

## 3. CAVEATS (CÁC VẤN ĐỀ CẦN LƯU Ý & GIỚI HẠN PHẠM VI)

1. **Quyền hạn vai trò Explorer**:
   - Explorer là vai trò nghiên cứu, khảo sát (Read-Only). Explorer **không can thiệp sửa trực tiếp** vào `src/app/mindmap/machData.ts`, mà cung cấp mã nguồn thay thế chính xác từng dòng (Drop-in Replacement) cho Worker M1.
2. **Các lỗi khác do Challenger 1 ghi nhận**:
   - Bên cạnh 3 phân dạng toán cần bổ sung điều kiện, Challenger 1 cũng ghi nhận 7 lỗi cú pháp KaTeX (`$iff` thay vì `$\iff$` tại dòng 658 và 676; `$min$` thay vì `$\min$` tại dòng 304). Trong báo cáo này, Explorer đính kèm thêm khuyến nghị drop-in cho các vị trí này để Worker M1 hoàn thiện một lượt dứt điểm Milestone 1.

---

## 4. CONCLUSION & ĐẶC TẢ CHI TIẾT DÀNH CHO WORKER M1 (ACTIONABLE PROPOSALS)

Dưới đây là đặc tả mã nguồn chính xác từng dòng dành cho Worker M1 để thay thế vào `src/app/mindmap/machData.ts`:

### 4.1. ĐẶC TẢ DROP-IN CHO DẠNG 4.1 (`MT_1_4_1` - Dòng 325 đến 333)

#### **BEFORE (Hiện tại)**:
```typescript
            {
              "id": "MT_1_4_1",
              "code": "DẠNG 4.1",
              "title": "Tiệm cận đứng và tiệm cận ngang cơ bản",
              "difficulty": "NB",
              "details": {
                "theory": "1. Tiệm cận ngang: Đường thẳng $y = y_0$ là tiệm cận ngang của đồ thị hàm số $y = f(x)$ nếu ít nhất một trong các điều kiện sau được thỏa mãn:\n$\\lim_{x \\to +\\infty} f(x) = y_0$ hoặc $\\lim_{x \\to -\\infty} f(x) = y_0$.\nĐiều kiện tiên quyết: Tập xác định $D$ phải không bị chặn trên (để có $x \\to +\\infty$) hoặc không bị chặn dưới (để có $x \\to -\\infty$).\n2. Tiệm cận đứng: Đường thẳng $x = x_0$ là tiệm cận đứng của đồ thị hàm số $y = f(x)$ nếu ít nhất một trong các điều kiện sau được thỏa mãn:\n$\\lim_{x \\to x_0^+} f(x) = \\pm \\infty$ hoặc $\\lim_{x \\to x_0^-} f(x) = \\pm \\infty$.\nĐiều kiện tiên quyết: Điểm $x_0$ phải là điểm tụ của $D$ (tức hàm số xác định trên ít nhất một khoảng kề bên $x_0$).\n3. Hàm phân thức $y = \\frac{P(x)}{Q(x)}$: $x = x_0$ là TCĐ $\\iff Q(x_0) = 0$ và sau khi triệt tiêu mọi nhân tử chung với tử số $P(x)$, nghiệm $x_0$ vẫn còn ở mẫu thức.",
                "signs": "Hàm phân thức hữu tỉ $y = \\frac{P(x)}{Q(x)}$, hỏi số lượng đường tiệm cận đứng, ngang hoặc phương trình của chúng.",
                "methods": "Bước 1: Tìm tập xác định $D$.\nBước 2: Tiệm cận ngang: So sánh bậc của $P(x)$ và $Q(x)$ khi $x \\to \\pm \\infty$:\n- Bậc tử < Bậc mẫu $\\implies y = 0$.\n- Bậc tử = Bậc mẫu $\\implies y = a_n / b_n$.\n- Bậc tử > Bậc mẫu $\\implies$ Không có TCN.\nBước 3: Tiệm cận đứng: Giải phương trình mẫu số $Q(x) = 0$. Rút gọn nhân tử chung với tử số $P(x)$ để xác định các nghiệm thực sự làm mẫu triệt tiêu.",
```

#### **AFTER (Đề xuất thay thế cho Worker M1)**:
```typescript
            {
              "id": "MT_1_4_1",
              "code": "DẠNG 4.1",
              "title": "Tiệm cận đứng và tiệm cận ngang cơ bản",
              "difficulty": "NB",
              "details": {
                "theory": "1. Tiệm cận ngang: Đường thẳng $y = y_0$ là tiệm cận ngang của đồ thị hàm số $y = f(x)$ nếu ít nhất một trong các điều kiện sau được thỏa mãn:\n$\\lim_{x \\to +\\infty} f(x) = y_0$ hoặc $\\lim_{x \\to -\\infty} f(x) = y_0$.\nĐiều kiện tiên quyết: Tập xác định $D$ phải không bị chặn trên (để có $x \\to +\\infty$) hoặc không bị chặn dưới (để có $x \\to -\\infty$).\n2. Tiệm cận đứng: Đường thẳng $x = x_0$ là tiệm cận đứng của đồ thị hàm số $y = f(x)$ nếu ít nhất một trong các điều kiện sau được thỏa mãn:\n$\\lim_{x \\to x_0^+} f(x) = \\pm \\infty$ hoặc $\\lim_{x \\to x_0^-} f(x) = \\pm \\infty$.\nĐiều kiện tiên quyết: Điểm $x_0$ phải là điểm tụ của $D$ (tức hàm số xác định trên ít nhất một khoảng kề bên $x_0$).\n3. Hàm phân thức $y = \\frac{P(x)}{Q(x)}$:\n- Điều kiện xác định: Mẫu thức khác không, tức $Q(x) \\ne 0$. Tập xác định: $D = \\{x \\in \\mathbb{R} \\mid Q(x) \\ne 0\\}$.\n- Đường thẳng $x = x_0$ là tiệm cận đứng $\\iff Q(x_0) = 0$ ($x_0 \\notin D$ và $x_0$ là điểm tụ của $D$) và sau khi triệt tiêu mọi nhân tử chung với tử số $P(x)$, nghiệm $x_0$ vẫn còn ở mẫu thức (bậc của nhân tử $(x - x_0)$ ở mẫu lớn hơn ở tử $\\implies \\lim_{x \\to x_0^\\pm} \\frac{P(x)}{Q(x)} = \\pm \\infty$).",
                "signs": "Hàm phân thức hữu tỉ $y = \\frac{P(x)}{Q(x)}$, hỏi số lượng đường tiệm cận đứng, ngang hoặc phương trình của chúng.",
                "methods": "Bước 1: Tìm tập xác định $D$ (giải điều kiện mẫu thức khác 0: $Q(x) \\ne 0 \\implies D = \\{x \\in \\mathbb{R} \\mid Q(x) \\ne 0\\}$).\nBước 2: Tiệm cận ngang: So sánh bậc của $P(x)$ và $Q(x)$ khi $x \\to \\pm \\infty$:\n- Bậc tử < Bậc mẫu $\\implies y = 0$.\n- Bậc tử = Bậc mẫu $\\implies y = a_n / b_n$.\n- Bậc tử > Bậc mẫu $\\implies$ Không có TCN.\nBước 3: Tiệm cận đứng: Giải phương trình mẫu số $Q(x) = 0$. Rút gọn nhân tử chung với tử số $P(x)$ để xác định các nghiệm thực sự làm mẫu triệt tiêu.",
```

---

### 4.2. ĐẶC TẢ DROP-IN CHO DẠNG 4.3 (`MT_1_4_3` - Dòng 360 đến 368)

#### **BEFORE (Hiện tại)**:
```typescript
            {
              "id": "MT_1_4_3",
              "code": "DẠNG 4.3",
              "title": "Tiệm cận xiên của hàm phân thức bậc hai / bậc nhất",
              "difficulty": "TH",
              "details": {
                "theory": "1. Định nghĩa: Đường thẳng $y = ax + b$ ($a \\ne 0$) là tiệm cận xiên của đồ thị hàm số $y = f(x)$ nếu:\n$\\lim_{x \\to +\\infty} [f(x) - (ax + b)] = 0$ hoặc $\\lim_{x \\to -\\infty} [f(x) - (ax + b)] = 0$.\nHệ số xác định bởi công thức Cauchy: $a = \\lim_{x \\to \\pm\\infty} \\frac{f(x)}{x}$ ($a \\ne 0$) và $b = \\lim_{x \\to \\pm\\infty} [f(x) - ax]$.\n2. Hàm phân thức bậc hai trên bậc nhất $y = \\frac{ax^2+bx+c}{px+q}$:\n- Điều kiện: $a \\ne 0, \\; p \\ne 0$ và $aq^2 - bpq + cp^2 \\ne 0$ (tử số không chia hết cho mẫu số).\n- Thực hiện phép chia đa thức tử cho mẫu:\n$y = \\left(\\frac{a}{p}x + \\frac{bp - aq}{p^2}\\right) + \\frac{r}{px+q}$ với phần dư $r \\ne 0$.\n- Do $\\lim_{x \\to \\pm\\infty} \\frac{r}{px+q} = 0$, phương trình đường tiệm cận xiên là: $y = \\frac{a}{p}x + \\frac{bp - aq}{p^2}$ (hệ số góc $a/p \\ne 0$).",
                "signs": "Đồ thị hàm phân thức có bậc tử lớn hơn bậc mẫu đúng 1 đơn vị, yêu cầu tìm phương trình đường tiệm cận xiên.",
                "methods": "Bước 1: Kiểm tra bậc tử lớn hơn bậc mẫu 1 bậc và tử không chia hết cho mẫu.\nBước 2: Thực hiện phép chia đa thức tử cho mẫu để tách thành dạng $y = mx + n + \\frac{r}{px+q}$.\nBước 3: Phần thương bậc nhất $y = mx + n$ chính là phương trình đường tiệm cận xiên.\nBước 4: Bấm máy tính Casio: Dùng phép chia đa thức hoặc tính giới hạn $a = \\lim y/x$ và $b = \\lim (y - ax)$.",
```

#### **AFTER (Đề xuất thay thế cho Worker M1)**:
```typescript
            {
              "id": "MT_1_4_3",
              "code": "DẠNG 4.3",
              "title": "Tiệm cận xiên của hàm phân thức bậc hai / bậc nhất",
              "difficulty": "TH",
              "details": {
                "theory": "1. Định nghĩa: Đường thẳng $y = ax + b$ ($a \\ne 0$) là tiệm cận xiên của đồ thị hàm số $y = f(x)$ nếu:\n$\\lim_{x \\to +\\infty} [f(x) - (ax + b)] = 0$ hoặc $\\lim_{x \\to -\\infty} [f(x) - (ax + b)] = 0$.\nHệ số xác định bởi công thức Cauchy: $a = \\lim_{x \\to \\pm\\infty} \\frac{f(x)}{x}$ ($a \\ne 0$) và $b = \\lim_{x \\to \\pm\\infty} [f(x) - ax]$.\n2. Hàm phân thức bậc hai trên bậc nhất $y = \\frac{ax^2+bx+c}{px+q}$:\n- Điều kiện xác định: Mẫu thức khác không $px + q \\ne 0 \\iff x \\ne -\\frac{q}{p}$. Tập xác định: $D = \\mathbb{R} \\setminus \\left\\{-\\frac{q}{p}\\right\\}$.\n- Điều kiện tồn tại tiệm cận xiên: $a \\ne 0, \\; p \\ne 0$ và điều kiện không suy biến $aq^2 - bpq + cp^2 \\ne 0$ (tử số không chia hết cho mẫu số, phần dư $r \\ne 0$).\n- Thực hiện phép chia đa thức tử cho mẫu:\n$y = \\left(\\frac{a}{p}x + \\frac{bp - aq}{p^2}\\right) + \\frac{r}{px+q}$ với phần dư $r = \\frac{aq^2 - bpq + cp^2}{p^2} \\ne 0$.\n- Do $\\lim_{x \\to \\pm\\infty} \\frac{r}{px+q} = 0$, phương trình đường tiệm cận xiên là: $y = \\frac{a}{p}x + \\frac{bp - aq}{p^2}$ (hệ số góc $a/p \\ne 0$).\n- Đồ thị còn có đúng 1 tiệm cận đứng là đường thẳng $x = -\\frac{q}{p}$.",
                "signs": "Đồ thị hàm phân thức có bậc tử lớn hơn bậc mẫu đúng 1 đơn vị, yêu cầu tìm phương trình đường tiệm cận xiên.",
                "methods": "Bước 1: Tìm tập xác định $D = \\mathbb{R} \\setminus \\left\\{-\\frac{q}{p}\\right\\}$ (điều kiện mẫu $px + q \\ne 0 \\iff x \\ne -\\frac{q}{p}$). Kiểm tra bậc tử lớn hơn bậc mẫu đúng 1 bậc và tử không chia hết cho mẫu ($aq^2 - bpq + cp^2 \\ne 0$).\nBước 2: Thực hiện phép chia đa thức tử cho mẫu để tách thành dạng $y = mx + n + \\frac{r}{px+q}$.\nBước 3: Phần thương bậc nhất $y = mx + n$ chính là phương trình đường tiệm cận xiên.\nBước 4: Bấm máy tính Casio: Dùng phép chia đa thức hoặc tính giới hạn $a = \\lim y/x$ và $b = \\lim (y - ax)$.",
```

---

### 4.3. ĐẶC TẢ DROP-IN CHO DẠNG 10.1 (`MT_3_1_1` - Dòng 748 đến 756)

#### **BEFORE (Hiện tại)**:
```typescript
            {
              "id": "MT_3_1_1",
              "code": "DẠNG 10.1",
              "title": "Khoảng cách ngắn nhất giữa hai vật thể chuyển động theo t",
              "difficulty": "VD",
              "details": {
                "theory": "Mô hình chuyển động trong không gian $Oxyz$:\n- Vật thể $M_1(t) = (x_1 + a_1t; y_1 + b_1t; z_1 + c_1t)$ và $M_2(t) = (x_2 + a_2t; y_2 + b_2t; z_2 + c_2t)$.\n- Điều kiện thời gian thực tế: $t \\in [t_{\\min}; t_{\\max}]$ với $t \\ge 0$ (thời gian không âm).\n- Hàm khoảng cách: $d(t) = |\\vec{M_1M_2}| = \\sqrt{f(t)}$ với:\n$f(t) = [(x_2 - x_1) + (a_2 - a_1)t]^2 + [(y_2 - y_1) + (b_2 - b_1)t]^2 + [(z_2 - z_1) + (c_2 - c_1)t]^2 \\ge 0, \\; \\forall t$.\n- Biểu thức $f(t) = At^2 + Bt + C$ là tam thức bậc hai với $A = (a_2-a_1)^2 + (b_2-b_1)^2 + (c_2-c_1)^2 \\ge 0$.\n- Nếu hai vật thể di chuyển theo hai hướng vận tốc không cùng phương thì $A > 0$.\n- Vì hàm căn bậc hai $y = \\sqrt{u}$ đồng biến trên $[0; +\\infty)$ nên: $\\min d(t) = \\sqrt{\\min f(t)}$ trên miền $t \\in [t_{\\min}; t_{\\max}]$.\n- Đỉnh parabol tại $t_0 = -\\frac{B}{2A}$. So sánh giá trị $t_0$ với đoạn $[t_{\\min}; t_{\\max}]$ để kết luận thời điểm và khoảng cách ngắn nhất.",
                "signs": "Bài toán thực tế hai máy bay bay theo đường thẳng, hai tàu thủy di chuyển trên biển, tìm khoảng cách an toàn ngắn nhất và thời điểm đạt khoảng cách đó.",
                "methods": "Bước 1: Chọn gốc tọa độ $O$ và các trục $Ox, Oy, Oz$ phù hợp với bài toán thực tế.\nBước 2: Viết phương trình chuyển động của từng vật thể theo tham số thời gian $t \\ge 0$.\nBước 3: Thiết lập hàm bình phương khoảng cách $f(t) = d^2(t) = At^2 + Bt + C$.\nBước 4: Tìm đỉnh parabol $t_0 = -B/(2A)$. Nếu $t_0$ thuộc miền thời gian thì $\\min = \\sqrt{f(t_0)}$; nếu $t_0 < 0$ thì $\\min$ đạt tại $t = 0$.\nBước 5: Bấm Table Casio để kiểm tra lại giá trị nhỏ nhất.",
```

#### **AFTER (Đề xuất thay thế cho Worker M1)**:
```typescript
            {
              "id": "MT_3_1_1",
              "code": "DẠNG 10.1",
              "title": "Khoảng cách ngắn nhất giữa hai vật thể chuyển động theo t",
              "difficulty": "VD",
              "details": {
                "theory": "Mô hình chuyển động trong không gian $Oxyz$:\n- Vật thể $M_1(t) = (x_1 + a_1t; y_1 + b_1t; z_1 + c_1t)$ và $M_2(t) = (x_2 + a_2t; y_2 + b_2t; z_2 + c_2t)$.\n- Điều kiện chuyển động thực tế: Các vectơ vận tốc phải khác vectơ-không: $\\vec{v}_1 = (a_1; b_1; c_1) \\ne \\vec{0}$ ($a_1^2 + b_1^2 + c_1^2 > 0$) và $\\vec{v}_2 = (a_2; b_2; c_2) \\ne \\vec{0}$ ($a_2^2 + b_2^2 + c_2^2 > 0$) với tốc độ chuyển động $v_1 = |\\vec{v}_1| > 0$ và $v_2 = |\\vec{v}_2| > 0$.\n- Điều kiện thời gian thực tế: $t \\in [t_{\\min}; t_{\\max}]$ với $t \\ge 0$ (thời gian không âm).\n- Hàm khoảng cách: $d(t) = |\\vec{M_1M_2}| = \\sqrt{f(t)}$ với:\n$f(t) = [(x_2 - x_1) + (a_2 - a_1)t]^2 + [(y_2 - y_1) + (b_2 - b_1)t]^2 + [(z_2 - z_1) + (c_2 - c_1)t]^2 \\ge 0, \\; \\forall t$.\n- Biểu thức $f(t) = At^2 + Bt + C$ là tam thức bậc hai với hệ số $A = |\\vec{v}_2 - \\vec{v}_1|^2 = (a_2-a_1)^2 + (b_2-b_1)^2 + (c_2-c_1)^2 \\ge 0$.\n- Nếu hai vật thể có vận tốc khác nhau ($\\vec{v}_1 \\ne \\vec{v}_2 \\iff \\vec{v}_2 - \\vec{v}_1 \\ne \\vec{0}$) thì $A > 0$, parabol quay bề lõm lên trên.\n- Nếu hai vật thể có cùng vận tốc ($\\vec{v}_1 = \\vec{v}_2$) thì khoảng cách không đổi: $d(t) = |\\vec{M_1(0)M_2(0)}| = \\text{const}$.\n- Vì hàm căn bậc hai $y = \\sqrt{u}$ đồng biến trên $[0; +\\infty)$ nên: $\\min d(t) = \\sqrt{\\min f(t)}$ trên miền $t \\in [t_{\\min}; t_{\\max}]$.\n- Đỉnh parabol tại $t_0 = -\\frac{B}{2A}$. So sánh giá trị $t_0$ với đoạn $[t_{\\min}; t_{\\max}]$ để kết luận thời điểm và khoảng cách ngắn nhất.",
                "signs": "Bài toán thực tế hai máy bay bay theo đường thẳng, hai tàu thủy di chuyển trên biển, tìm khoảng cách an toàn ngắn nhất và thời điểm đạt khoảng cách đó.",
                "methods": "Bước 1: Chọn gốc tọa độ $O$ và các trục $Ox, Oy, Oz$ phù hợp với bài toán thực tế.\nBước 2: Viết phương trình chuyển động của từng vật thể theo tham số thời gian $t \\ge 0$ với các vectơ vận tốc $\\vec{v}_1, \\vec{v}_2 \\ne \\vec{0}$.\nBước 3: Thiết lập hàm bình phương khoảng cách $f(t) = d^2(t) = At^2 + Bt + C$.\nBước 4: Tìm đỉnh parabol $t_0 = -B/(2A)$. Nếu $t_0$ thuộc miền thời gian thì $\\min = \\sqrt{f(t_0)}$; nếu $t_0 < 0$ thì $\\min$ đạt tại $t = 0$.\nBước 5: Bấm Table Casio để kiểm tra lại giá trị nhỏ nhất.",
```

---

### 4.4. ĐÍNH KÈM CÁC VỊ TRÍ SỬA CÚ PHÁP KATEX ĐỒNG THỜI (DÀNH CHO WORKER M1)
Để Worker M1 xử lý dứt điểm toàn bộ các điểm Challenger 1 từ chối:
1. **Dòng 304 (`DẠNG 3.4`)**: Sửa `$min$` thành `$\\min$`.
2. **Dòng 658 (`DẠNG 9.1`)**: Sửa 4 cụm `$iff` thành `$\\iff$`.
3. **Dòng 676 (`DẠNG 9.2`)**: Sửa 2 cụm `$iff` thành `$\\iff$`.
4. **`scripts/seed_deep_expansion.js` dòng 159 & 161**: Sửa `$y_{CĐ}$` thành `$y_{\\text{CĐ}}$` và chạy cập nhật lại câu hỏi `Q38_D4_SA` trong SQLite.

---

## 5. VERIFICATION METHOD (HƯỚNG DẪN KIỂM CHỨNG ĐỘC LẬP)

Worker và Orchestrator có thể kiểm chứng tính chính xác của các đề xuất trên qua các phương pháp sau:

1. **Chạy test script kiểm định KaTeX của Explorer**:
   ```bash
   node .agents/teamwork/explorer_m1_it2_2/test_katex_verification.js
   ```
   *Kỳ vọng*: Toàn bộ 89 biểu thức KaTeX được parse thành công 100% với `throwOnError: true`.

2. **Chạy các công cụ kiểm thử đối kháng của Challenger**:
   ```bash
   node scripts/adversarial_syntax_scan.js
   node scripts/adversarial_fn_scan.js
   node scripts/adversarial_katex_stress.js
   ```
   *Kỳ vọng sau khi Worker áp dụng*: Tất cả báo cáo 0 lỗi (`0 suspicious unescaped keywords`, `0 math function checks`, `APPROVE`).

3. **Biên dịch thử nghiệm toàn dự án**:
   ```bash
   npm run build
   ```
   *Kỳ vọng*: Exit code 0, không có lỗi TypeScript hoặc lint.
