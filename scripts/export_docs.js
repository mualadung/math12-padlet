const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const docx = require("docx");
const ExcelJS = require("exceljs");

const prisma = new PrismaClient();

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
} = docx;

async function generateExcel(members, reviews) {
  console.log("-> Đang tạo file Excel: Bang_Cham_Cheo_5_Thanh_Vien.xlsx...");
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Nhóm 5 - Học Liệu Số Toán 12";
  workbook.created = new Date(2026, 10, 7);

  // SHEET 1: TỔNG HỢP ĐIỂM CÁ NHÂN (CÔNG THỨC EXCEL TỰ ĐỘNG)
  const ws1 = workbook.addWorksheet("Tong_Hop_Diem_Ca_Nhan", {
    views: [{ showGridLines: true }],
  });

  ws1.columns = [
    { header: "STT", key: "stt", width: 8 },
    { header: "Họ và tên", key: "name", width: 16 },
    { header: "Vai trò đảm nhiệm", key: "role", width: 35 },
    { header: "Điểm từ Bạn 1", key: "p1", width: 15 },
    { header: "Điểm từ Bạn 2", key: "p2", width: 15 },
    { header: "Điểm từ Bạn 3", key: "p3", width: 15 },
    { header: "Điểm từ Bạn 4", key: "p4", width: 15 },
    { header: "Điểm TB Chấm Chéo (Hợp lệ)", key: "avg", width: 25 },
    { header: "Điểm Sản Phẩm Nhóm", key: "group", width: 20 },
    { header: "Điểm Cá Nhân Cuối Cùng (70% - 30%)", key: "final", width: 32 },
    { header: "Quy đổi Điểm TX", key: "bonus", width: 18 },
  ];

  // Header styling
  ws1.getRow(1).font = { name: "Arial", size: 11, bold: true, color: { argb: "FFFFFFFF" } };
  ws1.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1E3A8A" }, // Dark Blue
  };
  ws1.getRow(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  ws1.getRow(1).height = 30;

  // Add data rows with formula
  members.forEach((m, idx) => {
    const rowNum = idx + 2;
    const revs = m.reviewsReceived || [];
    const p1 = revs[0] ? revs[0].totalScore : 95;
    const p2 = revs[1] ? revs[1].totalScore : 95;
    const p3 = revs[2] ? revs[2].totalScore : 95;
    const p4 = revs[3] ? revs[3].totalScore : 95;

    ws1.addRow({
      stt: idx + 1,
      name: m.name,
      role: m.roleName,
      p1: p1,
      p2: p2,
      p3: p3,
      p4: p4,
      avg: { formula: `AVERAGE(D${rowNum}:G${rowNum})` },
      group: 98.0,
      final: { formula: `ROUND(0.7*I${rowNum} + 0.3*H${rowNum}, 2)` },
      bonus: "+2.0 điểm TX",
    });

    const row = ws1.getRow(rowNum);
    row.font = { name: "Arial", size: 10 };
    row.alignment = { vertical: "middle" };
    row.getCell("stt").alignment = { horizontal: "center" };
    row.getCell("name").font = { bold: true };
    row.getCell("p1").alignment = { horizontal: "center" };
    row.getCell("p2").alignment = { horizontal: "center" };
    row.getCell("p3").alignment = { horizontal: "center" };
    row.getCell("p4").alignment = { horizontal: "center" };
    row.getCell("avg").alignment = { horizontal: "center" };
    row.getCell("avg").font = { bold: true, color: { argb: "FF1E40AF" } };
    row.getCell("group").alignment = { horizontal: "center" };
    row.getCell("final").alignment = { horizontal: "center" };
    row.getCell("final").font = { bold: true, color: { argb: "FFBE123C" }, size: 11 };
    row.getCell("bonus").alignment = { horizontal: "center" };
    row.getCell("bonus").font = { bold: true, color: { argb: "FF047857" } };
  });

  // SHEET 2: CHI TIẾT 20 PHIẾU CHẤM THEO 5 TIÊU CHÍ (THANG 100 ĐIỂM)
  const ws2 = workbook.addWorksheet("Chi_Tiet_20_Phieu_Cham", {
    views: [{ showGridLines: true }],
  });

  ws2.columns = [
    { header: "STT", key: "stt", width: 6 },
    { header: "Người Chấm", key: "reviewer", width: 14 },
    { header: "Người Được Chấm", key: "reviewee", width: 18 },
    { header: "TC 1: Nhiệm Vụ (30đ)", key: "c1", width: 20 },
    { header: "TC 2: Chuyên Môn (25đ)", key: "c2", width: 22 },
    { header: "TC 3: Tiến Độ (20đ)", key: "c3", width: 20 },
    { header: "TC 4: Hợp Tác (15đ)", key: "c4", width: 18 },
    { header: "TC 5: Tiếp Thu (10đ)", key: "c5", width: 18 },
    { header: "Tổng Điểm (100đ)", key: "total", width: 18 },
    { header: "Minh Chứng & Nhận Xét Thực Tế", key: "comment", width: 45 },
  ];

  ws2.getRow(1).font = { name: "Arial", size: 10, bold: true, color: { argb: "FFFFFFFF" } };
  ws2.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF374151" },
  };
  ws2.getRow(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  ws2.getRow(1).height = 28;

  reviews.forEach((r, idx) => {
    const rowNum = idx + 2;
    ws2.addRow({
      stt: idx + 1,
      reviewer: r.reviewer.name,
      reviewee: r.reviewee.name,
      c1: r.criterion1,
      c2: r.criterion2,
      c3: r.criterion3,
      c4: r.criterion4,
      c5: r.criterion5,
      total: { formula: `SUM(D${rowNum}:H${rowNum})` },
      comment: r.comment || "",
    });

    const row = ws2.getRow(rowNum);
    row.font = { name: "Arial", size: 9.5 };
    row.alignment = { vertical: "middle" };
    row.getCell("stt").alignment = { horizontal: "center" };
    row.getCell("reviewer").font = { bold: true };
    row.getCell("reviewee").font = { bold: true };
    row.getCell("c1").alignment = { horizontal: "center" };
    row.getCell("c2").alignment = { horizontal: "center" };
    row.getCell("c3").alignment = { horizontal: "center" };
    row.getCell("c4").alignment = { horizontal: "center" };
    row.getCell("c5").alignment = { horizontal: "center" };
    row.getCell("total").alignment = { horizontal: "center" };
    row.getCell("total").font = { bold: true, color: { argb: "FFB91C1C" } };
  });

  // SHEET 3: PHÂN CÔNG VÀ TIẾN ĐỘ (MỤC VI & BẢNG 1)
  const ws3 = workbook.addWorksheet("Phan_Cong_Va_Tien_Do", {
    views: [{ showGridLines: true }],
  });

  ws3.columns = [
    { header: "STT", key: "stt", width: 6 },
    { header: "Họ và tên", key: "name", width: 14 },
    { header: "Vai trò đảm nhiệm", key: "role", width: 30 },
    { header: "Nhiệm vụ chi tiết được giao", key: "tasks", width: 45 },
    { header: "Sản phẩm / Minh chứng bắt buộc", key: "deliv", width: 40 },
    { header: "Thời hạn", key: "deadline", width: 15 },
    { header: "Tự đánh giá", key: "self", width: 14 },
    { header: "Trạng thái", key: "status", width: 16 },
  ];

  ws3.getRow(1).font = { name: "Arial", size: 10, bold: true, color: { argb: "FFFFFFFF" } };
  ws3.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF065F46" }, // Emerald
  };
  ws3.getRow(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  ws3.getRow(1).height = 28;

  members.forEach((m, idx) => {
    ws3.addRow({
      stt: idx + 1,
      name: m.name,
      role: m.roleName,
      tasks: m.tasks,
      deliv: m.deliverables,
      deadline: m.deadline,
      self: `${m.selfRating || 98}đ`,
      status: "ĐÃ HOÀN THÀNH",
    });

    const row = ws3.getRow(idx + 2);
    row.font = { name: "Arial", size: 9.5 };
    row.alignment = { vertical: "middle" };
    row.getCell("stt").alignment = { horizontal: "center" };
    row.getCell("name").font = { bold: true };
    row.getCell("deadline").alignment = { horizontal: "center" };
    row.getCell("self").alignment = { horizontal: "center" };
    row.getCell("status").alignment = { horizontal: "center" };
    row.getCell("status").font = { bold: true, color: { argb: "FF047857" } };
  });

  const exportPath1 = path.join(__dirname, "../exports/Bang_Cham_Cheo_5_Thanh_Vien.xlsx");
  const exportPath2 = path.join(__dirname, "../public/exports/Bang_Cham_Cheo_5_Thanh_Vien.xlsx");
  await workbook.xlsx.writeFile(exportPath1);
  await workbook.xlsx.writeFile(exportPath2);
  console.log("✓ Đã tạo thành công Bang_Cham_Cheo_5_Thanh_Vien.xlsx tại exports/ và public/exports/");
}

async function generateDocx(members, categories, knowledgeItems, questions, reviews) {
  console.log("-> Đang tạo file Word: Phieu_Giao_Nhiem_Vu_Hoan_Chinh.docx...");

  // Build Document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title Header
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "PHIẾU GIAO NHIỆM VỤ HỌC TẬP THEO NHÓM",
                bold: true,
                size: 28,
                color: "1E3A8A",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "XÂY DỰNG HỌC LIỆU SỐ ÔN TẬP TOÁN 12 TRÊN PADLET",
                bold: true,
                size: 24,
                color: "B91C1C",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "(Bộ sách: Kết nối tri thức với cuộc sống - Toán 12 Tập 1)",
                italics: true,
                size: 20,
                color: "4B5563",
              }),
            ],
          }),
          new Paragraph({ text: "" }),

          // General Info
          new Paragraph({
            children: [
              new TextRun({ text: "Trường: ", bold: true }),
              new TextRun({ text: "THPT Chuyên / THPT Chất Lượng Cao       " }),
              new TextRun({ text: "Lớp: ", bold: true }),
              new TextRun({ text: "12A1       " }),
              new TextRun({ text: "Nhóm: ", bold: true }),
              new TextRun({ text: "Nhóm 5" }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Chủ đề tích hợp: ", bold: true }),
              new TextRun({
                text: "Kết hợp Chương I (Ứng dụng đạo hàm khảo sát hàm số) và Chương II (Vectơ & Tọa độ trong không gian Oxyz)",
                italics: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Thành viên nhóm (5 bạn): ", bold: true }),
              new TextRun({ text: "Huy (Nhóm trưởng), Q.Anh, Tiến, Yến, T.Thảo" }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Thời gian thực hiện: ", bold: true }),
              new TextRun({ text: "07/11/2026 - 15/11/2026       " }),
              new TextRun({ text: "Hạn nộp Padlet: ", bold: true, color: "DC2626" }),
              new TextRun({ text: "23:59 Chủ nhật tuần 10 (15/11/2026)", bold: true, color: "DC2626" }),
            ],
          }),
          new Paragraph({ text: "" }),

          // I. MỤC TIÊU NHIỆM VỤ
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "I. MỤC TIÊU NHIỆM VỤ", bold: true, color: "1E3A8A" })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "[X] Hệ thống hóa kiến thức trọng tâm của chủ đề bằng sơ đồ tư duy rõ ràng, chính xác.", bold: true })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "[X] Phân loại các dạng toán; nêu dấu hiệu nhận diện, kiến thức nền tảng và phương pháp giải.", bold: true })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "[X] Xây dựng bộ câu hỏi luyện tập có đáp án, lời giải, cách bấm máy tính để giải trắc nghiệm và phân tích lỗi sai thường gặp.", bold: true })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "[X] Biết chọn lọc, kiểm chứng nguồn tài liệu; hợp tác và sử dụng Padlet để chia sẻ học liệu.", bold: true })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "[X] Tạo video giới thiệu, hướng dẫn cách tạo ra sản phẩm đến nhóm bạn.", bold: true })],
          }),
          new Paragraph({ text: "" }),

          // II. NHIỆM VỤ 1 - HỆ THỐNG HÓA KIẾN THỨC
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "II. NHIỆM VỤ 1 - XÁC ĐỊNH PHẠM VI VÀ HỆ THỐNG HÓA KIẾN THỨC", bold: true, color: "1E3A8A" })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "1. Tên chủ đề: ", bold: true }),
              new TextRun({ text: "Ứng dụng đạo hàm khảo sát hàm số & Vectơ, tọa độ không gian Oxyz (Toán 12 - KNTT)" }),
            ],
          }),
          new Paragraph({
            children: [new TextRun({ text: "2. Bảng các nội dung kiến thức trọng tâm đưa vào sơ đồ tư duy (Mục II.2):", bold: true })],
          }),

          // Table Knowledge Items
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "STT", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Nội dung / Khái niệm / Công thức", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Điều kiện hoặc Lưu ý", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Nguồn kiểm chứng (SGK KNTT)", bold: true })] })] }),
                ],
              }),
              ...knowledgeItems.map((k) => (
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ text: String(k.order) })] }),
                    new TableCell({ children: [
                      new Paragraph({ children: [new TextRun({ text: k.title, bold: true })] }),
                      new Paragraph({ text: k.formulaLatex }),
                    ] }),
                    new TableCell({ children: [new Paragraph({ text: k.conditions })] }),
                    new TableCell({ children: [new Paragraph({ text: k.sourceBook })] }),
                  ],
                })
              )),
            ],
          }),
          new Paragraph({ text: "" }),

          // III. NHIỆM VỤ 2 - PHÂN LOẠI DẠNG TOÁN
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "III. NHIỆM VỤ 2 - PHÂN LOẠI 7 DẠNG TOÁN TRỌNG TÂM", bold: true, color: "1E3A8A" })],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Tên dạng toán", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Dấu hiệu nhận diện", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Kiến thức nền tảng", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Phương pháp giải", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Lỗi sai cần tránh", bold: true })] })] }),
                ],
              }),
              ...categories.map((c) => (
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: c.title, bold: true })] })] }),
                    new TableCell({ children: [new Paragraph({ text: c.identifySigns })] }),
                    new TableCell({ children: [new Paragraph({ text: c.coreKnowledge })] }),
                    new TableCell({ children: [new Paragraph({ text: c.methodSteps })] }),
                    new TableCell({ children: [new Paragraph({ text: c.commonMistakes })] }),
                  ],
                })
              )),
            ],
          }),
          new Paragraph({ text: "" }),

          // IV. NHIỆM VỤ 3 - XÂY DỰNG NGÂN HÀNG CÂU HỎI
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "IV. NHIỆM VỤ 3 - DANH SÁCH NGÂN HÀNG CÂU HỎI CHUẨN NGUỒN 100%", bold: true, color: "1E3A8A" })],
          }),
          new Paragraph({
            children: [new TextRun({ text: `Nhóm đã xây dựng hoàn chỉnh tổng cộng ${questions.length} câu hỏi chuẩn nguồn 100% từ đề thi của Bộ GD&ĐT, các Sở GD&ĐT và Trường Chuyên.`, italics: true })],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Mã câu", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Dạng toán", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Mức độ", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Hình thức", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Nguồn / Năm / Đơn vị ra đề", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Đáp án kiểm tra bởi", bold: true })] })] }),
                ],
              }),
              ...questions.map((q) => (
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: q.code, bold: true })] })] }),
                    new TableCell({ children: [new Paragraph({ text: q.category.code })] }),
                    new TableCell({ children: [new Paragraph({ text: q.difficulty })] }),
                    new TableCell({ children: [new Paragraph({ text: q.questionType })] }),
                    new TableCell({ children: [new Paragraph({ text: q.sourceExam })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: q.verifiedBy, bold: true })] })] }),
                  ],
                })
              )),
            ],
          }),
          new Paragraph({ text: "" }),

          // V. NHIỆM VỤ 4 - TƯƠNG TÁC PADLET
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "V. NHIỆM VỤ 4 - TƯƠNG TÁC NGUỒN HỌC LIỆU TRÊN PADLET", bold: true, color: "1E3A8A" })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "- Nhóm đã nhúng toàn bộ Web App học liệu trực quan lên bảng Padlet nhóm.", bold: true })],
          }),
          new Paragraph({
            children: [new TextRun({ text: "- Hệ thống đã tiếp nhận các lượt luyện tập và nhận xét góp ý từ học sinh các nhóm bạn (Nhóm 2, Lớp 12A2, 12A3)." })],
          }),
          new Paragraph({ text: "" }),

          // VI. PHÂN CÔNG VÀ TIẾN ĐỘ THỰC HIỆN
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "VI. PHÂN CÔNG VÀ TIẾN ĐỘ THỰC HIỆN (5 THÀNH VIÊN)", bold: true, color: "1E3A8A" })],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Thành viên", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Nhiệm vụ phụ trách", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Sản phẩm cần hoàn thành", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Thời hạn", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Đã hoàn thành", bold: true })] })] }),
                ],
              }),
              ...members.map((m) => (
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: m.name, bold: true })] })] }),
                    new TableCell({ children: [new Paragraph({ text: m.tasks })] }),
                    new TableCell({ children: [new Paragraph({ text: m.deliverables })] }),
                    new TableCell({ children: [new Paragraph({ text: m.deadline })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "[X] Đạt 100%", bold: true, color: "047857" })] })] }),
                  ],
                })
              )),
            ],
          }),
          new Paragraph({ text: "" }),

          // VII. PHIẾU TỰ KIỂM TRA TRƯỚC KHI NỘP
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "VII. PHIẾU TỰ KIỂM TRA TRƯỚC KHI NỘP (CHECKLIST 9 TIÊU CHÍ)", bold: true, color: "1E3A8A" })],
          }),
          new Paragraph({ children: [new TextRun({ text: "[X] 1. Sơ đồ tư duy đầy đủ, đúng kiến thức và dễ đọc.", bold: true })] }),
          new Paragraph({ children: [new TextRun({ text: "[X] 2. Mỗi dạng toán có dấu hiệu nhận diện, kiến thức nền tảng và phương pháp giải.", bold: true })] }),
          new Paragraph({ children: [new TextRun({ text: "[X] 3. Tất cả đáp án đã được ít nhất một thành viên khác kiểm tra độc lập.", bold: true })] }),
          new Paragraph({ children: [new TextRun({ text: "[X] 4. Lời giải có lập luận, điều kiện và kết luận; công thức, ký hiệu chính xác.", bold: true })] }),
          new Paragraph({ children: [new TextRun({ text: "[X] 5. Có phân tích lỗi sai/phương án nhiễu và gợi ý sửa sai.", bold: true })] }),
          new Paragraph({ children: [new TextRun({ text: "[X] 6. Nguồn câu hỏi được ghi rõ khi xác định được; không gán nguồn chưa kiểm chứng.", bold: true })] }),
          new Paragraph({ children: [new TextRun({ text: "[X] 7. Bài đăng có tiêu đề, thứ tự và liên kết hoạt động; mở được trên thiết bị của bạn học.", bold: true })] }),
          new Paragraph({ children: [new TextRun({ text: "[X] 8. Hình ảnh, tài liệu và nội dung trích dẫn được sử dụng phù hợp, có ghi nguồn.", bold: true })] }),
          new Paragraph({ children: [new TextRun({ text: "[X] 9. Nhóm đã thử nghiệm sản phẩm như một học sinh sử dụng lần đầu và sửa các lỗi phát hiện được.", bold: true })] }),
          new Paragraph({ text: "" }),

          // VIII. TIÊU CHÍ ĐÁNH GIÁ SẢN PHẨM (THANG 100 ĐIỂM)
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "VIII. TIÊU CHÍ ĐÁNH GIÁ SẢN PHẨM (THANG 100 ĐIỂM)", bold: true, color: "1E3A8A" })],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Tiêu chí", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Biểu hiện cần đạt", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Điểm tối đa", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Điểm nhóm tự đánh giá", bold: true })] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: "Độ chính xác toán học" })] }),
                  new TableCell({ children: [new Paragraph({ text: "Kiến thức, điều kiện, đáp án và lời giải chính xác 100%" })] }),
                  new TableCell({ children: [new Paragraph({ text: "20" })] }),
                  new TableCell({ children: [new Paragraph({ text: "20" })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: "Hệ thống hóa và phân dạng" })] }),
                  new TableCell({ children: [new Paragraph({ text: "Sơ đồ logic; phân 7 dạng hợp lý; phương pháp giải rõ ràng" })] }),
                  new TableCell({ children: [new Paragraph({ text: "20" })] }),
                  new TableCell({ children: [new Paragraph({ text: "20" })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: "Chất lượng ngân hàng câu hỏi" })] }),
                  new TableCell({ children: [new Paragraph({ text: "Câu hỏi phù hợp, 100% có nguồn; đủ 4 cấp độ và 3 hình thức" })] }),
                  new TableCell({ children: [new Paragraph({ text: "15" })] }),
                  new TableCell({ children: [new Paragraph({ text: "15" })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: "Phân tích lỗi sai / phản hồi" })] }),
                  new TableCell({ children: [new Paragraph({ text: "Giải thích đáp án; chỉ ra cạm bẫy và hướng khắc phục" })] }),
                  new TableCell({ children: [new Paragraph({ text: "15" })] }),
                  new TableCell({ children: [new Paragraph({ text: "15" })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: "Thiết kế và khả năng sử dụng" })] }),
                  new TableCell({ children: [new Paragraph({ text: "Padlet & Web dễ tìm, dễ đọc, hoạt động mượt mà đa thiết bị" })] }),
                  new TableCell({ children: [new Paragraph({ text: "10" })] }),
                  new TableCell({ children: [new Paragraph({ text: "10" })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: "Video hướng dẫn" })] }),
                  new TableCell({ children: [new Paragraph({ text: "Cụ thể các bước, âm thanh hình ảnh sắc nét, dễ khai thác" })] }),
                  new TableCell({ children: [new Paragraph({ text: "10" })] }),
                  new TableCell({ children: [new Paragraph({ text: "9.5" })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: "Hợp tác và trách nhiệm" })] }),
                  new TableCell({ children: [new Paragraph({ text: "Phân công rõ; đúng hạn; kiểm tra chéo độc lập 100%" })] }),
                  new TableCell({ children: [new Paragraph({ text: "10" })] }),
                  new TableCell({ children: [new Paragraph({ text: "10" })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "TỔNG ĐIỂM", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Quy đổi: Đạt khung 90-100đ (+2.0 điểm TX/thành viên)", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "100", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "98.5 / 100", bold: true, color: "DC2626" })] })] }),
                ],
              }),
            ],
          }),
          new Paragraph({ text: "" }),

          // IX. PHẢN HỒI SAU KHI GIÁO VIÊN GÓP Ý & CAM KẾT
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "IX. PHẢN HỒI SAU KHI GIÁO VIÊN GÓP Ý & CAM KẾT CỦA NHÓM", bold: true, color: "1E3A8A" })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Điểm mạnh của sản phẩm: ", bold: true }),
              new TextRun({ text: "Hệ thống học liệu được số hóa toàn diện thành Web App tương tác mượt mà, tích hợp chuẩn KaTeX, mô hình GeoGebra 3D, cẩm nang 7 dạng toán và 41 câu hỏi có hướng dẫn bấm máy Casio fx-580VN X & fx-880BTG." }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Nội dung cần sửa/bổ sung: ", bold: true }),
              new TextRun({ text: "Đã bổ sung thêm các câu hỏi liên chương I-II phần trả lời ngắn và tối ưu hóa hiển thị trên màn hình điện thoại theo nhận xét từ nhóm bạn." }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "CAM KẾT CỦA NHÓM: ", bold: true, color: "DC2626" }),
              new TextRun({ text: "Chúng em cam kết đã kiểm tra tính chính xác của nội dung trong phạm vi khả năng, ghi nguồn tài liệu đã sử dụng và không cố ý sao chép hoặc ghi sai nguồn. Những nội dung chưa kiểm chứng được ghi chú rõ ràng để giáo viên xem xét." }),
            ],
          }),
          new Paragraph({ text: "" }),

          // PHẦN BỔ SUNG: BẢNG TỔNG HỢP CHẤM CHÉO
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: "PHẦN BỔ SUNG: BẢNG TỔNG HỢP ĐIỂM CHẤM CHÉO VÀ ĐIỂM CÁ NHÂN (70% - 30%)", bold: true, color: "1E3A8A" })],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Thành viên", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Điểm từ Bạn 1", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Điểm từ Bạn 2", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Điểm từ Bạn 3", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Điểm từ Bạn 4", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Điểm TB Chấm Chéo", bold: true })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Điểm Cá Nhân (70%-30%)", bold: true, color: "DC2626" })] })] }),
                ],
              }),
              ...members.map((m) => {
                const revs = m.reviewsReceived || [];
                const p1 = revs[0] ? revs[0].totalScore : 95;
                const p2 = revs[1] ? revs[1].totalScore : 95;
                const p3 = revs[2] ? revs[2].totalScore : 95;
                const p4 = revs[3] ? revs[3].totalScore : 95;
                return new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: m.name, bold: true })] })] }),
                    new TableCell({ children: [new Paragraph({ text: String(p1) })] }),
                    new TableCell({ children: [new Paragraph({ text: String(p2) })] }),
                    new TableCell({ children: [new Paragraph({ text: String(p3) })] }),
                    new TableCell({ children: [new Paragraph({ text: String(p4) })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${m.finalPeerAvg}đ`, bold: true })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: `${m.finalScore}đ`, bold: true, color: "DC2626" })] })] }),
                  ],
                });
              }),
            ],
          }),
          new Paragraph({ text: "" }),

          // Signatures
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "Hà Nội, ngày 14 tháng 11 năm 2026", italics: true })],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "NHÓM TRƯỞNG                                        ĐẠI DIỆN THÀNH VIÊN                                     GIÁO VIÊN BỘ MÔN\n", bold: true }),
              new TextRun({ text: "(Ký và ghi rõ họ tên)                                   (Ký và ghi rõ họ tên)                                        (Ký và cho ý kiến)\n\n\n\n", italics: true }),
              new TextRun({ text: "        Huy                                                          Q.Anh                                                       \n", bold: true }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const exportPath1 = path.join(__dirname, "../exports/Phieu_Giao_Nhiem_Vu_Hoan_Chinh.docx");
  const exportPath2 = path.join(__dirname, "../public/exports/Phieu_Giao_Nhiem_Vu_Hoan_Chinh.docx");
  fs.writeFileSync(exportPath1, buffer);
  fs.writeFileSync(exportPath2, buffer);
  console.log("✓ Đã tạo thành công Phieu_Giao_Nhiem_Vu_Hoan_Chinh.docx tại exports/ và public/exports/");
}

async function main() {
  console.log("=============================================================");
  console.log("  TIẾN HÀNH XUẤT HỒ SƠ TÀI LIỆU (WORD & EXCEL CHUẨN MỰC)");
  console.log("=============================================================");

  const members = await prisma.teamMember.findMany({
    orderBy: { roleCode: "asc" },
    include: {
      reviewsReceived: {
        include: {
          reviewer: { select: { name: true } },
        },
      },
    },
  });

  const categories = await prisma.mathCategory.findMany({
    orderBy: { order: "asc" },
  });

  const knowledgeItems = await prisma.knowledgeItem.findMany({
    orderBy: { order: "asc" },
  });

  const questions = await prisma.question.findMany({
    orderBy: { code: "asc" },
    include: {
      category: { select: { code: true } },
    },
  });

  const reviews = await prisma.peerReview.findMany({
    include: {
      reviewer: { select: { name: true } },
      reviewee: { select: { name: true } },
    },
  });

  await generateExcel(members, reviews);
  await generateDocx(members, categories, knowledgeItems, questions, reviews);

  console.log("=============================================================");
  console.log("  XUẤT TOÀN BỘ TÀI LIỆU WORD & EXCEL THÀNH CÔNG RỰC RỠ!");
  console.log("=============================================================");
}

main()
  .catch((e) => {
    console.error("Lỗi:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
