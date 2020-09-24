---
layout: post
title: My cross browser testing setup
---
![VirtualBox Screenshot](/blog/images/2013/08/virtualbox.png)

As web developers we have a [moral obligation](http://www.w3.org/WAI/intro/accessibility.php) to make our sites accessible[^accessibility] to as many people as possible. That means testing our sites in different browsers and on different devices. 

This is my baseline testing setup:

* The latest versions of Firefox, Chrome[^Opera], and Safari.
* [Lynx](https://en.wikipedia.org/wiki/Lynx_%28web_browser%29) installed with [MacPorts](http://osxdaily.com/2011/07/26/get-lynx-for-mac-os-x-10-7-lion/). Lynx is a text browser and it’s a great bit of software for understanding how screen readers and search bots interpret your site.
* Internet Explorer 6 and newer running in [VirtualBox](https://www.virtualbox.org/). I use a single Windows 7 virtual machine with [IETester](http://my-debugbar.com/wiki/IETester/HomePage) to test old versions of Internet Explorer[^ms].
* The Android browser using [AndroVM](http://androvm.org/blog/) in VirtualBox[^genymotion].
* Mobile Safari on an iPhone and iPad[^simulator].

If you’re working on an existing site, check the logs and see if you should be focusing your testing on a specific browser. You might find you have a lot of Blackberry or Nintendo Wii users you need to help.[^not]

[^accessibility]: Making content accessible across devices doesn’t mean our sites need to work the same everywhere. [Graceful degradation and progressive enhancement](http://www.sitepoint.com/progressive-enhancement-graceful-degradation-basics/) are solid strategies for dealing with different browser capabilities.

[^Opera]: Testing in Opera is redundant now that it uses the [same rendering engine as Google Chrome](http://gizmodo.com/5993566/google-is-forking-webkit-to-create-a-new-rendering-engine-for-chrome-and-opera).

[^ms]: Microsoft has a great site where you can [download free Windows virtual machines](http://www.modern.ie/) with old versions of Internet Explorer.

[^genymotion]: AndroVM has been replaced by a software package called [Genymotion](https://cloud.genymotion.com). I haven’t had a chance to try it yet. For now, AndroVM still works fine. Alternatively, you could use the Android emulator in the [Android SDK](https://developer.android.com/sdk/index.html).

[^simulator]: If you don’t have an iPhone and iPad, you could use the simulator included in [Xcode](https://developer.apple.com/technologies/tools/).

[^not]: Probably not.