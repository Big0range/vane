import { DataTypes } from 'sequelize';
import db from '../db';
import { CommServe } from '../comm.serve';
export const SysRoleTable = db.define(
  'sys_role',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '角色id',
    },
    role_name: {
      type: DataTypes.STRING(20),
      comment: '角色名称',
      allowNull: false,
    },
    role_desc: {
      type: DataTypes.STRING(50),
      comment: '角色描述',
      allowNull: false,
    },
    create_time: {
      type: DataTypes.DATE,
      comment: '创建时间',
      allowNull: false,
      defaultValue: db.literal('CURRENT_TIMESTAMP'),
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '更新时间',
      defaultValue: db.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  },
);

export type TRole = {
  id: number;
  role_name: string;
  role_desc: string;
  create_time: string;
  update_time: string;
};
class SysRoleServe extends CommServe<TRole> {
  public async create(data: Omit<TRole, 'a'>) {
    const result = await this.Table.create(data);
    return result;
  }

  public async update(id: number, data: Partial<TRole>) {
    const result = await this.Table.update(
      {
        ...data,
        id: undefined,
      },
      { where: { id } },
    );
    return result;
  }
}

export const sysRoleServe = new SysRoleServe(SysRoleTable);
