import { scheduledJobLogServe, scheduledJobServe, type ScheduledJob } from '#/serve/index.ts';
import { logger } from '#/utils/useLogger.ts';
import { hasScheduledJobHandler, parseScriptArgs } from './scheduled-job.handlers.ts';
import { getScheduledJobSchedulerId, scheduledJobQueue } from './scheduled-job.queue.ts';

function validateCron(cron: string) {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error('Cron 表达式必须为 5 段');
}

export async function validateScheduledJob(
  data: Pick<ScheduledJob, 'cron_expression' | 'handler_key' | 'script_args'>,
) {
  validateCron(data.cron_expression);
  if (!(await hasScheduledJobHandler(data.handler_key))) throw new Error('不支持的服务端动作');
  if (data.handler_key.startsWith('script:')) parseScriptArgs(data.script_args);
}

export async function syncScheduledJob(job: ScheduledJob) {
  await validateScheduledJob(job);
  const schedulerId = getScheduledJobSchedulerId(job.id);
  if (job.job_status !== '2') {
    await scheduledJobQueue.removeJobScheduler(schedulerId);
    return;
  }
  await scheduledJobQueue.upsertJobScheduler(
    schedulerId,
    { pattern: job.cron_expression },
    {
      name: 'execute-scheduled-job',
      data: { scheduledJobId: job.id, scheduledJobVersion: job.version },
      opts: { attempts: 3, backoff: { type: 'exponential', delay: 1000 } },
    },
  );
}

export async function removeScheduledJob(id: number) {
  await scheduledJobQueue.removeJobScheduler(getScheduledJobSchedulerId(id));
}

/**
 * 启动任务时先校验，再更新状态并注册调度器。
 * 注册失败会将任务回退为暂停，避免数据库显示运行中但实际没有调度器。
 */
export async function startScheduledJob(id: number, updateBy?: string) {
  const current = await scheduledJobServe.getById(id);
  if (!current) throw new Error('任务不存在');
  await validateScheduledJob(current);

  const runningJob = await scheduledJobServe.updateStatus(id, '2', updateBy);
  if (!runningJob) throw new Error('任务不存在');

  try {
    await syncScheduledJob(runningJob);
    return runningJob;
  } catch (error) {
    // 先保证数据库状态回退；即使 Redis 暂时不可用，也不能保留“运行中”状态。
    await scheduledJobServe.updateStatus(id, '3', updateBy);
    try {
      await removeScheduledJob(id);
    } catch (removeError: any) {
      logger.error(`定时任务调度器清理失败 id=${id}: ${removeError.message}`);
    }
    throw error;
  }
}

export async function enqueueScheduledJob(job: ScheduledJob, logId?: number) {
  return scheduledJobQueue.add('execute-scheduled-job', {
    scheduledJobId: job.id,
    scheduledJobVersion: job.version,
    logId,
  });
}

export async function runScheduledJobNow(id: number) {
  const job = await scheduledJobServe.getById(id);
  if (!job) throw new Error('任务不存在');
  if (job.job_status !== '2') throw new Error('任务已暂停，请先启动');
  const log = await scheduledJobLogServe.createLog({
    scheduled_job_id: job.id,
    job_name: job.job_name,
    status: 'queued',
    attempt: 1,
  });
  const queueJob = await enqueueScheduledJob(job, log.id);
  await scheduledJobLogServe.updateLog(log.id, { queue_job_id: String(queueJob.id) });
}

/**
 * 服务重启或手动刷新时，逐个恢复运行任务。
 * 无效任务会被暂停并移除旧调度器，其他任务仍会继续恢复。
 */
export async function refreshScheduledJobs() {
  const jobs = await scheduledJobServe.listRunning();
  const disabledJobIds: number[] = [];

  for (const job of jobs) {
    try {
      await syncScheduledJob(job);
    } catch (error: any) {
      disabledJobIds.push(job.id);
      logger.error(`定时任务恢复失败 id=${job.id}: ${error.message}`);
      // 先暂停数据库任务，确保下次启动不会再次尝试恢复这条失效任务。
      try {
        await scheduledJobServe.updateStatus(job.id, '3');
      } catch (disableError: any) {
        logger.error(`定时任务暂停失败 id=${job.id}: ${disableError.message}`);
      }
      try {
        await removeScheduledJob(job.id);
      } catch (removeError: any) {
        logger.error(`定时任务调度器清理失败 id=${job.id}: ${removeError.message}`);
      }
    }
  }

  return { recovered: jobs.length - disabledJobIds.length, disabledJobIds };
}
