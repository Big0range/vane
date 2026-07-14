#!/bin/bash
function start_db(){
    echo "启动数据库"
    cd db
    docker-compose down
    docker-compose up -d 
    cd ..
}
function start_server(){
    NODE_IMAGE_NAME="vane-server"

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