# Getting into Arduino

For years I’ve wanted to try my hand at [physical computing](http://en.wikipedia.org/wiki/Physical_computing). I spend the majority of my waking hours writing code for websites in (high-level languages)[http://en.wikipedia.org/wiki/High-level_programming_language], and I thought it would be refreshing and educational to get “closer to the metal”. After prodding by my colleague [Hart Liddell](http://www.leapingfish.io), I ordered an [Arduino Starter Kit](http://www.amazon.com/dp/B00BT0NDB8/?tag=chrisltd-20).

An [Arduino](http://en.wikipedia.org/wiki/Arduino) kit, at the most basic level, is a simple programmable computer that you can combine with [components](http://store.arduino.cc/category/6) like lights, speakers, and buttons. For example, in the first project from the [starter kit I purchased](http://www.amazon.com/dp/B00BT0NDB8/?tag=chrisltd-20), the included book walks you through wiring up an Arduino board to make an LED blink at an interval set with a bit of C code.

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

![Blinking LED](//raw.githubusercontent.com/ChrisLTD/ChrisLTD.com/master/blog/images/2014/12/arduino-blink.gif)

In future projects from the kit, I’ll learn how to speed up the blinking LED with a [potentiometer](http://en.wikipedia.org/wiki/Potentiometer), play a tune on a speaker, read the temperature from a temperature sensor, and more.

Arduino is an inexpensive way to learn about electronic circuits and programming, and I wouldn’t hesistate recommnending it to anyone that’s interested. To get started, all you’ll need is a decent Arduino kit, and a computer that can upload programs to the Arduino board through a USB port. No soldering required!