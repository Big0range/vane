import { DataTypes } from 'sequelize';
import db from '../db';
import { CommServe } from '../comm.serve';
import redis from '../../utils/redis';

export const SysMenuTable = db.define(
  'sys_menu',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '菜单id',
    },
    name: {
      type: DataTypes.STRING(20),
      comment: '菜单名称',
    },
    title: {
      type: DataTypes.STRING(50),
      comment: '菜单标题',
    },
    path: {
      type: DataTypes.STRING(50),
      comment: '菜单路径',
      defaultValue: '',
    },
    permission: {
      type: DataTypes.STRING(50),
      comment: '菜单权限',
    },
    component: {
      type: DataTypes.STRING(50),
      comment: '页面组件地址',
    },
    redirect: {
      type: DataTypes.STRING(50),
      comment: '重定向地址',
    },
    affix: {
      type: DataTypes.INTEGER,
      comment: '是否固定在tagsView',
      defaultValue: 0,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      comment: '父级菜单id',
    },
    hidden: {
      type: DataTypes.INTEGER,
      comment: '是否隐藏',
      defaultValue: 0,
    },
    icon: {
      type: DataTypes.STRING(50),
      comment: '菜单图标',
    },
    keep_alive: {
      type: DataTypes.INTEGER,
      comment: '是否缓存',
      defaultValue: 0,
    },
    del_flag: {
      type: DataTypes.INTEGER,
      comment: '是否删除',
      defaultValue: 0,
    },
    sort: {
      type: DataTypes.INTEGER,
      comment: '排序',
      defaultValue: 0,
    },
    type: {
      type: DataTypes.STRING(50),
      comment: '菜单类型',
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

export type TMenu = {
  id: number;
  name: string;
  title: string;
  permission: string;
  path: string;
  component: string;
  redirect: string;
  affix: number;
  parent_id: number;
  hidden: number;
  icon: string;
  keep_alive: number;
  del_flag: number;
  sort: number;
  dataValues: any;
  type: string;
  create_time: Date;
  update_time: Date;
};

class SysMenuServe extends CommServe<TMenu> {
  private redisKey = 'menu:all';

  async clearRedis() {
    const keys = await redis.keys('menu*');
    keys.forEach(key => {
      redis.del(key);
    });
  }

  public async update(data: TMenu) {
    if (!data.id) {
      throw new Error('id不能为空');
    }
    await this.Table.update(this.filterWhereAttributes(data, [undefined]), {
      where: {
        id: data.id,
      },
    });
    await this.clearRedis();
  }

  public async deleteByIds(ids: (number | string)[] | string | number) {
    await this.Table.update(
      { del_flag: 1 },
      {
        where: {
          id: ids,
        },
      },
    );
    await this.clearRedis();
  }

  public async create(data: Omit<TMenu, 'id' | 'del_flag'>) {
    if (!data.parent_id) {
      throw new Error('parent_id不能为空');
    }

    if (!data.type) {
      throw new Error('type不能为空');
    }

    if (!data.title) {
      throw new Error('title不能为空');
    }

    await this.Table.create(this.filterWhereAttributes(data));
    await this.clearRedis();
  }

  public async findAllMenu() {
    // 首先要查询此role_id是否在redis中已存在
    // 如果存在，直接返回
    const redisMenu = await redis.get(this.redisKey);
    if (redisMenu) {
      return JSON.parse(redisMenu);
    }

    // 如果不存在，查询数据库，然后存入redis
    const result: TMenu[] = (await this.Table.findAll({
      attributes: {
        exclude: ['create_time', 'update_time'],
      },
      where: {
        del_flag: 0,
      },
      order: [['sort', 'DESC']],
    })) as any;
    const menus = result.map(item => ({
      ...item.dataValues,
      children: [],
    }));
    menus.forEach(item => {
      const parent_id = item.parent_id;
      for (let i = 0; i < menus.length; i++) {
        const element = menus[i];
        const id = element.id;
        if (parent_id === id) {
          element.children.push(item);
          break;
        }
      }
    });
    const afterMenus = menus.filter(item => item.parent_id === -1);
    redis.set(this.redisKey, JSON.stringify(afterMenus));
    return afterMenus;
  }
}

export const sysMenuServe = new SysMenuServe(SysMenuTable);
