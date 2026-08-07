import { tableTemplateRowServe, type TableTemplateRow } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Omit<TableTemplateRow, 'id' | 'create_time' | 'update_time'>;
    if (!body.title || !body.key || !body.table_template_code) {
      throw new Error('title or key or table_template_code is empty');
    }
    await tableTemplateRowServe.create(body);
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
};
