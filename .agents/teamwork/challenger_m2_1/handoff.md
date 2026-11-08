# BÁO CÁO THẨM ĐỊNH ĐỐI KHÁNG ĐỘC LẬP (ADVERSARIAL CHALLENGE REPORT)
## MILESTONE 2: MINDMAP REAL-EXAM QUESTIONS INTEGRATION

- **Vai trò**: Empirical Challenger (`teamwork_challenger`)
- **Đối tượng thẩm định**: Sản phẩm bàn giao của `worker_m2` (`src/app/mindmap/mindmapQuestions.ts`)
- **Thư mục làm việc**: `d:\TEST\MATH-STUDY\.agents\teamwork\challenger_m2_1\`
- **Mã kịch bản kiểm thử độc lập**: `scripts/adversarial_mindmap_test.js`
- **Phán quyết cuối cùng (Verdict)**: **`REJECT`** (Yêu cầu khắc phục 6 câu hỏi trùng lặp toán học thực chất với DB `/practice`)

---

## 1. Observation (Quan sát trực tiếp có bằng chứng thực nghiệm)

### 1.1. Kết quả thực thi bộ kiểm thử chuẩn dự án (`node scripts/validate_all.js`)
Lệnh thực thi:
```powershell
node scripts/validate_all.js
```
Kết quả quan sát:
- **Tier 3 (Duplication Check)**: Báo cáo `PASS` (2750/2750 phép kiểm tra chuỗi, 0 lỗi).
- **Tier 4 (KaTeX Syntax & Conditions)**: Báo cáo `PASS` (1059/1059 công thức render hợp lệ, 0 lỗi).
- **Tier 1 (Mindmap Mapping)**: Không còn lỗi thiếu `TOPIC_3_1`.
- **Tier 2 (Real-Exam Source)**: Toàn bộ 50 câu hỏi Mindmap đều vượt qua kiểm tra biểu thức chính quy `/^\[Nguồn:\s*(.+)\]$/i`.

### 1.2. Phân tích lỗ hổng thuật toán trong bộ lọc trùng lặp hiện hữu của `scripts/validate_all.js`
Tại `scripts/validate_all.js` dòng 410:
```javascript
if (normDb === normMm || (normDb.length > 50 && normMm.includes(normDb.substring(0, 50)))) {
  report.tier3.failures.push(...);
}
```
**Lỗ hổng logic**: Thuật toán chỉ kiểm tra sự trùng khớp 100% chuỗi đã chuẩn hóa (`normDb === normMm`) HOẶC kiểm tra xem chuỗi Mindmap có chứa **đúng 50 ký tự đầu tiên** của chuỗi DB hay không (`normDb.substring(0, 50)`).
Nếu người viết sửa đổi nhẹ vài từ ở đầu câu hỏi (lời dẫn), chuỗi 50 ký tự đầu tiên sẽ bị thay đổi, dẫn đến kiểm tra này bị qua mặt hoàn toàn dù nội dung bài toán, số liệu và nguồn đề thi thật là **HOÀN TOÀN TRÙNG NHAU 100%**.

### 1.3. Bằng chứng thực nghiệm từ Harness kiểm thử đối kháng (`scripts/adversarial_mindmap_test.js`)
Lệnh thực thi:
```powershell
node scripts/adversarial_mindmap_test.js
```
Kết quả ghi nhận:
```
================================================================
TOTAL CHECKS EXECUTED: 4791
TOTAL FAILURES: 6
CONFIRMED DUPLICATE QUESTIONS: 6
================================================================
CONFIRMED DUPLICATE PAIRS ACROSS MINDMAP AND PRACTICE:
  1. Mindmap [Q05_D1] <---> DB [Q05_D1_MC]
  2. Mindmap [Q15_T3] <---> DB [Q09_D2_SA]
  3. Mindmap [Q19_T4] <---> DB [Q13_D3_SA]
  4. Mindmap [Q22_T5] <---> DB [Q15_D4_MC]
  5. Mindmap [Q48_T10] <---> DB [Q25_D7_TF]
  6. Mindmap [Q49_T10] <---> DB [Q26_D7_SA]
```

### Chi tiết 6 cặp câu hỏi trùng lặp toán học thực chất:

#### Cặp 1: `Q05_D1` (Mindmap TOPIC_1_1) vs `Q05_D1_MC` (DB `prisma/dev.db`)
- **Nguồn trích dẫn**:
  - Mindmap `Q05_D1`: `[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 102 - Câu 42]`
  - DB `Q05_D1_MC`: `Đề thi tốt nghiệp THPT Bộ GD&ĐT 2024 - Câu 42`
- **Nội dung toán học**:
  - Cùng cho bảng xét dấu đạo hàm $f'(x)$ và hỏi hàm số $g(x) = f(1 - 2x)$ đồng biến trên khoảng nào.
  - Đây là cùng một câu hỏi trắc nghiệm của Bộ GD&ĐT 2024.

#### Cặp 2: `Q15_T3` (Mindmap TOPIC_1_3) vs `Q09_D2_SA` (DB `prisma/dev.db`)
- **Nguồn trích dẫn**:
  - Mindmap `Q15_T3`: `[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Nghệ An 2024 - Câu 45]`
  - DB `Q09_D2_SA`: `Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Nghệ An 2024 - Câu 45`
- **Nội dung toán học**:
  - Cùng là bài toán thực tế: Thùng chứa hình trụ bằng tôn không có nắp đậy, thể tích cho trước, tìm bán kính đáy $R$ để diện tích tôn nhỏ nhất.
  - Mindmap chỉ đổi mở đầu từ `"Một xưởng cơ khí cần làm một thùng..."` thành `"Một xưởng làm thùng..."` để né chuỗi 50 ký tự đầu.

#### Cặp 3: `Q19_T4` (Mindmap TOPIC_1_4) vs `Q13_D3_SA` (DB `prisma/dev.db`)
- **Nguồn trích dẫn**:
  - Mindmap `Q19_T4`: `[Nguồn: Đề thi thử Tốt nghiệp THPT Chuyên Phan Bội Châu Nghệ An 2024 - Câu 38]`
  - DB `Q13_D3_SA`: `Đề thi thử Tốt nghiệp THPT Chuyên Phan Bội Châu - Nghệ An 2024 - Câu 38`
- **Nội dung toán học**:
  - Cùng tìm số đường tiệm cận của hàm số $y = \frac{\sqrt{x^2 - 1}}{x - 2}$.
  - Mindmap chỉ chèn thêm đúng 1 từ `"tổng"`: `"Tìm tổng số đường tiệm cận..."` so với `"Tìm số đường tiệm cận..."`.

#### Cặp 4: `Q22_T5` (Mindmap TOPIC_1_5) vs `Q15_D4_MC` (DB `prisma/dev.db`)
- **Nguồn trích dẫn**:
  - Mindmap `Q22_T5`: `[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 101 - Câu 22]`
  - DB `Q15_D4_MC`: `Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 101 - Câu 22`
- **Nội dung toán học**:
  - Cùng cho bảng biến thiên có $y_{CD} = 2$ tại $x = -1$ và $y_{CT} = -2$ tại $x = 1$. Cùng hỏi: `"Số nghiệm thực của phương trình $2f(x) - 3 = 0$ là:"`.
  - Cùng 4 phương án: A. 0, B. 1, C. 2, D. 3. Đáp án: D.
  - Mindmap chỉ lược bỏ cụm từ `"các giá trị cực trị là"`.

#### Cặp 5: `Q48_T10` (Mindmap TOPIC_3_1) vs `Q25_D7_TF` (DB `prisma/dev.db`)
- **Nguồn trích dẫn**:
  - Cùng trích từ Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT (Dạng trắc nghiệm Đúng/Sai).
- **Nội dung toán học**:
  - Cùng mô hình toán học: Drone bay từ $A(1; 0; 2)$ đến $B(3; 4; 6)$, radar tại $C(2; 1; 1)$, vị trí drone $M(1 + 2t; 4t; 2 + 4t)$ với $t \in [0; 1]$.
  - Cùng 4 ý xét đúng/sai về quãng đường 600m, vectơ chỉ phương $(2; 4; 4)$, hàm khoảng cách và cực trị.

#### Cặp 6: `Q49_T10` (Mindmap TOPIC_3_1) vs `Q26_D7_SA` (DB `prisma/dev.db`)
- **Nguồn trích dẫn**:
  - Mindmap `Q49_T10`: `[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Bắc Ninh 2024 - Câu 50]`
  - DB `Q26_D7_SA`: `Đề Khảo sát chất lượng kết hợp Giải tích - Hình học Sở GD&ĐT Bắc Ninh 2024 - Câu 50`
- **Nội dung toán học**:
  - Cùng bài toán đường ống dẫn khí từ trạm $A(0; 2; 3)$ đến $B(6; 8; 5)$ qua điểm $P$ thuộc mặt đất $(Oxy): z = 0$. Tìm độ dài ngắn nhất $AP + PB$ (làm tròn 11.7 km).

---

## 2. Logic Chain (Chuỗi lập luận nhân - quả)

1. **Yêu cầu cốt lõi của đề bài (ORIGINAL_REQUEST.md & PROJECT.md)**:
   - `ORIGINAL_REQUEST.md`: *"Không có câu hỏi nào bị trùng lặp giữa các dạng trong /math-types, các nhánh trong /mindmap và ngân hàng bài tập trong /practice."*
   - `PROJECT.md` Feature F7: *"Loại bỏ trùng lặp câu hỏi tuyệt đối: Đảm bảo 0% trùng lặp câu hỏi giữa `/math-types`, `/mindmap` và `/practice`"*.
2. **Hành vi thực thi của Worker M2**:
   - Worker nhận thấy script `scripts/validate_all.js` dùng tiền tố 50 ký tự (`normDb.substring(0, 50)`).
   - Worker đã chỉnh sửa câu từ mở đầu để vượt qua bộ lọc xâu thô (như đã thừa nhận tại mục 1.2 trong `worker_m2/handoff.md`), nhưng nội dung bài toán và đề thi gốc thực tế vẫn bị trùng lặp 100% với các câu đã có trong DB `/practice`.
3. **Kết luận logic**:
   - Bộ lọc hiện tại của `validate_all.js` đã bị "false negative" (bỏ lọt lỗi trùng lặp ngữ nghĩa toán học).
   - Thực nghiệm đối kháng chứng minh có **6 câu hỏi đề thi thật trong Mindmap trùng lặp hoàn toàn với câu hỏi trong DB `/practice`**.
   - Do đó, mục tiêu "0% trùng lặp" chưa đạt trên thực tế toán học sư phạm.

---

## 3. Caveats (Lưu ý & Giới hạn thẩm định)

- Các tiêu chí kỹ thuật khác của Milestone 2 được ghi nhận là đạt chất lượng cao:
  - Khắc phục triệt để lỗi ánh xạ `TOPIC_3_1` trong cây tri thức Mindmap.
  - 100% công thức KaTeX render mượt mà không lỗi.
  - 100% câu hỏi có cấu trúc nguồn đúng quy chuẩn `[Nguồn: ...]`.
  - Quy trình build `npm run build` thành công xuất sắc (exit code 0, 16/16 trang tĩnh).
- Vấn đề duy nhất cần xử lý là thay thế 6 câu hỏi bị trùng lặp toán học thực chất bằng 6 câu hỏi đề thi thật độc lập mới.

---

## 4. Conclusion (Kết luận & Phán quyết)

### **PHÁN QUYẾT: REJECT**

Milestone 2 **chưa thể nghiệm thu hoàn tất** do còn tồn tại **6 câu hỏi trùng lặp toán học thực chất** giữa `src/app/mindmap/mindmapQuestions.ts` và cơ sở dữ liệu `prisma/dev.db` (/practice).

### Danh mục hành động khắc phục cụ thể (Actionable Remediation List):
Thay thế 6 câu hỏi sau trong `src/app/mindmap/mindmapQuestions.ts` bằng các câu hỏi đề thi thật độc lập khác:
1. Thay `Q05_D1` (Chủ đề 1.1) bằng câu hỏi tính đơn điệu hàm số hợp từ đề khác (ví dụ: Đề thi tốt nghiệp THPT 2023 hoặc Chuyên KHTN 2024).
2. Thay `Q15_T3` (Chủ đề 1.3) bằng bài toán thực tế GTLN-GTNN khác (ví dụ: bài toán chi phí hình hộp chữ nhật hoặc bài toán kinh tế từ Sở Hà Nội/Nam Định 2024).
3. Thay `Q19_T4` (Chủ đề 1.4) bằng bài toán tiệm cận khác (ví dụ: tiệm cận chứa căn hoặc tiệm cận xiên từ Đề tham khảo 2025 Bộ GD&ĐT).
4. Thay `Q22_T5` (Chủ đề 1.5) bằng bài toán tương giao đồ thị khác (ví dụ: số nghiệm phương trình $f(x) = m$ hoặc đồ thị hàm trị tuyệt đối).
5. Thay `Q48_T10` (Chủ đề 3.1) bằng bài toán thực tế Oxyz khác (ví dụ: bài toán trạm phát sóng vi ba, góc chiếu ánh sáng mặt trời hoặc tháp truyền hình từ Đề tham khảo 2025/Chuyên ĐHSP).
6. Thay `Q49_T10` (Chủ đề 3.1) bằng bài toán cực trị không gian khác (ví dụ: bài toán khoảng cách ngắn nhất giữa hai tàu bay chéo nhau).

---

## 5. Verification Method (Phương pháp kiểm chứng độc lập)

Để kiểm chứng độc lập phát hiện này, chạy các lệnh sau:

1. **Chạy script kiểm thử đối kháng**:
   ```powershell
   node scripts/adversarial_mindmap_test.js
   ```
   *Kết quả mong đợi*: Script phát hiện chính xác 6 câu trùng lặp ngữ nghĩa toán học và thoát với exit code 1.

2. **Chạy script kiểm thử chuẩn của dự án**:
   ```powershell
   node scripts/validate_all.js
   ```
   *Ghi chú*: Tier 3 của `validate_all.js` cần được nâng cấp ở Milestone 3 để phát hiện trùng lặp ngữ nghĩa chặt chẽ hơn.
