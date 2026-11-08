const fs = require('fs');

const files = [
  'src/app/mindmap/machData.ts',
  'prisma/seed.js',
  'src/app/mindmap/mindmapQuestions.ts',
];

const mathFunctions = [
  'sin', 'cos', 'tan', 'cot', 'ln', 'log', 'lim', 'max', 'min', 'det'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const matches = [];

  lines.forEach((line, lineIdx) => {
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
    let m;
    while ((m = regex.exec(line)) !== null) {
      const raw = m[0];
      const math = raw.startsWith('$$') ? raw.slice(2, -2) : raw.slice(1, -1);
      
      mathFunctions.forEach(fn => {
        // Look for function word not preceded by backslash and not preceded by letters
        const fnRegex = new RegExp(`(?<![\\\\a-zA-Z])${fn}(?![a-zA-Z])`, 'g');
        let fnMatch;
        while ((fnMatch = fnRegex.exec(math)) !== null) {
          // Exclude valid single variable letters or specific subscripts if any
          matches.push({
            line: lineIdx + 1,
            fn,
            formula: raw,
          });
        }
      });
    }
  });

  console.log(`=== ${file}: ${matches.length} math function checks ===`);
  matches.forEach(m => {
    console.log(`  Line ${m.line}: function "${m.fn}" in formula: ${m.formula}`);
  });
});
