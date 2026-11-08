"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  Background,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import MathRenderer from "@/components/MathRenderer";
import { 
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowUpRight,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  X,
  Search,
  CheckCircle2,
  Compass,
} from "lucide-react";
import Link from "next/link";
import {
  TREE_DATA,
  ChapterItem,
  TopicItem,
  MathTypeItem,
} from "./machData";
import GrandDetailCard from "./GrandDetailCard";

// =========================================================================
// 1. TONE COLOR PALETTE (BOTANICAL LOVABLE MẠCH)
// =========================================================================

const TONE_COLORS: Record<string, { hex: string; bgTint: string; textTint: string; isTinted?: boolean }> = {
  olive: { hex: "#3d5c2a", bgTint: "#f4f7f1", textTint: "#263e18" },
  rust: { hex: "#8d3d19", bgTint: "#faf1ed", textTint: "#62270d" },
  gold: { hex: "#d89b2b", bgTint: "#fdf8ee", textTint: "#4a3306" },
  ink: { hex: "#223049", bgTint: "#eff3f8", textTint: "#131d2e" },
  sage: { hex: "#456c56", bgTint: "#f0f5f2", textTint: "#243c2f", isTinted: true },
  terracotta: { hex: "#b85437", bgTint: "#faeee8", textTint: "#8d3d19", isTinted: true },
  moss: { hex: "#2d5a3f", bgTint: "#eef4ee", textTint: "#1d3e2a", isTinted: true },
  cyan: { hex: "#196b78", bgTint: "#edf7f9", textTint: "#0e444d" },
  emerald: { hex: "#186c44", bgTint: "#edf7f1", textTint: "#0e442a" },
  violet: { hex: "#633b7b", bgTint: "#f6f0fa", textTint: "#3f2350" },
};

// =========================================================================
// 2. CUSTOM STUDY NODES (RADIAL ACCORDION MINDMAP)
// =========================================================================

interface StudyNodeData extends Record<string, unknown> {
  id: string;
  kind: "root" | "chapter" | "topic" | "mathtype";
  label: string;
  subtitle?: string;
  number?: string;
  color?: string;
  code?: string;
  difficulty?: "NB" | "TH" | "VD" | "VDC";
  left?: boolean;
  expanded?: boolean;
  selected?: boolean;
  highlighted?: boolean;
  childCount?: number;
  mathType?: MathTypeItem;
  onToggle?: () => void;
  onSelect?: () => void;
}

function StudyNode({ data }: { data: StudyNodeData }) {
  const colorKey = data.color || "moss";
  const tone = TONE_COLORS[colorKey] || TONE_COLORS.moss;
  const isLeft = !!data.left;

  // A. ROOT HUB NODE (TÂM TRUNG TÂM: TOÁN 12 TẬP 1)
  if (data.kind === "root") {
    return (
      <div 
        className="w-[320px] rounded-[36px_32px_36px_30px_/_26px_30px_28px_32px] p-6 text-white border-2 border-[#375e3b] shadow-2xl transition-all duration-200 select-none cursor-pointer group hover:scale-102 hover:shadow-emerald-950/40"
        style={{ backgroundColor: "#244226" }}
        onClick={data.onToggle}
      >
        <Handle type="source" position={Position.Left} id="left" className="!w-3 !h-3 !bg-emerald-300 !border-2 !border-white" />

        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200/90 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SGK KẾT NỐI TRI THỨC
          </span>
          <span className="font-mono text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-800/80 text-emerald-100 border border-emerald-600/40">
            TẬP 1
          </span>
        </div>

        <h2 className="text-2xl font-black leading-tight text-white uppercase tracking-tight text-center my-1">
          {data.label}
        </h2>
        
        <p className="text-[11px] text-emerald-100/80 text-center font-medium leading-snug">
          Khung ôn tập chuẩn 90 - 100 điểm
        </p>

        <div className="mt-3.5 pt-2.5 border-t border-emerald-700/60 flex items-center justify-between text-[11px] font-bold text-emerald-200">
          <span className="flex items-center gap-1">◄ Chương I</span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300">
            37 Dạng toán
          </span>
          <span className="flex items-center gap-1">Chương II ►</span>
        </div>

        <Handle type="source" position={Position.Right} id="right" className="!w-3 !h-3 !bg-emerald-300 !border-2 !border-white" />
      </div>
    );
  }

  // B. CHAPTER NODE (2 CÁNH TRÁI / PHẢI)
  if (data.kind === "chapter") {
    return (
      <div className="relative">
        <Handle 
          type="target" 
          position={isLeft ? Position.Right : Position.Left} 
          id="in" 
          className="!w-2.5 !h-2.5 !bg-white !border-2 !border-stone-800" 
        />

        <div
          className={`w-[320px] rounded-2xl text-left transition-all p-4 select-none shadow-md hover:shadow-xl border-2 flex flex-col justify-between ${
            data.highlighted ? "ring-4 ring-amber-400 scale-102" : ""
          }`}
          style={{
            backgroundColor: tone.hex,
            borderColor: tone.hex,
            color: "#ffffff"
          }}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <span className="font-mono text-[11px] font-extrabold px-2.5 py-0.5 rounded bg-black/25 uppercase tracking-wider">
              {data.number}
            </span>

            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white">
              {data.childCount} chủ đề bài học
            </span>
          </div>

          <h3 className="font-black text-sm tracking-tight leading-snug mt-1 text-white">
            {data.label}
          </h3>

          {data.subtitle && (
            <p className="text-[11px] text-white/80 mt-1 font-normal line-clamp-1">
              {data.subtitle}
            </p>
          )}
        </div>

        <Handle 
          type="source" 
          position={isLeft ? Position.Left : Position.Right} 
          id="out" 
          className="!w-2.5 !h-2.5 !bg-emerald-400 !border-2 !border-white" 
        />
      </div>
    );
  }

  // C. TOPIC NODE (CÁC CHỦ ĐỀ BÀI HỌC)
  if (data.kind === "topic") {
    const isTinted = tone.isTinted;
    const bgStyle = isTinted ? tone.bgTint : tone.hex;
    const textStyle = isTinted ? tone.textTint : "#ffffff";
    const borderStyle = tone.hex;

    return (
      <div className="relative">
        <Handle 
          type="target" 
          position={isLeft ? Position.Right : Position.Left} 
          id="in" 
          className="!w-2.5 !h-2.5 !bg-stone-500 !border-2 !border-white" 
        />

        <div
          onClick={data.onToggle}
          className={`w-[290px] rounded-xl text-left transition-all p-3 select-none shadow-sm hover:shadow-md border-2 flex flex-col justify-between cursor-pointer group ${
            data.expanded ? "ring-2 ring-emerald-600 scale-102 shadow-md" : ""
          } ${data.highlighted ? "ring-4 ring-amber-400 scale-102" : ""}`}
          style={{
            backgroundColor: bgStyle,
            color: textStyle,
            borderColor: borderStyle,
          }}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <span className="font-mono text-[11px] font-black opacity-80 flex items-center gap-1">
              CHỦ ĐỀ {data.number}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                data.onToggle?.();
              }}
              className="px-2 py-0.5 rounded-md bg-black/10 hover:bg-black/20 text-[10px] font-extrabold flex items-center gap-1 transition-colors"
            >
              <span>{data.childCount} dạng</span>
              {data.expanded ? (
                isLeft ? <ChevronRight size={13} /> : <ChevronLeft size={13} />
              ) : (
                isLeft ? <ChevronLeft size={13} /> : <ChevronRight size={13} />
              )}
            </button>
          </div>

          <h4 className="font-black text-xs tracking-tight leading-snug group-hover:underline">
            {data.label}
          </h4>

          {data.subtitle && (
            <p className="text-[10px] opacity-75 mt-0.5 font-normal line-clamp-1">
              {data.subtitle}
            </p>
          )}
        </div>

        <Handle 
          type="source" 
          position={isLeft ? Position.Left : Position.Right} 
          id="out" 
          className="!w-2.5 !h-2.5 !bg-stone-700 !border-2 !border-white" 
        />
      </div>
    );
  }

  // D. MATH TYPE LEAF NODE (DẠNG TOÁN THỰC CHIẾN)
  return (
    <div className="relative">
      {/* Incoming from Topic */}
      <Handle 
        type="target" 
        position={isLeft ? Position.Right : Position.Left} 
        id="in" 
        className="!w-2 !h-2 !bg-emerald-600 !border !border-white" 
      />

      <button
        onClick={data.onSelect}
        className={`w-[295px] px-3.5 py-2.5 rounded-xl border text-left transition-all flex items-center justify-between group shadow-2xs ${
          data.selected
            ? "bg-white dark:bg-[#18231c] ring-2 ring-emerald-600 shadow-xl scale-102 border-emerald-600"
            : data.highlighted
            ? "bg-amber-50 dark:bg-amber-950/40 ring-2 ring-amber-500 border-amber-500"
            : "bg-[#fcfbf7] dark:bg-[#18231c] hover:bg-white border-[#dcd7cb] hover:border-emerald-600 hover:shadow-xs"
        }`}
        style={{ borderWidth: "1.6px" }}
      >
        <div className="pr-2 truncate">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-mono text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-stone-200/90 text-stone-800">
              {data.code}
            </span>
            {data.difficulty && (
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                data.difficulty === "NB" ? "bg-blue-100 text-blue-800" :
                data.difficulty === "TH" ? "bg-green-100 text-green-800" :
                data.difficulty === "VD" ? "bg-amber-100 text-amber-800" : "bg-purple-100 text-purple-800"
              }`}>
                {data.difficulty}
              </span>
            )}
          </div>
          <h5 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate group-hover:text-emerald-800">
            {data.label}
          </h5>
        </div>

        <span 
          className={`text-[11px] font-bold px-2 py-1 rounded transition-all shrink-0 ${
            data.selected 
              ? "bg-emerald-700 text-white" 
              : "bg-stone-100 dark:bg-stone-800 text-stone-600 group-hover:bg-emerald-700 group-hover:text-white"
          }`}
        >
          {data.selected ? "Đang xem ▾" : "Khám phá ➔"}
        </span>
      </button>

      {/* Outgoing to Grand Detail Card right on Canvas */}
      <Handle 
        type="source" 
        position={isLeft ? Position.Left : Position.Right} 
        id="detail" 
        className="!w-2.5 !h-2.5 !bg-emerald-600 !border-2 !border-white" 
      />
    </div>
  );
}

const nodeTypes = {
  study: StudyNode,
  grandDetail: GrandDetailCard,
};

// =========================================================================
// 3. INNER FLOW COMPONENT (RADIAL ACCORDION MINDMAP ENGINE)
// =========================================================================

interface SelectedMathInfo {
  mathType: MathTypeItem;
  topicId: string;
  left: boolean;
  y: number;
}

function MindmapFlowInner() {
  const { fitView, zoomIn, zoomOut, setCenter } = useReactFlow();

  // Accordion mode: exactly ONE topic is active/expanded at a time for maximum legibility!
  const [activeTopicId, setActiveTopicId] = useState<string | null>("TOPIC_1_1");

  // Mode: Focus (accordion) vs Expand All (bung toàn bộ 37 dạng toán)
  const [isExpandAll, setIsExpandAll] = useState<boolean>(false);

  // Selected Math Type for the In-Canvas Grand Detail Card!
  const [selectedMathInfo, setSelectedMathInfo] = useState<SelectedMathInfo | null>(null);

  // Search & Chapter filter
  const [searchQuery, setSearchQuery] = useState("");
  const [chapterFilter, setChapterFilter] = useState<"ALL" | "CH1" | "CH2">("ALL");

  // Toggle topic accordion
  const handleToggleTopic = useCallback((topicId: string) => {
    if (isExpandAll) {
      setIsExpandAll(false);
      setActiveTopicId(topicId);
    } else {
      setActiveTopicId(prev => (prev === topicId ? null : topicId));
    }
    // Clear detail card if its parent topic is closed
    setSelectedMathInfo(null);
  }, [isExpandAll]);

  // Handle Math Type selection & Auto-pan
  const handleSelectMathType = useCallback((m: MathTypeItem, topicId: string, isLeft: boolean, mY: number) => {
    if (selectedMathInfo?.mathType.id === m.id) {
      setSelectedMathInfo(null);
    } else {
      setSelectedMathInfo({ mathType: m, topicId, left: isLeft, y: mY });
      // Smooth auto-pan so the Grand Card is brought right to center view!
      const targetX = isLeft ? -1560 : 1560;
      setCenter(targetX, mY, { zoom: 0.88, duration: 450 });
    }
  }, [selectedMathInfo, setCenter]);

  // Center tree on Root or active Chapter
  const centerRoot = useCallback(() => {
    if (chapterFilter === "CH1") {
      setCenter(-620, 28, { zoom: 0.88, duration: 400 });
    } else if (chapterFilter === "CH2") {
      setCenter(620, 28, { zoom: 0.88, duration: 400 });
    } else {
      setCenter(0, 28, { zoom: 0.82, duration: 400 });
    }
  }, [chapterFilter, setCenter]);

  // Handle Flow initialization
  const handleInit = useCallback((instance: any) => {
    setTimeout(() => {
      instance.setCenter(0, 28, { zoom: 0.82 });
    }, 100);
  }, []);

  // Compute Active Breadcrumb Info
  const breadcrumbInfo = useMemo(() => {
    let activeChTitle = "";
    let activeTopicTitle = "";
    let activeMathTitle = "";

    if (selectedMathInfo) {
      activeMathTitle = `${selectedMathInfo.mathType.code}: ${selectedMathInfo.mathType.title}`;
    }

    if (activeTopicId) {
      for (const ch of TREE_DATA.chapters) {
        const found = ch.topics.find(t => t.id === activeTopicId);
        if (found) {
          activeChTitle = ch.number;
          activeTopicTitle = `Chủ đề ${found.number}: ${found.title}`;
          break;
        }
      }
    }

    return { activeChTitle, activeTopicTitle, activeMathTitle };
  }, [activeTopicId, selectedMathInfo]);

  // Compute Nodes & Edges dynamically with balanced Radial Accordion layout
  const { nodes, edges } = useMemo(() => {
    const nodesList: Node[] = [];
    const edgesList: Edge[] = [];

    // Helper to add Edge
    const addCurvedEdge = (src: string, tgt: string, srcHandle: string, color: string, tgtHandle: string = "in") => {
      edgesList.push({
        id: `${src}-${tgt}`,
        source: src,
        target: tgt,
        type: "default",
        sourceHandle: srcHandle,
        targetHandle: tgtHandle,
        className: `map-edge tone-${color}`,
      });
    };

    // 0. CENTER ROOT HUB (x = 0, y = 0)
    nodesList.push({
      id: "root",
      type: "study",
      position: { x: 0, y: 0 },
      data: {
        id: "root",
        kind: "root",
        label: "TOÁN 12",
        onToggle: () => {
          setActiveTopicId(null);
          setSelectedMathInfo(null);
        },
      },
    });

    // =========================================================================
    // A. LEFT WING: CHƯƠNG 01 (ỨNG DỤNG ĐẠO HÀM)
    // =========================================================================
    if (chapterFilter === "ALL" || chapterFilter === "CH1") {
      const ch1 = TREE_DATA.chapters[0];
      const ch1Topics = ch1.topics;
      const isCh1TopicActive = ch1Topics.some(t => t.id === activeTopicId);

      // Chapter 1 Hub (x = -440, y = 0)
      nodesList.push({
        id: ch1.id,
        type: "study",
        position: { x: -440, y: 28 },
        data: {
          id: ch1.id,
          kind: "chapter",
          label: ch1.title,
          number: ch1.number,
          subtitle: ch1.subtitle,
          color: ch1.color,
          left: true,
          childCount: ch1Topics.length,
          onToggle: () => handleToggleTopic("TOPIC_1_1"),
        },
      });

      addCurvedEdge("root", ch1.id, "left", ch1.color);

      // 6 Topics of Chapter 1 fanning out on the left (x = -860)
      ch1Topics.forEach((t, idx) => {
        const isTopicExpanded = isExpandAll || t.id === activeTopicId;
        const activeIdx = ch1Topics.findIndex(x => x.id === activeTopicId);

        // Accordion or Expand-All vertical positioning
        let tY = 0;
        if (isExpandAll) {
          tY = (idx - (ch1Topics.length - 1) / 2) * 220 + 28;
        } else {
          tY = (idx - (ch1Topics.length - 1) / 2) * 94 + 28;
          if (isCh1TopicActive && !isTopicExpanded) {
            if (idx < activeIdx) tY -= 110;
            if (idx > activeIdx) tY += 110;
          }
        }

        const isTopicMatch = searchQuery.trim() !== "" && (
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.number.includes(searchQuery)
        );

        nodesList.push({
          id: t.id,
          type: "study",
          position: { x: -860, y: tY },
          data: {
            id: t.id,
            kind: "topic",
            label: t.title,
            number: t.number,
            subtitle: t.subtitle,
            color: t.color,
            left: true,
            expanded: isTopicExpanded,
            highlighted: isTopicMatch,
            childCount: t.mathTypes.length,
            onToggle: () => handleToggleTopic(t.id),
          },
        });

        addCurvedEdge(ch1.id, t.id, "out", t.color);

        // Math Types of expanded topic fan out further left (x = -1240)
        if (isTopicExpanded) {
          const totalMath = t.mathTypes.length;
          t.mathTypes.forEach((m, mIdx) => {
            const mY = tY + (mIdx - (totalMath - 1) / 2) * 64;
            const isSelected = selectedMathInfo?.mathType.id === m.id;
            const isMatch = searchQuery.trim() !== "" && (
              m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (m.difficulty && m.difficulty.toLowerCase().includes(searchQuery.toLowerCase()))
            );

            nodesList.push({
              id: m.id,
              type: "study",
              position: { x: -1240, y: mY },
              data: {
                id: m.id,
                kind: "mathtype",
                label: m.title,
                code: m.code,
                difficulty: m.difficulty,
                color: t.color,
                left: true,
                selected: isSelected,
                highlighted: isMatch,
                mathType: m,
                onSelect: () => handleSelectMathType(m, t.id, true, mY),
              },
            });

            addCurvedEdge(t.id, m.id, "out", t.color);
          });
        }
      });
    }

    // =========================================================================
    // B. RIGHT WING: CHƯƠNG 02 (VECTƠ VÀ TỌA ĐỘ OXYZ)
    // =========================================================================
    if (chapterFilter === "ALL" || chapterFilter === "CH2") {
      const ch2 = TREE_DATA.chapters[1];
      const ch2Topics = ch2.topics;
      const isCh2TopicActive = ch2Topics.some(t => t.id === activeTopicId);

      // Chapter 2 Hub (x = 440, y = 0)
      nodesList.push({
        id: ch2.id,
        type: "study",
        position: { x: 440, y: 28 },
        data: {
          id: ch2.id,
          kind: "chapter",
          label: ch2.title,
          number: ch2.number,
          subtitle: ch2.subtitle,
          color: ch2.color,
          left: false,
          childCount: ch2Topics.length,
          onToggle: () => handleToggleTopic("TOPIC_2_1"),
        },
      });

      addCurvedEdge("root", ch2.id, "right", ch2.color);

      // 4 Topics of Chapter 2 fanning out on the right (x = 860)
      ch2Topics.forEach((t, idx) => {
        const isTopicExpanded = isExpandAll || t.id === activeTopicId;
        const activeIdx = ch2Topics.findIndex(x => x.id === activeTopicId);

        // Accordion or Expand-All vertical positioning
        let tY = 0;
        if (isExpandAll) {
          tY = (idx - (ch2Topics.length - 1) / 2) * 230 + 28;
        } else {
          tY = (idx - (ch2Topics.length - 1) / 2) * 105 + 28;
          if (isCh2TopicActive && !isTopicExpanded) {
            if (idx < activeIdx) tY -= 105;
            if (idx > activeIdx) tY += 105;
          }
        }

        const isTopicMatch = searchQuery.trim() !== "" && (
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.number.includes(searchQuery)
        );

        nodesList.push({
          id: t.id,
          type: "study",
          position: { x: 860, y: tY },
          data: {
            id: t.id,
            kind: "topic",
            label: t.title,
            number: t.number,
            subtitle: t.subtitle,
            color: t.color,
            left: false,
            expanded: isTopicExpanded,
            highlighted: isTopicMatch,
            childCount: t.mathTypes.length,
            onToggle: () => handleToggleTopic(t.id),
          },
        });

        addCurvedEdge(ch2.id, t.id, "out", t.color);

        // Math Types of expanded topic fan out further right (x = 1240)
        if (isTopicExpanded) {
          const totalMath = t.mathTypes.length;
          t.mathTypes.forEach((m, mIdx) => {
            const mY = tY + (mIdx - (totalMath - 1) / 2) * 64;
            const isSelected = selectedMathInfo?.mathType.id === m.id;
            const isMatch = searchQuery.trim() !== "" && (
              m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (m.difficulty && m.difficulty.toLowerCase().includes(searchQuery.toLowerCase()))
            );

            nodesList.push({
              id: m.id,
              type: "study",
              position: { x: 1240, y: mY },
              data: {
                id: m.id,
                kind: "mathtype",
                label: m.title,
                code: m.code,
                difficulty: m.difficulty,
                color: t.color,
                left: false,
                selected: isSelected,
                highlighted: isMatch,
                mathType: m,
                onSelect: () => handleSelectMathType(m, t.id, false, mY),
              },
            });

            addCurvedEdge(t.id, m.id, "out", t.color);
          });
        }
      });
    }

    // =========================================================================
    // C. IN-CANVAS GRAND DETAIL CARD (Attached directly to selected Math Type!)
    // =========================================================================
    if (selectedMathInfo) {
      const isLeft = selectedMathInfo.left;
      const cardX = isLeft ? -1880 : 1580;
      const cardY = selectedMathInfo.y - 140;

      nodesList.push({
        id: "grand-detail",
        type: "grandDetail",
        position: { x: cardX, y: cardY },
        data: {
          id: "grand-detail",
          mathType: selectedMathInfo.mathType,
          topicId: selectedMathInfo.topicId,
          left: isLeft,
          onClose: () => setSelectedMathInfo(null),
        },
      });

      // Connect edge from Math Type to Grand Detail Card!
      addCurvedEdge(
        selectedMathInfo.mathType.id, 
        "grand-detail", 
        "detail", 
        "emerald", 
        "in"
      );
    }

    return { nodes: nodesList, edges: edgesList };
  }, [chapterFilter, activeTopicId, isExpandAll, searchQuery, selectedMathInfo, handleToggleTopic, handleSelectMathType]);

  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState<Node>(nodes);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState<Edge>(edges);

  useEffect(() => {
    setFlowNodes(nodes);
    setFlowEdges(edges);
  }, [nodes, edges, setFlowNodes, setFlowEdges]);

  // Smooth fitView on topic change or filter
  useEffect(() => {
    if (selectedMathInfo) return; // Do not zoom out if user just opened a detail card
    const timer = setTimeout(() => {
      if (chapterFilter === "CH1") {
        setCenter(-620, 28, { zoom: 0.88, duration: 400 });
      } else if (chapterFilter === "CH2") {
        setCenter(620, 28, { zoom: 0.88, duration: 400 });
      } else {
        fitView({ padding: 0.16, duration: 400, maxZoom: 1.0 });
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [activeTopicId, isExpandAll, chapterFilter, fitView, setCenter, selectedMathInfo]);

  // When search query is entered, auto-open matching topic
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase();

    for (const ch of TREE_DATA.chapters) {
      for (const t of ch.topics) {
        const matchesTopic = t.title.toLowerCase().includes(query) || t.number.includes(query);
        const matchesMath = t.mathTypes.some(m => 
          m.title.toLowerCase().includes(query) || 
          m.code.toLowerCase().includes(query)
        );
        if (matchesTopic || matchesMath) {
          setActiveTopicId(t.id);
          return;
        }
      }
    }
  }, [searchQuery]);

  return (
    <div className="relative min-h-screen bg-[#faf8f4] text-[#1c2e26] flex flex-col font-sans select-none">
      {/* ========================================================================= */}
      {/* 1. TOP BRAND HEADER (EDITORIAL MINIMALIST NAVBAR) */}
      {/* ========================================================================= */}
      <header className="border-b border-[#e6e3da] bg-[#faf8f4] px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-black text-xl tracking-tight text-[#1c2e26]">
            <span className="w-5 h-5 rounded-full bg-[#3d5c2a] flex items-center justify-center text-white text-[10px]">
              🌿
            </span>
            mạch<span className="text-[#8d3d19]">.</span>
          </div>
          <span className="text-stone-300 font-light">|</span>
          <span className="text-[11px] font-bold text-stone-600 uppercase tracking-widest hidden md:inline">
            CÂY TRI THỨC TOÁN 12 · TẬP 1
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-[280px] sm:max-w-[340px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Tìm dạng toán (đơn điệu, 1.2, Oxyz)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* View Mode (Focus vs Expand All) */}
        <div className="flex items-center gap-1 bg-[#ede9df]/80 p-1 rounded-xl border border-stone-200">
          <button
            onClick={() => {
              setIsExpandAll(false);
              if (!activeTopicId) setActiveTopicId("TOPIC_1_1");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              !isExpandAll
                ? "bg-[#244226] text-white shadow-xs"
                : "hover:bg-[#e4dfd4] text-stone-700"
            }`}
          >
            <span>🎯</span> Chế độ Tập trung (Focus)
          </button>
          <button
            onClick={() => {
              setIsExpandAll(true);
              setActiveTopicId(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              isExpandAll
                ? "bg-[#244226] text-white shadow-xs"
                : "hover:bg-[#e4dfd4] text-stone-700"
            }`}
          >
            <span>🌿</span> Bung toàn bộ cây (Expand All)
          </button>
        </div>

        {/* Chapter Focus Filter */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setChapterFilter("ALL")}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              chapterFilter === "ALL"
                ? "bg-[#244226] text-white shadow-xs"
                : "bg-[#ede9df] hover:bg-[#e4dfd4] text-stone-700"
            }`}
          >
            Cả 2 Chương
          </button>
          <button
            onClick={() => setChapterFilter("CH1")}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              chapterFilter === "CH1"
                ? "bg-[#3d5c2a] text-white shadow-xs"
                : "bg-[#ede9df] hover:bg-[#e4dfd4] text-stone-700"
            }`}
          >
            Chương I (Trái)
          </button>
          <button
            onClick={() => setChapterFilter("CH2")}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              chapterFilter === "CH2"
                ? "bg-[#196b78] text-white shadow-xs"
                : "bg-[#ede9df] hover:bg-[#e4dfd4] text-stone-700"
            }`}
          >
            Chương II (Phải)
          </button>
        </div>

        {/* View Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={centerRoot}
            title="Đưa về tâm Gốc Toán 12"
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#ede9df] hover:bg-[#e4dfd4] text-stone-700 flex items-center gap-1 transition-all"
          >
            <Compass size={13} /> Về Tâm
          </button>
          <button
            onClick={() => {
              setIsExpandAll(false);
              setActiveTopicId(null);
              setSelectedMathInfo(null);
            }}
            title="Thu nhỏ các nhánh mở rộng"
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#ede9df] hover:bg-[#e4dfd4] text-stone-700 transition-all"
          >
            Thu gọn
          </button>
          <Link
            href="/practice"
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
          >
            <GraduationCap size={14} /> Phòng thi 37 dạng <ArrowUpRight size={13} />
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. SUB-BAR: BREADCRUMBS & LIVE NAVIGATOR */}
      {/* ========================================================================= */}
      <div className="border-b border-[#ece8df] bg-[#faf8f4]/95 px-6 py-2 flex items-center justify-between text-xs text-stone-600 shrink-0">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="font-extrabold text-emerald-800 tracking-wider text-[11px] uppercase flex items-center gap-1 shrink-0">
            GỐC: TOÁN 12 (TẬP 1)
          </span>

          {breadcrumbInfo.activeChTitle && (
            <>
              <ChevronRight size={13} className="text-stone-400 shrink-0" />
              <span className="font-bold text-stone-700 uppercase tracking-tight shrink-0">
                {breadcrumbInfo.activeChTitle}
              </span>
            </>
          )}

          {breadcrumbInfo.activeTopicTitle && (
            <>
              <ChevronRight size={13} className="text-stone-400 shrink-0" />
              <span className="font-semibold text-emerald-900 truncate">
                {breadcrumbInfo.activeTopicTitle}
              </span>
            </>
          )}

          {breadcrumbInfo.activeMathTitle && (
            <>
              <ChevronRight size={13} className="text-emerald-500 shrink-0" />
              <span className="font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-300 truncate">
                {breadcrumbInfo.activeMathTitle}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 text-[11px] font-medium text-stone-500 shrink-0">
          {selectedMathInfo ? (
            <span className="text-emerald-800 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Đang mở Thẻ 5 Tab &amp; Bài tập thực chiến trên sơ đồ
            </span>
          ) : (
            <span>
              Nhấp <strong>[Khám phá ➔]</strong> trên dạng toán để bung Thẻ 5 Tab (Lý thuyết, Bẫy lỗi, Casio, 5 câu đề thật)
            </span>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CANVAS WORKSPACE (FULL RESPONSIVE HEIGHT WITH GUARANTEED MIN-H) */}
      {/* ========================================================================= */}
      <main className="relative flex-1 w-full h-[calc(100vh-140px)] min-h-[720px] overflow-hidden flex flex-col">
        {/* Floating Canvas Controls */}
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-1 bg-white/95 dark:bg-[#18231c]/95 border border-[#dedad0] dark:border-stone-800 shadow-md p-1 rounded-xl">
          <button
            onClick={() => zoomIn({ duration: 300 })}
            title="Phóng to"
            className="p-2 rounded-lg hover:bg-stone-100 text-stone-700 transition-colors"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={() => zoomOut({ duration: 300 })}
            title="Thu nhỏ"
            className="p-2 rounded-lg hover:bg-stone-100 text-stone-700 transition-colors"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={() => fitView({ padding: 0.16, duration: 400 })}
            title="Căn vừa màn hình"
            className="p-2 rounded-lg hover:bg-stone-100 text-stone-700 transition-colors"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* React Flow Canvas Wrapper */}
        <div className="w-full h-full flex-1 min-h-[680px] relative">
          <ReactFlow
            nodes={flowNodes}
            edges={flowEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onInit={handleInit}
            fitView
            fitViewOptions={{ padding: 0.16, duration: 400 }}
            minZoom={0.25}
            maxZoom={1.6}
            nodesDraggable={true}
            nodesConnectable={false}
            elementsSelectable={true}
            className="w-full h-full bg-transparent"
            style={{ width: "100%", height: "100%", minHeight: "680px" }}
          >
            <Background 
              color="#dedad0" 
              gap={26} 
              size={1.2} 
            />
          </ReactFlow>
        </div>
      </main>
    </div>
  );
}

export default function MindmapPage() {
  return (
    <ReactFlowProvider>
      <MindmapFlowInner />
    </ReactFlowProvider>
  );
}
