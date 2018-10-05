---
layout:     post
title:      Serving Flask with Nginx + uWSGI
categories: blog 
tags: backend
---

### How this setup works?

Flask is managed by uWSGI.

uWSGI talks to nginx.

nginx handles contact with the outside world.


![](/images/image.png)

When a client connects to your server trying to reach your Flask app:

1. nginx opens the connection and proxies it to uWSGI

2. uWSGI handles the Flask instances you have and connects one to the client

3. Flask talks to the client happily

<!--more-->

### But Why do we even need nginx and uWSGI in front of Flask?
That is the question everyone should ask. Main reason is performance, of course. The Flasks built-in web server is a development server by Werkzeug which was not designed to be particularly efficient, stable, or secure.
And by all means Werkzeug was not optimized to serve static content, that is why production deployments of Flask apps rely on the following stack:

Front-end web-server (nginx or Apache): load balancing, SSL termination, rate limiting, HTTP parsing and serving static content.
WSGI application server (uWSGI, Gunicorn, CherryPy): runs WSGI compliant web applications and does it in a production-grade manner. Handling concurrent requests, process management, cluster membership, logging, configuration, shared memory, etc.
Obviously, development server which comes with Flask simply does not bother about all these tasks that production deployments face. That is why it is so strongly advised against using Flask’ server in any kind of production.
<script src="https://gist.github.com/x0v/0a237db017cbf0f1755e92f15f1808f7.js"></script>