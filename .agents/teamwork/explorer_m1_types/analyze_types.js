const fs = require('fs');
const path = require('path');

// Read machData.ts
const machDataPath = path.resolve(__dirname, '../../../src/app/mindmap/machData.ts');
let content = fs.readFileSync(machDataPath, 'utf8');

// Strip TypeScript interfaces to evaluate TREE_DATA
const exportIndex = content.indexOf('export const TREE_DATA');
if (exportIndex === -1) {
  console.error('TREE_DATA not found');
  process.exit(1);
}

let jsCode = content.slice(exportIndex);
// Replace export const TREE_DATA: RootKnowledgeTree = { ... }; with module.exports = { ... };
jsCode = jsCode.replace('export const TREE_DATA: RootKnowledgeTree =', 'module.exports =');

// Write to temp file in explorer folder and require it
const tempJsPath = path.resolve(__dirname, 'temp_mach_data.js');
fs.writeFileSync(tempJsPath, jsCode, 'utf8');

const treeData = require(tempJsPath);
fs.unlinkSync(tempJsPath);

console.log('Chapters count:', treeData.chapters.length);

let totalTypes = 0;
const inventory = [];

treeData.chapters.forEach(ch => {
  console.log(`\n=== Chapter: ${ch.id} (${ch.number}): ${ch.title} ===`);
  ch.topics.forEach(tp => {
    console.log(`  Topic ${tp.id} (${tp.number}): ${tp.title} [${tp.mathTypes.length} types]`);
    tp.mathTypes.forEach(mt => {
      totalTypes++;
      inventory.push({
        chapterId: ch.id,
        chapterTitle: ch.title,
        topicId: tp.id,
        topicNumber: tp.number,
        topicTitle: tp.title,
        id: mt.id,
        code: mt.code,
        title: mt.title,
        difficulty: mt.difficulty,
        hasTheory: !!mt.details?.theory,
        hasSigns: !!mt.details?.signs,
        hasMethods: !!mt.details?.methods,
        hasMistakes: !!mt.details?.mistakes,
        hasSample: !!mt.details?.sampleQuestion,
        sampleCode: mt.details?.sampleQuestion?.code,
        theoryPreview: mt.details?.theory?.slice(0, 80).replace(/\n/g, ' '),
        signsPreview: mt.details?.signs?.slice(0, 80).replace(/\n/g, ' '),
        methodsPreview: mt.details?.methods?.slice(0, 80).replace(/\n/g, ' '),
        mistakesPreview: mt.details?.mistakes?.slice(0, 80).replace(/\n/g, ' '),
      });
    });
  });
});

console.log(`\nTotal Math Types: ${totalTypes}`);

// Save full inventory to JSON in explorer folder
fs.writeFileSync(
  path.resolve(__dirname, 'mach_types_inventory.json'),
  JSON.stringify(inventory, null, 2),
  'utf8'
);

console.log('Saved inventory to mach_types_inventory.json');
