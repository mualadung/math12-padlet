# BẢN CÔNG BỐ HẠ TẦNG KIỂM THỬ SẴN SÀNG (TEST_READY.md)
## DỰ ÁN HỌC LIỆU SỐ ÔN TẬP TOÁN 12 TRÊN PADLET

---

## 1. Lệnh Thực thi Bộ Kiểm thử (Runner Command)

Toàn bộ hệ thống kiểm thử tự động của dự án được đóng gói thành một công cụ duy nhất, chạy độc lập trong môi trường Node.js:

```bash
node scripts/validate_all.js
```

### Các thông số vận hành:
- **Thời gian thực thi trung bình**: ~1.2 giây.
- **Mã thoát (Exit Code)**:
  - `0`: Tất cả 5 Tiers đạt 100% (Sẵn sàng nghiệm thu / phát hành).
  - `1`: Phát hiện ít nhất 1 lỗi vi phạm tiêu chuẩn (Kèm báo cáo chẩn đoán chi tiết đến từng mã câu/vị trí).
- **Môi trường yêu cầu**: Node.js v18+ (Đã xác minh hoạt động trơn tru trên Node.js v24.18.0 win32), Prisma SQLite Client (`@prisma/client`), TypeScript (`typescript`), KaTeX (`katex`).

---

## 2. Tổng quan Độ bao phủ 5 Tầng Kiểm thử (Test Suite Coverage)

| Tầng Kiểm thử | Phân hệ Đối tượng | Tiêu chuẩn Nghiệm thu | Số lượng Kiểm tra (Checks) | Trạng thái Baseline Ban đầu |
|:---:|:---:|---|:---:|:---:|
| **Tier 1: Question Count Check** | DB `/practice` & Sơ đồ `/mindmap` | - Mỗi dạng toán trong DB có $\ge 10$ câu hỏi.<br>- Mindmap có đúng 50 câu hỏi chia đều 10 chủ đề (5 câu/chủ đề).<br>- Khớp nối chính xác mã chủ đề `TOPIC_3_1`. | 19 | **FAIL** (8 lỗi: 7 dạng toán $<10$ câu, 1 lỗi ánh xạ Topic 10) |
| **Tier 2: Real-Exam Source Check** | DB `/practice` & Sơ đồ `/mindmap` | - 100% câu hỏi có định dạng `[Nguồn: ...]`.<br>- Nguồn xuất phát từ đề thi thật (Bộ GD&ĐT, Sở GD&ĐT, THPT Chuyên) kèm năm thi xác thực. | 105 | **FAIL** (105 lỗi: 100% câu hỏi chưa được đóng ngoặc `[Nguồn: ...]`) |
| **Tier 3: Duplication Check** | DB `/practice` $\leftrightarrow$ `/mindmap` | - 0% trùng lặp nội dung giữa `/practice` và `/mindmap`.<br>- 0% trùng lặp nội bộ trong từng phân hệ. | 2,750 | **FAIL** (15 lỗi: 15 câu hỏi bị trùng lặp nội dung giữa DB và Mindmap) |
| **Tier 4: KaTeX Syntax & Conditions** | Toàn bộ DB, Mindmap, MachData | - 0 ký tự điều khiển lạ (`\u000b`, `\f`, `\0`).<br>- 100% công thức render thành công qua `katex.renderToString({ throwOnError: true })`.<br>- Đầy đủ điều kiện toán học ($D$, $\ne 0$, $\ge 0$, $\vec{a} \ne \vec{0}$, $\vec{u} \cdot \vec{v} = 0$). | 1,059 | **PASS** (0 lỗi: 1,059 biểu thức toán học và kiểm tra điều kiện đều chuẩn mực) |
| **Tier 5: Dual Casio Calculator Guide** | Ngân hàng DB `/practice` | - 100% câu hỏi trong DB có hướng dẫn bấm máy chi tiết từng nút cho **CẢ HAI** dòng máy:<br>  + Casio fx-580VN X (MENU, TABLE, CALC...)<br>  + Casio fx-880BTG (HOME, CATALOG, TOOLS, OK...) | 55 | **FAIL** (54 lỗi: thiếu dòng máy 880 hoặc 580 hoặc thiếu thao tác nút) |

---

## 3. Kết quả Chạy Baseline Ban đầu (Initial Baseline Results)

Lần chạy đầu tiên lúc `2026-11-08T05:25:24.378Z` đã thiết lập chuẩn mốc đo lường (baseline) cho toàn bộ dự án:

```
================================================================================
                      BẢNG TỔNG KẾT KẾT QUẢ KIỂM THỬ E2E                       
================================================================================
| Tầng Kiểm Thử (Tier)                         | Trạng thái | Số mục kiểm tra | Số lỗi |
|----------------------------------------------|:----------:|:---------------:|:------:|
| Tier 1: Question Count Check                 |    FAIL    |              19 |      8 |
| Tier 2: Real-Exam Source Check               |    FAIL    |             105 |    105 |
| Tier 3: Duplication Check                    |    FAIL    |            2750 |     15 |
| Tier 4: KaTeX Syntax & Conditions Check      |    PASS    |            1059 |      0 |
| Tier 5: Dual Casio Calculator Guide Check    |    FAIL    |              55 |     54 |
================================================================================
 >>> KẾT QUẢ: PHÁT HIỆN LỖI CẦN KHẮC PHỤC THEO BÁO CÁO Ở TRÊN (EXIT CODE 1) <<< 
```

---

## 4. Hướng dẫn Dành cho các Agent Triển khai (Milestone Action Guide)

Kết quả baseline chỉ rõ chính xác các nhiệm vụ cần thực hiện trong từng Milestone tiếp theo:

1. **Dành cho Agent Milestone M1 (Phân loại dạng toán & KaTeX)**:
   - Mở rộng 37 phân dạng toán nhỏ cho Bài 1 đến Bài 8 SGK KNTT trong `machData.ts` và cơ sở dữ liệu `MathCategory`.
   - Giữ vững thành tích **100% PASS của Tier 4** khi thêm dữ liệu mới.
2. **Dành cho Agent Milestone M2 (Mindmap Real-Exam Questions)**:
   - Sửa khóa trong `src/app/mindmap/mindmapQuestions.ts`: đổi key `TOPIC_2_4` (hoặc bổ sung) thành `TOPIC_3_1` để khớp với Chủ đề 10 trong `machData.ts`.
   - Bao bọc toàn bộ trường `source` theo chuẩn `[Nguồn: Đề thi...]` để giải quyết 50 lỗi trong Tier 2.
   - Thay thế các câu hỏi bị trùng lặp với `/practice` bằng các câu hỏi đề thi thật độc lập để đưa Tier 3 về 0 lỗi.
3. **Dành cho Agent Milestone M3 (Practice Bank $\ge 10$/dạng & Dual Casio)**:
   - Bổ sung tối thiểu 10 câu hỏi đề thi thật cho mỗi dạng toán trong cơ sở dữ liệu SQLite (nâng tổng số câu hỏi từ 55 lên $\ge 70$ câu), giải quyết Tier 1.
   - Bao bọc toàn bộ trường `sourceExam` theo chuẩn `[Nguồn: ...]` để giải quyết 55 lỗi còn lại của Tier 2.
   - Bổ sung hướng dẫn bấm máy tính kép chi tiết từng nút cho cả **Casio fx-580VN X** và **Casio fx-880BTG** trong trường `casioGuide`, giải quyết 54 lỗi của Tier 5.
4. **Dành cho Agent Milestone M4 & Final**:
   - Chạy lại lệnh `node scripts/validate_all.js` sau mỗi lần seed/cập nhật dữ liệu để xác nhận chuyển toàn bộ bảng sang trạng thái **PASS (Exit Code 0)**.
