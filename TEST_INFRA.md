# KIẾN TRÚC VÀ HẠ TẦNG KIỂM THỬ TỰ ĐỘNG TOÀN DIỆN (TEST_INFRA.md)
## DỰ ÁN HỌC LIỆU SỐ ÔN TẬP TOÁN 12 TRÊN PADLET

---

## 1. Triết lý Kiểm thử (Test Philosophy)

Hạ tầng kiểm thử của dự án **Math Study Padlet 12** được xây dựng dựa trên nguyên lý **Opaque-Box Requirement-Driven Testing (Kiểm thử Hộp đục theo yêu cầu đặc tả)**:

1. **Độc lập và Khách quan (Independence & Black-Box)**:
   - Kiểm thử coi toàn bộ mã nguồn ứng dụng và cơ sở dữ liệu là "hộp đục" (opaque box).
   - Bộ kiểm thử không suy đoán hay phụ thuộc vào cách thức triển khai nội bộ của các thành phần, mà trực tiếp đánh giá trạng thái dữ liệu (observable data states), hợp đồng dữ liệu (data contracts), tính đúng đắn toán học (mathematical correctness) và trải nghiệm học liệu của học sinh.
2. **Bắt nguồn từ Yêu cầu Thực tế (`ORIGINAL_REQUEST.md`)**:
   - Tất cả tiêu chuẩn nghiệm thu và điều kiện kiểm thử đều được ánh xạ trực tiếp từ 4 yêu cầu cốt lõi (R1, R2, R3, R4) và Bộ Quy tắc Chất lượng (`AGENTS.md`), bao gồm:
     - 100% đề thi thật có thể kiểm chứng nguồn gốc.
     - 100% công thức hiển thị chuẩn KaTeX, không lỗi cú pháp hoặc ký tự rác.
     - Bắt buộc đầy đủ điều kiện toán học (Tập xác định $D$, mẫu $\ne 0$, biểu thức trong căn $\ge 0$, $\vec{a} \ne \vec{0}$, $\vec{u} \cdot \vec{v} = 0$).
     - Đầy đủ hướng dẫn bấm máy tính kép cho cả hai dòng máy **Casio fx-580VN X** và **Casio fx-880BTG**.
     - 0% trùng lặp câu hỏi giữa các phân hệ `/practice` và `/mindmap`.
3. **Phát hiện suy thoái sớm (Regression Prevention & Baseline Auditing)**:
   - Mọi thay đổi dữ liệu hoặc mã nguồn đều phải vượt qua bộ kiểm thử tự động với mã thoát (exit code) duy nhất: `0` khi hoàn hảo và `1` khi phát hiện bất kỳ sai sót nào.

---

## 2. Bảng Ánh xạ Tính năng & Các Tầng Kiểm thử (Feature Inventory Mapping)

Hạ tầng kiểm thử kiểm soát chặt chẽ 11 tính năng trong `PROJECT.md` qua 5 Tầng Kiểm thử (Tiers):

| Feature Code | Mô tả Tính năng | Tầng Kiểm thử Phụ trách (Tier) | Phương pháp & Tiêu chí Đánh giá |
|:---:|---|:---:|---|
| **F1** | Phân loại & Chuẩn hóa 37 dạng toán SGK Bài 1 - Bài 8 | **Tier 1** & **Tier 4** | Kiểm tra danh mục `MathCategory` và cây tri thức `machData.ts` đạt đủ 10 chủ đề và các phân dạng chuẩn SGK; kiểm tra đầy đủ 4 trường nội dung và điều kiện toán học. |
| **F2** | Chuẩn hóa KaTeX & Bổ sung Điều kiện toán học | **Tier 4** | Quét toàn bộ công thức inline `$...$` và block `$$...$$` qua parser `katex.renderToString({ throwOnError: true })`; chặn ký tự điều khiển (`\u000b`, `\f`); kiểm tra sự hiện diện của điều kiện toán học ($D$, $\ne 0$, $\ge 0$, $\vec{a} \ne \vec{0}$, $\vec{u} \cdot \vec{v} = 0$). |
| **F3** | Sửa lỗi ánh xạ Topic 10 trong Mindmap (`TOPIC_3_1`) | **Tier 1** | Xác nhận mã chủ đề `TOPIC_3_1` trong `machData.ts` khớp nối chính xác 1:1 với khóa dữ liệu trong `REAL_QUESTIONS_BANK` (`mindmapQuestions.ts`), không bị lệch sang `TOPIC_2_4`. |
| **F4** | Tích hợp 50 câu đề thi thật vào Mindmap | **Tier 1** & **Tier 2** | Kiểm tra ngân hàng tĩnh có đúng 50 câu hỏi phân bổ đều cho 10 chủ đề (5 câu/chủ đề); 100% câu hỏi có gắn tag `[Nguồn: ...]` chuẩn xác từ đề thi thật. |
| **F5** | Ngân hàng bài tập $\ge 10$ câu/dạng cho Practice | **Tier 1** & **Tier 2** | Kiểm tra cơ sở dữ liệu SQLite (`Question` theo `categoryId`): mọi dạng toán đều có $\ge 10$ câu hỏi; đủ 3 định dạng (Trắc nghiệm 4 lựa chọn, Đúng/Sai, Trả lời ngắn); 100% có nguồn thật `[Nguồn: ...]`. |
| **F6** | Hướng dẫn bấm máy tính Casio kép (fx-580 & fx-880) | **Tier 5** | Kiểm tra 100% câu hỏi trong cơ sở dữ liệu có trường `casioGuide` chứa hướng dẫn chi tiết từng nút bấm cho cả hai dòng máy **Casio fx-580VN X** và **Casio fx-880BTG**. |
| **F7** | Loại bỏ trùng lặp câu hỏi tuyệt đối (0% duplication) | **Tier 3** | Đối soát chéo toàn bộ nội dung đề bài chuẩn hóa giữa `/practice` (DB SQLite) và `/mindmap` (`REAL_QUESTIONS_BANK`); đối soát nội bộ trong từng phân hệ; tỷ lệ trùng lặp bắt buộc bằng $0\%$. |
| **F8** | Cấu hình ESLint & Sửa lỗi lint Next.js | **Hạ tầng CI/CD** | Lệnh `npm run lint` chạy sạch lỗi. |
| **F9** | Cập nhật bộ lọc danh mục động trên UI | **Giao diện Web** | Bộ lọc `/math-types` và `/practice` tải động theo DB, không hardcode. |
| **F10** | Tích hợp Runner kiểm thử tự động `validate_all.js` | **Kiến trúc Runner** | Script thực thi độc lập bằng lệnh `node scripts/validate_all.js`. |
| **F11** | Đạt 100% E2E Pass & Kiểm nghiệm người dùng | **Tổng kết Nghiệm thu** | Toàn bộ 5 Tiers đạt 100% PASS; build sản xuất `npm run build` thành công rực rỡ. |

---

## 3. Đặc tả Chi tiết 5 Tầng Kiểm thử (Tier 1 - Tier 5 Specifications)

### Tier 1: Question Count & Scope Coverage Check (Số lượng & Độ bao phủ)
- **Mục tiêu**: Đảm bảo đủ số lượng câu hỏi luyện tập và sơ đồ tri thức theo yêu cầu của dự án.
- **Quy tắc kiểm tra**:
  1. **Cơ sở dữ liệu `/practice`**:
     - Lấy danh sách tất cả các dạng toán `MathCategory` trong cơ sở dữ liệu.
     - Với mỗi dạng toán, đếm số lượng câu hỏi liên kết trong bảng `Question`.
     - Điều kiện PASS: Mọi dạng toán phải có số câu hỏi $N \ge 10$.
     - Kiểm tra sự đa dạng: Mỗi dạng toán phải có ít nhất câu hỏi trắc nghiệm (`MULTIPLE_CHOICE`), đúng/sai (`TRUE_FALSE`) hoặc trả lời ngắn (`SHORT_ANSWER`).
  2. **Sơ đồ tri thức `/mindmap`**:
     - Kiểm tra cây tri thức `TREE_DATA` (`machData.ts`) có đúng 10 chủ đề (6 chủ đề Chương I và 4 chủ đề Chương II).
     - Kiểm tra ngân hàng câu hỏi `REAL_QUESTIONS_BANK` (`mindmapQuestions.ts`) có đủ 10 chủ đề, mỗi chủ đề có đúng 5 câu hỏi thật, tổng cộng đúng 50 câu hỏi.
     - Kiểm tra khớp nối mã ID chủ đề: Tất cả các `topic.id` trong `machData.ts` (đặc biệt là chủ đề 10: `TOPIC_3_1`) phải tồn tại trong `REAL_QUESTIONS_BANK`.

### Tier 2: Real-Exam Source Verification Check (Nguồn gốc Đề thi Thật 100%)
- **Mục tiêu**: Đảm bảo 100% câu hỏi học liệu đều trích dẫn từ đề thi thật có thể kiểm chứng, tuyệt đối không bịa đặt nguồn.
- **Quy tắc kiểm tra**:
  1. **Định dạng chuẩn**: Trường nguồn (`sourceExam` trong DB, `source` trong Mindmap) phải được đóng gói theo định dạng `[Nguồn: <Chi tiết>]`.
  2. **Cơ quan phát hành / Đơn vị tổ chức thật**: Nguồn phải chứa một trong các thực thể giáo dục có thẩm quyền:
     - Bộ Giáo dục và Đào tạo: `Bộ GD&ĐT`, `Bộ GD và ĐT`, `Bộ Giáo dục`, `Đề thi tốt nghiệp THPT`, `Đề tham khảo`.
     - Các Sở Giáo dục và Đào tạo uy tín: `Sở GD&ĐT`, `Sở GD` (Hà Nội, Hải Phòng, Nam Định, Bắc Ninh, Nghệ An, Thái Bình, TP.HCM, Vĩnh Phúc, v.v.).
     - Các trường THPT Chuyên danh tiếng: `THPT Chuyên`, `Chuyên KHTN`, `Chuyên ĐHSP`, `Chuyên Sư Phạm`, `Chuyên Lam Sơn`, `Chuyên Phan Bội Châu`, `Chuyên Hùng Vương`, `Chuyên Lê Hồng Phong`, v.v.
  3. **Thông tin kỳ thi & năm thi**: Nguồn phải chỉ rõ năm thi (ví dụ: `2024`, `2025`, `2023`) và mã câu/mã đề/đợt thi.

### Tier 3: Zero-Duplication Invariant Check (Kiểm tra Chống Trùng lặp Tuyệt đối)
- **Mục tiêu**: Đảm bảo tính độc lập và đa dạng học liệu, 0% câu hỏi bị trùng lặp giữa các phân hệ.
- **Quy tắc kiểm tra**:
  1. **Chuẩn hóa nội dung (Text Normalization)**:
     - Loại bỏ các thẻ định dạng KaTeX `$...$` và `$$...$$`.
     - Chuyển toàn bộ về chữ thường, loại bỏ khoảng trắng thừa, dấu câu và các ký tự đặc biệt.
  2. **Đối soát liên phân hệ (Cross-module check)**:
     - So khớp từng câu hỏi trong bảng `Question` (`/practice`) với từng câu hỏi trong `REAL_QUESTIONS_BANK` (`/mindmap`).
     - Tỷ lệ trùng lặp cho phép: **0 câu**. Nếu phát hiện bất kỳ câu hỏi nào trùng nội dung, đánh dấu FAIL ngay lập tức.
  3. **Đối soát nội bộ (Intra-module check)**:
     - Kiểm tra không có câu hỏi nào bị lặp lại trong nội bộ ngân hàng `/practice`.
     - Kiểm tra không có câu hỏi nào bị lặp lại giữa các nhánh trong `/mindmap`.

### Tier 4: KaTeX Syntax & Mathematical Domain Conditions Check (Cú pháp KaTeX & Điều kiện Toán học)
- **Mục tiêu**: Đảm bảo tính hiển thị toán học chuẩn mực, không lỗi parser và bảo toàn tính chặt chẽ sư phạm.
- **Quy tắc kiểm tra**:
  1. **Quét ký tự điều khiển lạ**:
     - Phát hiện và cấm tuyệt đối các ký tự điều khiển vô hình gây lỗi trình biên dịch (như `\u000b` vertical tab, `\f` form feed, `\0` null byte).
  2. **Kiểm tra cú pháp KaTeX với Parser gốc**:
     - Trích xuất toàn bộ công thức inline `$formula$` và block `$$formula$$` từ:
       - Đề bài `content`, đáp án `optionsJson`, lời giải `explanation`, phân tích nhiễu `distractorAnalysis` trong DB.
       - Đề bài, đáp án, lời giải trong `REAL_QUESTIONS_BANK`.
       - Lý thuyết `theory`, dấu hiệu `signs`, phương pháp `methods`, cạm bẫy `mistakes` trong `machData.ts`.
     - Biên dịch thử từng công thức bằng `katex.renderToString(formula, { throwOnError: true, displayMode: isBlock })`.
     - Bất kỳ lỗi parse nào (như thiếu dấu ngoặc, macro không hợp lệ, escape sai `\`) đều bị ghi nhận lỗi nghiêm trọng.
  3. **Kiểm tra Điều kiện Toán học Bắt buộc (Domain Conditions)**:
     - Khảo sát sự hiện diện của điều kiện áp dụng trong lý thuyết dạng toán và lời giải mẫu mực:
       - Hàm phân thức hữu tỉ, hàm chứa mẫu: điều kiện mẫu số khác $0$ ($x \ne x_0$, $\ne 0$).
       - Căn thức: điều kiện biểu thức dưới căn không âm ($\ge 0$).
       - Tập xác định: sự xuất hiện của ký hiệu $D = ...$ hoặc $D \subset \mathbb{R}$.
       - Hình học không gian vectơ Oxyz: điều kiện vectơ khác vectơ-không ($\vec{a} \ne \vec{0}$ hoặc $\ne \vec{0}$), điều kiện vuông góc qua tích vô hướng ($\vec{u} \cdot \vec{v} = 0$).

### Tier 5: Dual Casio Calculator Guide Check (Hướng dẫn Máy tính Bỏ túi Kép)
- **Mục tiêu**: Đảm bảo 100% câu hỏi phục vụ học sinh ôn thi thực chiến có hướng dẫn chi tiết trên cả hai dòng máy Casio hiện hành.
- **Quy tắc kiểm tra**:
  1. Trường `casioGuide` trong bảng `Question` không được phép rỗng hoặc null.
  2. Bắt buộc có hướng dẫn riêng biệt cho dòng máy **Casio fx-580VN X**:
     - Nhận diện từ khóa model: `fx-580`, `580VN`, `580VN X`.
     - Thao tác nút bấm cụ thể: `MENU`, `OPTN`, `CALC`, `TABLE [MENU 8]`, `EQUATION [MENU 9]`, `VECTOR [MENU 5]`, `d/dx`, v.v.
  3. Bắt buộc có hướng dẫn riêng biệt cho dòng máy **Casio fx-880BTG**:
     - Nhận diện từ khóa model: `fx-880`, `880BTG`.
     - Thao tác phím giao diện mới: `HOME`, `VARIABLE`, `FUNCTION`, `CATALOG`, `TOOLS`, `Bảng giá trị`, `Vectơ`, `Phương trình`, `OK`, v.v.

---

## 4. Kiến trúc Bộ Chạy Kiểm thử (Test Architecture & Runner Execution)

### Lệnh chạy Kiểm thử Độc lập
Bộ kiểm thử được thiết kế hoàn toàn khép kín, thực thi thông qua một lệnh tiêu chuẩn duy nhất:
```bash
node scripts/validate_all.js
```

### Yêu cầu Môi trường & Dependencies
- **Node.js**: Phiên bản 18+ (Dự án đang dùng Node.js v24.18.0).
- **Prisma Client (`@prisma/client`)**: Kết nối trực tiếp cơ sở dữ liệu SQLite `prisma/dev.db`.
- **TypeScript Compiler (`typescript`)**: Nạp và biên dịch trực tiếp module TypeScript `machData.ts` và `mindmapQuestions.ts` tại thời điểm chạy (runtime in-memory transpile).
- **KaTeX (`katex`)**: Phân tích cú pháp biểu thức toán học thời gian thực với cờ `throwOnError: true`.

### Cơ chế Mã Thoát (Exit Codes & Fail-Fast Semantics)
- `Exit Code 0`: **HOÀN TOÀN ĐẠT CHUẨN (ALL TIERS PASSED)**. Tất cả tiêu chí từ Tier 1 đến Tier 5 đều đạt 100%. Sẵn sàng phát hành hoặc đưa vào CI/CD.
- `Exit Code 1`: **PHÁT HIỆN LỖI (AT LEAST ONE TIER FAILED)**. In bảng chẩn đoán lỗi chi tiết kèm mã câu, dạng toán, vị trí file và lý do vi phạm để nhóm phát triển khắc phục ngay lập tức.

### Định dạng Báo cáo Chẩn đoán Đầu ra (Diagnostic Output)
Bộ chạy kiểm thử xuất báo cáo trực quan với mã màu ANSI trên Terminal, cấu trúc rõ ràng:
1. **Header Banner**: Thời gian kiểm thử, phiên bản môi trường, tổng quan cấu hình.
2. **Chi tiết từng Tier (Tiers 1 - 5)**:
   - Tên tầng kiểm thử và mục tiêu.
   - Thống kê số lượng phần tử đã kiểm tra, số lượng đạt, số lượng lỗi.
   - Danh sách chi tiết các vi phạm (nếu có): `[Mã câu / Vị trí] -> [Lý do lỗi]`.
3. **Bảng Tổng kết Kết quả (Executive Summary Table)**:
   - Cột: Tầng kiểm thử, Trạng thái (PASS/FAIL), Số lượng kiểm tra, Tỷ lệ đạt (%).
4. **Kết luận Cuối cùng (Final Verdict)**:
   - Thông báo tổng quát thành công hoặc yêu cầu khắc phục lỗi trước khi bàn giao.

---

## 5. Ngưỡng Chất lượng Bắt buộc (Coverage & Quality Thresholds)

| Chỉ số Chất lượng (Metric) | Ngưỡng Tối thiểu Bắt buộc | Trạng thái Nghiệm thu |
|---|:---:|:---:|
| Số câu hỏi tối thiểu mỗi Dạng toán trong DB `/practice` | $\ge 10$ câu/dạng | Bắt buộc 100% dạng đạt |
| Số câu hỏi trong Sơ đồ tri thức `/mindmap` | Đúng 50 câu (10 chủ đề $\times$ 5 câu) | Bắt buộc 100% khớp |
| Tỷ lệ câu hỏi có nguồn gốc đề thi thật `[Nguồn: ...]` | **100.0%** | Không chấp nhận ngoại lệ |
| Tỷ lệ trùng lặp câu hỏi giữa `/practice` và `/mindmap` | **0.0%** | Tuyệt đối không trùng |
| Tỷ lệ công thức KaTeX hợp lệ (Render không lỗi) | **100.0%** | Không phát sinh lỗi parse |
| Tỷ lệ câu hỏi trong DB có hướng dẫn bấm máy tính Casio kép | **100.0%** (Cả 580 và 880) | Bắt buộc đủ 2 dòng máy |
| Tỷ lệ kiểm tra chéo độc lập (`verifiedBy`) | 100.0% có người kiểm tra | Đảm bảo tính khách quan |
