#!/bin/bash

scheme='default'

if [ $# -eq 0 ]
then
  let $1='default'
fi

if [ $1 == 'default' ] || [ $1 == 'omeka' ] || [ $1 == 'drupal' ] 
then
  cp -rn ./node_modules/stop14-themesystem-legacy/scaffolding/$1/* ./
fi