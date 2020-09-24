---
layout: post
title: The weight of advertising and tracking
---

TJ VanToll wrote a fantastic article about [why the web is becoming a nightmare](http://developer.telerik.com/featured/the-webs-cruft-problem/)  for the average user. This was his experience trying to read an article on CNN:

> I had to sift through a bunch of junk that I don’t care about—like social buttons, the temperature, and a terms-of-service modal — all for an article that’s about 2,000 words. I can’t even see the start of the article on my oversized iPhone 6+.
> 
> Loading this article took 200+ HTTP requests and used ~2MB of data. The article took about 3 seconds to load on my WiFi, and web page test says it would take about 13 seconds to load on an average mobile network.

Ridiculous. 

He notes that ads and tracking scripts make up a huge chunk of this immense page weight:

> Let’s dive deeper into the CNN article. Among the 200+ HTTP requests the page makes are calls to 25 different domains.
>
> Yes you read that correctly. TWENTY…FIVE. Among them are a few that are clearly ad related (ex. ad.doubleclick.net, pixel.moatads.com), a few that serve some analytics function, and many whose names are intentionally obfuscated to confuse us.

[CNN isn’t an outlier](http://daringfireball.net/2015/07/safari_content_blocker_imore), but sadly, large publishers don’t have much choice. [They need whatever ad money they can grab to survive](https://stratechery.com/2015/why-web-pages-suck/). 

If you want to read articles without all the junk, you have to go to publisher-backed platforms like [Flipboard](https://flipboard.com), [Facebook’s Instant Articles](https://www.facebook.com/instantArticles), and [Apple’s News app](https://www.apple.com/news/) [^adblockers]. These platforms eliminate the advertising and tracking code that comes along with the average web article in favor of their own cleaner technologies.

If these alternative platforms gain traction, the web could become a second-class citizen when it comes to content delivery. Every publisher will still have a website for the foreseeable future, but you wont want to go there.

[^adblockers]: Or use an ad blocker. Unfortunately, if everyone uses an ad blocker, all of these sites will go out of business.