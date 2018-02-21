---
layout:     post
title:      Benchmarking right way
date:       2018-02-09 12:45:55
summary:   
tags: backend
comments: true

---
#### Benchmarking right way

Test a POST API using curl and record response times.

<script src="https://gist.github.com/x0v/7590f66d6660fc61cb6d514aef5c2eec.js"></script>



Content of curl-format.txt is
<script src="https://gist.github.com/x0v/f923e2eee0bf1496d33be33cc25ddbb0.js"></script>


<!--break-->

Sample output
<script src="https://gist.github.com/x0v/45a7fb238c0bc4f6d4bbe9502e84251f.js"></script>

Check this [URL](https://stackoverflow.com/questions/18215389/how-do-i-measure-request-and-response-times-at-once-using-curl) & [Curl Manpage](https://curl.haxx.se/docs/manpage.html) for more details.


Check by sending packets
		<script src="https://gist.github.com/x0v/f5cd5e38a0d3ba786b616dfc1f1ba7f7.js"></script>

Sample output
		<script src="https://gist.github.com/x0v/21d89a56958ab8f6a07e8833657c12f3.js"></script>

Benchmark POST API using ab

<script src="https://gist.github.com/x0v/b782c1975239bf46de0d3bc472d5d77f.js"></script>


