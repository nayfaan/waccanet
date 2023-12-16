#!/bin/bash
 
docker compose stop

docker rm shareCanadaHome-server-container
docker image rm sharecanadahome-backend

docker rm shareCanadaHome-server-scripts-container
docker image rm sharecanadahome-backend_scripts

docker rm shareCanadaHome-client-container
docker image rm sharecanadahome-frontend

docker rm mailserver
docker image rm catatnight/postfix

if [ -e $'./server/db.sqlite3' ]; then
  rm ./server/db.sqlite3 
  rm -r ./server/propertyhub/migrations/*
fi

rm -r ./server/media/properties/*

docker compose up -d 


docker exec -i mailserver sh /configs/configurator.sh
docker restart mailserver