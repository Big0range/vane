import type { Request, Response } from 'express';
import { scheduledJobServe } from '#/serve/index.ts';
import { syncScheduledJob, validateScheduledJob } from '#/queue/scheduled-job.service.ts';
import { toScheduledJobDto } from '#/queue/scheduled-job.dto.ts';
import { parseScriptArgs, validateScriptArgs } from '#/queue/scheduled-job.handlers.ts';

export default async (req: Request, res: Response) => {
  try {
    const { jobId, handlerKey, scriptArgs, cronExpression, remark } = req.body;
    if (!jobId) throw new Error('任务 ID 不能为空');
    const current = await scheduledJobServe.getById(Number(jobId));
    if (!current) throw new Error('任务不存在');
    if (current.job_status === '2') throw new Error('任务运行中，请先暂停后再编辑');

    const nextHandlerKey = handlerKey || current.handler_key;
    const scriptArgsValue = nextHandlerKey.startsWith('script:')
      ? JSON.stringify(validateScriptArgs(scriptArgs ?? parseScriptArgs(current.script_args)))
      : undefined;
    const data = {
      handler_key: nextHandlerKey,
      script_args: scriptArgsValue,
      cron_expression: cronExpression || current.cron_expression,
    };
    await validateScheduledJob(data);
    const job = await scheduledJobServe.updateJob(Number(jobId), {
      ...data,
      remark: remark ?? current.remark,
      update_by: req.userInfo.username,
    });
    if (!job) throw new Error('任务不存在');
    await syncScheduledJob(job);
    res.ok({ message: '修改任务成功', data: toScheduledJobDto(job) });
  } catch (error: any) {
    res.fail(error);
  }
};
