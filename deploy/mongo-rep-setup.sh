

echo 'init replication'
docker exec -it \
    $(docker ps -qf label=com.docker.swarm.service.name=cgistack.cgi-mongo-primary) \
    mongo --eval 'rs.initiate({ _id: "cgi-mongo-rep", members: [{ _id: 0, host: "cgi-mongo-primary:27017" }, { _id: 1, host: "cgi-mongo-secondary1:27017" }, { _id: 2, host: "cgi-mongo-secondary3:27017" }], settings: { getLastErrorDefaults: { w: "majority", wtimeout: 30000 }}})'

docker exec -it $(docker ps -qf label=com.docker.swarm.service.name=cgistack.cgi-mongo-primary) mongo --eval 'rs.status()'

docker exec -it $(docker ps -qf label=com.docker.swarm.service.name=cgistack.cgi-mongo-primary) mongo --eval 'rs.config()'

echo 'create mongo authentication'

docker exec -it $(docker ps -qf label=com.docker.swarm.service.name=cgistack.cgi-mongo-primary) \
    mongo admin --eval 'db.createUser({ user: "root", pwd: "$MONGO_ROOT", roles: [ { role: "root", db: "admin" } ] })'

docker exec -it $(docker ps -qf label=com.docker.swarm.service.name=cgistack.cgi-mongo-primary) \
    mongo admin -u root -p $mongo_root --eval 'db.createUser({ user: "cluadmin", pwd: "$MONGO_CLUSTER_USER", roles: [ { role: "clusterAdmin", db: "admin" } ] })'

docker exec -it $(docker ps -qf label=com.docker.swarm.service.name=cgistack.cgi-mongo-primary) \
    mongo admin -u root -p $mongo_root --eval 'db.createUser({ user: "cgiprod", pwd: "$MONGO_USER", roles: [ { role: "readWrite", db: "cgiprod" } ] })'

echo 'done'    