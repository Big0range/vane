const { exec } = require('child_process');
const fs = require('fs/promises');
const path = require('path');
const watchTsChild = exec('pnpm dev:server');

// 启动服务端
watchTsChild.stdout.on('data', data => {
  console.log(`\x1b[34mserver stdout:\x1b[0m\n${data}`);
});

watchTsChild.stderr.on('data', data => {
  console.error(`\x1b[31mserver stderr:\x1b[0m\n${data}`);
});


// 启动web端
const watchNodeChild = exec('pnpm dev:client');
watchNodeChild.stdout.on('data', data => {
  console.log(`\x1b[32mclient stdout:\x1b[0m\n${data}`);
});
watchNodeChild.stderr.on('data', data => {
  console.log(`\x1b[31mclient stderr:\x1b[0m\n${data}`);
});
// change master to master_host='172.16.238.2', master_user='slave', master_password='vaneSalve888??', master_port=3307, master_log_file='mysql-bin.000013', master_log_pos=21774, master_connect_retry=30;
