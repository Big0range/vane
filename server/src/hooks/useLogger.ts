import express from 'express';
import logger from 'morgan';
import * as path from 'path';
import dayjs from 'dayjs';
// Routes
import * as FileStreamRotator from 'file-stream-rotator';
// Express configuration

export const useApiLogger = (app: express.Application, logpath: string) => {
  // log日志
  const accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logpath, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: true,
  });
  app.use(
    logger(
      function (tokens: any, req: any, res: any) {
        const arr = [
          `---------------------------------------------------------------------`,
          `IP: "${req.headers['x-real-ip'] || req.ip}"`,
          `referer: "${req.headers.referer}"`,
          `host: "${req.headers.host}"`,
          `时间: "${dayjs(tokens.res(req, res, 'Date')).format(
            'YYYY-MM-DD HH:mm:ss',
          )}"`,
          `method: "${tokens.method(req, res)}"`,
          `url: "${tokens.url(req, res)}"`,
          `HTTP: "${req.httpVersion}"`,
          `响应状态码: "${tokens.status(req, res)}"`,
          `响应时间: "${tokens['response-time'](req, res)} ms"`,
          `content-length: "${tokens.res(req, res, 'content-length')}"`,
          `浏览器版本: "${req.headers['user-agent']}"`,
        ];
        Number(tokens.status(req, res)) >= 400
          ? arr.push(`错误信息: ${JSON.stringify(res.locals.message)}`)
          : null;
        arr.push('');
        return arr.join('\n');
      },
      {
        stream: accessLogStream,
      },
    ),
  );
};

export const useMysqlLogger = (mysqlLogPath: string) => {
  // log日志
  const accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(mysqlLogPath, 'sql-%DATE%.log'),
    frequency: 'daily',
    verbose: true,
  });
  return (sql: string, timing: any) => {
    const arr = [
      `Date: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
      `SQL: ${sql}`,
      '',
    ];
    // console.log('sql', sql);
    accessLogStream.write(arr.join('\n'));
  };
};
