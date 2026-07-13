import { DataTypes, type CreateOptions } from 'sequelize';
import { commAttributes, CommServe } from '../comm.serve.ts';
import db from '../db.ts';
import { FormTable } from './form.serve.ts';

export const FormDataJsonTable = db.define(
  'form_data_json',
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
    data: {
      type: DataTypes.JSON,
      comment: '提交的表单数据',
      allowNull: false,
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
      { name: 'idx_form_data_json_form_code', fields: ['form_code'] },
      { name: 'idx_form_data_json_form_version', fields: ['form_code', 'version'] },
      { name: 'idx_form_data_json_user_id', fields: ['user_id'] },
    ],
  },
);

export type FormDataJson = {
  id: number;
  form_code: string;
  version: number;
  user_id: number;
  data: Record<string, unknown>;
  create_time: Date;
  update_time: Date;
  delete_time?: Date | null;
};

type FormDataJsonCreateInput = Omit<
  FormDataJson,
  'id' | 'version' | 'create_time' | 'update_time'
> & {
  version?: number;
};

class FormDataJsonServe extends CommServe<FormDataJson> {
  public async create(data: FormDataJsonCreateInput, options?: CreateOptions) {
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

  public async getLatestByUser(formCode: string, userId: number) {
    const result = await this.Table.findOne({
      where: {
        form_code: formCode,
        user_id: userId,
      },
      order: [['create_time', 'DESC']],
      raw: true,
    });
    return result as FormDataJson | null;
  }

  public async listByUser(query: PageQueryParam & { form_code?: string }, userId: number) {
    const where = this.filterWhereAttributes({
      form_code: query.form_code,
      user_id: userId,
    });
    return await this.findAll(query.page!, query.pageSize!, {
      where,
      order: [['create_time', 'DESC']],
    });
  }

  public async getByIdAndUser(id: number, userId: number) {
    const result = await this.Table.findOne({
      where: {
        id,
        user_id: userId,
      },
      raw: true,
    });
    return result as FormDataJson | null;
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

export const formDataJsonServe = new FormDataJsonServe(FormDataJsonTable);
