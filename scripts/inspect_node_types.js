const fs = require('fs');
const code = fs.readFileSync('scripts/routes-EhwX_jep.js', 'utf8');

const kbIdx = code.indexOf('Kb=');
console.log('Kb= index:', kbIdx);
if (kbIdx !== -1) {
  console.log(code.slice(kbIdx - 200, kbIdx + 800));
} else {
  // search for nodeTypes
  const ntMatches = [...code.matchAll(/nodeTypes:\s*([a-zA-Z0-9_]+)/g)];
  console.log('nodeTypes matches:', ntMatches.map(m => m[1]));
  for (const m of ntMatches) {
    const varName = m[1];
    const defIdx = code.indexOf(varName + '=');
    console.log(`Def for ${varName} at:`, defIdx);
    if (defIdx !== -1) {
      console.log(code.slice(defIdx, defIdx + 600));
    }
  }
}
