import { Request, Response } from '@/routes/types';
import { shopServe } from '@/serve';
export default async function (req: Request, res: Response) {
  try {
    const result = await shopServe.list(req.query as any);
    res.ok({ data: result });
  } catch (error) {
    res.fail(error);
  }
}
