const fs = require('fs');
const types = JSON.parse(fs.readFileSync('.agents/teamwork/explorer_m1_conditions/types_dump.json', 'utf8'));

console.log('=== AUDIT OF 37 MATH TYPES ===\n');

for (const t of types) {
  console.log(`--- [${t.num}] ${t.code} (${t.id}): ${t.title} ---`);
  console.log(`[Topic]: ${t.topic}`);
  console.log(`[Theory]:\n${t.theory}`);
  console.log(`[Signs]:\n${t.signs}`);
  console.log(`[Methods]:\n${t.methods}`);
  console.log(`[Mistakes]:\n${t.mistakes}`);
  console.log('\n');
}
