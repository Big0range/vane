import { Redis } from 'ioredis';
import { logger } from './useLogger.ts';

function createRedis() {
  const redis = new Redis({
    port: Number(process.env.REDIS_PORT), // Redis port
    host: process.env.REDIS_HOST, // Redis host
    password: process.env.REDIS_PASSWORD,
    db: Number(process.env.REDIS_DB), // Defaults to 0
    retryStrategy(times) {
      return Math.min(times * 1000, 10000);
    },
  });

  redis.on('connect', () => {
    console.log('Redis connected');
  });

  redis.on('ready', () => {
    console.log('Redis ready');
  });

  redis.on('error', (err) => {
    console.error('Redis error:', err);
  });

  redis.on('close', () => {
    console.log('Redis closed');
  });

  redis.on('reconnecting', () => {
    console.log('Redis reconnecting...');
  });

  return redis;
}

const redis = createRedis();

redis.on('connection', () => {
  logger.info('redis连接成功');
});
redis.on('error', (err) => {
  logger.error(`redis连接错误: ${err.message}`);
});

// 订阅连接
const subRedis = createRedis();

// 设置心跳任务名称
const heartbeatKey = 'heartbeat';

// 设置心跳时间间隔
const interval = 5000;

// 定时写入心跳
setInterval(async () => {
  await redis.set(heartbeatKey, Date.now(), 'EX', 10);

  // 触发通知
  await redis.publish(heartbeatKey, Date.now().toString());
}, interval);

// 监听消息
subRedis.on('message', (_channel, _message) => {
  if (process.env.NODE_ENV === 'development') {
    // console.log('收到心跳:', channel, message);
  }
});

// 订阅频道
subRedis.subscribe(heartbeatKey);
export default redis;
