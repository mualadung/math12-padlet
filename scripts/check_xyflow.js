const fs = require('fs');

try {
  const p = require.resolve('@xyflow/react/dist/style.css');
  console.log('Found style.css at:', p);
} catch (e) {
  console.log('Error finding style.css:', e.message);
  // Check directory
  const dir = './node_modules/@xyflow/react';
  if (fs.existsSync(dir)) {
    console.log('Directory contents:', fs.readdirSync(dir));
    if (fs.existsSync(dir + '/dist')) {
      console.log('dist contents:', fs.readdirSync(dir + '/dist'));
    }
  }
}
