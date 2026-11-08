const fs = require('fs');
const path = require('path');

const inventory = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'mach_types_inventory.json'), 'utf8')
);

console.log(`Analyzing ${inventory.length} types in machData.ts:\n`);

let missingFields = 0;
let missingSample = 0;

inventory.forEach((item, index) => {
  const missing = [];
  if (!item.hasTheory) missing.push('theory');
  if (!item.hasSigns) missing.push('signs');
  if (!item.hasMethods) missing.push('methods');
  if (!item.hasMistakes) missing.push('mistakes');
  if (!item.hasSample) {
    missingSample++;
    missing.push('sampleQuestion');
  }

  if (missing.length > 0) {
    missingFields++;
    console.log(`[!] Type ${index + 1} (${item.code} - ${item.id}): Missing [${missing.join(', ')}]`);
  }
});

console.log(`\nSummary:`);
console.log(`- Types with missing required fields: ${missingFields}`);
console.log(`- Types missing sample question: ${missingSample}`);
console.log(`- Total types: ${inventory.length}`);
