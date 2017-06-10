---
author: prashant
comments: true
date: 2016-12-17 12:19:44+00:00
layout: post
redirect_from: /2016/12/containerize 
slug:
title: Guide for Containerizing your Infrastructure 
wordpress_id: 1074
tags:
- business
- devops
---




How we cut server costs by 75% and greatly simplified our Continuous Integration and Deployment (CI/CD) by switching from Amazon Web Services (AWS) to Docker containers on Google Cloud Platform (GCP) — **in only 7 days.**












_Why you might want to read this post:_

1. You want to be convinced of the merits of using/switching to Docker/Kubernetes for your infrastructure.
2. You are looking to save money on your AWS or Heroku bill (we cut our AWS bill by 75%!)
3. You're about to begin transitioning from AWS to GCP or are starting a new project and want to save some time and headache in the process.

![][1]

Skeptical? You should be! I was too at&nbsp;first…

&gt; DISCLAIMER: I'm in no way a devops expert. What follows are my experiences as a full-stack developer diving head-first into new territory, specifically Docker, Kubernetes and Google Container Engine (GKE) on GCP. My main reason for writing this post is to showcase how accessible these new tools are, and how quickly I was able to migrate our production architecture. I welcome any corrections, edits and suggestions!

### Why Containerize?

Microservices are all the rage (at least this year) and containers are playing a big role in making them feasible. Read about the [pros][2] and [cons][3] of microservices, or listen to [this great a16z podcast][4] if you're new to the topic. But even if you don't want to break apart your monolithic application into microservices, utilizing containers for the major architectural components of your application (your API, front-end web application, asynchronous task workers, cache, etc) can still offer up some big wins. So what exactly is a container?

&gt; container (n): a hermetically sealed package of software that can be launched quickly, run in a standardized way, and is essentially stateless.

Containers are easy to distribute because they encapsulate all of their dependencies and can be brought up / shut down quickly. Unlike a virtual machine, they aren't actually a full OS (in fact, multiple containers can run on the same OS). They avoid **network** **conflicts** because each container has its own IP address, and they avoid **version** **conflicts** because each container packages _only_ the library dependencies it needs.

&gt; Example: If you are familiar with python you know that virtualenvs are critical to running multiple python apps on the same system to avoid library version conflicts. With containers **you can say goodbye to virtualenvs** because you would create a different container for each python application, each installing its own dependencies. The container IS the virtualenv.

In my opinion though, the real advantages lie in Kubernetes, an open source system created to orchestrate the **creation, lifecycles and communication** **between** your shiny new containers.

#### Too many words…show me pictures!

Before we dive into Kubernetes, lets' back up a second and look at a setup you might be familiar with. Below is an example setup on AWS with a Django API behind NGINX on an EC2 instance, another instance accepting asynchronous tasks (Rabbit broker + Celery workers) and both having access to a Postgres database on an Amazon Relational Database Service (RDS).

![][5]

Simple setup on&nbsp;AWS

If you're a small startup with little devops experience, your thought process for setting up the API component would probably look something like this:

* Step 1:** **Log into the AWS web console and launch a new EC2 instance by choosing a base linux image and specifying an instance size.** NOTE: Your monthly bill will largely be determined by the instance size you select.**
* Step 2:** **SSH into the instance and install required packages (eg. NGINX, python, django), then clone your repo's master branch and start your services.
* Step 3: Pray that your instance never goes down, that you never need to change the size of your instance, and that no one on your team makes a configuration change on the instance without logging it in 'that one server config google doc'.

**%$&amp;#! We have traffic and need to scale!**

* Step 4: Right-click on your instance and 'Launch more instances like this', then repeat Step 2. Manually create an Elastic Load Balancer and add your API instances to it.
* Step 5: Quickly realize this is **not sustainable **and start reading about **Chef** for automatically configuring your servers, **Ansible** for doing code deployments and new version rollouts, and **AWS CloudFormation** for making your cobbled-together architecture more declarative.

If you are ultimately successful, you may end up with something more like the following. This sort of setup is NOT simple, and is definitely overkill if built before you actually need it:

![][6]

Desired state on&nbsp;AWS

At this point you are likely **throwing away hard earned cash** thanks to underutilized EC2 instances…especially if, like us, you made conservatively large-sized instances so you wouldn't have to go through the hassle of vertical scaling later.

![][7]

Underutilizing your EC2 instances

Sound familiar? Personally I learned _far _more about Chef, Ansible and the AWS toolset than than I ever wanted to, and it left me feeling like this:

![][8]

How it feels configuring EC2 instances on&nbsp;AWS

### A Better&nbsp;Way

The good news is that there is hope! **In only 7 days (and long nights) **I** **was able to both (a) replicate our existing deployment architecture and (b) drastically improve it by containerizing our setup. Granted, [my startup][9] was recently accepted into the [GCP for Startups program][10], so we had a strong incentive to switch (free GCP credits!). In hindsight though, it would have been worth it no matter what.

Below is the same setup using Kubernetes on Google Container Engine (GKE):

![][11]

* **Scalability is the default.** Networking, load balancing and replication are _first class citizens_** **on Kubernetes. **Deployments** specify the Docker image to replicate, the number of replications, and define the endpoint for testing readiness of the container. **Services** handle load balancing for a deployment, in addition to defining which ports to expose (internally or externally).

&gt; Want to have 6 API containers online instead of 3? Patch your Deployment configuration with "replicas: 6" and go get yourself a cold brew. There's even [support for auto-scaling][12].

* **Resource Efficiency. **You can see that each major component has been converted to a container. Rather than guessing at the resource requirements of each component, the entire cluster (everything you see above) is treated as a _single, logical unit_** **defined in a simple, declarative format. You then decide how many resources to grant the entire cluster (# and size of vCPUs) and the resources are distributed evenly throughout the cluster to your various containers. **This fundamental shift encompassed the majority of our cost savings.**
* **Simplified Continuous Integration and Deployment (CI/CD).** By packaging the necessary dependencies and application code into containers, _you completely remove the need to learn complex tools like Chef (for server configuration) and Ansible (for code deployment)!_ Toss a simple deploy script into CircleCI that (1) builds a container image with your latest application code and (2) patches your Kubernetes configuration to point to the new container image and VOILA, your new image will be rolled out across your container fleet.

&gt; Are you a Heroku user thinking "But I pay Heroku to manage all this for me!" Yes, Heroku offers automagical scalability and seamless deployment pipelines. But as I'm sure you are aware, you're paying a premium for them. I don't have the numbers to back it up, but I'd venture to guess you'd see similar (if not greater) cost savings by converting to containers, and you'd be left with significantly more versatility in the end.

Remember, the above example is only converting major components to containers…the logical next step is to go full microservices for each component. But once you're on GKE, that becomes more of an application layer challenge.

Of course the devil's in the details and learning a new system is **never **easy, but once you have a decent handle on it you start feeling like this:

![][13]

How it feels configuring Kubernetes on&nbsp;GKE

There's always a downside. Eliminating state is one of the largest reasons to containerize, but sometimes your hand is forced. In our case, we had previously been using a specially configured Postgres database with PostGIS installed for our geospatial requirements. Google's support team recommended a Docker container running Postgres with a Persistent Disk attached as a Persistent Volume (Kubernetes terminology) to the container. Philosophically, it just feels wrong! Of course we could attempt to switch to a service like Google Cloud SQL but our goal was to make the switch with as little application refactoring as possible (thus saving time and money). So far it's been effective for us.

In fairness, I should note that AWS has a [Container Service][14] as well, and you can read about some differences between it and GKE [here][15]. But that's the beautiful thing about containers…if AWS offers a strong enough incentive for us to switch, it should be relatively straightforward.

### **RECAP: Main Advantages of Containerizing on&nbsp;GKE**

1. **Portable. **Any system running the Docker Engine can run your containers the **exact same way**, whether that's in GKE, AWS or on your personal laptop. You can even replicate your entire Kubernetes orchestration on your laptop with something called minikube…it's pretty remarkable. That means (a) increased confidence in your deployments and (b) negligible switching cost to any other infrastructure provider that supports containers.
2. **Declarative. **Define the state of your architecture (# of containers, networking, scalability) in a simple, declarative format with a relatively small learning curve. Avoid learning complex devops tools like Chef and Ansible, and **stop manually configuring servers.**
3. **Efficient.** Defining your system resource requirements **at the cluster level** vs the individual component level can result in significant cost savings and reduced complexity.
4. **Mature. **_Wait a second…how can a brand new technology be mature? _It's true that Kubernetes is relatively new, but Google has poured decades of learning from its own backend systems into these tools. Take logging for example. In the default case (no custom configuration), stdout and stderr from all your containers shows up in a **beautiful, aggregated, tagged format** on Google Cloud Logging. I went from having the thought "OK, time to think about logging across all these containers" to "Holy sh$t, my logging is already better than it's ever been" in a matter of seconds.

Deploying software can be one of the most intimidating parts of shipping a product. Your goal is to eliminate surprises when new features go live, whether you're deploying a minor copy change or launching an entirely new feature. Similarly, you want to be prepared to scale seamlessly with your userbase. Having shipped products for my own startups multiple times, I can say from personal experience that containerization is a giant leap forward, even for if you're just starting with a brand new project.





![][16]

[1]: https://cdn-images-1.medium.com/max/800/1*v5Q2tCUDrjWwVB3prkcRfA.png
[2]: http://martinfowler.com/articles/microservices.html
[3]: http://martinfowler.com/articles/microservice-trade-offs.html
[4]: http://a16z.com/2016/09/01/microservices/
[5]: https://cdn-images-1.medium.com/max/800/1*UgAvHlZFJ7UDiVYQR_jlmQ.png
[6]: https://cdn-images-1.medium.com/max/800/1*P1TfMcMyc9gwVlHOpsWhfw.png
[7]: https://cdn-images-1.medium.com/max/800/1*UxFgTEx0I4MK9obTxG6_xw.gif
[8]: https://cdn-images-1.medium.com/max/800/1*MoKLLt-zpe1ozfWyk-4V7A.gif
[9]: https://Tripstr.com
[10]: https://cloud.google.com/developers/startups/
[11]: https://cdn-images-1.medium.com/max/800/1*mpAo0Bz7Zz5KpoS21lc5bA.png
[12]: http://kubernetes.io/docs/user-guide/horizontal-pod-autoscaling/
[13]: https://cdn-images-1.medium.com/max/800/1*lmDmE5CWJYcyVkLruZcXMA.gif
[14]: https://aws.amazon.com/ecs/
[15]: https://www.quora.com/Whats-the-difference-between-Kubernetes-and-AWS-EC2-Container-Service-What-are-they-each-used-for-Pros-Cons
[16]: https://cdn-images-1.medium.com/max/800/1*sOT4F2vAxDtfO5qhBkUoLQ.gif




[Source](https://medium.com/google-cloud/a-survival-guide-for-containerizing-your-infrastructure-part-1-why-switch-8e8dee9fc66 "Permalink to A Survival Guide for Containerizing your Infrastructure — Part 1: Why switch?")
