#!/bin/bash

( 

    apt-get update;
    apt-get install -y ruby; 
    gem install redis;
    wget http://download.redis.io/redis-stable/src/redis-trib.rb;

    REDIS_ONE=`ping -c 1 redis-one | head -1  | cut -d "(" -f 2 | cut -d ")" -f 1`;
    REDIS_TWO=`ping -c 1 redis-two | head -1  | cut -d "(" -f 2 | cut -d ")" -f 1`;
    REDIS_THREE=`ping -c 1 redis-three | head -1  | cut -d "(" -f 2 | cut -d ")" -f 1`;
    REDIS_FOUR=`ping -c 1 redis-four | head -1  | cut -d "(" -f 2 | cut -d ")" -f 1`;
    REDIS_FIVE=`ping -c 1 redis-five | head -1  | cut -d "(" -f 2 | cut -d ")" -f 1`;
    REDIS_SIX=`ping -c 1 redis-six | head -1  | cut -d "(" -f 2 | cut -d ")" -f 1`;

    chmod 777 redis-trib.rb;

    ./redis-trib.rb create --replicas 1 \
        $REDIS_ONE:6379 \
        $REDIS_TWO:6379 \
        $REDIS_THREE:6379 \
        $REDIS_FOUR:6379 \
        $REDIS_FIVE:6379 \
        $REDIS_SIX:6379

)
