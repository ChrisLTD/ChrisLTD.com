---
layout: post
title: Testing for input placeholder support in Javascript
---
HTML5 brought us the ability to [natively set placeholder values](http://diveintohtml5.info/forms.html#placeholder) inside form inputs. However, we do need fallbacks for old browsers that don’t [support the placeholder attribute](http://caniuse.com/input-placeholder), and that means checking for support with Javascript.

In this example, we’re going to hide the `<label>` tag if the browser has placeholder support, otherwise display it normally[^natively]. We’ll do this by adding a class to the `<html>` tag if the browser supports the placeholder attribute[^modernizr]. Then we can write CSS that only applies when that class exists.

Here’s the plain ol’ Javascript code for adding either a *placeholder* or *no-placeholder* class to the  `<html>` element depending on support:

```javascript
var htmlEl = document.getElementsByTagName('html');
htmlEl = htmlEl[0]; // first result is the html tag
var inputTest = document.createElement('input');
if( inputTest.hasOwnProperty('placeholder') ) {
  htmlEl.className += ' ' + 'placeholder';
} else {
  htmlEl.className += ' ' + 'no-placeholder';
}
```

What we’re doing with this code is creating an `<input>` element[^notvisible], and then checking to see if it has a placeholder property using Javascript’s [hasOwnProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) method. Even if an element has no placeholder set or an empty placeholder, this will return `true` when the browser supports the placeholder attribute[^homework].

If you’re using [jQuery](http://jquery.com), we can shorten the code a bit by using jQuery’s selector engine and [addClass](http://api.jquery.com/addClass/) method:

```javascript
var inputTest = document.createElement('input');
if( inputTest.hasOwnProperty('placeholder') ) {
  $('html').addClass('placeholder');
} else {
  $('html').addClass('no-placeholder');
}
```

With the Javascript in place we can use this bit of CSS and HTML:

```html
<style>
  .placeholder .hide-label { display: none; }
</style>

<label class="hide-label" for="your-name">Your Name</label>
<input type="text" name="your-name" id="your-name">
```

In this case we’re only hiding labels that have the class *hide-label* and are inside a tag – in this case `<html>` – with the class *placeholder*[^options].

Once all the code is in place, you should see these results depending on your browser:

![Results](/blog/images/2014/06/placeholder-comparison.png)

[^natively]: If you need placeholders to work in old browsers, you can [use Javascript to mimic](https://github.com/mathiasbynens/jquery-placeholder) the new native functionality.

[^notvisible]: Don’t worry, this input won’t be visible on the page unless we add it to the document using something like the [appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node.appendChild) method.

[^modernizr]: My first thought was to use [Modernizr](http://modernizr.com/), but Modernizr doesn’t add classes to the HTML tag for input attribute support.

[^homework]: Test this out on your own. Create an empty `img` tag and see if it supports `src`.

[^options]: If we wanted to, we could also create styles that only apply when the *no-placeholder* class is present.
