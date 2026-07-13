import { tableTemplateServe, tableTemplateRowServe, type TableTemplate } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const { id, name, desc, code } = req.body as Omit<TableTemplate, 'create_time' | 'update_time'>;
    if (!name || !desc || !code) {
      throw new Error('name, desc, code  is empty');
    }
    await tableTemplateServe.updateById(id, { name, desc, code });
    await tableTemplateRowServe.updateByCode(code, { table_template_code: code });
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
}
