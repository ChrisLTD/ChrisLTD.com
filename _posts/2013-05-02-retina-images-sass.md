---
layout: post
title: Retina images with SASS
ads: true
---
The introduction of [retina](https://en.wikipedia.org/wiki/Retina_Display) displays has added a wrinkle to the process of designing and developing websites. Unless we want our images to look blurry on the latest devices, we have to produce and deliver high resolution images[^avoid]. 

Using [SASS](http://sass-lang.com/)[^scss] you can combine media queries and good old fashioned [CSS image replacement](http://css-tricks.com/css-image-replacement/) to send high resolution images to retina devices and standard resolution images everywhere else[^bandwidth]. 

Let’s assume we’re starting with two images: logo.png (200px &times; 100px), and a retina counterpart logo@2x.png (400px &times; 200px). We want these images to show up when we use this link tag:

{% highlight scss %}
<a href="/" id="logo">My Logo</a>
{% endhighlight %}

In our SCSS file, we need to define this handy mixin I adapted from [Jeff Croft's](http://jeffcroft.com/) code:

{% highlight scss %}
@mixin background-image-retina($file, $type, $width, $height) {
  background-image: url($file + '.' + $type);
  @media only screen and (-webkit-min-device-pixel-ratio: 2),
    only screen and (-moz-min-device-pixel-ratio: 2),
    only screen and (-o-min-device-pixel-ratio: 2/1),
    only screen and (min-device-pixel-ratio: 2),
    only screen and (min-resolution: 192dpi),
    only screen and (min-resolution: 2dppx){
    & {
      background-image: url($file + '@2x.' + $type);
      -webkit-background-size: $width $height;
      -moz-background-size: $width $height;
      -o-background-size: $width $height;
      background-size: $width $height;
    }
  }
}
{% endhighlight %}

*Note that the mixin assumes your retina files are always named with the @2x between the filename and the extension (like our example logo.png and logo@2x.png).*

Then, we can use image replacement on the link tag along with the included mixin:

{% highlight scss %}
#logo {
  width: 200px;
  height: 100px;
  @include background-image-retina(logo, png, 200px, 100px);
  /* Image replacement code */
  display: block; 
  text-indent: -9999px; 
  white-space: nowrap; 
  overflow: hidden;
}
{% endhighlight %}

That's it, just make sure you’re referencing the standard height and width (in this case, 200px &times; 100px) in your SCSS.

In case you’re curious, this is the raw CSS your SASS compiler will spit out:

{% highlight css %}
#logo {
  width: 200px;
  height: 100px;
  background-image: url(logo.png);
  display: block;
  text-indent: -9999px;
  white-space: nowrap;
  overflow: hidden; 
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-moz-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2 / 1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {
  #logo {
    background-image: url(logo@2x.png);
    -webkit-background-size: 200px 100px;
    -moz-background-size: 200px 100px;
    -o-background-size: 200px 100px;
    background-size: 200px 100px; 
  } 
}
{% endhighlight %}

[^avoid]: Or avoid delivering images unless absolutely necessary. Alternatives would be graphics made from pure CSS, SVG, and web fonts.

[^scss]: Technically, this uses the SCSS syntax of SASS. 

[^bandwidth]: You could send high resolution images to every device, but that’s a big waste of bandwidth, especially for low speed connections.