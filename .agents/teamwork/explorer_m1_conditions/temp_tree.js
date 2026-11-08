module.exports = {
  "id": "root_math12",
  "title": "TOÁN 12 - KẾT NỐI TRI THỨC",
  "subtitle": "SƠ ĐỒ CÂY TRI THỨC TOÀN DIỆN · TẬP 1",
  "chapters": [
    {
      "id": "CH1",
      "number": "CHƯƠNG 01",
      "title": "ỨNG DỤNG ĐẠO HÀM ĐỂ KHẢO SÁT VÀ VẼ ĐỒ THỊ HÀM SỐ",
      "subtitle": "Bài 1 ➔ Bài 5 · 6 Chủ đề · 23 Dạng toán thực chiến",
      "color": "olive",
      "topics": [
        {
          "id": "TOPIC_1_1",
          "number": "01",
          "title": "Tính đơn điệu của hàm số",
          "subtitle": "Dấu đạo hàm · Khoảng biến thiên",
          "color": "olive",
          "mathTypes": [
            {
              "id": "MT_1_1_1",
              "code": "DẠNG 1.1",
              "title": "Xét đơn điệu của hàm đa thức (Bậc ba, bậc bốn)",
              "difficulty": "NB",
              "details": {
                "theory": "Cho hàm số $y=f(x)$ liên tục trên $K$ và có đạo hàm trên $K$.\nNếu $f'(x) \\ge 0$ (hoặc $\\le 0$) $\\forall x \\in K$ và $f'(x)=0$ chỉ tại hữu hạn điểm thì hàm số đồng biến (hoặc nghịch biến) trên $K$.",
                "signs": "Đề bài cho hàm đa thức bậc 3 $y = ax^3+bx^2+cx+d$ hoặc bậc 4 trùng phương $y = ax^4+bx^2+c$, hỏi khoảng đồng biến/nghịch biến.",
                "methods": "Bước 1: Tìm TXD $D = \\mathbb{R}$.\nBước 2: Tính đạo hàm $y'=f'(x)$, giải phương trình $y'=0$.\nBước 3: Lập bảng xét dấu của $y'$ theo quy tắc: trong trái - ngoài cùng (bậc 2) hoặc đan dấu qua nghiệm đơn.\nBước 4: Kết luận các khoảng đồng biến ($y' > 0$) và nghịch biến ($y' < 0$).",
                "mistakes": "Dùng ký hiệu $\\cup$ hoặc dấu $\\setminus$ để kết luận (ví dụ: $(-\\infty; 1) \\cup (2; +\\infty)$ là SAI, phải dùng từ 'và').",
                "sampleQuestion": {
                  "code": "Q01_D1_NB",
                  "content": "Hàm số $y = x^3 - 3x^2 + 2$ đồng biến trên khoảng nào dưới đây?",
                  "answer": "C. $(-\\infty; 0)$ và $(2; +\\infty)$",
                  "casio": "Bấm [MENU 8] Table: nhập f(x), Start = -3, End = 5, Step = 0.5 để quan sát bảng giá trị tăng hay giảm."
                }
              }
            },
            {
              "id": "MT_1_1_2",
              "code": "DẠNG 1.2",
              "title": "Đơn điệu của hàm phân thức bậc nhất / bậc nhất",
              "difficulty": "TH",
              "details": {
                "theory": "Hàm số $y = \\frac{ax+b}{cx+d}$ ($ad - bc \\ne 0, c \\ne 0$) có TXD $D = \\mathbb{R} \\setminus \\{-d/c\\}$.\nĐạo hàm: $y' = \\frac{ad - bc}{(cx+d)^2}$. Vì mẫu số luôn dương nên dấu của $y'$ hoàn toàn phụ thuộc vào dấu của định thức $ad - bc$.",
                "signs": "Hàm phân thức dạng $y = \\frac{ax+b}{cx+d}$, hỏi khoảng đồng biến/nghịch biến hoặc tìm $m$ để hàm số đơn điệu.",
                "methods": "Bước 1: Tìm TXD $D = \\mathbb{R} \\setminus \\{-d/c\\}$.\nBước 2: Tính $ad - bc$.\nBước 3: Nếu $ad - bc > 0 \\implies$ hàm số đồng biến trên từng khoảng xác định $(-\\infty; -d/c)$ và $(-d/c; +\\infty)$. Ngược lại nếu $ad - bc < 0 \\implies$ hàm số nghịch biến.",
                "mistakes": "Ghi dấu bằng $y' \\ge 0$ cho hàm bậc nhất trên bậc nhất (hàm này đạo hàm luôn khác 0, không bao giờ có dấu bằng).",
                "sampleQuestion": {
                  "code": "Q02_D1_MC",
                  "content": "Hàm số $y = \\frac{2x - 1}{x + 1}$ đồng biến trên khoảng nào dưới đây?",
                  "answer": "A. $(-\\infty; -1)$",
                  "casio": "Nhập đạo hàm d/dx tại x bất kỳ khác -1 xem kết quả luôn dương."
                }
              }
            },
            {
              "id": "MT_1_1_3",
              "code": "DẠNG 1.3",
              "title": "Đơn điệu của hàm phân thức bậc hai / bậc nhất",
              "difficulty": "TH",
              "details": {
                "theory": "Hàm số $y = \\frac{ax^2+bx+c}{px+q}$ ($a \\ne 0, p \\ne 0$) có đạo hàm:\n$y' = \\frac{apx^2 + 2aqx + (bq - cp)}{(px+q)^2}$.\nDấu của $y'$ là dấu của tam thức bậc hai ở tử số $g(x) = apx^2 + 2aqx + (bq - cp)$.",
                "signs": "Hàm số có bậc tử lớn hơn bậc mẫu 1 đơn vị, hỏi khoảng đồng biến, nghịch biến.",
                "methods": "Bước 1: Tìm TXD $D = \\mathbb{R} \\setminus \\{-q/p\\}$.\nBước 2: Tính đạo hàm $y'$, quy đồng rút gọn tử số.\nBước 3: Giải nghiệm tử số và lập bảng biến thiên có gạch sọc không xác định tại $x = -q/p$.\nBước 4: Kết luận các khoảng đơn điệu.",
                "mistakes": "Quên gạch hai sọc tại điểm làm mẫu bằng $0$ trong bảng biến thiên.",
                "sampleQuestion": {
                  "code": "Q03_D1_TH",
                  "content": "Tìm khoảng nghịch biến của hàm số $y = \\frac{x^2 - 3x + 5}{x - 1}$?",
                  "answer": "B. $(-1; 1)$ và $(1; 3)$",
                  "casio": "Dùng [MENU 8] khảo sát bảng giá trị trên [-3; 5] với bước 0.5."
                }
              }
            },
            {
              "id": "MT_1_1_4",
              "code": "DẠNG 1.4",
              "title": "Đơn điệu của hàm số chứa căn thức vô tỉ",
              "difficulty": "VD",
              "details": {
                "theory": "Với hàm số $y = \\sqrt{u(x)}$, điều kiện xác định $u(x) \\ge 0$.\nĐạo hàm trên miền $u(x) > 0$: $y' = \\frac{u'(x)}{2\\sqrt{u(x)}}$.\nDấu của $y'$ chính là dấu của biểu thức $u'(x)$.",
                "signs": "Hàm số chứa căn thức bậc hai $\\sqrt{ax^2+bx+c}$ hoặc $\\sqrt{a-x^2}$.",
                "methods": "Bước 1: Tìm TXD $D$ bằng điều kiện $u(x) \\ge 0$.\nBước 2: Tính đạo hàm $y' = \\frac{u'(x)}{2\\sqrt{u(x)}}$ với $x$ làm cho $u(x) > 0$.\nBước 3: Giải $u'(x) = 0$ và xét dấu trên tập xác định $D$.\nBước 4: Kết luận khoảng đơn điệu (chú ý chỉ xét trên tập xác định).",
                "mistakes": "Quên tìm điều kiện xác định dẫn đến lấy cả khoảng mà biểu thức trong căn bị âm.",
                "sampleQuestion": {
                  "code": "Q04_D1_VD",
                  "content": "Hàm số $y = \\sqrt{4 - x^2}$ nghịch biến trên khoảng nào?",
                  "answer": "C. $(0; 2)$ (TXD là $[-2; 2]$, đạo hàm $y' = -x/\\sqrt{4-x^2}$)"
                }
              }
            },
            {
              "id": "MT_1_1_5",
              "code": "DẠNG 1.5",
              "title": "Tìm tham số m để hàm số đơn điệu trên khoảng",
              "difficulty": "VD",
              "details": {
                "theory": "Hàm số đồng biến trên $K \\iff f'(x) \\ge 0, \\forall x \\in K$ (dấu bằng tại hữu hạn điểm).\nNếu cô lập được $m$: $m \\ge g(x) \\iff m \\ge \\max_K g(x)$; $m \\le g(x) \\iff m \\le \\min_K g(x)$.\nVới tam thức bậc hai $f'(x) \\ge 0, \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a > 0 \\\\ \\Delta \\le 0 \\end{cases}$.",
                "signs": "Đề bài chứa tham số $m$, yêu cầu đồng biến hoặc nghịch biến trên $\\mathbb{R}$ hoặc khoảng $(a; b)$.",
                "methods": "Cách 1 (Cô lập m): Chuyển tham số $m$ về một vế, khảo sát hàm $g(x)$ ở vế còn lại để tìm $\\min/\\max$.\nCách 2 (Tam thức bậc hai): Sử dụng điều kiện về dấu của tam thức bậc hai $\\Delta \\le 0$ hoặc định lý đảo dấu tam thức.",
                "mistakes": "Quên kiểm tra điều kiện dấu bằng khi lấy $\\min/\\max$ trên khoảng mở $(a; b)$.",
                "sampleQuestion": {
                  "code": "Q32_D1_SA",
                  "content": "Tìm số giá trị nguyên của tham số $m \\in [-10; 10]$ để $y = \\frac{1}{3}x^3 - mx^2 + (m^2 - 4)x + 2026$ đồng biến trên $(1; 4)$?",
                  "answer": "15 giá trị nguyên"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_1_2",
          "number": "02",
          "title": "Cực trị của hàm số",
          "subtitle": "Cực đại · Cực tiểu · Đạo hàm cấp hai",
          "color": "rust",
          "mathTypes": [
            {
              "id": "MT_1_2_1",
              "code": "DẠNG 2.1",
              "title": "Tìm điểm cực trị & giá trị cực trị qua đạo hàm cấp 1",
              "difficulty": "NB",
              "details": {
                "theory": "Nếu $f(x)$ liên tục tại $x_0$ và $f'(x)$ đổi dấu từ dương sang âm khi qua $x_0$ thì $x_0$ là điểm cực đại.\nNếu $f'(x)$ đổi dấu từ âm sang dương khi qua $x_0$ thì $x_0$ là điểm cực tiểu.\nQuy tắc: Nghiệm bội lẻ làm đạo hàm đổi dấu $\\implies$ cực trị. Nghiệm bội chẵn không đổi dấu $\\implies$ không phải cực trị.",
                "signs": "Đề bài cho công thức hàm số hoặc biểu thức đạo hàm $f'(x)$ đã phân tích nhân tử, yêu cầu tìm số điểm cực trị.",
                "methods": "Bước 1: Tìm nghiệm của $f'(x) = 0$.\nBước 2: Loại bỏ toàn bộ các nghiệm có số mũ chẵn (bội 2, bội 4...).\nBước 3: Số nghiệm bội lẻ chính là số điểm cực trị của hàm số.",
                "mistakes": "Đếm cả nghiệm bội chẵn ví dụ $(x - 1)^2 = 0 \\implies x = 1$ không phải là điểm cực trị.",
                "sampleQuestion": {
                  "code": "Q01_D1_MC",
                  "content": "Cho $f'(x) = x(x - 2)^2(x + 3)$. Số điểm cực trị của hàm số là bao nhiêu?",
                  "answer": "B. 2 điểm cực trị ($x = 0$ và $x = -3$)"
                }
              }
            },
            {
              "id": "MT_1_2_2",
              "code": "DẠNG 2.2",
              "title": "Tìm cực trị bằng đạo hàm cấp hai (Quy tắc 2 Fermat)",
              "difficulty": "TH",
              "details": {
                "theory": "Cho hàm số $y=f(x)$ có đạo hàm cấp hai trên khoảng $(a; b)$ chứa $x_0$.\nNếu $f'(x_0) = 0$ và $f''(x_0) < 0 \\implies x_0$ là điểm cực đại.\nNếu $f'(x_0) = 0$ và $f''(x_0) > 0 \\implies x_0$ là điểm cực tiểu.",
                "signs": "Hàm số lượng giác $y = \\sin x, \\cos x$ hoặc bài toán tìm tham số $m$ để hàm số đạt cực đại/cực tiểu tại điểm $x_0$ cụ thể.",
                "methods": "Bước 1: Tính đạo hàm $y'=f'(x)$ và $y''=f''(x)$.\nBước 2: Giải điều kiện cần: $f'(x_0) = 0$ để tìm các giá trị tham số $m$.\nBước 3: Thay từng giá trị $m$ vào $f''(x_0)$:\n- Cực đại: kiểm tra $f''(x_0) < 0$.\n- Cực tiểu: kiểm tra $f''(x_0) > 0$.\nBước 4: Kết luận giá trị $m$ thỏa mãn.",
                "mistakes": "Nhầm lẫn dấu của đạo hàm cấp hai: nhầm $f''(x_0) > 0$ thành cực đại (thực tế $f'' > 0$ là cực tiểu).",
                "sampleQuestion": {
                  "code": "Q05_D2_TH",
                  "content": "Tìm $m$ để hàm số $y = x^3 - 3mx^2 + 9x - 1$ đạt cực tiểu tại $x = 3$?",
                  "answer": "m = 2 (tính $y' = 3x^2 - 6mx + 9 = 0 \\implies m=2$, thay vào $y''(3) = 6(3) - 12 = 6 > 0$)"
                }
              }
            },
            {
              "id": "MT_1_2_3",
              "code": "DẠNG 2.3",
              "title": "Cực trị của hàm hợp y = f(u(x)) & Đồ thị đạo hàm f'(x)",
              "difficulty": "VDC",
              "details": {
                "theory": "Đạo hàm hàm hợp: $g'(x) = [f(u(x))]' = u'(x) \\cdot f'(u(x))$.\nPhương trình $g'(x) = 0 \\iff u'(x) = 0$ hoặc $u(x) = x_i$ (với $x_i$ là các nghiệm đơn của phương trình $f'(t) = 0$).",
                "signs": "Đề bài cho đồ thị hoặc bảng biến thiên của đạo hàm $f'(x)$, hỏi số điểm cực trị của hàm $g(x) = f(x^2-2x)$ hoặc $f(2-x)$.",
                "methods": "Bước 1: Tính đạo hàm $g'(x) = u'(x) \\cdot f'(u(x))$.\nBước 2: Tìm nghiệm của $u'(x) = 0$.\nBước 3: Xác định các giao điểm cắt ngang của đồ thị $f'(t)$ với trục hoành $\\implies t = x_1, x_2, \\dots$\nBước 4: Cho $u(x) = x_i$ giải tìm số nghiệm bội lẻ.\nBước 5: Tổng số điểm cực trị = số nghiệm đơn của $u'(x) = 0$ + số nghiệm đơn của các phương trình $u(x) = x_i$.",
                "mistakes": "Lấy cả điểm tiếp xúc của đồ thị $f'(x)$ với trục hoành (điểm tiếp xúc là nghiệm bội chẵn, không sinh ra cực trị).",
                "sampleQuestion": {
                  "code": "Q31_D1_TF",
                  "content": "Cho $f'(x) = (x-1)^2(x+2)^2(x-3)$. Hàm số $g(x) = f(2 - x)$ có bao nhiêu điểm cực trị?",
                  "answer": "1 điểm cực trị (tại $x = -1$)"
                }
              }
            },
            {
              "id": "MT_1_2_4",
              "code": "DẠNG 2.4",
              "title": "Phương trình đường thẳng qua hai điểm cực trị hàm bậc ba",
              "difficulty": "VD",
              "details": {
                "theory": "Với hàm số bậc ba $y = ax^3+bx^2+cx+d$ có hai điểm cực trị, chia đa thức $y$ cho $y'$ ta được:\n$y = y' \\cdot q(x) + r(x)$.\nTại các điểm cực trị thì $y'=0$, do đó tọa độ hai điểm cực trị luôn thỏa mãn: $y = r(x)$.\nVậy đường thẳng $y = r(x)$ chính là phương trình đường thẳng đi qua 2 điểm cực trị.",
                "signs": "Tìm phương trình đường thẳng đi qua 2 điểm cực trị của đồ thị hàm bậc ba, hoặc tìm $m$ để đường thẳng đó vuông góc/song song với đường thẳng khác.",
                "methods": "Cách 1: Thực hiện phép chia đa thức $y$ cho $y'$ lấy phần dư bậc nhất $r(x) = Ax + B$.\nCách 2 (Công thức nhanh): $y = \\left(c - \\frac{b^2}{3a}\\right)x + \\left(d - \\frac{bc}{9a}\\right)$.\nCách 3 (Casio): Vào [MENU 2] Số phức: Nhập $y - \\frac{y' \\cdot y''}{18a}$ rồi CALC $x = i$.",
                "mistakes": "Chia nhầm dấu dẫn đến sai hệ số góc của đường thẳng.",
                "sampleQuestion": {
                  "code": "Q06_D2_VD",
                  "content": "Viết phương trình đường thẳng đi qua 2 điểm cực trị của $y = x^3 - 3x^2 + 1$?",
                  "answer": "y = -2x + 1 (chia cho $y' = 3x^2 - 6x$ ra phần dư $-2x + 1$)"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_1_3",
          "number": "03",
          "title": "Giá trị lớn nhất & nhỏ nhất của hàm số",
          "subtitle": "Đoạn đóng · Khoảng mở · Hàm trị tuyệt đối",
          "color": "gold",
          "mathTypes": [
            {
              "id": "MT_1_3_1",
              "code": "DẠNG 3.1",
              "title": "Tìm GTLN - GTNN trên đoạn đóng [a; b]",
              "difficulty": "NB",
              "details": {
                "theory": "Hàm số liên tục trên đoạn đóng $[a; b]$ luôn đạt GTLN và GTNN.\n$\\max_{[a; b]} f(x) = \\max \\{ f(a), f(b), f(x_i) \\}$ với $x_i \\in (a; b)$ thỏa $f'(x_i)=0$.",
                "signs": "Đề bài cho đoạn đóng $[a; b]$, yêu cầu tìm $\\max, \\min$ của hàm số.",
                "methods": "Bước 1: Tính đạo hàm $f'(x)$, giải phương trình $f'(x)=0$ tìm nghiệm $x_i \\in (a; b)$.\nBước 2: Tính các giá trị $f(a), f(b)$ và $f(x_i)$.\nBước 3: So sánh để kết luận giá trị lớn nhất (GTLN) và nhỏ nhất (GTNN).",
                "mistakes": "Lấy cả nghiệm $x_i$ nằm ngoài khoảng $(a; b)$.",
                "sampleQuestion": {
                  "code": "Q06_D2_MC",
                  "content": "Giá trị nhỏ nhất của $f(x) = x^4 - 2x^2 + 3$ trên đoạn $[0; 2]$ bằng bao nhiêu?",
                  "answer": "A. 2 (đạt tại $x = 1$)",
                  "casio": "Bấm [MENU 8] Table: nhập hàm số, Start = 0, End = 2, Step = 0.2 để đọc min/max."
                }
              }
            },
            {
              "id": "MT_1_3_2",
              "code": "DẠNG 3.2",
              "title": "Tìm GTLN - GTNN trên khoảng mở (a; b) hoặc nửa khoảng",
              "difficulty": "TH",
              "details": {
                "theory": "Trên khoảng $(a; b)$, hàm số không nhất thiết phải đạt $\\max, \\min$.\nBắt buộc phải lập bảng biến thiên và tính các giới hạn tại hai đầu mút $\\lim_{x \\to a^+} f(x)$ và $\\lim_{x \\to b^-} f(x)$.",
                "signs": "Khoảng mở $(0; +\\infty)$ hoặc nửa khoảng $[a; +\\infty)$, thường xuất hiện trong bài toán thực tế.",
                "methods": "Bước 1: Tính $f'(x)$, tìm nghiệm $x_i \\in (a; b)$.\nBước 2: Lập bảng biến thiên trên $(a; b)$ có điền giới hạn tại các đầu mút.\nBước 3: Dựa vào mũi tên biến thiên kết luận $\\max, \\min$ (nếu đầu mút tiến tới $\\pm \\infty$ thì không tồn tại $\\max/\\min$).",
                "mistakes": "Nhầm lẫn giá trị giới hạn tại đầu mút mở là giá trị lớn nhất (đầu mút mở không bao giờ đạt được dấu bằng).",
                "sampleQuestion": {
                  "code": "Q07_D3_TH",
                  "content": "Tìm giá trị nhỏ nhất của $f(x) = x + \\frac{4}{x}$ trên $(0; +\\infty)$?",
                  "answer": "4 (đạt tại $x = 2$, có thể dùng BĐT Cauchy: $x + 4/x \\ge 2\\sqrt{4} = 4$)"
                }
              }
            },
            {
              "id": "MT_1_3_3",
              "code": "DẠNG 3.3",
              "title": "GTLN & GTNN của hàm chứa dấu giá trị tuyệt đối |f(x)|",
              "difficulty": "VD",
              "details": {
                "theory": "Xét hàm $y = |f(x)|$ trên $[a; b]$. Đặt $M = \\max_{[a; b]} f(x)$ và $m = \\min_{[a; b]} f(x)$.\nKhi đó $\\max_{[a; b]} |f(x)| = \\max \\{|M|, |m|\\} = \\frac{|M + m| + |M - m|}{2}$.\nNếu $m \\le 0 \\le M \\implies \\min_{[a; b]} |f(x)| = 0$.",
                "signs": "Bài toán tìm tham số $m$ để $\\max_{[a; b]} |f(x, m)| \\le k$ hoặc đạt giá trị nhỏ nhất.",
                "methods": "Bước 1: Khảo sát hàm lõi $u(x) = f(x)$ không chứa trị tuyệt đối trên $[a; b]$ để tìm $M, m$.\nBước 2: Áp dụng bất đẳng thức $|f(x)| \\le k \\iff -k \\le f(x) \\le k, \\forall x \\in [a; b]$.\nBước 3: Giải hệ điều kiện: $\\max f(x) \\le k$ và $\\min f(x) \\ge -k$.\nBước 4: Tìm giá trị tham số tối ưu.",
                "mistakes": "Chỉ giải $f(x) \\le k$ mà quên mất điều kiện cận dưới $f(x) \\ge -k$.",
                "sampleQuestion": {
                  "code": "CH1_D2_VD02",
                  "content": "Tìm m để giá trị lớn nhất của $y = |x^3 - 3x + m|$ trên $[0; 2]$ đạt giá trị nhỏ nhất?",
                  "answer": "m = -1 (đạt tại tâm đối xứng của dải giá trị [-2; 2])"
                }
              }
            },
            {
              "id": "MT_1_3_4",
              "code": "DẠNG 3.4",
              "title": "Tìm tham số m trong bài toán GTLN - GTNN",
              "difficulty": "VD",
              "details": {
                "theory": "Cho điều kiện $\\max_{[a; b]} f(x, m) = K$ hoặc $\\min_{[a; b]} f(x, m) = K$.\nNếu hàm đơn điệu trên $[a; b]$ (ví dụ hàm bậc nhất/bậc nhất): $\\max/\\min$ luôn đạt tại 1 trong 2 đầu mút $x = a$ hoặc $x = b$.",
                "signs": "Hàm phân thức $y = \\frac{x+m}{x-1}$ trên đoạn $[2; 4]$ có giá trị lớn nhất bằng 3.",
                "methods": "Bước 1: Xét tính đơn điệu của hàm số theo tham số $m$.\nBước 2: Nếu hàm đồng biến $\\implies \\max = f(b), \\min = f(a)$.\nBước 3: Nếu hàm nghịch biến $\\implies \\max = f(a), \\min = f(b)$.\nBước 4: Giải phương trình tìm $m$ và đối chiếu điều kiện mẫu khác 0.",
                "mistakes": "Quên đối chiếu điều kiện mẫu số khác 0 trên đoạn đóng $[a; b]$.",
                "sampleQuestion": {
                  "code": "Q08_D3_VD",
                  "content": "Tìm $m$ để giá trị lớn nhất của $y = \\frac{x - m}{x + 1}$ trên $[0; 1]$ bằng 2?",
                  "answer": "m = -3 (thử m = -3 có $y = (x+3)/(x+1)$ nghịch biến $\\implies \\max = y(0) = 3$ sai, kiểm tra kỹ nghiệm)"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_1_4",
          "number": "04",
          "title": "Đường tiệm cận của đồ thị hàm số",
          "subtitle": "Đứng · Ngang · Tiệm cận xiên",
          "color": "ink",
          "mathTypes": [
            {
              "id": "MT_1_4_1",
              "code": "DẠNG 4.1",
              "title": "Tiệm cận đứng và tiệm cận ngang cơ bản",
              "difficulty": "NB",
              "details": {
                "theory": "Tiệm cận ngang: Đường thẳng $y = y_0$ là tiệm cận ngang nếu $\\lim_{x \\to +\\infty} f(x) = y_0$ hoặc $\\lim_{x \\to -\\infty} f(x) = y_0$.\nTiệm cận đứng: Đường thẳng $x = x_0$ là tiệm cận đứng nếu ít nhất một trong các giới hạn $\\lim_{x \\to x_0^\\pm} f(x) = \\pm \\infty$.",
                "signs": "Hàm phân thức $y = \\frac{P(x)}{Q(x)}$, hỏi số đường tiệm cận đứng và ngang.",
                "methods": "Bước 1: Tiệm cận ngang: So sánh bậc của tử và mẫu:\n- Bậc tử < Bậc mẫu $\\implies y = 0$.\n- Bậc tử = Bậc mẫu $\\implies y = a/c$.\n- Bậc tử > Bậc mẫu $\\implies$ không có TCN.\nBước 2: Tiệm cận đứng: Giải nghiệm mẫu $Q(x) = 0$, triệt tiêu với nghiệm tử nếu có trước khi kết luận.",
                "mistakes": "Không triệt tiêu nghiệm chung giữa tử và mẫu dẫn đến đếm thừa đường tiệm cận đứng.",
                "sampleQuestion": {
                  "code": "Q12_D3_TF",
                  "content": "Xét tiệm cận của đồ thị hàm số $y = \\frac{x^2 - x - 2}{x^2 - 4}$.",
                  "answer": "Đồ thị có 1 TCĐ $x = -2$ (nghiệm $x=2$ bị triệt tiêu) và 1 TCN $y = 1$.",
                  "casio": "Nhập hàm, CALC x = 10^9 ra 1 (TCN), CALC x = -2.0001 ra số vô cùng lớn (TCĐ)."
                }
              }
            },
            {
              "id": "MT_1_4_2",
              "code": "DẠNG 4.2",
              "title": "Tiệm cận của hàm số chứa căn thức (Lưu ý dấu âm tại -∞)",
              "difficulty": "TH",
              "details": {
                "theory": "Khi $x \\to +\\infty$ thì $\\sqrt{x^2} = x$. Nhưng khi $x \\to -\\infty$ thì $\\sqrt{x^2} = |x| = -x$.\nDo đó hàm chứa căn thức thường có 2 đường tiệm cận ngang đối xứng nhau.",
                "signs": "Hàm số dạng $y = \\frac{\\sqrt{x^2+1}}{x-1}$ hoặc $y = \\sqrt{x^2+2x} - x$.",
                "methods": "Bước 1: Tìm TXD của hàm số.\nBước 2: Tính $\\lim_{x \\to +\\infty} y$ bằng cách đặt $x$ ra ngoài căn.\nBước 3: Tính $\\lim_{x \\to -\\infty} y$ bằng cách đặt $-x$ ra ngoài căn.\nBước 4: Kết luận các đường tiệm cận ngang $y = y_1$ và $y = y_2$.",
                "mistakes": "Quên dấu trừ khi rút $x$ ra khỏi căn thức ở nhánh âm vô cực $x \\to -\\infty$.",
                "sampleQuestion": {
                  "code": "Q36_D3_TF",
                  "content": "Tìm các đường tiệm cận ngang của đồ thị $y = \\frac{\\sqrt{x^2+1}-x}{x-1}$?",
                  "answer": "Có 2 TCN: $y = 0$ (khi $x \\to +\\infty$) và $y = -2$ (khi $x \\to -\\infty$)."
                }
              }
            },
            {
              "id": "MT_1_4_3",
              "code": "DẠNG 4.3",
              "title": "Tiệm cận xiên của hàm phân thức bậc hai / bậc nhất",
              "difficulty": "TH",
              "details": {
                "theory": "Với hàm $y = \\frac{ax^2+bx+c}{px+q}$ ($a \\ne 0, p \\ne 0$), chia đa thức tử cho mẫu:\n$y = mx+n + \\frac{r}{px+q}$. Khi đó đường thẳng $y = mx+n$ là tiệm cận xiên.\nTổng quát: $a = \\lim_{x \\to \\pm \\infty} \\frac{f(x)}{x}$ và $b = \\lim_{x \\to \\pm \\infty} [f(x) - ax]$.",
                "signs": "Đồ thị hàm phân thức có bậc tử lớn hơn bậc mẫu đúng 1 đơn vị.",
                "methods": "Bước 1: Thực hiện phép chia đa thức tử cho mẫu.\nBước 2: Phần thương bậc nhất $y = mx+n$ chính là phương trình đường tiệm cận xiên.\nBước 3: Kiểm tra điều kiện $\\lim_{x \\to \\pm \\infty} \\frac{r}{px+q} = 0$.",
                "mistakes": "Chia nhầm dấu hệ số tự do dẫn đến sai hệ số tự do $n$ của tiệm cận xiên.",
                "sampleQuestion": {
                  "code": "Q35_D3_MC",
                  "content": "Tìm tiệm cận xiên của đồ thị $y = \\frac{3x^2 - 5x + 2}{x - 2}$?",
                  "answer": "A. $y = 3x + 1$ (chia ra $y = 3x + 1 + 4/(x - 2)$)"
                }
              }
            },
            {
              "id": "MT_1_4_4",
              "code": "DẠNG 4.4",
              "title": "Tìm tham số m để đồ thị có số đường tiệm cận thỏa mãn",
              "difficulty": "VD",
              "details": {
                "theory": "Đồ thị hàm phân thức $y = \\frac{P(x)}{x^2 - 2mx + m + 2}$ có đúng 2 tiệm cận đứng $\\iff$ phương trình mẫu số có 2 nghiệm phân biệt không trùng với nghiệm của tử số.",
                "signs": "Tìm $m$ để đồ thị có đúng 3 đường tiệm cận, hoặc tiệm cận tạo với 2 trục tọa độ một tam giác có diện tích bằng $S_0$.",
                "methods": "Bước 1: Xác định số đường tiệm cận ngang cố định.\nBước 2: Tính số đường tiệm cận đứng cần có $\\implies$ đặt điều kiện cho nghiệm mẫu số: $\\Delta > 0$ và nghiệm không làm triệt tiêu tử số.\nBước 3: Giải điều kiện và kết luận giá trị $m$.",
                "mistakes": "Quên kiểm tra điều kiện nghiệm của mẫu làm tử số bằng 0.",
                "sampleQuestion": {
                  "code": "Q13_D4_VD",
                  "content": "Tìm $m$ để đồ thị $y = \\frac{x - 1}{x^2 - 2mx + 4}$ có đúng 2 đường tiệm cận đứng?",
                  "answer": "m > 2 hoặc m < -2 và $m \\ne 5/2$"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_1_5",
          "number": "05",
          "title": "Khảo sát sự biến thiên & Đồ thị hàm số",
          "subtitle": "Biến thiên · Tương giao · Tiếp tuyến · Đối xứng",
          "color": "sage",
          "mathTypes": [
            {
              "id": "MT_1_5_1",
              "code": "DẠNG 5.1",
              "title": "Quy tắc 5 bước nhận diện đồ thị & Bảng biến thiên",
              "difficulty": "NB",
              "details": {
                "theory": "Quy tắc 5 bước nhận diện đồ thị hàm số:\n1. Nhánh ngoài cùng bên phải: đi lên $\\implies a > 0$, đi xuống $\\implies a < 0$.\n2. Giao điểm trục tung $Oy$ ($x=0$): xác định hệ số tự do $d$.\n3. Tọa độ các điểm cực trị ($x_{CĐ}, x_{CT}, y_{CĐ}, y_{CT}$).\n4. Các đường tiệm cận đứng, ngang, xiên (với hàm phân thức).\n5. Tọa độ giao điểm với trục hoành $Ox$ ($y=0$).",
                "signs": "Đề bài cho hình vẽ đường cong hoặc bảng biến thiên, yêu cầu chọn công thức hàm số đúng.",
                "methods": "Bước 1: Nhìn nhánh ngoài cùng bên phải loại bớt 2 phương án ngược dấu $a$.\nBước 2: Nhìn giao điểm trục tung $Oy$ để xác định dấu hệ số tự do $d$.\nBước 3: Nhìn tiệm cận đứng $x = -d/c$ và tiệm cận ngang $y = a/c$.\nBước 4: Thử một điểm đặc biệt đi qua để chọn phương án duy nhất.",
                "mistakes": "Nhìn nhánh bên trái thay vì nhánh ngoài cùng bên phải dẫn đến xác định ngược dấu hệ số $a$.",
                "sampleQuestion": {
                  "code": "Q37_D4_MC",
                  "content": "Đường cong có TCĐ $x = -1$, TCN $y = 2$ và cắt $Oy$ tại $(0; -1)$ là đồ thị của hàm số nào?",
                  "answer": "A. $y = \\frac{2x - 1}{x + 1}$"
                }
              }
            },
            {
              "id": "MT_1_5_2",
              "code": "DẠNG 5.2",
              "title": "Bài toán tương giao đồ thị & Biện luận số nghiệm f(x) = m",
              "difficulty": "TH",
              "details": {
                "theory": "Số nghiệm thực của phương trình $f(x) = m$ bằng đúng số giao điểm của đồ thị $(C): y = f(x)$ và đường thẳng nằm ngang $d: y = m$.\n- Cắt phía trên cực đại: 1 nghiệm.\n- Cắt đúng điểm cực đại/cực tiểu: 2 nghiệm (1 nghiệm kép tiếp xúc, 1 nghiệm đơn).\n- Cắt giữa cực tiểu và cực đại: 3 nghiệm phân biệt.",
                "signs": "Cho đồ thị hàm số $y=f(x)$, hỏi số nghiệm của phương trình $f(x) - 2 = 0$ hoặc tìm $m$ để phương trình có 3 nghiệm phân biệt.",
                "methods": "Bước 1: Biến đổi phương trình về dạng $f(x) = g(m)$.\nBước 2: Vẽ đường thẳng nằm ngang $y = g(m)$ cắt các nhánh của đồ thị.\nBước 3: So sánh vị trí tương đối với các giá trị cực trị $y_{CT}$ và $y_{CĐ}$.",
                "mistakes": "Nhầm lẫn giữa giá trị cực trị ($y$) và điểm cực trị ($x$) khi đặt điều kiện giao điểm.",
                "sampleQuestion": {
                  "code": "Q10_D5_TH",
                  "content": "Cho hàm số $y=f(x)$ có bảng biến thiên với $y_{CĐ}=3, y_{CT}=-1$. Tìm $m$ để $f(x) = m$ có 3 nghiệm phân biệt?",
                  "answer": "-1 < m < 3"
                }
              }
            },
            {
              "id": "MT_1_5_3",
              "code": "DẠNG 5.3",
              "title": "Phương trình tiếp tuyến của đồ thị hàm số",
              "difficulty": "TH",
              "details": {
                "theory": "Phương trình tiếp tuyến của $(C): y = f(x)$ tại điểm $M_0(x_0; y_0)$ là:\n$y = f'(x_0)(x - x_0) + y_0$.\n- Hệ số góc: $k = f'(x_0)$.\n- Tiếp tuyến song song $y = ax+b \\implies f'(x_0) = a$.\n- Tiếp tuyến vuông góc $y = ax+b \\implies f'(x_0) \\cdot a = -1$.",
                "signs": "Viết phương trình tiếp tuyến tại điểm có hoành độ $x_0$, tiếp tuyến biết hệ số góc $k$, hoặc tiếp tuyến đi qua điểm $A(x_A; y_A)$ cho trước.",
                "methods": "Trường hợp 1 (Tại điểm): Tính $y_0 = f(x_0)$, tính $k = f'(x_0)$ rồi ráp công thức.\nTrường hợp 2 (Biết hệ số góc): Giải $f'(x_0) = k$ tìm $x_0$, sau đó viết phương trình.\nTrường hợp 3 (Đi qua điểm): Lập hệ phương trình tiếp xúc $\\begin{cases} f(x_0) = k(x_A - x_0) + y_A \\\\ f'(x_0) = k \\end{cases}$ để tìm tiếp điểm $x_0$.",
                "mistakes": "Nhầm lẫn giữa tiếp tuyến TẠI một điểm thuộc đồ thị và tiếp tuyến ĐI QUA một điểm bên ngoài.",
                "sampleQuestion": {
                  "code": "Q14_D4_MC",
                  "content": "Viết phương trình tiếp tuyến của $y = x^3 - 3x + 2$ tại điểm có hoành độ $x_0 = 2$?",
                  "answer": "A. $y = 9x - 14$"
                }
              }
            },
            {
              "id": "MT_1_5_4",
              "code": "DẠNG 5.4",
              "title": "Tâm đối xứng và trục đối xứng của đồ thị hàm số",
              "difficulty": "TH",
              "details": {
                "theory": "1. Đồ thị hàm bậc ba $y = ax^3+bx^2+cx+d$ luôn nhận điểm uốn $I(x_0; y_0)$ (nghiệm của $y''=0$, $x_0 = -b/(3a)$) làm tâm đối xứng.\n2. Đồ thị hàm phân thức $y = \\frac{ax+b}{cx+d}$ nhận giao điểm của 2 đường tiệm cận $I(-d/c; a/c)$ làm tâm đối xứng.\n3. Đồ thị hàm phân thức bậc 2 trên bậc 1 nhận giao điểm của tiệm cận đứng và tiệm cận xiên làm tâm đối xứng.",
                "signs": "Tìm tọa độ tâm đối xứng của đồ thị hàm số, hoặc tìm $m$ để tâm đối xứng thuộc một đường thẳng cho trước.",
                "methods": "Bước 1: Nhận diện loại hàm số.\nBước 2: Với hàm bậc 3: tính $y'' = 6ax + 2b = 0 \\implies x_0 = -b/(3a)$, tính $y_0 = f(x_0) \\implies I(x_0; y_0)$.\nBước 3: Với hàm phân thức: tìm giao điểm của 2 đường tiệm cận $\\implies I(x_0; y_0)$.",
                "mistakes": "Quên tính tung độ $y_0$ bằng cách thay $x_0$ vào hàm ban đầu $f(x)$ mà thay nhầm vào đạo hàm.",
                "sampleQuestion": {
                  "code": "Q15_D5_TH",
                  "content": "Tìm tọa độ tâm đối xứng của đồ thị hàm số $y = x^3 - 3x^2 + 4$?",
                  "answer": "I(1; 2) (vì $y'' = 6x - 6 = 0 \\implies x = 1, y(1) = 2$)"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_1_6",
          "number": "06",
          "title": "Ứng dụng đạo hàm giải bài toán tối ưu thực tiễn",
          "subtitle": "Mô hình hóa kinh tế · Tối ưu hình học bao bì",
          "color": "terracotta",
          "mathTypes": [
            {
              "id": "MT_1_6_1",
              "code": "DẠNG 6.1",
              "title": "Tối ưu hóa kinh tế (Chi phí biên, Doanh thu, Lợi nhuận)",
              "difficulty": "VD",
              "details": {
                "theory": "1. Hàm tổng chi phí $C(x)$, hàm chi phí biên $C'(x)$, hàm chi phí trung bình $\\bar{C}(x) = \\frac{C(x)}{x}$.\n2. Hàm doanh thu $R(x) = x \\cdot p(x)$ (với $p(x)$ là hàm giá bán).\n3. Hàm lợi nhuận $P(x) = R(x) - C(x)$.\n4. Lợi nhuận tối đa khi $P'(x) = 0 \\iff R'(x) = C'(x)$ (Doanh thu cận biên = Chi phí cận biên).",
                "signs": "Bài toán bằng lời văn kinh tế: chi phí sản xuất thấp nhất, lợi nhuận lớn nhất, doanh thu tối đa.",
                "methods": "Bước 1: Gọi biến số sản lượng $x > 0$.\nBước 2: Thiết lập hàm mục tiêu (Lợi nhuận $P(x)$ hoặc Chi phí trung bình $\\bar{C}(x)$).\nBước 3: Tính đạo hàm và giải phương trình đạo hàm bằng 0.\nBước 4: Kết luận giá trị sản lượng $x$ tối ưu.",
                "mistakes": "Tìm cực tiểu của tổng chi phí $C(x)$ thay vì chi phí trung bình $\\bar{C}(x) = C(x)/x$.",
                "sampleQuestion": {
                  "code": "Q34_D2_SA",
                  "content": "Cho $C(x) = x^3 - 30x^2 + 500x + 1000$. Tìm $x$ để chi phí trung bình $\\bar{C}(x)$ nhỏ nhất?",
                  "answer": "20 sản phẩm/ngày"
                }
              }
            },
            {
              "id": "MT_1_6_2",
              "code": "DẠNG 6.2",
              "title": "Tối ưu hóa hình học thực tiễn (Thể tích, Diện tích tôn, Rào chắn)",
              "difficulty": "VD",
              "details": {
                "theory": "Thiết lập mối quan hệ giữa biến số cần tìm $x$ và hàm mục tiêu diện tích $S(x)$ hoặc thể tích $V(x)$.\nÁp dụng đạo hàm hoặc bất đẳng thức Cauchy $a+b \\ge 2\\sqrt{ab}$ để tìm giá trị tối ưu.",
                "signs": "Bài toán gấp hộp không nắp có thể tích lớn nhất, làm lon bia tốn ít nhôm nhất, rào mảnh đất chi phí rẻ nhất.",
                "methods": "Bước 1: Chọn ẩn số thích hợp và tìm điều kiện thực tế của ẩn số.\nBước 2: Rút các đại lượng phụ theo ẩn số chính.\nBước 3: Lập hàm mục tiêu $f(x)$.\nBước 4: Khảo sát hàm số tìm điểm cực trị tối ưu.",
                "mistakes": "Quên kiểm tra điều kiện hình học tự nhiên (chiều dài, chiều rộng, chiều cao phải dương).",
                "sampleQuestion": {
                  "code": "Q33_D2_TF",
                  "content": "Rào mảnh đất $300\\text{ m}^2$ giáp bờ tường thẳng bằng chiều dài lưới rào $L(x) = 2x + 300/x$. Tìm $x$ để hàng rào ngắn nhất?",
                  "answer": "x = 5\\sqrt{6} \\approx 12{,}25 m"
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "CH2",
      "number": "CHƯƠNG 02",
      "title": "VECTƠ VÀ HỆ TRỤC TỌA ĐỘ TRONG KHÔNG GIAN",
      "subtitle": "Bài 6 ➔ Bài 8 · 4 Chủ đề · 14 Dạng toán thực chiến",
      "color": "cyan",
      "topics": [
        {
          "id": "TOPIC_2_1",
          "number": "07",
          "title": "Vectơ không gian & Các quy tắc hình học",
          "subtitle": "Quy tắc hình hộp · Phân tích cơ sở · Tích vô hướng",
          "color": "cyan",
          "mathTypes": [
            {
              "id": "MT_2_1_1",
              "code": "DẠNG 7.1",
              "title": "Quy tắc 3 điểm, hình bình hành & Quy tắc hình hộp",
              "difficulty": "NB",
              "details": {
                "theory": "1. Quy tắc 3 điểm: $\\vec{AB} + \\vec{BC} = \\vec{AC}$ và $\\vec{AB} - \\vec{AC} = \\vec{CB}$.\n2. Quy tắc hình bình hành: $\\vec{AB} + \\vec{AD} = \\vec{AC}$.\n3. Quy tắc hình hộp: Với hình hộp $ABCD.A'B'C'$, đường chéo $\\vec{AC'} = \\vec{AB} + \\vec{AD} + \\vec{AA'}$.\n4. Quy tắc trọng tâm tứ diện: $\\vec{OG} = \\frac{1}{4}(\\vec{OA} + \\vec{OB} + \\vec{OC} + \\vec{OD})$.",
                "signs": "Hình hộp chữ nhật, tứ diện, lăng trụ; yêu cầu thu gọn biểu thức vectơ hoặc tính độ dài vectơ tổng.",
                "methods": "Bước 1: Chọn đỉnh xuất phát chung.\nBước 2: Sử dụng quy tắc cộng, hiệu và chèn điểm xen kẽ.\nBước 3: Thu gọn về các vectơ cạnh cơ sở.",
                "mistakes": "Nhầm lẫn chiều vectơ khi đổi điểm (quên dấu trừ: $\\vec{BA} = -\\vec{AB}$).",
                "sampleQuestion": {
                  "code": "Q39_D5_MC",
                  "content": "Cho tứ diện ABCD, M và N là trung điểm AB và CD. Biểu diễn vectơ MN theo AD và BC?",
                  "answer": "D. $\\vec{MN} = \\frac{1}{2}(\\vec{AD} + \\vec{BC})$"
                }
              }
            },
            {
              "id": "MT_2_1_2",
              "code": "DẠNG 7.2",
              "title": "Phân tích vectơ theo 3 vectơ cơ sở không đồng phẳng",
              "difficulty": "TH",
              "details": {
                "theory": "Định lý: Cho 3 vectơ $\\vec{a}, \\vec{b}, \\vec{c}$ không đồng phẳng. Với mọi vectơ $\\vec{v}$ trong không gian, luôn tồn tại duy nhất một bộ ba số thực $(x; y; z)$ sao cho:\n$\\vec{v} = x\\vec{a} + y\\vec{b} + z\\vec{c}$.",
                "signs": "Cho tứ diện hoặc hình hộp, biểu diễn vectơ một đoạn nối bất kỳ qua 3 cạnh xuất phát từ một đỉnh.",
                "methods": "Bước 1: Chọn gốc tại đỉnh có 3 cạnh cơ sở $\\vec{a}, \\vec{b}, \\vec{c}$.\nBước 2: Tách vectơ cần tìm bằng quy tắc chèn điểm liên tiếp.\nBước 3: Sử dụng tỉ số chia đoạn thẳng (trung điểm tỉ số $1/2$, trọng tâm tam giác tỉ số $1/3$, trọng tâm tứ diện $1/4$).\nBước 4: Rút gọn các hệ số.",
                "mistakes": "Nhầm tỉ số trọng tâm tam giác ($1/3$) với trung điểm đoạn thẳng ($1/2$).",
                "sampleQuestion": {
                  "code": "Q40_D5_TF",
                  "content": "Cho lăng trụ $ABC.A'B'C'$. Gọi $G$ là trọng tâm $\\Delta A'B'C'$. Biểu diễn $\\vec{AG}$ theo $\\vec{AA'}, \\vec{AB}, \\vec{AC}$?",
                  "answer": "$\\vec{AG} = \\vec{AA'} + \\frac{1}{3}\\vec{AB} + \\frac{1}{3}\\vec{AC}$"
                }
              }
            },
            {
              "id": "MT_2_1_3",
              "code": "DẠNG 7.3",
              "title": "Tích vô hướng và góc giữa hai vectơ không gian",
              "difficulty": "TH",
              "details": {
                "theory": "1. Tích vô hướng: $\\vec{u} \\cdot \\vec{v} = |\\vec{u}| \\cdot |\\vec{v}| \\cdot \\cos(\\vec{u}, \\vec{v})$.\n2. Góc giữa hai vectơ: $\\cos(\\vec{u}, \\vec{v}) = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|}$.\n3. Điều kiện vuông góc: $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$.",
                "signs": "Tính góc giữa 2 cạnh chéo nhau trong hình lập phương, tứ diện đều; hoặc chứng minh 2 đường thẳng vuông góc.",
                "methods": "Bước 1: Đưa các vectơ về cùng một gốc, hoặc phân tích theo bộ ba vectơ cơ sở đã biết độ dài và góc đôi một.\nBước 2: Tính tích vô hướng bằng cách nhân đa thức vectơ.\nBước 3: Áp dụng công thức tính cosin góc.",
                "mistakes": "Nhầm góc giữa 2 vectơ với góc giữa 2 đường thẳng (góc giữa 2 vectơ có thể tù $>90^\\circ$, nhưng góc giữa 2 đường thẳng luôn $\\le 90^\\circ$).",
                "sampleQuestion": {
                  "code": "Q21_D5_MC",
                  "content": "Cho lăng trụ tam giác đều $ABC.A'B'C'$ có tất cả các cạnh bằng $a$. Tính góc giữa $\\vec{AB}$ và $\\vec{A'C'}$?",
                  "answer": "C. $60^\\circ$"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_2_2",
          "number": "08",
          "title": "Hệ trục tọa độ Oxyz & Tọa độ điểm, vectơ",
          "subtitle": "Tọa độ điểm & vectơ · Trung điểm · Đối xứng",
          "color": "emerald",
          "mathTypes": [
            {
              "id": "MT_2_2_1",
              "code": "DẠNG 8.1",
              "title": "Biểu thức tọa độ của các phép toán vectơ trong Oxyz",
              "difficulty": "NB",
              "details": {
                "theory": "Cho $\\vec{u} = (x_1; y_1; z_1)$ và $\\vec{v} = (x_2; y_2; z_2)$:\n$\\vec{u} \\pm \\vec{v} = (x_1 \\pm x_2; y_1 \\pm y_2; z_1 \\pm z_2)$.\n$k\\vec{u} = (kx_1; ky_1; kz_1)$.\n$\\vec{u} \\cdot \\vec{v} = x_1x_2 + y_1y_2 + z_1z_2$.\n$|\\vec{u}| = \\sqrt{x_1^2 + y_1^2 + z_1^2}$.",
                "signs": "Tính tọa độ vectơ $2\\vec{a} - 3\\vec{b}$, tính độ dài vectơ, tính tích vô hướng.",
                "methods": "Bước 1: Ghi rõ tọa độ từng thành phần $x, y, z$.\nBước 2: Nhân hệ số vào từng tọa độ.\nBước 3: Cộng hoặc trừ các thành phần tương ứng.",
                "mistakes": "Cộng nhầm tọa độ $x$ với $y$ hoặc quên dấu trừ của số âm.",
                "sampleQuestion": {
                  "code": "Q24_D6_MC",
                  "content": "Trong Oxyz, cho $\\vec{a}=(1;2;-3)$ và $\\vec{b}=(2;0;1)$. Tọa độ vectơ $\\vec{u} = 2\\vec{a} + \\vec{b}$ là gì?",
                  "answer": "(4; 4; -5)",
                  "casio": "Vào [MENU 5] Vector: nhập VctA, VctB rồi tính 2*VctA + VctB."
                }
              }
            },
            {
              "id": "MT_2_2_2",
              "code": "DẠNG 8.2",
              "title": "Tọa độ trung điểm, trọng tâm tam giác & trọng tâm tứ diện",
              "difficulty": "NB",
              "details": {
                "theory": "1. Vectơ $\\vec{AB} = (x_B - x_A; y_B - y_A; z_B - z_A)$.\n2. Trung điểm $M$ của $AB$: $x_M = \\frac{x_A+x_B}{2}, y_M = \\frac{y_A+y_B}{2}, z_M = \\frac{z_A+z_B}{2}$.\n3. Trọng tâm tam giác $G$: $x_G = \\frac{x_A+x_B+x_C}{3}, \\dots$\n4. Trọng tâm tứ diện $G$: $x_G = \\frac{x_A+x_B+x_C+x_D}{4}, \\dots$",
                "signs": "Cho tọa độ các đỉnh, tìm tọa độ trung điểm, trọng tâm tam giác, trọng tâm tứ diện.",
                "methods": "Bước 1: Áp dụng công thức cộng trung bình cộng tương ứng (chia 2 cho trung điểm, chia 3 cho tam giác, chia 4 cho tứ diện).\nBước 2: Lưu ý vectơ $\\vec{AB}$ lấy ngọn trừ gốc ($B - A$).",
                "mistakes": "Lấy gốc trừ ngọn ($A - B$) hoặc nhầm chia 2 của trung điểm cho trọng tâm tam giác.",
                "sampleQuestion": {
                  "code": "Q25_D6_MC",
                  "content": "Trong Oxyz, cho $A(1; 2; 3), B(3; -2; 1)$. Tọa độ trung điểm M của đoạn thẳng AB là gì?",
                  "answer": "B. $M(2; 0; 2)$"
                }
              }
            },
            {
              "id": "MT_2_2_3",
              "code": "DẠNG 8.3",
              "title": "Khoảng cách, hình chiếu vuông góc & Điểm đối xứng",
              "difficulty": "TH",
              "details": {
                "theory": "1. Khoảng cách: $AB = \\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2 + (z_B-z_A)^2}$.\n2. Hình chiếu lên trục/mặt phẳng: Khuyết chữ nào thì chữ đó bằng $0$ (chiếu lên $(Oxy) \\implies z=0$; chiếu lên $Oz \\implies x=0, y=0$).\n3. Điểm đối xứng qua trục/mặt phẳng: Khuyết chữ nào thì chữ đó đổi dấu (đối xứng qua $(Oxy) \\implies z' = -z$).",
                "signs": "Tìm tọa độ hình chiếu của điểm $M(a; b; c)$ lên các trục $Ox, Oy, Oz$ hoặc các mặt phẳng $(Oxy), (Oyz), (Ozx)$, tìm điểm đối xứng.",
                "methods": "Bước 1: Xác định đối tượng chiếu (trục hay mặt phẳng).\nBước 2: Áp dụng quy tắc 'Khuyết thì bằng 0' cho hình chiếu, 'Khuyết thì đổi dấu' cho điểm đối xứng.\nBước 3: Viết tọa độ kết quả.",
                "mistakes": "Đổi dấu cả các tọa độ không khuyết.",
                "sampleQuestion": {
                  "code": "Q28_D6_TH",
                  "content": "Trong Oxyz, hình chiếu vuông góc của điểm $M(2; -3; 5)$ lên mặt phẳng $(Oxy)$ có tọa độ là gì?",
                  "answer": "M'(2; -3; 0)"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_2_3",
          "number": "09",
          "title": "Tích có hướng và ứng dụng hình học không gian",
          "subtitle": "Tích có hướng · Thể tích · Mặt cầu · Tâm tỉ cự",
          "color": "violet",
          "mathTypes": [
            {
              "id": "MT_2_3_1",
              "code": "DẠNG 9.1",
              "title": "Tích có hướng & Điều kiện cùng phương, đồng phẳng",
              "difficulty": "TH",
              "details": {
                "theory": "Tích có hướng: $[\\vec{u}, \\vec{v}] = (u_2v_3 - u_3v_2; u_3v_1 - u_1v_3; u_1v_2 - u_2v_1)$.\n- Hai vectơ cùng phương $\\iff [\\vec{u}, \\vec{v}] = \\vec{0}$.\n- Ba vectơ đồng phẳng $\\iff [\\vec{u}, \\vec{v}] \\cdot \\vec{w} = 0$.\n- Bốn điểm $A, B, C, D$ đồng phẳng $\\iff [\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} = 0$.",
                "signs": "Kiểm tra 3 điểm thẳng hàng, 4 điểm đồng phẳng, hoặc tìm vectơ pháp tuyến của mặt phẳng.",
                "methods": "Bước 1: Tính tọa độ các vectơ.\nBước 2: Bấm máy Casio [MENU 5] tính tích có hướng $[\\vec{u}, \\vec{v}]$.\nBước 3: Nhân vô hướng với vectơ thứ ba để kiểm tra điều kiện bằng 0.",
                "mistakes": "Tính nhầm dấu của tọa độ thứ hai $y = u_3v_1 - u_1v_3$ (có dấu trừ phía trước nếu dùng định thức con).",
                "sampleQuestion": {
                  "code": "CH2_D6_TF01",
                  "content": "Trong Oxyz, cho $A(1;0;2), B(2;-1;3), C(0;2;1)$. Tính diện tích tam giác ABC?",
                  "answer": "S = \\frac{\\sqrt{2}}{2}",
                  "casio": "Bấm [MENU 5] nhập VctA, VctB rồi tính 0.5 * Abs(VctA $\\times$ VctB)."
                }
              }
            },
            {
              "id": "MT_2_3_2",
              "code": "DẠNG 9.2",
              "title": "Ứng dụng tính diện tích tam giác & Thể tích tứ diện, khối hộp",
              "difficulty": "TH",
              "details": {
                "theory": "1. Diện tích tam giác: $S_{\\Delta ABC} = \\frac{1}{2} |[\\vec{AB}, \\vec{AC}]|$.\n2. Diện tích hình bình hành: $S_{ABCD} = |[\\vec{AB}, \\vec{AD}]|$.\n3. Thể tích khối tứ diện: $V_{ABCD} = \\frac{1}{6} |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|$.\n4. Thể tích khối hộp: $V_{ABCD.A'B'C'D'} = |[\\vec{AB}, \\vec{AD}] \\cdot \\vec{AA'}|$.",
                "signs": "Tính diện tích tam giác trong không gian, tính thể tích khối tứ diện $ABCD$, tính thể tích hình hộp.",
                "methods": "Bước 1: Tính tọa độ các vectơ cạnh chung gốc $A$.\nBước 2: Nhập vào máy tính Casio [MENU 5] các vectơ VctA, VctB, VctC.\nBước 3: Áp dụng công thức nhân chia tỉ số ($1/2$ cho diện tích, $1/6$ cho thể tích tứ diện).",
                "mistakes": "Nhầm lẫn chia 2 của diện tích với chia 6 của thể tích khối tứ diện.",
                "sampleQuestion": {
                  "code": "Q42_D6_SA",
                  "content": "Trong Oxyz, cho $A(1;0;0), B(0;2;0), C(0;0;3), D(2;1;4)$. Tính thể tích khối tứ diện ABCD?",
                  "answer": "17/6 \\approx 2.8"
                }
              }
            },
            {
              "id": "MT_2_3_3",
              "code": "DẠNG 9.3",
              "title": "Khoảng cách từ điểm đến đường thẳng trong không gian",
              "difficulty": "VD",
              "details": {
                "theory": "Đường thẳng $\\Delta$ đi qua điểm $A$ và có vectơ chỉ phương $\\vec{u}$.\nKhoảng cách từ điểm $M$ đến đường thẳng $\\Delta$ được tính bằng công thức:\n$d(M, \\Delta) = \\frac{|[\\vec{AM}, \\vec{u}]|}{|\\vec{u}|}$.",
                "signs": "Tìm khoảng cách từ trạm radar đến đường bay của máy bay, hoặc khoảng cách từ điểm $M$ đến cạnh của hình khối.",
                "methods": "Bước 1: Tìm tọa độ một điểm $A \\in \\Delta$ và vectơ chỉ phương $\\vec{u}$.\nBước 2: Tính tọa độ vectơ $\\vec{AM}$.\nBước 3: Tính tích có hướng $[\\vec{AM}, \\vec{u}]$ và độ dài của nó.\nBước 4: Chia cho độ dài của vectơ chỉ phương $|\\vec{u}|$.",
                "mistakes": "Nhầm công thức khoảng cách đến đường thẳng với công thức khoảng cách đến mặt phẳng.",
                "sampleQuestion": {
                  "code": "CH12_D7_SA01",
                  "content": "Trạm phát sóng tại $A(2;4;5)$. Máy bay bay thẳng từ $B(0;10;2)$ đến $C(6;1;8)$. Khoảng cách ngắn nhất từ máy bay đến trạm là bao nhiêu?",
                  "answer": "3.48 km"
                }
              }
            },
            {
              "id": "MT_2_3_4",
              "code": "DẠNG 9.4",
              "title": "Phương trình mặt cầu (S) trong không gian Oxyz",
              "difficulty": "TH",
              "details": {
                "theory": "Mặt cầu tâm $I(a; b; c)$, bán kính $R$: $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$.\nPhương trình tổng quát: $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ với điều kiện $a^2 + b^2 + c^2 - d > 0$ và bán kính $R = \\sqrt{a^2 + b^2 + c^2 - d}$.",
                "signs": "Xác định tâm và bán kính mặt cầu, viết phương trình mặt cầu đường kính $AB$, hoặc mặt cầu đi qua 4 điểm.",
                "methods": "Bước 1: Chia các hệ số của $x, y, z$ cho $-2$ để tìm tâm $I(a; b; c)$.\nBước 2: Tính $R^2 = a^2 + b^2 + c^2 - d$.\nBước 3: Với mặt cầu đường kính $AB$: tâm là trung điểm của $AB$ và $R = AB/2$.",
                "mistakes": "Quên chia cho hệ số trước $x^2, y^2, z^2$ nếu phương trình có dạng $2x^2+2y^2+2z^2...$",
                "sampleQuestion": {
                  "code": "Q27_D6_MC",
                  "content": "Mặt cầu $(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 16$ có tâm $I$ và bán kính $R$ là gì?",
                  "answer": "C. $I(1; -2; 3)$ và $R = 4$"
                }
              }
            },
            {
              "id": "MT_2_3_5",
              "code": "DẠNG 9.5",
              "title": "Cực trị biểu thức vectơ & Phương pháp Tâm tỉ cự",
              "difficulty": "VDC",
              "details": {
                "theory": "Cho hệ điểm $A_1, A_2, \\dots, A_n$ và các hệ số $k_1, k_2, \\dots, k_n$ thỏa mãn $\\sum k_i \\ne 0$.\nLuôn tồn tại duy nhất điểm $I$ sao cho $\\sum k_i \\vec{IA_i} = \\vec{0}$ (Tâm tỉ cự).\nTọa độ $I = \\frac{\\sum k_i A_i}{\\sum k_i}$. Khi đó: $\\left| \\sum k_i \\vec{MA_i} \\right| = |\\sum k_i| \\cdot MI$.\nBiểu thức nhỏ nhất khi và chỉ khi $MI$ ngắn nhất $\\iff M$ là hình chiếu vuông góc của $I$ lên mặt phẳng hoặc đường thẳng chứa $M$.",
                "signs": "Tìm điểm $M$ trên mặt phẳng $(Oxy)$ sao cho $|\\vec{MA} + 2\\vec{MB} - \\vec{MC}|$ đạt giá trị nhỏ nhất.",
                "methods": "Bước 1: Tính tọa độ tâm tỉ cự $I$.\nBước 2: Rút gọn biểu thức vectơ về $|\\sum k_i| \\cdot MI$.\nBước 3: Tìm hình chiếu vuông góc của $I$ lên mặt phẳng chứa điểm $M$.\nBước 4: Tính độ dài nhỏ nhất.",
                "mistakes": "Tính sai mẫu số tổng hệ số $\\sum k_i$.",
                "sampleQuestion": {
                  "code": "Q42_D6_SA",
                  "content": "Trong Oxyz, cho $A(1;0;0), B(0;2;0), C(0;0;3)$. Tìm tọa độ trọng tâm $G$ của tam giác ABC?",
                  "answer": "G(1/3; 2/3; 1)"
                }
              }
            }
          ]
        },
        {
          "id": "TOPIC_3_1",
          "number": "10",
          "title": "Tọa độ hóa Oxyz giải bài toán cực trị không gian thực tế",
          "subtitle": "Radar chuyển động · Vị trí đường ống · Khối đa diện",
          "color": "terracotta",
          "mathTypes": [
            {
              "id": "MT_3_1_1",
              "code": "DẠNG 10.1",
              "title": "Khoảng cách ngắn nhất giữa hai vật thể chuyển động theo t",
              "difficulty": "VD",
              "details": {
                "theory": "Gắn hệ tọa độ $Oxyz$ vào không gian $\\to$ Thiết lập vị trí vật thể $M(t) = (x_0+at; y_0+bt; z_0+ct)$ với $t \\in [t_1; t_2]$.\nHàm khoảng cách: $d(t) = \\sqrt{f(t)}$.\nVì căn thức đồng biến với biểu thức dưới căn, $\\min d(t) \\iff \\min f(t)$ trên miền xác định thời gian $[t_1; t_2]$.",
                "signs": "Bài toán thực tế hai máy bay đang bay theo hai đường thẳng, tàu thuyền di chuyển, trạm radar quét mục tiêu.",
                "methods": "Bước 1: Chọn gốc tọa độ $O$ thuận lợi nhất.\nBước 2: Viết phương trình chuyển động của từng vật thể theo tham số thời gian $t$.\nBước 3: Thiết lập hàm bình phương khoảng cách $f(t) = d^2(t)$.\nBước 4: Khảo sát hàm số $f(t)$ bằng đạo hàm hoặc bấm Table Casio để tìm giá trị nhỏ nhất.",
                "mistakes": "Quên giới hạn thời gian thực tế $t \\ge 0$, nếu đỉnh parabol rơi vào vùng $t < 0$ thì giá trị nhỏ nhất đạt tại đầu mút $t = 0$.",
                "sampleQuestion": {
                  "code": "Q43_D7_TF",
                  "content": "Một trạm rada đặt tại $O(0;0;0)$. Drone bay theo $M(t) = (10+2t; 5-t; 2+t)$ (km) với $t \\ge 0$. Khoảng cách ngắn nhất bằng bao nhiêu?",
                  "answer": "\\sqrt{129} \\approx 11{,}36 km (đạt tại t = 0 vì f'(t) > 0 với mọi t >= 0)"
                }
              }
            },
            {
              "id": "MT_3_1_2",
              "code": "DẠNG 10.2",
              "title": "Tối ưu hóa vị trí đường ống / cáp điện qua mặt đất (Điểm đối xứng)",
              "difficulty": "VD",
              "details": {
                "theory": "Tìm điểm $M$ trên mặt phẳng $(Oxy): z=0$ sao cho tổng khoảng cách $MA + MB$ nhỏ nhất.\nNếu hai điểm $A, B$ cùng phía so với mặt phẳng, lấy điểm $A'$ đối xứng với $A$ qua mặt phẳng $(Oxy)$ ($A'$ giữ nguyên $x, y$, đổi dấu $z$).\nKhi đó: $MA + MB = MA' + MB \\ge A'B$. Dấu bằng xảy ra khi $M$ là giao điểm của đường thẳng $A'B$ với mặt phẳng.",
                "signs": "Bài toán lắp đặt trạm tiếp nhiên liệu, đường ống dẫn khí, kéo dây cáp điện từ 2 cơ sở qua mặt đất sao cho chi phí ngắn nhất.",
                "methods": "Bước 1: Kiểm tra dấu của $z_A$ và $z_B$ (nếu cùng dấu $\\implies$ cùng phía).\nBước 2: Lấy điểm đối xứng $A'(x_A; y_A; -z_A)$.\nBước 3: Độ dài ngắn nhất bằng khoảng cách $A'B = \\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2 + (z_B+z_A)^2}$.",
                "mistakes": "Không lấy điểm đối xứng mà tính thẳng đoạn $AB$ dẫn đến sai bản chất vì đoạn $AB$ không đi qua mặt đất.",
                "sampleQuestion": {
                  "code": "Q26_D7_SA",
                  "content": "Đường ống nối $A(0;2;3)$ và $B(6;8;5)$ qua điểm $P$ trên mặt phẳng $z = 0$. Độ dài ngắn nhất của tuyến đường ống bằng bao nhiêu km?",
                  "answer": "11.7 km (lấy điểm đối xứng $A'(0;2;-3) \\implies A'B = \\sqrt{6^2+6^2+8^2} = \\sqrt{136} \\approx 11{,}7$ km)"
                }
              }
            },
            {
              "id": "MT_3_1_3",
              "code": "DẠNG 10.3",
              "title": "Tọa độ hóa khối đa diện (Lăng trụ, Chóp) giải bài toán thực tế",
              "difficulty": "VDC",
              "details": {
                "theory": "Gắn hệ tọa độ $Oxyz$ vào các khối đa diện có 3 đường đôi một vuông góc tại một đỉnh (hình hộp chữ nhật, hình lập phương, hình chóp có cạnh bên vuông góc với đáy, hình lăng trụ đứng đáy vuông).\nMọi bài toán hình học không gian phức tạp về góc, khoảng cách, diện tích và thể tích đều chuyển thành tính toán đại số bằng vectơ.",
                "signs": "Khối kiến trúc tòa nhà, mô hình mái nhà, hình lăng trụ/chóp yêu cầu tính góc giữa 2 mái dốc, khoảng cách giữa 2 thanh xà gồ chéo nhau.",
                "methods": "Bước 1: Chọn gốc $O$ tại đỉnh có 3 cạnh đôi một vuông góc.\nBước 2: Gán các tia tương ứng với trục $Ox, Oy, Oz$.\nBước 3: Xác định tọa độ tất cả các đỉnh của khối đa diện.\nBước 4: Áp dụng công thức khoảng cách giữa 2 đường chéo nhau $d = \\frac{|[\\vec{u}_1, \\vec{u}_2] \\cdot \\vec{AB}|}{|[\\vec{u}_1, \\vec{u}_2]|}$ hoặc góc giữa 2 vectơ pháp tuyến.",
                "mistakes": "Chọn gốc tọa độ tại đỉnh không có 3 đường đôi một vuông góc dẫn đến sai hoàn toàn hệ quy chiếu.",
                "sampleQuestion": {
                  "code": "CH12_D7_VD03",
                  "content": "Cho hình hộp chữ nhật $ABCD.A'B'C'D'$ có $AB=1, AD=2, AA'=3$. Tính khoảng cách giữa hai đường thẳng $AC$ và $B'D'$?",
                  "answer": "3.0 (bằng độ dài đoạn vuông góc chung $AA' = 3$)"
                }
              }
            }
          ]
        }
      ]
    }
  ]
};
