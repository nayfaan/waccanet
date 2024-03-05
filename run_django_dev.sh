#!/bin/bash
# docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.django.yml down 

docker-compose -f docker-compose.dev.django.yml build

docker-compose -f docker-compose.dev.django.yml up -d

