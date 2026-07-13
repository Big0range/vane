import { DataTypes, type CreateOptions } from 'sequelize';
import { commAttributes, CommServe } from '../comm.serve.ts';
import db from '../db.ts';
import { FormTable } from './form.serve.ts';

export const FormDataTable = db.define(
  'form_data',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    form_code: {
      type: DataTypes.STRING(50),
      comment: '所属表单编码',
      allowNull: false,
    },
    form_json_id: {
      type: DataTypes.INTEGER,
      comment: '所属表单JSON ID',
      allowNull: false,
    },
    version: {
      type: DataTypes.INTEGER,
      comment: '提交时的表单结构版本',
      allowNull: false,
      defaultValue: 1,
    },
    user_id: {
      type: DataTypes.INTEGER,
      comment: '回答用户ID',
      allowNull: false,
    },
    item_id: {
      type: DataTypes.INTEGER,
      comment: '所属表单项ID',
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING(255),
      comment: '提交的表单项标签',
      allowNull: true,
    },
    value: {
      type: DataTypes.STRING(255),
      comment: '提交的表单项值',
      allowNull: true,
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
      { name: 'idx_form_data_form_code', fields: ['form_code'] },
      { name: 'idx_form_data_form_version', fields: ['form_code', 'version'] },
      { name: 'idx_form_data_user_id', fields: ['user_id'] },
      { name: 'idx_form_data_item_id', fields: ['item_id'] },
    ],
  },
);

export type FormData = {
  id: number;
  form_code: string;
  form_json_id: number;
  label?: string | null;
  version: number;
  user_id: number;
  item_id: number;
  value: string | null;
  create_time: Date;
  update_time: Date;
  delete_time?: Date | null;
};

export type FormDataCreateInput = Omit<
  FormData,
  'id' | 'version' | 'create_time' | 'update_time'
> & {
  version?: number;
};

class FormDataServe extends CommServe<FormData> {
  public async create(data: FormDataCreateInput, options?: CreateOptions) {
    const version = await this.resolveVersion(data.form_code, data.version, options);
    const result = await this.Table.create(
      {
        ...data,
        version,
      },
      options,
    );
    return result;
  }

  private async resolveVersion(
    formCode: string,
    version: number | undefined,
    options?: CreateOptions,
  ) {
    if (version) return version;
    const form = await FormTable.findOne({
      attributes: ['version'],
      where: {
        code: formCode,
      },
      order: [
        ['version', 'DESC'],
        ['id', 'DESC'],
      ],
      transaction: options?.transaction,
      raw: true,
    });
    return Number((form as { version?: number } | null)?.version || 1);
  }
}

export const formDataServe = new FormDataServe(FormDataTable);
