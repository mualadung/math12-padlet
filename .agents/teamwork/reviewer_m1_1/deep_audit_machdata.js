const path = require('path');
const fs = require('fs');
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

const { TREE_DATA } = loadTsModule('src/app/mindmap/machData.ts');

console.log('=== DEEP DIVE: 37 TYPES IN machData.ts ===');
console.log('Total Chapters in TREE_DATA:', TREE_DATA.chapters.length);

let totalTypes = 0;
const typesList = [];

for (const ch of TREE_DATA.chapters) {
  console.log(`\nChapter ${ch.id}: ${ch.title}`);
  for (const topic of ch.topics) {
    console.log(`  Topic ${topic.id}: ${topic.title}`);
    if (topic.mathTypes) {
      for (const mt of topic.mathTypes) {
        totalTypes++;
        typesList.push({
          chapter: ch.id,
          topic: topic.id,
          id: mt.id,
          code: mt.code,
          title: mt.title,
          difficulty: mt.difficulty,
          hasDetails: !!mt.details,
          theory: mt.details?.theory || '',
          signs: mt.details?.signs || '',
          methods: mt.details?.methods || '',
          mistakes: mt.details?.mistakes || '',
          sampleQuestion: mt.details?.sampleQuestion
        });
      }
    }
  }
}

console.log(`\nTotal Math Types discovered: ${totalTypes}`);

// Check pedagogical structure completeness
let missingFields = 0;
let missingSample = 0;
let missingCasioInSample = 0;

for (const t of typesList) {
  if (!t.theory || !t.signs || !t.methods || !t.mistakes) {
    console.log(`[ALERT] Incomplete pedagogical fields in ${t.code} (${t.title})`);
    missingFields++;
  }
  if (!t.sampleQuestion) {
    console.log(`[ALERT] Missing sample question in ${t.code}`);
    missingSample++;
  } else if (!t.sampleQuestion.casio) {
    missingCasioInSample++;
  }
}

console.log(`Types with missing core pedagogical fields: ${missingFields}`);
console.log(`Types with missing sample questions: ${missingSample}`);
console.log(`Sample questions without Casio guide: ${missingCasioInSample}`);

// Now let's audit mathematical conditions per topic/type
console.log('\n=== AUDITING DOMAIN CONDITIONS PER LESSON/TYPE ===');

for (const t of typesList) {
  const text = `${t.theory} ${t.signs} ${t.methods} ${t.mistakes}`;
  const issues = [];

  // Check 1: If rational function, does it specify denominator != 0?
  if (t.title.includes('phân thức') || text.includes('cx+d') || text.includes('px+q')) {
    if (!text.includes('\\ne') && !text.includes('\\neq') && !text.includes('khác 0')) {
      issues.push('Phân thức nhưng thiếu điều kiện mẫu khác 0');
    }
  }

  // Check 2: If square root, does it specify non-negative?
  if (text.includes('\\sqrt') && !text.includes('\\ge 0') && !text.includes('\\geq 0') && !text.includes('không âm') && !text.includes('> 0')) {
    issues.push('Chứa căn thức nhưng có thể thiếu điều kiện xác định căn');
  }

  // Check 3: If vector angle or division, non-zero vectors?
  if (t.title.includes('Góc') && text.includes('\\cos') && !text.includes('\\ne') && !text.includes('> 0')) {
    issues.push('Góc giữa 2 vectơ nhưng thiếu điều kiện độ dài khác 0 / vectơ khác 0');
  }

  // Check 4: If sphere equation, radius condition R^2 = a^2+b^2+c^2 - d > 0?
  if (t.title.includes('mặt cầu') || text.includes('mặt cầu')) {
    if (!text.includes('a^2+b^2+c^2-d > 0') && !text.includes('R > 0') && !text.includes('a^2 + b^2 + c^2 - d > 0')) {
      issues.push('Mặt cầu thiếu điều kiện bán kính dương a^2+b^2+c^2-d > 0');
    }
  }

  if (issues.length > 0) {
    console.log(`[RIGOR AUDIT] Type ${t.code} (${t.title}):`);
    issues.forEach(i => console.log(`   - ${i}`));
  }
}
console.log('\nDetailed check of all 37 types completed successfully.');

// Print summary breakdown of types
console.log('\n=== BREAKDOWN OF 37 TYPES ===');
typesList.forEach((t, i) => {
  console.log(`${(i+1).toString().padStart(2, ' ')}. [${t.code}] (${t.difficulty || 'TH'}) ${t.title}`);
});
