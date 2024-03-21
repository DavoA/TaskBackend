#!/bin/bash

DOCKER_COMPOSE_FILE="TaskDevops/docker-compose.yml"

current_tag=$(grep 'parandzem/back' $DOCKER_COMPOSE_FILE | awk -F ':' '{print $3}' | tr -d '"')

if [ -z "$current_tag" ]; then
    echo "Could not find the tag for 'parandzem/front' image in the Docker Compose file."
    exit 1
fi

new_tag="latest"

sed -i "s/parandzem\/front:$current_tag/parandzem\/front:$new_tag/g" $DOCKER_COMPOSE_FILE

echo "Tag for 'parandzem/front' image in the Docker Compose file has been updated from $current_tag to $new_tag."