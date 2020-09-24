---
layout: post
title: Google Map Polymer web component
---
Google has been doing incredible work to advance the [proposed web component standard](http://www.w3.org/TR/components-intro/) with their [Polymer project](http://www.polymer-project.org). Web components let web developers define their own HTML tags, and Polymer is a framework for creating and using those components[^infoq].

Of [special interest to me](/blog/2013/08/google-map-random-color-pins/) is the [Polymer Google Map component](http://polymerlabs.github.io/google-map/components/google-map/#google-map). Normally, adding custom map widgets to your page is an annoying mix of CSS, Javascript and HTML. Here is a an [example from the Google Maps documentation](https://developers.google.com/maps/documentation/javascript/tutorial#HelloWorld) of how you have to initialize a Google Map today[^mod]:

{% highlight html %}
<style>
  #map-canvas { height: 100% }
</style>
<script src="https://maps.googleapis.com/maps/api/js?key=API_KEY"></script>
<script>
  function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(37.77493, -122.41942),
      zoom: 8
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  }
  google.maps.event.addDomListener(window, 'load', initialize);
</script>
<div id="map-canvas"></div>
{% endhighlight %}

If you’re using Polymer’s Google Map component, the code gets a lot simpler[^pins]:

{% highlight html %}
<style>
  google-map { display: block; height: 100%; }
</style>
<google-map latitude="37.77493" longitude="-122.41942" zoom="8"></google-map>
{% endhighlight %}

See a [demo of the above code](http://polymerlabs.github.io/google-map/components/google-map/demo.html).

If you want to know more, Google engineer [Eric Bidelman](https://twitter.com/ebidel) explains the map component in this video:

<iframe width="400" height="225" src="http://www.youtube.com/embed/eORqFaf_QzM?rel=0" frameborder="0" allowfullscreen="true"> </iframe>

Unfortunately, we can only use Polymer on [bleeding edge browsers](http://www.polymer-project.org/resources/compatibility.html), but I look forward to using it and web components in the future.

[^infoq]: InfoQ has a solid [primer on web components and Polymer](http://www.infoq.com/news/2013/05/webcomponents).

[^mod]: I modified the example code slightly for brevity.

[^pins]: [Adding pins and popup windows](http://polymerlabs.github.io/google-map/components/google-map/#google-map-marker) is also pretty easy.
