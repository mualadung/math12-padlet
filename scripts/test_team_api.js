const http = require('http');

http.get('http://localhost:3000/api/team', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log('Success:', json.success);
    console.log('Total members from API:', json.data.length);
    json.data.forEach((m, idx) => {
      console.log(`${idx + 1}. ${m.name} | ${m.roleCode} | Reviews: ${m.validReviewCount} | PeerAvg: ${m.computedPeerAvg} | Final: ${m.computedFinalScore}`);
    });
    process.exit(0);
  });
}).on('error', e => {
  console.error(e.message);
  process.exit(1);
});
