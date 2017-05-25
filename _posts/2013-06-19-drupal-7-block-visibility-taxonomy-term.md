---
layout: post
title: Display blocks on nodes tagged with a taxonomy term in Drupal 7
---
In [Drupal 7](https://drupal.org) it is pretty easy to display or not display blocks on specific nodes. It gets more tricky if you want to display blocks according to other criteria, like nodes tagged with a taxonomy term. In that case you can use this bit of PHP in your block visibility settings:

```php
<?php
$term_id_to_trigger_show_block = 2; // show this block on nodes with this term id.
$taxonomy_to_search = "taxonomy_vocabulary_2"; // The machine name of the taxonomy to search for the terms
$make_block_visible = FALSE;

// Show block on Taxonomy term listing page
if ((arg(0) == 'taxonomy') && (arg(1) == 'term') && (arg(2) == $term_id_to_trigger_show_block)) {
  $make_block_visible = TRUE;
}

// Show this block on nodes with the right term id 
if (arg(0) == 'node' && arg(1) && is_numeric(arg(1))) {
  $node_obj = node_load(arg(1));
  $taxonomy = $node_obj->$taxonomy_to_search;
  foreach ($taxonomy['und'] as $term) {
    if ($term['tid'] == $term_id_to_trigger_show_block) {
      $make_block_visible = TRUE;
    }
  }
}

return $make_block_visible;
?>
```

This code will also display the block on taxonomy term list pages. Just be sure to change the `$term_id_to_trigger_show_block` to the taxonomy term ID you want to match and the `$taxonomy_to_search` to the machine name of the taxonomy you want to search[^help]. Also, when you put this in your block visibility settings, make sure you have the radio button set to “Pages on which this PHP code returns TRUE”:

![Drupal 7 Block Settings](/blog/images/2013/06/drupal-7-block-settings.png)

[^help]: You can find this information in the admin under Structure / Taxonomy.