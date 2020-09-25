---
layout: post
title: Now on Craft CMS
categories: dev
---
Over the last couple weeks, I’ve migrated ChrisLTD.com from [Jekyll](http://jekyllrb.com) to [Craft CMS](https://craftcms.com). Jekyll continues to be an amazingly quick platform for static sites. However, as I move to doing more writing on my mobile devices, I want the ability to publish from those devices as well. My current Jekyll workflow requires building the site using a Mac, and I’d rather not deal with an on server build process. That meant moving to a traditional database powered CMS like Craft.

![Craft CMS in action](/blog/images/2017/06/craft-cms-in-progress.png)

## Why Craft?

I chose Craft for a few reasons, but mainly because it's something new for me. I’ve built sites in Rails, WordPress, Django, Drupal, ExpressionEngine, and other frameworks, but never in Craft. I knew Craft would be a quality system thanks to a [couple](https://twitter.com/sprockethouse) of [recommendations](https://twitter.com/ow). I’ve also used other excellent tools built by [Pixel & Tonic](https://pixelandtonic.com), specifically their essential plugins for ExpressionEngine.

Aside from pure novelty, Craft has a few other things going for it. It uses [Twig](https://twig.sensiolabs.org) for templates, which is similar to the one used by Jekyll. That meant the site conversion was relatively painless. Compared to WordPress, Craft is a more barebones system. I ended up building up and adding the exact features I needed [^plugin] without the cruft and complexity of things like a commenting or pingback system. Also, because Craft isn’t as popular as WordPress – and will likely never be – it’s less of a target for hackers.

## Performance

One of my big worries when moving from Jekyll to Craft was that the site would end up loading much more slowly. So far, my fears have proved to be unfounded. Craft is slightly slower, but thanks to Craft’s aggressive caching the load times are pretty close between the new site and old. These are my top line results from [WebPageTest.org](https://www.webpagetest.org):

#### Old site (Jekyll)

![Site speed results: Jekyll](/blog/images/2017/06/jekyll-site-speed.png)

#### New site (Craft)

![Site speed results: Craft](/blog/images/2017/06/craft-site-speed.png)

## The future

Now that the site is in Craft, I’ll be adding [Micro.blog](https://micro.blog) functionality, and freshening up some of the non-blog content. If you have any questions or comments, ping me on Twitter [@ChrisLTD](https://twitter.com/chrisltd).

[^plugin]: I even ended up writing a [simple Craft plugin](https://github.com/ChrisLTD/craft-getinfofilter) that replaces a token in your content with the current site url.