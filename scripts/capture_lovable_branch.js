const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function main() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9236',
    '--window-size=1440,900',
    '--disable-gpu',
    'https://palette-branch-mapper.lovable.app/'
  ]);

  await new Promise(r => setTimeout(r, 4000));

  http.get('http://localhost:9236/json', (res) => {
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
          // Click monotonic node
          ws.send(JSON.stringify({
            id: 3,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                const node = document.querySelector('[data-id="monotonic"] button') || document.querySelector('.tone-olive button');
                if (node) node.click();
                return !!node;
              })()`
            }
          }));

          // Take screenshot after 1.5s
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 4,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          }, 1500);
        }, 1000);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 3) {
          console.log('Clicked monotonic:', msg.result?.result?.value);
        } else if (msg.id === 4 && msg.result?.data) {
          fs.writeFileSync('scripts/lovable_branch_clicked.png', Buffer.from(msg.result.data, 'base64'));
          console.log('Saved branch clicked screenshot!');
          ws.close();
          chrome.kill();
          process.exit(0);
        }
      };
    });
  });
}

main().catch(console.error);
