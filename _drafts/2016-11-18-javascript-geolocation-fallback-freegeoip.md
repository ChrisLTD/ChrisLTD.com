---
layout: post
title: JavaScript geolocation with a fallback to Freegeoip
ads: true
---
The geolocation API that modern browsers offer is pretty great and [easy to use](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation). But it has one big downside, browsers present a dialog box asking permission before sending their location:

![Geolocation permission dialog](/blog/images/2016/11/geolocation-permission.png)

I don’t know about you, but I instinctively deny these requests, no matter how benign. I suspect other users do the same thing,

I recently needed to generate a Google Map with multiple markers and popup info windows. Easy, right? The twist was that I also wanted the marker pins to be different colors and I needed the map to auto center.

Mention ES6

Here’s the script I pulled together to make it happen:

```js
'use strict';

const GEOLOCATION_TYPE = {
  GEOPOSITION: 'GEOPOSITION',
  FREEGEOIP: 'FREEGEOIP'
};

class Localizer {

  constructor() {
    // Let's get the ball rolling
    this.getPositionViaGeolocationAPI();
  }

  getPositionViaGeolocationAPI() {

    // check if this browser supports the geolocation API
    var geolocation = null;

    if (window.navigator && window.navigator.geolocation) {
      geolocation = window.navigator.geolocation;
    }

    if (geolocation) {
      // this browser supports geolocation, 
      // ask for permission to get the users info
      // if they deny us, we'll try freegeoip instead
      geolocation.getCurrentPosition((position) => {
        this.foundPosition(position, GEOLOCATION_TYPE.GEOPOSITION);
      }, this.getPositionViaFreegeoip.bind(this));
    } else {
      // this browser doesn't support geolocation 
      // try freegeoip instead
      this.getPositionViaFreegeoip();
    }

  }

  getPositionViaFreegeoip() {

    // Request geolocation from freegeoip using JSONP
    // Using JSONP instead of XMLHttpRequest let's us get around CORS
    this.jsonpSend('https://freegeoip.net/json?callback=handleJSONP', {
        callbackName: 'handleJSONP',
        onSuccess: (json) => {
          if(json && typeof json.latitude !== 'undefined'){
            this.foundPosition(json, GEOLOCATION_TYPE.FREEGEOIP);
          } else {
            this.noPositionAvailable();
            console.log(err);
          }
        },
        onTimeout: () => {
            this.noPositionAvailable();
        },
        timeout: 5
    });

  }

  foundPosition(position, positionType) {

    var latitude, longitude;

    // FREEGEOIP and the geolocation API return differently formatted data
    // this maps between the different return types
    if (positionType == GEOLOCATION_TYPE.GEOPOSITION) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    } else if (positionType == GEOLOCATION_TYPE.FREEGEOIP) {
      latitude = position.latitude;
      longitude = position.longitude;
    } else {
      return;
    }

    console.log(`latitude: ${latitude} longitude: ${longitude}`);

    // calculate distance from Yankee Stadium
    const ys = { latitude: 40.829658, longitude: -73.926187 };
    const distanceFromYS = this.distanceInMetersBetween(latitude, longitude, ys.latitude, ys.longitude);

    console.log(`You are currently ${distanceFromYS} meters from Yankee Stadium`);

  }

  noPositionAvailable() {
    console.log('No position information available.');
  }

  // http://stackoverflow.com/a/13045312/648844
  // 
  // Sample Usage:
  //
  // jsonpSend('some_url?callback=handleStuff', {
  //   callbackName: 'handleStuff',
  //     onSuccess: function(json){
  //     console.log('success!', json);
  //   },
  //   onTimeout: function(){
  //     console.log('timeout!');
  //   },
  //   timeout: 5
  // });
  jsonpSend(src, options) {
    var callback_name = options.callbackName || 'callback',
      on_success = options.onSuccess || function(){},
      on_timeout = options.onTimeout || function(){},
      timeout = options.timeout || 10; // sec

    var timeout_trigger = window.setTimeout(function(){
      window[callback_name] = function(){};
      on_timeout();
    }, timeout * 1000);

    window[callback_name] = function(data){
      window.clearTimeout(timeout_trigger);
      on_success(data);
    };

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src;

    document.getElementsByTagName('head')[0].appendChild(script);
  }

  // http://stackoverflow.com/a/28543001/648844
  distanceInMetersBetween(latitude, longitude, latitude2, longitude2) {
    const dLatitude = (latitude - latitude2) * Math.PI / 180;
    const dLongitude = (longitude - longitude2) * Math.PI / 180;
    const a = 0.5 - Math.cos(dLatitude) / 2 + Math.cos(latitude2 * Math.PI / 180) *
      Math.cos(latitude * Math.PI / 180) * (1 - Math.cos(dLongitude)) / 2;
    return Math.round(6371000 * 2 * Math.asin(Math.sqrt(a)));
  }

}

// Instantiate object
var localizer = new Localizer();
```

If you copy and paste that code into your browser’s console, you should see a result like this:

```
latitude: 38.9036 longitude: -77.4512
You are currently 369241 meters from Yankee Stadium
```


I've put this script on [Github as a Gist](https://gist.github.com/ChrisLTD/263f46a54b240fd9bafc93fbc6fa1f3f) if you’d like to fork it or contribute.

If you want to read more about JavaScript geolocation, [MDN is a great resource](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)