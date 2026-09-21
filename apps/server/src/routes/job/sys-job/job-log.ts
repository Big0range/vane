import type { Request, Response } from 'express';
import { scheduledJobLogServe } from '#/serve/index.ts';
import { toScheduledJobLogDto } from '#/queue/scheduled-job.dto.ts';

export default async (req: Request, res: Response) => {
  try {
    const { jobId, page, pageSize } = req.query as any;
    if (!jobId) throw new Error('任务 ID 不能为空');
    const result = await scheduledJobLogServe.list({
      jobId: Number(jobId),
      page: Number(page || 1),
      pageSize: Number(pageSize || 20),
    });
    res.ok({ data: { ...result, rows: result.rows.map(toScheduledJobLogDto) } });
  } catch (error: any) {
    res.fail(error);
  }
};
