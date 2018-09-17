---
layout:     post
title:      Transferring file from my MAC to MSI Windows laptop - GPU 
categories: blog   
tags: backend
---

Prepare the PC for the files and find the PC’s network address

On the Windows 10 PC

If you're migtating from a MAC to a Windows 10 PC, follow these steps to create and then share a folder, and then find your PC's IP address:

<!--break-->


1. First, create and share a folder on your desktop. To do this, tollow these steps:

2. Right-click the Desktop and click New and then Folder and name the folder something like "From my MAC"

3. Right click the new folder on the desktop and click Share with and select Specific People.

If you see your user name in the File Sharing window you are ready to receive files, click Share and click Continue If prompted, and then click Done.





### To transfer your files over a network, you must connect both the Mac and the PC to the network. You will need a shared folder on the PC to migrate the files to and you will need the IP address for the PC, see Step 1 in this article to create and share the folder and get the IP address of the PC.

To Connect the MAC to the network and connect to the shared folder on the PC, follow these steps:

1. With Finder open on the Mac, press Command+K, or select Connect to Server from the Go menu.

2. Type smb:// and then the network address of the PC that you want to transfer files to. 

Example: smb://172.16.10.11


3. Cick Connect, you will be prompted to authenticate, if you have not specified a shared folder you will be prompted to select one.

4. Once your connected to the PC, locate the files to be migrated and drag them to the shared folder on the PC