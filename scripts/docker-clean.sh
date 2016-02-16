#!/bin/bash

echo "cleaning all containers"
# Delete all containers
docker rm -f $(docker ps -a -q)

echo "cleaning all images"
# Delete all images
docker rmi -f $(docker images -q)

echo "finished cleaning :)"
