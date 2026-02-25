const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src/js');
const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.js'));

let hasError = false;

for (const file of files) {
  const fullPath = path.join(srcDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');

  if (/console\.log\(/.test(content)) {
    console.warn(`${file}: warning - console.log found.`);
  }

  try {
    new Function(content);
  } catch (error) {
    console.error(`${file}: syntax error - ${error.message}`);
    hasError = true;
  }
}

if (hasError) process.exit(1);

console.log('JS lint checks passed.');
