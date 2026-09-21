import type { Request, Response } from 'express';
import { getScheduledJobActionOptions } from '#/queue/scheduled-job.handlers.ts';

// 返回新增或编辑任务时可选择的内置动作与 TS 脚本。
export default async (_req: Request, res: Response) => {
  try {
    res.ok({ data: await getScheduledJobActionOptions() });
  } catch (error: any) {
    res.fail(error);
  }
};
