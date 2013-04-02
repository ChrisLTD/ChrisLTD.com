---
layout: post
title: Preventing Repetitive Strain Injury (RSI) on a Mac
class: blog
---
*I am not a medical doctor, and have no medical training. The advice in this post should not be taken as a substitute for obtaining professional medical treatment.*

When I was a teenager I thought I spent a lot of time on the computer. I played computer games, browsed the web, and chatted online. However, once I graduated from college and took a job as a full-time web designer, I *really* started using the computer a lot. We’re talking more than 10 hours a day. When I was in school I could really only be at my computer when I wasn’t in class, which meant my computer use was relegated to a few hours at night and on weekends. But now, being on the computer was my job, **and** it was how I spent my free time.

Things were fine for a while. My body didn’t seem to complain much, then **bam**, two years ago I started experiencing pain in my neck, shoulders, jaw, wrists and elbows. I had [repetitive strain injuries or RSI](https://en.wikipedia.org/wiki/Repetitive_strain_injury). The best thing to do when faced with RSI is to stop doing whatever it is that’s causing the injury, but I didn’t want to quit working (I quite like designing and programming). With that said, I did immediately cut back on the amount of time I spent on the computer during off hours. That helped a little, but I still needed some strategies and help to get me through the working hours on my Mac without turning into [this guy](https://en.wikipedia.org/wiki/Quasimodo). 

Here’s what’s helped:

## Taking frequent breaks

<a href="http://itunes.apple.com/us/app/antirsi/id442007571?mt=12&amp;partnerId=30&amp;siteID=cxyf8xxWmGo"><img src="/blog/images/2012/02/antirsi-icon.png" alt="AntiRSI Icon" class="alignright"></a>

I avoid locking my muscles in the same position for too long. Every hour I get up, move around, and stretch. If I’m feeling really tense, I’ll take a walk. Since it’s easy to forget to take a break – especially when you’re deeply concentrating on a task – I use a lightweight utility called [AntiRSI](http://itunes.apple.com/us/app/antirsi/id442007571?mt=12&amp;partnerId=30&amp;siteID=cxyf8xxWmGo). AntiRSI runs in the background and prompts you take short 13 second breaks every four minutes, and then longer eight minute breaks every 50 minutes. It also keeps track of when you’re not using your mouse or keyboard, so it can reset the timers accordingly. For instance, if you leave your desk for 30 minutes, when you come back and sit down you won’t be immediately prompted to take a break.

## Sitting on a yoga ball

My posture at the computer is terrible. When I get really into a task, I’m prone to lean in toward the computer and get into all sorts of weird pretzel positions. I had hoped buying a [Herman Miller](http://www.hermanmiller.com/) chair would help, but nothing really forced me to sit right like a [$20 yoga ball](https://www.amazon.com/dp/B000VDTEDA/ref=as_li_ss_til?tag=chrisltd-20&camp=0&creative=0&linkCode=as4&creativeASIN=B000VDTEDA&adid=0VSTD2SBMCQDSXMMXA6Y&). My core isn’t quite as strong as it should be yet, so I can’t sit on the ball all day without some back pain, so I switch between it and a regular desk chair every few hours.

## Using a small keyboard to keep the mouse in easy reach

To keep my mouse arm from straining too much, I’ve switched to using the [Apple Keyboard without the number pad](http://amzn.com/B005DLDO4U). This means the keyboard can be centered in front of me, and the mouse can be just to the right of it [^switch]. Having he number pad would force me to keep my mouse further to the right than is comfortable.

## Using keyboard shortcuts

Another way I prevent the strain of using the mouse is to avoid using it when possible. In some programs, like Photoshop, you can’t help but use a mouse, but in others – like text editors – you can be more productive by using nothing but the keyboard. Most Mac apps have a healthy set of predefined keyboard shortcuts, which you can often learn by just looking at the dropdown menus. If I find myself using a toolbar icon or dropdown command over and over again, I’ll take the time to learn the shortcut.

![Mac OS X dropdown menu](/blog/images/2012/02/dropdown-screenshot.png)

My current code editor of choice is [Sublime Text 2](http://www.sublimetext.com/2), primarily because it includes something called [Vintage Mode](http://www.sublimetext.com/docs/2/vintage.html), which mimics the powerful keyboard commands of [Vi](https://en.wikipedia.org/wiki/Vi). If Vi doesn’t do it for you, just about every Mac textbox and text editor responds to [Emacs-like](https://en.wikipedia.org/wiki/Emacs) shortcuts for moving around text. Here’s [a good list for reference](http://stackoverflow.com/a/434046).

I used to think web browsers were in the same category as Photoshop, software that absolutely required the mouse. Fortunately, enterprising nerds have ported some Vi commands to browsers. My current favorite is [Vimium](http://vimium.github.com/) for Google Chrome [^otherbrowsers]. The killer feature is being able to press ‘F’ and be presented with keyboard shortcuts for every link on the current page. It does get a little hairy when links are close together and the shortcuts overlap, but it’s been helpful overall.

I even use keyboard shortcuts outside of my favorite programs with <a href="https://en.wikipedia.org/wiki/Spotlight_(software)">Spotlight</a> to open files and [Launchbar](http://www.obdev.at/products/launchbar/index.html) to open applications [^otherlaunchers]. Spotlight can also open applications, but Launchbar has some other builtin goodies that make it worthwhile. You can open URLs in your web browser, access your clipboard history, send selected files in Finder to specific apps, and more than I could possibly cover here.

## Things I haven’t tried

While I’ve spent a lot of time weaning myself off of the mouse, I haven’t yet taken the plunge to nixing the keyboard as well. I am aware of software like [Dragon Dictate](http://store.apple.com/us/product/H2569LL/A/Dragon-Dictate-2) and it’s trimmed down cousin [Dragon Express](http://click.linksynergy.com/fs-bin/stat?id=cxyf8xxWmGo&amp;offerid=146261&amp;type=3&amp;subid=0&amp;tmpid=1826&amp;RD_PARM1=http%253A%252F%252Fitunes.apple.com%252Fus%252Fapp%252Fdragon-express%252Fid458613689%253Fmt%253D12%2526uo%253D4%2526partnerId%253D30) which let you control your computer through voice commands, but I’m not comfortable talking to my computer just yet, especially with people around. Maybe using [Siri](http://www.apple.com/iphone/features/siri.html) will help me get used to the idea [^iphone]. I’ll let you know how it goes if I do use end up trying them.

[^switch]: If my right arm is feeling a bit overworked, I’ll switch my mouse to the left side.

[^otherbrowsers]: If you're a Firefox user, there is a plugin for Vi shortcuts called [Vimperator](http://www.vimperator.org/vimperator/), and on Safari there is an incomplete port of Vimium called [Vimari](https://github.com/guyht/vimari). I haven’t used either, so I can't vouch for them.

[^otherlaunchers]: There are good free launchers. The two most prominent are [Alfred](http://itunes.apple.com/us/app/alfred/id405843582?mt=12&amp;partnerId=30&amp;siteID=cxyf8xxWmGo) and [Quicksilver](http://qsapp.com/).

[^iphone]: There are some [inexpensive](http://itunes.apple.com/us/app/dictabulus-speech-text-mac/id476578212?mt=8&amp;ign-mpt=uo%3D4&amp;partnerId=30&amp;siteID=cxyf8xxWmGo) [apps](http://itunes.apple.com/us/app/vocal-vocally-control-your/id486323196?mt=8&amp;ign-mpt=uo%3D4&amp;partnerId=30&amp;siteID=cxyf8xxWmGo) popping up that utilize the iPhone’s speech-to-text capabilites to let you dictate to your Mac.