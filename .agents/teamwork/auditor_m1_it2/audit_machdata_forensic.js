const fs = require('fs');
const path = require('path');
const katex = require('katex');

const machDataPath = path.resolve(__dirname, '../../../src/app/mindmap/machData.ts');
const machContent = fs.readFileSync(machDataPath, 'utf8');

console.log('=== INDEPENDENT FORENSIC AUDIT OF machData.ts ===');

// Check 1: Unescaped $iff or iff in math mode
const iffMatches = machContent.match(/\$iff\b/g);
console.log('[Check 1] Stray $iff count in machData.ts:', iffMatches ? iffMatches.length : 0);

// Check 2: Unescaped $min$
const minMatches = machContent.match(/\$min\$/g);
console.log('[Check 2] Stray $min$ count in machData.ts:', minMatches ? minMatches.length : 0);

// Check 3: Domain conditions in MT_1_4_1 (Dạng 4.1)
const hasD41Theory = machContent.includes('Q(x) \\\\ne 0') && machContent.includes('D = \\\\{x \\\\in \\\\mathbb{R} \\\\mid Q(x) \\\\ne 0\\\\}');
const hasD41Method = machContent.includes('Tìm tập xác định $D$ (giải điều kiện mẫu thức khác 0: $Q(x) \\\\ne 0');
console.log('[Check 3] MT_1_4_1 Denominator condition in theory:', hasD41Theory);
console.log('[Check 3] MT_1_4_1 Denominator condition in methods:', hasD41Method);

// Check 4: Domain conditions in MT_1_4_3 (Dạng 4.3)
const hasD43Theory = machContent.includes('px + q \\\\ne 0 \\\\iff x \\\\ne -\\\\frac{q}{p}') && machContent.includes('D = \\\\mathbb{R} \\\\setminus \\\\left\\\\{-\\\\frac{q}{p}\\\\right\\\\}');
const hasD43Method = machContent.includes('Tìm tập xác định $D = \\\\mathbb{R} \\\\setminus \\\\left\\\\{-\\\\frac{q}{p}\\\\right\\\\}');
console.log('[Check 4] MT_1_4_3 Denominator condition in theory:', hasD43Theory);
console.log('[Check 4] MT_1_4_3 Denominator condition in methods:', hasD43Method);

// Check 5: Velocity conditions in MT_3_1_1 (Dạng 10.1)
const hasD101Theory = machContent.includes('\\\\vec{v}_1 = (a_1; b_1; c_1) \\\\ne \\\\vec{0}') && machContent.includes('\\\\vec{v}_2 = (a_2; b_2; c_2) \\\\ne \\\\vec{0}');
const hasD101Method = machContent.includes('với các vectơ vận tốc $\\\\vec{v}_1, \\\\vec{v}_2 \\\\ne \\\\vec{0}$');
console.log('[Check 5] MT_3_1_1 Velocity condition in theory:', hasD101Theory);
console.log('[Check 5] MT_3_1_1 Velocity condition in methods:', hasD101Method);

// Check 6: KaTeX strict render of all formulas in machData.ts
const mathRegex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
let match;
let formulaCount = 0;
let parseErrors = [];
let strictWarnings = [];

while ((match = mathRegex.exec(machContent)) !== null) {
  formulaCount++;
  let raw = match[1];
  let formula = raw.startsWith('$$') ? raw.slice(2, -2) : raw.slice(1, -1);

  // In TS files, \\ becomes \ in JS strings. Simulate JS string evaluation:
  let evaluated = formula.replace(/\\\\/g, '\\');

  try {
    katex.renderToString(evaluated, {
      throwOnError: true,
      strict: (errorCode, errorMsg) => {
        strictWarnings.push({ raw, errorCode, errorMsg });
      }
    });
  } catch (err) {
    parseErrors.push({ raw, err: err.message });
  }
}

console.log(`[Check 6] Total math formulas tested in machData.ts: ${formulaCount}`);
console.log(`  - KaTeX parse errors (throwOnError=true): ${parseErrors.length}`);
console.log(`  - KaTeX strict warnings: ${strictWarnings.length}`);

if (parseErrors.length > 0) {
  console.log('Parse errors detail:', parseErrors.slice(0, 5));
}
if (strictWarnings.length > 0) {
  console.log('Strict warnings detail:', strictWarnings.slice(0, 5));
}

const totalFailures = (iffMatches ? iffMatches.length : 0) +
                      (minMatches ? minMatches.length : 0) +
                      (!hasD41Theory ? 1 : 0) +
                      (!hasD41Method ? 1 : 0) +
                      (!hasD43Theory ? 1 : 0) +
                      (!hasD43Method ? 1 : 0) +
                      (!hasD101Theory ? 1 : 0) +
                      (!hasD101Method ? 1 : 0) +
                      parseErrors.length +
                      strictWarnings.length;

console.log(`\nTOTAL machData.ts AUDIT FAILURES: ${totalFailures}`);
if (totalFailures > 0) {
  process.exit(1);
} else {
  console.log('machData.ts FORENSIC CHECK: PASS CLEAN\n');
}
