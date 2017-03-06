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
	spring-core and spring-beans modules provide the fundamental parts of the framework that includes IoC and Dependency Injection.
    The spring-context is build on top of base provided by Core and Beans modules.  It provides a means to access objects like JNDI registry.  It inherits features from Beans module and adds support for internationalization, event propagation, resource loading.  **Application Context** is the focal point of the context module.
    spring-context-support provides support for integrating common third-party libraries into spring applicatin context for caching (EHCache, Guava, JCache), mailing (JavaMail), scheduling (CommonJ, Quartz) and template entines(FreeMarker, Velocity, JasperReports).
    spring-expression module provides a power Expression language for querying and manipulating an object graph at runtime.
    
### **2. Data Access/Intergration**
	
### **3. Web**
### **4. AOP**
### **5. Instrumentation**
### **6. Messaging**
### **7. Test**


![spring modules]({{site.baseurl}}resources/images/spring-framework-modules.JPG)
