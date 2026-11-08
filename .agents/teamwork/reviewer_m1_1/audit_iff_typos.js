const fs = require('fs');

const content = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8');
const lines = content.split('\n');

console.log('=== SEARCHING FOR "$iff" or "\\iff" TYPOS IN machData.ts ===');
lines.forEach((l, i) => {
  if (l.includes('$iff') || l.includes('iff [') || l.includes('iff $')) {
    console.log(`Line ${i + 1}: ${l.trim()}`);
  }
});
