#/bin/bash

#add rethinkdb sources 
# sudo echo "deb http://download.rethinkdb.com/apt jessie main" | sudo tee -a /etc/apt/sources.list.d/rethinkdb.list
# sudo echo "deb-src http://download.rethinkdb.com/apt jessie main" | sudo tee -a /etc/apt/sources.list.d/rethinkdb.list
# sudo echo "deb http://download.rethinkdb.com/apt whezzy main" | sudo tee -a /etc/apt/sources.list.d/rethinkdb.list
# sudo echo "deb-src http://download.rethinkdb.com/apt whezzy main" | sudo tee -a /etc/apt/sources.list.d/rethinkdb.list
########
###  install root sources  debian wheezy and jessie
########
#jessie
sudo echo "deb http://ftp.debian.org/debian jessie-backports main" | sudo tee -a /etc/apt/sources.list
sudo echo "deb http://download.rethinkdb.com/apt jessie main" | sudo tee -a /etc/apt/sources.list
sudo echo "deb http://dl.bintray.com/deepstreamio/deb jessie main" | sudo tee -a /etc/apt/sources.list
# add contrib non-free
sudo echo "deb-src http://ftp.debian.org/debian jessie-backports main jessie-backports main" | sudo tee -a /etc/apt/sources.list
sudo echo "deb-src http://download.rethinkdb.com/apt jessie main contrib non-free" | sudo tee -a /etc/apt/sources.list
sudo echo "deb-src http://download.rethinkdb.com/apt jessie main contrib non-free" | sudo tee -a /etc/apt/sources.list
#wheezy
# sudo echo "deb http://download.rethinkdb.com/apt whezzy main" | sudo tee -a /etc/apt/sources.list
# sudo echo "deb-src http://download.rethinkdb.com/apt whezzy main" | sudo tee -a /etc/apt/sources.list
#jessie
sudo echo "deb http://ftp.debian.org/debian jessie-backports main jessie-backports main" | sudo tee -a /etc/apt/sources.list
sudo echo "deb http://download.rethinkdb.com/apt jessie main" | sudo tee -a /etc/apt/sources.list
sudo echo "deb http://dl.bintray.com/deepstreamio/deb jessie main" | sudo tee -a /etc/apt/sources.list
# add contrib non-free
sudo echo "deb-src http://ftp.debian.org/debian jessie-backports main jessie-backports main non-free" | sudo tee -a /etc/apt/sources.list
sudo echo "deb-src http://download.rethinkdb.com/apt jessie main" | sudo tee -a /etc/apt/sources.list
sudo echo "deb-src http://dl.bintray.com/deepstreamio/deb jessie main contrib non-free" | sudo tee -a /etc/apt/sources.list
#wheezy
# sudo echo "deb http://dl.bintray.com/deepstreamio/deb whezzy main" | sudo tee -a /etc/apt/sources.list
# sudo echo "deb-src http://dl.bintray.com/deepstreamio/deb whezzy main" | sudo tee -a /etc/apt/sources.list

# add keys security
sudo wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 379CE192D401AB61

########
###  root sources 
########

sudo apt-get update
# sudo apt-get -y upgrade
sudo apt-get install -y build-essential protobuf-compiler python \
                     libprotobuf-dev libcurl4-openssl-dev \
                     libboost-all-dev libncurses5-dev \
                     libjemalloc-dev wget m4
sudo apt-get install -y chkconfig tmux ntsysv
sudo apt-get install -y deepstream.io
sudo apt-get install -y rethinkdb

# sudo git clone git://git.code.sf.net/p/tmux/tmux-code tmux
# cd tmux
# sudo sh autogen.sh
# sudo ./configure && make  
# sudo apt-get update
echo "feito!"


# apps start
sudo deepstream start