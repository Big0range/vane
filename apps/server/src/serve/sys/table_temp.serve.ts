import sequelize, { DataTypes } from 'sequelize';
import db from '../db.ts';
import { CommServe } from '../comm.serve.ts';
import { tableTemplateRowServe } from './table_temp_row.serve.ts';

export const TableTemplateTable = db.define(
  'table_template',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '模板编码',
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

export type TableTemplate = {
  id: number;
  name: string;
  desc: string;
  code: string;
  create_time: Date;
  update_time: Date;
};

class TableTemplateServe extends CommServe<TableTemplate> {
  public async create(data: Omit<TableTemplate, 'id' | 'create_time' | 'update_time'>) {
    const result = await TableTemplateTable.create(data);
    return result;
  }
  public async list(params: Pick<TableTemplate, 'name' | 'desc' | 'code'> & PageQueryParam) {
    return await this.findAll(params.page!, params.pageSize!, {
      where: {
        name: {
          [sequelize.Op.like]: `%${params.name || ''}%`,
        },
        code: { [sequelize.Op.like]: `%${params.code || ''}%` },
      },
    });
  }
  public async updateById(id: number, data: Pick<TableTemplate, 'name' | 'desc' | 'code'>) {
    const result = await this.Table.update(this.filterWhereAttributes(data, [undefined]), {
      where: {
        id,
      },
    });
    return result;
  }
  public async deleteById(id: number) {
    {
      // 先删除关联的行数据
      const codeResult = await this.findById(id);
      const code = codeResult!.code;
      await tableTemplateRowServe.deleteByCode(code);
    }
    return await super.deleteById(id);
  }
}

export const tableTemplateServe = new TableTemplateServe(TableTemplateTable);
