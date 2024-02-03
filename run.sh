#!/bin/bash
# docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml down 

docker-compose -f docker-compose.dev.yml build

# docker rm client-container
# docker image rm sharecanadahome-frontend

# docker rm server-container
# docker image rm sharecanadahome-backend

# docker rm job-container
# docker image rm sharecanadahome-backend_job

docker-compose -f docker-compose.dev.yml up -d

# docker exec -i job-container sh ./web_scraping.sh
# docker exec -i client-container sh -c "npm run dev"