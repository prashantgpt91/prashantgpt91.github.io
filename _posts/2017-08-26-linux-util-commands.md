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

