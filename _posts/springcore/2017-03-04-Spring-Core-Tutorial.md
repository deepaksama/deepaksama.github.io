---
layout: post
title: Spring Core Turorial
meta: Spring framework has its featured spread accross 20 modules.  These modules are grouped into 
category: springcore
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
<br>
<div class="col-md-12">
	<div class="col-md-6">
	<!--![spring modules]({{site.baseurl}}/resources/images/spring-framework-modules.JPG)-->
	<img src="{{site.baseurl}}/resources/images/spring-framework-modules.JPG" class="content-image"/>
	</div>
</div>

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

This layer consists of 
* Web
* Web MVC
* WebSockets
* Portlet 

### **4. AOP**

Supports Aspect Oriented Programming.

### **5. Instrumentation**

Supports Class intrumentation support.

### **6. Messaging**
	
It provides key abstractions such as Message, MessageChannel and MessageHandler as foundation for messaging applications.
    
### **7. Test**

Supports the unit testing and integration testing of spring components with JUnit or TestNG. 



## Spring IoC container

Spring provides two distinct types of containers:
* BeanFactory
* ApplicationContext

### BeanFactory 

BeanFactory is representex by BeanFactory interface.  The most important implementations of BeanFactory are:
* XmlBeanFactory (___org.springframework.beans.factory.xml.XmlBeanFactory___).  This reads the bean definition from an XML file.

__Consructor:__

{% highlight java %}
	XmlBeanFactory(Resource resource);	
{% endhighlight %}

__Ex:__

{% highlight java linenos %}
Resource resource = new FileSystemResource("bean.xml");
BeanFactory beanFactory = new XmlBeanFactory(resource);
{% endhighlight %}

BeanFactory has 6 methods:

{% highlight java %}
	Object getBean(String name)
	boolean containsBean(String name)
	Object getBean(String name,Class type)
	Class getType(String name)
	boolean isSingleton(String name)
	String[] getAliases(String)
{% endhighlight %}

### ApplicationContext

ApplicationContext is also spring container.  BeanFactory provides basic fuctionality while ApplicationContext provides advanced features for enterprise level applications like i18n, event publishing, JNDI access, Remoting etc.

If By default all singleton beans are created eagerly at the time of ApplicationContext is created.  We can change this behaviour to lazy instantiation by using lazy-init attribute of bean tag.

{% highlight xml linenos %}
	<bean id="mybean" class="..." lazy-init="true"/>
{% endhighlight %}

### Implementations of ApplicationContext

There are 5 implementations of ApplicationContext

**1. ClassPathXmlApplicationContext**

This loads the bean definitions/configuration from xml file as class path resource.  This requires the CLASSPATH to be set properly.

___Ex 1:___ _Single configuration file_

{% highlight java %}
ApplicationContext context = new ClassPathXmlApplicationContext("myconfig.xml"); 
{% endhighlight %}

___Ex 2:___ _Multiple configuration file_

{% highlight java %}
ApplicationContext context = new ClassPathXmlApplicationContext(newString[]{"servicesconfig.xml","daoconfig.xml"}); 
{% endhighlight %}
	
**2. FileSystemXmlApplicationContext**

This loads the bean definitions/configuration from xml file located in file system. This requires the absolute file path to be provided.

___Ex:___
{% highlight java %}
ApplicationContext context = new FileSystemXmlApplicationContext("c:/myconfig.xml");
{% endhighlight %}

**3. XmlWebApplicationContext**

* XmlWebApplicationContext is a spring container for web applications. 
* It is an implementation of WebApplicationContext interface which interns extends from ApplicationContext interface.
* By default every spring web application creates XmlWebApplicationContext to represent ApplicationContext.
* This loads bean definitions from xml file /WEB-INF/applicationContext.xml.
* If we want bean definitions to be loaded from multiple configuration files then we can specify the file location in
contextConfigLocation parameter of ContextLoaderListener or DispatchServlet in web.xml.

**4. AnnotationConfigApplicationContext**

AnnotationConfigApplicationContext is when we are using java based configuration for bean definitions instead of xml.

___Ex:___
{% highlight java linenos%}
public static void main(String[]args){
	/* Creating Spring IoC Container Without XML configuration file*/
	ApplicationContext context= new AnnotationConfigApplicationContext(MyConfig.class);
	MyBean beanObj = context.getBean(MyBean.class);
	beanObj.someMethod();
}
{% endhighlight %}

The config class MyConfig can be written as:

{% highlight java linenos%}
@Configuration
public class MyConfig{
	@Bean
	public MyBean myBeanId(){
		return new MyBean();
	}
}
{% endhighlight %}

__Notes:__ 
* The class AnnotationConfigApplicationContext and the annotations _@Configuration_ , _@Bean_  are introduced in Spring 3.0.

**5. AnnotationConfigWebApplicationContext**

This is web application counter part for _AnnotationConfigApplicationContext_

By default spring web application uses XmlWebApplicationContext as ApplicationContext. 
To change this to AnnotationConfigWebApplicationContext by changing contextClass parameter of ContextLoaderListener or DispatchServlet in web.xml.

___Ex:___ _For ContextLoaderListener_

{% highlight xml linenos%}
<web-app>
	<context-param>
		<param-name>contextClass</param-name> 
			<param-value>   
				org.springframework.web.context.support.AnnotationConfigWebApplicationContext
		</param-value> 
	</context-param> 
	<context-param>
		<param-name>contextConfigLocation</param-name> 
		<!--MyConfig must be annotated with @Configuration-->
		<param-value> MyConfig</param-value>
	</context-param>
	<listener>
		<listener-class> 
			org.springframework.web.context.ContextLoaderListener 
		</listener-class>
	</listener> 
</web-app> 
{% endhighlight %}

___Ex:___ _For DispatcherServlet_

{% highlight xml linenos%}
<web-app>
	<servlet>
		<servlet-name>mydispatcher</servlet-name>
		<servlet-class > org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<init-param> 
			<param-name>contextClass</param-name> 
			<param-value>            
			 org.springframework.web.context.support.AnnotationConfigWebApplicationContext     
			</param-value>
		</init-param> 
		<init-param>   
			<param-name>contextConfigLocation</param-name>    
			<!--MyConfig must be class annotated with @Configuration-->
			<param-value> MyConfig </param-value>
		</init-param>
	</servlet>
	<servlet-mapping> 
		<servlet-name>mydispatcher</servlet-name>    
		<url-pattern>*.htm</url-pattern>
	</servlet-mapping>
</web-app>
{% endhighlight %}

<div class="col-md-12">
	<div class="col-md-7">
	<!--![spring modules]({{site.baseurl}}/resources/images/spring-framework-modules.JPG)-->
	<img src="{{site.baseurl}}/resources/images/application-context-impls.JPG" class="content-image"/>
	</div>
</div>


## Container Overview:

The ___org.springframework.contex.ApplicationContext___ represents the sprring IoC container.
Spring IoC container is responsibel for intantiating, configuring and assembling a forementioned beans.
The container gets its instructions on what objects to instantiate by reading configuration metadata.

### Configuration metadata	

Spring IoC Container is totally decoupled from the format in which configuration metadata is written.
This configuration metadata can be supplied in three forms
* XML-based configuration
* Annotation-based configuration
* Java-based configuration

#### <span class="underline">XML-based configuration</span>

XML-based configuration shows these beans configured as <bean> elements inside toplevel <beans> element.

___Ex:___

{% highlight xml linenos%}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
		http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="..." class="...">
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <bean id="..." class="...">
        <!-- collaborators and configuration for this bean go here -->
    </bean>

</beans>
{% endhighlight %}

#### <span class="underline">Annotation-based configuration</span>

For detailss on annotaion based configuratin refere to 
<br/>
{% for post in site.categories.springcore %}
	{% if post.title == 'Spring Annotation-based Configuration' %}
<a href='{{site.url}}{{post.url}}'> annotation-based configuration </a>
	{% endif %}
{% endfor %}

#### <span class="underline">Java-based configuration</span>

### Instantiating Container

Bean overview
Dependencies
Bean Scopes
Bean definition inheritence
Annotation based container configuration
Classpath scanning and 	mananged components
Using JSR330
Java based container configuration
