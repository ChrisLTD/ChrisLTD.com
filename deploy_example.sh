#!/usr/bin/env bash
sh compileassets.sh
jekyll build
rsync -avz --delete _site/ username@yourserver.com:/htdocs/yourremotedir