---
layout:     post
title:      Benchmarking right way
categories: blog 
tags: backend
---
### Table of contents
1. [Benchmarking right way - Introduction](#id1)
	1. [What is?](#sub1id1)
		1. [Latency](#sub1sub1id1)
		2. [Throughput](#sub2sub1id1)
		3. [Packet Loss](#sub3sub1id1)
		4. [Processing time](#sub4sub1id1)
		5. [Resposne time](#sub5sub1id1)
2. [Benchmarking time](#id2)
	1. [Network Latency](#sub1id2)
		1. [Measure by ping](#sub1sub1id2)
		2. [Meaure by flent](#sub2sub1id2)
	2. [Test using curl](#sub2id2)
	3. [Benchmark POST API using ab](#sub3id2)
	4. [Benchmark POST API using wrk](#sub4id2)
3. [Memory benchmark](#id3)
4. [CPU benchmark](#id4)



### Benchmarking right way - Introduction <a name="id1"></a>
Benchmakring API should be majorly concerned with time, cpu & memory. One should also be concerned about the number of concurrent connections the API can handle in Prod env. This post will help you understand the mechanisms of network slowdowns.

<!--more-->


When troubleshooting network degradation or outage, we need to find ways to measure the network performance and determine when the network is slow and for what is the root cause (saturation, bandwidth outage, misconfiguration, network device defect, etc..). This could help maintain a flawless less service for your customers even in bad times.


Whatever the approach you take to the problem (traffic capture with network analyzers like Wireshark, SNMP polling with tools such as PRTG or Cacti or generating traffic and active testing with tools such as SmokePing or simple ping or trace route to track network response times), you need indicators: these are usually called metrics and are aimed at putting tangible figures to reflect the performance status of the network.

There are several major network performance indicators reflect and how they interact with each other in TCP and UDP traffic streams.

**What is?** <a name="sub1id1"></a>

Important metrics

**Latency** - <a name="sub1sub1id1"></a>
	is the time required to vehiculate a packet across a network.
	Latency may be measured in many different ways: round trip, one way.
	Latency may be impacted by any element in the chain which is used to vehiculate data: workstation, WAN links, routers, local area network, server… and ultimately it may be limited, for large networks, by the speed of light.

**Throughput** - <a name="sub2sub1id1"></a>
	is defined as the quantity of data being sent/received by unit of time.

**Packet loss** - <a name="sub3sub1id1"></a>
	 reflects the number of packets lost per 100 of packets sent by a host.


**Processing time** - <a name="sub4sub1id1"></a>

is the amount of time a system takes to process a given request, not including the time it takes the message to get from the user to the system or the time it takes to get from the system back to the user.

Processing time can be affected by changes to your code, changes to systems that your code depends on (e.g. databases), or improvements in hardware.

**Response time** - <a name="sub5sub1id1"></a>

is the total time it takes from when a user makes a request until they receive a response.

Response time can be affected by changes to the processing time of your system and by changes in latency, which occur due to changes in hardware resources or utilization.

In many cases, you can assert that your latency is nominal, thus making your response time and your processing time pretty much the same. I guess it doesn’t matter what you call things as long as everybody involved in your performance analysis understands these different aspects of the system. For example, it is useful to make a graph latency vs. response time, and it is important for all the parties involved to know the difference between the two.

**UDP Throughput is not impacted by latency**

UDP is a protocol used to carry data over IP networks. One of the principles of UDP is that we assume that all packets sent are received by the other party (or such kind of controls is executed at a different layer, for example by the application itself).

In theory or for some specific protocols (where no control is undertaken at a different layer – e.g. one-way transmissions), the rate at which packets can be sent by the sender is not impacted by the time required to deliver the packets to the other party (= latency). Whatever that time is, the sender will send a given number of packets per second, which depends on other factors (application, operating system, resources, …).

**TCP directly impacted by latency**

TCP is a more complex protocol as it integrates a mechanism which checks that all packets are correctly delivered. This mechanism is called acknowledgment: it consists in having the receiver sending a specific packet or flag to the sender to confirm the proper reception of a packet.

TCP Congestion Window

For efficiency purposes, not all packets will be acknowledged one by one: the sender does not wait for each acknowledgment before sending new packets. Indeed, the number of packets which may be sent before receiveing the corresponding acknowledgement packet is managed by a value called TCP congestion window.

**How the TCP Congestion Window impacts the throughput**
If we make the hypothesis that no packet gets lost; the sender will send a first quota of packets (corresponding to the TCP congestion window) and when it will receive the acknowledgment packet, it will increase the TCP congestion window; progressively the number of packets that can be sent in a given period of time will increase (throughput). The delay before acknowledgment packets are received (= latency) will have an impact on how fast the TCP congestion window increases (hence the throughput).

When latency is high, it means that the sender spends more time idle (not sending any new packets), which reduces how fast throughput grows.


| Roundtrip latency  |     TCP Throughput |
|--------------------|------------------- |
|   0ms			     |  93.5 Mbps 	      |
|   30ms  			 |  16.2 Mbps 	      |
|  	60ms		 	 |  8.07 Mbps 	      |
|   90ms			 |  5.32 Mbps 	      |


TCP is impacted by retransmission and packet loss

**How the TCP Congestion handles missing acknowledgment packets**

The TCP congestion window mechanism deals with missing acknowledgment packets as follows: if an acknowledgement packet is missing after a period of time, the packet is considered as lost and the TCP congestion window is reduced by half (hence the througput too – which corresponds to the perception of limited capacity on the route by the sender); the TCP window size can then restart increasing if acknowledgment packets are received properly.





### Benchmarking Time <a name="id2"></a>

We will first discuss ways to measure network latency and then move to response time and concurrent connections.

### Network Latency <a name="sub1id2"></a> 

**Measure by ping** <a name="sub1id2"></a> 
		<script src="https://gist.github.com/x0v/f5cd5e38a0d3ba786b616dfc1f1ba7f7.js"></script>

Sample output
		<script src="https://gist.github.com/x0v/21d89a56958ab8f6a07e8833657c12f3.js"></script>

**Test using curl** <a name="sub2id2"></a>


<script src="https://gist.github.com/x0v/7590f66d6660fc61cb6d514aef5c2eec.js"></script>



Content of curl-format.txt is
<script src="https://gist.github.com/x0v/f923e2eee0bf1496d33be33cc25ddbb0.js"></script>


<!--more-->

Sample output
<script src="https://gist.github.com/x0v/45a7fb238c0bc4f6d4bbe9502e84251f.js"></script>

Check this [URL](https://stackoverflow.com/questions/18215389/how-do-i-measure-request-and-response-times-at-once-using-curl) & [Curl Manpage](https://curl.haxx.se/docs/manpage.html) for more details.



**Benchmark POST API using ab** <a name="sub3id2"></a>

<script src="https://gist.github.com/x0v/b782c1975239bf46de0d3bc472d5d77f.js"></script>

**Benchmark POST API using wrk** <a name="sub4id2"></a>

<script src="https://gist.github.com/x0v/e92a517c12e9758ec855a62fe9220d16.js"></script>

here's the post.lua sample file

<script src="https://gist.github.com/x0v/ce693d4218ee691d44f9aaa8be15f11a.js"></script>

If you are getting too many Non-2xx or 3xx responses, while doing a benchmark with `ab` OR `wrk` then, that happens because the default size of uWSGI’s listen queue is 100 slots. Before you ask, it is an average value chosen by the maximum value allowed by default by your kernel.

Each operating system has a default limit (Linux has 128, for example), so before increasing it you need to increase your kernel limit too.

So, once your kernel is ready, you can increase the listen queue to the maximum number of users you expect to enqueue during a reload.

To increase the listen queue add a parameter in `uwsgi.ini` config file like this

`listen=400`


To raise kernel limits, you should check your OS docs. Some examples:

```
sysctl kern.ipc.somaxconn on FreeBSD
/proc/sys/net/core/somaxconn on Linux.
```
In linux particularly, Add `net.core.somaxconn=1024` to `/etc/sysctl.conf` for it to become permanent (be reapplied after booting). for temporary change run this command
`sysctl -w net.core.somaxconn=1024`

1024 because, `ulimit -n` on my machine is 1024

