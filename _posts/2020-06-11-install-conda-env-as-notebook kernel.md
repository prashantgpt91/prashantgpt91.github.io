---
layout: post
title:  How to install conda env as notebook kernel
categories: blog
tags: misc
---
```
source activate ENVNAME
pip install ipykernel
python -m ipykernel install --user --name ENVNAME --display-name "Python (whatever you want to call it)"
```

