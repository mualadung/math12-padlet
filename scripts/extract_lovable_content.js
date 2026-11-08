const fs = require('fs');
const code = fs.readFileSync('scripts/routes-EhwX_jep.js', 'utf8');

// Find where Em is defined: Em=[Tm(...) ...]
const emIdx = code.indexOf('Em=[');
console.log('emIdx:', emIdx);

// Let's extract Em
if (emIdx !== -1) {
  // Let's print the next 15000 characters or find where Em ends
  const snippet = code.slice(emIdx, emIdx + 20000);
  fs.writeFileSync('scripts/lovable_em_snippet.js', snippet);
  console.log('Saved lovable_em_snippet.js, length:', snippet.length);
}
