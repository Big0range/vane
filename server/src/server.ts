import './utils/alias';
import './utils/loadEnv';
import { useApp } from './app';
import fs from 'fs';
import path from 'path';
console.log(
  fs.readFileSync(path.resolve(__dirname, '../cao_ni_ma.txt'), 'utf8'),
);
const port = process.env.PORT || 3000;
(async () => {
  const app = await useApp();

  function onListening(server: any) {
    return async () => {
      const addr = server.address();
      const bind =
        typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
      console.log(
        `\x1B[32mListening on ${bind} NODE_ENV:${process.env.NODE_ENV}\x1B[0m`,
      );
    };
  }
  const server = app.listen(port);
  server.on('listening', onListening(server));
  server.on('error', onError);

  // 使用pm2 放弃了自己写的集群
  // if (process.env.NODE_ENV === 'production') {
  //   if (cluster.isPrimary) {
  //     console.log(`\x1B[34m主核心进程 ${process.pid} 正在运行\x1B[0m`);

  //     // Fork workers.
  //     for (let i = 0; i < cpuNums; i++) {
  //       console.log(`\x1B[34m分支进程 ${i}...\x1B[0m`);
  //       await sleep(3000);
  //       cluster.fork();
  //     }

  //     cluster.on('exit', (worker, code, signal) => {
  //       cluster.fork();
  //       console.log(`worker ${worker.process.pid} died`);
  //     });
  //   } else {
  //     const server = app.listen(port);
  //     server.on('listening', onListening(server));
  //     server.on('error', onError);
  //   }
  // } else {
  //   console.log(`\x1B[34m开发模式下单核心运行 ${process.pid}\x1B[0m`);
  //   const server = app.listen(port);
  //   server.on('listening', onListening(server));
  //   server.on('error', onError);
  // }

  function onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
})();
