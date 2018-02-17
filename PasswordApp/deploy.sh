#!bin/bash
# This scripts should be run inside the target server
# The way of using it is by using ssh connection:
# ssh <target_server> 'bash -s' < deploy.sh
cd /opt/passwordapi
sudo service passwordapi stop
sudo git pull
sudo npm install
sudo service passwordapi start