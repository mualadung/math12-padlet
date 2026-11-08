/**
 * TDD TEST SUITE: FRESHNESS 2025-2026 & GOOGLE 1-CLICK SEARCH INTEGRITY
 * 
 * Seams under test:
 * 1. Freshness Ratio: >= 50% questions must be authentic real exams from 2025 or 2026.
 * 2. 1-Click Google Search URL: 100% questions must generate valid, clean, search-ready Google URLs.
 * 
 * Target: RED before implementation, GREEN after adding 2025-2026 real-exam questions.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function generateGoogleSearchUrl(content, sourceExam) {
  if (!content || !sourceExam) return null;
  const cleanSnippet = content
    .replace(/\$\$[\s\S]*?\$\$/g, '')
    .replace(/\$[^\$]+?\$/g, '')
    .replace(/[^\w\s\u00C0-\u1EF9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 85);
  const cleanSource = sourceExam.replace(/[\[\]]/g, '');
  if (cleanSnippet.length < 20) return null;
  const query = `"${cleanSnippet}" ${cleanSource}`;
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

async function runTddTests() {
  console.log('================================================================================');
  console.log('              TDD TEST HARNESS: FRESHNESS 2025-2026 & SEARCH URLS               ');
  console.log('================================================================================\n');

  const questions = await prisma.question.findMany({
    include: { category: true },
  });

  console.log(`Đang kiểm tra ${questions.length} câu hỏi trong cơ sở dữ liệu...`);

  // --- TEST SEAM 1: FRESHNESS 2025-2026 RATIO (>= 50%) ---
  let count2025_2026 = 0;
  const nonFreshQuestions = [];

  for (const q of questions) {
    const is2025_2026 = /\b(2025|2026)\b/.test(q.sourceExam);
    if (is2025_2026) {
      count2025_2026++;
    } else {
      nonFreshQuestions.push({ code: q.code, source: q.sourceExam });
    }
  }

  const freshnessRatio = Number(((count2025_2026 / questions.length) * 100).toFixed(1));
  console.log(`- Số câu hỏi 2025 - 2026: ${count2025_2026} / ${questions.length} (${freshnessRatio}%)`);

  let seam1Passed = false;
  if (freshnessRatio >= 50.0) {
    console.log(`✓ TEST SEAM 1 PASSED: Tỷ lệ đề thi 2025-2026 đạt ${freshnessRatio}% (Yêu cầu >= 50%)`);
    seam1Passed = true;
  } else {
    console.error(`✗ TEST SEAM 1 FAILED: Tỷ lệ đề thi 2025-2026 hiện chỉ đạt ${freshnessRatio}% < 50%! Cần bổ sung câu hỏi 2025-2026.`);
  }

  // --- TEST SEAM 2: 1-CLICK SEARCH URL INTEGRITY ---
  let urlFailures = 0;
  for (const q of questions) {
    const url = generateGoogleSearchUrl(q.content, q.sourceExam);
    if (!url || !url.startsWith('https://www.google.com/search?q=') || url.includes('undefined') || url.includes('[object')) {
      urlFailures++;
      console.error(`✗ Lỗi tạo URL tra cứu cho câu ${q.code}: ${url}`);
    }
  }

  let seam2Passed = false;
  if (urlFailures === 0) {
    console.log(`✓ TEST SEAM 2 PASSED: 100% câu hỏi (${questions.length}/${questions.length}) đều tạo được URL Google Search hợp lệ.`);
    seam2Passed = true;
  } else {
    console.error(`✗ TEST SEAM 2 FAILED: Phát hiện ${urlFailures} URL không hợp lệ.`);
  }

  console.log('\n================================================================================');
  if (seam1Passed && seam2Passed) {
    console.log(' >>> TDD RESULT: ALL TESTS GREEN (PASS) <<< ');
    process.exit(0);
  } else {
    console.log(' >>> TDD RESULT: RED PHASE DETECTED (EXPECTED FAIL) - PROCEED TO IMPLEMENTATION <<< ');
    process.exit(1);
  }
}

runTddTests()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
