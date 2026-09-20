import { createRedis } from './src/utils/redis.ts';
import { Queue, Worker } from 'bullmq';

async function main() {
  try {
    const redis = createRedis(null);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const myQueue = new Queue('paint-queue', { connection: redis });
    setTimeout(() => {
      console.log('aaaaaa');
      myQueue.add('paint-queue', {
        color: 'red',
        carId: 'tesla-001',
      });
    }, 1000);

    const worker = new Worker(
      'paint-queue',
      async (job) => {
        // job.data 包含 { color: 'red', carId: '...' }
        console.log(`开始喷涂 ${job.data.carId} 为 ${job.data.color}`);

        // 模拟耗时操作
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log(`完成喷涂 ${job.data.carId}`);

        // 返回值会存入 job.returnvalue
        return { status: 'success', paintedAt: new Date() };
      },
      { connection: redis },
    );

    // 监听事件（可选）
    worker.on('completed', (job) => {
      console.log(`任务 ${job.id} 已完成，结果是: ${JSON.stringify(job.returnvalue)}`);
    });

    worker.on('failed', (job, err) => {
      console.log(`任务 ${job!.id} 失败，原因: ${err.message}`);
    });
  } catch (error) {
    console.error('添加任务失败', error);
  }
}

main();
