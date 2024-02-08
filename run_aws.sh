#!/bin/bash
docker-compose -f docker-compose.prod.aws.yml down  -v
docker-compose -f docker-compose.prod.aws.yml build
docker-compose -f docker-compose.prod.aws.yml up -d