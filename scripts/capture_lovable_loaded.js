const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function main() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9235',
    '--window-size=1440,900',
    '--disable-gpu',
    'https://palette-branch-mapper.lovable.app/'
  ]);

  await new Promise(r => setTimeout(r, 4500));

  http.get('http://localhost:9235/json', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      const tabs = JSON.parse(data);
      const target = tabs[0];
      const ws = new WebSocket(target.webSocketDebuggerUrl);

      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 2,
            method: 'Page.captureScreenshot',
            params: { format: 'png' }
          }));
        }, 1000);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 2 && msg.result && msg.result.data) {
          fs.writeFileSync('scripts/lovable_loaded.png', Buffer.from(msg.result.data, 'base64'));
          console.log('Saved loaded screenshot!');
          ws.close();
          chrome.kill();
          process.exit(0);
        }
      };
    });
  });
}

main().catch(console.error);
