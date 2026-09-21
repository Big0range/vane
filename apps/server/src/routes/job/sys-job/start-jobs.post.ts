import type { Request, Response } from 'express';
import { scheduledJobServe } from '#/serve/index.ts';
import { startScheduledJob } from '#/queue/scheduled-job.service.ts';

export default async (req: Request, res: Response) => {
  try {
    const jobs = await scheduledJobServe.listAll();
    const failedJobNames: string[] = [];

    for (const job of jobs) {
      try {
        await startScheduledJob(job.id, req.userInfo.username);
      } catch {
        failedJobNames.push(job.job_name);
      }
    }

    if (failedJobNames.length) {
      res.ok({
        message: `已启动 ${jobs.length - failedJobNames.length} 个任务，${failedJobNames.join('、')} 启动失败`,
      });
      return;
    }
    res.ok({ message: '全部任务已启动' });
  } catch (error: any) {
    res.fail(error);
  }
};
