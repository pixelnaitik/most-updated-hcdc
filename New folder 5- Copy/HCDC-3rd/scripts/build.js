const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const srcDir = path.join(__dirname, '../src/js');
const distDir = path.join(__dirname, '../js');

// Ensure dist dir exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Get all .js files in src/js
const files = fs.readdirSync(srcDir).filter(file => file.endsWith('.js'));

console.log(`Found ${files.length} JS files to process...`);

files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const minFile = file.replace('.js', '.min.js');
    const distPath = path.join(distDir, minFile);

    console.log(`Minifying ${file} -> ${minFile}...`);
    try {
        // Using npx terser to use the locally installed terser
        execSync(`npx terser "${srcPath}" -o "${distPath}" -c -m`, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Failed to minify ${file}:`, error.message);
        process.exit(1);
    }
});

console.log('JS Build complete!');
