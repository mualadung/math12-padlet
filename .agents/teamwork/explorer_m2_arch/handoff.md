# BÁO CÁO ĐIỀU TRA KIẾN TRÚC M2: ÁNH XẠ KEY TOPIC 10 & TÍCH HỢP BÀI TẬP MINDMAP

- **Người thực hiện**: Explorer 1 (`teamwork_explorer` - Architecture & Topic 10 Mapping)
- **Thư mục làm việc**: `d:\TEST\MATH-STUDY\.agents\teamwork\explorer_m2_arch\`
- **Milestone**: Milestone 2 — Mindmap Real-Exam Questions Integration
- **Mục tiêu**: Điều tra toàn diện lỗi lệch key Topic 10 (`TOPIC_3_1` vs `TOPIC_2_4`), cơ chế fallback về `TOPIC_2_2` trong `GrandDetailCard.tsx`, và xây dựng công thức sửa lỗi chính xác 100% kèm công thức chuyển giao (integration recipe) cho Worker.

---

## 1. Observation (Quan sát trực tiếp)

### 1.1. Cấu trúc cây tri thức trong `src/app/mindmap/machData.ts`
Tại dòng 518 đến dòng 802 của `src/app/mindmap/machData.ts`:
- Chương II (`CH2`: "VECTƠ VÀ HỆ TRỤC TỌA ĐỘ TRONG KHÔNG GIAN") chứa 4 chủ đề:
  1. Dòng 525: `id: "TOPIC_2_1"` — Chủ đề 07: "Vectơ không gian & Các quy tắc hình học"
  2. Dòng 585: `id: "TOPIC_2_2"` — Chủ đề 08: "Hệ trục tọa độ Oxyz & Tọa độ điểm, vectơ"
  3. Dòng 646: `id: "TOPIC_2_3"` — Chủ đề 09: "Tích có hướng và ứng dụng hình học không gian"
  4. **Dòng 741**: `id: "TOPIC_3_1"` — Chủ đề 10: "Tọa độ hóa Oxyz giải bài toán cực trị không gian thực tế"
- Trong `TOPIC_3_1`, trường `mathTypes` gồm 3 dạng toán nhỏ:
  - `MT_3_1_1` (DẠNG 10.1: "Khoảng cách ngắn nhất giữa hai vật thể chuyển động theo t")
  - `MT_3_1_2` (DẠNG 10.2: "Tối ưu hóa vị trí đường ống / cáp điện qua mặt đất (Điểm đối xứng)")
  - `MT_3_1_3` (DẠNG 10.3: "Tọa độ hóa khối đa diện (Lăng trụ, Chóp) giải bài toán thực tế")

### 1.2. Khóa ngân hàng câu hỏi trong `src/app/mindmap/mindmapQuestions.ts`
Tại dòng 759 đến dòng 851 của `src/app/mindmap/mindmapQuestions.ts`:
- Dòng 760–762:
  ```typescript
  // =========================================================================
  // CHỦ ĐỀ 10: TỌA ĐỘ HÓA OXYZ & BÀI TOÁN CỰC TRỊ THỰC TẾ (TOPIC_2_4)
  // =========================================================================
  "TOPIC_2_4": [
    { id: "Q46_T10", code: "Q46-2024", ... },
    { id: "Q47_T10", code: "Q47-2024", ... },
    { id: "Q48_T10", code: "Q48-2025", ... },
    { id: "Q49_T10", code: "Q49-2024", ... },
    { id: "Q50_T10", code: "Q50-2024", ... }
  ]
  ```
- Dòng 841–851:
  ```typescript
  // Hàm lấy 5 câu hỏi thực chiến chuẩn nguồn theo chủ đề/dạng toán
  export function getQuestionsForTopic(topicId: string): ExamQuestionItem[] {
    if (REAL_QUESTIONS_BANK[topicId]) {
      return REAL_QUESTIONS_BANK[topicId];
    }
    // Mặc định fallback: Nếu thuộc Chương I thì trả về ngân hàng Chương I
    if (topicId.startsWith("TOPIC_1")) {
      return REAL_QUESTIONS_BANK["TOPIC_1_1"];
    }
    // Nếu thuộc Chương II thì trả về ngân hàng Oxyz
    return REAL_QUESTIONS_BANK["TOPIC_2_2"];
  }
  ```

### 1.3. Cơ chế kích hoạt và truyền dữ liệu trong `src/app/mindmap/page.tsx`
- Dòng 567–638: Khi một chủ đề thuộc Chương II được mở rộng (`isTopicExpanded`), mỗi phân dạng $m$ thuộc chủ đề $t$ được tạo node `mathtype`:
  ```typescript
  onSelect: () => handleSelectMathType(m, t.id, false, mY),
  ```
- Dòng 356–360:
  ```typescript
  const handleSelectMathType = useCallback((m: MathTypeItem, topicId: string, isLeft: boolean, mY: number) => {
    ...
    setSelectedMathInfo({ mathType: m, topicId, left: isLeft, y: mY });
  ```
  Với Dạng 10.1, 10.2, 10.3, `t.id` có giá trị là `"TOPIC_3_1"`.
- Dòng 654–664: Node `grand-detail` được sinh ra với:
  ```typescript
  data: {
    id: "grand-detail",
    mathType: selectedMathInfo.mathType,
    topicId: selectedMathInfo.topicId, // Giá trị: "TOPIC_3_1"
    left: isLeft,
    onClose: () => setSelectedMathInfo(null),
  }
  ```

### 1.4. Xử lý câu hỏi trong `src/app/mindmap/GrandDetailCard.tsx`
- Dòng 34–36:
  ```typescript
  export default function GrandDetailCard({ data }: GrandDetailCardProps) {
    const { mathType: mt, topicId, left: isLeft, onClose } = data;
    const questions = getQuestionsForTopic(topicId);
  ```
- Dòng 238–390: Tab 5 ("quiz" / "5. 5 Câu đề thật") hiển thị danh sách câu hỏi từ mảng `questions` nhận được từ `getQuestionsForTopic(topicId)`.

### 1.5. Lỗi kiểm thử thực tế từ bộ chạy E2E `scripts/validate_all.js`
Chạy lệnh `node scripts/validate_all.js`, tại Tier 1 phát hiện lỗi:
```
[TIER 1] QUESTION COUNT & COVERAGE CHECK
--------------------------------------------------------------------------------
✗ TIER 1 FAILED:
   • [Mindmap Mapping Lỗi] Chủ đề TOPIC_3_1 ("Tọa độ hóa Oxyz giải bài toán cực trị không gian thực tế") không tìm thấy trong REAL_QUESTIONS_BANK! (Đặc biệt kiểm tra ánh xạ TOPIC_3_1)
```

### 1.6. Kiểm chứng thực nghiệm (Reproduction Test)
Tạo và chạy file thực nghiệm `test_eval.js`:
```
Tree Topic IDs: [ 'TOPIC_1_1', 'TOPIC_1_2', 'TOPIC_1_3', 'TOPIC_1_4', 'TOPIC_1_5', 'TOPIC_1_6', 'TOPIC_2_1', 'TOPIC_2_2', 'TOPIC_2_3', 'TOPIC_3_1' ]
Bank Keys:      [ 'TOPIC_1_1', 'TOPIC_1_2', 'TOPIC_1_3', 'TOPIC_1_4', 'TOPIC_1_5', 'TOPIC_1_6', 'TOPIC_2_1', 'TOPIC_2_2', 'TOPIC_2_3', 'TOPIC_2_4' ]

Topic ID: TOPIC_3_1 -> in REAL_QUESTIONS_BANK? NO (MISMATCH!)
getQuestionsForTopic("TOPIC_3_1") returned IDs: [ 'Q36_T8', 'Q37_T8', 'Q38_T8', 'Q39_T8', 'Q40_T8' ]
Matches TOPIC_2_2 identically? true
```

---

## 2. Logic Chain (Chuỗi suy luận nhân - quả)

1. **Từ Quan sát 1.1 và 1.3**: Trong `machData.ts`, Chủ đề 10 ("Tọa độ hóa Oxyz giải bài toán cực trị không gian thực tế") có mã định danh `id: "TOPIC_3_1"`. Khi người dùng nhấp vào Dạng 10.1 (`MT_3_1_1`), Dạng 10.2 (`MT_3_1_2`) hoặc Dạng 10.3 (`MT_3_1_3`), `page.tsx` truyền nguyên vẹn `topicId = "TOPIC_3_1"` vào `GrandDetailCard.tsx`.
2. **Từ Quan sát 1.2 và 1.4**: `GrandDetailCard.tsx` gọi hàm `getQuestionsForTopic("TOPIC_3_1")`.
3. **Từ Quan sát 1.2**: Trong `mindmapQuestions.ts`, 5 câu hỏi thực tế của Chủ đề 10 (Q46–Q50: bóng đèn trong phòng hộp, khinh khí cầu bay theo tham số, drone tránh radar, đường ống dẫn khí qua mặt phẳng phản xạ, vệ tinh bay trên quỹ đạo cầu) lại bị đặt dưới key `"TOPIC_2_4"`.
4. **Phân tích nhánh điều kiện của `getQuestionsForTopic`**:
   - `if (REAL_QUESTIONS_BANK[topicId])`: Kiểm tra `REAL_QUESTIONS_BANK["TOPIC_3_1"]`. Do key này không tồn tại trong từ điển, biểu thức trả về `undefined` (`false`).
   - `if (topicId.startsWith("TOPIC_1"))`: Kiểm tra `"TOPIC_3_1".startsWith("TOPIC_1")`. Trả về `false`.
   - Dòng cuối cùng: `return REAL_QUESTIONS_BANK["TOPIC_2_2"];`.
5. **Hậu quả trực quan**: `getQuestionsForTopic("TOPIC_3_1")` trả về 5 câu hỏi của `TOPIC_2_2` (Chủ đề 08: tọa độ vectơ, trung điểm, trọng tâm, tích vô hướng của $Oxyz$: Q36, Q37, Q38, Q39, Q40). Người học nhấn vào bài toán thực tế chuyển động và cực trị không gian lại nhìn thấy câu hỏi tính tọa độ trung điểm cơ bản!
6. **Hậu quả kiểm thử (Từ Quan sát 1.5)**: `validate_all.js` (Tier 1, dòng 330) duyệt danh sách chủ đề thực tế từ `TREE_DATA` (`treeTopics`). Khi đến chủ đề `TOPIC_3_1`, `mindmapBank["TOPIC_3_1"]` không tồn tại, lập tức kích hoạt lỗi nghiêm trọng `[Mindmap Mapping Lỗi] Chủ đề TOPIC_3_1 không tìm thấy trong REAL_QUESTIONS_BANK!`.
7. **Kết luận suy luận**: Toàn bộ chuỗi lỗi trên được giải quyết triệt để và an toàn khi:
   - Đổi key `"TOPIC_2_4"` thành `"TOPIC_3_1"` trong `REAL_QUESTIONS_BANK`.
   - Bổ sung logic phòng vệ trong `getQuestionsForTopic` (hỗ trợ cả `TOPIC_3_1`, bí danh `TOPIC_2_4`, và tiền tố `TOPIC_3`).

---

## 3. Caveats (Lưu ý & Điểm mở rộng)

1. **Phạm vi thay đổi mã nguồn**:
   - Khóa duy nhất cần điều chỉnh là key trong `REAL_QUESTIONS_BANK` của `src/app/mindmap/mindmapQuestions.ts`.
   - `machData.ts` và `page.tsx` đã chuẩn hóa hoàn hảo theo hợp đồng kiến trúc (Line 96 `PROJECT.md`), **tuyệt đối không được đổi `TOPIC_3_1` trong `machData.ts`** vì sẽ làm xáo trộn cấu trúc cây và phân hệ `MathCategory`.
2. **Cơ chế reset state khi đổi dạng toán trong `GrandDetailCard.tsx`**:
   - Qua kiểm tra chi tiết dòng 41–73 của `GrandDetailCard.tsx`, component lưu trữ các state `qIndex`, `selectedAnswers`, `checkedAnswers`, `shortInputs`. Vì node `grand-detail` trong React Flow dùng chung ID, khi người dùng bấm chuyển giữa các dạng toán hoặc các chủ đề khác nhau mà không bấm đóng thẻ, các đáp án đã chọn của câu trước có thể lưu lại trên bộ nhớ tạm nếu không có hiệu ứng reset.
   - Khuyến nghị Worker bổ sung một `useEffect` gọn gàng lắng nghe `[mt.id, topicId]` để tự động đưa về Câu 1 và xóa state cũ (đã tạo sẵn patch `granddetail_state_reset.patch`).
3. **Phối hợp với Explorer 2 và Explorer 3**:
   - Explorer 2 (`explorer_m2_questions`) chịu trách nhiệm rà soát chống trùng lặp với SQLite `prisma/dev.db`.
   - Explorer 3 (`explorer_m2_sources`) chịu trách nhiệm chuẩn hóa chuỗi `source` thành `[Nguồn: ...]` và KaTeX `throwOnError: true`.
   - Bản thiết kế kiến trúc này độc lập và tương thích 100% với nội dung câu hỏi mới do Explorer 2 & 3 chuyển giao.

---

## 4. Conclusion (Đánh giá kết luận & Giải pháp cụ thể)

### 4.1. Bản vá mã nguồn chuẩn xác (Exact Code Changes)

#### A. Trong `src/app/mindmap/mindmapQuestions.ts`

**Vị trí 1 (Dòng 760–762): Đổi tên khóa ngân hàng câu hỏi**
- *Trước (Before)*:
  ```typescript
  // =========================================================================
  // CHỦ ĐỀ 10: TỌA ĐỘ HÓA OXYZ & BÀI TOÁN CỰC TRỊ THỰC TẾ (TOPIC_2_4)
  // =========================================================================
  "TOPIC_2_4": [
  ```
- *Sau (After)*:
  ```typescript
  // =========================================================================
  // CHỦ ĐỀ 10: TỌA ĐỘ HÓA OXYZ & BÀI TOÁN CỰC TRỊ THỰC TẾ (TOPIC_3_1)
  // =========================================================================
  "TOPIC_3_1": [
  ```

**Vị trí 2 (Dòng 841–851): Nâng cấp hàm `getQuestionsForTopic` đa tầng bảo vệ**
- *Trước (Before)*:
  ```typescript
  export function getQuestionsForTopic(topicId: string): ExamQuestionItem[] {
    if (REAL_QUESTIONS_BANK[topicId]) {
      return REAL_QUESTIONS_BANK[topicId];
    }
    // Mặc định fallback: Nếu thuộc Chương I thì trả về ngân hàng Chương I
    if (topicId.startsWith("TOPIC_1")) {
      return REAL_QUESTIONS_BANK["TOPIC_1_1"];
    }
    // Nếu thuộc Chương II thì trả về ngân hàng Oxyz
    return REAL_QUESTIONS_BANK["TOPIC_2_2"];
  }
  ```
- *Sau (After)*:
  ```typescript
  export function getQuestionsForTopic(topicId: string): ExamQuestionItem[] {
    if (REAL_QUESTIONS_BANK[topicId]) {
      return REAL_QUESTIONS_BANK[topicId];
    }
    // Hỗ trợ mã cũ TOPIC_2_4 nếu có gọi
    if (topicId === "TOPIC_2_4") {
      return REAL_QUESTIONS_BANK["TOPIC_3_1"] || [];
    }
    // Mặc định fallback: Nếu thuộc Chương I thì trả về ngân hàng Chương I
    if (topicId.startsWith("TOPIC_1")) {
      return REAL_QUESTIONS_BANK["TOPIC_1_1"];
    }
    // Nếu thuộc Chủ đề 10 (Bài toán thực tế cực trị Oxyz) thì trả về TOPIC_3_1
    if (topicId.startsWith("TOPIC_3")) {
      return REAL_QUESTIONS_BANK["TOPIC_3_1"];
    }
    // Nếu thuộc Chương II (Các chủ đề Oxyz khác) thì trả về ngân hàng Oxyz
    return REAL_QUESTIONS_BANK["TOPIC_2_2"];
  }
  ```

#### B. Trong `src/app/mindmap/GrandDetailCard.tsx` (Khuyến nghị tăng cường UX)
Bổ sung `useEffect` từ React (dòng 3) và hook reset state (dòng 47):
```typescript
import { useState, useEffect } from "react";
...
  // Tự động reset về Câu 1 và xóa state đáp án cũ khi đổi Dạng toán hoặc Chủ đề
  useEffect(() => {
    setQIndex(0);
    setSelectedAnswers({});
    setCheckedAnswers({});
    setShortInputs({});
  }, [mt.id, topicId]);
```

---

## 5. Integration Recipe for the Worker (Công thức thực thi cho Worker)

Worker chỉ cần thực hiện 3 bước đơn giản:

### Bước 1: Áp dụng bản vá `topic10_id_fix.patch`
Sử dụng công cụ `replace_file_content` sửa file `src/app/mindmap/mindmapQuestions.ts`:
1. Thay `"TOPIC_2_4": [` thành `"TOPIC_3_1": [` tại dòng 762.
2. Cập nhật hàm `getQuestionsForTopic` tại dòng 841–851 theo khối mã chuẩn ở Mục 4.1.

*(Tùy chọn nâng cao)*: Áp dụng bản vá `granddetail_state_reset.patch` cho `src/app/mindmap/GrandDetailCard.tsx` để reset state khi chuyển phân dạng.

### Bước 2: Tích hợp cùng dữ liệu của Explorer 2 & Explorer 3
Khi Worker nạp 50 câu hỏi mới từ Explorer 2 (đã loại bỏ 15 câu trùng với DB) và Explorer 3 (đã chuẩn hóa `[Nguồn: ...]` và KaTeX):
- Đảm bảo 5 câu hỏi của Chủ đề 10 được gắn trực tiếp vào key `"TOPIC_3_1"`.

### Bước 3: Xác minh kiểm thử độc lập
Chạy bộ kiểm tra sau để xác nhận 100% thành công:
```powershell
node .agents/teamwork/explorer_m2_arch/test_fix.js
npx tsc --noEmit
node scripts/validate_all.js
```

---

## 6. Verification Method (Phương pháp kiểm chứng độc lập)

1. **Kiểm tra khớp nối 10 chủ đề (1:1 Key Matching)**:
   Chạy file kiểm thử:
   ```bash
   node .agents/teamwork/explorer_m2_arch/test_fix.js
   ```
   *Kết quả mong đợi*:
   - `All 10 topics match 1:1? true`
   - `Returned IDs match expected Topic 10 IDs identically? true` (Trả về đúng `Q46_T10` $\to$ `Q50_T10`, không còn rơi vào `TOPIC_2_2`).
2. **Kiểm tra kiểm thử E2E Tier 1**:
   Chạy:
   ```bash
   node scripts/validate_all.js
   ```
   *Kết quả mong đợi*: Lỗi `[Mindmap Mapping Lỗi] Chủ đề TOPIC_3_1 không tìm thấy trong REAL_QUESTIONS_BANK!` hoàn toàn biến mất khỏi danh sách vi phạm của Tier 1.
3. **Kiểm tra biên dịch TypeScript**:
   Chạy:
   ```bash
   npx tsc --noEmit
   ```
   *Kết quả mong đợi*: Exit code 0, không có lỗi kiểu dữ liệu.

---
*Báo cáo được hoàn thành và nghiệm thu độc lập theo Handoff Protocol.*
