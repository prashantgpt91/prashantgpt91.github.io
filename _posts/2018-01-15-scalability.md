---
layout:     post
title:      Reliability 
date:       2018-01-16 12:40:55
summary:   
tags: backend
comments: true

---
### Reliability...what is that?

“continuing to work correctly, even when things go wrong.”
The things that can go wrong are called faults, and systems that anticipate faults and
can cope with them are called fault-tolerant or resilient.
The former term is slightly misleading: it suggests that we could make a system tolerant of every possible kind of fault, which in reality is not feasible. If the entire planet Earth (and all servers on it) were swallowed by a black hole, tolerance of that fault would require web hosting in space—good luck getting that budget item approved. So it only makes sense to talk about tolerating certain types of faults.
Note that a fault is not the same as a failure. A fault is usually defined as one component of the system deviating from its spec, whereas a failure is when the system as a whole stops providing the required service to the user. It is impossible to reduce the probability of a fault to zero; therefore it is usually best to design fault-tolerance mechanisms that prevent faults from causing failures.

Counterintuitively, in such fault-tolerant systems, it can make sense to increase the
rate of faults by triggering them deliberately—for example, by randomly killing indi‐
vidual processes without warning. Many critical bugs are actually due to poor error
handling by deliberately inducing faults, you ensure that the fault-tolerance
machinery is continually exercised and tested, which can increase your confidence
that faults will be handled correctly when they occur naturally. The Netflix [Chaos
Monkey](https://github.com/Netflix/chaosmonkey) is an example of this approach.

> One possbile architecture, just to display several components in one piece.
![architecture](/images/architecture1.png)

### Prime reasons for reliability to fail ?

1. Hardware faults may be.....
When we think of causes of system failure, hardware faults quickly come to mind. Hard disks crash, RAM becomes faulty, the power grid has a blackout, someone unplugs the wrong network cable. Anyone who has worked with large datacenters can tell you that these things happen all the time when you have a lot of machines.
Hard disks are reported as having a mean time to failure (MTTF) of about 10 to 50 years [5, 6]. Thus, on a storage cluster with 10,000 disks, we should expect on average one disk to die per day.
Our first response is usually to add redundancy to the individual hardware compo‐ nents in order to reduce the failure rate of the system. Disks may be set up in a RAID configuration, servers may have dual power supplies and hot-swappable CPUs, and datacenters may have batteries and diesel generators for backup power. When one component dies, the redundant component can take its place while the broken com‐ ponent is replaced. This approach cannot completely prevent hardware problems from causing failures, but it is well understood and can often keep a machine running uninterrupted for years.

Until recently, redundancy of hardware components was sufficient for most applica‐ tions, since it makes total failure of a single machine fairly rare. As long as you can restore a backup onto a new machine fairly quickly, the downtime in case of failure is not catastrophic in most applications. Thus, multi-machine redundancy was only required by a small number of applications for which high availability was absolutely essential.

However, as data volumes and applications’ computing demands have increased, more applications have begun using larger numbers of machines, which proportion‐ ally increases the rate of hardware faults. Moreover, in some cloud platforms such as Amazon Web Services (AWS) it is fairly common for virtual machine instances to become unavailable without warning, as the platforms are designed to prioritize flexibility and elasticityi over single-machine reliability.
Hence there is a move toward systems that can tolerate the loss of entire machines, by using software fault-tolerance techniques in preference or in addition to hardware redundancy. Such systems also have operational advantages: a single-server system requires planned downtime if you need to reboot the machine (to apply operating system security patches, for example), whereas a system that can tolerate machine failure can be patched one node at a time, without downtime of the entire system (a rolling upgrade).

2. Software Errors
We usually think of hardware faults as being random and independent from each other: one machine’s disk failing does not imply that another machine’s disk is going to fail. There may be weak correlations (for example due to a common cause, such as the temperature in the server rack), but otherwise it is unlikely that a large number of hardware components will fail at the same time.
Another class of fault is a systematic error within the system. Such faults are harder to anticipate, and because they are correlated across nodes, they tend to cause many more system failures than uncorrelated hardware faults [5]. Examples include:
	• A software bug that causes every instance of an application server to crash when given a particular bad input. For example, consider the leap second on June 30, 2012, that caused many applications to hang simultaneously due to a bug in the Linux kernel.
	• A runaway process that uses up some shared resource—CPU time, memory, disk space, or network bandwidth.
	• A service that the system depends on that slows down, becomes unresponsive, or starts returning corrupted responses.
	• Cascading failures, where a small fault in one component triggers a fault in another component, which in turn triggers further faults.

The bugs that cause these kinds of software faults often lie dormant for a long time until they are triggered by an unusual set of circumstances. In those circumstances, it is revealed that the software is making some kind of assumption about its environ‐ ment—and while that assumption is usually true, it eventually stops being true for some reason 

3. Human errors

Humans design and build software systems, and the operators who keep the systems running are also human. Even when they have the best intentions, humans are known to be unreliable. For example, one study of large internet services found that configuration errors by operators were the leading cause of outages, whereas hard‐ ware faults (servers or network) played a role in only 10–25% of outages.
How do we make our systems reliable, in spite of unreliable humans? The best sys‐ tems combine several approaches:
	• Design systems in a way that minimizes opportunities for error. For example, well-designed abstractions, APIs, and admin interfaces make it easy to do “the right thing” and discourage “the wrong thing.” However, if the interfaces are too restrictive people will work around them, negating their benefit, so this is a tricky balance to get right.
	• Decouple the places where people make the most mistakes from the places where they can cause failures. In particular, provide fully featured non-production sandbox environments where people can explore and experiment safely, using real data, without affecting real users.
	• Test thoroughly at all levels, from unit tests to whole-system integration tests and manual tests. Automated testing is widely used, well understood, and especially valuable for covering corner cases that rarely arise in normal operation.
	• Allow quick and easy recovery from human errors, to minimize the impact in the case of a failure. For example, make it fast to roll back configuration changes, roll out new code gradually (so that any unexpected bugs affect only a small subset of users), and provide tools to recompute data (in case it turns out that the old com‐ putation was incorrect).
	• Set up detailed and clear monitoring, such as performance metrics and error rates. In other engineering disciplines this is referred to as telemetry. (Once a rocket has left the ground, telemetry is essential for tracking what is happening, and for understanding failures [14].) Monitoring can show us early warning sig‐ nals and allow us to check whether any assumptions or constraints are being vio‐ lated. When a problem occurs, metrics can be invaluable in diagnosing the issue.


### Why should i care about reliability?
Reliability is not just for nuclear power stations and air traffic control software— more mundane applications are also expected to work reliably. Bugs in business applications cause lost productivity (and legal risks if figures are reported incor‐ rectly), and outages of ecommerce sites can have huge costs in terms of lost revenue and damage to reputation.
Even in “noncritical” applications we have a responsibility to our users. Consider a parent who stores all their pictures and videos of their children in your photo application. How would they feel if that database was suddenly corrupted? Would they know how to restore it from a backup? There are situations in which we may choose to sacrifice reliability in order to reduce development cost (e.g., when developing a prototype product for an unproven mar‐ ket) or operational cost (e.g., for a service with a very narrow profit margin)—but we should be very conscious of when we are cutting corners.


### Scalability
Scalability is used to describe a system’s ability to cope with increased load.

What is load ?
it may be requests per second to a web server, the ratio of reads to writes in a database, the number of simultaneously active users in a chat room, the hit rate on a cache, or something else. 




