#!/bin/bash
sudo docker-compose -f docker-compose.prod.aws.yml down 
sudo docker-compose -f docker-compose.prod.aws.yml build
sudo docker-compose -f docker-compose.prod.aws.yml up -d