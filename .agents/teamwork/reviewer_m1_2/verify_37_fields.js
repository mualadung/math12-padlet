const fs = require('fs');
const ts = require('typescript');

const code = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8');
const transpiled = ts.transpileModule(code, {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
}).outputText;

const m = { exports: {} };
new Function('exports', 'module', transpiled)(m.exports, m);

const treeData = m.exports.TREE_DATA;
const results = {
  totalChapters: treeData.chapters.length,
  totalTopics: 0,
  totalMathTypes: 0,
  missingTheory: [],
  missingSigns: [],
  missingMethods: [],
  missingMistakes: [],
  missingSampleQuestion: [],
  mathTypeCodes: [],
};

for (const ch of treeData.chapters) {
  for (const t of ch.topics) {
    results.totalTopics++;
    for (const mt of t.mathTypes) {
      results.totalMathTypes++;
      results.mathTypeCodes.push({ code: mt.code, title: mt.title, topic: t.id });
      if (!mt.details.theory || mt.details.theory.trim().length === 0) {
        results.missingTheory.push(mt.code);
      }
      if (!mt.details.signs || mt.details.signs.trim().length === 0) {
        results.missingSigns.push(mt.code);
      }
      if (!mt.details.methods || mt.details.methods.trim().length === 0) {
        results.missingMethods.push(mt.code);
      }
      if (!mt.details.mistakes || mt.details.mistakes.trim().length === 0) {
        results.missingMistakes.push(mt.code);
      }
      if (!mt.details.sampleQuestion || !mt.details.sampleQuestion.content) {
        results.missingSampleQuestion.push(mt.code);
      }
    }
  }
}

console.log('Chapters:', results.totalChapters);
console.log('Topics:', results.totalTopics);
console.log('Total Math Types:', results.totalMathTypes);
console.log('Missing Theory:', results.missingTheory.length);
console.log('Missing Signs:', results.missingSigns.length);
console.log('Missing Methods:', results.missingMethods.length);
console.log('Missing Mistakes:', results.missingMistakes.length);
console.log('Missing SampleQuestion:', results.missingSampleQuestion.length);
