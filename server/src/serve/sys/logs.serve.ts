import sequelize, { DataTypes } from 'sequelize';
import db from '../db';
import { CommServe } from '../comm.serve';
import { SysUserTable, sysUserServe } from './user.serve';
import { SysRoleTable } from './role.serve';
export const SysLosTable = db.define(
  'sys_logs',
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
// 关联表===>用户表
SysUserTable.hasMany(SysLosTable, {
  foreignKey: 'user_id',
  sourceKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'user',
});
SysLosTable.belongsTo(SysUserTable, {
  foreignKey: 'user_id',
  targetKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'user',
});

// 关联表===>角色表
SysRoleTable.hasMany(SysLosTable, {
  foreignKey: 'role_id',
  sourceKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'roles',
});
SysLosTable.belongsTo(SysRoleTable, {
  foreignKey: 'role_id',
  targetKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'roles',
});

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

  public async clear() {
    await this.Table.destroy({
      where: {},
    });
  }

  public async list(
    params: Partial<TLos> & {
      username?: string;
      start_time?: string;
      end_time?: string;
    } & PageQueryParam,
  ) {
    const where: sequelize.WhereOptions<any> = {
      ...this.filterWhereAttributes(params, [undefined, '']),
      ip: {
        [sequelize.Op.like]: `%${params.ip || ''}%`,
      },
      url: {
        [sequelize.Op.like]: `%${params.url || ''}%`,
      },
      create_time: {
        [sequelize.Op.lt]: new Date(params.end_time || '9999-12-31 23:59:59'),
        [sequelize.Op.gt]: new Date(params.start_time || '1970-01-01 00:00:00'),
      },
    };
    if (params.username) {
      const users = await sysUserServe.findAll({
        where: {
          username: {
            [sequelize.Op.like]: `%${params.username || ''}%`,
          },
        },
      });
      where.user_id = users.rows.map(item => item.id);
    }
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
      where,
      attributes: {
        exclude: ['user_id', 'role_id'],
      },
      include: [
        {
          model: SysUserTable,
          attributes: ['username'],
          as: 'user',
        },
        {
          model: SysRoleTable,
          as: 'roles',
          attributes: ['role_name'],
        },
      ],
      raw: true,
    })) as IItem;
    result.rows.forEach(item => {
      item.username = item['user.username'];
      delete item['user.username'];
      item.role_name = item['roles.role_name'];
      delete item['roles.role_name'];
    });
    return result;
  }
}

export const sysLogsServe = new SysLogsServe(SysLosTable);
