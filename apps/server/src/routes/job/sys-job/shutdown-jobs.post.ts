import type { Request, Response } from 'express';
import { scheduledJobServe } from '#/serve/index.ts';
import { syncScheduledJob } from '#/queue/scheduled-job.service.ts';

export default async (req: Request, res: Response) => {
  try {
    await scheduledJobServe.updateAllStatus('3');
    const jobs = await scheduledJobServe.listAll();
    for (const job of jobs) await syncScheduledJob(job);
    res.ok({ message: '全部任务已暂停' });
  } catch (error: any) {
    res.fail(error);
  }
};
