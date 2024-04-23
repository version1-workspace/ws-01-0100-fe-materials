#!/bin/bash

set -e

PROJECT_DIR=0300-js-dom-todo

echo '[Build] Build Sass'
npm run build

echo '[Deploy] Copy HTML/CSS File'
mkdir -p ../public/$PROJECT_DIR/stylesheets
cp -p stylesheets/style.css ../public/$PROJECT_DIR/stylesheets/style.css
cp -p index.html ../public/$PROJECT_DIR/index.html
cp -pr js ../public/$PROJECT_DIR/.

echo 'Done'
