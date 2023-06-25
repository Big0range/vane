# vane

## 技术栈

web\
`Vue3`, `TypeScript`, `Vite` `node`\
server\
`node`, `TypeScript`, `express`, `sequelize`, `mysql`, `redis`\
server进阶\
`docker`, `docker-componse`, `pm2`

## 配置hosts

如果是windows的话,请在`C:\Windows\System32\drivers\etc\hosts`文件中添加以下内容

请替换为自己真实的ip地址 192.168.31.202仅为示例

```shell
192.168.31.202 vane-redis-master
192.168.31.202 vane-mysql-master
192.168.31.202 vane-mysql-node1
192.168.31.202 vane-mysql-node2
```

## 启动命令

打包服务端 `pnpm build:server`\
打包web端 `pnpm build:client`

启动服务端(开发环境)`pnpm dev:server`\
启动web端(开发环境)`pnpm dev:client`\
全部启动(开发环境)`pnpm dev`\
启动服务端(正式环境)

1. 如果是docker部署的话 会根据Dockerfile文件中配置启动 会执行一个`run.sh`脚本,可按需求修改,**需要自己启动以及配置数据库**
2. 不是docker的情况下可以运行`pnpm start:server`,**需要自己启动以及配置数据库**
3. docker-componse 一键脚本 `sh docker_start.sh all/server/db` (参数按需选择all或者server或者db,不传入的话默认为server)
    1. db: 启动数据库 如果你是第一次启动的话需要下载GitHub中releases最新版本文件,并解压到`/home/docker-volumes`目录下,正确的目录应该是`/home/docker-volumes/vane`,也可以自己修改`db/docker-compose.yml`文件中的相关配置,自己配置数据库
    2. server: 启动node服务端
    3. all: 数据库以及服务端全部启动
    4. 建议: 数据库如无修改,启动一次即可

## 环境配置

### 开发环境

`node>=18`, `pnpm>=8`, `mysql`, `redis`

### 正式环境

`node>=16.14.0`, `mysql`, `redis`, `pnpm>=8,docker(可选)`, `docker-componse(可选)`

## 服务端相关

### 配置env文件

在`server`文件夹下创建`.env`文件,并按照`.env.example`文件中的格式进行配置

### 路由添加

在`server/src/server/routes`文件夹中添加.ts文件即可,路由会根据所在位置以及文件名自动加载,无需显示引入

#### 文件名示例

`routes/user/list.ts` => `http://localhost:9999/user/list`(get请求)\
`routes/user/index.ts` => `http://localhost:9999/user`(get请求)\
`routes/user/list.post.ts` => `http://localhost:9999/user/list`(post请求)\
`routes/user/list[a,b].post.ts` => `http://localhost:9999/user/list`(post请求,并req.params中带有a和b两个参数)

#### 文件内容示例

```typescript
import { Request, Response } from '@/routes/types';
export default async function (req: Request, res: Response) {
  try {
    /**
     * 某些操作
     */
    res.ok({
      message: '操作成功',
      data: data.Location.split('/images/')[1],
    });
  } catch (error) {
    /**
     * 失败之后的操作
     */
    res.fail(error);
  }
}

// 中间件 非必填
export const middleware = [()=>{}];

```

### 日志记录

#### api日志

接口日志会自动记录在`server/logs/api`文件夹下,文件名为`access-${日期}.log`

#### sql日志

sql日志会自动记录在`server/logs/sql`文件夹下,文件名为`sql-${日期}.log`

### 文件上传

本项目使用了腾讯云对象存储,如果您没有腾讯云对象存储的话,请自行修改`server/src/server/routes/upload.ts`文件中的上传逻辑,并修改`client/src/utils/config.ts`文件中的`CDNURL` 远程资源地址

## 代码提交

根目录下执行以下命令\
`git add .`\
`pnpm commit`\
`git push`

## 注意事项

1. mysql使用了一主多从集群模式,如果您仅仅使用一个mysql的话,请修改`server/.env`文件中的`mysql`配置,以及`server/src/serve/db.ts`文件中`sequelize`的实例初始化代码

2. 开发环境下, 默认不启动数据库集群模式,如果需要启动集群模式,请修改`server`文件夹下的`nodemon.json`中的NODE_ENV为production

3. 虽然使用了pnpm的workspace的模式,但是由于某些原因服务端在打包后,不能正确解析工作区间内的包名,所以禁止在服务端代码内使用工作区间内的包,但是web端可以使用服务端的
