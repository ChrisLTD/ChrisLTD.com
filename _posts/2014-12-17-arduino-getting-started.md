---
layout: post
title: Getting started with Arduino
---
For years I’ve wanted to try my hand at [physical computing](http://en.wikipedia.org/wiki/Physical_computing). I spend the majority of my waking hours writing code for websites in [high-level languages](http://en.wikipedia.org/wiki/High-level_programming_language)[^php], and I thought it would be refreshing and educational to get “closer to the metal”. After prodding from my colleague [Hart Liddell](https://twitter.com/hartliddell), I ordered an [Arduino Starter Kit](http://www.amazon.com/dp/B00BT0NDB8/?tag=chrisltd-20) and started going through the example projects.

An [Arduino](http://en.wikipedia.org/wiki/Arduino) kit, at the most basic level, is a simple programmable computer that you can combine with [components](http://store.arduino.cc/category/6) like lights, speakers, and buttons[^kits]. For example, in the first project from the [starter kit I purchased](http://www.amazon.com/dp/B00BT0NDB8/?tag=chrisltd-20), the included book walks you through wiring up an Arduino board to make an LED blink at an interval set with a bit of C code.

{% highlight c %}
void setup() {
  // Set up pin 13 (the one connected to a LED)
  // to be an output
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);   // Turn on the LED
  delay(1000);              // Wait for one second
  digitalWrite(13, LOW);    // Turn off the LED
  delay(1000);              // Wait for one second
}
{% endhighlight %}

This is the result:

![Blinking LED](/blog/images/2014/12/arduino-blink.gif)

Other projects from the kit are a bit more complex. In other lesson you learn how to speed up the blinking LED with a [potentiometer](http://en.wikipedia.org/wiki/Potentiometer), play a tune on a speaker, read the temperature from a temperature sensor, and more.

Arduino is an inexpensive way to learn about electronic circuits and programming, and I wouldn’t hesistate recommnending it to anyone that’s interested in physical computing. To get started, all you’ll need is a decent kit, and a computer that can upload programs to the Arduino board through a USB port. No soldering required!

[^php]: PHP may not always seem like a high-level language.

[^kits]: Different kits come with different components.