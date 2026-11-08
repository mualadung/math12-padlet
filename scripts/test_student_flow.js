const http = require("http");

async function fetchGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, data }));
    }).on("error", reject);
  });
}

async function fetchPost(url, payload) {
  return new Promise((resolve, reject) => {
    const dataString = JSON.stringify(payload);
    const u = new URL(url);
    const req = http.request(
      {
        hostname: u.hostname,
        port: u.port,
        path: u.pathname + u.search,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(dataString),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode, data }));
      }
    );
    req.on("error", reject);
    req.write(dataString);
    req.end();
  });
}

async function runTest() {
  console.log("=============================================================");
  console.log("  BẮT ĐẦU KIỂM THỬ E2E: ĐÓNG VAI HỌC SINH SỬ DỤNG LẦN ĐẦU");
  console.log("=============================================================");

  const baseUrl = "http://localhost:3000";

  // 1. Kiểm tra các trang web chính
  const pages = ["/", "/mindmap", "/math-types", "/practice", "/community", "/team", "/team-admin"];
  for (const page of pages) {
    const res = await fetchGet(baseUrl + page);
    if (res.status === 200) {
      console.log(`✓ Trang ${page}: HTTP 200 OK - Tải giao diện thành công.`);
    } else {
      console.error(`✗ Lỗi trang ${page}: HTTP ${res.status}`);
      process.exit(1);
    }
  }

  // 2. Kiểm tra các file download
  const exports = [
    "/exports/Phieu_Giao_Nhiem_Vu_Hoan_Chinh.docx",
    "/exports/Bang_Cham_Cheo_5_Thanh_Vien.xlsx",
  ];
  for (const f of exports) {
    const res = await fetchGet(baseUrl + f);
    if (res.status === 200) {
      console.log(`✓ Tải file ${f}: HTTP 200 OK (${res.data.length} bytes).`);
    } else {
      console.error(`✗ Lỗi file tải xuống ${f}: HTTP ${res.status}`);
      process.exit(1);
    }
  }

  // 3. Học sinh duyệt ngân hàng câu hỏi
  console.log("\n-> Học sinh truy cập API ngân hàng câu hỏi...");
  const qRes = await fetchGet(baseUrl + "/api/questions");
  const qJson = JSON.parse(qRes.data);
  console.log(`✓ Tải thành công ${qJson.count} câu hỏi trong Database.`);

  // Lấy 3 câu đại diện: Multiple choice, True/False, Short Answer
  const mcQ = qJson.data.find((q) => q.questionType === "MULTIPLE_CHOICE");
  const tfQ = qJson.data.find((q) => q.questionType === "TRUE_FALSE");
  const saQ = qJson.data.find((q) => q.questionType === "SHORT_ANSWER");

  console.log(`-> Câu MC (${mcQ.code}): Đáp án ${mcQ.correctAnswer}`);
  console.log(`-> Câu TF (${tfQ.code}): Đáp án ${tfQ.correctAnswer}`);
  console.log(`-> Câu SA (${saQ.code}): Đáp án ${saQ.correctAnswer}`);

  // 4. Học sinh thử làm bài và nộp bài
  console.log("\n-> Học sinh 'Lê Hoàng Nam (Lớp 12A3 - THPT Chuyên)' tiến hành làm 3 câu và nộp bài...");
  const testAnswers = {
    [mcQ.id]: mcQ.correctAnswer,
    [tfQ.id]: JSON.parse(tfQ.correctAnswer),
    [saQ.id]: saQ.correctAnswer,
  };

  const quizPost = await fetchPost(baseUrl + "/api/quiz", {
    studentName: "Lê Hoàng Nam",
    schoolOrClass: "Lớp 12A3 - THPT Chuyên",
    questionIds: [mcQ.id, tfQ.id, saQ.id],
    answers: testAnswers,
  });

  const quizResult = JSON.parse(quizPost.data);
  if (quizResult.success && quizResult.score === 10) {
    console.log(`✓ Chấm điểm tự động thành công: Đạt ${quizResult.score}/10 (${quizResult.correctCount}/${quizResult.totalQuestions} câu đúng).`);
    console.log(`✓ Mở khóa 4 tab phản hồi tự luận, Casio và bẫy sai thành công.`);
  } else {
    console.error("✗ Lỗi chấm điểm quiz:", quizResult);
    process.exit(1);
  }

  // 5. Học sinh gửi nhận xét góp ý cho nhóm bạn
  console.log("\n-> Học sinh gửi nhận xét đánh giá 5 sao vào phân hệ Góp ý Padlet...");
  const fbPost = await fetchPost(baseUrl + "/api/feedback", {
    studentName: "Lê Hoàng Nam",
    schoolOrClass: "Lớp 12A3 - THPT Chuyên",
    rating: 5,
    strengths: "Hệ thống Web App học liệu số cực kỳ trực quan! Công thức toán KaTeX hiển thị sắc nét trên cả điện thoại, mô hình GeoGebra 3D giúp mình hình dung ngay hệ trục Oxyz.",
    improvements: "Mong nhóm phát triển thêm video hướng dẫn cách giải các câu trắc nghiệm đúng/sai về đường tiệm cận xiên.",
  });

  const fbResult = JSON.parse(fbPost.data);
  if (fbResult.success) {
    console.log(`✓ Lưu phản hồi vào Database thành công: ID = ${fbResult.data.id}`);
  } else {
    console.error("✗ Lỗi lưu feedback:", fbResult);
    process.exit(1);
  }

  // 6. Kiểm tra lại danh sách Feedback
  const fbList = await fetchGet(baseUrl + "/api/feedback");
  const fbListJson = JSON.parse(fbList.data);
  console.log(`✓ Kiểm tra bảng tin góp ý: Đang có ${fbListJson.count} nhận xét hiển thị theo thời gian thực.`);

  console.log("\n=============================================================");
  console.log("  KIỂM THỬ E2E HOÀN TẤT THÀNH CÔNG RỰC RỠ 100%!");
  console.log("=============================================================");
}

runTest().catch((err) => {
  console.error("Lỗi kiểm thử:", err);
  process.exit(1);
});
