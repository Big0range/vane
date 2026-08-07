import { formStatServe } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await formStatServe.listSubmissions(req.query as any);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
};
