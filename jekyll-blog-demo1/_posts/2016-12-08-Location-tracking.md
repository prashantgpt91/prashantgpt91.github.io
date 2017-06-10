---
author: bebhav
comments: true
date: 2016-12-08 07:06:44+00:00
layout: post
redirect_from: /2016/12/location-tracking
slug:
title: Location tracking for everyone
wordpress_id: 1074
tags:
- business
- hardware
- internet of things
---

In this project, we set the aim to design a GPS tracker which will fit in every requirement.









We set our AIM to design a compact&nbsp;, cheap and reliable device with extraordinary battery life. The device should not have any complicated installation process and should not restrict the user in any use case.

Just, for example, The user doesn't want to use our remote server for monitoring device forever. Then they can set on SMS mode so when they need location they can get through one SMS and they don't need any subscription for any type of service.

### So we started with our first prototype design.

![][1]

First prototype

we made a stable stack for pushing data to the cloud and add our encryption and compression to the data. So module will not use much bandwidth and don't have any security glitch.

The first prototype is having some basic stuff like low-power high-performance microcontrollers one GSM module one GPS module and power management circuit with some indicator LEDs.

We made all communication protocol and codes from starch. So, it will not have any unreliable software stage and increase its reliability.

So after coding we are ready for test drive.

![][2]

we packed all this in the black box just for&nbsp;testing.

#### Here are the end results of initial&nbsp;testing.

![][3]

![][4]

You can also check on the demo video.


<iframe width="754" height="480" src="https://www.youtube.com/embed/ssUgr9P79R4" frameborder="0" allowfullscreen></iframe>


After this, we start testing all GPS modules of all different make for providing you best from the market.

we checked uBlox, Telit, Quectel, simcom and many other. We have checked their consumption and performance on the field

![][5]

![][6]

![][7]

three different modules on same PCB base&nbsp;board.

![][8]

Then we tested modules on standard benchmarks.

So, after testing options, we have selected one best-engineered module. which is small power efficient and have best signal quality in the market**.**

So, now we are in the phase of production of second design and this time device not only have GPS and GSM, this also contains.

1. **Bluetooth low energy **— for providing you extraordinary battery life.
2. **WiFi** — for positioning you in indoor areas and in the place where GPS signal is not available.
3. 3 axis **accelerometer **\+ 3 axis **gyroscope **— for selecting proper algorithms on device according to your moving behaviours. We all are unique and want to have a unique design which fit best to us.

4 **Geo fencing, speed alert**&nbsp;: So get notification when it is necessary.

**Here is some images of future design.**

![][9]

Second Design.

Thanks for reading.

[1]: https://cdn-images-1.medium.com/max/800/1*NSxIHJofjxWSeiL5knY8Fw.png
[2]: https://cdn-images-1.medium.com/max/800/1*_5Q-NXr7Rv6Pk1dQUF-MkQ.jpeg
[3]: https://cdn-images-1.medium.com/max/600/1*NCYsEVOOJ1e2ZdGylR4lMw.png
[4]: https://cdn-images-1.medium.com/max/600/1*cHMpDreYAzDSmtRHJwTc_w.png
[5]: https://cdn-images-1.medium.com/max/400/1*DKRUroVTZFSdixG1uiTnPw.jpeg
[6]: https://cdn-images-1.medium.com/max/400/1*-0-4ftU5jp8k14w9ISt_Dw.jpeg
[7]: https://cdn-images-1.medium.com/max/400/1*jEOYV-zWDZra1F7NtPYLig.jpeg
[8]: https://cdn-images-1.medium.com/max/800/1*aysfEQSUNPO_8e6SpDAjuA.png
[9]: https://cdn-images-1.medium.com/max/800/1*-jA8GkgJH-4qQbhjfHFuXQ.png

  
