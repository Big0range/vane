#!/bin/bash
cd ./apps/server
pnpm run start
# 不用pm2了  没什么作用 而且直接运行ts文件  pm2-runtime 会和最新node(大概)有兼容性问题
