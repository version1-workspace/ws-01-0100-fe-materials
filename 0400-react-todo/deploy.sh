#!/bin/bash

set -e

PROJECT_DIR=0400-react-todo

echo '[Build] Build Next.js'
npm run build

echo '[Deploy] Copy exported files'
rm -rf ../public/$PROJECT_DIR
mkdir -p ../public/$PROJECT_DIR
cp -pr out/* ../public/$PROJECT_DIR
touch ../public/$PROJECT_DIR/.nojekyll

echo 'Done'
