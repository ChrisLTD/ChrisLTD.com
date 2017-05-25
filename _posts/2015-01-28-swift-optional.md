---
layout: post
title: What is a Swift optional
---

By default all [Swift](http://developer.apple.com/swift/) variables must contain a value of the specified type[^init], and can’t be [nil](http://nshipster.com/nil/).

```swift
var bestCaptain:String = "Sisko" // this works
bestCaptain = nil                // throws an error
```

However, Swift has to work with a lot of Objective-C code and design patterns[^patterns] where variables can and are often set to nil. That’s where optionals come in. Optionals are protective wrappers around your variables. The wrapper itself tells you whether or not the variable within is set to nil, but that’s all it says. If the variable inside isn’t nil, and you want to access it, you have to *unwrap* the optional.

## Defining optionals

Defining an optional is easy, just add a `?` to the end of your variable name.

```swift
var myOptional:String? = "I'm an optional, short and stout"
myOptional = nil // totally legal
```

## Accessing optionals

Accessing an optional is a bit trickier, and you have a few alternatives you can use depending on the situation.

### Optional binding

The safest way to access your optional value is with [optional binding](https://developer.apple.com/library/mac/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID333). In optional binding, you assign the optional value to a constant if the optional value is not nil.

```swift
if let unwrappedOptional = myOptional {
    print("\(unwrappedOptional)")
} else {
    print("optional was nil")
}
```

### Forced unwrapping!

If you’re absolutely sure the value should be there, you can force unwrap the optional by appending a `!` to the variable.

```swift
var myOptionalLowerCase = myOptional!.lowercaseString
print("\(myOptionalLowerCase)")
```

If the value is actually nil, your program will crash.

### Optional chaining?

You can use [optional chaining](https://developer.apple.com/library/mac/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-ID245) to access properties and methods of the underlying variable by using a `?`. If the variable is nil, those properties and methods are never accessed, and the statement returns nil.

```swift
myOptional = nil
print("\(myOptional?.lowercaseString)") // prints nil
```

## More resources

Swift optionals can be a bit confusing[^me], and a lot of other people have tried to explain them:

* [Apple's documentation](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html)
* [Matt Bridges](https://medium.com/@rrridges/swift-optionals-a10dcfd8aab5)
* [Nevan King via Stack Overflow](http://stackoverflow.com/a/24026093)
* [AppCoda](http://www.appcoda.com/beginners-guide-optionals-swift/)

Big thanks to [Scott Williams](http://swilliams.me) for his valuable feedback on this post. Check out [his blog](http://blog.swilliams.me).

[^init]: Non-optional variables can be declared without a value, but can’t be set to nil. Non-optional [instance variables](http://en.wikipedia.org/wiki/Instance_variable) need to have a value set in the object’s init method.

[^patterns]: Objects from the [Cocoa](http://en.wikipedia.org/wiki/Cocoa_Touch) [libraries](http://en.wikipedia.org/wiki/Cocoa_%28API%29) often use [Implicitly Unwrapped Optionals](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/doc/uid/TP40014097-CH31-ID453).

[^me]: I wrote this post to cement my own understanding of optionals.