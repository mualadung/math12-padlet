import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Học Liệu Số Ôn Tập Toán 12 | Nhóm 5 - Padlet",
  description: "Hệ thống học liệu số ôn tập Chương I và Chương II - Toán 12 Kết nối tri thức với cuộc sống. Tích hợp Mindmap Cây tri thức Mạch, 37 dạng toán, Ngân hàng trắc nghiệm chuẩn cấu trúc mới, Casio fx-580/fx-880 và Bảng chấm chéo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
          integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1">{children}</div>
        <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-center text-xs">
          <div className="max-w-6xl mx-auto px-4 space-y-2">
            <p className="font-semibold text-slate-300">
              DỰ ÁN XÂY DỰNG HỌC LIỆU SỐ ÔN TẬP TOÁN 12 TRÊN PADLET • NHÓM 5 (LỚP 12A1)
            </p>
            <p className="text-slate-500">
              Chủ đề: Chương I (Đạo hàm khảo sát hàm số) &amp; Chương II (Vectơ và tọa độ Oxyz) • SGK Kết nối tri thức với cuộc sống
            </p>
            <p className="text-slate-600">
              Thành viên (7 bạn): Huy (Nhóm trưởng) • Q.Anh • Tiến • Yến • T.Thảo • Thy • D.Thảo • Hạn nộp Padlet: 23:59 Chủ nhật tuần 10 (15/11/2026)
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
