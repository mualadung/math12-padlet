const fs = require('fs');
const code = fs.readFileSync('scripts/routes-EhwX_jep.js', 'utf8');

// Search for Vietnamese text strings
const vnStrings = code.match(/["'`][^"'`\n\r]{4,120}["'`]/g) || [];
const uniqueVn = [...new Set(vnStrings)]
  .map(s => s.slice(1, -1))
  .filter(s => /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(s));

console.log('Found VN strings count:', uniqueVn.length);
console.log('Sample VN strings:\n', uniqueVn.slice(0, 40).join('\n'));

fs.writeFileSync('scripts/vn_strings.json', JSON.stringify(uniqueVn, null, 2));
