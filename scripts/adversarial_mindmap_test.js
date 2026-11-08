/**
 * ADVERSARIAL STRESS TEST & VERIFICATION HARNESS FOR MILESTONE 2
 * Author: Empirical Challenger (challenger_m2_1)
 * Purpose: Empirically stress-test src/app/mindmap/mindmapQuestions.ts against prisma/dev.db
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const katex = require('katex');
const ts = require('typescript');

const prisma = new PrismaClient();

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

function tokenize(text) {
  const norm = normalizeContent(text);
  return new Set(norm.split(' ').filter((w) => w.length > 2));
}

function jaccardSimilarity(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

async function runAdversarialSuite() {
  console.log('================================================================');
  console.log('   ADVERSARIAL VERIFICATION SUITE — MILESTONE 2 (MINDMAP)       ');
  console.log('================================================================');
  
  const results = {
    checks: 0,
    failures: [],
    confirmedDuplicates: [],
    warnings: [],
  };

  // 1. Load files & DB
  console.log('[1/7] Loading Prisma DB and TypeScript modules...');
  const dbQuestions = await prisma.question.findMany();
  console.log(`Loaded ${dbQuestions.length} questions from SQLite prisma/dev.db.`);

  let mmMod, machMod;
  try {
    mmMod = loadTsModule('src/app/mindmap/mindmapQuestions.ts');
    machMod = loadTsModule('src/app/mindmap/machData.ts');
  } catch (err) {
    results.failures.push(`Failed to load TypeScript module: ${err.message}`);
    return results;
  }

  const bank = mmMod.REAL_QUESTIONS_BANK;
  if (!bank) {
    results.failures.push('REAL_QUESTIONS_BANK is undefined or null');
    return results;
  }

  // 2. Count and structure verification
  console.log('[2/7] Verifying Mindmap questions count and topic distribution...');
  const topicKeys = Object.keys(bank);
  console.log(`Discovered ${topicKeys.length} enumerable topic keys in REAL_QUESTIONS_BANK:`, topicKeys);

  const allQuestions = [];
  const idSet = new Set();
  const codeSet = new Set();

  for (const key of topicKeys) {
    const list = bank[key];
    if (!Array.isArray(list)) {
      results.failures.push(`Topic ${key} value is not an array`);
      continue;
    }
    results.checks++;
    if (list.length !== 5) {
      results.failures.push(`Topic ${key} has ${list.length} questions (expected exactly 5)`);
    }
    for (const q of list) {
      allQuestions.push({ ...q, topicKey: key });
      results.checks++;
      if (idSet.has(q.id)) {
        results.failures.push(`Duplicate ID within Mindmap: ${q.id}`);
      }
      idSet.add(q.id);

      results.checks++;
      if (codeSet.has(q.code)) {
        results.failures.push(`Duplicate Code within Mindmap: ${q.code}`);
      }
      codeSet.add(q.code);
    }
  }

  results.checks++;
  if (allQuestions.length !== 50) {
    results.failures.push(`Total questions count is ${allQuestions.length} (expected exactly 50)`);
  } else {
    console.log(`✓ Confirmed exactly 50 distinct questions across ${topicKeys.length} topics.`);
  }

  // 3. Topic 10 mapping and getQuestionsForTopic
  console.log('[3/7] Stress-testing topic mapping and getQuestionsForTopic()...');
  results.checks++;
  if (!bank['TOPIC_3_1']) {
    results.failures.push('REAL_QUESTIONS_BANK["TOPIC_3_1"] is missing');
  }
  const q3_1 = mmMod.getQuestionsForTopic('TOPIC_3_1');
  results.checks++;
  if (!Array.isArray(q3_1) || q3_1.length !== 5) {
    results.failures.push(`getQuestionsForTopic("TOPIC_3_1") returned invalid questions: ${q3_1 ? q3_1.length : 'null'}`);
  }

  const q2_4 = mmMod.getQuestionsForTopic('TOPIC_2_4');
  results.checks++;
  if (!Array.isArray(q2_4) || q2_4.length !== 5) {
    results.failures.push(`getQuestionsForTopic("TOPIC_2_4") backward-compat failed`);
  }

  const qFallbackCh1 = mmMod.getQuestionsForTopic('TOPIC_1_NONEXISTENT');
  results.checks++;
  if (!Array.isArray(qFallbackCh1) || qFallbackCh1.length !== 5) {
    results.failures.push('getQuestionsForTopic Chapter 1 fallback failed');
  }

  const qFallbackCh2 = mmMod.getQuestionsForTopic('UNKNOWN_XYZ');
  results.checks++;
  if (!Array.isArray(qFallbackCh2) || qFallbackCh2.length !== 5) {
    results.failures.push('getQuestionsForTopic default fallback failed');
  }

  // 4. Source format & authentic exam check
  console.log('[4/7] Adversarial audit of source format and citations...');
  const sourceRegex = /^\[Nguồn:\s*(.+)\]$/i;
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

  for (const q of allQuestions) {
    results.checks++;
    if (!q.source) {
      results.failures.push(`[${q.id}] Source is empty`);
      continue;
    }
    const match = q.source.trim().match(sourceRegex);
    if (!match) {
      results.failures.push(`[${q.id}] Source does not match regex /^\[Nguồn:\\s*(.+)\\]$/i: "${q.source}"`);
      continue;
    }
    const inner = match[1];
    const hasOrg = validBodies.some((pat) => pat.test(inner));
    if (!hasOrg) {
      results.failures.push(`[${q.id}] Source does not cite a valid organization: "${inner}"`);
    }

    const yearMatch = inner.match(/\b(202[0-5])\b/);
    if (!yearMatch) {
      results.failures.push(`[${q.id}] Source does not contain valid year 2020-2025: "${inner}"`);
    }

    if (/tự biên|sách giáo khoa|sgk|bịa|internet|chưa rõ/i.test(inner)) {
      results.failures.push(`[${q.id}] Source contains forbidden/unverified citation: "${inner}"`);
    }
  }

  // 5. Duplication Check: Mindmap vs SQLite DB and Mindmap internal
  console.log('[5/7] Running adversarial duplication & semantic overlap tests...');
  
  // 5.1 Internal deduplication in Mindmap
  for (let i = 0; i < allQuestions.length; i++) {
    const q1 = allQuestions[i];
    const n1 = normalizeContent(q1.content);
    const tok1 = tokenize(q1.content);

    for (let j = i + 1; j < allQuestions.length; j++) {
      const q2 = allQuestions[j];
      const n2 = normalizeContent(q2.content);
      const tok2 = tokenize(q2.content);

      results.checks++;
      if (n1 === n2) {
        results.failures.push(`[Mindmap Internal Exact Duplicate] ${q1.id} vs ${q2.id}`);
      }

      const sim = jaccardSimilarity(tok1, tok2);
      if (sim > 0.85 && n1.length > 30) {
        results.warnings.push(`[Mindmap Internal High Jaccard Similarity ${sim.toFixed(2)}] ${q1.id} vs ${q2.id}`);
      }
    }
  }

  // 5.2 Mathematical & Source-identical cross-duplication (Mindmap vs DB)
  for (const mmQ of allQuestions) {
    const normMm = normalizeContent(mmQ.content);
    const tokMm = tokenize(mmQ.content);
    const srcM = (mmQ.source || '').toLowerCase();

    for (const dbQ of dbQuestions) {
      results.checks++;
      const normDb = normalizeContent(dbQ.content);
      const tokDb = tokenize(dbQ.content);
      const srcD = (dbQ.sourceExam || '').toLowerCase();

      // Check 1: Exact normalized match
      if (normMm === normDb && normMm.length > 20) {
        const failureMsg = `[DUPLICATE EXACT] Mindmap [${mmQ.id}] matches DB [${dbQ.code}]: "${mmQ.content}"`;
        results.failures.push(failureMsg);
        results.confirmedDuplicates.push({ mmId: mmQ.id, dbCode: dbQ.code, reason: failureMsg });
      }

      // Check 2: Substring containment if significant length
      if (normDb.length > 50 && normMm.includes(normDb)) {
        const failureMsg = `[DUPLICATE SUBSTRING] DB [${dbQ.code}] is contained in Mindmap [${mmQ.id}]`;
        results.failures.push(failureMsg);
        results.confirmedDuplicates.push({ mmId: mmQ.id, dbCode: dbQ.code, reason: failureMsg });
      }
      if (normMm.length > 50 && normDb.includes(normMm)) {
        const failureMsg = `[DUPLICATE SUBSTRING] Mindmap [${mmQ.id}] is contained in DB [${dbQ.code}]`;
        results.failures.push(failureMsg);
        results.confirmedDuplicates.push({ mmId: mmQ.id, dbCode: dbQ.code, reason: failureMsg });
      }

      // Check 3: Mathematical identity + identical exam citation
      // If both cite the same exam & question number and test the exact same problem
      const qNumM = srcM.match(/câu\s*(\d+)/i);
      const qNumD = srcD.match(/câu\s*(\d+)/i);

      const sameQNum = qNumM && qNumD && qNumM[1] === qNumD[1];
      const sameExamYear = srcM.match(/202[0-5]/)?.[0] === srcD.match(/202[0-5]/)?.[0];
      const sameExamBody = (srcM.includes('bộ gd') && srcD.includes('bộ gd')) ||
                           (srcM.includes('nghệ an') && srcD.includes('nghệ an')) ||
                           (srcM.includes('bắc ninh') && srcD.includes('bắc ninh')) ||
                           (srcM.includes('hà nội') && srcD.includes('hà nội')) ||
                           (srcM.includes('nam định') && srcD.includes('nam định')) ||
                           (srcM.includes('phan bội châu') && srcD.includes('phan bội châu'));

      if (sameQNum && sameExamYear && sameExamBody) {
        const sim = jaccardSimilarity(tokMm, tokDb);
        if (sim >= 0.60) {
          const failureMsg = `[DUPLICATE SAME EXAM & QUESTION NUMBER] Mindmap [${mmQ.id}] (${mmQ.source}) vs DB [${dbQ.code}] (${dbQ.sourceExam}) - Mathematical problem identical (Jaccard: ${sim.toFixed(2)})`;
          results.failures.push(failureMsg);
          results.confirmedDuplicates.push({ mmId: mmQ.id, dbCode: dbQ.code, reason: failureMsg });
        }
      }

      // Check 4: Specific known duplicate cases by mathematical model
      if (mmQ.id === 'Q48_T10' && dbQ.code === 'Q25_D7_TF') {
        const failureMsg = `[DUPLICATE MATHEMATICAL CONTENT] Mindmap [${mmQ.id}] vs DB [${dbQ.code}]: Identical Drone 3D trajectory model from Bộ GD&ĐT 2025`;
        results.failures.push(failureMsg);
        results.confirmedDuplicates.push({ mmId: mmQ.id, dbCode: dbQ.code, reason: failureMsg });
      }
    }
  }

  // 6. KaTeX rendering and mathematical integrity
  console.log('[6/7] Stress-testing KaTeX rendering across all fields...');
  for (const q of allQuestions) {
    const fieldsToTest = [
      { name: 'content', text: q.content },
      { name: 'explanation', text: q.explanation },
      { name: 'distractorAnalysis', text: q.distractorAnalysis },
      { name: 'casioGuide', text: q.casioGuide || '' },
    ];
    if (Array.isArray(q.options)) {
      q.options.forEach((opt, idx) => {
        fieldsToTest.push({ name: `options[${idx}]`, text: opt });
      });
    }

    for (const f of fieldsToTest) {
      results.checks++;
      // Check balanced $
      const inlineMatches = f.text.match(/\$/g);
      if (inlineMatches && inlineMatches.length % 2 !== 0) {
        results.failures.push(`[${q.id}.${f.name}] Unbalanced dollar sign $ found in text: "${f.text}"`);
      }

      // KaTeX compile
      const formulaRegex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
      let m;
      while ((m = formulaRegex.exec(f.text)) !== null) {
        const formula = m[0];
        const isBlock = formula.startsWith('$$');
        const raw = isBlock ? formula.slice(2, -2).trim() : formula.slice(1, -1).trim();
        if (!raw) continue;
        try {
          katex.renderToString(raw, { displayMode: isBlock, throwOnError: true });
        } catch (err) {
          results.failures.push(`[${q.id}.${f.name}] KaTeX parse error: ${err.message} in formula "${formula}"`);
        }
      }
    }
  }

  // 7. Question completeness and pedagogical consistency
  console.log('[7/7] Verifying question completeness and pedagogical properties...');
  for (const q of allQuestions) {
    results.checks++;
    if (!['NB', 'TH', 'VD', 'VDC'].includes(q.difficulty)) {
      results.failures.push(`[${q.id}] Invalid difficulty: ${q.difficulty}`);
    }

    results.checks++;
    if (!['MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER'].includes(q.type)) {
      results.failures.push(`[${q.id}] Invalid question type: ${q.type}`);
    }

    results.checks++;
    if (!q.correctAnswer || q.correctAnswer.trim().length === 0) {
      results.failures.push(`[${q.id}] Missing correctAnswer`);
    }

    results.checks++;
    if (!q.explanation || q.explanation.length < 30) {
      results.failures.push(`[${q.id}] Explanation too short or missing (${q.explanation ? q.explanation.length : 0} chars)`);
    }

    results.checks++;
    if (!q.distractorAnalysis || q.distractorAnalysis.length < 15) {
      results.failures.push(`[${q.id}] Distractor analysis too short or missing (${q.distractorAnalysis ? q.distractorAnalysis.length : 0} chars)`);
    }

    if (q.type === 'MULTIPLE_CHOICE') {
      results.checks++;
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        results.failures.push(`[${q.id}] MULTIPLE_CHOICE must have 4 options, got ${q.options ? q.options.length : 'none'}`);
      } else {
        const validKeys = ['A', 'B', 'C', 'D'];
        if (!validKeys.includes(q.correctAnswer.trim())) {
          results.failures.push(`[${q.id}] MULTIPLE_CHOICE correctAnswer must be A, B, C, or D, got "${q.correctAnswer}"`);
        }
      }
    }

    if (q.type === 'TRUE_FALSE') {
      results.checks++;
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        results.failures.push(`[${q.id}] TRUE_FALSE must have 4 sub-items (a, b, c, d), got ${q.options ? q.options.length : 'none'}`);
      }
    }
  }

  console.log('================================================================');
  console.log(`TOTAL CHECKS EXECUTED: ${results.checks}`);
  console.log(`TOTAL FAILURES: ${results.failures.length}`);
  console.log(`CONFIRMED DUPLICATE QUESTIONS: ${results.confirmedDuplicates.length}`);
  console.log(`TOTAL WARNINGS: ${results.warnings.length}`);
  console.log('================================================================');

  if (results.confirmedDuplicates.length > 0) {
    console.error('CONFIRMED DUPLICATE PAIRS ACROSS MINDMAP AND PRACTICE:');
    results.confirmedDuplicates.forEach((d, idx) => {
      console.error(`  ${idx + 1}. Mindmap [${d.mmId}] <---> DB [${d.dbCode}]`);
      console.error(`     Details: ${d.reason}`);
    });
  }

  return results;
}

runAdversarialSuite()
  .then((res) => {
    process.exit(res.failures.length === 0 ? 0 : 1);
  })
  .catch((err) => {
    console.error('Unexpected error during adversarial run:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
