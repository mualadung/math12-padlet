const fs = require('fs');

// Read test_knowledge_items.js content
const kiContent = fs.readFileSync('.agents/teamwork/explorer_m1_conditions/test_knowledge_items.js', 'utf8');
const kiMatch = kiContent.match(/const knowledgeItems10 = (\[[\s\S]*?\]);/);
if (!kiMatch) throw new Error('Could not extract knowledgeItems10');
const knowledgeItems = eval(kiMatch[1]);

// Read test_categories.js content
const catContent = fs.readFileSync('.agents/teamwork/explorer_m1_conditions/test_categories.js', 'utf8');
const catMatch = catContent.match(/const categories7 = (\[[\s\S]*?\]);/);
if (!catMatch) throw new Error('Could not extract categories7');
const categories = eval(catMatch[1]);

// Read prisma/seed.js
let seedCode = fs.readFileSync('prisma/seed.js', 'utf8');

// Replace knowledgeItems array
const kiRegex = /const knowledgeItems = \[[\s\S]*?\];/;
const newKiStr = 'const knowledgeItems = ' + JSON.stringify(knowledgeItems, null, 4) + ';';
if (!kiRegex.test(seedCode)) throw new Error('Could not find knowledgeItems in seed.js');
seedCode = seedCode.replace(kiRegex, newKiStr);

// Replace categories array
const catRegex = /const categories = \[[\s\S]*?\];/;
const newCatStr = 'const categories = ' + JSON.stringify(categories, null, 4) + ';';
if (!catRegex.test(seedCode)) throw new Error('Could not find categories in seed.js');
seedCode = seedCode.replace(catRegex, newCatStr);

// Fix Q18_D5_MC
seedCode = seedCode.replace(
  'Góc giữa hai vectơ $\\vec{AB}$ và $\\vec{AC}$ chính là góc $\\widehat{BAC} = 60^\\circ$.',
  'Góc giữa hai vectơ $\\vec{AB}$ và $\\vec{AC}$ chính là góc $\\widehat{BAC} = 60^{\\circ}$.'
);
seedCode = seedCode.replace(
  'a \\cdot a \\cdot \\cos 60^\\circ = a^2 \\cdot \\frac{1}{2}',
  'a \\cdot a \\cdot \\cos 60^{\\circ} = a^2 \\cdot \\frac{1}{2}'
);
seedCode = seedCode.replace(
  '\\cos(60^\\circ) = 0.5',
  '\\cos(60^{\\circ}) = 0.5'
);
seedCode = seedCode.replace(
  '\\cos 60^\\circ = \\frac{\\sqrt{3}}{2}',
  '\\cos 60^{\\circ} = \\frac{\\sqrt{3}}{2}'
);
seedCode = seedCode.replace(
  '\\sin 60^\\circ',
  '\\sin 60^{\\circ}'
);

// Fix Q21_D6_MC
seedCode = seedCode.replace(
  'optionsJson: JSON.stringify(["A. $60^\\circ$", "B. $90^\\circ$", "C. $45^\\circ$", "D. $120^\\circ"]),',
  'optionsJson: JSON.stringify(["A. $60^{\\circ}$", "B. $90^{\\circ}$", "C. $45^{\\circ}$", "D. $120^{\\circ}$"]),'
);
seedCode = seedCode.replace(
  '(\\vec{u}, \\vec{v}) = 60^\\circ.',
  '(\\vec{u}, \\vec{v}) = 60^{\\circ}.'
);

fs.writeFileSync('prisma/seed.js', seedCode, 'utf8');
console.log('Successfully updated prisma/seed.js');
