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
    sudo docker run -d --network=app-net --ip="192.168.0.2" --name mongod -p 27017:27017 mongo:3.2.8 mongod
	sudo docker run -d --network=app-net --ip="192.168.0.3" --name redis -p 6379:6379 redis:3.0 redis-server
    cd /vagrant/Dockerfiles/cgiDev/ && sudo docker build -t cgidev .
 

    
