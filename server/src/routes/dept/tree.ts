import { Request, Response } from '@/routes/types';
import { deptServe } from '@/serve';
export default async function (req: Request, res: Response) {
  try {
    const { shop_id } = req.query as any;
    if (!shop_id) {
      throw new Error('shop_id is required');
    }
    const result = await deptServe.tree(req.query as any);
    res.ok({ data: result });
  } catch (error) {
    res.fail(error);
  }
}
