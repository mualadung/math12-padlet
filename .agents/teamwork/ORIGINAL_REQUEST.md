# Original User Request

## Approved Task Prompt — 2026-11-08T05:04:59Z

Nâng cấp, chuẩn hóa và hoàn thiện các học liệu số Ôn tập Toán 12 (Chương I: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số và Chương II: Vectơ và hệ trục tọa độ trong không gian) trên ứng dụng web Math Study Padlet: chuẩn hóa mở rộng toàn bộ các phân dạng nhỏ theo từng bài học (Bài 1 đến Bài 8) với ký hiệu KaTeX chuẩn mực, tích hợp câu hỏi đề thi thật có trích dẫn nguồn và lời giải chi tiết vào Sơ đồ tri thức (/mindmap), bổ sung tối thiểu 10 bài tập đề thi thật kèm lời giải và hướng dẫn bấm máy tính Casio fx-580VN X & fx-880BTG cho mỗi dạng trong Phòng luyện tập (/practice), và hoàn thiện tối đa các tính năng của website.

Working directory: d:\TEST\MATH-STUDY
Integrity mode: development

## Requirements

### R1. Chuẩn hóa và mở rộng các dạng toán (/math-types)
Mở rộng chi tiết toàn bộ các phân dạng nhỏ theo từng bài học (Bài 1 đến Bài 8) của Chương I và Chương II SGK Toán 12 (bộ Kết nối tri thức với cuộc sống). Mỗi dạng toán phải có đầy đủ dấu hiệu nhận diện, kiến thức nền tảng, phương pháp giải từng bước và phân tích cạm bẫy/phương án nhiễu thường gặp. Mọi biểu thức, biến số, hàm số, phương trình, hệ trục và vectơ đều phải tuân thủ chuẩn KaTeX nghiêm ngặt với đầy đủ điều kiện áp dụng (tập xác định $D$, điều kiện liên tục/khả vi, mẫu thức khác 0, biểu thức trong căn không âm, vectơ khác vectơ-không $\vec{a} \ne \vec{0}$, điều kiện cùng phương/vuông góc).

### R2. Tích hợp câu hỏi đề thi thật vào Sơ đồ tri thức (/mindmap)
Cập nhật cây tri thức với các câu hỏi bài tập được trích dẫn 100% từ đề thi thật (Bộ GD&ĐT, các Sở GD&ĐT, các trường THPT Chuyên uy tín) với trường thông tin nguồn gốc `[Nguồn: Tên Kỳ thi/Sở GD&ĐT/Trường Chuyên - Năm thi - Mã câu/Mã đề]`. Mỗi câu hỏi phải có lời giải chi tiết mẫu mực và bảo đảm không bị trùng lặp câu hỏi giữa các nhánh hoặc giữa các dạng toán khác.

### R3. Bổ sung ngân hàng bài tập và hướng dẫn Casio cho Phòng luyện tập (/practice)
Bổ sung đầy đủ ít nhất 10 bài tập cho mỗi dạng toán, 100% trích dẫn từ đề thi thật có ghi rõ nguồn và lời giải chi tiết. Mỗi dạng bài phải có phần hướng dẫn thao tác chi tiết từng nút bấm trên cả 2 dòng máy tính Casio fx-580VN X và Casio fx-880BTG (các chế độ TABLE, VECTOR, EQUATION/SOLVE, tính đạo hàm tại điểm).

### R4. Hoàn thiện tối đa các tính năng trên website
Hoàn thiện giao diện và tính năng tương tác của ứng dụng web Next.js 14, bảo đảm các trang (/math-types, /mindmap, /practice và các tính năng phụ trợ) hoạt động đồng bộ, điều hướng liền mạch, hỗ trợ tốt trên desktop và thiết bị di động, không phát sinh lỗi runtime hoặc lỗi build.

## Verification Resources
Sử dụng nguồn đề thi thật công khai (Đề thi tốt nghiệp THPT, đề tham khảo của Bộ GD&ĐT, đề thi thử của các Sở GD&ĐT Hà Nội, Hải Phòng, Bắc Ninh, Nghệ An, Nam Định... và các trường THPT Chuyên KHTN, Chuyên Sư Phạm, Chuyên Lam Sơn...).

## Acceptance Criteria

### Tính chính xác toán học & Định dạng KaTeX
- [ ] 100% công thức, ký hiệu toán học hiển thị chuẩn KaTeX, không có mã lỗi hoặc hiển thị thô.
- [ ] Mọi công thức và định lý nêu rõ điều kiện áp dụng (tập xác định $D$, mẫu khác 0, căn thức không âm, vectơ khác $\vec{0}$, tích vô hướng bằng 0).

### Phạm vi dạng toán & Cấu trúc bài học
- [ ] Danh mục dạng toán tại /math-types bao phủ đầy đủ các phân dạng của toàn bộ Bài 1 đến Bài 8 (Chương I và Chương II).
- [ ] Mỗi dạng toán có đủ: dấu hiệu nhận diện, phương pháp giải, ví dụ và phân tích lỗi sai/phương án nhiễu.

### Ngân hàng câu hỏi đề thi thật & Chống trùng lặp
- [ ] 100% câu hỏi trong /mindmap và /practice có trường `[Nguồn: ...]` trích từ đề thi thật có thể kiểm chứng.
- [ ] Không có câu hỏi nào bị trùng lặp giữa các dạng trong /math-types, các nhánh trong /mindmap và ngân hàng bài tập trong /practice.
- [ ] Mỗi dạng toán trong /practice có tối thiểu 10 câu hỏi bài tập kèm lời giải chi tiết.

### Hướng dẫn Casio fx-580VN X & fx-880BTG
- [ ] Mỗi dạng toán trong /practice đều có hướng dẫn bấm máy tính chi tiết cho cả hai dòng máy Casio fx-580VN X và fx-880BTG.

### Kiểm thử kỹ thuật & Build
- [ ] Lệnh `npm run build` thực thi thành công không phát sinh lỗi biên dịch, TypeScript hoặc ESLint.
- [ ] Script kiểm tra dữ liệu xác nhận mỗi dạng toán đều đạt tối thiểu 10 câu hỏi trích từ đề thi thật và định dạng KaTeX hợp lệ.
