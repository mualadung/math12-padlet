const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ts = require('typescript');

const q1 = {
  id: "Q14_T3",
  code: "Q14-2017",
  source: "[Nguồn: Đề thi minh họa THPT Quốc gia Bộ GD&ĐT 2017 - Câu 22]",
  difficulty: "VD",
  type: "MULTIPLE_CHOICE",
  content: "Cho một tấm nhôm hình vuông cạnh $12\\text{ cm}$. Người ta cắt ở bốn góc của tấm nhôm đó bốn hình vuông bằng nhau, mỗi hình vuông có cạnh bằng $x\\text{ (cm)}$, rồi gập tấm nhôm lại để được một cái hộp không nắp có dạng hình hộp chữ nhật. Tìm $x$ để thể tích của khối hộp nhận được là lớn nhất.",
  options: ["A. $x = 6$", "B. $x = 4$", "C. $x = 3$", "D. $x = 2$"],
  correctAnswer: "D"
};

const q2 = {
  id: "Q14_T3",
  code: "Q14-2024",
  source: "[Nguồn: Đề thi thử Tốt nghiệp THPT 2024 Trường Chuyên Lam Sơn - Thanh Hóa - Phần Vận dụng]",
  difficulty: "VD",
  type: "MULTIPLE_CHOICE",
  content: "Một người nông dân nuôi tôm ước tính lợi nhuận thu hoạch sau $t$ tháng theo hàm số $P(t) = -t^3 + 3t^2 + 45t - 20$ (triệu đồng) với $t \\in [1; 8]$. Người nông dân nên thu hoạch vào cuối tháng thứ mấy để đạt lợi nhuận tối đa?",
  options: ["A. Tháng 3", "B. Tháng 5", "C. Tháng 7", "D. Tháng 8"],
  correctAnswer: "B"
};

async function checkDuplicates() {
  const db = await prisma.question.findMany();
  console.log(`Checking vs ${db.length} DB questions...`);

  function compare(candidate, name) {
    console.log(`\n=== Checking ${name} ===`);
    let collisions = 0;
    const cTokens = new Set(candidate.content.toLowerCase().split(/\s+/));
    for (const d of db) {
      // 1. Text similarity
      const dTokens = new Set(d.content.toLowerCase().split(/\s+/));
      const intersection = [...cTokens].filter(t => dTokens.has(t));
      const union = new Set([...cTokens, ...dTokens]);
      const jaccard = intersection.length / union.size;

      // 2. Exact substring match > 30 chars
      const normC = candidate.content.replace(/\s+/g, ' ').toLowerCase();
      const normD = d.content.replace(/\s+/g, ' ').toLowerCase();
      const hasSub = normC.length > 30 && normD.includes(normC.slice(0, 30));

      // 3. Mathematical formula match
      const cFormulas = (candidate.content.match(/\$[^\$]+\$/g) || []).map(f => f.trim().toLowerCase());
      const dFormulas = (d.content.match(/\$[^\$]+\$/g) || []).map(f => f.trim().toLowerCase());
      const commonF = cFormulas.filter(f => dFormulas.includes(f) && f.length > 5);

      if (jaccard > 0.4 || hasSub || commonF.length >= 2) {
        console.log(`Potential collision with ${d.code} (${d.sourceExam}): Jaccard=${jaccard.toFixed(2)}, Substring=${hasSub}, CommonFormulas=${JSON.stringify(commonF)}`);
        collisions++;
      }
    }
    console.log(`${name}: ${collisions} potential collisions detected.`);
  }

  compare(q1, 'Option 1 (Box volume 12cm)');
  compare(q2, 'Option 2 (Shrimp profit -t^3+3t^2)');
}

checkDuplicates().finally(() => prisma.$disconnect());
