import { DataTypes } from 'sequelize';
import { CommServe } from '../comm.serve.ts';
import db from '../db.ts';
import { sysRoleMenuServe } from './role_menu.serve.ts';
import redis from '#/utils/redis.ts';
import { sysRoutesServe } from './routes.serve.ts';

export const SysMenuRoutesTable = db.define(
  'sys_menu_routes',
  {
    menu_id: {
      type: DataTypes.INTEGER,
      comment: '菜单id',
      allowNull: false,
      primaryKey: true,
    },
    route_id: {
      type: DataTypes.INTEGER,
      comment: '路由id',
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    indexes: [
      {
        name: 'idx_menu_id',
        fields: ['menu_id'],
      },
    ],
  },
);

export type TMenuRoutes = { menu_id: number; route_id: number };
export type TRoleRoutes = {
  /**角色已分配的路由 */
  roleRoutes: Record<string | number, boolean>;
  /**角色未分配的路由 */
  unRoleRoutes: Record<string | number, boolean>;
};
class SysMenuRoutesServe extends CommServe<TMenuRoutes> {
  private redisKey = 'menu_role_routes';

  /**批量添加菜单对应的路由 */
  async bulkCreate(data: TMenuRoutes[]) {
    await this.clearRedis();
    return await this.Table.bulkCreate(data as any);
  }

  /**批量删除菜单对应的路由 */
  async deleteByMenuId(menuId: number) {
    await this.Table.destroy({
      where: {
        menu_id: menuId,
      },
    });
    await this.clearRedis();
  }
  async getByMenuId(menuId: number) {
    return await this.findAll({
      where: {
        menu_id: menuId,
      },
    });
  }
  async getFullRouteByRoleId(roleId: number): Promise<any[]> {
    const redisCatch = await redis.get(`${this.redisKey}:${roleId}`);
    if (redisCatch) {
      return JSON.parse(redisCatch);
    }
    const roleMenus = await sysRoleMenuServe.getMenuIdsByRoleId(roleId);
    const routeIds = (
      await this.findAll({
        where: {
          menu_id: roleMenus,
        },
      })
    ).rows.map((item) => item.route_id);
    const roleRoutes = (
      await sysRoutesServe.findAll({
        where: {
          id: routeIds,
        },
      })
    ).rows;
    redis.set(`${this.redisKey}:${roleId}`, JSON.stringify(roleRoutes));
    return roleRoutes;
  }
  public async clearRedis() {
    const keys = await redis.keys(`${this.redisKey}*`);
    keys.forEach((key) => {
      redis.del(key);
    });
  }
}
export const sysMenuRoutesServe = new SysMenuRoutesServe(SysMenuRoutesTable);
