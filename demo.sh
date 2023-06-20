#!/bin/sh
if [ "$1" = "all" ]; then
  echo "启动全部"
elif [ -z "$1" ] || [ "$1" = "server" ]; then
  echo "启动服务端"
elif [ "$1" = "db" ]; then
  echo "启动数据库"
else
  echo "参数错误"
  exit 1
fi