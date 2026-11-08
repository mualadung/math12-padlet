"use client";

import { useState, useEffect } from "react";
import { 
  MessageSquareHeart, 
  Send, 
  Star, 
  Trophy, 
  Users, 
  ThumbsUp, 
  Clock, 
  CheckCircle, 
  Sparkles, 
  ExternalLink,
  MessageCircle,
  HelpCircle
} from "lucide-react";

interface FeedbackItem {
  id: string;
  studentName: string;
  schoolOrClass: string | null;
  targetTeam: string;
  rating: number;
  strengths: string;
  improvements: string;
  createdAt: string;
}

interface AttemptItem {
  id: string;
  studentName: string;
  schoolOrClass: string | null;
  score: number;
  totalQuestions: number;
  correctCount: number;
  completedAt: string;
}

export default function CommunityPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [studentName, setStudentName] = useState("");
  const [schoolOrClass, setSchoolOrClass] = useState("");
  const [rating, setRating] = useState(5);
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const loadFeedbacks = () => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setFeedbacks(res.data);
        }
      })
      .catch((err) => console.error("Lỗi:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !strengths.trim() || !improvements.trim()) {
      alert("Vui lòng điền đủ họ tên, điểm mạnh và nhận xét hoàn thiện!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          schoolOrClass: schoolOrClass || "Học sinh ôn tập",
          rating,
          strengths,
          improvements,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg("Cảm ơn bạn đã đóng góp ý kiến quý báu cho Nhóm 5!");
        setStudentName("");
        setSchoolOrClass("");
        setStrengths("");
        setImprovements("");
        loadFeedbacks();
        setTimeout(() => setSuccessMsg(""), 5000);
      }
    } catch (e) {
      console.error(e);
      alert("Lỗi khi gửi phản hồi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Breadcrumb */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              <span>Nhiệm vụ 4</span>
              <span>•</span>
              <span>Tương tác nguồn học liệu &amp; Góp ý nhóm bạn (Mục V &amp; IX)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Góc Tương Tác &amp; Góp Ý Hoàn Thiện
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Luyện tập ngân hàng câu hỏi, trao đổi học thuật, đóng góp phản hồi giúp sản phẩm hoàn thiện đạt khung 90 - 100 điểm.
            </p>
          </div>

          <a
            href="https://padlet.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-600 text-white font-bold text-xs hover:bg-pink-700 transition-colors shadow-sm shadow-pink-500/20"
          >
            <span>Mở Bảng Thảo Luận Trên Padlet</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* 2-Column Layout: Feedback Form & Live Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Feedback Submission Form */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-extrabold text-sm uppercase">
                <MessageSquareHeart className="w-5 h-5 text-emerald-600" />
                Gửi Nhận Xét Góp Ý Cho Nhóm
              </div>

              {successMsg && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmitFeedback} className="mt-4 space-y-4 text-xs">
                {/* Name */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Họ và tên của bạn / Tên nhóm bạn <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Vd: Nguyễn Minh Tuấn - Nhóm 2"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs"
                  />
                </div>

                {/* School / Class */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Lớp / Trường học
                  </label>
                  <input
                    type="text"
                    placeholder="Vd: Lớp 12A2 - THPT Chuyên"
                    value={schoolOrClass}
                    onChange={(e) => setSchoolOrClass(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs"
                  />
                </div>

                {/* Rating Stars */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Đánh giá chất lượng học liệu
                  </label>
                  <div className="flex items-center gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 font-bold text-slate-600">
                      {rating === 5 ? "Rất xuất sắc (90-100đ)" :
                       rating === 4 ? "Tốt (80-89đ)" :
                       rating === 3 ? "Khá" : "Cần hoàn thiện thêm"}
                    </span>
                  </div>
                </div>

                {/* Strengths (Mục IX phiếu giao việc) */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Điểm mạnh của sản phẩm <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Vd: Sơ đồ tư duy logic chuẩn KaTeX, hướng dẫn bấm máy Casio fx-580 rất chi tiết, phân tích bẫy sai dễ hiểu..."
                    value={strengths}
                    onChange={(e) => setStrengths(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs"
                  />
                </div>

                {/* Improvements (Mục IX phiếu giao việc) */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nội dung cần sửa / Bổ sung hoàn thiện <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Vd: Nên bổ sung thêm các bài toán trắc nghiệm đúng/sai về hàm bậc 2 trên bậc 1..."
                    value={improvements}
                    onChange={(e) => setImprovements(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Đang gửi nhận xét..." : "Gửi Đóng Góp Ý Kiến"}
                </button>
              </form>
            </div>

            {/* Checklist Box Mục VII */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Phiếu Tự Kiểm Tra Trước Khi Nộp (Mục VII)
              </div>
              <ul className="text-[11px] text-slate-300 space-y-2 list-disc list-inside">
                <li>Sơ đồ tư duy logic, đúng kiến thức và dễ đọc.</li>
                <li>Mỗi dạng toán có dấu hiệu, kiến thức và phương pháp.</li>
                <li>100% câu hỏi có nguồn gốc đề thi xác minh được.</li>
                <li>Tất cả đáp án đã được kiểm tra chéo độc lập.</li>
                <li>Có hướng dẫn bấm máy Casio và phân tích bẫy sai.</li>
              </ul>
            </div>
          </div>

          {/* Right: Live Feedback Stream */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                Ý Kiến Đóng Góp Từ Nhóm Bạn ({feedbacks.length})
              </h2>
              <span className="text-xs text-slate-500">Cập nhật trực tiếp CSDL</span>
            </div>

            {loading ? (
              <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200">
                Đang tải ý kiến đóng góp...
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
                Chưa có nhận xét nào. Hãy là người đầu tiên đóng góp ý kiến!
              </div>
            ) : (
              <div className="space-y-3.5">
                {feedbacks.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-sm">
                            {item.studentName}
                          </span>
                          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {item.schoolOrClass || "Học sinh"}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {new Date(item.createdAt).toLocaleDateString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-black text-amber-800">
                          {item.rating}/5 sao
                        </span>
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider">
                        Điểm mạnh của sản phẩm:
                      </span>
                      <p className="text-xs text-slate-800 leading-relaxed font-medium bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100">
                        {item.strengths}
                      </p>
                    </div>

                    {/* Improvements */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-indigo-700 tracking-wider">
                        Đóng góp ý kiến hoàn thiện:
                      </span>
                      <p className="text-xs text-slate-800 leading-relaxed bg-indigo-50/40 p-2.5 rounded-xl border border-indigo-100">
                        {item.improvements}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
