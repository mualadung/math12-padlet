const http = require('http');

function checkRoute(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        console.log(`[${res.statusCode}] ${path} (Length: ${data.length})`);
        resolve({ path, statusCode: res.statusCode, length: data.length });
      });
    }).on('error', reject);
  });
}

async function main() {
  const routes = ['/', '/mindmap', '/math-types', '/practice', '/community', '/team-admin'];
  for (const r of routes) {
    await checkRoute(r);
  }
}

main().catch(console.error);
