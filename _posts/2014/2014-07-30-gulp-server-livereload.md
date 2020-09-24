---
layout: post
title: 'Gulp: Running a local server with Tiny LiveReload'
ads: true
---
This is my [Gulp](http://gulpjs.com)[^whygulp] recipe for compiling [SASS](http://sass-lang.com) into CSS, loading a local web server, and refreshing the browser when the SASS files are changed and recompiled. To follow along, you’ll need at least an introductory understanding of Gulp. If you need a basic primer, check out the [official documentation](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) or [this excellent blog post from Mark Goodyear](http://markgoodyear.com/2014/01/getting-started-with-gulp/).

## The plugins we’ll need

* **[gulp-webserver](https://github.com/schickling/gulp-webserver)** — Runs the local webserver and sets up Tiny LiveReload
* **[gulp-sass](https://github.com/dlmanning/gulp-sass)** — Compiles SCSS into CSS files
* **[gulp-plumber](https://github.com/floatdrop/gulp-plumber)** — Keeps Gulp watch from dying when one of the tasks has an error
* **[Node opn](https://github.com/sindresorhus/opn)** — Opens your browser to view the webserver

## Installing the plugins

Assuming you have [Node](http://nodejs.org) and Gulp installed, navigate to your project folder in the terminal and run this command to install the plugins[^savedev]:

{% highlight text %}
npm install gulp-webserver gulp-sass gulp-sass gulp-plumber opn
{% endhighlight %}

## Create your project files

Our example `gulpfile.js` expects a [basic project structure](https://github.com/ChrisLTD/gulp-playground/tree/1.0). We have an `index.html` and `gulpfile.js` file in our root, a `scss` folder for our `styles.scss` source file, and a `css` folder for our compiled SCSS:

![Directory structure](/blog/images/2014/07/gulp-folder.png)

Go ahead and put some actual SCSS into `styles.scss` and HTML into `index.html`.

## The gulpfile.js

{% highlight js %}
var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var sass      = require('gulp-sass');
var webserver = require('gulp-webserver');
var opn       = require('opn');

var sourcePaths = {
  styles: ['scss/**/*.scss']
};

var distPaths = {
  styles: 'css'
};

var server = {
  host: 'localhost',
  port: '8001'
}

gulp.task('sass', function () {
  gulp.src( sourcePaths.styles )
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest( distPaths.styles ));
});

gulp.task('webserver', function() {
  gulp.src( '.' )
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
  gulp.watch(sourcePaths.styles, ['sass']);
});

gulp.task('build', ['sass']);

gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);
{% endhighlight %}

# Running gulp

If you’ve done everything right up to this point, you should be able to run `gulp`[^default], and your browser will open to your newly spawned local server. Try changing and saving the `styles.scss` and watch the browser reload the stylesheet automatically.

You can download a complete [example project from Github](https://github.com/ChrisLTD/gulp-playground/tree/1.0).

[^whygulp]: A few months back [I joked](/blog/2014/05/keep-up-web-development/) about dropping [Grunt](http://gruntjs.com/) in favor of Gulp, and now I have. The syntax is significantly more [understandble](http://www.100percentjs.com/just-like-grunt-gulp-browserify-now/).

[^savedev]: Adding `--save-dev` to the end of the npm install command will add your new modules to the [package.json](http://docs.nodejitsu.com/articles/getting-started/npm/what-is-the-file-package-json) file in your project.

[^default]: Running `gulp` without any options calls the `default` task we defined at the end of the gulpfile.
