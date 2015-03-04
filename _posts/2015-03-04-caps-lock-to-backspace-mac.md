---
layout: post
title: Turn your caps lock key into a delete key on your Mac
---

Unless you like to yell at people all day[^chockenberry], you probably don’t use your caps lock key much. But since none of us are perfect, you do probably use your delete key[^backspace] a lot. So, why not save your right pinky some strain, and replace your caps lock with a second delete key?

Here’s how you can do it on a Mac running Yosemite.

## Step 1: Disable your caps lock key

Go into your System Preferences, select the Keyboard pane, and then click the button labeled Modifier Keys. There you can set your caps lock to *No Action*. You’ll likely want to do this for all your keyboards in the Select Keyboard dropdown.

![System Preferences screenshot](/blog/images/2015/03/caps-lock-system-prefs.png)

## Step 2: Download and install Seil

Now we need a way of re-mapping the caps lock key to delete. This is where the freeware app [Seil](https://pqrs.org/osx/karabiner/seil.html.en) comes in[^thanks]. Download and install the version appropriate for your Mac.

## Step 3: Configure Seil

Once you have Seil installed, go ahead and open it. The first option lets you reconfigure the caps lock key. Check the box to activate the caps lock key change, and set the keycode to 51. Once you’ve entered the keycode, it should be ready. You can quit the Seil app now[^seilrunning].

![Seil screenshot](/blog/images/2015/03/caps-lock-seil.png)

## Taking it further

If your hands feel better after moving the delete key, you might want to give [Colemak](http://colemak.com) a try. In fact, I got the idea of replacing caps lock with delete from the [Colemak FAQ](http://colemak.com/FAQ#I_don.27t_have_time_now_to_learn_the_Colemak_layout):

> Even if you decide not to learn [Colemak], I recommend remapping the Caps Lock key to Backspace. That change alone results in a 15%-20% reduction of finger distance on QWERTY. After experiencing the difference perhaps you’ll be more motivated to learn an alternative layout.

I haven’t taken the plunge and switched to Colemak. However, as someone with more than a passing interest in [preventing RSI](http://chrisltd.com/blog/2012/02/preventing-rsi-mac/), I can see the attraction. Colemak, and the better known [Dvorak](https://en.wikipedia.org/wiki/Dvorak_Simplified_Keyboard) layout should reduce typing strain by making your keyboard use more efficient than QWERTY[^qwerty].

[^chockenberry]: OR YOU’RE [CRAIG HOCKENBERRY](https://twitter.com/chockenberry).

[^backspace]: Delete is the Mac equivalent of backspace.

[^thanks]: Big thanks to Takayama Fumihiko for making Seil.

[^seilrunning]: The Seil app doesn’t need to be running for the new key change to work. Seil uses a [kernel extension](https://developer.apple.com/library/mac/documentation/Darwin/Conceptual/KernelProgramming/Extend/Extend.html) that’s always on in the background.

[^qwerty]: The [QWERTY](https://en.wikipedia.org/wiki/QWERTY) layout most of us use was designed with the constraints of 19th century mechanical typewriters in mind.