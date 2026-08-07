import type { Request, Response } from 'express';
import { deptServe } from '#/serve/index.ts';
export default async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deptServe.tree(req.query as any);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
};
