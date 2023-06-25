import { Sequelize } from 'sequelize';
import * as path from 'path';
import { useMysqlLogger } from '../hooks/useLogger';
function split(str: string) {
  return str.split(' ').filter(item => item.trim());
}
const mysqlHosts = split(process.env.MYSQL_HOST);
const mysqlUsers = split(process.env.MYSQL_USER);
const mysqlPasswords = split(process.env.MYSQL_PASSWORD);
const mysqlPorts = split(process.env.MYSQL_PORT);
const mysqlDatabase = process.env.MYSQL_DATABASE;
const l = [
  mysqlHosts.length,
  mysqlUsers.length,
  mysqlPasswords.length,
  mysqlPorts.length,
];
if (Math.max(...l) !== Math.min(...l)) {
  console.log(`\x1b[31mmysql 配置错误 请检查 .env 文件\x1b[0m`);
  process.exit(1);
}
let sequelize: Sequelize;
// 创建 sequelize 对象，设置连接信息
if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize({
    dialect: 'mysql',
    logging: useMysqlLogger(path.join(__dirname, '../../logs/sql')),
    timezone: '+08:00', //东八时区
    replication: {
      read: mysqlHosts.slice(1).map((item, index) => ({
        host: mysqlHosts[index + 1],
        username: mysqlUsers[index + 1],
        password: mysqlPasswords[index + 1],
        port: mysqlPorts[index + 1],
        database: mysqlDatabase,
      })),
      write: {
        host: mysqlHosts[0],
        username: mysqlUsers[0],
        password: mysqlPasswords[0],
        port: mysqlPorts[0],
        database: mysqlDatabase,
      },
    },
  });
}

if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize(mysqlDatabase, mysqlUsers[0], mysqlPasswords[0], {
    host: mysqlHosts[0],
    port: mysqlPorts[0] as any,
    dialect: 'mysql',
    logging: useMysqlLogger(path.join(__dirname, '../../logs/sql')),
    timezone: '+08:00', //东八时区
  });
}
// 测试连接
sequelize
  .authenticate()
  .then(() => console.log('数据库连接成功'))
  .catch(error => console.error('数据库连接失败', error));
export default sequelize;
// 关闭数据库连接
// sequelize.close()
//   .then(() => console.log('数据库连接关闭成功'))
//   .catch(error => console.error('数据库连接关闭失败', error));

// import { Sequelize, Model, DataTypes } from 'sequelize';
// import { mysqlLog } from '../middlewares';

// // 创建 sequelize 对象，设置连接信息
// const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
//     host: process.env.MYSQL_HOST,
//     dialect: 'mysql',
//     logging: mysqlLog,
// });

// // 测试连接
// sequelize.authenticate()
//     .then(() => console.log('数据库连接成功'))
//     .catch(error => console.error('数据库连接失败', error));
// export default sequelize;
// // 关闭数据库连接
// // sequelize.close()
// //   .then(() => console.log('数据库连接关闭成功'))
// //   .catch(error => console.error('数据库连接关闭失败', error));
