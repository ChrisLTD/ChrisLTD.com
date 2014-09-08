---
layout: post
title: Custom sorting Wordpress taxonomy terms
---
Using Wordpress’s [`get_terms`](http://codex.wordpress.org/Function_Reference/get_terms) function, you can retrieve an array of taxonomy terms[^terms] sorted by name (the default), id, count, or slug. If you need more control, you can hijack the term description field[^description] and use it for sorting.

The first step is populating our term description fields with values we can use for sorting. Numbers are the easy choice and in this example, lower numbers will be sorted ahead of higher numbers:

![Wordpress term list](/blog/images/2014/09/wordpress-term-list.png)

In our theme we’ll need to pull in the array of terms with `get_terms`. Be sure to replace `my_custom_taxonomy` with your taxonomy name:

{% highlight php %}
<?php $terms = get_terms( 'my_custom_taxonomy' ); ?>
{% endhighlight %}

Next, we need to define a comparison function[^comparison] that we’ll use with PHP’s [`usort`](http://php.net/manual/en/function.usort.php) to compare the numerical values of the description fields:

{% highlight php %}
<?php
function description_compare( $a, $b ) {
  return $a->description - $b->description;
}
?>
{% endhighlight %}

Finally, we can sort our array using `usort` with our comparison function:

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
