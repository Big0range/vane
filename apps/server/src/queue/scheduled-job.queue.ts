import { Queue } from 'bullmq';
import { createRedis } from '#/utils/redis.ts';

export const scheduledJobQueueName = 'scheduled-job';
export type ScheduledQueueData = {
  scheduledJobId: number;
  scheduledJobVersion: number;
  logId?: number;
};

const connection = createRedis(null);
export const scheduledJobQueue = new Queue<ScheduledQueueData>(scheduledJobQueueName, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 },
    removeOnComplete: 200,
    removeOnFail: 500,
  },
});

export const getScheduledJobSchedulerId = (id: number) => `scheduled-job:${id}`;

export async function closeScheduledJobQueue() {
  await scheduledJobQueue.close();
  await connection.quit();
}
