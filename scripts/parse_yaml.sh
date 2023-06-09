# Repurposed with thanks from https://stackoverflow.com/posts/21189044/revisions
if [ ${1#*.} = "yaml" ] || [ ${1#*.} = "yml" ]
then
  prefix=$2
  s='[[:space:]]*' w='[a-zA-Z0-9_]*' fs=$(echo @|tr @ '\034')
  sed -ne "s|^\($s\):|\1|" \
      -e "s|^\($s\)\($w\)$s:$s[\"']\(.*\)[\"']$s\$|\1$fs\2$fs\3|p" \
      -e "s|^\($s\)\($w\)$s:$s\(.*\)$s\$|\1$fs\2$fs\3|p"  $1 |
  awk -F$fs '{
    indent = length($1)/2;
    vname[indent] = $2;
    for (i in vname) {if (i > indent) {delete vname[i]}}
    if (length($3) > 0) {
       vn=""; for (i=0; i<indent; i++) {vn=(vn)(vname[i])("")}
       printf("$%s%s%s: %s\n", "'$prefix'",vn, $2, $3);
    }
  }'  > ${1%%.*}.tmp
  cat ./node_modules/stop14-themesystem-legacy/boilerplate/sass_config_header.txt ${1%%.*}.tmp > ${1%%.*}.sass
  cp -r ${1%%.*}.sass ./source/sass/00_configuration
  rm -rf ${1%%.*}.tmp
  rm -rf ${1%%.*}.sass
  echo "Configuration conversion from" $1 "to" ${1%%.*}.sass "is complete."
else
  echo "This file ($1) does not have a proper YAML extension"
fi