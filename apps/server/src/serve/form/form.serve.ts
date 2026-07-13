import { DataTypes, type CreateOptions, type Transaction } from 'sequelize';
import { commAttributes, CommServe } from '../comm.serve.ts';
import db from '../db.ts';
import { formItemServe, type FormItemRule } from './form_item.serve.ts';
import { formOptionsServe } from './form_options.serve.ts';

export const FormTable = db.define(
  'form',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(50),
      comment: '表单标题',
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(50),
      comment: '表单编码，唯一标识',
      allowNull: false,
    },
    version: {
      type: DataTypes.INTEGER,
      comment: '当前表单结构版本',
      allowNull: false,
      defaultValue: 1,
    },
    rule: {
      type: DataTypes.JSON,
      comment: '表单生成规则',
      allowNull: false,
    },
    option: {
      type: DataTypes.JSON,
      comment: '表单生成配置',
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING(255),
      comment: '表单描述',
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      comment: '是否启用',
      allowNull: false,
      defaultValue: true,
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
      { name: 'idx_form_code', fields: ['code'] },
      { name: 'idx_form_status', fields: ['status'] },
      { name: 'idx_form_code_version', fields: ['code', 'version'] },
    ],
  },
);

export type Form = {
  id: number;
  title: string;
  code: string;
  version: number;
  rule: FormItemRule[];
  option: any;
  desc: string;
  status: boolean;
  create_time: Date;
  update_time: Date;
  delete_time?: Date | null;
};

type FormCreateInput = Omit<Form, 'id' | 'version' | 'create_time' | 'update_time'> & {
  version?: number;
};

const getRuleOptions = (rule: Pick<FormItemRule, 'options' | 'props'>) => {
  return rule.options || rule.props?.options || [];
};

class FormServe extends CommServe<Form> {
  public async create(data: FormCreateInput, options?: CreateOptions) {
    if (options?.transaction) {
      return await this.createWithTransaction(data, options.transaction);
    }

    return await db.transaction(async (transaction) => {
      return await this.createWithTransaction(data, transaction);
    });
  }

  public async deleteByCode(code: string) {
    return await db.transaction(async (transaction) => {
      await formOptionsServe.Table.destroy({
        where: {
          form_code: code,
        },
        transaction,
      });
      await formItemServe.Table.destroy({
        where: {
          form_code: code,
        },
        transaction,
      });
      return await this.Table.destroy({
        where: {
          code,
        },
        transaction,
      });
    });
  }

  public async list(query: PageQueryParam & { code?: string }) {
    const where = this.filterWhereAttributes(query);
    const result = await this.findAll(query.page!, query.pageSize!, {
      where,
      attributes: {
        exclude: ['rule', 'option'],
      },
      order: [['id', 'DESC']],
    });
    return result;
  }

  public async getByCode(code: string, version?: number): Promise<Form | null> {
    return (
      await this.Table.findOne({
        where: {
          code,
          ...(version ? { version } : {}),
        },
        order: [
          ['version', 'DESC'],
          ['id', 'DESC'],
        ],
        paranoid: version ? false : undefined,
      })
    )?.dataValues;
  }

  public async updateFormRule(code: string, data: Pick<Form, 'rule'>) {
    return await db.transaction(async (transaction) => {
      const oldForm = await this.getByCodeForUpdate(code, transaction);
      if (!oldForm) {
        throw new Error('form not found');
      }
      const nextVersion = (oldForm.version || 1) + 1;

      await formOptionsServe.Table.destroy({
        where: {
          form_id: oldForm.id,
        },
        transaction,
      });
      await formItemServe.Table.destroy({
        where: {
          form_id: oldForm.id,
        },
        transaction,
      });
      await this.Table.destroy({
        where: {
          id: oldForm.id,
        },
        transaction,
      });

      const newForm = await this.Table.create(
        {
          title: oldForm.title,
          code: oldForm.code,
          version: nextVersion,
          rule: data.rule,
          option: oldForm.option,
          desc: oldForm.desc,
          status: oldForm.status,
        },
        { transaction },
      );

      await this.createRuleItems(
        newForm.dataValues.id,
        oldForm.code,
        nextVersion,
        data.rule,
        transaction,
      );
      return newForm;
    });
  }

  public async updateBase(code: string, data: Pick<Form, 'title' | 'desc'>) {
    await this.Table.update(
      {
        title: data.title,
        desc: data.desc,
        update_time: db.fn('NOW'),
      },
      {
        where: {
          code,
        },
      },
    );
  }

  public async updateFormOptions(code: string, data: Pick<Form, 'option'>) {
    await this.Table.update(
      {
        option: data.option,
        update_time: db.fn('NOW'),
      },
      {
        where: {
          code,
        },
      },
    );
  }

  public async updateStatus(code: string, data: Pick<Form, 'status'>) {
    await this.Table.update(
      {
        status: data.status,
        update_time: db.fn('NOW'),
      },
      {
        where: {
          code,
        },
      },
    );
  }

  private async createWithTransaction(data: FormCreateInput, transaction: Transaction) {
    const repeatForm = await this.Table.findOne({
      where: {
        code: data.code,
      },
      transaction,
    });
    if (repeatForm) {
      throw new Error('form code repeat');
    }

    const form = await this.Table.create(data, { transaction });
    await this.createRuleItems(
      form.dataValues.id,
      data.code,
      form.dataValues.version || 1,
      data.rule,
      transaction,
    );
    return form;
  }

  private async getByCodeForUpdate(code: string, transaction: Transaction): Promise<Form | null> {
    return (
      await this.Table.findOne({
        where: {
          code,
        },
        order: [
          ['version', 'DESC'],
          ['id', 'DESC'],
        ],
        transaction,
        lock: true,
      })
    )?.dataValues;
  }

  private async createRuleItems(
    formId: number,
    formCode: string,
    version: number,
    rules: FormItemRule[],
    transaction: Transaction,
  ) {
    for (const rule of rules) {
      const options = getRuleOptions(rule);
      await formItemServe.create(
        {
          ...rule,
          form_code: formCode,
          form_id: formId,
          version,
          hasOptions: options.length > 0,
        },
        { transaction },
      );
    }
  }
}

export const formServe = new FormServe(FormTable);

/**测试用例  不要删除 */
import demoForm from './demo.ts';
const { code, desc, title, rule, option } = demoForm;
formServe
  .create({
    title,
    code,
    desc,
    rule,
    option,
    status: true,
  })
  .catch((err) => {
    console.log(err);
  });
