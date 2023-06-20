import { Request, Response } from '@/routes/types';
import { shopServe } from '@/serve';
export default async function (req: Request, res: Response) {
  try {
    const { name, address, phone, desc = null, cover } = req.body;
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
    if (shop) {
      throw new Error('店铺已存在');
    }
    await shopServe.create({
      name,
      address,
      phone,
      cover,
      desc,
    });
    res.ok({
      message: '创建成功',
    });
  } catch (error) {
    res.fail(error);
  }
}
