    sudo apt-get -y update
    sudo apt-get install -y apt-transport-https ca-certificates
    sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
    sudo cp /vagrant/docker.list /etc/apt/sources.list.d/
    sudo apt-get -y update
    sudo apt-get -y purge lxc-docker
    apt-cache policy docker-engine
    sudo apt-get -y upgrade
    sudo apt-get -y update
    sudo apt-get install -y linux-image-extra-$(uname -r)
    sudo apt-get install -y linux-image-extra-virtual
    sudo apt-get install -y docker-engine
    sudo service docker start
    sudo docker pull mongo:3.2.8
	sudo docker pull redis:3.0
    sudo docker network create --driver=bridge --subnet=192.168.0.0/16 app-net
    sudo docker run -d --env mongo_root="DGc3EjoiOfDl6WofAOBvjPw6wQoOZh9S0AXRo0lQgbwVKD8rn5" --network=app-net --ip="192.168.0.2" --name mongod -p 27017:27017 mongo:3.2.8 mongod --auth
    sudo docker exec -it mongod sh -c 'echo "Mongo root Password: $mongo_root" && mongo admin --eval "db.createUser({ user: \"root\", pwd: \"$mongo_root\", roles: [ { role: \"root\", db: \"admin\" } ] });"'
    sudo docker exec -it mongod sh -c 'mongo admin -u root -p $mongo_root --host localhost --eval "db.createUser({ user: \"cgidev\", pwd: \"863cb08a86e8e23721f89aaa63e49d2438816968752ce363391d9a089090884d\", roles: [ { role: \"readWrite\", db: \"cgidev\" } ] });"'
	sudo docker run -d --network=app-net --ip="192.168.0.3" --name redis -p 6379:6379 redis:3.0 redis-server --requirepass f288198d9d1ba43ad6ed958dee83b68da7350ae4e12bf22273323725cacb630a
    #sudo docker exec -it redis sh -c 'echo "requirepass f288198d9d1ba43ad6ed958dee83b68da7350ae4e12bf22273323725cacb630a" >> /etc/redis/redis.conf'
    cd /vagrant/Dockerfiles/cgiDev/ && sudo docker build -t cgidev .
    # the following command is to create the cgidev container, then set mongo&redis ips as environment variables.
    # docker run --network=app-net --ip="192.168.0.4" -t -i --env REDIS_SERVER="192.168.0.3" --env MONGO_SERVER="192.168.0.2" --name cgidev -p 1337:1337 -v /vagrant:/vagrant cgidev /bin/bash

    
