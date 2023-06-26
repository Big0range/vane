import sequelize, { Model, DataTypes, FindOptions } from 'sequelize';
import db from '../db';
import { CommServe } from '../comm.serve';
import redis from '@/utils/redis';
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
    match: {
      type: DataTypes.STRING(100),
      comment: '路由匹配',
      allowNull: false,
    },
    method: {
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
  method: string;
  auth: string;
  match: string;
};

export class SysRoutesServer extends CommServe<TRoutes> {
  static routeWhitelistKey = 'routeWhitelist';
  static constantRouteWhiteList = [
    {
      url: '/user/login',
      method: 'post',
    },
    {
      url: '/user/register',
      method: 'post',
    },
    {
      url: '/user/code',
      method: 'get',
    },
    {
      url: '/demo/:a/:b/:c',
      method: 'post',
    },
    {
      url: '/config',
      method: 'get',
    },
  ];
  public async create(data: Omit<TRoutes, 'id' | 'auth'> & { auth?: string }) {
    if (
      SysRoutesServer.constantRouteWhiteList.some(
        item => item.url === data.url && item.method === data.method,
      )
    ) {
      data.auth = '0';
    }
    const result = await this.Table.create(data);
    await redis.del(SysRoutesServer.routeWhitelistKey);
    return result;
  }
  /**
   * 获取路由列表
   */

  public async getRouteList(
    page: number,
    pageSize: number,
    options: Pick<TRoutes, 'auth' | 'url' | 'method'>,
  ) {
    const where: FindOptions['where'] = {};
    if (options.auth) {
      where.auth = options.auth;
    }
    if (options.url) {
      where.url = {
        [sequelize.Op.like]: `%${options.url}%`,
      };
    }
    if (options.method) {
      where.method = options.method;
    }
    const result = await this.findAll(page, pageSize, { where });
    const routeWhiteObj: Record<string, boolean> = {};
    SysRoutesServer.constantRouteWhiteList.forEach(item => {
      routeWhiteObj[item.url + '|' + item.method] = true;
    });
    result.rows = result.rows.map(item => {
      const route = item;
      (route as any).sysWhiteApi =
        routeWhiteObj[route.url + '|' + route.method] || false;
      (route as any).sysWhiteApi && (route.auth = '0');
      return route;
    });
    return result;
  }
  /**
   * 删除数据
   * @param id id
   */
  public async destroy(id: number) {
    const result = await this.Table.destroy({
      where: { id },
    });
    await redis.del(SysRoutesServer.routeWhitelistKey);
    return result;
  }
  /**
   * 获取路由白名单
   */
  public async getRouteWhitelist(): Promise<any[]> {
    const redisResult = await redis.get(SysRoutesServer.routeWhitelistKey);
    if (redisResult && redisResult !== '[]') {
      return [
        ...JSON.parse(redisResult),
        ...SysRoutesServer.constantRouteWhiteList,
      ];
    }
    const result = await this.Table.findAll({
      where: {
        auth: '0',
      },
    });
    const list = [
      ...result.map(itme => itme.dataValues),
      ...SysRoutesServer.constantRouteWhiteList,
    ];
    await redis.set(SysRoutesServer.routeWhitelistKey, JSON.stringify(list));
    return list;
  }

  /**
   * 修改权限
   */
  public async updateAuth(id: number, auth: string) {
    const route = await this.Table.findOne({
      where: {
        id,
      },
    });
    if (!route.dataValues) {
      throw new Error('路由不存在');
    }
    const routeUrl = route.dataValues.url;
    const routeMethods = route.dataValues.method;
    if (
      SysRoutesServer.constantRouteWhiteList.some(
        item => item.url === routeUrl && item.method === routeMethods,
      )
    ) {
      throw new Error('系统路由不允许修改');
    }
    await this.Table.update(
      {
        auth,
      },
      {
        where: {
          id,
        },
      },
    );
    await redis.del(SysRoutesServer.routeWhitelistKey);
  }
}
export const sysRoutesServe = new SysRoutesServer(SysRoutesTable);
