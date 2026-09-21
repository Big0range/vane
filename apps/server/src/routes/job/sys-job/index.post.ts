import type { Request, Response } from 'express';
import { scheduledJobServe } from '#/serve/index.ts';
import { syncScheduledJob, validateScheduledJob } from '#/queue/scheduled-job.service.ts';
import { toScheduledJobDto } from '#/queue/scheduled-job.dto.ts';
import { validateScriptArgs } from '#/queue/scheduled-job.handlers.ts';

export default async (req: Request, res: Response) => {
  try {
    const { jobName, jobGroup, handlerKey, scriptArgs, cronExpression, remark } = req.body;
    if (!jobName || !jobGroup || !handlerKey || !cronExpression)
      throw new Error('任务名称、任务组、动作和 Cron 表达式不能为空');
    if (await scheduledJobServe.findByNameAndGroup(jobName, jobGroup))
      throw new Error('任务名称和任务组已存在');

    const scriptArgsValue = handlerKey.startsWith('script:')
      ? JSON.stringify(validateScriptArgs(scriptArgs))
      : undefined;
    await validateScheduledJob({
      handler_key: handlerKey,
      script_args: scriptArgsValue,
      cron_expression: cronExpression,
    } as Pick<typeof req.body, 'handler_key' | 'script_args' | 'cron_expression'>);

    const job = await scheduledJobServe.createJob({
      job_name: jobName,
      job_group: jobGroup,
      handler_key: handlerKey,
      script_args: scriptArgsValue,
      cron_expression: cronExpression,
      job_status: '3',
      create_by: req.userInfo.username,
      update_by: req.userInfo.username,
      remark: remark || '',
    });
    await syncScheduledJob(job);
    res.ok({ message: '新增任务成功', data: toScheduledJobDto(job) });
  } catch (error: any) {
    res.fail(error);
  }
};
