const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function captureUrl(url, outputPath, port, action) {
  return new Promise((resolve, reject) => {
    const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--window-size=1440,900',
      '--disable-gpu',
      url
    ]);

    setTimeout(() => {
      http.get(`http://localhost:${port}/json`, (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', async () => {
          try {
            const tabs = JSON.parse(data);
            const target = tabs[0];
            const ws = new WebSocket(target.webSocketDebuggerUrl);

            ws.onopen = () => {
              ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
              ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
              setTimeout(() => {
                if (action) {
                  ws.send(JSON.stringify({
                    id: 3,
                    method: 'Runtime.evaluate',
                    params: { expression: action }
                  }));
                }

                setTimeout(() => {
                  ws.send(JSON.stringify({
                    id: 4,
                    method: 'Page.captureScreenshot',
                    params: { format: 'png' }
                  }));
                }, action ? 1500 : 800);
              }, 1200);
            };

            ws.onmessage = (event) => {
              const msg = JSON.parse(event.data);
              if (msg.id === 4 && msg.result?.data) {
                fs.writeFileSync(outputPath, Buffer.from(msg.result.data, 'base64'));
                console.log(`Saved screenshot to ${outputPath}`);
                ws.close();
                chrome.kill();
                resolve();
              }
            };
          } catch (e) {
            chrome.kill();
            reject(e);
          }
        });
      }).on('error', (e) => {
        chrome.kill();
        reject(e);
      });
    }, 2000);
  });
}

async function main() {
  console.log('Capturing local overview screenshot...');
  await captureUrl('http://localhost:3000/mindmap', 'scripts/local_new_overview.png', 9240);

  console.log('Capturing local drilldown screenshot (clicking monotonic)...');
  await captureUrl(
    'http://localhost:3000/mindmap',
    'scripts/local_new_drilldown.png',
    9241,
    `document.querySelector('[data-id="monotonic"] button')?.click()`
  );
}

main();
