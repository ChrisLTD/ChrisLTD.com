---
layout: post
title: iPad theme for the Fever RSS reader
---

I recently switched to reading RSS feeds through [Fever](http://feedafever.com/) after Google [announced](http://googleblog.blogspot.com/2013/03/a-second-spring-of-cleaning.html) they were shutting down Google Reader. It works great, except there isn't a good way to use it on an iPad. The web interface isn’t well suited to an iPad[^fiddly], and iOS Fever apps like [Reeder](https://itunes.apple.com/us/app/reeder/id325502379?mt=8&partnerId=30&siteID=cxyf8xxWmGo) and [Sunstroke](https://itunes.apple.com/us/app/sunstroke/id488564806?mt=8&partnerId=30&siteID=cxyf8xxWmGo) don’t have iPad versions yet.

What I did is create a copy of Fever’s iPhone theme that is already optimized for touch screens, and modified it work on an iPad. So far, it does three things:

* Fills the width of an iPad screen in portrait or landscape[^iphone].
* Increases the size of the article text.
* Disables interface animations[^animations].

**You can [read more and download the theme on GitHub](https://github.com/ChrisLTD/fever_ipad_theme).**

[^fiddly]: By default, Fever serves the desktop interface to iPads. The tap targets are tiny and the article reading area is too small.

[^iphone]: The iPhone theme is hardcoded for the iPhone's screen width.

[^animations]: The animations worked fine, but they were a bit choppy on my iPad 3 and made the interface seem sluggish.