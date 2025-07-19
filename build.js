import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use absolute paths relative to the script location
const sourceDir = path.join(__dirname, 'backend');
const distDir = path.join(__dirname, 'dist');

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
console.log('📁 Source directory:', sourceDir);
console.log('📁 Dist directory:', distDir);
console.log('📁 Working directory:', process.cwd());

// Check if source directory exists
if (!fs.existsSync(sourceDir)) {
    console.error('❌ Source directory does not exist:', sourceDir);
    console.log('📋 Available directories:', fs.readdirSync(__dirname));
    process.exit(1);
}

copyDir(sourceDir, distDir);

// Copy package.json with updated paths and other necessary files
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
packageJson.main = 'api/index.js';
packageJson.scripts.start = 'node api/index.js';
fs.writeFileSync(path.join(distDir, 'package.json'), JSON.stringify(packageJson, null, 2));

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    fs.copyFileSync(envPath, path.join(distDir, '.env'));
}

console.log('✅ Build complete! Output in ./dist');