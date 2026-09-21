import { logger } from '#/utils/useLogger.ts';
import { refreshScheduledJobs } from './scheduled-job.service.ts';
import { closeScheduledJobQueue } from './scheduled-job.queue.ts';
import { closeScheduledJobWorker, initScheduledJobWorker } from './scheduled-job.worker.ts';

export async function initScheduledJobs() {
  initScheduledJobWorker();
  await refreshScheduledJobs();
  logger.info('定时任务调度器初始化完成');
}

export async function closeScheduledJobs() {
  await closeScheduledJobWorker();
  await closeScheduledJobQueue();
}
