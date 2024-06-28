const axios = require('axios');
const https = require('https');
// 创建一个axios实例
const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // 如果你的代理服务器使用自签名证书，请将此选项设置为 false
  }),
  // 设置代理
  proxy: {
    host: '127.0.0.1',
    port: 10809, // VPN代理服务器的端口号
    protocol: 'http',
    // 如果需要身份验证，您可以在这里提供用户名和密码
    // auth: {
    //   username: 'demo',
    //   password: 'demo',
    // },
  },
});
instance
  .get('http://www.google.com/')
  .then(res => {
    console.log('res', res.data);
  })
  .catch(err => {
    console.log(err);
  });
