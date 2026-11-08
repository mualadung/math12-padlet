const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ts = require('typescript');

const code = fs.readFileSync('src/app/mindmap/mindmapQuestions.ts', 'utf8');
const transpiled = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const mod = { exports: {} };
new Function('exports', 'module', 'require', transpiled)(mod.exports, mod, require);
const mm = mod.exports.REAL_QUESTIONS_BANK;

async function deepAudit() {
  const db = await prisma.question.findMany();
  const mmList = [];
  for (const [t, list] of Object.entries(mm)) {
    for (const q of list) mmList.push({...q, topic: t});
  }

  console.log('=== DEEP AUDIT OF ALL 50 MINDMAP QUESTIONS VS 55 DB QUESTIONS ===');
  
  const trueDuplicates = [];

  for (const m of mmList) {
    for (const d of db) {
      // 1. Same exact source citation
      const mSrc = (m.source || '').toLowerCase().replace(/\[nguồn:\s*|\]/g, '').trim();
      const dSrc = (d.sourceExam || '').toLowerCase().replace(/\[nguồn:\s*|\]/g, '').trim();
      
      // Extract exam details: year, exam name, question number
      const mYear = (mSrc.match(/202[0-6]/) || [''])[0];
      const dYear = (dSrc.match(/202[0-6]/) || [''])[0];
      
      const mQNum = (mSrc.match(/câu\s*(\d+)/i) || [''])[1];
      const dQNum = (dSrc.match(/câu\s*(\d+)/i) || [''])[1];
      
      const mCodeNum = (mSrc.match(/mã\s*đề\s*(\d+)/i) || [''])[1];
      const dCodeNum = (dSrc.match(/mã\s*đề\s*(\d+)/i) || [''])[1];

      const sameSourceSpecific = mYear && dYear && mYear === dYear && mQNum && dQNum && mQNum === dQNum && (!mCodeNum || !dCodeNum || mCodeNum === dCodeNum);

      // Check mathematical core overlap
      const mFormulas = (m.content.match(/\$[^\$]+\$/g) || []).map(f => f.trim().toLowerCase());
      const dFormulas = (d.content.match(/\$[^\$]+\$/g) || []).map(f => f.trim().toLowerCase());
      const commonFormulas = mFormulas.filter(f => dFormulas.includes(f) && f.length > 5);

      // Options matching
      let sameOptions = false;
      if (m.options && d.optionsJson) {
        try {
          const dOpts = JSON.parse(d.optionsJson);
          if (Array.isArray(dOpts) && Array.isArray(m.options)) {
            const mCleanOpts = m.options.map(o => o.replace(/^[A-D]\.\s*/, '').trim()).sort().join('|');
            const dCleanOpts = dOpts.map(o => o.replace(/^[A-D]\.\s*/, '').trim()).sort().join('|');
            if (mCleanOpts.length > 10 && mCleanOpts === dCleanOpts) sameOptions = true;
          }
        } catch (e) {}
      }

      if ((sameSourceSpecific && (sameOptions || commonFormulas.length > 0)) || (sameOptions && commonFormulas.length > 0)) {
        trueDuplicates.push({
          mmId: m.id,
          mmTopic: m.topic,
          mmSource: m.source,
          mmContent: m.content,
          mmOptions: m.options,
          mmAnswer: m.correctAnswer,
          dbCode: d.code,
          dbCat: d.categoryId,
          dbSource: d.sourceExam,
          dbContent: d.content,
          dbOptions: d.optionsJson,
          dbAnswer: d.correctAnswer,
          reason: `sameSourceSpecific=${sameSourceSpecific}, sameOptions=${sameOptions}, commonFormulas=${JSON.stringify(commonFormulas)}`
        });
      }
    }
  }

  console.log(`\nFound ${trueDuplicates.length} CONFIRMED DUPLICATE(S):`);
  trueDuplicates.forEach((dup, idx) => {
    console.log(`\n--- DUPLICATE #${idx + 1} ---`);
    console.log(`MM Question: ${dup.mmId} (${dup.mmTopic})`);
    console.log(`   Source: ${dup.mmSource}`);
    console.log(`   Content: ${dup.mmContent}`);
    console.log(`   Options: ${JSON.stringify(dup.mmOptions)}`);
    console.log(`   Answer: ${dup.mmAnswer}`);
    console.log(`DB Question: ${dup.dbCode}`);
    console.log(`   Source: ${dup.dbSource}`);
    console.log(`   Content: ${dup.dbContent}`);
    console.log(`   Options: ${dup.dbOptions}`);
    console.log(`   Answer: ${dup.dbAnswer}`);
    console.log(`   Reason: ${dup.reason}`);
  });
}

deepAudit().finally(() => prisma.$disconnect());
