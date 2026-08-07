import { formCommOptionsServe, type FormCommOptions } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query as any as FormCommOptions & PageQueryParam;
    const result = await formCommOptionsServe.list(query);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
};
