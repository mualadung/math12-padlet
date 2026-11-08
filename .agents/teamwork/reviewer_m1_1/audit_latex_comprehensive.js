const fs = require('fs');
const ts = require('typescript');

function loadTsModule(relativePath) {
  const code = fs.readFileSync(relativePath, 'utf8');
  const transpiled = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} };
  const fn = new Function('exports', 'module', transpiled);
  fn(mod.exports, mod);
  return mod.exports;
}

const { TREE_DATA } = loadTsModule('src/app/mindmap/machData.ts');

console.log('=== COMPREHENSIVE LATEX AUDIT OF machData.ts ===');

const texKeywords = [
  'iff', 'implies', 'subset', 'subseteq', 'forall', 'exists',
  'in', 'notin', 'cup', 'cap', 'approx', 'equiv', 'cdot', 'perp',
  'vec', 'frac', 'sqrt', 'times', 'left', 'right', 'begin', 'end'
];

let typoCount = 0;

function auditString(str, context) {
  if (!str || typeof str !== 'string') return;

  // 1. Check for unescaped keywords directly after $ (e.g. $iff, $implies, $frac)
  for (const kw of texKeywords) {
    // Look for $kw followed by space or non-letter
    const regexKw = new RegExp(`\\$${kw}\\b`, 'g');
    let m;
    while ((m = regexKw.exec(str)) !== null) {
      console.log(`[LATEX TYPO] ${context}: Found "$${kw}" (likely missing backslash "\\${kw}"): "...${str.substring(Math.max(0, m.index - 15), Math.min(str.length, m.index + 25))}..."`);
      typoCount++;
    }
  }

  // 2. Check for mismatched $ delimiters
  // Count single $ that are not part of $$
  let clean = str.replace(/\$\$[\s\S]*?\$\$/g, '');
  let countD = 0;
  for (let i = 0; i < clean.length; i++) {
    if (clean[i] === '$') countD++;
  }
  if (countD % 2 !== 0) {
    console.log(`[DELIMITER MISMATCH] ${context}: Odd number of '$' symbols (${countD})`);
  }

  // 3. Extract formulas and check braces
  const mathRegex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
  let match;
  while ((match = mathRegex.exec(str)) !== null) {
    const raw = match[1];
    const inner = raw.startsWith('$$') ? raw.slice(2, -2) : raw.slice(1, -1);
    
    // Check balanced curly braces
    let openB = 0;
    for (let i = 0; i < inner.length; i++) {
      if (inner[i] === '{' && (i === 0 || inner[i-1] !== '\\')) openB++;
      if (inner[i] === '}' && (i === 0 || inner[i-1] !== '\\')) openB--;
      if (openB < 0) {
        console.log(`[UNBALANCED BRACES] ${context}: Closing '}' before '{' in "${raw}"`);
        break;
      }
    }
    if (openB !== 0) {
      console.log(`[UNBALANCED BRACES] ${context}: Unbalanced braces (${openB}) in "${raw}"`);
    }

    // Check Vietnamese accented chars in math mode (outside of \text{})
    const strippedText = inner.replace(/\\text\{[^{}]*\}/g, '');
    const vietnameseAccents = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/i;
    if (vietnameseAccents.test(strippedText)) {
      console.log(`[VIETNAMESE CHAR IN MATH] ${context}: Accented character outside \\text{} in "${raw}"`);
    }
  }
}

// Audit all topics & mathTypes
for (const ch of TREE_DATA.chapters) {
  for (const topic of ch.topics) {
    if (topic.mathTypes) {
      for (const mt of topic.mathTypes) {
        if (mt.details) {
          auditString(mt.details.theory, `${mt.code} theory`);
          auditString(mt.details.signs, `${mt.code} signs`);
          auditString(mt.details.methods, `${mt.code} methods`);
          auditString(mt.details.mistakes, `${mt.code} mistakes`);
          if (mt.details.sampleQuestion) {
            auditString(mt.details.sampleQuestion.content, `${mt.code} sampleQuestion.content`);
            auditString(mt.details.sampleQuestion.answer, `${mt.code} sampleQuestion.answer`);
          }
        }
      }
    }
  }
}

console.log(`Total LaTeX typos detected: ${typoCount}`);
