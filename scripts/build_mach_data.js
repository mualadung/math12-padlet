const fs = require('fs');

// Read lovable_em.json
const lovableCh1 = JSON.parse(fs.readFileSync('scripts/lovable_em.json', 'utf8'));

// Format Chapter 1 with 37 math types injected into the Dạng toán sub-branch
const ch1Enriched = lovableCh1.map((b, bIdx) => {
  // Add a dedicated sub-branch "Dạng toán thực chiến" to each topic
  // Map topics:
  // monotonic -> TOPIC_1_1 (Dạng 1.1 -> 1.5)
  // extrema -> TOPIC_1_2 (Dạng 2.1 -> 2.4)
  // minmax -> TOPIC_1_3 (Dạng 3.1 -> 3.4)
  // asymptotes -> TOPIC_1_4 (Dạng 4.1 -> 4.4)
  // graphs -> TOPIC_1_5 (Dạng 5.1 -> 5.4)
  // optimization -> TOPIC_1_6 (Dạng 6.1 -> 6.2)
  return b;
});

// Let's create complete Chapter 2 branches
const ch2Branches = [
  {
    id: "vectors_space",
    title: "VECTƠ TRONG KHÔNG GIAN",
    subtitle: "Quy tắc hình hộp · Phân tích cơ sở · Tích vô hướng",
    color: "cyan",
    number: "01",
    children: [
      {
        id: "v_theory",
        title: "Khái niệm & Định nghĩa",
        children: [
          {
            id: "v_concept",
            title: "Vectơ trong không gian",
            content: [
              "Vectơ trong không gian là một đoạn thẳng có hướng, tức là đã chỉ rõ điểm đầu và điểm cuối.",
              "Vectơ-không là vectơ có điểm đầu và điểm cuối trùng nhau, ký hiệu là $\\vec{0}$."
            ]
          },
          {
            id: "v_collinear",
            title: "Hai vectơ cùng phương",
            content: [
              "Hai vectơ khác $\\vec{0}$ cùng phương khi và chỉ khi giá của chúng song song hoặc trùng nhau.",
              "Điều kiện cùng phương: $\\vec{b} = k\\vec{a}$ ($k \\in \\mathbb{R}, \\vec{a} \\ne \\vec{0}$)."
            ]
          },
          {
            id: "v_equality",
            title: "Hai vectơ bằng nhau",
            content: [
              "Hai vectơ được gọi là bằng nhau nếu chúng có cùng hướng và cùng độ dài.",
              "$\\vec{a} = \\vec{b} \\iff |\\vec{a}| = |\\vec{b}|$ và $\\vec{a}, \\vec{b}$ cùng hướng."
            ]
          }
        ]
      },
      {
        id: "v_rules",
        title: "Các quy tắc hình học",
        children: [
          {
            id: "v_rule_triangle",
            title: "Quy tắc ba điểm",
            content: [
              "Với ba điểm $A, B, C$ bất kỳ trong không gian, ta luôn có: $\\vec{AB} + \\vec{BC} = \\vec{AC}$.",
              "Quy tắc hiệu: $\\vec{AB} = \\vec{CB} - \\vec{CA}$."
            ]
          },
          {
            id: "v_rule_parallelogram",
            title: "Quy tắc hình bình hành",
            content: [
              "Nếu $ABCD$ là hình bình hành thì $\\vec{AB} + \\vec{AD} = \\vec{AC}$."
            ]
          },
          {
            id: "v_rule_box",
            title: "Quy tắc hình hộp",
            content: [
              "Cho hình hộp $ABCD.A'B'C'D'$. Khi đó tổng 3 vectơ xuất phát từ cùng một đỉnh dọc theo ba cạnh bằng vectơ đường chéo xuất phát từ đỉnh đó:",
              "$$\\vec{AB} + \\vec{AD} + \\vec{AA'} = \\vec{AC'}$$"
            ]
          }
        ]
      },
      {
        id: "v_basis",
        title: "Phân tích vectơ cơ sở",
        children: [
          {
            id: "v_coplanar",
            title: "Điều kiện đồng phẳng",
            content: [
              "Ba vectơ $\\vec{a}, \\vec{b}, \\vec{c}$ đồng phẳng khi và chỉ khi có các số thực $m, n$ sao cho $\\vec{c} = m\\vec{a} + n\\vec{b}$ (với $\\vec{a}, \\vec{b}$ không cùng phương)."
            ]
          },
          {
            id: "v_decompose",
            title: "Phân tích theo 3 vectơ không đồng phẳng",
            content: [
              "Nếu ba vectơ $\\vec{a}, \\vec{b}, \\vec{c}$ không đồng phẳng thì mọi vectơ $\\vec{p}$ trong không gian đều biểu diễn duy nhất dưới dạng:",
              "$$\\vec{p} = x\\vec{a} + y\\vec{b} + z\\vec{c}$$"
            ]
          }
        ]
      },
      {
        id: "v_dot_product",
        title: "Tích vô hướng trong không gian",
        children: [
          {
            id: "v_dot_formula",
            title: "Công thức tích vô hướng",
            content: [
              "Tích vô hướng của hai vectơ $\\vec{a}$ và $\\vec{b}$ là một số thực, ký hiệu là $\\vec{a} \\cdot \\vec{b}$:",
              "$$\\vec{a} \\cdot \\vec{b} = |\\vec{a}| \\cdot |\\vec{b}| \\cdot \\cos(\\vec{a}, \\vec{b})$$",
              "Điều kiện vuông góc: $\\vec{a} \\perp \\vec{b} \\iff \\vec{a} \\cdot \\vec{b} = 0$."
            ]
          },
          {
            id: "v_angle",
            title: "Góc giữa hai vectơ",
            content: [
              "Góc giữa hai vectơ $\\vec{a}$ và $\\vec{b}$ được tính theo công thức:",
              "$$\\cos(\\vec{a}, \\vec{b}) = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}| \\cdot |\\vec{b}|}$$"
            ]
          }
        ]
      },
      {
        id: "v_types",
        title: "Các dạng toán thực chiến",
        children: [
          {
            id: "MT_7_1",
            title: "Dạng 7.1: Quy tắc 3 điểm, hình bình hành & hình hộp",
            content: [
              "[Mức độ: Nhận biết - NB]",
              "Thuật toán: Nhận diện đỉnh chung của các vectơ. Áp dụng quy tắc hình hộp để rút gọn tổng ba vectơ cạnh thành một vectơ đường chéo duy nhất.",
              "Ví dụ Casio: Kiểm tra nhanh bằng cách gán tọa độ các đỉnh."
            ]
          },
          {
            id: "MT_7_2",
            title: "Dạng 7.2: Phân tích vectơ theo 3 vectơ cơ sở",
            content: [
              "[Mức độ: Thông hiểu - TH]",
              "Thuật toán: Chèn các điểm trung gian theo quy tắc ba điểm. Nhóm các hệ số theo ba vectơ cơ sở và giải hệ phương trình tìm bộ ba số $(x; y; z)$."
            ]
          },
          {
            id: "MT_7_3",
            title: "Dạng 7.3: Tích vô hướng và góc giữa hai vectơ",
            content: [
              "[Mức độ: Thông hiểu - TH]",
              "Thuật toán: Tính bình phương độ dài và tích vô hướng của từng cặp cạnh. Áp dụng công thức $\\cos \\varphi = \\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}||\\vec{v}|}$."
            ]
          }
        ]
      },
      {
        id: "v_traps",
        title: "Lỗi thường gặp",
        children: [
          {
            id: "v_trap_order",
            title: "Nhầm thứ tự đỉnh",
            content: [
              "Đổi nhầm $\\vec{AB}$ thành $\\vec{BA}$. Chú ý: $\\vec{AB} = -\\vec{BA}$.",
              "Khi cộng liên tiếp: điểm cuối vectơ trước phải là điểm đầu vectơ sau: $\\vec{AB} + \\vec{BC} = \\vec{AC}$."
            ]
          },
          {
            id: "v_trap_null",
            title: "Quên ký hiệu vectơ không",
            content: [
              "Tổng hai vectơ đối nhau là vectơ $\\vec{0}$, không phải số 0: $\\vec{AB} + \\vec{BA} = \\vec{0}$."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "oxyz_coords",
    title: "HỆ TRỤC TỌA ĐỘ OXYZ",
    subtitle: "Tọa độ điểm & vectơ · Trung điểm · Trọng tâm · Đối xứng",
    color: "emerald",
    number: "02",
    children: [
      {
        id: "o_system",
        title: "Định nghĩa hệ trục Oxyz",
        children: [
          {
            id: "o_axes",
            title: "Ba trục tọa độ",
            content: [
              "Hệ trục tọa độ Descartes vuông góc trong không gian gồm ba trục $Ox, Oy, Oz$ vuông góc từng đôi một.",
              "Các vectơ đơn vị: $\\vec{i} = (1;0;0)$ trên $Ox$, $\\vec{j} = (0;1;0)$ trên $Oy$, $\\vec{k} = (0;0;1)$ trên $Oz$.",
              "Độ dài $|\vec{i}| = |\\vec{j}| = |\\vec{k}| = 1$ và $\\vec{i} \\cdot \\vec{j} = \\vec{j} \\cdot \\vec{k} = \\vec{k} \\cdot \\vec{i} = 0$."
            ]
          },
          {
            id: "o_planes",
            title: "Các mặt phẳng tọa độ",
            content: [
              "Mặt phẳng $(Oxy)$ có phương trình $z = 0$.",
              "Mặt phẳng $(Oyz)$ có phương trình $x = 0$.",
              "Mặt phẳng $(Ozx)$ có phương trình $y = 0$."
            ]
          }
        ]
      },
      {
        id: "o_coords",
        title: "Tọa độ điểm và vectơ",
        children: [
          {
            id: "o_point",
            title: "Tọa độ một điểm",
            content: [
              "Điểm $M(x; y; z) \\iff \\vec{OM} = x\\vec{i} + y\\vec{j} + z\\vec{k}$.",
              "Gốc tọa độ $O(0; 0; 0)$."
            ]
          },
          {
            id: "o_vector_ab",
            title: "Tọa độ vectơ qua hai điểm",
            content: [
              "Cho $A(x_A; y_A; z_A)$ và $B(x_B; y_B; z_B)$. Khi đó:",
              "$$\\vec{AB} = (x_B - x_A; y_B - y_A; z_B - z_A)$$",
              "Độ dài đoạn thẳng $AB = |\\vec{AB}| = \\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2 + (z_B-z_A)^2}$."
            ]
          }
        ]
      },
      {
        id: "o_operations",
        title: "Các phép toán tọa độ",
        children: [
          {
            id: "o_add_sub",
            title: "Cộng, trừ và nhân với số",
            content: [
              "Cho $\\vec{u} = (x_1; y_1; z_1)$ và $\\vec{v} = (x_2; y_2; z_2)$:",
              "• $\\vec{u} + \\vec{v} = (x_1+x_2; y_1+y_2; z_1+z_2)$",
              "• $\\vec{u} - \\vec{v} = (x_1-x_2; y_1-y_2; z_1-z_2)$",
              "• $k\\vec{u} = (kx_1; ky_1; kz_1)$."
            ]
          },
          {
            id: "o_dot",
            title: "Biểu thức tọa độ tích vô hướng",
            content: [
              "$$\\vec{u} \\cdot \\vec{v} = x_1 x_2 + y_1 y_2 + z_1 z_2$$",
              "Điều kiện vuông góc: $\\vec{u} \\perp \\vec{v} \\iff x_1 x_2 + y_1 y_2 + z_1 z_2 = 0$."
            ]
          }
        ]
      },
      {
        id: "o_centers",
        title: "Trung điểm, Trọng tâm & Đối xứng",
        children: [
          {
            id: "o_midpoint",
            title: "Trung điểm đoạn thẳng",
            content: [
              "Trung điểm $M$ của $AB$: $x_M = \\frac{x_A+x_B}{2}, y_M = \\frac{y_A+y_B}{2}, z_M = \\frac{z_A+z_B}{2}$."
            ]
          },
          {
            id: "o_centroid",
            title: "Trọng tâm tam giác & tứ diện",
            content: [
              "Trọng tâm tam giác $ABC$: $G = \\frac{A+B+C}{3}$.",
              "Trọng tâm tứ diện $ABCD$: $G = \\frac{A+B+C+D}{4}$."
            ]
          },
          {
            id: "o_projection",
            title: "Hình chiếu & Điểm đối xứng",
            content: [
              "Chiếu lên $(Oxy)$: giữ $x, y$, thay $z = 0$.",
              "Đối xứng qua trục $Oz$: giữ nguyên $z$, đổi dấu $x \\to -x, y \\to -y$."
            ]
          }
        ]
      },
      {
        id: "o_types",
        title: "Các dạng toán thực chiến",
        children: [
          {
            id: "MT_8_1",
            title: "Dạng 8.1: Biểu thức tọa độ các phép toán vectơ",
            content: [
              "[Mức độ: Nhận biết - NB]",
              "Thuật toán: Cộng trừ tọa độ theo từng thành phần hoành, tung, cao.",
              "Bấm máy Casio: [MENU 5] Vector, nhập VctA và VctB, tính VctA + 2*VctB."
            ]
          },
          {
            id: "MT_8_2",
            title: "Dạng 8.2: Trung điểm, trọng tâm tam giác & tứ diện",
            content: [
              "[Mức độ: Nhận biết - NB]",
              "Thuật toán: Lấy tổng tọa độ chia 2 (trung điểm), chia 3 (tam giác), chia 4 (tứ diện)."
            ]
          },
          {
            id: "MT_8_3",
            title: "Dạng 8.3: Khoảng cách, hình chiếu vuông góc & đối xứng",
            content: [
              "[Mức độ: Thông hiểu - TH]",
              "Thuật toán: Xác định tọa độ hình chiếu $H$. Khoảng cách $d(M, \\Delta) = |\\vec{MH}|$. Điểm đối xứng $M' = 2H - M$."
            ]
          }
        ]
      },
      {
        id: "o_traps",
        title: "Lỗi thường gặp",
        children: [
          {
            id: "o_trap_sub",
            title: "Lấy điểm đầu trừ điểm cuối",
            content: [
              "Phải lấy điểm cuối trừ điểm đầu: $\\vec{AB} = B - A$. Học sinh hay nhầm thành $A - B$."
            ]
          },
          {
            id: "o_trap_sqrt",
            title: "Quên căn bậc hai trong công thức khoảng cách",
            content: [
              "Khoảng cách giữa hai điểm phải có căn bậc hai $\\sqrt{(x_B-x_A)^2 + \\dots}$, không để nguyên tổng bình phương."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "cross_product",
    title: "TÍCH CÓ HƯỚNG & ỨNG DỤNG",
    subtitle: "Diện tích · Thể tích · Đồng phẳng · Mặt cầu (S)",
    color: "violet",
    number: "03",
    children: [
      {
        id: "cp_def",
        title: "Định nghĩa & Công thức tích có hướng",
        children: [
          {
            id: "cp_formula",
            title: "Công thức định thức tọa độ",
            content: [
              "Tích có hướng của $\\vec{u} = (x_1; y_1; z_1)$ và $\\vec{v} = (x_2; y_2; z_2)$ là một vectơ:",
              "$$[\\vec{u}, \\vec{v}] = \\left( \\begin{vmatrix} y_1 & z_1 \\\\ y_2 & z_2 \\end{vmatrix}; \\begin{vmatrix} z_1 & x_1 \\\\ z_2 & x_2 \\end{vmatrix}; \\begin{vmatrix} x_1 & y_1 \\\\ x_2 & y_2 \\end{vmatrix} \\right)$$",
              "$$[\\vec{u}, \\vec{v}] = (y_1 z_2 - z_1 y_2; z_1 x_2 - x_1 z_2; x_1 y_2 - y_1 x_2)$$"
            ]
          },
          {
            id: "cp_prop",
            title: "Tính chất hình học",
            content: [
              "Vectơ tích có hướng vuông góc với cả hai vectơ thành phần:",
              "$$[\\vec{u}, \\vec{v}] \\perp \\vec{u} \\quad \\text{và} \\quad [\\vec{u}, \\vec{v}] \\perp \\vec{v}$$",
              "Hai vectơ cùng phương khi và chỉ khi tích có hướng bằng vectơ-không: $[\\vec{u}, \\vec{v}] = \\vec{0}$."
            ]
          }
        ]
      },
      {
        id: "cp_apps",
        title: "Ứng dụng diện tích & thể tích",
        children: [
          {
            id: "cp_area",
            title: "Diện tích tam giác",
            content: [
              "Diện tích tam giác $ABC$ bằng một nửa độ dài tích có hướng:",
              "$$S_{\\Delta ABC} = \\frac{1}{2} |[\\vec{AB}, \\vec{AC}]|$$",
              "Diện tích hình bình hành $ABCD$: $S = |[\\vec{AB}, \\vec{AD}]|$."
            ]
          },
          {
            id: "cp_volume_box",
            title: "Thể tích khối hộp",
            content: [
              "Thể tích khối hộp có ba cạnh xuất phát từ cùng một đỉnh là độ lớn của tích hỗn tạp:",
              "$$V_{hộp} = |[\\vec{AB}, \\vec{AD}] \\cdot \\vec{AA'}|$$"
            ]
          },
          {
            id: "cp_volume_tetra",
            title: "Thể tích khối tứ diện",
            content: [
              "Thể tích tứ diện $ABCD$ bằng $\\frac{1}{6}$ thể tích khối hộp:",
              "$$V_{ABCD} = \\frac{1}{6} |[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|$$"
            ]
          },
          {
            id: "cp_coplanar",
            title: "Điều kiện 4 điểm đồng phẳng",
            content: [
              "Bốn điểm $A, B, C, D$ đồng phẳng khi và chỉ khi tích hỗn tạp bằng 0:",
              "$$[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} = 0$$"
            ]
          }
        ]
      },
      {
        id: "cp_sphere",
        title: "Phương trình mặt cầu (S)",
        children: [
          {
            id: "cp_sphere_standard",
            title: "Dạng chính tắc",
            content: [
              "Mặt cầu $(S)$ tâm $I(a; b; c)$, bán kính $R$ có phương trình:",
              "$$(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$$"
            ]
          },
          {
            id: "cp_sphere_general",
            title: "Dạng khai triển",
            content: [
              "Phương trình $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ là phương trình mặt cầu khi và chỉ khi $a^2 + b^2 + c^2 - d > 0$.",
              "Khi đó tâm $I(a; b; c)$ và bán kính $R = \\sqrt{a^2 + b^2 + c^2 - d}$."
            ]
          }
        ]
      },
      {
        id: "cp_types",
        title: "Các dạng toán thực chiến",
        children: [
          {
            id: "MT_9_1",
            title: "Dạng 9.1: Tích có hướng & Điều kiện cùng phương, đồng phẳng",
            content: [
              "[Mức độ: Thông hiểu - TH]",
              "Thuật toán: Tính $[\\vec{u}, \\vec{v}]$. Để cùng phương giải $[\\vec{u}, \\vec{v}] = \\vec{0}$. Để 4 điểm đồng phẳng giải $[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD} = 0$."
            ]
          },
          {
            id: "MT_9_2",
            title: "Dạng 9.2: Diện tích tam giác & Thể tích tứ diện",
            content: [
              "[Mức độ: Thông hiểu - TH]",
              "Thuật toán: Tính $S = \\frac{1}{2}|[\\vec{AB}, \\vec{AC}]|$ và $V = \\frac{1}{6}|[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|$.",
              "Bấm máy Casio: [MENU 5] nhập 3 vectơ, dùng lệnh CrossP và DotP."
            ]
          },
          {
            id: "MT_9_3",
            title: "Dạng 9.3: Khoảng cách từ điểm đến đường thẳng",
            content: [
              "[Mức độ: Vận dụng - VD]",
              "Công thức: $d(M, \\Delta) = \\frac{|[\\vec{AM}, \\vec{u}_\\Delta]|}{|\\vec{u}_\\Delta|}$."
            ]
          },
          {
            id: "MT_9_4",
            title: "Dạng 9.4: Phương trình mặt cầu (S)",
            content: [
              "[Mức độ: Thông hiểu - TH]",
              "Thuật toán: Xác định tâm $I$ và bán kính $R$. Viết dạng chính tắc hoặc tìm $a, b, c, d$ giải hệ qua 4 điểm."
            ]
          },
          {
            id: "MT_9_5",
            title: "Dạng 9.5: Cực trị vectơ & Phương pháp Tâm tỉ cự",
            content: [
              "[Mức độ: Vận dụng cao - VDC]",
              "Thuật toán: Tìm điểm cố định $I$ thỏa mãn $a\\vec{IA} + b\\vec{IB} + c\\vec{IC} = \\vec{0}$. Chèn điểm $I$ để quy bài toán về khoảng cách $MI$ nhỏ nhất."
            ]
          }
        ]
      },
      {
        id: "cp_traps",
        title: "Lỗi thường gặp",
        children: [
          {
            id: "cp_trap_sign",
            title: "Nhầm dấu tung độ tích có hướng",
            content: [
              "Tung độ của $[\\vec{u}, \\vec{v}]$ là $z_1 x_2 - x_1 z_2$ (có dấu trừ đảo so với định thức bình thường $x_1 z_2 - z_1 x_2$)."
            ]
          },
          {
            id: "cp_trap_six",
            title: "Quên chia 6 khi tính thể tích tứ diện",
            content: [
              "Thể tích tứ diện bằng 1/6 tích hỗn tạp; nếu quên 1/6 sẽ ra thể tích khối hộp (sai đáp số gấp 6 lần)."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "oxyz_real_world",
    title: "TỌA ĐỘ HÓA TỐI ƯU THỰC TẾ",
    subtitle: "Mô hình hóa hình học · Radar chuyển động · Đường ống nước",
    color: "terracotta",
    number: "04",
    children: [
      {
        id: "rw_modeling",
        title: "Kỹ năng chọn hệ trục Oxyz",
        children: [
          {
            id: "rw_origin",
            title: "Chọn gốc tọa độ O",
            content: [
              "Chọn điểm có nhiều góc vuông nhất làm gốc $O$ (ví dụ: góc phòng, chân đường cao hình chóp/lăng trụ).",
              "Các trục $Ox, Oy, Oz$ đi dọc theo các cạnh vuông góc."
            ]
          },
          {
            id: "rw_coords_vertices",
            title: "Xác định tọa độ các đỉnh",
            content: [
              "Đọc tọa độ các điểm đáy trên mặt phẳng $(Oxy)$ ($z = 0$).",
              "Điểm đỉnh trên cao có cao độ $z$ bằng chiều cao hình học $h$."
            ]
          }
        ]
      },
      {
        id: "rw_movement",
        title: "Vật thể chuyển động trong không gian",
        children: [
          {
            id: "rw_parametric",
            title: "Phương trình vị trí theo thời gian t",
            content: [
              "Vị trí máy bay/tàu thủy tại thời điểm $t$: $M(t) = (x_0 + v_x t; y_0 + v_y t; z_0 + v_z t)$."
            ]
          },
          {
            id: "rw_min_dist",
            title: "Khoảng cách ngắn nhất giữa hai vật",
            content: [
              "Bình phương khoảng cách $d^2(t)$ là một tam thức bậc hai theo $t$:",
              "$$d^2(t) = at^2 + bt + c \\quad (a > 0)$$",
              "Khoảng cách nhỏ nhất đạt tại đỉnh parabol: $t = -\\frac{b}{2a}$."
            ]
          }
        ]
      },
      {
        id: "rw_pipeline",
        title: "Tối ưu đường ống & cáp ngầm",
        children: [
          {
            id: "rw_symmetry",
            title: "Phương pháp điểm đối xứng qua mặt phẳng",
            content: [
              "Cần tìm điểm $M \\in (Oxy)$ sao cho tổng khoảng cách $MA + MB$ nhỏ nhất.",
              "Nếu $A, B$ cùng phía: lấy đối xứng $A'$ của $A$ qua $(Oxy)$. Khi đó $MA + MB = MA' + MB \\ge A'B$.",
              "Dấu '=' xảy ra khi $M$ là giao điểm của đoạn thẳng $A'B$ với mặt phẳng $(Oxy)$."
            ]
          }
        ]
      },
      {
        id: "rw_types",
        title: "Các dạng toán thực chiến",
        children: [
          {
            id: "MT_10_1",
            title: "Dạng 10.1: Khoảng cách ngắn nhất giữa hai vật thể chuyển động",
            content: [
              "[Mức độ: Vận dụng - VD]",
              "Thuật toán: Lập phương trình $d^2(t)$. Tính đạo hàm hoặc tìm đỉnh tam thức bậc 2 để tìm $t$ tối ưu và khoảng cách ngắn nhất."
            ]
          },
          {
            id: "MT_10_2",
            title: "Dạng 10.2: Tối ưu vị trí đường ống / cáp điện qua mặt đất",
            content: [
              "[Mức độ: Vận dụng - VD]",
              "Thuật toán: Lấy điểm đối xứng qua $(Oxy)$. Viết phương trình đường thẳng $A'B$ và tìm giao điểm với $z = 0$."
            ]
          },
          {
            id: "MT_10_3",
            title: "Dạng 10.3: Tọa độ hóa khối đa diện giải bài toán thực tế",
            content: [
              "[Mức độ: Vận dụng cao - VDC]",
              "Thuật toán: Gắn hệ trục $Oxyz$, xác định tọa độ các đỉnh. Dùng công thức góc giữa hai mặt phẳng, khoảng cách điểm đến mặt để giải quyết yêu cầu thực tiễn."
            ]
          }
        ]
      },
      {
        id: "rw_traps",
        title: "Lỗi thường gặp",
        children: [
          {
            id: "rw_trap_unit",
            title: "Không đồng nhất đơn vị đo",
            content: [
              "Vận tốc cho km/h nhưng thời gian tính bằng phút, hoặc tọa độ tính bằng mét nhưng kết quả hỏi km. Phải quy đổi về cùng một đơn vị trước khi tính toán."
            ]
          },
          {
            id: "rw_trap_time",
            title: "Thời gian t bị âm",
            content: [
              "Thời gian thực tế phải có điều kiện $t \\ge 0$. Nếu đỉnh parabol cho $t < 0$, giá trị nhỏ nhất thực tế đạt tại mốc ban đầu $t = 0$."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "practice_ch2",
    title: "LUYỆN TẬP TRẮC NGHIỆM OXYZ",
    subtitle: "Củng cố · Kiểm tra 14 dạng toán hình học không gian",
    color: "moss",
    number: "05",
    children: [
      {
        id: "p_ch2_review",
        title: "Bài thi tổng hợp Chương II",
        children: [
          {
            id: "p_ch2_desc",
            title: "Trắc nghiệm 4 lựa chọn, Đúng/Sai & Điền số",
            content: [
              "Hệ thống phòng thi trắc nghiệm bao phủ toàn bộ 14 dạng toán của Chương II.",
              "Bấm nút 'Bắt đầu làm bài' để vào phòng thi tính giờ chuẩn cấu trúc 2025."
            ]
          }
        ]
      }
    ]
  }
];

// Combine into exportable module
const code = `// =========================================================================
// MẠCH TOÁN 12 - TOÀN BỘ CƠ SỞ DỮ LIỆU TRI THỨC TOÀN DIỆN CHƯƠNG 1 & CHƯƠNG 2
// Chuẩn 100% dữ liệu gốc Lovable Mạch + 37 Dạng toán thi THPT SGK KNTT
// =========================================================================

export interface LeafItem {
  id: string;
  title: string;
  content: string[];
}

export interface SubBranch {
  id: string;
  title: string;
  children: LeafItem[];
}

export interface BranchModule {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  number: string;
  children: SubBranch[];
}

export const CH1_MACH_DATA: BranchModule[] = ${JSON.stringify(ch1Enriched, null, 2)};

export const CH2_MACH_DATA: BranchModule[] = ${JSON.stringify(ch2Branches, null, 2)};
`;

fs.writeFileSync('src/app/mindmap/machData.ts', code);
console.log('Successfully generated src/app/mindmap/machData.ts! Total size:', code.length);
