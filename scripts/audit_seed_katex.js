const fs = require('fs');
const ts = require('typescript');
const katex = require('katex');

const filePath = 'prisma/seed.js';
const content = fs.readFileSync(filePath, 'utf8');
const sf = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);

let totalFormulas = 0;
let errors = [];
let warnings = [];

function checkText(text, pos) {
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    totalFormulas++;
    const raw = m[0];
    const isBlock = raw.startsWith('$$');
    const math = isBlock ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim();

    try {
      katex.renderToString(math, {
        displayMode: isBlock,
        throwOnError: true,
        strict: (errorCode, errorMsg) => {
          warnings.push({ pos, formula: raw, errorCode, errorMsg });
          return 'warn';
        }
      });
    } catch (e) {
      errors.push({ pos, formula: raw, error: e.message });
    }
  }
}

function visit(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    checkText(node.text, node.getStart(sf));
  }
  ts.forEachChild(node, visit);
}

visit(sf);

console.log('=== prisma/seed.js KaTeX Strict Audit ===');
console.log('Total formulas found in AST string literals:', totalFormulas);
console.log('Errors:', errors.length);
console.log('Warnings:', warnings.length);

if (errors.length > 0) {
  console.log('Errors details:', errors);
}
if (warnings.length > 0) {
  console.log('Warnings details:', warnings);
}
