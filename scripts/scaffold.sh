#!/bin/bash

scheme = 'default';

if [ $# -eq 0 ];
then
  scheme='default';
elif [ $1 -eq 'omeka' ] || [ $1 -eq 'drupal' ] 
  scheme=$1;
fi

mv -vn $INIT_CWD/node_modules/stop14-themesystem-legacy/scaffolding/$scheme/* $INIT_CWD