import sequelize, { Model, DataTypes } from 'sequelize';
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
  match: string;
};

class SysRoutesServer extends CommServe<TRoutes> {
  static routeWhitelistKey = 'routeWhitelist';
  static constantRouteWhiteList = [
    {
      url: '/user/login',
      methods: 'post',
    },
    {
      url: '/user/register',
      methods: 'post',
    },
    {
      url: '/user/code',
      methods: 'get',
    },
    {
      url: '/demo/:a/:b/:c',
      methods: 'post',
    },
    {
      url: '/config',
      methods: 'get',
    },
  ];
  public async create(data: Omit<TRoutes, 'id' | 'auth'>) {
    const result = await this.Table.create(data);
    await redis.del(SysRoutesServer.routeWhitelistKey);
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
  public async getRouteWhitelistKey(): Promise<any[]> {
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
    const routeMethods = route.dataValues.methods;
    if (
      SysRoutesServer.constantRouteWhiteList.some(
        item => item.url === routeUrl && item.methods === routeMethods,
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
  }
}
export const sysRoutesServe = new SysRoutesServer(SysRoutesTable);
