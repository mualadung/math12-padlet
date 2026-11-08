# BÁO CÁO BÀN GIAO HẠ TẦNG KIỂM THỬ E2E (HANDOFF.MD)

## 1. Quan Sát (Observation)
- **Vị trí và Hồ sơ Hiện trạng**:
  - `d:\TEST\MATH-STUDY\prisma\schema.prisma`: Định nghĩa 2 mô hình cốt lõi `MathCategory` (dạng toán) và `Question` (ngân hàng câu hỏi trắc nghiệm gồm 3 định dạng).
  - `d:\TEST\MATH-STUDY\prisma\dev.db`: Cơ sở dữ liệu SQLite hiện tại có 7 `MathCategory` và 55 `Question`. Phân bố câu hỏi trên 7 dạng toán: Dạng 1 (8 câu), Dạng 2 (8 câu), Dạng 3 (8 câu), Dạng 4 (7 câu), Dạng 5 (7 câu), Dạng 6 (8 câu), Dạng 7 (9 câu). Tất cả đều dưới ngưỡng tối thiểu 10 câu/dạng.
  - `d:\TEST\MATH-STUDY\src\app\mindmap\machData.ts` (dòng 53-65): Cấu trúc `TREE_DATA` gồm 2 Chương, 10 Chủ đề. Chủ đề số 10 được định danh là `"TOPIC_3_1"`.
  - `d:\TEST\MATH-STUDY\src\app\mindmap\mindmapQuestions.ts` (dòng 23-27): Khóa của ngân hàng câu hỏi `REAL_QUESTIONS_BANK` chứa 10 khóa: `TOPIC_1_1` đến `TOPIC_1_6`, và `TOPIC_2_1` đến `TOPIC_2_4`. Bị thiếu khóa `TOPIC_3_1` (bị gán nhầm thành `TOPIC_2_4`).
  - Toàn bộ 55 câu hỏi trong DB (`Question.sourceExam`) và 50 câu hỏi trong Mindmap (`REAL_QUESTIONS_BANK[...].source`) đều ghi nguồn đề thi thô không có cặp ngoặc vuông `[Nguồn: ...]` (ví dụ: `Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 102 - Câu 15`).
  - Có 15 câu hỏi bị trùng lặp nội dung y hệt giữa `/practice` (DB `Question`) và `/mindmap` (`mindmapQuestions.ts`) (ví dụ: câu hỏi `Q01_D1_MC` và `Q01_D1`).
  - 54/55 câu hỏi trong cơ sở dữ liệu chưa có hướng dẫn bấm máy tính kép cho cả 2 dòng máy Casio fx-580VN X và Casio fx-880BTG.
- **Lệnh thực thi kiểm thử và kết quả baseline**:
  - Lệnh: `node scripts/validate_all.js`
  - Mã thoát (Exit Code): `1`
  - Bảng tổng kết kết quả:
    ```
    | Tầng Kiểm Thử (Tier)                         | Trạng thái | Số mục kiểm tra | Số lỗi |
    | Tier 1: Question Count Check                 |    FAIL    |              19 |      8 |
    | Tier 2: Real-Exam Source Check               |    FAIL    |             105 |    105 |
    | Tier 3: Duplication Check                    |    FAIL    |            2750 |     15 |
    | Tier 4: KaTeX Syntax & Conditions Check      |    PASS    |            1059 |      0 |
    | Tier 5: Dual Casio Calculator Guide Check    |    FAIL    |              55 |     54 |
    ```

---

## 2. Chuỗi Suy Luận (Logic Chain)
1. **Từ Quan sát 1**: `prisma/dev.db` chỉ có 55 câu hỏi trên 7 danh mục, số lượng mỗi danh mục dao động từ 7 đến 9 câu. Yêu cầu trong `ORIGINAL_REQUEST.md` (R3, AC) và `PROJECT.md` (F5) bắt buộc mỗi dạng toán phải đạt tối thiểu 10 câu hỏi đề thi thật ($\ge 70$ câu). Do đó, Tier 1 báo lỗi thiếu câu hỏi ở toàn bộ 7 dạng.
2. **Từ Quan sát 2**: `machData.ts` dùng mã `TOPIC_3_1` cho Chủ đề 10 ("Tọa độ hóa Oxyz giải bài toán cực trị không gian thực tế"), nhưng `mindmapQuestions.ts` lại lưu trữ câu hỏi dưới khóa `TOPIC_2_4`. Khi người dùng mở chi tiết Chủ đề 10 trên web, hệ thống không tìm thấy bài tập tương ứng. Tier 1 phát hiện chính xác lỗi ánh xạ này.
3. **Từ Quan sát 3**: Quy tắc III.2 (`AGENTS.md`) và Hợp đồng giao tiếp trong `PROJECT.md` quy định trường nguồn phải có dạng `[Nguồn: Tên Kỳ thi/Sở GD&ĐT/Trường Chuyên - Năm thi - Mã câu/Mã đề]`. Cả DB lẫn Mindmap hiện đều chỉ lưu chuỗi trần không có tiền tố `[Nguồn: ...]` đóng ngoặc. Do đó, 100% câu hỏi hiện thời (105/105) vi phạm quy chuẩn định dạng Tier 2.
4. **Từ Quan sát 4**: Sự xuất hiện của 15 câu hỏi có nội dung đề bài giống nhau giữa DB `/practice` và Mindmap `/mindmap` vi phạm trực tiếp Tiêu chí nghiệm thu chống trùng lặp (AC: "0% trùng lặp giữa các dạng trong /math-types, các nhánh trong /mindmap và ngân hàng bài tập trong /practice"). Tier 3 đã cô lập và liệt kê chính xác 15 cặp trùng này.
5. **Từ Quan sát 5**: 1,059 biểu thức toán học KaTeX trong toàn bộ câu hỏi DB, sơ đồ tri thức `machData.ts` và đề thi Mindmap đều biên dịch thành công qua `katex.renderToString({ throwOnError: true })` và không có ký tự điều khiển lạ. Điều này chứng minh chất lượng KaTeX cơ sở đã rất tốt và đạt PASS ở Tier 4.
6. **Từ Quan sát 6**: Hầu hết các câu hỏi trong DB hiện tại hoặc không ghi rõ dòng máy, hoặc chỉ có hướng dẫn sơ sài cho fx-580 mà thiếu hoàn toàn quy trình phím bấm của dòng máy thế hệ mới **Casio fx-880BTG** (HOME, CATALOG, TOOLS, OK...). Tier 5 chỉ ra 54/55 câu hỏi cần được nâng cấp hướng dẫn Casio kép.

---

## 3. Các Điểm Cần Lưu Ý (Caveats)
- Bộ runner `scripts/validate_all.js` sử dụng TypeScript Compiler API (`ts.transpileModule`) để nạp trực tiếp file `.ts` trong môi trường runtime Node.js mà không cần bước build trước. Môi trường bắt buộc phải có package `typescript` trong `node_modules` (dự án đã cài sẵn `typescript@5.6.3`).
- Dữ liệu câu hỏi trong DB `/practice` gắn với ID của các bản ghi `MathCategory`. Khi Milestone M1 mở rộng lên 37 phân dạng toán hoặc cập nhật category, các câu hỏi mới nạp trong Milestone M3 cần được liên kết đúng với `categoryId` hợp lệ.
- Kiểm tra trùng lặp Tier 3 sử dụng thuật toán chuẩn hóa văn bản bỏ dấu phân cách KaTeX, dấu câu và khoảng trắng; với độ dài so sánh tối thiểu 25 ký tự để tránh báo động giả trên các cụm từ mở đầu ngắn.

---

## 4. Kết Luận (Conclusion)
- Đã hoàn thành 100% nhiệm vụ thiết kế và xây dựng hạ tầng kiểm thử E2E:
  1. Tài liệu đặc tả kỹ thuật `TEST_INFRA.md` bao phủ 11 tính năng và 5 Tầng Kiểm thử.
  2. Bộ chạy kiểm thử độc lập `scripts/validate_all.js` hoạt động hoàn hảo, kiểm tra tổng cộng 3,988 lượt kiểm tra với chẩn đoán chi tiết và mã thoát nghiêm ngặt.
  3. Báo cáo `TEST_READY.md` công bố lệnh chạy và bản đồ lỗi baseline cho các agent tiếp theo.
- Hiện trạng baseline được ghi nhận: **Tier 4 (KaTeX) ĐẠT (PASS)**; **Tier 1, 2, 3, 5 CHƯA ĐẠT (FAIL)** do cơ sở dữ liệu và file tĩnh ban đầu chưa được các Milestone M1, M2, M3 nâng cấp. Mọi vi phạm đã được phân loại rõ ràng để các Milestone triển khai xử lý triệt để.

---

## 5. Phương Pháp Kiểm Chứng Độc Lập (Verification Method)
Người kiểm tra độc lập có thể chạy lại lệnh sau trong Terminal dự án:

```powershell
node scripts/validate_all.js
```

- **Điều kiện PASS của toàn dự án**:
  - Khi các Milestone M1, M2, M3 hoàn tất công việc, chạy lại lệnh trên phải in ra bảng tổng kết với 5 chữ `PASS` màu xanh, thông báo `>>> NGHIỆM THU THÀNH CÔNG: TẤT CẢ 5 TIERS ĐỀU ĐẠT CHUẨN XUẤT SẮC <<<`, và thoát với `Exit Code 0`.
- **File cần kiểm tra**:
  - `d:\TEST\MATH-STUDY\TEST_INFRA.md`
  - `d:\TEST\MATH-STUDY\TEST_READY.md`
  - `d:\TEST\MATH-STUDY\scripts\validate_all.js`
