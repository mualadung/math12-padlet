/**
 * UNIFIED STANDALONE VALIDATION RUNNER FOR MATH STUDY PADLET 12
 * 
 * Verifies all 5 Tiers according to TEST_INFRA.md, ORIGINAL_REQUEST.md, and PROJECT.md:
 * - Tier 1: Question Count Check (DB categories >= 10 questions, Mindmap 50 questions across 10 topics)
 * - Tier 2: Real-Exam Source Check (100% [Nguồn: ...] format with authentic sources)
 * - Tier 3: Duplication Check (0% duplicate between /practice and /mindmap)
 * - Tier 4: KaTeX Syntax & Conditions Check (Parses formulas, verifies KaTeX rendering, checks domain conditions)
 * - Tier 5: Dual Casio Calculator Guide Check (100% questions have both fx-580VN X and fx-880BTG instructions)
 * 
 * Execution: node scripts/validate_all.js
 * Exit Code: 0 if ALL pass, 1 if ANY fail.
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const katex = require('katex');
const ts = require('typescript');

const prisma = new PrismaClient();

// ANSI Terminal Colors for Diagnostic Reporting
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

/**
 * Helper to dynamically load a TypeScript file in-memory using CommonJS transpilation.
 */
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
  const customRequire = (id) => {
    if (id.startsWith('.')) {
      const dir = path.dirname(absolutePath);
      let target = path.resolve(dir, id);
      if (fs.existsSync(target + '.ts')) {
        return loadTsModule(target + '.ts');
      }
      if (fs.existsSync(target + '.tsx')) {
        return loadTsModule(target + '.tsx');
      }
      if (fs.existsSync(target) && fs.statSync(target).isFile()) {
        return loadTsModule(target);
      }
    }
    return require(id);
  };
  const fn = new Function('exports', 'module', 'require', '__filename', '__dirname', transpiled);
  fn(mod.exports, mod, customRequire, absolutePath, path.dirname(absolutePath));
  return mod.exports;
}

/**
 * Normalizes text content for accurate duplication detection.
 */
function normalizeContent(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\$\$[\s\S]*?\$\$/g, (m) => m.replace(/\$/g, ''))
    .replace(/\$[^\$]+?\$/g, (m) => m.replace(/\$/g, ''))
    .replace(/[.,;:?!()\[\]{}"'\\\/~`@#%^&*_+=<>|–—\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Checks for illegal unescaped control characters in string.
 */
function findControlCharacters(text) {
  if (!text || typeof text !== 'string') return [];
  const matches = [];
  // Exclude valid whitespace: \t (0x09), \n (0x0A), \r (0x0D)
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

/**
 * Validates KaTeX syntax on all inline and block formulas within text.
 */
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

/**
 * Validates that a sourceExam string adheres to real-exam verification standards.
 */
function validateExamSource(source) {
  if (!source || typeof source !== 'string') {
    return { valid: false, reason: 'Nguồn bị để trống hoặc null' };
  }

  // Must match [Nguồn: ...]
  const formatRegex = /^\[Nguồn:\s*(.+)\]$/i;
  const match = source.trim().match(formatRegex);
  if (!match) {
    return {
      valid: false,
      reason: `Định dạng không đúng chuẩn '[Nguồn: ...]' (Nội dung hiện tại: "${source}")`,
    };
  }

  const inner = match[1];

  // Verifiable body keywords
  const validBodies = [
    /Bộ\s*GD\s*(&|và)?\s*ĐT/i,
    /Bộ\s*Giáo\s*dục/i,
    /Sở\s*GD\s*(&|và|\-)?\s*ĐT/i,
    /Sở\s*GD/i,
    /THPT\s*Chuyên/i,
    /Chuyên\s+(KHTN|ĐHSP|Sư\s*phạm|Lam\s*Sơn|Phan\s*Bội\s*Châu|Hùng\s*Vương|Lê\s*Hồng\s*Phong|Amsterdam|Chu\s*Văn\s*An|Bắc\s*Giang|Vĩnh\s*Phúc|Thái\s*Bình|Nam\s*Định|Hà\s*Nội|Nghệ\s*An)/i,
    /Đề\s*thi\s*tốt\s*nghiệp\s*THPT/i,
    /Đề\s*tham\s*khảo/i,
    /Khảo\s*sát\s*chất\s*lượng/i,
    /Đề\s*thi\s*thử/i,
  ];

  const hasBody = validBodies.some((pattern) => pattern.test(inner));
  if (!hasBody) {
    return {
      valid: false,
      reason: `Nguồn thiếu cơ quan tổ chức thi hợp lệ (Bộ GD&ĐT, Sở GD&ĐT, THPT Chuyên): "${inner}"`,
    };
  }

  // Check for year (2020-2026)
  const hasYear = /\b(202[0-6])\b/.test(inner);
  if (!hasYear) {
    return {
      valid: false,
      reason: `Nguồn thiếu năm thi xác thực (2020-2026): "${inner}"`,
    };
  }

  return { valid: true };
}

/**
 * Checks Casio Calculator Guide for both fx-580VN X and fx-880BTG button steps.
 */
function validateDualCasio(casioGuide) {
  if (!casioGuide || typeof casioGuide !== 'string' || casioGuide.trim().length === 0) {
    return { valid: false, reason: 'Chưa có hướng dẫn bấm máy tính (casioGuide null hoặc rỗng)' };
  }

  const text = casioGuide.toLowerCase();

  // fx-580VN X check
  const has580 = text.includes('580') || text.includes('fx-580');
  const has580Buttons =
    text.includes('menu') ||
    text.includes('optn') ||
    text.includes('calc') ||
    text.includes('shift') ||
    text.includes('table');

  // fx-880BTG check
  const has880 = text.includes('880') || text.includes('fx-880');
  const has880Buttons =
    text.includes('home') ||
    text.includes('variable') ||
    text.includes('function') ||
    text.includes('catalog') ||
    text.includes('tools') ||
    text.includes('bảng giá trị') ||
    text.includes('vectơ') ||
    text.includes('ok');

  if (!has580) {
    return { valid: false, reason: 'Thiếu hướng dẫn cho dòng máy Casio fx-580VN X' };
  }
  if (!has580Buttons) {
    return { valid: false, reason: 'Hướng dẫn fx-580VN X thiếu các phím thao tác cụ thể (MENU, CALC, TABLE...)' };
  }
  if (!has880) {
    return { valid: false, reason: 'Thiếu hướng dẫn cho dòng máy Casio fx-880BTG' };
  }
  if (!has880Buttons) {
    return { valid: false, reason: 'Hướng dẫn fx-880BTG thiếu các phím thao tác cụ thể (HOME, CATALOG, TOOLS, OK...)' };
  }

  return { valid: true };
}

/**
 * MAIN VALIDATION ORCHESTRATOR
 */
async function runAllValidations() {
  console.log(`${C.bold}${C.cyan}================================================================================${C.reset}`);
  console.log(`${C.bold}${C.cyan}           BỘ CHẠY KIỂM THỬ TOÀN DIỆN E2E (E2E TEST HARNESS RUNNER)             ${C.reset}`);
  console.log(`${C.bold}${C.cyan}                   DỰ ÁN: HỌC LIỆU SỐ TOÁN 12 TRÊN PADLET                       ${C.reset}`);
  console.log(`${C.bold}${C.cyan}================================================================================${C.reset}`);
  console.log(`Thời gian bắt đầu: ${new Date().toISOString()}`);
  console.log(`Môi trường Node.js: ${process.version} | Nền tảng: ${process.platform}`);
  console.log('');

  const report = {
    tier1: { name: 'Tier 1: Question Count Check', passed: false, checks: 0, failures: [] },
    tier2: { name: 'Tier 2: Real-Exam Source Check', passed: false, checks: 0, failures: [] },
    tier3: { name: 'Tier 3: Duplication Check', passed: false, checks: 0, failures: [] },
    tier4: { name: 'Tier 4: KaTeX Syntax & Conditions Check', passed: false, checks: 0, failures: [] },
    tier5: { name: 'Tier 5: Dual Casio Calculator Guide Check', passed: false, checks: 0, failures: [] },
  };

  // Step 0: Load data
  console.log(`${C.dim}Đang tải dữ liệu từ SQLite Prisma & Static Mindmap Files...${C.reset}`);
  const categories = await prisma.mathCategory.findMany({
    include: { questions: true },
    orderBy: { order: 'asc' },
  });

  const dbQuestions = await prisma.question.findMany({
    include: { category: true },
    orderBy: { code: 'asc' },
  });

  let machData = null;
  let mindmapQuestions = null;
  try {
    machData = loadTsModule('src/app/mindmap/machData.ts');
    mindmapQuestions = loadTsModule('src/app/mindmap/mindmapQuestions.ts');
  } catch (err) {
    console.error(`${C.red}Lỗi khi nạp dữ liệu TypeScript tĩnh:${C.reset}`, err.message);
    process.exit(1);
  }

  const treeTopics = [];
  if (machData && machData.TREE_DATA && Array.isArray(machData.TREE_DATA.chapters)) {
    for (const ch of machData.TREE_DATA.chapters) {
      if (Array.isArray(ch.topics)) {
        for (const t of ch.topics) {
          treeTopics.push(t);
        }
      }
    }
  }

  const mindmapBank = mindmapQuestions.REAL_QUESTIONS_BANK || {};
  const allMindmapQuestions = [];
  for (const [topicKey, qList] of Object.entries(mindmapBank)) {
    if (Array.isArray(qList)) {
      for (const q of qList) {
        allMindmapQuestions.push({ ...q, topicKey });
      }
    }
  }

  console.log(`✓ Đã nạp ${categories.length} dạng toán và ${dbQuestions.length} câu hỏi từ SQLite (/practice).`);
  console.log(`✓ Đã nạp ${treeTopics.length} chủ đề cây tri thức và ${allMindmapQuestions.length} câu hỏi đề thi thật (/mindmap).`);
  console.log('');

  // =========================================================================
  // TIER 1: QUESTION COUNT CHECK
  // =========================================================================
  console.log(`${C.bold}${C.blue}--------------------------------------------------------------------------------${C.reset}`);
  console.log(`${C.bold}${C.blue}[TIER 1] QUESTION COUNT & COVERAGE CHECK${C.reset}`);
  console.log(`${C.bold}${C.blue}--------------------------------------------------------------------------------${C.reset}`);

  // 1.1 DB Category count check (>= 15 questions per category)
  report.tier1.checks += categories.length;
  for (const cat of categories) {
    const count = cat.questions.length;
    if (count < 15) {
      report.tier1.failures.push(
        `[DB Category: ${cat.code} - "${cat.title}"] Số lượng câu hỏi hiện có: ${count}/15 (Chưa đạt tối thiểu 15 câu/dạng)`
      );
    }
  }

  // 1.2 Mindmap topics and questions count check (10 topics, 5 questions/topic = 50 questions)
  report.tier1.checks += 1;
  if (treeTopics.length !== 10) {
    report.tier1.failures.push(
      `[Mindmap TREE_DATA] Số lượng chủ đề hiện có: ${treeTopics.length}/10 (Yêu cầu đúng 10 chủ đề Bài 1 -> Bài 8)`
    );
  }

  // 1.3 Check mapping between TREE_DATA topic IDs and REAL_QUESTIONS_BANK keys
  for (const topic of treeTopics) {
    report.tier1.checks += 1;
    const questionsForTopic = mindmapBank[topic.id];
    if (!questionsForTopic || !Array.isArray(questionsForTopic)) {
      report.tier1.failures.push(
        `[Mindmap Mapping Lỗi] Chủ đề ${topic.id} ("${topic.title}") không tìm thấy trong REAL_QUESTIONS_BANK! (Đặc biệt kiểm tra ánh xạ TOPIC_3_1)`
      );
    } else if (questionsForTopic.length < 5) {
      report.tier1.failures.push(
        `[Mindmap Topic: ${topic.id}] Số câu hỏi: ${questionsForTopic.length}/5 (Chưa đạt 5 câu hỏi/chủ đề)`
      );
    }
  }

  // 1.4 Total mindmap questions check
  report.tier1.checks += 1;
  if (allMindmapQuestions.length < 50) {
    report.tier1.failures.push(
      `[Mindmap Tổng câu hỏi] Tổng số câu hỏi hiện có: ${allMindmapQuestions.length}/50 (Yêu cầu tối thiểu 50 câu đề thi thật)`
    );
  }

  report.tier1.passed = report.tier1.failures.length === 0;
  if (report.tier1.passed) {
    console.log(`${C.green}✓ TIER 1 PASSED: Tất cả các dạng toán trong DB đều có >= 15 câu và Mindmap đủ 50 câu/10 chủ đề.${C.reset}`);
  } else {
    console.log(`${C.red}✗ TIER 1 FAILED (${report.tier1.failures.length} vi phạm):${C.reset}`);
    report.tier1.failures.forEach((f) => console.log(`   ${C.red}• ${f}${C.reset}`));
  }
  console.log('');

  // =========================================================================
  // TIER 2: REAL-EXAM SOURCE CHECK
  // =========================================================================
  console.log(`${C.bold}${C.blue}--------------------------------------------------------------------------------${C.reset}`);
  console.log(`${C.bold}${C.blue}[TIER 2] REAL-EXAM SOURCE VERIFICATION CHECK${C.reset}`);
  console.log(`${C.bold}${C.blue}--------------------------------------------------------------------------------${C.reset}`);

  // 2.1 Check DB questions source
  for (const q of dbQuestions) {
    report.tier2.checks += 1;
    const res = validateExamSource(q.sourceExam);
    if (!res.valid) {
      report.tier2.failures.push(`[DB Question: ${q.code}] ${res.reason}`);
    }
  }

  // 2.2 Check Mindmap questions source
  for (const q of allMindmapQuestions) {
    report.tier2.checks += 1;
    const res = validateExamSource(q.source);
    if (!res.valid) {
      report.tier2.failures.push(`[Mindmap Question: ${q.code || q.id} (Topic: ${q.topicKey})] ${res.reason}`);
    }
  }

  report.tier2.passed = report.tier2.failures.length === 0;
  if (report.tier2.passed) {
    console.log(`${C.green}✓ TIER 2 PASSED: 100% câu hỏi trong DB và Mindmap đều có nguồn '[Nguồn: ...]' từ đề thi thật có thể kiểm chứng.${C.reset}`);
  } else {
    console.log(`${C.red}✗ TIER 2 FAILED (${report.tier2.failures.length} vi phạm):${C.reset}`);
    report.tier2.failures.forEach((f) => console.log(`   ${C.red}• ${f}${C.reset}`));
  }
  console.log('');

  // =========================================================================
  // TIER 3: DUPLICATION CHECK
  // =========================================================================
  console.log(`${C.bold}${C.blue}--------------------------------------------------------------------------------${C.reset}`);
  console.log(`${C.bold}${C.blue}[TIER 3] DUPLICATION CHECK (/practice vs /mindmap & Internal)${C.reset}`);
  console.log(`${C.bold}${C.blue}--------------------------------------------------------------------------------${C.reset}`);

  // 3.1 Check duplication between DB and Mindmap
  for (const dbQ of dbQuestions) {
    const normDb = normalizeContent(dbQ.content);
    if (normDb.length < 25) continue;

    for (const mmQ of allMindmapQuestions) {
      report.tier3.checks += 1;
      const normMm = normalizeContent(mmQ.content);
      if (normMm.length < 25) continue;

      if (normDb === normMm || (normDb.length > 50 && normMm.includes(normDb.substring(0, 50)))) {
        report.tier3.failures.push(
          `[Trùng lặp chéo giữa Practice & Mindmap] Câu hỏi DB [${dbQ.code}] trùng với Mindmap [${mmQ.code || mmQ.id} - ${mmQ.topicKey}]: "${dbQ.content.substring(0, 70)}..."`
        );
      }
    }
  }

  // 3.2 Check internal duplication in DB questions
  for (let i = 0; i < dbQuestions.length; i++) {
    const q1 = dbQuestions[i];
    const norm1 = normalizeContent(q1.content);
    if (norm1.length < 25) continue;

    for (let j = i + 1; j < dbQuestions.length; j++) {
      const q2 = dbQuestions[j];
      const norm2 = normalizeContent(q2.content);
      if (norm1 === norm2) {
        report.tier3.failures.push(
          `[Trùng lặp nội bộ DB /practice] Câu hỏi [${q1.code}] và [${q2.code}] có nội dung đề bài giống nhau hoàn toàn!`
        );
      }
    }
  }

  // 3.3 Check internal duplication in Mindmap questions
  for (let i = 0; i < allMindmapQuestions.length; i++) {
    const q1 = allMindmapQuestions[i];
    const norm1 = normalizeContent(q1.content);
    if (norm1.length < 25) continue;

    for (let j = i + 1; j < allMindmapQuestions.length; j++) {
      const q2 = allMindmapQuestions[j];
      const norm2 = normalizeContent(q2.content);
      if (norm1 === norm2) {
        report.tier3.failures.push(
          `[Trùng lặp nội bộ Mindmap] Câu hỏi [${q1.code || q1.id}] và [${q2.code || q2.id}] có nội dung đề bài giống nhau!`
        );
      }
    }
  }

  report.tier3.passed = report.tier3.failures.length === 0;
  if (report.tier3.passed) {
    console.log(`${C.green}✓ TIER 3 PASSED: 0% trùng lặp giữa /practice và /mindmap, không có câu hỏi trùng lặp nội bộ.${C.reset}`);
  } else {
    console.log(`${C.red}✗ TIER 3 FAILED (${report.tier3.failures.length} vi phạm):${C.reset}`);
    report.tier3.failures.forEach((f) => console.log(`   ${C.red}• ${f}${C.reset}`));
  }
  console.log('');

  // =========================================================================
  // TIER 4: KATEX SYNTAX & CONDITIONS CHECK
  // =========================================================================
  console.log(`${C.bold}${C.blue}--------------------------------------------------------------------------------${C.reset}`);
  console.log(`${C.bold}${C.blue}[TIER 4] KATEX SYNTAX & DOMAIN CONDITIONS CHECK${C.reset}`);
  console.log(`${C.bold}${C.blue}--------------------------------------------------------------------------------${C.reset}`);

  // 4.1 Control Characters Check in DB Questions
  for (const q of dbQuestions) {
    const fields = [
      { name: 'content', val: q.content },
      { name: 'explanation', val: q.explanation },
      { name: 'distractorAnalysis', val: q.distractorAnalysis },
    ];
    for (const f of fields) {
      report.tier4.checks += 1;
      const cc = findControlCharacters(f.val);
      if (cc.length > 0) {
        report.tier4.failures.push(
          `[Ký tự điều khiển bất hợp pháp] Tại DB [${q.code}].${f.name}: phát hiện ký tự mã ${cc.map((c) => c.charCode).join(', ')}`
        );
      }
    }
  }

  // 4.2 KaTeX Syntax Check in DB Questions
  for (const q of dbQuestions) {
    const textPool = [
      { text: q.content, ctx: `DB Question ${q.code} (content)` },
      { text: q.explanation, ctx: `DB Question ${q.code} (explanation)` },
      { text: q.distractorAnalysis, ctx: `DB Question ${q.code} (distractorAnalysis)` },
    ];
    if (q.optionsJson) {
      try {
        const opts = JSON.parse(q.optionsJson);
        if (Array.isArray(opts)) {
          opts.forEach((opt, idx) => textPool.push({ text: String(opt), ctx: `DB Question ${q.code} (option ${idx})` }));
        } else if (opts && typeof opts === 'object') {
          Object.entries(opts).forEach(([k, v]) =>
            textPool.push({ text: `${k}: ${v}`, ctx: `DB Question ${q.code} (sub-item ${k})` })
          );
        }
      } catch (e) {
        report.tier4.failures.push(`[JSON Parse Lỗi] Tại DB [${q.code}].optionsJson: ${e.message}`);
      }
    }

    for (const item of textPool) {
      report.tier4.checks += 1;
      const errs = validateKaTeXInString(item.text, item.ctx);
      errs.forEach((e) => report.tier4.failures.push(`[KaTeX Parse Error] ${e.context}: "${e.formula}" -> ${e.error}`));
    }
  }

  // 4.3 KaTeX Syntax Check in DB MathCategory records
  for (const cat of categories) {
    const catPool = [
      { text: cat.identifySigns, ctx: `DB Category ${cat.code} (identifySigns)` },
      { text: cat.coreKnowledge, ctx: `DB Category ${cat.code} (coreKnowledge)` },
      { text: cat.methodSteps, ctx: `DB Category ${cat.code} (methodSteps)` },
      { text: cat.commonMistakes, ctx: `DB Category ${cat.code} (commonMistakes)` },
    ];
    for (const item of catPool) {
      report.tier4.checks += 1;
      const errs = validateKaTeXInString(item.text, item.ctx);
      errs.forEach((e) => report.tier4.failures.push(`[KaTeX Parse Error] ${e.context}: "${e.formula}" -> ${e.error}`));
    }
  }

  // 4.4 KaTeX Syntax Check in Mindmap Questions
  for (const q of allMindmapQuestions) {
    const textPool = [
      { text: q.content, ctx: `Mindmap Question ${q.code || q.id} (content)` },
      { text: q.explanation || q.solution || '', ctx: `Mindmap Question ${q.code || q.id} (solution)` },
      { text: q.distractorAnalysis || '', ctx: `Mindmap Question ${q.code || q.id} (distractorAnalysis)` },
    ];
    if (Array.isArray(q.options)) {
      q.options.forEach((opt, idx) =>
        textPool.push({ text: typeof opt === 'string' ? opt : (opt.text || JSON.stringify(opt)), ctx: `Mindmap Question ${q.code || q.id} (option ${idx})` })
      );
    }
    if (Array.isArray(q.items)) {
      q.items.forEach((it, idx) => {
        textPool.push({ text: it.statement, ctx: `Mindmap Question ${q.code || q.id} (item ${idx} statement)` });
        textPool.push({ text: it.explanation, ctx: `Mindmap Question ${q.code || q.id} (item ${idx} explanation)` });
      });
    }

    for (const item of textPool) {
      report.tier4.checks += 1;
      const errs = validateKaTeXInString(item.text, item.ctx);
      errs.forEach((e) => report.tier4.failures.push(`[KaTeX Parse Error] ${e.context}: "${e.formula}" -> ${e.error}`));
    }
  }

  // 4.5 KaTeX Syntax Check in machData.ts Math Types
  for (const t of treeTopics) {
    if (Array.isArray(t.mathTypes)) {
      for (const mt of t.mathTypes) {
        if (mt.details) {
          const textPool = [
            { text: mt.details.theory, ctx: `machData ${mt.code} (theory)` },
            { text: mt.details.signs, ctx: `machData ${mt.code} (signs)` },
            { text: mt.details.methods, ctx: `machData ${mt.code} (methods)` },
            { text: mt.details.mistakes, ctx: `machData ${mt.code} (mistakes)` },
          ];
          if (mt.details.sampleQuestion) {
            textPool.push({ text: mt.details.sampleQuestion.content, ctx: `machData ${mt.code} (sampleQuestion content)` });
            textPool.push({ text: mt.details.sampleQuestion.answer, ctx: `machData ${mt.code} (sampleQuestion answer)` });
          }
          for (const item of textPool) {
            report.tier4.checks += 1;
            const errs = validateKaTeXInString(item.text, item.ctx);
            errs.forEach((e) => report.tier4.failures.push(`[KaTeX Parse Error] ${e.context}: "${e.formula}" -> ${e.error}`));
          }
        }
      }
    }
  }

  // 4.6 Domain Conditions Check across DB Categories and Explanations
  // Verifies mathematical domain conditions: D, != 0, >= 0, a != 0, dot product = 0
  const conditionTerms = [
    { name: 'Tập xác định D', pattern: /(\$D\b|tập\s*xác\s*định|txd)/i },
    { name: 'Điều kiện mẫu khác 0', pattern: /(\\ne\s*0|\\neq\s*0|!\=\s*0|khác\s*0)/i },
    { name: 'Điều kiện căn không âm', pattern: /(\\ge\s*0|\\geq\s*0|>=\s*0|không\s*âm)/i },
    { name: 'Điều kiện vectơ khác vectơ 0', pattern: /(\\vec\{0\}|vectơ\s*khác|vecto\s*khác)/i },
    { name: 'Điều kiện vuông góc / tích vô hướng bằng 0', pattern: /(\\cdot.*=\s*0|tích\s*vô\s*hướng.*0|vuông\s*góc)/i },
  ];

  for (const cond of conditionTerms) {
    report.tier4.checks += 1;
    let foundInDB = false;
    for (const q of dbQuestions) {
      if (cond.pattern.test(q.explanation) || cond.pattern.test(q.content)) {
        foundInDB = true;
        break;
      }
    }
    if (!foundInDB) {
      report.tier4.failures.push(
        `[Thiếu điều kiện toán học] Không tìm thấy biểu thức quy chuẩn cho: ${cond.name} trong các câu hỏi cơ sở dữ liệu.`
      );
    }
  }

  report.tier4.passed = report.tier4.failures.length === 0;
  if (report.tier4.passed) {
    console.log(`${C.green}✓ TIER 4 PASSED: 100% biểu thức KaTeX render thành công, không có ký tự điều khiển lạ, đầy đủ điều kiện toán học.${C.reset}`);
  } else {
    console.log(`${C.red}✗ TIER 4 FAILED (${report.tier4.failures.length} vi phạm):${C.reset}`);
    report.tier4.failures.forEach((f) => console.log(`   ${C.red}• ${f}${C.reset}`));
  }
  console.log('');

  // =========================================================================
  // TIER 5: DUAL CASIO CALCULATOR GUIDE CHECK
  // =========================================================================
  console.log(`${C.bold}${C.blue}--------------------------------------------------------------------------------${C.reset}`);
  console.log(`${C.bold}${C.blue}[TIER 5] DUAL CASIO CALCULATOR GUIDE CHECK (580 & 880)${C.reset}`);
  console.log(`${C.bold}${C.blue}--------------------------------------------------------------------------------${C.reset}`);

  for (const q of dbQuestions) {
    report.tier5.checks += 1;
    const res = validateDualCasio(q.casioGuide);
    if (!res.valid) {
      report.tier5.failures.push(`[DB Question: ${q.code}] ${res.reason}`);
    }
  }

  report.tier5.passed = report.tier5.failures.length === 0;
  if (report.tier5.passed) {
    console.log(`${C.green}✓ TIER 5 PASSED: 100% câu hỏi trong DB đều có hướng dẫn bấm máy chi tiết cho cả Casio fx-580VN X và Casio fx-880BTG.${C.reset}`);
  } else {
    console.log(`${C.red}✗ TIER 5 FAILED (${report.tier5.failures.length} vi phạm):${C.reset}`);
    report.tier5.failures.forEach((f) => console.log(`   ${C.red}• ${f}${C.reset}`));
  }
  console.log('');

  // =========================================================================
  // EXECUTIVE SUMMARY TABLE
  // =========================================================================
  console.log(`${C.bold}${C.white}================================================================================${C.reset}`);
  console.log(`${C.bold}${C.white}                      BẢNG TỔNG KẾT KẾT QUẢ KIỂM THỬ E2E                       ${C.reset}`);
  console.log(`${C.bold}${C.white}================================================================================${C.reset}`);
  console.log(`| Tầng Kiểm Thử (Tier)                         | Trạng thái | Số mục kiểm tra | Số lỗi |`);
  console.log(`|----------------------------------------------|:----------:|:---------------:|:------:|`);

  const tiers = [report.tier1, report.tier2, report.tier3, report.tier4, report.tier5];
  let allPassed = true;

  for (const t of tiers) {
    if (!t.passed) allPassed = false;
    const statusStr = t.passed ? `${C.green} PASS ${C.reset}` : `${C.red} FAIL ${C.reset}`;
    const namePadded = t.name.padEnd(44, ' ');
    const checksStr = String(t.checks).padStart(15, ' ');
    const failStr = String(t.failures.length).padStart(6, ' ');
    console.log(`| ${namePadded} |   ${statusStr}   | ${checksStr} | ${failStr} |`);
  }
  console.log(`${C.bold}${C.white}================================================================================${C.reset}`);

  if (allPassed) {
    console.log(`${C.bold}${C.bgGreen}${C.white} >>> NGHIỆM THU THÀNH CÔNG: TẤT CẢ 5 TIERS ĐỀU ĐẠT CHUẨN XUẤT SẮC (EXIT CODE 0) <<< ${C.reset}`);
  } else {
    console.log(`${C.bold}${C.bgRed}${C.white} >>> KẾT QUẢ: PHÁT HIỆN LỖI CẦN KHẮC PHỤC THEO BÁO CÁO Ở TRÊN (EXIT CODE 1) <<< ${C.reset}`);
  }
  console.log('');

  return allPassed;
}

runAllValidations()
  .then((allPassed) => {
    process.exit(allPassed ? 0 : 1);
  })
  .catch((err) => {
    console.error(`${C.bold}${C.red}Lỗi không mong muốn trong quá trình thực thi kiểm thử:${C.reset}`, err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
