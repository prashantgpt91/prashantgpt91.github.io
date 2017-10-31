---
layout:     post
title:      Git-util-commands
date:       2017-10-31 04:15:25
summary:   
tags: backend
comments: true
---


1. **Ignore file/folder while commit**

   For a File
   
            git add -u
            git reset -- main/dontcheckmein.txt
            git add .
            git commit -m "commit message"
            git push -u origin master
<!--break-->
    For a folder
    
            git add -u
            git reset -- main/*
            git add .
            git commit -m "commit message"
            git push -u origin master


2. **Use these commands to revert/delete your last (only one) commit** from the repo but keep in mind that if other contributors have pulled the code before you start reverting then it may cause problems.

            git reset --hard HEAD~1
            git push --force

   If you want to go back by more than one commit we can use
   
            git reset --hard HEAD~2
            git reset --hard HEAD~3
            git reset --hard HEAD~4

3. **To print the last n logs/details of git**

        `git log -n`
        
    Examples

        git log -1
        
            commit 8a72148741d8d18k40fbe8fd9e0b79d0812cd478
            Author: Prashant Gupta <prashantgpt91@gmail.com>
            Date:   Tue Oct 31 08:16:01 2017 +0000

            README.md created online with Bitbucket
        
        git log -2
        
            commit 8a72148741d8d28d23g56fd9e0b79da0812cd478
            Author: Prashant Gupta <prashantgpt91@gmail.com>
            Date:   Tue Oct 31 08:16:01 2017 +0000

            README.md created online with Bitbucket

            commit 6252c3c600699f54616had91616ef59b08d06dc4
            Author: Prashant Gupta <prashantgpt91@gmail.com>
            Date:   Tue Oct 31 08:08:34 2017 +0000

            med-app backend


    
        
