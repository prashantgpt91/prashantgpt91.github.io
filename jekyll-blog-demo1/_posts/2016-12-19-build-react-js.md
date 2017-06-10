---
author: prashant
comments: true
date: 2016-12-17 12:29:44+00:00
layout: post
redirect_from: /2016/12/reactjs
slug:
title: Build ReactJS Apps
wordpress_id: 1074
tags:
- business
- reactjs
---

The main purpose of this post is to inform some of you that are actively looking for large scale applications made with React.js, about many of the keys to make a successful one and the issues you may encounter along the way.









The topics in this post goes from How to introduce React.js and its whole ecosystem to a team to advanced topics as managing state, async actions and monitoring and debugging your application.

Disclaimer: React.js is by far one of my favourite libraries, so to be fair this post may be a little opinionated, this is only my point of view.

### So, why React.js and when we use&nbsp;it?

React.js offers a lot, at least to solve the problems we had. Like a friend of mine said, each problem has its own best solution, and at the time, this library seemed to solve ours.  
We needed a new application, that could keep up the SEO with the old one, we needed to be fast, maintainable. We wanted to renew our architecture with modern technologies and we wanted that to be easily scalable.

#### SEO

The problem of SEO with modern javascript libraries / frameworks it's that almost every single one of them didn't support server-side rendering at the time, so our application was a blank page until all the javascript runs.  
Some of you would say "But search engines run javascript nowadays" and that maybe true in some cases, but also has a penalization from Google because it took a really long time to serve that content.

React solved that problem with this called from a node server (or any server-side javascript engine):
    
    
    ReactDOM.renderToString()

So first problem solved. We have server-side rendering with a modern JavaScript library. It takes a while until you find out how to do it properly, but once you have it, you're all set. And one of the benefits of using React.js with server-side rendering was that our entire tech stack was in only one language.

#### Speed

The issue with being fast it's done from the beginning if you don't mess up really bad, like calling this.setState() from your root component for every single change in your application, so no trouble here.

#### Maintainability

The architecture of having custom web components made everything maintainable (alongside good judgement, code reviews and a custom linter using eslint). We struggle a little with our redux architecture at the beginning, but nothing else.

To me, if you need a maintainable architecture, that scales well with overall good performance and you want server-side rendering (optionally) React.js is the way to go.

### The keys to our scalability

At this moment React.js seemed the best, and as we talked before, this library made our application really maintainable and scalable. But this isn't completely true. To be fair we needed some other extra stuff to ensure this.

#### Requirements and plannings

It takes a lot of meetings, plannings and stuff like that.  
One of the keys is having all the requirements from the beginning knowing that you'll handle internationalization, whether if you need or don't server-side rendering, if your apps needs proper authentication on its own, if you really want a single page application, and all of the main features that your applications needs to cover.  
For that, we had a few weeks of really long days planning everything and estimating how much effort we would need to do for each task.

At first, this really looked like hell, but with the months going on I truly appreciate all those long days.

More at a technical level, code reviews helps a lot, having a proper linter too. The rest, be a good developer, fail fast, fail early, keep on going.

### How to introduce React.js and its whole ecosystem to a&nbsp;team?

Oh, my. To make things clear, most of my colleagues didn't know about advanced JavaScript frameworks for the front-end at the time because they didn't need any of them. The site didn't use one, there was no requirement at the time and most of them were specialists in back-end because the front-end of our application was really simple.

#### The proposal

First of all, I made the proposal to my CTO to use React.js, it was a document explaining Why React.js? with almost 8 pages of PROs and CONs among other stuff. As my CTO wants the best for the team and for the entire company, there was a little bit of a struggle, pointing out the good and the bad out of the library, but at the end, we concluded that React.js was the best, even if it had a few issues (mostly handling application state).

#### Introducing React.js isomorphic applications to a PHP&nbsp;team

At the time we were trying to switch technologies, almost everyone in our team was a PHP developer. So the entire team had to learn and understand new languages, syntax (mostly JSX &amp; ES6), libraries and frameworks to get started with development.  
It took about one and a half months to know how a universal react-redux application running on a webpack dev server properly works. I personally think this is a good time, considering the amount of new information was given to us.  
To improve by a little our speed we decided to take some online accelerated courses, do a lot of pair programming, practising on our own and participating in public repositories that used similar technologies, like [react-redux-universal-hot-example][3].  
I think the biggest part was to understand:

* Fundamentals of ES6
* JSX Syntax and how it works
* React.js component lifecycle (server &amp; client)
* How to properly handle application state with redux
* How webpack really works

Once you figured out the syntax of ES6, how the JSX syntax and props works, once you know that lifecycles in components are different in server than client (for example: `componentDidMount()` only gets called on client), and you know even a little of how to connect redux state with React.js components you're good to go. You're not going to change every single day the configuration of your webpack and you can have running a dev server with a really small configuration file.

#### How we speed up our development?

We try every day to have most of the things automated and unified across environments. We have almost a 50% - 50% team in regards of OS. Ones with OSX and the other half with some Unix distribution.  
So, we've been working, even before this project, with Docker, to have control of environments, regardless of where they run. If you haven't dockerized your environment yet, you should definitely try it.  
We also started using npm scripts and we're slowly switching to use gulp

Why? This:

In the other hand, we try to stay agile with our processes, having a scrum board using JIRA, making user stories, two week sprints and other stuff.  
We have an automated process of deploy using Jenkins and we like to use linters on our daily basis.

#### Documentation is important, but self-documenting code is more important

We can all agree that documentation is hard and is harder to maintain. Because of that we automated some of the docs (mostly API-based) and the rest it's in the code itself. We think if we write good code there's no need to use extra comments or docs to understand it, but if you're gonna open source it or give some sort of public API you probably need more than this.  
The advice I can give you in this is:

* Write good code
* Have code reviews every single time
* Write tests (unit &amp; integration)
* Automate all the documentation you can

#### Having Types helps a&nbsp;lot

Types? In JavaScript? Yes.  
There's a lot of ways to achieve this. And for us this has become a standard, you specify the types a function receives and you specify what that function returns. You can even have custom types.  
You can use:

* flow
* TypeScript
* babel-typecheck

Flow needs some config before gettings started, you need a flowconfig file and a little boilerplate over each file you're gonna use it. It's not hard but you're going to have to work a little.  
TypeScript in the other hand is huge, you have to write a lot of definitions, you may even have trouble with some packages and you basically have to write your code in another language.  
Our choice: babel-typecheck.  
Doesn't require extra boilerplate per file, you can omit types if you want and you can declare your own custom. If you didn't try it, give it a shout.

#### Keys to handle application state:

There's only one key from my point of view: There is none.  
Handling application state is hard. You're probably saying _"No it's not"_ and of course it's not in a "to do" list app or a counter, but, when you manage large amounts of different types of data, when you have a lot of error handling, the slightest mistake could break your entire app.  
You can use the components state, redux, mobx, cerebral, alt, relay whatever you want, but you still have to model your state or the modifications to it. You have to keep data without duplicating, you have to optimize your API calls and data fetching and so on.  
We ended up using redux and redux-saga and it works for us, but this doesn't mean it will for you.

The main issues we faced are:

* Redux itself lacks cohesion, you have to write a lot of files to make it work
* State is modelled by you and you can break everything by forgetting any little piece of it
* Use something to keep data without duplicating (like normalizr)

#### Ways to handle interaction testing on a fast changing&nbsp;app

Testing in a fast changing app was hard in the traditional way. If you're gonna expect your component to return "x" and tomorrow the team decides is gonna return "y" you basically broke your tests, and yes, this is how it's supposed to be. Now imagine this same scenario, 15 times a day, you're gonna be really really slow on your development process.  
So, to fix this our QA found some tools to make this work.  
We tried to simulate actions, real ones, like clicking and wait for the application response. We achieved this by using:

* An isolated environment to test
* Webdriver.io
* BrowserStack

So before every build to production we run a series of tests in this isolated environment to see if every feature worked fine. If not, a report would say the contrary in one of our slack channels.

About our technical choices

Below there's a list of the stuff we ended using in our app:

* ES6 with stage-0 (mostly for async await and other stuff)
* babel-typecheck for types
* node.js for server-side rendering
* Redux with normalizr and redux-saga (and a custom implementation with events for a react-native project)
* i18n with FormatMessage, custom functions and context
* Linting with eslint extending airbnb and stepping on some rules
* Webpack with one configuration for development and another for production
* Sass as modules with sass-loader in webpack





[1]: https://cdn-images-1.medium.com/max/800/1*k86_vD8QvboL739gUHR4hw.png
[2]: http://www.taringa.net/
[3]: https://github.com/erikras/react-redux-universal-hot-example
[4]: https://taringa.workable.com/jobs/369586

[Source](https://medium.com/taringa-on-publishing/advice-on-large-scale-react-js-apps-rebuilding-the-biggest-social-publishing-platform-for-latam-1f4c8fa35a4f "Permalink to Advice on large scale React.js apps, rebuilding the biggest social publishing platform for Latam")
  
