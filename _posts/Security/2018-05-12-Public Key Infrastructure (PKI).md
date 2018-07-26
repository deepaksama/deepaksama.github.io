---
layout: post
title: Public Key Infrastructure
meta: 
category: security
published: true
comments: true
---


What is TLS?
------------

TLS is based on SSL and was developed as a replacement in response to known vulnerabilities in SSLV3.
SSL is commonly used, and today usually refers to TLS

Security Provided
------------------

SSL/TLS provides data encryption, data integrity, and authentication.
That means, when using TLS you can be confident that 
- No one has read your message
- No one has changed your message
- You are communicating to the intended person (server)

When sending a message between two parties you have two problems that you need to address
1. How do you know that no one has read the message?
2. How do you know that no one has changed the message?

Solution to these problems are to:
1. Encrypt It: This makes the content unreadable so that, to anyone viewing the message it is just gibrish.
2. Sign It : This allows the recipient to be confident that it was you who sent the message, and that the message hasn't been changed.

Degital Keys and Algorithms
---------------------------

Both encryption and signatures requires the use of keys.

These keys are simply numbers (128 bit being common) that are then combined with the message using a particular method, commonly known as an algorithm.  Ex: RSA , either encrypt or sign message.

Think of the message and key as the ingredients and the algorithm as the recipe.


Ref:
https://access.redhat.com/documentation/en-US/Red_Hat_Certificate_System/8.0/html/Deployment_Guide/Introduction_to_Public_Key_Cryptography-Certificates_and_Authentication.html
http://www.java67.com/2012/12/difference-between-truststore-vs.html
https://javarevisited.blogspot.sg/2012/09/difference-between-truststore-vs-keyStore-Java-SSL.html
https://javarevisited.blogspot.sg/2011/11/ldap-authentication-active-directory.html


