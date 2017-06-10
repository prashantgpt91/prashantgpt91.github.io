---
author: ansar
comments: true
date: 2016-11-07 03:42:44+00:00
layout: post
redirect_from: /2016/11/mobile-apps-dev
slug:
title: Native Mobile Apps | Cross-Platform | Hybrid Apps
wordpress_id: 1074
tags:
- business
- engineering
---

We all know that Mobile Development is changing rapidly day by day, with JS Technologies like React-Native, NativeScript, Progressive Web Apps, Mobile Development has become way easier than before. 






But is that the way to go for it? It surely reduces the development cost, development time and resources, But is that how companies should approach towards Mobile Development. Facebook has been using React-Native for a year now, and the response is great. React-Native was open sourced by facebook in mid-2015, and since then a lot of developers have adopted React-Native for their development.

People see React Native as a write-once-deploy-anywhere solution, potentially speeding up development for applications that need to be written for both iOS and Android and making it possible for Web Developers to easily write native applications, but is React Native the best choice for your next project?

**What is React Native**

React Native is a native version of the popular web library of the same name and its main purpose is to bring the power of React to native development. React Native components are pure, side-effect-free functions that return what the views look like at any point in time. For this reason, it is easier to write state-dependent views, as you don’t have to care about updating the view when the state changes since the framework do this for you. The UI is rendered using actual native views, so the final user experience is not as bad as other solutions that simply render a web component inside a WebView.

There are three choices to decide when you are starting with a new app.

**1. Native apps**

**2. Cross-platform apps**

**3. Hybrid apps**

Each has their own pros and cons.

**Native Apps -**

Native mobile apps are developed in iOS (Objective-c or Swift), Andriod (Java) or Windows Phone (C#/Visual Basic & XAML). They have a number of benefits including:

It provides access to all the features offered by the device and operating system. You will not run up against something other apps can do that your app cannot

Allows utilizing advanced features, such as Access USB input, complex networking, memory management etc.

There are no limitations in terms of app performance and speed. This is important when creating a graphics-intensive app, such as a game, or an app that will be used by millions of users

**Choose native development if:**

Your application needs full access to all device hardware and functionality

Your application processes video, audio or images

You want a fluid, high responsive user interface

The user interface should feel familiar to users on each platform

Your application performs complex calculations or works with large sets of data

Your application includes encrypted data

**Cross-Platform apps -**

Cross-platform mobile apps are developed using an intermediate language, such as Javascript, that is not native to the device’s operating system. These also have a number of benefits such as:

Code can be shared between different versions of the apps across devices (possibly up to 80%)

The User Interface is rendered using ‘native’ controls, so UI performance can be as fast as native.

**Choose cross-platform development if:**

You want to develop a quick prototype to test and validate a simple concept

You need a temporary ‘stopgap’ or promotional application which has a limited lifespan. E.g. a mobile app that accompanies an event

Your application has a simple user interface and has limited user interaction, such as listing and showing news content

Your user interface has limited scrolling and swiping and users will not be affected by a sluggish screen response

Your application does not interact with any device hardware, camera, microphone, geolocation, accelerometer etc.

Your application does not process complex data or work with audio or video

You are primarily targeting one OS, such as a corporate application, and you do not need a specific user interface that follows guidelines of each platform

**Hybrid apps -**

Your third option is to opt for hybrid mobile apps, which are cross-platform apps but render the user interface using an embedded web browser, leveraging HTML, CSS, and Javascript.

These also have a number of advantages including:

Building the core part of the app using web technologies allows for faster development time (dependent on your developer, of course)

Libraries, such as Ember, AngularJS, React, PaperJS, can be leveraged for web development

The core of the app can be updated without going via the AppStore (via "hot code push")

It is possible to leverage both approaches within the same app and still provide a seamless experience for your users.

To display simple content (such as listing news items) or simple forms (such as user account and settings screens) you can use a cross-platform approach and develop the more demanding elements in the application using a native approach.

This enables you to focus your budget on the features that matter most and make the best choices for your specific time and budget constraints. Apps such as LinkedIn have been developed in this way; as the application evolves, specific screens can be upgraded from cross-platform elements to native.

However, If you want to prototype and launch a relatively simple app on multiple platforms quickly, you can start with cross platform tools. The downside is that some features may available in the mobile OS, but the tool developer may not provide access to it and you will not be able to use it.

Debugging and build tools are also much better for native app development, and that may become a critical issue for large scale projects.
