const fs = require('fs');

// We can evaluate Em by mocking the helper functions
const mockCode = `
let Cm = 0;
const I = (title, ...content) => ({ id: 'i' + (++Cm), title, content });
const wm = (title, ...children) => ({ id: 'n' + (++Cm), title, children });
const Tm = (id, title, subtitle, color, number, children) => ({ id, title, subtitle, color, number, children });

let Em;
${fs.readFileSync('scripts/lovable_em_all.js', 'utf8')}
module.exports = Em;
`;

fs.writeFileSync('scripts/eval_em.js', mockCode);

try {
  const Em = require('./eval_em.js');
  console.log('Successfully parsed Em! Branches count:', Em.length);
  Em.forEach((b, i) => {
    console.log(`${i+1}. [${b.number}] ${b.title} (${b.id}) - Children: ${b.children.length}`);
  });
  fs.writeFileSync('scripts/lovable_em.json', JSON.stringify(Em, null, 2));
  console.log('Wrote scripts/lovable_em.json!');
} catch (e) {
  console.error('Error evaluating Em:', e.message);
}
