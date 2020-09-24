---
layout: post
title: Quickly fix widows in InDesign
---
You can find and fix all the widows in your Adobe InDesign documents just by using InDesign’s Find/Change. Switch to GREP mode and use this [regular expression](https://en.wikipedia.org/wiki/Regular_expression) in the *Find what* field:

{% highlight text %}
(\b\w+?\b) (\b\S{1,6}?\b[.!?]\r)
{% endhighlight %}

And put this in the *Change to* field:

{% highlight text %}
$1~S$2
{% endhighlight %}

When you're done, this is what the dialog box should look like:

![Adobe InDesign Find/Change dialogue](/blog/images/2012/03/indesign-find-change-widow.png)

## What’s a widow and why should I care?

A widow is a short word by itself on the last line of a paragraph. Widows can adversely affect the readability of your documents by creating awkward white space between paragraphs. Here’s an example:

![Example of a paragraph with a widow](/blog/images/2012/03/widow-example.png)

Finding and getting rid of widows in your files can take a long time, especially with lots of content. Automating the process can save time and reduce the likelihood you’ll overlook a widow. 

## So what does this do exactly?

This regular expression will find the last two words of a paragraph and replace the normal space between them with a non-breaking space. Non-breaking spaces, as you might have guessed, tell InDesign *not* to automatically break the line between the words. So, now your lonely word will have a neighbor on the last line. If the last word wasn’t by itself, the non-breaking space will just leave things as they were. 

Here’s what the above example would look like after being run through the Find/Change:

![Example of a paragraph with a fixed widow](/blog/images/2012/03/widow-example-fixed.png)

The regular expression will also only match words that are up six characters or less and have punctuation (.!?) after them. Longer words should look fine on a line by themselves. It checks for punctuation because you may not want to worry about widows in text that isn’t made up of proper sentences, like a headline or other large display type.

*Tip of the hat to [Jarod Sutphin](http://jarodsutphin.com/) for giving me the idea to figure this out.*