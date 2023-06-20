/* eslint-disable @typescript-eslint/no-var-requires */
const Client = require('ssh2-sftp-client');
const { appendFile, copyFile } = require('fs/promises');
const msgList = require('./sysInfo');
const path = require('path');
/**
 * !自己新建配置文件
 * {
 *  "host": "**********",
 *  "port": **,
 *  "username": "**********",,
 *  "password": "**********",,
 *  "remotePath": "**********",,
 *  "remoteBackupPath":"**********",,
 *  "localPath": "./dist"
 * }

 */
const serverConfig = require('./deploy.config.json');
const dayjs = require('dayjs');
const client = new Client();
const config = {
  ...serverConfig,
  host: serverConfig.host,
  port: serverConfig.port,
  username: serverConfig.username,
  password: serverConfig.password
};
(async () => {
  try {
    await client.connect(config);

    //删除备份文件,如果有
    if (await client.exists(config.remoteBackupPath)) {
      await client.rmdir(config.remoteBackupPath, true);
      console.log('删除备份文件成功');
    }
    // 重命名之前的文件作为备份文件
    if (await client.exists(config.remotePath)) {
      await client.rename(config.remotePath, config.remoteBackupPath);
      console.log('新的备份文件重命名成功');
    }

    console.log('开始上传');
    msgList.push('\n上传时间: ' + dayjs().format('YYYY-MM-DD HH:mm:ss'));
    // 写入打包时系统信息
    // 追加内容
    await appendFile(
      path.resolve(__dirname, './build-info.txt'),
      msgList.join('\n')
    );
    // 复制到指定目录
    await copyFile(
      path.resolve(__dirname, './build-info.txt'),
      path.resolve(__dirname, '../dist/build-info.txt')
    );
    // 上传本地文件
    await client.uploadDir(config.localPath, config.remotePath);
    console.log('上传成功');

    client.end();
  } catch (err) {
    client.end();
    console.error(err);
  }
})();
