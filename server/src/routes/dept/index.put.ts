import { Request, Response } from '@/routes/types';
import { deptServe } from '@/serve';
export default async function (req: Request, res: Response) {
  try {
    const { name, desc = null, parent_id = -1, shop_id, id } = req.body;
    if (!id) {
      throw new Error('id不能为空');
    }
    if (!name) {
      throw new Error('部门名称不能为空');
    }
    if (!shop_id) {
      throw new Error('店铺id不能为空');
    }
    // 判断部门是否存在
    const dept = await deptServe.findByNameAndParentId(name, parent_id);
    if (dept && dept.id !== id) {
      throw new Error('部门已存在');
    }
    if (parent_id == id) {
      throw new Error('不能选择自己为上级部门');
    }
    await deptServe.update(id, {
      name,
      desc,
      shop_id,
      parent_id,
    });
    res.ok({
      message: '修改成功',
    });
  } catch (error) {
    res.fail(error);
  }
}
