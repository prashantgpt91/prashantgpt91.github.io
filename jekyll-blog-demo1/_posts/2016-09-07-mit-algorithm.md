---
author: prashant
comments: true
date: 2016-09-07 06:24:44+00:00
layout: post
redirect_from: /2016/09/influence-of-algorithms-on-current-technologies
slug:
title: Influence of 56 Years Old Algorithm for Current Technologies
wordpress_id: 1074
tags:
- business
- algorithm
- technology
---


Many of the inventors who fueled the digital revolution have become household names. And rightfully so. Innovators such as Steve Jobs, Bill Gates, and Mark Zuckerberg all contributed mightily to the technologies that have transformed our daily lives and society.

If you’re not an engineer, however, you have probably never heard of the brilliant inventor Rudolf Kálmán, a Budapest-born engineer and mathematician who died on July 2 in Gainesville, Florida, at age 86. His fundamental contribution, an algorithm called the Kalman filter, made possible many essential technological achievements of the last 50 years. These include aerospace systems such as the computers that landed Apollo astronauts on the moon, robotic vehicles that explore our world from the deep sea to the outer planets, and nearly any endeavor that needs to estimate the state of the world from noisy data. Someone once described the entire GPS system—an Earth-girdling constellation of satellites, ground stations, and computers as “one enormous Kalman filter.”

Within his professional community, Kálmán was well known and highly admired, the recipient of numerous awards and honors. In 2009 President Obama awarded him the National Medal of Science. If you have studied any form of robotics, control, or aerospace engineering in the past four decades, then Kálmán’s eponymous filter was as fundamental to your work as the Pythagorean theorem is to high schoolers preparing for the SAT.

Here’s why. Control engineers know that you can only control what you can measure. The more precisely you can measure it, the better you can control it.

Consider the challenge faced by the engineers tasked with designing the Apollo flight computers in the early 1960s. The computers’ raw data—measurements from sensors such as gyroscopes, accelerometers, and radar—were inherently noisy, full of random errors and messy inaccuracies. When barreling toward a rocky moon at high speed, those errors can ruin your day.

Somehow you have to be able to filter out this noise from the measurements and make the best possible estimate of where you are and how fast you’re moving. You also need to know just how good or bad your estimates are, in a statistical sense, since it can be disastrous to think that you’re doing better than you actually are. And all this needs to happen in fractions of a second as the spacecraft speeds toward the moon, attempts a lunar landing, or threads the needle of an entry-corridor as it reënters Earth’s atmosphere.

That’s where Rudolf Kálmán came in. He published an ingenious recursive estimation algorithm in 1960. The filter would accomplish the goal of accurately estimating and predicting critical variables such as location, direction, and speed in the presence of noisy measurements, and even estimate the noise. Others, such as cybernetics inventor Norbert Wiener, had tackled the problem before, but Kálmán tailored his solution to the emerging world of digital computers and real-time processing.

When the Apollo 11 lunar module, controlled by Neil Armstrong and a software program, made its heart-stopping landing on the Sea of Tranquility, the Kalman filter ensured that real-time position data coming from Earth-based radar tracking agreed closely with the onboard sensors. Listen to the tapes and you’ll hear Buzz Aldrin calling out the Kalman filter estimates as Armstrong landed.

Nearly that same calculation, with modernized Kalman filters, happens routinely inside your mobile phone. The phone’s GPS sensor provides real-world coӧrdinates on the face of the Earth, while its accelerometers sense rapid, small motions. Each has noise and inaccuracy of different types; the Kalman filter combines them for the best of both worlds. Drive your car into a tunnel, for example, and you lose GPS, but the Kalman filter still achieves pretty good dead reckoning until you come out the other side and get a new GPS “fix.”

But that’s only the beginning of the impact that Rudolf Kálmán’s work will have on the world. Within the next decade the Kalman filter will be at work in consumer technologies that will change your life in equally profound ways.

The very same guidance and navigation problems faced by Apollo engineers 50 years ago—how to locate objects accurately in the vastness of space—challenge engineers today as they design self-driving cars that can navigate safely in smart cities, augmented-reality computer games, and robot companions to work on the factory floor and in your home.

All these inventions require precise information, what we call “microlocation,” in some cases down to millimeters, to ensure that your self-driving car parks in your garage and not on your lawn, that your virtual-reality gaming headset makes you fly and not vomit, and that your trusted robot companion pours coffee into your cup and not on your lap. This means millions and perhaps billions of Kalman filters.

But then there’s the Internet of things, the much anticipated infrastructure of a connected, smart world of the future. The Internet of things will require Kalman filters in trillions of smart objects to guide them to where and when we want them, at our workplaces, in our homes, and elsewhere in our lives.



[Source](https://www.technologyreview.com/s/602287/how-an-inventor-youve-probably-never-heard-of-shaped-the-modern-world/).

