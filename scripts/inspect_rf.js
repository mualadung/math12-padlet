const fs = require('fs');
const code = fs.readFileSync('scripts/routes-EhwX_jep.js', 'utf8');

// Look for the React Flow canvas rendering, nodes, positions, edges
const rfIndex = code.indexOf('ReactFlow');
console.log('ReactFlow index:', rfIndex);

// Let's search for how nodes are constructed
const nodeRegex = /qb\s*=\s*\[([^\]]+)\]/;
const match = code.match(nodeRegex);
if (match) {
  console.log('Found qb (node positions?):', match[0]);
}

// Search for the main component function that renders the canvas
const componentMatches = code.match(/function\s+[a-zA-Z0-9_]+\s*\([^)]*\)\s*\{[^}]*ReactFlow/g);
console.log('Component matches with ReactFlow:', componentMatches);

// Let's search around "ReactFlow"
if (rfIndex !== -1) {
  console.log('Context around ReactFlow:');
  console.log(code.slice(rfIndex - 300, rfIndex + 500));
}
