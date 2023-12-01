#!/bin/bash
 
docker compose stop

docker rm shareCanadaHome-server-container
docker image rm sharecanadahome-backend

# docker rm shareCanadaHome-server-scripts-container
# docker image rm sharecanadahome-backend_scripts

# docker rm shareCanadaHome-client-container
# docker image rm sharecanadahome-frontend


if [ -e $'./server/db.sqlite3' ]; then
  rm ./server/db.sqlite3 
  rm -r ./server/propertyhub/migrations/*
fi

rm -r ./server/media/properties/*

docker compose up -d 