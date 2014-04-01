---
layout: post
title: Using AngularJS with Rails 4
---
Using [AngularJS](http://angularjs.org/) with Rails 4 should be pretty simple. Include the AngularJS library in your asset pipeline and start coding away. Unfortunately, it’s not quite that simple. You may have trouble...

## Compressing AngularJS code in your asset pipeline

By default, Rails 4 compresses all of your JavaScript using [UglifyJS](https://github.com/mishoo/UglifyJS). Sadly, UglifyJS clobbers AngularJS files, but the fix[^beryllium] is simple. Go into `config/environments/production.rb` find the `config.assets.js_compressor` line and tell Rails to run the Uglifier without the `mangle` option:

{% highlight ruby %}
config.assets.js_compressor = Uglifier.new(:mangle => false)
{% endhighlight %}

## Processing Angular GET requests

To [increase security](http://stackoverflow.com/questions/9996665/rails-how-does-csrf-meta-tag-work), Rails will only process GET (and other form requests) if they pass along the proper cross-site request forgery (CSRF) token[^jquery]. Rails is also particular about the `Accept` header when returning JSON. You can solve both issues by configuring your app’s global `$httpProvider`:

{% highlight js %}
var app = angular.module('MyApp', []);

app.config(function($httpProvider) {
  var authToken = angular.element('meta[name="csrf-token"]').attr("content");
  $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
});
{% endhighlight %}

In your AngularJS `$http` GET calls, you’ll also need to pass along a specific `Content-Type` header:

{% highlight js %}
$scope.exampleAjax = function(ajaxUrl, var) {
  $http({
    method: 'GET',
    url: ajaxUrl + '?v=' + var,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  }).success(function(data) {
    console.log( data );
  });
};
{% endhighlight %}

## To be continued
        
I’ll be sure to update this post as I learn more about using AngularJS with Rails 4.

[^beryllium]: Big thanks to [Beryllium Work](http://blog.berylliumwork.com/2013/07/tips-on-rails-4-assets-compression-with.html) for that fix.

[^jquery]: If you’re using jQuery, Rails built-in [helper](https://github.com/rails/jquery-ujs/) will do this automatically.