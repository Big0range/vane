import type { Request, Response } from 'express';
import { scheduledJobServe } from '#/serve/index.ts';
import { toScheduledJobDto } from '#/queue/scheduled-job.dto.ts';

export default async (req: Request, res: Response) => {
  try {
    const result = await scheduledJobServe.list(req.query as any);
    res.ok({ data: { ...result, rows: result.rows.map(toScheduledJobDto) } });
  } catch (error: any) {
    res.fail(error);
  }
};
