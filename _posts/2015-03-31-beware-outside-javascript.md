---
layout: post
title: Beware of outside JavaScript
---
Be choosy about what third-party JavaScript you include on your site, because each is a potential security risk. The wrong script might even turn your visitors into [unwilling attack bots](http://www.netresec.com/?page=Blog&month=2015-03&post=China%27s-Man-on-the-Side-Attack-on-GitHub):

> China is using their active and passive network infrastructure in order to perform a man-on-the-side attack against GitHub. (...)
> 
> 1. An innocent user is browsing the internet from outside China.
> 2. One website the user visits loads a javascript from a server in China, for example the Badiu Analytics script that often is used by web admins to track visitor statistics (much like Google Analytics).
> 3. The web browser's request for the Baidu javascript is detected by the Chinese passive infrastructure as it enters China.
> 4. A fake response is sent out from within China instead of the actual Baidu Analytics script. This fake response is a malicious javascript that tells the user's browser to continuously reload two specific pages on GitHub.com.

While this particular attack from China is extraordinary[^China], a more mundane hack of your favorite social network might turn a cool share button against you and your users.

[^China]: This [attack on Github](https://github.com/blog/1981-large-scale-ddos-attack-on-github-com) looks like follow-up to the DNS poisoning attack [I wrote about in January](/blog/2015/01/dns-poison-china/).