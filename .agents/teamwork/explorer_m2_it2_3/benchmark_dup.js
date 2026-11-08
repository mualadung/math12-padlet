const fs = require('fs');
const ts = require('typescript');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function loadTs(file) {
  const code = fs.readFileSync(file, 'utf8');
  const transpiled = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} };
  new Function('exports', 'module', 'require', transpiled)(mod.exports, mod, require);
  return mod.exports;
}

// =========================================================================
// NORMALIZATION & EXTRACTION UTILITIES
// =========================================================================

function normalizeContent(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\$\$[\s\S]*?\$\$/g, (m) => m.replace(/\$/g, ''))
    .replace(/\$[^\$]+?\$/g, (m) => m.replace(/\$/g, ''))
    .replace(/[.,;:?!()\[\]{}\"'\\\/~`@#%^&*_+=<>|–—\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function getWordNGrams(text, n = 3) {
  const norm = normalizeContent(text);
  const words = norm.split(' ').filter((w) => w.length > 0);
  if (words.length < n) return new Set([words.join(' ')]);
  const grams = new Set();
  for (let i = 0; i <= words.length - n; i++) {
    grams.add(words.slice(i, i + n).join(' '));
  }
  return grams;
}

function getWordTokens(text) {
  const norm = normalizeContent(text);
  return new Set(norm.split(' ').filter((w) => w.length > 2));
}

function jaccardSimilarity(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let inter = 0;
  for (const item of setA) {
    if (setB.has(item)) inter++;
  }
  const union = setA.size + setB.size - inter;
  return union === 0 ? 0 : inter / union;
}

// Common/generic math expressions that appear across many unrelated problems
const GENERIC_MATH_PATTERNS = [
  /^[xyztrdhmabcknp]$/,
  /^f\(x\)$/,
  /^y=f\(x\)$/,
  /^f'\(x\)$/,
  /^y'$/,
  /^g\(x\)$/,
  /^oxyz$/,
  /^oxy$/,
  /^oxz$/,
  /^oyz$/,
  /^o\(0;0;0\)$/,
  /^\(?0;0;0\)?$/,
  /^\\mathbb\{r\}$/,
  /^\\mathbb\{d\}$/,
  /^\\vec\{[a-z0]\}/,
  /^\d+$/,
  /^\\pi$/,
  /^[+-]\\infty$/,
  /^x\\in\\mathbb\{r\}$/,
  /^\(-\\infty;\+\\infty\)$/,
  /^[m|x]\\in\[-?\d+;-?\d+\]$/, // e.g. m \in [-10; 10]
  /^[a-z]{3,4}\.[a-z]{3,4}(')*$/, // e.g. abc.a'b'c', abcd.a'b'c'd'
  /^s\.[a-z]{3,4}$/, // e.g. s.abcd
];

function isGenericMath(token) {
  return GENERIC_MATH_PATTERNS.some((p) => p.test(token));
}

function extractMathFeatures(text) {
  if (!text || typeof text !== 'string') return { distinctiveFormulas: new Set(), coordinates: new Set() };
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
  const distinctiveFormulas = new Set();
  const coordinates = new Set();

  let m;
  while ((m = regex.exec(text)) !== null) {
    const raw = m[0];
    const isBlock = raw.startsWith('$$');
    const math = isBlock ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim();
    const clean = math.replace(/\s+/g, '').toLowerCase();
    if (!clean) continue;

    if (isGenericMath(clean)) continue;

    // Check for 3D coordinates: e.g. a(0;2;3), b(6;8;5), m(1+2t;4t;2+4t)
    // Filter out simple axis unit points like (1;0;0), (0;1;0), (0;0;1)
    const coordMatch = clean.match(/^[a-z]\((-?\d+.*?;.*?)\)$/i) || clean.match(/^[a-z]\((.+?;.+?;.+?)\)$/i);
    if (coordMatch) {
      const inner = coordMatch[1];
      const isUnitAxis = /^(1;0;0|0;1;0|0;0;1|0;2;0|0;0;3)$/.test(inner);
      if (!isUnitAxis) {
        coordinates.add(clean);
      }
    }

    // Significant formulas: length >= 8, not generic
    if (clean.length >= 8 && !coordMatch) {
      distinctiveFormulas.add(clean);
    }
  }

  return { distinctiveFormulas, coordinates };
}

function parseMultipleChoiceOptions(raw) {
  if (!raw) return [];
  let arr = [];
  if (Array.isArray(raw)) {
    arr = raw;
  } else if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) arr = parsed;
    } catch (e) {}
  }
  // Only process if array of strings (traditional 4 options)
  if (arr.length === 4 && typeof arr[0] === 'string') {
    return arr
      .map((opt) =>
        opt
          .replace(/^[A-D]\.\s*/i, '')
          .replace(/\s+/g, ' ')
          .trim()
          .toLowerCase()
      )
      .sort();
  }
  return [];
}

/**
 * Multi-layered Duplication Detection Engine
 */
function evaluateDuplication(q1, q2) {
  const norm1 = normalizeContent(q1.content);
  const norm2 = normalizeContent(q2.content);

  if (norm1.length < 20 || norm2.length < 20) {
    return { isDuplicate: false };
  }

  // -------------------------------------------------------------------------
  // LAYER 1: Exact text match & Substring match
  // -------------------------------------------------------------------------
  if (norm1 === norm2) {
    return {
      isDuplicate: true,
      layer: 'LAYER_1_EXACT',
      details: 'Chuỗi văn bản chuẩn hóa giống nhau 100%',
    };
  }

  // If one question is a substantial substring of the other (>= 50 chars)
  if (norm1.length >= 50 && norm2.includes(norm1)) {
    return {
      isDuplicate: true,
      layer: 'LAYER_1_SUBSTRING',
      details: `Nội dung (${norm1.length} ký tự) nằm trọn trong câu hỏi đối chiếu`,
    };
  }
  if (norm2.length >= 50 && norm1.includes(norm2)) {
    return {
      isDuplicate: true,
      layer: 'LAYER_1_SUBSTRING',
      details: `Nội dung đối chiếu (${norm2.length} ký tự) nằm trọn trong câu hỏi`,
    };
  }

  // Prefix match (>= 60 chars)
  if (norm1.length >= 60 && norm2.length >= 60) {
    if (norm1.substring(0, 60) === norm2.substring(0, 60)) {
      return {
        isDuplicate: true,
        layer: 'LAYER_1_PREFIX',
        details: 'Trùng khớp 60 ký tự mở đầu chuẩn hóa',
      };
    }
  }

  // -------------------------------------------------------------------------
  // LAYER 2: Jaccard similarity on normalized word 3-grams (> 70%)
  // -------------------------------------------------------------------------
  const grams1 = getWordNGrams(q1.content, 3);
  const grams2 = getWordNGrams(q2.content, 3);
  const jaccard3G = jaccardSimilarity(grams1, grams2);

  if (jaccard3G >= 0.70) {
    return {
      isDuplicate: true,
      layer: 'LAYER_2_3GRAM_JACCARD',
      details: `Độ tương đồng 3-gram từ vựng đạt ${(jaccard3G * 100).toFixed(1)}% (ngưỡng >= 70%)`,
    };
  }

  // -------------------------------------------------------------------------
  // LAYER 3: Core Mathematical Formula / Equation Matching
  // -------------------------------------------------------------------------
  const feat1 = extractMathFeatures(q1.content);
  const feat2 = extractMathFeatures(q2.content);

  // 3A. Multiple Non-trivial Spatial Coordinates Matching
  const commonCoords = [];
  for (const c of feat1.coordinates) {
    if (feat2.coordinates.has(c)) commonCoords.push(c);
  }
  if (commonCoords.length >= 2) {
    return {
      isDuplicate: true,
      layer: 'LAYER_3_COORDINATES',
      details: `Trùng cấu hình ${commonCoords.length} tọa độ không gian: [${commonCoords.join(', ')}]`,
    };
  }

  // 3B. Distinctive Mathematical Formulas Matching
  const words1 = getWordTokens(q1.content);
  const words2 = getWordTokens(q2.content);
  const wordSim = jaccardSimilarity(words1, words2);

  const commonFormulas = [];
  for (const f of feat1.distinctiveFormulas) {
    if (feat2.distinctiveFormulas.has(f)) commonFormulas.push(f);
  }

  for (const formula of commonFormulas) {
    // Highly distinctive formula (length >= 10, e.g. g(x)=f(1-2x), y=\frac{\sqrt{x^2-1}}{x-2}, 2f(x)-3=0)
    // with moderate semantic overlap (wordSim >= 0.25 or 3-gram >= 0.30)
    if (formula.length >= 10 && (wordSim >= 0.25 || jaccard3G >= 0.25)) {
      return {
        isDuplicate: true,
        layer: 'LAYER_3_DISTINCT_FORMULA',
        details: `Trùng công thức/phương trình cốt lõi "${formula}" (độ tương đồng ngữ cảnh: ${(wordSim * 100).toFixed(1)}%)`,
      };
    }
  }

  // If 2 or more non-trivial formulas are shared with wordSim >= 0.20
  if (commonFormulas.length >= 2 && wordSim >= 0.20) {
    return {
      isDuplicate: true,
      layer: 'LAYER_3_MULTIPLE_FORMULAS',
      details: `Trùng ${commonFormulas.length} công thức đặc trưng [${commonFormulas.join(', ')}]`,
    };
  }

  // -------------------------------------------------------------------------
  // LAYER 4: Multiple-Choice Options Set & Exam Source Fingerprinting
  // -------------------------------------------------------------------------
  const opts1 = parseMultipleChoiceOptions(q1.options || q1.optionsJson);
  const opts2 = parseMultipleChoiceOptions(q2.options || q2.optionsJson);

  if (opts1.length === 4 && opts2.length === 4) {
    const s1 = opts1.join(' | ');
    const s2 = opts2.join(' | ');
    if (s1.length >= 12 && s1 === s2) {
      return {
        isDuplicate: true,
        layer: 'LAYER_4_OPTIONS_SET',
        details: `Bộ 4 phương án trắc nghiệm trùng khớp 100%: [${s1}]`,
      };
    }
  }

  // Source citation matching (same exam body + year + question number)
  const src1 = (q1.source || q1.sourceExam || '').toLowerCase();
  const src2 = (q2.source || q2.sourceExam || '').toLowerCase();
  const qNum1 = src1.match(/câu\s*(\d+)/i);
  const qNum2 = src2.match(/câu\s*(\d+)/i);
  const yr1 = src1.match(/202[0-5]/);
  const yr2 = src2.match(/202[0-5]/);

  if (qNum1 && qNum2 && qNum1[1] === qNum2[1] && yr1 && yr2 && yr1[0] === yr2[0]) {
    const keyBodies = ['bộ gd', 'nghệ an', 'bắc ninh', 'hà nội', 'nam định', 'phan bội châu', 'lam sơn', 'đh sư phạm', 'chuyên khtn'];
    const sameBody = keyBodies.some((b) => src1.includes(b) && src2.includes(b));
    if (sameBody && (wordSim >= 0.35 || jaccard3G >= 0.20 || commonFormulas.length >= 1)) {
      return {
        isDuplicate: true,
        layer: 'LAYER_4_EXAM_SOURCE',
        details: `Cùng trích từ đề thi thật (${yr1[0]} Câu ${qNum1[1]}) với độ tương đồng nội dung ${(wordSim * 100).toFixed(1)}%`,
      };
    }
  }

  return { isDuplicate: false };
}

async function runBenchmark() {
  console.log('=== RUNNING REFINED BENCHMARK OF MULTI-LAYERED DUPLICATION ENGINE ===\n');
  const db = await prisma.question.findMany();
  const mm = loadTs('src/app/mindmap/mindmapQuestions.ts').REAL_QUESTIONS_BANK;
  const mmList = [];
  for (const [k, list] of Object.entries(mm)) {
    for (const q of list) mmList.push({ ...q, topic: k });
  }

  const detectedCross = [];
  for (const m of mmList) {
    for (const d of db) {
      const res = evaluateDuplication(m, d);
      if (res.isDuplicate) {
        detectedCross.push({
          mId: m.id,
          mTopic: m.topic,
          dCode: d.code,
          layer: res.layer,
          details: res.details,
        });
      }
    }
  }

  console.log(`Detected ${detectedCross.length} cross-duplicates between Mindmap and DB:`);
  detectedCross.forEach((dup, i) => {
    console.log(`\n#${i + 1}: Mindmap [${dup.mId}] (${dup.mTopic}) <---> DB [${dup.dCode}]`);
    console.log(`    Triggered: [${dup.layer}]`);
    console.log(`    Details:   ${dup.details}`);
  });

  // Check internal DB
  const detectedDbInternal = [];
  for (let i = 0; i < db.length; i++) {
    for (let j = i + 1; j < db.length; j++) {
      const res = evaluateDuplication(db[i], db[j]);
      if (res.isDuplicate) {
        detectedDbInternal.push({ q1: db[i].code, q2: db[j].code, layer: res.layer, details: res.details });
      }
    }
  }
  console.log(`\nInternal DB duplicates detected: ${detectedDbInternal.length}`);
  detectedDbInternal.forEach((d) => console.log(`   ${d.q1} vs ${d.q2}: [${d.layer}] ${d.details}`));

  // Check internal MM
  const detectedMmInternal = [];
  for (let i = 0; i < mmList.length; i++) {
    for (let j = i + 1; j < mmList.length; j++) {
      const res = evaluateDuplication(mmList[i], mmList[j]);
      if (res.isDuplicate) {
        detectedMmInternal.push({ q1: mmList[i].id, q2: mmList[j].id, layer: res.layer, details: res.details });
      }
    }
  }
  console.log(`\nInternal Mindmap duplicates detected: ${detectedMmInternal.length}`);
  detectedMmInternal.forEach((d) => console.log(`   ${d.q1} vs ${d.q2}: [${d.layer}] ${d.details}`));

  await prisma.$disconnect();
}

runBenchmark();
