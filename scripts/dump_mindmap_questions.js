const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function loadTsModule(relativePath) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const code = fs.readFileSync(absolutePath, 'utf8');
  const transpiled = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} };
  const fn = new Function('exports', 'module', 'require', '__filename', '__dirname', transpiled);
  fn(mod.exports, mod, require, absolutePath, path.dirname(absolutePath));
  return mod.exports;
}

const mod = loadTsModule('src/app/mindmap/mindmapQuestions.ts');
const bank = mod.REAL_QUESTIONS_BANK;

console.log('=== FULL INVENTORY OF 50 MINDMAP QUESTIONS ===\n');

for (const [topicKey, questions] of Object.entries(bank)) {
  console.log(`\n================== ${topicKey} (${questions.length} questions) ==================`);
  for (const q of questions) {
    console.log(`ID: ${q.id} | Code: ${q.code} | Diff: ${q.difficulty} | Type: ${q.type}`);
    console.log(`Source: ${q.source}`);
    console.log(`Content: ${q.content}`);
    if (q.options) {
      console.log(`Options: ${q.options.join(' | ')}`);
    }
    console.log(`Correct Answer: ${q.correctAnswer}`);
    console.log(`Explanation: ${q.explanation}`);
    console.log(`Distractor: ${q.distractorAnalysis}`);
    console.log(`Casio: ${q.casioGuide || 'None'}`);
    console.log('--------------------------------------------------------------------------------');
  }
}
