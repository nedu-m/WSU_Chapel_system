import fs from 'fs';
import path from 'path';

const sourceDir = './Backend';
const distDir = './dist';

// Clean dist directory
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}

// Copy Backend to dist
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

console.log('🏗️  Building production bundle...');
copyDir(sourceDir, distDir);

// Copy package.json and other necessary files
fs.copyFileSync('./package.json', './dist/package.json');
if (fs.existsSync('./.env')) {
    fs.copyFileSync('./.env', './dist/.env');
}

console.log('✅ Build complete! Output in ./dist');