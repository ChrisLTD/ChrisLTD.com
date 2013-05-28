---
layout: post
title: Asynchronous functions in Wordpress
---
Last Tuesday I went to the [local Wordpress Meetup](http://wpnyc.org/) where [Jack Reichert](http://www.jackreichert.com/) gave an excellent talk on [using Wordpress actions and filters](http://www.jackreichert.com/2013/05/22/turning-tricks-using-action-and-filter-hooks-in-wordpress/). In one especially clever example, he combined an [action](http://codex.wordpress.org/Plugin_API/Action_Reference) with [wp_schedule_single_event()](http://codex.wordpress.org/Function_Reference/wp_schedule_single_event) to run a bit of code asynchronously:

{% highlight php %}
<?php
function MY_CRON(){
  wp_schedule_single_event(time(), 'MY_ACTION');
}
add_action('save_post', 'MY_CRON');
 
function MY_FUNCTION(){
  // YOUR CODE HERE
}
add_action('MY_ACTION', 'MY_FUNCTION');
{% endhighlight %}

After a post is saved, MY_FUNCTION() is scheduled to run the next time Wordpress’s pseudo-cron system is activated[^cron]. This would be useful if MY_FUNCTION() was going to do something that would take a long time[^examples]. Instead of forcing the user to wait for MY_FUNCTION() to finish, they’ll see that the post saved immediately and can go about their business. 

This example uses save_post, but you could tie it to any of the [other Wordpress actions](http://codex.wordpress.org/Plugin_API/Action_Reference) that are available.

[^cron]: Wordpress’s pseudo-cron is run when a page is loaded on your site. If you get low traffic, your cron jobs may not be run anytime close to when you intended. You can use a plugin like [Cron View](http://wordpress.org/plugins/cron-view/) to see what’s scheduled.

[^examples]: Anything involving data transfers with another server would be a good candidate.