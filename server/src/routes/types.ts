import {
  Router as ExpressRouter,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { TUser } from '@/serve';
// req
export interface Request extends ExpressRequest {
  session: ExpressRequest['session'] &
    Record<string, any> & { captcha?: string };
  startTime: number;
  userInfo: TUser;
}

// res
export interface Response extends ExpressResponse {
  ok: (arg?: {
    status?: number;
    message?: string;
    data?: any;
    /**日志记录信息 如果传入true则默认用message中的信息 */
    log?: string | true;
    /**是否返回原始数据 不经过data包装 */
    raw?: boolean;
  }) => void;
  fail: (arg?: {
    status?: number;
    message?: string;
    data?: any;
    log?: string;
  }) => void;
}

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
