import type { Form } from '#/serve/index.ts';
import { formServe } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const query = req.query as any as Form & PageQueryParam;
    const result = await formServe.list(query);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
}
