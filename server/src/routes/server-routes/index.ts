import { Request, Response } from '@/routes/types';
import { sysRoutesServe } from '@/serve';
export default async function (req: Request, res: Response): Promise<void> {
  const query = req.query;
  const page = Number(query.page) || 1;
  const pageSize = Number(query.pageSize) || 10;
  const result = await sysRoutesServe.findAll(page, pageSize);
  res.ok({
    data: result,
  });
}
