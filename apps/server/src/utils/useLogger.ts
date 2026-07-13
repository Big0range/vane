import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, printf, colorize } = winston.format;
// 自定义日志格式
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});
const DailyRotateFileConfig = {
  dirname: 'logs/app', // 日志目录
  filename: '%DATE%.log', // 文件名（%DATE% 自动替换为日期）
  datePattern: 'YYYY-MM-DD', // 日期格式
  zippedArchive: true, // 压缩旧日志
  maxSize: '20m', // 单个文件最大大小
  maxFiles: '30d', // 保留最近30天的日志
};
export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // 添加时间戳
    logFormat, // 应用自定义格式
  ),
  //   defaultMeta: { service: 'user-service' },
  transports: [
    // 按日分割文件
    new DailyRotateFile({
      ...DailyRotateFileConfig,
    }),
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
      level: 'debug',
    }),
  ],
  // 异常处理（可选）
  exceptionHandlers: [
    // 按日分割文件
    new DailyRotateFile({
      ...DailyRotateFileConfig,
      dirname: 'logs/exceptions', // 日志目录
    }),
  ],
  // Promise拒绝处理（可选）
  rejectionHandlers: [
    // 按日分割文件
    new DailyRotateFile({
      ...DailyRotateFileConfig,
      dirname: 'logs/rejections', // 日志目录
    }),
  ],
});
const loggerInfoFn = logger.info;
logger.info = function (...args: any[]) {
  loggerInfoFn(
    args
      .map((item) => {
        if (item instanceof Error) {
          return item.stack || item.message;
        } else {
          return JSON.stringify(item);
        }
      })
      .join(', '),
  );
} as any;

export const mysqlLogger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // 添加时间戳
    logFormat, // 应用自定义格式
  ),
  //   defaultMeta: { service: 'user-service' },
  transports: [
    // 按日分割文件
    new DailyRotateFile({
      ...DailyRotateFileConfig,
      dirname: 'logs/sql', // 日志目录
    }),
  ],
});

export const useMysqlLogger = () => {
  return (sql: string) => {
    if (sql === 'SELECT 1') return;
    mysqlLogger.info(sql);
  };
};
