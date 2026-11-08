const katex = require('katex');

function validateMath(text, label) {
  // Regex to extract $...$ and $$...$$
  const blockRegex = /\$\$([\s\S]*?)\$\$/g;
  const inlineRegex = /\$([^\$]+?)\$/g;
  
  let match;
  let count = 0;
  
  // Test block math
  while ((match = blockRegex.exec(text)) !== null) {
    count++;
    try {
      katex.renderToString(match[1], { displayMode: true, throwOnError: true });
    } catch (err) {
      console.error(`[ERROR in ${label} - Block math]:`, match[1], err.message);
      return false;
    }
  }
  
  // Test inline math (replace block math first so we don't double match)
  const noBlock = text.replace(blockRegex, ' ');
  while ((match = inlineRegex.exec(noBlock)) !== null) {
    count++;
    try {
      katex.renderToString(match[1], { displayMode: false, throwOnError: true });
    } catch (err) {
      console.error(`[ERROR in ${label} - Inline math]:`, match[1], err.message);
      return false;
    }
  }
  return true;
}

console.log('Validator function ready.');
module.exports = { validateMath };
