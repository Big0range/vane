import 'express-serve-static-core';
import type { TUser } from '#/serve/index.ts';
declare module 'express-serve-static-core' {
  interface Request {
    session: Record<string, any> & { captcha?: string };
    startTime: number;
    userInfo: TUser;
  }
  interface Response {
    ok: (arg?: {
      status?: number;
      message?: string;
      data?: any;
      /**日志记录信息 如果传入true则默认用message中的信息 */
      log?: string | boolean;
      /**是否返回原始数据 不经过data包装 */
      raw?: boolean;
    }) => void;
    fail: (arg?: { status?: number; message?: string; data?: any; log?: string }) => void;
  }
}
