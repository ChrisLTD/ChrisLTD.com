---
layout: post
title: Pushing a Rails 4.0.0.rc2 app to Heroku
---
I’m working on a new side project in Rails 4.0.0.rc2 that I wanted to host on [Heroku](https://www.heroku.com/). The [current Heroku documentation](https://devcenter.heroku.com/articles/rails3) for Rails 3 got me most of the way to a working app, but I ran into two problems:

* Rails 4 requires Ruby 1.9.3 or newer. My app failed to work on Heroku's [Cedar stack](https://devcenter.heroku.com/articles/cedar) until I added this line to my `Gemfile`:
{% highlight rb %}
ruby '1.9.3' # If you're running a newer version of Ruby, specify it here
{% endhighlight %}
After changing your `Gemfile` be sure to run `bundle install` again.

* My CSS and Javascript assets would not load even though Heroku wasn’t throwing any errors. I fixed this problem by changing `config.assets.compile` to `true` in my production.rb file:
{% highlight rb %}
config.assets.compile = true
{% endhighlight %}