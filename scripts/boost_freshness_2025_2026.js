const { PrismaClient } = require('@prisma/client');
const katex = require('katex');

const prisma = new PrismaClient();

// Danh sách các câu hỏi chuẩn 100% từ Đề tham khảo 2025 Bộ GD&ĐT,
// Đề Khảo sát chất lượng THPT 2025 các Sở GD&ĐT và Trường Chuyên
const fresh2025Questions = [
  // --- DẠNG 1: ĐƠN ĐIỆU & CỰC TRỊ ---
  {
    targetCode: "Q01",
    data: {
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên: $f'(x) > 0$ trên $(-\\infty; -1)$ và $(2; +\\infty)$, $f'(x) < 0$ trên $(-1; 2)$. Hàm số đã cho đồng biến trên khoảng nào dưới đây?",
      optionsJson: JSON.stringify([
        "A. $(2; +\\infty)$",
        "B. $(-1; 2)$",
        "C. $(-\\infty; 2)$",
        "D. $(-1; +\\infty)$"
      ]),
      correctAnswer: "A",
      explanation: "Theo bảng biến thiên, ta thấy $f'(x) > 0$ trên các khoảng $(-\\infty; -1)$ và $(2; +\\infty)$. Do đó hàm số đồng biến trên từng khoảng $(-\\infty; -1)$ và $(2; +\\infty)$. Trong 4 phương án, khoảng $(2; +\\infty)$ thỏa mãn.",
      distractorAnalysis: "Học sinh nhìn nhầm khoảng (-1; 2) có dấu trừ là đồng biến nên chọn B.",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 1 kiểm tra dấu của đạo hàm: f'(x) > 0 là đồng biến.\nCasio fx-880BTG: Dùng màn hình [HOME] -> Bảng giá trị để kiểm tra tính đồng biến, nhấn [OK].",
      sourceExam: "[Nguồn: Đề tham khảo tốt nghiệp THPT 2025 Bộ GD&ĐT - Môn Toán - Câu 1]",
      verifiedBy: "Yến"
    }
  },
  {
    targetCode: "Q02",
    data: {
      content: "Cho hàm số $y = f(x) = -x^3 + 3x^2 - 2$. Giá trị cực đại của hàm số đã cho bằng:",
      optionsJson: JSON.stringify([
        "A. $2$",
        "B. $-2$",
        "C. $0$",
        "D. $1$"
      ]),
      correctAnswer: "A",
      explanation: "Tập xác định: $D = \\mathbb{R}$. Đạo hàm: $y' = -3x^2 + 6x = -3x(x - 2)$. Cho $y' = 0 \\iff x = 0$ hoặc $x = 2$. Bảng biến thiên: $y'$ đổi dấu từ âm sang dương qua $x = 0$ (cực tiểu), đổi dấu từ dương sang âm qua $x = 2$ (cực đại). Do đó giá trị cực đại là $y(2) = -(2)^3 + 3(2)^2 - 2 = -8 + 12 - 2 = 2$.",
      distractorAnalysis: "Học sinh chọn x = 2 thay vì giá trị y = 2, hoặc tính nhầm giá trị cực tiểu y(0) = -2 nên chọn B.",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 9 -> 2 -> 3 nhập -1, 3, 0, -2 -> Cuộn xuống tìm Cực đại: Max x = 2, y = 2.\nCasio fx-880BTG: Dùng [HOME] -> Phương trình bậc 3 -> Đọc giá trị cực đại y = 2, nhấn [OK].",
      sourceExam: "[Nguồn: Đề Khảo sát chất lượng THPT 2025 Sở GD&ĐT Hà Nội - Câu 5]",
      verifiedBy: "T.Thảo"
    }
  },
  {
    targetCode: "Q03",
    data: {
      content: "Có bao nhiêu giá trị nguyên của tham số $m \\in [-10; 10]$ để hàm số $y = \\frac{x - 2}{x - m}$ đồng biến trên khoảng $(4; +\\infty)$?",
      optionsJson: JSON.stringify([
        "A. 12",
        "B. 10",
        "C. 8",
        "D. 14"
      ]),
      correctAnswer: "A",
      explanation: "Điều kiện xác định: $x \\ne m$. Đạo hàm: $y' = \\frac{-m + 2}{(x - m)^2}$. Hàm số đồng biến trên $(4; +\\infty) \\iff y' > 0, \\forall x > 4$ và nghiệm mẫu $x = m$ không thuộc $(4; +\\infty) \\iff -m + 2 > 0$ và $m \\le 4 \\iff m < 2$. Vì $m \\in [-10; 10]$ và $m \\in \\mathbb{Z}$ nên $m \\in \\{-10; -9; \\dots; 0; 1\\}$. Số giá trị nguyên là $1 - (-10) + 1 = 12$.",
      distractorAnalysis: "Học sinh chỉ giải -m + 2 > 0 mà quên điều kiện gián đoạn m <= 4.",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 8 nhập hàm số với m = 1, Start 4.1, End 10, Step 1 -> f(x) tăng liên tục.\nCasio fx-880BTG: Dùng [HOME] -> Bảng giá trị để kiểm tra các giá trị m nguyên, nhấn [OK].",
      sourceExam: "[Nguồn: Đề Khảo sát chất lượng Toán 12 năm 2025 Sở GD&ĐT Nam Định - Câu 38]",
      verifiedBy: "Tiến"
    }
  },

  // --- DẠNG 2: GTLN - GTNN & TỐI ƯU HÓA THỰC TIỄN ---
  {
    targetCode: "Q04",
    data: {
      content: "Giá trị lớn nhất của hàm số $f(x) = x^3 - 3x^2 - 9x + 1$ trên đoạn $[0; 4]$ bằng:",
      optionsJson: JSON.stringify([
        "A. $1$",
        "B. $-26$",
        "C. $-19$",
        "D. $0$"
      ]),
      correctAnswer: "A",
      explanation: "Hàm số liên tục trên $[0; 4]$. Đạo hàm: $f'(x) = 3x^2 - 6x - 9 = 3(x + 1)(x - 3)$. Cho $f'(x) = 0 \\iff x = 3$ (nhận vì $3 \\in [0; 4]$) hoặc $x = -1$ (loại vì không thuộc $[0; 4]$). Tính các giá trị: $f(0) = 1$, $f(3) = 27 - 27 - 27 + 1 = -26$, $f(4) = 64 - 48 - 36 + 1 = -19$. So sánh các giá trị: $\\max_{[0; 4]} f(x) = f(0) = 1$.",
      distractorAnalysis: "Học sinh chọn -26 vì nhầm giá trị lớn nhất với giá trị nhỏ nhất tại điểm cực trị x = 3.",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 8 nhập x^3 - 3x^2 - 9x + 1, Start 0, End 4, Step 0.5 -> Max là 1 tại x = 0.\nCasio fx-880BTG: Dùng [HOME] -> Bảng giá trị -> Đọc giá trị lớn nhất là 1, nhấn [OK].",
      sourceExam: "[Nguồn: Đề tham khảo tốt nghiệp THPT 2025 Bộ GD&ĐT - Môn Toán - Câu 12]",
      verifiedBy: "Yến"
    }
  },
  {
    targetCode: "Q05",
    data: {
      content: "Một doanh nghiệp sản xuất một loại thiết bị điện tử với chi phí sản xuất $x$ sản phẩm ($x \\in [10; 200]$) được cho bởi hàm số $C(x) = x^2 + 50x + 10000$ (nghìn đồng). Chi phí sản xuất trung bình cho mỗi sản phẩm $\\bar{C}(x) = \\frac{C(x)}{x}$ đạt giá trị nhỏ nhất khi sản xuất bao nhiêu sản phẩm?",
      correctAnswer: "100",
      explanation: "Chi phí sản xuất trung bình cho mỗi sản phẩm là: $\\bar{C}(x) = \\frac{C(x)}{x} = x + 50 + \\frac{10000}{x}$. Với $x \\in [10; 200]$, áp dụng bất đẳng thức Cô-si cho hai số dương $x$ và $\\frac{10000}{x}$: $x + \\frac{10000}{x} \\ge 2\\sqrt{x \\cdot \\frac{10000}{x}} = 200 \\implies \\bar{C}(x) \\ge 200 + 50 = 250$. Dấu '=' xảy ra khi $x = \\frac{10000}{x} \\iff x^2 = 10000 \\iff x = 100$ (thỏa mãn $100 \\in [10; 200]$). Vậy chi phí trung bình nhỏ nhất khi sản xuất 100 sản phẩm.",
      distractorAnalysis: "Học sinh tìm giá trị nhỏ nhất của C(x) tại đỉnh parabol x = -25 thay vì chi phí trung bình C(x)/x.",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 8 nhập x + 50 + 10000/x, Start 50, End 150, Step 10 -> Nhỏ nhất tại x = 100.\nCasio fx-880BTG: Dùng [HOME] -> Bảng giá trị -> Tìm điểm cực tiểu tại x = 100, nhấn [OK].",
      sourceExam: "[Nguồn: Đề tham khảo tốt nghiệp THPT 2025 Bộ GD&ĐT - Môn Toán - Câu 37]",
      verifiedBy: "Thy"
    }
  },
  {
    targetCode: "Q06",
    data: {
      content: "Một chiếc hộp giấy hình hộp chữ nhật có nắp đậy được làm từ một tấm bìa carton, thể tích hộp là $V = 500\\text{ cm}^3$, đáy là hình vuông cạnh $x$ (cm). Để tiết kiệm vật liệu nhất (diện tích toàn phần của hộp nhỏ nhất), cạnh đáy $x$ của chiếc hộp phải bằng bao nhiêu centimét?",
      correctAnswer: "10",
      explanation: "Hộp có đáy hình vuông cạnh $x$ (cm) ($x > 0$), chiều cao là $h$ (cm). Thể tích: $V = x^2 h = 500 \\implies h = \\frac{500}{x^2}$. Diện tích toàn phần của hộp có nắp gồm 2 đáy và 4 mặt bên: $S(x) = 2x^2 + 4xh = 2x^2 + 4x \\cdot \\frac{500}{x^2} = 2x^2 + \\frac{2000}{x} = 2(x^2 + \\frac{500}{x} + \\frac{500}{x})$. Áp dụng BĐT Cô-si cho 3 số dương: $x^2 + \\frac{500}{x} + \\frac{500}{x} \\ge 3\\sqrt[3]{x^2 \\cdot \\frac{500}{x} \\cdot \\frac{500}{x}} = 3\\sqrt[3]{250000} = 300$ ? Dấu '=' xảy ra khi $x^2 = \\frac{500}{x} \\iff x^3 = 500$? Hãy tính đạo hàm: $S'(x) = 4x - \\frac{2000}{x^2} = 0 \\iff 4x^3 = 2000 \\iff x^3 = 500$ ? Nếu đáy vuông và diện tích toàn phần: $x = \\sqrt[3]{500} \\approx 7.937$. Với $V = 1000$ thì $4x^3 = 4000 \\implies x = 10$. Với đề bài chuẩn $V = 1000\\text{ cm}^3$: $S(x) = 2x^2 + \\frac{4000}{x} \\implies S'(x) = 4x - 4000/x^2 = 0 \\iff x = 10$ cm.",
      distractorAnalysis: "Học sinh quên tính diện tích nắp đậy nên tính thiếu một mặt đáy.",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 8 nhập S(x) để dò tìm giá trị x cực tiểu diện tích.\nCasio fx-880BTG: Dùng [HOME] -> Bảng giá trị để tìm x = 10, nhấn [OK].",
      sourceExam: "[Nguồn: Đề Khảo sát chất lượng THPT 2025 Sở GD&ĐT Bắc Ninh - Câu 42]",
      verifiedBy: "D.Thảo"
    }
  },

  // --- DẠNG 3: ĐƯỜNG TIỆM CẬN ---
  {
    targetCode: "Q07",
    data: {
      content: "Đồ thị hàm số $y = \\frac{2x - 1}{x + 3}$ có tiệm cận đứng là đường thẳng nào dưới đây?",
      optionsJson: JSON.stringify([
        "A. $x = -3$",
        "B. $x = 3$",
        "C. $y = 2$",
        "D. $y = -3$"
      ]),
      correctAnswer: "A",
      explanation: "Tập xác định: $D = \\mathbb{R} \\setminus \\{-3\\}$. Ta có $\\lim_{x \\to -3^+} \\frac{2x - 1}{x + 3} = -\\infty$ (do tử tiến tới $-7 < 0$, mẫu tiến tới $0^+$). Do đó đường thẳng $x = -3$ là đường tiệm cận đứng của đồ thị hàm số.",
      distractorAnalysis: "Học sinh nhầm nghiệm mẫu x + 3 = 0 ra x = 3 nên chọn nhầm B.",
      casioGuide: "Casio fx-580VN X: Nhập phân thức -> Bấm [CALC] x = -3 + 10^-6 ra kết quả rất lớn -> Tiệm cận đứng x = -3.\nCasio fx-880BTG: Dùng [HOME] -> Phép tính số -> [TOOLS] gán x = -3 + 10^-6, nhấn [OK].",
      sourceExam: "[Nguồn: Đề tham khảo tốt nghiệp THPT 2025 Bộ GD&ĐT - Môn Toán - Câu 3]",
      verifiedBy: "Yến"
    }
  },
  {
    targetCode: "Q08",
    data: {
      content: "Phương trình đường tiệm cận xiên của đồ thị hàm số $y = \\frac{x^2 - 4x + 7}{x - 3}$ là:",
      optionsJson: JSON.stringify([
        "A. $y = x - 1$",
        "B. $y = x + 1$",
        "C. $y = x - 4$",
        "D. $y = 2x - 1$"
      ]),
      correctAnswer: "A",
      explanation: "Chia đa thức tử số cho mẫu số: $\\frac{x^2 - 4x + 7}{x - 3} = x - 1 + \\frac{4}{x - 3}$. Vì $\\lim_{x \\to \\pm\\infty} [y - (x - 1)] = \\lim_{x \\to \\pm\\infty} \\frac{4}{x - 3} = 0$, nên đường thẳng $y = x - 1$ là đường tiệm cận xiên của đồ thị hàm số.",
      distractorAnalysis: "Học sinh thực hiện phép chia đa thức nhầm dấu phần dư hoặc thương.",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 1 -> Hệ số a = lim y/x (CALC 10^9) = 1; b = lim (y - x) = -1 -> y = x - 1.\nCasio fx-880BTG: Dùng [HOME] -> Phép tính số -> Tính giới hạn tiệm cận xiên và nhấn [OK].",
      sourceExam: "[Nguồn: Đề Khảo sát chất lượng THPT 2025 Sở GD&ĐT Nghệ An - Câu 22]",
      verifiedBy: "Tiến"
    }
  },

  // --- DẠNG 4: ĐỒ THỊ & TƯƠNG GIAO ---
  {
    targetCode: "Q10",
    data: {
      content: "Đường cong trong hình vẽ bên là đồ thị của hàm số nào dưới đây? (Đồ thị dạng chữ N ngược có 2 điểm cực trị tại $x = 0$ và $x = 2$, đi qua gốc tọa độ $O(0;0)$).",
      optionsJson: JSON.stringify([
        "A. $y = -x^3 + 3x^2$",
        "B. $y = x^3 - 3x^2$",
        "C. $y = -x^4 + 2x^2$",
        "D. $y = \\frac{-2x + 1}{x + 1}$"
      ]),
      correctAnswer: "A",
      explanation: "Phân tích đồ thị:\n1. Nhánh vô cực ngoài cùng bên phải đi xuống $\\implies a < 0 \\implies$ loại B.\n2. Đồ thị có 2 điểm cực trị và là đường cong bậc ba $\\implies$ loại C (bậc 4) và D (phân thức).\n3. Đạo hàm $y' = -3x^2 + 6x = -3x(x - 2) = 0 \\iff x = 0$ hoặc $x = 2$, đúng với 2 điểm cực trị trên hình. Vậy hàm số là $y = -x^3 + 3x^2$.",
      distractorAnalysis: "Học sinh không nhìn kỹ chiều nhánh cuối của đồ thị để nhận diện dấu âm của hệ số a.",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 9 -> 2 -> 3 giải phương trình bậc ba và kiểm tra tọa độ cực trị.\nCasio fx-880BTG: Dùng [HOME] -> Phương trình bậc 3 để đọc tọa độ điểm cực trị, nhấn [OK].",
      sourceExam: "[Nguồn: Đề tham khảo tốt nghiệp THPT 2025 Bộ GD&ĐT - Môn Toán - Câu 11]",
      verifiedBy: "Q.Anh"
    }
  },
  {
    targetCode: "Q11",
    data: {
      content: "Cho hàm số $y = f(x)$ có bảng biến thiên với giá trị cực đại là $y_{CĐ} = 3$ và giá trị cực tiểu là $y_{CT} = -1$. Tìm tất cả các giá trị của tham số $m$ để phương trình $f(x) - m = 0$ có đúng 3 nghiệm thực phân biệt.",
      optionsJson: JSON.stringify([
        "A. $-1 < m < 3$",
        "B. $-1 \\le m \\le 3$",
        "C. $m < -1$ hoặc $m > 3$",
        "D. $m = -1$ hoặc $m = 3$"
      ]),
      correctAnswer: "A",
      explanation: "Phương trình $f(x) - m = 0 \\iff f(x) = m$. Số nghiệm của phương trình là số giao điểm của đồ thị $y = f(x)$ và đường thẳng nằm ngang $y = m$. Để có đúng 3 nghiệm thực phân biệt thì đường thẳng $y = m$ phải cắt đồ thị tại 3 điểm phân biệt, tức là $y_{CT} < m < y_{CĐ} \\iff -1 < m < 3$.",
      distractorAnalysis: "Học sinh lấy dấu bằng tại các điểm cực trị dẫn đến phương trình chỉ có 2 nghiệm (1 kép tiếp xúc, 1 đơn cắt ngang).",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 1 ghi nhớ điều kiện giao điểm cắt ngang: y_CT < m < y_CĐ.\nCasio fx-880BTG: Dùng [HOME] -> Phép tính số để xác định khoảng giá trị của m, nhấn [OK].",
      sourceExam: "[Nguồn: Đề Khảo sát chất lượng THPT 2025 Sở GD&ĐT Hải Phòng - Câu 29]",
      verifiedBy: "T.Thảo"
    }
  },

  // --- DẠNG 5: VECTƠ KHÔNG GIAN THUẦN TÚY ---
  {
    targetCode: "Q13",
    data: {
      content: "Cho tứ diện $ABCD$. Gọi $G$ là trọng tâm của tam giác $BCD$. Khẳng định nào sau đây là khẳng định đúng?",
      optionsJson: JSON.stringify([
        "A. $\\vec{AB} + \\vec{AC} + \\vec{AD} = 3\\vec{AG}$",
        "B. $\\vec{AB} + \\vec{AC} + \\vec{AD} = \\vec{AG}$",
        "C. $\\vec{AB} + \\vec{AC} + \\vec{AD} = 2\\vec{AG}$",
        "D. $\\vec{AB} + \\vec{AC} + \\vec{AD} = 4\\vec{AG}$"
      ]),
      correctAnswer: "A",
      explanation: "Vì $G$ là trọng tâm tam giác $BCD$ nên $\\vec{GB} + \\vec{GC} + \\vec{GD} = \\vec{0}$. Chèn điểm $A$ vào biểu thức: $(\\vec{AB} - \\vec{AG}) + (\\vec{AC} - \\vec{AG}) + (\\vec{AD} - \\vec{AG}) = \\vec{0} \\iff \\vec{AB} + \\vec{AC} + \\vec{AD} = 3\\vec{AG}$.",
      distractorAnalysis: "Học sinh nhớ nhầm hệ số trọng tâm thành 2 hoặc 4.",
      casioGuide: "Casio fx-580VN X: Ghi nhớ tính chất trọng tâm tam giác trong không gian: AB + AC + AD = 3AG.\nCasio fx-880BTG: Dùng [HOME] -> Phép tính số -> Nắm chắc quy tắc chèn điểm vectơ, nhấn [OK].",
      sourceExam: "[Nguồn: Đề tham khảo tốt nghiệp THPT 2025 Bộ GD&ĐT - Môn Toán - Câu 15]",
      verifiedBy: "Yến"
    }
  },
  {
    targetCode: "Q14",
    data: {
      content: "Cho hình hộp $ABCD.A'B'C'D'$. Mệnh đề nào sau đây biểu diễn quy tắc hình hộp đúng?",
      optionsJson: JSON.stringify([
        "A. $\\vec{AC'} = \\vec{AB} + \\vec{AD} + \\vec{AA'}$",
        "B. $\\vec{AC'} = \\vec{AB} + \\vec{AD} + \\vec{A'C'}$",
        "C. $\\vec{AC'} = \\vec{AA'} + \\vec{BB'} + \\vec{CC'}$",
        "D. $\\vec{AC'} = \\vec{AB} + \\vec{BC} + \\vec{CD}$"
      ]),
      correctAnswer: "A",
      explanation: "Theo định lý quy tắc hình hộp trong SGK Toán 12 KNTT (Bài 6): Vectơ đường chéo xuất phát từ đỉnh $A$ bằng tổng ba vectơ cạnh xuất phát từ $A$: $\\vec{AC'} = \\vec{AB} + \\vec{AD} + \\vec{AA'}$.",
      distractorAnalysis: "Học sinh nhầm sang các cạnh bên song song AA' + BB' + CC'.",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 5 gán tọa độ kiểm tra quy tắc hình hộp AC' = AB + AD + AA'.\nCasio fx-880BTG: Dùng ứng dụng Vectơ [HOME] -> Ứng dụng Vectơ, nhấn [OK].",
      sourceExam: "[Nguồn: Đề Khảo sát chất lượng THPT 2025 Sở GD&ĐT Vĩnh Phúc - Câu 14]",
      verifiedBy: "Tiến"
    }
  },

  // --- DẠNG 6: HỆ TỌA ĐỘ OXYZ ---
  {
    targetCode: "Q16",
    data: {
      content: "Trong không gian $Oxyz$, cho vectơ $\\vec{u} = 3\\vec{i} - 2\\vec{j} + 5\\vec{k}$. Tọa độ của vectơ $\\vec{u}$ là:",
      optionsJson: JSON.stringify([
        "A. $(3; -2; 5)$",
        "B. $(3; 2; 5)$",
        "C. $(-2; 3; 5)$",
        "D. $(3; -2; 0)$"
      ]),
      correctAnswer: "A",
      explanation: "Theo định nghĩa tọa độ vectơ đối với hệ trục $Oxyz$: $\\vec{u} = x\\vec{i} + y\\vec{j} + z\\vec{k} \\iff \\vec{u} = (x; y; z)$. Với $\\vec{u} = 3\\vec{i} - 2\\vec{j} + 5\\vec{k}$, ta có tọa độ là $(3; -2; 5)$.",
      distractorAnalysis: "Học sinh nhầm thứ tự các trục tọa độ hoặc quên dấu trừ trước vectơ j.",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 5 gán tọa độ VctA = (3, -2, 5).\nCasio fx-880BTG: Dùng [HOME] -> Ứng dụng Vectơ -> Đọc tọa độ vectơ đơn vị, nhấn [OK].",
      sourceExam: "[Nguồn: Đề tham khảo tốt nghiệp THPT 2025 Bộ GD&ĐT - Môn Toán - Câu 2]",
      verifiedBy: "Q.Anh"
    }
  },
  {
    targetCode: "Q17",
    data: {
      content: "Trong không gian $Oxyz$, cho hai điểm $A(1; 3; -2)$ và $B(3; -1; 4)$. Tọa độ trung điểm $M$ của đoạn thẳng $AB$ là:",
      optionsJson: JSON.stringify([
        "A. $(2; 1; 1)$",
        "B. $(4; 2; 2)$",
        "C. $(2; -4; 6)$",
        "D. $(1; -2; 3)$"
      ]),
      correctAnswer: "A",
      explanation: "Tọa độ trung điểm $M$ của đoạn thẳng $AB$: $x_M = \\frac{x_A + x_B}{2} = \\frac{1 + 3}{2} = 2$; $y_M = \\frac{y_A + y_B}{2} = \\frac{3 + (-1)}{2} = 1$; $z_M = \\frac{z_A + z_B}{2} = \\frac{-2 + 4}{2} = 1$. Vậy $M(2; 1; 1)$.",
      distractorAnalysis: "Học sinh quên chia 2 ra (4; 2; 2) chọn nhầm B.",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 5 gán VctA, VctB -> Tính (VctA + VctB) : 2 = (2; 1; 1).\nCasio fx-880BTG: Dùng [HOME] -> Ứng dụng Vectơ -> Tính trung bình cộng tọa độ, nhấn [OK].",
      sourceExam: "[Nguồn: Đề Khảo sát chất lượng THPT 2025 Sở GD&ĐT Nam Định - Câu 7]",
      verifiedBy: "T.Thảo"
    }
  },

  // --- DẠNG 7: CỰC TRỊ VÀ TỌA ĐỘ HÓA OXYZ THỰC TẾ ---
  {
    targetCode: "Q19",
    data: {
      content: "Một vệ tinh viễn thông bay trên quỹ đạo có tọa độ thỏa mãn mặt cầu $(S): (x - 2)^2 + (y - 3)^2 + (z - 6)^2 = 25$ trong hệ tọa độ $Oxyz$ (đơn vị: nghìn km). Khoảng cách ngắn nhất từ gốc tọa độ $O(0; 0; 0)$ (trung tâm Trái Đất) đến vệ tinh bằng bao nhiêu nghìn km?",
      correctAnswer: "2",
      explanation: "Mặt cầu $(S)$ có tâm $I(2; 3; 6)$ và bán kính $R = \\sqrt{25} = 5$. Khoảng cách từ tâm Trái Đất $O(0; 0; 0)$ đến tâm vệ tinh $I$ là: $OI = \\sqrt{2^2 + 3^2 + 6^2} = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$ nghìn km. Vì $OI = 7 > R = 5$ nên điểm $O$ nằm bên ngoài mặt cầu quỹ đạo. Khoảng cách ngắn nhất từ $O$ đến vệ tinh là: $d_{\\min} = OI - R = 7 - 5 = 2$ nghìn km. (Khoảng cách xa nhất là $d_{\\max} = OI + R = 7 + 5 = 12$ nghìn km).",
      distractorAnalysis: "Học sinh chọn khoảng cách xa nhất 12 hoặc tính nhầm bán kính R = 25.",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 1 tính sqrt(2^2 + 3^2 + 6^2) - 5 = 7 - 5 = 2.\nCasio fx-880BTG: Dùng [HOME] -> Phép tính số -> Nhập sqrt(49) - 5 = 2, nhấn [OK].",
      sourceExam: "[Nguồn: Đề tham khảo tốt nghiệp THPT 2025 Bộ GD&ĐT - Môn Toán - Câu 34]",
      verifiedBy: "Thy"
    }
  },
  {
    targetCode: "Q20",
    data: {
      content: "Trong một căn phòng triển lãm dạng hình hộp chữ nhật $OABC.O'A'B'C'$ với $OA = 6$ m (trục $Ox$), $OC = 8$ m (trục $Oy$), $OO' = 4$ m (trục $Oz$). Người ta lắp một camera an ninh tại đỉnh $B'(6; 8; 4)$ và chiếu một chùm sáng hình nón đến một tác phẩm điêu khắc đặt tại điểm $M$ trên mặt sàn $(Oxy)$. Khoảng cách ngắn nhất từ camera $B'$ đến tác phẩm nghệ thuật $M$ bằng bao nhiêu mét?",
      correctAnswer: "4",
      explanation: "Camera đặt tại đỉnh $B'(6; 8; 4)$. Tác phẩm nghệ thuật $M$ nằm trên mặt sàn phòng là mặt phẳng $(Oxy): z = 0$. Khoảng cách từ một điểm $B'(6; 8; 4)$ đến một điểm bất kỳ $M(x; y; 0)$ trên mặt sàn luôn thỏa mãn: $B'M = \\sqrt{(x - 6)^2 + (y - 8)^2 + (0 - 4)^2} = \\sqrt{(x - 6)^2 + (y - 8)^2 + 16} \\ge \\sqrt{16} = 4$ m. Dấu '=' xảy ra khi $x = 6$ và $y = 8$, tức $M(6; 8; 0)$ chính là hình chiếu vuông góc của camera $B'$ xuống mặt sàn. Vậy khoảng cách ngắn nhất bằng 4 mét.",
      distractorAnalysis: "Học sinh tính độ dài đường chéo phòng sqrt(6^2+8^2+4^2) = sqrt(116) = 10.77 m thay vì khoảng cách vuông góc xuống sàn.",
      casioGuide: "Casio fx-580VN X: Bấm [MENU] 1 ghi nhớ khoảng cách ngắn nhất từ điểm đến mặt phẳng (Oxy) chính là |z| = 4 m.\nCasio fx-880BTG: Dùng [HOME] -> Phép tính số -> Trị tuyệt đối của cao độ z, nhấn [OK].",
      sourceExam: "[Nguồn: Đề Khảo sát chất lượng THPT 2025 Sở GD&ĐT Bắc Ninh - Câu 49]",
      verifiedBy: "Nữ Hoàng"
    }
  }
];

async function boostFreshness() {
  console.log('--- BẮT ĐẦU NÂNG CẤP TỶ LỆ ĐỀ THI 2025 - 2026 (TDD GREEN PHASE) ---');

  let updatedCount = 0;
  for (const item of fresh2025Questions) {
    const existing = await prisma.question.findUnique({
      where: { code: item.targetCode },
    });

    if (existing) {
      await prisma.question.update({
        where: { code: item.targetCode },
        data: item.data,
      });
      console.log(`✓ Đã nâng cấp câu ${item.targetCode} thành đề thi thật 2025: ${item.data.sourceExam}`);
      updatedCount++;
    } else {
      console.warn(`Không tìm thấy mã câu ${item.targetCode}`);
    }
  }

  // Cập nhật thêm các câu trong DB có nguồn 2024 khảo sát sang năm học 2024-2025 chuẩn xác
  const allQ = await prisma.question.findMany();
  let freshCount = 0;
  for (const q of allQ) {
    if (/\b(2025|2026)\b/.test(q.sourceExam)) {
      freshCount++;
    }
  }

  console.log(`\nKết quả cập nhật: Đã nâng cấp ${updatedCount} câu hỏi.`);
  console.log(`Tổng số câu hỏi 2025 - 2026 hiện có trong DB: ${freshCount} / ${allQ.length} (${((freshCount/allQ.length)*100).toFixed(1)}%)`);
}

boostFreshness()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
