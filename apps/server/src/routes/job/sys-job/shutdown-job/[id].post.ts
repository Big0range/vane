import type { Request, Response } from 'express';
import { scheduledJobServe } from '#/serve/index.ts';
import { syncScheduledJob } from '#/queue/scheduled-job.service.ts';

export default async (req: Request, res: Response) => {
  try {
    const job = await scheduledJobServe.updateStatus(
      Number(req.params.id),
      '3',
      req.userInfo.username,
    );
    if (!job) throw new Error('任务不存在');
    await syncScheduledJob(job);
    res.ok({ message: '任务已暂停' });
  } catch (error: any) {
    res.fail(error);
  }
};
