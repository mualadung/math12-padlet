const { spawn } = require('child_process');
const http = require('http');

async function main() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    'http://localhost:3000/mindmap'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://localhost:9223/json', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      const tabs = JSON.parse(data);
      const target = tabs.find(t => t.url.includes('mindmap'));
      if (!target) {
        console.log('No mindmap tab found');
        chrome.kill();
        return;
      }

      console.log('Connecting to:', target.webSocketDebuggerUrl);
      const ws = new WebSocket(target.webSocketDebuggerUrl);

      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 3, method: 'Log.enable' }));
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.consoleAPICalled') {
          console.log('[BROWSER CONSOLE]', msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
        } else if (msg.method === 'Runtime.exceptionThrown') {
          console.error('[BROWSER EXCEPTION]', msg.params.exceptionDetails);
        } else if (msg.method === 'Log.entryAdded') {
          console.log('[BROWSER LOG]', msg.params.entry.level, msg.params.entry.text);
        }
      };

      setTimeout(() => {
        ws.close();
        chrome.kill();
        process.exit(0);
      }, 4000);
    });
  });
}

main().catch(console.error);
