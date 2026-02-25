const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, '../index.html');
const html = fs.readFileSync(indexPath, 'utf8');

const requiredChecks = [
  { test: /<meta\s+name="viewport"/i, message: 'Missing viewport meta tag' },
  { test: /<link\s+rel="preload"\s+as="image"/i, message: 'Missing critical image preload' },
  { test: /serviceWorker\.register\(/i, message: 'Missing service worker registration' },
  { test: /<meta\s+property="og:title"/i, message: 'Missing Open Graph metadata' }
];

const failures = requiredChecks.filter((item) => !item.test.test(html));

if (failures.length > 0) {
  console.error('Lighthouse smoke proxy checks failed:');
  failures.forEach((f) => console.error(`- ${f.message}`));
  process.exit(1);
}

console.log('Lighthouse smoke proxy checks passed.');
