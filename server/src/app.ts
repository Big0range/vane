import express from 'express';
import * as path from 'path';
import session from 'express-session';
import RedisStore from 'connect-redis';
import redis from './utils/redis';
// import cookieParser from 'cookie-parser';
import { useApiLogger } from './hooks/useLogger';
import {
  errorHandler,
  errorNotFoundHandler,
  resultHandler,
} from './middlewares';
// Routes
import { useRouters } from './hooks/useRouters';
import { authorization } from './middlewares/authorization';
import { Request, Response } from './routes/types';
// Create Express server
export async function useApp() {
  const app = express();
  app.use((req: Request, res, next) => {
    req.startTime = Date.now();
    // console.log('req.startTime', req.startTime);
    next();
  });

  // session
  app.use(
    session({
      store: new RedisStore({
        client: redis,
        prefix: 'session:',
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: Number(process.env.SESSION_EXPIRE || 600000) }, // 有效期，单位是毫秒
    }),
  );

  // Express configuration
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'pug');

  useApiLogger(app, path.join(__dirname, '../logs/api/'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(resultHandler);
  app.use(authorization);

  await useRouters(app);

  app.use(errorNotFoundHandler);
  app.use(errorHandler);
  return app;
}
