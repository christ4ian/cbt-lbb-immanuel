const fs = require('fs');
const path = require('path');

const replacements = [
    { old: 'lbb-immanuel-cbt.firebaseapp.com', new: 'lbb-immanuel-cbt.firebaseapp.com' },
    { old: 'lbb-immanuel-cbt-default-rtdb.firebaseio.com', new: 'lbb-immanuel-cbt-default-rtdb.firebaseio.com' },
    { old: 'lbb-immanuel-cbt.firebasestorage.app', new: 'lbb-immanuel-cbt.firebasestorage.app' },
    { old: 'projectId: "lbb-immanuel-cbt"', new: 'projectId: "lbb-immanuel-cbt"' },
    { old: 'projectId: \\\'cbt-lbb-immanuel\\\'', new: 'projectId: \\\'lbb-immanuel-cbt\\\'' },
    { old: 'AIzaSyDu2LuvfDm_NCTd_xZBSPQiUkjtoM65xCs', new: 'AIzaSyDu2LuvfDm_NCTd_xZBSPQiUkjtoM65xCs' }
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
    
    const newConfigInline = `const firebaseConfig = { apiKey: "AIzaSyDu2LuvfDm_NCTd_xZBSPQiUkjtoM65xCs", authDomain: "lbb-immanuel-cbt.firebaseapp.com", databaseURL: "https://lbb-immanuel-cbt-default-rtdb.firebaseio.com", projectId: "lbb-immanuel-cbt", storageBucket: "lbb-immanuel-cbt.firebasestorage.app", messagingSenderId: "594873579300", appId: "1:594873579300:web:3906f798106177c47665b1" };`;
    
    const intermediateInline = `const firebaseConfig = { apiKey: "AIzaSyDu2LuvfDm_NCTd_xZBSPQiUkjtoM65xCs", authDomain: "lbb-immanuel-cbt.firebaseapp.com", databaseURL: "https://lbb-immanuel-cbt-default-rtdb.firebaseio.com", projectId: "lbb-immanuel-cbt", storageBucket: "lbb-immanuel-cbt.firebasestorage.app", messagingSenderId: "594873579300", appId: "1:594873579300:web:3906f798106177c47665b1" };`;
    
    if (content.includes(intermediateInline)) {
        content = content.split(intermediateInline).join(newConfigInline);
        changed = true;
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
