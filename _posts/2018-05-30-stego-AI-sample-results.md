---
layout:     post
title:      StegoSOC AI driven threat detection
categories: blog
tags: practical data science
---


This post is about how we are trying to automate the threat detection for an
enterprise be it public, private or hybrid cloud setup.

Real time threat detection is imperative with GDPR and other cyberlaws. Threat
detection is always been an expensive solution to implement. It requires CSO and
Security Analyst to implement the solution.

<!--more-->

StegoSOC brings down time to detect threats at 1/10th cost on public clouds with
AI and cloud-native technologies.

![](https://cdn-images-1.medium.com/max/1440/1*mkyPvdMJEgMqDW1rN2npSg.png)

**Some background**

Security is of paramount significance for any organization
having its production servers deployed in its own enterprise infrastructure or
in the cloud. Due to unceasing evolution of software vulnerabilities,
misconfigured devices in the network and software vulnerabilities already
present in the devices in the network, an enterprise is always under a major
risk of intrusion by an attack either from inside or outside the organization
network. These attackers are highly proficient, have malicious intentions and
can cause various kinds of exploits leading to attacks targeting critical
resource or tampering the integrity of crucial information present in assets in
the network, which might influence a company’s major business decision.

**What have we done?**

To summarize

![](https://cdn-images-1.medium.com/max/1440/1*1YIqe5LBpE0OWoqFwHNhvA.png)

We started off with logs as an input, since application is what is exposed off
mostly. But as we all know, logs aren’t structured depending upon the
applications you use & mechanism of your logging. To add to this, there is
always an ever-increasing list of tools/applications being deployed on servers
with a different structure every time.

As thehackernews rightly quotes
[here](https://thehackernews.com/2013/10/importance-of-logs-and-log-management.html)

> The very purpose of IT security is to be proactive and the above measures make
> it more difficult for someone who attempts to compromise the network. This might
just not be enough and you need to able to detect the actual breaches as they
are being attempted. This is where log data really help.

> To expose an attack or identify the damage caused, you need to analyze the log
> events on your network in real-time. By collecting and analyzing logs, you can
understand what transpires within your network. Each log file contains many
pieces of information that can be invaluable, especially if you know how to read
them and analyze them. With proper analysis of this actionable data you can
identify intrusion attempts, mis-configured equipment, and many more. Also for
managing compliance, especially for PCI DSS — you need to retain logs and review
them.

I will now describe step-by-step AI coons that we have deployed for customer.

So, our first hurdle. How do we come up with a universal structure for logs ?

**Log-Parsing**

I will not go into technical details, but the foremost business requirements of
Log-parsers were :-

1.  Parse a log into meaningful attributes.
1.  if log format is not supported, log ingestion pipeline should quickly *(roughly
a few hours — depending upon traffic of unknown log formats)* ingest the new
format into existing supported formats.
1.  It should support a enterprise specific logging along with a global engine.

**L1 — Rule based detection**

This module should support filtration through handwritten rules. The handwritten
rules helps to filter out common attacks in Cybersecurity and it also helps us
to put enterprise in loop to draft their own rulesets. Since every enterprise
has their own set of route rules, firewall rules, change management policies
etc, this was really important. To incorporate all of this, it was really
important to have global plus local rulesets.

**L2 — Anomaly detection**

Whatever goes undetected, goes through Anomaly detection, which not only alerts
the SOC admin every hours, as to what is happening in their infra but also tells
who is producing anomalies in your system.

**L3 — Attack Graph**

> **Logs analysed, now what ?**

To extend this, we then started an additional effort to model the interaction of
vulnerabilities present in the system and the network configuration. The
information in the [National Vulnerability Database
(NVD)](https://nvd.nist.gov/), the information extracted from machine and
network configurations are used as base information for the attack graph engine.
We also try to capture the operating system’s behaviour and interaction of
various components in the network.

Inputs:

**Advisories**: Vulnerabilities that exist on the machine

**Host Configuration**: software and services running on the hosts, and their
configurations.

**Network Configuration**: configurations of the network routers and firewalls

**Principles**: legitimate users of the company’s network

**Interaction**: interaction model of the network elements

**Policy**: permitted policy

![](https://cdn-images-1.medium.com/max/1440/1*H3PQtHafpWUL94Mdd07Png.png)
<span class="figcaption_hack">AWS — attack graph</span>

Above you can see a sample run of attack graph engine on our AWS account,
wherein it shows, how an attacker can reach each machine on account of
vulnerabilities that exist in the enterprise and network configuration.

I know the graph snapshot is hard to understand, so in next post, I will write
technical details on this as well as Neo4J Visualization.

==========================================================

**Finally Demostrating StegoSOC AI results**

[Sample StegoSOC-AI results](https://drive.google.com/open?id=1NB9EIzL40y_ZgnJE_MBIXY37fdP6yA4c)

==========================================================

Want to deploy StegoSOC in your enterprise ? Visit our website
[here](https://www.stegosoc.com/) & Signup or directly mail us
[support@stegosoc.com](mailto:StegoSOC Support <support@stegosoc.com>) |
[Contact us](https://www.stegosoc.com/site/contact-us)

AI team: [Prashant Gupta](https://www.linkedin.com/in/prashantgpt91/), [Ayush
Rai](https://medium.com/@rayush7)

Security Lead: [Munish Kumar](https://www.linkedin.com/in/munishkumar-g/)

Product Lead: [Mir Adnan](https://www.linkedin.com/in/miradnan/)

