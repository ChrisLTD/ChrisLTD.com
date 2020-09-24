---
layout: post
title: Chinese DNS poisoning
---

[Craig Hockenberry](http://furbo.org/2015/01/22/fear-china/) recently had a rough couple of days when the Great Firewall of China[^gfw] redirected massive amounts of traffic to one of his web servers[^why]:

> The number of requests peaked out at 52 Mbps. Let’s put that number in perspective: Daring Fireball is notorious for taking down sites by sending them about 500 Kbps of traffic. What we had just experienced was roughly the equivalent of 100 fireballs. (...) If each of those requests were 500 bytes, that’s 13,000 requests per second. That’s about a third of Google’s global search traffic.

Suffice it to say, his server crashed pretty hard. His only recourse was to block Chinese IP addresses from ever getting to his server.

I didn’t even realize an attack like this was possible, but as Hockenberry notes, he wasn’t the [only](http://www.reddit.com/r/networking/comments/2rumgd/chinese_firewall_seems_to_be_redirecting_blocked/) [target](http://www.theregister.co.uk/2014/01/21/china_dns_poisoning_attack/).

**Update:** Matt Wilcox ran into the same problem, and he explains how to [block Chinese IP addresses using iptables](https://mattwilcox.net/archives/unexpected-ddos-blocking-china-with-ipset-and-iptables/).

[^gfw]: Otherwise known as the [Golden Shield Project](http://en.wikipedia.org/wiki/Golden_Shield_Project).

[^why]: We’ll likely never know exactly why this redirection happened, but [theorists](https://news.ycombinator.com/item?id=8931827) think this is a more efficient way for the Chinese government to censor websites.