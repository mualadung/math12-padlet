/**
 * ADVERSARIAL STRESS TEST FOR /math-types ROUTE & 37 SUB-TYPES
 * Milestone 1 KaTeX & Math Types Standardization Verification
 * 
 * Execution: node scripts/adversarial_math_types_test.js
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const katex = require('katex');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Terminal styling
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
};

function loadTsModule(relativePath) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`TypeScript source file not found: ${absolutePath}`);
  }
  const code = fs.readFileSync(absolutePath, 'utf8');
  const transpiled = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;

  const mod = { exports: {} };
  const fn = new Function('exports', 'module', 'require', '__filename', '__dirname', transpiled);
  fn(mod.exports, mod, require, absolutePath, path.dirname(absolutePath));
  return mod.exports;
}

function validateKaTeXInString(text, contextLabel) {
  if (!text || typeof text !== 'string') return [];
  const errors = [];
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const rawFormula = match[0];
    const isBlock = rawFormula.startsWith('$$');
    const mathString = isBlock ? rawFormula.slice(2, -2).trim() : rawFormula.slice(1, -1).trim();

    if (!mathString) {
      errors.push({
        context: contextLabel,
        formula: rawFormula,
        error: 'Empty math formula',
      });
      continue;
    }

    try {
      katex.renderToString(mathString, {
        displayMode: isBlock,
        throwOnError: true,
      });
    } catch (err) {
      errors.push({
        context: contextLabel,
        formula: rawFormula,
        error: err.message,
      });
    }
  }

  return errors;
}

function findControlChars(text) {
  if (!text || typeof text !== 'string') return [];
  const matches = [];
  const regex = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      charCode: `0x${match[0].charCodeAt(0).toString(16).padStart(4, '0')}`,
    });
  }
  return matches;
}

async function runAdversarialTest() {
  console.log(`${C.bold}${C.cyan}================================================================================${C.reset}`);
  console.log(`${C.bold}${C.cyan}     KIỂM THỬ ĐỐI KHÁNG ADVERSARIAL: ROUTE /math-types & 37 PHÂN DẠNG TOÁN      ${C.reset}`);
  console.log(`${C.bold}${C.cyan}                     DỰ ÁN: MATH STUDY PADLET 12 (MILESTONE 1)                  ${C.reset}`);
  console.log(`${C.bold}${C.cyan}================================================================================${C.reset}`);
  console.log(`Thời gian bắt đầu: ${new Date().toISOString()}`);
  console.log('');

  let totalAssertions = 0;
  let passedAssertions = 0;
  let failures = [];

  function assert(condition, message, details = '') {
    totalAssertions++;
    if (condition) {
      passedAssertions++;
    } else {
      failures.push({ message, details });
      console.log(`   ${C.red}✗ FAIL:${C.reset} ${message} ${details ? `(${details})` : ''}`);
    }
  }

  // 1. Load machData
  console.log(`${C.bold}${C.blue}--- SUITE 1: TẢI VÀ LẬP BẢN ĐỒ 37 PHÂN DẠNG TỪ TREE_DATA ---${C.reset}`);
  const machData = loadTsModule('src/app/mindmap/machData.ts');
  assert(!!machData.TREE_DATA, 'TREE_DATA tồn tại trong machData.ts');
  assert(Array.isArray(machData.TREE_DATA.chapters), 'TREE_DATA.chapters là một mảng');

  // Exact mapping logic from src/app/math-types/page.tsx
  const LESSON_MAP = {
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

  const allSubTypes = [];
  machData.TREE_DATA.chapters.forEach((c) => {
    const chapterName = c.id === "CH1" ? "Chương I" : c.id === "CH2" ? "Chương II" : "Liên chương I-II";
    c.topics.forEach((t) => {
      const meta = LESSON_MAP[t.id] || { 
        lessonName: t.title, 
        parentCategoryCode: t.id.startsWith("TOPIC_2") ? "DANG_6" : t.id.startsWith("TOPIC_3") ? "DANG_7" : "DANG_1" 
      };
      const chap = t.id === "TOPIC_3_1" ? "Liên chương I-II" : chapterName;
      t.mathTypes.forEach((mt) => {
        allSubTypes.push({
          id: mt.id,
          code: mt.code,
          title: mt.title,
          difficulty: mt.difficulty || "TH",
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

  assert(allSubTypes.length === 37, `Tổng số phân dạng phải đúng bằng 37`, `Thực tế: ${allSubTypes.length}`);
  console.log(`✓ Đã nạp thành công ${allSubTypes.length} phân dạng toán.`);

  // 1.2 ID & Code Uniqueness
  const idSet = new Set();
  const codeSet = new Set();
  allSubTypes.forEach((st, idx) => {
    assert(st.id && typeof st.id === 'string' && st.id.trim().length > 0, `Sub-type #${idx} có id hợp lệ`);
    assert(!idSet.has(st.id), `ID "${st.id}" không bị trùng lặp`);
    idSet.add(st.id);

    assert(st.code && typeof st.code === 'string' && st.code.trim().length > 0, `Sub-type #${idx} có code hợp lệ`);
    assert(!codeSet.has(st.code), `Code "${st.code}" không bị trùng lặp`);
    codeSet.add(st.code);
  });

  // 1.3 Required pedagogical fields for all 37 sub-types
  console.log(`${C.bold}${C.blue}--- SUITE 2: KIỂM TRA ĐẦY ĐỦ CÁC TRƯỜNG SƯ PHẠM VÀ MẪU CÂU HỎI ---${C.reset}`);
  const validDifficulties = new Set(['NB', 'TH', 'VD', 'VDC']);
  const validCategoryCodes = new Set(['DANG_1', 'DANG_2', 'DANG_3', 'DANG_4', 'DANG_5', 'DANG_6', 'DANG_7']);
  const validChapters = new Set(['Chương I', 'Chương II', 'Liên chương I-II']);

  allSubTypes.forEach((st) => {
    assert(validDifficulties.has(st.difficulty), `Độ khó [${st.code}] thuộc {NB, TH, VD, VDC}`, `Giá trị: ${st.difficulty}`);
    assert(validChapters.has(st.chapterName), `Chương [${st.code}] hợp lệ`, `Giá trị: ${st.chapterName}`);
    assert(validCategoryCodes.has(st.parentCategoryCode), `parentCategoryCode [${st.code}] hợp lệ`, `Giá trị: ${st.parentCategoryCode}`);

    // Non-empty substantial content checks
    assert(typeof st.signs === 'string' && st.signs.trim().length >= 20, `[${st.code}] signs >= 20 ký tự`);
    assert(typeof st.theory === 'string' && st.theory.trim().length >= 50, `[${st.code}] theory >= 50 ký tự`);
    assert(typeof st.methods === 'string' && st.methods.trim().length >= 50, `[${st.code}] methods >= 50 ký tự`);
    assert(typeof st.mistakes === 'string' && st.mistakes.trim().length >= 20, `[${st.code}] mistakes >= 20 ký tự`);

    // No placeholder values
    const placeholderRegex = /(TODO|TBD|đang\s*cập\s*nhật|placeholder)/i;
    assert(!placeholderRegex.test(st.signs), `[${st.code}] signs không chứa placeholder`);
    assert(!placeholderRegex.test(st.theory), `[${st.code}] theory không chứa placeholder`);
    assert(!placeholderRegex.test(st.methods), `[${st.code}] methods không chứa placeholder`);
    assert(!placeholderRegex.test(st.mistakes), `[${st.code}] mistakes không chứa placeholder`);

    // Sample question checks
    assert(!!st.sampleQuestion, `[${st.code}] có sampleQuestion`);
    if (st.sampleQuestion) {
      assert(typeof st.sampleQuestion.code === 'string' && st.sampleQuestion.code.length > 0, `[${st.code}] sampleQuestion.code hợp lệ`);
      assert(typeof st.sampleQuestion.content === 'string' && st.sampleQuestion.content.length >= 15, `[${st.code}] sampleQuestion.content hợp lệ`);
      assert(typeof st.sampleQuestion.answer === 'string' && st.sampleQuestion.answer.length > 0, `[${st.code}] sampleQuestion.answer hợp lệ`);
    }
  });

  // 1.4 Coverage of all 8 lessons + inter-chapter
  console.log(`${C.bold}${C.blue}--- SUITE 3: ĐỘ BAO PHỦ 8 BÀI HỌC SGK KẾT NỐI TRI THỨC ---${C.reset}`);
  const lessonCounts = {};
  allSubTypes.forEach((st) => {
    lessonCounts[st.topicId] = (lessonCounts[st.topicId] || 0) + 1;
  });

  const expectedTopics = [
    'TOPIC_1_1', 'TOPIC_1_2', 'TOPIC_1_3', 'TOPIC_1_4', 'TOPIC_1_5', 'TOPIC_1_6',
    'TOPIC_2_1', 'TOPIC_2_2', 'TOPIC_2_3', 'TOPIC_3_1'
  ];

  expectedTopics.forEach((tId) => {
    const count = lessonCounts[tId] || 0;
    assert(count > 0, `Chủ đề ${tId} (${LESSON_MAP[tId]?.lessonName}) có ít nhất 1 phân dạng`, `Số lượng: ${count}`);
  });

  const ch1SubCount = allSubTypes.filter(st => st.chapterName === 'Chương I').length;
  const ch2SubCount = allSubTypes.filter(st => st.chapterName === 'Chương II').length;
  const interSubCount = allSubTypes.filter(st => st.chapterName === 'Liên chương I-II').length;

  assert(ch1SubCount === 23, 'Chương I có chính xác 23 phân dạng', `Thực tế: ${ch1SubCount}`);
  assert(ch2SubCount === 11, 'Chương II thuần túy có chính xác 11 phân dạng', `Thực tế: ${ch2SubCount}`);
  assert(interSubCount === 3, 'Liên chương I-II có chính xác 3 phân dạng', `Thực tế: ${interSubCount}`);
  assert(ch1SubCount + ch2SubCount + interSubCount === 37, 'Tổng hợp phân rã 3 chương = 37');

  // Bloom taxonomy breakdown
  const diffCounts = { NB: 0, TH: 0, VD: 0, VDC: 0 };
  allSubTypes.forEach(st => diffCounts[st.difficulty]++);
  console.log(`Phân bố mức độ Bloom: NB=${diffCounts.NB}, TH=${diffCounts.TH}, VD=${diffCounts.VD}, VDC=${diffCounts.VDC}`);
  assert(diffCounts.NB > 0, 'Có phân dạng mức độ Nhận biết (NB)');
  assert(diffCounts.TH > 0, 'Có phân dạng mức độ Thông hiểu (TH)');
  assert(diffCounts.VD > 0, 'Có phân dạng mức độ Vận dụng (VD)');
  assert(diffCounts.VDC > 0, 'Có phân dạng mức độ Vận dụng cao (VDC)');
  assert(diffCounts.NB + diffCounts.TH + diffCounts.VD + diffCounts.VDC === 37, 'Tổng Bloom = 37');

  // =========================================================================
  // SUITE 4: ADVERSARIAL KATEX & CONTROL CHARACTERS CHECK
  // =========================================================================
  console.log(`${C.bold}${C.blue}--- SUITE 4: KIỂM THỬ ĐỐI KHÁNG KATEX & KÝ TỰ ĐIỀU KHIỂN ---${C.reset}`);
  let totalKaTeXFormulasChecked = 0;

  allSubTypes.forEach((st) => {
    const fields = [
      { name: 'signs', text: st.signs },
      { name: 'theory', text: st.theory },
      { name: 'methods', text: st.methods },
      { name: 'mistakes', text: st.mistakes },
      { name: 'sampleQuestion.content', text: st.sampleQuestion?.content },
      { name: 'sampleQuestion.answer', text: st.sampleQuestion?.answer },
    ];

    fields.forEach((f) => {
      if (!f.text) return;

      // Control characters check
      const cc = findControlChars(f.text);
      assert(cc.length === 0, `[${st.code}].${f.name} không chứa ký tự điều khiển ASCII ẩn`, cc.map(c => c.charCode).join(', '));

      // KaTeX formulas syntax check
      const errs = validateKaTeXInString(f.text, `[${st.code}].${f.name}`);
      const formulaMatches = f.text.match(/(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g) || [];
      totalKaTeXFormulasChecked += formulaMatches.length;

      assert(errs.length === 0, `[${st.code}].${f.name} có 0 lỗi KaTeX (đã kiểm tra ${formulaMatches.length} công thức)`, errs.map(e => `${e.formula} -> ${e.error}`).join(' | '));
    });
  });

  console.log(`✓ Đã kiểm tra KaTeX trên ${totalKaTeXFormulasChecked} biểu thức toán học trong 37 phân dạng.`);

  // Check mathematical domain conditions in machData
  const domainPatterns = [
    { name: 'Tập xác định D', pattern: /(\$D\s*=|tập\s*xác\s*định|txd)/i },
    { name: 'Mẫu thức khác 0', pattern: /(\\ne\s*0|\\neq\s*0|khác\s*0)/i },
    { name: 'Căn thức không âm', pattern: /(\\ge\s*0|\\geq\s*0|không\s*âm)/i },
    { name: 'Vectơ khác không / vuông góc', pattern: /(\\ne\s*\\vec\{0\}|\\cdot.*=\s*0|vuông\s*góc)/i },
    { name: 'Mặt cầu bán kính dương', pattern: /(R\s*=\s*\\sqrt|R\^2\s*=|a\^2\s*\+\s*b\^2\s*\+\s*c\^2\s*-\s*d\s*>\s*0)/i },
  ];

  domainPatterns.forEach((dp) => {
    let found = false;
    for (const st of allSubTypes) {
      if (dp.pattern.test(st.theory) || dp.pattern.test(st.methods)) {
        found = true;
        break;
      }
    }
    assert(found, `Tìm thấy điều kiện toán học: "${dp.name}" trong các phân dạng`);
  });

  // =========================================================================
  // SUITE 5: ADVERSARIAL SIMULATION OF DYNAMIC FILTERS & SEARCH
  // =========================================================================
  console.log(`${C.bold}${C.blue}--- SUITE 5: KIỂM THỬ ĐỐI KHÁNG BỘ LỌC ĐỘNG & TÌM KIẾM ---${C.reset}`);

  // Pure filter function mirroring MathTypesPage component logic
  function filterSubTypes(subtypes, chapterFilter, lessonFilter, difficultyFilter, searchTerm) {
    return subtypes.filter((st) => {
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
  }

  // 5.1 Basic Filters
  assert(filterSubTypes(allSubTypes, "ALL", "ALL", "ALL", "").length === 37, 'Filter ALL trả về đúng 37');
  assert(filterSubTypes(allSubTypes, "Chương I", "ALL", "ALL", "").length === 23, 'Filter Chương I trả về đúng 23');
  assert(filterSubTypes(allSubTypes, "Chương II", "ALL", "ALL", "").length === 11, 'Filter Chương II trả về đúng 11');
  assert(filterSubTypes(allSubTypes, "Liên chương I-II", "ALL", "ALL", "").length === 3, 'Filter Liên chương I-II trả về đúng 3');

  // 5.2 Lesson Filter
  expectedTopics.forEach((tId) => {
    const res = filterSubTypes(allSubTypes, "ALL", tId, "ALL", "");
    assert(res.length > 0, `Filter Lesson "${tId}" trả về kết quả > 0`, `Số lượng: ${res.length}`);
    res.forEach((st) => {
      assert(st.topicId === tId, `Mỗi phần tử lọc ra đều có topicId = ${tId}`);
    });
  });

  // 5.3 Bloom Taxonomy Filter
  ['NB', 'TH', 'VD', 'VDC'].forEach((diff) => {
    const res = filterSubTypes(allSubTypes, "ALL", "ALL", diff, "");
    assert(res.length === diffCounts[diff], `Filter Bloom "${diff}" trả về đúng ${diffCounts[diff]}`, `Thực tế: ${res.length}`);
    res.forEach((st) => {
      assert(st.difficulty === diff, `Mỗi phần tử lọc ra đều có difficulty = ${diff}`);
    });
  });

  // 5.4 Search Discoverability: Every single sub-type can be found by its code and title
  allSubTypes.forEach((st) => {
    const byCode = filterSubTypes(allSubTypes, "ALL", "ALL", "ALL", st.code);
    assert(byCode.some(item => item.id === st.id), `Có thể tìm thấy [${st.code}] theo mã`);

    // Title search (test partial title: first 15 chars)
    const partialTitle = st.title.slice(0, 15);
    const byTitle = filterSubTypes(allSubTypes, "ALL", "ALL", "ALL", partialTitle);
    assert(byTitle.some(item => item.id === st.id), `Có thể tìm thấy [${st.code}] theo tiêu đề "${partialTitle}"`);
  });

  // 5.5 Adversarial Search Inputs
  const adversarialSearchCases = [
    { label: 'Regex metacharacters .*+?^${}()|[]\\', query: '.*+?^${}()|[]\\' },
    { label: 'Unbalanced parentheses', query: '((((' },
    { label: 'Unbalanced brackets', query: '[[[[[[' },
    { label: 'Backslash escape sequence', query: '\\\\\\\\' },
    { label: 'SQL Injection payload', query: "' OR '1'='1" },
    { label: 'XSS script injection payload', query: "<script>alert('xss')</script>" },
    { label: 'HTML img tag payload', query: "<img src=x onerror=alert(1)>" },
    { label: 'Null character and control chars', query: "\u0000\u000B\u001F" },
    { label: 'Long query string (10000 chars)', query: "A".repeat(10000) },
    { label: 'Non-latin foreign scripts (Cyrillic, Arabic, Chinese)', query: "математика رياضيات 数学" },
    { label: 'Emoji characters', query: "📐🔍💡🚀⚠️" },
    { label: 'Whitespace only', query: "     " },
  ];

  adversarialSearchCases.forEach(({ label, query }) => {
    try {
      const res = filterSubTypes(allSubTypes, "ALL", "ALL", "ALL", query);
      assert(Array.isArray(res), `Adversarial search "${label}" thực thi an toàn không văng lỗi`);
    } catch (e) {
      assert(false, `Adversarial search "${label}" sinh ra lỗi runtime!`, e.message);
    }
  });

  // 5.6 Adversarial Filter Combinations Matrix (Stress Matrix)
  console.log(`${C.dim}Đang chạy ma trận kiểm thử 220 tổ hợp bộ lọc đa chiều...${C.reset}`);
  const chapters = ["ALL", "Chương I", "Chương II", "Liên chương I-II", "CHƯƠNG_LẠ_NONEXISTENT"];
  const lessons = ["ALL", ...expectedTopics, "TOPIC_NONEXISTENT"];
  const diffs = ["ALL", "NB", "TH", "VD", "VDC", "HARD_NONEXISTENT"];

  let combinationsTested = 0;
  for (const c of chapters) {
    for (const l of lessons) {
      for (const d of diffs) {
        combinationsTested++;
        try {
          const res = filterSubTypes(allSubTypes, c, l, d, "");
          assert(Array.isArray(res), `Tổ hợp (C=${c}, L=${l}, D=${d}) trả về mảng hợp lệ`);
          // Verify constraints
          res.forEach(item => {
            if (c !== "ALL") assert(item.chapterName === c, `Item thỏa mãn chapter ${c}`);
            if (l !== "ALL") assert(item.topicId === l, `Item thỏa mãn lesson ${l}`);
            if (d !== "ALL") assert(item.difficulty === d, `Item thỏa mãn diff ${d}`);
          });
        } catch (err) {
          assert(false, `Tổ hợp (C=${c}, L=${l}, D=${d}) sinh ngoại lệ: ${err.message}`);
        }
      }
    }
  }
  console.log(`✓ Đã hoàn thành kiểm thử đối kháng ${combinationsTested} tổ hợp bộ lọc.`);

  // =========================================================================
  // SUITE 6: MACRO MODE (7 CATEGORIES) VIA SQLITE PRISMA
  // =========================================================================
  console.log(`${C.bold}${C.blue}--- SUITE 6: KIỂM THỬ DỮ LIỆU CHUYÊN ĐỀ VĨ MÔ (7 DẠNG TOÁN DB) ---${C.reset}`);
  const dbCategories = await prisma.mathCategory.findMany({
    orderBy: { order: 'asc' },
  });

  assert(dbCategories.length === 7, `Cơ sở dữ liệu phải có đúng 7 MathCategory`, `Thực tế: ${dbCategories.length}`);

  dbCategories.forEach((cat) => {
    assert(validCategoryCodes.has(cat.code), `MathCategory code [${cat.code}] thuộc DANG_1..DANG_7`);
    assert(cat.title && cat.title.length > 10, `[${cat.code}] title hợp lệ`);
    assert(cat.identifySigns && cat.identifySigns.length > 20, `[${cat.code}] identifySigns hợp lệ`);
    assert(cat.coreKnowledge && cat.coreKnowledge.length > 50, `[${cat.code}] coreKnowledge hợp lệ`);
    assert(cat.methodSteps && cat.methodSteps.length > 50, `[${cat.code}] methodSteps hợp lệ`);
    assert(cat.commonMistakes && cat.commonMistakes.length > 20, `[${cat.code}] commonMistakes hợp lệ`);

    // KaTeX check in DB Category
    const fields = [
      { name: 'identifySigns', text: cat.identifySigns },
      { name: 'coreKnowledge', text: cat.coreKnowledge },
      { name: 'methodSteps', text: cat.methodSteps },
      { name: 'commonMistakes', text: cat.commonMistakes },
    ];
    fields.forEach((f) => {
      const cc = findControlChars(f.text);
      assert(cc.length === 0, `DB [${cat.code}].${f.name} không chứa ký tự điều khiển ASCII ẩn`);

      const errs = validateKaTeXInString(f.text, `DB [${cat.code}].${f.name}`);
      assert(errs.length === 0, `DB [${cat.code}].${f.name} không có lỗi KaTeX`, errs.map(e => `${e.formula} -> ${e.error}`).join(' | '));
    });
  });

  // =========================================================================
  // SUMMARY REPORT
  // =========================================================================
  console.log('');
  console.log(`${C.bold}${C.white}================================================================================${C.reset}`);
  console.log(`${C.bold}${C.white}               KẾT QUẢ KIỂM THỬ ĐỐI KHÁNG (ADVERSARIAL TEST REPORT)             ${C.reset}`);
  console.log(`${C.bold}${C.white}================================================================================${C.reset}`);
  console.log(`Tổng số khẳng định kiểm tra (Assertions): ${totalAssertions}`);
  console.log(`Số khẳng định ĐẠT (Passed): ${passedAssertions}`);
  console.log(`Số khẳng định THẤT BẠI (Failed): ${failures.length}`);
  console.log('');

  const isSuccess = failures.length === 0;
  if (isSuccess) {
    console.log(`${C.bold}${C.bgGreen}${C.white} >>> VERDICT: APPROVE (TẤT CẢ 37 DẠNG TOÁN VÀ BỘ LỌC ĐỀU ĐẠT CHUẨN XUẤT SẮC) <<< ${C.reset}`);
  } else {
    console.log(`${C.bold}${C.bgRed}${C.white} >>> VERDICT: REJECT (${failures.length} VI PHẠM ĐƯỢC PHÁT HIỆN) <<< ${C.reset}`);
    failures.forEach((f, idx) => {
      console.log(`   ${idx + 1}. ${f.message} ${f.details ? `(${f.details})` : ''}`);
    });
  }

  return isSuccess;
}

runAdversarialTest()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((err) => {
    console.error('Lỗi nghiêm trọng trong kiểm thử:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
