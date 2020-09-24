---
layout: post
title: iTunes Mini Player in OS X Yosemite
---

I upgraded to [OS X Yosemite](http://en.wikipedia.org/wiki/OS_X_Yosemite) over the weekend, and despite some pitfalls[^pitfalls], the experience has been pleasant. The new flatter design makes OS X seem fresh again without feeling drastically different. However, a small change in iTunes has been really bugging me. Specifically how you enter and leave the Mini Player.

In the last version of iTunes, switching to the Mini Player was straightforward. You clicked the square-in-a-square icon that represented the Mini Player:

![Old iTunes](/blog/images/2014/10/itunes-old.png)

When you wanted to leave the Mini Player, you clicked a different square icon that represented the regular iTunes window:

![Old iTunes Mini Player](/blog/images/2014/10/itunes-old-mini.png)

In Yosemite, the Mini Player icon is gone. Instead you have to click on the album artwork:

![Yosemite iTunes](/blog/images/2014/10/itunes-new.png)

If you want to leave the new Mini Player, you have to click the &times; icon:

![Yosemite iTunes Mini Player](/blog/images/2014/10/itunes-new-mini.png)

At first, I had no idea how you were supposed to invoke the Mini Player in Yosemite. The first thing I tried was green zoom icon, but that just made iTunes take up the full screen. After clicking on various things in the title bar area, I eventually tried and succeeded with the album artwork. I had mistakenly assumed that clicking the album artwork would give me a larger view of the album artwork.

In the Mini Player, I was similarly confused. Clicking the album artwork made the artwork bigger. Clicking the little double arrow icon was no help, it also makes the album artwork bigger. I’m not sure why Apple decided we needed two ways to see the larger album artwork. The &times; icon did the trick, but I was afraid to try it, thinking it would quit iTunes.

I hope Apple decides to tweak the iTunes interface soon. If Apple doesn’t want to bring back a dedicated Mini Player icon, I’d suggest making the album artwork toggle between the regular and Mini Player in either mode.

[^pitfalls]: I’ve run into three issues, the first was that I had to clean my `/usr` folder, per [these instructions from Jim Lindley](https://jimlindley.com/blog/yosemite-upgrade-homebrew-tips/), before upgrading. The second was having to [reinstall Java 6](http://support.apple.com/kb/DL1572?viewlocale=en_US&locale=en_US) to regain access to some of my apps. The third is that my Notification Center preferences don’t seem to save.
