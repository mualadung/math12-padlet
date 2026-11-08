"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Award, 
  CheckCircle, 
  Calendar, 
  FileSpreadsheet, 
  ChevronRight, 
  Percent, 
  Star,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

interface Review {
  id: string;
  reviewer: { name: string; roleName: string };
  criterion1: number;
  criterion2: number;
  criterion3: number;
  criterion4: number;
  criterion5: number;
  totalScore: number;
  comment: string | null;
}

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
  validReviewCount: number;
  computedPeerAvg: number;
  computedFinalScore: number;
  reviewsReceived: Review[];
}

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [groupScore, setGroupScore] = useState<number>(98.0);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setMembers(res.data);
          if (res.data.length > 0) {
            setSelectedMember(res.data[0]);
          }
          if (res.groupScoreTarget) {
            setGroupScore(res.groupScoreTarget);
          }
        }
      })
      .catch((err) => console.error("Lỗi:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Breadcrumb */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider">
              <span>Phần bổ sung</span>
              <span>•</span>
              <span>Phân công nhiệm vụ &amp; Đánh giá chấm chéo thành viên</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Hồ Sơ Nhóm &amp; Bảng Chấm Chéo Thành Viên (8 Thành Viên)
            </h1>
            <div className="text-sm text-slate-600 mt-1">
              Minh bạch 5 tiêu chí chấm chéo (thang 100đ), tính trung bình từ 7 phiếu hợp lệ của các thành viên còn lại và quy đổi điểm cá nhân theo tỷ lệ:{" "}
              <span className="font-semibold text-rose-700">Điểm cá nhân = 70% × Điểm nhóm + 30% × Điểm TB chấm chéo</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-300 px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Điểm nhóm tham chiếu: {groupScore}/100 (+2.0đ TX)
            </span>
          </div>
        </div>

        {/* Section 1: Summary Table 8 Members */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Users className="w-4 h-4 text-rose-600" />
              Bảng Phân Công &amp; Tổng Hợp Điểm Cá Nhân 8 Thành Viên
            </h2>
            <span className="text-xs text-slate-500">Mục 1 &amp; Mục 3 Phần bổ sung</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-y border-slate-200">
                  <th className="p-3">STT</th>
                  <th className="p-3">Họ và tên</th>
                  <th className="p-3">Vai trò đảm nhiệm</th>
                  <th className="p-3">Sản phẩm / Minh chứng</th>
                  <th className="p-3 text-center">Hạn chót</th>
                  <th className="p-3 text-center">Tự đánh giá</th>
                  <th className="p-3 text-center">TB Chấm chéo (7 phiếu)</th>
                  <th className="p-3 text-center font-extrabold text-blue-700">Điểm cá nhân (70-30)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((m, idx) => {
                  const isSelected = selectedMember?.id === m.id;
                  return (
                    <tr
                      key={m.id}
                      onClick={() => setSelectedMember(m)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? "bg-rose-50/70 font-semibold" : "hover:bg-slate-50"
                      }`}
                    >
                      <td className="p-3 font-bold text-slate-500">{idx + 1}</td>
                      <td className="p-3 font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                        <span>{m.name}</span>
                        {m.name === "Huy" && (
                          <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                            Trưởng nhóm
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-slate-700 max-w-xs">{m.roleName}</td>
                      <td className="p-3 text-slate-600 max-w-xs truncate">{m.deliverables}</td>
                      <td className="p-3 text-center font-mono text-slate-500">{m.deadline}</td>
                      <td className="p-3 text-center font-bold text-slate-600">
                        {m.selfRating ? `${m.selfRating}đ` : "--"}
                      </td>
                      <td className="p-3 text-center font-bold text-indigo-700">
                        {m.computedPeerAvg}đ
                      </td>
                      <td className="p-3 text-center font-black text-rose-700 text-sm bg-rose-50/50">
                        {m.computedFinalScore}đ
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Detailed 4 Peer Reviews Inspector */}
        {selectedMember && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wide">
                  Chi tiết {selectedMember.reviewsReceived.length} phiếu chấm chéo hợp lệ
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  Thành viên: {selectedMember.name} • {selectedMember.roleName}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">Điểm TB Chấm Chéo</span>
                  <span className="text-lg font-black text-indigo-700">
                    {selectedMember.computedPeerAvg} / 100
                  </span>
                </div>
                <div className="text-right pl-3 border-l border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Điểm Cá Nhân (70%-30%)</span>
                  <span className="text-lg font-black text-rose-700">
                    {selectedMember.computedFinalScore} / 100
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Cards for Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedMember.reviewsReceived.map((r, idx) => (
                <div
                  key={r.id}
                  className="bg-slate-50/70 rounded-xl p-4 border border-slate-200/90 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-extrabold text-slate-900 text-xs">
                      Phiếu {idx + 1}: {r.reviewer.name} đánh giá
                    </span>
                    <span className="text-xs font-black bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full">
                      Tổng: {r.totalScore} / 100đ
                    </span>
                  </div>

                  {/* 5 Criteria breakdown */}
                  <div className="space-y-1.5 text-[11px] text-slate-600">
                    <div className="flex justify-between">
                      <span>1. Hoàn thành nhiệm vụ/sản phẩm (max 30đ):</span>
                      <strong className="text-slate-900">{r.criterion1}đ</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>2. Độ chính xác &amp; chuyên môn (max 25đ):</span>
                      <strong className="text-slate-900">{r.criterion2}đ</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>3. Tinh thần trách nhiệm &amp; tiến độ (max 20đ):</span>
                      <strong className="text-slate-900">{r.criterion3}đ</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>4. Hợp tác &amp; hỗ trợ thành viên (max 15đ):</span>
                      <strong className="text-slate-900">{r.criterion4}đ</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>5. Tiếp thu góp ý &amp; hoàn thiện (max 10đ):</span>
                      <strong className="text-slate-900">{r.criterion5}đ</strong>
                    </div>
                  </div>

                  {/* Reviewer Comment */}
                  {r.comment && (
                    <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-700 italic">
                      "{r.comment}"
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Verification Commitment */}
            <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Cam kết và xác nhận của Nhóm 5 (Mục 5 trang 7):</p>
                <p className="mt-0.5">
                  Nhóm cam kết đã hoàn thành đúng nhiệm vụ, thời hạn và tiêu chí đánh giá; việc chấm chéo được thực hiện độc lập, công bằng, trung thực, dựa trên sản phẩm và quá trình làm việc thực tế.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
