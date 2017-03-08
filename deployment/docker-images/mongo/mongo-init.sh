#!/bin/bash
chmod 600 mongo-key.pem
chown 900 mongo-key.pem 
mongod --auth --replSet $REPSET_NAME --keyFile mongo-key.pem