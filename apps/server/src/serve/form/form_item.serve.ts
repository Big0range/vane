import { DataTypes, type CreateOptions } from 'sequelize';
import { commAttributes, CommServe } from '../comm.serve.ts';
import db from '../db.ts';
import { formOptionsServe } from './form_options.serve.ts';

type RuleOption = {
  label: string;
  value: string | number | boolean;
};

type RuleControl = {
  rule?: FormItemRule[];
};

type RuleProps = Record<string, unknown> & {
  options?: RuleOption[];
};

export type FormItemRule = Pick<FormItem, 'title' | 'type' | 'field'> &
  Partial<Pick<FormItem, 'form_code' | 'form_id' | 'version' | 'hasOptions'>> & {
    control?: RuleControl[];
    options?: RuleOption[];
    props?: RuleProps;
  };

export type FormItemCreateInput = FormItemRule &
  Pick<FormItem, 'form_code' | 'form_id' | 'version' | 'hasOptions'>;

type FormItemRuleWithOptions = FormItemRule & {
  control?: RuleControl[];
  options?: RuleOption[];
  props?: RuleProps;
};

const getRuleOptions = (rule: Pick<FormItemRuleWithOptions, 'options' | 'props'>) => {
  return rule.options || rule.props?.options || [];
};

export const FormItemTable = db.define(
  'form_item',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    title: {
      type: DataTypes.STRING(255),
      comment: '表单项标题',
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      comment: '表单项类型',
      allowNull: true,
    },
    field: {
      type: DataTypes.STRING(50),
      comment: '表单项字段',
      allowNull: false,
    },
    hasOptions: {
      type: DataTypes.BOOLEAN,
      comment: '是否有选项',
      allowNull: false,
      defaultValue: false,
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
      { name: 'idx_form_item_form_id', fields: ['form_id'] },
      { name: 'idx_form_item_form_code', fields: ['form_code'] },
      { name: 'idx_form_item_form_version', fields: ['form_id', 'version'] },
    ],
  },
);

export type FormItem = {
  id: number;
  form_code: string;
  form_id: number;
  version: number;
  title: string;
  type: string;
  field: string;
  hasOptions: boolean;
  create_time: Date;
  update_time: Date;
  delete_time?: Date | null;
};

class FormItemServe extends CommServe<FormItem> {
  public async create(data: FormItemCreateInput, options?: CreateOptions) {
    const { control, options: ruleOptions, props, ...itemData } = data;
    const result = await this.Table.create(itemData, options);

    for (const controlItem of control || []) {
      for (const rule of controlItem.rule || []) {
        const childOptions = getRuleOptions(rule);
        await this.create(
          {
            form_id: data.form_id,
            form_code: data.form_code,
            version: data.version,
            title: rule.title,
            type: rule.type,
            field: rule.field,
            control: rule.control,
            hasOptions: childOptions.length > 0,
            options: rule.options,
            props: rule.props,
          },
          options,
        );
      }
    }

    const normalizedOptions = ruleOptions || props?.options || [];
    for (const option of normalizedOptions) {
      await formOptionsServe.create(
        {
          label: option.label,
          value: String(option.value),
          item_id: result.dataValues.id,
          form_code: data.form_code,
          form_id: data.form_id,
          version: data.version,
        },
        options,
      );
    }

    return result;
  }

  public async list(formCode: string, version?: number) {
    const currentVersion =
      version ||
      ((await this.Table.max('version', {
        where: {
          form_code: formCode,
        },
      })) as number | null) ||
      1;

    return await this.findAll({
      where: {
        form_code: formCode,
        version: currentVersion,
      },
    });
  }
}

export const formItemServe = new FormItemServe(FormItemTable);
