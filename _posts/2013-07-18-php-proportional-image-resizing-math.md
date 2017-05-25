---
layout: post
title: PHP proportional image resizing math
---
Recently I needed to enlarge and shrink images proportionally[^proportionally] in Wordpress[^wp], so I wrote a couple PHP functions to help with the math[^credit]. In both, you supply the original height and width, and then maximum or minimum dimensions. If the original height and width fit within your maximum or minimum, the functions return `null`, if not they return an array with new proportional dimensions.

```php
<?php
function image_resize_up($orig_w, $orig_h, $MIN_W, $MIN_H){
    $ratio = $orig_w * 1.0 / $orig_h;
 
    $w_undersized = ($orig_w < $MIN_W);
    $h_undersized = ($orig_h < $MIN_H);
    
    if ($w_undersized OR $h_undersized)
    {
          $new_w = round( max($MIN_W, $ratio * $MIN_H) );
          $new_h = round( max($MIN_H, $MIN_W / $ratio) );
          return array('width' => $new_w, 'height' => $new_h);
    }
    return null;
}

function image_resize_down($orig_w, $orig_h, $MAX_W, $MAX_H){
    $ratio = $orig_w * 1.0 / $orig_h;
 
    $w_undersized = ($orig_w > $MAX_W);
    $h_undersized = ($orig_h > $MAX_H);
    
    if ($w_undersized OR $h_undersized)
    {
          $new_w = round( min($MAX_W, $ratio * $MAX_H) );
          $new_h = round( min($MAX_H, $MAX_W / $ratio) );
          return array('width' => $new_w, 'height' => $new_h);
    }
    return null;
}
?>
```

[^wp]: In Wordpress you can use [registered image sizes](http://codex.wordpress.org/Function_Reference/add_image_size) to shrink images proportionally, but there is nothing for enlarging them.

[^proportionally]: Resizing the images proportionally means that they will maintain their original [aspect ratio](https://en.wikipedia.org/wiki/Aspect_ratio_(image%29) and not look distorted.

[^credit]: Extended and modified from [this answer by jon_darkstar on Stack Overflow](http://stackoverflow.com/a/4820929/648844).