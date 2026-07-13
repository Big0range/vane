---
name: server
description: Use when working on the apps/server Express + TypeScript backend, including routes, services, Sequelize models, middleware, authorization, logging, uploads, and database/API behavior.
metadata:
  author: project
  version: '1.0.0'
---

# apps/server 项目 Skill

这个 Skill 用于在本仓库中处理 `apps/server` 后端项目相关任务。后端是基于 **Node.js + Express 5 + TypeScript + Sequelize + MySQL + Redis** 的接口服务。

## When to Use

当任务涉及以下内容时使用本 Skill：

- 修改或新增 `apps/server` 的接口、路由、业务逻辑。
- 编写或调整 Sequelize 表模型、数据库查询、事务、外键关系。
- 调整 Express 中间件、鉴权、返回格式、错误处理、上传、日志。
- 排查 MySQL、Redis、Session、JWT/Token、权限菜单、接口白名单问题。
- 理解自动路由规则、接口命名规则、后端目录职责。
- 运行、检查或格式化 `apps/server` 项目。

## Project Overview

技术栈：

- Node.js / TypeScript / ESM
- Express 5
- Sequelize 6
- MySQL / mysql2
- Redis / ioredis / connect-redis
- express-session
- jsonwebtoken
- multer
- winston 日志

关键入口：

| 目的              | 文件                                           |
| ----------------- | ---------------------------------------------- |
| 启动入口          | `apps/server/src/server.ts`                    |
| Express 应用装配  | `apps/server/src/app.ts`                       |
| 自动路由注册      | `apps/server/src/hooks/useRouters.ts`          |
| 数据库连接        | `apps/server/src/serve/db.ts`                  |
| 服务导出与同步    | `apps/server/src/serve/index.ts`               |
| 鉴权中间件        | `apps/server/src/middlewares/authorization.ts` |
| 返回格式/请求日志 | `apps/server/src/middlewares/resultHandler.ts` |
| 项目上下文        | `apps/server/AI_CONTEXT.md`                    |
| 包配置            | `apps/server/package.json`                     |

## Directory Responsibilities

遵循项目现有约定：

- `src/hooks/`：框架级 hook，通常不要改，除非任务明确涉及自动路由等基础能力。
- `src/middlewares/`：只放 Express 中间件，例如鉴权、上传、错误处理、统一返回。
- `src/routes/`：业务接口层，负责接收前端请求、组合业务逻辑、调用 serve、返回结果。
- `src/serve/`：数据库实现与数据方法，包含 Sequelize 模型、CRUD、事务、查询封装。
- `src/types/`：公共 TypeScript 类型声明。
- `src/utils/`：通用工具函数，例如 token、redis、logger、md5。
- `public/`：静态资源。
- `uploads/`：上传文件目录。
- `logs/`：日志输出目录，通常不要手动修改日志文件。

## Commands

优先在仓库根目录使用 workspace 命令：

```bash
pnpm --filter @vane/server dev
pnpm --filter @vane/server start
pnpm --filter @vane/server lint
pnpm --filter @vane/server lint:fix
pnpm --filter @vane/server prettier
```

也可以进入 `apps/server` 后运行：

```bash
pnpm dev
pnpm start
pnpm lint
pnpm lint:fix
pnpm prettier
```

`package.json` 中脚本：

- `dev`: `nodemon`
- `start`: `node --env-file=.env --env-file=.env.production src/server.ts`
- `lint`: `eslint src`
- `lint:fix`: `eslint src --fix`
- `prettier`: `prettier --write src/**/*.{js,jsx,ts,tsx,vue,json,css,scss,md,yaml,yml}`

## Route Conventions

路由由 `src/hooks/useRouters.ts` 自动扫描 `src/routes` 注册，不需要手写总路由表。

### 文件命名

支持的命名风格：

```text
src/routes/user/login.post.ts   -> POST /user/login
src/routes/user/list.ts         -> GET  /user/list
src/routes/user/index.get.ts    -> GET  /user
src/routes/user/index.post.ts   -> POST /user
src/routes/user/[id].get.ts     -> GET  /user/:id
src/routes/demo[a,b,c].post.ts  -> POST /demo/:a/:b/:c
```

规则要点：

- 默认请求方法是 `get`。
- 显式方法通过文件名中间段声明：`.post.ts`、`.put.ts`、`.delete.ts`、`.get.ts`。
- 允许的方法：`get`、`post`、`put`、`delete`。
- `index.*.ts` 对应当前目录根路径。
- `[id]` 这类动态段会转成 `/:id`。
- `[a,b,c]` 会转成 `/:a/:b/:c`。
- 路由文件应默认导出 Express handler 函数。
- 如需路由级中间件，可导出 `middleware` 数组。

### 路由文件模板

```ts
import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  try {
    // const data = await someServe.someMethod(req.body);
    res.ok({
      message: 'success',
      data: {},
      log: '操作成功',
    });
  } catch (error) {
    res.fail(error);
  }
}
```

带 middleware：

```ts
import type { Request, Response, NextFunction } from 'express';

export const middleware = [
  async (req: Request, res: Response, next: NextFunction) => {
    next();
  },
];

export default async function handler(req: Request, res: Response) {
  try {
    res.ok({ data: {} });
  } catch (error) {
    res.fail(error);
  }
}
```

## Response Conventions

项目通过 `resultHandler` 给 `res` 增加 `res.ok` 和 `res.fail`。

优先使用：

```ts
res.ok({
  status: 200, // 可省略，默认 200
  message: 'success', // 可省略，默认 success
  data: {}, // 可省略
  raw: false, // true 时直接 send(data)，默认 false
  log: '日志内容', // 可选；有值时写入操作日志
});
```

失败返回：

```ts
res.fail({
  status: 500, // 可省略，默认 500
  message: 'fail',
  data: {},
  log: '失败日志',
});
```

异常处理优先保持项目简洁写法：

```ts
try {
  // ...
} catch (error) {
  res.fail(error);
}
```

注意：当前实现中返回体 `code` 会将 HTTP 200 转成 `0`，非 200 使用对应状态码。

## Service / Sequelize Conventions

`src/serve` 负责数据库表定义、查询和数据方法。新增业务时优先：

1. 在合适的 `*.serve.ts` 中实现数据库逻辑。
2. 在 `src/serve/index.ts` 统一导出 service、model、类型。
3. 在 `src/routes` 中调用 service，避免把复杂数据库逻辑直接写进 route。

数据库连接在 `src/serve/db.ts`：

- 环境变量支持多个 MySQL host/user/password/port，用空格分隔。
- 多 host 时配置 Sequelize replication。
- `timezone` 使用 `+08:00`。
- `syncDb()` 通过 `db.sync({ alter: process.env.MYSQL_ALERT === 'true' })` 同步。

新增模型时注意：

- 匹配现有 Sequelize 写法和命名风格。
- 确认是否需要在 `src/serve/foreignKeyConstraint/` 中添加外键关系。
- 添加后从 `src/serve/index.ts` 导出。
- 避免随意开启破坏性 schema 变更；涉及数据迁移/删除时先说明风险。

## Authorization / Permission Notes

`authorization` 中间件流程：

1. 先读取 `sysRoutesServe.getRouteWhitelist()`，命中白名单则放行。
2. 否则检查 `Authorization` header。
3. 使用 `process.env.TOKEN_TYPE` 去掉 token 前缀。
4. `Token.decode` 解码后从 Redis 读取用户信息。
5. `admin` 用户（`role_id === 1 && username === 'admin'`）直接放行。
6. 非 admin 通过 `sysMenuRoutesServe.getFullRouteByRoleId(role_id)` 校验角色可访问路由。

处理权限问题时优先检查：

- 路由是否已被自动扫描并写入系统路由表。
- 白名单配置是否正确。
- 菜单-路由关联是否正确。
- `Authorization` 格式是否匹配 `TOKEN_TYPE`。
- Redis 中是否存在用户信息。

## Workflow for Backend Changes

处理 `apps/server` 需求时建议流程：

1. 先读 `apps/server/AI_CONTEXT.md` 和相关 route/service/middleware 文件。
2. 判断改动应放在 `routes`、`serve`、`middlewares`、`types` 还是 `utils`。
3. 新增接口时遵循自动路由文件命名规则。
4. 数据库逻辑放到 service，route 只做参数处理、调用 service、组织返回。
5. 使用 `res.ok` / `res.fail`，不要直接 `res.json`，除非确实需要原始响应。
6. 修改后尽量运行 `pnpm --filter @vane/server lint` 或针对性检查。
7. 涉及真实运行行为时，使用项目运行方式启动后端并手动验证接口。

## Guardrails

- 不要随意修改 `src/hooks/useRouters.ts`，除非任务明确是路由扫描/注册机制问题。
- 不要直接编辑 `logs/` 下的历史日志，除非用户明确要求清理日志文件。
- 不要把数据库查询散落在 route 里；优先封装到 service。
- 不要绕过 `res.ok` / `res.fail` 的统一返回格式。
- 不要在没有确认的情况下删除表、清空数据、改变生产环境配置。
- `.env*` 文件可能包含敏感配置；读取和输出时避免泄露真实密钥。
- 保持现有代码风格：TypeScript、ESM、显式 `.ts` import、`#/` imports、中文日志/提示可以沿用。

## Common Intent Mapping

| 用户意图 | 优先查看 |
| --- | --- |
| 新增接口 | `src/routes/**`、对应 `src/serve/**` |
| 接口没注册/路径不对 | `src/hooks/useRouters.ts`、目标路由文件名 |
| 返回格式/日志异常 | `src/middlewares/resultHandler.ts` |
| 401/403 权限问题 | `src/middlewares/authorization.ts`、`src/serve/sys/routes.serve.ts`、`src/serve/sys/menu_routes.serve.ts` |
| 数据库连接/同步问题 | `src/serve/db.ts`、`src/serve/index.ts`、`.env*` |
| 用户/角色/菜单 | `src/routes/user`、`src/routes/role`、`src/routes/menu`、`src/serve/sys/*` |
| 动态表单 | `src/routes/form`、`src/serve/form/*` |
| 上传 | `src/routes/upload`、`src/middlewares/upload.ts` |

## Output Expectations

回答或改代码时：

- 用中文说明关键改动。
- 引用文件时使用 `path:line` 格式。
- 给出与项目约定一致的代码，不引入无关框架。
- 如果无法验证，明确说明未验证原因。
- 如果改动涉及数据库结构、权限或生产配置，先提示影响和风险。
