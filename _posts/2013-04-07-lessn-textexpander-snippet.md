---
layout: post
title: Lessn TextExpander Snippet
---

This weekend I setup chris.lt as a personal link shortening service using Shaun Inman's [Lessn](http://www.shauninman.com/archive/2009/08/17/less_n). Lessn has a web interface and a bookmarklet, but I like using [TextExpander](http://smilesoftware.com/TextExpander/) to shorten URLs from the clipboard[^teshorteners]. So I just copy the URL, type the shortcut (I set mine up as “/lessn”) and TextExpander replaces it with the shortened URL.

This is the AppleScript for the snippet:

```applescript
set api_key to "xxxxxxxxx"
set domain to "yourdomain.net"
 
set the longURL to (the clipboard as string)
 
if ((characters 1 through 4 of longURL as string) is not "http") then 
  return "Not a valid URL" 
else 
  set shellScript to ("curl --url \"http://" & domain & "/-/?api=" & api_key & "&url=" & longURL & "\"")
  set shortURL to (do shell script shellScript)
  return shortURL
end if 
```

If you have any bug fixes or changes, fork [this gist](https://gist.github.com/ChrisLTD/5332850).

[^teshorteners]: Brett Terpstra has [a set of TextExpander snippets](http://brettterpstra.com/share/te-snippets/index.php?group=Tools&prefix=,,) that include shortening with bit.ly, is.gd, and tinyurl.