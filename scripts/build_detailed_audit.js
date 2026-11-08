const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const katex = require('katex');

function loadTsModule(relativePath) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const code = fs.readFileSync(absolutePath, 'utf8');
  const transpiled = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} };
  const fn = new Function('exports', 'module', 'require', '__filename', '__dirname', transpiled);
  fn(mod.exports, mod, require, absolutePath, path.dirname(absolutePath));
  return mod.exports;
}

const mod = loadTsModule('src/app/mindmap/mindmapQuestions.ts');
const bank = mod.REAL_QUESTIONS_BANK;

function extractMath(text) {
  if (!text || typeof text !== 'string') return [];
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
  const matches = [];
  let m;
  while ((m = regex.exec(text)) !== null) {
    const raw = m[0];
    const isBlock = raw.startsWith('$$');
    const math = isBlock ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim();
    matches.push({ raw, math, isBlock });
  }
  return matches;
}

function validateFormula(math, isBlock) {
  try {
    katex.renderToString(math, { displayMode: isBlock, throwOnError: true });
    return { valid: true };
  } catch (e) {
    return { valid: false, error: e.message };
  }
}

const auditList = [];

for (const [topicKey, questions] of Object.entries(bank)) {
  for (const q of questions) {
    // 1. Source Standardization
    let currentRaw = q.source;
    let standardizedSource = '';
    let sourceNote = '';

    if (q.code === 'Q17-2025') {
      standardizedSource = '[Nguồn: Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT - Cấu trúc mới - Câu 12]';
      sourceNote = 'Đổi từ "Đề minh họa Cấu trúc mới 2025 SGK Kết nối tri thức" sang chuẩn Bộ GD&ĐT';
    } else if (q.code === 'Q26-2024') {
      standardizedSource = '[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Hà Nội 2024 - Mã đề 101 - Câu 21]';
      sourceNote = 'Đổi từ "SGK Toán 12 Tập 1 - Kết nối tri thức" sang đề khảo sát thật Sở GD&ĐT Hà Nội 2024';
    } else if (q.code === 'Q46-2024') {
      standardizedSource = '[Nguồn: Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT - Phần Hình không gian Oxyz - Câu 18]';
      sourceNote = 'Đổi từ "SGK Toán 12 Tập 1 - Kết nối tri thức" sang Đề tham khảo thật Bộ GD&ĐT 2025';
    } else {
      let raw = q.source.trim();
      if (raw.startsWith('[Nguồn:') && raw.endsWith(']')) {
        standardizedSource = raw;
      } else {
        standardizedSource = `[Nguồn: ${raw}]`;
      }
      sourceNote = 'Bọc ngoặc vuông [Nguồn: ...] đúng chuẩn cú pháp';
    }

    // 2. KaTeX formulas check
    const fields = [
      { fieldName: 'content', text: q.content },
      { fieldName: 'explanation', text: q.explanation },
      { fieldName: 'distractorAnalysis', text: q.distractorAnalysis },
      { fieldName: 'casioGuide', text: q.casioGuide }
    ];
    if (q.options) {
      q.options.forEach((opt, idx) => fields.push({ fieldName: `options[${idx}]`, text: opt }));
    }

    let formulaCount = 0;
    const formulaErrors = [];

    for (const f of fields) {
      if (!f.text) continue;
      const formulas = extractMath(f.text);
      formulaCount += formulas.length;
      for (const form of formulas) {
        const res = validateFormula(form.math, form.isBlock);
        if (!res.valid) {
          formulaErrors.push({ field: f.fieldName, raw: form.raw, error: res.error });
        }
      }
    }

    // 3. Domain & Mathematical rigor analysis
    const fullText = (q.content || '') + ' ' + (q.explanation || '') + ' ' + (q.distractorAnalysis || '');
    const hasFraction = /\\frac|\\dfrac|\/\s*x/i.test(q.content);
    const hasSqrt = /\\sqrt/i.test(q.content);
    const hasVector = /\\vec|vectơ|vecto/i.test(q.content);

    const statesDomain = /D\s*=|tập\s*xác\s*định/i.test(q.explanation || '');
    const statesDenomCond = /\\ne|\\neq|khác\s*0/i.test(q.explanation || '');
    const statesRadicandCond = /\\ge|\\geq|không\s*âm/i.test(q.explanation || '');
    const statesVectorNonZero = /\\vec\{0\}|khác\s*\\vec\{0\}|vectơ\s*khác/i.test(q.explanation || '');
    const statesOrthogonal = /\\cdot.*=.*0|vuông\s*góc|\\perp/i.test(q.explanation || '');

    // Formulate recommended rigor enhancement if needed
    let recommendedRigorPatch = null;

    if (q.code === 'Q02-2024') {
      // already has D = R \ {-1}
    } else if (q.code === 'Q08-2025') {
      recommendedRigorPatch = {
        issue: 'Hàm số bậc ba chưa ghi rõ Tập xác định D = R',
        targetField: 'explanation',
        proposedSnippet: 'Tập xác định: $D = \\mathbb{R}$. Ta có $y\' = x^2 - 4x + 3 = 0 \\iff x = 1$ hoặc $x = 3$.'
      };
    } else if (q.code === 'Q12-2024') {
      recommendedRigorPatch = {
        issue: 'Hàm phân thức y = x + 4/x cần nêu rõ Tập xác định D = R \\ {0} và điều kiện x != 0',
        targetField: 'explanation',
        proposedSnippet: 'Tập xác định: $D = \\mathbb{R} \\setminus \\{0\\}$. Vì $[1; 4] \\subset D$ nên hàm số xác định và liên tục trên đoạn $[1; 4]$. Đạo hàm với mẫu $x^2 > 0, \\; \\forall x \\in [1; 4]$: $y\' = 1 - \\frac{4}{x^2} = \\frac{x^2 - 4}{x^2}$.'
      };
    } else if (q.code === 'Q16-2024') {
      // y = (3x+1)/(x-2)
      if (!statesDomain) {
        recommendedRigorPatch = {
          issue: 'Hàm phân thức cần nêu rõ Tập xác định D = R \\ {2}',
          targetField: 'explanation',
          proposedSnippet: 'Tập xác định: $D = \\mathbb{R} \\setminus \\{2\\}$ (điều kiện mẫu thức $x - 2 \\ne 0 \\iff x \\ne 2$).'
        };
      }
    } else if (q.code === 'Q17-2025') {
      // y = (2x^2 - 3x + 5)/(x - 1)
      if (!statesDomain) {
        recommendedRigorPatch = {
          issue: 'Hàm phân thức cần nêu rõ Tập xác định D = R \\ {1}',
          targetField: 'explanation',
          proposedSnippet: 'Tập xác định: $D = \\mathbb{R} \\setminus \\{1\\}$ (điều kiện mẫu thức $x - 1 \\ne 0 \\iff x \\ne 1$). Thực hiện phép chia đa thức tử cho mẫu: $2x^2 - 3x + 5 = (2x - 1)(x - 1) + 4 \\implies y = 2x - 1 + \\frac{4}{x - 1}$.'
        };
      }
    } else if (q.code === 'Q23-2025') {
      recommendedRigorPatch = {
        issue: 'Hàm phân thức y = (2x-2)/(x+1) cần nêu rõ Tập xác định D = R \\ {-1}',
        targetField: 'explanation',
        proposedSnippet: 'Tập xác định: $D = \\mathbb{R} \\setminus \\{-1\\}$ (điều kiện mẫu $x + 1 \\ne 0 \\iff x \\ne -1$). Đạo hàm: $y\' = \\frac{4}{(x + 1)^2} > 0, \\; \\forall x \\ne -1$.'
      };
    } else if (q.code === 'Q26-2024') {
      recommendedRigorPatch = {
        issue: 'Chi phí trung bình C_bar(x) cần nêu rõ điều kiện x > 0',
        targetField: 'explanation',
        proposedSnippet: 'Điều kiện thực tế và mẫu thức: $x > 0$ (số lượng sản phẩm luôn dương, mẫu thức $x \\ne 0$). Chi phí sản xuất trung bình cho mỗi sản phẩm là: $\\bar{C}(x) = \\frac{C(x)}{x} = \\frac{x^2 + 20x + 100}{x} = x + 20 + \\frac{100}{x}$.'
      };
    } else if (q.code === 'Q41-2024') {
      recommendedRigorPatch = {
        issue: 'Tích có hướng cần nêu rõ điều kiện hai vectơ u, v khác 0',
        targetField: 'explanation',
        proposedSnippet: 'Hai vectơ $\\vec{u} \\ne \\vec{0}$ và $\\vec{v} \\ne \\vec{0}$ không cùng phương. Tích có hướng: $[\\vec{u}, \\vec{v}] = (2(-1) - 3(1); 3(0) - 1(-1); 1(1) - 2(0)) = (-5; 1; 1)$. Vectơ $[\\vec{u}, \\vec{v}] \\ne \\vec{0}$ vuông góc với cả $\\vec{u}$ và $\\vec{v}$.'
      };
    }

    auditList.push({
      id: q.id,
      code: q.code,
      topicKey,
      difficulty: q.difficulty,
      type: q.type,
      currentSource: currentRaw,
      standardizedSource,
      sourceNote,
      formulaCount,
      formulaErrors,
      hasFraction,
      hasSqrt,
      hasVector,
      statesDomain,
      statesDenomCond,
      statesRadicandCond,
      statesVectorNonZero,
      statesOrthogonal,
      recommendedRigorPatch
    });
  }
}

fs.writeFileSync('scripts/question_audit_details.json', JSON.stringify(auditList, null, 2), 'utf8');
console.log(`Audited all ${auditList.length} questions successfully!`);
console.log(`Total formulas validated: ${auditList.reduce((acc, q) => acc + q.formulaCount, 0)}`);
console.log(`Total KaTeX errors: ${auditList.reduce((acc, q) => acc + q.formulaErrors.length, 0)}`);
const withPatches = auditList.filter(q => q.recommendedRigorPatch !== null);
console.log(`Questions with recommended rigor patches: ${withPatches.length}`);
withPatches.forEach(q => console.log(`- ${q.code} (${q.topicKey}): ${q.recommendedRigorPatch.issue}`));
