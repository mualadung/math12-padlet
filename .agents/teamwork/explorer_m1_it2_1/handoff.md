# BÁO CÁO ĐIỀU TRA KỸ THUẬT & CÔNG THỨC KHẮC PHỤC LỖI KATEX TRONG `machData.ts`
## (EXPLORER HANDOFF REPORT — MILESTONE 1 ITERATION 2)

- **Người thực hiện**: Explorer (`teamwork_explorer`)
- **Vai trò**: investigator, specialist
- **Thư mục làm việc**: `d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_it2_1\`
- **Milestone**: Milestone 1 — Iteration 2 (Remediation of Challenger 1 findings)
- **Đối tượng khảo sát**: Cú pháp hiển thị KaTeX trong `src/app/mindmap/machData.ts`
- **Caller (Orchestrator)**: `51012427-609d-48ef-a8a3-ce0355def37c`
- **Thời điểm**: 2026-11-08T06:00:00Z

---

## 1. OBSERVATION (QUAN SÁT TRỰC ĐỊA & KẾT QUẢ ĐO KIỂM)

Quá trình quét tự động toàn diện qua AST string literals, regex từ khóa toán học và script kiểm thử đối kháng đã xác định chính xác các điểm lỗi sau trong tệp `src/app/mindmap/machData.ts`:

### 1.1. Lỗi thiếu dấu gạch chéo ngược cho toán tử giá trị nhỏ nhất `$\min$`
- **Vị trí**: `src/app/mindmap/machData.ts`, dòng 304 (`DẠNG 3.4` - mã `MT_1_3_4`: "Tìm tham số m trong bài toán GTLN - GTNN", trường `theory`).
- **Nội dung nguyên bản**:
  ```text
  Vì hàm số luôn đơn điệu trên $[a; b]$ nên $\max$ và $min$ luôn đạt tại một trong hai đầu mút: $\{f(a); f(b)\}$.
  ```
- **Lỗi cụ thể**: Chuỗi `$min$` gõ thiếu backslash (`\`), trong khi vế trước đã có `$\max$`.
- **Hệ quả hiển thị**: KaTeX hiểu `m`, `i`, `n` là 3 biến số đại số nhân với nhau ($m \cdot i \cdot n$ in nghiêng) thay vì toán tử chuẩn $\min$.

### 1.2. Lỗi thiếu dấu gạch chéo ngược cho mệnh đề tương đương `$\iff$` tại dòng 658
- **Vị trí**: `src/app/mindmap/machData.ts`, dòng 658 (`DẠNG 9.1` - mã `MT_2_3_1`: "Tích có hướng & Điều kiện cùng phương, đồng phẳng", trường `theory`).
- **Tổng số lỗi**: **4 vị trí** xuất hiện `$iff` thay vì `$\iff$`:
  1. `$iff [\vec{u}, \vec{v}] = \vec{0} = (0; 0; 0)$` trong:
     `- Điều kiện hai vectơ cùng phương: $\vec{u}, \vec{v}$ cùng phương $iff [\vec{u}, \vec{v}] = \vec{0} = (0; 0; 0).`
  2. `$iff [\vec{AB}, \vec{AC}] = \vec{0}$` trong:
     `- Điều kiện ba điểm thẳng hàng: $A, B, C$ thẳng hàng $iff [\vec{AB}, \vec{AC}] = \vec{0}.`
  3. `$iff [\vec{u}, \vec{v}] \cdot \vec{w} = 0$` trong:
     `- Điều kiện ba vectơ đồng phẳng: Ba vectơ $\vec{u}, \vec{v}, \vec{w}$ đồng phẳng $iff [\vec{u}, \vec{v}] \cdot \vec{w} = 0$.`
  4. `$iff [\vec{AB}, \vec{AC}] \cdot \vec{AD} = 0$` trong:
     `- Điều kiện bốn điểm đồng phẳng: Bốn điểm $A, B, C, D$ đồng phẳng $iff [\vec{AB}, \vec{AC}] \cdot \vec{AD} = 0$.`
- **Hệ quả hiển thị**: KaTeX coi `i`, `f`, `f` là biến số nhân nhau ($i \cdot f \cdot f$), xuất hiện chữ nghiêng "iff" thay cho ký hiệu mũi tên tương đương $\Longleftrightarrow$.

### 1.3. Lỗi thiếu dấu gạch chéo ngược cho mệnh đề tương đương `$\iff$` tại dòng 676
- **Vị trí**: `src/app/mindmap/machData.ts`, dòng 676 (`DẠNG 9.2` - mã `MT_2_3_2`: "Ứng dụng tính diện tích tam giác & Thể tích tứ diện, khối hộp", trường `theory`).
- **Tổng số lỗi**: **2 vị trí** xuất hiện `$iff` thay vì `$\iff$`:
  1. `$iff [\vec{AB}, \vec{AC}] \ne \vec{0} \implies S_{\Delta ABC} > 0$` trong:
     `Điều kiện tam giác không suy biến: Ba điểm $A, B, C$ không thẳng hàng $iff [\vec{AB}, \vec{AC}] \ne \vec{0} \implies S_{\Delta ABC} > 0.`
  2. `$iff [\vec{AB}, \vec{AC}] \cdot \vec{AD} \ne 0 \implies V_{ABCD} > 0$` trong:
     `Điều kiện tứ diện không suy biến: Bốn điểm $A, B, C, D$ không đồng phẳng $iff [\vec{AB}, \vec{AC}] \cdot \vec{AD} \ne 0 \implies V_{ABCD} > 0.`

### 1.4. Kết quả quét vét cạn các từ khóa toán học khác trong toàn bộ `machData.ts`
- Đã chạy phân tích từ vựng đối kháng với danh sách mở rộng gồm toàn bộ các hàm lượng giác (`\sin`, `\cos`, `\tan`, `\cot`), hàm giải tích (`\lim`, `\ln`, `\log`, `\exp`, `\max`, `\min`, `\det`), quan hệ và mũi tên logic (`\iff`, `\implies`, `\approx`, `\equiv`, `\le`, `\ge`, `\ne`, `\perp`, `\parallel`), ký tự Hy Lạp (`\alpha`, `\beta`, `\pi`, `\Delta`, `\Omega`...):
  - **Kết quả**: Ngoài 7 vị trí nêu trên (1 vị trí `$min$` và 6 vị trí `$iff`), **KHÔNG CÒN BẤT KỲ TỪ KHÓA KATEX NÀO BỊ THIẾU DẤU GẠCH CHÉO NGƯỢC** trong toàn bộ 804 dòng của `src/app/mindmap/machData.ts`.

---

## 2. LOGIC CHAIN (CHUỖI LẬP LUẬN TỪ NGUYÊN NHÂN ĐẾN GIẢI PHÁP)

1. **Từ Quan sát 1.1**:
   - Tại dòng 304, mệnh đề *"Vì hàm số luôn đơn điệu trên $[a; b]$ nên $\max$ và $min$ luôn đạt tại một trong hai đầu mút..."* có vế trước sử dụng `$\max$` (mã nguồn TypeScript là `$\\max$`), chứng minh tác giả có chủ đích dùng ký hiệu toán học cho cả max và min.
   - Việc viết `$min$` là sơ suất đánh máy (thiếu `\\`). Trong chuỗi TypeScript, cần thay thế `$min$` bằng `$\\min$` để KaTeX render chính xác toán tử $\min$.

2. **Từ Quan sát 1.2 & 1.3**:
   - Tại dòng 658, tác giả đã viết đúng `\\iff` ở câu trước:
     `$[\\vec{u}, \\vec{v}] \\perp \\vec{v} \\iff [\\vec{u}, \\vec{v}] \\cdot \\vec{v} = 0$`
   - Tuy nhiên, ở 4 gạch đầu dòng tiếp theo của dòng 658 và 2 câu của dòng 676, tác giả đã gõ `$iff` thay vì `$\\iff$`.
   - Vì nằm ngoài cặp dấu `$ ... $` trước đó, khi viết `$iff [ ... ]$`, KaTeX bắt đầu môi trường toán học mới với token `iff`, dẫn đến render ra chữ in nghiêng $i \cdot f \cdot f$.
   - Thay thế trực tiếp cụm `$iff` bằng `$\\iff` (giữ nguyên khoảng trắng và công thức phía sau) sẽ đưa mệnh đề tương đương về dạng chuẩn: `$\\iff [\\vec{...}`.

3. **Từ Quan sát 1.4**:
   - Phạm vi can thiệp đối với lỗi cú pháp KaTeX dạng này hoàn toàn cục bộ, giới hạn chính xác tại 3 dòng (304, 658, 676).
   - Việc sửa 3 dòng này sẽ triệt tiêu 100% cảnh báo đối kháng từ `scripts/adversarial_syntax_scan.js` và `scripts/adversarial_fn_scan.js`.

---

## 3. CAVEATS (CÁC VẤN ĐỀ LIÊN QUAN & LƯU Ý KHI THỰC HIỆN)

1. **Quy tắc thoát ký tự trong chuỗi TypeScript (Double Backslash `\\`)**:
   - Tệp `src/app/mindmap/machData.ts` là tệp mã nguồn TypeScript (`.ts`), trong đó dữ liệu được khai báo dưới dạng đối tượng JSON/JS literal.
   - Do đó, mọi lệnh KaTeX bắt đầu bằng backslash bắt buộc phải dùng **2 dấu gạch chéo ngược** trong mã nguồn: `\\min` và `\\iff`.
   - Nếu Worker chỉ viết 1 dấu gạch chéo `\min` hay `\iff`, trình biên dịch JS sẽ hiểu `\m` và `\i` là ký tự thường và nuốt mất dấu gạch chéo, khiến lỗi tái diễn tại runtime.

2. **Phối hợp với các phát hiện khác của Challenger 1**:
   - Ngoài lỗi cú pháp KaTeX thuần túy, Challenger 1 còn lưu ý Worker cần bổ sung điều kiện mẫu thức khác 0 cho `DẠNG 4.1` ($Q(x) \ne 0$), `DẠNG 4.3` ($px + q \ne 0 \iff x \ne -q/p$), và điều kiện vận tốc khác 0 cho `DẠNG 10.1` ($\vec{v}_1, \vec{v}_2 \ne \vec{0}$) trong `machData.ts`, cùng với sửa lỗi Unicode `$y_{CĐ}$` thành `$y_{\text{CĐ}}$` trong cơ sở dữ liệu (`scripts/seed_deep_expansion.js`).

---

## 4. CONCLUSION & WORKER REPLACEMENT RECIPES (CÔNG THỨC THAY THẾ CHÍNH XÁC CHO WORKER)

Worker M1 có thể áp dụng trực tiếp các khối thay thế (drop-in replacement recipes) dưới đây vào `src/app/mindmap/machData.ts`:

### Công thức 1: Sửa lỗi `$min$` tại Dòng 304

- **Tệp mục tiêu**: `src/app/mindmap/machData.ts`
- **Dòng**: 304
- **Đoạn mã hiện tại (Before)**:
  ```typescript
                  "theory": "Bài toán cho $\\max_{[a; b]} f(x, m) = K$ hoặc $\\min_{[a; b]} f(x, m) = K$.\n- Điều kiện tiên quyết: Đoạn $[a; b]$ phải nằm trong tập xác định của hàm số với mọi giá trị $m$ cần tìm: $[a; b] \\subseteq D_m$.\n- Trường hợp hàm phân thức bậc nhất/bậc nhất $y = \\frac{ax+b}{cx+d}$:\n  + Điều kiện mẫu thức khác không trên toàn bộ đoạn $[a; b]$: $-\\frac{d}{c} \\notin [a; b] \\iff -d/c < a$ hoặc $-d/c > b$.\n  + Điều kiện không suy biến: $ad - bc \\ne 0$.\n  + Vì hàm số luôn đơn điệu trên $[a; b]$ nên $\\max$ và $min$ luôn đạt tại một trong hai đầu mút: $\\{f(a); f(b)\\}$.",
  ```
- **Đoạn mã thay thế (After)**:
  ```typescript
                  "theory": "Bài toán cho $\\max_{[a; b]} f(x, m) = K$ hoặc $\\min_{[a; b]} f(x, m) = K$.\n- Điều kiện tiên quyết: Đoạn $[a; b]$ phải nằm trong tập xác định của hàm số với mọi giá trị $m$ cần tìm: $[a; b] \\subseteq D_m$.\n- Trường hợp hàm phân thức bậc nhất/bậc nhất $y = \\frac{ax+b}{cx+d}$:\n  + Điều kiện mẫu thức khác không trên toàn bộ đoạn $[a; b]$: $-\\frac{d}{c} \\notin [a; b] \\iff -d/c < a$ hoặc $-d/c > b$.\n  + Điều kiện không suy biến: $ad - bc \\ne 0$.\n  + Vì hàm số luôn đơn điệu trên $[a; b]$ nên $\\max$ và $\\min$ luôn đạt tại một trong hai đầu mút: $\\{f(a); f(b)\\}$.",
  ```

---

### Công thức 2: Sửa 4 lỗi `$iff` tại Dòng 658

- **Tệp mục tiêu**: `src/app/mindmap/machData.ts`
- **Dòng**: 658
- **Đoạn mã hiện tại (Before)**:
  ```typescript
                  "theory": "Cho hai vectơ $\\vec{u} = (u_1; u_2; u_3)$ và $\\vec{v} = (v_1; v_2; v_3)$. Tích có hướng $[\\vec{u}, \\vec{v}]$ là một vectơ xác định bởi định thức cấp hai:\n$[\\vec{u}, \\vec{v}] = \\left( \\begin{vmatrix} u_2 & u_3 \\\\ v_2 & v_3 \\end{vmatrix}; \\begin{vmatrix} u_3 & u_1 \\\\ v_3 & v_1 \\end{vmatrix}; \\begin{vmatrix} u_1 & u_2 \\\\ v_1 & v_2 \\end{vmatrix} \\right) = (u_2v_3 - u_3v_2; u_3v_1 - u_1v_3; u_1v_2 - u_2v_1)$.\n- Tính chất trực giao: $[\\vec{u}, \\vec{v}] \\perp \\vec{u}$ và $[\\vec{u}, \\vec{v}] \\perp \\vec{v} \\iff [\\vec{u}, \\vec{v}] \\cdot \\vec{u} = 0$ và $[\\vec{u}, \\vec{v}] \\cdot \\vec{v} = 0$.\n- Điều kiện hai vectơ cùng phương: $\\vec{u}, \\vec{v}$ cùng phương $iff [\\vec{u}, \\vec{v}] = \\vec{0} = (0; 0; 0)$.\n- Điều kiện ba điểm thẳng hàng: $A, B, C$ thẳng hàng $iff [\\vec{AB}, \\vec{AC}] = \\vec{0}$.\n- Điều kiện ba vectơ đồng phẳng: Ba vectơ $\\vec{u}, \\vec{v}, \\vec{w}$ đồng phẳng $iff [\\vec{u}, \\vec{v}] \\cdot \\vec{w} = 0$.\n- Điều kiện bốn điểm đồng phẳng: Bốn điểm $A, B, C, D$ đồng phẳng $iff [\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} = 0$.",
  ```
- **Đoạn mã thay thế (After)**:
  ```typescript
                  "theory": "Cho hai vectơ $\\vec{u} = (u_1; u_2; u_3)$ và $\\vec{v} = (v_1; v_2; v_3)$. Tích có hướng $[\\vec{u}, \\vec{v}]$ là một vectơ xác định bởi định thức cấp hai:\n$[\\vec{u}, \\vec{v}] = \\left( \\begin{vmatrix} u_2 & u_3 \\\\ v_2 & v_3 \\end{vmatrix}; \\begin{vmatrix} u_3 & u_1 \\\\ v_3 & v_1 \\end{vmatrix}; \\begin{vmatrix} u_1 & u_2 \\\\ v_1 & v_2 \\end{vmatrix} \\right) = (u_2v_3 - u_3v_2; u_3v_1 - u_1v_3; u_1v_2 - u_2v_1)$.\n- Tính chất trực giao: $[\\vec{u}, \\vec{v}] \\perp \\vec{u}$ và $[\\vec{u}, \\vec{v}] \\perp \\vec{v} \\iff [\\vec{u}, \\vec{v}] \\cdot \\vec{u} = 0$ và $[\\vec{u}, \\vec{v}] \\cdot \\vec{v} = 0$.\n- Điều kiện hai vectơ cùng phương: $\\vec{u}, \\vec{v}$ cùng phương $\\iff [\\vec{u}, \\vec{v}] = \\vec{0} = (0; 0; 0)$.\n- Điều kiện ba điểm thẳng hàng: $A, B, C$ thẳng hàng $\\iff [\\vec{AB}, \\vec{AC}] = \\vec{0}$.\n- Điều kiện ba vectơ đồng phẳng: Ba vectơ $\\vec{u}, \\vec{v}, \\vec{w}$ đồng phẳng $\\iff [\\vec{u}, \\vec{v}] \\cdot \\vec{w} = 0$.\n- Điều kiện bốn điểm đồng phẳng: Bốn điểm $A, B, C, D$ đồng phẳng $\\iff [\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} = 0$.",
  ```

---

### Công thức 3: Sửa 2 lỗi `$iff` tại Dòng 676

- **Tệp mục tiêu**: `src/app/mindmap/machData.ts`
- **Dòng**: 676
- **Đoạn mã hiện tại (Before)**:
  ```typescript
                  "theory": "1. Diện tích tam giác $ABC$:\n$S_{\\Delta ABC} = \\frac{1}{2} |[\\vec{AB}, \\vec{AC}]|$.\nĐiều kiện tam giác không suy biến: Ba điểm $A, B, C$ không thẳng hàng $iff [\\vec{AB}, \\vec{AC}] \\ne \\vec{0} \\implies S_{\\Delta ABC} > 0$.\n2. Diện tích hình bình hành $ABCD$: $S_{ABCD} = |[\\vec{AB}, \\vec{AD}]|$.\n3. Thể tích khối tứ diện $ABCD$:\n$V_{ABCD} = \\frac{1}{6} |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|$.\nĐiều kiện tứ diện không suy biến: Bốn điểm $A, B, C, D$ không đồng phẳng $iff [\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} \\ne 0 \\implies V_{ABCD} > 0$.\n4. Thể tích khối hộp $ABCD.A'B'C'D'$: $V = |[\\vec{AB}, \\vec{AD}] \\cdot \\vec{AA'}| > 0$.\n5. Chiều cao hạ từ đỉnh $D$ của tứ diện $ABCD$: $h_D = \\frac{3V_{ABCD}}{S_{\\Delta ABC}} = \\frac{|[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|}{|[\\vec{AB}, \\vec{AC}]|}$ với điều kiện $|[\\vec{AB}, \\vec{AC}]| > 0$.",
  ```
- **Đoạn mã thay thế (After)**:
  ```typescript
                  "theory": "1. Diện tích tam giác $ABC$:\n$S_{\\Delta ABC} = \\frac{1}{2} |[\\vec{AB}, \\vec{AC}]|$.\nĐiều kiện tam giác không suy biến: Ba điểm $A, B, C$ không thẳng hàng $\\iff [\\vec{AB}, \\vec{AC}] \\ne \\vec{0} \\implies S_{\\Delta ABC} > 0$.\n2. Diện tích hình bình hành $ABCD$: $S_{ABCD} = |[\\vec{AB}, \\vec{AD}]|$.\n3. Thể tích khối tứ diện $ABCD$:\n$V_{ABCD} = \\frac{1}{6} |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|$.\nĐiều kiện tứ diện không suy biến: Bốn điểm $A, B, C, D$ không đồng phẳng $\\iff [\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} \\ne 0 \\implies V_{ABCD} > 0$.\n4. Thể tích khối hộp $ABCD.A'B'C'D'$: $V = |[\\vec{AB}, \\vec{AD}] \\cdot \\vec{AA'}| > 0$.\n5. Chiều cao hạ từ đỉnh $D$ của tứ diện $ABCD$: $h_D = \\frac{3V_{ABCD}}{S_{\\Delta ABC}} = \\frac{|[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|}{|[\\vec{AB}, \\vec{AC}]|}$ với điều kiện $|[\\vec{AB}, \\vec{AC}]| > 0$.",
  ```

---

## 5. VERIFICATION METHOD (PHƯƠNG PHÁP KIỂM TRA ĐỘC LẬP)

Sau khi Worker áp dụng các công thức trên, chạy các lệnh xác thực độc lập sau:

1. **Kiểm tra loại bỏ hoàn toàn các từ khóa không thoát backslash**:
   ```powershell
   node scripts/adversarial_syntax_scan.js
   ```
   - **Kỳ vọng**:
     ```text
     === src/app/mindmap/machData.ts: 0 suspicious unescaped keywords ===
     === prisma/seed.js: 0 suspicious unescaped keywords ===
     === src/app/mindmap/mindmapQuestions.ts: 0 suspicious unescaped keywords ===
     ```

2. **Kiểm tra loại bỏ hoàn toàn các toán tử hàm không thoát backslash**:
   ```powershell
   node scripts/adversarial_fn_scan.js
   ```
   - **Kỳ vọng**:
     ```text
     === src/app/mindmap/machData.ts: 0 math function checks ===
     === prisma/seed.js: 0 math function checks ===
     === src/app/mindmap/mindmapQuestions.ts: 0 math function checks ===
     ```

3. **Kiểm tra biên dịch dự án Next.js**:
   ```powershell
   npm run build
   ```
   - **Kỳ vọng**: Exit Code 0, biên dịch thành công 16/16 routes.
