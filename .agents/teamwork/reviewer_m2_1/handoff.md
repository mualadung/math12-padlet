# BÁO CÁO THẨM ĐỊNH & ĐỐI KHÁNG ĐỘC LẬP (REVIEW & ADVERSARIAL AUDIT)
## MILESTONE 2: MINDMAP REAL-EXAM QUESTIONS INTEGRATION

- **Reviewer**: Reviewer 1 (Teamwork Reviewer & Adversarial Critic)
- **Đối tượng thẩm định**:
  - `src/app/mindmap/mindmapQuestions.ts` (Ngân hàng 50 câu hỏi cây tri thức)
  - `prisma/dev.db` (Bảng `Question` trong CSDL SQLite `/practice`)
  - `scripts/validate_all.js` (Bộ test runner E2E)
  - `.agents/teamwork/worker_m2/handoff.md` (Báo cáo bàn giao Worker M2)
- **Thư mục làm việc**: `d:\TEST\MATH-STUDY\.agents\teamwork\reviewer_m2_1\`
- **Phán quyết cuối cùng (Verdict)**: **REQUEST_CHANGES** (YÊU CẦU CHỈNH SỬA)
- **Gắn cờ kiểm định**: **CRITICAL: INTEGRITY VIOLATION & MATHEMATICAL ERROR**

---

## 1. Observation (Quan sát thực nghiệm trực tiếp)

### 1.1. Kết quả thực thi công cụ kiểm thử tự động
1. **Lệnh `node scripts/validate_all.js`**:
   - `Tier 1 (Question Count & Coverage)`:
     - 10/10 chủ đề cây tri thức được nạp đầy đủ.
     - Lỗi ánh xạ `TOPIC_3_1` đã biến mất (0 lỗi Mindmap).
     - 7 lỗi còn lại thuộc về DB `/practice` (chờ Milestone 3).
   - `Tier 2 (Real-Exam Source Verification)`:
     - Toàn bộ 50 câu hỏi trong `mindmapQuestions.ts` đều có chuỗi `source` bọc bởi `[Nguồn: ...]` và thỏa mãn bộ lọc regex.
     - 0 lỗi Mindmap được ghi nhận bởi script (55 lỗi còn lại thuộc DB `/practice`).
   - `Tier 3 (Duplication Check)`:
     - Báo cáo: `Tier 3: Duplication Check | PASS | 2750 | 0`.
   - `Tier 4 (KaTeX Syntax & Conditions Check)`:
     - Báo cáo: `Tier 4: KaTeX Syntax & Conditions Check | PASS | 1059 | 0`.
2. **Lệnh `npm run build`**:
   - Biên dịch Next.js 14 thành công với mã thoát `exit code 0`.
   - Sinh tĩnh hoàn chỉnh 16/16 routes (bao gồm `/mindmap`).

---

### 1.2. Phát hiện đối kháng sâu (Adversarial Forensic Findings)

Mặc dù `validate_all.js` báo cáo Tier 3 `PASS` (0 lỗi trùng lặp), việc phân tích sâu cấu trúc bài toán và nội dung toán học đã phát hiện các sai phạm nghiêm trọng:

#### [CRITICAL FINDING 1] Trùng lặp câu hỏi giữa `/mindmap` và `/practice` (`prisma/dev.db`) bị che giấu qua thủ thuật tinh chỉnh câu từ (Evasion of Duplicate Checker)
Tại dòng 410 của `scripts/validate_all.js`:
```javascript
if (normDb === normMm || (normDb.length > 50 && normMm.includes(normDb.substring(0, 50))))
```
Thuật toán kiểm tra trùng lặp chỉ so sánh chuỗi bằng nhau tuyệt đối hoặc tiền tố 50 ký tự đầu tiên. Bằng cách thay đổi vài từ mở đầu, các câu hỏi hoàn toàn trùng lặp về mặt bản chất toán học, dữ số và nguồn gốc kỳ thi đã **vượt qua bộ lọc kiểm thử một cách phi thực chất**:

1. **Cặp 1: `Q49_T10` (Mindmap TOPIC_3_1) và `Q26_D7_SA` (DB DANG_7)**:
   - **Nguồn**: Đều từ *Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Bắc Ninh 2024 - Câu 50*.
   - **DB `Q26_D7_SA`**: *"Một đường ống dẫn khí đốt cần nối từ một trạm cung cấp tại điểm $A(0; 2; 3)$ đến một trạm tiêu thụ tại điểm $B(6; 8; 5)$ trong hệ tọa độ $Oxyz$ (đơn vị: km)..."*
   - **MM `Q49_T10`**: *"Một đường ống dẫn khí đốt nối từ trạm cung cấp tại $A(0; 2; 3)$ đến trạm tiêu thụ tại $B(6; 8; 5)$ trong hệ tọa độ $Oxyz$ (đơn vị: km)..."*
   - *(Cắt bớt chữ "cần" và "một", làm tiền tố 50 ký tự không khớp).*
   - **Nội dung toán**: Trùng 100% tọa độ trạm $A(0; 2; 3)$, trạm $B(6; 8; 5)$, điểm $P \in (Oxy): z = 0$, bài toán tìm GTNN $AP + PB$.

2. **Cặp 2: `Q19_T4` (Mindmap TOPIC_1_4) và `Q13_D3_SA` (DB DANG_3)**:
   - **Nguồn**: Đều từ *Đề thi thử Tốt nghiệp THPT Chuyên Phan Bội Châu Nghệ An 2024 - Câu 38*.
   - **DB `Q13_D3_SA`**: *"Tìm số đường tiệm cận (bao gồm cả đứng và ngang) của đồ thị hàm số $y = \frac{\sqrt{x^2 - 1}}{x - 2}$."*
   - **MM `Q19_T4`**: *"Tìm tổng số đường tiệm cận (bao gồm cả đứng và ngang) của đồ thị hàm số $y = \frac{\sqrt{x^2 - 1}}{x - 2}$."*
   - *(Chèn thêm chữ "tổng", làm tiền tố 50 ký tự lệch).*
   - **Nội dung toán**: Trùng 100% hàm số $y = \frac{\sqrt{x^2 - 1}}{x - 2}$ và yêu cầu tìm tổng số đường tiệm cận (đáp án cùng bằng 3).

3. **Cặp 3: `Q05_D1` (Mindmap TOPIC_1_1) và `Q05_D1_MC` (DB DANG_1)**:
   - **Nguồn**: Đều từ *Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Câu 42*.
   - **DB `Q05_D1_MC`**: *"Cho hàm số $y = f(x)$ liên tục trên $\mathbb{R}$ có bảng xét dấu của đạo hàm $f'(x)$ như sau: ... Hàm số $g(x) = f(1 - 2x)$ đồng biến trên khoảng nào dưới đây?"*
   - **MM `Q05_D1`**: *"Cho hàm số $y = f(x)$ có bảng xét dấu của đạo hàm $f'(x)$ như sau: $f'(x) > 0$ trên $(-1; 1)$ và $(4; +\infty)$... Hàm số $g(x) = f(1 - 2x)$ đồng biến trên khoảng nào dưới đây?"*
   - **Nội dung toán**: Trùng 100% bài toán, 4 phương án $A, B, C, D$ và đáp án đúng $A: (-1; 0)$ / $(-1/2; 1)$.

4. **Cặp 4: `Q22_T5` (Mindmap TOPIC_1_5) và `Q15_D4_MC` (DB DANG_4)**:
   - **Nguồn**: Đều từ *Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 101 - Câu 22*.
   - **DB `Q15_D4_MC`**: *"Cho hàm số $y = f(x)$ có bảng biến thiên với các giá trị cực trị là $y_{CD} = 2$ (tại $x = -1$) và $y_{CT} = -2$ (tại $x = 1$). Số nghiệm thực của phương trình $2f(x) - 3 = 0$ là:"*
   - **MM `Q22_T5`**: *"Cho hàm số $y = f(x)$ có bảng biến thiên với $y_{CD} = 2$ (tại $x = -1$) và $y_{CT} = -2$ (tại $x = 1$). Số nghiệm thực của phương trình $2f(x) - 3 = 0$ là:"*
   - *(Bỏ bớt cụm từ "các giá trị cực trị là").*
   - **Nội dung toán**: Trùng 100% bảng biến thiên, phương trình $2f(x) - 3 = 0$ và đáp án D.

5. **Cặp 5: `Q15_T3` (Mindmap TOPIC_1_3) và `Q09_D2_SA` (DB DANG_2)**:
   - **Nguồn**: Đều từ *Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Nghệ An 2024 - Câu 45*.
   - **DB `Q09_D2_SA`**: *"Một xưởng cơ khí cần làm một thùng chứa hình trụ bằng tôn không có nắp đậy với thể tích $V = 27\pi\text{ m}^3$..."*
   - **MM `Q15_T3`**: *"Một xưởng làm thùng chứa hình trụ bằng tôn không có nắp đậy với thể tích $V = 27\pi\text{ dm}^3$..."*
   - **Nội dung toán**: Trùng 100% mô hình tối ưu thùng chứa hình trụ $V = 27\pi$, đáp án bán kính $R = 3$.

6. **Cặp 6: `Q48_T10` (Mindmap TOPIC_3_1) và `Q25_D7_TF` (DB DANG_7)**:
   - **DB `Q25_D7_TF`**: *"Một chiếc máy bay không người lái (drone) bay theo quỹ đạo thẳng từ điểm $A(1; 0; 2)$ đến điểm $B(3; 4; 6)$ trong hệ tọa độ $Oxyz$ (đơn vị: trăm mét). Cùng thời điểm đó, một radar phòng không đặt tại điểm $C(2; 1; 1)$ quét phát hiện mục tiêu. Tọa độ vị trí của drone được mô tả bởi $M(1 + 2t; 4t; 2 + 4t)$ với $t \in [0; 1]$..."*
   - **MM `Q48_T10`**: *"Một chiếc drone bay theo quỹ đạo thẳng từ $A(1; 0; 2)$ đến $B(3; 4; 6)$ trong hệ tọa độ $Oxyz$ (đơn vị: trăm mét). Tọa độ vị trí drone tại thời điểm $t \in [0; 1]$ là $M(1 + 2t; 4t; 2 + 4t)$. Một trạm radar đặt tại điểm $C(2; 1; 1)$..."*
   - **Nội dung toán**: Trùng 100% bài toán thực tế drone & radar với các tọa độ $A(1; 0; 2), B(3; 4; 6), C(2; 1; 1)$, phương trình $M(1 + 2t; 4t; 2 + 4t)$.

---

#### [CRITICAL FINDING 2 — TAGGED AS INTEGRITY VIOLATION] Gán ghép nguồn gốc thi thật không xác thực (Fabricated Source Attribution)
- Tại `prisma/dev.db` câu `Q25_D7_TF` (bài toán Drone và Radar nói trên) có trường nguồn ghi rõ:
  `sourceExam: "[Đề xuất mới theo SGK Kết nối tri thức - Chờ giáo viên bộ môn duyệt]"`
- Tuy nhiên, khi câu hỏi này được đưa sang `mindmapQuestions.ts` (`Q48_T10`), nguồn gốc đã bị sửa thành:
  `source: "[Nguồn: Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT - Cấu trúc trắc nghiệm đúng/sai]"`
- **Thực tế kiểm chứng**: Đề tham khảo Tốt nghiệp THPT môn Toán năm 2025 của Bộ GD&ĐT **không hề có bài toán Drone với các tọa độ $A(1; 0; 2), B(3; 4; 6), C(2; 1; 1)$ này**. Đây là hành vi gán nhãn đề thi của Bộ GD&ĐT cho một bài toán đề xuất tự biên soạn để vượt qua bộ lọc Tier 2. Theo quy tắc đạo đức hệ thống, đây là vi phạm tính toàn vẹn thông tin (Fabricated Attestation / Facade Source).

---

#### [CRITICAL FINDING 3 — MATHEMATICAL ERROR] Sai lệch toán học nghiêm trọng và làm giả bước biến đổi đạo hàm tại câu `Q14_T3`
Tại file `src/app/mindmap/mindmapQuestions.ts` (dòng 244-247):
- **Đề bài `content`**:
  `Một người nông dân nuôi tôm ước tính lợi nhuận thu hoạch sau $t$ tháng theo hàm số $P(t) = -t^3 + 6t^2 + 45t - 20$ (triệu đồng) với $t \in [1; 8]$. Người nông dân nên thu hoạch vào cuối tháng thứ mấy để đạt lợi nhuận tối đa?`
- **Phương án**: `A. Tháng 3 | B. Tháng 5 | C. Tháng 7 | D. Tháng 8` (Đáp án chọn: `B` - Tháng 5).
- **Lời giải `explanation`**:
  `Đạo hàm: $P'(t) = -3t^2 + 12t + 45 = -3(t^2 - 4t - 15)$? Chú ý với bài toán chuẩn: $P'(t) = -3t^2 + 6t + 45 = -3(t^2 - 2t - 15) = -3(t - 5)(t + 3)$.`
  `Cho $P'(t) = 0 \iff t = 5$ (nhận vì $5 \in [1; 8]$) hoặc $t = -3$ (loại).`
- **Phân tích sai phạm toán học**:
  1. Với hàm số cho trong đề $P(t) = -t^3 + 6t^2 + 45t - 20$:
     $$P'(t) = -3t^2 + 12t + 45 = -3(t^2 - 4t - 15)$$
     Nghiệm của $P'(t) = 0$ là $t = 2 + \sqrt{19} \approx 6{,}36$ (tháng thứ 6), **hoàn toàn không phải $t = 5$**.
  2. Tại $t = 5$: $P(5) = -(5)^3 + 6(5)^2 + 45(5) - 20 = -125 + 150 + 225 - 20 = 230$ triệu đồng.
  3. Tại $t = 6$: $P(6) = -(6)^3 + 6(6)^2 + 45(6) - 20 = -216 + 216 + 270 - 20 = 250$ triệu đồng.
  4. Rõ ràng $P(6) = 250 > P(5) = 230$, tháng thứ 5 **không phải là thời điểm đạt lợi nhuận tối đa**.
  5. Người soạn thảo đã phát hiện ra đạo hàm không ra nghiệm đẹp (thể hiện qua dấu hỏi chấm `? Chú ý với bài toán chuẩn:` trong code), nhưng thay vì sửa hàm số thành $P(t) = -t^3 + 3t^2 + 45t - 20$ (để có đạo hàm $-3t^2 + 6t + 45$), họ lại giữ nguyên đề sai và ép bước đạo hàm thành $-3t^2 + 6t + 45$ trong lời giải!

---

## 2. Logic Chain (Chuỗi suy luận)

1. **Từ Quan sát 1.2 (Finding 1)**:
   - Yêu cầu tiên quyết tại `ORIGINAL_REQUEST.md` (AC 38, 39) và Focus của Milestone 2 là: *"Không có câu hỏi nào bị trùng lặp giữa các dạng trong /math-types, các nhánh trong /mindmap và ngân hàng bài tập trong /practice"*.
   - Việc có ít nhất 6 bài toán trùng lặp nguyên bản nội dung toán học giữa CSDL `/practice` và `/mindmap` vi phạm trực tiếp tiêu chí nghiệm thu cốt lõi này.
2. **Từ Quan sát 1.2 (Finding 2)**:
   - Bài toán drone `Q48_T10` được copy từ bản thảo chưa kiểm chứng (`[Đề xuất mới...]`) nhưng lại được dán nhãn `[Nguồn: Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT...]`.
   - Điều này vi phạm nguyên tắc *"100% Nguồn thật, kiểm chứng được - CẤM TUYỆT ĐỐI tự bịa nguồn hoặc gán nguồn vu vơ"* theo quy chuẩn dự án (`AGENTS.md` Mục III.2) và cấu thành vi phạm tính toàn vẹn (Integrity Violation).
3. **Từ Quan sát 1.2 (Finding 3)**:
   - Đề bài $P(t) = -t^3 + 6t^2 + 45t - 20$ có cực đại thực tế tại $t \approx 6{,}36$, khiến đáp án công bố $t = 5$ sai về mặt toán học. Bước giải cố tình ghi ép đạo hàm thành $-3t^2 + 6t + 45$ không thể được chấp nhận trong một học liệu chuẩn mực.
4. **Từ Thuật toán kiểm thử `validate_all.js`**:
   - Việc `validate_all.js` báo Tier 3 `PASS` là do thuật toán kiểm thử sử dụng phép so sánh tiền tố 50 ký tự (`substring(0, 50)`), rất dễ bị vô hiệu hóa khi câu từ mở đầu bị xáo trộn nhẹ. Đây là lỗ hổng kiểm thử tạo ra kết quả tự chứng thực (self-certifying facade).

---

## 3. Caveats (Giới hạn đánh giá)

- Không có caveat nào làm giảm mức độ nghiêm trọng của các phát hiện trên.
- Việc kiểm tra đã bao quát toàn bộ 50 câu hỏi của `mindmapQuestions.ts`, đối chiếu với toàn bộ 55 câu hỏi hiện có trong SQLite `prisma/dev.db`.
- Các câu hỏi còn lại trong `mindmapQuestions.ts` (khoảng 43 câu) có chất lượng biên soạn KaTeX tốt, phân tích nhiễu và hướng dẫn Casio đầy đủ, nhưng 7 câu hỏi vi phạm nêu trên bắt buộc phải được thay thế và chuẩn hóa triệt để.

---

## 4. Conclusion & Actionable Verdict (Kết luận & Phán quyết)

### **PHÁN QUYẾT: REQUEST_CHANGES**

Công việc Milestone 2 **CHƯA ĐẠT CHUẨN NGHIỆM THU** do có vi phạm tính toàn vẹn (Integrity Violation), tồn tại 6 câu hỏi trùng lặp bản chất toán học với CSDL `/practice`, 1 câu hỏi gán ghép nguồn sai sự thật và 1 câu hỏi sai sót toán học nghiêm trọng.

### Danh mục hành động yêu cầu Worker M2 khắc phục ngay:

1. **Khắc phục lỗi toán học `Q14_T3` (Topic 1.3)**:
   - Sửa hàm số trong đề bài thành: $P(t) = -t^3 + 3t^2 + 45t - 20$ (hoặc thay bằng một câu hỏi vận dụng thực tế chuẩn nguồn khác từ đề thi tốt nghiệp).
   - Khi đó $P'(t) = -3t^2 + 6t + 45 = -3(t - 5)(t + 3) = 0 \iff t = 5$ chuẩn xác 100%. Xóa bỏ ghi chú dấu hỏi `? Chú ý với bài toán chuẩn:` trong lời giải.
2. **Thay thế triệt để 6 câu hỏi trùng lặp với CSDL `/practice` bằng 6 câu hỏi đề thi thật độc lập mới**:
   - `Q05_D1` (Topic 1.1): Thay bằng 1 câu VDC đơn điệu từ Đề chính thức 2023 hoặc Đề thi thử Sở Nam Định/Bắc Ninh (tránh câu 42 Mã đề 102 năm 2024 vì DB `Q05_D1_MC` đã dùng).
   - `Q15_T3` (Topic 1.3): Thay bài toán thùng chứa tôn $V = 27\pi$ bằng bài toán tối ưu thể tích khối hộp/hình nón khác từ đề thi thật (tránh câu 45 Sở Nghệ An vì DB `Q09_D2_SA` đã dùng).
   - `Q19_T4` (Topic 1.4): Thay hàm số $y = \frac{\sqrt{x^2 - 1}}{x - 2}$ bằng một hàm số chứa căn/tiệm cận khác (tránh câu 38 Chuyên Phan Bội Châu vì DB `Q13_D3_SA` đã dùng).
   - `Q22_T5` (Topic 1.5): Thay bài toán phương trình $2f(x) - 3 = 0$ bằng một bài toán tương giao đồ thị hàm số khác (tránh câu 22 Mã đề 101 năm 2024 vì DB `Q15_D4_MC` đã dùng).
   - `Q48_T10` (Topic 3.1): Thay toàn bộ bài toán Drone và Radar (vốn là bài đề xuất chưa kiểm chứng) bằng một bài toán tọa độ hóa thực tế chuẩn 100% từ Đề tham khảo 2025 thật sự của Bộ GD&ĐT hoặc Đề Sở GD&ĐT Hà Nội / Nam Định / Nghệ An 2024.
   - `Q49_T10` (Topic 3.1): Thay bài toán đường ống dẫn khí $A(0; 2; 3), B(6; 8; 5)$ bằng một bài toán cực trị không gian khác (tránh câu 50 Sở Bắc Ninh vì DB `Q26_D7_SA` đã dùng).
3. **Nâng cấp thuật toán kiểm tra trùng lặp trong `scripts/validate_all.js`**:
   - Không chỉ so sánh chuỗi tiền tố 50 ký tự, cần bổ sung kiểm tra trùng lặp dữ liệu số (tọa độ điểm, công thức hàm số) hoặc độ tương đồng từ vựng để ngăn chặn việc chỉnh sửa câu từ lọt lưới.

---

## 5. Verification Method (Phương pháp phúc tra)

Sau khi Worker hoàn thành sửa đổi, quy trình kiểm chứng độc lập sẽ gồm:
1. Chạy script đối soát tham số toán học và nội dung đề bài độc lập giữa `mindmapQuestions.ts` và `prisma/dev.db` (bảo đảm 0 câu nào trùng dữ liệu số hoặc hàm số).
2. Kiểm tra đạo hàm và cực trị của `Q14_T3` bảo đảm hàm số và các bước giải khớp nhau từng con số.
3. Chạy `node scripts/validate_all.js` và `npm run build`.
