import { Request, Response } from '@/routes/types';
import { sysLogsServe } from '@/serve';
export default async function (req: Request, res: Response) {
  try {
    await sysLogsServe.clear();
    res.ok({ log: '日志全部删除成功' });
  } catch (error) {
    res.fail({
      ...error,
      log: '日志全部删除失败',
    });
  }
}
