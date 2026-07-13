import * as path from 'path';
import RedisStore from 'connect-redis';
import express from 'express';
import session from 'express-session';
// Routes
import { useRouters } from './hooks/useRouters.ts';
import { authorization } from './middlewares/authorization.ts';
import { errorHandler, errorNotFoundHandler, resultHandler } from './middlewares/index.ts';
import redis from './utils/redis.ts';
import { isPhoneNumber } from '@vane/utils';
console.log('isPhoneNumber', String(isPhoneNumber('17367914262')));
// Create Express server
export async function useApp() {
  const app = express();
  app.use((req, res, next: any) => {
    req.startTime = Date.now();
    // console.log('req.startTime', req.startTime);
    next();
  });
  // sessionv
  const store = new RedisStore({
    client: redis,
    prefix: 'session:',
  });
  app.use(
    session({
      store: store,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: Number(process.env.SESSION_EXPIRE || 600000) }, // 有效期，单位是毫秒
    }),
  );

  // Express configuration
  app.set('views', path.join(import.meta.dirname, '../views'));

  // useApiLogger(app, path.join(__dirname, '../logs/api/'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // app.use(cookieParser());
  app.use(express.static(path.join(import.meta.dirname, '../public')));
  app.use(resultHandler);
  app.use(authorization);

  await useRouters(app);

  app.use(errorNotFoundHandler);
  app.use(errorHandler);
  return app;
}
