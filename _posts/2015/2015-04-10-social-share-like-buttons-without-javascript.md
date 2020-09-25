---
layout: post
title: Social Share and Like buttons without Javascript
---

**Update 2/12/2019:** Facebook has updated their sharing URL, and Google plus is no more.

Social networks like Twitter and Facebook encourage you to drop external Javascript code on your website if you want those little share and like buttons you see everywhere. However, relying on external Javascript has a few downsides. For instance, you are:

* Exposing your users to [tracking](http://www.geek.com/news/facebook-like-button-tracks-you-even-if-you-dont-click-1380793/)
* Creating a new avenue for [security problems](/blog/2015/03/beware-outside-javascript)
* Slowing down your site [^slow]

Instead, you can use custom sharing links that don’t run any outside Javascript.  If you go this route, you also get the benefit of being able to easily use custom text or button designs.

In each of the following examples, you’ll need to replace the *YOUR-_____* in the HREFs with your own [URL encoded](http://www.w3schools.com/tags/ref_urlencode.asp) content. If your pages are generated by server-side code, your programming language should have a URL encoding function that can help. Otherwise, there are online [URL encoding tools](http://meyerweb.com/eric/tools/dencoder/) you can use.

## Twitter

```html
<a href="https://twitter.com/intent/tweet?url=YOUR-URL&text=YOUR-TITLE&via=YOUR-TWITTERHANDLE">Twitter</a>
```

## Facebook

```html
<a href="https://facebook.com/sharer/sharer.php?u=YOUR-URL">Facebook</a>
```

## LinkedIn

```html
<a href="http://www.linkedin.com/shareArticle?mini=true&url=YOUR-URL&title=YOUR-TITLE&summary=YOUR-SUMMARY">LinkedIn</a>
```

## Pinterest

```html
<a href="http://pinterest.com/pin/create/button/?url=YOUR-URL&media=YOUR-IMAGE-URL&description=YOUR-DESCRIPTION">Pinterest</a>
```

I compiled this list with the help of a couple  [StackOverflow](http://stackoverflow.com/a/11212220/648844) [answers](http://stackoverflow.com/a/10737122/648844) and [Scott Hanselman’s post](http://www.hanselman.com/blog/AddSocialSharingLinksToYourBlogWithoutWidgetJavaScript.aspx) on the same subject.

[^slow]: The Javascript will not only require more time to download, but it will use some of your visitor’s computing power to run. On desktop computers that might not be a big deal, but it could seriously slow mobile devices.