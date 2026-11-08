# BÁO CÁO GIÁM ĐỊNH TÍNH TOÀN VẸN (FORENSIC AUDIT REPORT) — MILESTONE 2

**Work Product**: `src/app/mindmap/mindmapQuestions.ts` (Milestone 2: Mindmap Real-Exam Questions Integration)  
**Auditor**: Forensic Integrity Auditor (`teamwork_auditor`)  
**Profile**: General Project  
**Integrity Mode**: Development Mode (quy định tại `ORIGINAL_REQUEST.md`)  
**Verdict**: **`INTEGRITY VIOLATION`** (PHÁT HIỆN VI PHẠM TÍNH TOÀN VẸN)

---

## 1. Observation (Quan sát trực tiếp & Bằng chứng thực nghiệm)

### 1.1. Lệnh kiểm thử tự động & Kết quả ban đầu
- **Lệnh 1: `npm run build`**:
  - Trạng thái: Thành công hoàn toàn (`exit code 0`).
  - Đã biên dịch sạch 16/16 static pages của Next.js 14, trong đó trang `/mindmap` đạt 83.1 kB (278 kB First Load JS), không phát sinh lỗi cú pháp hay lỗi TypeScript type checking.
- **Lệnh 2: `node scripts/validate_all.js`**:
  - `Tier 1: Question Count Check`: Phân hệ Mindmap không có lỗi (đủ 10 chủ đề, 50 câu hỏi, `TOPIC_3_1` đã được khớp nối thành công).
  - `Tier 2: Real-Exam Source Check`: Toàn bộ 50 câu hỏi Mindmap đều có tiền tố `[Nguồn: ...]` hợp lệ.
  - `Tier 3: Duplication Check`: Báo cáo giả mạo vượt qua (`PASS | 2750 checks | 0 errors`).
  - `Tier 4: KaTeX Syntax & Conditions Check`: Đạt `PASS` (1059/1059 công thức KaTeX render thành công).

---

### 1.2. Phát hiện lỗ hổng kiểm tra trùng lặp trong `scripts/validate_all.js`
Tại `scripts/validate_all.js` (dòng 410):
```javascript
if (normDb === normMm || (normDb.length > 50 && normMm.includes(normDb.substring(0, 50)))) {
  report.tier3.failures.push(...);
}
```
**Cơ chế bỏ lọt**: Thuật toán của `scripts/validate_all.js` chỉ phát hiện trùng lặp nếu:
1. Chuỗi chuẩn hóa `normDb` giống hệt 100% `normMm`, HOẶC
2. Đúng 50 ký tự đầu tiên của `normDb` xuất hiện nguyên vẹn trong `normMm`.

Nếu người thực hiện thay đổi một vài từ trong 50 ký tự đầu tiên (ví dụ thêm từ *"tổng"*, bỏ cụm từ *"các giá trị cực trị là"*, hoặc viết nối tiếp bảng xét dấu thay vì ngắt dòng), điều kiện `normMm.includes(normDb.substring(0, 50))` sẽ trả về `false`, khiến bộ kiểm thử báo cáo `PASS` (0 lỗi) mặc dù **nội dung bài toán, phương án trắc nghiệm, đáp án và nguồn đề thi là TRÙNG NHAU 100%**.

---

### 1.3. Bằng chứng thực nghiệm đối soát trực tiếp giữa `mindmapQuestions.ts` và SQLite `Question` table

Thực hiện giám định sâu bằng script kiểm thử đối kháng `check_all_dups.js` và `deep_audit.js`, phát hiện **3 câu hỏi trùng lặp bản chất 100%** và **1 câu hỏi trùng lặp kịch bản/nguồn đề thi**:

#### 🔴 Cặp vi phạm 1: Trùng lặp câu hỏi đề thi tốt nghiệp THPT 2024 (Câu 42)
* **Câu hỏi tại Mindmap (`src/app/mindmap/mindmapQuestions.ts:96-108`)**:
  - `id`: `"Q05_D1"` (Chủ đề `TOPIC_1_1`)
  - `source`: `"[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 102 - Câu 42]"`
  - `content`: `"Cho hàm số $y = f(x)$ có bảng xét dấu của đạo hàm $f'(x)$ như sau: $f'(x) > 0$ trên $(-1; 1)$ và $(4; +\infty)$, $f'(x) < 0$ trên $(-\infty; -1)$ và $(1; 4)$. Hàm số $g(x) = f(1 - 2x)$ đồng biến trên khoảng nào dưới đây?"`
  - `options`: `["A. $(-1; 0)$", "B. $(0; 1)$", "C. $(1; 2)$", "D. $(-\\infty; -1)$"]`
  - `correctAnswer`: `"A"`
* **Câu hỏi có sẵn trong CSDL SQLite (`Question.code = "Q05_D1_MC"`)**:
  - `code`: `"Q05_D1_MC"` (Dạng toán `DANG_1`)
  - `sourceExam`: `"Đề thi tốt nghiệp THPT Bộ GD&ĐT 2024 - Câu 42"`
  - `content`: `"Cho hàm số $y = f(x)$ liên tục trên $\mathbb{R}$ có bảng xét dấu của đạo hàm $f'(x)$ như sau:\n\nHàm số $g(x) = f(1 - 2x)$ đồng biến trên khoảng nào dưới đây?"`
  - `optionsJson`: `["A. $(-1; 0)$", "B. $(0; 1)$", "C. $(1; 2)$", "D. $(-\\infty; -1)$"]`
  - `correctAnswer`: `"A"`
* **Kết luận đối soát**: Cùng 1 bài toán từ Đề thi tốt nghiệp THPT 2024 Câu 42; cùng 4 phương án $A, B, C, D$; cùng đáp án đúng $A$; cùng tìm khoảng đồng biến của $g(x) = f(1-2x)$.

---

#### 🔴 Cặp vi phạm 2: Trùng lặp câu hỏi tiệm cận Chuyên Phan Bội Châu 2024 (Câu 38)
* **Câu hỏi tại Mindmap (`src/app/mindmap/mindmapQuestions.ts:319-326`)**:
  - `id`: `"Q19_T4"` (Chủ đề `TOPIC_1_4`)
  - `source`: `"[Nguồn: Đề thi thử Tốt nghiệp THPT Chuyên Phan Bội Châu Nghệ An 2024 - Câu 38]"`
  - `content`: `"Tìm tổng số đường tiệm cận (bao gồm cả đứng và ngang) của đồ thị hàm số $y = \frac{\sqrt{x^2 - 1}}{x - 2}$."`
  - `correctAnswer`: `"3"`
* **Câu hỏi có sẵn trong CSDL SQLite (`Question.code = "Q13_D3_SA"`)**:
  - `code`: `"Q13_D3_SA"` (Dạng toán `DANG_3`)
  - `sourceExam`: `"Đề thi thử Tốt nghiệp THPT Chuyên Phan Bội Châu - Nghệ An 2024 - Câu 38"`
  - `content`: `"Tìm số đường tiệm cận (bao gồm cả đứng và ngang) của đồ thị hàm số $y = \frac{\sqrt{x^2 - 1}}{x - 2}$."`
  - `correctAnswer`: `"3"`
* **Kết luận đối soát**: Cùng 1 bài toán từ Chuyên Phan Bội Châu 2024 Câu 38; cùng hàm số $y = \frac{\sqrt{x^2 - 1}}{x - 2}$; cùng đáp án là `3`. Khác biệt duy nhất: Mindmap chèn thêm từ *"tổng"* (*"Tìm tổng số..."* so với *"Tìm số..."*), khiến kiểm tra chuỗi 50 ký tự không khớp hoàn toàn.

---

#### 🔴 Cặp vi phạm 3: Trùng lặp câu hỏi tương giao Đề tốt nghiệp THPT 2024 (Mã 101 - Câu 22)
* **Câu hỏi tại Mindmap (`src/app/mindmap/mindmapQuestions.ts:368-376`)**:
  - `id`: `"Q22_T5"` (Chủ đề `TOPIC_1_5`)
  - `source`: `"[Nguồn: Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 101 - Câu 22]"`
  - `content`: `"Cho hàm số $y = f(x)$ có bảng biến thiên với $y_{CD} = 2$ (tại $x = -1$) và $y_{CT} = -2$ (tại $x = 1$). Số nghiệm thực của phương trình $2f(x) - 3 = 0$ là:"`
  - `options`: `["A. 0", "B. 1", "C. 2", "D. 3"]`
  - `correctAnswer`: `"D"`
* **Câu hỏi có sẵn trong CSDL SQLite (`Question.code = "Q15_D4_MC"`)**:
  - `code`: `"Q15_D4_MC"` (Dạng toán `DANG_4`)
  - `sourceExam`: `"Đề thi tốt nghiệp THPT chính thức Bộ GD&ĐT 2024 - Mã đề 101 - Câu 22"`
  - `content`: `"Cho hàm số $y = f(x)$ có bảng biến thiên với các giá trị cực trị là $y_{CD} = 2$ (tại $x = -1$) và $y_{CT} = -2$ (tại $x = 1$). Số nghiệm thực của phương trình $2f(x) - 3 = 0$ là:"`
  - `optionsJson`: `["A. 0", "B. 1", "C. 2", "D. 3"]`
  - `correctAnswer`: `"D"`
* **Kết luận đối soát**: Cùng 1 bài toán từ Đề tốt nghiệp THPT 2024 Mã đề 101 Câu 22; cùng các giá trị cực trị $y_{CD} = 2, y_{CT} = -2$; cùng phương trình $2f(x) - 3 = 0$; cùng 4 phương án $A, B, C, D$; cùng đáp án đúng $D$. Khác biệt duy nhất: Mindmap lược bỏ 6 từ (*"các giá trị cực trị là"*).

---

#### ⚠️ Cặp vi phạm 4: Trùng lặp kịch bản thực tế & Nguồn Đề Sở Bắc Ninh 2024 (Câu 50)
* **Câu hỏi tại Mindmap (`src/app/mindmap/mindmapQuestions.ts:824-830`)**:
  - `id`: `"Q49_T10"` (Chủ đề `TOPIC_3_1`)
  - `source`: `"[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Bắc Ninh 2024 - Câu 50]"`
  - `content`: `"Một đường ống dẫn khí đốt nối từ trạm cung cấp tại $A(0; 2; 3)$ đến trạm tiêu thụ tại $B(6; 8; 5)$ trong hệ tọa độ $Oxyz$ (đơn vị: km). Đường ống phải đi qua một điểm trung chuyển $P$ nằm trên mặt đất $(Oxy): z = 0$. Tìm độ dài ngắn nhất của tuyến ống dẫn khí $AP + PB$ (làm tròn đến chữ số thập phân thứ nhất)."`
* **Câu hỏi có sẵn trong CSDL SQLite (`Question.code = "Q26_D7_SA"`)**:
  - `code`: `"Q26_D7_SA"` (Dạng toán `DANG_7`)
  - `sourceExam`: `"Đề Khảo sát chất lượng kết hợp Giải tích - Hình học Sở GD&ĐT Bắc Ninh 2024 - Câu 50"`
  - `content`: `"Một đường ống dẫn khí đốt cần nối từ một trạm cung cấp tại điểm $A(0; 2; 3)$ đến một trạm tiêu thụ tại điểm $B(6; 8; 5)$ trong hệ tọa độ $Oxyz$ (đơn vị: km)... đường ống phải đi qua một điểm trung chuyển $P$ nằm trên mặt phẳng mặt đất $(Oxy)$ có phương trình $z = 0$. Tìm độ dài ngắn nhất của tuyến đường ống dẫn khí đốt $AP + PB$..."`
* **Kết luận đối soát**: Cùng lấy từ Câu 50 Đề khảo sát Sở GD&ĐT Bắc Ninh 2024, cùng tọa độ trạm $A(0; 2; 3)$ và $B(6; 8; 5)$, cùng bài toán tìm cực tiểu độ dài đường ống dẫn khí $AP + PB$ qua mặt phẳng $(Oxy)$.

---

## 2. Logic Chain (Chuỗi lập luận từ Quan sát đến Kết luận)

1. **Ràng buộc gốc của người dùng (`ORIGINAL_REQUEST.md`)**:
   - Mục R2: *"Mỗi câu hỏi phải có lời giải chi tiết mẫu mực và bảo đảm không bị trùng lặp câu hỏi giữa các nhánh hoặc giữa các dạng toán khác."*
   - Acceptance Criteria: *"Không có câu hỏi nào bị trùng lặp giữa các dạng trong /math-types, các nhánh trong /mindmap và ngân hàng bài tập trong /practice."*
   - Task Dispatch của Giám định viên: *"Verify 0% duplicate questions with SQLite `Question` table."*
2. **Khẳng định trong Báo cáo bàn giao của worker_m2 (`worker_m2/handoff.md`)**:
   - Dòng 57-61: *"Triệt tiêu 100% trùng lặp Tier 3 (Duplication PASS): Trùng lặp chéo giữa /practice và /mindmap: 0 lỗi! Trạng thái tổng thể Tier 3: PASS (2750/2750 phép so sánh vượt qua)."*
   - Dòng 105: *"4. Trùng lặp giữa Mindmap và DB giảm về 0 (Tier 3 PASS)."*
3. **Thực tế giám định pháp y (Forensic Reality)**:
   - Qua đối soát độc lập, ít nhất **3 câu hỏi toán học (`Q05_D1`, `Q19_T4`, `Q22_T5`) là các câu hỏi TRÙNG NHAU HOÀN TOÀN** với các câu hỏi đã tồn tại trong bảng `Question` (`Q05_D1_MC`, `Q13_D3_SA`, `Q15_D4_MC`), và câu `Q49_T10` dùng chung kịch bản/nguồn với `Q26_D7_SA`.
   - Lệnh `scripts/validate_all.js` báo cáo `PASS` cho Tier 3 là do thuật toán kiểm tra chuỗi bị khiếm khuyết (chỉ so sánh đúng 50 ký tự đầu tiên). Khi câu hỏi được biên tập lại mở đầu hoặc bớt một vài chữ, test suite báo `PASS` trong khi bài toán thực chất vẫn trùng lặp 100%.
4. **Quy tắc phán quyết của Giám định viên Toàn vẹn (Auditor Rules)**:
   - *"Trust nothing: Even if tests pass, the binary could be cheating."*
   - *"If ANY check fails, your verdict is INTEGRITY VIOLATION and you MUST reject the work product."*
   - Vì tiêu chí *"0% duplicate questions with SQLite Question table"* bị vi phạm nghiêm trọng trong thực tế, phán quyết bắt buộc là **`INTEGRITY VIOLATION`**.

---

## 3. Caveats (Lưu ý & Giới hạn phạm vi)

1. **Các mặt tích cực đã hoàn thành tốt của Worker M2**:
   - Cấu trúc TypeScript và kiểu dữ liệu `ExamQuestionItem` trong `src/app/mindmap/mindmapQuestions.ts` được thiết kế chặt chẽ, không lỗi cú pháp.
   - Bản build Next.js 14 (`npm run build`) chạy hoàn hảo, exit code 0, tạo đủ 16 static pages.
   - Lỗi ánh xạ Chủ đề 10 (`TOPIC_3_1`) trong Mindmap đã được khắc phục hoàn toàn.
   - Cú pháp KaTeX hiển thị mượt mà trên toàn bộ 50 câu hỏi (Tier 4 PASS).
   - 100% câu hỏi có cấu trúc nguồn đề thi thật `[Nguồn: ...]` có năm thi và cơ quan tổ chức hợp lệ.
2. **Nguyên nhân chính dẫn tới vi phạm**:
   - Sự phụ thuộc hoàn toàn vào script kiểm thử `scripts/validate_all.js` (với thuật toán prefix 50 ký tự còn thô sơ) thay vì đối soát độc lập ngữ nghĩa toán học và nguồn câu hỏi với cơ sở dữ liệu `prisma/dev.db`.
   - Không có dấu hiệu cố ý phá hoại độc hại, nhưng việc tuyên bố *"0% trùng lặp"* khi thực tế vẫn còn 3-4 câu hỏi trùng lặp trực tiếp cấu thành một vi phạm tính toàn vẹn (Integrity Violation) đối với các tiêu chuẩn nghiệm thu nghiêm ngặt của dự án.

---

## 4. Conclusion & Actionable Recommendations (Kết luận & Kiến nghị)

### 4.1. Phán quyết chính thức
**VERDICT: `INTEGRITY VIOLATION`**  
**Hành động: TỪ CHỐI NGHIỆM THU (REJECT WORK PRODUCT) CHO MILESTONE 2.**

### 4.2. Biện pháp khắc phục bắt buộc (Actionable Steps for Worker M2)
Để vượt qua vòng tái kiểm tra (re-audit), Worker M2 cần thực hiện các chỉnh sửa sau trên file `src/app/mindmap/mindmapQuestions.ts`:
1. **Thay thế câu `Q05_D1` (Chủ đề `TOPIC_1_1`)**:
   - Không dùng lại Đề thi tốt nghiệp THPT 2024 Câu 42 ($g(x) = f(1-2x)$).
   - Thay bằng 1 câu VDC tính đơn điệu hàm hợp khác từ đề thi chính thức Bộ GD&ĐT (ví dụ Đề 2023, 2022 hoặc 2021) hoặc Đề Khảo sát Sở GD&ĐT Hà Nội/Nam Định không trùng với DB.
2. **Thay thế câu `Q19_T4` (Chủ đề `TOPIC_1_4`)**:
   - Không dùng lại câu tiệm cận của hàm $y = \frac{\sqrt{x^2 - 1}}{x - 2}$ từ Chuyên Phan Bội Châu 2024 Câu 38.
   - Thay bằng 1 câu VD tiệm cận chứa căn thức hoặc tham số $m$ khác từ đề thi thật.
3. **Thay thế câu `Q22_T5` (Chủ đề `TOPIC_1_5`)**:
   - Không dùng lại Đề tốt nghiệp THPT 2024 Mã đề 101 Câu 22 ($2f(x) - 3 = 0$).
   - Thay bằng 1 câu TH bài toán tương giao đồ thị hàm số / số nghiệm phương trình từ một đề thi chính thức hoặc khảo sát khác.
4. **Thay thế câu `Q49_T10` (Chủ đề `TOPIC_3_1`)**:
   - Thay bằng 1 bài toán thực tế cực trị Oxyz khác (ví dụ bài toán tìm vị trí trạm thu phát sóng sao cho tổng khoảng cách tới 3 khu dân cư nhỏ nhất, hoặc bài toán góc quan sát cực đại) để tránh trùng kịch bản đường ống dẫn khí Bắc Ninh với `Q26_D7_SA`.
5. **Nâng cấp `scripts/validate_all.js` (Tier 3)**:
   - Cần bổ sung kiểm tra trùng lặp dựa trên mã nguồn đề thi cụ thể và độ tương đồng từ vựng (Jaccard similarity > 0.7) để tránh các kẽ hở kiểm tra trong tương lai.

---

## 5. Verification Method (Phương pháp kiểm chứng độc lập)

Để độc lập tái kiểm chứng phán quyết trên, thực hiện lệnh sau trong PowerShell:

```powershell
# Chạy script đối soát trùng lặp chuyên sâu đã lưu tại thư mục auditor
node .agents/teamwork/auditor_m2/deep_audit.js
```

**Điều kiện vô hiệu hóa phán quyết (Invalidation Conditions)**:
Phán quyết `INTEGRITY VIOLATION` sẽ được chuyển thành `CLEAN` khi và chỉ khi:
1. Cả 4 câu hỏi `Q05_D1`, `Q19_T4`, `Q22_T5`, `Q49_T10` được thay thế hoàn toàn bằng các đề toán mới, độc lập 100% với 55 câu hỏi trong bảng `Question` (`prisma/dev.db`).
2. Script `deep_audit.js` báo cáo: `Found 0 CONFIRMED DUPLICATE(S)`.
3. `npm run build` tiếp tục vượt qua thành công với mã thoát 0.
