const fs = require('fs');
const path = require('path');
const katex = require('katex');
const { PrismaClient } = require('@prisma/client');

async function main() {
  console.log('=== DETAILED M1 VERIFICATION SCRIPT ===\n');

  // 1. Check prisma/seed.js around line 200
  console.log('--- 1. Check prisma/seed.js:200 ---');
  const seedContent = fs.readFileSync('prisma/seed.js', 'utf8');
  const seedLines = seedContent.split('\n');
  const line200 = seedLines[199]; // 0-indexed
  console.log('Line 200 raw:', line200.trim());
  if (line200.includes('\\\\[\\\\vec{u}') || line200.includes('\\\\vec{u}') || line200.includes('[\\\\vec{u}')) {
    console.log('PASS: line 200 has properly escaped \\\\vec');
  } else {
    console.log('WARN/FAIL: line 200 check:', line200);
  }

  // 2. Check DB row for KnowledgeItem order 9
  console.log('\n--- 2. Check KnowledgeItem in SQLite DB ---');
  const prisma = new PrismaClient();
  try {
    const ki = await prisma.knowledgeItem.findFirst({ where: { order: 9 } });
    if (!ki) {
      console.log('FAIL: KnowledgeItem order 9 not found in DB!');
    } else {
      console.log('Title:', ki.title);
      console.log('FormulaLatex:', ki.formulaLatex);
      console.log('Conditions:', ki.conditions);
      console.log('Notes:', ki.notes);
      
      // Test render notes and formula
      const testMath = (str) => {
        const mathMatches = str.match(/\$([^$]+)\$/g) || [];
        for (const m of mathMatches) {
          const formula = m.slice(1, -1);
          try {
            katex.renderToString(formula, { throwOnError: true });
          } catch (e) {
            console.log(`KaTeX Render Error in "${formula}":`, e.message);
            return false;
          }
        }
        return true;
      };
      const passF = testMath(ki.formulaLatex);
      const passC = testMath(ki.conditions);
      const passN = testMath(ki.notes);
      console.log(`KaTeX verification on KI order 9: Formula=${passF}, Conditions=${passC}, Notes=${passN}`);
    }
  } finally {
    await prisma.$disconnect();
  }

  // 3. Check machData.ts 37 types
  console.log('\n--- 3. Mathematical Rigor & KaTeX for 37 types in machData.ts ---');
  // Load machData.ts
  const machContent = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8');
  
  // Extract TREE_DATA or use regex / parser
  // Let's count types
  const typeMatches = machContent.match(/id:\s*["']MT_([0-9_]+)["']/g) || [];
  console.log(`Found ${typeMatches.length} math types (expected 37).`);

  // Let's analyze all math formulas across machData
  const regexMath = /\$([^\$]+)\$/g;
  let match;
  let totalFormulas = 0;
  let formulaErrors = 0;
  const errorDetails = [];

  while ((match = regexMath.exec(machContent)) !== null) {
    totalFormulas++;
    const formula = match[1];
    // KaTeX check
    try {
      katex.renderToString(formula, { throwOnError: true });
    } catch (e) {
      formulaErrors++;
      errorDetails.push({ formula, error: e.message });
    }
  }
  console.log(`Total inline/block math formulas tested in machData.ts: ${totalFormulas}`);
  console.log(`Total KaTeX render errors: ${formulaErrors}`);
  if (formulaErrors > 0) {
    console.log('Errors sample:', errorDetails.slice(0, 5));
  }

  // 4. Verify domain conditions and mathematical rigor across topics and types
  console.log('\n--- 4. Verification of Domain Conditions & Rigor across 37 types ---');
  // Check conditions coverage in machData.ts:
  const checks = [
    { name: 'Tập xác định D ($D = ...$ or $D \\ne$ or $D = \\mathbb{R}$)', regex: /D\s*=\s*|Tập xác định/i },
    { name: 'Điều kiện mẫu thức khác 0 (\\ne 0 or \\neq 0)', regex: /\\ne\s*0|\\neq\s*0/ },
    { name: 'Điều kiện căn thức không âm (\\ge 0 or \\geq 0)', regex: /\\ge\s*0|\\geq\s*0/ },
    { name: 'Vectơ khác vectơ-không (\\vec{.*}\\s*\\ne\\s*\\vec{0})', regex: /\\vec\{[^}]+\}\s*\\ne\s*\\vec\{0\}/ },
    { name: 'Điều kiện tích vô hướng vuông góc (= 0)', regex: /\\cdot\s*\\vec\{[^}]+\}\s*=\s*0/ },
    { name: 'Điều kiện mặt cầu (R > 0 or a^2+b^2+c^2-d > 0)', regex: /a\^2\s*\+\s*b\^2\s*\+\s*c\^2\s*-\s*d\s*>\s*0/ },
    { name: 'Định lý Weierstrass / liên tục trên đoạn [a; b]', regex: /liên tục trên đoạn|Weierstrass/i },
    { name: 'Điều kiện phân thức bậc 1/ bậc 1 không suy biến (ad - bc)', regex: /ad\s*-\s*bc\s*\\ne\s*0/ },
    { name: 'Điều kiện phân thức bậc 2/ bậc 1 không suy biến', regex: /aq\^2/ },
    { name: 'Điều kiện tứ diện / 4 điểm không đồng phẳng (thể tích > 0 or tích có hướng . vô hướng != 0)', regex: /V_\{ABCD\}|\\ne\s*0/ }
  ];

  for (const c of checks) {
    const found = c.regex.test(machContent);
    console.log(`[${found ? 'PASS' : 'FAIL'}] ${c.name}: ${found ? 'Found in machData.ts' : 'NOT FOUND'}`);
  }
}

main().catch(console.error);
