const katex = require('katex');

const q1 = {
  id: "Q14_T3",
  code: "Q14-2017",
  source: "[Nguồn: Đề thi minh họa THPT Quốc gia Bộ GD&ĐT 2017 - Câu 22]",
  difficulty: "VD",
  type: "MULTIPLE_CHOICE",
  content: "Cho một tấm nhôm hình vuông cạnh $12\\text{ cm}$. Người ta cắt ở bốn góc của tấm nhôm đó bốn hình vuông bằng nhau, mỗi hình vuông có cạnh bằng $x\\text{ (cm)}$, rồi gập tấm nhôm lại để được một cái hộp không nắp có dạng hình hộp chữ nhật. Tìm $x$ để thể tích của khối hộp nhận được là lớn nhất.",
  options: ["A. $x = 6$", "B. $x = 4$", "C. $x = 3$", "D. $x = 2$"],
  correctAnswer: "D",
  explanation: "Điều kiện xác định: Vì cạnh tấm nhôm là $12\\text{ cm}$ và ở mỗi cạnh bị cắt đi hai đoạn có độ dài $x$ nên điều kiện của $x$ là $0 < x < \\frac{12}{2} = 6$.\nKhi gập tấm nhôm lại thành chiếc hộp không nắp, các kích thước của khối hộp chữ nhật là:\n- Chiều cao của hộp: $h = x\\text{ (cm)}$.\n- Độ dài cạnh đáy hình vuông: $a = 12 - 2x\\text{ (cm)}$.\n- Thể tích của khối hộp là:\n$V(x) = x(12 - 2x)^2 = x(144 - 48x + 4x^2) = 4x^3 - 48x^2 + 144x\\text{ (cm}^3\\text{)}$.\nXét hàm số $V(x)$ trên khoảng $(0; 6)$:\n- Đạo hàm: $V'(x) = 12x^2 - 96x + 144 = 12(x^2 - 8x + 12) = 12(x - 2)(x - 6)$.\n- Cho $V'(x) = 0 \\iff x = 2$ (thỏa mãn $0 < x < 6$) hoặc $x = 6$ (loại vì không thuộc khoảng $(0; 6)$).\n- Dấu của đạo hàm trên khoảng $(0; 6)$:\n  + Với $x \\in (0; 2)$ thì $V'(x) > 0 \\implies$ hàm số đồng biến.\n  + Với $x \\in (2; 6)$ thì $V'(x) < 0 \\implies$ hàm số nghịch biến.\nDo đó hàm số $V(x)$ đạt cực đại tuyệt đối tại điểm $x = 2$.\nThể tích lớn nhất của hộp là $V(2) = 2(12 - 2 \\cdot 2)^2 = 2 \\cdot 64 = 128\\text{ cm}^3$.\nVậy để thể tích khối hộp lớn nhất thì $x = 2\\text{ cm}$.",
  distractorAnalysis: "- Phương án A ($x = 6$): Học sinh giải $V'(x) = 0$ tìm được $x = 6$ nhưng không đối chiếu điều kiện $0 < x < 6$. Tại $x = 6$, cạnh đáy bằng $12 - 2(6) = 0$, thể tích $V = 0$ (giá trị nhỏ nhất trên biên), không tạo được hộp.\n- Phương án B ($x = 4$): Học sinh chia nhầm cạnh tấm nhôm thành 3 phần bằng nhau ($12/3 = 4$).\n- Phương án C ($x = 3$): Học sinh chia nhầm cho 4 góc ($12/4 = 3$).",
  casioGuide: "- Casio fx-580VN X: Bấm MENU 8 (TABLE) -> Nhập $f(x) = x(12 - 2x)^2$ -> Nhấn '=' -> Start: 1, End: 5, Step: 0.5 -> Quan sát bảng giá trị thấy $f(x)$ đạt giá trị lớn nhất bằng 128 tại $x = 2$.\n- Casio fx-880BTG: Bấm HOME -> chọn Bảng tính (Table) -> Nhập $f(x) = x(12 - 2x)^2$ -> Cài đặt Phạm vi: Bắt đầu = 1, Kết thúc = 5, Bước = 0.5 -> Nhấn EXE để tra bảng, tìm thấy giá trị cực đại 128 tại $x = 2$."
};

const q2 = {
  id: "Q14_T3",
  code: "Q14-2024",
  source: "[Nguồn: Đề thi thử Tốt nghiệp THPT 2024 Trường Chuyên Lam Sơn - Thanh Hóa - Phần Vận dụng]",
  difficulty: "VD",
  type: "MULTIPLE_CHOICE",
  content: "Một người nông dân nuôi tôm ước tính lợi nhuận thu hoạch sau $t$ tháng theo hàm số $P(t) = -t^3 + 3t^2 + 45t - 20$ (triệu đồng) với $t \\in [1; 8]$. Người nông dân nên thu hoạch vào cuối tháng thứ mấy để đạt lợi nhuận tối đa?",
  options: ["A. Tháng 3", "B. Tháng 5", "C. Tháng 7", "D. Tháng 8"],
  correctAnswer: "B",
  explanation: "Xét hàm số $P(t) = -t^3 + 3t^2 + 45t - 20$ liên tục trên đoạn $[1; 8]$.\n- Đạo hàm: $P'(t) = -3t^2 + 6t + 45 = -3(t^2 - 2t - 15) = -3(t - 5)(t + 3)$.\n- Cho $P'(t) = 0 \\iff t = 5$ (nhận vì $5 \\in [1; 8]$) hoặc $t = -3$ (loại vì $-3 \\notin [1; 8]$).\n- Dấu của đạo hàm trên đoạn $[1; 8]$:\n  + Trên khoảng $(1; 5)$: $P'(t) > 0 \\implies$ hàm số đồng biến.\n  + Trên khoảng $(5; 8)$: $P'(t) < 0 \\implies$ hàm số nghịch biến.\n- Giá trị của hàm số tại các điểm đặc biệt:\n  + Tại $t = 1$: $P(1) = -(1)^3 + 3(1)^2 + 45(1) - 20 = 27$ (triệu đồng).\n  + Tại $t = 5$: $P(5) = -(5)^3 + 3(5)^2 + 45(5) - 20 = -125 + 75 + 225 - 20 = 155$ (triệu đồng).\n  + Tại $t = 8$: $P(8) = -(8)^3 + 3(8)^2 + 45(8) - 20 = -512 + 192 + 360 - 20 = 20$ (triệu đồng).\nSo sánh các giá trị ta có $\\max_{[1; 8]} P(t) = P(5) = 155$ triệu đồng.\nVậy người nông dân nên thu hoạch tôm vào cuối tháng thứ 5 để đạt lợi nhuận tối đa.",
  distractorAnalysis: "- Phương án A (Tháng 3): Tại $t = 3$, $P(3) = -(3)^3 + 3(3)^2 + 45(3) - 20 = 115$ triệu đồng, chưa phải mức lợi nhuận cao nhất.\n- Phương án C (Tháng 7): Tại $t = 7$, $P(7) = -(7)^3 + 3(7)^2 + 45(7) - 20 = 99$ triệu đồng, lợi nhuận đã bị sụt giảm do chi phí thức ăn và rủi ro sinh học tăng cao.\n- Phương án D (Tháng 8): Học sinh thường nhầm lẫn nuôi càng lâu ($t = 8$) thì tôm càng lớn nên lợi nhuận càng nhiều, nhưng thực tế tại $t = 8$ lợi nhuận chỉ còn $P(8) = 20$ triệu đồng.",
  casioGuide: "- Casio fx-580VN X: Bấm MENU 8 (TABLE) -> Nhập $f(x) = -x^3 + 3x^2 + 45x - 20$ -> Nhấn '=' -> Start: 1, End: 8, Step: 1 -> Bảng giá trị cho thấy tại $x = 5$ thì $f(x) = 155$ là giá trị lớn nhất.\n- Casio fx-880BTG: Bấm HOME -> chọn Bảng tính (Table) -> Nhập $f(x) = -x^3 + 3x^2 + 45x - 20$ -> Cài đặt Phạm vi: Bắt đầu = 1, Kết thúc = 8, Bước = 1 -> Tra bảng thấy $f(x)$ đạt cực đại 155 tại $x = 5$."
};

function testQuestion(q, name) {
  console.log('Testing', name);
  let mathMatches = [];
  const fields = [q.content, ...(q.options || []), q.explanation, q.distractorAnalysis, q.casioGuide];
  for (const f of fields) {
    if (!f) continue;
    const matches = f.match(/\$\$[\s\S]*?\$\$|\$[^\$]+?\$/g) || [];
    mathMatches.push(...matches);
  }
  let errCount = 0;
  for (const m of mathMatches) {
    const raw = m.startsWith('$$') ? m.slice(2, -2) : m.slice(1, -1);
    try {
      katex.renderToString(raw, { throwOnError: true });
    } catch (e) {
      console.error('KaTeX error in', name, raw, e.message);
      errCount++;
    }
  }
  console.log(name, 'math count:', mathMatches.length, 'errors:', errCount);
}

testQuestion(q1, 'Option 1');
testQuestion(q2, 'Option 2');
