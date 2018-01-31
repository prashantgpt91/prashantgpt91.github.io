---
layout:     post
title:      Reliability 
date:       2018-01-16 12:40:55
summary:   
tags: backend
comments: true

---
### Reliability
“continuing to work correctly, even when things go wrong.”
The things that can go wrong are called faults, and systems that anticipate faults and
can cope with them are called fault-tolerant or resilient.

The former term is slightly
misleading: it suggests that we could make a system tolerant of every possible kind of
fault, which in reality is not feasible. If the entire planet Earth (and all servers on it) were swallowed by a black hole, tolerance of that fault would require web hosting in space—good luck getting that budget item approved. So it only makes sense to talk about tolerating certain types of faults.


Note that a fault is not the same as a failure [2]. A fault is usually defined as one component of the system deviating from its spec, whereas a failure is when the system as a whole stops providing the required service to the user. It is impossible to reduce the probability of a fault to zero; therefore it is usually best to design fault-tolerance mechanisms that prevent faults from causing failures.

Counterintuitively, in such fault-tolerant systems, it can make sense to increase the
rate of faults by triggering them deliberately—for example, by randomly killing indi‐
vidual processes without warning. Many critical bugs are actually due to poor error
handling [3]; by deliberately inducing faults, you ensure that the fault-tolerance
machinery is continually exercised and tested, which can increase your confidence
that faults will be handled correctly when they occur naturally. The Netflix Chaos
Monkey [4] is an example of this approach.

