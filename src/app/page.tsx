import Link from "next/link";
import { 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  HelpCircle, 
  Users, 
  Award, 
  ExternalLink, 
  Calculator, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  FileCheck2,
  Video,
  Clock,
  ShieldCheck,
  Compass,
  ChevronRight
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen pb-16">
      {/* Hero Banner */}
      <header className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 shadow-lg">
        {/* Decorative background circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              Dự án Học liệu số Padlet Toán 12 • Hạn nộp: 15/11/2026
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Award className="w-3.5 h-3.5" />
              Mục tiêu: 90 - 100 điểm (+2.0 điểm TX)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-5 leading-tight">
            Học Liệu Số Ôn Tập Toán 12
          </h1>
          <p className="mt-3 text-lg text-blue-100 max-w-3xl leading-relaxed">
            Hệ sinh thái học liệu tích hợp toàn diện <strong>Chương I: Ứng dụng đạo hàm khảo sát hàm số</strong> và <strong>Chương II: Vectơ &amp; Hệ trục tọa độ không gian $Oxyz$</strong> (SGK Kết nối tri thức với cuộc sống).
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/mindmap"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-md shadow-blue-500/30 transition-all flex items-center gap-2 group"
            >
              <span>1. Khám phá Sơ đồ tư duy</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/practice"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
            >
              <span>3. Phòng Luyện tập (41 câu)</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-blue-200">
            <div>
              <strong>Nhóm 8 thành viên (Lớp 12A1):</strong> Huy (Nhóm trưởng) • Q.Anh • Tiến • Yến • T.Thảo • Thy • D.Thảo • Nữ Hoàng
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>100% Câu hỏi kiểm tra chéo độc lập &amp; chuẩn nguồn Bộ GD&amp;ĐT</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main 4 Modules Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Module Cards */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                4 Phân Hệ Trọng Tâm Của Học Liệu
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Được phân chia khoa học tương ứng với các nhiệm vụ trong phiếu giao việc
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Module 1 */}
            <Link
              href="/mindmap"
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Nhiệm vụ 1
                </span>
                <h3 className="font-extrabold text-slate-900 text-base mt-2 group-hover:text-blue-700">
                  Cây Tri Thức &amp; Sơ Đồ Tư Duy
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Cây tri thức tương tác 4 tầng: Gốc → Chương → Chủ đề → Dạng toán → 4 nhánh lá (Lý thuyết, Dấu hiệu, Phương pháp, Cạm bẫy) và nhúng GeoGebra 3D.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Xem chi tiết</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Module 2 */}
            <Link
              href="/math-types"
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  Nhiệm vụ 2
                </span>
                <h3 className="font-extrabold text-slate-900 text-base mt-2 group-hover:text-indigo-700">
                  Cẩm Nang 7 Dạng Toán
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  3 dạng Chương I, 3 dạng Chương II và 1 dạng Liên chương. Chuẩn hóa 5 trường thông tin: dấu hiệu, phương pháp, và cạm bẫy cần tránh.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                <span>Xem chi tiết</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Module 3 */}
            <Link
              href="/practice"
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-purple-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  Nhiệm vụ 3
                </span>
                <h3 className="font-extrabold text-slate-900 text-base mt-2 group-hover:text-purple-700">
                  Phòng Luyện Tập Trắc Nghiệm
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Ngân hàng 41 câu hỏi chuẩn cấu trúc mới 2025: 4 lựa chọn, Đúng/Sai và Trả lời ngắn. Chấm điểm tự động, Casio fx-580 &amp; phân tích bẫy.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
                <span>Vào luyện tập</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Module 4 */}
            <Link
              href="/community"
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Nhiệm vụ 4
                </span>
                <h3 className="font-extrabold text-slate-900 text-base mt-2 group-hover:text-emerald-700">
                  Tương Tác &amp; Góp Ý Padlet
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Bảng tin góp ý trực tuyến, xếp hạng điểm số luyện tập của nhóm bạn, phản hồi điểm mạnh và hoàn thiện sản phẩm theo Mục IX.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>Xem bảng tin</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* Commitment Banner: 90 - 100 Points */}
        <section className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Khóa chất lượng chuẩn mực theo tiêu chí đánh giá
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                Bảo Đảm Tuyệt Đối Độ Chính Xác Toán Học &amp; Minh Chứng
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Mọi công thức đều kèm tập xác định và điều kiện áp dụng; 100% câu hỏi trích từ đề thi chính thức Bộ/Sở/Trường Chuyên có xác nhận kiểm tra độc lập; minh bạch toàn bộ 56 phiếu chấm chéo thành viên (7 phiếu/người).
              </p>
            </div>

            <Link
              href="/team"
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs whitespace-nowrap shadow-md transition-colors flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Xem Hồ Sơ Nhóm &amp; Chấm Chéo</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
