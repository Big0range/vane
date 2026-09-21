import type { Request, Response } from 'express';
import { scheduledJobServe } from '#/serve/index.ts';

export default async (req: Request, res: Response) => {
  try {
    const { jobName, jobGroup } = req.query as { jobName?: string; jobGroup?: string };
    if (!jobName || !jobGroup) throw new Error('任务名称和任务组不能为空');
    const job = await scheduledJobServe.findByNameAndGroup(jobName, jobGroup);
    if (job) throw new Error('任务名称和任务组已存在');
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
};
