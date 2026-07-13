import sequelize, { DataTypes, type CreateOptions, type Transaction } from 'sequelize';
import { CommServe, commAttributes } from '../comm.serve.ts';
import db from '../db.ts';

export const FormCommOptionsItemTable = db.define(
  'form_comm_options_item',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    label: {
      type: DataTypes.STRING(50),
      comment: '选项标签',
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(50),
      comment: '选项值',
      allowNull: false,
    },
    comm_options_code: {
      type: DataTypes.STRING(50),
      comment: '所属公共选项组编码',
      allowNull: false,
      references: {
        model: 'form_comm_options',
        key: 'code',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
      { name: 'idx_form_comm_options_item_code', fields: ['comm_options_code'] },
      { name: 'idx_form_comm_options_item_label', fields: ['comm_options_code', 'label'] },
      { name: 'idx_form_comm_options_item_value', fields: ['comm_options_code', 'value'] },
    ],
  },
);

export type FormCommOptionsItem = {
  id: number;
  label: string;
  value: string;
  comm_options_code: string;
  create_time: Date;
  update_time: Date;
  delete_time?: Date | null;
};

class FormCommOptionsItemServe extends CommServe<FormCommOptionsItem> {
  public async create(
    data: Omit<FormCommOptionsItem, 'id' | 'create_time' | 'update_time'>,
    options?: CreateOptions,
  ) {
    await this.assertNoRepeat(data, undefined, options?.transaction || undefined);
    const result = await this.Table.create(data, options);
    return result;
  }

  public async list(
    params: Partial<Pick<FormCommOptionsItem, 'comm_options_code'>> & PageQueryParam,
  ) {
    return await this.findAll(params.page!, params.pageSize!, {
      where: this.filterWhereAttributes({
        comm_options_code: params.comm_options_code,
      }),
      order: [['id', 'ASC']],
    });
  }

  public async updateById(
    id: number,
    data: Omit<FormCommOptionsItem, 'id' | 'create_time' | 'update_time' | 'delete_time'>,
  ) {
    await this.assertNoRepeat(data, id);
    const result = await this.Table.update(this.filterWhereAttributes(data, [undefined]), {
      where: {
        id,
      },
    });
    return result;
  }

  public async updateByCommOptionsCode(
    commOptionsCode: string,
    data: Partial<Pick<FormCommOptionsItem, 'comm_options_code'>>,
    transaction?: Transaction,
  ) {
    return await this.Table.update(this.filterWhereAttributes(data, [undefined]), {
      where: {
        comm_options_code: commOptionsCode,
      },
      transaction,
    });
  }

  public async deleteByCommOptionsCode(commOptionsCode: string, transaction?: Transaction) {
    return await this.Table.destroy({
      where: {
        comm_options_code: commOptionsCode,
      },
      transaction,
    });
  }

  private async assertNoRepeat(
    data: Pick<FormCommOptionsItem, 'label' | 'value' | 'comm_options_code'>,
    excludeId?: number,
    transaction?: Transaction,
  ) {
    const where: Record<any, any> = {
      comm_options_code: data.comm_options_code,
      [sequelize.Op.or]: [{ label: data.label }, { value: data.value }],
    };
    if (excludeId) {
      where.id = {
        [sequelize.Op.ne]: excludeId,
      };
    }

    const repeat = await this.Table.findOne({
      where,
      transaction,
    });
    if (!repeat) return;

    const repeatData = repeat.dataValues as FormCommOptionsItem;
    if (repeatData.label === data.label) {
      throw new Error('同一父选项下子选项标签不能重复');
    }
    if (repeatData.value === data.value) {
      throw new Error('同一父选项下子选项值不能重复');
    }
  }
}

export const formCommOptionsItemServe = new FormCommOptionsItemServe(FormCommOptionsItemTable);
