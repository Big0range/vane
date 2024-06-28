import express from 'express';
import path from 'path';
import '../src/utils/alias';
import '../src/utils/loadEnv';
import routes from './routes';
const port = process.env.JOB_PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

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
