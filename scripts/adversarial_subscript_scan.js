const fs = require('fs');

const files = [
  'src/app/mindmap/machData.ts',
  'prisma/seed.js',
  'src/app/mindmap/mindmapQuestions.ts',
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const unbracedSubscripts = [];

  lines.forEach((line, lineIdx) => {
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
    let m;
    while ((m = regex.exec(line)) !== null) {
      const raw = m[0];
      const math = raw.startsWith('$$') ? raw.slice(2, -2) : raw.slice(1, -1);
      
      // Look for _ followed by 2 or more letters/digits not in braces
      // e.g. _[a-zA-Z0-9]{2,} without leading {
      const subRegex = /_([a-zA-Z0-9\u00C0-\u024F\u1EA0-\u1EF9]{2,})/g;
      let subMatch;
      while ((subMatch = subRegex.exec(math)) !== null) {
        unbracedSubscripts.push({
          line: lineIdx + 1,
          matched: subMatch[0],
          formula: raw,
        });
      }
    }
  });

  console.log(`=== ${file}: ${unbracedSubscripts.length} unbraced multi-character subscripts ===`);
  unbracedSubscripts.forEach(s => {
    console.log(`  Line ${s.line}: "${s.matched}" in formula: ${s.formula}`);
  });
});
