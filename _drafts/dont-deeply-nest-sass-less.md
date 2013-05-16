---
layout: post
title: Don’t deeply nest your SASS or LESS
---
CSS preprocessors like [SASS](http://sass-lang.com/) and [LESS](http://lesscss.org/) are fantastic tools for helping you write CSS more efficiently. However, one bad thing they enable (and often encourage) is writing deeply nested rules like this:

{% highlight scss %}
header { width: 90%;
  nav { background: #000;
    ul { list-style: none;
      li { float: left;
        a { color: #fff; } 
      }
    }
  }
}
{% endhighlight %}

I’ve written plenty of code just like what you see above, and I’ve come to regret it every time. Deeply nested code is tough to read and it tightly ties your CSS styles to the HTML markup of the page. Ultimately, that means your styles will be hard to maintain and almost impossible to reuse across your site. For instance, if we move the nav element out of the header and into the footer, the nav will be completely unstyled until we change the CSS.

These days, this is how I would rewrite the above code:

{% highlight scss %}

.header { width: 90%; }

.nav { background: #000; }

.nav-list { list-style: none; 
  li { float: left; 
    a { color: #fff; }
  } 
}
{% endhighlight %}

Instead of relying on tag selectors like header and nav[^tagselectors], I use classes that could be used anywhere on a page[^ids]. The .nav selector isn’t nested inside the header tag, so I could move the nav element to another part of the page and this code would still work. 

I still use nesting inside the .nav-list, but only because I’m relatively certain the HTML markup won’t change. Even if it does change from being a ul to some other type of tag, the CSS would need to be rewritten since the styles are specifically changing the default styles of a ul.

[^tagselectors]: Targeting generic tag names like header, nav, and footer is almost never a good idea since they could be used in contexts you haven't anticipated. For instance, a blog page could have an overall header and footer, and then a header and footer for each post.

[^ids]: IDs are fine as selectors if you’re certain you won’t need to reuse the styles. 