import { formCommOptionsItemServe, type FormCommOptionsItem } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const query = req.query as any as FormCommOptionsItem & PageQueryParam;
    if (!query.comm_options_code) {
      throw new Error('comm_options_code不能为空');
    }
    const result = await formCommOptionsItemServe.list(query);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
}
