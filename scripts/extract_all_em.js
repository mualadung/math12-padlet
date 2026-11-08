const fs = require('fs');
const code = fs.readFileSync('scripts/routes-EhwX_jep.js', 'utf8');

const emIdx = code.indexOf('Em=[');
const endIdx = code.indexOf(';function Jb()');
const emText = code.slice(emIdx, endIdx);

fs.writeFileSync('scripts/lovable_em_all.js', emText);
console.log('Saved all Em, length:', emText.length);
