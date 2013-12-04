---
layout: post
title: Block Onswipe on your iPad or iPhone
---
If you have an iPad, you’ve probably come across [Onswipe](http://www.onswipe.com). Onswipe is service that takes a website designed for desktop browsers and tries to present it in a more touch friendly format[^example]. Unfortunately, Onswipe fails miserably. Aside from the laggy UI[^swipes], it crashes my iPad’s browser frequently[^frequently], effectively blocking me from accessing that website’s content. Try visiting sites like [Cult of Mac](http://cultofmac.com) or [CycleWorld](http://www.cycleworld.com/) on an iPad and see for yourself.

The good news is that you can block Onswipe permanently on your mobile devices using your router. The trick is to take all requests to Onswipe’s servers and redirect them to nothing.

*Don't try this if you're not comfortable changing your router settings. Even if you are, be safe and backup your working router configuration.*

This is how you can do it on a [DD-WRT](http://www.dd-wrt.com/) router in three easy steps:

1. Go to the *Services* page in the router admin:<br>
   ![Services Page](/blog/images/2013/04/ddg-router1.png)
2. Enter this redirect in the *Additional DNSMasq Options* field: {% highlight text %}address=/assets.onswipe.com/0.0.0.0{% endhighlight %}
   ![Services Page](/blog/images/2013/12/onswipe-router.png)
3. Apply the new settings and enjoy a web without Onswipe.

Keep in mind that this will only work when you are connected to that router. So I also encourage you to politely inform website owners that you’d like them to stop using Onswipe. Onswipe should also do their part and let users opt of their service globally rather than on a site by site basis.

[^swipes]: Instead of letting you scroll down a page, Onswipe forces you to use a choppy swiping implementation.

[^frequently]: I’ve had an iPad 1, 3 and now a Retina Mini. Onswipe has succeeded in crashing Mobile Safari on all of them.