#!/usr/bin/env bash
jekyll && rsync -avz --delete _site/ username@yourserver.com:/htdocs/yourremotedir