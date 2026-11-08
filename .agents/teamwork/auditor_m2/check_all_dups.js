const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ts = require('typescript');
const fs = require('fs');

const code = fs.readFileSync('src/app/mindmap/mindmapQuestions.ts', 'utf8');
const transpiled = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const mod = { exports: {} };
new Function('exports', 'module', 'require', transpiled)(mod.exports, mod, require);
const mm = mod.exports.REAL_QUESTIONS_BANK;

async function checkAll() {
  const dbQs = await prisma.question.findMany();
  const mmQs = [];
  for (const [topicKey, list] of Object.entries(mm)) {
    for (const q of list) {
      mmQs.push({ ...q, topicKey });
    }
  }

  console.log(`Comparing ${mmQs.length} MM questions with ${dbQs.length} DB questions...`);
  let dupCount = 0;

  for (const m of mmQs) {
    const mCleanSource = (m.source || '').replace(/^\[Nguồn:\s*|\]$/gi, '').trim().toLowerCase();
    for (const d of dbQs) {
      const dCleanSource = (d.sourceExam || '').replace(/^\[Nguồn:\s*|\]$/gi, '').trim().toLowerCase();
      
      const sourceMatch = mCleanSource === dCleanSource && mCleanSource.length > 5;
      
      let optionsMatch = false;
      if (m.options && d.optionsJson) {
        try {
          const dOpts = JSON.parse(d.optionsJson);
          if (Array.isArray(dOpts) && Array.isArray(m.options) && dOpts.length === m.options.length) {
            const mCleanOpts = m.options.map(o => o.replace(/^[A-D]\.\s*/, '').trim()).sort().join('|');
            const dCleanOpts = dOpts.map(o => o.replace(/^[A-D]\.\s*/, '').trim()).sort().join('|');
            if (mCleanOpts === dCleanOpts) optionsMatch = true;
          }
        } catch (e) {}
      }

      // Check content word overlap / similarity
      const mWords = m.content.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(/\s+/);
      const dWords = d.content.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(/\s+/);
      const mSet = new Set(mWords);
      const dSet = new Set(dWords);
      let common = 0;
      for (const w of mSet) {
        if (dSet.has(w)) common++;
      }
      const jaccard = common / (mSet.size + dSet.size - common);

      if (sourceMatch || optionsMatch || jaccard > 0.7) {
        dupCount++;
        console.log('\n========================================');
        console.log(`[MATCH CANDIDATE ${dupCount}]`);
        console.log(`MM Question: ${m.id} (${m.code}) - Topic: ${m.topicKey}`);
        console.log(`   Source: ${m.source}`);
        console.log(`   Content: ${m.content}`);
        console.log(`   Options: ${JSON.stringify(m.options)}`);
        console.log(`   Answer: ${m.correctAnswer}`);
        console.log(`DB Question: ${d.code} - Category: ${d.categoryId}`);
        console.log(`   Source: ${d.sourceExam}`);
        console.log(`   Content: ${d.content}`);
        console.log(`   Options: ${d.optionsJson}`);
        console.log(`   Answer: ${d.correctAnswer}`);
        console.log(`   Metrics -> sourceMatch: ${sourceMatch}, optionsMatch: ${optionsMatch}, jaccard: ${jaccard.toFixed(3)}`);
      }
    }
  }

  console.log(`\nTotal candidates: ${dupCount}`);
}

checkAll().finally(() => prisma.$disconnect());
