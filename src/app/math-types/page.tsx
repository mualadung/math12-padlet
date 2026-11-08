"use client";

import { useState, useEffect, useMemo } from "react";
import MathRenderer from "@/components/MathRenderer";
import { TREE_DATA } from "@/app/mindmap/machData";
import { 
  Layers, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Lightbulb, 
  Bookmark, 
  Sparkles,
  BookOpen,
  Filter,
  GraduationCap,
  Calculator,
  Compass
} from "lucide-react";
import Link from "next/link";

interface MathCategory {
  id: string;
  code: string;
  chapter: string;
  title: string;
  identifySigns: string;
  coreKnowledge: string;
  methodSteps: string;
  commonMistakes: string;
  order: number;
  _count?: {
    questions: number;
  };
}

interface FlattenedSubType {
  id: string;
  code: string;
  title: string;
  difficulty: "NB" | "TH" | "VD" | "VDC";
  chapterId: string;
  chapterName: string;
  topicId: string;
  topicNumber: string;
  topicTitle: string;
  lessonName: string;
  parentCategoryCode: string;
  theory: string;
  signs: string;
  methods: string;
  mistakes: string;
  sampleQuestion?: {
    code: string;
    content: string;
    answer: string;
    casio?: string;
  };
}

const LESSON_MAP: Record<string, { lessonName: string; parentCategoryCode: string }> = {
  TOPIC_1_1: { lessonName: "Bài 1: Tính đơn điệu của hàm số", parentCategoryCode: "DANG_1" },
  TOPIC_1_2: { lessonName: "Bài 1: Cực trị của hàm số", parentCategoryCode: "DANG_1" },
  TOPIC_1_3: { lessonName: "Bài 2: Giá trị lớn nhất & nhỏ nhất của hàm số", parentCategoryCode: "DANG_2" },
  TOPIC_1_4: { lessonName: "Bài 3: Đường tiệm cận của đồ thị hàm số", parentCategoryCode: "DANG_3" },
  TOPIC_1_5: { lessonName: "Bài 4: Khảo sát sự biến thiên & đồ thị hàm số", parentCategoryCode: "DANG_4" },
  TOPIC_1_6: { lessonName: "Bài 5: Ứng dụng đạo hàm giải bài toán tối ưu thực tiễn", parentCategoryCode: "DANG_2" },
  TOPIC_2_1: { lessonName: "Bài 6: Vectơ trong không gian", parentCategoryCode: "DANG_5" },
  TOPIC_2_2: { lessonName: "Bài 7: Hệ trục tọa độ trong không gian Oxyz", parentCategoryCode: "DANG_6" },
  TOPIC_2_3: { lessonName: "Bài 8: Biểu thức tọa độ của các phép toán vectơ", parentCategoryCode: "DANG_6" },
  TOPIC_3_1: { lessonName: "Liên chương I-II: Tọa độ hóa Oxyz tối ưu thực tế", parentCategoryCode: "DANG_7" },
};

export default function MathTypesPage() {
  const [categories, setCategories] = useState<MathCategory[]>([]);
  const [selectedCat, setSelectedCat] = useState<MathCategory | null>(null);
  const [viewMode, setViewMode] = useState<"SUBTYPES" | "MACRO">("SUBTYPES");
  const [chapterFilter, setChapterFilter] = useState<string>("ALL");
  const [lessonFilter, setLessonFilter] = useState<string>("ALL");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Flatten the 37 math sub-types from TREE_DATA
  const allSubTypes: FlattenedSubType[] = useMemo(() => {
    const list: FlattenedSubType[] = [];
    TREE_DATA.chapters.forEach((c) => {
      const chapterName = c.id === "CH1" ? "Chương I" : c.id === "CH2" ? "Chương II" : "Liên chương I-II";
      c.topics.forEach((t) => {
        const meta = LESSON_MAP[t.id] || { 
          lessonName: t.title, 
          parentCategoryCode: t.id.startsWith("TOPIC_2") ? "DANG_6" : t.id.startsWith("TOPIC_3") ? "DANG_7" : "DANG_1" 
        };
        const chap = t.id === "TOPIC_3_1" ? "Liên chương I-II" : chapterName;
        t.mathTypes.forEach((mt) => {
          list.push({
            id: mt.id,
            code: mt.code,
            title: mt.title,
            difficulty: (mt.difficulty as "NB" | "TH" | "VD" | "VDC") || "TH",
            chapterId: c.id,
            chapterName: chap,
            topicId: t.id,
            topicNumber: t.number,
            topicTitle: t.title,
            lessonName: meta.lessonName,
            parentCategoryCode: meta.parentCategoryCode,
            theory: mt.details.theory,
            signs: mt.details.signs,
            methods: mt.details.methods,
            mistakes: mt.details.mistakes,
            sampleQuestion: mt.details.sampleQuestion,
          });
        });
      });
    });
    return list;
  }, []);

  const [selectedSubType, setSelectedSubType] = useState<FlattenedSubType | null>(null);

  useEffect(() => {
    if (allSubTypes.length > 0 && !selectedSubType) {
      setSelectedSubType(allSubTypes[0]);
    }
  }, [allSubTypes, selectedSubType]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setCategories(res.data);
          if (res.data.length > 0) {
            setSelectedCat(res.data[0]);
          }
        }
      })
      .catch((err) => console.error("Lỗi nạp categories:", err))
      .finally(() => setLoading(false));
  }, []);

  // Dynamic filter lists and counts
  const chapterTabs = useMemo(() => {
    if (viewMode === "SUBTYPES") {
      const ch1Count = allSubTypes.filter((st) => st.chapterName === "Chương I").length;
      const ch2Count = allSubTypes.filter((st) => st.chapterName === "Chương II").length;
      const ch12Count = allSubTypes.filter((st) => st.chapterName === "Liên chương I-II").length;
      return [
        { id: "ALL", label: `Tất cả (${allSubTypes.length} Dạng)` },
        { id: "Chương I", label: `Chương I (${ch1Count} Dạng)` },
        { id: "Chương II", label: `Chương II (${ch2Count} Dạng)` },
        { id: "Liên chương I-II", label: `Liên chương I-II (${ch12Count} Dạng)` },
      ];
    } else {
      const ch1Count = categories.filter((c) => c.chapter === "Chương I").length;
      const ch2Count = categories.filter((c) => c.chapter === "Chương II").length;
      const ch12Count = categories.filter((c) => c.chapter === "Liên chương I-II").length;
      return [
        { id: "ALL", label: `Tất cả (${categories.length} Chuyên đề)` },
        { id: "Chương I", label: `Chương I (${ch1Count} Chuyên đề)` },
        { id: "Chương II", label: `Chương II (${ch2Count} Chuyên đề)` },
        { id: "Liên chương I-II", label: `Liên chương I-II (${ch12Count} Chuyên đề)` },
      ];
    }
  }, [viewMode, allSubTypes, categories]);

  const lessonOptions = useMemo(() => {
    const map = new Map<string, string>();
    allSubTypes.forEach((st) => {
      if (chapterFilter === "ALL" || st.chapterName === chapterFilter) {
        map.set(st.topicId, st.lessonName);
      }
    });
    return Array.from(map.entries()).map(([topicId, name]) => ({ topicId, name }));
  }, [allSubTypes, chapterFilter]);

  // Filtered sub-types
  const filteredSubTypes = useMemo(() => {
    return allSubTypes.filter((st) => {
      const matchChapter = chapterFilter === "ALL" || st.chapterName === chapterFilter;
      const matchLesson = lessonFilter === "ALL" || st.topicId === lessonFilter;
      const matchDifficulty = difficultyFilter === "ALL" || st.difficulty === difficultyFilter;
      const matchSearch =
        searchTerm === "" ||
        st.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        st.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        st.signs.toLowerCase().includes(searchTerm.toLowerCase()) ||
        st.lessonName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchChapter && matchLesson && matchDifficulty && matchSearch;
    });
  }, [allSubTypes, chapterFilter, lessonFilter, difficultyFilter, searchTerm]);

  // Filtered macro categories
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchChapter = chapterFilter === "ALL" || cat.chapter === chapterFilter;
      const matchSearch =
        searchTerm === "" ||
        cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.identifySigns.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.code.toLowerCase().includes(searchTerm.toLowerCase());
      return matchChapter && matchSearch;
    });
  }, [categories, chapterFilter, searchTerm]);

  const difficultyColor = (diff?: string) => {
    switch (diff) {
      case "NB":
        return "bg-sky-100 text-sky-800 border-sky-300";
      case "TH":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "VD":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "VDC":
        return "bg-rose-100 text-rose-800 border-rose-300";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300";
    }
  };

  const difficultyLabel = (diff?: string) => {
    switch (diff) {
      case "NB": return "Nhận biết";
      case "TH": return "Thông hiểu";
      case "VD": return "Vận dụng";
      case "VDC": return "Vận dụng cao";
      default: return diff || "Thông hiểu";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Breadcrumb */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              <span>Nhiệm vụ 2</span>
              <span>•</span>
              <span>Tiến biên soạn (Q.Anh kiểm tra chéo)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 flex items-center gap-2.5">
              <span>Cẩm Nang Dạng Toán Trọng Tâm</span>
              <span className="text-xs bg-indigo-600 text-white font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                37 Phân Dạng Bài 1 ➔ Bài 8
              </span>
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Hệ thống hóa toàn diện 37 phân dạng toán nhỏ theo chuẩn SGK Kết nối tri thức: Dấu hiệu nhận diện, Kiến thức nền tảng &amp; Điều kiện nghiêm ngặt, Phương pháp giải từng bước và Phân tích cạm bẫy.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => {
                setViewMode("SUBTYPES");
                setLessonFilter("ALL");
              }}
              className={`flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === "SUBTYPES"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>37 Phân dạng Bài 1-8</span>
            </button>
            <button
              onClick={() => {
                setViewMode("MACRO");
                setLessonFilter("ALL");
              }}
              className={`flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === "MACRO"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>7 Chuyên đề Đề thi</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          {/* Chapter Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 sm:pb-0">
              {chapterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setChapterFilter(tab.id);
                    setLessonFilter("ALL");
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    chapterFilter === tab.id
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72 shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm dạng toán, từ khóa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Sub-filters for Subtypes Mode */}
          {viewMode === "SUBTYPES" && (
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs">
              {/* Lesson Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-500 text-[11px]">Bài học:</span>
                <select
                  value={lessonFilter}
                  onChange={(e) => setLessonFilter(e.target.value)}
                  className="px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 text-slate-700 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="ALL">Tất cả bài học</option>
                  {lessonOptions.map((opt) => (
                    <option key={opt.topicId} value={opt.topicId}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-500 text-[11px]">Mức độ:</span>
                <div className="inline-flex rounded-md p-0.5 bg-slate-100 border border-slate-200">
                  {["ALL", "NB", "TH", "VD", "VDC"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficultyFilter(d)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                        difficultyFilter === d
                          ? "bg-white text-indigo-700 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {d === "ALL" ? "Tất cả" : d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Counter summary */}
              <div className="ml-auto text-[11px] text-slate-500 font-medium">
                Hiển thị <strong>{filteredSubTypes.length}</strong> / {allSubTypes.length} phân dạng
              </div>
            </div>
          )}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: List */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[850px] overflow-y-auto pr-1">
            {viewMode === "SUBTYPES" ? (
              filteredSubTypes.length > 0 ? (
                filteredSubTypes.map((st) => {
                  const isSelected = selectedSubType?.id === st.id;
                  const isCh1 = st.chapterName === "Chương I";
                  const isCh2 = st.chapterName === "Chương II";

                  return (
                    <button
                      key={st.id}
                      onClick={() => setSelectedSubType(st)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 group ${
                        isSelected
                          ? "bg-indigo-50/90 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm"
                          : "bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-extrabold text-[10px] shadow-xs text-white ${
                          isCh1
                            ? "bg-blue-600"
                            : isCh2
                            ? "bg-emerald-600"
                            : "bg-purple-600"
                        }`}
                      >
                        {st.code.replace("DẠNG ", "D")}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-slate-500 truncate max-w-[200px]">
                            {st.lessonName.split(":")[0]}
                          </span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase ${difficultyColor(
                              st.difficulty
                            )}`}
                          >
                            {st.difficulty}
                          </span>
                        </div>
                        <h3
                          className={`font-bold text-xs sm:text-sm mt-1 leading-snug line-clamp-2 ${
                            isSelected ? "text-indigo-950 font-black" : "text-slate-800"
                          }`}
                        >
                          {st.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {st.signs}
                        </p>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center bg-white rounded-xl border border-dashed border-slate-300 text-slate-400 text-xs">
                  Không tìm thấy phân dạng nào phù hợp với bộ lọc.
                </div>
              )
            ) : (
              // Macro Mode List
              filteredCategories.map((cat) => {
                const isSelected = selectedCat?.id === cat.id;
                const isCh1 = cat.chapter === "Chương I";
                const isCh2 = cat.chapter === "Chương II";

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 group ${
                      isSelected
                        ? "bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm"
                        : "bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-extrabold text-xs shadow-sm text-white ${
                        isCh1
                          ? "bg-blue-600"
                          : isCh2
                          ? "bg-emerald-600"
                          : "bg-purple-600"
                      }`}
                    >
                      {cat.code.replace("DANG_", "D")}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            isCh1
                              ? "bg-blue-100 text-blue-800"
                              : isCh2
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {cat.chapter}
                        </span>
                        {cat._count && (
                          <span className="text-[11px] font-medium text-slate-500">
                            {cat._count.questions} câu hỏi
                          </span>
                        )}
                      </div>
                      <h3
                        className={`font-bold text-sm mt-1.5 ${
                          isSelected ? "text-indigo-950" : "text-slate-800"
                        }`}
                      >
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {cat.identifySigns}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: Detail Card */}
          <div className="lg:col-span-7">
            {viewMode === "SUBTYPES" ? (
              selectedSubType ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-black bg-indigo-600 text-white">
                        {selectedSubType.code}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {selectedSubType.lessonName}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded border uppercase ${difficultyColor(
                          selectedSubType.difficulty
                        )}`}
                      >
                        {difficultyLabel(selectedSubType.difficulty)}
                      </span>
                    </div>

                    <Link
                      href={`/practice?categoryCode=${selectedSubType.parentCategoryCode}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs transition-colors border border-indigo-200"
                    >
                      <span>Luyện tập dạng này</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    {selectedSubType.title}
                  </h2>

                  {/* Section 1: Dấu hiệu nhận diện đề bài */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                      <Lightbulb className="w-4 h-4 text-indigo-600" />
                      1. Dấu hiệu nhận diện đề bài trong phòng thi
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed font-medium">
                      <MathRenderer content={selectedSubType.signs} />
                    </div>
                  </div>

                  {/* Section 2: Kiến thức nền tảng & Điều kiện áp dụng */}
                  <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-200/70 space-y-2">
                    <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase tracking-wider">
                      <Bookmark className="w-4 h-4 text-blue-600" />
                      2. Kiến thức nền tảng &amp; Điều kiện áp dụng nghiêm ngặt
                    </div>
                    <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                      <MathRenderer content={selectedSubType.theory} />
                    </div>
                  </div>

                  {/* Section 3: Định hướng & Phương pháp giải từng bước */}
                  <div className="bg-emerald-50/40 rounded-xl p-5 border border-emerald-200/70 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      3. Định hướng &amp; Phương pháp giải từng bước
                    </div>
                    <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-mono whitespace-pre-line">
                      <MathRenderer content={selectedSubType.methods} />
                    </div>
                  </div>

                  {/* Section 4: Hộp cảnh báo Cạm bẫy & Lỗi sai thường gặp */}
                  <div className="bg-rose-50/70 rounded-xl p-5 border-2 border-rose-300 space-y-2 shadow-sm">
                    <div className="flex items-center gap-2 text-rose-800 font-black text-xs uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-rose-600 animate-pulse" />
                      4. Lỗi sai cần tránh &amp; Cạm bẫy đề thi
                    </div>
                    <div className="text-xs text-rose-950 leading-relaxed font-medium">
                      <MathRenderer content={selectedSubType.mistakes} />
                    </div>
                  </div>

                  {/* Section 5: Bài tập ví dụ minh họa & Casio */}
                  {selectedSubType.sampleQuestion && (
                    <div className="bg-amber-50/60 rounded-xl p-5 border border-amber-300/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          5. Ví dụ minh họa thực tế trích đề thi
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-200/60 text-amber-900 font-bold">
                          {selectedSubType.sampleQuestion.code}
                        </span>
                      </div>
                      
                      <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium bg-white/70 p-3 rounded-lg border border-amber-200">
                        <MathRenderer content={selectedSubType.sampleQuestion.content} />
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-amber-200/60 text-xs">
                        <div className="text-emerald-800 font-bold flex items-center gap-1.5">
                          <span>Đáp án đúng:</span>
                          <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300">
                            <MathRenderer content={selectedSubType.sampleQuestion.answer} />
                          </span>
                        </div>
                        {selectedSubType.sampleQuestion.casio && (
                          <div className="text-slate-600 text-[11px] flex items-center gap-1">
                            <Calculator className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{selectedSubType.sampleQuestion.casio}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Footer Notes */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Biên soạn: <strong>Tiến</strong> • Kiểm tra độc lập: <strong>Q.Anh</strong></span>
                    <span className="text-indigo-600 font-semibold">Chuẩn mực 100% SGK Toán 12 KNTT</span>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-400">
                  <Layers className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p>Chọn một phân dạng toán ở danh sách bên trái để xem cẩm nang phương pháp chi tiết.</p>
                </div>
              )
            ) : (
              // Macro Category Details
              selectedCat ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-600 text-white">
                        {selectedCat.code}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {selectedCat.chapter}
                      </span>
                    </div>

                    <Link
                      href={`/practice?categoryCode=${selectedCat.code}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs transition-colors border border-indigo-200"
                    >
                      <span>Luyện tập dạng này</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    {selectedCat.title}
                  </h2>

                  {/* Section 1: Dấu hiệu nhận diện */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                      <Lightbulb className="w-4 h-4 text-indigo-600" />
                      1. Dấu hiệu nhận diện đề bài
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed font-medium">
                      <MathRenderer content={selectedCat.identifySigns} />
                    </div>
                  </div>

                  {/* Section 2: Kiến thức nền tảng */}
                  <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-200/70 space-y-2">
                    <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase tracking-wider">
                      <Bookmark className="w-4 h-4 text-blue-600" />
                      2. Kiến thức nền tảng &amp; Công thức cốt lõi
                    </div>
                    <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                      <MathRenderer content={selectedCat.coreKnowledge} />
                    </div>
                  </div>

                  {/* Section 3: Định hướng & Phương pháp giải từng bước */}
                  <div className="bg-emerald-50/40 rounded-xl p-5 border border-emerald-200/70 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      3. Định hướng &amp; Phương pháp giải từng bước
                    </div>
                    <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-mono whitespace-pre-line">
                      <MathRenderer content={selectedCat.methodSteps} />
                    </div>
                  </div>

                  {/* Section 4: Hộp cảnh báo Cạm bẫy & Lỗi sai thường gặp */}
                  <div className="bg-rose-50/70 rounded-xl p-5 border-2 border-rose-300 space-y-2 shadow-sm">
                    <div className="flex items-center gap-2 text-rose-800 font-black text-xs uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-rose-600 animate-pulse" />
                      4. Lỗi sai cần tránh &amp; Cạm bẫy đề thi
                    </div>
                    <div className="text-xs text-rose-950 leading-relaxed font-medium">
                      <MathRenderer content={selectedCat.commonMistakes} />
                    </div>
                  </div>

                  {/* Footer Notes */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Người xây dựng: <strong>Tiến</strong> • Kiểm tra độc lập: <strong>Q.Anh</strong></span>
                    <span className="text-indigo-600 font-semibold">Chuẩn mực 100% SGK KNTT</span>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-400">
                  <Layers className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p>Chọn một dạng toán ở danh sách bên trái để xem cẩm nang phương pháp chi tiết.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
