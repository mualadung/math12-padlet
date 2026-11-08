const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function loadTsModule(relativePath) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const code = fs.readFileSync(absolutePath, 'utf8');
  const transpiled = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} };
  const fn = new Function('exports', 'module', 'require', '__filename', '__dirname', transpiled);
  fn(mod.exports, mod, require, absolutePath, path.dirname(absolutePath));
  return mod.exports;
}

const mod = loadTsModule('src/app/mindmap/mindmapQuestions.ts');
const bank = mod.REAL_QUESTIONS_BANK;

console.log('=== RIGOR & DOMAIN CONDITION ANALYSIS PER QUESTION ===\n');

const rigorReport = [];

for (const [topicKey, questions] of Object.entries(bank)) {
  for (const q of questions) {
    const text = (q.explanation || '') + ' ' + (q.content || '');
    
    // Check what math objects are in content
    const isFraction = /\\frac|\\dfrac|\/\s*x/i.test(q.content);
    const isSqrt = /\\sqrt/i.test(q.content);
    const isVector = /\\vec|vectơ|vecto/i.test(q.content);
    const isLog = /\\log|\\ln/i.test(q.content);
    const isTrig = /\\sin|\\cos|\\tan/i.test(q.content);

    // Check conditions present in explanation
    const hasDomainD = /D\s*=|tập\s*xác\s*định/i.test(q.explanation || '');
    const hasDenomCond = /\\ne|\\neq|khác\s*0|mẫu/i.test(q.explanation || '');
    const hasRadicandCond = /\\ge|\\geq|không\s*âm|căn/i.test(q.explanation || '');
    const hasVectorNonZero = /\\vec\{0\}|khác\s*\\vec\{0\}|vectơ\s*khác/i.test(q.explanation || '');
    const hasPerpendicular = /\\cdot.*=.*0|vuông\s*góc|\\perp/i.test(q.explanation || '');

    const needsAttention = [];
    if (isFraction && !hasDomainD && !hasDenomCond) {
      needsAttention.push('Hàm phân thức nhưng chưa nêu rõ Tập xác định D hoặc điều kiện mẫu != 0');
    }
    if (isSqrt && !hasDomainD && !hasRadicandCond) {
      needsAttention.push('Chứa căn thức nhưng chưa nêu điều kiện biểu thức trong căn >= 0');
    }
    if (isVector && /cùng\s*phương|vuông\s*góc|tích\s*có\s*hướng/i.test(q.content) && !hasVectorNonZero && !hasPerpendicular) {
      needsAttention.push('Toán vectơ nhưng chưa nêu điều kiện vectơ khác vectơ 0 hoặc tích vô hướng');
    }

    rigorReport.push({
      topicKey,
      id: q.id,
      code: q.code,
      type: q.type,
      contentSnippet: q.content.substring(0, 70),
      explanationSnippet: (q.explanation || '').substring(0, 100),
      isFraction,
      isSqrt,
      isVector,
      hasDomainD,
      hasDenomCond,
      hasRadicandCond,
      hasVectorNonZero,
      needsAttention
    });
  }
}

fs.writeFileSync('scripts/rigor_analysis.json', JSON.stringify(rigorReport, null, 2), 'utf8');

const attentionItems = rigorReport.filter(r => r.needsAttention.length > 0);
console.log(`Total questions analyzed: ${rigorReport.length}`);
console.log(`Questions needing domain condition enhancement: ${attentionItems.length}`);
attentionItems.forEach(a => {
  console.log(`\n[${a.topicKey}] ${a.code} (${a.id}):`);
  console.log(`  Content: ${a.contentSnippet}...`);
  console.log(`  Explanation: ${a.explanationSnippet}...`);
  a.needsAttention.forEach(n => console.log(`  -> ${n}`));
});
