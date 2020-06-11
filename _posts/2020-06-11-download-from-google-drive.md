---
layout: post
title:  How to download files from google drive using wget
categories: blog
tags: misc
---

#### Google-drive sharing URL

`https://drive.google.com/file/d/1eh521MlEG582p3ztz3vGsrG7sYADuavq/view?usp=sharing`

Just replace fileID from drive URL which is `1eh521MlEG582p3ztz3vGsrG7sYADuavq` and use below command

`wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=FILEID' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=FILEID" -O FILENAME && rm -rf /tmp/cookies.txt`


