import { sysRoleServe } from '@/serve';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  try {
    const body = req.body;
    body.id = undefined;
    await sysRoleServe.create(body);
    res.ok();
  } catch (error) {
    res.fail(error);
  }
};
