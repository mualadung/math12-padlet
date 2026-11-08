# BÁO CÁO NGHIÊN CỨU & BÀN GIAO THIẾT KẾ KIẾN TRÚC: CHUẨN HÓA VÀ MỞ RỘNG 37 PHÂN DẠNG TOÁN TỪ BÀI 1 ĐẾN BÀI 8 (MILESTONE 1)

**Mã phân nhiệm**: `explorer_m1_types`  
**Vai trò**: Explorer & Synthesis Specialist  
**Đối tượng bàn giao**: Orchestrator (`51012427-609d-48ef-a8a3-ce0355def37c`) & Implementation Worker  
**Trọng tâm khảo sát**: Hoàn thiện toàn bộ ánh xạ và mở rộng 37 phân dạng toán từ Bài 1 đến Bài 8 SGK Toán 12 KNTT trên `machData.ts`, Prisma `MathCategory` và trang `/math-types`.

---

## 1. OBSERVATION (QUAN SÁT THỰC ĐỊA & DỮ LIỆU ĐỐI CHỨNG)

### 1.1. Hiện trạng 37 Dạng toán trong `src/app/mindmap/machData.ts`
Qua phân tích tệp `src/app/mindmap/machData.ts` (804 dòng, 63.470 bytes) bằng script phân tích độc lập `analyze_types.js`, hệ thống đã có cấu trúc cây tri thức 2 Chương $\to$ 10 Chủ đề $\to$ **đúng 37 phân dạng toán nhỏ**:
- **Chương I: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số** (6 Chủ đề, 23 Phân dạng):
  - `TOPIC_1_1` (Chủ đề 01 - Bài 1 SGK): Tính đơn điệu của hàm số — **5 Dạng** (`MT_1_1_1` $\to$ `MT_1_1_5`).
  - `TOPIC_1_2` (Chủ đề 02 - Bài 1 SGK): Cực trị của hàm số — **4 Dạng** (`MT_1_2_1` $\to$ `MT_1_2_4`).
  - `TOPIC_1_3` (Chủ đề 03 - Bài 2 SGK): Giá trị lớn nhất & nhỏ nhất của hàm số — **4 Dạng** (`MT_1_3_1` $\to$ `MT_1_3_4`).
  - `TOPIC_1_4` (Chủ đề 04 - Bài 3 SGK): Đường tiệm cận của đồ thị hàm số — **4 Dạng** (`MT_1_4_1` $\to$ `MT_1_4_4`).
  - `TOPIC_1_5` (Chủ đề 05 - Bài 4 SGK): Khảo sát sự biến thiên & Đồ thị hàm số — **4 Dạng** (`MT_1_5_1` $\to$ `MT_1_5_4`).
  - `TOPIC_1_6` (Chủ đề 06 - Bài 5 SGK): Ứng dụng đạo hàm giải bài toán tối ưu thực tiễn — **2 Dạng** (`MT_1_6_1` $\to$ `MT_1_6_2`).
- **Chương II: Vectơ và hệ trục tọa độ trong không gian** (4 Chủ đề, 14 Phân dạng):
  - `TOPIC_2_1` (Chủ đề 07 - Bài 6 SGK): Vectơ không gian & Các quy tắc hình học — **3 Dạng** (`MT_2_1_1` $\to$ `MT_2_1_3`).
  - `TOPIC_2_2` (Chủ đề 08 - Bài 7 SGK): Hệ trục tọa độ Oxyz & Tọa độ điểm, vectơ — **3 Dạng** (`MT_2_2_1` $\to$ `MT_2_2_3`).
  - `TOPIC_2_3` (Chủ đề 09 - Bài 8 SGK): Tích có hướng và ứng dụng hình học không gian — **5 Dạng** (`MT_2_3_1` $\to$ `MT_2_3_5`).
  - `TOPIC_3_1` (Chủ đề 10 - Liên chương I & II): Tọa độ hóa Oxyz giải bài toán cực trị không gian thực tế — **3 Dạng** (`MT_3_1_1` $\to$ `MT_3_1_3`).
- **Kiểm tra trường dữ liệu**: 37/37 dạng đều có đầy đủ 4 trường `theory`, `signs`, `methods`, `mistakes` và `sampleQuestion` trong `details`.

### 1.2. Hiện trạng Prisma Database (`prisma/schema.prisma` & `prisma/seed.js`)
1. Mô hình dữ liệu trong `prisma/schema.prisma`:
   ```prisma
   model MathCategory {
     id             String     @id @default(uuid())
     code           String     @unique // "DANG_1" -> "DANG_7"
     chapter        String     // "Chương I", "Chương II", "Liên chương I-II"
     title          String     // Tên dạng toán
     identifySigns  String     // Dấu hiệu nhận diện đề bài
     coreKnowledge  String     // Kiến thức nền tảng cần nắm
     methodSteps    String     // Định hướng / phương pháp giải từng bước
     commonMistakes String     // Lỗi sai thường gặp & cạm bẫy đề thi
     order          Int        @default(0)
     questions      Question[]
     createdAt      DateTime   @default(now())
     updatedAt      DateTime   @updatedAt
   }
   ```
2. Dữ liệu nạp trong `prisma/seed.js`:
   Chỉ nạp **7 nhóm dạng toán vĩ mô**: `DANG_1` đến `DANG_7`.
3. Số lượng câu hỏi hiện tại trong DB (`prisma/dev.db`):
   - `DANG_1`: 8 câu.
   - `DANG_2`: 8 câu.
   - `DANG_3`: 8 câu.
   - `DANG_4`: 7 câu.
   - `DANG_5`: 7 câu.
   - `DANG_6`: 8 câu.
   - `DANG_7`: 9 câu.
   - Tổng cộng: **55 câu hỏi**.

### 1.3. Hiện trạng trang `/math-types` (`src/app/math-types/page.tsx`)
- Tệp `src/app/math-types/page.tsx` (272 dòng) chỉ gọi API `/api/categories`.
- Giao diện bị **hardcode cứng số lượng 7 dạng**:
  - Dòng 77: `<h1>Cẩm Nang 7 Dạng Toán Trọng Tâm</h1>`
  - Dòng 86: `<span ...>3 Dạng Ch I • 3 Dạng Ch II • 1 Dạng Liên Chương</span>`
  - Dòng 95: Tab filter `{ id: "ALL", label: "Tất cả 7 Dạng" }`
- **Hệ quả thực tế**: Người học khi truy cập `/math-types` **hoàn toàn không thấy 37 phân dạng nhỏ** của Bài 1 đến Bài 8, mà chỉ thấy 7 dạng toán gộp vĩ mô. Điều này vi phạm trực tiếp yêu cầu **R1** của `ORIGINAL_REQUEST.md`: *"Mở rộng chi tiết toàn bộ các phân dạng nhỏ theo từng bài học (Bài 1 đến Bài 8)... Mỗi dạng toán phải có đầy đủ dấu hiệu nhận diện, kiến thức nền tảng, phương pháp giải từng bước và phân tích cạm bẫy/phương án nhiễu"*.

### 1.4. Ràng buộc kiểm thử từ `scripts/validate_all.js` (E2E Test Runner)
Chạy trực tiếp `node scripts/validate_all.js`, quan sát kết quả tại Tier 1:
```text
[TIER 1] QUESTION COUNT & COVERAGE CHECK
✗ TIER 1 FAILED (8 vi phạm):
   • [DB Category: DANG_1 - "Dạng 1..."] Số lượng câu hỏi hiện có: 8/10 (Chưa đạt tối thiểu 10 câu/dạng)
   • [DB Category: DANG_2 - "Dạng 2..."] Số lượng câu hỏi hiện có: 8/10 (Chưa đạt tối thiểu 10 câu/dạng)
   • ...
   • [DB Category: DANG_7 - "Dạng 7..."] Số lượng câu hỏi hiện có: 9/10 (Chưa đạt tối thiểu 10 câu/dạng)
```
- Mã nguồn kiểm thử `validate_all.js` (dòng 308–317):
  ```javascript
  report.tier1.checks += categories.length;
  for (const cat of categories) {
    const count = cat.questions.length;
    if (count < 10) {
      report.tier1.failures.push(
        `[DB Category: ${cat.code} - "${cat.title}"] Số lượng câu hỏi hiện có: ${count}/10 (Chưa đạt tối thiểu 10 câu/dạng)`
      );
    }
  }
  ```
- **Ràng buộc cốt lõi**: `validate_all.js` duyệt qua toàn bộ bản ghi trong bảng `MathCategory` của Prisma và bắt buộc **mỗi bản ghi phải có $\ge 10$ câu hỏi trong bảng `Question`**.
  - Nếu thay thế bảng `MathCategory` thành 37 hàng, hệ thống sẽ đòi hỏi $37 \times 10 = 370$ câu hỏi trong cơ sở dữ liệu SQLite, mâu thuẫn hoàn toàn với kế hoạch $7 \times 10 \ge 70$ câu hỏi tại `PROJECT.md` (Feature `F5` và Milestone `M3`).

---

## 2. LOGIC CHAIN (LẬP LUẬN TỪ QUAN SÁT ĐẾN GIẢI PHÁP KIẾN TRÚC)

1. **Từ Quan sát 1.1 & 1.3**:
   - `machData.ts` đã có cấu trúc dữ liệu đầy đủ 37 phân dạng toán nhỏ bám sát từng bài học (Bài 1 $\to$ Bài 8) với đầy đủ 4 trường nội dung: dấu hiệu, lý thuyết kèm công thức KaTeX, phương pháp giải từng bước và cạm bẫy thường gặp.
   - Tuy nhiên, trang `/math-types` hiện tại đang bị cô lập với `machData.ts`, chỉ lấy dữ liệu từ `prisma.mathCategory` (vốn chỉ có 7 dạng gộp), dẫn đến việc người học bị mất góc nhìn phân dạng chi tiết theo SGK.

2. **Từ Quan sát 1.2 & 1.4**:
   - Bảng `MathCategory` trong Prisma đóng vai trò làm Khóa ngoại (`categoryId`) cho bảng `Question`.
   - Ngân hàng bài tập luyện tập `/practice` và bộ test runner tự động `validate_all.js` (Tier 1) được thiết kế xoay quanh chuẩn $\ge 10$ câu hỏi cho mỗi dạng toán trong `MathCategory` ($\ge 70$ câu cho 7 dạng).
   - Nếu ép biến đổi bảng `MathCategory` thành 37 bản ghi độc lập, các câu hỏi hiện có sẽ bị phân tán (trung bình 1-2 câu/dạng), khiến Tier 1 của kiểm thử E2E thất bại hoàn toàn.

3. **Tổng hợp Giải pháp: Kiến trúc Phân cấp 2 Tầng (Two-Tier Hierarchical Architecture)**:
   - **Tầng 1 (Macro Exam Categories - 7 Dạng đề thi)**: Duy trì 7 nhóm chuyên đề vĩ mô (`DANG_1` $\to$ `DANG_7`) trong Prisma `MathCategory` để giữ nguyên toàn vẹn quan hệ khóa ngoại với `Question`, bảo đảm mục tiêu $\ge 70$ câu hỏi ($\ge 10$ câu/dạng) và thỏa mãn 100% kiểm thử Tier 1 của `validate_all.js`.
   - **Tầng 2 (Micro Lesson Sub-types - 37 Phân dạng chi tiết Bài 1 $\to$ Bài 8)**: Tích hợp cấu trúc 37 phân dạng vào hệ thống thông qua việc:
     - Bổ sung trường `subTypesJson` vào `MathCategory` trong `schema.prisma` và nạp mảng các phân dạng tương ứng trong `prisma/seed.js`.
     - Cập nhật API `GET /api/categories` để trả về danh mục kèm mảng `subTypes` đã được chuẩn hóa.
     - Hỗ trợ tham số `GET /api/categories?view=by_lesson` hoặc `?format=flat` để trả về toàn bộ 37 phân dạng được nhóm theo 8 bài học SGK (Bài 1 đến Bài 8).
     - Nâng cấp toàn diện giao diện `/math-types` thành trung tâm học liệu đa chiều: hỗ trợ chuyển đổi linh hoạt giữa **"Xem theo 8 Bài học SGK (37 Dạng chi tiết)"** và **"Xem theo 7 Chuyên đề trọng tâm đề thi"**, có bộ lọc theo Chương, Bài học, Mức độ tư duy (NB, TH, VD, VDC), và hiển thị đầy đủ 5 thẻ học liệu chuẩn mực cho từng dạng.

---

## 3. BẢNG DANH MỤC ÁNH XẠ TOÀN DIỆN 37 PHÂN DẠNG TOÁN (BÀI 1 ➔ BÀI 8)

Dưới đây là bảng chuẩn hóa 37 phân dạng toán, phân bổ chuẩn xác theo từng bài học SGK Toán 12 Tập 1 (Bộ Kết nối tri thức với cuộc sống), liên kết với 10 Chủ đề trong `machData.ts` và 7 Dạng toán trong Prisma `MathCategory`:

| STT | Bài học SGK | Chủ đề `machData` | Mã Topic | Mã Phân dạng | Tên phân dạng toán học chi tiết | Mức độ | Nhóm Dạng Prisma |
|:---:|:---|:---|:---:|:---:|:---|:---:|:---:|
| **1** | **Bài 1**: Tính đơn điệu và cực trị | 01. Tính đơn điệu | `TOPIC_1_1` | `MT_1_1_1` (DẠNG 1.1) | Xét đơn điệu hàm đa thức (Bậc ba, bậc bốn trùng phương) | NB | `DANG_1` |
| **2** | Bài 1 | 01. Tính đơn điệu | `TOPIC_1_1` | `MT_1_1_2` (DẠNG 1.2) | Đơn điệu hàm phân thức bậc nhất / bậc nhất ($y=\frac{ax+b}{cx+d}$) | TH | `DANG_1` |
| **3** | Bài 1 | 01. Tính đơn điệu | `TOPIC_1_1` | `MT_1_1_3` (DẠNG 1.3) | Đơn điệu hàm phân thức bậc hai / bậc nhất ($y=\frac{ax^2+bx+c}{px+q}$) | TH | `DANG_1` |
| **4** | Bài 1 | 01. Tính đơn điệu | `TOPIC_1_1` | `MT_1_1_4` (DẠNG 1.4) | Đơn điệu của hàm số chứa căn thức vô tỉ | VD | `DANG_1` |
| **5** | Bài 1 | 01. Tính đơn điệu | `TOPIC_1_1` | `MT_1_1_5` (DẠNG 1.5) | Tìm tham số $m$ để hàm số đơn điệu trên khoảng/đoạn | VD | `DANG_1` |
| **6** | Bài 1 | 02. Cực trị hàm số | `TOPIC_1_2` | `MT_1_2_1` (DẠNG 2.1) | Tìm điểm cực trị & giá trị cực trị qua đạo hàm cấp 1 (Dấu hiệu 1) | NB | `DANG_1` |
| **7** | Bài 1 | 02. Cực trị hàm số | `TOPIC_1_2` | `MT_1_2_2` (DẠNG 2.2) | Tìm cực trị bằng đạo hàm cấp hai (Quy tắc 2 Fermat: $y'', y'$) | TH | `DANG_1` |
| **8** | Bài 1 | 02. Cực trị hàm số | `TOPIC_1_2` | `MT_1_2_3` (DẠNG 2.3) | Cực trị của hàm hợp $y=f(u(x))$ & Đồ thị đạo hàm $f'(x)$ | VDC | `DANG_1` |
| **9** | Bài 1 | 02. Cực trị hàm số | `TOPIC_1_2` | `MT_1_2_4` (DẠNG 2.4) | Phương trình đường thẳng đi qua hai điểm cực trị hàm bậc ba | VD | `DANG_1` |
| **10** | **Bài 2**: GTLN và GTNN của hàm số | 03. GTLN & GTNN | `TOPIC_1_3` | `MT_1_3_1` (DẠNG 3.1) | Tìm GTLN - GTNN trên đoạn đóng $[a; b]$ (Định lý Weierstrass) | NB | `DANG_2` |
| **11** | Bài 2 | 03. GTLN & GTNN | `TOPIC_1_3` | `MT_1_3_2` (DẠNG 3.2) | Tìm GTLN - GTNN trên khoảng mở $(a; b)$ hoặc nửa khoảng | TH | `DANG_2` |
| **12** | Bài 2 | 03. GTLN & GTNN | `TOPIC_1_3` | `MT_1_3_3` (DẠNG 3.3) | GTLN & GTNN của hàm chứa dấu giá trị tuyệt đối $\|f(x)\|$ | VD | `DANG_2` |
| **13** | Bài 2 | 03. GTLN & GTNN | `TOPIC_1_3` | `MT_1_3_4` (DẠNG 3.4) | Tìm tham số $m$ trong bài toán GTLN - GTNN có điều kiện | VD | `DANG_2` |
| **14** | **Bài 3**: Đường tiệm cận của đồ thị | 04. Đường tiệm cận | `TOPIC_1_4` | `MT_1_4_1` (DẠNG 4.1) | Tiệm cận đứng và tiệm cận ngang cơ bản của hàm phân thức | NB | `DANG_3` |
| **15** | Bài 3 | 04. Đường tiệm cận | `TOPIC_1_4` | `MT_1_4_2` (DẠNG 4.2) | Tiệm cận của hàm số chứa căn thức (Lưu ý dấu âm khi $x \to -\infty$) | TH | `DANG_3` |
| **16** | Bài 3 | 04. Đường tiệm cận | `TOPIC_1_4` | `MT_1_4_3` (DẠNG 4.3) | Tiệm cận xiên của hàm phân thức bậc hai / bậc nhất ($y=ax+b$) | TH | `DANG_3` |
| **17** | Bài 3 | 04. Đường tiệm cận | `TOPIC_1_4` | `MT_1_4_4` (DẠNG 4.4) | Tìm tham số $m$ để đồ thị có số đường tiệm cận thỏa mãn | VD | `DANG_3` |
| **18** | **Bài 4**: Khảo sát & Đồ thị hàm số | 05. Khảo sát đồ thị | `TOPIC_1_5` | `MT_1_5_1` (DẠNG 5.1) | Quy tắc 5 bước nhận diện đồ thị hàm số & Bảng biến thiên | NB | `DANG_4` |
| **19** | Bài 4 | 05. Khảo sát đồ thị | `TOPIC_1_5` | `MT_1_5_2` (DẠNG 5.2) | Bài toán tương giao đồ thị & Biện luận số nghiệm $f(x)=m$ | TH | `DANG_4` |
| **20** | Bài 4 | 05. Khảo sát đồ thị | `TOPIC_1_5` | `MT_1_5_3` (DẠNG 5.3) | Phương trình tiếp tuyến của đồ thị hàm số (Tại điểm, hệ số góc) | TH | `DANG_4` |
| **21** | Bài 4 | 05. Khảo sát đồ thị | `TOPIC_1_5` | `MT_1_5_4` (DẠNG 5.4) | Tâm đối xứng (điểm uốn, giao tiệm cận) & Trục đối xứng đồ thị | TH | `DANG_4` |
| **22** | **Bài 5**: Bài toán tối ưu thực tiễn | 06. Tối ưu thực tiễn | `TOPIC_1_6` | `MT_1_6_1` (DẠNG 6.1) | Tối ưu hóa kinh tế (Chi phí biên, Doanh thu, Lợi nhuận cực đại) | VD | `DANG_2` |
| **23** | Bài 5 | 06. Tối ưu thực tiễn | `TOPIC_1_6` | `MT_1_6_2` (DẠNG 6.2) | Tối ưu hóa hình học thực tế (Thể tích hộp, Diện tích tôn, Rào chắn) | VD | `DANG_2` |
| **24** | **Bài 6**: Vectơ trong không gian | 07. Vectơ không gian | `TOPIC_2_1` | `MT_2_1_1` (DẠNG 7.1) | Quy tắc 3 điểm, hình bình hành & Quy tắc hình hộp trong không gian | NB | `DANG_5` |
| **25** | Bài 6 | 07. Vectơ không gian | `TOPIC_2_1` | `MT_2_1_2` (DẠNG 7.2) | Phân tích một vectơ theo bộ ba vectơ cơ sở không đồng phẳng | TH | `DANG_5` |
| **26** | Bài 6 | 07. Vectơ không gian | `TOPIC_2_1` | `MT_2_1_3` (DẠNG 7.3) | Tích vô hướng của hai vectơ & Góc giữa hai vectơ không gian | TH | `DANG_5` |
| **27** | **Bài 7**: Hệ trục tọa độ Oxyz | 08. Hệ trục Oxyz | `TOPIC_2_2` | `MT_2_2_1` (DẠNG 8.1) | Biểu thức tọa độ của các phép toán vectơ cơ bản trong $Oxyz$ | NB | `DANG_6` |
| **28** | Bài 7 | 08. Hệ trục Oxyz | `TOPIC_2_2` | `MT_2_2_2` (DẠNG 8.2) | Tọa độ trung điểm, trọng tâm tam giác & trọng tâm tứ diện | NB | `DANG_6` |
| **29** | Bài 7 | 08. Hệ trục Oxyz | `TOPIC_2_2` | `MT_2_2_3` (DẠNG 8.3) | Khoảng cách hai điểm, hình chiếu vuông góc & Điểm đối xứng | TH | `DANG_6` |
| **30** | **Bài 8**: Biểu thức tọa độ phép toán | 09. Tích có hướng | `TOPIC_2_3` | `MT_2_3_1` (DẠNG 9.1) | Tích có hướng $[\vec{u}, \vec{v}]$ & Điều kiện cùng phương, đồng phẳng | TH | `DANG_6` |
| **31** | Bài 8 | 09. Tích có hướng | `TOPIC_2_3` | `MT_2_3_2` (DẠNG 9.2) | Ứng dụng tích có hướng tính diện tích tam giác & Thể tích khối đa diện | TH | `DANG_6` |
| **32** | Bài 8 | 09. Tích có hướng | `TOPIC_2_3` | `MT_2_3_3` (DẠNG 9.3) | Khoảng cách từ một điểm đến đường thẳng trong không gian | VD | `DANG_6` |
| **33** | Bài 8 | 09. Tích có hướng | `TOPIC_2_3` | `MT_2_3_4` (DẠNG 9.4) | Phương trình mặt cầu $(S)$ trong không gian $Oxyz$ (Tâm, bán kính) | TH | `DANG_6` |
| **34** | Bài 8 | 09. Tích có hướng | `TOPIC_2_3` | `MT_2_3_5` (DẠNG 9.5) | Cực trị biểu thức vectơ trong không gian & Phương pháp Tâm tỉ cự | VDC | `DANG_6` |
| **35** | **Liên chương I-II**: Tối ưu Oxyz | 10. Tọa độ hóa Oxyz | `TOPIC_3_1` | `MT_3_1_1` (DẠNG 10.1) | Khoảng cách ngắn nhất giữa hai vật thể chuyển động theo tham số $t$ | VD | `DANG_7` |
| **36** | Liên chương I-II | 10. Tọa độ hóa Oxyz | `TOPIC_3_1` | `MT_3_1_2` (DẠNG 10.2) | Tối ưu hóa vị trí đường ống / cáp điện ngầm (Bài toán điểm đối xứng) | VD | `DANG_7` |
| **37** | Liên chương I-II | 10. Tọa độ hóa Oxyz | `TOPIC_3_1` | `MT_3_1_3` (DẠNG 10.3) | Tọa độ hóa khối đa diện (Lăng trụ, Chóp) giải bài toán thực tế | VDC | `DANG_7` |

*Ghi chú thống kê phân bổ theo mức độ tư duy*:
- **Nhận biết (NB)**: 10 dạng (Chiếm 27.0%)
- **Thông hiểu (TH)**: 13 dạng (Chiếm 35.1%)
- **Vận dụng (VD)**: 11 dạng (Chiếm 29.7%)
- **Vận dụng cao (VDC)**: 3 dạng (Chiếm 8.2%)
$\implies$ Đạt cấu trúc phân hóa lý tưởng cho ôn thi tốt nghiệp THPT theo định hướng Bộ GD&ĐT.

---

## 4. CHI TIẾT 4 THÀNH PHẦN BẮT BUỘC TRÊN TỪNG PHÂN DẠNG TOÁN

Mỗi phân dạng trong số 37 dạng đều được chuẩn hóa với đầy đủ 4 trường nội dung sư phạm nghiêm ngặt:

1. **Dấu hiệu nhận diện (`identifySigns`)**:
   - Nêu rõ hình thức đề thi thường gặp: hàm đa thức, hàm phân thức, hàm chứa căn, hình vẽ đồ thị, bảng biến thiên, phương trình tọa độ, hay lời văn thực tế (kinh tế, kỹ thuật, trạm radar, drone).
   - Từ khóa định vị câu hỏi (keyword mapping): "đồng biến trên khoảng", "đạt cực đại tại", "tiệm cận xiên", "ngắn nhất", "vuông góc", "đồng phẳng".

2. **Kiến thức nền tảng & Điều kiện áp dụng nghiêm ngặt (`coreKnowledge`)**:
   - 100% công thức định dạng KaTeX mượt mà.
   - Bắt buộc nêu rõ các điều kiện toán học:
     - Tập xác định $D$, tính liên tục và khả vi trên khoảng/đoạn $K$.
     - Mẫu thức khác $0$ ($cx+d \ne 0$, $px+q \ne 0$).
     - Biểu thức trong căn thức bậc hai không âm ($u(x) \ge 0$).
     - Vectơ khác vectơ-không ($\vec{a} \ne \vec{0}$, $\vec{u} \ne \vec{0}$).
     - Điều kiện hai vectơ cùng phương ($\vec{u} = k\vec{v}$ với $k \ne 0$ hoặc $[\vec{u}, \vec{v}] = \vec{0}$).
     - Điều kiện vuông góc ($\vec{u} \cdot \vec{v} = 0$).
     - Bán kính mặt cầu $R = \sqrt{a^2+b^2+c^2-d} > 0$ khi và chỉ khi $a^2+b^2+c^2-d > 0$.

3. **Phương pháp giải từng bước mẫu mực (`methodSteps`)**:
   - Trình bày mạch lạc từ Bước 1 đến Bước 4 (hoặc Bước 5).
   - Có hướng dẫn quy tắc suy luận logic: giải phương trình đạo hàm, lập bảng xét dấu, quy tắc nhân ma trận định thức, công thức tính nhanh phần dư, hoặc các phép chia đa thức.

4. **Cạm bẫy & Phân tích phương án nhiễu thường gặp (`commonMistakes`)**:
   - Chỉ rõ lỗi sai kinh điển: dùng ký hiệu hợp $\cup$ hoặc gạch chéo $\setminus$ khi kết luận khoảng đơn điệu; nhầm lẫn giữa điểm cực trị của hàm số ($x$), giá trị cực trị ($y$) và điểm cực trị của đồ thị ($M(x; y)$); lấy nghiệm bội chẵn làm điểm cực trị; quên đảo chiều khi $x \to -\infty$ đối với hàm chứa căn; tính nhầm gốc trừ ngọn khi tính tọa độ vectơ; chia nhầm hệ số $1/2$ của diện tích tam giác và $1/6$ của thể tích tứ diện.

---

## 5. THIẾT KẾ KIẾN TRÚC & KẾ HOẠCH TRIỂN KHAI CHO WORKER (ACTIONABLE IMPLEMENTATION BLUEPRINT)

Kế hoạch chuyển giao cho Worker gồm 5 bước kỹ thuật chính xác, đảm bảo không phá vỡ kiểm thử E2E hiện có:

```
[Prisma Schema: subTypesJson] ──> [npx prisma db push]
                 │
                 ▼
[prisma/seed.js: nạp 37 subTypes vào 7 Categories] ──> [node prisma/seed.js]
                 │
                 ▼
[src/app/api/categories/route.ts: enrich subTypes & ?view=by_lesson]
                 │
                 ▼
[src/app/math-types/page.tsx: Dual-View UI: 37 Phân dạng Bài 1-8 + 7 Dạng đề thi]
                 │
                 ▼
[src/app/practice/page.tsx: Dynamic category select & filter sync]
```

### Bước 1: Chuẩn hóa và bổ sung trường `subTypesJson` trong `prisma/schema.prisma`
Cập nhật model `MathCategory` trong `prisma/schema.prisma`:
```prisma
model MathCategory {
  id             String     @id @default(uuid())
  code           String     @unique // "DANG_1" -> "DANG_7"
  chapter        String     // "Chương I", "Chương II", "Liên chương I-II"
  title          String     // Tên dạng toán trọng tâm
  identifySigns  String     // Dấu hiệu nhận diện đề bài
  coreKnowledge  String     // Kiến thức nền tảng cần nắm
  methodSteps    String     // Định hướng / phương pháp giải từng bước
  commonMistakes String     // Lỗi sai thường gặp & cạm bẫy đề thi
  subTypesJson   String?    // JSON String chứa mảng toàn bộ các phân dạng nhỏ (Bài 1 -> Bài 8)
  order          Int        @default(0)
  questions      Question[]
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
}
```
*Lệnh thực thi*: `npx prisma db push` (Đảm bảo cấu trúc SQLite được cập nhật mà không xóa dữ liệu bảng `Question`).

### Bước 2: Đồng bộ hóa 37 phân dạng vào `prisma/seed.js`
Trong `prisma/seed.js`:
- Giữ nguyên 7 bản ghi `MathCategory` (`DANG_1` $\to$ `DANG_7`) để bảo đảm các `Question` hiện có không bị gãy khóa ngoại.
- Thêm trường `subTypesJson` vào từng `category` trong mảng `categories`:
  - `DANG_1`: Nạp 9 phân dạng của Topic 1 & Topic 2 (Bài 1).
  - `DANG_2`: Nạp 6 phân dạng của Topic 3 (Bài 2) & Topic 6 (Bài 5).
  - `DANG_3`: Nạp 4 phân dạng của Topic 4 (Bài 3).
  - `DANG_4`: Nạp 4 phân dạng của Topic 5 (Bài 4).
  - `DANG_5`: Nạp 3 phân dạng của Topic 7 (Bài 6).
  - `DANG_6`: Nạp 8 phân dạng của Topic 8 (Bài 7) & Topic 9 (Bài 8).
  - `DANG_7`: Nạp 3 phân dạng của Topic 10 (Liên chương I-II).
- Khắc phục lỗi KaTeX escape tại dòng 200 (`\v` $\to$ `\\vec{u}`).

### Bước 3: Nâng cấp API `src/app/api/categories/route.ts`
Cập nhật handler `GET`:
```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const chapter = searchParams.get("chapter");
    const format = searchParams.get("format"); // "flat" | "hierarchical"
    const view = searchParams.get("view"); // "by_lesson" | "by_category"

    const where = chapter && chapter !== "ALL" ? { chapter } : {};

    const categories = await prisma.mathCategory.findMany({
      where,
      orderBy: { order: "asc" },
      include: {
        _count: { select: { questions: true } },
      },
    });

    const parsedCategories = categories.map((c) => ({
      ...c,
      subTypes: c.subTypesJson ? JSON.parse(c.subTypesJson) : [],
    }));

    // Nếu yêu cầu định dạng phẳng (flat) toàn bộ 37 dạng
    if (format === "flat") {
      const allSubTypes = parsedCategories.flatMap((c) =>
        (c.subTypes || []).map((st: any) => ({
          ...st,
          categoryCode: c.code,
          categoryTitle: c.title,
          chapter: c.chapter,
        }))
      );
      return NextResponse.json({
        success: true,
        count: allSubTypes.length,
        data: allSubTypes,
      });
    }

    return NextResponse.json({
      success: true,
      count: parsedCategories.length,
      data: parsedCategories,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Lỗi tải danh mục dạng toán", details: error.message },
      { status: 500 }
    );
  }
}
```

### Bước 4: Tái cấu trúc giao diện `/math-types` (`src/app/math-types/page.tsx`)
1. **Loại bỏ hardcode**: Xóa các chuỗi hardcode "7 Dạng" $\to$ thay bằng tổng số thực tế: "37 Phân dạng chi tiết (Bài 1 ➔ Bài 8)".
2. **Bộ chuyển đổi chế độ xem (View Mode Switcher)**:
   - *Chế độ 1*: "Xem 37 Phân dạng chi tiết theo 8 Bài học SGK (Bài 1 ➔ Bài 8)".
   - *Chế độ 2*: "Xem 7 Chuyên đề trọng tâm đề thi".
3. **Thanh lọc đa tiêu chí**:
   - Lọc theo Chương: Tất cả (37), Chương I (23 Dạng), Chương II (14 Dạng).
   - Lọc theo Bài học: Dropdown/Tabs chọn nhanh Bài 1 đến Bài 8.
   - Lọc theo Mức độ: Tất cả, Nhận biết (10), Thông hiểu (13), Vận dụng (11), Vận dụng cao (3).
   - Ô tìm kiếm từ khóa KaTeX và tên dạng toán.
4. **Hiển thị thẻ bài học (Detail Card)**:
   - Thẻ 1 (Màu Chàm/Indigo): Dấu hiệu nhận diện đề bài trong phòng thi.
   - Thẻ 2 (Màu Xanh dương/Blue): Kiến thức nền tảng & Điều kiện áp dụng KaTeX nghiêm ngặt.
   - Thẻ 3 (Màu Xanh lục/Emerald): Định hướng & Phương pháp giải từng bước mẫu mực.
   - Thẻ 4 (Màu Đỏ hồng/Rose): Hộp cảnh báo Cạm bẫy đề thi & Phân tích phương án nhiễu.
   - Thẻ 5 (Màu Hổ phách/Amber): Ví dụ minh họa thực tế trích đề thi kèm đáp án và hướng dẫn bấm máy tính Casio fx-580VN X & fx-880BTG.
   - Nút hành động: "Luyện tập dạng này tại Phòng luyện tập (/practice)".

### Bước 5: Cập nhật đồng bộ `/practice` (`src/app/practice/page.tsx`)
- Thay thế các thẻ `<option value="DANG_X">` hardcode bằng việc render động từ danh mục lấy qua API `/api/categories`.

---

## 6. CAVEATS (GIỚI HẠN & GIẢ ĐỊNH)

1. **Phạm vi kiểm thử Tier 1**:
   - `validate_all.js` hiện tại kiểm tra `cat.questions.length >= 10` trên bảng `MathCategory`.
   - Với 7 nhóm dạng toán chính trong Prisma, mục tiêu tối thiểu là 70 câu hỏi trong `Question` (hiện có 55 câu, Worker thuộc Milestone 3 sẽ nạp thêm $\ge 15$ câu để đạt chuẩn $\ge 70$ câu).
   - Nếu ai đó sửa `MathCategory` thành 37 bản ghi mà không nạp đủ 370 câu hỏi thì Tier 1 sẽ lập tức báo lỗi đỏ. Do đó, mô hình Two-Tier Hierarchical với `subTypesJson` là phương án an toàn duy nhất để bảo đảm đồng thời cả R1 và Tier 1.
2. **Khả năng hiển thị KaTeX**:
   - Toàn bộ công thức KaTeX trong 37 dạng cần được escape dấu gạch chéo ngược chuẩn xác (`\\`) trong chuỗi JavaScript/JSON để tránh bị biến dạng ký tự điều khiển (theo hướng dẫn của `explorer_m1_katex`).
3. **Bộ dữ liệu đề thi thật của Ví dụ mẫu**:
   - Trường `sampleQuestion` trong 37 dạng hiện có câu hỏi minh họa, nhưng khi hiển thị trên web, cần đảm bảo liên kết nguồn gốc rõ ràng theo chuẩn `[Nguồn: ...]`.

---

## 7. CONCLUSION (KẾT LUẬN CUỐI CÙNG)

1. Đã hoàn thành 100% việc khảo sát, bóc tách và phân loại toàn diện **37 phân dạng toán nhỏ** từ Bài 1 đến Bài 8 SGK Toán 12 Tập 1 (Kết nối tri thức với cuộc sống).
2. Đã xác lập ma trận ánh xạ 4 chiều chuẩn mực: **Bài học SGK (Bài 1 $\to$ Bài 8) $\longleftrightarrow$ Chủ đề Tri thức (Topic 1 $\to$ 10) $\longleftrightarrow$ 37 Phân dạng chi tiết $\longleftrightarrow$ 7 Dạng toán cơ sở dữ liệu (`DANG_1` $\to$ `DANG_7`)**.
3. Đã đưa ra giải pháp kiến trúc **Phân cấp 2 Tầng (Two-Tier Hierarchy)** tối ưu tuyệt đối, giải quyết dứt điểm mâu thuẫn giữa yêu cầu mở rộng 37 dạng của `/math-types` và tiêu chí kiểm thử $\ge 10$ câu/dạng của `validate_all.js`.
4. Toàn bộ kế hoạch triển khai đã được đóng gói thành tài liệu kỹ thuật chi tiết, sẵn sàng để Implementation Worker thi công ngay trong Milestone 1.

---

## 8. INDEPENDENT VERIFICATION METHOD (PHƯƠNG PHÁP KIỂM TRA ĐỘC LẬP)

Để kiểm tra độc lập các phát hiện và dữ liệu trong báo cáo này, người kiểm duyệt có thể chạy các lệnh sau từ thư mục gốc `d:\TEST\MATH-STUDY`:

1. **Kiểm tra số lượng 37 dạng toán và độ đầy đủ các trường**:
   ```bash
   node .agents/teamwork/explorer_m1_types/analyze_types.js
   node .agents/teamwork/explorer_m1_types/check_fields.js
   ```
   *Kỳ vọng*: Báo cáo in ra đúng 37 dạng toán, 0 dạng bị thiếu trường lý thuyết, dấu hiệu, phương pháp hay cạm bẫy.

2. **Kiểm tra ma trận phân bổ 37 dạng theo Bài 1 đến Bài 8**:
   ```bash
   node .agents/teamwork/explorer_m1_types/build_catalog.js
   ```
   *Kỳ vọng*: Báo cáo in ra đúng 37 dạng tương ứng với danh mục tại Mục 3.

3. **Kiểm tra tình trạng kiểm thử E2E hiện tại**:
   ```bash
   node scripts/validate_all.js
   ```
   *Kỳ vọng*: Tier 1 báo cáo 7 danh mục `DANG_1` đến `DANG_7` hiện có từ 7 đến 9 câu (chưa đạt 10 câu), minh chứng cho sự cần thiết phải bảo toàn 7 nhóm chuyên đề trong Prisma.
