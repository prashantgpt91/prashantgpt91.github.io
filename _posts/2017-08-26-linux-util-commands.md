---
layout:     post
title:      Linux-util-commands
date:       2017-08-26 04:15:25
summary:   
tags: backend
comments: true
---

To monitor CPU Usage on any Linux distribution, use

    top -b -n2 -p 1 | fgrep "Cpu(s)" | tail -1 | awk -F'id,' -v prefix="$prefix" '{ split($1, vs, ","); v=vs[length(vs)]; sub("%", "", v); printf "%s%.1f%%\n", prefix, 100 - v }'

<!--break-->

To monitor CPU Usage on MacOSX, use this command or directly use activity monitor

    top -l 2 -n 0 -F | egrep -o ' \d*\.\d+% idle' | tail -1 | awk -F% -v prefix="$prefix" '{ printf "%s%.1f%%\n", prefix, 100 - $1 }'

To display RAM usage process-wise

    ps aux  | awk '{print $6/1024 " MB\t\t" $11}'  | sort -n

Kill a process running on specific port

    kill -9 $(lsof -t -i:4000)
    
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
    
    scp | src | destination
    scp -i proc.pem ubuntu@XX.X.XXX.XXX:model/util.py /home/prashant
    use scp -r -i for folder transfer


