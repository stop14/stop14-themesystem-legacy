#!/bin/bash

scheme='default'

if [ $# -eq 0 ]
then
  let $1='default'
fi

if [ $1 == 'default' ] || [ $1 == 'omeka' ] || [ $1 == 'drupal' ] 
then
  if [ $# -eq 2 ] && [ $2 == "rebuild" ]
    then
      yes | cp -rf ./node_modules/stop14-themesystem-legacy/scaffolding/$1/* ./
      yes | cp -rf ./node_modules/stop14-themesystem-legacy/scaffolding/$1/.eslintrc ./

    else
      cp -rn ./node_modules/stop14-themesystem-legacy/scaffolding/$1/* ./
      cp -rn ./node_modules/stop14-themesystem-legacy/scaffolding/$1/.eslintrc ./

    fi
fi