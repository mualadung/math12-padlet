const fs = require('fs');

const machDataContent = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8');

// Parse all mathTypes from machData.ts
const mtRegex = /"id":\s*"([^"]+)",\s*"code":\s*"([^"]+)",\s*"title":\s*"([^"]+)"/g;
let m;
const mathTypes = [];
while ((m = mtRegex.exec(machDataContent)) !== null) {
  mathTypes.push({ id: m[1], code: m[2], title: m[3] });
}

console.log('Total math types in machData:', mathTypes.length);

const bankContent = fs.readFileSync('src/app/mindmap/mathTypeQuestionsBank.ts', 'utf8');
const bankKeysMatch = bankContent.match(/"(MT_[^'"]+)":/g) || [];
const bankKeys = bankKeysMatch.map(k => k.replace(/[":]/g, ''));
console.log('Total keys in bank:', bankKeys.length);

const missing = mathTypes.filter(mt => !bankKeys.includes(mt.id));
console.log('Missing math types in bank:', missing.length);
missing.forEach(m => console.log(`MISSING: ${m.id} | ${m.code} | ${m.title}`));
