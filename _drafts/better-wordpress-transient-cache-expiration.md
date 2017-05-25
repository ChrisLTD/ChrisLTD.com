---
layout: post
title: Better Wordpress transient cache expiration
---
The Wordpress [transient API](http://codex.wordpress.org/Transients_API) gives us an easy way to temporarily [cache](https://en.wikipedia.org/wiki/Cache_%28computing%29) dynamic data directly in the Wordpress database. Instead of forcing all of your users to wait for the result of an external API call or an especially slow database query, you do it once every so often[^timetoexpire], cache the result and serve the faster cached version to your users.

## The not so good way

This is how the [Wordpress documentation](http://codex.wordpress.org/Transients_API#Complete_Example) suggests you use the transient API:

```php
<?php
// Get any existing copy of our transient data
if ( false === ( $special_query_results = get_transient( 'special_query_results' ) ) ) {
  // It wasn't there, so regenerate the data and save the transient
  $special_query_results = new WP_Query( 'cat=5&order=random&tag=tech&post_meta_key=thumbnail' );
  set_transient( 'special_query_results', $special_query_results, 12 * HOUR_IN_SECONDS );
}

// Use the data like you would have normally...
```

The problem with this approach is that one unlucky user is going to arrive when the cache has expired, and then have to wait for the data to be regenerated.

## The better way

My colleague [William Garcia](https://twitter.com/williameliel) came up with the idea of deferring the regeneration of the cache until after the user has been sent the page. We can do this by using both a Wordpress hook called  [shutdown](http://codex.wordpress.org/Plugin_API/Action_Reference/shutdown) and a second cache that doesn’t expire[^doesnt]:

```php
<?php
// Function to regenerate the data and save the transients
// we need this wrapped in a function so we can use it in a hook later
function special_query(){
  $special_query_results = new WP_Query( 'cat=5&order=random&tag=tech&post_meta_key=thumbnail' );
  set_transient( 'special_query_results' , $special_query_results, 12 * HOUR_IN_SECONDS );
  set_transient( 'special_query_results_no_expire' , $special_query_results, 99 * YEAR_IN_SECONDS );
  return $special_query_results;
}

// Get any existing copy of our transient data
if( false === ( $special_query_results = get_transient( 'special_query_results' ) ) ){
  // It wasn't there, so let's use our forever cache
  if( false === ( $special_query_results = get_transient( 'special_query_results_no_expire' ) ) ){
    // If for some reason our forever cache is missing, run the query
    $special_query_results = special_query();
  } else {
    // Our forever cache exists, but we need to update the data and save the transient on shutdown
    add_action('shutdown', 'special_query');
  }
}
// Use the data like you would have normally...
```

With this approach, none of our users will have to wait for the data to be regenerated. The only downside is that the first user to arrive after the cache has expired will be served stale content.

[^timetoexpire]: How often your cache should expire is entirely dependent on the type of data you’re storing and how often it changes.

[^doesnt]: In my example the cache will eventually expire. In 99 years.
