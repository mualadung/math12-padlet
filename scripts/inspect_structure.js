const fs = require('fs');
const code = fs.readFileSync('scripts/routes-EhwX_jep.js', 'utf8');

// Find all capitalized titles or branch headings
const lines = fs.readFileSync('scripts/vn_strings.json', 'utf8');
const strings = JSON.parse(lines);

const headings = strings.filter(s => s === s.toUpperCase() && s.length > 3 && s.length < 40 && !s.includes('$'));
console.log('Capitalized Headings:', headings);

// Find occurrences of these headings in the code to see surrounding objects
for (const h of headings) {
  const idx = code.indexOf(h);
  if (idx !== -1) {
    const surrounding = code.slice(Math.max(0, idx - 150), Math.min(code.length, idx + 150));
    console.log(`\n--- Heading: ${h} ---`);
    console.log(surrounding);
  }
}
