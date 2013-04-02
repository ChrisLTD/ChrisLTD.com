# ChrisLTD.com
### Version 2.0 | By [Chris Johnson](http://chrisltd.com)

This is the code for my [Jekyll](https://github.com/mojombo/jekyll) powered portfolio site and blog. Uses [Liquid templates](https://github.com/shopify/liquid/wiki/liquid-for-designers).

## YAML Front Matter
* Use "class" variable to add a class to the body tag, also used for loading javascript in the default layout, and menu highlighting
* Use "date" variable set to the future for drafts `date: 3033-09-09 06:66:00 +1000`
* Use "comments" variable to add disqus comments

## Local testing
Compile SCSS, generate the site, and turn on server: `sh localtest.sh'

The future switch shows posts dated well into the future.

## Personal Notes
* I had to add `{{ content | replace: '&amp;', '&' }}` to the post template to fix the problem where ampersands in links were killing the parser. This means that all ampersands in links should use the html entity `&amp;`.
* Server paths hardcoded in: blog/feed/index.php and chrisltd_mint/feeder/index.php
* Run `sh deploy.sh` to generate then rsync the site to the server
* There should be a fonts directory with symbolset's ss-social and ss-standard on the server. These are not in the git repo for copyright purposes.