const { spawn } = require('child_process');
const http = require('http');

async function main() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9227',
    '--disable-gpu',
    'http://localhost:3000/mindmap'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://localhost:9227/json', (res) => {
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
              expression: `(() => {
                const btn = document.querySelector('[data-id="CH1"] button');
                if (btn) btn.click();
                return !!btn;
              })()`
            }
          }));

          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 3,
              method: 'Runtime.evaluate',
              params: {
                expression: `(() => {
                  const nodes = Array.from(document.querySelectorAll('.react-flow__node'));
                  return JSON.stringify({
                    count: nodes.length,
                    ids: nodes.map(n => n.getAttribute('data-id')),
                    texts: nodes.map(n => n.innerText.slice(0, 30).replace(/\\n/g, ' '))
                  });
                })()`
              }
            }));
          }, 800);
        }, 1500);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 2) {
          console.log('Button found & clicked:', msg.result.result.value);
        } else if (msg.id === 3) {
          console.log('Nodes after click:', msg.result.result.value);
          ws.close();
          chrome.kill();
          process.exit(0);
        }
      };
    });
  });
}

main().catch(console.error);
