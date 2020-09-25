---
layout: post
title: Site overhaul
---
After a considerable amount of work, I’ve updated this site’s design and added standalone pages for my [portfolio](/portfolio), [projects](/projects), and [bio](/about)[^ps].

This is what the site looked like before:

![Before screenshot](/blog/images/2013/04/chrisltd-old.jpg)

And what it looks like now:

![After screenshot](/blog/images/2013/04/chrisltd-new.jpg)

Like the old site, this redesign is fully responsive so it works well on tablets and phones:

![Phone screenshot](/blog/images/2013/04/chrisltd-phone1.jpg) ![Phone screenshot 2](/blog/images/2013/04/chrisltd-phone2.jpg)

It even looks pretty good in [Lynx](http://en.wikipedia.org/wiki/Lynx_(web_browser))[^test]:

![Lynx screenshot](/blog/images/2013/04/chrisltd-lynx.png)

## Dropbox out, Rsync in

When I originally launched this site last year, [I published it from a Dropbox folder synced between my computers and my web server]({% post_url 2012/2012-02-08-site-tech %}). While that process worked – and gave me the opportunity to publish posts from my phone or tablet – the server-side Dropbox installation was unpredictable. The syncing service would crash and need to be relaunched regularly. I also ran into problems where the server’s files would overwrite my new local versions. It wasn’t a disaster thanks to Dropbox’s file history feature, but it was annoying enough to convince me to switch to [Rsync](http://en.wikipedia.org/wiki/Rsync).

Rsync is one of those good old Unix utilities that is esoteric to use, but bulletproof. Now my site files are generated on my laptop with [Jekyll](https://github.com/mojombo/jekyll) and “rsynced” to my server. It’s quick because Rsync only transfers the parts of the files that have changed. The entire process (including building the site) takes less than a minute.

## Goodbye Feedburner

Since Google announced they are [shutting down Google Reader](http://googlereader.blogspot.com/2013/03/powering-down-google-reader.html), it seemed like a good idea move away from Google’s other major RSS service: [Feedburner](http://feedburner.com). Feedburner cleans up your feeds and provides you with readership stats, but your feeds have to be hosted on their servers for it to work. My solution was to move to a plugin for [Mint](http://haveamint.com) called [Bird Feeder](http://haveamint.com/peppermill/pepper/11/bird_feeder/) and clean up my feed with a couple customized [Jekyll](https://github.com/ChrisLTD/ChrisLTD.com/blob/master/_plugins/rss_url_filter.rb) [filters](https://github.com/ChrisLTD/ChrisLTD.com/blob/master/_plugins/footnotes.rb). You can [subscribe to my feed here](/blog/feed.xml).

## More information than you require

For more about the tools I used when designing and developing this site, check out the [colophon section of the About page](/about#colophon).

[^ps]: I hope you don’t come across this on your own, but you should checkout my new [custom 404 page](/404).

[^test]: It’s still valuable to test your site in a text browser, or alternatively in a regular browser with the stylesheets and scripts turned off. This is how search engines and screen readers see your site.