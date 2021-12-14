#!/bin/bash
if [ -z "$1" ] ; then
        echo 'pipeline are setuped incorrectly'
        exit 1
fi

# build docker image
ts=$(date +%s)
githead=$(git rev-parse HEAD)
set -ex
echo "Building Backend Docker image with tag " $$githead-$$ts
echo $githead-$ts | buildkite-agent meta-data set "image-tag" 
docker login -u _json_key -p "$(cat /etc/service_key/service-account-key.json | tr '\n' ' ')" https://asia.gcr.io
docker build -t asia.gcr.io/sirclo-iii-nonprod/$1-dev:$githead-$ts -f Dockerfile .
docker push asia.gcr.io/sirclo-iii-nonprod/$1-dev:$githead-$ts
