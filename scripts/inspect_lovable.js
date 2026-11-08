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
  const html = await fetchUrl('https://palette-branch-mapper.lovable.app/');
  console.log('HTML length:', html.length);
  
  // Find script tags
  const matches = [...html.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
  console.log('Scripts:', matches);

  for (const src of matches) {
    const scriptUrl = src.startsWith('http') ? src : 'https://palette-branch-mapper.lovable.app' + src;
    console.log('Fetching:', scriptUrl);
    const content = await fetchUrl(scriptUrl);
    console.log(`Script ${src} length:`, content.length);
    fs.writeFileSync('scripts/' + src.split('/').pop(), content);
  }
}

main().catch(console.error);
