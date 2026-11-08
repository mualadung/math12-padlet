const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

async function captureScreenshot(url, outputPath, port) {
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
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 2,
                  method: 'Page.captureScreenshot',
                  params: { format: 'png' }
                }));
              }, 2500);
            };

            ws.onmessage = (event) => {
              const msg = JSON.parse(event.data);
              if (msg.id === 2 && msg.result && msg.result.data) {
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
  console.log('Capturing Lovable screenshot...');
  try {
    await captureScreenshot('https://palette-branch-mapper.lovable.app/', 'scripts/lovable_ref.png', 9230);
  } catch (e) {
    console.error('Lovable error:', e.message);
  }

  console.log('Capturing local mindmap screenshot...');
  try {
    await captureScreenshot('http://localhost:3000/mindmap', 'scripts/local_mindmap.png', 9231);
  } catch (e) {
    console.error('Local error:', e.message);
  }
}

main();
