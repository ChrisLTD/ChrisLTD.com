#!/usr/bin/env bash

packr js/blog.js > js/blog-ck.js
packr js/jquery.yosimplefilter.js > js/jquery.yosimplefilter-ck.js
packr js/portfolio.js > js/portfolio-ck.js
packr js/script.js > js/script-ck.js

sass scss/styles.scss css/styles.css --style compressed --no-cache