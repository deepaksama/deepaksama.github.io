---
layout: post
title: Software Architecture Problems
meta: 
category: architecture
published: true
comments: true
---

### Software Architecture Problems

1. __Problem :__ Facebook has an array of servers behind a load balancer for handling requests from users connecting via Web, Mobile etc. A logged in Facebook user will be connected to a specific server which is assigned by the Load Balancer. Whenever a logged in user clicks on the __like__ button, a log statement is generated in the log file of the corresponding server.  Assume that a new log file is generated from each server after 15 seconds and made available in a shared storage (like Amazon S3). You need to build a system by which the log files from all Facebook servers are parsed once they are made available. The objective is to create a Dashboard refreshing every 15 seconds that shows the top 100 most liked pages.


