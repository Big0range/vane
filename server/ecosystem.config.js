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
