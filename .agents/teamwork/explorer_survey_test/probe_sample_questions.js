const fs = require('fs');
const ts = require('typescript');

const machTs = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8');
const machJs = ts.transpileModule(machTs, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const machMod = { exports: {} };
new Function('module', 'exports', 'require', machJs)(machMod, machMod.exports, require);
const treeData = machMod.exports.TREE_DATA;

const samples = [];
function findSamples(obj) {
  if (!obj) return;
  if (obj.sampleQuestion) {
    samples.push(obj.sampleQuestion);
  }
  if (Array.isArray(obj)) {
    obj.forEach(findSamples);
  } else if (typeof obj === 'object') {
    for (const k in obj) {
      findSamples(obj[k]);
    }
  }
}

findSamples(treeData);
console.log('Total sample questions in machData/treeData:', samples.length);
samples.forEach((s, i) => console.log(`${i+1}. [${s.code}]: ${s.content.slice(0, 40)}...`));
