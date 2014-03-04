# ChrisLTD.com
### Version 2.0 | By [Chris Johnson](http://chrisltd.com)

This is the code for my [Jekyll](https://github.com/mojombo/jekyll) powered portfolio site and blog. Uses [Liquid templates](https://github.com/shopify/liquid/wiki/liquid-for-designers).

## YAML Front Matter
* Use "class" variable to add a class to the body tag, also used for loading javascript in the default layout, and menu highlighting
* Use "comments" variable to add disqus comments

## Code Highlighting
Code highlighting is done via Pygments. Here is the [list of available lexers](http://pygments.org/docs/lexers/).

This is how you use it:
```
{% highlight ruby %}
puts "A simple ruby program."
…
{% endhighlight %}
```

Use `text` as your language for no highlighting.

## Local testing
Compress JS, Compile SCSS, generate the site, and turn on server: `sh test.sh'

The future switch shows posts dated well into the future.

## Misc. Notes
* The Maruku processor doesn't like attributes without values. For instance `<iframe allowfullscreen>`. Fix by changing it to something innocuous like `<iframe allowfullscreen="true">`.
* The Maruku processor also does not like tag pairs without something in between, like `<iframe></iframe>`. Simply add a space `<iframe> </iframe>`.
* I had to add `{{ content | replace: '&amp;', '&' }}` to the post template to fix the problem where ampersands in links were killing the parser. This means that all ampersands in links should use the html entity `&amp;`.
* Server paths hardcoded in: blog/feed/index.php, chrisltd_mint/feeder/index.php, chrisltd_lessn/index.php
* Run `sh deploy.sh` to generate then rsync the site to the server
* There should be a fonts directory with symbolset's ss-social and ss-standard on the server. These are not in the git repo for copyright purposes.
* If you have parenthesis in your markdown link URLs, use the URL encoding %28 and %29 instead of ( and ).
* if you need to use brackets without creating a footnote, use the html entities &#91; &#93; instead of [ and ].