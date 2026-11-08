const fs = require('fs');
const path = require('path');
const ts = require('typescript');

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
const targetCodes = [
  'DẠNG 2.3', 'DẠNG 3.1', 'DẠNG 3.2', 'DẠNG 3.3',
  'DẠNG 4.1', 'DẠNG 4.3', 'DẠNG 5.1', 'DẠNG 5.2',
  'DẠNG 5.3', 'DẠNG 5.4', 'DẠNG 6.1', 'DẠNG 6.2', 'DẠNG 10.1'
];

for (const ch of machData.TREE_DATA.chapters) {
  for (const tp of ch.topics) {
    for (const mt of tp.mathTypes) {
      if (targetCodes.some(c => mt.code.includes(c) || mt.id.includes(c))) {
        console.log(`=== ${mt.code}: ${mt.title} ===`);
        console.log('THEORY:', mt.details.theory);
        console.log('SIGNS:', mt.details.signs);
        console.log('METHODS:', mt.details.methods);
        console.log('MISTAKES:', mt.details.mistakes);
        console.log('--------------------------------------------------\n');
      }
    }
  }
}
