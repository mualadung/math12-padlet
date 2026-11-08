const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function main() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9243',
    '--window-size=1440,900',
    '--disable-gpu',
    'http://localhost:3000/mindmap'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://localhost:9243/json', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      const tabs = JSON.parse(data);
      const target = tabs[0];
      const ws = new WebSocket(target.webSocketDebuggerUrl);

      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
        setTimeout(() => {
          // Click monotonic
          ws.send(JSON.stringify({
            id: 3,
            method: 'Runtime.evaluate',
            params: { expression: `document.querySelector('[data-id="monotonic"] button')?.click()` }
          }));

          // Click MT_1_1_1 after 700ms
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 4,
              method: 'Runtime.evaluate',
              params: { expression: `document.querySelector('[data-id="MT_1_1_1"] button')?.click()` }
            }));

            // Screenshot after 1s
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 5,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 1000);
          }, 700);
        }, 1200);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 5 && msg.result?.data) {
          fs.writeFileSync('scripts/local_detail_node.png', Buffer.from(msg.result.data, 'base64'));
          console.log('Saved detail node screenshot!');
          ws.close();
          chrome.kill();
          process.exit(0);
        }
      };
    });
  });
}

main().catch(console.error);
