# Backup iPhone with iTunes to an external hard drive

I’ve been having serious problems with my iPhone 6 battery [^batteryprobs], and before I go take the phone to an Apple Store, I’m wanted to try a backup and restore using iTunes [^icloudbackup]. However, my Macbook only has a 256GB hard drive, so space is at a premium. Rather than clear work files off, I tricked iTunes into backing up my phone data to an external disk. 

These are the steps you can take if you want to do the same thing:

1) Open Terminal and type `open ~/Library/Application\ Support/MobileSync/` and press [Return]

2) In the Finder window that opens, rename the `Backup` folder to something like `Backup-local`

3) Plug in an external hard drive (I used a [32GB SD Card](http://amzn.to/1qQAcYx), you might need something bigger depending on your iOS device)

4) Open the external disk in finder, and create a folder called `Backup`

5) Open Terminal and type `ln -s`

4) Drag your new `Backup` folder from Finder into Terminal after the `ln -s` you just typed

5) Finish the command by typing `~/Library/Application\ Support/MobileSync/` and press [Return]

![Terminal commands](/blog/images/2016/04/itunes-backup-terminal.png)

6) If you go back to the `MobileSync` folder we opened in step 1, you should see a new `Backup` folder with a little alias arrow in the bottom left of the icon

![iTunes backup folder in Finder](/blog/images/2016/04/itunes-backup-folder.png)

7) Go into iTunes and [start your encrypted backup](https://support.apple.com/en-us/HT205220)

If everything worked right, you should see your external hard drive `Backup` folder fill with backup data.

[^batteryprobs]: My phone runs out of juice in the early afternoon. It also frequently jumps from ~50% to ~30% to 1% to dead within minutes. Plugging the phone into power will often immediately restore the battery to ~40% power after a minute or two of charging. It’s very strange.

[^icloudbackup]: iCloud backups are great, but restoring from them takes *forever*.