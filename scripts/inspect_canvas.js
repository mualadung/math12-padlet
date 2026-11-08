const fs = require('fs');
const code = fs.readFileSync('scripts/routes-EhwX_jep.js', 'utf8');

// Find where <ReactFlow or reactflow component is used
const idx = code.indexOf('reactflow');
const idx2 = code.indexOf('.jsx(Re');
console.log('reactflow index:', idx);

// Find where the canvas component is
const canvasIdx = code.indexOf('canvas-wrapper');
console.log('canvas-wrapper index:', canvasIdx);
if (canvasIdx !== -1) {
  console.log(code.slice(canvasIdx - 500, canvasIdx + 1500));
}
