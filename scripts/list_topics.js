const fs = require('fs');
const content = fs.readFileSync('src/app/mindmap/treeData.ts', 'utf8');
const topics = [...content.matchAll(/id:\s*"(TOPIC_[^"]+)",\s*lesson:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g)];
topics.forEach((t, i) => console.log(`${i+1}. ${t[1]} | ${t[3]} | ${t[2]}`));
