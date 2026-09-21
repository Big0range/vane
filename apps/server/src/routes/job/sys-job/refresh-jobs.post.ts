import type { Request, Response } from 'express';
import { refreshScheduledJobs } from '#/queue/scheduled-job.service.ts';

export default async (_req: Request, res: Response) => {
  try {
    await refreshScheduledJobs();
    res.ok({ message: '调度器已按数据库任务重建' });
  } catch (error: any) {
    res.fail(error);
  }
};
