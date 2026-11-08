const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/lovable_em.json', 'utf8'));

console.log('Branch 1:', JSON.stringify(data[0], null, 2).slice(0, 2000));
