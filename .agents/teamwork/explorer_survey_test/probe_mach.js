const fs = require('fs');
const ts = require('typescript');
const katex = require('katex');

function extractMath(str) {
  if (!str || typeof str !== 'string') return [];
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
  const matches = [];
  let m;
  while ((m = regex.exec(str)) !== null) {
    const raw = m[0];
    const isBlock = raw.startsWith('$$');
    const math = isBlock ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim();
    matches.push({ raw, math, isBlock });
  }
  return matches;
}

const machTs = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8');
const jsCode = ts.transpileModule(machTs, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const mod = { exports: {} };
new Function('module', 'exports', 'require', jsCode)(mod, mod.exports, require);
const treeData = mod.exports.TREE_DATA;

let totalFormulas = 0;
let errors = [];

function checkObject(obj, path = '') {
  if (!obj) return;
  if (typeof obj === 'string') {
    const formulas = extractMath(obj);
    totalFormulas += formulas.length;
    for (const f of formulas) {
      try {
        katex.renderToString(f.math, { displayMode: f.isBlock, throwOnError: true });
      } catch (e) {
        errors.push({ path, formula: f.raw, error: e.message });
      }
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, idx) => checkObject(item, `${path}[${idx}]`));
  } else if (typeof obj === 'object') {
    for (const k in obj) {
      checkObject(obj[k], `${path}.${k}`);
    }
  }
}

checkObject(treeData, 'TREE_DATA');

console.log(`Evaluated machData (TREE_DATA): scanned ${totalFormulas} formulas.`);
console.log(`Errors found: ${errors.length}`);
errors.forEach(e => console.log(`[${e.path}] ${e.formula} -> ${e.error}`));
