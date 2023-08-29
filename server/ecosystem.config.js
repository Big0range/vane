/* eslint-disable @typescript-eslint/no-var-requires */
const { name } = require('./package.json');
const path = require('path');

module.exports = {
  apps: [
    {
      name,
      script: path.resolve(__dirname, './dist/server.js'),
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      args: '--no-daemon',
      // 合并日志
      merge_logs: true,
      // // 日志文件
      // log_file: path.resolve(__dirname, './logs/combined.log'),
      // // 错误日志文件
      // error_file: path.resolve(__dirname, './logs/err.log'),
      // 日志最大大小
      max_size: '100M',
      // 日志最大数量
      max_file: 10,
      // 日志日期格式
      date_format: 'YYYY-MM-DD HH:mm:ss',
      // 最大重启次数
      max_restarts: 10,
      // 环境变量
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

// module.exports = {
//   apps: [
//     {
//       name: 'express-ts-app',
//       script: './dist/server.js',
//       instances: 'max',
//       exec_mode: 'cluster',
//     },
//   ],

//   deploy: {
//     production: {
//       user: 'SSH_USERNAME',
//       host: 'SSH_HOSTMACHINE',
//       ref: 'origin/master',
//       repo: 'GIT_REPOSITORY',
//       path: 'DESTINATION_PATH',
//       'pre-deploy-local': '',
//       'post-deploy':
//         'npm install && pm2 reload ecosystem.config.js --env production',
//       'pre-setup': '',
//     },
//   },
// };
