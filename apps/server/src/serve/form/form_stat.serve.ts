import { Op, type WhereOptions } from 'sequelize';
import {
  FormDataJsonTable,
  FormDataTable,
  FormItemTable,
  FormTable,
  SysUserTable,
  formServe,
  type FormDataJson,
  type FormItem,
  type TUser,
} from '#/serve/index.ts';
import db from '../db.ts';

type FormStatListQuery = PageQueryParam & {
  title?: string;
  username?: string;
};

type FormQuestionStatsQuery = {
  form_code?: string;
  version?: string | number;
  username?: string;
};

type FormStatSubmissionsQuery = PageQueryParam & {
  form_code?: string;
  version?: string | number;
  username?: string;
};

type FormMeta = {
  code: string;
  version: number;
  title: string;
};

type UserMeta = Pick<TUser, 'id' | 'username'>;

type FormStatRow = {
  form_code: string;
  version: number;
  title: string;
  submit_count: number;
  user_count: number;
  latest_submit_time: Date | string | null;
};

type FormStatSubmissionRow = Omit<FormDataJson, 'data'> & {
  username?: string;
};

type OptionStat = {
  label: string;
  value: string;
  count: number;
  percent: number;
};

const getPage = (query: PageQueryParam) => Number(query.page || 1);
const getPageSize = (query: PageQueryParam) => Number(query.pageSize || 10);
const getFormKey = (formCode: string, version: number) => `${formCode}::${version}`;
const normalizeVersion = (version?: string | number) => Number(version || 1);
const toNumber = (value: unknown) => Number(value || 0);

class FormStatServe {
  public async list(query: FormStatListQuery) {
    const page = getPage(query);
    const pageSize = getPageSize(query);
    const where: WhereOptions = {};

    const formMetas = await this.resolveFormMetas(query.title);
    if (query.title && !formMetas.length) {
      return this.emptyPage<FormStatRow>(page, pageSize);
    }
    if (query.title) {
      where[Op.or as any] = formMetas.map((item) => ({
        form_code: item.code,
        version: item.version,
      }));
    }

    const users = await this.resolveUsers(query.username);
    if (query.username && !users.length) {
      return this.emptyPage<FormStatRow>(page, pageSize);
    }
    if (query.username) {
      where.user_id = users.map((item) => item.id);
    }

    const totalRows = (await FormDataJsonTable.findAll({
      attributes: ['form_code', 'version'],
      where,
      group: ['form_code', 'version'],
      raw: true,
    })) as unknown as Pick<FormDataJson, 'form_code' | 'version'>[];

    const rows = (await FormDataJsonTable.findAll({
      attributes: [
        'form_code',
        'version',
        [db.fn('COUNT', db.col('id')), 'submit_count'],
        [db.fn('COUNT', db.fn('DISTINCT', db.col('user_id'))), 'user_count'],
        [db.fn('MAX', db.col('create_time')), 'latest_submit_time'],
      ],
      where,
      group: ['form_code', 'version'],
      order: [[db.fn('MAX', db.col('create_time')), 'DESC']],
      offset: (page - 1) * pageSize,
      limit: pageSize,
      raw: true,
    })) as unknown as Array<{
      form_code: string;
      version: number;
      submit_count: string | number;
      user_count: string | number;
      latest_submit_time: Date | string | null;
    }>;

    const titleMap = await this.getTitleMap(
      rows.map((item) => ({ code: item.form_code, version: Number(item.version) })),
      formMetas,
    );

    return {
      rows: rows.map((item) => ({
        form_code: item.form_code,
        version: Number(item.version),
        title: titleMap.get(getFormKey(item.form_code, Number(item.version))) || item.form_code,
        submit_count: toNumber(item.submit_count),
        user_count: toNumber(item.user_count),
        latest_submit_time: item.latest_submit_time,
      })),
      total: totalRows.length,
      page,
      pageSize,
    };
  }

  public async getQuestionStats(query: FormQuestionStatsQuery) {
    const formCode = query.form_code;
    const version = normalizeVersion(query.version);
    if (!formCode) {
      throw new Error('form_code is empty');
    }

    const form = await formServe.getByCode(formCode, version);
    if (!form) {
      throw new Error('form not found');
    }

    const users = await this.resolveUsers(query.username);
    if (query.username && !users.length) {
      return {
        summary: {
          form_code: formCode,
          version,
          title: form.title,
          total_submissions: 0,
          user_count: 0,
          latest_submit_time: null,
        },
        questions: [],
      };
    }

    const submissionWhere: WhereOptions = {
      form_code: formCode,
      version,
    };
    if (query.username) {
      submissionWhere.user_id = users.map((item) => item.id);
    }

    const submissions = (await FormDataJsonTable.findAll({
      attributes: ['id', 'user_id', 'create_time'],
      where: submissionWhere,
      order: [['create_time', 'DESC']],
      raw: true,
    })) as unknown as Pick<FormDataJson, 'id' | 'user_id' | 'create_time'>[];

    const formJsonIds = submissions.map((item) => item.id);
    const totalSubmissions = submissions.length;
    const userCount = new Set(submissions.map((item) => item.user_id)).size;
    const latestSubmitTime = submissions[0]?.create_time || null;

    const formItems = (await FormItemTable.findAll({
      where: {
        form_code: formCode,
        version,
      },
      order: [['id', 'ASC']],
      paranoid: false,
      raw: true,
    })) as unknown as FormItem[];

    const dataRows = formJsonIds.length
      ? ((await FormDataTable.findAll({
          attributes: ['item_id', 'label', 'value', [db.fn('COUNT', db.col('id')), 'count']],
          where: {
            form_code: formCode,
            version,
            form_json_id: formJsonIds,
          },
          group: ['item_id', 'label', 'value'],
          raw: true,
        })) as unknown as Array<{
          item_id: number;
          label: string | null;
          value: string | null;
          count: string | number;
        }>)
      : [];

    const statMap = new Map<number, OptionStat[]>();
    dataRows.forEach((item) => {
      const count = toNumber(item.count);
      const list = statMap.get(item.item_id) || [];
      list.push({
        label: item.label || item.value || '空值',
        value: item.value || '',
        count,
        percent: totalSubmissions ? Number(((count / totalSubmissions) * 100).toFixed(2)) : 0,
      });
      statMap.set(item.item_id, list);
    });

    const questions = formItems.map((item) => {
      const options = (statMap.get(item.id) || []).sort((a, b) => b.count - a.count);
      const answeredCount = options.reduce((total, option) => total + option.count, 0);
      return {
        item_id: item.id,
        title: item.title,
        type: item.type,
        field: item.field,
        has_options: item.hasOptions,
        total_submissions: totalSubmissions,
        answered_count: answeredCount,
        empty_count: Math.max(totalSubmissions - answeredCount, 0),
        options,
      };
    });

    return {
      summary: {
        form_code: formCode,
        version,
        title: form.title,
        total_submissions: totalSubmissions,
        user_count: userCount,
        latest_submit_time: latestSubmitTime,
      },
      questions,
    };
  }

  public async listSubmissions(query: FormStatSubmissionsQuery) {
    const formCode = query.form_code;
    const version = normalizeVersion(query.version);
    if (!formCode) {
      throw new Error('form_code is empty');
    }

    const page = getPage(query);
    const pageSize = getPageSize(query);
    const where: WhereOptions = {
      form_code: formCode,
      version,
    };

    const users = await this.resolveUsers(query.username);
    if (query.username && !users.length) {
      return this.emptyPage<FormStatSubmissionRow>(page, pageSize);
    }
    if (query.username) {
      where.user_id = users.map((item) => item.id);
    }

    const result = (await FormDataJsonTable.findAndCountAll({
      attributes: {
        exclude: ['data'],
      },
      where,
      order: [['create_time', 'DESC']],
      offset: (page - 1) * pageSize,
      limit: pageSize,
      raw: true,
    })) as unknown as { rows: FormStatSubmissionRow[]; count: number };

    const userMap = await this.getUserMap(result.rows.map((item) => item.user_id));
    return {
      rows: result.rows.map((item) => ({
        ...item,
        username: userMap.get(item.user_id) || String(item.user_id),
      })),
      total: result.count,
      page,
      pageSize,
    };
  }

  public async getSubmissionDetail(id: number) {
    if (!id) {
      throw new Error('id is empty');
    }
    const result = await FormDataJsonTable.findOne({
      where: {
        id,
      },
      raw: true,
    });
    return result as FormDataJson | null;
  }

  private async resolveFormMetas(title?: string) {
    if (!title) return [];
    return (await FormTable.findAll({
      attributes: ['code', 'version', 'title'],
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
      paranoid: false,
      raw: true,
    })) as unknown as FormMeta[];
  }

  private async resolveUsers(username?: string) {
    if (!username) return [];
    return (await SysUserTable.findAll({
      attributes: ['id', 'username'],
      where: {
        username: {
          [Op.like]: `%${username}%`,
        },
      },
      raw: true,
    })) as unknown as UserMeta[];
  }

  private async getTitleMap(
    forms: Pick<FormMeta, 'code' | 'version'>[],
    knownForms: FormMeta[] = [],
  ) {
    const titleMap = new Map<string, string>();
    knownForms.forEach((item) => {
      titleMap.set(getFormKey(item.code, Number(item.version)), item.title);
    });

    const missingForms = forms.filter((item) => !titleMap.has(getFormKey(item.code, item.version)));
    if (!missingForms.length) return titleMap;

    const result = (await FormTable.findAll({
      attributes: ['code', 'version', 'title'],
      where: {
        [Op.or]: missingForms.map((item) => ({
          code: item.code,
          version: item.version,
        })),
      },
      paranoid: false,
      raw: true,
    })) as unknown as FormMeta[];

    result.forEach((item) => {
      titleMap.set(getFormKey(item.code, Number(item.version)), item.title);
    });
    return titleMap;
  }

  private async getUserMap(userIds: number[]) {
    const uniqueUserIds = Array.from(new Set(userIds)).filter(Boolean);
    const userMap = new Map<number, string>();
    if (!uniqueUserIds.length) return userMap;

    const users = (await SysUserTable.findAll({
      attributes: ['id', 'username'],
      where: {
        id: uniqueUserIds,
      },
      raw: true,
    })) as unknown as UserMeta[];
    users.forEach((item) => {
      userMap.set(item.id, item.username);
    });
    return userMap;
  }

  private emptyPage<T>(page: number, pageSize: number) {
    return {
      rows: [] as T[],
      total: 0,
      page,
      pageSize,
    };
  }
}

export const formStatServe = new FormStatServe();
