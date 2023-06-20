import { DataTypes } from 'sequelize';
import db from '../db';
import { CommServe } from '../comm.serve';
import { SysUserTable } from './user.serve';
import { SysRoleTable } from './role.serve';
export const SysUserRoleTable = db.define(
  'sys_user_role',
  {
    user_id: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      comment: '用户id',
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      field: 'role_id',
      comment: '角色id',
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  },
);
SysUserTable.hasMany(SysUserRoleTable, {
  foreignKey: 'user_id',
  sourceKey: 'id',
  as: 'user_role',
});
SysRoleTable.hasMany(SysUserRoleTable, {
  foreignKey: 'role_id',
  sourceKey: 'id',
  as: 'user_role',
});
SysUserRoleTable.belongsTo(SysRoleTable, {
  foreignKey: 'role_id',
  targetKey: 'id',
});

export type TUserRole = {
  user_id: number;
  role_id: number;
};

class SysUserRoleServe extends CommServe<TUserRole> {
  public async create(data: TUserRole) {
    const result = await this.Table.create(data);
    return result;
  }

  public async findRoleIdByUserId(userId: number): Promise<TUserRole | null> {
    const result: any = await this.Table.findOne({
      where: { user_id: userId },
    });
    return result;
  }
  // /**
  //  * 根据用户id查询角色id
  //  * @param userId  用户id
  //  * @returns  返回角色id
  //  */
  // public async findRoleIdByUserId(userId: number) {
  //   const result = await this.Table.findOne({
  //     where: { user_id: userId },
  //     include: [
  //       {
  //         model: SysRoleTable,
  //         attributes: ['id', 'role_name', 'role_desc'],
  //       },
  //     ],
  //   });
  //   if (result === null) {
  //     return null;
  //   }
  //   console.log('result', result.dataValues.id);

  //   return result;
  // }
}

export const sysUserRoleServe = new SysUserRoleServe(SysUserRoleTable);
