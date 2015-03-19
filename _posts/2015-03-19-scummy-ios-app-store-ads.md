---
layout: post
title: Scummy ads redirecting iOS users to the App Store
---
From [9 to 5 Mac](http://9to5mac.com/2015/03/18/safari-app-store-redirect/):

> Website advertisement companies have found a way to circumvent the protections introduced in iOS 8 to stop users from being kicked to the App Store because of certain cleverly-coded JavaScript advertisements.
>
> (...) I am now experiencing this myself, and it makes browsing on the iPhone unusable. Browsing to websites such as Reddit and Reuters and others now automatically open the App Store. In many cases, there is no way for me to read the actual content on the pages.

Be sure to check out 9 to 5 Mac’s [video of these types of ads in action](https://www.youtube.com/watch?v=MucM1Cwe3t8). In my experience, switching to the Chrome browser from Safari made no difference. The issue is likely something Apple needs to fix in the underlying code that powers all browsers on iOS[^Opera].

[^Opera]: For security reasons, Apple requires all web content to be rendered by [UIWebViews](https://developer.apple.com/library/ios/documentation/uikit/reference/UIWebView_Class/Reference/Reference.html) or [WKWebViews](https://developer.apple.com/library/prerelease/ios/documentation/WebKit/Reference/WKWebView_Ref/index.html). The notable exception is [Opera Mini](http://www.opera.com/mobile/mini/iphone), which actually renders the pages you request on Opera’s servers.