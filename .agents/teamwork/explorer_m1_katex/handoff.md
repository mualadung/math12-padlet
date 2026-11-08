# BÁO CÁO ĐIỀU TRA CHUYÊN SÂU LỖI CÚ PHÁP, ESCAPE SEQUENCE VÀ ĐỊNH DẠNG KATEX
## (KATEX SYNTAX, ESCAPE SEQUENCES & FORMULA FORMATTING INVESTIGATION REPORT)

- **Người thực hiện**: Explorer (teamwork_explorer / KaTeX & Math Standardization)
- **Địa bàn làm việc**: `d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m1_katex\`
- **Milestone phụ trách**: Milestone 1 — Math Types & KaTeX Standardization
- **Mã hội thoại điều phối (Caller)**: `51012427-609d-48ef-a8a3-ce0355def37c`
- **Thời gian hoàn thành**: 2026-11-08T05:32:00Z
- **Loại bàn giao**: Hard Handoff (Đầy đủ 5 cấu phần chuẩn mực)

---

## 1. OBSERVATION (QUAN SÁT THỰC ĐỊA & DỮ LIỆU ĐO KIỂM CHÍNH XÁC)

### 1.1. Lỗi Unescaped `\v` sinh mã điều khiển `\u000b` (Vertical Tab) tại `prisma/seed.js:200`
- **Tệp quan sát**: `d:\TEST\MATH-STUDY\prisma\seed.js`
- **Vị trí**: Dòng 194 - 203 (bản ghi `KnowledgeItem` số 9: *"9. Tích có hướng của hai vectơ và ứng dụng tính diện tích, thể tích"*).
- **Mã nguồn gốc tại dòng 200 verbatim**:
  ```javascript
  200: notes: "Tích có hướng $[\vec{u}, \vec{v}]$ vuông góc với cả $\\vec{u}$ và $\\vec{v}$. Bấm máy Casio fx-580 qua MENU 5 (VECTOR).",
  ```
- **Hành vi thực tế khi chạy qua Node.js engine**:
  - Trong chuỗi ký tự JavaScript `"..."`, `\v` là ký tự điều khiển ASCII Vertical Tab (`\u000B`, mã ASCII 11).
  - Chuỗi `$[\vec{u}, \vec{v}]$` chứa 2 ký tự `\v` đơn lẻ, do đó bị Node.js chuyển đổi thành:
    `$[\x0Bec{u}, \x0Bec{v}]$` (ký tự mã 11 + `"ec{u}"`, ký tự mã 11 + `"ec{v}"`).
  - Trong cùng dòng 200, hai vectơ phía sau được viết đúng với 2 dấu gạch chéo: `$\\vec{u}$` và `$\\vec{v}$`.
- **Dữ liệu thực tế được lưu vào SQLite (`prisma/dev.db` - `KnowledgeItem.notes`)**:
  - Bản ghi ID `7984aaab-bd51-4e3e-bc66-d13a0e7fd473` có trường `notes` chứa chuỗi byte `0x0B`:
    `"Tích có hướng $[\u000bec{u}, \u000bec{v}]$ vuông góc với cả $\vec{u}$ và $\vec{v}..."`
- **Kết quả biên dịch KaTeX (`katex.renderToString`)**:
  - Thông báo lỗi verbatim:
    `KaTeX parse error: Unexpected character: '\u000b' at position 2: [\u000b̲ec{u}, \u000bec{v}]`
  - Trên giao diện người dùng, `MathRenderer` bắt lỗi ngoại lệ `catch(e)` và hiển thị khối chữ đỏ lỗi:
    `<span class="text-red-500 font-mono text-xs">$[ ec{u},  ec{v}]$</span>`.

### 1.2. Phát hiện các vị trí Unescaped `\v` tương tự trong toàn bộ dự án
Quét toàn bộ mã nguồn phát hiện thêm 2 vị trí chứa lỗi `\v` / `\u000b` tương tự:
1. **`src/app/mindmap/treeData.ts` tại dòng 999**:
   ```javascript
   999: "explanation": "Áp dụng định thức: $[\u000bec{u}, \\vec{v}] = (0 \\cdot (-1) - 2 \\cdot 1; 2 \\cdot 0 - 1 \\cdot (-1); 1 \\cdot 1 - 0 \\cdot 0) = (-2; 1; 1)$."
   ```
   - Ký tự `\u000bec{u}` bị gán cứng vào chuỗi JSON/TS của file.
2. **`scripts/build_mach_data.js` tại dòng 202**:
   ```javascript
   202: "Độ dài $|\vec{i}| = |\\vec{j}| = |\\vec{k}| = 1$ và $\\vec{i} \\cdot \\vec{j} = \\vec{j} \\cdot \\vec{k} = \\vec{k} \\cdot \\vec{i} = 0$."
   ```
   - Chứa `$|\vec{i}|$` với 1 dấu gạch chéo đơn, biến thành `$|\u000bec{i}|$`.

---

### 1.3. Khảo sát Lỗi Escape Ký hiệu Độ `\circ` (`^\circ` vs `^\\circ`)
- **Tệp quan sát**: `prisma/seed.js` và `prisma/seed_additional_questions.js`.
- **Hiện trạng mã nguồn**:
  - `prisma/seed.js`:
    - Dòng 180: `notes: "Góc giữa 2 vectơ nằm trong đoạn $[0^\\circ; 180^\\circ]$..."`
    - Dòng 280: `commonMistakes: "... (góc giữa 2 vectơ có thể tù, góc giữa 2 đường thẳng luôn $\\le 90^\\circ$)..."`
    - Dòng 627-629: `60^\\circ` trong giải thích, Casio và distractor của `Q18_D5_MC`.
    - Dòng 679: `optionsJson: JSON.stringify(["A. $60^\\circ$", "B. $90^\\circ$", "C. $45^\\circ$", "D. $120^\\circ$"])` (`Q21_D6_MC`).
  - `prisma/seed_additional_questions.js`:
    - Dòng 86: `optionsJson: JSON.stringify(["A. $90^\\circ$", "B. $60^\\circ$", "C. $45^\\circ$", "D. $30^\\circ$"])` (`Q31_D5_MC`).
    - Dòng 88-90: `90^\\circ`, `60^\\circ` trong giải thích và phân tích bẫy.
- **Bản chất kỹ thuật của 8 lỗi syntax "phantom" được báo cáo trong khảo sát sơ bộ**:
  - Khi lưu vào SQLite, `JSON.stringify(["A. $60^\\circ$"])` lưu chuỗi JSON:
    `"[\"A. $60^\\\\circ$\",\"B. $90^\\\\circ$\",\"C. $45^\\\\circ$\",\"D. $120^\\\\circ$\"]"`
  - Trong cột `optionsJson` của SQLite, chuỗi chứa 2 dấu gạch chéo `\\` trước `circ` vì định dạng JSON đòi hỏi escape dấu `\`.
  - Trên ứng dụng frontend Next.js (`src/app/practice/page.tsx:326`):
    `JSON.parse(currentQ.optionsJson)` giải mã ngược lại thành mảng JavaScript, chuỗi trở về `'A. $60^\circ$'` (1 dấu gạch chéo).
    `katex.renderToString("60^\\circ")` thực thi thành công hoàn toàn.
  - **Nguyên nhân khảo sát sơ bộ báo 8 lỗi**: Script kiểm tra sơ bộ đã chạy regex `/\$([^\$]+)\$/g` trực tiếp trên chuỗi thô của cột `question.optionsJson` mà **KHÔNG gọi `JSON.parse`**. Khi không parse JSON, chuỗi đưa vào KaTeX có 2 dấu gạch chéo (`60^\\circ`), KaTeX hiểu `\\` là lệnh ngắt dòng trong số mũ và ném lỗi:
    `KaTeX parse error: Got function '\\' with no arguments as superscript at position 4: 60^\\circ`.
- **Vấn đề chuẩn hóa TeX**:
  - Mặc dù `60^\circ` hợp lệ nếu chỉ có 1 backslash, trong quy chuẩn soạn thảo LaTeX và KaTeX, số mũ chứa macro **bắt buộc phải bọc trong cặp ngoặc nhọn `{}`**:
    `60^{\circ}` thay vì `60^\circ`.
  - Nếu thiếu `{}`:
    1. Khi chuyển đổi chuỗi qua các bộ parser trung gian hoặc regex, `^` có thể bị gắn nhầm phạm vi.
    2. Gây cảnh báo không tương thích khi mở rộng sang MathJax hoặc LaTeX export (docx, pdf).

---

### 1.4. Khảo sát Cú pháp KaTeX trong `machData.ts` và `mindmapQuestions.ts`
Thực thi kiểm tra toàn bộ 804 dòng `src/app/mindmap/machData.ts` và 851 dòng `src/app/mindmap/mindmapQuestions.ts`:
1. **Lỗi thiếu ngoặc nhọn số mũ tại `machData.ts:330`**:
   - `$\\lim_{x \\to x_0^\\pm} f(x) = \\pm \\infty$`
   - Ký hiệu `x_0^\\pm` thiếu cặp ngoặc `{}`. Cần chuẩn hóa thành: `x_0^{\\pm}`.
2. **Cảnh báo ký tự Unicode tiếng Việt `Đ` trong Math Mode (Unicode In Math Mode)**:
   - `machData.ts`:
     - Dòng 383: `$x_{CĐ}, x_{CT}, y_{CĐ}, y_{CT}$`
     - Dòng 408: `$y_{CĐ}$`
     - Dòng 424: `$y_{CĐ}=3, y_{CT}=-1$`
   - `prisma/seed_deep_expansion.js`:
     - Dòng 159 & 161: `$y_{CĐ} = ...$`, `$y_{CĐ}, y_{CT}$`
   - **Thông báo cảnh báo từ KaTeX engine**:
     `LaTeX-incompatible input and strict mode is set to 'warn': Unicode text character "Đ" used in math mode [unicodeTextInMathMode]`
   - Trong LaTeX, ký tự `Đ` không phải ký tự toán học ASCII. Cần bọc trong `\\text{CĐ}` hoặc viết theo chuẩn ký hiệu toán học quốc tế `x_{\\text{CĐ}}` / `x_{CD}`.
3. **Cú pháp so sánh góc trong math mode tại `machData.ts:574`**:
   - `>90^\\circ` và `\\le 90^\\circ`. Cần chuẩn hóa thành: `> 90^{\\circ}` và `\\le 90^{\\circ}`.
4. **Các vị trí góc trong `mindmapQuestions.ts`**:
   - Dòng 535, 536, 537: `60^\\circ` $\to$ Chuẩn hóa thành `60^{\\circ}`.
   - Dòng 564: `options: ["A. $90^\\circ$", "B. $60^\\circ$", "C. $45^\\circ$", "D. $120^\\circ$"]` $\to$ Chuẩn hóa thành `^{\\circ}`.
   - Dòng 566, 578: `90^\\circ` $\to$ Chuẩn hóa thành `90^{\\circ}`.

---

### 1.5. Khảo sát Ký hiệu Toán học Thô (Unrendered Raw Math) trong giao diện JSX
Phát hiện các ký hiệu toán học bị nhúng trực tiếp vào văn bản JSX thông thường mà không đi qua component `MathRenderer`, dẫn đến hiển thị mã nguồn thô cho học sinh:
1. **`src/app/page.tsx` dòng 112**:
   ```tsx
   <p className="text-xs text-slate-600 mt-2 leading-relaxed">
     Cây tri thức tương tác 4 tầng: Gốc $\to$ Chương $\to$ Chủ đề $\to$ Dạng toán $\to$ 4 nhánh lá (Lý thuyết, Dấu hiệu, Phương pháp, Cạm bẫy) và nhúng GeoGebra 3D.
   </p>
   ```
   - Học sinh nhìn thấy trực tiếp chuỗi chữ: `"Gốc $\to$ Chương $\to$ Chủ đề $\to$ Dạng toán $\to$ 4 nhánh lá"`.
2. **`src/app/team-admin/page.tsx` dòng 514**:
   ```tsx
   <h3 className="...">4. Xuất Bộ Hồ Sơ Minh Chứng Nộp Giáo Viên (Mục I $\to$ IX &amp; Bổ sung)</h3>
   ```
   - Học sinh/giáo viên nhìn thấy trực tiếp chuỗi: `"Mục I $\to$ IX"`.
3. **`src/app/mindmap/GrandDetailCard.tsx` dòng 128 & 179**:
   ```tsx
   128: <BookOpen size={12} /> 1. Lý thuyết ($D$)
   179: Định lý &amp; Công thức (KaTeX) kèm Điều kiện $D$:
   ```
   - Hiển thị dấu đô-la trần `($D$)` và `$D$` thay vì hiển thị định dạng KaTeX chuẩn.

---

## 2. LOGIC CHAIN (CHUỖI LẬP LUẬN TỪ QUAN SÁT ĐẾN GIẢI PHÁP)

1. **Từ Quan sát 1.1 và 1.2**:
   - Cú pháp chuỗi thoát chuẩn ECMAScript quy định `\v` là ký tự điều khiển ASCII 11.
   - Khi tác giả viết `"Tích có hướng $[\vec{u}, \vec{v}]..."`, trình phân tích cú pháp Node.js chuyển `\v` thành byte 11 trước khi lưu vào SQLite.
   - KaTeX không thể nhận diện byte 11 và báo lỗi cú pháp chết người `Unexpected character: '\u000b'`.
   - $\implies$ **Biện pháp xử lý**: Thay thế toàn bộ `\vec` đơn lẻ bằng `\\vec` (2 dấu gạch chéo) trong các tệp JavaScript/TypeScript (`prisma/seed.js:200`, `src/app/mindmap/treeData.ts:999`, `scripts/build_mach_data.js:202`). Chạy lại lệnh seed để cập nhật cơ sở dữ liệu.

2. **Từ Quan sát 1.3**:
   - Trong tệp mã nguồn JS/TS, chuỗi `"60^\\circ"` trong mảng được `JSON.stringify` biến thành chuỗi JSON chứa `60^\\\\circ`.
   - Khi frontend chạy `JSON.parse(optionsJson)`, chuỗi được hoàn nguyên thành `'60^\circ'`, KaTeX render thành công.
   - Lỗi KaTeX chỉ phát sinh khi công cụ kiểm thử quét nhầm vào chuỗi JSON thô mà không giải mã.
   - Đồng thời, theo chuẩn ngữ nghĩa LaTeX, macro đặt ở số mũ mà không có nhóm ngoặc `{}` (`^\circ`) là cú pháp thiếu chặt chẽ, dễ gây lỗi phân giải.
   - $\implies$ **Biện pháp xử lý**:
     1. Chuẩn hóa toàn bộ công thức số mũ độ thành dạng bọc ngoặc nhọn: `^{\\circ}` (ví dụ: `60^{\\circ}`, `90^{\\circ}`, `45^{\\circ}`, `120^{\\circ}`).
     2. Chuẩn hóa script kiểm thử (Worker & E2E): Bắt buộc gọi `JSON.parse(q.optionsJson)` trước khi trích xuất công thức kiểm tra KaTeX.

3. **Từ Quan sát 1.4**:
   - Ký tự tiếng Việt `Đ` trong môi trường toán học (`$x_{CĐ}$, $y_{CĐ}$`) làm vi phạm chế độ nghiêm ngặt của KaTeX và chuẩn quốc tế LaTeX.
   - Công thức tiệm cận đứng `x_0^\pm` thiếu cặp ngoặc định vị số mũ.
   - $\implies$ **Biện pháp xử lý**:
     - Thay `$x_{CĐ}$` bằng `$x_{\\text{CĐ}}$` hoặc `$x_{CD}$`, `$y_{CT}$` bằng `$y_{\\text{CT}}$` hoặc `$y_{CT}$`.
     - Thay `x_0^\\pm` bằng `x_0^{\\pm}`.

4. **Từ Quan sát 1.5**:
   - Các thẻ JSX chứa `$\to$` và `$D$` được render như văn bản HTML tĩnh thông thường, không được bọc qua component `MathRenderer`.
   - Điều này vi phạm Tiêu chí Nghiệm thu: *"100% công thức, ký hiệu toán học hiển thị chuẩn KaTeX, không có mã lỗi hoặc hiển thị thô"*.
   - $\implies$ **Biện pháp xử lý**:
     - Thay ký hiệu `$\to$` trong văn bản điều hướng giao diện thành ký tự Unicode mũi tên chuẩn: `→` (U+2192).
     - Bọc các ký hiệu toán học `$D$` trong `GrandDetailCard.tsx` bằng `<MathRenderer content="..." />` hoặc ghi rõ nghĩa tiếng Việt *"Tập xác định D"*.

---

## 3. QUY TẮC ESCAPE CHUẨN XÁC CHO JAVASCRIPT / TYPESCRIPT / JSON / TEMPLATE LITERALS

Để đảm bảo toàn bộ nhóm (Worker, Implementer) không bao giờ tái diễn lỗi escape KaTeX, bảng quy tắc bắt buộc áp dụng như sau:

### 3.1. Bảng Đối Chiếu Quy Tắc Chuỗi Ký Tự

| Ngữ cảnh sử dụng | Ký hiệu Toán học mong muốn | Cú pháp viết trong Code | Kết quả trong Bộ nhớ JS | Kết quả chuyển vào KaTeX | Ghi chú & Cảnh báo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Chuỗi JS/TS thông thường** (`"..."` hoặc `'...'`) | $\vec{u}$ | `"\\vec{u}"` | `\vec{u}` | `\vec{u}` | ⚠️ CẤM viết `"\vec{u}"` (bị biến thành `\u000bec{u}`). |
| **Chuỗi JS/TS thông thường** (`"..."` hoặc `'...'`) | $60^\circ$ | `"60^{\\circ}"` | `60^{\circ}` | `60^{\circ}` | Bắt buộc có `{}` bao quanh `\\circ`. |
| **Chuỗi JS/TS thông thường** (`"..."` hoặc `'...'`) | $\frac{a}{b}$ | `"\\frac{a}{b}"` | `\frac{a}{b}` | `\frac{a}{b}` | ⚠️ CẤM viết `"\frac{a}{b}"` (bị biến thành form feed `\x0C`). |
| **Chuỗi JS/TS thông thường** (`"..."` hoặc `'...'`) | $A \times B$ | `"A \\times B"` | `A \times B` | `A \times B` | ⚠️ CẤM viết `"A \times B"` (bị biến thành tab `\t`). |
| **Template Literal** (`` `...` ``) | $\vec{u}$ | `` `\\vec{u}` `` | `\vec{u}` | `\vec{u}` | Vẫn cần 2 dấu gạch chéo `\\`. |
| **Template Literal** (`` `...` ``) | ${x}$ trong math | `` `\${x}` `` hoặc dùng `"..."` | `${x}` | `${x}` | ⚠️ Tránh dùng template literal cho math vì `${...}` gây xung đột nội suy biến JS. |
| **Mảng chuẩn bị `JSON.stringify`** | Phương án $60^\circ$ | `JSON.stringify(["A. $60^{\\circ}$"])` | Mảng chứa `'A. $60^{\circ}$'` | JSON string chứa `60^{\\\\circ}` | Client parse bằng `JSON.parse()` sẽ nhận lại đúng 1 backslash. |
| **Tệp dữ liệu tĩnh JSON** (`.json`) | $\vec{u}$ | `"\\vec{u}"` | `\vec{u}` | `\vec{u}` | Trong file `.json`, backslash bắt buộc viết 2 lần `\\`. |

### 3.2. Quy tắc 3 KHÔNG & 3 PHẢI cho KaTeX trong Dự án
- **3 KHÔNG**:
  1. **KHÔNG** bao giờ để ký tự đơn `\v`, `\f`, `\t`, `\b` trước các lệnh toán học (`\vec`, `\frac`, `\times`, `\begin`, `\bar`). Luôn luôn viết `\\vec`, `\\frac`, `\\times`.
  2. **KHÔNG** sử dụng ký tự có dấu tiếng Việt trực tiếp trong Math Mode (`$x_{CĐ}$`). Luôn bọc qua `\text{...}`: `$x_{\text{CĐ}}$` hoặc dùng ký hiệu quy ước `$x_{CD}$`.
  3. **KHÔNG** đặt ký hiệu toán thô (`$\to$`, `$D$`) trong các thẻ JSX tĩnh (`<p>`, `<h1>`, `<span>`) mà không qua `<MathRenderer>`.
- **3 PHẢI**:
  1. **PHẢI** bọc mọi số mũ chứa macro hoặc nhiều ký tự trong ngoặc nhọn `{}`: `^{\circ}`, `^{\pm}`, `^{10}`.
  2. **PHẢI** gọi `JSON.parse()` khi đọc trường `optionsJson` từ database trước khi trích xuất công thức toán để kiểm thử KaTeX.
  3. **PHẢI** kiểm tra tính cân bằng của các dấu đô-la (số lượng ký tự `$` không bị escape phải luôn là số chẵn).

---

## 4. CÔNG THỨC SỬA LỖI TỪNG DÒNG (EXACT LINE-BY-LINE RECIPES)

Dưới đây là các công thức sửa mã cụ thể, chính xác từng dòng dành cho Worker thực thi:

### Recipe 1: Sửa lỗi `\v` tại `prisma/seed.js` dòng 200
- **Tệp mục tiêu**: `d:\TEST\MATH-STUDY\prisma\seed.js`
- **Dòng**: 200
- **Trước khi sửa (BEFORE)**:
  ```javascript
  notes: "Tích có hướng $[\vec{u}, \vec{v}]$ vuông góc với cả $\\vec{u}$ và $\\vec{v}$. Bấm máy Casio fx-580 qua MENU 5 (VECTOR).",
  ```
- **Sau khi sửa (AFTER)**:
  ```javascript
  notes: "Tích có hướng $[\\vec{u}, \\vec{v}]$ vuông góc với cả $\\vec{u}$ và $\\vec{v}$. Bấm máy Casio fx-580 qua MENU 5 (VECTOR).",
  ```

---

### Recipe 2: Chuẩn hóa `^{\circ}` tại `prisma/seed.js` dòng 180, 280, 627, 628, 629, 679, 681
- **Tệp mục tiêu**: `d:\TEST\MATH-STUDY\prisma\seed.js`
- **Dòng 180**:
  - *BEFORE*:
    ```javascript
    notes: "Góc giữa 2 vectơ nằm trong đoạn $[0^\\circ; 180^\\circ]$, khác với góc giữa 2 đường thẳng nằm trong $[0^\\circ; 90^\\circ]$. Hai vectơ vuông góc khi và chỉ khi tích vô hướng bằng $0$.",
    ```
  - *AFTER*:
    ```javascript
    notes: "Góc giữa 2 vectơ nằm trong đoạn $[0^{\\circ}; 180^{\\circ}]$, khác với góc giữa 2 đường thẳng nằm trong $[0^{\\circ}; 90^{\\circ}]$. Hai vectơ vuông góc khi và chỉ khi tích vô hướng bằng $0$.",
    ```
- **Dòng 280**:
  - *BEFORE*:
    ```javascript
    commonMistakes: "1. Nhầm lẫn giữa góc giữa 2 vectơ và góc giữa 2 đường thẳng (góc giữa 2 vectơ có thể tù, góc giữa 2 đường thẳng luôn $\\le 90^\\circ$).\n2. Quên dấu trừ khi đảo chiều vectơ: $\\vec{BA} = -\\vec{AB}$.",
    ```
  - *AFTER*:
    ```javascript
    commonMistakes: "1. Nhầm lẫn giữa góc giữa 2 vectơ và góc giữa 2 đường thẳng (góc giữa 2 vectơ có thể tù, góc giữa 2 đường thẳng luôn $\\le 90^{\\circ}$).\n2. Quên dấu trừ khi đảo chiều vectơ: $\\vec{BA} = -\\vec{AB}$.",
    ```
- **Dòng 627 - 629 (`Q18_D5_MC`)**:
  - *BEFORE*:
    ```javascript
    explanation: "Vì $ABCD$ là tứ diện đều cạnh $a$ nên tam giác $ABC$ là tam giác đều cạnh $a$.\nDo đó, góc giữa hai vectơ $\\vec{AB}$ và $\\vec{AC}$ chính là góc $\\widehat{BAC} = 60^\\circ$.\nÁp dụng định nghĩa tích vô hướng:\n$\\vec{AB} \\cdot \\vec{AC} = |\\vec{AB}| \\cdot |\\vec{AC}| \\cdot \\cos(\\vec{AB}, \\vec{AC}) = a \\cdot a \\cdot \\cos 60^\\circ = a^2 \\cdot \\frac{1}{2} = \\frac{a^2}{2}$.",
    casioGuide: "Bấm máy tính: Nhập $1 \\times 1 \\times \\cos(60^\\circ) = 0.5 = 1/2$.",
    distractorAnalysis: "Học sinh hay nhầm $\\cos 60^\\circ = \\frac{\\sqrt{3}}{2}$ (nhầm với $\\sin 60^\\circ$) nên chọn nhầm C.",
    ```
  - *AFTER*:
    ```javascript
    explanation: "Vì $ABCD$ là tứ diện đều cạnh $a$ nên tam giác $ABC$ là tam giác đều cạnh $a$.\nDo đó, góc giữa hai vectơ $\\vec{AB}$ và $\\vec{AC}$ chính là góc $\\widehat{BAC} = 60^{\\circ}$.\nÁp dụng định nghĩa tích vô hướng:\n$\\vec{AB} \\cdot \\vec{AC} = |\\vec{AB}| \\cdot |\\vec{AC}| \\cdot \\cos(\\vec{AB}, \\vec{AC}) = a \\cdot a \\cdot \\cos 60^{\\circ} = a^2 \\cdot \\frac{1}{2} = \\frac{a^2}{2}$.",
    casioGuide: "Bấm máy tính: Nhập $1 \\times 1 \\times \\cos(60^{\\circ}) = 0.5 = 1/2$.",
    distractorAnalysis: "Học sinh hay nhầm $\\cos 60^{\\circ} = \\frac{\\sqrt{3}}{2}$ (nhầm với $\\sin 60^{\\circ}$) nên chọn nhầm C.",
    ```
- **Dòng 679 & 681 (`Q21_D6_MC`)**:
  - *BEFORE*:
    ```javascript
    optionsJson: JSON.stringify(["A. $60^\\circ$", "B. $90^\\circ$", "C. $45^\\circ$", "D. $120^\\circ$"]),
    correctAnswer: "A",
    explanation: "Áp dụng công thức tính côsin của góc giữa hai vectơ:\n$\\cos(\\vec{u}, \\vec{v}) = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|} = \\frac{1(0) + 0(1) + 1(1)}{\\sqrt{1^2 + 0^2 + 1^2} \\cdot \\sqrt{0^2 + 1^2 + 1^2}} = \\frac{1}{\\sqrt{2} \\cdot \\sqrt{2}} = \\frac{1}{2}$.\nDo đó: $(\\vec{u}, \\vec{v}) = 60^\\circ$.",
    ```
  - *AFTER*:
    ```javascript
    optionsJson: JSON.stringify(["A. $60^{\\circ}$", "B. $90^{\\circ}$", "C. $45^{\\circ}$", "D. $120^{\\circ}$"]),
    correctAnswer: "A",
    explanation: "Áp dụng công thức tính côsin của góc giữa hai vectơ:\n$\\cos(\\vec{u}, \\vec{v}) = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|} = \\frac{1(0) + 0(1) + 1(1)}{\\sqrt{1^2 + 0^2 + 1^2} \\cdot \\sqrt{0^2 + 1^2 + 1^2}} = \\frac{1}{\\sqrt{2} \\cdot \\sqrt{2}} = \\frac{1}{2}$.\nDo đó: $(\\vec{u}, \\vec{v}) = 60^{\\circ}$.",
    ```

---

### Recipe 3: Chuẩn hóa `^{\circ}` tại `prisma/seed_additional_questions.js` dòng 86 - 90 (`Q31_D5_MC`)
- **Tệp mục tiêu**: `d:\TEST\MATH-STUDY\prisma\seed_additional_questions.js`
- **Dòng 86 - 90**:
  - *BEFORE*:
    ```javascript
    optionsJson: JSON.stringify(["A. $90^\\circ$", "B. $60^\\circ$", "C. $45^\\circ$", "D. $30^\\circ$"]),
    correctAnswer: "A",
    explanation: "Vì $SA \\perp (ABC)$ nên đường thẳng $SA$ vuông góc với mọi đường thẳng nằm trong mặt phẳng $(ABC)$.\nDo đường thẳng $BC \\subset (ABC)$ nên $SA \\perp BC$.\nDo đó tích vô hướng $\\vec{SA} \\cdot \\vec{BC} = 0$.\nVậy góc giữa hai vectơ $\\vec{SA}$ và $\\vec{BC}$ bằng $90^\\circ$.",
    casioGuide: "Dạng lý thuyết hình học: Đường vuông góc với mặt phẳng thì vuông góc với mọi vectơ trong mặt phẳng đó $\\implies$ góc $90^\\circ$.",
    distractorAnalysis: "Học sinh hay nhầm lẫn với góc giữa các cạnh của tam giác đều ($60^\\circ$) nên chọn nhầm B.",
    ```
  - *AFTER*:
    ```javascript
    optionsJson: JSON.stringify(["A. $90^{\\circ}$", "B. $60^{\\circ}$", "C. $45^{\\circ}$", "D. $30^{\\circ}$"]),
    correctAnswer: "A",
    explanation: "Vì $SA \\perp (ABC)$ nên đường thẳng $SA$ vuông góc với mọi đường thẳng nằm trong mặt phẳng $(ABC)$.\nDo đường thẳng $BC \\subset (ABC)$ nên $SA \\perp BC$.\nDo đó tích vô hướng $\\vec{SA} \\cdot \\vec{BC} = 0$.\nVậy góc giữa hai vectơ $\\vec{SA}$ và $\\vec{BC}$ bằng $90^{\\circ}$.",
    casioGuide: "Dạng lý thuyết hình học: Đường vuông góc với mặt phẳng thì vuông góc với mọi vectơ trong mặt phẳng đó $\\implies$ góc $90^{\\circ}$.",
    distractorAnalysis: "Học sinh hay nhầm lẫn với góc giữa các cạnh của tam giác đều ($60^{\\circ}$) nên chọn nhầm B.",
    ```

---

### Recipe 4: Chuẩn hóa `machData.ts` dòng 330, 383, 408, 424, 574, 578
- **Tệp mục tiêu**: `d:\TEST\MATH-STUDY\src\app\mindmap\machData.ts`
- **Dòng 330**:
  - *BEFORE*: `$\\lim_{x \\to x_0^\\pm} f(x) = \\pm \\infty$`
  - *AFTER*: `$\\lim_{x \\to x_0^{\\pm}} f(x) = \\pm \\infty$`
- **Dòng 383**:
  - *BEFORE*: `"theory": "Quy tắc nhận diện đồ thị qua 5 bước: ... 4. Tọa độ điểm cực trị $(x_{CĐ}; y_{CĐ})$, $(x_{CT}; y_{CT})$. ..."`
  - *AFTER*: `"theory": "Quy tắc nhận diện đồ thị qua 5 bước: ... 4. Tọa độ điểm cực trị $(x_{\\text{CĐ}}; y_{\\text{CĐ}})$, $(x_{\\text{CT}}; y_{\\text{CT}})$. ..."`
- **Dòng 408**:
  - *BEFORE*: `"methods": "... Đếm số giao điểm của đường thẳng $y = m$ với đồ thị: nếu $y_{CT} < m < y_{CĐ} \\implies 3$ nghiệm ..."`
  - *AFTER*: `"methods": "... Đếm số giao điểm của đường thẳng $y = m$ với đồ thị: nếu $y_{\\text{CT}} < m < y_{\\text{CĐ}} \\implies 3$ nghiệm ..."`
- **Dòng 424**:
  - *BEFORE*: `"content": "... Cho đồ thị hàm số bậc ba $y = f(x)$ có $y_{CĐ}=3, y_{CT}=-1$. Tìm số nghiệm thực của phương trình $2f(x) - 1 = 0$."`
  - *AFTER*: `"content": "... Cho đồ thị hàm số bậc ba $y = f(x)$ có $y_{\\text{CĐ}}=3, y_{\\text{CT}}=-1$. Tìm số nghiệm thực của phương trình $2f(x) - 1 = 0$."`
- **Dòng 574 & 578**:
  - *BEFORE*:
    ```typescript
    574: "mistakes": "Nhầm góc giữa 2 vectơ với góc giữa 2 đường thẳng (góc giữa 2 vectơ có thể tù $>90^\\circ$, nhưng góc giữa 2 đường thẳng luôn $\\le 90^\\circ$).",
    578: "answer": "C. $60^\\circ$"
    ```
  - *AFTER*:
    ```typescript
    574: "mistakes": "Nhầm góc giữa 2 vectơ với góc giữa 2 đường thẳng (góc giữa 2 vectơ có thể tù $> 90^{\\circ}$, nhưng góc giữa 2 đường thẳng luôn $\\le 90^{\\circ}$).",
    578: "answer": "C. $60^{\\circ}$"
    ```

---

### Recipe 5: Chuẩn hóa `mindmapQuestions.ts` dòng 535 - 537, 564, 566, 578
- **Tệp mục tiêu**: `d:\TEST\MATH-STUDY\src\app\mindmap\mindmapQuestions.ts`
- **Dòng 535 - 537**: Thay `60^\\circ` bằng `60^{\\circ}`.
- **Dòng 564**:
  - *BEFORE*: `options: ["A. $90^\\circ$", "B. $60^\\circ$", "C. $45^\\circ$", "D. $120^\\circ$"],`
  - *AFTER*: `options: ["A. $90^{\\circ}$", "B. $60^{\\circ}$", "C. $45^{\\circ}$", "D. $120^{\\circ}$"],`
- **Dòng 566**: Thay `90^\\circ` bằng `90^{\\circ}`.
- **Dòng 578**: Thay `90^\\circ` bằng `90^{\\circ}`.

---

### Recipe 6: Sửa lỗi hiển thị mã thô trong JSX
1. **`src/app/page.tsx` dòng 112**:
   - *BEFORE*:
     ```tsx
     <p className="text-xs text-slate-600 mt-2 leading-relaxed">
       Cây tri thức tương tác 4 tầng: Gốc $\to$ Chương $\to$ Chủ đề $\to$ Dạng toán $\to$ 4 nhánh lá (Lý thuyết, Dấu hiệu, Phương pháp, Cạm bẫy) và nhúng GeoGebra 3D.
     </p>
     ```
   - *AFTER*:
     ```tsx
     <p className="text-xs text-slate-600 mt-2 leading-relaxed">
       Cây tri thức tương tác 4 tầng: Gốc → Chương → Chủ đề → Dạng toán → 4 nhánh lá (Lý thuyết, Dấu hiệu, Phương pháp, Cạm bẫy) và nhúng GeoGebra 3D.
     </p>
     ```
2. **`src/app/team-admin/page.tsx` dòng 514**:
   - *BEFORE*:
     ```tsx
     4. Xuất Bộ Hồ Sơ Minh Chứng Nộp Giáo Viên (Mục I $\to$ IX &amp; Bổ sung)
     ```
   - *AFTER*:
     ```tsx
     4. Xuất Bộ Hồ Sơ Minh Chứng Nộp Giáo Viên (Mục I → IX &amp; Bổ sung)
     ```
3. **`src/app/mindmap/GrandDetailCard.tsx` dòng 128 & 179**:
   - *BEFORE (Dòng 128)*: `<BookOpen size={12} /> 1. Lý thuyết ($D$)`
   - *AFTER (Dòng 128)*: `<BookOpen size={12} /> 1. Lý thuyết (Tập xác định D)`
   - *BEFORE (Dòng 179)*: `Định lý &amp; Công thức (KaTeX) kèm Điều kiện $D$:`
   - *AFTER (Dòng 179)*: `Định lý &amp; Công thức (KaTeX) kèm Điều kiện Tập xác định D:`

---

### Recipe 7: Sửa lỗi `\u000b` trong `treeData.ts` và `build_mach_data.js`
1. **`src/app/mindmap/treeData.ts` dòng 999**:
   - Thay `[\u000bec{u}, \\vec{v}]` thành `[\\vec{u}, \\vec{v}]`.
2. **`scripts/build_mach_data.js` dòng 202**:
   - Thay `$|\vec{i}|$` thành `$|\\vec{i}|$`.

---

## 5. CAVEATS (CÁC VẤN ĐỀ CẦN LƯU Ý & GIẢ ĐỊNH)

1. **Quá trình cập nhật Cơ sở dữ liệu SQLite**:
   - Chỉnh sửa tệp `prisma/seed.js` chỉ thay đổi mã nguồn. Để cơ sở dữ liệu `prisma/dev.db` được cập nhật bản ghi `KnowledgeItem[9]`, Worker bắt buộc phải chạy lệnh nạp dữ liệu:
     `node prisma/seed.js`
   - Cần đảm bảo dữ liệu mới không làm mất các câu hỏi đã bổ sung từ `seed_additional_questions.js`.
2. **Thư viện KaTeX và cấu hình strict mode**:
   - Trong `src/components/MathRenderer.tsx`, tùy chọn `throwOnError: false` đang được kích hoạt. Khi gặp cảnh báo (như Unicode `Đ`), KaTeX không làm sập trang web nhưng sẽ log cảnh báo đỏ vào browser console. Sửa thành `\text{CĐ}` sẽ giải quyết triệt để cảnh báo console.
3. **Mở rộng 37 phân dạng toán trong Milestone 1**:
   - Khi Worker tích hợp 37 phân dạng mới vào `MathCategory` hoặc cập nhật `machData.ts`, toàn bộ nội dung công thức toán học mới bổ sung phải tuân thủ nghiêm ngặt Bảng Quy Tắc Escape tại Mục 3 của báo cáo này.

---

## 6. CONCLUSION (KẾT LUẬN & ĐỀ XUẤT HÀNH ĐỘNG)

1. **Kết luận về lỗi `\v`**:
   - Đây là lỗi cú pháp thực sự (fatal error) gây hỏng hiển thị công thức tích có hướng của `KnowledgeItem[9]` trong SQLite DB, cũng như trong `treeData.ts:999` và `build_mach_data.js:202`. Nguyên nhân là do escape thiếu 1 dấu gạch chéo (`\v` thay vì `\\v`).
2. **Kết luận về lỗi `^\circ`**:
   - 8 lỗi KaTeX được báo cáo trước đây tại `Q21_D6_MC` và `Q31_D5_MC` là lỗi do công cụ quét sơ bộ không chạy `JSON.parse()` trước khi trích xuất công thức từ cột `optionsJson`. Tuy nhiên, mã nguồn vẫn cần chuẩn hóa số mũ sang dạng có ngoặc `{}` (`^{\circ}`) để đảm bảo chuẩn mực TeX cao nhất.
3. **Kết luận về `machData.ts` và `mindmapQuestions.ts`**:
   - Không có lỗi cú pháp chết người nào khiến KaTeX văng exception. Đã phát hiện và cung cấp công thức xử lý 4 cảnh báo Unicode `Đ` và các vị trí thiếu ngoặc nhọn `{}` trên số mũ.
4. **Kết luận về hiển thị thô trong JSX**:
   - Đã phát hiện 4 vị trí ký hiệu toán học thô (`$\to$`, `$D$`) trong giao diện tĩnh và cung cấp công thức thay thế bằng ký tự Unicode tương đương hoặc làm rõ nghĩa tiếng Việt.

---

## 7. VERIFICATION METHOD (HƯỚNG DẪN KIỂM CHỨNG ĐỘC LẬP CHO WORKER)

Worker sau khi áp dụng các Recipe trên có thể chạy các lệnh kiểm chứng độc lập sau để nghiệm thu:

### 7.1. Lệnh kiểm tra không còn ký tự điều khiển `\u000b` trong Database và File
```powershell
node -e @'
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

async function verify() {
  const k = await prisma.knowledgeItem.findFirst({ where: { order: 9 } });
  if (k.notes.includes("\u000b")) {
    console.error("FAIL: KnowledgeItem.notes still contains \\u000b!");
  } else {
    console.log("PASS: KnowledgeItem.notes has NO control characters.");
  }
  
  const tree = fs.readFileSync("src/app/mindmap/treeData.ts", "utf8");
  if (tree.includes("\u000b")) {
    console.error("FAIL: treeData.ts still contains \\u000b!");
  } else {
    console.log("PASS: treeData.ts clean.");
  }
}
verify().finally(() => prisma.$disconnect());
'@
```

### 7.2. Lệnh quét KaTeX nghiêm ngặt toàn diện (Strict KaTeX Scanner với `throwOnError: true`)
```powershell
node -e @'
const katex = require("katex");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  let errorCount = 0;
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;

  function testMath(text, label) {
    if (!text) return;
    let m;
    while ((m = regex.exec(text)) !== null) {
      const isBlock = m[0].startsWith("$$");
      const formula = isBlock ? m[0].slice(2, -2).trim() : m[0].slice(1, -1).trim();
      try {
        katex.renderToString(formula, { displayMode: isBlock, throwOnError: true });
      } catch(e) {
        console.error(`ERROR at ${label}: [${formula}] -> ${e.message}`);
        errorCount++;
      }
    }
  }

  const items = await prisma.knowledgeItem.findMany();
  items.forEach(it => { testMath(it.formulaLatex, "Knowledge.formula"); testMath(it.notes, "Knowledge.notes"); });

  const questions = await prisma.question.findMany();
  questions.forEach(q => {
    testMath(q.content, `Q[${q.code}].content`);
    testMath(q.explanation, `Q[${q.code}].explanation`);
    if (q.optionsJson) {
      try {
        const opts = JSON.parse(q.optionsJson);
        if (Array.isArray(opts)) opts.forEach((o, i) => testMath(o, `Q[${q.code}].opt[${i}]`));
      } catch(e) {}
    }
  });

  console.log(`\n=== STRICT KATEX SCAN COMPLETE: ${errorCount} errors found ===`);
}
run().finally(() => prisma.$disconnect());
'@
```
*Điều kiện thành công*: Số lỗi phát hiện = `0`.

### 7.3. Lệnh kiểm tra build sản phẩm
```powershell
npm run build
```
*Điều kiện thành công*: Lệnh kết thúc với mã thoát `0` (Success) và không có bất kỳ lỗi TypeScript nào.
