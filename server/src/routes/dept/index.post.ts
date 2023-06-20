import { Request, Response } from '@/routes/types';
import { deptServe } from '@/serve';
export default async function (req: Request, res: Response) {
  try {
    const {
      name,
      desc = null,
      parent_id = -1,
      shop_id,
      status,
      sort,
    } = req.body;
    if (!name) {
      throw new Error('部门名称不能为空');
    }
    if (!shop_id) {
      throw new Error('店铺id不能为空');
    }
    // 判断部门是否存在
    const dept = await deptServe.findByNameAndParentId(name, parent_id);
    if (dept) {
      throw new Error('部门已存在');
    }
    await deptServe.create({
      name,
      desc,
      shop_id,
      parent_id,
      status,
      sort,
    });
    res.ok({
      message: '创建成功',
    });
  } catch (error) {
    res.fail(error);
  }
}
