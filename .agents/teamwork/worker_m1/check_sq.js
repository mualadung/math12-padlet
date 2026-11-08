const ts = require('typescript');
const fs = require('fs');
const katex = require('katex');

const code = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8');
const transpiled = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const mod = { exports: {} };
new Function('exports', 'module', transpiled)(mod.exports, mod);
const mach = mod.exports.TREE_DATA;

const mathTypes = [];
mach.chapters.forEach(c => c.topics.forEach(t => t.mathTypes.forEach(mt => mathTypes.push(mt))));

console.log('Math types:', mathTypes.length);

let errors = [];
const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;

mathTypes.forEach(mt => {
  if (mt.details && mt.details.sampleQuestion) {
    const sq = mt.details.sampleQuestion;
    ['content', 'answer', 'casio'].forEach(f => {
      const text = sq[f] || '';
      let m;
      while ((m = regex.exec(text)) !== null) {
        const isBlock = m[0].startsWith('$$');
        const formula = isBlock ? m[0].slice(2, -2).trim() : m[0].slice(1, -1).trim();
        try {
          katex.renderToString(formula, { displayMode: isBlock, throwOnError: true });
        } catch (e) {
          errors.push(mt.id + ' sampleQuestion.' + f + ': [' + formula + '] -> ' + e.message);
        }
      }
    });
  }
});

console.log('Sample question KaTeX errors:', errors);
