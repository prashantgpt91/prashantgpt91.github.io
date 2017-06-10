---
author: prashant
comments: true
date: 2016-11-30 06:17:44+00:00
layout: post
redirect_from: /2016/11/cloud-hardware
slug:
title: Microsoft reimagines open source cloud hardware
wordpress_id: 1074
tags:
- business
- hardware
---
An insight into Kushagra Vaid, GM, Azure Hardware Infrastructure talk at  European Digital Infrastructure Summit hosted by Datacenter Dynamics in London.






Tomorrow, I'll be speaking at Zettastructure: The European Digital Infrastructure Summit hosted by Datacenter Dynamics in London. In collaboration with the Open Compute Project (OCP), we are introducing _Project Olympus_ – our next generation hyperscale cloud hardware design and a new model for open source hardware development with the OCP community. This is a significant moment as we usher in a new era of open source hardware development at cloud speed.

Microsoft has been a significant and growing contributor to open source projects for the past decade, particularly with Microsoft Azure. In 2014, we began reimagining our Azure hardware through the lens of open source innovation and joined OCP. Our initial contributions were server and datacenter designs that power the Azure hyperscale cloud. We've also contributed technologies that showcase the software-defined networking (SDN) principles of speed and scale-out that serve as Azure's backbone.

We've learned a tremendous amount from our deep collaboration with the OCP Foundation and the open source community over the past few years. An important realization is that open source hardware development is currently not as agile and iterative as open source software. The current process for open hardware development is to contribute designs that are production-ready. At that stage, the design is essentially finalized – almost 100% complete – and this late contribution delays the development of derivative designs, limits interactive community engagement and adoption, and slows down overall delivery.

To address these challenges, we've set out in collaboration with the OCP to introduce a new hardware development model for community based open collaboration. _Project Olympus_ applies a model of open source collaboration that has been embraced for software but has historically been at odds with the physical demands of developing hardware. We're taking a very different approach by contributing our next generation cloud hardware designs when they are approx. 50% complete – much earlier in the cycle than any previous OCP project. By sharing designs that are actively in development, _Project Olympus_ will allow the community to contribute to the ecosystem by downloading, modifying, and forking the hardware design just like open source software.

"Microsoft is opening the door to a new era of open source hardware development. Project Olympus, the re-imagined collaboration model and the way they're bringing it to market, is unprecedented in the history of OCP and open source datacenter hardware," said Bill Carter, Chief Technology Officer, Open Compute Project Foundation.

The community can play a significant role in expanding the _Project Olympus_ ecosystem by taking advantage of the early access and contributing additional building blocks to enable a new common hardware design portfolio. OCP Solution Providers will benefit by being able to rapidly assemble hardware solutions specific to product offerings, and the broader community benefits from proven base hardware designs on which they can build value added services. This should decrease the time to market for new product offerings and lower investment costs. The net result will be increased productivity in the industry and faster delivery of new capabilities via the cloud.

Over the past several years, we've also learned from deploying OCP hardware at scale in our datacenters – over 90% of the servers we currently purchase are based on OCP contributed specifications. As we look to the future, we know we need to keep pace with tremendous growth in the cloud, support a broad spectrum of workloads including emerging cloud services, and enable easy scaling across global datacenter regions.

The building blocks that _Project Olympus_ will contribute consist of a new universal motherboard, high-availability power supply with included batteries, 1U/2U server chassis, high-density storage expansion, a new universal rack power distribution unit (PDU) for global datacenter interoperability, and a standards compliant rack management card. To enable customer choice and flexibility, these modular building blocks can be used independently to meet specific customer datacenter configurations. We believe _Project Olympus_ is the most modular and flexible cloud hardware design in the datacenter industry. We intend for it to become the foundation for a broad ecosystem of compliant hardware products developed by the OCP community.

![MSFT-ProjectOlympus-Server-Universal-Motherboard][1]

![MSFT-ProjectOlympus-19in-Universal-Rack][2]

We have already released the server chassis interfaces (mechanical and power) and the universal motherboard and PDU specifications on the [OCP GitHub branch][3], and in the coming weeks, we'll also open source the entire rack system as well.

Over the next two days at [Datacenter Dynamics: Zettastructure][4] in London, we'll share more about _Project Olympus_ through a keynote, OCP workshop and in the Microsoft booth where we'll have the hardware on display. The team and I are looking forward to working with the OCP community to establish the next generation of open source cloud hardware.

[Source](https://azure.microsoft.com/en-us/blog/microsoft-reimagines-open-source-cloud-hardware/ "Permalink to Microsoft reimagines open source cloud hardware | Blog")

[1]: https://azurecomcdn.azureedge.net/mediahandler/acomblog/media/Default/blog/80527689-6b4f-4ac8-bb93-25556376560c.jpg "MSFT-ProjectOlympus-Server-Universal-Motherboard"
[2]: https://azurecomcdn.azureedge.net/mediahandler/acomblog/media/Default/blog/1893aab1-9de0-4210-b96d-66e3945dd3c0.jpg "MSFT-ProjectOlympus-19in-Universal-Rack"
[3]: https://github.com/opencomputeproject/Project_Olympus
[4]: http://www.dcdconverged.com/conferences/zettastructure

  
