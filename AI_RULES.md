# AI Rules

## 项目类型

pnpm workspace monorepo。

## 目录职责

apps/client

- Vue3 页面
- Naive UI
- FormCreate
- Pinia

apps/server

- Node.js
- Sequelize
- Controller
- Service
- DTO

packages/\*

- 无业务逻辑
- 可被 client 和 server 共用
- 禁止依赖 apps

## TypeScript

- strict: true
- 优先使用 type
- 所有导出必须有类型

## Import

允许：

import { xxx } from '@repo/utils'; \
import { xxx } from '@repo/types';

禁止：

import { xxx } from '../../../../../utils';

禁止：

import { xxx } from '@repo/client';\
import { xxx } from '@repo/server';

## 数据流

client \
↓\
server api \
↓\
mysql/redis
