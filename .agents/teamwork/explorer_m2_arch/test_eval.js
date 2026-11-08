const ts = require('typescript');
const fs = require('fs');

function loadTs(file) {
  const code = fs.readFileSync(file, 'utf8');
  const transpiled = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS }
  }).outputText;
  const m = { exports: {} };
  new Function('exports', 'module', transpiled)(m.exports, m);
  return m.exports;
}

const mach = loadTs('src/app/mindmap/machData.ts');
const mm = loadTs('src/app/mindmap/mindmapQuestions.ts');

const treeTopicIds = mach.TREE_DATA.chapters.flatMap(c => c.topics.map(t => t.id));
const bankKeys = Object.keys(mm.REAL_QUESTIONS_BANK);

console.log('Tree Topic IDs:', treeTopicIds);
console.log('Bank Keys:', bankKeys);

console.log('\n--- Checking 1:1 Key Matching ---');
treeTopicIds.forEach(id => {
  const hasKey = id in mm.REAL_QUESTIONS_BANK;
  console.log(`Topic ID: ${id} -> in REAL_QUESTIONS_BANK? ${hasKey ? 'YES' : 'NO (MISMATCH!)'}`);
});

console.log('\n--- Checking getQuestionsForTopic(\"TOPIC_3_1\") ---');
const qForTopic3_1 = mm.getQuestionsForTopic('TOPIC_3_1');
console.log('Returned count:', qForTopic3_1.length);
console.log('Returned IDs:', qForTopic3_1.map(q => q.id));
console.log('Returned Codes:', qForTopic3_1.map(q => q.code));
console.log('Are these from Topic 8 (TOPIC_2_2) instead of Topic 10?');
const qForTopic2_2 = mm.REAL_QUESTIONS_BANK['TOPIC_2_2'];
const isFallingBackToTopic2_2 = JSON.stringify(qForTopic3_1) === JSON.stringify(qForTopic2_2);
console.log('Matches TOPIC_2_2 identically?', isFallingBackToTopic2_2);
