#!/bin/bash

docker rmi aalisharp/cgiapi:latest --force
mkdir tmp
rsync -r --verbose --exclude 'node_modules' ../../../app/* tmp
cp Dockerfile tmp/
docker build -t aalisharp/cgiapi:latest .
rm -rf tmp
docker login
docker push aalisharp/cgiapi:latest
