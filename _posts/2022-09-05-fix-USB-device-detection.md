---
layout: post
title:  Fix USB not detecting
categories: blog
tags: misc
---

`https://diarium.usal.es/pmgallardo/2020/05/01/how-to-fix-an-unreadable-usb-flash-drive-on-ubuntu/`
`https://phoenixnap.com/kb/linux-create-partition`

Format drive using cmd, when USB is write protected.

* diskpart
* list disk
* select disk x (where x is the number of your non-working drive – use the capacity to work out which one it is)
* attributes disk clear readonly
* clean
* create partition primary
* format fs=fat32  (you can swap fat32 for ntfs if you only need to use the drive with Windows computers)
* exit



