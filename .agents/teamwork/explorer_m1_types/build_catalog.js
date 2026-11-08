const fs = require('fs');
const path = require('path');

const detailed = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'detailed_analysis.json'), 'utf8')
);

// Group by Lesson (Bai 1 -> Bai 8)
const lessonMapping = [
  { lessonNum: 'Bài 1', lessonName: 'Tính đơn điệu và cực trị của hàm số', topics: ['TOPIC_1_1', 'TOPIC_1_2'], catCode: 'DANG_1' },
  { lessonNum: 'Bài 2', lessonName: 'Giá trị lớn nhất và giá trị nhỏ nhất của hàm số', topics: ['TOPIC_1_3'], catCode: 'DANG_2' },
  { lessonNum: 'Bài 3', lessonName: 'Đường tiệm cận của đồ thị hàm số', topics: ['TOPIC_1_4'], catCode: 'DANG_3' },
  { lessonNum: 'Bài 4', lessonName: 'Khảo sát sự biến thiên và vẽ đồ thị của hàm số', topics: ['TOPIC_1_5'], catCode: 'DANG_4' },
  { lessonNum: 'Bài 5', lessonName: 'Ứng dụng đạo hàm giải bài toán tối ưu thực tiễn', topics: ['TOPIC_1_6'], catCode: 'DANG_2' },
  { lessonNum: 'Bài 6', lessonName: 'Vectơ trong không gian', topics: ['TOPIC_2_1'], catCode: 'DANG_5' },
  { lessonNum: 'Bài 7', lessonName: 'Hệ trục tọa độ trong không gian', topics: ['TOPIC_2_2'], catCode: 'DANG_6' },
  { lessonNum: 'Bài 8', lessonName: 'Biểu thức tọa độ của các phép toán vectơ', topics: ['TOPIC_2_3'], catCode: 'DANG_6' },
  { lessonNum: 'Liên chương', lessonName: 'Tọa độ hóa Oxyz giải bài toán cực trị không gian thực tế', topics: ['TOPIC_3_1'], catCode: 'DANG_7' }
];

console.log('=== COMPLETE 37 MATH TYPES MAPPING ACROSS BÀI 1 -> BÀI 8 ===\n');

let index = 0;
const fullCatalog = [];

lessonMapping.forEach(lm => {
  console.log(`\n### ${lm.lessonNum}: ${lm.lessonName} (Prisma: ${lm.catCode})`);
  const typesInLesson = detailed.filter(t => lm.topics.includes(t.topicId));
  console.log(`Số phân dạng: ${typesInLesson.length}`);
  typesInLesson.forEach(t => {
    index++;
    fullCatalog.push({
      globalIndex: index,
      lessonNum: lm.lessonNum,
      lessonName: lm.lessonName,
      macroCatCode: lm.catCode,
      topicId: t.topicId,
      topicTitle: t.topicTitle,
      typeId: t.id,
      typeCode: t.code,
      title: t.title,
      difficulty: t.difficulty,
      theory: t.theory,
      signs: t.signs,
      methods: t.methods,
      mistakes: t.mistakes,
      sampleQuestion: t.sampleQuestion,
    });
    console.log(`  ${index}. [${t.difficulty}] ${t.code} (${t.id}): ${t.title}`);
  });
});

console.log(`\nTotal Catalog Types: ${fullCatalog.length}`);

fs.writeFileSync(
  path.resolve(__dirname, 'full_catalog_37_types.json'),
  JSON.stringify(fullCatalog, null, 2),
  'utf8'
);
