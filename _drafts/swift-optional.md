---
layout: post
title: What is a Swift optional
---

By default all [Swift](http://developer.apple.com/swift/) variables must contain a value of the specified type, and can’t be [nil](http://nshipster.com/nil/).

{% highlight swift %}
var bestCaptain:String = "Sisko" // this works
bestCaptain = nil                // throws an error
{% endhighlight %}

However, Swift has to work with a lot of Objective-C code and design patterns where variables can and are often set to nil. That’s where optionals come in. Optionals are protective wrappers around your variables. The wrapper itself tells you whether or not the variable within is set to nil, but that’s all it says. If the variable inside isn’t nil, and you want to access it, you have to *unwrap* the optional.

## Defining optionals

Defining an optional is easy, just add a `?` to the end of your variable name.

{% highlight swift %}
var myOptional:String? = "I'm an optional, short and stout"
myOptional = nil // totally legal
{% endhighlight %}

## Accessing optionals

Accessing an optional is a bit trickier, and you have a few alternatives you can use depending on the situation.

### Optional binding

The safest way is to access your optional value is use [optional binding](https://developer.apple.com/library/mac/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID333) where you assign the optional value to a constant if it exists.

{% highlight swift %}
if let unwrappedOptional = myOptional {
    println("\(unwrappedOptional)")
} else {
    println("optional was nil")
}
{% endhighlight %}

### Forced unwrapping!

If you’re absolutely sure the value should be there, you can force unwrap the optional by appending a `!` to the variable.

{% highlight swift %}
var myOptionalLowerCase = myOptional!.lowercaseString
println("\(myOptionalLowerCase)")
{% endhighlight %}

If the value is actually nil, your program will crash.

### Optional chaining?

You can use [optional chaining](https://developer.apple.com/library/mac/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-ID245) to access properties and methods of the underlying variable by using a `?`. If the variable is nil, those properties and methods are never accessed, and the statement returns nil.

{% highlight swift %}
myOptional = nil
println("\(myOptional?.lowercaseString)")
{% endhighlight %}

## More resources

Swift optionals can be a bit confusing[^me], and a lot of people have tried to explain them:

* [Apple's documentation](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html)
* [Matt Bridges](https://medium.com/@rrridges/swift-optionals-a10dcfd8aab5)
* [Nevan King via Stack Overflow](http://stackoverflow.com/a/24026093)
* [AppCoda](http://www.appcoda.com/beginners-guide-optionals-swift/)

[^me]: I wrote this post to cement my own understanding of optionals.
