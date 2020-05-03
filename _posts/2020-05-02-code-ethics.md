---
layout: post
title:  Code ethics
categories: blog
tags: code
excerpt: Linting is the process of running a program that will analyse code for potential errors. As a developer, I would always want my code to use the same format everywhere (like tabs and spaces) use the best practices for good quality (like let/const rather than var)

---
Linting is the process of running a program that will analyse code for potential errors.

As a developer, I would always want my code to 

* use the same format everywhere (like tabs and spaces)
* use the best practices for good quality (like let/const rather than var)

Code formatter solves the first problem, it reprints the entire program from scratch in a consistent way.


Code linter solves the second problem, it helps to use the better syntaxes or new features of the programming languages and catch possible errors, but it’s not able to solve some difficult ones, like variable naming.

| Language | Functionality | Installation | Usage | Ref/Links
| ---------- | ---------- | ---------| ---------------| ----------------|
| python | Formatter | `pip install black` | `black filename.py` | https://github.com/psf/black
| python | Linter | `pip install pylint` | `pylint filename.py` | https://github.com/PyCQA/pylint
| python | Sort imports | `pip install isort` | `isort filename.py` | https://github.com/timothycrosley/isort


