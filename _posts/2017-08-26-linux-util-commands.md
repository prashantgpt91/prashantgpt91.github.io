---
layout: post
title:  Linux utility commands
categories: blog
tags: commands
---

| Tool Name | Tool purpose | URL/Ref
| ---------- | ---------- | ---------|
| ncdu | Analysing Disk space usage | https://dev.yorhel.nl/ncdu
| htop OR [cmd](https://gist.githubusercontent.com/prashantitis/e1d168fae1eeff2475bf994dd3987588/raw/98101dfc5d91216ccd0cd1b81dc8fccb2a74e8a2/cmd2) | To monitor CPU Usage on any Linux distribution | 
| `sudo find / -name "ossec.conf"` | Find by file name |
| `sysctl -n hw.ncpu` | Number of Cores |
| `sysctl -n machdep.cpu.brand_string` | Get processor info |
| `ps aux | awk '{print $6/1024 " MB\t\t" $11}'  | sort -n` | To display RAM usage process-wise |
| `kill -9 $(lsof -t -i:4000)`| Kill a process running on specific port |
| `ps -aux | grep uwsgi` | Search a process by it's name |
| [cmd](https://gist.github.com/prashantitis/c9a2a082d6f67a4c5ce885a49d3b3f96#file-cmd3) | Kill all instances of a particular process, searching by it's name |
| `screen -S api` | create a screen session with name api
| `screen -X -S sessionID quit` |  kill a screen session |
| `screen -r sessionID` | resume a screen session |
| `screen -ls` | list all screen sessions | 
| `screen -d -r sessionID` | Sometimes we try to resume a screen session but it doesn't shows up and says there is no screen session matching this sessionID. It happens because of the abrupt disconnection from machine while a user is in that screen session |
| [cmd](https://gist.github.com/prashantitis/eed9f37c15a2a1c250de1f7d74471b23#file-cmd4) | scp command utils |
| `ls -ltr --block-size=M` | Sort by last modified |
| `ls -lS --block-size=M` | Sort by size |
| `no space left on device` | Search in multiple log files |
| `df -T file.txt` | find out partition name for file.txt |
