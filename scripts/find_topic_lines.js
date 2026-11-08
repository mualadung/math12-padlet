const fs = require('fs');
const content = fs.readFileSync('src/app/mindmap/treeData.ts', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('id: "TOPIC_')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
