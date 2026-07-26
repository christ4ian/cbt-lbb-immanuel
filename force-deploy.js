const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const conn = new Client();
conn.on('ready', () => {
  console.log('SSH Ready');
  conn.sftp((err, sftp) => {
    if (err) throw err;
    const localPath = path.join(__dirname, 'admin', 'vps-scripts', 'index.js');
    const remotePath = '/root/whatsapp-bot/index.js';
    
    sftp.fastPut(localPath, remotePath, (err) => {
      if (err) throw err;
      console.log('File uploaded successfully via SFTP!');
      
      const cmd = 'pm2 restart MILA && pm2 logs MILA --lines 20 --nostream';
      console.log('Executing:', cmd);
      conn.exec(cmd, (err, stream) => {
        if (err) throw err;
        let out = '';
        stream.on('close', () => {
          console.log(out);
          conn.end();
        }).on('data', (data) => {
          out += data;
        }).stderr.on('data', (data) => {
          out += data;
        });
      });
    });
  });
}).connect({
  host: '160.19.166.73',
  port: 22,
  username: 'root',
  password: 'Bubun9999_'
});
