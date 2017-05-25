---
layout: post
title: Using AngularJS with Rails 4
ads: true
---
Using [AngularJS](http://angularjs.org/) with Rails 4 should be pretty easy. Include the AngularJS library in your asset pipeline and start coding away. Unfortunately, it’s not quite that simple. You may have trouble...

## Compressing AngularJS code in your asset pipeline

By default, Rails 4 compresses all of your JavaScript using [UglifyJS](https://github.com/mishoo/UglifyJS). Sadly, UglifyJS clobbers AngularJS files, but the fix is a snap[^beryllium]. Go into `config/environments/production.rb` find the `config.assets.js_compressor` line and tell Rails to run the Uglifier without the `mangle` option:

```ruby
config.assets.js_compressor = Uglifier.new(:mangle => false)
```

## Processing Angular GET requests

To [increase security](http://stackoverflow.com/questions/9996665/rails-how-does-csrf-meta-tag-work), Rails will only process GET (and other form requests) if they pass along the proper cross-site request forgery (CSRF) token[^jquery]. Rails is also particular about the `Accept` header when returning JSON. You can solve both issues by configuring your app’s global `$httpProvider`:

```js
var app = angular.module('MyApp', []);

app.config(function($httpProvider) {
  var authToken = angular.element('meta[name="csrf-token"]').attr("content");
  $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
});
```

In your AngularJS `$http` GET calls, you’ll also need to pass along a specific `Content-Type` header:

```js
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
```

## Playing nice with Turbolinks

If you’re going to leave [Turbolinks](https://github.com/rails/turbolinks) enabled, you’ll need a way of [re-bootstrapping](http://docs.angularjs.org/guide/bootstrap) your app after the new page content is loaded in[^turbofix]. Turbolinks has an event for this named `page:load` we can bind to after we define our Angular app:

```js
var app = angular.module('MyApp', []);

$(document).on('ready page:load', function(){
  angular.bootstrap(document.body, ['MyApp']);
});
```

Now that we’re bootstrapping our app in our JavaScript, we need to remove the `ng-app` bootstrap directive from our HTML. So this:

```html
<body ng-app="MyApp">
```

Can just be:

```html
<body>
```

## To be continued
        
I’ll be sure to update this post as I learn more about using AngularJS with Rails 4.

[^beryllium]: Big thanks to [Beryllium Work](http://blog.berylliumwork.com/2013/07/tips-on-rails-4-assets-compression-with.html) for the fix.

[^jquery]: If you’re using jQuery, Rails built-in [helper](https://github.com/rails/jquery-ujs/) will do this automatically.

[^turbofix]: Thanks for fiedl and skalb on [StackOverflow](http://stackoverflow.com/a/15488920/648844) for the Turbolinks fix.