import type { Request, Response } from 'express';
import { sysLogsServe } from '#/serve/index.ts';
export default async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const result = await sysLogsServe.list(query);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail({
      ...error,
      log: '日志列表获取失败',
    });
  }
};
