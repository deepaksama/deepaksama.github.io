---
layout: post
title: Security Basics
meta: 
category: Security
published: true
---

1. What is the difference between authentication and authorization?

**Authentication** 
    - Is the process of verifying **who you are**. When you log on to a PC with a user name and password you are authenticating.
	
**Authorization** 
    - Is the process of verifying that **you have access to something**. Gaining access to a resource (e.g. directory on a hard disk) because the permissions configured on it allow you access is authorization.

1. What are the best practices while designing security for your RESTful web services?

Some important points while designing security for your RESTful web services:

* Use only HTTPS protocol so that your whole communocation is always encrypted.
* Never send auth credentials or API keys as query param. They appear in URL and can be logged or tracked easily.
* Use hardest encryption level always. It will help in having more confidence.
* For resources exposed by RESTful web services, it’s important to make sure any PUT, POST, and DELETE request is protected from **Cross Site Request Forgery (CSRF)**.
* Always validate the input data asap it is recieved in server method. Use only primitive data as input parameter as much as possible.
* Rely on framework provided validation features as they are tested by large community already.


<!-- 
References:

Good :
    https://blog.restcase.com/restful-api-authentication-basics/
    https://medium.com/tech-tajawal/microservice-authentication-and-authorization-solutions-e0e5e74b248a
    https://codeburst.io/thank-you-for-the-high-praise-190b59d778e9
    https://medium.freecodecamp.org/microservices-from-idea-to-starting-line-ae5317a6ff02

    https://sdtimes.com/apis/securing-microservices-the-api-gateway-authentication-and-authorization/

-->