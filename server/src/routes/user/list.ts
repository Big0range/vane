import { sysUserServe } from '@/serve';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  const {
    page = 1,
    pageSize = 10,
    username,
    role_id,
    status,
  } = req.query as any;
  try {
    const result = await sysUserServe.list({
      page,
      pageSize,
      username,
      role_id,
      status,
    });
    res.ok({
      data: result,
    });
  } catch (error) {
    res.fail(error);
  }
};
