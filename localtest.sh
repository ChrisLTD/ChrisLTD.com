#!/usr/bin/env bash
sass scss/styles.scss css/styles.css --style compressed --no-cache
jekyll --server --future