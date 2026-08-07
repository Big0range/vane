import type { Request, Response } from 'express';
import { sysLogsServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    await sysLogsServe.clear();
    res.ok({ log: '日志全部删除成功' });
  } catch (error: any) {
    console.log(error);
    res.fail({
      ...error,
      log: '日志全部删除失败',
    });
  }
};
