---
layout: post
title: Custom sorting Wordpress taxonomy terms
---
Using Wordpress’s [`get_terms`](http://codex.wordpress.org/Function_Reference/get_terms) function, you can retrieve an array of taxonomy terms[^terms] sorted by sorted by name (the default), id, count, or slug. If you want more control over sorting, you can hijack the description field[^description] and sort by it using PHP’s [`usort`](http://php.net/manual/en/function.usort.php) function.

The first step is populating our term description fields with values we can use to sort. Numbers are the easy choice:

![Wordpress term list](/blog/images/2014/09/wordpress-term-list.png)

Next up, we need pull in the list of terms in our template:

{% highlight php %}
<?php $terms = get_terms( 'my_custom_taxonomy' ); ?>
{% endhighlight %}

Then we need to define a comparison function[^comparison] to compare the numerical values of the description fields:

{% highlight php %}
<?php
function description_compare( $a, $b ) {
  return $a->description - $b->description;
}
?>
{% endhighlight %}

Finally, we need to sort our array using the comparison function:

{% highlight php %}
<?php usort($resource_terms, "description_compare"); ?>
{% endhighlight %}

Now, when you loop through the `$terms` array, it should be in the order you defined in your description fields. Here’s an example of how you could output the terms:

{% highlight php %}
<?php foreach( $terms as $term ): ?>
  <a href="<?php get_term_link( $term ) ?>"><?php echo $term->name ?></a>
<?php endforeach; ?>
{% endhighlight %}

[^terms]: A taxonomy term is the generic name for category or tag. Categories and tags are examples of taxonomies.

[^description]: I rarely use the description field for taxonomy terms, so using it for something else is not a problem.

[^comparison]: From the [PHP documentation](http://php.net/manual/en/function.usort.php#refsect1-function.usort-parameters): “The comparison function must return an integer less than, equal to, or greater than zero if the first argument is considered to be respectively less than, equal to, or greater than the second.”
