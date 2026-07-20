import * as path from 'path';
import RedisStore from 'connect-redis';
import express, { type NextFunction } from 'express';
import session from 'express-session';
// Routes
import { useRouters } from './hooks/useRouters.ts';
import { authorization } from './middlewares/authorization.ts';
import { errorHandler, errorNotFoundHandler, resultHandler } from './middlewares/index.ts';
import redis from './utils/redis.ts';
// Create Express server
export async function useApp() {
  const app = express();
  app.use(express.static(path.join(import.meta.dirname, '../public')));

  app.use((req, res, next: NextFunction) => {
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
      cookie: {
        maxAge: Number(process.env.SESSION_EXPIRE || 600000),
        httpOnly: true,
        sameSite: 'lax',
      }, // 有效期，单位是毫秒
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(resultHandler);
  app.use(authorization);

  await useRouters(app);

  app.use(errorNotFoundHandler);
  app.use(errorHandler);
  return app;
}
