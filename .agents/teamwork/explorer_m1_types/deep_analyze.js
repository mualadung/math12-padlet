const fs = require('fs');
const path = require('path');

const inventory = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'mach_types_inventory.json'), 'utf8')
);

// Read machData full details
const machDataPath = path.resolve(__dirname, '../../../src/app/mindmap/machData.ts');
let content = fs.readFileSync(machDataPath, 'utf8');
const exportIndex = content.indexOf('export const TREE_DATA');
let jsCode = content.slice(exportIndex).replace('export const TREE_DATA: RootKnowledgeTree =', 'module.exports =');
const tempJsPath = path.resolve(__dirname, 'temp_mach_data_full.js');
fs.writeFileSync(tempJsPath, jsCode, 'utf8');
const treeData = require(tempJsPath);
fs.unlinkSync(tempJsPath);

const detailedAnalysis = [];

treeData.chapters.forEach(ch => {
  ch.topics.forEach(tp => {
    tp.mathTypes.forEach(mt => {
      const d = mt.details;
      detailedAnalysis.push({
        id: mt.id,
        code: mt.code,
        title: mt.title,
        topicId: tp.id,
        topicNumber: tp.number,
        topicTitle: tp.title,
        chapterId: ch.id,
        difficulty: mt.difficulty,
        theoryLen: d.theory.length,
        signsLen: d.signs.length,
        methodsLen: d.methods.length,
        mistakesLen: d.mistakes.length,
        hasLatex: d.theory.includes('$') || d.signs.includes('$') || d.methods.includes('$'),
        hasConditions: /điều kiện|xác định|liên tục|khả vi|\$D|\$a \\ne 0|mẫu.*khác.*0|căn/i.test(d.theory + d.signs + d.methods),
        sampleQuestion: d.sampleQuestion ? {
          code: d.sampleQuestion.code,
          hasContent: !!d.sampleQuestion.content,
          hasAnswer: !!d.sampleQuestion.answer,
          hasCasio: !!d.sampleQuestion.casio,
        } : null,
        theory: d.theory,
        signs: d.signs,
        methods: d.methods,
        mistakes: d.mistakes,
      });
    });
  });
});

console.log('Analyzed', detailedAnalysis.length, 'types.');

// Print breakdown
console.log('\n--- BREAKDOWN BY TOPIC ---');
const byTopic = {};
detailedAnalysis.forEach(item => {
  if (!byTopic[item.topicTitle]) byTopic[item.topicTitle] = [];
  byTopic[item.topicTitle].push(item);
});

Object.entries(byTopic).forEach(([topic, items], idx) => {
  console.log(`\nTopic ${idx + 1}: ${topic} (${items.length} types)`);
  items.forEach(it => {
    console.log(`  - [${it.difficulty}] ${it.code} (${it.id}): ${it.title} (Theory: ${it.theoryLen}c, Methods: ${it.methodsLen}c, Mistakes: ${it.mistakesLen}c, Casio: ${it.sampleQuestion?.hasCasio ? 'YES' : 'NO'})`);
  });
});

// Save detailed analysis to file
fs.writeFileSync(
  path.resolve(__dirname, 'detailed_analysis.json'),
  JSON.stringify(detailedAnalysis, null, 2),
  'utf8'
);
