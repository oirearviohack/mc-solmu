#!/bin/bash
nohup java -jar /opt/hack/oda-dss-service/oda-dss-service.jar &
nohup java -jar /opt/hack/oda-epidemic-service/oda-epidemic-service.jar &
cd /opt/hack/mc-solmu/web-client
npm install
npm run build
npm run start:server

