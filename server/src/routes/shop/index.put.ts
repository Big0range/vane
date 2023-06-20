import { Request, Response } from '@/routes/types';
import { shopServe } from '@/serve';
export default async function (req: Request, res: Response) {
  try {
    const { name, address, phone, cover, desc = null, id } = req.body;
    if (!id) {
      throw new Error('店铺id不能为空');
    }
    if (!name) {
      throw new Error('店铺名称不能为空');
    }
    if (!address) {
      throw new Error('店铺地址不能为空');
    }
    if (!phone) {
      throw new Error('店铺电话不能为空');
    }

    // 判断店铺是否存在
    const shop = await shopServe.findByName(name);
    if (shop && shop.id !== id) {
      throw new Error('店铺已存在');
    }
    await shopServe.update(id, {
      name,
      address,
      phone,
      cover,
      desc,
    });
    res.ok({
      message: '店铺信息修改成功',
    });
  } catch (error) {
    res.fail(error);
  }
}
