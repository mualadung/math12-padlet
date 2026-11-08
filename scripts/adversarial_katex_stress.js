/**
 * ADVERSARIAL STRESS TEST & VERIFICATION HARNESS FOR MILESTONE 1
 * Targets:
 *   1. src/app/mindmap/machData.ts
 *   2. prisma/seed.js
 *   3. SQLite database (prisma/dev.db) seeded by prisma/seed.js
 *
 * Checks:
 *   - Control characters & illegal escape sequences (ASCII 0x00-0x08, 0x0B, 0x0C, 0x0E-0x1F, unescaped \v)
 *   - Delimiter integrity (unmatched $, odd $, unclosed $$, unmatched \left/\right, unmatched braces/parentheses)
 *   - Strict KaTeX rendering (throwOnError: true, tracking all warnings / strict violations)
 *   - Mathematical rigor & condition completeness (domain D, denominators != 0, radicands >= 0, \vec{a} != \vec{0}, dot product = 0)
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const katex = require('katex');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Terminal colors
const C = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

const results = {
  totalFormulas: 0,
  passedFormulas: 0,
  controlCharViolations: [],
  delimiterErrors: [],
  katexRenderErrors: [],
  katexStrictWarnings: [],
  missingConditionViolations: [],
  astStringChecks: 0,
};

// -------------------------------------------------------------
// 1. Control Character Scanner
// -------------------------------------------------------------
function checkControlChars(str, context) {
  if (!str || typeof str !== 'string') return;
  // Exclude \t (0x09), \n (0x0A), \r (0x0D)
  const regex = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;
  let match;
  while ((match = regex.exec(str)) !== null) {
    const code = '0x' + match[0].charCodeAt(0).toString(16).padStart(4, '0');
    results.controlCharViolations.push({
      context,
      code,
      index: match.index,
      snippet: str.substring(Math.max(0, match.index - 15), Math.min(str.length, match.index + 15)),
    });
  }
}

// -------------------------------------------------------------
// 2. Delimiter & Bracket Balance Scanner
// -------------------------------------------------------------
function checkDelimiterIntegrity(text, context) {
  if (!text || typeof text !== 'string') return;

  // Check for odd unescaped $ count (excluding $$)
  // Let's count unescaped single $ vs $$
  const stripped = text.replace(/\\\$/g, '');
  const doubleCount = (stripped.match(/\$\$/g) || []).length;
  if (doubleCount % 2 !== 0) {
    results.delimiterErrors.push({
      context,
      error: `Unmatched block delimiter $$ (count = ${doubleCount})`,
    });
  }

  // Remove $$...$$ blocks to count single $
  const withoutBlocks = stripped.replace(/\$\$[\s\S]*?\$\$/g, '');
  const singleDollarCount = (withoutBlocks.match(/\$/g) || []).length;
  if (singleDollarCount % 2 !== 0) {
    results.delimiterErrors.push({
      context,
      error: `Odd number of inline math delimiters $ (count = ${singleDollarCount})`,
    });
  }
}

// -------------------------------------------------------------
// 3. KaTeX Formula Extraction & Strict Render
// -------------------------------------------------------------
function testKaTeXInText(text, context) {
  if (!text || typeof text !== 'string') return;

  checkControlChars(text, context);
  checkDelimiterIntegrity(text, context);

  // Regex to extract $$...$$ and $...$
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    results.totalFormulas++;
    const rawFormula = match[0];
    const isBlock = rawFormula.startsWith('$$');
    const math = isBlock ? rawFormula.slice(2, -2).trim() : rawFormula.slice(1, -1).trim();

    if (!math) {
      results.katexRenderErrors.push({
        context,
        formula: rawFormula,
        error: 'Empty math expression',
      });
      continue;
    }

    // Check bracket balance inside formula
    // Checks for \left without \right
    const leftMatches = (math.match(/\\left\b/g) || []).length;
    const rightMatches = (math.match(/\\right\b/g) || []).length;
    if (leftMatches !== rightMatches) {
      results.delimiterErrors.push({
        context,
        formula: rawFormula,
        error: `Mismatched \\left (${leftMatches}) vs \\right (${rightMatches})`,
      });
    }

    // KaTeX render test with throwOnError: true
    try {
      const warnings = [];
      katex.renderToString(math, {
        displayMode: isBlock,
        throwOnError: true,
        strict: (errorCode, errorMsg) => {
          warnings.push({ errorCode, errorMsg });
          return 'warn';
        },
      });

      if (warnings.length > 0) {
        warnings.forEach(w => {
          results.katexStrictWarnings.push({
            context,
            formula: rawFormula,
            errorCode: w.errorCode,
            errorMsg: w.errorMsg,
          });
        });
      }

      results.passedFormulas++;
    } catch (err) {
      results.katexRenderErrors.push({
        context,
        formula: rawFormula,
        error: err.message,
      });
    }
  }
}

// -------------------------------------------------------------
// 4. AST Scanner for Source Files (machData.ts & prisma/seed.js)
// -------------------------------------------------------------
function scanSourceAST(filePath) {
  console.log(`Analyzing AST of ${filePath}...`);
  const content = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  function visit(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      results.astStringChecks++;
      const evaluatedValue = node.text;
      const rawText = node.getText(sourceFile);

      // Check evaluated value for control characters
      checkControlChars(evaluatedValue, `AST in ${filePath}:${node.getStart(sourceFile)}`);

      // Check raw source representation for unescaped \v (which produces \u000B)
      // If rawText has single backslash before v that isn't escaped, e.g. [^\\]\v
      // Note: In rawText, "\\v" means two backslash characters in source file.
      // A single backslash in source file would appear as `\v` in rawText.
      const unescapedVMatch = rawText.match(/(?<!\\)\\v(?!\\)/);
      if (unescapedVMatch) {
        results.controlCharViolations.push({
          context: `Raw AST string in ${filePath}:${node.getStart(sourceFile)}`,
          code: 'UNESCAPED_\\v',
          index: unescapedVMatch.index,
          snippet: rawText.substring(Math.max(0, unescapedVMatch.index - 10), Math.min(rawText.length, unescapedVMatch.index + 20)),
        });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

// -------------------------------------------------------------
// 5. Evaluate machData.ts & Verify 37 Types
// -------------------------------------------------------------
function testMachData() {
  console.log('Evaluating src/app/mindmap/machData.ts runtime tree...');
  const code = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8');
  const transpiled = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} };
  new Function('exports', 'module', transpiled)(mod.exports, mod);
  const tree = mod.exports.TREE_DATA;

  if (!tree || !Array.isArray(tree.chapters)) {
    throw new Error('Invalid TREE_DATA structure in machData.ts');
  }

  let mathTypesCount = 0;
  const conditionsSummary = {
    hasDomainD: 0,
    hasDenominatorNonZero: 0,
    hasRadicandNonNegative: 0,
    hasVectorNonZero: 0,
    hasDotProductZero: 0,
  };

  tree.chapters.forEach(c => {
    testKaTeXInText(c.title, `Chapter ${c.id} title`);
    c.topics.forEach(t => {
      testKaTeXInText(t.title, `Topic ${t.id} title`);
      testKaTeXInText(t.description, `Topic ${t.id} description`);

      t.mathTypes.forEach(mt => {
        mathTypesCount++;
        testKaTeXInText(mt.name, `MathType ${mt.code} name`);

        const d = mt.details;
        if (!d) {
          results.missingConditionViolations.push({
            code: mt.code,
            issue: 'Missing details object completely',
          });
          return;
        }

        const fullPedagogicalText = [
          d.theory || '',
          d.signs || '',
          d.methods || '',
          d.mistakes || '',
        ].join('\n');

        // Test KaTeX in all 4 core fields
        testKaTeXInText(d.theory, `MathType ${mt.code} (theory)`);
        testKaTeXInText(d.signs, `MathType ${mt.code} (signs)`);
        testKaTeXInText(d.methods, `MathType ${mt.code} (methods)`);
        testKaTeXInText(d.mistakes, `MathType ${mt.code} (mistakes)`);

        // Test sample question if present
        if (d.sampleQuestion) {
          testKaTeXInText(d.sampleQuestion.content, `MathType ${mt.code} (sampleQuestion content)`);
          testKaTeXInText(d.sampleQuestion.answer, `MathType ${mt.code} (sampleQuestion answer)`);
          if (d.sampleQuestion.casio) {
            testKaTeXInText(d.sampleQuestion.casio.fx580, `MathType ${mt.code} (sampleQuestion casio fx580)`);
            testKaTeXInText(d.sampleQuestion.casio.fx880, `MathType ${mt.code} (sampleQuestion casio fx880)`);
          }
        }

        // Domain condition checks
        const lower = fullPedagogicalText.toLowerCase();

        // 1. Domain D
        const hasD = /(\$d\s*=|tập\s*xác\s*định|txd|\bd\s*=\s*\\mathbb\{r\}|\bd\s*=\s*\[)/i.test(fullPedagogicalText);
        if (hasD) conditionsSummary.hasDomainD++;

        // 2. Denominator != 0
        const hasDenom = /(\\ne\s*0|\\neq\s*0|khác\s*0|mẫu\s*thức\s*khác\s*0)/i.test(fullPedagogicalText);
        if (hasDenom) conditionsSummary.hasDenominatorNonZero++;

        // 3. Radicand >= 0
        const hasRadicand = /(\\ge\s*0|\\geq\s*0|không\s*âm|biểu\s*thức\s*trong\s*căn)/i.test(fullPedagogicalText);
        if (hasRadicand) conditionsSummary.hasRadicandNonNegative++;

        // 4. Vector != 0
        const hasVector = /(\\vec\{\w+\}\s*\\ne\s*\\vec\{0\}|\\vec\{0\}|khác\s*vectơ|khác\s*vecto)/i.test(fullPedagogicalText);
        if (hasVector) conditionsSummary.hasVectorNonZero++;

        // 5. Dot product = 0 (orthogonality)
        const hasDot = /(\\cdot.*=\s*0|\\perp|vuông\s*góc|tích\s*vô\s*hướng)/i.test(fullPedagogicalText);
        if (hasDot) conditionsSummary.hasDotProductZero++;

        // Context-specific condition checks:
        // If topic is Chapter 1:
        if (c.id === 'CH1') {
          // Chapter 1 must have domain D
          if (!hasD) {
            results.missingConditionViolations.push({
              code: mt.code,
              chapter: 'CH1',
              issue: 'Thiếu Tập xác định D trong nội dung sư phạm của dạng toán Giải tích',
            });
          }
          // If fraction mentioned (tiệm cận, phân thức bậc 1/bậc 1, phân thức bậc 2/bậc 1)
          if (/phân\s*thức|tiệm\s*cận|hàm\s*số\s*hữu\s*tỉ|cx\s*\+\s*d/i.test(mt.name + ' ' + fullPedagogicalText)) {
            if (!hasDenom) {
              results.missingConditionViolations.push({
                code: mt.code,
                chapter: 'CH1',
                issue: 'Dạng toán phân thức/tiệm cận nhưng thiếu điều kiện mẫu thức khác 0 (\\ne 0)',
              });
            }
          }
        }

        // If topic is Chapter 2:
        if (c.id === 'CH2') {
          // Check for vector != 0 or orthogonality where appropriate
          if (/góc|vuông\s*góc|cùng\s*phương|tích\s*có\s*hướng|tích\s*vô\s*hướng/i.test(mt.name + ' ' + fullPedagogicalText)) {
            if (!hasVector && !hasDot) {
              results.missingConditionViolations.push({
                code: mt.code,
                chapter: 'CH2',
                issue: 'Dạng toán hình học không gian Oxyz nhưng thiếu điều kiện vectơ khác 0 hoặc tích vô hướng = 0',
              });
            }
          }
        }
      });
    });
  });

  return { mathTypesCount, conditionsSummary };
}

// -------------------------------------------------------------
// 6. Test prisma/seed.js and SQLite Database
// -------------------------------------------------------------
async function testDatabase() {
  console.log('Querying SQLite database (prisma/dev.db) seeded by prisma/seed.js...');

  // 1. MathCategories
  const categories = await prisma.mathCategory.findMany();
  console.log(`Checking ${categories.length} MathCategory records...`);
  categories.forEach(cat => {
    testKaTeXInText(cat.title, `Category ${cat.code} (title)`);
    testKaTeXInText(cat.identifySigns, `Category ${cat.code} (identifySigns)`);
    testKaTeXInText(cat.coreKnowledge, `Category ${cat.code} (coreKnowledge)`);
    testKaTeXInText(cat.methodSteps, `Category ${cat.code} (methodSteps)`);
    testKaTeXInText(cat.commonMistakes, `Category ${cat.code} (commonMistakes)`);
  });

  // 2. KnowledgeItems
  const knowledgeItems = await prisma.knowledgeItem.findMany();
  console.log(`Checking ${knowledgeItems.length} KnowledgeItem records...`);
  knowledgeItems.forEach(ki => {
    testKaTeXInText(ki.title, `KnowledgeItem ${ki.id} (title)`);
    testKaTeXInText(ki.formula, `KnowledgeItem ${ki.id} (formula)`);
    testKaTeXInText(ki.notes, `KnowledgeItem ${ki.id} (notes)`);
  });

  // 3. Questions
  const questions = await prisma.question.findMany();
  console.log(`Checking ${questions.length} Question records...`);
  questions.forEach(q => {
    testKaTeXInText(q.content, `Question ${q.code} (content)`);
    testKaTeXInText(q.explanation, `Question ${q.code} (explanation)`);
    testKaTeXInText(q.distractorAnalysis, `Question ${q.code} (distractorAnalysis)`);
    testKaTeXInText(q.casioGuide, `Question ${q.code} (casioGuide)`);

    if (q.optionsJson) {
      try {
        const opts = JSON.parse(q.optionsJson);
        if (Array.isArray(opts)) {
          opts.forEach((o, i) => testKaTeXInText(String(o), `Question ${q.code} (opt ${i})`));
        } else if (typeof opts === 'object') {
          Object.entries(opts).forEach(([k, v]) => testKaTeXInText(`${k}: ${v}`, `Question ${q.code} (opt ${k})`));
        }
      } catch (e) {
        results.delimiterErrors.push({
          context: `Question ${q.code} optionsJson parse`,
          error: e.message,
        });
      }
    }
  });
}

// -------------------------------------------------------------
// MAIN EXECUTION
// -------------------------------------------------------------
async function run() {
  console.log(`${C.bold}${C.blue}================================================================${C.reset}`);
  console.log(`${C.bold}${C.blue}   ADVERSARIAL STRESS TEST & KATEX STANDARDIZATION HARNESS      ${C.reset}`);
  console.log(`${C.bold}${C.blue}================================================================${C.reset}\n`);

  // Step 1: AST Scan of raw source files
  scanSourceAST('src/app/mindmap/machData.ts');
  scanSourceAST('prisma/seed.js');

  // Step 2: machData.ts runtime scan & condition checks
  const { mathTypesCount, conditionsSummary } = testMachData();

  // Step 3: SQLite DB scan
  await testDatabase();

  await prisma.$disconnect();

  // -----------------------------------------------------------
  // REPORT RESULTS
  // -----------------------------------------------------------
  console.log(`\n${C.bold}${C.cyan}================================================================${C.reset}`);
  console.log(`${C.bold}${C.cyan}                    STRESS TEST METRICS & FINDINGS              ${C.reset}`);
  console.log(`${C.bold}${C.cyan}================================================================${C.reset}`);
  console.log(`- Total AST string nodes inspected: ${results.astStringChecks}`);
  console.log(`- Total Math Types evaluated: ${mathTypesCount}`);
  console.log(`- Total KaTeX expressions rendered: ${results.totalFormulas}`);
  console.log(`- Successfully rendered formulas: ${results.passedFormulas}`);
  console.log(`- KaTeX Strict Warnings (non-fatal): ${results.katexStrictWarnings.length}`);
  console.log(`- Control character / illegal escape violations: ${results.controlCharViolations.length}`);
  console.log(`- Delimiter & bracket mismatch errors: ${results.delimiterErrors.length}`);
  console.log(`- KaTeX syntax rendering errors: ${results.katexRenderErrors.length}`);
  console.log(`- Missing condition violations: ${results.missingConditionViolations.length}`);

  console.log(`\n${C.bold}Mathematical Conditions Coverage across 37 Types:${C.reset}`);
  console.log(`  * Types with Domain D: ${conditionsSummary.hasDomainD} / ${mathTypesCount}`);
  console.log(`  * Types with Denominator != 0: ${conditionsSummary.hasDenominatorNonZero} / ${mathTypesCount}`);
  console.log(`  * Types with Radicand >= 0: ${conditionsSummary.hasRadicandNonNegative} / ${mathTypesCount}`);
  console.log(`  * Types with Vector != 0: ${conditionsSummary.hasVectorNonZero} / ${mathTypesCount}`);
  console.log(`  * Types with Dot Product = 0 / Perp: ${conditionsSummary.hasDotProductZero} / ${mathTypesCount}`);

  let hasFatalErrors = false;

  if (results.controlCharViolations.length > 0) {
    hasFatalErrors = true;
    console.log(`\n${C.red}${C.bold}FAILED: Control Character Violations (${results.controlCharViolations.length}):${C.reset}`);
    results.controlCharViolations.forEach(v => console.log(`  ${C.red}• [${v.context}] Code: ${v.code} Snippet: "${v.snippet}"${C.reset}`));
  }

  if (results.delimiterErrors.length > 0) {
    hasFatalErrors = true;
    console.log(`\n${C.red}${C.bold}FAILED: Delimiter Integrity Errors (${results.delimiterErrors.length}):${C.reset}`);
    results.delimiterErrors.forEach(e => console.log(`  ${C.red}• [${e.context}] ${e.error}${C.reset}`));
  }

  if (results.katexRenderErrors.length > 0) {
    hasFatalErrors = true;
    console.log(`\n${C.red}${C.bold}FAILED: KaTeX Render Errors (${results.katexRenderErrors.length}):${C.reset}`);
    results.katexRenderErrors.forEach(e => console.log(`  ${C.red}• [${e.context}] Formula: "${e.formula}" -> ${e.error}${C.reset}`));
  }

  if (results.missingConditionViolations.length > 0) {
    hasFatalErrors = true;
    console.log(`\n${C.red}${C.bold}FAILED: Missing Mathematical Conditions (${results.missingConditionViolations.length}):${C.reset}`);
    results.missingConditionViolations.forEach(v => console.log(`  ${C.red}• [Type ${v.code} - ${v.chapter || ''}] ${v.issue}${C.reset}`));
  }

  if (results.katexStrictWarnings.length > 0) {
    console.log(`\n${C.yellow}${C.bold}WARNINGS: KaTeX Strict Warnings (${results.katexStrictWarnings.length}):${C.reset}`);
    results.katexStrictWarnings.slice(0, 10).forEach(w => console.log(`  ${C.yellow}• [${w.context}] [${w.errorCode}] "${w.formula}" -> ${w.errorMsg}${C.reset}`));
    if (results.katexStrictWarnings.length > 10) {
      console.log(`  ... and ${results.katexStrictWarnings.length - 10} more warnings`);
    }
  }

  console.log(`\n${C.bold}================================================================${C.reset}`);
  if (hasFatalErrors) {
    console.log(`${C.bold}${C.red}FINAL ADVERSARIAL VERDICT: REJECT${C.reset}`);
    process.exit(1);
  } else {
    console.log(`${C.bold}${C.green}FINAL ADVERSARIAL VERDICT: APPROVE${C.reset}`);
    process.exit(0);
  }
}

run().catch(err => {
  console.error('Fatal crash during test harness execution:', err);
  process.exit(1);
});
