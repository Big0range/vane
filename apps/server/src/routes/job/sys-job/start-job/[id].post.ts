import type { Request, Response } from 'express';
import { startScheduledJob } from '#/queue/scheduled-job.service.ts';

export default async (req: Request, res: Response) => {
  try {
    await startScheduledJob(Number(req.params.id), req.userInfo.username);
    res.ok({ message: '任务已启动' });
  } catch (error: any) {
    res.fail(error);
  }
};
