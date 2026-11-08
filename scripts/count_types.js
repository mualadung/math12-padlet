const fs = require('fs');
const content = fs.readFileSync('src/app/mindmap/treeData.ts', 'utf8');

const mathTypes = [...content.matchAll(/id:\s*"(MT_[^"]+)",\s*code:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*difficulty:\s*"([^"]+)"/g)];
console.log('Total math types:', mathTypes.length);
mathTypes.forEach((m, i) => console.log(`${i+1}. [${m[4]}] ${m[2]}: ${m[3]}`));
