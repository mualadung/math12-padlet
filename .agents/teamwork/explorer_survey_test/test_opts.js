const { PrismaClient } = require('@prisma/client');
const katex = require('katex');
const p = new PrismaClient();

async function run() {
  const q21 = await p.question.findUnique({ where: { code: 'Q21_D6_MC' } });
  const opts = JSON.parse(q21.optionsJson);
  console.log('Parsed opts:', opts);
  for (const o of opts) {
    const math = o.slice(3).replace(/\$/g, '').trim();
    try {
      const rendered = katex.renderToString(math, { throwOnError: true });
      console.log(`Success: ${math}`);
    } catch (e) {
      console.log(`Fail: ${math} -> ${e.message}`);
    }
  }

  // Also check KnowledgeItem 7984aaab-bd51-4e3e-bc66-d13a0e7fd473
  const ki = await p.knowledgeItem.findUnique({ where: { id: '7984aaab-bd51-4e3e-bc66-d13a0e7fd473' } });
  console.log('\nKnowledgeItem notes:');
  console.log('Raw notes:', JSON.stringify(ki.notes));
  try {
    katex.renderToString(ki.notes.slice(1, -1), { throwOnError: true });
    console.log('KnowledgeItem formula rendered successfully');
  } catch (e) {
    console.log('KnowledgeItem formula failed:', e.message);
  }

  await p.$disconnect();
}

run().catch(console.error);
