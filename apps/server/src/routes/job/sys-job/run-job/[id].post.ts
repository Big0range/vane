import type { Request, Response } from 'express';
import { runScheduledJobNow } from '#/queue/scheduled-job.service.ts';

export default async (req: Request, res: Response) => {
  try {
    await runScheduledJobNow(Number(req.params.id));
    res.ok({ message: '任务已加入执行队列' });
  } catch (error: any) {
    res.fail(error);
  }
};
