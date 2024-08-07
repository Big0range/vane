import { DataTypes } from 'sequelize';
import db from '../db';
import { CommServe } from '../comm.serve';
import { SysMenuTable } from './menu.serve';
import { SysRoleTable } from './role.serve';
import redis from '../../utils/redis';
export const SysRoleMenuTable = db.define(
  'sys_role_menu',
  {
    role_id: {
      type: DataTypes.INTEGER,
      comment: '角色id',
      allowNull: false,
    },
    menu_id: {
      type: DataTypes.INTEGER,
      comment: '菜单id',
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  },
);
SysMenuTable.hasMany(SysRoleMenuTable, {
  foreignKey: 'menu_id',
  sourceKey: 'id',
});
SysRoleTable.hasMany(SysRoleMenuTable, {
  foreignKey: 'role_id',
  sourceKey: 'id',
});
SysRoleMenuTable.belongsTo(SysRoleTable, {
  foreignKey: 'role_id',
  targetKey: 'id',
});

SysRoleMenuTable.belongsTo(SysMenuTable, {
  foreignKey: 'menu_id',
  targetKey: 'id',
});
export type TRoleMenu = { menu_id: number; role_id: number };
class SysRoleMenuServe extends CommServe<TRoleMenu> {
  // public async create(data: {
  //   roleId: string | number;
  //   menuId: string | number;
  // }) {
  //   const result = await this.Table.create(data);
  //   return result;
  // }
  async clearRedis(roleId: number) {
    redis.del(`menu:${roleId}`);
  }
  public async deleteByRoleId(roleId: number) {
    const result = await this.Table.destroy({
      where: { role_id: roleId },
    });
    return result;
  }

  public async getMenuIdsByRoleId(roleId: number) {
    const result = await this.Table.findAll({
      where: { role_id: roleId },
      attributes: ['menu_id'],
    });
    return result.map(item => item.dataValues.menu_id);
  }

  public async findMenuListByRoleId(roleId: number) {
    // 首先要查询此role_id是否在redis中已存在
    // 如果存在，直接返回
    const redisMenu = await redis.get(`menu:${roleId}`);
    if (redisMenu) {
      console.log('redisMenu');
      return JSON.parse(redisMenu);
    }

    // 如果不存在，查询数据库，然后存入redis
    const result: any[] = await this.Table.findAll({
      where: { role_id: roleId },
      include: [
        {
          model: SysMenuTable,
          where: { del_flag: 0 },
          attributes: {
            exclude: ['create_time', 'update_time'],
          },
        },
      ],
    });
    console.log('result', result);

    const menus = result
      .map(item => ({
        ...item.sys_menu.dataValues,
        children: [],
      }))
      .sort((a, b) => b.sort - a.sort);
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
    redis.set(`menu:${roleId}`, JSON.stringify(afterMenus));
    console.log('mysql');
    return afterMenus;
  }
}
export const sysRoleMenuServe = new SysRoleMenuServe(SysRoleMenuTable);
