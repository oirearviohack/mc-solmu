#!/bin/bash
nohup java -jar /opt/services/oda-dss-service/oda-dss-service.jar &
#nohup java -jar /opt/services/oda-epidemic-service/oda-epidemic-service.jar &
cd /tmp/mc-solmu/web-client
#npm install
#npm run start
java -jar /opt/services/oda-epidemic-service/oda-epidemic-service.jar
