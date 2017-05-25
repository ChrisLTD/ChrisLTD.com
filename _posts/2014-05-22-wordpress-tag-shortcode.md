---
layout: post
title: Wordpress shortcode for HTML tags
---
In some circumstances you may need to use HTML tags in the [Wordpress](http://wordpress.org/) content editor. The easiest way is to switch into *Text* mode and add your custom code:

![Wordpress Text mode](/blog/images/2014/05/wordpress-text-mode.gif)

However, you may have users that aren’t comfortable editing raw HTML, or they may get lost without the styling cues of the *Visual* editor. In those cases you can add this [shortcode](http://codex.wordpress.org/Shortcode) to the `functions.php` file in your theme:

```php
<?php
/*
* Tag Shortcode
* Usage: [tag type="span" class="myClass" id="firstSpan"]Lorem ipsum dolor sit amet[/tag]
*/
function tag_shortcode( $atts, $content = null ) {
  extract( shortcode_atts( array(
    'class' => 'shortcode_class',
    'id' => '',
    'type' => 'div',
    'style' => ''
  ), $atts ) );
  return '<' . esc_attr($type) . ' id="' . esc_attr($id) . '" class="' . esc_attr($class) . '" style="' . esc_attr($style) . '">' . do_shortcode($content) . '</' . esc_attr($type) . '>';
}
add_shortcode( 'tag', 'tag_shortcode' );
```

Now you can add HTML tags without leaving *Visual* mode using the `[tag]` shortcode. `[tag]` accepts four optional parameters. The parameter `type` lets you specify the tag, like `a`, `iframe`, or anything else you might need. If you don’t specify `type`, it defaults to `div`. You can use `id` and `class` to set the – you guessed it – id and classes applied to your tag. Lastly, you have `style` if you need to specify an inline style.

`[tag]` can wrap content and as a result does not self-close[^self-close]. You will need to add `[/tag]` somewhere after you open it.

For example, `[tag type="span" class="example-red" id="red-span" style="color: red"]RED TEXT[/tag]` will output `<span class="example-red" id="red-span" style="color: red">RED TEXT</span>`. This is what it would look like in the *Visual* editor:

![Tag shortcode inside the WYSIWYG editor](/blog/images/2014/05/wordpress-tag-example.png)

[^self-close]: Self-closing HTML tags or shortcodes examples would include `<img>` and the Wordpress built-in [`[gallery]` shortcode](http://codex.wordpress.org/Gallery_Shortcode).
