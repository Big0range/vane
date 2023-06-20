import sequelize, { Model, DataTypes } from 'sequelize';
import db from '../db';
import { CommServe } from '../comm.serve';
import { SysRoleTable } from './role.serve';
import { ShopTable } from '../shop.serve';
import { DeptTable } from '../dept.serve';
import Token from '../../utils/token';
import redis from '../../utils/redis';
export const SysUserTable = db.define(
  'sys_user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(20),
      comment: '用户名',
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      comment: '手机号',
    },
    password: {
      type: DataTypes.STRING(50),
      comment: '密码',
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING(200),
      comment: '头像',
    },
    role_id: {
      type: DataTypes.INTEGER,
      comment: '角色id',
    },
    shop_id: {
      type: DataTypes.INTEGER,
      comment: '店铺id',
    },
    dept_id: {
      type: DataTypes.INTEGER,
      comment: '部门id',
    },
    del_flag: {
      type: DataTypes.INTEGER,
      comment: '删除标志',
      defaultValue: 0,
    },
    status: {
      type: DataTypes.INTEGER,
      comment: '账号状态 0正常 1禁用',
      defaultValue: 0,
    },
    screen_lock: {
      type: DataTypes.INTEGER,
      comment: '锁屏状态 0未锁屏 1锁屏',
      defaultValue: 0,
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
    hooks: {
      // 数据更新时 从redis中删除此条数据
      beforeUpdate: async (instance: Model, options) => {
        // console.log(instance.dataValues, instance.previous().role_id);
        // 角色变更时 退出登录
        if (instance.previous().role_id !== undefined) {
          await Token.logout(instance.get('id') as string);
          console.log(`redis ===> userInfo:${instance.get('id')} 已踢下线`);
        }
        await redis.del(`userInfo:${instance.get('id')}`);
        console.log(`redis ===> userInfo:${instance.get('id')} 已删除`);
      },
    },
  },
);
// 关联表===>角色表
SysRoleTable.hasMany(SysUserTable, {
  foreignKey: 'role_id',
  sourceKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'role',
});
SysUserTable.belongsTo(SysRoleTable, {
  foreignKey: 'role_id',
  targetKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'role',
});

ShopTable.hasMany(SysUserTable, {
  foreignKey: 'shop_id',
  sourceKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'shop',
});
SysUserTable.belongsTo(ShopTable, {
  foreignKey: 'shop_id',
  targetKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'shop',
});

DeptTable.hasMany(SysUserTable, {
  foreignKey: 'dept_id',
  sourceKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'dept',
});
SysUserTable.belongsTo(DeptTable, {
  foreignKey: 'dept_id',
  targetKey: 'id',
  constraints: false, // 不添加外键约束
  as: 'dept',
});

export type TUser = {
  id: number;
  username: string;
  password: string;
  avatar: string;
  role_id: number;
  shop_id: number;
  dept_id: number;
  phone: string;
  status: number;
  del_flag: number;
  screen_lock: number;
  create_time: Date;
  update_time: Date;
};

class SysUserServe extends CommServe<TUser> {
  /**
   * 创建用户
   * @param data 用户信息
   */
  public async create(
    data: Partial<
      Pick<
        TUser,
        | 'username'
        | 'avatar'
        | 'password'
        | 'phone'
        | 'role_id'
        | 'shop_id'
        | 'dept_id'
      >
    >,
  ) {
    const result = await this.Table.create(data);
    return result;
  }

  /**
   * 获取用户列表
   * @param params 搜索条件
   */
  public async list(params: {
    page: number;
    pageSize: number;
    username?: string;
    role_id?: string | number;
    status?: string | number;
  }) {
    const options = this.filterWhereAttributes(params);
    const result = await this.findAll(params.page, params.pageSize, {
      where: {
        ...options,
        username: {
          [sequelize.Op.like]: `%${params.username || ''}%`,
        },
        del_flag: 0,
      },
      include: [
        {
          model: SysRoleTable,
          as: 'role',
          attributes: ['id', ['role_name', 'name']],
        },
        {
          model: ShopTable,
          as: 'shop',
          attributes: ['id', 'name'],
        },
        {
          model: DeptTable,
          as: 'dept',
          attributes: ['id', 'name'],
        },
      ],
    });
    return result;
  }

  /**
   * 根据用户名查找用户
   * @param username 用户名
   */
  public async findByUsername(username: string) {
    const result: any = await this.Table.findOne({
      where: {
        username,
      },
    });
    return result as TUser;
  }

  /**
   * 根据用户名和密码查找用户
   * @param username 用户名
   * @param password 用户密码
   * @returns
   */
  public async findByUsernameAndPassword(username: string, password: string) {
    const result = await this.Table.findOne({
      where: {
        username,
        password,
      },
    });
    return result && (result.dataValues as TUser);
  }

  public async logout(id: string | number) {
    await Token.logout(id);
  }

  /**
   * 更新用户信息
   * @param id  用户id
   * @param data 需要更新的数据
   */
  public async update(
    id: string | number | string[] | number[],
    data: Partial<TUser> = {},
  ) {
    delete data.id;
    delete data.create_time;

    const result = await this.Table.update(
      this.filterWhereAttributes(data, [undefined]),
      {
        where: {
          id,
        },
        individualHooks: true,
      },
    );
    return result;
  }

  /**
   * 根据角色id更新用户信息
   * @param role_id 角色id
   * @param data 需要更新的数据
   */
  public async updateByRoleId(
    role_id: string | number | string[] | number[],
    data: Partial<TUser> = {},
  ) {
    delete data.id;
    delete data.create_time;

    const result = await this.Table.update(
      this.filterWhereAttributes(data, [undefined]),
      {
        where: {
          role_id,
        },
        individualHooks: true,
      },
    );
    return result;
  }

  /**
   * 根据用户id获取用户信息
   * @param options 搜索条件
   */
  public async findOne(options: Partial<TUser>) {
    const result = await this.Table.findOne({
      where: options,
    });
    return result && (result.dataValues as TUser);
  }

  /**
   *  根据用户id 从redis中获取用户信息 如果redis中不存在 则从数据库中获取
   * @param id  用户id
   */
  public async redisGetById(id: string | number) {
    const redisUserInfo = await redis.get(`userInfo:${999}`);
    if (redisUserInfo === null) {
      const userInfo = await this.findById(id);
      await redis.set(`userInfo:${id}`, JSON.stringify(userInfo));
      await redis.expire(`userInfo:${id}`, 60 * 60 * 24);
      return userInfo;
    } else {
      return JSON.parse(redisUserInfo);
    }
  }

  public async redisDeleteById(id: string | number) {
    await redis.del(`userInfo:${id}`);
  }
}
export const sysUserServe = new SysUserServe(SysUserTable);
