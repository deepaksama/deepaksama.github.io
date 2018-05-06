---
layout: post
title: Spring Boot Interview questions
meta: 
category: spring boot
published: true
---

### 1. What is Spring Boot?

Over the years spring has become more complex with addtion of lot of new features.  To create a new spring application one has to add lot of configuration like maven dependencies configuration, application server configuration.  Lot of effort is required to get the application which is required as you may run into issues related dependencies which are not compatible and so on.  Spring boot provides a solutions to this problem.

Spring boot is written on top of Spring framework and lets you avoid all the boilerplate code and configuration and create a production ready application quickly by providing openionated configuration.

#### **Features of Spring Boot:**

* __Auto-Configuration__ : No need to manually configure dispatcher servlet, static resource mappings, property source loader, message converters etc.
* __Dependency Management__ : The different versions of commonly used libraries are pre-selected and grouped in different starter POMs that we can include in your project. By selecting one Spring Boot version we are implicitly selecting dozens of dependencies that we would have to otherwise select and harmonize ourself.
* __Advanced Externalized Configuration__ : There is a large list of bean properties that can be configured through application.properties file without touching java or xml config.
* __Production support__ : We get health checking, application and jvm metrics, jmx via http and a few more things for free.
* __Runnable Jars__ : We can package your application as a runnable jar with embedded tomcat included so it presents a self-contained deployment unit


### 2. What are the advantages of Spring Boot?

1. Avoids lot of maven imports and version conflicts.
2. Provides an opinionated development configuration which can be further tweeked with less effort to match the need.
3. Provides Quick start development by providng defaults configurations.
4. No seperate server or container is required.
5. Requires less configuration as there is no web.xml.  Simply add Java class with @Configuration to add bean configuration.
6. Allows environment based configuration using properties. You need to set Dspring.profile.active = {environment}.  Spring will then load the application properties file application-{environment}-properties after loading the main application properties file.

<!--


Reference: http://www.javainuse.com/spring/SpringBoot_HelloWorld_gradle

-->
