import { DataTypes } from 'sequelize';
import db from '../db.ts';
import { CommServe } from '../comm.serve.ts';

export const TableTemplateRowTable = db.define(
  'table_template_row',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: '显示名称',
    },
    key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '列标识',
    },
    width: {
      type: DataTypes.INTEGER,
      comment: '列宽度',
    },
    fixed: {
      type: DataTypes.STRING(10),
      comment: '是否固定列 可固定在left right',
    },
    align: {
      type: DataTypes.STRING(10),
      comment: '列对齐方式',
    },
    sort: {
      type: DataTypes.INTEGER,
      comment: '排序',
    },
    table_template_code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '关联模板编码',
    },
    visible: {
      type: DataTypes.BOOLEAN,
      comment: '是否可见',
      defaultValue: true,
    },
    ellipsis: {
      type: DataTypes.INTEGER,
      comment: '是否不换行显示',
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

export type TableTemplateRow = {
  id: number;
  title: string;
  key: string;
  width?: number;
  fixed?: string;
  align?: string;
  sort?: number;
  table_template_code: string;
  visible?: boolean;
  ellipsis?: number;
  create_time: Date;
  update_time: Date;
};

class TableTemplateRowServe extends CommServe<TableTemplateRow> {
  public async create(data: Omit<TableTemplateRow, 'id' | 'create_time' | 'update_time'>) {
    const result = await TableTemplateRowTable.create(data);
    return result;
  }
  public async list(params: PageQueryParam) {
    return await this.findAll(params.page!, params.pageSize!);
  }
  public async getByCode(code: string, visible?: boolean) {
    return await this.findAll({
      where: this.filterWhereAttributes({
        table_template_code: code,
        visible,
      }),
      // 根据sort排序，默认升序排序
      order: [['sort', 'ASC']],
    });
  }
  public async updateById(
    id: number,
    data: Omit<TableTemplateRow, 'id' | 'create_time' | 'update_time' | 'table_template_code'>,
  ) {
    const result = await this.Table.update(this.filterWhereAttributes(data, [undefined]), {
      where: {
        id,
      },
    });
    return result;
  }
  public async updateByCode(
    code: string,
    data: Partial<Omit<TableTemplateRow, 'id' | 'create_time' | 'update_time'>>,
  ) {
    const result = await this.Table.update(this.filterWhereAttributes(data, [undefined]), {
      where: {
        table_template_code: code,
      },
    });
    return result;
  }
  public async deleteByCode(code: string) {
    await this.Table.destroy({
      where: {
        table_template_code: code,
      },
    });
  }
}

export const tableTemplateRowServe = new TableTemplateRowServe(TableTemplateRowTable);
