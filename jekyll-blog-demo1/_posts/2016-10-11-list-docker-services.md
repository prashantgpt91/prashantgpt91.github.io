---
author: karthik
comments: true
date: 2016-10-11 02:24:44+00:00
layout: post
redirect_from: /2016/10/list-docker-services
slug:
title: List Of Best Docker Container Clustering And Orchestration Tools/Services
wordpress_id: 1074
tags:
- business
- devops
---




Docker with no doubt is an excellent&nbsp;open source tool. However, you cannot have complex application deployments just with docker engine and containers. 









Proper plumbing has to be done for container clustering for deploying complex application architectures. Your containerized applications should be able to scale up and down based on application resource requirements.

What we need is a good framework for managing containers in an efficient way. Containers are meant to be short-lived and when it comes to container orchestration, the main things&nbsp;to consider are

1. Networking
2. High availability
3. Ease of deployment
4. Good service discovery.

## Container Clustering and Orchestration Tools

In this post, we will cover the list of best container clustering and orchestrations tools which are being used in production by many companies.

### Docker&nbsp;Swarm

The Docker ecosystem consists tools from development to production deployment frameworks. In that list, docker swarm fits into cluster management. A mix of docker compose, swarm, overlay network and a good service discovery tool such as etcd or cosul&nbsp;can be used for managing a cluster of docker containers. Docker swarm is still maturing in terms of functionalities&nbsp;when compared to other open source container cluster management&nbsp;tools. Considering the vast docker contributors, it&nbsp;won't be so long for docker&nbsp;swarm to have all the best functionalities other tools possess. Docker has documented a [good production plan][1] for using docker swarm in production.

![docker swarm clustering and orchestration][2]

## Kubernetes

Kubernetes is an open source, out of the box container cluster manager and orchestration. It is built with an excellent&nbsp;scheduler and resource manager for deploying containers&nbsp;in a more efficient and highly available way. The kubernetes&nbsp;project is maintained by google with contributors all over the world. It offers many functionalities that native docker tools don't offer. Moreover, it is easy to get started with kubernetes.

![kubernetes docker container orchestration][3]

### Mesos

[Mesos][4] is another cluster management tool which can manage container orchestration very efficiently. It was created by twitter for its infrastructure and then got open sources. It is been used by companies like eBay, Airbnb etc. Mesos is not a dedicated tool for containers,

Mesos is not a dedicated tool for containers, instead you can use it for VM or Physical machine clustering for running workloads&nbsp; (Big data etc) other than containers.&nbsp;It has an efficient framework called Marathon for deploying and managing containers on a Mesos cluster.

You can actually run a kubernetes cluster on a Mesos cluster. Check out [this guide][5] for the same

![mesos cluster manager for containers][6]Image Source: container-solutions.com

## Fleet

Fleet is a container cluster management solution which runs on top of CoreOS (A lightweight container OS). It uses etcd&nbsp;(service discovery) and systemd (Linux system service) for managing a cluster of coreos systems where you can deploy the containers. Fleet does not have many functionalities like mesos or kubenetes.&nbsp;However, you can use fleet for normal container workloads. Check out this [fleet vs kubernetes ][7]comparison for more info.

![fleet container clustering][8]

## Cloud Based Container Clusterin Services

There are few managed containers cluster and orchestration services that you can use to avoid complex cluster setups.

#### Google Container Engine

[GCE][9] &nbsp;is a managed container service on google cloud. At the backend, GCE used kubernetes. You can use all the kubernetes functionalities on GCE.

#### Amazon EC2 Container Service

[ECS][10] is a service offered by AWS for managing the cluster of containers. ECS is not cloud agnostic as it uses its proprietary cluster management and scheduling technologies at the backend. Only thing you have to worry about is the vendor lockin.

### Conclusion

Choosing a tool or a service totally depends on your needs and the complexity of your application. There is no doubt in that fact that the above-mentioned tools and services are being used by many organizations for their production workloads.

&nbsp;

[1]: https://docs.docker.com/swarm/plan-for-production/
[2]: http://devopsio.com/wp-content/uploads/2016/09/image00_mini.jpg
[3]: http://devopscube.com/wp-content/uploads/2016/09/kubernetes-architecure.png
[4]: http://mesos.apache.org/
[5]: http://kubernetes.io/docs/getting-started-guides/mesos/
[6]: http://devopscube.com/wp-content/uploads/2016/09/mesos-cluster.jpg
[7]: https://github.com/coreos/fleet/blob/master/Documentation/fleet-k8s-compared.md
[8]: http://devopscube.com/wp-content/uploads/2016/09/fleet-cluster-manager.jpeg
[9]: https://cloud.google.com/container-engine/
[10]: https://aws.amazon.com/ecs/



[Source](http://devopscube.com/docker-container-clustering-tools/ "Permalink to List of Best Docker Container Clustering and Orchestration Tools")  
