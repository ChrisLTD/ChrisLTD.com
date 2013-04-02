# ChrisLTD.com
### Version 2.0 | By [Chris Johnson](http://chrisltd.com)

This is the code for my Jekyll powered portfolio site and blog.

## YAML Front Matter
* Use "draft" variable to keep a post from being published to the index
* Use "comments" variable to add disqus comments
* Use "class" variable to add a class to the body tag

## Local testing
Generate and turn on server: `jekyll --server`

## Personal Notes
* I had to add `{{ content | replace: '&amp;', '&' }}` to the post template to fix the problem where ampersands in links were killing the parser. This means that all ampersands in links should use the html entity `&amp;`.
* Server paths hardcoded in: blog/feed/index.php and chrisltd_mint/feeder/index.php
* Run `sh deploy.sh` to generate then rsync the site to the server
* There should be a fonts directory with symbolset's ss-social and ss-standard on the server. These are not in the git repo for copyright purposes.