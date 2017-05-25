---
layout: post
title: Odd IE8 PNG problem
---

When building this site, I came across an interesting issue in IE8. My PNG logo wouldn’t load. Strangely, the PNG file loaded fine in IE7 and IE9. The internet is filled with complaints about IE8[^ie8] and PNGs, but none of the fixes I tried helped.

My solution – for now – is to hide the logo image for old IE versions, and present the logo as plain text using the [CSS content property](https://developer.mozilla.org/en-US/docs/CSS/content):

```html
<a href="/" class="logo" data-content="Chris Johnson">
  <img src="/img/logo@2x.png" width="330" alt="Chris Johnson">
</a>
```
```css
/* Use your favorite method to restrict these styles to IE8 */
.logo img { display: none; } 
.logo:before { content:attr(data-content); }
```

![Header in IE8](/blog/images/2013/04/ie8-header.png)

If you’ve ever come across this IE8 problem before and know how to make the PNG load, please let me know.

[^ie8]: Now that [we can mostly ignore IE6](http://www.ie6countdown.com/), IE8 has become the browser that needs the most hacks.