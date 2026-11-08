const ts = require('typescript');
const fs = require('fs');
const katex = require('katex');

const code = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8');
const transpiled = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const mod = { exports: {} };
new Function('exports', 'module', transpiled)(mod.exports, mod);
const tree = mod.exports.TREE_DATA;

let count = 0;
let errors = [];

tree.chapters.forEach(c => {
  c.topics.forEach(t => {
    t.mathTypes.forEach(mt => {
      ['theory', 'signs', 'methods', 'mistakes'].forEach(f => {
        const text = mt.details[f] || '';
        if (text.includes('\u000b')) {
          errors.push(mt.id + '.' + f + ' contains \\u000b');
        }
        const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
        let m;
        while ((m = regex.exec(text)) !== null) {
          const isBlock = m[0].startsWith('$$');
          const formula = isBlock ? m[0].slice(2, -2).trim() : m[0].slice(1, -1).trim();
          try {
            katex.renderToString(formula, { displayMode: isBlock, throwOnError: true });
            count++;
          } catch (e) {
            errors.push(mt.id + '.' + f + ' formula: [' + formula + '] -> ' + e.message);
          }
        }
      });
    });
  });
});

console.log('Checked formulas in machData.ts:', count);
console.log('Errors count:', errors.length);
if (errors.length > 0) {
  console.log('Errors:', errors);
}
