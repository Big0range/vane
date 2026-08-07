import type { TableTemplate } from '#/serve/index.ts';
import { tableTemplateServe } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query as any as TableTemplate & PageQueryParam;

    const result = await tableTemplateServe.list(query);
    res.ok({ data: result });
  } catch (error: any) {
    res.fail(error);
  }
};
