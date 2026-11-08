const fs = require('fs');

const files = [
  'src/app/mindmap/machData.ts',
  'prisma/seed.js',
  'src/app/mindmap/mindmapQuestions.ts',
];

const suspiciousKeywords = [
  'iff',
  'implies',
  'approx',
  'equiv',
  'forall',
  'exists',
  'notin',
  'subset',
  'supset',
  'cap',
  'cup',
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const matches = [];

  lines.forEach((line, lineIdx) => {
    // Extract inline $...$ and block $$...$$
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
    let m;
    while ((m = regex.exec(line)) !== null) {
      const raw = m[0];
      const math = raw.startsWith('$$') ? raw.slice(2, -2) : raw.slice(1, -1);
      
      // Check for suspicious unescaped keywords: word boundary without leading backslash
      suspiciousKeywords.forEach(kw => {
        const kwRegex = new RegExp(`(?<!\\\\)\\b${kw}\\b`, 'g');
        if (kwRegex.test(math)) {
          matches.push({
            line: lineIdx + 1,
            keyword: kw,
            formula: raw,
            fullLine: line.trim().substring(0, 100),
          });
        }
      });
    }
  });

  console.log(`=== ${file}: ${matches.length} suspicious unescaped keywords ===`);
  matches.forEach(m => {
    console.log(`  Line ${m.line}: keyword "${m.keyword}" in formula: ${m.formula}`);
  });
});
