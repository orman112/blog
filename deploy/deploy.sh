#!/bin/bash
cd ..
#echo "Pulling latest from github"
#git pull 
echo "Installing dependencies for blog application"
yarn --version
echo "Building static site"
gatsby build