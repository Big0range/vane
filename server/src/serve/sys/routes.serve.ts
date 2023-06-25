import sequelize, { Model, DataTypes } from 'sequelize';
import db from '../db';
import { CommServe } from '../comm.serve';
export const SysRoutesTable = db.define(
  'sys_routes',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING(20),
      comment: '路由地址',
      allowNull: false,
    },
    methods: {
      type: DataTypes.STRING(15),
      comment: '请求方式',
      allowNull: false,
    },
    auth: {
      type: DataTypes.STRING(10),
      comment: '是否需要登录 1需要 0不需要',
      defaultValue: '1',
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  },
);

export type TRoutes = {
  id: number;
  url: string;
  methods: string;
  auth: string;
};

class SysRoutesServer extends CommServe<TRoutes> {
  public async create(data: Omit<TRoutes, 'id' | 'auth'>) {
    const result = await this.Table.create(data);
    return result;
  }
  public async destroy(id: number) {
    const result = await this.Table.destroy({
      where: { id },
    });
    return result;
  }
}
export const sysRoutesServe = new SysRoutesServer(SysRoutesTable);
