---
author: prashant
comments: true
date: 2016-12-02 03:42:44+00:00
layout: post
redirect_from: /2016/12/cpu-frequency
slug:
title: Why CPU Frequency Stalled - IEEE Spectrum
wordpress_id: 1074
tags:
- business
---
Not so long ago, competitive sorts would boast of the cycle rate of their PC's central processing unit. But now it seems the only people who talk it up are the overclockers—hobbyists who push their CPUs beyond their specified limits.






![charts small view][1][&nbsp;][2]

There are two reasons: CPU clock rates peaked a few years ago [see graph, top], and they aren't a very useful key to chip performance anyway.

The clock keeps a processor's parts working in unison, like rowers on a galley ship. Other things being equal, the more ticks you have per second, the more work will get done.

So why not push the clock faster? Because it's no longer worth the cost in terms of power consumed and heat dissipated. Intel calls the speed/power ­tradeoff a "fundamental theorem of multicore processors"—and that's the reason it makes sense to use two or more processing areas, or cores, on a single chip.

Intel reports that ­underclocking a single core by 20 percent saves half the power while sacrificing just 13 percent of the ­performance. That means that if you divide the work between two cores running at an 80 percent clock rate, you get 73 percent better performance for the same power. And the heat is dissipated at two points rather than one. So even though the cutting-edge logic chip gulps ever more power [see graph, center], it isn't about to melt its way through the floor.

That bodes well for Moore's Law, which predicts that about every two years, ­manufacturers will double the number of ­transistors they cram onto a given bit of silicon. The fundamental theorem says that we'll still be able to make full use of those transistors for a good long time. If once the whole choir of transistors had to sing to the beat of a single metronome, now it can split up into sections—and harmonize.

**Count Paces? Or Measure The Distance Traveled?**

The rising power consumption of CPUs [graph, center] made it less attractive to focus on cycles per second, so clock rates stalled [graph, top]. A better gauge of performance, the number of instructions performed per second [graph, bottom], continued to rise without ­betraying any hint of the stall. That's because work once done in a single ­processor is now divided among several processing cores—four&nbsp;of them in the case of Intel's Quad-Core chip [below].

![data f1][3]


[Source](http://spectrum.ieee.org/computing/hardware/why-cpu-frequency-stalled "Permalink to Why CPU Frequency Stalled - IEEE Spectrum")

[1]: http://spectrum.ieee.org/img/31759-1372099381585.jpg
[2]: http://spectrum.ieee.org/img/0408_data-xlrg-1372100315886.jpg
[3]: http://spectrum.ieee.org/img/dataf1-1372099277050.jpg

  
