/* eslint-disable @typescript-eslint/no-unused-vars */
import createError from 'http-errors';
import { Response, NextFunction, Request } from '../routes/types';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.locals.message = err.message;
  res.locals.error = err;
  console.log('errorHandler', err);
  res.status(err.status || 500);
  res.send({ message: err.message, status: err.status || 500, data: err.data });
};

export const errorNotFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log(req.url);
  next(createError(404));
};
