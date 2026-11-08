const fs = require('fs');
const content = fs.readFileSync('scripts/lovable_em_snippet.js', 'utf8');

console.log(content.slice(0, 3000));
