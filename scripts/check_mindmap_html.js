const http = require('http');

http.get('http://localhost:3000/mindmap', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    console.log('Has react-flow:', data.includes('react-flow'));
    console.log('HTML slice:', data.slice(0, 1000));
  });
}).on('error', console.error);
