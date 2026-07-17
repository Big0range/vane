import { formStatServe } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const result = await formStatServe.getSubmissionDetail(id);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
}
