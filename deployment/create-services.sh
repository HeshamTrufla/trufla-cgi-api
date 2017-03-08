#!/bin/bash

echo 'create overlay network' 
docker network create --driver overlay --internal cginet

echo 'create mongo replica'
docker stack deploy -c cgi-stack.yaml cgistack