export type GetScheduledTaskLisResult = PageResult<ITaskDetails[]>;
export interface ITaskDetails {
  /**任务名称 */
  jobName: string;
  /**任务分组 */
  jobGroup: string;
  /**任务ID */
  jobId: number | string;
  /**任务状态 */
  jobStatus: string;
  /**执行状态 */
  jobExecuteStatus: string;
  /**执行文件 */
  className: string;
  /**创建人 */
  createBy: string;
  /**创建时间 */
  createTime: string;
  /**上次执行时间 */
  previousTime: string;
  /*组内顺序 */
  jobOrder: string;
  /**下次执行时间 */
  nextTime: string;
  /**首次执行时间 */
  startTime: string;
  /**更新人 */
  updateBy: string;
  /**cron表达式 */
  cronExpression: string;
  /** 执行路径 */
  executePath: string;
  /**执行方法 */
  methodName: string;
  /**执行参数值 */
  methodParamsValue: string;
  /*错失执行策略 */
  misfirePolicy: string;
  /**类型 */
  jobType: string;
  /**备注 */
  remark: string;
}

export type GetScheduledTaskDetailsResult = ITaskDetails;
