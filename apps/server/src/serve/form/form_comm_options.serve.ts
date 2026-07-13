import sequelize, { DataTypes, type CreateOptions } from 'sequelize';
import { commAttributes, CommServe } from '../comm.serve.ts';
import db from '../db.ts';
import { formCommOptionsItemServe } from './form_comm_options_item.serve.ts';

export const FormCommOptionsTable = db.define(
  'form_comm_options',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      comment: '公共选项组名称',
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(50),
      comment: '公共选项组编码',
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
    indexes: [{ name: 'idx_form_comm_options_code', fields: ['code'] }],
  },
);

export type FormCommOptions = {
  id: number;
  name: string;
  code: string;
  create_time: Date;
  update_time: Date;
  delete_time?: Date | null;
};

class FormCommOptionsServe extends CommServe<FormCommOptions> {
  public async create(
    data: Omit<FormCommOptions, 'id' | 'create_time' | 'update_time'>,
    options?: CreateOptions,
  ) {
    const oldData = await this.Table.findOne({
      where: {
        code: data.code,
      },
      transaction: options?.transaction,
    });
    if (oldData) {
      throw new Error('公共选项编码重复');
    }
    const result = await this.Table.create(data, options);
    return result;
  }

  public async list(params: Partial<Pick<FormCommOptions, 'name' | 'code'>> & PageQueryParam) {
    return await this.findAll(params.page!, params.pageSize!, {
      where: {
        name: {
          [sequelize.Op.like]: `%${params.name || ''}%`,
        },
        code: {
          [sequelize.Op.like]: `%${params.code || ''}%`,
        },
      },
      order: [['id', 'DESC']],
    });
  }

  public async updateById(
    id: number,
    data: Omit<FormCommOptions, 'id' | 'create_time' | 'update_time' | 'delete_time'>,
  ) {
    const oldData = await this.findById(id);
    if (!oldData) {
      throw new Error('公共选项不存在');
    }
    if (oldData.code !== data.code) {
      const repeatData = await this.Table.findOne({
        where: {
          code: data.code,
        },
      });
      if (repeatData) {
        throw new Error('公共选项编码重复');
      }
    }

    return await db.transaction(async (transaction) => {
      const result = await this.Table.update(this.filterWhereAttributes(data, [undefined]), {
        where: {
          id,
        },
        transaction,
      });
      if (oldData.code !== data.code) {
        await formCommOptionsItemServe.updateByCommOptionsCode(
          oldData.code,
          {
            comm_options_code: data.code,
          },
          transaction,
        );
      }
      return result;
    });
  }

  public async deleteById(id: number) {
    const oldData = await this.findById(id);
    if (!oldData) {
      return 0;
    }

    return await db.transaction(async (transaction) => {
      await formCommOptionsItemServe.deleteByCommOptionsCode(oldData.code, transaction);
      return await this.Table.destroy({
        where: {
          id,
        },
        transaction,
      });
    });
  }
}

export const formCommOptionsServe = new FormCommOptionsServe(FormCommOptionsTable);
