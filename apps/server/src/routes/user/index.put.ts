import { isPhoneNumber } from '@vane/utils';
import type { Request, Response } from 'express';
import { type TUser, sysUserServe } from '#/serve/index.ts';
import { md5 } from '#/utils/md5.ts';

export default async (req: Request, res: Response) => {
  // eslint-disable-next-line prefer-const
  let { password, role_id, avatar, phone, shop_id, dept_id, id, username } =
    req.body as Partial<TUser>;
  const selfId = req.userInfo.id;
  const userId = id === undefined ? selfId : id;
  try {
    const verify = isPhoneNumber(phone);
    if (verify) {
      throw new Error(verify);
    }
    const findUser = await sysUserServe.findOne({
      username,
    });
    if (findUser && findUser.username === 'admin') {
      username = undefined;
      role_id = undefined;
    }
    if (findUser && findUser.id !== userId) {
      throw new Error('用户名已存在');
    }

    const user = await sysUserServe.findById(userId);
    if (!user) {
      throw new Error('用户不存在');
    }
    // console.log(user.password, password, user.username, username, userId);
    // 修改了任何信息都需要重新登录
    await sysUserServe.logout(userId);
    const updateData = {
      password: (password || '').trim() ? md5(password!) : undefined,
      shop_id,
      dept_id,
      role_id,
      avatar,
      phone,
      username,
    };
    await sysUserServe.update(userId, updateData);
    res.ok({
      log: `修改了用户(${username})的信息, 原信息为: ${JSON.stringify(user)}, 新信息为: ${JSON.stringify(updateData)}`,
    });
  } catch (error: any) {
    console.log(error);
    res.fail({
      ...error,
      log: `修改用户(id:${userId})信息失败`,
    });
  }
};
