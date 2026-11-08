const valData = require('../explorer_m1_conditions/validated_37_types.json');
const katex = require('katex');

let count = 0;
let errors = [];

valData.forEach(item => {
  ['theory', 'signs', 'methods', 'mistakes'].forEach(f => {
    const text = item[f] || '';
    if (text.includes('\u000b')) {
      errors.push(item.id + '.' + f + ' contains \\u000b');
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
        errors.push(item.id + '.' + f + ' formula: [' + formula + '] -> ' + e.message);
      }
    }
  });
});

console.log('Checked formulas:', count);
console.log('Errors count:', errors.length);
if (errors.length > 0) {
  console.log('First 5 errors:', errors.slice(0, 5));
}
