#!/bin/bash
echo 'update and install docker'
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
mkdir -p /etc/apt/sources.list.d
echo deb https://apt.dockerproject.org/repo ubuntu-xenial main > /etc/apt/sources.list.d/docker.list

printf 'net.ipv4.neigh.default.gc_thresh1 = 30000\nnet.ipv4.neigh.default.gc_thresh2 = 32000\nnet.ipv4.neigh.default.gc_thresh3 = 32768' >> /etc/sysctl.conf
sysctl -p

service lxcfs stop
apt-get remove -y -q lxc-common lxcfs lxd lxd-client

apt-get update -q

apt-get install -y -q linux-image-extra-$(uname -r) linux-image-extra-virtual

apt-get install -y -q docker-engine

systemctl start docker.service

mkdir -p /etc/systemd/system/docker.service.d
printf '[Service]\nExecStart=\nExecStart=/usr/bin/dockerd -H fd:// --label=owner=cgi-master --storage-driver aufs' > /etc/systemd/system/docker.service.d/options.conf
systemctl daemon-reload
systemctl restart docker.service

usermod ubuntu -aG docker