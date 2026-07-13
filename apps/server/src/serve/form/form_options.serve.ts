import { DataTypes, type CreateOptions } from 'sequelize';
import { commAttributes, CommServe } from '../comm.serve.ts';
import db from '../db.ts';

export const FormOptionsTable = db.define(
  'form_options',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    label: {
      type: DataTypes.STRING(50),
      comment: '表单选项标签',
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(50),
      comment: '表单选项值',
      allowNull: false,
    },
    item_id: {
      type: DataTypes.INTEGER,
      comment: '所属表单项ID',
      allowNull: false,
    },
    form_id: {
      type: DataTypes.INTEGER,
      comment: '所属表单ID',
      allowNull: false,
    },
    form_code: {
      type: DataTypes.STRING(50),
      comment: '所属表单编码',
      allowNull: false,
    },
    version: {
      type: DataTypes.INTEGER,
      comment: '表单结构版本',
      allowNull: false,
      defaultValue: 1,
    },
    ...commAttributes,
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'create_time',
    updatedAt: 'update_time',
    deletedAt: 'delete_time',
    paranoid: true,
    indexes: [
      { name: 'idx_form_options_item_id', fields: ['item_id'] },
      { name: 'idx_form_options_form_id', fields: ['form_id'] },
      { name: 'idx_form_options_form_code', fields: ['form_code'] },
      { name: 'idx_form_options_form_version', fields: ['form_id', 'version'] },
    ],
  },
);

export type FormOptions = {
  id: number;
  label: string;
  value: string;
  item_id: number;
  form_id: number;
  form_code: string;
  version: number;
  create_time: Date;
  update_time: Date;
  delete_time?: Date | null;
};

type FormOptionsCreateInput = Omit<
  FormOptions,
  'id' | 'version' | 'create_time' | 'update_time'
> & {
  version?: number;
};

class FormOptionsServe extends CommServe<FormOptions> {
  public async create(data: FormOptionsCreateInput, options?: CreateOptions) {
    const result = await this.Table.create(
      {
        ...data,
        version: data.version || 1,
      },
      options,
    );
    return result;
  }
}

export const formOptionsServe = new FormOptionsServe(FormOptionsTable);
