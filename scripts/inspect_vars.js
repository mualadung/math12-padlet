const fs = require('fs');
const css = fs.readFileSync('scripts/lovable_styles.css', 'utf8');

// Find :root variables
const rootMatch = css.match(/:root\s*\{([^}]+)\}/);
if (rootMatch) {
  console.log('Root CSS vars:\n', rootMatch[1].split(';').map(s => s.trim()).filter(Boolean).join('\n'));
}

// Find colors
const colorVars = css.match(/--[a-z0-9\-_]+:\s*[^;]+/gi) || [];
console.log('\nAll CSS vars:\n', [...new Set(colorVars)].filter(s => /olive|rust|gold|ink|sage|terracotta|moss|background|paper/i.test(s)).join('\n'));
