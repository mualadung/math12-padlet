const fs = require('fs');
const code = fs.readFileSync('scripts/routes-EhwX_jep.js', 'utf8');

const canvasIdx = code.indexOf('canvas-wrapper');
// Look backwards from canvasIdx to see how nodes and edges are computed
console.log(code.slice(canvasIdx - 3500, canvasIdx));
