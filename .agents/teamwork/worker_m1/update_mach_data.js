const fs = require('fs');
const ts = require('typescript');
const valData = require('../explorer_m1_conditions/validated_37_types.json');

const code = fs.readFileSync('src/app/mindmap/machData.ts', 'utf8');
const transpiled = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const mod = { exports: {} };
new Function('exports', 'module', transpiled)(mod.exports, mod);
const tree = mod.exports.TREE_DATA;

const valMap = new Map(valData.map(v => [v.id, v]));

let updatedCount = 0;

tree.chapters.forEach(c => {
  c.topics.forEach(t => {
    t.mathTypes.forEach(mt => {
      const v = valMap.get(mt.id);
      if (v) {
        mt.code = v.code || mt.code;
        mt.title = v.title || mt.title;
        mt.difficulty = v.difficulty || mt.difficulty;
        
        const existingSQ = mt.details?.sampleQuestion;
        if (existingSQ) {
          if (existingSQ.content) {
            existingSQ.content = existingSQ.content
              .replace(/y_\{CĐ\}/g, 'y_{\\text{CĐ}}')
              .replace(/y_\{CT\}/g, 'y_{\\text{CT}}')
              .replace(/x_\{CĐ\}/g, 'x_{\\text{CĐ}}')
              .replace(/x_\{CT\}/g, 'x_{\\text{CT}}')
              .replace(/60\^\\circ/g, '60^{\\circ}')
              .replace(/90\^\\circ/g, '90^{\\circ}');
          }
          if (existingSQ.answer) {
            existingSQ.answer = existingSQ.answer
              .replace(/60\^\\circ/g, '60^{\\circ}')
              .replace(/90\^\\circ/g, '90^{\\circ}');
          }
        }

        mt.details = {
          theory: v.theory,
          signs: v.signs,
          methods: v.methods,
          mistakes: v.mistakes,
          ...(existingSQ ? { sampleQuestion: existingSQ } : {})
        };
        updatedCount++;
      }
    });
  });
});

console.log('Updated math types count:', updatedCount);

const header = `// =========================================================================
// CƠ SỞ DỮ LIỆU CÂY TRI THỨC TOÁN 12 (TẬP 1) - CHUẨN SGK KẾT NỐI TRI THỨC
// Cấu trúc phân cấp chính xác:
// [Gốc: Toán 12] ➔ [Chương I & II] ➔ [Chủ đề] ➔ [Hiện ngay Dạng toán] ➔ [Thẻ 4 Tab]
// =========================================================================

export interface DetailContent {
  theory: string;
  signs: string;
  methods: string;
  mistakes: string;
  sampleQuestion?: {
    code: string;
    content: string;
    answer: string;
    casio?: string;
  };
}

export interface MathTypeItem {
  id: string;
  code: string;
  title: string;
  difficulty?: "NB" | "TH" | "VD" | "VDC";
  details: DetailContent;
}

export interface TopicItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  color: string;
  mathTypes: MathTypeItem[];
}

export interface ChapterItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  color: string;
  topics: TopicItem[];
}

export interface RootKnowledgeTree {
  id: string;
  title: string;
  subtitle: string;
  chapters: ChapterItem[];
}

export const TREE_DATA: RootKnowledgeTree = ${JSON.stringify(tree, null, 2)};
`;

fs.writeFileSync('src/app/mindmap/machData.ts', header, 'utf8');
console.log('Successfully wrote src/app/mindmap/machData.ts');
