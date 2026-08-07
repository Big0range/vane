import type { Request, Response } from 'express';
import sequelize from 'sequelize';
import mysql from '#/serve/db.ts';
import { sysLogsServe } from '#/serve/index.ts';
export default async (req: Request, res: Response): Promise<void> => {
  //   const user = await SysLosTable.findOne({
  //     where: { id: 547 },
  //     lock: sequelize.Transaction.LOCK.UPDATE,
  //   });
  //   console.log('user:000000', user.dataValues);
  //   (user as any).status = 100;
  //   await user.save();
  //   const user2 = await SysLosTable.findOne({
  //     where: { id: 547 },
  //   });
  //   console.log('user:222222', user2.dataValues);
  //   res.ok();
  // 开始事务，并设置隔离级别为 SERIALIZABLE
  const transaction = await mysql.transaction({});
  try {
    const loginfo = await sysLogsServe.Table.findOne({
      where: {
        id: 547,
      },
      lock: sequelize.Transaction.LOCK.UPDATE,
      transaction,
    });
    (loginfo as any).status -= 9;
    console.log('loginfo:111111', loginfo!.dataValues);
    await loginfo!.save({ transaction });
    // 提交事务
    await transaction.commit();
    res.ok();
    console.log('事务成功');
  } catch (error: any) {
    // 回滚事务
    await transaction.rollback();
    res.fail({
      message: error.message,
    });
    console.error('事务错误:', error.message);
  }
};
