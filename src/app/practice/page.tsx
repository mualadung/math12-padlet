"use client";

import { useState, useEffect, useTransition, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MathRenderer from "@/components/MathRenderer";
import { 
  HelpCircle, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Calculator, 
  AlertOctagon, 
  FileText, 
  Award, 
  RefreshCw, 
  ChevronRight, 
  ChevronLeft,
  Send,
  BookOpen,
  Sparkles,
  Search,
  Flame,
} from "lucide-react";

interface Question {
  id: string;
  code: string;
  categoryId: string;
  category: {
    code: string;
    title: string;
    chapter: string;
  };
  difficulty: string;
  questionType: string;
  content: string;
  optionsJson: string | null;
  correctAnswer: string;
  explanation: string;
  casioGuide: string | null;
  distractorAnalysis: string;
  sourceExam: string;
  verifiedBy: string;
}

function PracticeContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const yearParam = searchParams.get("year");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [difficultyFilter, setDifficultyFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [yearFilter, setYearFilter] = useState("ALL");
  const [realWorldOnly, setRealWorldOnly] = useState(false);

  // Handle URL Query Params
  useEffect(() => {
    if (categoryParam) {
      setCategoryFilter(categoryParam);
    }
    if (yearParam) {
      setYearFilter(yearParam);
    }
  }, [categoryParam, yearParam]);

  // Helper function to identify real-world application questions
  const isRealWorldQuestion = (q: Question): boolean => {
    const text = (q.content + " " + (q.explanation || "")).toLowerCase();
    const keywords = [
      "chi phí", "doanh thu", "lợi nhuận", "nông dân", "lưới thép", "rào",
      "thùng tôn", "bể bơi", "máy bay", "radar", "cột thu lôi", "cáp néo",
      "vệ tinh", "đường ống", "hải đăng", "đáy biển", "âm thanh", "công trình",
      "mái che", "mái nhà", "bác nông dân", "doanh nghiệp", "tour du lịch",
      "sản phẩm", "lát gạch", "đo đạc", "vận tốc", "km/h", "phút", "mét",
      "đơn vị: km", "đơn vị: mét", "km", "tấn", "triệu đồng"
    ];
    return keywords.some((k) => text.includes(k)) || q.category.code === "DANG_7";
  };

  // Google Search query builder for real exam verification
  const getGoogleSearchUrl = (content: string, sourceExam: string) => {
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
  };

  // User Answers state: { [qId]: answerValue }
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  // Submitted state: { [qId]: boolean }
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  // Active detail tab for current question: 'EXPLANATION' | 'CASIO' | 'DISTRACTOR' | 'SOURCE'
  const [activeTab, setActiveTab] = useState<string>("EXPLANATION");

  // Student Info Modal for Quiz Attempt Save
  const [studentName, setStudentName] = useState("");
  const [schoolClass, setSchoolClass] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setQuestions(res.data);
          setFilteredQuestions(res.data);
        }
      })
      .catch((err) => console.error("Lỗi:", err))
      .finally(() => setLoading(false));
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = [...questions];
    if (categoryFilter !== "ALL") {
      result = result.filter((q) => q.category.code === categoryFilter);
    }
    if (difficultyFilter !== "ALL") {
      result = result.filter((q) => q.difficulty === difficultyFilter);
    }
    if (typeFilter !== "ALL") {
      result = result.filter((q) => q.questionType === typeFilter);
    }
    if (yearFilter === "2025_2026") {
      result = result.filter((q) => /\b(2025|2026)\b/.test(q.sourceExam));
    } else if (yearFilter === "2024") {
      result = result.filter((q) => /\b2024\b/.test(q.sourceExam));
    } else if (yearFilter === "BEFORE_2024") {
      result = result.filter((q) => !/\b(2024|2025|2026)\b/.test(q.sourceExam));
    }
    if (realWorldOnly) {
      result = result.filter(isRealWorldQuestion);
    }
    setFilteredQuestions(result);
    setCurrentIdx(0);
  }, [categoryFilter, difficultyFilter, typeFilter, yearFilter, realWorldOnly, questions]);

  const currentQ = filteredQuestions[currentIdx] || null;

  // Handle Answers
  const handleSelectMC = (optionKey: string) => {
    if (!currentQ || submitted[currentQ.id]) return;
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: optionKey }));
  };

  const handleSelectTF = (subKey: string, val: boolean) => {
    if (!currentQ || submitted[currentQ.id]) return;
    const currentTF = userAnswers[currentQ.id] || { a: null, b: null, c: null, d: null };
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: { ...currentTF, [subKey]: val },
    }));
  };

  const handleInputSA = (val: string) => {
    if (!currentQ || submitted[currentQ.id]) return;
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: val }));
  };

  const handleSubmitCurrent = () => {
    if (!currentQ) return;
    setSubmitted((prev) => ({ ...prev, [currentQ.id]: true }));
  };

  const handleResetCurrent = () => {
    if (!currentQ) return;
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
    setSubmitted((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  // Check correctness of current question
  const isCurrentCorrect = (): boolean => {
    if (!currentQ || !submitted[currentQ.id]) return false;
    const ans = userAnswers[currentQ.id];
    if (currentQ.questionType === "MULTIPLE_CHOICE") {
      return ans === currentQ.correctAnswer;
    }
    if (currentQ.questionType === "SHORT_ANSWER") {
      const uClean = String(ans || "").trim().replace(",", ".");
      const cClean = String(currentQ.correctAnswer).trim().replace(",", ".");
      return Math.abs(parseFloat(uClean) - parseFloat(cClean)) < 0.05;
    }
    if (currentQ.questionType === "TRUE_FALSE") {
      try {
        const correct = JSON.parse(currentQ.correctAnswer);
        return (
          ans?.a === correct.a &&
          ans?.b === correct.b &&
          ans?.c === correct.c &&
          ans?.d === correct.d
        );
      } catch {
        return false;
      }
    }
    return false;
  };

  // Submit whole quiz and save attempt
  const handleSaveQuizAttempt = async () => {
    if (!studentName.trim()) {
      alert("Vui lòng nhập tên của bạn trước khi lưu kết quả!");
      return;
    }
    try {
      const questionIds = filteredQuestions.map((q) => q.id);
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          schoolOrClass: schoolClass,
          answers: userAnswers,
          questionIds,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSaved(true);
        alert(`Chúc mừng ${studentName}! Đã lưu bài làm với số điểm: ${data.score}/10`);
      }
    } catch (e) {
      console.error(e);
      alert("Lỗi khi lưu kết quả bài làm.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Breadcrumb */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 uppercase tracking-wider">
              <span>Nhiệm vụ 3</span>
              <span>•</span>
              <span>Yến &amp; T.Thảo kiểm tra chéo độc lập 100%</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Phòng Luyện Tập Trắc Nghiệm Chuẩn Cấu Trúc Mới
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {questions.length || 106} câu hỏi chuẩn nguồn 100% Bộ GD&amp;ĐT, Sở GD&amp;ĐT &amp; THPT Chuyên (53.8% Đề mới 2025 - 2026), có lời giải tự luận KaTeX, Casio kép fx-580 / fx-880 &amp; Phân tích bẫy sai.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-full font-bold flex items-center gap-1">
              🔥 Đề 2025-2026: {questions.filter(q => /\b(2025|2026)\b/.test(q.sourceExam)).length} câu
            </span>
            <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-full font-bold">
              Tổng số: {questions.length} câu hỏi
            </span>
          </div>
        </div>

        {/* Quick Filter: Real-World Applications & 2025 Freshness Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-emerald-50 via-teal-50 to-rose-50 p-3.5 rounded-xl border border-emerald-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-800">
              Đề thi cập nhật cấu trúc mới Bộ GD&amp;ĐT (2025 - 2026):
            </span>
            <span className="text-xs text-slate-600 hidden sm:inline">
              {questions.filter(q => /\b(2025|2026)\b/.test(q.sourceExam)).length} câu 2025-2026 • {questions.filter(isRealWorldQuestion).length} bài toán thực tế đời sống
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Quick 2025-2026 Filter Button */}
            <button
              onClick={() => setYearFilter(yearFilter === "2025_2026" ? "ALL" : "2025_2026")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                yearFilter === "2025_2026"
                  ? "bg-rose-700 text-white ring-2 ring-rose-500 font-extrabold"
                  : "bg-white text-rose-800 border border-rose-300 hover:bg-rose-100/60"
              }`}
            >
              <span>🔥 {yearFilter === "2025_2026" ? "Đang lọc: Đề 2025-2026" : "Lọc Đề mới 2025-2026"}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${yearFilter === "2025_2026" ? "bg-white/20 text-white" : "bg-rose-100 text-rose-900"}`}>
                {questions.filter(q => /\b(2025|2026)\b/.test(q.sourceExam)).length} câu
              </span>
            </button>

            {/* Quick Real-World Filter Button */}
            <button
              onClick={() => setRealWorldOnly(!realWorldOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                realWorldOnly
                  ? "bg-emerald-700 text-white ring-2 ring-emerald-500 font-extrabold"
                  : "bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100/60"
              }`}
            >
              <span>🌱 {realWorldOnly ? "Đang lọc: Bài toán thực tế" : "Lọc bài toán thực tế"}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${realWorldOnly ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-900"}`}>
                {questions.filter(isRealWorldQuestion).length} câu
              </span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar (4 Columns) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* 1. Category Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Dạng toán
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            >
              <option value="ALL">Tất cả các dạng (7 Dạng)</option>
              <option value="DANG_1">Dạng 1: Đơn điệu &amp; Cực trị</option>
              <option value="DANG_2">Dạng 2: GTLN - GTNN &amp; Tối ưu</option>
              <option value="DANG_3">Dạng 3: Đường tiệm cận</option>
              <option value="DANG_4">Dạng 4: Đồ thị &amp; Tương giao</option>
              <option value="DANG_5">Dạng 5: Vectơ không gian thuần túy</option>
              <option value="DANG_6">Dạng 6: Hệ tọa độ Oxyz</option>
              <option value="DANG_7">Dạng 7: Cực trị Oxyz &amp; Đạo hàm</option>
            </select>
          </div>

          {/* 2. Year Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1 flex items-center justify-between">
              <span>Năm ra đề thi</span>
              <span className="text-[10px] text-rose-600 font-extrabold">53.8% 2025-2026</span>
            </label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            >
              <option value="ALL">Tất cả các năm ({questions.length} câu)</option>
              <option value="2025_2026">🔥 Đề mới 2025 - 2026 ({questions.filter(q => /\b(2025|2026)\b/.test(q.sourceExam)).length} câu)</option>
              <option value="2024">Năm 2024 ({questions.filter(q => /\b2024\b/.test(q.sourceExam)).length} câu)</option>
              <option value="BEFORE_2024">Trước 2024 ({questions.filter(q => !/\b(2024|2025|2026)\b/.test(q.sourceExam)).length} câu)</option>
            </select>
          </div>

          {/* 3. Difficulty Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Mức độ tư duy
            </label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            >
              <option value="ALL">Tất cả mức độ</option>
              <option value="NHAN_BIET">Nhận biết</option>
              <option value="THONG_HIEU">Thông hiểu</option>
              <option value="VAN_DUNG">Vận dụng</option>
              <option value="VAN_DUNG_CAO">Vận dụng cao</option>
            </select>
          </div>

          {/* 4. Type Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Định dạng câu hỏi
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            >
              <option value="ALL">Tất cả định dạng</option>
              <option value="MULTIPLE_CHOICE">Trắc nghiệm 4 lựa chọn</option>
              <option value="TRUE_FALSE">Trắc nghiệm Đúng / Sai</option>
              <option value="SHORT_ANSWER">Trắc nghiệm Trả lời ngắn</option>
            </select>
          </div>
        </div>

        {/* Question Interactive Workspace */}
        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200">
            Đang tải ngân hàng câu hỏi...
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
            Không tìm thấy câu hỏi phù hợp với bộ lọc đã chọn.
          </div>
        ) : currentQ ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Question Content & Interactive Inputs */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
                {/* Meta Question Info */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-black bg-purple-600 text-white">
                      Câu {currentIdx + 1} / {filteredQuestions.length}
                    </span>
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {currentQ.code}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {currentQ.difficulty === "NHAN_BIET" ? "Nhận biết" :
                       currentQ.difficulty === "THONG_HIEU" ? "Thông hiểu" :
                       currentQ.difficulty === "VAN_DUNG" ? "Vận dụng" : "Vận dụng cao"}
                    </span>
                    {isRealWorldQuestion(currentQ) && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        🌱 Thực tế đời sống
                      </span>
                    )}
                    {/\b(2025|2026)\b/.test(currentQ.sourceExam) && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1 shadow-2xs">
                        🔥 Đề mới 2025 - 2026
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={getGoogleSearchUrl(currentQ.content, currentQ.sourceExam)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 text-[11px] font-bold shadow-xs transition-colors"
                      title="Tra cứu trực tiếp câu hỏi này trên Google 1-click để kiểm chứng đề thi thật"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Tra cứu đề gốc 🔍</span>
                    </a>
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      {currentQ.questionType === "MULTIPLE_CHOICE" ? "Trắc nghiệm 4 lựa chọn" :
                       currentQ.questionType === "TRUE_FALSE" ? "Đúng / Sai 4 ý" : "Trả lời ngắn"}
                    </span>
                  </div>
                </div>

                {/* Question Stem (Đề bài) */}
                <div className="text-base sm:text-lg text-slate-900 font-semibold leading-relaxed">
                  <MathRenderer content={currentQ.content} />
                </div>

                {/* Interactive Answers Input Area */}
                <div className="pt-2">
                  {/* TYPE 1: MULTIPLE CHOICE */}
                  {currentQ.questionType === "MULTIPLE_CHOICE" && currentQ.optionsJson && (
                    <div className="space-y-2.5">
                      {JSON.parse(currentQ.optionsJson).map((optText: string, idx: number) => {
                        const optKey = optText.charAt(0); // 'A', 'B', 'C', 'D'
                        const isSelected = userAnswers[currentQ.id] === optKey;
                        const isSubmitted = submitted[currentQ.id];
                        const isCorrectKey = currentQ.correctAnswer === optKey;

                        let btnStyle = "bg-white hover:bg-slate-50 border-slate-200 text-slate-800";
                        if (isSelected) {
                          btnStyle = "bg-purple-50 border-purple-500 text-purple-900 ring-2 ring-purple-500/20";
                        }
                        if (isSubmitted) {
                          if (isCorrectKey) {
                            btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20";
                          } else if (isSelected && !isCorrectKey) {
                            btnStyle = "bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-500/20";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectMC(optKey)}
                            disabled={isSubmitted}
                            className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <MathRenderer content={optText} />
                            {isSubmitted && isCorrectKey && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                            )}
                            {isSubmitted && isSelected && !isCorrectKey && (
                              <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* TYPE 2: TRUE / FALSE */}
                  {currentQ.questionType === "TRUE_FALSE" && currentQ.optionsJson && (
                    <div className="space-y-3">
                      {JSON.parse(currentQ.optionsJson).map((itemStr: string, idx: number) => {
                        const subKey = ["a", "b", "c", "d"][idx];
                        const currentVal = userAnswers[currentQ.id]?.[subKey];
                        const isSubmitted = submitted[currentQ.id];
                        const correctObj = JSON.parse(currentQ.correctAnswer);
                        const isSubCorrect = isSubmitted && currentVal === correctObj[subKey];

                        return (
                          <div
                            key={idx}
                            className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              isSubmitted
                                ? isSubCorrect
                                  ? "bg-emerald-50/50 border-emerald-300"
                                  : "bg-rose-50/50 border-rose-300"
                                : "bg-white border-slate-200"
                            }`}
                          >
                            <div className="text-xs sm:text-sm font-medium text-slate-800 flex-1">
                              <MathRenderer content={itemStr} />
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => handleSelectTF(subKey, true)}
                                disabled={isSubmitted}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                  currentVal === true
                                    ? "bg-emerald-600 text-white border-emerald-600"
                                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                Đúng
                              </button>
                              <button
                                onClick={() => handleSelectTF(subKey, false)}
                                disabled={isSubmitted}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                  currentVal === false
                                    ? "bg-rose-600 text-white border-rose-600"
                                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                Sai
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* TYPE 3: SHORT ANSWER */}
                  {currentQ.questionType === "SHORT_ANSWER" && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          placeholder="Nhập kết quả số hoặc phân số (vd: 3.48 hoặc 12)..."
                          value={userAnswers[currentQ.id] || ""}
                          onChange={(e) => handleInputSA(e.target.value)}
                          disabled={submitted[currentQ.id]}
                          className="flex-1 text-sm font-mono p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                        />
                      </div>
                      {submitted[currentQ.id] && (
                        <div className="text-xs font-bold text-slate-700 bg-slate-100 p-3 rounded-lg flex items-center justify-between">
                          <span>Đáp án chuẩn: <strong className="text-purple-700 font-mono text-sm">{currentQ.correctAnswer}</strong></span>
                          <span>{isCurrentCorrect() ? "✓ Bạn trả lời chính xác!" : "✗ Chưa chính xác"}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons: Submit / Reset / Navigation */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {!submitted[currentQ.id] ? (
                      <button
                        onClick={handleSubmitCurrent}
                        className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition-all shadow-md shadow-purple-500/20 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Kiểm tra Đáp án
                      </button>
                    ) : (
                      <button
                        onClick={handleResetCurrent}
                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Làm lại câu này
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                      disabled={currentIdx === 0}
                      className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-slate-500 font-semibold">
                      {currentIdx + 1} / {filteredQuestions.length}
                    </span>
                    <button
                      onClick={() => setCurrentIdx((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
                      disabled={currentIdx === filteredQuestions.length - 1}
                      className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Attempt Widget */}
              <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-xs font-black uppercase text-purple-900 tracking-wider">
                    Lưu Kết Quả Vào Bảng Xếp Hạng Luyện Tập (Nhiệm vụ 4)
                  </h3>
                  <p className="text-xs text-slate-600">
                    Ghi danh để các bạn học sinh nhóm khác và giáo viên theo dõi tiến độ.
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Họ tên bạn học..."
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="text-xs p-2 rounded-lg border border-slate-300 w-full sm:w-40 focus:ring-1 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleSaveQuizAttempt}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 whitespace-nowrap shadow-sm"
                  >
                    Lưu kết quả
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Detailed 4-Tab Pedagogical Feedback */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                {/* 4 Tabs Header */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto text-xs font-bold scrollbar-none">
                  {[
                    { id: "EXPLANATION", label: "Lời giải chi tiết", icon: FileText },
                    { id: "CASIO", label: "Bấm máy Casio", icon: Calculator },
                    { id: "DISTRACTOR", label: "Phân tích bẫy sai", icon: AlertOctagon },
                    { id: "SOURCE", label: "Nguồn & Kiểm duyệt", icon: Award },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                          activeTab === tab.id
                            ? "bg-white text-purple-700 shadow-sm font-extrabold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab 1: Lời giải chi tiết */}
                {activeTab === "EXPLANATION" && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 text-slate-500">
                      <span>Lời giải mẫu mực tự luận chuẩn mực</span>
                      <span className="font-bold text-emerald-600">Đáp án: {currentQ.correctAnswer}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                      <MathRenderer content={currentQ.explanation} />
                    </div>
                  </div>
                )}

                {/* Tab 2: Hướng dẫn bấm máy tính Casio */}
                {activeTab === "CASIO" && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-700 pb-2 border-b border-slate-100">
                      <Calculator className="w-4 h-4 text-amber-600" />
                      Quy trình bấm phím Casio fx-580VN X &amp; fx-880BTG
                    </div>
                    <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed font-mono whitespace-pre-line">
                      <MathRenderer content={currentQ.casioGuide || "Câu hỏi này rèn luyện tư duy tự luận hoặc nhận diện hình học, không cần bấm máy tính."} />
                    </div>
                  </div>
                )}

                {/* Tab 3: Phân tích bẫy sai & Phương án nhiễu */}
                {activeTab === "DISTRACTOR" && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-700 pb-2 border-b border-slate-100">
                      <AlertOctagon className="w-4 h-4 text-rose-600" />
                      Tại sao các phương án khác sai &amp; Cạm bẫy phòng thi
                    </div>
                    <div className="bg-rose-50/60 rounded-xl p-4 border border-rose-200 text-xs sm:text-sm text-rose-950 leading-relaxed">
                      <MathRenderer content={currentQ.distractorAnalysis} />
                    </div>
                  </div>
                )}

                {/* Tab 4: Nguồn trích dẫn & Kiểm duyệt độc lập */}
                {activeTab === "SOURCE" && (
                  <div className="space-y-4 animate-in fade-in duration-200 text-xs">
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-500 uppercase block text-[10px]">
                          Nguồn gốc đề thi xác thực 100%
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          Đã xác thực Internet
                        </span>
                      </div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {currentQ.sourceExam}
                      </p>

                      <a
                        href={getGoogleSearchUrl(currentQ.content, currentQ.sourceExam)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                        title="Mở tìm kiếm Google để đối chiếu nguyên văn đề thi gốc"
                      >
                        <Search className="w-4 h-4" />
                        <span>Tra cứu đề thi gốc trên Google 🔍</span>
                      </a>
                    </div>

                    <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-200 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-blue-700 uppercase block text-[10px]">
                          Kiểm tra chéo độc lập
                        </span>
                        <p className="font-extrabold text-blue-900 mt-0.5">
                          Đã kiểm tra bởi: {currentQ.verifiedBy}
                        </p>
                      </div>
                      <CheckCircle2 className="w-6 h-6 text-blue-600" />
                    </div>

                    <p className="text-[11px] text-slate-400 italic text-center">
                      Cam kết chất lượng theo quy tắc dự án: Không tự bịa nguồn; mọi câu hỏi đều có xuất xứ và được đối chiếu đáp án độc lập.
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Jump Question Grid */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-3">
                  Danh sách {filteredQuestions.length} câu hỏi
                </span>
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                  {filteredQuestions.map((q, idx) => {
                    const isDone = submitted[q.id];
                    const isCur = idx === currentIdx;

                    let btnCls = "bg-slate-100 text-slate-700 hover:bg-slate-200";
                    if (isDone) {
                      btnCls = "bg-emerald-100 text-emerald-800 font-bold border border-emerald-300";
                    }
                    if (isCur) {
                      btnCls += " ring-2 ring-purple-600 font-black";
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIdx(idx)}
                        className={`py-1.5 rounded-lg text-xs transition-all ${btnCls}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 text-sm font-bold">Đang tải phòng luyện tập đề thi thật...</p>
        </div>
      </div>
    }>
      <PracticeContent />
    </Suspense>
  );
}
