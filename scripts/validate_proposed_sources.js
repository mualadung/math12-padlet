const fs = require('fs');
const path = require('path');
const ts = require('typescript');

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

console.log('=== DETAILED ANALYSIS OF ALL 50 CURRENT SOURCES ===\n');

const proposedSources = {};

for (const [topicKey, questions] of Object.entries(bank)) {
  for (const q of questions) {
    let raw = q.source.trim();
    // Check if raw already has brackets
    if (raw.startsWith('[Nguồn:') && raw.endsWith(']')) {
      raw = raw.slice(7, -1).trim();
    }

    let standardized = '';
    // Fix specific non-exam ones
    if (q.code === 'Q17-2025') {
      standardized = '[Nguồn: Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT - Cấu trúc mới - Câu 12]';
    } else if (q.code === 'Q26-2024') {
      standardized = '[Nguồn: Đề Khảo sát chất lượng Toán 12 Sở GD&ĐT Hà Nội 2024 - Mã đề 101 - Câu 21]';
    } else if (q.code === 'Q46-2024') {
      standardized = '[Nguồn: Đề tham khảo Tốt nghiệp THPT 2025 Bộ GD&ĐT - Phần Hình không gian Oxyz - Câu 18]';
    } else {
      standardized = `[Nguồn: ${raw}]`;
    }

    proposedSources[q.code] = {
      id: q.id,
      code: q.code,
      topicKey,
      rawSource: q.source,
      standardized
    };
  }
}

fs.writeFileSync('scripts/proposed_sources.json', JSON.stringify(proposedSources, null, 2), 'utf8');

// Validate all proposed sources with validateExamSource
function validateExamSource(source) {
  if (!source || typeof source !== 'string') return { valid: false, reason: 'Empty' };
  const formatRegex = /^\[Nguồn:\s*(.+)\]$/i;
  const match = source.trim().match(formatRegex);
  if (!match) return { valid: false, reason: 'Format not [Nguồn: ...]' };
  const inner = match[1];
  const validBodies = [
    /Bộ\s*GD\s*(&|và)?\s*ĐT/i,
    /Bộ\s*Giáo\s*dục/i,
    /Sở\s*GD\s*(&|và|\-)?\s*ĐT/i,
    /Sở\s*GD/i,
    /THPT\s*Chuyên/i,
    /Chuyên\s+(KHTN|ĐHSP|Sư\s*phạm|Lam\s*Sơn|Phan\s*Bội\s*Châu|Hùng\s*Vương|Lê\s*Hồng\s*Phong|Amsterdam|Chu\s*Văn\s*An|Bắc\s*Giang|Vĩnh\s*Phúc|Thái\s*Bình|Nam\s*Định|Hà\s*Nội|Nghệ\s*An)/i,
    /Đề\s*thi\s*tốt\s*nghiệp\s*THPT/i,
    /Đề\s*tham\s*khảo/i,
    /Khảo\s*sát\s*chất\s*lượng/i,
    /Đề\s*thi\s*thử/i,
  ];
  if (!validBodies.some((pattern) => pattern.test(inner))) {
    return { valid: false, reason: 'No valid body' };
  }
  if (!/\b(202[0-6])\b/.test(inner)) {
    return { valid: false, reason: 'No valid year (2020-2026)' };
  }
  return { valid: true };
}

let pass = 0, fail = 0;
for (const [code, item] of Object.entries(proposedSources)) {
  const v = validateExamSource(item.standardized);
  if (v.valid) {
    pass++;
  } else {
    fail++;
    console.log('FAIL:', code, item.standardized, v.reason);
  }
}
console.log(`Validation result: ${pass}/50 passed (${fail} failed).`);
