import { Request, Response } from '@/routes/types';
import { sysUserServe } from '@/serve';
export default async (req: Request, res: Response) => {
  try {
    await sysUserServe.logout(req.userInfo.id);
    res.ok();
  } catch (error) {
    res.fail(error);
  }
};
