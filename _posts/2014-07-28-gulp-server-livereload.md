---
layout: post
title: Gulp, running a local server with Tiny LiveReload
---
This is my [Gulp](http://gulpjs.com) recipe for compiling [SASS](http://sass-lang.com) into CSS, loading a local web server, and refreshing the browser when the SASS files are changed and recompiled. If you need a basic primer on Gulp, check out the [official documentation](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) or [this excellent blog post from Mark Goodyear](http://markgoodyear.com/2014/01/getting-started-with-gulp/).

## The plugins we’ll need

* **[gulp-webserver](https://github.com/schickling/gulp-webserver)** — Runs the local webserver and sets up Tiny LiveReload
* **[gulp-sass](https://github.com/dlmanning/gulp-sass)** — Compiles SASS and SCSS into CSS files
* **[gulp-plumber](https://github.com/floatdrop/gulp-plumber)** — Keeps Gulp watch from dying when one of the tasks has an error
* **[Node opn](https://github.com/sindresorhus/opn)** — Opens your browser to the server

## Installing the plugins

Assuming you have [Node](http://nodejs.org) and Gulp installed, navigate to your project folder in the terminal and run this command to install the plugins:

{% highlight text %}
npm install gulp-webserver gulp-sass gulp-sass gulp-plumber opn
{% endhighlight %}

## Create your project files

Our example `gulpfile.js` expects an extremely basic project structure. We have an `index.html` and `gulpfile.js` file in our root, a `scss` folder for our `styles.scss` source file, and a `css` folder for our compiled SASS:

![Directory structure](/blog/images/2014/07/gulp-folder.png)

Go ahead and put some actual SCSS into `styles.scss` and HTML into `index.html`.

## The gulpfile.js

{% highlight js %}
var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var less      = require('gulp-less');
var webserver = require('gulp-webserver');
var opn       = require('opn');

var sourcePaths = {
  styles: ['./less/**/*.less']
};

var distPaths = {
  styles: './css'
};

var server = {
  host: 'localhost',
  port: '8001'
}

gulp.task('less', function () {
  gulp.src( sourcePaths.styles )
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest( distPaths.styles ));
});

gulp.task('webserver', function() {
  gulp.src( './' )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port );
});

gulp.task('watch', function(){
  gulp.watch(sourcePaths.styles, ['less']);
});

gulp.task('default', ['less', 'templates']);

gulp.task('serve', ['webserver', 'watch', 'openbrowser']);
{% endhighlight %}

# Run gulp

If you’ve done everything right up until this point, you should be able to run `gulp`, and your browser will open to your new local server. Try changing and saving the `styles.scss` and watch the browser reload the stylesheet automatically.

The [Gulp](http://gulpjs.com) world can be a bit scary[^scary] because of the plethora of available [plugins](http://gulpjs.com/plugins/) and [Node modules](https://www.npmjs.org). You may have an idea of what you want to accomplish, but combining the plugins into something useable is a bit of bear. With that in mind, this is my Gulp recipe for compiling [SASS](http://sass-lang.com) into CSS, loading a local web server, and refreshing the browser when the SASS files are changed and recompiled.

[^scary]: A few months back [I joked](/blog/2014/05/keep-up-web-development/) about dropping [Grunt](http://gruntjs.com/) in favor of Gulp, and now I have. The syntax is significantly more [understandble](http://www.100percentjs.com/just-like-grunt-gulp-browserify-now/).
