// import "./utils/alias.ts";
import fs from 'fs';
import path from 'path';
import { useApp } from './app.ts';
import { syncDb } from './serve/index.ts';
import { logger } from './utils/useLogger.ts';
logger.info(JSON.stringify({ name: 'server', status: 'starting...' }));
console.log(fs.readFileSync(path.resolve(import.meta.dirname, '../cao_ni_ma.txt'), 'utf8'));
process.on('unhandledRejection', console.error);
const port = process.env.PORT || 3000;
(async () => {
  const app = await useApp();

  try {
    await syncDb();
    logger.info('数据库同步完成');
  } catch (error) {
    logger.error('数据库同步失败', error);
    process.exit(1);
  }

  function onListening(server: any) {
    return async () => {
      try {
        const addr = server.address();
        const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`\x1B[32mListening on ${bind} NODE_ENV:${process.env.NODE_ENV}\x1B[0m`);
      } catch (error) {
        logger.error('监听失败', error);
      }
    };
  }
  const server = app.listen(port);
  server.on('listening', onListening(server));
  server.on('error', onError);

  function onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        logger.error(`${bind} 权限不足`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(`${bind} 端口已被占用`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
})();
