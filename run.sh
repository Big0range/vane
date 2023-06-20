#!/bin/bash
npm install pm2 -g
npm install pnpm@8 -g
pnpm build:client
pnpm build:server
cd ./server
# docker 环境下
pm2-runtime start ecosystem.config.js
# 如果不使用pm2的话，请注释上一行 可以使用下面的命令
# yarn start
