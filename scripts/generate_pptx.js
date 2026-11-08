const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

async function createSlideDeck() {
  console.log("-> Đang khởi tạo Slide Thuyết Trình: Slide_Thuyet_Trinh_Padlet_Toan12.pptx...");
  const pres = new pptxgen();

  pres.layout = "LAYOUT_16x9";
  pres.title = "Báo Cáo Dự Án Học Liệu Số Toán 12 - Nhóm 5";
  pres.company = "Lớp 12A1 - THPT Chuyên";

  // SLIDE 1: BÌA CHÍNH
  let slide1 = pres.addSlide();
  slide1.background = { color: "0F172A" }; // Slate 900
  slide1.addText("DỰ ÁN XÂY DỰNG HỌC LIỆU SỐ ÔN TẬP TOÁN 12 TRÊN PADLET", {
    x: 0.8,
    y: 1.2,
    w: 8.4,
    h: 1.2,
    fontSize: 26,
    bold: true,
    color: "38BDF8", // Sky blue
    align: "left",
  });
  slide1.addText("CHỦ ĐỀ: TÍCH HỢP CHƯƠNG I (ĐẠO HÀM) & CHƯƠNG II (VECTƠ, TỌA ĐỘ OXYZ)\nSGK TOÁN 12 (TẬP 1) - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG", {
    x: 0.8,
    y: 2.5,
    w: 8.4,
    h: 0.9,
    fontSize: 15,
    color: "E2E8F0",
    align: "left",
  });
  slide1.addText("• Nhóm thực hiện: Nhóm 5 (Huy, Q.Anh, Tiến, Yến, T.Thảo) • Lớp: 12A1\n• Mục tiêu chất lượng: Khung 90 - 100 điểm (+2.0 điểm thường xuyên/thành viên)\n• Hạn nộp Padlet: 23:59 Chủ nhật tuần 10 (15/11/2026)", {
    x: 0.8,
    y: 4.2,
    w: 8.4,
    h: 1.1,
    fontSize: 12,
    color: "94A3B8",
    align: "left",
  });

  // SLIDE 2: MỤC TIÊU DỰ ÁN & VAI TRÒ HỌC LIỆU
  let slide2 = pres.addSlide();
  slide2.background = { color: "F8FAFC" };
  slide2.addText("I. MỤC TIÊU DỰ ÁN VÀ ĐỊNH HƯỚNG CHẤT LƯỢNG CAO NHẤT", {
    x: 0.8,
    y: 0.6,
    w: 8.4,
    h: 0.6,
    fontSize: 20,
    bold: true,
    color: "1E3A8A",
  });
  slide2.addText([
    { text: "1. Hệ thống hóa kiến thức logic: ", options: { bold: true, color: "1E3A8A" } },
    { text: "Không chỉ chép công thức mà làm rõ mối liên hệ giữa Đạo hàm (khảo sát biến thiên) và Hình học không gian Oxyz (tối ưu hóa khoảng cách, cực trị thực tế).\n\n" },
    { text: "2. Chuẩn hóa 100% công thức KaTeX & Điều kiện: ", options: { bold: true, color: "1E3A8A" } },
    { text: "Bắt buộc có tập xác định, điều kiện khả vi, mẫu khác 0, vecto khác vecto-0, điều kiện đồng phẳng.\n\n" },
    { text: "3. Ngân hàng câu hỏi chuẩn nguồn 100%: ", options: { bold: true, color: "1E3A8A" } },
    { text: "Trích từ Đề chính thức Bộ GD&ĐT 2024, Đề tham khảo 2025, Sở GD&ĐT Hà Nội, Nam Định, Nghệ An và các trường chuyên.\n\n" },
    { text: "4. Đầy đủ 3 định dạng thi mới: ", options: { bold: true, color: "1E3A8A" } },
    { text: "Trắc nghiệm 4 lựa chọn, Trắc nghiệm Đúng/Sai (4 ý a,b,c,d) và Trắc nghiệm Trả lời ngắn." },
  ], {
    x: 0.8,
    y: 1.5,
    w: 8.4,
    h: 4.5,
    fontSize: 13,
    color: "334155",
  });

  // SLIDE 3: PHÂN CÔNG 5 THÀNH VIÊN
  let slide3 = pres.addSlide();
  slide3.background = { color: "F8FAFC" };
  slide3.addText("II. PHÂN CÔNG 5 THÀNH VIÊN & LỊCH TRÌNH 07/11 - 15/11/2026", {
    x: 0.8,
    y: 0.6,
    w: 8.4,
    h: 0.6,
    fontSize: 20,
    bold: true,
    color: "1E3A8A",
  });
  slide3.addTable([
    ["Thành viên", "Vai trò đảm nhiệm", "Sản phẩm nộp", "Hạn chót", "Kiểm tra chéo"],
    ["Huy (Trưởng nhóm)", "Vai trò 1 & 6: Điều phối, Web App, Padlet, Video", "Web App, Kế hoạch, Video MP4", "14/11", "Tự điều phối & Nhóm"],
    ["Q.Anh", "Vai trò 2: Hệ thống hóa kiến thức & Mindmap", "Sơ đồ tư duy KaTeX, 10 công thức", "09/11", "Tiến kiểm tra chéo"],
    ["Tiến", "Vai trò 3: Phân loại 7 Dạng toán & Cạm bẫy", "Cẩm nang 7 dạng toán, bảng bẫy sai", "10/11", "Q.Anh kiểm tra chéo"],
    ["Yến", "Vai trò 4: Ngân hàng câu hỏi chuẩn nguồn", "41 câu hỏi 100% nguồn thật", "11/11", "T.Thảo kiểm tra chéo"],
    ["T.Thảo", "Vai trò 5: Lời giải chi tiết, Casio & Phân tích bẫy", "Lời giải KaTeX, Casio fx-580", "12/11", "Yến kiểm tra chéo"],
  ], {
    x: 0.8,
    y: 1.5,
    w: 8.4,
    h: 4.2,
    fontSize: 11,
    colW: [1.6, 2.5, 2.1, 0.9, 1.3],
    border: { pt: 1, color: "CBD5E1" },
    fill: "FFFFFF",
  });

  // SLIDE 4: KIẾN TRÚC KỸ THUẬT FULL-STACK
  let slide4 = pres.addSlide();
  slide4.background = { color: "F8FAFC" };
  slide4.addText("III. ĐỘT PHÁ CÔNG NGHỆ: HỆ SINH THÁI FULL-STACK WEB APP", {
    x: 0.8,
    y: 0.6,
    w: 8.4,
    h: 0.6,
    fontSize: 20,
    bold: true,
    color: "1E3A8A",
  });
  slide4.addText([
    { text: "• Google Antigravity & Next.js 14 App Router: ", options: { bold: true, color: "2563EB" } },
    { text: "Xây dựng web app responsive mượt mà trên cả máy tính và điện thoại thông minh của bạn học.\n\n" },
    { text: "• KaTeX Engine: ", options: { bold: true, color: "2563EB" } },
    { text: "Hiển thị công thức Toán học chuẩn LaTeX sắc nét tuyệt đối, không vỡ hạt, tải tức thì.\n\n" },
    { text: "• GeoGebra 3D Calculator Embed: ", options: { bold: true, color: "2563EB" } },
    { text: "Tích hợp mô hình không gian trực quan cho phép xoay 360 độ hệ tọa độ Oxyz.\n\n" },
    { text: "• Prisma ORM & Database: ", options: { bold: true, color: "2563EB" } },
    { text: "Lưu trữ 41 câu hỏi, chấm điểm trắc nghiệm tự động, tiếp nhận góp ý thời gian thực và quản trị 20 phiếu chấm chéo.\n\n" },
    { text: "• Tích hợp Padlet: ", options: { bold: true, color: "2563EB" } },
    { text: "Cấu trúc 6 cột logic, dễ tìm, dễ đọc, tương tác hai chiều giữa các nhóm trong lớp." },
  ], {
    x: 0.8,
    y: 1.5,
    w: 8.4,
    h: 4.5,
    fontSize: 13,
    color: "334155",
  });

  // SLIDE 5: PHÂN HỆ 1 - SƠ ĐỒ TƯ DUY
  let slide5 = pres.addSlide();
  slide5.background = { color: "F8FAFC" };
  slide5.addText("IV. PHÂN HỆ 1: SƠ ĐỒ TƯ DUY & HỆ THỐNG HÓA KIẾN THỨC", {
    x: 0.8,
    y: 0.6,
    w: 8.4,
    h: 0.6,
    fontSize: 20,
    bold: true,
    color: "1E3A8A",
  });
  slide5.addText([
    { text: "Trọng tâm 10 nội dung từ Bài 1 đến Bài 8 SGK Toán 12 Tập 1 Kết nối tri thức:\n\n", options: { bold: true } },
    { text: "1. Tính đơn điệu & Định lý mở rộng về dấu f'(x) (Trang 7-10)\n" },
    { text: "2. Điều kiện đủ cực trị: Dấu hiệu 1 & 2 (Trang 11-15)\n" },
    { text: "3. Quy tắc tìm GTLN - GTNN trên đoạn và khoảng (Trang 17-21)\n" },
    { text: "4. Tiệm cận đứng, tiệm cận ngang và tiệm cận xiên (Trang 23-28)\n" },
    { text: "5. Khảo sát 3 dạng đồ thị: Bậc ba, nhất biến, bậc 2 trên bậc 1 (Trang 30-38)\n" },
    { text: "6. Bài toán tối ưu hóa thực tế trong kinh tế và kỹ thuật (Trang 40-45)\n" },
    { text: "7. Vectơ không gian, quy tắc hình hộp và tích vô hướng (Trang 47-53)\n" },
    { text: "8. Hệ trục tọa độ Oxyz, khoảng cách, trung điểm, trọng tâm (Trang 55-61)\n" },
    { text: "9. Tích có hướng, diện tích tam giác và thể tích tứ diện (Trang 63-71)\n" },
    { text: "10. Cực trị hình học không gian Oxyz bằng phương pháp đạo hàm (Trang 72-76)" },
  ], {
    x: 0.8,
    y: 1.5,
    w: 8.4,
    h: 4.8,
    fontSize: 12,
    color: "1E293B",
  });

  // SLIDE 6: PHÂN HỆ 2 - CẨM NANG 7 DẠNG TOÁN
  let slide6 = pres.addSlide();
  slide6.background = { color: "F8FAFC" };
  slide6.addText("V. PHÂN HỆ 2: CẨM NANG 7 DẠNG TOÁN & PHÂN TÍCH CẠM BẪY", {
    x: 0.8,
    y: 0.6,
    w: 8.4,
    h: 0.6,
    fontSize: 20,
    bold: true,
    color: "1E3A8A",
  });
  slide6.addText([
    { text: "Chuẩn hóa 5 trường thông tin cho từng dạng toán (Tiến phụ trách - Q.Anh kiểm tra):\n\n", options: { bold: true } },
    { text: "• Dạng 1: Xét tính đơn điệu, cực trị và bài toán chứa tham số m.\n" },
    { text: "• Dạng 2: GTLN - GTNN và bài toán tối ưu hóa thực tiễn (kinh tế, thể tích).\n" },
    { text: "• Dạng 3: Đường tiệm cận của đồ thị hàm số (đứng, ngang, xiên và chứa căn).\n" },
    { text: "• Dạng 4: Khảo sát, nhận dạng đồ thị và bài toán tương giao f(x) = m.\n" },
    { text: "• Dạng 5: Vectơ không gian, tích vô hướng và tính chất góc thuần túy.\n" },
    { text: "• Dạng 6: Tọa độ Oxyz, tích có hướng và ứng dụng tính diện tích, thể tích.\n" },
    { text: "• Dạng 7 (Liên chương I-II): Tọa độ hóa Oxyz kết hợp đạo hàm tìm cực trị không gian thực tế.\n\n" },
    { text: "Đặc biệt: Hộp cảnh báo Lỗi sai cần tránh chỉ rõ bẫy nghiệm kép, bẫy tập xác định, bẫy góc vectơ tù, và bẫy chia đa thức.", options: { italics: true, color: "DC2626" } },
  ], {
    x: 0.8,
    y: 1.5,
    w: 8.4,
    h: 4.8,
    fontSize: 12,
    color: "1E293B",
  });

  // SLIDE 7: PHÂN HỆ 3 - NGÂN HÀNG CÂU HỎI
  let slide7 = pres.addSlide();
  slide7.background = { color: "F8FAFC" };
  slide7.addText("VI. PHÂN HỆ 3: NGÂN HÀNG 41 CÂU HỎI CHUẨN NGUỒN 100%", {
    x: 0.8,
    y: 0.6,
    w: 8.4,
    h: 0.6,
    fontSize: 20,
    bold: true,
    color: "1E3A8A",
  });
  slide7.addText([
    { text: "1. 100% Nguồn thật kiểm chứng được: ", options: { bold: true, color: "047857" } },
    { text: "Trích từ Đề chính thức Bộ GD&ĐT 2024, Đề tham khảo 2025, Sở GD&ĐT Hà Nội, Nam Định, Nghệ An, Hải Phòng, Bắc Ninh, Chuyên Lam Sơn, Chuyên ĐHSP. Các câu phát triển mới ghi rõ 'Chờ giáo viên duyệt'.\n\n" },
    { text: "2. Đầy đủ 3 định dạng cấu trúc mới: ", options: { bold: true, color: "047857" } },
    { text: "• 20 câu Trắc nghiệm 4 phương án lựa chọn A, B, C, D.\n• 11 câu Trắc nghiệm Đúng / Sai (mỗi câu gồm 4 ý a, b, c, d kiểm tra toàn diện).\n• 10 câu Trắc nghiệm Trả lời ngắn (điền kết quả số thập phân, phân số).\n\n" },
    { text: "3. Đầy đủ 4 cấp độ nhận thức: ", options: { bold: true, color: "047857" } },
    { text: "Nhận biết (30%) - Thông hiểu (40%) - Vận dụng (20%) - Vận dụng cao thực tế (10%)." },
  ], {
    x: 0.8,
    y: 1.5,
    w: 8.4,
    h: 4.5,
    fontSize: 13,
    color: "1E293B",
  });

  // SLIDE 8: LỜI GIẢI, CASIO & PHÂN TÍCH NHIỄU
  let slide8 = pres.addSlide();
  slide8.background = { color: "F8FAFC" };
  slide8.addText("VII. MỞ KHÓA 4 TAB PHẢN HỒI SƯ PHẠM CAO CẤP", {
    x: 0.8,
    y: 0.6,
    w: 8.4,
    h: 0.6,
    fontSize: 20,
    bold: true,
    color: "1E3A8A",
  });
  slide8.addText([
    { text: "Mỗi câu hỏi sau khi học sinh bấm 'Kiểm tra' đều mở khóa 4 Tab:\n\n", options: { bold: true } },
    { text: "• Tab 1 - Lời giải tự luận mẫu mực: ", options: { bold: true, color: "2563EB" } },
    { text: "Biến đổi logic chặt chẽ, đầy đủ điều kiện xác định và kết luận chuẩn mực.\n\n" },
    { text: "• Tab 2 - Hướng dẫn Casio fx-580VN X & fx-880BTG: ", options: { bold: true, color: "D97706" } },
    { text: "Chi tiết từng nút bấm (Menu 8 - Table, Menu 5 - Vector, Menu 9 - Equation, Solve, Đạo hàm tại 1 điểm d/dx).\n\n" },
    { text: "• Tab 3 - Phân tích phương án nhiễu & bẫy sai: ", options: { bold: true, color: "DC2626" } },
    { text: "Giải thích cặn kẽ TẠI SAO các đáp án còn lại là sai và học sinh hay ngộ nhận ở bước nào.\n\n" },
    { text: "• Tab 4 - Nguồn gốc & Kiểm tra độc lập: ", options: { bold: true, color: "059669" } },
    { text: "Minh bạch xuất xứ đề thi và xác nhận 'Đã kiểm tra bởi: T.Thảo / Yến / Tiến / Q.Anh'." },
  ], {
    x: 0.8,
    y: 1.5,
    w: 8.4,
    h: 4.8,
    fontSize: 12,
    color: "1E293B",
  });

  // SLIDE 9: CHẤM CHÉO 5 TIÊU CHÍ
  let slide9 = pres.addSlide();
  slide9.background = { color: "F8FAFC" };
  slide9.addText("VIII. ĐÁNH GIÁ CHẤM CHÉO 5 TIÊU CHÍ & ĐIỂM CÁ NHÂN (70% - 30%)", {
    x: 0.8,
    y: 0.6,
    w: 8.4,
    h: 0.6,
    fontSize: 20,
    bold: true,
    color: "1E3A8A",
  });
  slide9.addTable([
    ["Thành viên", "Điểm từ 4 bạn", "TB Chấm Chéo (30%)", "Điểm Nhóm (70%)", "Điểm Cá Nhân", "Xếp loại"],
    ["Huy (Nhóm trưởng)", "29.5 + 29.0 + 29.5 + 29.5", "96.50", "98.0", "97.55 / 100", "+2.0 điểm TX"],
    ["Q.Anh", "28.5 + 29.0 + 28.5 + 28.5", "95.00", "98.0", "96.50 / 100", "+2.0 điểm TX"],
    ["Tiến", "29.0 + 29.0 + 28.5 + 29.0", "95.50", "98.0", "96.85 / 100", "+2.0 điểm TX"],
    ["Yến", "29.5 + 29.0 + 29.5 + 29.5", "97.00", "98.0", "97.90 / 100", "+2.0 điểm TX"],
    ["T.Thảo", "29.5 + 29.5 + 29.5 + 29.5", "97.50", "98.0", "98.25 / 100", "+2.0 điểm TX"],
  ], {
    x: 0.8,
    y: 1.5,
    w: 8.4,
    h: 4.2,
    fontSize: 11,
    colW: [1.8, 2.2, 1.4, 1.3, 1.2, 1.1],
    border: { pt: 1, color: "CBD5E1" },
    fill: "FFFFFF",
  });

  // SLIDE 10: CHECKLIST MỤC VII & CAM KẾT
  let slide10 = pres.addSlide();
  slide10.background = { color: "0F172A" }; // Slate 900
  slide10.addText("IX. CHECKLIST 9 TIÊU CHUẨN MỤC VII & CAM KẾT LIÊM CHÍNH", {
    x: 0.8,
    y: 0.8,
    w: 8.4,
    h: 0.6,
    fontSize: 20,
    bold: true,
    color: "38BDF8",
  });
  slide10.addText([
    { text: "[X] 1. Sơ đồ tư duy đầy đủ, đúng kiến thức và dễ đọc.\n" },
    { text: "[X] 2. Mỗi dạng toán có dấu hiệu nhận diện, kiến thức nền tảng và phương pháp giải.\n" },
    { text: "[X] 3. Tất cả đáp án đã được ít nhất một thành viên khác kiểm tra độc lập.\n" },
    { text: "[X] 4. Lời giải có lập luận, điều kiện và kết luận; công thức, ký hiệu chính xác.\n" },
    { text: "[X] 5. Có phân tích lỗi sai/phương án nhiễu và gợi ý sửa sai.\n" },
    { text: "[X] 6. Nguồn câu hỏi được ghi rõ khi xác định được; không gán nguồn chưa kiểm chứng.\n" },
    { text: "[X] 7. Bài đăng có tiêu đề, thứ tự và liên kết hoạt động; mở được trên thiết bị của bạn học.\n" },
    { text: "[X] 8. Hình ảnh, tài liệu và nội dung trích dẫn được sử dụng phù hợp, có ghi nguồn.\n" },
    { text: "[X] 9. Nhóm đã thử nghiệm sản phẩm như một học sinh sử dụng lần đầu và sửa các lỗi phát hiện được.\n\n" },
    { text: "NHÓM 5 CAM KẾT HOÀN THÀNH XUẤT SẮC 100% NHIỆM VỤ ĐƯỢC GIAO!", options: { bold: true, color: "FBBF24" } },
  ], {
    x: 0.8,
    y: 1.6,
    w: 8.4,
    h: 4.8,
    fontSize: 12,
    color: "E2E8F0",
  });

  // SLIDE 11: KẾT LUẬN & SẴN SÀNG PHẢN BIỆN
  let slide11 = pres.addSlide();
  slide11.background = { color: "1E3A8A" }; // Blue 900
  slide11.addText("XIN TRÂN TRỌNG CẢM ƠN THẦY CÔ VÀ CÁC BẠN!", {
    x: 0.8,
    y: 2.0,
    w: 8.4,
    h: 1.0,
    fontSize: 28,
    bold: true,
    color: "FFFFFF",
    align: "center",
  });
  slide11.addText("NHÓM 5 SẴN SÀNG TRẢ LỜI CÁC CÂU HỎI PHẢN BIỆN TỪ THẦY CÔ VÀ CÁC NHÓM BẠN\n(Cả 5 thành viên đều nắm vững toàn bộ kiến thức và sản phẩm)", {
    x: 0.8,
    y: 3.3,
    w: 8.4,
    h: 1.2,
    fontSize: 15,
    color: "BFDBFE",
    align: "center",
  });

  const exportPath1 = path.join(__dirname, "../exports/Slide_Thuyet_Trinh_Padlet_Toan12.pptx");
  const exportPath2 = path.join(__dirname, "../public/exports/Slide_Thuyet_Trinh_Padlet_Toan12.pptx");
  await pres.writeFile({ fileName: exportPath1 });
  fs.copyFileSync(exportPath1, exportPath2);
  console.log("✓ Đã tạo thành công Slide_Thuyet_Trinh_Padlet_Toan12.pptx tại exports/ và public/exports/");
}

createSlideDeck().catch(console.error);
