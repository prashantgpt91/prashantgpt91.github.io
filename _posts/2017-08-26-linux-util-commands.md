---
layout: post
title:  Linux utility commands
categories: blog
tags: backend
---

To monitor CPU Usage on any Linux distribution, use

<script src="https://gist.github.com/x0v/1da78328ab5ad53ede03f9e8bdd78863.js"></script>

<!--more-->

Find by file name

        sudo find / -name "ossec.conf"

Number of Cores

        sysctl -n hw.ncpu

Get processor info
  
        sysctl -n machdep.cpu.brand_string

To monitor CPU Usage on MacOSX, use this command or directly use activity monitor

<script src="https://gist.github.com/x0v/e1d168fae1eeff2475bf994dd3987588.js"></script>

To display RAM usage process-wise

        ps aux  | awk '{print $6/1024 " MB\t\t" $11}'  | sort -n

Kill a process running on specific port

        kill -9 $(lsof -t -i:4000)

Search a process by it's name

        ps -aux | grep uwsgi

Kill all instances of a particular process, searching by it's name

<script src="https://gist.github.com/x0v/c9a2a082d6f67a4c5ce885a49d3b3f96.js"></script>        

        
**Screen sessions utils**

create a screen session with name api

        screen -S api
    
kill a screen session

        screen -X -S sessionID quit
    
resume a screen session

        screen -r sessionID
    
list all screen sessions

        screen -ls
    

Sometimes we try to resume a screen session but it doesn't shows up and says there is no screen session matching this sessionID. It happens because of the abrupt disconnection from machine while a user is in that screen session.


        screen -d -r sessionID
    
scp command utils
    
<script src="https://gist.github.com/x0v/eed9f37c15a2a1c250de1f7d74471b23.js"></script>

Sort by Last modified.

        ls -ltr --block-size=M
        
Sort by Size

        ls -lS --block-size=M


