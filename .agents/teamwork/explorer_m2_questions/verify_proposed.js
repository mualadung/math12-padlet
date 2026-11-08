const fs = require('fs');
const ts = require('typescript');
const katex = require('katex');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function loadTsModule(relPath) {
  const code = fs.readFileSync(relPath, 'utf8');
  const result = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  });
  const m = { exports: {} };
  const fn = new Function('module', 'exports', 'require', result.outputText);
  fn(m, m.exports, require);
  return m.exports;
}

function normalizeContent(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[\s\$\\\{\}\(\)\_\^\,\.\:\;\=\+\-\*\/\[\]\<\>]/g, '').trim();
}

function validateExamSource(source) {
  if (!source || typeof source !== 'string') {
    return { valid: false, reason: 'Nguồn bị để trống hoặc null' };
  }
  const formatRegex = /^\[Nguồn:\s*(.+)\]$/i;
  const match = source.trim().match(formatRegex);
  if (!match) {
    return {
      valid: false,
      reason: `Định dạng không đúng chuẩn '[Nguồn: ...]' (Nội dung hiện tại: "${source}")`,
    };
  }
  const inner = match[1];
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
    return { valid: false, reason: `Nguồn thiếu cơ quan tổ chức thi hợp lệ: "${inner}"` };
  }
  const hasYear = /\b(202[0-6])\b/.test(inner);
  if (!hasYear) {
    return { valid: false, reason: `Nguồn thiếu năm thi xác thực: "${inner}"` };
  }
  return { valid: true };
}

function extractMathFormulas(text) {
  if (!text || typeof text !== 'string') return [];
  const formulas = [];
  const blockRegex = /\$\$([\s\S]*?)\$\$/g;
  let match;
  while ((match = blockRegex.exec(text)) !== null) {
    formulas.push({ formula: match[1], isBlock: true, raw: match[0] });
  }
  const textWithoutBlocks = text.replace(blockRegex, ' ');
  const inlineRegex = /\$([^\$\n]+?)\$/g;
  while ((match = inlineRegex.exec(textWithoutBlocks)) !== null) {
    formulas.push({ formula: match[1], isBlock: false, raw: match[0] });
  }
  return formulas;
}

async function runVerification() {
  console.log('=== VERIFYING PROPOSED MINDMAP QUESTIONS DATASET ===\n');
  const proposed = loadTsModule('.agents/teamwork/explorer_m2_questions/proposed_mindmapQuestions.ts');
  const machData = loadTsModule('src/app/mindmap/machData.ts');
  const dbQuestions = await prisma.question.findMany();

  const bank = proposed.REAL_QUESTIONS_BANK;
  const topics = Object.keys(bank);
  console.log(`Loaded ${topics.length} topics from proposed bank.`);

  // 1. Topic check & machData check
  const treeTopics = [];
  for (const ch of machData.TREE_DATA.chapters) {
    for (const t of ch.topics) {
      treeTopics.push(t);
    }
  }

  let testFailed = false;

  console.log('\n--- 1. TOPIC & COUNT CHECK ---');
  if (topics.length !== 10) {
    console.error(`FAIL: Expected 10 topics, got ${topics.length}`);
    testFailed = true;
  }
  for (const t of treeTopics) {
    if (!bank[t.id]) {
      console.error(`FAIL: Missing topic ${t.id} ("${t.title}") in proposed bank!`);
      testFailed = true;
    } else {
      const qCount = bank[t.id].length;
      if (qCount !== 5) {
        console.error(`FAIL: Topic ${t.id} has ${qCount} questions (expected 5)`);
        testFailed = true;
      } else {
        console.log(`✓ Topic ${t.id} (${t.title}): 5/5 questions OK`);
      }
    }
  }

  // Flatten all questions
  const allProposedQs = [];
  for (const [topicKey, qList] of Object.entries(bank)) {
    for (const q of qList) {
      allProposedQs.push({ ...q, topicKey });
    }
  }
  console.log(`Total questions in proposed bank: ${allProposedQs.length}`);

  // 2. Source format check
  console.log('\n--- 2. REAL-EXAM SOURCE CHECK ---');
  let sourceErrors = 0;
  for (const q of allProposedQs) {
    const res = validateExamSource(q.source);
    if (!res.valid) {
      console.error(`FAIL: [${q.code} - ${q.topicKey}] ${res.reason}`);
      sourceErrors++;
      testFailed = true;
    }
  }
  if (sourceErrors === 0) {
    console.log(`✓ 100% of ${allProposedQs.length} questions have valid [Nguồn: ...] format and official bodies!`);
  }

  // 3. Duplication check against DB
  console.log('\n--- 3. DUPLICATION CHECK AGAINST DB (/practice) ---');
  let dbCrossDupes = 0;
  for (const dbQ of dbQuestions) {
    const normDb = normalizeContent(dbQ.content);
    if (normDb.length < 25) continue;

    for (const mmQ of allProposedQs) {
      const normMm = normalizeContent(mmQ.content);
      if (normMm.length < 25) continue;

      if (normDb === normMm || (normDb.length > 50 && normMm.includes(normDb.substring(0, 50)))) {
        console.error(`FAIL: DB [${dbQ.code}] duplicates MM [${mmQ.code} - ${mmQ.topicKey}]: "${dbQ.content.substring(0, 70)}"`);
        dbCrossDupes++;
        testFailed = true;
      }
    }
  }
  if (dbCrossDupes === 0) {
    console.log(`✓ ZERO duplication between proposed Mindmap bank and DB /practice questions!`);
  }

  // 4. Internal Duplication check
  console.log('\n--- 4. INTERNAL DUPLICATION CHECK ---');
  let internalDupes = 0;
  for (let i = 0; i < allProposedQs.length; i++) {
    const q1 = allProposedQs[i];
    const norm1 = normalizeContent(q1.content);
    if (norm1.length < 25) continue;
    for (let j = i + 1; j < allProposedQs.length; j++) {
      const q2 = allProposedQs[j];
      const norm2 = normalizeContent(q2.content);
      if (norm1 === norm2) {
        console.error(`FAIL: Internal dupe between [${q1.code}] and [${q2.code}]`);
        internalDupes++;
        testFailed = true;
      }
    }
  }
  if (internalDupes === 0) {
    console.log(`✓ ZERO internal duplicates among the 50 proposed questions!`);
  }

  // 5. KaTeX syntax check
  console.log('\n--- 5. KATEX SYNTAX CHECK ---');
  let katexErrors = 0;
  for (const q of allProposedQs) {
    const fields = [
      { name: 'content', text: q.content },
      { name: 'explanation', text: q.explanation },
      { name: 'distractorAnalysis', text: q.distractorAnalysis },
      { name: 'casioGuide', text: q.casioGuide || '' },
      ...(Array.isArray(q.options) ? q.options.map((opt, idx) => ({ name: `option_${idx}`, text: opt })) : [])
    ];
    for (const f of fields) {
      const formulas = extractMathFormulas(f.text);
      for (const item of formulas) {
        try {
          katex.renderToString(item.formula, {
            displayMode: item.isBlock,
            throwOnError: true,
          });
        } catch (err) {
          console.error(`FAIL: KaTeX error in [${q.code} - ${f.name}]: ${err.message} (formula: "${item.formula}")`);
          katexErrors++;
          testFailed = true;
        }
      }
    }
  }
  if (katexErrors === 0) {
    console.log(`✓ 100% of KaTeX expressions rendered successfully without any errors!`);
  }

  console.log('\n======================================================');
  if (testFailed) {
    console.error('>>> VERIFICATION FAILED! Please fix issues above. <<<');
    process.exit(1);
  } else {
    console.log('>>> VERIFICATION PASSED PERFECTLY! DATASET IS READY! <<<');
  }
}

runVerification().catch(console.error).finally(() => prisma.$disconnect());
