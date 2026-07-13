import { Router as ExpressRouter } from 'express';

export const Router = ExpressRouter;
export interface NextFunction {
  (err?: { status?: number; message?: string; data?: any }): void;
  /**
   * "Break-out" of a router by calling {next('router')};
   * @see https://expressjs.com/en/guide/using-middleware.html#middleware.router
   */
  (deferToNext: 'router'): void;
  /**
   * "Break-out" of a route by calling {next('route')};
   * @see https://expressjs.com/en/guide/using-middleware.html#middleware.application
   */
  (deferToNext: 'route'): void;
}
