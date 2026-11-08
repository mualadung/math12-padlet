# BÁO CÁO KHẢO SÁT TOÀN DIỆN HỌC LIỆU TOÁN 12 VÀ KHOẢNG TRỐNG NỘI DUNG (MATH CONTENT SURVEY & GAP ANALYSIS)

**Người thực hiện**: Explorer (teamwork_explorer)  
**Địa bàn làm việc**: `d:\TEST\MATH-STUDY\.agents\teamwork\explorer_survey_math\`  
**Thời điểm khảo sát**: 2026-11-08  
**Phạm vi**: Toàn bộ dữ liệu toán học tại `/math-types`, `/mindmap`, `/practice`, cơ sở dữ liệu SQLite Prisma, các tệp mã nguồn và cấu trúc SGK Toán 12 Tập 1 (Kết nối tri thức với cuộc sống).

---

## 1. OBSERVATION (Quan sát thực tế & Dữ liệu chi tiết)

### 1.1. Phạm vi bài học SGK Toán 12 Tập 1 (Kết nối tri thức với cuộc sống)
Theo chuẩn chương trình GDPT 2018 và SGK Toán 12 KNTT Tập 1:
- **Chương I: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị của hàm số**
  - **Bài 1**: Tính đơn điệu và cực trị của hàm số (Trang 5 - 16)
  - **Bài 2**: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số (Trang 17 - 22)
  - **Bài 3**: Đường tiệm cận của đồ thị hàm số (Trang 23 - 29)
  - **Bài 4**: Khảo sát sự biến thiên và vẽ đồ thị của hàm số (Trang 30 - 39)
  - **Bài 5**: Ứng dụng đạo hàm để giải quyết một số vấn đề thực tiễn (Trang 40 - 46)
- **Chương II: Vectơ và hệ trục toạ độ trong không gian**
  - **Bài 6**: Vectơ trong không gian (Trang 47 - 54)
  - **Bài 7**: Hệ trục toạ độ trong không gian (Trang 55 - 62)
  - **Bài 8**: Biểu thức toạ độ của các phép toán vectơ (Trang 63 - 72)
- **Phần tích hợp / Ôn tập cuối chương**:
  - Bài toán cực trị không gian thực tế kết hợp giải tích và hình học $Oxyz$.

---

### 1.2. Hiện trạng dạng toán tại `/math-types` (`src/app/math-types/page.tsx` & Prisma `MathCategory`)

Trang `/math-types` hiện lấy dữ liệu từ endpoint `/api/categories` (`prisma.mathCategory`). Bảng cơ sở dữ liệu `MathCategory` hiện chỉ chứa **7 dạng toán gộp nguyên khối**:

| Mã dạng | Tên dạng | Bài học tương ứng | Số câu hỏi (/practice) | Đánh giá điều kiện KaTeX |
| :--- | :--- | :--- | :---: | :--- |
| `DANG_1` | Dạng 1: Xét tính đơn điệu và cực trị của hàm số | Bài 1 (Gộp cả đơn điệu & cực trị) | 8 | Có nêu $K$, $y' \ge 0$, nhưng thiếu chi tiết từng lớp hàm bậc 3, bậc 4, phân thức, vô tỉ |
| `DANG_2` | Dạng 2: Giá trị lớn nhất - Giá trị nhỏ nhất & Bài toán tối ưu thực tiễn | Bài 2 & Bài 5 (Gộp GTLN-GTNN & Tối ưu kinh tế/hình học) | 8 | Có nêu $[a; b]$, thiếu điều kiện khả vi trên khoảng con, thiếu điều kiện biến thực tế $x>0$ |
| `DANG_3` | Dạng 3: Đường tiệm cận của đồ thị hàm số (Đứng, Ngang, Xiên) | Bài 3 | 8 | Thiếu điều kiện tập xác định không bị chặn khi xét $\pm\infty$, thiếu điều kiện $a \ne 0$ trong tiệm cận xiên |
| `DANG_4` | Dạng 4: Khảo sát, nhận dạng đồ thị và bài toán tương giao đồ thị hàm số | Bài 4 | 7 | Nêu nguyên tắc 5 bước, thiếu công thức tọa độ tâm đối xứng cụ thể từng hàm |
| `DANG_5` | Dạng 5: Vectơ trong không gian và các phép toán hình học thuần túy | Bài 6 | 7 | Chưa nêu rõ điều kiện ba vectơ cơ sở khác $\vec{0}$ và không đồng phẳng, quy ước $\vec{0}$ |
| `DANG_6` | Dạng 6: Hệ trục tọa độ Oxyz, biểu thức tọa độ của vectơ và ứng dụng | Bài 7 & Bài 8 (Gộp cả tọa độ cơ bản và tích có hướng) | 8 | Công thức diện tích và thể tích thiếu điều kiện không thẳng hàng và không đồng phẳng |
| `DANG_7` | Dạng 7: Tọa độ hóa Oxyz kết hợp đạo hàm giải bài toán cực trị không gian thực tế | Liên chương I-II / Ôn tập | 9 | Có hàm mục tiêu, nhưng thiếu điều kiện miền xác định của tham số $t \in [t_1; t_2]$ |

**Quan sát mã nguồn `src/app/math-types/page.tsx`**:
- Dòng 77-88: Tiêu đề giao diện bị đóng cứng: `"Cẩm Nang 7 Dạng Toán Trọng Tâm"` và `"3 Dạng Ch I • 3 Dạng Ch II • 1 Dạng Liên Chương"`.
- Giao diện chưa phản ánh phân cấp theo Bài 1 $\to$ Bài 8, mà chỉ có 3 tab bộ lọc: `Chương I`, `Chương II`, `Liên chương I-II`.

---

### 1.3. Hiện trạng cây tri thức tại `/mindmap` (`machData.ts` & `treeData.ts`)

Trong tệp `src/app/mindmap/machData.ts` (được import bởi `src/app/mindmap/page.tsx` và `GrandDetailCard.tsx`), đã tồn tại một cấu trúc chi tiết gồm **2 Chương, 10 Chủ đề và 37 Dạng toán thực chiến**:

- **CHƯƠNG I: Ứng dụng đạo hàm khảo sát hàm số (6 Chủ đề, 23 Dạng toán)**:
  - **Topic 01 (`TOPIC_1_1`)** (Bài 1): Tính đơn điệu của hàm số $\to$ 5 dạng:
    * `DẠNG 1.1` [NB]: Xét đơn điệu của hàm đa thức (Bậc ba, bậc bốn)
    * `DẠNG 1.2` [TH]: Đơn điệu của hàm phân thức bậc nhất / bậc nhất
    * `DẠNG 1.3` [TH]: Đơn điệu của hàm phân thức bậc hai / bậc nhất
    * `DẠNG 1.4` [VD]: Đơn điệu của hàm số chứa căn thức vô tỉ
    * `DẠNG 1.5` [VD]: Tìm tham số $m$ để hàm số đơn điệu trên khoảng
  - **Topic 02 (`TOPIC_1_2`)** (Bài 1): Cực trị của hàm số $\to$ 4 dạng:
    * `DẠNG 2.1` [NB]: Tìm điểm cực trị & giá trị cực trị qua đạo hàm cấp 1
    * `DẠNG 2.2` [TH]: Tìm cực trị bằng đạo hàm cấp hai (Quy tắc 2 Fermat)
    * `DẠNG 2.3` [VDC]: Cực trị của hàm hợp $y = f(u(x))$ & Đồ thị đạo hàm $f'(x)$
    * `DẠNG 2.4` [VD]: Phương trình đường thẳng qua hai điểm cực trị hàm bậc ba
  - **Topic 03 (`TOPIC_1_3`)** (Bài 2): Giá trị lớn nhất & nhỏ nhất của hàm số $\to$ 4 dạng:
    * `DẠNG 3.1` [NB]: Tìm GTLN - GTNN trên đoạn đóng $[a; b]$
    * `DẠNG 3.2` [TH]: Tìm GTLN - GTNN trên khoảng mở $(a; b)$ hoặc nửa khoảng
    * `DẠNG 3.3` [VD]: GTLN & GTNN của hàm chứa dấu giá trị tuyệt đối $|f(x)|$
    * `DẠNG 3.4` [VD]: Tìm tham số $m$ trong bài toán GTLN - GTNN
  - **Topic 04 (`TOPIC_1_4`)** (Bài 3): Đường tiệm cận của đồ thị hàm số $\to$ 4 dạng:
    * `DẠNG 4.1` [NB]: Tiệm cận đứng và tiệm cận ngang cơ bản
    * `DẠNG 4.2` [TH]: Tiệm cận của hàm số chứa căn thức (Lưu ý dấu âm tại $-\infty$)
    * `DẠNG 4.3` [TH]: Tiệm cận xiên của hàm phân thức bậc hai / bậc nhất
    * `DẠNG 4.4` [VD]: Tìm tham số $m$ để đồ thị có số đường tiệm cận thỏa mãn
  - **Topic 05 (`TOPIC_1_5`)** (Bài 4): Khảo sát sự biến thiên & Đồ thị hàm số $\to$ 4 dạng:
    * `DẠNG 5.1` [NB]: Quy tắc 5 bước nhận diện đồ thị & Bảng biến thiên
    * `DẠNG 5.2` [TH]: Bài toán tương giao đồ thị & Biện luận số nghiệm $f(x) = m$
    * `DẠNG 5.3` [TH]: Phương trình tiếp tuyến của đồ thị hàm số
    * `DẠNG 5.4` [TH]: Tâm đối xứng và trục đối xứng của đồ thị hàm số
  - **Topic 06 (`TOPIC_1_6`)** (Bài 5): Ứng dụng đạo hàm giải bài toán tối ưu thực tiễn $\to$ 2 dạng:
    * `DẠNG 6.1` [VD]: Tối ưu hóa kinh tế (Chi phí biên, Doanh thu, Lợi nhuận)
    * `DẠNG 6.2` [VD]: Tối ưu hóa hình học thực tiễn (Thể tích, Diện tích tôn, Rào chắn)

- **CHƯƠNG II: Vectơ và hệ trục tọa độ trong không gian (4 Chủ đề, 14 Dạng toán)**:
  - **Topic 07 (`TOPIC_2_1`)** (Bài 6): Vectơ không gian & Các quy tắc hình học $\to$ 3 dạng:
    * `DẠNG 7.1` [NB]: Quy tắc 3 điểm, hình bình hành & Quy tắc hình hộp
    * `DẠNG 7.2` [TH]: Phân tích vectơ theo 3 vectơ cơ sở không đồng phẳng
    * `DẠNG 7.3` [TH]: Tích vô hướng và góc giữa hai vectơ không gian
  - **Topic 08 (`TOPIC_2_2`)** (Bài 7): Hệ trục tọa độ Oxyz & Tọa độ điểm, vectơ $\to$ 3 dạng:
    * `DẠNG 8.1` [NB]: Biểu thức tọa độ của các phép toán vectơ trong Oxyz
    * `DẠNG 8.2` [NB]: Tọa độ trung điểm, trọng tâm tam giác & trọng tâm tứ diện
    * `DẠNG 8.3` [TH]: Khoảng cách, hình chiếu vuông góc & Điểm đối xứng
  - **Topic 09 (`TOPIC_2_3`)** (Bài 8): Tích có hướng và ứng dụng hình học không gian $\to$ 5 dạng:
    * `DẠNG 9.1` [TH]: Tích có hướng & Điều kiện cùng phương, đồng phẳng
    * `DẠNG 9.2` [TH]: Ứng dụng tính diện tích tam giác & Thể tích tứ diện, khối hộp
    * `DẠNG 9.3` [VD]: Khoảng cách từ điểm đến đường thẳng trong không gian
    * `DẠNG 9.4` [TH]: Phương trình mặt cầu $(S)$ trong không gian Oxyz
    * `DẠNG 9.5` [VDC]: Cực trị biểu thức vectơ & Phương pháp Tâm tỉ cự
  - **Topic 10 (`TOPIC_3_1`)** (Tích hợp Chương I & II): Tọa độ hóa Oxyz giải bài toán cực trị không gian thực tế $\to$ 3 dạng:
    * `DẠNG 10.1` [VD]: Khoảng cách ngắn nhất giữa hai vật thể chuyển động theo $t$
    * `DẠNG 10.2` [VD]: Tối ưu hóa vị trí đường ống / cáp điện qua mặt đất (Điểm đối xứng)
    * `DẠNG 10.3` [VDC]: Tọa độ hóa khối đa diện (Lăng trụ, Chóp) giải bài toán thực tế

*Ghi chú*: Tệp `treeData.ts` là tệp dữ liệu song song chứa 35 dạng toán (không được import trong bất kỳ trang nào).

---

### 1.4. Lỗi bất đồng bộ khoá Topic giữa `machData.ts` và `mindmapQuestions.ts` (Nghiêm trọng)
- Trong `machData.ts`, Topic 10 được gán mã: `id: "TOPIC_3_1"`.
- Trong `mindmapQuestions.ts`, mảng câu hỏi của Topic 10 lại được lưu dưới khoá: `"TOPIC_2_4"`.
- Hàm truy xuất `getQuestionsForTopic(topicId: string)` trong `mindmapQuestions.ts` (dòng 841-851):
  ```typescript
  export function getQuestionsForTopic(topicId: string): ExamQuestionItem[] {
    if (REAL_QUESTIONS_BANK[topicId]) {
      return REAL_QUESTIONS_BANK[topicId];
    }
    if (topicId.startsWith("TOPIC_1")) {
      return REAL_QUESTIONS_BANK["TOPIC_1_1"];
    }
    return REAL_QUESTIONS_BANK["TOPIC_2_2"];
  }
  ```
- **Hậu quả trực tiếp**: Khi người dùng nhấn vào bất kỳ dạng toán nào thuộc Topic 10 (`TOPIC_3_1`), hệ thống không tìm thấy khoá `"TOPIC_3_1"`, rơi vào nhánh fallback trả về `TOPIC_2_2` (câu hỏi về hệ tọa độ Oxyz cơ bản thay vì bài toán cực trị không gian thực tế). Toàn bộ 5 câu hỏi `Q46-2024` đến `Q50-2024` của Topic 10 bị cô lập hoàn toàn!

---

### 1.5. Hiện trạng ngân hàng câu hỏi tại `/practice` (`Question` trong SQLite DB)
- **Tổng số câu hỏi**: 55 câu.
- **Phân bổ câu hỏi theo 7 dạng hiện tại**:
  * `DANG_1`: 8 câu (Thiếu 2 câu để đạt mốc 10)
  * `DANG_2`: 8 câu (Thiếu 2 câu để đạt mốc 10)
  * `DANG_3`: 8 câu (Thiếu 2 câu để đạt mốc 10)
  * `DANG_4`: 7 câu (Thiếu 3 câu để đạt mốc 10)
  * `DANG_5`: 7 câu (Thiếu 3 câu để đạt mốc 10)
  * `DANG_6`: 8 câu (Thiếu 2 câu để đạt mốc 10)
  * `DANG_7`: 9 câu (Thiếu 1 câu để đạt mốc 10)
  * **Tổng số câu còn thiếu để đạt 10 câu/dạng cho 7 dạng**: **15 câu hỏi**.
- **Chất lượng nguồn gốc câu hỏi trong DB**:
  * 48 câu có nguồn trích dẫn từ đề thi chính thức Bộ GD&ĐT (2024), Đề tham khảo Bộ GD&ĐT (2025), Đề khảo sát Sở GD&ĐT (Hà Nội, Hải Phòng, Bắc Ninh, Nghệ An, Nam Định) và Trường Chuyên (Chuyên Lam Sơn, Chuyên ĐH Sư Phạm, Chuyên Phan Bội Châu).
  * **4 câu mang nhãn đề xuất chưa kiểm chứng**: `Q25_D7_TF`, `Q34_D7_MC`, `Q35_D7_SA`, `Q36_D7_TF` có nguồn ghi verbatim: `"[Đề xuất mới theo SGK Kết nối tri thức - Chờ giáo viên bộ môn duyệt]"`.
  * **2 câu lấy từ bài tập SGK**: `Q35_D3_MC` ("SGK Toán 12 Tập 1... Bài 3 Trang 26"), `Q39_D5_MC` ("SGK Toán 12 Tập 1... Bài 6 Trang 51").
  * **1 câu đề minh họa SGK**: `Q11_D3_MC` ("Đề minh họa Cấu trúc mới 2025 SGK Kết nối tri thức...").
- **Hướng dẫn máy tính cầm tay (Casio Guide) trong DB**:
  * 55/55 câu đều có trường `casioGuide`.
  * Hướng dẫn có đề cập thao tác phím / MENU Casio fx-580VN X: **23/55 câu** (41.8%).
  * Hướng dẫn có đề cập Casio fx-880BTG: **3/55 câu** (5.5%) gồm: `Q31_D1_TF`, `Q32_D1_SA`, `Q34_D2_SA`.
  * Hướng dẫn song song cả hai dòng máy fx-580 & fx-880: **DUY NHẤT 1/55 câu** (`Q31_D1_TF`).
  * 52/55 câu (94.5%) hoàn toàn thiếu hướng dẫn bấm máy fx-880BTG (chỉ ghi chung chung như "CALC $x=...$" hoặc không nêu thao tác phím).
- **Lỗi giao diện tại `src/app/practice/page.tsx`**:
  * Dòng 209: Ghi chú tiêu đề: `"41 câu hỏi chuẩn nguồn 100% Bộ GD&ĐT..."` trong khi thực tế cơ sở dữ liệu có 55 câu.

---

### 1.6. Khảo sát trùng lặp câu hỏi giữa `/math-types`, `/mindmap` và `/practice`

Quét đối chiếu toàn bộ nội dung văn bản toán học phát hiện:
1. **9 câu hỏi trùng lặp nguyên bản 100% giữa DB `/practice` và `/mindmap` (`mindmapQuestions.ts`)**:
   * Trùng lặp 1: `Q02_D1_MC` (DB) $\equiv$ `Q02-2024` (MM): Hàm số $y = \frac{2x - 1}{x + 1}$ đồng biến trên khoảng nào? [Sở Nam Định 2024 - Câu 8]
   * Trùng lặp 2: `Q06_D2_MC` (DB) $\equiv$ `Q11-2024` (MM): Giá trị nhỏ nhất của hàm số $f(x) = x^4 - 2x^2 + 3$ trên $[0; 2]$ [Bộ GD&ĐT 2024 - Mã đề 104 - Câu 12]
   * Trùng lặp 3: `Q07_D2_MC` (DB) $\equiv$ `Q12-2024` (MM): Giá trị lớn nhất của hàm số $y = x + \frac{4}{x}$ trên $[1; 4]$ [Sở Bắc Ninh 2024 - Câu 19]
   * Trùng lặp 4: `Q10_D3_MC` (DB) $\equiv$ `Q16-2024` (MM): Đường tiệm cận đứng của đồ thị hàm số $y = \frac{3x + 1}{x - 2}$ [Bộ GD&ĐT 2024 - Mã đề 101 - Câu 4]
   * Trùng lặp 5: `Q11_D3_MC` (DB) $\equiv$ `Q17-2025` (MM): Phương trình đường tiệm cận xiên của đồ thị $y = \frac{2x^2 - 3x + 5}{x - 1}$ [Đề minh họa Cấu trúc mới 2025 SGK]
   * Trùng lặp 6: `Q17_D5_MC` (DB) $\equiv$ `Q31-2024` (MM): Cho hình hộp $ABCD.A'B'C'D'$. Quy tắc hình hộp [Bộ GD&ĐT 2024 - Mã đề 102 - Câu 6]
   * Trùng lặp 7: `Q18_D5_MC` (DB) $\equiv$ `Q32-2024` (MM): Tứ diện đều $ABCD$ cạnh $a$. Tích vô hướng $\vec{AB} \cdot \vec{AC}$ [Chuyên Lam Sơn 2024]
   * Trùng lặp 8: `Q23_D6_SA` (DB) $\equiv$ `Q39-2024` (MM): Trong không gian $Oxyz$, tam giác $ABC$ có $A(1; 2; 3), B(3; 0; 1)...$ [Bộ GD&ĐT 2024 - Mã đề 103 - Câu 5]
   * Trùng lặp 9: `Q27_D2_MC` (DB) $\equiv$ `Q13-2024` (MM): Tìm GTLN của hàm số $y = \sqrt{4 - x^2}$ trên $[-1; 2]$ [Bộ GD&ĐT 2024 - Mã đề 103 - Câu 14]

2. **Các câu trùng lặp biến thể bài toán (Near Duplicates) giữa DB và `/mindmap`**:
   * `Q03_D1_TF` (DB Đúng/Sai) $\approx$ `Q03-2025` (MM Trắc nghiệm 4 chọn): Cùng hàm bậc ba $y = x^3 - 3x^2 + 2$.
   * `Q04_D1_SA` (DB) $\approx$ `Q04-2025` (MM): Cùng bài toán tìm $m \in [-10; 10]$ cho hàm bậc ba $y = \frac{1}{3}x^3 - mx^2 + (m^2 - 4)x + ...$
   * `Q12_D3_TF` (DB) $\approx$ `Q18-2024` (MM): Cùng hàm phân thức $y = \frac{x^2 - x - 2}{x^2 - 4}$.
   * `Q24_D7_MC` (DB) $\approx$ `Q47-2024` (MM): Cùng bài toán khinh khí cầu bay trong không gian $Oxyz$ [Sở Nghệ An 2024 - Câu 47].

3. **Trùng lặp với câu hỏi ví dụ mẫu (`sampleQuestion`) trong `machData.ts`**:
   * `Q02_D1_MC` (DB) $\equiv$ `Q02-2024` (MM) $\equiv$ `sampleQuestion` của DẠNG 1.2 trong `machData.ts`.
   * `Q32_D1_SA` (DB) $\approx$ `Q04-2025` (MM) $\approx$ `sampleQuestion` của DẠNG 1.5 trong `machData.ts`.

---

### 1.7. Kiểm thử tính hợp lệ và tuân thủ chuẩn KaTeX

Thực thi kiểm tra cú pháp KaTeX trên toàn bộ **2.491 biểu thức toán học** phát hiện:
1. **8 lỗi cú pháp nghiêm trọng (Syntax Errors) gây hỏng hiển thị**:
   - Vị trí: `Q21_D6_MC` (4 phương án lựa chọn A, B, C, D) và `Q31_D5_MC` (4 phương án lựa chọn A, B, C, D).
   - Nội dung lỗi: `"60^\\circ"`, `"90^\\circ"`, `"45^\\circ"`, `"120^\\circ"`, `"30^\\circ"`.
   - Thông báo lỗi verbatim: `KaTeX parse error: Got function '\\' with no arguments as superscript at position 4: 60^\̲\̲circ`.
   - Nguyên nhân: Escape chuỗi JSON 2 lần biến `\circ` thành `\\circ`, KaTeX hiểu dấu `\\` là ngắt dòng (newline) đặt trong số mũ mà không có tham số.
2. **Cảnh báo ký tự Unicode không hợp lệ trong môi trường toán học**:
   - `LaTeX-incompatible input and strict mode is set to 'warn': Unicode text character "Đ" used in math mode [unicodeTextInMathMode]`. Xuất hiện khi dùng `$x_{CĐ}$` thay vì `$x_{CD}$` hoặc `$\text{CĐ}$`.
3. **Thiếu điều kiện áp dụng trong lý thuyết dạng toán (`machData.ts`)**:
   - 14/37 dạng toán chỉ nêu công thức thuần túy mà thiếu:
     * Tập xác định $D$ và tính liên tục/khả vi (vd: Dạng 1.5, Dạng 2.1, Dạng 2.4, Dạng 3.1).
     * Điều kiện mẫu thức khác không ($ad - bc \ne 0, c \ne 0, p \ne 0$).
     * Điều kiện vectơ cơ sở khác vectơ-không ($\vec{a}, \vec{b}, \vec{c} \ne \vec{0}$) và điều kiện vuông góc/cùng phương trong không gian (Dạng 7.2, 7.3, 9.1, 9.2, 9.3).
     * Điều kiện mặt cầu $a^2 + b^2 + c^2 - d > 0$ (Dạng 9.4).

---

## 2. LOGIC CHAIN (Chuỗi suy luận từ quan sát đến nhận định)

1. **Từ Quan sát 1.2 & 1.3**:
   - `MathCategory` và trang `/math-types` chỉ có 7 dạng toán gộp thô sơ, trong khi `machData.ts` tại `/mindmap` đã phân rã thành 37 dạng toán nhỏ bao phủ toàn diện 10 chủ đề từ Bài 1 đến Bài 8.
   - $\implies$ Giữa trang `/math-types` và `/mindmap` có sự phân mảnh kiến trúc dữ liệu sâu sắc: `/math-types` đọc từ SQLite DB, `/mindmap` đọc từ file JSON tĩnh `machData.ts`.
   - $\implies$ Trang `/math-types` chưa đáp ứng tiêu chí R1 ("mở rộng chi tiết toàn bộ các phân dạng nhỏ theo từng bài học Bài 1 đến Bài 8").

2. **Từ Quan sát 1.4**:
   - Khoá của Topic 10 trong `machData.ts` là `TOPIC_3_1`, nhưng trong `mindmapQuestions.ts` lại đặt là `TOPIC_2_4`.
   - Hàm `getQuestionsForTopic` kiểm tra `REAL_QUESTIONS_BANK[topicId]`. Khi nhận vào `TOPIC_3_1`, hàm không khớp khoá và tự động trả về `TOPIC_2_2`.
   - $\implies$ 5 câu hỏi vận dụng cao `Q46-2024` đến `Q50-2024` hoàn toàn bị ẩn, người học xem Topic 10 nhưng lại nhận câu hỏi của Topic 8.

3. **Từ Quan sát 1.5**:
   - Mỗi dạng trong 7 dạng ở `/practice` hiện chỉ có 7 đến 9 câu (tổng 55 câu), thiếu 15 câu để đạt chuẩn tối thiểu 10 câu/dạng theo tiêu chí R3.
   - 4 câu ở Dạng 7 vẫn mang nguồn tạm thời `[Đề xuất mới...]`, 2 câu là bài tập SGK chứ không phải đề thi thật.
   - Hướng dẫn Casio fx-880BTG chỉ có ở 3/55 câu (và chỉ 1 câu có đủ cả 2 dòng máy). 94.5% câu hỏi chưa đạt tiêu chí thao tác kép Casio fx-580 & fx-880.

4. **Từ Quan sát 1.6**:
   - 9 câu hỏi trong `/practice` trùng khớp 100% với câu hỏi trong `/mindmap`, cùng nhiều câu tương tự và câu ví dụ mẫu trong `machData.ts`.
   - $\implies$ Vi phạm trực tiếp tiêu chí nghiệm thu: "Không có câu hỏi nào bị trùng lặp giữa các dạng trong /math-types, các nhánh trong /mindmap và ngân hàng bài tập trong /practice".

5. **Từ Quan sát 1.7**:
   - Lỗi escape `^\\circ` tại `Q21_D6_MC` và `Q31_D5_MC` làm hỏng hoàn toàn việc hiển thị các góc $30^\circ, 45^\circ, 60^\circ, 90^\circ, 120^\circ$ trên giao diện người dùng.
   - Nhiều công thức lý thuyết chưa kèm điều kiện toán học nghiêm ngặt theo yêu cầu dự án.

---

## 3. CAVEATS (Vấn đề chưa khảo sát & Giả định)

1. **Phạm vi dạng toán tại `/practice`**:
   - Yêu cầu R3 nêu: *"Bổ sung đầy đủ ít nhất 10 bài tập cho mỗi dạng toán"*. Hiện tại cơ sở dữ liệu phân bổ câu hỏi theo 7 dạng lớn (`DANG_1` $\to$ `DANG_7`). Nếu yêu cầu áp dụng cho 7 dạng lớn này thì cần bổ sung tối thiểu 15 câu để mỗi dạng đạt 10 câu (tổng $\ge 70$ câu). Nếu yêu cầu áp dụng cho toàn bộ 37 dạng nhỏ thì cần tái cấu trúc cơ sở dữ liệu `MathCategory` theo 37 dạng và số lượng câu hỏi cần bổ sung sẽ rất lớn (370 câu).
   - *Giả định phân tích*: Nhóm cần thống nhất: chuẩn hóa 37 phân dạng trên `/math-types` và `/mindmap`, còn ngân hàng luyện tập `/practice` hỗ trợ luyện tập theo cấu trúc bài học/dạng trọng tâm với tối thiểu 10 câu chất lượng cao cho mỗi nhóm dạng đề thi.
2. **Nội dung câu hỏi đề thi 2025**:
   - Đề tham khảo 2025 của Bộ GD&ĐT đã công bố định dạng mới (Đúng/Sai và Trả lời ngắn). Cần ưu tiên tối đa nguồn đề thi thử 2024-2025 của các Sở và Chuyên uy tín theo đúng form mới này.

---

## 4. CONCLUSION (Kết luận & Đề xuất hành động trọng tâm)

Để hoàn thiện dự án đạt khung xuất sắc (90 - 100 điểm) theo đúng `ORIGINAL_REQUEST.md` và `PROJECT RULES`, các đầu việc cần thực hiện gồm:

1. **Chuẩn hóa kiến trúc `/math-types` theo Bài 1 $\to$ Bài 8**:
   - Đồng bộ hóa 37 phân dạng toán từ `machData.ts` sang bảng cơ sở dữ liệu `MathCategory` hoặc hiển thị phân tầng theo Bài học (Bài 1 đến Bài 8) thay vì giữ nguyên 7 dạng gộp thô sơ.
   - Sửa tiêu đề giao diện `src/app/math-types/page.tsx` từ "7 Dạng Toán Trọng Tâm" thành danh mục toàn diện bao phủ Chương I & II.
   - Bổ sung đầy đủ điều kiện toán học KaTeX ($D$, mẫu khác 0, căn không âm, vectơ khác $\vec{0}$) cho lý thuyết của tất cả các dạng.

2. **Khắc phục lỗi khoá Topic 10 trong `/mindmap`**:
   - Đồng bộ khoá trong `mindmapQuestions.ts` từ `"TOPIC_2_4"` thành `"TOPIC_3_1"` (hoặc map cả hai) để 5 câu hỏi thực chiến `Q46-2024` đến `Q50-2024` hiển thị chính xác khi học sinh bấm vào Dạng 10.1, 10.2, 10.3.

3. **Chống trùng lặp 100% giữa `/mindmap`, `/math-types` và `/practice`**:
   - Thay thế 9 câu hỏi trong `/practice` đang trùng nguyên văn với `mindmapQuestions.ts` bằng 9 câu hỏi mới trích từ Đề thi tốt nghiệp THPT chính thức hoặc Đề Chuyên/Sở 2024-2025 khác mã đề/câu.
   - Đảm bảo các câu ví dụ mẫu trong `machData.ts` là câu độc lập.

4. **Bổ sung đủ số lượng $\ge 10$ câu/dạng cho `/practice`**:
   - Bổ sung tối thiểu 15 câu hỏi mới chuẩn nguồn đề thi thật vào DB để đưa toàn bộ các dạng lên $\ge 10$ câu/dạng (đưa tổng ngân hàng DB lên ít nhất 70 câu).
   - Thay thế 4 câu có nguồn `[Đề xuất mới...]` và 2 câu SGK bằng câu hỏi đề thi thật có thể kiểm chứng.

5. **Hoàn thiện hướng dẫn bấm máy Casio fx-580VN X & fx-880BTG**:
   - Soạn hướng dẫn bấm máy chi tiết song song cho cả 2 dòng máy (đặc biệt các phím [MENU 8] vs [Bảng tính], [MENU 5] vs [Vectơ], [MENU 9] vs [Phương trình]) cho 100% câu hỏi trong `/practice` và `/mindmap`.

6. **Sửa lỗi cú pháp KaTeX**:
   - Sửa lỗi escape `"60^\\circ"` thành `"60^\\circ"` hoặc `"{60^\\circ}"` trong `Q21_D6_MC` và `Q31_D5_MC`.
   - Chuẩn hóa ký hiệu `$x_{CD}$` thay cho ký hiệu Unicode `$x_{CĐ}$` trong toán mode.
   - Cập nhật số liệu `"41 câu hỏi..."` thành con số chính xác trên header của `/practice`.

---

## 5. VERIFICATION METHOD (Phương pháp kiểm chứng độc lập)

1. **Kiểm tra số lượng câu hỏi và phân bổ trong DB**:
   ```powershell
   node -e 'const { PrismaClient } = require("@prisma/client"); const p = new PrismaClient(); p.question.groupBy({ by: ["categoryId"], _count: { id: true } }).then(console.log).finally(() => p.$disconnect());'
   ```
2. **Kiểm tra lỗi KaTeX toàn diện**:
   Chạy script quét parser KaTeX `katex.renderToString(formula, { throwOnError: true })` trên toàn bộ trường nội dung của `Question`, `MathCategory`, `machData.ts`, `mindmapQuestions.ts`.
3. **Kiểm tra trùng lặp câu hỏi**:
   Chạy so khớp chuỗi chuẩn hóa giữa ngân hàng câu hỏi `mindmapQuestions.ts` và cơ sở dữ liệu `prisma.question`.
4. **Kiểm tra liên kết Topic 10 trong Mindmap**:
   Gọi hàm `getQuestionsForTopic('TOPIC_3_1')` để kiểm tra danh sách trả về phải là `Q46-2024` đến `Q50-2024`.
5. **Kiểm tra biên dịch dự án**:
   ```powershell
   npm run build
   ```
   Xác nhận mã thoát = 0 và không có lỗi TypeScript/ESLint.
