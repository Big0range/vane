import db from '#/serve/db.ts';
import { formDataJsonServe, formDataServe, formItemServe, formServe } from '#/serve/index.ts';
import type { Request, Response } from 'express';

type SubmitFormBody = {
  form_code?: string;
  version?: number;
  data?: Record<string, any>;
};

export default async function (req: Request, res: Response): Promise<void> {
  try {
    const { form_code: formCode, version, data } = req.body as SubmitFormBody;
    if (!formCode) {
      throw new Error('form_code is empty');
    }
    if (!data || typeof data !== 'object') {
      throw new Error('data is empty');
    }
    const userId = req.userInfo?.id;
    if (!userId) {
      throw new Error('user not found');
    }

    const form = await formServe.getByCode(formCode);
    if (!form) {
      throw new Error('form not found');
    }

    const submitVersion = Number(version || form.version || 1);
    const formItems = await formItemServe.list(formCode, submitVersion);

    await db.transaction(async (transaction) => {
      const formDataJsonResult = await formDataJsonServe.create(
        {
          form_code: formCode,
          version: submitVersion,
          user_id: userId,
          data,
        },
        { transaction },
      );

      for (const item of formItems.rows) {
        const valueObj = data[item.field] === undefined ? null : data[item.field];
        if (!valueObj) {
          continue;
        }
        await formDataServe.create(
          {
            form_code: formCode,
            form_json_id: formDataJsonResult.dataValues.id,
            version: submitVersion,
            user_id: userId,
            item_id: item.id,
            value: valueObj.value ?? valueObj,
            label: valueObj.label || null,
          },
          { transaction },
        );
      }
    });
    res.ok();
  } catch (error: any) {
    res.fail(error);
  }
}
