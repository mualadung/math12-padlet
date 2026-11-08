const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('=== DIRECT SQLITE DB VERIFICATION ===');
  
  // 1. Verify Q38_D4_SA
  const q38 = await prisma.question.findUnique({ where: { code: 'Q38_D4_SA' } });
  if (!q38) {
    throw new Error('Q38_D4_SA missing from dev.db!');
  }
  
  console.log('[Check 1] Q38_D4_SA exists in DB: PASS');
  console.log('  - explanation includes text{CĐ}:', q38.explanation.includes('text{CĐ}'));
  console.log('  - explanation includes text{CT}:', q38.explanation.includes('text{CT}'));
  console.log('  - distractorAnalysis includes text{CĐ}:', q38.distractorAnalysis.includes('text{CĐ}'));
  console.log('  - distractorAnalysis includes text{CT}:', q38.distractorAnalysis.includes('text{CT}'));
  
  const rawCDRegex = /y_\{?CĐ\}?/;
  const hasRawCD = rawCDRegex.test(q38.explanation.replace(/\\text\{CĐ\}/g, ''));
  console.log('  - raw unescaped y_{CĐ} in explanation:', hasRawCD);

  // 2. Scan entire Question table for any remaining raw unescaped CĐ or invalid control characters
  const allQuestions = await prisma.question.findMany();
  console.log(`[Check 2] Scanning all ${allQuestions.length} questions in DB...`);
  
  let unescapedCDCount = 0;
  let unescapedIffCount = 0;
  let unescapedMinCount = 0;
  let controlCharCount = 0;

  for (const q of allQuestions) {
    const text = `${q.content} ${q.explanation} ${q.distractorAnalysis || ''} ${q.optionsJson || ''}`;
    
    // Check for raw unescaped CĐ in math mode
    const mathMatches = text.match(/\$[^\$]+\$/g) || [];
    for (const m of mathMatches) {
      if (m.includes('CĐ') && !m.includes('\\text{CĐ}')) {
        console.log(`  FAIL: Found raw CĐ in math mode in ${q.code}: ${m}`);
        unescapedCDCount++;
      }
      if (/\$iff\b/.test(m) || /\siff\s/.test(m)) {
        console.log(`  FAIL: Found unescaped iff in ${q.code}: ${m}`);
        unescapedIffCount++;
      }
      if (/\$min\$/.test(m)) {
        console.log(`  FAIL: Found unescaped min in ${q.code}: ${m}`);
        unescapedMinCount++;
      }
    }

    // Check for control characters (0x00-0x08, 0x0B, 0x0C, 0x0E-0x1F)
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if ((code >= 0x00 && code <= 0x08) || code === 0x0B || code === 0x0C || (code >= 0x0E && code <= 0x1F)) {
        console.log(`  FAIL: Control char 0x${code.toString(16)} in ${q.code}`);
        controlCharCount++;
      }
    }
  }

  console.log(`  - Questions with unescaped CĐ: ${unescapedCDCount}`);
  console.log(`  - Questions with unescaped iff: ${unescapedIffCount}`);
  console.log(`  - Questions with unescaped min: ${unescapedMinCount}`);
  console.log(`  - Questions with illegal control characters: ${controlCharCount}`);

  // 3. Scan KnowledgeItem table
  const allKnowledge = await prisma.knowledgeItem.findMany();
  console.log(`[Check 3] Scanning all ${allKnowledge.length} KnowledgeItems in DB...`);
  let kControlCharCount = 0;
  for (const k of allKnowledge) {
    const text = `${k.title} ${k.content} ${k.notes || ''}`;
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if ((code >= 0x00 && code <= 0x08) || code === 0x0B || code === 0x0C || (code >= 0x0E && code <= 0x1F)) {
        console.log(`  FAIL: Control char in knowledge ${k.id}`);
        kControlCharCount++;
      }
    }
  }
  console.log(`  - KnowledgeItems with control characters: ${kControlCharCount}`);

  // 4. Scan MathCategory table
  const allCats = await prisma.mathCategory.findMany();
  console.log(`[Check 4] Scanning all ${allCats.length} MathCategories in DB...`);
  let catControlCharCount = 0;
  for (const c of allCats) {
    const text = `${c.title} ${c.identifySigns} ${c.coreKnowledge} ${c.methodSteps} ${c.commonMistakes}`;
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if ((code >= 0x00 && code <= 0x08) || code === 0x0B || code === 0x0C || (code >= 0x0E && code <= 0x1F)) {
        console.log(`  FAIL: Control char in category ${c.code}`);
        catControlCharCount++;
      }
    }
  }
  console.log(`  - MathCategories with control characters: ${catControlCharCount}`);

  const totalViolations = unescapedCDCount + unescapedIffCount + unescapedMinCount + controlCharCount + kControlCharCount + catControlCharCount;
  console.log(`\nTOTAL DATABASE INTEGRITY VIOLATIONS: ${totalViolations}`);
  if (totalViolations > 0) {
    process.exit(1);
  } else {
    console.log('DATABASE FORENSIC CHECK: PASS CLEAN\n');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
