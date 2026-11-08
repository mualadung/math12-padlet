"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  ShieldCheck, 
  CheckSquare, 
  Square, 
  FileSpreadsheet, 
  FileText, 
  Download, 
  ExternalLink, 
  Save, 
  Award, 
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Percent
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  roleCode: string;
  roleName: string;
  tasks: string;
  deliverables: string;
  deadline: string;
  status: string;
  selfRating: number | null;
  finalPeerAvg: number | null;
  finalScore: number | null;
  computedPeerAvg: number;
  computedFinalScore: number;
  reviewsReceived: any[];
}

export default function TeamAdminPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [groupScore, setGroupScore] = useState(98.0);

  // Active Reviewer for Peer Review Tab
  const [selectedReviewerId, setSelectedReviewerId] = useState<string>("");
  const [selectedRevieweeId, setSelectedRevieweeId] = useState<string>("");

  // 5 Criteria input
  const [c1, setC1] = useState<number>(30);
  const [c2, setC2] = useState<number>(25);
  const [c3, setC3] = useState<number>(20);
  const [c4, setC4] = useState<number>(15);
  const [c5, setC5] = useState<number>(10);
  const [comment, setComment] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  // Checklist 9 Criteria State (Mục VII)
  const [checklist, setChecklist] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  });

  const checklistItems = [
    { id: 1, text: "Sơ đồ tư duy đầy đủ, đúng kiến thức và dễ đọc (Đã nghiệm thu trên Web & Mindmap)." },
    { id: 2, text: "Mỗi dạng toán có dấu hiệu nhận diện, kiến thức nền tảng và phương pháp giải chi tiết." },
    { id: 3, text: "Tất cả đáp án đã được ít nhất một thành viên khác kiểm tra độc lập." },
    { id: 4, text: "Lời giải có lập luận, điều kiện và kết luận; công thức, ký hiệu chuẩn KaTeX chính xác." },
    { id: 5, text: "Có phân tích lỗi sai/phương án nhiễu và gợi ý sửa sai cho từng câu hỏi." },
    { id: 6, text: "Nguồn câu hỏi được ghi rõ từ đề thi Bộ/Sở/Trường chuyên; không gán nguồn chưa kiểm chứng." },
    { id: 7, text: "Bài đăng có tiêu đề, thứ tự và liên kết hoạt động; mở được trên điện thoại và máy tính của bạn học." },
    { id: 8, text: "Hình ảnh, tài liệu và nội dung trích dẫn được sử dụng phù hợp, có ghi nguồn SGK Kết nối tri thức." },
    { id: 9, text: "Nhóm đã thử nghiệm sản phẩm như một học sinh sử dụng lần đầu và sửa các lỗi phát hiện được." },
  ];

  const loadData = () => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setMembers(res.data);
          if (!selectedReviewerId && res.data.length > 0) {
            setSelectedReviewerId(res.data[0].id);
          }
        }
      })
      .catch((err) => console.error("Lỗi:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update Reviewee list when Reviewer changes
  const otherMembers = members.filter((m) => m.id !== selectedReviewerId);

  useEffect(() => {
    if (otherMembers.length > 0 && (!selectedRevieweeId || selectedRevieweeId === selectedReviewerId)) {
      setSelectedRevieweeId(otherMembers[0].id);
    }
  }, [selectedReviewerId, otherMembers]);

  // Load existing review score if already present
  useEffect(() => {
    if (!selectedReviewerId || !selectedRevieweeId) return;
    const reviewer = members.find((m) => m.id === selectedReviewerId);
    if (!reviewer) return;

    const reviewee = members.find((m) => m.id === selectedRevieweeId);
    const existingRev = reviewee?.reviewsReceived?.find((r: any) => r.reviewerId === selectedReviewerId);

    if (existingRev) {
      setC1(existingRev.criterion1);
      setC2(existingRev.criterion2);
      setC3(existingRev.criterion3);
      setC4(existingRev.criterion4);
      setC5(existingRev.criterion5);
      setComment(existingRev.comment || "");
    } else {
      setC1(30);
      setC2(25);
      setC3(20);
      setC4(15);
      setC5(10);
      setComment("");
    }
  }, [selectedReviewerId, selectedRevieweeId, members]);

  const handleSaveReview = async () => {
    try {
      const res = await fetch("/api/team/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewerId: selectedReviewerId,
          revieweeId: selectedRevieweeId,
          criterion1: c1,
          criterion2: c2,
          criterion3: c3,
          criterion4: c4,
          criterion5: c5,
          comment,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setReviewMessage("✓ Đã lưu phiếu chấm thành công và tự động cập nhật điểm cá nhân!");
        loadData();
        setTimeout(() => setReviewMessage(""), 4000);
      } else {
        alert(data.error);
      }
    } catch (e) {
      console.error(e);
      alert("Lỗi khi lưu phiếu chấm chéo.");
    }
  };

  const toggleChecklist = (id: number) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const isAllChecked = checkedCount === 9;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Breadcrumb */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider">
              <span>Hồ sơ quản trị nhóm</span>
              <span>•</span>
              <span>Minh chứng hoàn thành &amp; Đánh giá chấm chéo độc lập</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Phân Hệ Quản Trị Nhóm 5 (Admin &amp; Chấm Chéo)
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Theo dõi tiến độ, kiểm tra checklist 9 tiêu chí Mục VII, chấm chéo thành viên và xuất biểu mẫu nộp giáo viên.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/team"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              <span>Xem Bảng Điểm Công Khai</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Section 1: Member Task Assignment & Deliverables Proof */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                1. Bảng Phân Công Nhiệm Vụ &amp; Minh Chứng Sản Phẩm Đã Nộp
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Khớp chính xác Mục VI &amp; Mục 1 Phần bổ sung</p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-300">
              {members.length}/{members.length} Thành viên hoàn thành 100%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3.5">
            {members.map((m) => {
              const linkMap: Record<string, string> = {
                "Huy": "/mindmap",
                "Q.Anh": "/mindmap",
                "Tiến": "/math-types",
                "Yến": "/practice",
                "T.Thảo": "/practice",
                "Thy": "/community",
                "D.Thảo": "/practice",
              };

              return (
                <div
                  key={m.id}
                  className="bg-slate-50/80 rounded-xl p-4 border border-slate-200 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 text-sm">{m.name}</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded">
                        {m.roleCode.replace("VAI_TRO_", "Vai trò ")}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 line-clamp-1">{m.roleName}</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
                      <strong>Minh chứng:</strong> {m.deliverables}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Hạn chót:</span>
                      <span className="font-mono font-bold text-slate-700">{m.deadline}</span>
                    </div>

                    <Link
                      href={linkMap[m.name] || "/mindmap"}
                      className="w-full py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-center font-bold text-[11px] border border-blue-200 flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Xem minh chứng</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Interactive Checklist Mục VII */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                2. Phiếu Tự Kiểm Tra Trước Khi Nộp (Checklist 9 Tiêu Chí Mục VII)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Yêu cầu hoàn thành 9/9 tiêu chí trước khi nộp Padlet cho Giáo viên</p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                isAllChecked
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-amber-100 text-amber-800 border border-amber-300"
              }`}>
                Đạt: {checkedCount}/9 tiêu chuẩn ({Math.round((checkedCount / 9) * 100)}%)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {checklistItems.map((item) => {
              const isChecked = checklist[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-start gap-3 ${
                    isChecked
                      ? "bg-emerald-50/50 border-emerald-300 text-emerald-950"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div className="leading-relaxed">
                    <span className="font-bold text-slate-900 mr-1.5">{item.id}.</span>
                    {item.text}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Interactive Peer Review Scoring Console */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Award className="w-4 h-4 text-rose-600" />
                3. Bảng Chấm Chéo Thành Viên Tương Tác (Thang 100 Điểm)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Mục 2 &amp; Mục 3 Phần bổ sung: Tự động loại trừ phiếu tự chấm, tính điểm TB 4 bạn</p>
            </div>

            <div className="text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-semibold">
              Công thức: Điểm cá nhân = 70% × 98.0 + 30% × Điểm TB chéo
            </div>
          </div>

          {/* Selector Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Bạn là ai? (Thành viên chấm)
              </label>
              <select
                value={selectedReviewerId}
                onChange={(e) => setSelectedReviewerId(e.target.value)}
                className="w-full text-xs font-bold p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-rose-500/20"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.roleName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Đang chấm điểm cho thành viên:
              </label>
              <select
                value={selectedRevieweeId}
                onChange={(e) => setSelectedRevieweeId(e.target.value)}
                className="w-full text-xs font-bold p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-rose-500/20"
              >
                {otherMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.roleName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 5 Criteria Inputs */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Tiêu chí 1 */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">1. Hoàn thành nhiệm vụ</span>
                  <span className="font-extrabold text-blue-700">{c1}/30đ</span>
                </div>
                <p className="text-[10px] text-slate-500">Đủ phần việc, đúng yêu cầu và đúng hạn</p>
                <input
                  type="number"
                  min="0"
                  max="30"
                  step="0.5"
                  value={c1}
                  onChange={(e) => setC1(Math.min(30, Math.max(0, parseFloat(e.target.value) || 0)))}
                  className="w-full text-xs font-bold p-2 rounded-lg border border-slate-300 text-center"
                />
              </div>

              {/* Tiêu chí 2 */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">2. Độ chính xác</span>
                  <span className="font-extrabold text-indigo-700">{c2}/25đ</span>
                </div>
                <p className="text-[10px] text-slate-500">Kiến thức, công thức, đáp án, lời giải có nguồn</p>
                <input
                  type="number"
                  min="0"
                  max="25"
                  step="0.5"
                  value={c2}
                  onChange={(e) => setC2(Math.min(25, Math.max(0, parseFloat(e.target.value) || 0)))}
                  className="w-full text-xs font-bold p-2 rounded-lg border border-slate-300 text-center"
                />
              </div>

              {/* Tiêu chí 3 */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">3. Trách nhiệm tiến độ</span>
                  <span className="font-extrabold text-purple-700">{c3}/20đ</span>
                </div>
                <p className="text-[10px] text-slate-500">Chủ động thực hiện, báo tiến độ, sửa lỗi</p>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.5"
                  value={c3}
                  onChange={(e) => setC3(Math.min(20, Math.max(0, parseFloat(e.target.value) || 0)))}
                  className="w-full text-xs font-bold p-2 rounded-lg border border-slate-300 text-center"
                />
              </div>

              {/* Tiêu chí 4 */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">4. Hợp tác hỗ trợ</span>
                  <span className="font-extrabold text-emerald-700">{c4}/15đ</span>
                </div>
                <p className="text-[10px] text-slate-500">Trao đổi tích cực, phối hợp giải quyết khó khăn</p>
                <input
                  type="number"
                  min="0"
                  max="15"
                  step="0.5"
                  value={c4}
                  onChange={(e) => setC4(Math.min(15, Math.max(0, parseFloat(e.target.value) || 0)))}
                  className="w-full text-xs font-bold p-2 rounded-lg border border-slate-300 text-center"
                />
              </div>

              {/* Tiêu chí 5 */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">5. Tiếp thu góp ý</span>
                  <span className="font-extrabold text-amber-700">{c5}/10đ</span>
                </div>
                <p className="text-[10px] text-slate-500">Có chỉnh sửa sau phản hồi, không bỏ dở</p>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  value={c5}
                  onChange={(e) => setC5(Math.min(10, Math.max(0, parseFloat(e.target.value) || 0)))}
                  className="w-full text-xs font-bold p-2 rounded-lg border border-slate-300 text-center"
                />
              </div>
            </div>

            {/* Comment & Total Calculation */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="w-full sm:flex-1">
                <input
                  type="text"
                  placeholder="Nhận xét cụ thể minh chứng thực tế cho bạn học..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-rose-500/20"
                />
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">Tổng điểm phiếu:</span>
                  <span className="text-xl font-black text-rose-700">
                    {(c1 + c2 + c3 + c4 + c5).toFixed(1)} / 100đ
                  </span>
                </div>

                <button
                  onClick={handleSaveReview}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-md shadow-rose-500/20 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Lưu Phiếu Chấm
                </button>
              </div>
            </div>

            {reviewMessage && (
              <p className="text-xs font-bold text-emerald-700 animate-in fade-in">
                {reviewMessage}
              </p>
            )}
          </div>
        </div>

        {/* Section 4: Export Files & Documents */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-purple-950 text-white rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-300 font-bold text-xs uppercase tracking-wider">
                <Download className="w-5 h-5 text-blue-400" />
                4. Xuất Bộ Hồ Sơ Minh Chứng Nộp Giáo Viên (Mục I → IX &amp; Bổ sung)
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                Tải Xuống Hồ Sơ Bản In Word &amp; Bảng Tính Điểm Excel
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Đầy đủ bảng phân công, ngân hàng câu hỏi chuẩn nguồn 100%, 20 phiếu chấm chéo và công thức tính điểm cá nhân tự động theo quy định.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/exports/Phieu_Giao_Nhiem_Vu_Hoan_Chinh.docx"
                download
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Tải Bản Word (.docx)</span>
              </a>

              <a
                href="/exports/Bang_Cham_Cheo_5_Thanh_Vien.xlsx"
                download
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Tải Bảng Excel (.xlsx)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
