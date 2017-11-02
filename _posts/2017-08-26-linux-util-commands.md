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

Search a process by it's name

        ps -aux | grep uwsgi

Kill all instances of a particular process, searching by it's name

        ps aux | grep -i uwsgi | awk '{print $2}' | xargs sudo kill -9

        For ex:
            You run this ps -aux | grep uwsgi command & it shows these many instances
                ubuntu    4738  0.0 13.7 1048556 555396 pts/1  Tl   Nov01   0:26 uwsgi --ini /var/www/demoapp/demoapp_uwsgi.ini
                ubuntu    4783  0.0 14.5 1087988 588608 pts/1  Tl   Nov01   0:25 uwsgi --ini /var/www/demoapp/demoapp_uwsgi.ini
                ubuntu    5232  0.0 14.8 1085076 601804 pts/1  Tl   Nov01   0:26 uwsgi --ini /var/www/demoapp/demoapp_uwsgi.ini
                ubuntu    5277  0.0 14.8 1085132 600596 pts/1  Tl   Nov01   0:25 uwsgi --ini /var/www/demoapp/demoapp_uwsgi.ini
                ubuntu    5293  1.4 14.2 1059432 576552 pts/1  Tl   Nov01   8:43 uwsgi --ini /var/www/demoapp/demoapp_uwsgi.ini
            then instead of killing one by one use above command.
        
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


