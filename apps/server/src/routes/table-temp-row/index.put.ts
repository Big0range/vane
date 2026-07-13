import { tableTemplateRowServe, type TableTemplateRow } from '#/serve/index.ts';
import type { Request, Response } from 'express';

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const { id, title, key, width, fixed, align, sort, visible, ellipsis } = req.body as Omit<
      TableTemplateRow,
      'create_time' | 'update_time'
    >;
    if (!title || !key) {
      throw new Error('title or key  is empty');
    }
    await tableTemplateRowServe.updateById(id, {
      title,
      key,
      width,
      fixed,
      align,
      sort,
      visible,
      ellipsis,
    });
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
}
