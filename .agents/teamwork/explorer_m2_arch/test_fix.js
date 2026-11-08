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

// Simulate the Worker fix:
const patchedBank = { ...mm.REAL_QUESTIONS_BANK };
patchedBank['TOPIC_3_1'] = patchedBank['TOPIC_2_4'];
delete patchedBank['TOPIC_2_4'];

function patchedGetQuestionsForTopic(topicId) {
  if (patchedBank[topicId]) {
    return patchedBank[topicId];
  }
  if (topicId === 'TOPIC_2_4') {
    return patchedBank['TOPIC_3_1'] || [];
  }
  if (topicId.startsWith('TOPIC_1')) {
    return patchedBank['TOPIC_1_1'];
  }
  if (topicId.startsWith('TOPIC_3')) {
    return patchedBank['TOPIC_3_1'];
  }
  return patchedBank['TOPIC_2_2'];
}

const treeTopicIds = mach.TREE_DATA.chapters.flatMap(c => c.topics.map(t => t.id));

console.log('--- Post-Fix Verification ---');
let allMatched = true;
treeTopicIds.forEach(id => {
  const hasKey = id in patchedBank;
  if (!hasKey) allMatched = false;
  console.log(`Topic ID: ${id} -> in Patched Bank? ${hasKey ? 'YES' : 'NO'}`);
});
console.log('All 10 topics match 1:1?', allMatched);

const qForTopic3_1 = patchedGetQuestionsForTopic('TOPIC_3_1');
console.log('\n--- getQuestionsForTopic(\"TOPIC_3_1\") with Fix ---');
console.log('Returned count:', qForTopic3_1.length);
console.log('Returned IDs:', qForTopic3_1.map(q => q.id));
console.log('Returned Codes:', qForTopic3_1.map(q => q.code));
console.log('Expected Q46_T10 to Q50_T10?');
const expectedIds = ['Q46_T10', 'Q47_T10', 'Q48_T10', 'Q49_T10', 'Q50_T10'];
const isCorrect = JSON.stringify(qForTopic3_1.map(q => q.id)) === JSON.stringify(expectedIds);
console.log('Returned IDs match expected Topic 10 IDs identically?', isCorrect);

console.log('\n--- Test Legacy TOPIC_2_4 ---');
const qLegacy = patchedGetQuestionsForTopic('TOPIC_2_4');
console.log('Legacy TOPIC_2_4 returned count:', qLegacy.length);
console.log('Legacy IDs match expected?', JSON.stringify(qLegacy.map(q => q.id)) === JSON.stringify(expectedIds));
