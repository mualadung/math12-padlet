const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

async function main() {
  const url = 'https://palette-branch-mapper.lovable.app/assets/routes-EhwX_jep.js';
  console.log('Fetching:', url);
  const content = await fetchUrl(url);
  console.log('routes length:', content.length);
  fs.writeFileSync('scripts/routes-EhwX_jep.js', content);
}

main().catch(console.error);
