# Báo Cáo Khảo Sát Kiến Trúc Hệ Thống (Architecture & Codebase Survey)

**Tác giả**: Explorer 1 (Architecture & Codebase Structure)  
**Thời gian hoàn thành**: 2026-11-08T05:14:00Z  
**Thư mục làm việc**: `d:\TEST\MATH-STUDY\.agents\teamwork\explorer_survey_arch\`  
**Nhiệm vụ**: Điều tra cấu trúc dự án Next.js 14, định tuyến, nguồn lưu trữ và luồng dữ liệu, cấu hình KaTeX, UI components và trạng thái hệ thống.

---

## 1. Observation (Dữ liệu quan sát thực tế)

### 1.1. Cấu hình Framework, Build & Dependencies
- **Framework & Router**: Next.js 14.2.18 (`"next": "^14.2.18"`), React 18.3.1 (`"react": "^18.3.1"`, `"react-dom": "^18.3.1"`), TypeScript 5.6.3 (`"typescript": "^5.6.3"`). Sử dụng mô hình **Next.js App Router** với thư mục mã nguồn tại `src/app/` (`package.json:23`, `tsconfig.json:20-22`).
- **Build Status**: Lệnh `npm run build` thực thi thành công hoàn toàn (`exit code 0`), biên dịch sạch 16 route tĩnh và động mà không có bất kỳ lỗi TypeScript hay ESLint nào.
- **Thư viện UI & Đồ họa**:
  - CSS Utility: `tailwindcss: ^3.4.15`, `postcss: ^8.4.49`, `autoprefixer: ^10.4.20`, `clsx: ^2.1.1`, `tailwind-merge: ^2.5.4` (`package.json:17, 27, 34-37`).
  - Icons: `lucide-react: ^0.460.0` (`package.json:22`).
  - Diagram / Flow Canvas: `@xyflow/react: ^12.3.6` (`package.json:16`).
  - Math Rendering: `katex: ^0.16.11`, `@types/katex: ^0.16.7` (`package.json:21, 30`).
  - Xuất dữ liệu / Văn bản: `docx: ^9.15.3`, `exceljs: ^4.4.0`, `pptxgenjs: ^4.0.1`, `html2canvas: ^1.4.1` (`package.json:18-20, 24`).
  - ORM & Database: `@prisma/client: ^5.22.0`, `prisma: ^5.22.0` (`package.json:15, 36`).

### 1.2. Cấu trúc định tuyến (Routing Structure)
Dự án được tổ chức hoàn toàn trong `src/app/` theo Next.js App Router:

| Tuyến đường (Route) | Đường dẫn file mã nguồn | Loại hình & Chức năng |
|---|---|---|
| `/` | `src/app/page.tsx` | Trang chủ / Dashboard tổng quan 4 phân hệ, thông tin nhóm 7 thành viên, cam kết khung điểm 90-100. |
| `/math-types` | `src/app/math-types/page.tsx` | Cẩm nang các dạng toán trọng tâm (Nhiệm vụ 2); hiển thị dấu hiệu, kiến thức nền tảng, phương pháp giải, cạm bẫy. |
| `/mindmap` | `src/app/mindmap/page.tsx` | Sơ đồ cây tri thức tương tác hình nan hoa / accordion (Nhiệm vụ 1); tích hợp `GrandDetailCard.tsx`. |
| `/practice` | `src/app/practice/page.tsx` | Phòng luyện tập trắc nghiệm chuẩn cấu trúc mới 2025 (Nhiệm vụ 3); 3 định dạng câu hỏi, chấm điểm, Casio, bẫy sai. |
| `/community` | `src/app/community/page.tsx` | Bảng tin tương tác & Góp ý Padlet (Nhiệm vụ 4); xếp hạng học sinh, gửi phản hồi điểm mạnh / cải thiện. |
| `/team` | `src/app/team/page.tsx` | Hồ sơ nhóm 7 thành viên, phân công vai trò, bảng điểm trung bình chấm chéo cá nhân (70% nhóm + 30% cá nhân). |
| `/team-admin` | `src/app/team-admin/page.tsx` | Bảng điều khiển quản trị chấm chéo (5 tiêu chí) và Bảng checklist 9 tiêu chí tự kiểm tra Mục VII. |
| `/api/categories` | `src/app/api/categories/route.ts` | API GET danh mục dạng toán từ bảng `MathCategory` (Prisma SQLite). |
| `/api/questions` | `src/app/api/questions/route.ts` | API GET ngân hàng câu hỏi từ bảng `Question` (Prisma SQLite), hỗ trợ lọc theo category, difficulty, type, search. |
| `/api/quiz` | `src/app/api/quiz/route.ts` | API POST chấm điểm bài làm và lưu `QuizAttempt` vào SQLite. |
| `/api/knowledge` | `src/app/api/knowledge/route.ts` | API GET danh sách lý thuyết trọng tâm từ bảng `KnowledgeItem`. |
| `/api/feedback` | `src/app/api/feedback/route.ts` | API GET/POST nhận xét đánh giá từ bảng `Feedback`. |
| `/api/team` | `src/app/api/team/route.ts` | API GET thông tin 7 thành viên và tính toán điểm trung bình chấm chéo hợp lệ. |
| `/api/team/review` | `src/app/api/team/review/route.ts` | API POST ghi nhận/cập nhật phiếu chấm chéo `PeerReview` giữa 2 thành viên. |

### 1.3. Cơ chế lưu trữ và cung cấp dữ liệu (Data Storage & Feeds)
Hệ thống hiện đang sử dụng **kiến trúc dữ liệu kép (Dual Data Architecture)**:

1. **Phân hệ Cơ sở dữ liệu SQLite qua Prisma (`prisma/schema.prisma`, `prisma/dev.db`, `src/lib/prisma.ts`)**:
   - Sử dụng cho: `/math-types`, `/practice`, `/community`, `/team`, `/team-admin`.
   - Các bảng trong `schema.prisma`:
     - `MathCategory` (`id`, `code`, `chapter`, `title`, `identifySigns`, `coreKnowledge`, `methodSteps`, `commonMistakes`, `order`).
     - `Question` (`id`, `code`, `categoryId`, `difficulty`, `questionType`, `content`, `optionsJson`, `correctAnswer`, `explanation`, `casioGuide`, `distractorAnalysis`, `sourceExam`, `verifiedBy`).
     - `KnowledgeItem`, `QuizAttempt`, `Feedback`, `TeamMember`, `PeerReview`.
   - **Thực trạng dữ liệu trong `dev.db`**:
     - `MathCategory`: Đang lưu **7 dạng toán** (`DANG_1` đến `DANG_7`).
     - `Question`: Đang lưu **55 câu hỏi** (phân bố từ 7 đến 9 câu/dạng, gồm cả 3 dạng MULTIPLE_CHOICE, TRUE_FALSE, SHORT_ANSWER). Dữ liệu được nạp bởi `prisma/seed.js` và `prisma/seed_additional_questions.js`.
   - **Cách nạp vào giao diện**:
     - `src/app/math-types/page.tsx`: Gọi `fetch("/api/categories")` trong `useEffect` (`line 42`).
     - `src/app/practice/page.tsx`: Gọi `fetch("/api/questions")` trong `useEffect` (`line 68`).

2. **Phân hệ Hằng số tĩnh TypeScript (Static TS Constant Files)**:
   - Sử dụng riêng biệt cho: `/mindmap` (`src/app/mindmap/page.tsx`).
   - File cấu trúc cây: `src/app/mindmap/machData.ts` export biến `TREE_DATA: RootKnowledgeTree`.
     - Phân cấp: Gốc (`root_math12`) $\to$ 2 Chương (`CH1`, `CH2`) $\to$ 10 Chủ đề (`TOPIC_1_1` đến `TOPIC_1_6` và `TOPIC_2_1` đến `TOPIC_3_1`) $\to$ **37 dạng toán nhỏ** (CH1 có 23 dạng, CH2 có 14 dạng) $\to$ Chi tiết thẻ 4 mục (`theory`, `signs`, `methods`, `mistakes`).
   - File ngân hàng câu hỏi đề thật của Mindmap: `src/app/mindmap/mindmapQuestions.ts` export biến `REAL_QUESTIONS_BANK: Record<string, ExamQuestionItem[]>`.
     - Chứa **50 câu hỏi** trích từ đề thi thật (5 câu cho mỗi chủ đề từ `TOPIC_1_1` đến `TOPIC_2_4`).
     - Hàm truy xuất: `getQuestionsForTopic(topicId: string)` (`line 841-851`).
   - File dư thừa (Legacy): `src/app/mindmap/treeData.ts` (1234 dòng, 35 dạng toán) hiện **hoàn toàn không được import** trong thư mục `src/` (chỉ còn vết tích trong các scripts cũ).

### 1.4. Cấu hình hiển thị công thức Toán học KaTeX
- **Thành phần hiển thị**: `src/components/MathRenderer.tsx` (`"use client"`).
- **Cơ chế phân tách chuỗi**:
  ```typescript
  // src/components/MathRenderer.tsx:22
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
  ```
- **Phương thức render**: Sử dụng trực tiếp `katex.renderToString(mathString, { displayMode: isBlock, throwOnError: false })` (`line 40-43`).
  - Khối toán học `$$...$$` (`displayMode: true`): bao bọc bởi `<div className="my-3 overflow-x-auto py-1 text-center" dangerouslySetInnerHTML={{ __html: html }} />`.
  - Inline toán học `$...$` (`displayMode: false`): bao bọc bởi `<span className="inline-block px-0.5" dangerouslySetInnerHTML={{ __html: html }} />`.
  - Bắt lỗi ngoại lệ (`catch (e)`): Trả về thẻ fallback `<span className="text-red-500 font-mono text-xs">{rawFormula}</span>`.
- **Nạp file định dạng CSS KaTeX**:
  - Cách 1: Thẻ `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" ... />` đặt trong `<head>` tại `src/app/layout.tsx:25-29`.
  - Cách 2: Lệnh `@import "katex/dist/katex.min.css";` tại dòng 5 của `src/app/globals.css`.
- **Ghi chú kỹ thuật**: Dự án KHÔNG sử dụng `remark-math`, `rehype-katex` hay thư viện `react-katex`, mà tự xây dựng parser regex nhẹ và gọi thẳng `katex.renderToString`.

### 1.5. Thiết kế giao diện (UI), Đáp ứng di động (Mobile) & Quản lý trạng thái
- **Thanh điều hướng (`src/components/Navbar.tsx`)**:
  - Header dính (`sticky top-0 z-50 bg-white/95 backdrop-blur-md`).
  - Desktop: 7 mục điều hướng (`/`, `/mindmap`, `/math-types`, `/practice`, `/community`, `/team`, `/team-admin`) kèm nút liên kết ngoài sang Padlet.
  - Mobile: Nút toggle Hamburger (`Menu`/`X`) mở Drawer menu trượt xuống với đầy đủ các mục và nút "Mở Padlet Học Liệu Toán 12".
- **Chân trang (`src/app/layout.tsx:34-46`)**:
  - Nền tối (`bg-slate-900 text-slate-400`), ghi rõ thông tin Dự án Nhóm 5 (Lớp 12A1), phạm vi Chương I & II SGK Kết nối tri thức, 7 thành viên và hạn nộp 23:59 15/11/2026.
- **Bảng màu chủ đạo (Botanical Mạch Palette)** (`src/app/globals.css:8-53`):
  - Khai báo biến CSS `--moss`, `--olive`, `--rust`, `--gold`, `--ink`, `--sage`, `--terracotta`, `--cyan`, `--emerald`, `--violet`.
  - Hỗ trợ cả light mode (màu giấy ngà cổ parchment `#fbf9f4`) và dark mode.
- **Quản lý trạng thái (State Management)**:
  - 100% sử dụng React Hook nội bộ (`useState`, `useEffect`, `useMemo`, `useCallback`, `useTransition`).
  - Đồ họa tương tác React Flow sử dụng hook chuẩn của thư viện: `useNodesState`, `useEdgesState`, `useReactFlow`.
  - Hoàn toàn KHÔNG dùng Redux, Zustand, Recoil hay React Context toàn cục.

---

## 2. Logic Chain (Chuỗi lập luận và Phân tích chuyên sâu)

```
[Mục tiêu bài toán trong ORIGINAL_REQUEST]
  ├── R1: Chuẩn hóa & mở rộng phân dạng nhỏ theo từng bài học (Bài 1 -> Bài 8) tại /math-types
  ├── R2: Tích hợp câu hỏi đề thi thật có nguồn & lời giải vào Sơ đồ tri thức /mindmap
  ├── R3: Bổ sung tối thiểu 10 bài tập đề thi thật + Casio 580/880 cho mỗi dạng tại /practice
  └── R4: Hoàn thiện tối đa các tính năng website, không lỗi build/runtime
       │
       ▼
[Quan sát kiến trúc hiện tại]
  ├── Phát hiện 1: Nguồn dữ liệu bị phân tách giữa Prisma SQLite và TypeScript static files
  │     ├── /math-types & /practice đọc từ SQLite qua API (/api/categories, /api/questions)
  │     └── /mindmap đọc trực tiếp từ machData.ts và mindmapQuestions.ts
  │
  ├── Phát hiện 2: Sự không đồng nhất về số lượng dạng toán giữa các trang
  │     ├── /math-types và /practice đang gắn chặt với 7 Dạng lớn (DANG_1 -> DANG_7)
  │     └── /mindmap (machData.ts) đã có 37 phân dạng nhỏ chia theo 10 chủ đề (Bài 1 -> Bài 8)
  │
  ├── Phát hiện 3: Ngân hàng câu hỏi hiện tại chưa đạt ngưỡng 10 câu/dạng theo R3
  │     ├── Trong SQLite: Mỗi dạng mới có 7 đến 9 câu (tổng 55 câu)
  │     └── Trong mindmapQuestions.ts: Mỗi chủ đề có 5 câu (tổng 50 câu)
  │
  └── Phát hiện 4: Bất đối xứng mã định danh (ID Mismatch) trong /mindmap
        └── machData.ts định nghĩa topic cuối là "TOPIC_3_1", nhưng mindmapQuestions.ts lại lưu key "TOPIC_2_4",
            dẫn đến hàm getQuestionsForTopic("TOPIC_3_1") bị rơi vào fallback TOPIC_2_2!
```

1. **Về việc chuẩn hóa và mở rộng các dạng toán (/math-types)**:
   - Hiện tại trang `/math-types` tải dữ liệu từ `/api/categories` (`src/app/api/categories/route.ts`). Cơ sở dữ liệu SQLite mới chỉ có 7 bản ghi `MathCategory` (`DANG_1` đến `DANG_7`).
   - Trong khi đó, file `src/app/mindmap/machData.ts` đã chi tiết hóa cây tri thức thành 37 dạng nhỏ theo đúng cấu trúc Bài 1 đến Bài 8 của SGK.
   - Để thỏa mãn R1, cần mở rộng danh mục dạng toán trong cơ sở dữ liệu hoặc đồng bộ cấu trúc 37 dạng từ `machData.ts` sang bảng `MathCategory` của Prisma, đồng thời cập nhật bộ lọc trên `/math-types/page.tsx` (hiện đang hardcode nhãn "Tất cả 7 Dạng", "Chương I (3 Dạng)", "Chương II (3 Dạng)").

2. **Về việc tích hợp câu hỏi đề thật vào Sơ đồ tri thức (/mindmap)**:
   - Sơ đồ tri thức hiển thị câu hỏi qua component `GrandDetailCard.tsx` (Tab 5 "5 Câu đề thật"). Dữ liệu lấy từ `mindmapQuestions.ts`.
   - Cần sửa lỗi ánh xạ topic ID: Thêm alias hoặc đổi key `"TOPIC_2_4"` trong `REAL_QUESTIONS_BANK` thành `"TOPIC_3_1"` (hoặc cập nhật hàm `getQuestionsForTopic`) để dạng toán liên chương hiển thị đúng 5 câu hỏi thực tế về tọa độ hóa Oxyz thay vì rơi vào fallback của Chương II.

3. **Về ngân hàng câu hỏi phòng luyện tập (/practice)**:
   - Yêu cầu R3 nêu rõ: mỗi dạng toán trong `/practice` phải có **tối thiểu 10 câu hỏi đề thi thật** kèm lời giải chi tiết và hướng dẫn bấm máy Casio fx-580 & fx-880.
   - Hiện tại cơ sở dữ liệu có 55 câu cho 7 dạng (trung bình 7-9 câu/dạng). Nếu giữ nguyên 7 dạng lớn, cần bổ sung tối thiểu 15-20 câu để đạt tối thiểu 10 câu/dạng ($\ge 70$ câu). Nếu mở rộng sang phân dạng nhỏ, cần nạp thêm câu hỏi tương ứng và cập nhật bộ lọc `categoryFilter` trong `src/app/practice/page.tsx` (hiện đang hardcode thẻ `<option value="DANG_1">` đến `DANG_7`).

4. **Về KaTeX Rendering**:
   - `MathRenderer.tsx` hoạt động ổn định với công thức inline (`$...$`) và block (`$$...$$`).
   - Cần lưu ý Regex `\$[^\$\n]+?\$` không hỗ trợ công thức inline bị bẻ dòng (có ký tự xuống dòng `\n` bên trong dấu `$`). Mọi dữ liệu câu hỏi và lý thuyết cần đảm bảo công thức inline nằm trên cùng một dòng, hoặc dùng `$$...$$` nếu là công thức nhiều dòng.

---

## 3. Caveats (Những điểm lưu ý, giả định & Rủi ro tiềm ẩn)

1. **Rủi ro phân mảnh dữ liệu (Data Desynchronization)**:
   - Khi chỉnh sửa câu hỏi hay lý thuyết, nếu chỉ sửa trong `prisma/seed.js` hoặc SQLite `dev.db`, trang `/mindmap` sẽ không thay đổi vì nó đọc từ `machData.ts` và `mindmapQuestions.ts`. Ngược lại, nếu chỉ sửa file TS trong `mindmap/`, trang `/practice` và `/math-types` sẽ không nhận được dữ liệu mới.
   - *Khuyến nghị*: Đội ngũ triển khai cần có kế hoạch rõ ràng: đồng bộ hóa dữ liệu giữa Prisma seed và các file TypeScript của mindmap, đảm bảo không có câu hỏi nào bị trùng lặp giữa hai phân hệ (theo Acceptance Criteria R3).

2. **Khác biệt số lượng thành viên giữa tài liệu cũ và quy tắc dự án**:
   - Trong file `thong_tin_nhom.md` ban đầu ghi 5 thành viên (Huy, Q.Anh, Tiến, Yến, T.Thảo).
   - Tuy nhiên, trong quy tắc bắt buộc `d:\TEST\MATH-STUDY\.agents\rules\AGENTS.md`, `prisma/seed.js`, `src/app/layout.tsx:43`, và `src/app/page.tsx:70`, nhóm đã được chuẩn hóa cố định là **7 thành viên** (thêm Thy - Vai trò 6 và D.Thảo - Vai trò 7).
   - Mọi tính toán điểm chéo phải bảo đảm đủ 6 phiếu nhận từ 6 bạn còn lại (tổng 42 phiếu trong toàn nhóm).

3. **Bộ lọc tĩnh trong component client**:
   - Cả `src/app/math-types/page.tsx` và `src/app/practice/page.tsx` đều có các đoạn mã tĩnh hiển thị "7 Dạng". Khi nâng cấp mở rộng dạng toán, cần cập nhật các component này để hiển thị linh hoạt theo dữ liệu API trả về.

---

## 4. Conclusion (Kết luận & Định hướng cho các bước tiếp theo)

1. **Hệ thống hiện tại có nền tảng rất vững chắc**: Kiến trúc Next.js 14 App Router sạch sẽ, không có lỗi biên dịch (`npm run build` đạt 100%), đã tích hợp sẵn Tailwind CSS theo chủ đề mỹ thuật Mạch, KaTeX mượt mà, thư viện `@xyflow/react` cho mindmap trực quan, và Prisma SQLite cho tương tác chấm điểm/chấm chéo.
2. **Các điểm then chốt cần tác động để hoàn thiện nhiệm vụ**:
   - **Đồng bộ hóa dữ liệu Dạng toán**: Khớp nối giữa 7 dạng vĩ mô và 37 dạng vi mô (Bài 1 đến Bài 8).
   - **Bổ sung Ngân hàng câu hỏi $\ge 10$ câu/dạng**: Mở rộng ngân hàng câu hỏi đề thi thật có nguồn kiểm chứng 100%, đủ 3 định dạng trắc nghiệm, đủ lời giải chi tiết và hướng dẫn bấm máy Casio cả 2 dòng máy fx-580VN X & fx-880BTG.
   - **Sửa lỗi ánh xạ Topic ID trong Mindmap**: Đổi key `"TOPIC_2_4"` $\to$ `"TOPIC_3_1"` trong `src/app/mindmap/mindmapQuestions.ts`.
   - **Nâng cấp tính năng UI**: Cập nhật bộ lọc động tại `/math-types` và `/practice` để tự động thích ứng khi số lượng dạng toán được mở rộng.

---

## 5. Verification Method (Phương pháp kiểm chứng độc lập)

Để độc lập xác minh các kết luận trong báo cáo này, thực hiện các bước sau:

1. **Kiểm tra trạng thái Build dự án**:
   ```bash
   npm run build
   ```
   *Kết quả mong đợi*: Lệnh chạy qua thành công với code 0, 16 routes được tối ưu hóa.

2. **Kiểm tra cơ sở dữ liệu SQLite**:
   ```bash
   node -e "const { PrismaClient } = require('@prisma/client'); const p = new PrismaClient(); p.question.count().then(c => console.log('Questions:', c)); p.mathCategory.count().then(c => console.log('Categories:', c));"
   ```
   *Kết quả mong đợi*: 55 câu hỏi và 7 danh mục dạng toán.

3. **Kiểm tra cấu trúc cây Mindmap tĩnh**:
   ```bash
   node -e "const fs = require('fs'); const content = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8'); console.log('Has TREE_DATA:', content.includes('export const TREE_DATA'));"
   ```

4. **Kiểm tra lỗi ánh xạ Topic ID**:
   Mở file `src/app/mindmap/mindmapQuestions.ts` dòng 841-851, đối chiếu với ID của chủ đề cuối cùng trong `src/app/mindmap/machData.ts` (`TOPIC_3_1`).
