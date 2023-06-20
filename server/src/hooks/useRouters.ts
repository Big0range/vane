import fs from 'fs';
import path from 'path';
import express, { Router } from 'express';
const dirPath = path.resolve(__dirname, '../routes');
const router = Router();
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
          let methods = 'get';
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
            methods = infoList[1];
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
          // console.log(`\x1b[32mrouter:${realPath}   methods:${methods}\x1b[0m`);
          (router as any)[methods](realPath, ...middleware, routeFn);
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
};
