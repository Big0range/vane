/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');
const msgList = [];
msgList.push(
  '-------------------- ' +
    new Date().toLocaleString() +
    ' --------------------'
);
msgList.push('git 信息 \n');
const instruc = 'git branch --show-current';
msgList.push(
  '当前git分支: \n' + execSync(instruc).toString().replace(/\n/g, '')
);

const instruc2 = 'git config user.name &&  git config user.email';
msgList.push('当前用户: \n' + execSync(instruc2).toString().replace(/\n/g, ''));

const instruc3 = 'git log -1';
msgList.push(
  '当前commit信息: \n' +
    execSync(instruc3)
      .toString()
      .replace(/\n[ ]+/g, '')
);

const os = require('os');

msgList.push('\n系统信息\n');
const arch = os.arch();
msgList.push('cpu架构: ' + arch);

//操作系统内核
const kernel = os.type();
msgList.push('操作系统内核: \n' + kernel);

//操作系统平台
const pf = os.platform();
msgList.push('操作系统平台: \n' + pf);

//主机名
const hn = os.hostname();
msgList.push('主机名: \n' + hn);

//主目录
const hdir = os.homedir();
msgList.push('主目录: \n' + hdir);

//内存
const totalMem = os.totalmem();
const freeMem = os.freemem();

msgList.push(
  '内存大小:\n总内存--' +
    (totalMem / 1024 / 1024 / 1024).toFixed(2) +
    'G, 空闲内存--' +
    (freeMem / 1024 / 1024 / 1024).toFixed(2) +
    'G'
);

module.exports = msgList;
