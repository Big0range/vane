import sequelize, { DataTypes } from 'sequelize';
import db from '../db';
import { CommServe } from '../comm.serve';
import { SysUserTable, sysUserServe } from './user.serve';
import { SysRoleTable } from './role.serve';
export const SysLosTable = db.define(
  'sys_jobs',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    msg: {
      type: DataTypes.STRING(50),
      comment: '日志信息',
    },
    ip: {
      type: DataTypes.STRING(20),
      comment: 'ip地址',
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(200),
      comment: '请求地址',
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING(10),
      comment: '请求方式',
      allowNull: false,
    },
    query: {
      type: DataTypes.TEXT,
      comment: '请求参数',
    },
    body: {
      type: DataTypes.TEXT,
      comment: '请求体',
    },
    status: {
      type: DataTypes.INTEGER,
      comment: '状态',
      allowNull: false,
    },
    response_time: {
      type: DataTypes.INTEGER,
      comment: '响应时间',
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

export type TLos = {
  id: number;
  ip: string;
  msg: string;
  response_time: number;
  status: number;
  user_id?: number;
  role_id?: number;
  url: string;
  method: string;
  query: string;
  body: string;
  create_time: Date;
  update_time: Date;
};

class SysLogsServe extends CommServe<TLos> {
  public async create(data: Omit<TLos, 'id' | 'create_time' | 'update_time'>) {
    const result = await this.Table.create(data);
    return result;
  }

  public async list(
    params: Partial<TLos> & {
      username?: string;
      start_time?: string;
      end_time?: string;
    } & PageQueryParam,
  ) {
    type TResult = PromiseReturnType<typeof this.findAll>;
    interface IItem extends TResult {
      rows: (TResult['rows'][0] & {
        username: string;
        'user.username': string;
        role_name: string;
        'roles.role_name': string;
      })[];
    }
    const result = (await this.findAll(params.page, params.pageSize, {
      order: [['create_time', 'DESC']],
    })) as IItem;
    return result;
  }
}

export const sysLogsServe = new SysLogsServe(SysLosTable);
