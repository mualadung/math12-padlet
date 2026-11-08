const fs = require('fs');

console.log('=== COMPREHENSIVE LATEX AUDIT OF prisma/seed.js ===');

const seedContent = fs.readFileSync('prisma/seed.js', 'utf8');

const texKeywords = [
  'iff', 'implies', 'subset', 'subseteq', 'forall', 'exists',
  'in', 'notin', 'cup', 'cap', 'approx', 'equiv', 'cdot', 'perp',
  'vec', 'frac', 'sqrt', 'times', 'left', 'right', 'begin', 'end'
];

let typoCount = 0;

function auditString(str, context) {
  if (!str || typeof str !== 'string') return;

  for (const kw of texKeywords) {
    const regexKw = new RegExp(`\\$${kw}\\b`, 'g');
    let m;
    while ((m = regexKw.exec(str)) !== null) {
      console.log(`[LATEX TYPO] ${context}: Found "$${kw}" (likely missing backslash "\\${kw}"): "...${str.substring(Math.max(0, m.index - 15), Math.min(str.length, m.index + 25))}..."`);
      typoCount++;
    }
  }

  // Check Vietnamese accented chars in math mode
  const mathRegex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
  let match;
  while ((match = mathRegex.exec(str)) !== null) {
    const raw = match[1];
    const inner = raw.startsWith('$$') ? raw.slice(2, -2) : raw.slice(1, -1);
    const strippedText = inner.replace(/\\text\{[^{}]*\}/g, '');
    const vietnameseAccents = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/i;
    if (vietnameseAccents.test(strippedText)) {
      console.log(`[VIETNAMESE CHAR IN MATH] ${context}: Accented character outside \\text{} in "${raw}"`);
    }
  }
}

// Check lines in seed.js
const lines = seedContent.split('\n');
lines.forEach((l, idx) => {
  auditString(l, `seed.js line ${idx+1}`);
});

console.log(`Total LaTeX issues detected in prisma/seed.js: ${typoCount}`);
