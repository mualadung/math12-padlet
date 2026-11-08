# Project: Math Study Padlet 12 (Học Liệu Số Ôn Tập Toán 12 - Chương I & Chương II)

## Architecture
Ứng dụng web học liệu số Next.js 14 (App Router) phục vụ ôn tập Chương I (Đạo hàm & Đồ thị hàm số) và Chương II (Vectơ & Tọa độ Oxyz trong không gian) SGK Toán 12 (Kết nối tri thức với cuộc sống).

### Data Flow & Component Architecture
1. **Phân hệ Cơ sở dữ liệu (Prisma SQLite `prisma/dev.db`)**:
   - `MathCategory`: Lưu danh mục các dạng toán, dấu hiệu nhận biết, kiến thức trọng tâm, phương pháp giải, cạm bẫy thường gặp. Cung cấp dữ liệu cho `/math-types` qua API `/api/categories`.
   - `Question`: Lưu ngân hàng bài tập trắc nghiệm (3 định dạng: nhiều lựa chọn, đúng/sai, trả lời ngắn). Có các trường: `sourceExam` (`[Nguồn: ...]`), `explanation`, `casioGuide` (kép: fx-580VN X & fx-880BTG), `distractorAnalysis`. Cung cấp dữ liệu cho `/practice` qua API `/api/questions` và `/api/quiz`.
2. **Phân hệ Sơ đồ Tri thức tĩnh (`src/app/mindmap/`)**:
   - `machData.ts`: Cây tri thức 2 Chương $\to$ 10 Chủ đề (Bài 1 $\to$ Bài 8) $\to$ 37 Dạng toán nhỏ với 4 trường chi tiết (`theory`, `signs`, `methods`, `mistakes`).
   - `mindmapQuestions.ts`: Ngân hàng câu hỏi trích từ đề thi thật độc lập (5 câu/chủ đề = 50 câu) kèm lời giải chi tiết, chuẩn KaTeX và trường `source` dạng `[Nguồn: ...]`.
   - `GrandDetailCard.tsx`: Hiển thị chi tiết dạng toán và bài tập đề thi thật tương ứng.
3. **Phân hệ Hiển thị KaTeX (`src/components/MathRenderer.tsx`)**:
   - Parser phân giải inline math `$...$` và block math `$$...$$`, render bằng `katex.renderToString()`.
4. **Phân hệ Giao diện & Điều hướng**:
   - `Navbar.tsx`, `layout.tsx`, Tailwind theme "Mạch" (`globals.css`), bộ lọc danh mục động trên `/math-types` và `/practice`.

---

## Feature Inventory
Tất cả các tính năng được phát hiện và yêu cầu từ khảo sát thực địa và `ORIGINAL_REQUEST.md`:

| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Phân dạng toán học Bài 1 đến Bài 8 | Chuẩn hóa và bao phủ 37 phân dạng toán nhỏ cho Bài 1 đến Bài 8 (Chương I và II SGK KNTT) | M1 | Survey & R1 |
| F2 | Chuẩn hóa KaTeX & Điều kiện toán học | Bổ sung đầy đủ điều kiện xác định ($D$, mẫu $\ne 0$, căn $\ge 0$, $\vec{a} \ne \vec{0}$, tích vô hướng $= 0$, v.v.) và sửa triệt để các lỗi cú pháp escape KaTeX | M1 | Survey & R1 |
| F3 | Sửa lỗi ánh xạ Topic 10 trong Mindmap | Khớp nối mã `TOPIC_3_1` trong `machData.ts` và `mindmapQuestions.ts` để hiển thị 5 câu hỏi thực tế của Dạng 10.1 - 10.3 | M2 | Survey & R2 |
| F4 | Tích hợp 50 câu đề thi thật vào Mindmap | Ngân hàng 50 câu hỏi đề thi thật độc lập 100% có gắn thẻ `[Nguồn: ...]` và lời giải chi tiết | M2 | Survey & R2 |
| F5 | Ngân hàng câu hỏi $\ge 10$ câu/dạng cho Practice | Mở rộng cơ sở dữ liệu SQLite đạt tối thiểu 10 câu/dạng ($\ge 70$ câu), 100% đề thi thật | M3 | Survey & R3 |
| F6 | Hướng dẫn bấm máy tính Casio kép | Chi tiết từng nút bấm trên cả 2 dòng máy Casio fx-580VN X và Casio fx-880BTG cho mỗi dạng/câu trong /practice | M3 | Survey & R3 |
| F7 | Loại bỏ trùng lặp câu hỏi tuyệt đối | Đảm bảo 0% trùng lặp câu hỏi giữa `/math-types`, `/mindmap` và `/practice` | M2, M3 | Survey & R2, R3 |
| F8 | Cấu hình ESLint & Sửa lỗi `next lint` | Tạo `.eslintrc.json` chuẩn Next.js để lệnh lint và build CI/headless chạy không lỗi | M4 | Survey & R4 |
| F9 | Cập nhật bộ lọc động tại /math-types và /practice | Loại bỏ các nhãn hardcode "7 Dạng", tự động đồng bộ theo dữ liệu danh mục thực tế | M4 | Survey & R4 |
| F10 | Tích hợp bộ script kiểm thử tự động E2E | Bộ công cụ kiểm thử toàn diện kiểm tra KaTeX, câu hỏi $\ge 10$, nguồn `[Nguồn: ...]`, trùng lặp và Casio | E2E Track | Survey & AC |
| F11 | Kiểm nghiệm 100% E2E tests và Thử nghiệm người dùng | Chạy kiểm thử tự động, build dự án sạch và đánh giá chéo 9 tiêu chí Mục VII | Final | R4 & AC |

---

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Track | Thiết kế hạ tầng kiểm thử độc lập (`TEST_INFRA.md`, test runner tự động `scripts/validate_all.js`, Tiers 1-4) | none | IN_PROGRESS |
| M1 | Math Types & KaTeX Standardization | Mở rộng 37 phân dạng Bài 1-8 trong `machData.ts` & `MathCategory`, bổ sung nghiêm ngặt điều kiện áp dụng, sửa lỗi KaTeX escape | none | DONE |
| M2 | Mindmap Real-Exam Questions Integration | Sửa lỗi Topic 10 (`TOPIC_3_1`), thay thế các câu trùng lặp bằng 50 câu hỏi đề thi thật độc lập 100% có `[Nguồn: ...]` | M1 | IN_PROGRESS |
| M3 | Practice Bank ($\ge 10$/type) & Dual Casio | Nạp ngân hàng $\ge 70$ câu hỏi đề thi thật vào SQLite, đủ 3 định dạng, 100% gắn `[Nguồn: ...]`, hướng dẫn chi tiết Casio 580 & 880 | M1 | PLANNED |
| M4 | Web UI, Dynamic Filters & Lint Config | Tạo `.eslintrc.json`, cập nhật UI bộ lọc động `/math-types` & `/practice`, tối ưu responsive và navigation | M1, M2, M3 | PLANNED |
| Final | 100% E2E Pass & Adversarial Hardening | Chạy toàn bộ test runner E2E, rà soát đối kháng adversarial, kiểm tra build và kiểm định Forensic Audit | E2E, M1-M4 | PLANNED |

---

## Interface Contracts

### 1. `MathCategory` ↔ `/math-types` UI
- API: `GET /api/categories` trả về `Array<MathCategory>`
- Schema:
  ```typescript
  interface MathCategory {
    id: string;
    code: string;
    chapter: string; // "CH1" | "CH2"
    lesson?: string; // "BAI_1" -> "BAI_8"
    title: string;
    identifySigns: string;
    coreKnowledge: string;
    methodSteps: string;
    commonMistakes: string;
    order: number;
  }
  ```

### 2. `Question` ↔ `/practice` UI & Quiz Engine
- API: `GET /api/questions?category=...&difficulty=...&type=...`
- Schema:
  ```typescript
  interface Question {
    id: string;
    code: string;
    categoryId: string; // FK -> MathCategory.id
    difficulty: "NB" | "TH" | "VD" | "VDC";
    questionType: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER";
    content: string;
    optionsJson: string; // JSON array of options or 4 sub-items
    correctAnswer: string;
    explanation: string;
    casioGuide?: string; // Must contain both fx-580VN X and fx-880BTG
    distractorAnalysis?: string;
    sourceExam: string; // Format: [Nguồn: ...]
    verifiedBy?: string;
  }
  ```

### 3. `machData.ts` & `mindmapQuestions.ts` ↔ `/mindmap` UI
- Contract:
  - `TREE_DATA.chapters[i].topics[j].id`: Định dạng `"TOPIC_1_1"` đến `"TOPIC_3_1"`.
  - `REAL_QUESTIONS_BANK[topicId]`: Bắt buộc chứa key trùng khớp `topicId` (đặc biệt `TOPIC_3_1`).
  - Mỗi `ExamQuestionItem`:
    ```typescript
    interface ExamQuestionItem {
      id: string;
      code: string;
      title: string;
      source: string; // Format: [Nguồn: ...]
      year: number;
      type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER";
      difficulty: "NB" | "TH" | "VD" | "VDC";
      content: string;
      options?: Array<{ key: string; text: string; isCorrect: boolean }>;
      items?: Array<{ id: string; statement: string; isCorrect: boolean; explanation: string }>;
      correctAnswer?: string;
      solution: string;
      casio?: { fx580?: string; fx880?: string };
    }
    ```

---

## Code Layout
- `src/app/` — Next.js 14 App Router routes (`/`, `/math-types`, `/mindmap`, `/practice`, `/community`, `/team`, `/team-admin`, `/api/*`)
- `src/components/` — Reusable React client components (`MathRenderer.tsx`, `Navbar.tsx`, `GrandDetailCard.tsx`, v.v.)
- `src/lib/` — Utilities, Prisma client (`prisma.ts`)
- `prisma/` — Database schema (`schema.prisma`), migrations, seed scripts (`seed.js`, `seed_additional_questions.js`)
- `scripts/` — Test and validation harnesses (`validate_all.js`, `validate_katex.js`, v.v.)
- `.agents/teamwork/` — Agent coordination artifacts ONLY (plans, handoffs, progress)
