const fs = require('fs');
const content = fs.readFileSync('scripts/lovable_em_all.js', 'utf8');

// Let's find all Tm(...) calls (Top-level branch modules)
// Tm(`monotonic`,`TÍNH ĐƠN ĐIỆU`,`Dấu đạo hàm · Khoảng biến thiên`,`olive`,`01`,[ ... ])
const topMatches = [...content.matchAll(/Tm\(`([^`]+)`,`([^`]+)`,`([^`]+)`,`([^`]+)`,`([^`]+)`/g)];
console.log('Top branches:');
topMatches.forEach(m => {
  console.log(`- [${m[5]}] ${m[2]} (${m[1]}): ${m[3]} [Color: ${m[4]}]`);
});

// Let's find wm(...) calls (sub-branch modules)
// wm(`Lý thuyết`, ...)
const subMatches = [...content.matchAll(/wm\(`([^`]+)`/g)].map(m => m[1]);
console.log('\nSub-branches count:', subMatches.length);
console.log('Sample sub-branches:', subMatches);

// Let's find I(...) calls (items)
// I(`title`, `line1`, `line2`)
const itemMatches = [...content.matchAll(/I\(`([^`]+)`/g)].map(m => m[1]);
console.log('\nTotal leaf items count:', itemMatches.length);
console.log('Sample leaf items:', itemMatches.slice(0, 30));
