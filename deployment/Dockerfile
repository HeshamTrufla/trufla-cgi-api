FROM mongo:3.0

WORKDIR /data/configdb
COPY mongo-key.pem /data/configdb
COPY mongo-init.sh /data/configdb

EXPOSE 27017
CMD ["sh", "mongo-init.sh"]