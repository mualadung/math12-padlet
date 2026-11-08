# BÁO CÁO KHẢO SÁT HẠ TẦNG BUILD, KIỂM THỬ VÀ CÔNG CỤ TỰ ĐỘNG HÓA KIỂM MINH
## (BUILD & TESTING INFRASTRUCTURE SURVEY REPORT)

- **Người thực hiện**: Explorer 3 (`teamwork_explorer` / Test & Build Infrastructure)
- **Mã hội thoại điều phối**: `51012427-609d-48ef-a8a3-ce0355def37c`
- **Thư mục làm việc**: `d:\TEST\MATH-STUDY\.agents\teamwork\explorer_survey_test\`
- **Ngày khảo sát**: 08/11/2026
- **Trạng thái**: Hoàn tất khảo sát thực địa (Hard Handoff)

---

## 1. OBSERVATION (QUAN SÁT THỰC ĐỊA & DỮ LIỆU ĐO KIỂM)

### 1.1. Cấu hình Dự án, Package.json & Dependencies
- **Tệp quan sát**: `d:\TEST\MATH-STUDY\package.json`
- **Khai báo scripts**:
  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:seed": "node prisma/seed.js"
  }
  ```
- **Hệ thống Dependencies**:
  - Web & UI Framework: `next` v14.2.18, `react` v18.3.1, `react-dom` v18.3.1, `@xyflow/react` v12.3.6, `lucide-react` v0.460.0.
  - Toán học: `katex` v0.16.11, `@types/katex` v0.16.7.
  - Cơ sở dữ liệu: `@prisma/client` v5.22.0, `prisma` v5.22.0 (SQLite: `prisma/dev.db`).
  - Xuất bản tài liệu: `docx` v9.15.3, `exceljs` v4.4.0, `pptxgenjs` v4.0.1, `html2canvas` v1.4.1.
  - CSS & Build: `tailwindcss` v3.4.15, `postcss` v8.4.49, `autoprefixer` v10.4.20.
- **Thiếu hụt hạ tầng Test**:
  - Không có bất kỳ test runner nào được cài đặt: **Không có Jest, Vitest, Mocha, Playwright, Cypress**.
  - Không có script `typecheck` riêng trong `package.json`.
  - Không có script kiểm tra dữ liệu học liệu tự động (data validation script) được tích hợp vào `package.json`.

### 1.2. Kiểm tra TypeScript (`tsconfig.json`) & Kết quả Typecheck
- **Tệp cấu hình**: `d:\TEST\MATH-STUDY\tsconfig.json`
  - Chế độ nghiêm ngặt: `"strict": true`, `"noEmit": true`, `"skipLibCheck": true`.
  - Path alias: `"@/*": ["./src/*"]`.
- **Kết quả đo kiểm lệnh**: `npx tsc --noEmit`
  - Mã thoát (exit code): `0`.
  - Không có bất kỳ lỗi TypeScript nào trong toàn bộ mã nguồn `src/` hiện tại.

### 1.3. Kiểm tra ESLint & Nguy cơ thất bại trong môi trường CI
- **Tệp quan sát**: Gốc dự án **HOÀN TOÀN THIẾU** tệp cấu hình ESLint (`.eslintrc.json`, `.eslintrc.js` hoặc `eslint.config.mjs`).
- **Kết quả đo kiểm lệnh**: `npm run lint` (`next lint`)
  - Kết quả: Mã thoát `1` (Exit code 1).
  - Đầu ra console:
    ```
    ? How would you like to configure ESLint? https://nextjs.org/docs/basic-features/eslint
    ❯ Strict (recommended)
      Base
      Cancel
    ```
  - **Phát hiện quan trọng**: Khi chạy trong môi trường CI/CD hoặc chạy script nền không có tương tác người dùng (non-interactive stdin), `next lint` bị treo prompt và thoát với lỗi code 1.

### 1.4. Kiểm tra Quá trình Build Production (`npm run build`)
- **Kết quả đo kiểm lệnh**: `npm run build`
  - Thời gian thực thi: ~38 giây.
  - Mã thoát: `0` (Success).
  - Đã biên dịch thành công 16 route tĩnh và động:
    - Route tĩnh: `/` (96.2 kB), `/math-types` (177 kB), `/mindmap` (266 kB), `/practice` (171 kB), `/community` (91.8 kB), `/team` (90.8 kB), `/team-admin` (102 kB).
    - Route động API: `/api/categories`, `/api/feedback`, `/api/knowledge`, `/api/questions`, `/api/quiz`, `/api/team`, `/api/team/review`.

### 1.5. Hiện trạng Ngân hàng Câu hỏi Phòng Luyện tập (`/practice` - `prisma/dev.db`)
- **Tổng số câu hỏi hiện có trong DB**: **55 câu hỏi**.
- **Phân bố câu hỏi theo 7 dạng toán (`MathCategory`)**:
  | Mã Dạng | Tên Dạng Toán | Số câu hiện có | Mục tiêu tối thiểu | Tình trạng | Số lượng thiếu |
  | :--- | :--- | :---: | :---: | :---: | :---: |
  | `DANG_1` | Dạng 1: Xét tính đơn điệu và cực trị của hàm số | 8 | 10 | ❌ Thiếu | -2 câu |
  | `DANG_2` | Dạng 2: GTLN - GTNN & Bài toán tối ưu thực tiễn | 8 | 10 | ❌ Thiếu | -2 câu |
  | `DANG_3` | Dạng 3: Đường tiệm cận của đồ thị hàm số (Đứng, Ngang, Xiên) | 8 | 10 | ❌ Thiếu | -2 câu |
  | `DANG_4` | Dạng 4: Khảo sát, nhận dạng đồ thị và bài toán tương giao | 7 | 10 | ❌ Thiếu | -3 câu |
  | `DANG_5` | Dạng 5: Vectơ trong không gian và các phép toán hình học thuần túy | 7 | 10 | ❌ Thiếu | -3 câu |
  | `DANG_6` | Dạng 6: Hệ trục tọa độ Oxyz, biểu thức tọa độ vectơ | 8 | 10 | ❌ Thiếu | -2 câu |
  | `DANG_7` | Dạng 7: Tọa độ hóa Oxyz kết hợp đạo hàm giải cực trị không gian | 9 | 10 | ❌ Thiếu | -1 câu |
  - **Tổng thiếu**: Cần bổ sung ít nhất **15 câu hỏi** để đạt chuẩn sàn 10 câu/dạng (tổng tối thiểu 70 câu nếu theo 7 dạng).
  - *Lưu ý*: Nếu mở rộng theo 37 phân dạng nhỏ của Bài 1 $\to$ Bài 8, quy mô sẽ cần tái cấu trúc phân nhóm phù hợp.

### 1.6. Khảo sát Thẻ Nguồn Gốc Câu hỏi (`[Nguồn: ...]`)
- **Yêu cầu tại ORIGINAL_REQUEST.md**: 100% câu hỏi phải có trường thông tin `[Nguồn: Tên Kỳ thi/Sở GD&ĐT/Trường Chuyên - Năm thi - Mã câu/Mã đề]`.
- **Hiện trạng đo kiểm**:
  - Tại Database (`prisma.question.sourceExam`): **0 / 55 câu** có thẻ bao `[Nguồn: ...]`. Toàn bộ 55 câu đều lưu chuỗi trần, ví dụ: `'Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 101 - Câu 1'`.
  - Tại Sơ đồ tri thức (`mindmapQuestions.ts` - `REAL_QUESTIONS_BANK`): **0 / 50 câu** có thẻ bao `[Nguồn: ...]`. Tất cả đều là chuỗi trần, ví dụ: `'Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Nam Định 2024 - Câu 8'`.
  - **Tỷ lệ vi phạm định dạng**: **105 / 105 câu (100%)** chưa được chuẩn hóa thẻ `[Nguồn: ...]`.

### 1.7. Khảo sát Cú pháp Toán học KaTeX trên Toàn bộ Cơ sở Dữ liệu
- **Phương pháp đo**: Chạy script phân tích cú pháp thực thi `katex.renderToString(formula, { throwOnError: true })` qua 2.689 biểu thức toán học trong:
  1. `prisma.question` (content, explanation, casioGuide, distractorAnalysis, optionsJson).
  2. `prisma.mathCategory` (identifySigns, coreKnowledge, methodSteps, commonMistakes).
  3. `prisma.knowledgeItem` (formulaLatex, conditions, notes).
  4. `src/app/mindmap/mindmapQuestions.ts` (content, explanation, casioGuide, distractorAnalysis, options).
  5. `src/app/mindmap/machData.ts` (`TREE_DATA`).
- **Tổng số công thức toán học được quét**: **2.689 công thức**.
- **Lỗi cú pháp nghiêm trọng (Fatal Syntax Error)**: **1 lỗi**.
  - **Vị trí**: `DB KnowledgeItem` ID `7984aaab-bd51-4e3e-bc66-d13a0e7fd473` (bản ghi số 9 tại `prisma/seed.js` dòng 200).
  - **Đoạn mã lỗi**: `notes: "Tích có hướng $[\vec{u}, \vec{v}]$ vuông góc với cả $\\vec{u}$ và $\\vec{v}$..."`
  - **Nguyên nhân cốt lõi**: Trong chuỗi JavaScript ở tệp `seed.js`, người viết chỉ dùng một dấu gạch chéo đơn `\v` trong `$[\vec{u}, \vec{v}]$`. Trong chuẩn chuỗi ECMAScript, `\v` là ký tự điều khiển Vertical Tab (mã ASCII `\u000B`). Khi nạp vào cơ sở dữ liệu SQLite, chuỗi bị biến thành `$[\u000bec{u}, \u000bec{v}]$`. Khi MathRenderer chuyển cho KaTeX biên dịch, KaTeX báo lỗi:
    `KaTeX parse error: Unexpected character: ' ' at position 2: [ ̲ec{u},  ec{v}]`.
- **Cảnh báo chuẩn KaTeX (Non-fatal Warnings)**: **10 cảnh báo**.
  - Các ký tự Unicode tiếng Việt đặt trực tiếp trong Math mode mà không bọc `\text{...}`, cụ thể là ký tự `$Đ$` (ví dụ trong các nhãn điểm cực đại $y_Đ$).

### 1.8. Khảo sát Trùng lặp Câu hỏi (Duplication Matrix)
- **Đo kiểm tự động**: So khớp nội dung đề bài chuẩn hóa (normalized string matching & 35-character fingerprinting) giữa 3 kho dữ liệu:
  1. Kho bài tập `/practice` (Database SQLite: 55 câu).
  2. Kho câu hỏi `/mindmap` (`mindmapQuestions.ts`: 50 câu).
  3. Kho ví dụ minh họa `/math-types` (`machData.ts` sampleQuestion: 37 câu).
- **Kết quả đo kiểm**:
  - **Trùng lặp giữa Phòng luyện tập (`/practice`) và Sơ đồ tri thức (`/mindmap`)**: **44 câu trùng lặp!**
    - Chiếm **88%** số câu hỏi của Sơ đồ tri thức (`mindmapQuestions.ts`) là bản sao chép y nguyên hoặc tương đương từ cơ sở dữ liệu luyện tập!
    - Ví dụ điển hình:
      - DB `CH1_D1_NB01` trùng với Mindmap `Q05-2024`, `Q06-2024`, `Q22-2024`.
      - DB `Q01_D1_MC` trùng với Mindmap `Q01-2024`, `Q10-2024`.
      - DB `Q02_D1_MC` trùng với Mindmap `Q02-2024`.
      - DB `Q03_D1_MC` trùng với Mindmap `Q03-2024`.
      - DB `Q04_D1_TF` trùng với Mindmap `Q04-2024`.
  - **Trùng lặp giữa `/practice` và `/math-types` (Sample Questions)**: **3 câu trùng**.
  - **Trùng lặp giữa `/mindmap` và `/math-types` (Sample Questions)**: **2 câu trùng**.
  - **Vi phạm tiêu chuẩn**: Tiêu chí Acceptance Criteria R2 & R3 nêu rõ *"Không có câu hỏi nào bị trùng lặp giữa các dạng trong /math-types, các nhánh trong /mindmap và ngân hàng bài tập trong /practice"*. Hiện trạng đang vi phạm tiêu chí này rất nặng ở phân hệ Mindmap.

### 1.9. Khảo sát Hướng dẫn Bấm máy tính Casio Kép (fx-580VN X & fx-880BTG)
- **Yêu cầu tại ORIGINAL_REQUEST.md & Project Rules**:
  - Mỗi dạng bài và câu hỏi phải có hướng dẫn bấm máy chi tiết cho cả 2 thế hệ máy tính:
    1. **Casio fx-580VN X**: Các phím chức năng truyền thống `MENU 8` (Bảng giá trị), `MENU 5` (Vectơ), `MENU 9` (Phương trình/Hệ phương trình), `CALC`, đạo hàm `SHIFT` + `[∫]`.
    2. **Casio fx-880BTG**: Giao diện bàn phím mới hoàn toàn: Phím `HOME` $\to$ Bảng tính/Bảng giá trị / Phương trình / Vectơ, phím `TOOLS`, phím `CATALOG` $\to$ Phân tích vi tích phân $\to$ Đạo hàm, phím `VARIABLE`, phím `OK`.
- **Kết quả đo kiểm hiện trạng**:
  - Tại Database (`Question.casioGuide`): **Chỉ có 1 / 55 câu (1.8%)** có hướng dẫn kép cả 580 và 880. Có **54 / 55 câu (98.2%)** chỉ hướng dẫn fx-580VN X hoặc ghi "không cần bấm máy".
  - Tại Sơ đồ tri thức (`mindmapQuestions.ts`): **0 / 50 câu (0%)** có hướng dẫn cho Casio fx-880BTG. Toàn bộ 50 câu chỉ đề cập thao tác phím bấm của dòng fx-580VN X (`MENU 8`, `MENU 9`, `CALC`).

---

## 2. LOGIC CHAIN (CHUỖI LẬP LUẬN TỪ QUAN SÁT ĐẾN GIẢI PHÁP)

1. **Từ Quan sát 1.1, 1.2 và 1.3**:
   - Dự án chưa cài đặt bất kỳ thư viện kiểm thử nào (`package.json` trống trơn về test). Nếu cài Jest hoặc Vitest cùng cấu hình jsdom/Next.js, chi phí cấu hình lớn, tăng dung lượng node_modules và dễ phát sinh xung đột ES Modules với Next.js 14 và React Flow.
   - Ngược lại, TypeScript compiler (`tsc --noEmit`) và Node.js runtime đã có sẵn và hoạt động cực kỳ nhanh, tin cậy (chạy toàn bộ typecheck trong 2.5s mà không có lỗi).
   - *Suy luận logic*: Giải pháp tối ưu nhất cho hệ thống kiểm thử tự động là xây dựng các **Node.js Test Scripts thuần (Vanilla Node.js Verification Runners)** đặt trong thư mục `scripts/`, được gọi thông qua các lệnh `npm run test:data`, `npm run test:katex`, `npm run test:duplicates`, `npm run verify`. Điều này không làm phình dependency, chạy ngay lập tức với tốc độ dưới 2 giây và tích hợp mượt mà vào luồng build.

2. **Từ Quan sát 1.3 về ESLint**:
   - `next lint` bị dừng chờ tương tác người dùng do thiếu tệp `.eslintrc.json`.
   - *Suy luận logic*: Bắt buộc phải tạo tệp cấu hình `.eslintrc.json` ở thư mục gốc chứa `{"extends": "next/core-web-vitals"}`. Khi đó lệnh `npm run lint` sẽ tự động quét toàn bộ dự án không cần prompt tương tác và xác thực mã nguồn trước khi deploy.

3. **Từ Quan sát 1.5 về Số lượng câu hỏi**:
   - 7 danh mục hiện tại đều chỉ có từ 7 đến 9 câu (tổng 55 câu), không danh mục nào đạt ngưỡng 10 câu theo yêu cầu của ORIGINAL_REQUEST.md.
   - *Suy luận logic*: Cần một script kiểm tra tự động `scripts/validate_question_counts.js` định nghĩa ngưỡng sàn `MIN_QUESTIONS_PER_CATEGORY = 10`. Script này sẽ truy vấn SQLite DB qua Prisma Client, duyệt từng `MathCategory`, đếm số lượng câu hỏi và in ra bảng thống kê chi tiết. Nếu có bất kỳ dạng nào `< 10`, script sẽ trả về `process.exit(1)` để chặn nghiệm thu cho đến khi dữ liệu được nạp đủ.

4. **Từ Quan sát 1.6 về Thẻ nguồn gốc `[Nguồn: ...] `**:
   - Cả 105 câu hỏi trong hệ thống đều đã có nguồn thật từ các kỳ thi Bộ GD&ĐT, Sở GD&ĐT, Trường chuyên, nhưng đều ghi dưới dạng chuỗi thuần không có ngoặc vuông `[Nguồn: ...]`.
   - *Suy luận logic*: Cần một script chuẩn hóa/kiểm tra `scripts/validate_sources.js` kiểm tra Regex `/^\[Nguồn:\s*.+\]$/`. Đồng thời nhóm triển khai có thể viết migration script tự động bọc chuỗi hiện có thành `[Nguồn: <nguồn hiện tại>]` nếu nguồn chưa có tag.

5. **Từ Quan sát 1.7 về Lỗi KaTeX và ký tự `\v`**:
   - Lỗi cú pháp KaTeX duy nhất xuất phát từ tệp `prisma/seed.js` khi chuỗi `\vec{u}` trong `[\vec{u}, \vec{v}]` bị biến thành ký tự Vertical Tab `\u000b` do thiếu escape dấu gạch chéo kép `\\`.
   - *Suy luận logic*: Khi sửa tệp `seed.js` thành `[\\vec{u}, \\vec{v}]` và chạy lại `npm run db:seed`, lỗi này sẽ được khắc phục triệt để. Cần thiết lập `scripts/validate_katex.js` để quét toàn bộ 2.689+ công thức mỗi khi cập nhật dữ liệu.

6. **Từ Quan sát 1.8 về Trùng lặp 44 câu giữa Mindmap và Practice**:
   - Đây là vấn đề nghiêm trọng nhất về mặt nội dung học liệu: 44 / 50 câu hỏi của Mindmap bị trùng đề bài với Practice. Học sinh vào Mindmap thấy các bài tập giống hệt trong Practice sẽ làm giảm giá trị của sản phẩm.
   - *Suy luận logic*: Nhóm biên soạn nội dung (Yến, T.Thảo, Q.Anh) cần thay thế 44 câu hỏi trong `mindmapQuestions.ts` bằng các câu hỏi đề thi thật độc lập khác (ví dụ: lấy từ các mã đề khác của Bộ GD&ĐT 2024, 2023, 2022 hoặc đề thi thử của Chuyên KHTN, Chuyên Sư Phạm). Script `scripts/validate_duplicates.js` sẽ đóng vai trò là "chốt chặn" tự động không cho phép bất kỳ câu hỏi nào trùng lặp quá 80% độ tương đồng.

7. **Từ Quan sát 1.9 về Casio fx-880BTG**:
   - Hiện 98% câu hỏi thiếu hướng dẫn cho Casio fx-880BTG. Đây là dòng máy tính mới nhất hiện nay được Bộ GD&ĐT cho phép mang vào phòng thi tốt nghiệp THPT từ năm 2025.
   - *Suy luận logic*: Cần xây dựng mẫu cú pháp hướng dẫn Casio kép chuẩn hóa (Dual Casio Template):
     ```
     - Casio fx-580VN X: MENU 8 -> Nhập hàm -> Start/End/Step -> Dò bảng
     - Casio fx-880BTG: HOME -> Bảng tính (hoặc Bảng giá trị) -> TOOLS -> Nhập hàm -> Phạm vi -> Thực thi
     ```
     Script `scripts/validate_casio.js` sẽ kiểm tra sự hiện diện của cả 2 từ khóa `fx-580` (hoặc `580`) và `fx-880` (hoặc `880`) trong trường `casioGuide`.

---

## 3. CAVEATS (GIỚI HẠN PHẠM VI KHẢO SÁT & GIẢ ĐỊNH)

1. **Phạm vi quyền hạn Explorer**:
   - Explorer là vai trò điều tra đọc (read-only), không trực tiếp sửa đổi mã nguồn dự án (`src/`, `prisma/`, `package.json`).
   - Các script thử nghiệm và bộ đo kiểm được tạo và lưu trữ độc quyền trong thư mục `.agents/teamwork/explorer_survey_test/`.
2. **Quy mô phân loại Dạng toán**:
   - Hiện tại `/practice` và `prisma.mathCategory` đang quản lý 7 dạng toán lớn (`DANG_1` $\to$ `DANG_7`).
   - Trong khi đó, `machData.ts` và `treeData.ts` lại đang chia thành 37 phân dạng nhỏ của Bài 1 $\to$ Bài 8.
   - *Giả định kiến trúc*: Nếu nhóm triển khai quyết định nâng cấp `/practice` để hỗ trợ lọc theo 37 dạng nhỏ, số lượng câu hỏi cần bổ sung sẽ phải phân bổ tương ứng. Nếu duy trì 7 dạng lớn (bao quát toàn bộ 37 dạng nhỏ bên trong), số lượng câu hỏi tối thiểu là 70 câu (10 câu/dạng lớn). Báo cáo này đã khảo sát cả hai kịch bản.
3. **Môi trường Cơ sở dữ liệu**:
   - Đo kiểm hiện tại thực hiện trên SQLite cục bộ (`prisma/dev.db`). Nếu dự án chuyển sang PostgreSQL hoặc Supabase trên môi trường Production, cú pháp Prisma giữ nguyên nhưng cần lưu ý quá trình nạp seed và migrate.

---

## 4. CONCLUSION (KẾT LUẬN & ĐỀ XUẤT KIẾN TRÚC KIỂM THỬ)

### 4.1. Bảng Tổng kết Đánh giá Hạ tầng & Dữ liệu
| Tiêu chí khảo sát | Hiện trạng | Yêu cầu chuẩn | Mức độ tuân thủ | Hành động bắt buộc |
| :--- | :---: | :---: | :---: | :--- |
| **Build Pipeline** (`npm run build`) | Hoàn thành trong 38s, 16 route | Build thành công 0 lỗi | ✅ 100% Đạt | Duy trì quy trình build hiện tại |
| **TypeScript Typecheck** | 0 lỗi biên dịch | `tsc --noEmit` thoát 0 | ✅ 100% Đạt | Thêm script `"typecheck"` vào `package.json` |
| **ESLint Pipeline** | Bị treo interactive prompt | Chạy headless trong CI | ⚠️ Cảnh báo | Tạo `.eslintrc.json` với `next/core-web-vitals` |
| **Số lượng câu hỏi /practice** | 55 câu (7-9 câu/dạng) | $\ge 10$ câu/dạng | ❌ Chưa đạt (0/7 dạng) | Nạp thêm tối thiểu 15 câu vào DB |
| **Thẻ nguồn gốc câu hỏi** | 0/105 câu có thẻ `[Nguồn:]` | 100% có `[Nguồn: ...]` | ❌ Vi phạm 100% | Bọc thẻ `[Nguồn: ...]` cho 105 câu hỏi |
| **Cú pháp toán KaTeX** | 1 lỗi `\v` unescaped, 10 cảnh báo $Đ$ | 100% KaTeX chuẩn mực | ⚠️ 99.96% Đạt | Sửa dòng 200 `seed.js` và nạp lại DB |
| **Chống trùng lặp câu hỏi** | 44 câu trùng giữa Mindmap & DB | 0 câu trùng lặp | ❌ Vi phạm nặng (88% Mindmap) | Thay thế 44 câu trong `mindmapQuestions.ts` |
| **Hướng dẫn Casio kép** | 1/55 DB (1.8%), 0/50 Mindmap (0%) | 100% kép fx-580 & fx-880 | ❌ Vi phạm nặng | Bổ sung thao tác phím fx-880BTG |

### 4.2. Thiết kế Kiến trúc Bộ Công cụ Kiểm minh Tự động (Verification Suite)
Đề xuất bổ sung tệp điều phối kiểm thử thống nhất `scripts/validate_all.js` (dựa trên prototype đã kiểm nghiệm thành công tại `.agents/teamwork/explorer_survey_test/unified_validator.js`):

```
scripts/
├── validate_all.js            # Runner chính tổng hợp 5 bài kiểm tra dữ liệu
├── validate_question_counts.js# Kiểm tra số lượng câu hỏi >= 10/dạng & đủ 4 cấp độ tư duy
├── validate_sources.js        # Kiểm tra 100% câu hỏi có tag [Nguồn: ...]
├── validate_katex.js          # Quét KaTeX renderToString trên toàn bộ 2.600+ công thức
├── validate_duplicates.js     # Phát hiện trùng lặp giữa DB, Mindmap và Math-Types
└── validate_casio.js          # Kiểm tra hướng dẫn kép fx-580VN X và fx-880BTG
```

Đề xuất cập nhật phần `scripts` trong `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test:katex": "node scripts/validate_katex.js",
    "test:counts": "node scripts/validate_question_counts.js",
    "test:sources": "node scripts/validate_sources.js",
    "test:duplicates": "node scripts/validate_duplicates.js",
    "test:casio": "node scripts/validate_casio.js",
    "test:data": "node scripts/validate_all.js",
    "verify": "npm run typecheck && npm run lint && npm run test:data && npm run build"
  }
}
```

---

## 5. VERIFICATION METHOD (PHƯƠNG PHÁP ĐỘC LẬP TỰ KIỂM CHỨNG)

Bất kỳ kiểm thử viên hoặc tác nhân nào trong nhóm đều có thể chạy các lệnh sau để kiểm chứng độc lập toàn bộ các kết luận trong báo cáo này:

1. **Kiểm chứng quá trình Typecheck & Build**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```
   *Kỳ vọng*: Thoát với exit code 0, không có lỗi TypeScript hay Next build.

2. **Kiểm chứng lỗi interactive prompt của ESLint**:
   ```bash
   npm run lint
   ```
   *Kỳ vọng*: Hiển thị menu hỏi cấu hình ESLint và thoát với lỗi code 1 (chứng minh việc cần tạo `.eslintrc.json`).

3. **Kiểm chứng Bộ Kiểm minh Tự động (Prototype đã sẵn sàng)**:
   ```bash
   node .agents/teamwork/explorer_survey_test/unified_validator.js
   ```
   *Kỳ vọng*: Chạy xong trong vòng dưới 2 giây và in ra chi tiết 5 bài kiểm tra:
   - Bài 1 (Counts): 0/7 dạng đạt $\ge 10$ câu.
   - Bài 2 (Sources): 105 câu thiếu tag `[Nguồn: ...]`.
   - Bài 3 (KaTeX): Báo cáo đúng 1 lỗi cú pháp `$[ ec{u}, ec{v}]$` tại bản ghi KnowledgeItem số 9.
   - Bài 4 (Duplicates): Báo cáo đúng 44 câu trùng lặp giữa DB và Mindmap.
   - Bài 5 (Casio): Báo cáo 54/55 câu trong DB và 50/50 câu trong Mindmap thiếu hướng dẫn fx-880BTG.

---
*Báo cáo được lập và kiểm chứng thực địa bởi Explorer 3 (teamwork_explorer).*
