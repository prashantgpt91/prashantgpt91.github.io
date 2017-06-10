---
author: prashant
comments: true
date: 2016-11-29 11:47:44+00:00
layout: post
redirect_from: /2016/11/spark-hadoop
slug:
title: Why Spark And Hadoop Are Both Here To Stay
wordpress_id: 1074
tags:
- business
- technology
- big-data
---
Some good insights into Apache Spark and Apache Hadoop's future.



The past few years have been filled with a [number of prognostications][1] related to the future of big data and the [various technologies][2] that [have emerged][3] to tackle the challenges posed by the world's ever-expanding data sets. If you believe what you read, you might reach the conclusion that:

* The Hadoop wave has come and gone and was just a hype cycle
* Hadoop and related big-data technology and services will be a $50 billion industry
* Spark is the next Hadoop, and will overtake Hadoop for big-data workloads
* Hadoop is going to replace traditional massively parallel processing (MPP) databases

There is some truth in all of the above assertions. At the same time, all of these statements deserve deeper investigation. The reality of the situation is not easily captured in a single headline or sound bite.

## A Brief History Of Hadoop

To understand what is really happening in the big-data market, it's useful to first understand the market forces that are driving the evolution and adoption of these various technologies. Then we can identify which tools and technologies are best-suited to address these challenges.&nbsp;

&nbsp;Hadoop evolved at Yahoo as a solution for low-cost scale-out storage coupled with parallelizable tasks. The result was HDFS and MapReduce. As Hadoop matured and adoption increased, so did the need for higher-level constructs, like metadata management and data query/management languages. HCatalog, Pig, and Hive became part of the ecosystem.&nbsp;

&nbsp;With increased workloads came the need for more robust resource management increased, and services like YARN emerged. At the same time, an expansion in the the number of consumers drove an expansion in the number of supported languages (SQL, Python, R, Scala) and data-processing engines like Spark and Impala emerged.

So, where are we today?

With all of this evolution, there are some things that remain the same, and as would be expected in an market, continued areas of innovation. Based on AtScale's work with a number of enterprise customers, we've learned there are a set of consistent requirements:

* People still need low-cost scale-out storage—HDFS remains the best option
* Resource management in a clustered environment is paramount to delivering on the promise of a multi-purpose, multi-workload environment. Our experience is that YARN is still very at the forefront of providing resource management for enterprise-grade Hadoop clusters.
* Spark is clearly being very much adopted for a specific set of use cases, including pipelined data processing and parallelizable data-science workloads. At the same time, SQL-on-Hadoop engines (including Spark SQL, Impala, Presto, and Drill) are very much critical and growing.
* While batch data processing and data-science workloads are common for today's Spark and Hadoop clusters, support for business intelligence workloads is the dominant theme for many.

## A Reality Check

What's happening in the market is not necessarily that one platform is winning while another is losing. A recent [survey of Hadoop adoption][4] that AtScale conducted revealed that more than 60 percent of companies think of Hadoop as a game-changing investment, and more than 50 percent of organizations which currently don't have a Hadoop plan on investing in the technology in the next 12 months.&nbsp;

&nbsp;At the same time, Spark is also increasingly on the scene. According to a recent survey on Spark adoption, Spark has had the most contributions of all open-source projects managed by the Apache Software Foundations over the past year. Although not as mature as Hadoop, Spark's clear value proposition is leading to this increased investment.

Based on what we are seeing with companies working with AtScale, there is room in the market for both Spark and Hadoop, and both platforms have an important place in the big-data architectures of the future. Depending on workloads and preferences, there are different mixes of these technologies in each customer. For example, one customer may rely on Impala to support interactive SQL queries on Hadoop, while another might turn to Spark SQL.&nbsp;

&nbsp;However, one consistent thing we are seeing across the board is an ever-increasing demand to support business-intelligence workloads using some combination of Hadoop and Spark SQL. As the [AtScale Hadoop Maturity Survey ][5]discovered, more than 65 percent of respondents are using or plan on using Hadoop to support business-intelligence workloads—the most prevalent of all workloads on current and planned clusters. Similarly, a recent Spark user survey found that among Spark adopters, 68 percent were using Spark to support BI workloads, 16% more than the next most prevalent workload.

## Playing With Technology Matches

We need to stop playing Spark and Hadoop off each other and understand how they will coexist. Hadoop will continue to be used as a platform for scale-out data storage, parallel processing, and clustered workload management. Spark will continue to be used for both batch-oriented and interactive scale-out data-processing needs. I believe these two components together will play an important role in the next generation of scale-out data platforms, and enable the next generation of scale-out business intelligence.

[Source](http://readwrite.com/2015/12/02/spark-hadoop-business-intelligence/ "Permalink to Why Spark And Hadoop Are Both Here To Stay")

[1]: http://readwrite.com/2015/01/27/spark-scala-hadoop-typesafe-dean-wampler
[2]: http://readwrite.com/2015/08/24/big-data-apache-spark
[3]: http://readwrite.com/2015/06/15/spark-big-data-dean-wampler
[4]: http://info.atscale.com/2015-hadoop-maturity-survey-results-report
[5]: http://blog.atscale.com/spark-hadoop-and-all-things-big-data
[6]: https://upload.wikimedia.org/wikipedia/commons/1/13/Topsy_elephant_death_electrocution_at_luna_park_1903.png

  
