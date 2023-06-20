import { Request, Response } from '@/routes/types';
import { sysLogsServe } from '@/serve';
export default async function (req: Request, res: Response) {
  try {
    const query = req.query;
    const result = await sysLogsServe.list(query);
    res.ok({ data: result });
  } catch (error) {
    res.fail({
      ...error,
      log: '日志列表获取失败',
    });
  }
}
