const { spawn } = require('child_process');
const http = require('http');

async function main() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9228',
    '--disable-gpu',
    'http://localhost:3000/mindmap'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://localhost:9228/json', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      const tabs = JSON.parse(data);
      const target = tabs.find(t => t.url.includes('mindmap'));
      const ws = new WebSocket(target.webSocketDebuggerUrl);

      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        setTimeout(() => {
          // Click CH1
          ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: { expression: `document.querySelector('[data-id="CH1"] button')?.click()` }
          }));

          // Click TOPIC_1_1 after 600ms
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 3,
              method: 'Runtime.evaluate',
              params: { expression: `document.querySelector('[data-id="TOPIC_1_1"] button')?.click()` }
            }));

            // Click MT_1_1_1 after 600ms
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 4,
                method: 'Runtime.evaluate',
                params: { expression: `document.querySelector('[data-id="MT_1_1_1"] button')?.click()` }
              }));

              // Check final detail node after 600ms
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 5,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: `(() => {
                      const detail = document.querySelector('[data-id="detail-MT_1_1_1"]');
                      return JSON.stringify({
                        detailFound: !!detail,
                        tabs: Array.from(detail?.querySelectorAll('button') || []).map(b => b.innerText),
                        text: detail?.innerText.slice(0, 100)
                      });
                    })()`
                  }
                }));
              }, 600);
            }, 600);
          }, 600);
        }, 1200);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 5) {
          console.log('Final Level 5 Detail Node Test:', msg.result.result.value);
          ws.close();
          chrome.kill();
          process.exit(0);
        }
      };
    });
  });
}

main().catch(console.error);
