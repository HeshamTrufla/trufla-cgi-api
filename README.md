[![CircleCI](https://circleci.com/gh/CodeTouch/cgi.svg?style=shield&circle-token=f9e980bc18f6a6717ba036e578b5b1e8ca2f8ab7)](https://circleci.com/gh/CodeTouch/cgi)

# CGI Microservice
![](https://media.giphy.com/media/3o6MbdekQOV3ijXu4U/giphy.gif)
##Getting Started Guide
###Please follow on with the following steps to get up and running with the project
1. Clone this repository. If you are on linux and don't want to use vagrant, you can skip steps from 2 to 4 by running the script in `bootstrap.sh` but replace any occurance of `/vagrant` with the location of your repository and replace the linux version name in the `docker.list` file with your linux distribution name
2. Download and install Virtualbox, Vagrant, and Git  
3. Open the git bash **as an administrator** and navigate into the directory of the repository you just cloned and run `vagrant up`. This will initiatiza a virtual machine with 3 built in docker containers named "mongod", "redis" and "cgidev".Note: In case Windows showed a Security Alert to ask your permission to enable VirtualBox to communicate on Private and Public networks, Please click the checkboxes to allow access to both networks.   
  * Note#1:  if you get this message `The guest machine entered an invalid state while waiting for it to boot. Valid states are 'starting, running'. The machine is in the 'unknown' state. Please verify everything is configured properly and try again.`, go to the vargrantfile and uncomment/add the following lines:  
  ```
	config.vm.provider "virtualbox" do |vb|
	vb.gui = true
	end
  ```
  * Note#2: if you get this message `==> default: Killed ==> default: The command '/bin/sh -c npm install -g sails@0.12.4' returned a non-zero code: 137` run `vagrant destroy` and then either follow the instructions [here](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04) or go to the vargrantfile and uncomment/add the following lines:  
  ```
  config.vm.provider "virtualbox" do |vb|
  vb.memory = "1024"
  end
  ```
 
4. Run `vagrant ssh` to log into the virutal machine  
5. Run `sudo docker start mongod` and `sudo docker start redis` and `sudo docker run --network=app-net --ip="192.168.0.4" -t -i --name cgidev -p 1337:1337 -v /vagrant:/vagrant cgidev /bin/bash` to log into the docker container. If you are not using vagrant then you must remove `-v /vagrant:/vagrant ` from the last command and replace it with `-v /location-to-your-cgi-repo:/vagrant `  
6. Now, do either of the following:
  1. If your host operating system is linux or OSX: run `npm install`
  2. If your host operating system is windows 10 with the Anniversary Update, follow the instructions [here](http://mspoweruser.com/ntfs-260-character-windows-10/)
  NOTE: The value has moved from NTFS directly into Local Computer Policy > Computer Configuration > Administrative Templates > System > Filesystem in the RTM version of the Version 1607 and it is called "Enable Win32 long paths"
  , then run `npm install`
  3. If your host operating system is windows 7, 8, or 10 prior to the Anniversary Update  
    1. open command prompt as Administrator and run this command `fsutil behavior set SymlinkEvaluation L2L:1 R2R:1 L2R:1 R2L:1`
    2. `mkdir -p /var/tmp/app/node_modules`  
    3. `cd /vagrant/app/`  
    4. `mkdir node_modules`
    5. `cp package.json /var/tmp/app/`  
    6. `npm install --prefix /var/tmp/app`  
    7. After the installation is done and complete, you will need to create symbolic links under the node_modules folder in our project, by running the following command  
    ```
	for i in `ls /var/tmp/app/node_modules`; do ln -sf /var/tmp/app/node_modules/$i/ /vagrant/app/node_modules/; done
    ``` 
7. Now that you are within the docker container & installed the npm modules, run the following commands  
`apt-get update`  
`apt-get -y upgrade`  
8. Next time you go into `vagrant ssh` and want to start the containers run `sudo docker start mongod`, `sudo docker start redis`, and then run `sudo docker start -a -i cgidev`  

--
* Note#1: While running `npm install`, if you face this error: `npm ERR! enoent ENOENT: no such file or directory, chmod` while running `npm install`, run the following two commands:  
  1. `npm install -g node-pre-gyp`  
  2. `npm install --no-bin-links` or in case of windows 7, 8, 10 (without Anniversary Update) `npm install --no-bin-links --prefix /var/tmp/app`  
    1. If you get an error stating "`npm ERR! Maximum call stack size exceeded`", just keep repeating `npm install --no-bin-links` until all dependencies are installed. (it usually works after only one repetition of `npm install`)  
* Note#2: While running `npm install`, if you find an error with the words `KILLED` & `.staging` written in it
  1. Close the vagrant machine (by typing `exit` then `vagrant halt`)
  2. Open VirtualBox
  3. Select the machine that was installed by vagrant
  4. Click on `Settings` icon then choose `System` and increase the base memory to 1024 or more
  5. Go back to git bash **(running as administrator)** and run `vagrant up` then `vagrant ssh` then `sudo docker start -a -i cgidev` then rerun `npm install`
* Note#3: If you run "`sudo docker start -a -i cgidev`" and get this error: "`Error response from daemon: oci runtime error: no such file or directory`", just restart the vagrant machine by typing `exit` then `vagrant halt` then `vagrant up` then `vagrant ssh`
* Note#4: while running `vagrant up` if you get this message `default: Warning: Remote connection disconnect. Retrying...`, open to the vagrantfile and uncomment the line: `vb.gui = true`
* Note#5: If you try to start a container adn got some error like this: "`An error occurred trying to connect: Post http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/mongod/start: read unix @->/var/run/docker.sock: read: connection reset by peer`", then run `sudo apt-get install -y linux-image-extra-$(uname -r)` & `sudo apt-get install -y linux-image-extra-virtual` & `sudo service docker start`
