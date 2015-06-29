---
layout: post
title: Detecting Windows with JavaScript and CSS
---
Recently, I wanted Microsoft Windows users to see different CSS styles from users on other platforms. [^font] My solution was to use JavaScript to add the class `windows` to the root `html` element if the user was on Windows and `not-windows` if they weren’t. With that class in place, I could write platform specific CSS.

The JavaScript is simple, all it has to do is check the handy `navigator.platform` property for the substring `win`, and add the class to the `html` element depending on the result. 

Here’s the working script I added to my HTML document `<head>` above my CSS styles [^abovecss]:

{% highlight html %}
<script>
// add html class if we're on windows
var htmlEl = document.getElementsByTagName("html")[0];
var className = "not-windows";
if( typeof navigator.platform !== 'undefined' && navigator.platform.match(/win/i) ){
  className = "windows";
}
if (htmlEl.classList){
  htmlEl.classList.add(className);
}
else {
  htmlEl.className += ' ' + className;
}
</script>
{% endhighlight %}

With that JavaScript in place I could write CSS code like this:

{% highlight css %}
/* Use Comic Sans on Windows and Helvetica Neue everywhere else */
.windows body {
  font-family: 'Comic Sans MS', sans-serif;
}
.not-windows body {
  font-family: 'Helvetica Neue', Arial;
}
{% endhighlight %}

[^font]: Windows was garbling a custom web font that Mac OS X, iOS, and Linux had no trouble displaying. It didn’t matter what browser you were using.

[^abovecss]: If the JavaScript was loaded after the CSS, visitors might see odd styling flashes when the `windows` or `not-windows` class is added.