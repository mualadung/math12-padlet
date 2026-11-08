const { spawn } = require('child_process');
const http = require('http');

// Launch chrome in headless mode with remote debugging port 9222
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  'http://localhost:3000/mindmap'
]);

setTimeout(async () => {
  try {
    http.get('http://localhost:9222/json', (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        console.log('Chrome tabs:', data);
        chrome.kill();
      });
    });
  } catch (e) {
    console.error(e);
    chrome.kill();
  }
}, 3000);
