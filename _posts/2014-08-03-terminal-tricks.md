---
layout: post
title: Terminal tricks from Craig Hockenberry
---
If you use the Mac’s [Terminal app](http://en.wikipedia.org/wiki/Terminal_%28OS_X%29), you need to read and bookmark Craig Hockenberry’s collection of [Terminal tips and tricks](http://furbo.org/2014/09/03/the-terminal/).

Here are a few of my favorites:

> The `history` command will give you a list of the last 500 things you've typed:
{% highlight text %}
$ history
{% endhighlight %}

> Say you want to open the shell's current directory in a Finder folder. It's this easy:
{% highlight text %}
$ open .
{% endhighlight %}

> How often have you opened a Get Info window in the Finder just to know the dimensions of an image or other basic information about a file in a project? The Finder is fine, but you're already at the command line, so just use `file` instead:
{% highlight text %}
$ file Default.png
Default.png: PNG image data, 640 x 1136, 8-bit/color RGB, non-interlaced
{% endhighlight %}

> Have you ever had a folder full of files that you've wanted to access through a web browser? You could setup Apache to do this by editing the httpd.conf file, or just enter the following command in the folder you want to access:
{% highlight text %}
$ python -m SimpleHTTPServer 8000
{% endhighlight %}

Go check out Hockenberry’s [entire post](http://furbo.org/2014/09/03/the-terminal/).
