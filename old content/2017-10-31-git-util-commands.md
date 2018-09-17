---
layout:     post
title:      Git utility commands
date:       2017-10-31 04:15:25
summary:   
tags: backend
comments: true
---

1. **Ignore file/folder while commit**

   For a File
   <script src="https://gist.github.com/x0v/c0cb3e6b482526a9ee63db1d1e29a4ac.js"></script>
   For a folder 
   <script src="https://gist.github.com/x0v/9201d7045132147f4c44053523a72963.js"></script>
<!--break-->

2. **Use these commands to delete your last (only one) commit**

   From the repo but keep in mind that if other contributors have pulled the code before you start reverting then it may cause problems.
            
            git reset --hard HEAD~1
            git push --force

   If you want to go back by more than one commit we can use
   
            git reset --hard HEAD~2
            git reset --hard HEAD~3
            git reset --hard HEAD~4


3. **To print the last n logs/details of git**

            git log -n
        
    Examples
<script src="https://gist.github.com/x0v/f29d237d896967f0bc3ba5aeaf6f4959.js"></script>
            
4. **Delete a branch remotely** 
 
   <script src="https://gist.github.com/x0v/b6a54541763d9bfc14fda395184a542c.js"></script>
         
5. **Push to a remote branch different from master**
 
   <script src="https://gist.github.com/x0v/dc44d0efaa6146c545e473119fc711fe.js"></script>

 
6. **Change git username while pushing in git credentials**

   <script src="https://gist.github.com/x0v/91a40299225ea3e9638196909a3ce583.js"></script>

    
        
