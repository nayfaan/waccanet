#!/bin/bash
 
docker compose stop

docker rm client-container
docker image rm sharecanadahome-frontend

docker rm server-container
docker image rm sharecanadahome-backend

docker rm job-container
docker image rm sharecanadahome-backend_job

if [ -e $'./server/db.sqlite3' ]; then
  rm ./server/db.sqlite3 
  rm -r ./server/propertyhub/migrations/*
fi

rm -r ./server/media/properties/*

docker compose up -d 

docker exec -i job-container sh ./web_scraping.sh
docker exec -i client-container sh -c "npm install && npm run dev"