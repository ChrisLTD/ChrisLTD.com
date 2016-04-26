---
layout: post
title: Backup iPhone to an external drive with iTunes on a Mac
---

I’ve been having serious problems with my iPhone 6 battery [^batteryprobs], and before I take it to an Apple Store, I wanted to backup my phone using iTunes [^icloudbackup]. However, my Mac only has a 256GB hard drive, so space is at a premium. Rather than shuffle work files off, I tricked iTunes into backing up my phone data to an external disk using the power of [symlinks](https://gigaom.com/2011/04/27/how-to-create-and-use-symlinks-on-a-mac/). 

These are the steps you can take if you want to do the same thing:

1. Be careful, I’m not responsible if you nuke your hard drive or existing backup data, backup your Mac to Time Machine and your phone to iCloud first
2. Open Terminal and type `open ~/Library/Application\ Support/MobileSync/` and press [Return]
3. In the Finder window that opens, rename the `Backup` folder to something like `Backup-local`
4. Plug in an external hard drive (I used a [32GB SD Card](http://amzn.to/1qQAcYx), you might need something bigger depending on your iOS device)
5. Open the external disk in finder, and create a folder called `Backup`
6. Open Terminal and type `ln -s`
7. Drag your new `Backup` folder from Finder into Terminal after the `ln -s` you just typed
8. Finish the command by typing `~/Library/Application\ Support/MobileSync/` and press [Return]
![Terminal commands](/blog/images/2016/04/itunes-backup-terminal.png)
9. If you go back to the `MobileSync` folder we opened in step 2, you should see a new `Backup` folder with a little alias arrow in the bottom left of the icon
![iTunes backup folder in Finder](/blog/images/2016/04/itunes-backup-folder.png)
10. Go into iTunes and [start your encrypted backup](https://support.apple.com/en-us/HT205220)

If everything worked right, you should see your external hard drive `Backup` folder fill with backup data. Reverting the process shouldn’t take more than removing the symlinked `Backup` folder and renaming `Backup-local` back to `Backup`.

[^batteryprobs]: My phone runs out of juice in the early afternoon. It also frequently jumps from ~50% to ~30% to 1% to dead within minutes. Plugging the phone into power will often immediately restore the battery to ~40% power after a minute or two of charging.

[^icloudbackup]: iCloud backups are great, but restoring from them takes *forever*.