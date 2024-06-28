import fs from 'fs';
import path from 'path';
import express, { Router } from 'express';
import { sysRoutesServe } from '@/serve';
import { isMaster } from '@/utils/isMaster';
const dirPath = path.resolve(__dirname, '../routes');
const router = Router();
const routes: { url: string; method: string }[] = [];

export const useRouters = async (app: express.Application) => {
  async function getAllFiles(root: string) {
    const result: string[] = [];
    const files = fs
      .readdirSync(root, { withFileTypes: true })
      .filter(
        file =>
          file.name[0] !== '.' &&
          !/.map$/.test(file.name) &&
          !/^type/.test(file.name),
      );
    const tem: any[] = [];
    for (let i = 0; i < files.length; i++) {
      if (/^index\./.test(files[i].name) || files[i].name === 'index') {
        tem.push(files[i]);
      } else {
        tem.unshift(files[i]);
      }
    }
    files.length = 0;
    files.push(...tem);
    for (const file of files) {
      const filePath = path.join(root, file.name);

      if (file.isDirectory()) {
        result.push(...(await getAllFiles(filePath)));
      } else {
        // 文件夹名字
        const dirname = root.replace(dirPath, '').replace(/\\/g, '/') || '/';
        // 获取文件内容
        const asyncRoute = await import(filePath);
        // 获取中间件
        const middleware = asyncRoute.middleware || [];
        // 获取路由函数
        const routeFn = asyncRoute.default;
        try {
          if (typeof routeFn !== 'function') {
            throw new Error('路由不存在');
          }
          // 路由路径
          const routePath =
            path.basename(filePath).split('.')[0] === 'index'
              ? '/'
              : path.basename(filePath).split('.')[0];
          let basePath = '';
          let method = 'get';
          const methodsAll = ['get', 'post', 'put', 'delete'];
          const infoList = path.basename(filePath).split('.');
          if (infoList.length === 2) {
            basePath = infoList[0] === 'index' ? '/' : infoList[0];
          } else if (infoList.length === 3) {
            if (!methodsAll.includes(infoList[1])) {
              throw new Error(`路由文件命名错误: ${infoList[1]} 请求方式错误`);
            }
            // 这个变量其实一点用也没有, 但是我懒得改了
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            basePath = infoList[0] === 'index' ? '/' : infoList[0];
            method = infoList[1];
          } else {
            throw new Error(`路由文件命名错误: ${filePath}`);
          }
          const realPath = `${dirname}/${routePath}`
            .replace(/\[.*\]/, str => {
              if (str.length === 2) {
                return '';
              }
              return `/:${str
                .slice(1, str.length - 1)
                .split(',')
                .join('/:')}`;
            })
            .replace(/\/+/g, '/');
          // console.log(`\x1b[32mrouter:${realPath}   method:${method}\x1b[0m`);
          (router as any)[method](realPath, ...middleware, routeFn);
          routes.push({ url: realPath, method });
          // await sysRoutesServe.create({ url: realPath, method });
        } catch (error) {
          console.log('router注册失败', error);
        }

        result.push(filePath);
      }
    }
    return result;
  }
  await getAllFiles(dirPath);
  app.use(router);
  // 为了不妨碍主进程的启动, 所以这里使用异步 (路由越多启动越慢, 这个不是很重要, 完全可以异步去执行)
  const func = async (i = 1) => {
    try {
      if (isMaster) {
        console.log('主进程, 开始遍历路由列表');
        const result = await sysRoutesServe.findAll(1, 99999);
        const dbRoutes = result.rows;
        // 遍历数据库中的路由列表, 如果本地不存在, 则删除
        for (const dbRoute of dbRoutes) {
          const some = routes.some(
            item => item.url === dbRoute.url && item.method === dbRoute.method,
          );
          // 不存在 ===> 删除
          if (!some) {
            await sysRoutesServe.destroy(dbRoute.id);
          }
        }
        for (const route of routes) {
          // 先判断是否存在, 不存在再创建
          const some = result.rows.some(
            item => item.url === route.url && item.method === route.method,
          );
          // 不存在 ===> 创建
          if (!some) {
            await sysRoutesServe.create({
              ...route,
              match: route.url.replace(/:[^/]+/g, '[^/]+'),
            });
          }
        }
        console.log('主进程, 遍历路由列表结束');
      }
    } catch (error) {
      console.log(error);
      console.log('主进程, 遍历路由列表失败, 10秒后重试,重试次数:', i);
      setTimeout(() => {
        func(i + 1);
      }, 10 * 1000);
    }
  };
  // 这个定时器纯粹为了日志输出好看没任何卵用,完全可以直接运行
  setTimeout(func, 2000);
};
