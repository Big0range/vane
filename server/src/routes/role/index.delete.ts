import { sysUserServe, sysRoleServe } from '@/serve';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    await sysRoleServe.deleteById(Number(id));
    await sysUserServe.updateByRoleId(Number(id), { role_id: null });
    res.ok();
  } catch (error) {
    res.fail(error);
  }
};
