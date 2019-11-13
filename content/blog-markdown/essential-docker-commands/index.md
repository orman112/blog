---
title: Essential Docker Commands
published: false
date: ""
tags: ["docker", "containers", "overview"]
unsplash-image-id: "t0SlmanfFcg"
description: ""
category: "technology"
---

# Everyday commands to know in Docker CLI

## Basic Commands

`docker help` -- list of commands to use with docker

## Images - define

`docker build -f {DOCKER_FILE_NAME} -t {IMAGE_TAG} .` --build docker image (specify params)

EXAMPLE

- `docker build -f node.dockerfile -t cormandev/node .`

`docker images` -- shows all images
`docker rmi {IMAGE ID}`

## Containers - define

`docker run -d --net {NETWORK} --name {CONTAINER_ALIAS} -p {INTERNAL_PORT:EXTERNAL_PORT} {IMAGE_TO_RUN}`

EXAMPLE

- `docker run -d --net=isolated_network --name nodeapp -p 3000:3000 cormandev/node`

`docker exec {CONTAINER_NAME} {CMD}`

EXAMPLE

- `docker exec nodeapp node dbSeeder.js`

`docker ps` -- list all running containers
`docker ps -a` -- list any containers (running or otherwise)
`docker rm {CONTAINER_ID}`
`docker rm -f $(docker ps -a -q)` -- remove all containers [-f force, $() eval, -q quiet]

## Volumes - define

`docker volume prune` --removes any volumes not currently being used by containers

## Docker Compose - define

`docker-compose build`
`docker-compose up -d`
`docker-compose down --rmi all --volumes`
`docker-compose logs` -- good if you run in daemon mode
`docker-compose ps`
`docker-compose start`
`docker-compose stop`
`docker-compose rm`

## Extensions

Show screen grab
