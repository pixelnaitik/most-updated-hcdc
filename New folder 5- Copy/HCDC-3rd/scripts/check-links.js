const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pages = ['index.html', 'about/index.html', 'services/index.html', 'technology/index.html', 'partners/index.html', 'contact/index.html'];

const attrRegex = /(href|src)="([^"]+)"/g;
const bad = [];

function normalizeTarget(filePath, rawTarget) {
  if (!rawTarget || rawTarget.startsWith('http') || rawTarget.startsWith('mailto:') || rawTarget.startsWith('tel:') || rawTarget.startsWith('#') || rawTarget.startsWith('javascript:')) {
    return null;
  }

  const withoutHash = rawTarget.split('#')[0].split('?')[0];
  if (!withoutHash) return null;

  const baseDir = path.dirname(filePath);
  const targetPath = path.resolve(baseDir, withoutHash);

  if (fs.existsSync(targetPath)) return targetPath;
  if (fs.existsSync(path.join(targetPath, 'index.html'))) return path.join(targetPath, 'index.html');
  if (fs.existsSync(`${targetPath}.html`)) return `${targetPath}.html`;

  return targetPath;
}

for (const page of pages) {
  const absPage = path.join(root, page);
  if (!fs.existsSync(absPage)) continue;

  const html = fs.readFileSync(absPage, 'utf8');
  let match;

  while ((match = attrRegex.exec(html)) !== null) {
    const target = normalizeTarget(absPage, match[2]);
    if (target && !fs.existsSync(target)) {
      bad.push(`${page} -> ${match[2]}`);
    }
  }
}

if (bad.length > 0) {
  console.error('Broken local links/assets found:');
  bad.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

console.log('Local link check passed.');
