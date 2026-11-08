const fs = require('fs');

const code = fs.readFileSync('scripts/index-DKiwaejv.js', 'utf8');
console.log('Total length:', code.length);

// Look for chunk imports or dynamic imports
const dynamicImports = [...code.matchAll(/\/assets\/[a-zA-Z0-9_\-\.]+\.js/g)].map(m => m[0]);
console.log('Dynamic imports:', [...new Set(dynamicImports)]);

// Look for branch / tree / topic data
const vietnameseTerms = ['Mạch', 'Toán 12', 'đơn điệu', 'cực trị', 'tiệm cận', 'khảo sát', 'đồ thị', 'nhánh'];
for (const term of vietnameseTerms) {
  const idx = code.indexOf(term);
  console.log(`Term "${term}": ${idx !== -1 ? 'found at ' + idx : 'not found'}`);
  if (idx !== -1) {
    console.log(`Context for "${term}":`, code.slice(Math.max(0, idx - 100), Math.min(code.length, idx + 200)));
  }
}
