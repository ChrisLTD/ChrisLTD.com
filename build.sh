#!/usr/bin/env bash

bundle exec packr js/blog.js > js/blog.min.js
bundle exec packr js/jquery.yosimplefilter.js > js/jquery.yosimplefilter.min.js
bundle exec packr js/bigfoot.js > js/bigfoot.min.js
bundle exec packr js/portfolio.js > js/portfolio.min.js
bundle exec packr js/script.js > js/script.min.js
bundle exec sass scss/styles.scss css/styles.css --style compressed

bundle exec jekyll build