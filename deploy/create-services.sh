#!/bin/bash

echo 'create overlay network' 
docker network create --driver overlay --internal cginet

echo 'creating docker volumes' 
docker volume create --name mongodata1
docker volume create --name mongoconfig1
docker volume create --name mongodata2
docker volume create --name mongoconfig2
docker volume create --name mongodata3
docker volume create --name mongoconfig3

echo 'create mongo replica'
docker stack deploy -c cgi-stack.yaml cgistack