import Redis from 'ioredis';
import { logger } from './useLogger';

const redis = new Redis({
  port: Number(process.env.REDIS_PORT), // Redis port
  host: process.env.REDIS_HOST, // Redis host
  password: process.env.REDIS_PASSWORD,
  db: Number(process.env.REDIS_DB), // Defaults to 0
});

redis.on('connection', () => {
  logger.info('redis连接成功');
});

export default redis;
