#!/bin/bash

sudo apt-get update

# Install Node
sudo apt-get install -y build-essential
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install htop
sudo apt-get install -y htop

sudo apt-get install linux-tools-`uname -r`

# enable upstart
sudo apt-get install -y upstart-sysv
sudo update-initramfs -u
# System restart required to make the previous changes to take effect


sudo apt-get purge systemd -y
    
# app installation
cd /opt
sudo git clone https://github.com/auth0-eng-camp/scalability-lab01.git passwordapi
cd passwordapi
sudo npm install
sudo cp passwordapi.conf /etc/init
sudo service password start

# reboot, shutdown -r now