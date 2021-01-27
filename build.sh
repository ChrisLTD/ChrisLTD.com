#!/usr/bin/env bash

packr js/blog.js > js/blog.min.js
packr js/jquery.yosimplefilter.js > js/jquery.yosimplefilter.min.js
packr js/bigfoot.js > js/bigfoot.min.js
packr js/portfolio.js > js/portfolio.min.js
packr js/script.js > js/script.min.js
sass scss/styles.scss css/styles.css --style compressed

bundle exec jekyll build