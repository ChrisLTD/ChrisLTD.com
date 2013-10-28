---
layout: post
title: Stealing jQuery patterns from Bootstrap
---

Before using [Bootstrap](http://getbootstrap.com) I used to bind all of my jQuery event handlers to classes or ID’s like this:

{% highlight js %}
$('#myButton').click(function(event) {
  event.preventDefault();
  // Do something
});
{% endhighlight %}

Now I follow Bootstrap’s lead and bind to [data attributes](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes). This has a couple of big advantages. First, it’s more modular because it keeps your CSS classes and styles separate from your Javascript functionality. Second, it lets you supply an argument, like a target selector, that can help you avoid hardcoding data into your scripts. 

For example, I use this fade toggle click handler in a lot of my projects:

{% highlight html %}
<a href="#" data-fade-toggle=".elementToFade">Fade Toggle</a>

<h4 class="elementToFade">I’m gonna be fading</h4>

<script>
$('[data-fade-toggle]').click(function(event) {
  event.preventDefault();
  $target = $( $(this).data('fade-toggle') );
  $target.fadeToggle();
});
</script>
{% endhighlight %}

With this pattern I can add more fade toggles without touching a line of Javascript, and as [Jeff Atwood says](http://www.codinghorror.com/blog/2007/05/the-best-code-is-no-code-at-all.html), "the best code is no code at all".