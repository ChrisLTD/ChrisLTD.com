---
layout: post
title: Testing AJAX calls with QUnit
---
The [QUnit](http://api.qunitjs.com/asyncTest/) JavaScript testing framework has the ability to run tests on asynchronous code[^async] using `asyncTest`. In this post, I’ll walk you through running a simple test on an AJAX call.

## Setup
Since we’re testing AJAX calls, the tests will need to be run on a local or remote webserver[^server]. On your server create three files: `test-response.html`, `tests.html` and `tests.js`.

We will be calling `test-response.html` using AJAX from our `tests.html` file. We’ll need the `test-response.html` file filled with some sample content:

{% highlight html %}
<html>
<head>
  <title>Test Page</title>
</head>
<body>
	<h1>My Test Page</h1>
</body>
</html>
{% endhighlight %}

Our `tests.html` is where we will run the actual QUnit tests. It will need to load the jQuery and QUnit framework files as well as our `tests.js` file. This is the minimum required markup:

{% highlight html %}
<html>
<head>
  <title>Test</title>
  <link rel="stylesheet" href="//code.jquery.com/qunit/qunit-1.14.0.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="//code.jquery.com/qunit/qunit-1.14.0.js"></script>
  <script src="tests.js"></script>  
</body>
</html>
{% endhighlight %}

In `tests.js` let’s add a sample synchronous test just to make sure we’ve got everything setup correctly:

{% highlight js %}
test('Example test', function(){
	equal(1, 1, 'One is one');
})
{% endhighlight %}

Now, visit `tests.html`, and if everything is working correctly you should see that your example test passed.

![QUnit example test passed](/blog/images/2014/04/qunit-example.png)

## AJAX test

Above your example test, add this `asyncTest` that will pull in `test-response.html` through AJAX and read the `<title>` tag of the page. If the title matches ‘Test Page’ we know it’s working properly:

{% highlight js %}
asyncTest('AJAX tests', function(){
	expect(1); // we have one async test to run
	
	var xhr = $.ajax({
		type: 'GET',
		url: 	'test-response.html'
	})
	.always(function(data, status){
		var $data = $(data);
		var pageTitle = $data.filter('title').text();
		equal(pageTitle, 'Test Page', 'Title of test-response.html should be \'Test Page\'');
		start(); // we have our answer for this assertion, continue testing other assertions
	});

});
{% endhighlight %}

Refresh `tests.html` and confirm that the test is passing[^fun].

![QUnit AJAX and example tests passed](/blog/images/2014/04/qunit-ajax.png)

## expect() and start()

Two key, and not entirely self-evident, components of an `asyncTest` are `expect()` and `start()`. Inside of an `asyncTest` you can test multiple [assertions](http://api.qunitjs.com/category/assert/), and QUnit needs to know how many it should wait for before running the next test. In the example, we’re only testing one assertion, `equal()`, so we pass 1 to `expect()`.

Calling `start()` tells QUnit to move on to the next assertion or test. If we remove `start()` from our code, QUnit hangs:

![QUnit stuck waiting](/blog/images/2014/04/qunit-hang.png)

## Learning more

If you want to learn more about QUnit, be sure to check out their [Cookbook](http://qunitjs.com/cookbook/) and [API documentation](http://api.qunitjs.com/).

[^async]: Asynchronous code lets a computer run other code while waiting for result of something that may take a while to finish. For example, in when using [AJAX](https://en.wikipedia.org/wiki/Ajax_%28programming%29) in web development, you can let the user continue to scroll around and use your page while waiting for the server to return new data.

[^server]: For security purposes, browsers will not process AJAX calls from one local file to another.

[^fun]: For fun, you can change the `<title>` tag on `test-response.html` and watch the test fail.