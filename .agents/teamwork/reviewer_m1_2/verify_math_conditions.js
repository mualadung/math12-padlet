const fs = require('fs');
const ts = require('typescript');

const code = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8');
const transpiled = ts.transpileModule(code, {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
}).outputText;

const m = { exports: {} };
new Function('exports', 'module', transpiled)(m.exports, m);

const treeData = m.exports.TREE_DATA;
const conditionReport = [];

for (const ch of treeData.chapters) {
  for (const t of ch.topics) {
    for (const mt of t.mathTypes) {
      const text = `${mt.details.theory} ${mt.details.methods} ${mt.details.mistakes}`;
      const hasDomain = /(\$D\b|tập xác định|TXD|miền|xác định trên)/i.test(text);
      const hasNonZero = /(\\ne\s*0|\\neq\s*0|khác 0|mẫu thức khác)/i.test(text);
      const hasNonNegative = /(\\ge\s*0|\\geq\s*0|không âm|biểu thức trong căn)/i.test(text);
      const hasVectorNonZero = /(\\ne\s*\\vec\{0\}|\\ne\s*\\vec\{O\}|khác vectơ-không|khác vectơ 0|khác \$\\vec\{0\}\$)/i.test(text);
      const hasOrthogonal = /(\\cdot.*=\s*0|vuông góc|\\perp)/i.test(text);
      
      conditionReport.push({
        code: mt.code,
        title: mt.title,
        hasDomain,
        hasNonZero,
        hasNonNegative,
        hasVectorNonZero,
        hasOrthogonal,
      });
    }
  }
}

console.log('Total checked:', conditionReport.length);
const withoutDomain = conditionReport.filter(r => !r.hasDomain);
console.log('Subtypes without explicit domain/continuity reference:', withoutDomain.map(r => r.code));
