const fs = require('fs');

const code = fs.readFileSync('scripts/routes-EhwX_jep.js', 'utf8');
console.log('File length:', code.length);

// Look for data structures, branch definitions, colors, etc.
// Let's find any object keys or string literals related to branches
const matches = [];
const branchRegex = /id:\s*["']([^"']+)["'],\s*title:\s*["']([^"']+)["']/g;
let m;
while ((m = branchRegex.exec(code)) !== null) {
  matches.push({ id: m[1], title: m[2] });
}
console.log('Branch matches (id, title):', matches.slice(0, 30));

// Also let's search for keywords like "color", "accent", "palette", "icon", "branch", "subtopic"
const terms = ['palette', 'branch', 'subtopic', 'node', 'canvas', 'zoom', 'tree', 'reactflow', 'mindmap'];
for (const t of terms) {
  const count = (code.match(new RegExp(t, 'gi')) || []).length;
  console.log(`Keyword "${t}": ${count} occurrences`);
}
