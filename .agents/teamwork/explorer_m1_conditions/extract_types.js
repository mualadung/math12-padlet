const fs = require('fs');

const content = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8');

// Strip TypeScript interfaces at the top
const startIdx = content.indexOf('export const TREE_DATA: RootKnowledgeTree = ');
if (startIdx === -1) {
  console.error('Could not find TREE_DATA');
  process.exit(1);
}

const jsCode = content.substring(startIdx).replace('export const TREE_DATA: RootKnowledgeTree = ', 'module.exports = ');
fs.writeFileSync('.agents/teamwork/explorer_m1_conditions/temp_tree.js', jsCode);

const treeData = require('./temp_tree.js');

let count = 0;
const results = [];

for (const ch of treeData.chapters) {
  for (const top of ch.topics) {
    for (const mt of top.mathTypes) {
      count++;
      results.push({
        num: count,
        chapter: ch.id + ': ' + ch.title,
        topic: top.id + ' (' + top.number + '): ' + top.title,
        id: mt.id,
        code: mt.code,
        title: mt.title,
        difficulty: mt.difficulty,
        theory: mt.details.theory,
        signs: mt.details.signs,
        methods: mt.details.methods,
        mistakes: mt.details.mistakes
      });
    }
  }
}

fs.writeFileSync('.agents/teamwork/explorer_m1_conditions/types_dump.json', JSON.stringify(results, null, 2));
console.log('Successfully dumped', count, 'math types.');
