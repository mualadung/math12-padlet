"use client";

import { useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import MathRenderer from "@/components/MathRenderer";
import {
  BookOpen,
  Sparkles,
  AlertTriangle,
  Calculator,
  GraduationCap,
  X,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowUpRight,
  ChevronRight,
  Search,
} from "lucide-react";
import Link from "next/link";
import { MathTypeItem } from "./machData";
import { getQuestionsForTopic, ExamQuestionItem } from "./mindmapQuestions";
import { getQuestionsForMathType } from "./mathTypeQuestionsBank";

const TOPIC_TO_CATEGORY: Record<string, { code: string; name: string }> = {
  "TOPIC_1_1": { code: "DANG_1", name: "Dạng 1: Đơn điệu & Cực trị" },
  "TOPIC_1_2": { code: "DANG_1", name: "Dạng 1: Đơn điệu & Cực trị" },
  "TOPIC_1_3": { code: "DANG_2", name: "Dạng 2: GTLN - GTNN & Tối ưu" },
  "TOPIC_1_4": { code: "DANG_3", name: "Dạng 3: Đường tiệm cận" },
  "TOPIC_1_5": { code: "DANG_4", name: "Dạng 4: Đồ thị & Tương giao" },
  "TOPIC_1_6": { code: "DANG_2", name: "Dạng 2: GTLN - GTNN & Tối ưu" },
  "TOPIC_2_1": { code: "DANG_5", name: "Dạng 5: Vectơ không gian thuần túy" },
  "TOPIC_2_2": { code: "DANG_6", name: "Dạng 6: Hệ trục tọa độ Oxyz" },
  "TOPIC_2_3": { code: "DANG_6", name: "Dạng 6: Hệ trục tọa độ Oxyz" },
  "TOPIC_2_4": { code: "DANG_7", name: "Dạng 7: Cực trị Oxyz thực tế" },
};

function getGoogleSearchUrl(content: string, sourceExam: string) {
  const cleanSnippet = content
    .replace(/\$\$[\s\S]*?\$\$/g, "")
    .replace(/\$[^\$]+?\$/g, "")
    .replace(/[^\w\s\u00C0-\u1EF9]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 85);
  const cleanSource = sourceExam.replace(/[\[\]]/g, "");
  const query = `"${cleanSnippet}" ${cleanSource}`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function isRealWorldQuestionText(content: string, explanation?: string) {
  const text = (content + " " + (explanation || "")).toLowerCase();
  const keywords = [
    "chi phí", "doanh thu", "lợi nhuận", "nông dân", "lưới thép", "rào",
    "thùng tôn", "bể bơi", "máy bay", "radar", "cột thu lôi", "cáp néo",
    "vệ tinh", "đường ống", "hải đăng", "đáy biển", "âm thanh", "công trình",
    "mái che", "mái nhà", "bác nông dân", "doanh nghiệp", "tour du lịch",
    "sản phẩm", "lát gạch", "đo đạc", "vận tốc", "km/h", "phút", "mét"
  ];
  return keywords.some((k) => text.includes(k));
}

interface GrandDetailCardProps {
  data: {
    id: string;
    mathType: MathTypeItem;
    topicId: string;
    color?: string;
    left?: boolean;
    onClose?: () => void;
  };
}

export default function GrandDetailCard({ data }: GrandDetailCardProps) {
  const { mathType: mt, topicId, left: isLeft, onClose } = data;
  const questions = getQuestionsForMathType(mt.id, topicId, mt.code).length > 0
    ? getQuestionsForMathType(mt.id, topicId, mt.code)
    : getQuestionsForTopic(topicId);

  // Active Tab: theory | methods | mistakes | casio | quiz
  const [activeTab, setActiveTab] = useState<"theory" | "methods" | "mistakes" | "casio" | "quiz">("quiz");

  // Quiz state
  const [qIndex, setQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [checkedAnswers, setCheckedAnswers] = useState<Record<number, boolean>>({});
  const [shortInputs, setShortInputs] = useState<Record<number, string>>({});

  // Reset quiz state whenever selected mathType changes
  useEffect(() => {
    setQIndex(0);
    setSelectedAnswers({});
    setCheckedAnswers({});
    setShortInputs({});
  }, [mt.id]);

  const currentQ: ExamQuestionItem | undefined = questions[qIndex];
  const isChecked = !!checkedAnswers[qIndex];
  const selectedAns = selectedAnswers[qIndex];
  const isCorrect = isChecked && selectedAns === currentQ?.correctAnswer;

  const handleSelectOption = (optChar: string) => {
    if (isChecked) return;
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optChar }));
  };

  const handleCheck = () => {
    if (currentQ?.type === "SHORT_ANSWER") {
      const val = shortInputs[qIndex]?.trim();
      if (!val) return;
      setSelectedAnswers(prev => ({ ...prev, [qIndex]: val }));
    }
    setCheckedAnswers(prev => ({ ...prev, [qIndex]: true }));
  };

  const handleResetQuestion = () => {
    setCheckedAnswers(prev => ({ ...prev, [qIndex]: false }));
    setSelectedAnswers(prev => {
      const next = { ...prev };
      delete next[qIndex];
      return next;
    });
  };

  return (
    <div 
      className="w-[580px] rounded-3xl border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-[#18231c] text-stone-900 dark:text-stone-100 shadow-2xl overflow-hidden select-none"
      style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
    >
      {/* Handle for React Flow Bezier Curve */}
      <Handle 
        type="target" 
        position={isLeft ? Position.Right : Position.Left} 
        id="in" 
        className="!w-3 !h-3 !bg-emerald-600 !border-2 !border-white" 
      />

      {/* Header */}
      <div className="p-4 bg-[#244226] text-white flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[10px] font-extrabold px-2 py-0.5 rounded bg-black/30 uppercase tracking-wide">
              {mt.code}
            </span>
            {mt.difficulty && (
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white/20">
                Mức độ: {mt.difficulty}
              </span>
            )}
            <span className="text-[10px] uppercase font-bold text-white/80 tracking-widest ml-1">
              DẠNG TOÁN THỰC CHIẾN
            </span>
          </div>
          <h3 className="font-black text-base leading-snug text-white">
            {mt.title}
          </h3>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors"
          title="Đóng bảng chi tiết"
        >
          <X size={18} />
        </button>
      </div>

      {/* 5 Tabs Selector */}
      <div className="flex border-b text-[11px] font-bold border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121b15]">
        <button
          onClick={() => setActiveTab("theory")}
          className={`flex-1 py-2.5 text-center transition-all border-b-2 flex items-center justify-center gap-1 ${
            activeTab === "theory"
              ? "border-emerald-700 text-emerald-800 dark:text-emerald-400 bg-white dark:bg-[#18231c]"
              : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <BookOpen size={12} /> 1. Lý thuyết ($D$)
        </button>
        <button
          onClick={() => setActiveTab("methods")}
          className={`flex-1 py-2.5 text-center transition-all border-b-2 flex items-center justify-center gap-1 ${
            activeTab === "methods"
              ? "border-emerald-700 text-emerald-800 dark:text-emerald-400 bg-white dark:bg-[#18231c]"
              : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <Sparkles size={12} /> 2. Phương pháp
        </button>
        <button
          onClick={() => setActiveTab("mistakes")}
          className={`flex-1 py-2.5 text-center transition-all border-b-2 flex items-center justify-center gap-1 ${
            activeTab === "mistakes"
              ? "border-amber-600 text-amber-700 bg-white dark:bg-[#18231c]"
              : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <AlertTriangle size={12} /> 3. Bẫy lỗi
        </button>
        <button
          onClick={() => setActiveTab("casio")}
          className={`flex-1 py-2.5 text-center transition-all border-b-2 flex items-center justify-center gap-1 ${
            activeTab === "casio"
              ? "border-purple-600 text-purple-700 bg-white dark:bg-[#18231c]"
              : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <Calculator size={12} /> 4. Casio
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className={`flex-1 py-2.5 text-center transition-all border-b-2 flex items-center justify-center gap-1 ${
            activeTab === "quiz"
              ? "border-rose-600 text-rose-700 bg-white dark:bg-[#18231c]"
              : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <GraduationCap size={13} /> 5. Đề thật ({questions.length} câu)
        </button>
      </div>

      {/* Content Body */}
      <div className="p-4 text-xs leading-relaxed max-h-[460px] overflow-y-auto space-y-3">
        {/* TAB 1: LÝ THUYẾT */}
        {activeTab === "theory" && (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
              <span className="font-bold text-[10px] uppercase text-emerald-800 dark:text-emerald-300 block mb-2">
                Định lý &amp; Công thức (KaTeX) kèm Điều kiện $D$:
              </span>
              <MathRenderer content={mt.details.theory} />
            </div>
            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-[#121b15] border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300">
              <strong className="text-stone-900 dark:text-stone-100">Dấu hiệu nhận diện đề thi:</strong> {mt.details.signs}
            </div>
          </div>
        )}

        {/* TAB 2: PHƯƠNG PHÁP */}
        {activeTab === "methods" && (
          <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 text-stone-800 dark:text-stone-200 whitespace-pre-line">
            <span className="font-bold text-[10px] uppercase text-sky-800 dark:text-sky-300 block mb-2">
              Thuật toán giải mẫu mực từng bước:
            </span>
            <MathRenderer content={mt.details.methods} />
          </div>
        )}

        {/* TAB 3: BẪY LỖI */}
        {activeTab === "mistakes" && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-stone-800 dark:text-stone-200">
            <span className="font-bold text-[10px] uppercase text-rose-800 dark:text-rose-300 block mb-2 flex items-center gap-1.5">
              <AlertTriangle size={14} /> Cạm bẫy học sinh hay mắc &amp; Phân tích phương án nhiễu:
            </span>
            <MathRenderer content={mt.details.mistakes} />
          </div>
        )}

        {/* TAB 4: CASIO */}
        {activeTab === "casio" && (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900">
              <span className="font-bold text-[10px] uppercase text-purple-800 dark:text-purple-300 block mb-1.5 flex items-center gap-1.5">
                <Calculator size={14} /> Kỹ năng Casio fx-580VN X / fx-880BTG:
              </span>
              <p className="text-stone-700 dark:text-stone-300 font-mono text-[11px] leading-relaxed">
                {mt.details.sampleQuestion?.casio || "Sử dụng MENU 8 Table hoặc MENU 5 Vector để kiểm tra kết quả."}
              </p>
            </div>

            {mt.details.sampleQuestion && (
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-[#121b15] border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] font-bold text-stone-500 block mb-1">
                  {mt.details.sampleQuestion.code} • Ví dụ minh họa mẫu mực:
                </span>
                <div className="font-semibold mb-2 text-stone-900 dark:text-stone-100">
                  <MathRenderer content={mt.details.sampleQuestion.content} />
                </div>
                <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 p-2 rounded bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                  Đáp án chính xác: {mt.details.sampleQuestion.answer}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: ĐỀ THI THẬT (INTERACTIVE PRACTICE) */}
        {activeTab === "quiz" && (
          <div className="space-y-3">
            {/* Real-Exam Category Header Notice */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[10px]">
              <span className="text-emerald-900 dark:text-emerald-200 font-semibold truncate">
                📖 {TOPIC_TO_CATEGORY[topicId]?.name || "Chủ đề trọng tâm"} (Ngân hàng 15+ câu đề thật)
              </span>
              <Link 
                href={`/practice?category=${TOPIC_TO_CATEGORY[topicId]?.code || "ALL"}`}
                className="font-extrabold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-0.5 shrink-0 ml-2"
                title="Mở phòng luyện tập trắc nghiệm đầy đủ 15+ câu cho dạng này"
              >
                Luyện full 15+ câu ↗
              </Link>
            </div>

            {/* Question Selector Tabs */}
            <div className="flex items-center gap-1.5 border-b border-stone-200 dark:border-stone-800 pb-2 overflow-x-auto">
              <span className="text-[10px] font-extrabold uppercase text-stone-400 mr-1 shrink-0">
                Bộ đề ({questions.length} câu):
              </span>
              {questions.map((q, idx) => {
                const checked = checkedAnswers[idx];
                const ans = selectedAnswers[idx];
                const correct = checked && ans === q.correctAnswer;
                return (
                  <button
                    key={q.id}
                    onClick={() => setQIndex(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                      qIndex === idx
                        ? "bg-rose-700 text-white shadow-xs"
                        : checked
                        ? correct
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40"
                          : "bg-rose-100 text-rose-800 dark:bg-rose-950/40"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    <span>Câu {idx + 1}</span>
                    {checked && (correct ? "✓" : "✗")}
                  </button>
                );
              })}
            </div>

            {/* Current Question View */}
            {currentQ ? (
              <div className="space-y-3 pt-1">
                {/* Source & Difficulty Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-stone-100 dark:bg-[#121b15] border border-stone-200 dark:border-stone-800 text-[10px]">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-bold text-stone-700 dark:text-stone-300">
                      🏛 {currentQ.source}
                    </span>
                    {/\b(2025|2026)\b/.test(currentQ.source) && (
                      <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 font-black text-[9px] border border-rose-300 dark:border-rose-800 flex items-center gap-0.5">
                        🔥 Đề mới 2025 - 2026
                      </span>
                    )}
                    {isRealWorldQuestionText(currentQ.content, currentQ.explanation) && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-extrabold text-[9px] border border-emerald-300 dark:border-emerald-800">
                        🌱 Thực tế
                      </span>
                    )}
                    <a
                      href={getGoogleSearchUrl(currentQ.content, currentQ.source)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9px] transition-colors flex items-center gap-1 shadow-2xs"
                      title="Tra cứu trực tiếp đề gốc trên Google 1-click"
                    >
                      <Search size={10} />
                      <span>Tra cứu đề gốc 🔍</span>
                    </a>
                  </div>
                  <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                    currentQ.difficulty === "NB" ? "bg-blue-100 text-blue-800" :
                    currentQ.difficulty === "TH" ? "bg-green-100 text-green-800" :
                    currentQ.difficulty === "VD" ? "bg-amber-100 text-amber-800" : "bg-purple-100 text-purple-800"
                  }`}>
                    Mức độ: {currentQ.difficulty}
                  </span>
                </div>

                {/* Question Content */}
                <div className="font-semibold text-stone-900 dark:text-stone-100 p-2 leading-relaxed">
                  <MathRenderer content={currentQ.content} />
                </div>

                {/* Multiple Choice Options */}
                {currentQ.options && currentQ.options.length > 0 && (
                  <div className="space-y-1.5">
                    {currentQ.options.map((opt, oIdx) => {
                      const optChar = opt.charAt(0); // A, B, C, D
                      const isSelected = selectedAns === optChar;
                      const isOptionCorrect = currentQ.correctAnswer === optChar;

                      let btnStyle = "border-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200";
                      if (isSelected) {
                        btnStyle = "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 font-bold ring-2 ring-emerald-500";
                      }
                      if (isChecked) {
                        if (isOptionCorrect) {
                          btnStyle = "border-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 font-bold ring-2 ring-emerald-500";
                        } else if (isSelected && !isOptionCorrect) {
                          btnStyle = "border-rose-600 bg-rose-100 dark:bg-rose-950/60 text-rose-900 font-bold";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isChecked}
                          onClick={() => handleSelectOption(optChar)}
                          className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <MathRenderer content={opt} />
                          {isChecked && isOptionCorrect && (
                            <CheckCircle2 size={15} className="text-emerald-700 shrink-0 ml-2" />
                          )}
                          {isChecked && isSelected && !isOptionCorrect && (
                            <XCircle size={15} className="text-rose-700 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Short Answer Input */}
                {currentQ.type === "SHORT_ANSWER" && (
                  <div className="flex items-center gap-2 p-2">
                    <span className="font-bold text-xs text-stone-700">Điền số đáp án:</span>
                    <input
                      type="text"
                      disabled={isChecked}
                      placeholder="Nhập số thực hoặc số nguyên..."
                      value={shortInputs[qIndex] || ""}
                      onChange={(e) => setShortInputs(prev => ({ ...prev, [qIndex]: e.target.value }))}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs w-48 font-mono focus:ring-2 focus:ring-emerald-600 outline-none"
                    />
                  </div>
                )}

                {/* Action Buttons: Check / Retry */}
                <div className="pt-2 flex items-center justify-between gap-2 border-t border-stone-200 dark:border-stone-800">
                  {!isChecked ? (
                    <button
                      onClick={handleCheck}
                      disabled={!selectedAns && !shortInputs[qIndex]}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      Kiểm tra đáp án
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 w-full justify-between">
                      <div className={`text-xs font-bold flex items-center gap-1.5 ${
                        isCorrect ? "text-emerald-700" : "text-rose-700"
                      }`}>
                        {isCorrect ? (
                          <>
                            <CheckCircle2 size={16} /> Chính xác! Tuyệt vời!
                          </>
                        ) : (
                          <>
                            <XCircle size={16} /> Chưa chính xác! Đáp án đúng: {currentQ.correctAnswer}
                          </>
                        )}
                      </div>

                      <button
                        onClick={handleResetQuestion}
                        className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold"
                      >
                        Làm lại câu này
                      </button>
                    </div>
                  )}

                  {qIndex < questions.length - 1 && (
                    <button
                      onClick={() => setQIndex(qIndex + 1)}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1"
                    >
                      Câu tiếp theo <ChevronRight size={13} />
                    </button>
                  )}
                </div>

                {/* Detailed Solution & Distractor Analysis (unfolds after check) */}
                {isChecked && (
                  <div className="space-y-3 pt-3 border-t border-dashed border-stone-300 dark:border-stone-700 animate-in fade-in duration-300">
                    {/* Official Solution */}
                    <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
                      <span className="font-bold text-[10px] uppercase text-emerald-800 dark:text-emerald-300 block mb-1.5">
                        Lời giải chi tiết mẫu mực:
                      </span>
                      <div className="text-xs text-stone-800 dark:text-stone-200 whitespace-pre-line leading-relaxed">
                        <MathRenderer content={currentQ.explanation} />
                      </div>
                    </div>

                    {/* Distractor Analysis */}
                    {currentQ.distractorAnalysis && (
                      <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900">
                        <span className="font-bold text-[10px] uppercase text-rose-800 dark:text-rose-300 block mb-1 flex items-center gap-1">
                          <AlertTriangle size={13} /> Cạm bẫy &amp; Phân tích phương án nhiễu:
                        </span>
                        <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                          {currentQ.distractorAnalysis}
                        </p>
                      </div>
                    )}

                    {/* Casio Guide */}
                    {currentQ.casioGuide && (
                      <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900">
                        <span className="font-bold text-[10px] uppercase text-purple-800 dark:text-purple-300 block mb-1 flex items-center gap-1">
                          <Calculator size={13} /> Hướng dẫn bấm máy Casio fx-580 / fx-880:
                        </span>
                        <p className="text-xs font-mono text-stone-800 dark:text-stone-200 leading-relaxed">
                          {currentQ.casioGuide}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 text-center text-stone-500">
                Chưa có câu hỏi cho dạng này.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t flex items-center justify-between gap-2 border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121b15]">
        <span className="text-[10px] font-medium text-stone-500">
          Nguồn chuẩn 100% Bộ GD&amp;ĐT / Chuyên · Đã kiểm tra độc lập
        </span>
        <Link
          href={`/practice?category=${TOPIC_TO_CATEGORY[topicId]?.code || "ALL"}`}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs transition-colors"
          title={`Xem trọn bộ 15+ câu đề thật của ${TOPIC_TO_CATEGORY[topicId]?.name || "dạng này"} tại Phòng Luyện Tập`}
        >
          Luyện tập đầy đủ 15+ câu <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  );
}
