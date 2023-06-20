import { DataTypes } from 'sequelize';
import db from './db';
import sequelize from 'sequelize';
import { CommServe } from './comm.serve';
export const ShopTable = db.define(
  'shops',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '店铺id',
    },
    name: {
      type: DataTypes.STRING(20),
      comment: '店铺名称',
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(50),
      comment: '店铺地址',
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      comment: '店铺电话',
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING(200),
      comment: '店铺描述',
    },
    cover: {
      type: DataTypes.STRING(100),
      comment: '店铺封面',
    },
    del_flag: {
      type: DataTypes.INTEGER,
      comment: '删除标志',
      allowNull: false,
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
  },
);

export type TShop = {
  id: number;
  name: string;
  address: string;
  phone: string;
  desc: string;
  cover: string;
  create_time: string;
  update_time: string;
};
class SysShopServe extends CommServe<TShop> {
  /**
   * 创建店铺
   */
  public async create(data: Partial<Omit<TShop, 'id'>>) {
    const result = await this.Table.create(data);
    return result;
  }

  /**
   * 更新店铺
   * @param id 店铺id
   * @param data 更新的数据
   */
  public async update(id: number, data: Partial<TShop>) {
    delete data.id;
    const result = await this.Table.update(data, { where: { id } });
    return result;
  }

  /**
   * 根据店铺名称查询店铺
   * @param name 店铺名称
   */
  public async findByName(name: string) {
    const result = await this.Table.findOne({
      where: {
        name,
      },
    });
    return (result && result.dataValues) as TShop;
  }

  /**
   * 获取门店列表
   * @param params 搜索条件
   */
  public async list(
    params: {
      page: number;
      pageSize: number;
      notPage?: 'true';
    } & TShop,
  ) {
    const options = this.filterWhereAttributes(params);
    const where = {
      ...options,
      name: {
        [sequelize.Op.like]: `%${params.name || ''}%`,
      },
      address: {
        [sequelize.Op.like]: `%${params.address || ''}%`,
      },
      phone: {
        [sequelize.Op.like]: `%${params.phone || ''}%`,
      },
      del_flag: 0,
    };
    if (params.notPage === 'true') {
      const result = await this.findAll({
        where,
      });
      return result;
    } else {
      const result = await this.findAll(params.page, params.pageSize, {
        where,
      });
      return result;
    }
  }
}

export const shopServe = new SysShopServe(ShopTable);
