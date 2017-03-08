* run ` sh system.sh ` to install docker on each node, or use it as aprovision script.
* run ` docker swarm init ` to initiate docker swarm.
* copy the generated command and run it on every worker machine.
* run ` docker node ls ` to see the list of nodes.  
* run the following commands after replcaing the node id.
    * ` docker node update --label-add cgi.replica=1 [REPLACE WITH THE MASTER NODE ID] `
    * ` docker node update --label-add cgi.replica=2 [REPLACE WITH A SECONDARY NODE ID] `
    * ` docker node update --label-add cgi.replica=3 [REPLACE WITH A SECONDARY NODE ID] `
* run ` sh create-services.sh ` to create all the needed docker services.  
* run ` sh mongo-rep-setup.sh ` to initiate the mongo replica.
    * note you can change mongo user passwords any time from ' cgi-stack.yaml '

