---
layout: post
title: Else on its own line
---

Until a couple weeks ago, I always put my `else` statements on the same line as the closing brace of the preceeding `if` statement. This style has always seemed cleaner and more logical to me. I’d also guess that it’s the most common way of writing an if/else[^brent].

```c
if( condition ){
  // Do something
} else {
  // Do something else
}
```

However, after watching a few of [Eliot Arntz’s](https://twitter.com/EliotArntz) [Swift](http://developer.apple.com/swift) videos at [Bitfountain](http://bitfountain.io)[^iOS], I’ve converted to putting my `else` statements on their own line.

```c
if( condition ){
  // Do something
}
else {
  // Do something else
}
```

Sure, we’re now ‘wasting’ an extra line, but we’ve gained the ability to comment out the entire `else` statement quickly. It’s also easier to move the entire `else` block around if you're using a text editor like [Vim](http://en.wikipedia.org/wiki/Vim_%28text_editor%29) that operates on entire lines.

[^brent]: [Brent Simmons](http://inessential.com/2014/11/13/makes_commenting_out_difficult) not withstanding.

[^iOS]: I’ve wanted to get into iOS development for years now. Maybe going through the [Bitfountain](http://bitfountain.io) videos will finally be the kick in the ass I need to make and ship an app.