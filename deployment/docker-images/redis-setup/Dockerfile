FROM ubuntu:16.04

RUN apt-get update
RUN apt-get install -y ruby 
RUN gem install redis
RUN apt-get install iputils-ping -y
RUN mkdir -p /workspace
WORKDIR /workspace
COPY redis-trib.rb /workspace
COPY redis-setup.sh /workspace
CMD tail -f /dev/null