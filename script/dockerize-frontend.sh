#!/usr/bin/env bash

#remove image existed
docker image rm -f toanbv1997/loyalty-client;

#build image
docker build -t toanbv1997/loyalty-client -f ./Dockerfile .;

#push image to docker hub
docker push toanbv1997/loyalty-client;