import type { Request, Response } from 'express';
import { shopServe } from '#/serve/index.ts';
export default async function (req: Request, res: Response) {
  try {
    const result = await shopServe.list(req.query as any);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
}
