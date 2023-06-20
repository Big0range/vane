import { DataTypes } from 'sequelize';
import db from './db';
import sequelize from 'sequelize';
import { CommServe } from './comm.serve';
import { ShopTable } from './shop.serve';
export const DeptTable = db.define(
  'depts',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '部门id',
    },
    parent_id: {
      type: DataTypes.INTEGER,
      comment: '父级id',
      allowNull: false,
      defaultValue: -1,
    },
    shop_id: {
      type: DataTypes.INTEGER,
      comment: '店铺id',
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      comment: '部门名称',
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING(200),
      comment: '部门描述',
    },
    status: {
      type: DataTypes.INTEGER,
      comment: '部门状态 0正常 1禁用',
      defaultValue: 0,
    },
    sort: {
      type: DataTypes.INTEGER,
      comment: '排序',
      defaultValue: 0,
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

// 关联表
ShopTable.hasMany(DeptTable, {
  foreignKey: 'shop_id',
  sourceKey: 'id',
  constraints: false, // 禁用外键约束
});
DeptTable.belongsTo(ShopTable, {
  foreignKey: 'shop_id',
  targetKey: 'id',
  constraints: false, // 禁用外键约束
});
export type TDept = {
  id: number;
  name: string;
  desc: string;
  parent_id: number;
  status: number;
  sort: number;
  shop_id: number;
  create_time: string;
  update_time: string;
};
class SysDeptServe extends CommServe<TDept> {
  /**
   * 创建部门
   */
  public async create(data: Partial<Omit<TDept, 'id'>>) {
    const result = await this.Table.create(data);
    return result;
  }

  /**
   * 更新部门信息
   * @param id 店铺id
   * @param data 更新的数据
   */
  public async update(id: number, data: Partial<TDept>) {
    delete data.id;
    const result = await this.Table.update(data, { where: { id } });
    return result;
  }

  /**
   * 根据部门名称和parentId查询部门信息
   * @param name 店铺名称
   */
  public async findByNameAndParentId(name: string, parent_id: number) {
    const result = await this.Table.findOne({
      where: {
        [sequelize.Op.and]: [
          {
            name,
          },
          {
            parent_id,
          },
        ],
      },
    });
    return (result && result.dataValues) as TDept;
  }

  /**
   * 获取部门列表
   * @param params 搜索条件
   */
  public async list(params: TDept) {
    const options = this.filterWhereAttributes(params);
    const result = await this.findAll({
      where: {
        ...options,
        name: {
          [sequelize.Op.like]: `%${params.name || ''}%`,
        },
        del_flag: 0,
      },
    });
    return result;
  }

  /**
   * 获取部门树
   */
  public async tree(params: {
    shop_id: number;
    name?: string;
    status?: number;
  }) {
    const formatParams = this.filterWhereAttributes(params);
    const result = await this.Table.findAll({
      where: {
        del_flag: 0,
        ...formatParams,
        name: {
          [sequelize.Op.like]: `%${params.name || ''}%`,
        },
      },
      attributes: [
        'id',
        'name',
        'parent_id',
        'desc',
        'sort',
        'status',
        'shop_id',
        'create_time',
        'update_time',
      ],
    });
    const list: (TDept & { children: any[] })[] = result.map(item => ({
      ...item.dataValues,
      children: [],
    }));
    list.forEach(item => {
      const parent = list.find((i: any) => i.id === item.parent_id);
      if (parent) {
        parent.children.push(item);
      }
    });
    return list.filter(item => item.parent_id === -1);
  }

  // 伪删除
  public async deleteByIds(id: string | string[]) {
    const result = await this.Table.update(
      { del_flag: 1 },
      {
        where: {
          id: {
            [sequelize.Op.in]: id,
          },
        },
      },
    );
    return result;
  }
}

export const deptServe = new SysDeptServe(DeptTable);
