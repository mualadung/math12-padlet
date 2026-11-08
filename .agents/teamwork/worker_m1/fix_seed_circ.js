const fs = require('fs');

let seed = fs.readFileSync('prisma/seed.js', 'utf8');

// Fix line 180 (KnowledgeItem 7)
seed = seed.replace(
  'Góc giữa 2 vectơ nằm trong đoạn $[^{\\circ}; ^{\\circ}]$ (có thể tù), trong khi góc giữa 2 đường thẳng luôn nằm trong đoạn $[^{\\circ}; ^{\\circ}]$.',
  'Góc giữa 2 vectơ nằm trong đoạn $[0^{\\circ}; 180^{\\circ}]$ (có thể tù), trong khi góc giữa 2 đường thẳng luôn nằm trong đoạn $[0^{\\circ}; 90^{\\circ}]$.'
);

// Fix line 274 (Category DANG_5)
seed = seed.replace(
  '($^{\\circ} \\le \\text{góc} \\le ^{\\circ}$)',
  '(0^{\\circ} \\le \\text{góc} \\le 180^{\\circ})'
);

// Fix line 276 (Category DANG_5)
seed = seed.replace(
  'Nhầm lẫn giữa góc giữa 2 vectơ (có thể tù $> ^{\\circ}$) và góc giữa 2 đường thẳng (luôn $\\le ^{\\circ}$)',
  'Nhầm lẫn giữa góc giữa 2 vectơ (có thể tù $> 90^{\\circ}$) và góc giữa 2 đường thẳng (luôn $\\le 90^{\\circ}$)'
);

// Fix line 620-622 (Q18_D5_MC)
seed = seed.replace(
  'chính là góc $\\widehat{BAC} = ^{\\circ}$.',
  'chính là góc $\\widehat{BAC} = 60^{\\circ}$.'
);
seedCode = seed.replace(
  '\\cos ^{\\circ} = a^2 \\cdot \\frac{1}{2}',
  '\\cos 60^{\\circ} = a^2 \\cdot \\frac{1}{2}'
);
seed = seed.replace(
  '\\cos(^{\\circ}) = 0.5',
  '\\cos(60^{\\circ}) = 0.5'
);
seed = seed.replace(
  '\\cos ^{\\circ} = \\frac{\\sqrt{3}}{2} (nhầm với $\\sin ^{\\circ}$)',
  '\\cos 60^{\\circ} = \\frac{\\sqrt{3}}{2} (nhầm với $\\sin 60^{\\circ}$)'
);

// Fix line 672-674 (Q21_D6_MC)
seed = seed.replace(
  'optionsJson: JSON.stringify(["A. $^{\\circ}$", "B. $^{\\circ}$", "C. $^{\\circ}$", "D. $^{\\circ}$"])',
  'optionsJson: JSON.stringify(["A. $60^{\\circ}$", "B. $90^{\\circ}$", "C. $45^{\\circ}$", "D. $120^{\\circ}$"])'
);
seed = seed.replace(
  'Do đó: $(\\vec{u}, \\vec{v}) = ^{\\circ}.',
  'Do đó: $(\\vec{u}, \\vec{v}) = 60^{\\circ}.'
);

// Also check line 200: make sure KnowledgeItem 9 has no \v
seed = seed.replace(
  'Tích có hướng $[\\vec{u}, \\vec{v}]',
  'Tích có hướng [\\vec{u}, \\vec{v}]'
);

fs.writeFileSync('prisma/seed.js', seed, 'utf8');
console.log('Successfully fixed seed.js angles');
