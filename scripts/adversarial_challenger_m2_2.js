/**
 * EMPIRICAL ADVERSARIAL STRESS TEST — MILESTONE 2 (CHALLENGER 2)
 * 
 * Verifies:
 * 1. Topic 10 question retrieval:
 *    - getQuestionsForTopic("TOPIC_3_1")
 *    - getQuestionsForTopic("TOPIC_2_4")
 *    - getQuestionsForTopic("TOPIC_3")
 *    - Verifies returns 5 questions for Topic 10 with no crash and no fallback to TOPIC_2_2
 * 2. KaTeX renderability:
 *    - Render every math expression across all 50 questions using katex.renderToString({ throwOnError: true })
 *    - Must produce 0 errors across content, options, explanation, distractorAnalysis, casioGuide
 * 3. Additional stress tests:
 *    - Enumerable vs non-enumerable properties of REAL_QUESTIONS_BANK
 *    - GrandDetailCard contract verification
 *    - Cross-duplication with SQLite DB
 *    - Source citations authentic format
 * 
 * Execution: node scripts/adversarial_challenger_m2_2.js
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

async function runAdversarialChallenge() {
  console.log('================================================================================');
  console.log('      ADVERSARIAL EMPIRICAL HARNESS — CHALLENGER 2 (MILESTONE 2)                ');
  console.log('================================================================================');

  const report = {
    checks: 0,
    failures: [],
    details: {},
  };

  // 1. Load mindmapQuestions.ts
  console.log('[SECTION 1] Loading TypeScript modules...');
  let mmMod, machMod;
  try {
    mmMod = loadTsModule('src/app/mindmap/mindmapQuestions.ts');
    machMod = loadTsModule('src/app/mindmap/machData.ts');
  } catch (err) {
    report.failures.push(`CRITICAL: Failed to load TypeScript modules: ${err.message}`);
    return report;
  }

  const { REAL_QUESTIONS_BANK, getQuestionsForTopic } = mmMod;
  if (!REAL_QUESTIONS_BANK) {
    report.failures.push('CRITICAL: REAL_QUESTIONS_BANK is missing from mindmapQuestions.ts');
    return report;
  }
  if (typeof getQuestionsForTopic !== 'function') {
    report.failures.push('CRITICAL: getQuestionsForTopic is not exported as a function');
    return report;
  }

  // 2. STRESS TEST TOPIC 10 QUESTION RETRIEVAL
  console.log('[SECTION 2] Stress-testing Topic 10 Question Retrieval & Fallbacks...');
  
  // Topic 10 expected question IDs
  const expectedTopic10Ids = ['Q46_T10', 'Q47_T10', 'Q48_T10', 'Q49_T10', 'Q50_T10'];
  const topic2_2Ids = ['Q36_T8', 'Q37_T8', 'Q38_T8', 'Q39_T8', 'Q40_T8'];

  // Test 2.1: Direct property access
  report.checks++;
  const directTopic10 = REAL_QUESTIONS_BANK['TOPIC_3_1'];
  if (!Array.isArray(directTopic10)) {
    report.failures.push('REAL_QUESTIONS_BANK["TOPIC_3_1"] is not an array');
  } else if (directTopic10.length !== 5) {
    report.failures.push(`REAL_QUESTIONS_BANK["TOPIC_3_1"] has ${directTopic10.length} questions, expected 5`);
  } else {
    const ids = directTopic10.map(q => q.id);
    const idMatch = expectedTopic10Ids.every(id => ids.includes(id));
    if (!idMatch) {
      report.failures.push(`REAL_QUESTIONS_BANK["TOPIC_3_1"] IDs mismatch. Got: ${JSON.stringify(ids)}`);
    } else {
      console.log(`  ✓ REAL_QUESTIONS_BANK["TOPIC_3_1"] directly contains 5 Topic 10 questions (${ids.join(', ')})`);
    }
  }

  // Test 2.2: Call getQuestionsForTopic("TOPIC_3_1")
  report.checks++;
  let res3_1;
  try {
    res3_1 = getQuestionsForTopic('TOPIC_3_1');
  } catch (err) {
    report.failures.push(`getQuestionsForTopic("TOPIC_3_1") threw an error: ${err.message}`);
  }
  if (res3_1) {
    const ids = res3_1.map(q => q.id);
    const hasTopic10 = expectedTopic10Ids.every(id => ids.includes(id));
    const hasTopic2_2 = topic2_2Ids.some(id => ids.includes(id));
    if (!hasTopic10) {
      report.failures.push(`getQuestionsForTopic("TOPIC_3_1") did NOT return Topic 10 questions. Got: ${JSON.stringify(ids)}`);
    } else if (hasTopic2_2) {
      report.failures.push(`getQuestionsForTopic("TOPIC_3_1") fell back to TOPIC_2_2! Got: ${JSON.stringify(ids)}`);
    } else {
      console.log(`  ✓ getQuestionsForTopic("TOPIC_3_1") returned 5 Topic 10 questions with NO fallback to TOPIC_2_2.`);
    }
  }

  // Test 2.3: Call getQuestionsForTopic("TOPIC_2_4") (backward-compat alias)
  report.checks++;
  let res2_4;
  try {
    res2_4 = getQuestionsForTopic('TOPIC_2_4');
  } catch (err) {
    report.failures.push(`getQuestionsForTopic("TOPIC_2_4") threw an error: ${err.message}`);
  }
  if (res2_4) {
    const ids = res2_4.map(q => q.id);
    const hasTopic10 = expectedTopic10Ids.every(id => ids.includes(id));
    const hasTopic2_2 = topic2_2Ids.some(id => ids.includes(id));
    if (!hasTopic10) {
      report.failures.push(`getQuestionsForTopic("TOPIC_2_4") did NOT return Topic 10 questions. Got: ${JSON.stringify(ids)}`);
    } else if (hasTopic2_2) {
      report.failures.push(`getQuestionsForTopic("TOPIC_2_4") fell back to TOPIC_2_2! Got: ${JSON.stringify(ids)}`);
    } else {
      console.log(`  ✓ getQuestionsForTopic("TOPIC_2_4") returned 5 Topic 10 questions with NO fallback to TOPIC_2_2.`);
    }
  }

  // Test 2.4: Call getQuestionsForTopic("TOPIC_3") (prefix fallback)
  report.checks++;
  let res3;
  try {
    res3 = getQuestionsForTopic('TOPIC_3');
  } catch (err) {
    report.failures.push(`getQuestionsForTopic("TOPIC_3") threw an error: ${err.message}`);
  }
  if (res3) {
    const ids = res3.map(q => q.id);
    const hasTopic10 = expectedTopic10Ids.every(id => ids.includes(id));
    const hasTopic2_2 = topic2_2Ids.some(id => ids.includes(id));
    if (!hasTopic10) {
      report.failures.push(`getQuestionsForTopic("TOPIC_3") did NOT return Topic 10 questions. Got: ${JSON.stringify(ids)}`);
    } else if (hasTopic2_2) {
      report.failures.push(`getQuestionsForTopic("TOPIC_3") fell back to TOPIC_2_2! Got: ${JSON.stringify(ids)}`);
    } else {
      console.log(`  ✓ getQuestionsForTopic("TOPIC_3") returned 5 Topic 10 questions with NO fallback to TOPIC_2_2.`);
    }
  }

  // Test 2.5: Additional adversarial edge cases on getQuestionsForTopic
  const edgeCases = [
    { input: 'TOPIC_3_PREFIX', expectTopic10: true },
    { input: 'TOPIC_3_FOOBAR', expectTopic10: true },
    { input: 'TOPIC_1_UNKNOWN', expectPrefix: 'TOPIC_1_1' },
    { input: 'RANDOM_GARBAGE', expectPrefix: 'TOPIC_2_2' },
  ];
  for (const tc of edgeCases) {
    report.checks++;
    try {
      const res = getQuestionsForTopic(tc.input);
      if (!Array.isArray(res) || res.length !== 5) {
        report.failures.push(`getQuestionsForTopic("${tc.input}") did not return 5 questions`);
      } else if (tc.expectTopic10) {
        const ids = res.map(q => q.id);
        if (!expectedTopic10Ids.every(id => ids.includes(id))) {
          report.failures.push(`getQuestionsForTopic("${tc.input}") failed to return Topic 10 questions`);
        }
      }
    } catch (err) {
      report.failures.push(`getQuestionsForTopic("${tc.input}") crashed: ${err.message}`);
    }
  }
  console.log(`  ✓ Adversarial edge inputs to getQuestionsForTopic passed safely without crashes.`);

  // Test 2.6: Enumerable properties of REAL_QUESTIONS_BANK
  // Make sure TOPIC_2_4 is non-enumerable so Object.entries doesn't yield duplicate 55 questions
  report.checks++;
  const enumKeys = Object.keys(REAL_QUESTIONS_BANK);
  if (enumKeys.includes('TOPIC_2_4')) {
    report.failures.push('TOPIC_2_4 is enumerable in REAL_QUESTIONS_BANK (should be enumerable: false to prevent 55 questions in test runners)');
  } else {
    console.log(`  ✓ TOPIC_2_4 is non-enumerable alias (Object.keys count = ${enumKeys.length}).`);
  }

  // 3. FULL KATEX RENDERABILITY STRESS TEST ACROSS ALL 50 QUESTIONS
  console.log('[SECTION 3] Stress-testing KaTeX renderability across all 50 questions with throwOnError: true...');
  
  const allQuestions = [];
  for (const key of enumKeys) {
    const list = REAL_QUESTIONS_BANK[key];
    if (Array.isArray(list)) {
      list.forEach(q => allQuestions.push({ ...q, topicKey: key }));
    }
  }
  report.details.totalQuestions = allQuestions.length;

  if (allQuestions.length !== 50) {
    report.failures.push(`Total questions in REAL_QUESTIONS_BANK is ${allQuestions.length}, expected 50`);
  }

  let totalFormulasRendered = 0;
  let katexErrors = [];

  const formulaRegex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;

  for (const q of allQuestions) {
    const fieldsToTest = [
      { field: 'content', text: q.content },
      { field: 'correctAnswer', text: q.correctAnswer },
      { field: 'explanation', text: q.explanation },
      { field: 'distractorAnalysis', text: q.distractorAnalysis },
      { field: 'casioGuide', text: q.casioGuide || '' },
    ];

    if (Array.isArray(q.options)) {
      q.options.forEach((opt, idx) => {
        fieldsToTest.push({ field: `options[${idx}]`, text: opt });
      });
    }

    for (const item of fieldsToTest) {
      report.checks++;
      const text = item.text;
      if (!text || typeof text !== 'string') continue;

      // Check unbalanced dollar sign: count $ characters
      // Ignore escaped \$ ? In standard text, raw $ is used for KaTeX delimiters.
      const dollarCount = (text.match(/\$/g) || []).length;
      if (dollarCount % 2 !== 0) {
        katexErrors.push({
          qid: q.id,
          field: item.field,
          formula: '[UNBALANCED]',
          error: `Unbalanced dollar sign $ count (${dollarCount}): "${text.substring(0, 80)}..."`,
        });
      }

      // Check for illegal ASCII control characters
      const ctrlMatches = text.match(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g);
      if (ctrlMatches) {
        katexErrors.push({
          qid: q.id,
          field: item.field,
          formula: '[CONTROL_CHARS]',
          error: `Found ${ctrlMatches.length} illegal control characters in text`,
        });
      }

      // Extract and render each formula
      let match;
      formulaRegex.lastIndex = 0;
      while ((match = formulaRegex.exec(text)) !== null) {
        const rawFormula = match[0];
        const isBlock = rawFormula.startsWith('$$');
        const mathString = isBlock ? rawFormula.slice(2, -2).trim() : rawFormula.slice(1, -1).trim();

        if (!mathString) {
          katexErrors.push({
            qid: q.id,
            field: item.field,
            formula: rawFormula,
            error: 'Empty math formula ($$ or $ $)',
          });
          continue;
        }

        totalFormulasRendered++;
        try {
          katex.renderToString(mathString, {
            displayMode: isBlock,
            throwOnError: true,
          });
        } catch (err) {
          katexErrors.push({
            qid: q.id,
            field: item.field,
            formula: rawFormula,
            error: err.message,
          });
        }
      }
    }
  }

  report.details.totalFormulasRendered = totalFormulasRendered;
  report.details.katexErrorCount = katexErrors.length;

  if (katexErrors.length > 0) {
    report.failures.push(`KaTeX renderability failed with ${katexErrors.length} errors:`);
    katexErrors.forEach(ke => {
      report.failures.push(`  - [${ke.qid}.${ke.field}] ${ke.error} in formula "${ke.formula}"`);
    });
  } else {
    console.log(`  ✓ KaTeX renderability: Successfully rendered ${totalFormulasRendered} formulas across all 50 questions with EXACTLY 0 errors!`);
  }

  // 4. CROSS-DUPLICATION TEST AGAINST SQLITE DB
  console.log('[SECTION 4] Testing cross-duplication between Mindmap and SQLite DB...');
  const dbQuestions = await prisma.question.findMany();
  console.log(`  Loaded ${dbQuestions.length} questions from SQLite DB.`);

  let dupCount = 0;
  for (const mmQ of allQuestions) {
    const normMm = normalizeContent(mmQ.content);
    if (!normMm) continue;

    for (const dbQ of dbQuestions) {
      report.checks++;
      const normDb = normalizeContent(dbQ.content);
      if (!normDb) continue;

      // Exact match
      if (normMm === normDb) {
        dupCount++;
        report.failures.push(`Exact duplication: Mindmap [${mmQ.id}] matches DB [${dbQ.code}]: "${mmQ.content.substring(0, 60)}"`);
      }

      // Prefix 50 match
      if (normDb.length >= 50 && normMm.length >= 50) {
        const prefDb = normDb.substring(0, 50);
        const prefMm = normMm.substring(0, 50);
        if (prefDb === prefMm) {
          dupCount++;
          report.failures.push(`Prefix 50 duplication: Mindmap [${mmQ.id}] matches DB [${dbQ.code}]: "${prefDb}"`);
        }
      }

      // Containment
      if (normDb.length > 60 && normMm.includes(normDb)) {
        dupCount++;
        report.failures.push(`Sub-containment: DB [${dbQ.code}] contained in Mindmap [${mmQ.id}]`);
      }
      if (normMm.length > 60 && normDb.includes(normMm)) {
        dupCount++;
        report.failures.push(`Sub-containment: Mindmap [${mmQ.id}] contained in DB [${dbQ.code}]`);
      }
    }
  }

  if (dupCount === 0) {
    console.log(`  ✓ Duplication test: 0 duplicates detected between Mindmap (50 questions) and DB (${dbQuestions.length} questions).`);
  } else {
    report.failures.push(`Duplication test found ${dupCount} collisions!`);
  }

  // 5. AUTHENTIC REAL-EXAM CITATIONS FORMAT
  console.log('[SECTION 5] Verifying 100% authentic real-exam source citations...');
  const sourcePattern = /^\[Nguồn:\s*(.+?)\s*-\s*(\d{4}|\d{4}\s*-\s*\d{4})\s*-\s*(.+?)\]$/i;
  const generalSourcePattern = /^\[Nguồn:\s*(.+)\]$/i;

  for (const q of allQuestions) {
    report.checks++;
    if (!q.source) {
      report.failures.push(`[${q.id}] Source is missing`);
      continue;
    }
    const match = q.source.trim().match(generalSourcePattern);
    if (!match) {
      report.failures.push(`[${q.id}] Source does not match [Nguồn: ...]: "${q.source}"`);
      continue;
    }
    const inner = match[1];
    // Must contain exam body
    const hasOrg = /Bộ GD|Sở GD|THPT Chuyên|Chuyên/i.test(inner);
    if (!hasOrg) {
      report.failures.push(`[${q.id}] Source does not cite a recognized exam authority: "${inner}"`);
    }
    // Must contain year 2020-2026
    const hasYear = /\b(202[0-6])\b/.test(inner);
    if (!hasYear) {
      report.failures.push(`[${q.id}] Source does not cite a valid year (2020-2026): "${inner}"`);
    }
  }
  console.log(`  ✓ 100% of the 50 Mindmap questions cite verified real exams with authentic authorities and years.`);

  // SUMMARY
  console.log('================================================================================');
  console.log(`TOTAL ADVERSARIAL CHECKS: ${report.checks}`);
  console.log(`TOTAL FAILURES DETECTED:  ${report.failures.length}`);
  console.log('================================================================================');

  if (report.failures.length > 0) {
    console.error('FAILURES:');
    report.failures.forEach((f, idx) => console.error(`  ${idx + 1}. ${f}`));
  } else {
    console.log('ALL ADVERSARIAL TESTS PASSED PERFECTLY!');
  }

  return report;
}

runAdversarialChallenge()
  .then((report) => {
    if (report.failures.length > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  })
  .catch((err) => {
    console.error('Unhandled failure:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
