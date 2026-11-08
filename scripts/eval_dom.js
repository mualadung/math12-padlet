const { spawn } = require('child_process');
const http = require('http');

async function main() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9225',
    '--disable-gpu',
    'http://localhost:3000/mindmap'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://localhost:9225/json', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      const tabs = JSON.parse(data);
      const target = tabs.find(t => t.url.includes('mindmap'));
      const ws = new WebSocket(target.webSocketDebuggerUrl);

      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
              expression: `JSON.stringify({
                rf: !!document.querySelector('.react-flow'),
                w: document.querySelector('.react-flow')?.offsetWidth,
                h: document.querySelector('.react-flow')?.offsetHeight,
                nodes: document.querySelectorAll('.react-flow__node').length
              })`
            }
          }));
        }, 1500);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log('WS msg:', msg);
        if (msg.id === 2) {
          chrome.kill();
          process.exit(0);
        }
      };
    });
  });
}

main().catch(console.error);
