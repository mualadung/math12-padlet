const ts = require('typescript');
const fs = require('fs');
const path = require('path');

function loadTsModule(relativePath) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const code = fs.readFileSync(absolutePath, 'utf8');
  const transpiled = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText;
  const mod = { exports: {} };
  const fn = new Function('exports', 'module', 'require', '__filename', '__dirname', transpiled);
  fn(mod.exports, mod, require, absolutePath, path.dirname(absolutePath));
  return mod.exports;
}

const mindmapQuestions = loadTsModule('src/app/mindmap/mindmapQuestions.ts');
const bank = mindmapQuestions.REAL_QUESTIONS_BANK || {};
console.log('Topics in mindmapQuestions:');
for (const [k, v] of Object.entries(bank)) {
  console.log(`- ${k}: ${v.length} questions`);
}
