import { formServe, type Form } from '#/serve/index.ts';
import type { Request, Response } from 'express';

type ImportFormBody = Pick<Form, 'title' | 'code' | 'desc' | 'rule' | 'option'> & {
  status?: boolean;
};

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body as ImportFormBody;
    if (!data.title) {
      throw new Error('title is empty');
    }
    if (!data.code) {
      throw new Error('code is empty');
    }
    if (!Array.isArray(data.rule)) {
      throw new Error('rule must be array');
    }
    if (!data.option || typeof data.option !== 'object' || Array.isArray(data.option)) {
      throw new Error('option must be object');
    }

    await formServe.create({
      title: data.title,
      code: data.code,
      desc: data.desc || '',
      rule: data.rule,
      option: data.option,
      status: data.status ?? true,
    });
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
};
