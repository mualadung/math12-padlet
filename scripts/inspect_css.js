const fs = require('fs');
const css = fs.readFileSync('scripts/lovable_styles.css', 'utf8');

// Find tone classes
const toneMatches = css.match(/\.tone-[a-z0-9\-_]+(\s*\{[^}]+\})/gi) || [];
console.log('Tone classes count:', toneMatches.length);
console.log('Sample tone classes:\n', toneMatches.slice(0, 15).join('\n'));

// Find map-edge or node classes
const nodeClasses = css.match(/\.(node-[a-z0-9\-_]+|map-[a-z0-9\-_]+|canvas-[a-z0-9\-_]+)\s*\{[^}]+\}/gi) || [];
console.log('\nNode/Canvas classes count:', nodeClasses.length);
console.log('Sample Node/Canvas classes:\n', nodeClasses.slice(0, 15).join('\n'));
