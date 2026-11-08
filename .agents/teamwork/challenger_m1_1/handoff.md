# BÁO CÁO THẨM ĐỊNH ĐỐI KHÁNG MILESTONE 1 (CHALLENGER HANDOFF REPORT)
## KIỂM ĐỊNH BẢO ĐẢM TOÁN HỌC & CHUẨN HÓA KATEX (MILESTONE 1 VERIFICATION)

- **Người thực hiện**: Empirical Challenger (`teamwork_challenger`)
- **Vai trò**: critic, specialist
- **Thư mục làm việc**: `d:\TEST\MATH-STUDY\.agents\teamwork\challenger_m1_1\`
- **Milestone thẩm định**: Milestone 1 — Math Types & KaTeX Standardization Stress Test
- **Caller (Orchestrator)**: `51012427-609d-48ef-a8a3-ce0355def37c`
- **Thời điểm hoàn thành**: 2026-11-08T05:55:00Z
- **Phán quyết (Verdict)**: ❌ **REJECT** (Yêu cầu Worker M1 khắc phục các lỗi ký hiệu KaTeX và điều kiện toán học trước khi đóng Milestone 1)

---

## 1. OBSERVATION (QUAN SÁT THỰC ĐỊA & BẰNG CHỨNG THỰC NGHIỆM)

Đội ngũ Thẩm định Đối kháng (Challenger) đã thiết kế và thực thi trực tiếp các harness kiểm thử AST và KaTeX strict renderer độc lập:
- `scripts/adversarial_katex_stress.js`: Quét toàn diện 1.808 AST String Literals, 37 Dạng toán, 2.521 biểu thức KaTeX với `throwOnError: true`.
- `scripts/adversarial_syntax_scan.js`: Quét đối kháng các từ khóa toán học LaTeX bị thiếu ký tự thoát backslash (`\`).
- `scripts/adversarial_fn_scan.js`: Quét các hàm toán học (`\min`, `\max`, `\sin`, `\cos`) trong môi trường math mode.
- `scripts/audit_seed_katex.js` & `scripts/audit_mach_katex.js`: Kiểm toán độc lập từng tệp nguồn.

### 1.1. Bằng chứng Lỗi Ký hiệu KaTeX hiển thị thô (Unescaped LaTeX Keywords)
Trong tệp `src/app/mindmap/machData.ts`, phát hiện **7 vị trí** công thức KaTeX bị gõ thiếu dấu gạch chéo ngược `\`:

1. **6 vị trí lỗi `$iff` thay vì `\iff` (Mệnh đề tương đương $\Longleftrightarrow$)**:
   - **Vị trí 1**: `src/app/mindmap/machData.ts` dòng 658 (`DẠNG 9.1` - `theory`):
     ```latex
     - Điều kiện hai vectơ cùng phương: $\vec{u}, \vec{v}$ cùng phương $iff [\vec{u}, \vec{v}] = \vec{0} = (0; 0; 0)$.
     ```
   - **Vị trí 2**: `src/app/mindmap/machData.ts` dòng 658 (`DẠNG 9.1` - `theory`):
     ```latex
     - Điều kiện ba điểm thẳng hàng: $A, B, C$ thẳng hàng $iff [\vec{AB}, \vec{AC}] = \vec{0}$.
     ```
   - **Vị trí 3**: `src/app/mindmap/machData.ts` dòng 658 (`DẠNG 9.1` - `theory`):
     ```latex
     - Điều kiện ba vectơ đồng phẳng: Ba vectơ $\vec{u}, \vec{v}, \vec{w}$ đồng phẳng $iff [\vec{u}, \vec{v}] \cdot \vec{w} = 0$.
     ```
   - **Vị trí 4**: `src/app/mindmap/machData.ts` dòng 658 (`DẠNG 9.1` - `theory`):
     ```latex
     - Điều kiện bốn điểm đồng phẳng: Bốn điểm $A, B, C, D$ đồng phẳng $iff [\vec{AB}, \vec{AC}] \cdot \vec{AD} = 0$.
     ```
   - **Vị trí 5**: `src/app/mindmap/machData.ts` dòng 676 (`DẠNG 9.2` - `theory`):
     ```latex
     Điều kiện tam giác không suy biến: Ba điểm $A, B, C$ không thẳng hàng $iff [\vec{AB}, \vec{AC}] \ne \vec{0} \implies S_{\Delta ABC} > 0$.
     ```
   - **Vị trí 6**: `src/app/mindmap/machData.ts` dòng 676 (`DẠNG 9.2` - `theory`):
     ```latex
     Điều kiện tứ diện không suy biến: Bốn điểm $A, B, C, D$ không đồng phẳng $iff [\vec{AB}, \vec{AC}] \cdot \vec{AD} \ne 0 \implies V_{ABCD} > 0$.
     ```
   *Hiện tượng hiển thị*: Khi đặt `$iff ...$`, KaTeX hiểu `i`, `f`, `f` là ba biến toán học nhân với nhau ($i \cdot f \cdot f$), hiển thị dòng chữ nghiêng "iff" thay vì mũi tên tương đương $\Longleftrightarrow$.

2. **1 vị trí lỗi `$min$` thay vì `$\min$` (Toán tử giá trị nhỏ nhất)**:
   - **Vị trí 7**: `src/app/mindmap/machData.ts` dòng 304 (`DẠNG 3.4` - `theory`):
     ```latex
     Vì hàm số luôn đơn điệu trên $[a; b]$ nên $\max$ và $min$ luôn đạt tại một trong hai đầu mút: $\{f(a); f(b)\}$.
     ```
   *Hiện tượng hiển thị*: Vế trước dùng `$\max$` chuẩn LaTeX, nhưng vế sau lại gõ `$min$` thiếu `\`, khiến KaTeX render thành $m \cdot i \cdot n$ (3 biến số in nghiêng) thay vì toán tử chuẩn $\min$.

---

### 1.2. Bằng chứng Thiếu Điều kiện Miền Xác Định & Ràng buộc Toán học trong `machData.ts`
Mặc dù Worker M1 đã bổ sung nhiều điều kiện, quá trình kiểm tra đối kháng phát hiện các phân dạng sau vẫn còn thiếu điều kiện toán học bắt buộc theo chuẩn Mục III:

1. **`DẠNG 4.1` (MT_1_4_1 - Tiệm cận đứng và tiệm cận ngang cơ bản)**:
   - Trong `theory`: Nêu định nghĩa hàm phân thức $y = \frac{P(x)}{Q(x)}$ và điều kiện $Q(x_0) = 0$ để tìm TCĐ, nhưng **hoàn toàn không nêu điều kiện tồn tại của hàm số (Mẫu thức khác 0: $Q(x) \ne 0$ hay Tập xác định $D = \{x \in \mathbb{R} \mid Q(x) \ne 0\}$)**.
2. **`DẠNG 4.3` (MT_1_4_3 - Tiệm cận xiên của hàm phân thức bậc hai / bậc nhất)**:
   - Trong `theory`: Nêu hàm $y = \frac{ax^2+bx+c}{px+q}$ với các điều kiện $a \ne 0, p \ne 0, aq^2 - bpq + cp^2 \ne 0$, nhưng **bỏ sót điều kiện mẫu thức khác 0: $px + q \ne 0 \iff x \ne -q/p$ (Tập xác định $D = \mathbb{R} \setminus \{-q/p\}$)**.
3. **`DẠNG 10.1` (MT_3_1_1 - Khoảng cách ngắn nhất giữa hai vật thể Oxyz)**:
   - Trong `theory`: Đặt vật thể chuyển động $M_1(t), M_2(t)$ với các vectơ chỉ phương vận tốc $\vec{v}_1 = (a_1; b_1; c_1), \vec{v}_2 = (a_2; b_2; c_2)$, nhưng **chưa nêu điều kiện hiển nhiên của vật thể chuyển động thực tế là các vectơ vận tốc phải khác vectơ-không ($\vec{v}_1, \vec{v}_2 \ne \vec{0}$)**.

---

### 1.3. Bằng chứng Cảnh báo `[unicodeTextInMathMode]` trong Cơ sở Dữ liệu
Trong cơ sở dữ liệu SQLite (`prisma/dev.db`), bản ghi câu hỏi `Question` mã `Q38_D4_SA` (dạng Short Answer) vẫn chứa ký tự Unicode tiếng Việt `Đ` trong Math Mode:
```text
[Question Q38_D4_SA (explanation)] [unicodeTextInMathMode] "$y_{CĐ} = f\left(\frac{3-2\sqrt{3}}{3}\right) \approx 3{,}08 > 3$" -> Unicode text character "Đ" used in math mode
[Question Q38_D4_SA (explanation)] [unicodeTextInMathMode] "$y_{CĐ} \approx 3{,}08 \implies$" -> Unicode text character "Đ" used in math mode
[Question Q38_D4_SA (explanation)] [unicodeTextInMathMode] "$y_{CĐ} \implies$" -> Unicode text character "Đ" used in math mode
[Question Q38_D4_SA (explanation)] [unicodeTextInMathMode] "$y_{CT} < 3 < y_{CĐ}$" -> Unicode text character "Đ" used in math mode
[Question Q38_D4_SA (explanation)] [unicodeTextInMathMode] "$y_{CĐ} \approx 3{,}08 > 3$" -> Unicode text character "Đ" used in math mode
[Question Q38_D4_SA (distractorAnalysis)] [unicodeTextInMathMode] "$y_{CĐ}, y_{CT}$" -> Unicode text character "Đ" used in math mode
```
*Gốc rễ*: Đoạn mã này nằm trong `scripts/seed_deep_expansion.js` dòng 159 và 161, được nạp vào SQLite trước đó mà chưa được chuẩn hóa về `$y_{\text{CĐ}}$`.

---

## 2. LOGIC CHAIN (CHUỖI LẬP LUẬN TỪ QUAN SÁT ĐẾN KẾT LUẬN)

1. **Về lỗi `$iff` và `$min$`**:
   - Trình phân tích KaTeX cơ bản không ném ngoại lệ khi gặp `$iff$` vì nó coi `i`, `f`, `f` là 3 biến đại số hợp lệ. Do đó, các script kiểm tra nông (chỉ bắt lỗi runtime của `katex.renderToString`) đã bỏ lọt các lỗi này.
   - Tuy nhiên, về mặt hiển thị toán học sư phạm và tiêu chuẩn TeX, `$iff$` là lỗi chính tả nghiêm trọng (thiếu ký tự thoát `\`), làm sai lệch hoàn toàn ký hiệu toán học trên màn hình của học sinh THPT (từ phép kéo theo 2 chiều $\iff$ biến thành phép nhân 3 biến $i \cdot f \cdot f$).
   - Điều này vi phạm trực tiếp **Quy tắc 1 (Mục III - Project Rules)**: *"Tuyệt đối chuẩn LaTeX: Mọi biểu thức... đều phải được định dạng chuẩn LaTeX... hiển thị mượt mà qua KaTeX"*.

2. **Về các điều kiện mẫu thức khác 0**:
   - Dạng toán tiệm cận phân thức (`DẠNG 4.1` và `DẠNG 4.3`) là trọng tâm của Chương I SGK Toán 12 KNTT.
   - Bẫy kinh điển trong các đề thi THPT của Bộ GD&ĐT là học sinh quên tìm tập xác định hoặc quên điều kiện mẫu thức khác 0 dẫn đến nhận nhầm tiệm cận hoặc kết luận sai miền xác định.
   - Việc `machData.ts` bỏ sót điều kiện $Q(x) \ne 0$ và $px+q \ne 0$ trong phần Kiến thức nền tảng làm giảm giá trị sư phạm cốt lõi của học liệu số, vi phạm tiêu chí cam kết đạt 90–100 điểm.

3. **Về tính đồng bộ của dữ liệu cơ sở dữ liệu**:
   - Mặc dù `prisma/seed.js` đã sạch ký tự điều khiển (`\u000B`), cơ sở dữ liệu `prisma/dev.db` hiện hành vẫn chứa câu hỏi `Q38_D4_SA` với lỗi Unicode trong math mode. Điều này cần được đồng bộ triệt để để toàn bộ website không sinh ra bất kỳ cảnh báo console nào trong DevTools.

---

## 3. CAVEATS (CÁC VẤN ĐỀ CẦN LƯU Ý & GIỚI HẠN)

1. **Các mặt làm tốt của Worker M1 đã được kiểm chứng độc lập**:
   - Ký tự điều khiển ASCII `\u000B` (Vertical Tab do `\v` sinh ra) đã bị tiêu diệt 100% trong `prisma/seed.js` và `prisma/dev.db`.
   - Lệnh `npm run build` chạy thành công (Exit Code 0), biên dịch thành công 16/16 route tĩnh.
   - Toàn bộ 1.097 công thức trong `machData.ts` và 802 công thức trong `prisma/seed.js` đều không gặp lỗi cú pháp phân giải đóng/mở ngoặc `{}`.
2. **Quy định vai trò (Role Constraint)**:
   - Với vai trò Challenger (Critic/Specialist review-only), Challenger **không trực tiếp sửa mã nguồn**, mà lập danh sách lỗi chi tiết kèm giải pháp drop-in replacement để Worker M1 áp dụng chính xác.

---

## 4. CONCLUSION (KẾT LUẬN & PHÁN QUYẾT)

- **PHÁN QUYẾT CHÍNH THỨC**: ❌ **REJECT**
- **Lý do**: Tồn tại 7 lỗi cú pháp ký hiệu KaTeX hiển thị thô (`$iff`, `$min$`) và 3 phân dạng toán thiếu điều kiện miền xác định nghiêm ngặt trong `src/app/mindmap/machData.ts`.
- **Hành động khắc phục yêu cầu đối với Worker M1**:
  1. Thay thế 6 cụm `$iff` thành `$\iff$` tại dòng 658 và 676 trong `src/app/mindmap/machData.ts`.
  2. Thay thế `$min$` thành `$\min$` tại dòng 304 trong `src/app/mindmap/machData.ts`.
  3. Bổ sung điều kiện mẫu thức khác 0 $Q(x) \ne 0$ vào `DẠNG 4.1` và $px+q \ne 0$ ($D = \mathbb{R} \setminus \{-q/p\}$) vào `DẠNG 4.3` trong `src/app/mindmap/machData.ts`.
  4. Bổ sung điều kiện $\vec{v}_1, \vec{v}_2 \ne \vec{0}$ vào `DẠNG 10.1` trong `src/app/mindmap/machData.ts`.
  5. Sửa chuỗi `$y_{CĐ}$` thành `$y_{\text{CĐ}}$` trong `scripts/seed_deep_expansion.js` dòng 159 & 161 và cập nhật lại câu hỏi `Q38_D4_SA` trong SQLite.

---

## 5. VERIFICATION METHOD (HƯỚNG DẪN KIỂM CHỨNG ĐỘC LẬP)

Worker hoặc Orchestrator có thể xác thực lại toàn bộ các phát hiện trên bằng các lệnh thực thi độc lập sau:

1. **Kiểm tra phát hiện lỗi `$iff` và từ khóa KaTeX thiếu gạch chéo**:
   ```bash
   node scripts/adversarial_syntax_scan.js
   ```
   *Kỳ vọng sau khi sửa*: Output trả về `0 suspicious unescaped keywords`.

2. **Kiểm tra phát hiện lỗi `$min$` thiếu gạch chéo**:
   ```bash
   node scripts/adversarial_fn_scan.js
   ```
   *Kỳ vọng sau khi sửa*: Output trả về `0 math function checks`.

3. **Chạy toàn bộ Suite Kiểm thử Đối kháng**:
   ```bash
   node scripts/adversarial_katex_stress.js
   ```
   *Kỳ vọng sau khi sửa*: `FINAL ADVERSARIAL VERDICT: APPROVE` (Exit code 0).
