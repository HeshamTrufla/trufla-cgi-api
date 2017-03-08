* ssh to the manager node and git clone the cgi repo, then navigate to /cgi/deployment directory.
* run ` sh system.sh ` to install docker on each node, or use it as aprovision script.
* run ` docker swarm init ` to initiate docker swarm.
* copy the generated command and run it on every worker machine.
* run ` docker node ls ` to see the list of nodes.  
* run the following commands after replcaing the node id.
    * ` docker node update --label-add cgi.replica=1 [REPLACE WITH THE MASTER NODE ID] `
    * ` docker node update --label-add cgi.replica=2 [REPLACE WITH A SECONDARY NODE ID] `
    * ` docker node update --label-add cgi.replica=3 [REPLACE WITH A SECONDARY NODE ID] `
* run ` docker stack deploy -c cgi-stack.yaml cgistack ` to create all docker services. 
* run ` docker service ls ` and make sure mongo services has 1/1 in the replicas column.
* on the primary node run 
    * ` docker ps ` and get the mongo container ID then use it to,
    * run ` docker exec -it [REPLACE WITH CONTAINER ID] mongo admin `.
    * then in the same mongo shell run ` rs.initiate({ _id: "cgi-mongo-rep", members: [{ _id: 0, host: "mongo-primary:27017" }, { _id: 1, host: "mongo-secondary1:27017" }, { _id: 2, host: "mongo-secondary2:27017" }], settings: { getLastErrorDefaults: { w: "majority", wtimeout: 30000 }}}) ` to create the replica set.
    * now we should check which is the primary node by runing ` rs.status() ` the result should be json contains a members array, the first object represent the current mongo node with name mongo-prmiary, so we should check the field ` stateStr ` if PRIMARY then we'll execute the next set of commands in the same mongo shell otherwise we need to see which is the primary and ssh to the node which contains this mongo replica and log to the mongo shell using ` docker exec -it [REPLACE WITH CONTAINER ID] mongo admin `.
* now we're on the primary mongo replica, in the mongo shell we should run 
    * ` db.createUser({ user: "root", pwd: "[REPLCAE WITH PASSWORD]", roles: [ { role: "root", db: "admin" } ] }) `
* now we need to logout and login again using the root password we've created.
* ` docker exec -it [REPLACE WITH CONTAINER ID] mongo admin -u root -p [REPLCAE WITH PASSWORD] `
* now run ` db.createUser({ user: "cluadmin", pwd: "[REPLCAE WITH PASSWORD]", roles: [ { role: "clusterAdmin", db: "admin" } ] }) `
* and then ` db.createUser({ user: "cgiprod", pwd: "[REPLCAE WITH PASSWORD]", roles: [ { role: "readWrite", db: "cgiprod" } ] }) `
* mongo replicaSet is now up and running in secure mode. 
* 'NOTE: YOU SHOULD CHANGE THE PASSWORD IN THE .yaml FILE TOO, for both mongo and redis environment varibales!'.
* now we need to setup our redis cluster so simply run
    ` docker run --network=cginet -it --name redis-setup redis-setup /bin/bash ` 
    it will open a temp container for redis setup.
    ` sh redis-setup.sh `
    if everything went fine it should ask you to save the configuration, type yes + Enter,
    exit the container and delete it. 