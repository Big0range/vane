import { sysRoleMenuServe } from '@/serve';
import { Request, Response } from '@/routes/types';
export default async (req: Request, res: Response) => {
  try {
    const roleId = req.query.roleId;
    if (!roleId) {
      throw new Error('roleId不能为空');
    }
    const result = await sysRoleMenuServe.getMenuIdsByRoleId(Number(roleId));
    res.ok({
      data: result,
    });
  } catch (error) {
    res.fail(error);
  }
};
