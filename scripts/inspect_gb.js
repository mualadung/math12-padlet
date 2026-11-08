const fs = require('fs');
const code = fs.readFileSync('scripts/routes-EhwX_jep.js', 'utf8');

const kbIdx = code.indexOf('Kb={study:Gb}');
console.log('kbIdx:', kbIdx);
// Let's print the 2500 characters preceding kbIdx to see Gb definition
console.log(code.slice(kbIdx - 2500, kbIdx));
