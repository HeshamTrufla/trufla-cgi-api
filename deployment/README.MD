# Deploy CGI Stack in Swarm mode, MongoDB Replication and Redis Cluster. 
* ssh to the manager node and git clone the cgi repo, then navigate to /cgi/deployment directory.
* run ` sh system.sh ` to install docker on each node, or use it as aprovision script.
* run ` docker swarm init ` to initiate docker swarm.
* copy the generated command and run it on every worker machine.
* run ` docker node ls ` to see the list of nodes.  
* run the following commands after replcaing the node id.
    * ` docker node update --label-add cgi.replica=1 [REPLACE WITH THE MASTER NODE ID] `
    * ` docker node update --label-add cgi.replica=2 [REPLACE WITH A SECONDARY NODE ID] `
    * ` docker node update --label-add cgi.replica=3 [REPLACE WITH A SECONDARY NODE ID] `
* run ` docker stack deploy -c cgi-stack.yaml cgistack --with-registry-auth ` to create all docker services. 
* run ` docker service ls ` and make sure mongo services has 1/1 in the replicas column.
* on the primary node run 
    * ` docker ps ` and get the mongo container ID then use it to,
    * run ` docker exec -it [REPLACE WITH CONTAINER ID] mongo admin `.
    * then in the same mongo shell run.
     ```
    rs.initiate({ _id: "cgi-mongo-rep", members: [{ _id: 0, host: "mongo-primary:27017" }, { _id: 1, host: "mongo-secondary1:27017" }, { _id: 2, host: "mongo-secondary2:27017" }], settings: { getLastErrorDefaults: { w: "majority", wtimeout: 30000 }}})
     ```
     
    * now we should check which is the primary node by runing ` rs.status() ` the result should be json contains a members array, the first object represent the current mongo node with name mongo-prmiary, so we should check the field ` stateStr ` if PRIMARY then we'll execute the next set of commands in the same mongo shell otherwise we need to see which is the primary and ssh to the node which contains this mongo replica and log to the mongo shell using ` docker exec -it [REPLACE WITH CONTAINER ID] mongo admin `.
* now we're on the primary mongo replica, in the mongo shell we should run 
    * ` db.createUser({ user: "root", pwd: "[REPLCAE WITH PASSWORD]", roles: [ { role: "root", db: "admin" } ] }) `
* now we need to logout and login again using the root password we've created.
* ` docker exec -it [REPLACE WITH CONTAINER ID] mongo admin -u root -p [REPLCAE WITH PASSWORD] `
* now run ` db.createUser({ user: "cluadmin", pwd: "[REPLCAE WITH PASSWORD]", roles: [ { role: "clusterAdmin", db: "admin" } ] }) `
* and then ` db.createUser({ user: "cgiprod", pwd: "[REPLCAE WITH PASSWORD]", roles: [ { role: "readWrite", db: "cgidata" } ] }) `
* mongo replicaSet is now up and running in secure mode. 
* 'NOTE: YOU SHOULD CHANGE THE PASSWORD IN THE .yaml FILE TOO, for both mongo and redis environment varibales!'.
* now we need to setup our redis cluster, so find any running redis container on the current node using
    ` docker ps ` to get the container id, then ` docker cp redis-setup.sh|- [REPLCAE WITH CONTAINER ID]:/data `
    to move the cluster setup script to this container, now you need to get access to this container bash,
    use ` docker exec -it [CONTAINER ID] /bin/bash ` then run ` sh redis-setup.sh ` 
    if everything went fine it should ask you to save the configuration, type yes + Enter key, exit the container
    that's it you have your redis cluster, up and running.
     

# Scale up and down.
the command to scale a service is ` docker service scale <SERVICE-ID>=<NUMBER-OF-TASKS> `
e.g to scale cgi-api we'll execute ` docker service scale cgistack_cgi-api=3 `
NOTE: this is not valid in case of mongo or redis, because in both we're using,
their built in replication.

# Rolling updates.
updates will be delivered as new docker images, so once you updated the code, build or commit your changes to the docker hub then specify the version number in the ` docker update ` command 

i.e ` docker service update --image cgiapi:3.0.7 cgistack_cgi-api `

The scheduler applies rolling updates as follows by default:
* Stop the first task.
* Schedule update for the stopped task.
* Start the container for the updated task.
* If the update to a task returns RUNNING, wait for the specified delay period then start the next task.
* If, at any time during the update, a task returns FAILED, pause the update.

# update any running service in our stack.
you'll simply run ` docker service update [OPTIONS] SERVICE ` for more info run ` docker service update --help `

examples: 

* to update the environment variable  
```
# list all running docker services.
docker service ls 

# update the environment variable for this service.
docker service update --env-add NODE_ENV=production cgistack_cgi-api

# we need to restart the service, you can do this in swarm by.
docker service scale cgistack_cgi-api=0
docker service scale cgistack_cgi-api=3

```