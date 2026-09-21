import type { ScheduledJob, ScheduledJobLog } from '#/serve/sys/scheduled_job.serve.ts';
import { parseScriptArgs } from './scheduled-job.handlers.ts';

export function toScheduledJobDto(job: ScheduledJob) {
  return {
    jobId: job.id,
    jobName: job.job_name,
    jobGroup: job.job_group,
    handlerKey: job.handler_key,
    scriptArgs: parseScriptArgs(job.script_args),
    cronExpression: job.cron_expression,
    jobStatus: job.job_status,
    jobExecuteStatus: job.job_execute_status || '',
    previousTime: job.previous_time || '',
    createBy: job.create_by || '',
    updateBy: job.update_by || '',
    createTime: job.create_time,
    updateTime: job.update_time,
    remark: job.remark || '',
    version: job.version,
  };
}

export function toScheduledJobLogDto(log: ScheduledJobLog) {
  return {
    id: log.id,
    jobId: log.scheduled_job_id,
    jobName: log.job_name,
    queueJobId: log.queue_job_id || '',
    status: log.status,
    message: log.message || '',
    errorMessage: log.error_message || '',
    attempt: log.attempt,
    startTime: log.start_time || '',
    endTime: log.end_time || '',
    duration: log.duration || 0,
    createTime: log.create_time,
  };
}
