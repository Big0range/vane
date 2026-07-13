import type { Request, Response } from 'express';
import { deptServe } from '#/serve/index.ts';
export default async function (req: Request, res: Response) {
  try {
    const result = await deptServe.tree(req.query as any);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
}
