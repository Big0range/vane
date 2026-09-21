import type { Request, Response } from 'express';
import { scheduledJobServe } from '#/serve/index.ts';
import { removeScheduledJob } from '#/queue/scheduled-job.service.ts';

export default async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const job = await scheduledJobServe.getById(id);
    if (!job) throw new Error('任务不存在');
    if (job.job_status === '2') throw new Error('运行中任务请先暂停');
    await removeScheduledJob(id);
    await scheduledJobServe.deleteById(id);
    res.ok({ message: '删除任务成功' });
  } catch (error: any) {
    res.fail(error);
  }
};
