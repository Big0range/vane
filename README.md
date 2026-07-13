# vane

最新文档内容以[GitHub](https://github.com/Big0range/vane)为准

## 封面

![封面](https://www.limeichao.cn:7791/i/2026/07/06/6a4b286217ba9.webp)

写这个的初衷是因为每次用node写接口的时候总是需要一些写大一堆的东西, 也有些人把很多接口都放在一个js文件内, 看起来很是杂乱后来用到nuxt写的时候, 感觉用文件名来命名接口路径很是方便, 无论是query参数还是params参数,都可以通过文件名来命名, 也可以通过文件夹层级清晰的反映出接口之间的关系(虽然类似nuxt,next这种的框架确实很好, 但是好处同样也是坏处,很难完全的前后端分离, 不能只写前端,或者后端,而且也不需要再去学习相关的知识), 于是就有了这个项目, 能够节省很大一部分时间, 也能够让接口更加清晰, 也能够让接口更加清晰, 也能够让接口更加清晰, 重要的事情说三遍。\
节省下来的时间用来休息和摸鱼多好(不是让你接着内卷的)。如果真的帮到了你的话,觉得这个项目还不错的话, 可以给我一个star, 也可以给我一个star, 也可以给我一个star, 重要的事情说三遍。

[github传送门](https://github.com/Big0range/vane)

[gitee传送门](https://gitee.com/li_mei_chao/vane)

[接口文档](https://console-docs.apipost.cn/preview/dc179c71d30711dd/f33af9712a7ab774)

![Snipaste_2023-06-26_18-06-59.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/daa93a221e164edcacc6c0bb04a99b3d~tplv-k3u1fbpfcp-watermark.image?)

![Snipaste_2023-06-26_18-07-28.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/377d7e743b2b438cb4d5c16a3e070b1a~tplv-k3u1fbpfcp-watermark.image?)

## 技术栈

web\
`Vue3`, `TypeScript`, `Vite`, `naive-ui`\
server\
`node`, `TypeScript`, `express`, `sequelize`, `mysql`, `redis`\
server进阶\
`docker`, `docker-componse`, `pm2`

node版本: `^26`\
pnpm版本: `^11`

**_注意: 本项目采用了pnpm workspace的模式, 所以在项目根目录下执行命令时, 请使用`pnpm`命令, 而不是`npm`命令_**

## 目录结构

```
|-- 🗂️apps
    |-- 🗂️client(web客户端)
        |-- 🗂️public
            |-- 🗂️fonts(苹方字体文件)
            |-- 📄favicon.svg
            |-- 📄icons.svg
            |-- 📄logo.png
        |-- 🗂️src(业务代码)
            |-- 🗂️api(接口相关)
            |-- 🗂️assets(静态资源)
            |-- 🗂️components(公共组件)
            |-- 🗂️directive(自定义vue3指令)
            |-- 🗂️hooks(自定义hook)
            |-- 🗂️layout(页面整体布局)
            |-- 🗂️router(路由配置)
            |-- 🗂️store(pinia)
            |-- 🗂️styles(公共样式)
            |-- 🗂️theme(主题样式)
            |-- 🗂️utils(公共工具)
            |-- 🗂️views(页面组件)
            |-- 📄App.vue
            |-- 📄global.d.ts(全局ts类型定义)
            |-- 📄main.ts
            |-- 📄mount.vue(window挂载)
            |-- 📄permission.ts(路由权限)
            |-- 📄settings.ts(配置)
            |-- 📄style.css(全局样式)
        |-- 📄.env
        |-- 📄.env.development
        |-- 📄.env.production
        |-- 📄.env.staging
        |-- 📄.gitignore
        |-- 📄.gitignore copy
        |-- 📄.prettierignore
        |-- 📄index.html
        |-- 📄package-lock.json
        |-- 📄package.json
        |-- 📄README.md
        |-- 📄tsconfig.app.json
        |-- 📄tsconfig.json
        |-- 📄tsconfig.node.json
        |-- 📄vite.config.ts
    |-- 🗂️server(服务端)
        |-- 🗂️logs(日志)
        |-- 🗂️public(静态资源)
            |-- 📄favicon.ico
        |-- 🗂️src(业务代码)
            |-- 🗂️hooks(自定义hook)
            |-- 🗂️middlewares(中间件)
            |-- 🗂️routes(路由配置)
            |-- 🗂️serve(数据库相关)
            |-- 🗂️types(一些全局ts类型)
            |-- 🗂️utils(公共工具)
            |-- 📄app.ts
            |-- 📄server.ts
        |-- 🗂️uploads
            |-- 🗂️images
        |-- 📄.env
        |-- 📄.env.development
        |-- 📄.env.example
        |-- 📄.env.production
        |-- 📄.gitignore
        |-- 📄cao_ni_ma.txt
        |-- 📄ecosystem.config.js(已废弃  node直接启动)
        |-- 📄nodemon.json(dev启动时相关配置)
        |-- 📄package.json
        |-- 📄prettier.config.js
        |-- 📄tsconfig.json
|-- 🗂️db(docker-compose 启动数据库)
    |-- 📄docker-compose.yml
|-- 🗂️packages(公共工具包)
    |-- 🗂️utils
        |-- 🗂️src
            |-- 📄encryption.ts(已废弃  启用md5加盐加密)
            |-- 📄isPrivateIP.ts
            |-- 📄sleep.ts
            |-- 📄validate.ts
        |-- 📄.eslintignore
        |-- 📄eslint.config.js
        |-- 📄index.ts
        |-- 📄package-lock.json
        |-- 📄package.json
        |-- 📄tsconfig.json
|-- 🗂️scripts(其他的一些小脚本)
    |-- 🗂️lineCount(统计代码行数-审计还是啥来着可能会用到)
        |-- 📄config.ts
        |-- 📄index.ts
    |-- 🗂️tree(生成文件树)
        |-- 📄config.ts
        |-- 📄index.ts
    |-- 📄pre-commit.ts
|-- 📄.gitignore
|-- 📄.npmrc
|-- 📄.prettierrc.js
|-- 📄commitlint.config.cjs
|-- 📄dev.ts
|-- 📄docker-compose.yml
|-- 📄docker_start.sh
|-- 📄eslint.config.ts
|-- 📄lineCount.txt
|-- 📄package.json
|-- 📄pnpm-lock.yaml
|-- 📄pnpm-workspace.yaml

```

## 服务端

### 配置hosts

如果是windows的话,请在`C:\Windows\System32\drivers\etc\hosts`文件中添加以下内容

请替换为自己真实的mysql以及redis数据库ip地址, 192.168.31.202仅为示例

```shell
192.168.31.202 vane-redis-master
192.168.31.202 vane-mysql-master
192.168.31.202 vane-mysql-node1
192.168.31.202 vane-mysql-node2
```

### 安装依赖

`npm install -g pnpm` (也可以指定版本安装pnpm `npm install -g pnpm@11`)\
`pnpm install`

请勿使用淘宝镜像源,会导致依赖安装失败\
还原设置: `pnpm config set registry https://registry.npmjs.org/`

### 启动命令

#### 开发环境

启动服务端: `pnpm dev:server`\
启动web端: `pnpm dev:client`\
全部启动: `pnpm dev`\\

#### 正式环境(`Centos`)

启动服务端

1. 原生docker部署(`不推荐`), 会根据Dockerfile文件中配置启动 会执行一个`run.sh`脚本,可按需求修改
2. 非docker部署(`极不推荐,需要服务器支持node26,并且较为繁琐`),可以运行`pnpm start:server`(无需打包 node原生运行),**需要自己启动以及配置数据库,并且node>=26并不支持Centos7,极力推荐使用docker进行部署**
3. docker-componse部署(`推荐`), 一键脚本 `sh docker_start.sh all/server/db` (参数按需选择all或者server或者db,不传入的话默认为server)
   1. db: 启动mysql以及redis数据库 如果你是第一次启动的话需要下载[GitHub](https://github.com/Big0range/vane)中releases符合自己本地代码版本的数据库文件(版本可在根目录下package.json中查看),并解压到`/home/docker-volumes`目录下,正确的目录应该是`/home/docker-volumes/vane`,也可以自己修改`db/docker-compose.yml`文件中的相关配置,自己配置数据库
   2. server: 启动node服务端和nginx,默认端口映射为80,如果你想修改的话,请自行修改`server/docker-compose.yml`文件中的相关配置
   3. all: 数据库以及服务端全部启动
   4. 建议: 数据库如无修改,启动一次即可
   5. 注意事项: 执行时默认会请求最新代码, 如果你不喜欢的话,请删除`docker_start.sh`中第三行至第八行

#### docker 镜像下载问题

1. 如果你的服务器无法下载docker镜像,请尝试修改docker镜像源,具体操作请自行查询(帖子太多了,没必要写在这里.....)
2. 如果你尝试修改docker镜像源后,仍然无法下载,在网盘中下载对应的压缩包,docker导入镜像,云盘内有使用说明,按照操作即可\
   [网盘地址](https://pan.baidu.com/s/1_WyuCMNGFTUkniuDia7P_g) 提取码: `8gyc`

#### 单独打包

如果你有其他的需求,可以单独打包,打包后的文件在`dist`文件夹下

1. 打包服务端 `无需打包`
2. 打包web端 `pnpm build:client`

### 环境配置

#### 开发环境配置

`node>=26`, `pnpm>=11`, `mysql:5.7`, `redis:6.2`

#### 正式环境

`node>=26`, `mysql`, `redis`, `pnpm>=11,docker(可选)`, `docker-componse(可选)`

#### 配置env文件

在`server`文件夹下创建`.env`文件,并按照`.env.example`文件中的格式进行配置

### 添加接口路由

#### 路由添加

在`server/src/routes`文件夹中添加.ts文件即可,路由会根据所在位置以及文件名自动加载,无需显示引入

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
      log: '上传成功', // 如果你的接口需要记录日志,请在这里传入相关信息(非必填)
    });
  } catch (error) {
    /**
     * 失败之后的操作
     */
    res.fail(error);
  }
}

// 中间件 非必填
export const middleware = [() => {}];
```

### 接口白名单(不需要登录鉴权)

#### 系统固定白名单(不可修改)

修改`server\src\serve\sys\routes.serve.ts`中的`constantRouteWhiteList`数组, 修改之后需要清空mysql中的`sys_routes`表和redis中的`routeWhitelist`缓存,否则无法生效

#### 自定义白名单(可修改)

启动前端服务,在<http://localhost:4000/vane/system/white-api>中进行配置,无需修改mysql和redis

### 日志记录

#### api日志

接口日志会自动记录在`apps/server/logs/app`文件夹下,文件名为`${日期}.log`

#### sql日志

sql日志会自动记录在`apps/server/logs/sql`文件夹下,文件名为`${日期}.log`

### 文件上传

本项目使用了腾讯云对象存储,如果您没有腾讯云对象存储的话,请自行修改`apps/server/src/server/routes/upload.ts`文件中的上传逻辑,并修改`client/src/utils/config.ts`文件中的`CDNURL` 远程资源地址

### 注意事项

1. env中 如果mysql填写了多个,则启动主从模式,第一个为主,其他为从数据库
2. 虽然使用了pnpm的workspace的模式,但是由于某些原因服务端在打包后,不能正确解析工作区间内的包名,所以禁止在服务端代码内使用工作区间内的包,但是web端可以使用服务端的

## web客户端

如果你用过vue2版本的vue-admin的话,上手应该会非常快,因为本项目的前端是模仿vue-admin的vue3版本,并且使用了typescript,所以如果你不熟悉vue3的话,建议先学习一下vue3的基础知识

### 字体问题

项目中默认使用的为PingFang(苹方)字体,已经做了切片处理,无需担心加载过慢问题,字体文件放置在`apps/client/public/fonts`文件夹下,如果你的项目中没有使用到该字体,请自行删除,并且取消`apps/client/src/styles/index.scss`文件的引用(`styles/index中`),否则会导致打包后的文件过大\
强烈建议您在使用此字体的时候,把字体文件放置在对象存储或CDN上,否则会加大服务器流量的压力,当您放置在对象存储或CDN上时请修改`client/src/styles/fonts/*.scss`文件中的url地址为自己的地址

### 添加路由

1. 在`src/router/index.ts`中添加路由,并且在`src/views`中添加页面组件
2. 在`src/views`中添加页面组件, `系统管理=>菜单管理`中添加菜单地址, 并在 `系统管理=>角色管理`为角色分配菜单权限

### package.json 脚本说明

1. `dev` 启动服务端以及web端开发模式
2. `dev:server` 启动服务端开发模式
3. `dev:client` 启动web端开发模式
4. `build:server` 打包服务端
5. `build:client` 打包web端
6. `start:server` 启动打包后的服务端(非docker启动模式下使用)
7. `lint:server` 格式化服务端代码
8. `lint:client` 格式化web端代码
9. `deploy:client` 一键部署web端
10. `tree` 生成目录结构树
11. `lines` 统计源代码行数(好像是软著还是啥来着的需要)
12. `commit` 提交代码

## admin账号

username: `admin`\
password: `Vane888888`

登录之后可在用户管理页面修改密码,以及用户的添加删除封号等处理

## 代码提交

执行以下命令\
`git add .`(添加文件)\
`pnpm commit`(commit前会自动执行eslint以及prettier,并将代码格式化**scripts中的pre-commit.ts脚本**,只会格式化暂存区的代码,不用担心性能问题,不建议用其他的格式化工具,太臃肿)\
`git push`(推送代码)

## AI agents

项目内包含codeX agents 以及claude agents,每个agents包含三个skills(项目内包含codeX和claude的功能相同)

1. FormCreate使用助手 用于帮助生成可用于formcreate的JSON配置
2. naive-ui-skills 用于帮助生成naive-ui的代码, 自动生成的不准确时可以调用此skill
3. server 用于帮助生成服务端的代码, 尽可能的保留当前项目代码风格
