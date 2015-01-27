# What is a Swift optional

By default all [Swift](http://developer.apple.com/swift/) variables must contain a value of the specified type, and can’t be [nil](http://nshipster.com/nil/).

{% highlight text %}
var bestCaptain:String = "Sisko" // this works
bestCaptain = nil                // throws an error
{% endhighlight %}


However, Swift has to work with a lot of Objective-C code and design patterns where variables can and are often set to nil. So, **optionals are variables that can have a value of the specified type, or be nil**.

## Defining optionals

Defining an optional is easy, just add a ?

### Example

## Accessing optionals

Accessing optionals are a bit trickier, and you have a few alternatives you can use depending on the situation.

?

!

If let

## More resources

Swift optionals can be a bit confusing[^me], and a lot of people have tried to explain them:

* [Apple's documentation](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html)
* [Matt Bridges](https://medium.com/@rrridges/swift-optionals-a10dcfd8aab5)
* [Nevan King via Stack Overflow](http://stackoverflow.com/a/24026093)
* [AppCoda](http://www.appcoda.com/beginners-guide-optionals-swift/)


[^me]: I wrote this post to cement my own understanding of optionals.




Swift is designed around type safety
But it has to talk to objective c that contains a lot of unsafe variables


