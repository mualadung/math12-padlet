const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const katex = require('katex');

function loadTsModule(relativePath) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const code = fs.readFileSync(absolutePath, 'utf8');
  const transpiled = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} };
  const fn = new Function('exports', 'module', 'require', '__filename', '__dirname', transpiled);
  fn(mod.exports, mod, require, absolutePath, path.dirname(absolutePath));
  return mod.exports;
}

const machData = loadTsModule('src/app/mindmap/machData.ts');
const tree = machData.TREE_DATA;

console.log('Chapters count:', tree.chapters.length);
let totalTopics = 0;
let totalMathTypes = 0;
const subtypesList = [];

for (const ch of tree.chapters) {
  console.log(`Chapter: ${ch.id} - ${ch.title} (topics: ${ch.topics.length})`);
  totalTopics += ch.topics.length;
  for (const tp of ch.topics) {
    console.log(`  Topic: ${tp.id} - ${tp.title} (mathTypes: ${tp.mathTypes.length})`);
    totalMathTypes += tp.mathTypes.length;
    for (const mt of tp.mathTypes) {
      subtypesList.push({
        chapterId: ch.id,
        topicId: tp.id,
        code: mt.code,
        title: mt.title,
        hasTheory: !!mt.details?.theory,
        hasSigns: !!mt.details?.signs,
        hasMethods: !!mt.details?.methods,
        hasMistakes: !!mt.details?.mistakes,
        hasSample: !!mt.details?.sampleQuestion,
        theorySnippet: mt.details?.theory?.substring(0, 80),
      });
    }
  }
}

console.log('Total Topics:', totalTopics);
console.log('Total Math Types:', totalMathTypes);

// Check if any subtype has missing details or empty fields
const missing = subtypesList.filter(s => !s.hasTheory || !s.hasSigns || !s.hasMethods || !s.hasMistakes);
console.log('Subtypes with missing fields:', missing.length);

// Check domain conditions in each subtype's theory
const conditionRegexes = {
  domainD: /(\$D\b|tập\s*xác\s*định|txd)/i,
  nonzero: /(\\ne\s*0|\\neq\s*0|khác\s*0)/i,
  nonneg: /(\\ge\s*0|\\geq\s*0|không\s*âm)/i,
  nonzeroVec: /(\\vec\{0\}|vectơ\s*khác|vecto\s*khác)/i,
};

let withConditionsCount = 0;
for (const s of subtypesList) {
  const fullText = (s.hasTheory ? subtypesList.find(x => x.code === s.code).theorySnippet : '');
}
