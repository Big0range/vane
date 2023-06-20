import { Model, DataTypes } from 'sequelize';

import db from './db';

import { CommServe } from './comm.serve';

export const EmployeeTable = db.define(
  'employee',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dept_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '部门id',
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '店铺id',
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: '员工姓名',
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false,
      comment: '员工电话',
    },
    sex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '员工性别 1男 2女',
    },
    create_time: {
      type: DataTypes.DATE,
      field: 'create_time',
      comment: '创建时间',
      allowNull: false,
      defaultValue: db.literal('CURRENT_TIMESTAMP'),
    },
    update_time: {
      type: DataTypes.DATE,
      field: 'update_time',
      allowNull: false,
      comment: '更新时间',
      defaultValue: db.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

class EmployeeServe extends CommServe {
  public async create(code_id: number, url: string) {
    const result = await this.Table.create({
      code_id,
      url,
    });
    return result;
  }

  public async updated(id: number, code_id: number, url: string) {
    const result = await this.Table.update(
      {
        code_id,
        url,
      },
      {
        where: {
          id,
        },
      },
    );
    return result;
  }

  public async deleteByCode(code: string) {
    const result = await this.Table.destroy({
      where: {
        code,
      },
    });
    return result;
  }

  /**
   * 批量插入数据
   * @param data 批量插入的数据
   */
  public async bulkCreate(
    data: { code: string; remarks: string }[],
  ): Promise<Model<any, any>[]> {
    const result = await this.Table.bulkCreate(data);
    return result;
  }

  /**
   * 根据code表的id查询日志
   * @param id code表的id
   * @returns 返回code表的id对应的所有日志
   */
  public async findByCodeId(id: number) {
    const result = await this.findAll({
      where: {
        code_id: id,
      },
    });
    return result;
  }
}

export const employeeServe = new EmployeeServe(EmployeeTable);
