import Redis from 'ioredis';

const redis = new Redis({
  port: Number(process.env.REDIS_PORT), // Redis port
  host: process.env.REDIS_HOST, // Redis host
  password: process.env.REDIS_PASSWORD,
  db: Number(process.env.REDIS_DB), // Defaults to 0
});

redis.on('connection', () => {
  console.log('redis连接成功');
});

export default redis;
