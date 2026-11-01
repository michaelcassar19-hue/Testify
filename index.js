require('dotenv').config();

const { execSync } = require('child_process');
const fs = require('fs');

// Build files if missing
if (!fs.existsSync('./dist') && !fs.existsSync('./build')) {
    try {
        execSync('npm run build', { stdio: 'inherit' });
    } catch (e) {
        try { execSync('npm run dev', { stdio: 'inherit' }); } catch (err) {}
    }
}

console.log("🚀 Booting core engine from .env parameters...");

// Execute main system entry point smoothly
if (fs.existsSync('./dist/index.js')) {
    require('./dist/index.js');
} else if (fs.existsSync('./build/index.js')) {
    require('./build/index.js');
} else if (fs.existsSync('./dist/main.js')) {
    require('./dist/main.js');
} else {
    const fallback = fs.readdirSync('./').find(f => f.endsWith('.js') && f !== 'index.js');
    if (fallback) require(`./${fallback}`);
}

