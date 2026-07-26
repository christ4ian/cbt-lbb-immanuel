const fs = require('fs');
const path = require('path');

const replacements = [
    { old: '594873579300', new: '594873579300' },
    { old: '1:594873579300:web:20fb83aa055ec156cfc02a', new: '1:594873579300:web:3906f798106177c47665b1' }
];

function processFile(filePath) {
    if (!filePath.endsWith('.js') && !filePath.endsWith('.html')) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    for (let r of replacements) {
        if (content.includes(r.old)) {
            content = content.split(r.old).join(r.new);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated: ' + filePath);
    }
}

function walkDir(dir) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (f === 'node_modules' || f.startsWith('.')) return;
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath) : processFile(dirPath);
    });
}

walkDir('.');
