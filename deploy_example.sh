#!/usr/bin/env bash
npm run build
rsync -avz --delete _site/ username@yourserver.com:/htdocs/yourremotedir
