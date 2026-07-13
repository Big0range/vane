import type { Response, NextFunction, Request } from 'express';
import createError from 'http-errors';
import { logger } from '#/utils/useLogger.ts';

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction): void => {
  res.locals.message = err.message;
  res.locals.error = err;
  logger.error('errorHandler: ' + err);
  res.status(err.status || 500);
  res.send({ message: err.message, status: err.status || 500, data: err.data });
};

export const errorNotFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  logger.info('errorNotFoundHandler: ' + req.url);
  next(createError(404));
};
