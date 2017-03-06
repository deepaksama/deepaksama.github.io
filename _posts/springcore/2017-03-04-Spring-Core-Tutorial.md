---
layout: post
title: Java Collections
meta: Java Collections
category: java
published: true
---

Spring framework has its featured spread accross 20 modules.  These modules are grouped into 
* Core Container
* Data Access/Intergration
* Web
* AOP (Aspect oriented Programming)
* Instrumentation 
* Messaging
* Test

### **1. Core Container**
Core Container consists of below modules
* Core (___spring-core___)
* Beans (___spring-beans___)
* Context (___spring-context___)
* ContextSupport (___spring-context-support___)
* Spring Exression (___spring-expression___)

	___spring-core___ and ___spring-beans___ modules provide the fundamental parts of the framework that includes IoC and Dependency Injection.
    The spring-context is build on top of base provided by Core and Beans modules.  It provides a means to access objects like JNDI registry.  It inherits features from Beans module and adds support for internationalization, event propagation, resource loading.  **Application Context** is the focal point of the context module.
    ___spring-context-support___ provides support for integrating common third-party libraries into spring applicatin context for caching (EHCache, Guava, JCache), mailing (JavaMail), scheduling (CommonJ, Quartz) and template entines(FreeMarker, Velocity, JasperReports).
    ___spring-expression___ module provides a power Expression language for querying and manipulating an object graph at runtime.
    
### **2. Data Access/Intergration**
	Data Access/Integraion consits of below modules
* JDBC (___spring-jdbc___)
* ORM (___spring-orm___)
* JMS (___spring-jml___)
* OXM (___spring-oxm___)

With JDBC abstraction and DAO module (___sring-jdbc___) we can make the database code clean and simple, and prevent problems resulting from failure to close database resources.  It also provide a layer of meaningful exceptions on top of exceptions given by several database servers.  It makes user of Spring AOP module to provide transaction management services for objects in a spring application.

Spring ORM module (___spring-orm___) enables to tie into several ORM frameworks including Hibernate, JDO and iBATIS.  Spring transaction management supports both ORM frameworks and JDBC

The spring JMS (___spring-jms___) contains features for producing and consuming messages.  Since Spring 4.1 this provides integraion with ___spring-messaging___

The spring OXM (___spring-oxm___) provides an abstraction layer that supports Object/XML mapping implementation such as JAXB.

### **3. Web**


### **4. AOP**
### **5. Instrumentation**
### **6. Messaging**
### **7. Test**


![spring modules]({{site.baseurl}}resources/images/spring-framework-modules.JPG)
