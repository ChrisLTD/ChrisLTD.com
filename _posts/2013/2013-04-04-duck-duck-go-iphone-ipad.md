---
layout: post
title: Set Duck Duck Go as your search engine on an iPhone or iPad without jailbreaking
---

**Update:** As of iOS 8 you can use Duck Duck Go without resorting to tricks. Go to the iOS Settings app, tap *Safari*, then tap *Search Engine* and select Duck Duck Go. If you’re stuck on iOS 7 or earlier, read on.

<hr>

With the current version of Safari on iOS, you can’t set your default search engine to something other than Google, Yahoo, or Bing. So if you want to use [Duck Duck Go](https://duckduckgo.com/)[^ddg]  without resorting to [jailbreaking](http://help.duckduckgo.com/customer/portal/articles/472033-safari-ios-), you have to get a bit clever. What I did was switch my default search engine to Yahoo[^yahoo] and set my router to divert traffic intended for Yahoo to Duck Duck Go.

*Don't try this if you're not comfortable changing your router settings. Even if you are, be safe and backup your working router configuration.*

This is how you can do it on a [DD-WRT](http://www.dd-wrt.com/) router:

1. Go to the *Services* page in the router admin:<br>
   ![Services Page](/blog/images/2013/04/ddg-router1.png)
2. Enter this redirect in the *Additional DNSMasq Options* field: {% highlight text %}address=/search.yahoo.com/184.72.115.86{% endhighlight %}
   ![Services Page](/blog/images/2013/04/ddg-router2.png)
3. Apply the new settings.
4. On your iOS device[^desktop], set your default search engine to Yahoo. Go into the Settings app, and scroll down to Safari. The setting will be in there:<br>
   ![Services Page](/blog/images/2013/04/ddg-iphone1.jpg)
5. Bingo, you're done:<br>
   ![Services Page](/blog/images/2013/04/ddg-iphone2.jpg)

Unfortunately, this will only work when you are connected to your network. Anywhere else and you’re going to get the normal Yahoo search results.

[^ddg]: Every now and again I like to try alternatives to Google. Duck Duck Go is pretty fast and keeps your searches private. Bing has also come a long way.

[^yahoo]: Why redirect Yahoo? Yahoo uses the same search results as Bing, plus Yahoo search is on the subdomain search.yahoo.com, so we can redirect it without clobbering other Yahoo sites.

[^desktop]: This will also work on desktop Safari, or you could use one of [these methods](http://help.duckduckgo.com/customer/portal/articles/255650).
