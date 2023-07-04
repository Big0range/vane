# vane

最新文档内容以[GitHub](https://github.com/Big0range/vane)为准

## 封面

![封面](https://cos.limeichao.cn/images/dalailai.png?imageMogr2/format/webp)

写这个的初衷是因为每次用node写接口的时候总是需要一些写大一堆的东西, 也有些人把很多接口都放在一个js文件内, 看起来很是杂乱
后来用到nuxt写的时候, 感觉用文件名来命名接口路径很是方便, 无论是query参数还是params参数,都可以通过文件名来命名, 也可以通过文件夹层级清晰的反映出接口之间的关系(虽然类似nuxt,next这种的框架确实很好, 但是好处同样也是坏处,很难完全的前后端分离, 不能只写前端,或者后端,而且也不需要再去学习相关的知识), 于是就有了这个项目, 能够节省很大一部分时间, 也能够让接口更加清晰, 也能够让接口更加清晰, 也能够让接口更加清晰, 重要的事情说三遍。\
节省下来的时间用来休息和摸鱼多好(不是让你接着内卷的)。
如果真的帮到了你的话,觉得这个项目还不错的话, 可以给我一个star, 也可以给我一个star, 也可以给我一个star, 重要的事情说三遍。

[github传送门](https://github.com/Big0range/vane)

[gitee传送门](https://gitee.com/li_mei_chao/vane)

[接口文档](https://console-docs.apipost.cn/preview/dc179c71d30711dd/f33af9712a7ab774)

![Snipaste_2023-06-26_18-06-59.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/daa93a221e164edcacc6c0bb04a99b3d~tplv-k3u1fbpfcp-watermark.image?)

![Snipaste_2023-06-26_18-07-28.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/377d7e743b2b438cb4d5c16a3e070b1a~tplv-k3u1fbpfcp-watermark.image?)

## 技术栈

web\
`Vue3`, `TypeScript`, `Vite` `node`\
server\
`node`, `TypeScript`, `express`, `sequelize`, `mysql`, `redis`\
server进阶\
`docker`, `docker-componse`, `pm2`

node版本: `^18`\
pnpm版本: `^8`

## 服务端

目录结构

```
|-- 🗂️server
    |-- 🗂️logs (日志)
        |-- 🗂️api (api 日志)
            |-- 📄api-20230628.log
            |-- 📄api-20230629.log
        |-- 🗂️sql (sql 日志)
            |-- 📄sql-20230628.log
            |-- 📄sql-20230629.log
    |-- 🗂️public (express 公开资源)
        |-- 📄favicon.ico
    |-- 🗂️src
        |-- 🗂️hooks (自定义hook)
            |-- 📄useLogger.ts (记录日志hook)
            |-- 📄useRouters.ts (注册路由hook)
        |-- 🗂️middlewares (中间件)
            |-- 📄authorization.ts (校验登录状态)
            |-- 📄errorHandler.ts (错误捕捉)
            |-- 📄index.ts
            |-- 📄resultHandler.ts (接口返回数据封装方法)
            |-- 📄upload.ts (multer 接受上传文件 目前支持的是图片)
        |-- 🗂️routes (接口路由)
            |-- 🗂️dept
            |-- 🗂️logs
            |-- 🗂️menu
            |-- 🗂️msg
            |-- 🗂️mysql-demo
            |-- 🗂️role
            |-- 🗂️server-routes
            |-- 🗂️shop
            |-- 🗂️upload
            |-- 🗂️user
            |-- 📄config.ts
            |-- 📄demo.ts
            |-- 📄demo[a,b,c].post.ts
            |-- 📄index.get.ts
            |-- 📄index.post.ts
            |-- 📄types.ts
            |-- 📄xlsx.post.ts
        |-- 🗂️serve (数据库相关)
            |-- 🗂️sys (系统相关)
            |-- 📄comm.serve.ts (公共类)
            |-- 📄db.ts (数据库初始化文件)
            |-- 📄dept.serve.ts (...)
            |-- 📄employee.serve.ts (...)
            |-- 📄index.ts 
            |-- 📄shop.serve.ts (...)
        |-- 🗂️utils
            |-- 📄alias.ts (路径别名)
            |-- 📄encryption.ts (数据加密, 可逆)
            |-- 📄index.ts
            |-- 📄isPrivateIP.ts (校验是否是本地ip 没用到....)
            |-- 📄loadEnv.ts (加载.env)
            |-- 📄md5.ts (md5加密)
            |-- 📄redis.ts (redis)
            |-- 📄sleep.ts (延迟函数)
            |-- 📄token.ts (token的创建与销毁)
            |-- 📄validate.ts (数据校验)
        |-- 📄app.ts
        |-- 📄server.ts
    |-- 🗂️views
        |-- 📄error.pug
        |-- 📄index.pug
        |-- 📄layout.pug
    |-- 📄.env (默认环境变量,无论什么环境都会加载,需要自己创建,为了项目安全,请勿直接保存在代码库中)
    |-- 📄.env.development (开发测试环境)
    |-- 📄.env.example (env文件示例)
    |-- 📄.env.production (生产环境)
    |-- 📄.eslintignore
    |-- 📄.eslintrc.js (eslint)
    |-- 📄.gitignore
    |-- 📄.prettierignore
    |-- 📄.prettierrc.js
    |-- 📄cao_ni_ma.txt (神兽)
    |-- 📄del_dist.js 
    |-- 📄ecosystem.config.js (pm2相关配置)
    |-- 📄global.d.ts
    |-- 📄nodemon.json (nodemon启动配置)
    |-- 📄package.json
    |-- 📄renovate.json
    |-- 📄tsconfig.json
```


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

`npm install -g pnpm` (也可以指定版本安装pnpm `npm install -g pnpm@8`)\
`pnpm install`

请勿使用淘宝镜像源,会导致依赖安装失败\
还原设置: `pnpm config set registry https://registry.npmjs.org/`

### 启动命令

#### 开发环境

启动服务端: `pnpm dev:server`\
启动web端: `pnpm dev:client`\
全部启动: `pnpm dev`\

#### 正式环境(`Centos`)

启动服务端

1. 原生docker部署(`不推荐`), 会根据Dockerfile文件中配置启动 会执行一个`run.sh`脚本,可按需求修改
2. 非docker部署(`极不推荐,需要服务器支持node18,并且较为繁琐`),可以运行`pnpm start:server`(请先执行打包命令),**需要自己启动以及配置数据库,并且node>=18并不支持Centos7,极力推荐使用docker进行部署**
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

1. 打包服务端 `pnpm build:server`
2. 打包web端 `pnpm build:client`

### 环境配置

#### 开发环境配置

`node>=18`, `pnpm>=8`, `mysql:5.7`, `redis:6.2`

#### 正式环境

`node>=16.14.0`(如果可以安装18版本的最好,16版本只是能保证基本的安装依赖), `mysql`, `redis`, `pnpm>=8,docker(可选)`, `docker-componse(可选)`

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
      log: '上传成功',// 如果你的接口需要记录日志,请在这里传入相关信息(非必填)
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

### 接口白名单(不需要登录鉴权)

#### 系统固定白名单(不可修改)

修改`server\src\serve\sys\routes.serve.ts`中的`constantRouteWhiteList`数组, 修改之后需要清空mysql中的`sys_routes`表和redis中的`routeWhitelist`缓存,否则无法生效

#### 自定义白名单(可修改)

启动前端服务,在[http://localhost:4000/vane/system/white-api](http://localhost:4000/vane/system/white-api)中进行配置,无需修改mysql和redis

### 日志记录

#### api日志

接口日志会自动记录在`server/logs/api`文件夹下,文件名为`access-${日期}.log`

#### sql日志

sql日志会自动记录在`server/logs/sql`文件夹下,文件名为`sql-${日期}.log`

### 文件上传

本项目使用了腾讯云对象存储,如果您没有腾讯云对象存储的话,请自行修改`server/src/server/routes/upload.ts`文件中的上传逻辑,并修改`client/src/utils/config.ts`文件中的`CDNURL` 远程资源地址

### 注意事项

1. mysql使用了一主多从集群模式,如果您仅仅使用一个mysql的话,请修改`server/.env`文件中的`mysql`配置,以及`server/src/serve/db.ts`文件中`sequelize`的实例初始化代码

2. 开发环境下, 默认不启动数据库集群模式,如果需要启动集群模式,请修改`server`文件夹下的`nodemon.json`中的NODE_ENV为production

3. 虽然使用了pnpm的workspace的模式,但是由于某些原因服务端在打包后,不能正确解析工作区间内的包名,所以禁止在服务端代码内使用工作区间内的包,但是web端可以使用服务端的

## 前端

如果你用过vue2版本的vue-admin的话,上手应该会非常快,因为本项目的前端是模仿vue-admin的vue3版本,并且使用了typescript,所以如果你不熟悉vue3的话,建议先学习一下vue3的基础知识

目录结构

```
|-- 🗂️client
    |-- 🗂️.vscode
        |-- 📄settings.json
    |-- 🗂️deploy (一键上传脚本,去掉deploy.config copy.json中的copy,并修改配置)
        |-- 📄deploy.config copy.json
        |-- 📄deploy.config.json
        |-- 📄index.js
        |-- 📄sysInfo.js
    |-- 🗂️public
        |-- 📄favicon.ico
        |-- 📄logo.png
    |-- 🗂️src
        |-- 🗂️api (接口存放目录)
        |-- 🗂️assets (静态资源存放目录)
        |-- 🗂️components (公共组件存放目录)
            |-- 🗂️Breadcrumb
            |-- 🗂️CountTo
            |-- 🗂️Cropper
            |-- 🗂️GithubCorner
            |-- 🗂️Hamburger
            |-- 🗂️IconSelect
            |-- 🗂️LangSelect
            |-- 🗂️Notice
            |-- 🗂️Page
            |-- 🗂️Pagination
            |-- 🗂️RightPanel
            |-- 🗂️Screenfull
            |-- 🗂️ScreenLock
            |-- 🗂️SizeSelect
            |-- 🗂️SvgIcon
            |-- 🗂️UploadFile
            |-- 🗂️WangEditor
        |-- 🗂️directive (自定义属性)
            |-- 🗂️permission
            |-- 📄index.ts
        |-- 🗂️hooks (自定义hooks)
            |-- 📄useForm.ts
        |-- 🗂️lang (i18,目前还有一些小问题,不影响使用)
            |-- 📄en.ts
            |-- 📄index.ts
            |-- 📄zh-cn.ts
        |-- 🗂️layout (页面布局组件)
            |-- 🗂️components
            |-- 📄index.vue
        |-- 🗂️router (路由)
            |-- 📄index.ts
        |-- 🗂️store (pinia)
            |-- 🗂️modules
            |-- 📄index.ts
        |-- 🗂️styles (公共class样式)
            |-- 📄element-plus.scss
            |-- 📄index.scss
            |-- 📄mixin.scss
            |-- 📄sidebar.scss
            |-- 📄tailwind.css
            |-- 📄variables.module.scss
        |-- 🗂️theme (主题配色)
            |-- 📄blue_black.ts
            |-- 📄default.ts
            |-- 📄green_black.ts
            |-- 📄green_white.ts
            |-- 📄index.ts
            |-- 📄purple_white.ts
            |-- 📄red_black.ts
            |-- 📄red_white.ts
            |-- 📄violet_dark.ts
        |-- 🗂️utils (工具方法)
            |-- 📄addWaterMark.ts
            |-- 📄config.ts
            |-- 📄downloadFile.ts
            |-- 📄encryption.ts
            |-- 📄filter.ts
            |-- 📄hospitalOptions.ts
            |-- 📄i18n.ts
            |-- 📄index.ts
            |-- 📄mitter.ts
            |-- 📄request.ts
            |-- 📄resize.ts
            |-- 📄scroll-to.ts
            |-- 📄storage.ts
            |-- 📄validate.ts
        |-- 🗂️views (页面组件存放处)
            |-- 🗂️component
            |-- 🗂️dashboard
            |-- 🗂️demo
            |-- 🗂️dept
            |-- 🗂️error-page
            |-- 🗂️login
            |-- 🗂️redirect
            |-- 🗂️shop
            |-- 🗂️system
        |-- 📄App.vue
        |-- 📄components.d.ts
        |-- 📄env.d.ts
        |-- 📄main.ts
        |-- 📄permission.ts (路由鉴权)
        |-- 📄settings.ts (页面配置)
    |-- 📄.editorconfig
    |-- 📄.env (公共的env)
    |-- 📄.env.development (开发模式独有的env)
    |-- 📄.env.production (生产模式独有的env)
    |-- 📄.env.staging (.....)
    |-- 📄.eslintignore
    |-- 📄.eslintrc.js
    |-- 📄.gitignore
    |-- 📄.prettierignore
    |-- 📄.prettierrc.js
    |-- 📄commitlint.config.js
    |-- 📄components.d.ts
    |-- 📄global.d.ts (全局ts声明,请不要import引入其他,否则会失效)
    |-- 📄index.html (模板html)
    |-- 📄package.json
    |-- 📄postcss.config.js
    |-- 📄tailwind.config.js (tailwind 配置文件)
    |-- 📄tsconfig.json
    |-- 📄tsconfig.node.json
    |-- 📄vite.config.ts (vite 配置文件)
```

### 添加路由

1. 在`src/router/index.ts`中添加路由,并且在`src/views`中添加页面组件
2. 在`src/views`中添加页面组件, `系统管理=>菜单管理`中添加菜单地址, 并在 `系统管理=>角色管理`为角色分配菜单权限

## admin账号

username: `admin`\
password: `Vane888888`

登录之后可在用户管理页面修改密码,以及用户的添加删除封号等处理

## 代码提交

根目录下执行以下命令\
`git add .`\
`pnpm commit`\
`git push`
