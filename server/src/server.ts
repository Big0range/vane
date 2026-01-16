import './utils/alias';
import './utils/loadEnv';
import { useApp } from './app';
import fs from 'fs';
import path from 'path';
import { logger } from './utils/useLogger';
logger.info({ name: 'server', status: 'starting...' }.toString());
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
