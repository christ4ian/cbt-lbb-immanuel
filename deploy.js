const fs = require('fs');
const https = require('https');

const code = fs.readFileSync('./admin/vps-scripts/index.js', 'utf8');
const data = JSON.stringify({
    update_code: code,
    timestamp: Date.now(),
    update_error: null,
    deploy_log: null
});

const req = https.request({
    hostname: 'cbt-lbb-immanuel-default-rtdb.firebaseio.com',
    port: 443,
    path: '/bot_status.json',
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
}, (res) => {
    console.log('Status:', res.statusCode);
    res.on('data', d => process.stdout.write(d));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
