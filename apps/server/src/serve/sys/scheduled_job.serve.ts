import { DataTypes, Op } from 'sequelize';
import { CommServe } from '../comm.serve.ts';
import db from '../db.ts';

export const SysScheduledJobTable = db.define(
  'sys_scheduled_job',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    job_name: { type: DataTypes.STRING(100), allowNull: false, comment: '任务名称' },
    job_group: { type: DataTypes.STRING(100), allowNull: false, comment: '任务组' },
    handler_key: { type: DataTypes.STRING(100), allowNull: false, comment: '服务端动作键' },
    script_args: { type: DataTypes.TEXT, allowNull: true, comment: 'TS 脚本参数 JSON 数组' },
    cron_expression: { type: DataTypes.STRING(100), allowNull: false, comment: 'Cron 表达式' },
    job_status: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: '3',
      comment: '2运行 3暂停',
    },
    job_execute_status: { type: DataTypes.STRING(1), allowNull: true, comment: '0正常 1异常' },
    previous_time: { type: DataTypes.DATE, allowNull: true },
    version: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    create_by: { type: DataTypes.STRING(50), allowNull: true },
    update_by: { type: DataTypes.STRING(50), allowNull: true },
    remark: { type: DataTypes.STRING(500), allowNull: true },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: db.literal('CURRENT_TIMESTAMP'),
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: db.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    indexes: [{ unique: true, fields: ['job_name', 'job_group'] }],
  },
);

export const SysScheduledJobLogTable = db.define(
  'sys_scheduled_job_log',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    scheduled_job_id: { type: DataTypes.INTEGER, allowNull: false },
    queue_job_id: { type: DataTypes.STRING(100), allowNull: true },
    job_name: { type: DataTypes.STRING(100), allowNull: false },
    status: { type: DataTypes.STRING(20), allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: true },
    error_message: { type: DataTypes.TEXT, allowNull: true },
    attempt: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    start_time: { type: DataTypes.DATE, allowNull: true },
    end_time: { type: DataTypes.DATE, allowNull: true },
    duration: { type: DataTypes.INTEGER, allowNull: true, comment: '耗时毫秒' },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: db.literal('CURRENT_TIMESTAMP'),
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: db.literal('CURRENT_TIMESTAMP'),
    },
  },
  { freezeTableName: true, createdAt: false, updatedAt: false },
);

export type ScheduledJob = {
  id: number;
  job_name: string;
  job_group: string;
  handler_key: string;
  script_args?: string;
  cron_expression: string;
  job_status: string;
  job_execute_status?: string;
  previous_time?: Date;
  version: number;
  create_by?: string;
  update_by?: string;
  remark?: string;
  create_time: Date;
  update_time: Date;
};

export type ScheduledJobLog = {
  id: number;
  scheduled_job_id: number;
  queue_job_id?: string;
  job_name: string;
  status: string;
  message?: string;
  error_message?: string;
  attempt: number;
  start_time?: Date;
  end_time?: Date;
  duration?: number;
  create_time: Date;
  update_time: Date;
};

class ScheduledJobServe extends CommServe<ScheduledJob> {
  async list(params: {
    page?: number;
    pageSize?: number;
    jobName?: string;
    jobGroup?: string;
    jobStatus?: string;
    jobExecuteStatus?: string;
  }) {
    const where: Record<string, any> = {};
    if (params.jobName) where.job_name = { [Op.like]: `%${params.jobName}%` };
    if (params.jobGroup) where.job_group = { [Op.like]: `%${params.jobGroup}%` };
    if (params.jobStatus) where.job_status = params.jobStatus;
    if (params.jobExecuteStatus) where.job_execute_status = params.jobExecuteStatus;
    return this.findAll(Number(params.page || 1), Number(params.pageSize || 20), {
      where,
      order: [['id', 'DESC']],
      useMaster: true,
    });
  }

  async getById(id: number) {
    const result = await this.Table.findOne({ where: { id }, useMaster: true });
    return result?.dataValues as ScheduledJob | undefined;
  }

  async findByNameAndGroup(jobName: string, jobGroup: string) {
    const result = await this.Table.findOne({
      where: { job_name: jobName, job_group: jobGroup },
      useMaster: true,
    });
    return result?.dataValues as ScheduledJob | undefined;
  }

  async createJob(data: Omit<ScheduledJob, 'id' | 'version' | 'create_time' | 'update_time'>) {
    const result = await this.Table.create(data);
    return result.dataValues as ScheduledJob;
  }

  async updateJob(id: number, data: Partial<ScheduledJob>) {
    delete data.id;
    delete data.create_time;
    await this.Table.update(
      {
        ...this.filterWhereAttributes(data, [undefined]),
        version: db.literal('version + 1'),
        update_time: db.fn('NOW'),
      },
      { where: { id } },
    );
    return this.getById(id);
  }

  async updateStatus(id: number, jobStatus: string, updateBy?: string) {
    await this.Table.update(
      {
        job_status: jobStatus,
        update_by: updateBy,
        version: db.literal('version + 1'),
        update_time: db.fn('NOW'),
      },
      { where: { id } },
    );
    return this.getById(id);
  }

  async updateExecution(id: number, status: string, previousTime: Date) {
    await this.Table.update(
      { job_execute_status: status, previous_time: previousTime, update_time: db.fn('NOW') },
      { where: { id } },
    );
  }

  async updateAllStatus(jobStatus: string) {
    await this.Table.update(
      { job_status: jobStatus, version: db.literal('version + 1'), update_time: db.fn('NOW') },
      { where: {} },
    );
  }

  async listRunning() {
    const result = await this.Table.findAll({ where: { job_status: '2' }, useMaster: true });
    return result.map((item) => item.dataValues as ScheduledJob);
  }

  async listAll() {
    const result = await this.Table.findAll({ useMaster: true });
    return result.map((item) => item.dataValues as ScheduledJob);
  }
}

class ScheduledJobLogServe extends CommServe<ScheduledJobLog> {
  async list(params: { page?: number; pageSize?: number; jobId: number }) {
    return this.findAll(Number(params.page || 1), Number(params.pageSize || 20), {
      where: { scheduled_job_id: params.jobId },
      order: [['id', 'DESC']],
      useMaster: true,
    });
  }

  async getById(id: number) {
    const result = await this.Table.findOne({ where: { id }, useMaster: true });
    return result?.dataValues as ScheduledJobLog | undefined;
  }

  async createLog(data: Omit<ScheduledJobLog, 'id' | 'create_time' | 'update_time'>) {
    const result = await this.Table.create(data);
    return result.dataValues as ScheduledJobLog;
  }

  async updateLog(id: number, data: Partial<ScheduledJobLog>) {
    await this.Table.update(
      { ...this.filterWhereAttributes(data, [undefined]), update_time: db.fn('NOW') },
      { where: { id } },
    );
  }
}

export const scheduledJobServe = new ScheduledJobServe(SysScheduledJobTable);
export const scheduledJobLogServe = new ScheduledJobLogServe(SysScheduledJobLogTable);
