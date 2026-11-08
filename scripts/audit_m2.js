const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const katex = require('katex');

function loadTsModule(relativePath) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
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

const mod = loadTsModule('src/app/mindmap/mindmapQuestions.ts');
const bank = mod.REAL_QUESTIONS_BANK;

function extractMath(text) {
  if (!text || typeof text !== 'string') return [];
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
  const matches = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    const raw = m[0];
    const isBlock = raw.startsWith('$$');
    const math = isBlock ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim();
    matches.push({ raw, math, isBlock });
  }
  return matches;
}

const report = {
  topics: {},
  allQuestions: [],
  sourceFormatIssues: [],
  katexIssues: [],
  domainConditionAnalysis: []
};

for (const [topicKey, questions] of Object.entries(bank)) {
  report.topics[topicKey] = questions.length;
  for (const q of questions) {
    const qData = {
      id: q.id,
      code: q.code,
      topicKey,
      source: q.source,
      sourceValid: false,
      sourceReason: '',
      hasOptions: Array.isArray(q.options),
      hasItems: Array.isArray(q.items),
      katexErrors: []
    };

    // 1. Source check
    const formatRegex = /^\[Nguồn:\s*(.+)\]$/i;
    const match = (q.source || '').trim().match(formatRegex);
    if (!match) {
      qData.sourceValid = false;
      qData.sourceReason = `Không bọc trong '[Nguồn: ...]'. Giá trị hiện tại: "${q.source}"`;
      report.sourceFormatIssues.push({
        id: q.id,
        code: q.code,
        topicKey,
        currentSource: q.source,
        reason: qData.sourceReason
      });
    } else {
      qData.sourceValid = true;
    }

    // 2. KaTeX check
    const fields = [
      { name: 'content', text: q.content },
      { name: 'explanation', text: q.explanation || q.solution || '' },
      { name: 'distractorAnalysis', text: q.distractorAnalysis || '' },
      { name: 'casioGuide', text: q.casioGuide || '' }
    ];
    if (Array.isArray(q.options)) {
      q.options.forEach((opt, idx) => {
        fields.push({
          name: `option[${idx}]`,
          text: typeof opt === 'string' ? opt : (opt.text || JSON.stringify(opt))
        });
      });
    }
    if (Array.isArray(q.items)) {
      q.items.forEach((it, idx) => {
        fields.push({ name: `items[${idx}].statement`, text: it.statement });
        fields.push({ name: `items[${idx}].explanation`, text: it.explanation });
      });
    }

    for (const f of fields) {
      const formulas = extractMath(f.text);
      for (const form of formulas) {
        if (!form.math) {
          const errItem = { field: f.name, raw: form.raw, error: 'Empty math string' };
          qData.katexErrors.push(errItem);
          report.katexIssues.push({ id: q.id, code: q.code, topicKey, ...errItem });
          continue;
        }
        try {
          katex.renderToString(form.math, {
            displayMode: form.isBlock,
            throwOnError: true
          });
        } catch (err) {
          const errItem = { field: f.name, raw: form.raw, error: err.message };
          qData.katexErrors.push(errItem);
          report.katexIssues.push({ id: q.id, code: q.code, topicKey, ...errItem });
        }
      }
    }

    // 3. Domain conditions check
    const fullText = `${q.content} ${q.explanation || q.solution || ''} ${q.distractorAnalysis || ''}`;
    const hasD = /(\$D\b|tập\s*xác\s*định|txd)/i.test(fullText);
    const hasNeZero = /(\\ne\s*0|\\neq\s*0|!\=\s*0|khác\s*0)/i.test(fullText);
    const hasGeZero = /(\\ge\s*0|\\geq\s*0|>=\s*0|không\s*âm)/i.test(fullText);
    const hasVecNonZero = /(\\vec\{0\}|vectơ\s*khác|vecto\s*khác)/i.test(fullText);
    const hasDotProductZero = /(\\cdot.*=\s*0|tích\s*vô\s*hướng.*0|vuông\s*góc)/i.test(fullText);

    // Identify if question involves fractions, square roots, vectors
    const hasFraction = /\\frac|\\dfrac/i.test(fullText);
    const hasSqrt = /\\sqrt/i.test(fullText);
    const hasVector = /\\vec/i.test(fullText);

    report.domainConditionAnalysis.push({
      id: q.id,
      code: q.code,
      topicKey,
      hasFraction,
      hasSqrt,
      hasVector,
      hasD,
      hasNeZero,
      hasGeZero,
      hasVecNonZero,
      hasDotProductZero
    });

    report.allQuestions.push(qData);
  }
}

console.log('=== AUDIT SUMMARY ===');
console.log('Total questions:', report.allQuestions.length);
console.log('Topics count:', Object.keys(report.topics).length);
console.log('Topics breakdown:', report.topics);
console.log('Source format issues count:', report.sourceFormatIssues.length);
console.log('KaTeX issues count:', report.katexIssues.length);

if (report.katexIssues.length > 0) {
  console.log('\n--- KaTeX Issues ---');
  report.katexIssues.forEach(iss => {
    console.log(`[${iss.topicKey}] ${iss.code} (${iss.field}): ${iss.raw} -> ${iss.error}`);
  });
}

console.log('\n--- Source Format Check ---');
report.sourceFormatIssues.slice(0, 10).forEach(iss => {
  console.log(`[${iss.topicKey}] ${iss.code}: "${iss.currentSource}"`);
});

fs.writeFileSync('scripts/audit_m2_result.json', JSON.stringify(report, null, 2), 'utf8');
console.log('\nWrote full audit result to scripts/audit_m2_result.json');
