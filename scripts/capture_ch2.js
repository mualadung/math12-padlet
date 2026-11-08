const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function main() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9242',
    '--window-size=1440,900',
    '--disable-gpu',
    'http://localhost:3000/mindmap'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://localhost:9242/json', (res) => {
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
          // Click Chapter 2 button
          ws.send(JSON.stringify({
            id: 3,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                const btns = Array.from(document.querySelectorAll('header button'));
                const ch2Btn = btns.find(b => b.innerText.includes('CHƯƠNG 02'));
                if (ch2Btn) ch2Btn.click();
                return !!ch2Btn;
              })()`
            }
          }));

          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 4,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          }, 1200);
        }, 1200);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 4 && msg.result?.data) {
          fs.writeFileSync('scripts/local_ch2_overview.png', Buffer.from(msg.result.data, 'base64'));
          console.log('Saved CH2 screenshot!');
          ws.close();
          chrome.kill();
          process.exit(0);
        }
      };
    });
  });
}

main().catch(console.error);
