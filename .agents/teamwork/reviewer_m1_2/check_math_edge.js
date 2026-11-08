const fs = require('fs');

const code = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8');

// Find all $...$ where it does not start with $$
const regex = /(?<!\$)\$([^\$\n]+?)\$(?!\$)/g;
const allDollarRegex = /(?<!\$)\$([\s\S]+?)\$(?!\$)/g;

let matchesWithoutNl = 0;
while (regex.exec(code) !== null) {
  matchesWithoutNl++;
}

let matchesWithNl = 0;
let multilineExamples = [];
let match;
while ((match = allDollarRegex.exec(code)) !== null) {
  if (match[1].includes('\n') && !match[0].startsWith('$$')) {
    matchesWithNl++;
    if (multilineExamples.length < 5) {
      multilineExamples.push(match[0].substring(0, 80));
    }
  }
}

console.log('Single-line inline math matches:', matchesWithoutNl);
console.log('Multi-line single dollar matches:', matchesWithNl);
if (multilineExamples.length > 0) {
  console.log('Examples:', multilineExamples);
}
