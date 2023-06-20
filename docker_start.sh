#!/bin/bash

# 重置本地代码
git checkout .

# 拉取最新代码
git pull
echo "Git pull success at $(date -u +'%Y-%m-%dT%H:%M:%SZ')"

function start_db(){
    echo "启动数据库"
    cd db
    docker-compose down
    docker-compose up -d 
    cd ..
}
function start_server(){
    PACKAGE_JSON_FILE="pnpm-lock.yaml"
    PACKAGE_JSON_BACKUP="pnpm-lock.yaml.backup"
    # 复制yarn.lock到yarn.lock.backup
    cp $PACKAGE_JSON_FILE $PACKAGE_JSON_BACKUP
    NODE_IMAGE_NAME="vane-server"
    # 比较yarn.lock和yarn.lock.backup是否有差异
    if diff $PACKAGE_JSON_FILE $PACKAGE_JSON_BACKUP >/dev/null ; then
        echo "依赖暂无更改"
        # 判断node_modules是否存在
        if [ ! -d "node_modules" ]; then
            echo "node_modules不存在 开始安装依赖"
            pnpm install
        else
            echo "node_modules存在 无需安装依赖"
        fi
    else
        echo "依赖发生了改变 开始安装依赖"
        pnpm install
    fi


    # 删除yarn.lock.backup
    rm -rf $PACKAGE_JSON_BACKUP

    echo "启动docker-compose 服务端: $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
    docker-compose down
    docker rmi $NODE_IMAGE_NAME
    docker-compose up -d
}
function start_all(){
    start_db
    start_server
}
if [ "$1" = "all" ]; then
    echo "启动全部"
    start_all
elif [ -z "$1" ] || [ "$1" = "server" ]; then
    echo "启动服务端"
    start_server
elif [ "$1" = "db" ]; then
    echo "启动数据库"
    start_db
else
    echo "参数错误"
    exit 1
fi