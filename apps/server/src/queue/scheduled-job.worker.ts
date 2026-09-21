import type { Redis } from 'ioredis';
import { Worker } from 'bullmq';
import { scheduledJobLogServe, scheduledJobServe } from '#/serve/index.ts';
import { createRedis } from '#/utils/redis.ts';
import { logger } from '#/utils/useLogger.ts';
import { getScheduledJobHandler, parseScriptArgs } from './scheduled-job.handlers.ts';
import { scheduledJobQueueName, type ScheduledQueueData } from './scheduled-job.queue.ts';

let worker: Worker<ScheduledQueueData> | undefined;
let workerConnection: Redis | undefined;

export function initScheduledJobWorker() {
  if (worker) return worker;
  workerConnection = createRedis(null);
  worker = new Worker<ScheduledQueueData>(
    scheduledJobQueueName,
    async (queueJob) => {
      const scheduledJob = await scheduledJobServe.getById(queueJob.data.scheduledJobId);
      const now = new Date();
      if (
        !scheduledJob ||
        scheduledJob.job_status !== '2' ||
        scheduledJob.version !== queueJob.data.scheduledJobVersion
      ) {
        if (queueJob.data.logId) {
          await scheduledJobLogServe.updateLog(queueJob.data.logId, {
            status: 'skipped',
            message: '任务已修改、暂停或删除',
            end_time: now,
          });
        }
        return { status: 'skipped' };
      }

      const log = queueJob.data.logId
        ? await scheduledJobLogServe.getById(queueJob.data.logId)
        : await scheduledJobLogServe.createLog({
            scheduled_job_id: scheduledJob.id,
            queue_job_id: String(queueJob.id),
            job_name: scheduledJob.job_name,
            status: 'queued',
            attempt: queueJob.attemptsMade + 1,
          });
      if (!log) throw new Error('执行日志不存在');

      const startedAt = new Date();
      await scheduledJobLogServe.updateLog(log.id, {
        status: 'running',
        queue_job_id: String(queueJob.id),
        attempt: queueJob.attemptsMade + 1,
        start_time: startedAt,
      });

      try {
        const args = parseScriptArgs(scheduledJob.script_args);
        const handler = await getScheduledJobHandler(scheduledJob.handler_key);
        if (!handler) throw new Error(`未注册动作: ${scheduledJob.handler_key}`);
        const message = (await handler(args)) || '执行成功';
        const endedAt = new Date();
        await scheduledJobLogServe.updateLog(log.id, {
          status: 'succeeded',
          message,
          end_time: endedAt,
          duration: endedAt.getTime() - startedAt.getTime(),
        });
        await scheduledJobServe.updateExecution(scheduledJob.id, '0', endedAt);
        return { status: 'succeeded', message };
      } catch (error: any) {
        const endedAt = new Date();
        await scheduledJobLogServe.updateLog(log.id, {
          status: 'failed',
          error_message: error.message,
          end_time: endedAt,
          duration: endedAt.getTime() - startedAt.getTime(),
        });
        await scheduledJobServe.updateExecution(scheduledJob.id, '1', endedAt);
        throw error;
      }
    },
    { connection: workerConnection, concurrency: 3 },
  );
  worker.on('failed', (job, error) =>
    logger.error(`定时任务执行失败 jobId=${job?.id}: ${error.message}`),
  );
  worker.on('error', (error) => logger.error(`定时任务 Worker 异常: ${error.message}`));
  return worker;
}

export async function closeScheduledJobWorker() {
  if (!worker) return;
  const currentWorker = worker;
  const currentConnection = workerConnection;
  worker = undefined;
  workerConnection = undefined;
  await currentWorker.close();
  await currentConnection?.quit();
}
