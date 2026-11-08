const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ts = require('typescript');
const katex = require('katex');

function loadTsModule(relPath) {
  const code = fs.readFileSync(relPath, 'utf8');
  const result = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  });
  const m = { exports: {} };
  const fn = new Function('module', 'exports', 'require', result.outputText);
  fn(m, m.exports, require);
  return m.exports;
}

function validateExamSource(source) {
  if (!source || typeof source !== 'string') {
    return { valid: false, reason: 'Nguồn bị để trống hoặc null' };
  }
  const formatRegex = /^\[Nguồn:\s*(.+)\]$/i;
  const match = source.trim().match(formatRegex);
  if (!match) {
    return { valid: false, reason: `Định dạng không đúng chuẩn '[Nguồn: ...]' (Nội dung hiện tại: "${source}")` };
  }
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
  const hasBody = validBodies.some((pattern) => pattern.test(inner));
  if (!hasBody) {
    return { valid: false, reason: `Nguồn thiếu cơ quan tổ chức thi hợp lệ: "${inner}"` };
  }
  const hasYear = /\b(202[0-6])\b/.test(inner);
  if (!hasYear) {
    return { valid: false, reason: `Nguồn thiếu năm thi xác thực: "${inner}"` };
  }
  return { valid: true };
}

async function main() {
  const mm = loadTsModule('src/app/mindmap/mindmapQuestions.ts');
  const bank = mm.REAL_QUESTIONS_BANK;
  console.log('Testing each question with hypothetical [Nguồn: <source>] wrapper:');
  for (const [topic, qs] of Object.entries(bank)) {
    console.log(`\nTopic: ${topic}`);
    qs.forEach((q, i) => {
      const wrappedSource = q.source.startsWith('[Nguồn:') ? q.source : `[Nguồn: ${q.source}]`;
      const sourceRes = validateExamSource(wrappedSource);
      console.log(`  [${i+1}] ${q.id} (${q.code}): source valid? ${sourceRes.valid} ${sourceRes.valid ? '' : `(${sourceRes.reason})`}`);
    });
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
