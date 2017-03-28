---
layout: post
title: Spring Interview Questions
meta: Spring Interview Questions
category: spring
published: true
---

<hr>
## 1. Spring Overview
<hr>
### **1.1 What is Spring?**

* Spring is an open source java framework that provides infrastructure support of development of java applications.
* Spring framework make Java EE development easier and promote good programming practices by enabling POJO based programming model.

### **1.2	What are benefits for Spring framework?**

* Lightweight:  Spring is light weight when it comes to size.  The basic version of Spring framework is around 2MB
* Inversion of Control (IoC): Loose couple can be achieved in Spring with the Inversion of Control technique.  The objects are given their dependencies instead of creating or looking for dependent objects.
* Container:  Spring contains and manages the life cycle and configuration of application objects.
* Exception Handling: Spring provides a consistent API to translate technology specific exceptions (thrown by JDBC, Hibernate, or JDO) into consistent, unchecked exceptions.
* Aspect oriented Programming: Spring supports Aspect oriented programming and separates applications business logic from system services.
* MVC Framework: Springs web framework is well designed web MVC framework, which provides a great alternative to other frameworks like struts 2.
* Transaction Management: Spring provides a consistent transaction management interface which can scale up from local transaction to global transaction (JTA)


### **1.3	Which are the spring framework modules?**
The basic modules of Spring framework are:
* Core module
* Bean module
* Context module
* Expression Language (EL ) modules
* JDBC module
* ORM module
* OXM module
* Java messaging service(JMS) module
* Transaction module
* Web module
* Web-Servlet module
* Web-Struts module
* Web-Portlet module

___Ref :___ http://docs.spring.io/spring/docs/current/spring-framework-reference/html/overview.html

### **1.4	What is RFI?**

Interdependency causes three coding problems called RFI
* Rigidity: It is hard to change because every change affects too many other parts of the system.
* Fragility: When you make a change, unexpected parts of the system break.
* Immobility: It is hard to use the component in other application because it cannot be disintegrated form the current application.  

### **1.5	How to fix RFI?**
There are two rules to fix RFI:
* High level modules should not depend on low level modules and both should depend upon abstractions In other words, high level modules, which contain business logic and all other important meat of our application, should not depend upon lower level components.  The reason for this is if these lower level components were to change, the changes will affect high level components as well
* Abstraction should not depend upon details.  Before coding to the abstraction, we should find the common behaviours in the code and work backwards.  Interface/abstraction should cater to the intersection between the needs of our business logic and the lower level classes that implement the interface.

### **1.6	 What is BeanFactory?**

A BeanFactory is an implementation of factory pattern that contains a collection of beans.  The BeanFactory holds definitions of multiple beans within itself and then instantiates the bean whenever asked for by client. This is the simplest container providing basic support of Dependency Injection and defined by org.springframework.beans.factory.BeanFactory interface.
* BeanFactory applies Inversion of Control to separate the application code from application’s configuration and dependencies.
* BeanFactory also takes part in the lifecycle of a bean, making calls to custom initialization and destruction methods.

The most commonly used BeanFactory implementation is the XmlBeanFactory.

### **1.7	 What is Application Context?**

The ApplicationContext is the central interface within spring applications, which is used for providing configuration information to application.  It provides
* Bean factory methods for accessing application components.
* Publish application events to interested event listeners

In addition ApplicationContext adds more enterprise specific functionalities like
* Ability to resolve textual messages from properties file.
* ApplicationContext implements MessageSource, an interface used to obtain localized messages, with the actual implementation being pluggable.

This is defined by org.springframework.context.ApplicationContext interface.

### **1.8	What are the common implementations of the Application Context?**

There are 5 ApplicationContext implementations available:

* FileSystemXmlAppicationContext:  It loads the context definition from the XML file in the filesystem.
* ClassPathXmlApplicationContext:  It load the context definition from XML file located in the classpath, treating context definitions as classpath resources.  Here we do not need to give full path of the XML file but we need to set CLASSPATH properly because this container will look bean configuration XML file in CLASSPAH.
* WebXmlApplicationContext: This container loads the XML file with bean definitions within a web application.  In other words it loads the context definition from an XML file contained within a web application.

### **1.9	What should I use Bean Factory or Application Context?**

ApplicationContext container includes all the functionality of the BeanFactory container, so it is generally recommended over BeanFactory.  BeanFactory can still be used for lightweight applications like mobile device or applet based applications where data volume and speed is significant.

### **1.10	What is AOP Modules?**

The AOP module is used for developing aspects in spring enabled application.  Much of the functionality is provided by the AOP alliance in order to ensure the interoperability between Spring and other AOP frameworks.  With springs metadata support, we will be able to add annotations to our source code that instructs spring on where and how to apply aspects.

### **1.11	What is AOP Alliance?**

AOP alliance is an open source project whose goal is to promote adoption of AOP and interoperability between different AOP implementations by defining common set of interfaces and components.

### **1.12	Explain the JDBC abstraction and DAO module?**

With JDBC abstraction and DAO module we can make the database code clean and simple, and prevent problems resulting from failure to close database resources.  It also provide a layer of meaningful exceptions on top of exceptions given by several database servers.  It makes user of Spring AOP module to provide transaction management services for objects in a spring application.

### **1.13	Explain object/relational mapping (ORM) integration module?**

Apart from JDBC spring supports use of ORM tool by providing ORM module.  This enables to tie into several ORM frameworks including Hibernate, JDO and iBATIS.  Spring transaction management supports both ORM frameworks and JDBC

### **1.14	What is Web Module?**

This module built on top of the application context to provide a context appropriate to web-based applications.  This modules contains support for
* Web based tasks such as transparently handling multipart requests for file uploads
* Programmatic binding of request parameters to business objects
* Integration support for Jakarta struts

### **1.15	What is spring Configuration file?**

Spring configuration file is an XML file.  This file contains bean definitions and describe how these beans are connected to each other.

<hr>
## 2.	 Dependency Injection
<hr>
### **2.1	What is Inversion of Control (IoC)?**

Inversion of Control (IoC) is an abstract principle which describes the aspect of software architecture design in which the flow of control of the system is inverted in comparison to procedural programming.

Traditionally, each object is responsible for obtaining its own references to the objects it collaborate with (its dependencies).  With IoC objects are given their dependencies by external entity that coordinates each object in the system.

The main idea behind IoC as a concept is that component dependencies, lifecycle events, and configuration resides outside of the components themselves. In case of Spring they reside in the framework.  This makes our code more manageable, more testable and more portable.  

There are several basic techniques to implement Inversion of Control.  These are:
*	Factory pattern
*	Dependency injection:  There are three type of dependency injection
	* Constructor injection
	* Setter injection
	* Interface injection
*	Service locator

### **2.2	What is Dependency Injection?**

Dependency injection is a software design pattern in which one or more dependencies (or services) are injected, or passed into a dependent object (or client) and are made part of clients state.  This pattern separates the creation of client’s dependencies from its own behaviour

Dependency injection involves four elements:
* The implementation of service object.
* The client object which depend on the service
* The interface the client uses to communicate with service
* And the injector object, which is responsible for injecting the service into the client.  This may also be referred to as an assembler, provider, container, factory or spring.

### **2.3	What is the problem which Dependency injection solves?**

Dependency injection is the solution to the problem where an object has dependency which can be supplied from variety of interchangeable sources of the same type.  Instead of identifying the actual source internally, which would require knowledge of all the possible alternatives, the choice is made externally, which means that new choices can be made available without having to modify the consuming object.

### **2.4	What are the advantages of Dependency Injection?**

Advantages of Dependency injection:
* It allows the client to remove all knowledge of a concrete implementation that it needs to use. This helps isolate the client from impact of changes in implementation.  It promotes reusability, testability and maintainability.
* Dependency injection decreases coupling between class and its dependencies.
* Used for externalize a systems configuration details into configuration files allowing the system to reconfigure without recompilation.
* Helps reduce the boilerplate code in the application objects since all work to initialize or setup dependencies is handled by provider component.
* Allows concurrent or independent development.  Two developers can independently develop classes that use each other, while only needing to know the interface the classes will communicate through.  Plugins are often developed by third party developers who never even talk to the developers who created the product which uses the plugin.

### **2.5	What are the disadvantages of Dependency Injection?**

Disadvantage of DI:

* Dependency injection makes code difficult to read, because it separates the behaviour from construction.  That means developer need to refer more files to follow how the system performs.
* Typically requires more lines of code to accomplish the same behaviour legacy code would.

### **2.6	What is service locator pattern?**

The basic idea of about service locator pattern is to decouple Service Consumer from Service Providers.  This allows the consumer to easily change the service provider.
 
### **2.7	How Dependency Injection is different from Service Locator?**

Dependency Injection:  It allows to plug-in a suitable implementation of a dependency according to the environment and usage.

Service Locator: The basic idea behind Service Locator is to have an object that knows how to get hold of all of the services that application might need.  It then scans all such services and store them as a singleton registry.  A requestor can then query the registry with a token and get an appropriate implementation of dependency.

### **2.8	Which one is better to use Service Locator or Dependency Injection?**

* With the Service Locator every user of service has a dependency to service locator.  It means the object must know the details of service locator.  This is not the case with Dependency injection.
* Using dependency injection can make it easier to see what are component dependencies are.  With the service locator you have to search the source code for calls to service locator.
* A common reason people give preference to dependency injection is that it makes testing easier.   The point here is that to do testing, you need to easily replace real service implementation with stub or mocks.

### **2.9	  Which is better injection setter or constructor?**

This question mirrors a more general issue with object oriented programming – should you fill fields with constructor or with setters.

We can use constructor based injection for mandatory dependencies and setter based injection for optional dependencies.

In setter injection strategy, we trust IoC container that it will create the bean first and do the injection using setter method.  As the injection is done according to the configuration, if you somehow misses to specify any bean to inject in the configuration, the injection will not be done for those beans and your dependent bean will not function accordingly when it is in use.

In constructor injection strategy, container imposes to provide the dependencies properly while constructing bean.  This is addressed as “container-agnostic manner”, as we are required to provide dependencies while creating the bean, thus making the visibility of dependency, independent of any IoC container.

### **2.10	How to prevent container from creating bean by constructor injection with null values instead of missing beans?**

We have no option to really miss any <constructor arg> , because your are imposed by IoC container to provide all the constructor arguments needed to match a provided constructor for creating the bean.  
<hr>
## 3. Spring Beans
<hr>
### **3.1	What are Spring beans?**

The Spring beans are Java Objects that form the spring application.  They are instantiated, assembled and managed by the Spring IoC Container.  These beans are created with the configuration metadata that is supplied to the container.
The attribute in bean tag named singleton specify whether a bean is singleton.  If this is set to true then bean becomes singleton and if set to false then the bean becomes prototype bean.  By default it is set to true.

### **3.2	What does spring bean definition contain?**
Spring bean definition contains all configuration metadata for the container to know 
* How to create bean
* Its dependencies
* It lifecycle details

### **3.3	How do you provide configuration metadata to spring container?**
There are three ways to provide configuration metadata to Spring Container
* XML based configuration file
* Annotation based configuration
* Java based configuration

### **3.4	How to do you define the scope of a bean?**

When defining the bean with <bean> tag in spring we declare scope for the bean also.  It can be defined through the scope attribute of the <bean> tag.

* When spring has to produce new bean instance every time one is needed, the scope attribute to be prototype.
* When same instance of the bean must be  returned by Spring every time it is needed, the bean scope attribute to be set to singleton

### **3.5	Explain bean scopes supported by Spring?**

Spring framework support following 5 scopes:

* _singleton:_ Spring scopes the bean definition to one instance for Spring IoC Container.
* _prototype:_ This scopes a bean definition to have any number of instances.
* _request:_ This scopes a bean definition to HTTP request.  Only valid in the context of web-aware Spring AppicationContext.
* _session:_ This scopes the bean definition to HTTP session. Only valid in the context of a web-aware Spring ApplicationContext.
* _global-session:_ This scopes the bean definition to global HTTP session. Only valid in the context of a web-aware Spring ApplicationContext.

### **3.6	Are singleton beans thread safe in Spring Framework?**

No, singleton beans are not thread safe in Spring Framework.

### **3.7	Explain Bean lifecycle in Spring Framework?**

1. Spring container finds bean definition from the configuration metadata (XML file) and instantiates the Bean
1. Using dependency injection, spring populates all the properties specified in the bean definition.
1. If the bean implements the BeanNameAware  interface, the factory calls setBeanName() method passing the bean ID
1. If the bean implements BeanClassLoaderAware interface, the factory calls the setBeanClassLoader() method
1. If the bean implements BeanFactoryAware interface, the factory calls the setBeanFactory() method passing an instance of itself.
1. If the bean implements ResourceLoaderAware interface, the factory calls the setResourceLoader() method.
1. If the bean implements ApplicationEventPublisherAware interface, the factory calls the setApplicationEventPublisher() method.
1. If the bean implements MessageSourceAware interface, the factory calls the setMessageSource() method.
1. If the bean implements ApplicationContextAware interface, the factory calls the setApplicationContext() method.
1. If the bean implements ServletContextAware interface, the factory calls the setServletContext() method.
1. If there is any BeanPostProcessor associated with the bean, spring calls postProcessBeforeInitialization() method
1. If the bean implements InitializingBean , its afterProperitySet() method is called.  
1. If the bean has init-method specified it will be called. (custome-init)
1. If there is any BeanPostProcessor is associated with bean, postProcessAfterInitialization() method is called.

When Bean factory is getting shutdown following lifecycle methods will be executed.
11. destroy() method of DisposableBean is invoked by BeanFactory on destruction of a singleton.
11. if the bean has destroy-method specified it will be executed.(custom destroy)

___Ref:___ http://javabeginnerstutorial.com/spring-framework-tutorial/java-spring-bean-lifecycle/

### **3.8	Which are the important bean lifecycle methods? Can you override them?**
There are two important lifecycle methods.
* The first one is setup method which is called when bean is loaded into the Container
* The second is teardown method which is called when the bean is unloaded from the container.

The &lt;bean&gt; tag has two important attributes ___init-method___ and ___destroy-method___ with which we can define our own custom initialization and destroy methods.  There are corresponding annotations ___@PostConstruct___ and ___@PreDestroy___ also available.

### **3.9	What are inner beans in Spring?**

Inner beans are beans that are defined within the scope of bean.  Thus, a <bean> element inside <property> or <constructor-arg> elements is called inner bean and can be declared as below:

{% highlight xml linenos %}
<bean id="outerBean" class="...">
     	<property name="target">
       		 <bean id="innerBean" class="..."/>
     	</property>
</bean>
{% endhighlight %}

•	Inner beans are always anonymous and they are always scoped as prototypes.
•	You can't inject inner beans into other beans other than the enclosing bean.
•	When a bean needs to be used for only one purpose. it’s advised to declare it as an inner bean

### **3.10 How can you inject Java Collection in Spring?**

Spring offers four types of collection configuration elements which are as follows

__Element Description__

* ___&lt;list&gt;___	Helps wiring or injecting a list of values, allowing duplicate values
* ___&lt;set&gt;___	Helps wiring a list of values, not allowing duplicates
* ___&lt;map&gt;___	Used to inject a collection of name-value pairs where name and value can be of any type
* ___&lt;props&gt;___	Used to inject a collection of name-value pairs where name and value both are Strings

___Ex:___

{% highlight xml linenos %}
<bean id="javaCollection" class="com.tutorials.JavaCollection">
      <!-- results in a setAddressList(java.util.List) call -->
      <property name="addressList">
         <list>
            <value>INDIA</value>
            <value>Pakistan</value>
            <value>USA</value>
            <value>USA</value>
         </list>
      </property>

      <!-- results in a setAddressSet(java.util.Set) call -->
      <property name="addressSet">
         <set>
            <value>INDIA</value>
            <value>Pakistan</value>
            <value>USA</value>
            <value>USA</value>
        </set>
      </property>

      <!-- results in a setAddressMap(java.util.Map) call -->
      <property name="addressMap">
         <map>
            <entry key="1" value="INDIA"/>
            <entry key="2" value="Pakistan"/>
            <entry key="3" value="USA"/>
            <entry key="4" value="USA"/>
         </map>
      </property>
      
      <!-- results in a setAddressProp(java.util.Properties) call -->
      <property name="addressProp">
         <props>
            <prop key="one">INDIA</prop>
            <prop key="two">Pakistan</prop>
            <prop key="three">USA</prop>
            <prop key="four">USA</prop>
         </props>
      </property>

</bean>
{% endhighlight %}

### **3.11 What is bean wiring?**
Bean wiring is the process of collaborating beans within the Spring Container.  For wiring we should tell the Container what beans are required and how the container should use dependency injection to tie them together. 

### **3.12	What is bean auto wiring? Explain different modes of auto-wiring?**
Spring container can wire relationships between collaborating beans without using ___&lt;constructor-arg&gt;___ and ___&lt;property&gt;___ tags, which helps cut down the amount of XML configuration we write for a big Spring based applications.


<table class="table table-bordered table-compact">
	<thead>
		<th>Mode</th>
		<th>Description</th>
	</thead>
	<tbody>
		<tr>
			<td> byName</td>
			<td>
			Autowiring by property name.  Spring looks into the properties of the beans on which autowire attribute is set to “byname” in the XML configuration file. It then tries to match and wire its properties with beans defined by the same names in configuration file.
			Ex:
				{% highlight xml linenos %}
<bean id="customer" class="com.mkyong.common.Customer" autowire="byName" />
<bean id="person" class="com.mkyong.common.Person" />
				{% endhighlight %}
			</td>
		</tr>
		<tr>
			<td>byType</td>
			<td>
Autowire a bean by property data type.  Spring looks into the properties of bean on which autowire attribute is set to “byType” in the XML configuration file.  It then tries to match and wire a property if its type matches with exactly one of the bean name in configuration file.  If more than one such beans exists a fatal exception is thrown.
{% highlight xml linenos %}
<bean id="customer" class="com.mkyong.common.Customer" autowire="byType" />
<bean id="person" class="com.mkyong.common.Person" />
{% endhighlight %}
			</td>
		</tr>
		<tr>
			<td>constructor	</td>
			<td>
			This is similar to autowire byType, but the type applies to Constructor arguments.  If there is no bean of constructor argument type in the container, fatal error occurs.
			<br/>
			Ex:
{% highlight xml linenos %}
<bean id="customer" class="com.mkyong.common.Customer" autowire="constructor" /> 
<bean id="person" class="com.mkyong.common.Person" />
{% endhighlight %}
			</td>
		</tr>
		<tr>
			<td>autodetect</td>
			<td>Spring ties to wire using autowire by Constructor.  If it doesn’t work it tries using autowire byType.
<br/>Ex:
{% highlight xml linenos %}
<bean id="customer" class="com.mkyong.common.Customer" autowire="autodetect" />
<bean id="person" class="com.mkyong.common.Person" />
{% endhighlight %}
			</td>
		</tr>

	</tbody>
</table>


### **3.13	What are the disadvantages or limitations of autowiring?**

Limitations of auto wiring are:

<table class="table table-bordered">
	<thead>
			<td>Limitation</td>
			<td>Description</td>	
	</thead>
	<tbody>
		<tr>
			<td>Overriding Possibility</td>
			<td>You can still specify <italic>&lt;constructor-arg&gt;</italic> and &lt;property&gt; settings which will always override autowiring.</td>
		</tr>
		<tr>
			<td>Primitive data types</td>
			<td>You cannot autowire simple properties such as primitives, Strings and Classes</td>
		</tr>
		<tr>
			<td>Confusing nature</td>
			<td>Autowiring is less exact than explicit wiring, so if possible prefer using explicit wiring</td>
		</tr>
	</tbody>
</table>

### **3.14 Can you inject null and empty String values in Spring?**

Yes, you can.

___Ex:___
___Constructor argument:___

_Correct way:_
{% highlight xml linenos %}
<bean id="defaultMongoTypeMapper" class="…">
	<constructor-arg name="typeKey">
		<null />
	</constructor-arg>
  </bean>
{% endhighlight %}

_Incorrect way:_

{% highlight xml linenos %}
<bean id="defaultMongoTypeMapper1" 	 class="…">
	<constructor-arg name="typeKey" value="null" />
</bean>
{% endhighlight %}

___Property:___

_Correct way:_

{% highlight xml linenos %}
	<bean id="myConverter"	class="…">
		<property name="typeMapper"><null/></property>
  	</bean>
{% endhighlight%}

_Incorrect way:_

{% highlight xml linenos %}
	<bean id="myConverter"	class="…">
		<property name="typeMapper" value="null" />
  	</bean>
{% endhighlight %}

<hr>
## 4. Spring Annotations
<hr>

### **4.1	What is annotation based container configuration?**

Spring provides an alternative to XML based configuration by annotation based configuration which relies on bytecode metadata.
Instead of using XML to describe bean wiring, the developer moves the configuration into the component class itself by using annotations on the relevant class, method or field declaration.

### **4.2	How do you turn on annotation wiring in spring?**

Annotation wiring is not turned on in the spring container by default.  In order to user annotation based wiring we must enable it in our spring configuration file by configuring <context:annotation-config/> element.

### **4.3	What is spring Java Based configuration? Give example?**

Java based configuration is an alternate approach provided by spring to write your spring configuration without XML but with the help of some annotations.  The @Configuration annotation is used to indicate a class that can be used by Spring IoC container as a source of bean definitions.  The @Bean annotation is used to mark a method inside configuration class as method which returns an object which should be registered as bean in spring application context.

### **4.4	Explain _@Required_ annotation?**

The _@Required_ annotation is applied to a bean property setter method and it indicates that the bean property must be populated in XML configuration file at the time of configuration otherwise the container throws a BeanInitializationException exception.


{% highlight java linenos %}
import org.springframework.beans.factory.annotation.Required;

public class Student {
   private Integer age;
   private String name;

   @Required
   public void setAge(Integer age) {
      this.age = age;
   }
   public Integer getAge() {
      return age;
   }

   @Required
   public void setName(String name) {
      this.name = name;
   }
   public String getName() {
      return name;
   }
}
{% endhighlight %}

{% highlight xml linenos %}
<!-- Definition for student bean -->
   <bean id="student" class="com.tutorialspoint.Student">
      <property name="name"  value="Zara" />

      <!-- try without passing age and check the result -->
      <!-- property name="age"  value="11"-->
   </bean>
   
{% endhighlight %}

The above should throw __BeanInitializationException__ as age is not configured.
		
### **4.5	Explain _@Autowired_ annotation?**

The _@Autowired_ annotation provides more fine grained control on where and how autowiring should be accomplished.  @Autowired annotation can be used  

•	On setter method just like @Required annotation to get rid of <property> tag in XML configuration file.  When spring finds an @Autowired annotation used with setter method it performs autowiring byType on method. 

{% highlight java linenos %}

public class TextEditor {
   private SpellChecker spellChecker;

   @Autowired
   public void setSpellChecker( SpellChecker spellChecker ){
      this.spellChecker = spellChecker;
   }
   public SpellChecker getSpellChecker( ) {
      return spellChecker;
   }
   public void spellCheck() {
      spellChecker.checkSpelling();
   }
}
{% endhighlight %}

{% highlight xml linenos %}
   <!-- Definition for textEditor bean without constructor-arg  -->
   <bean id="textEditor" class="com.tutorialspoint.TextEditor">
   </bean>

   <!-- Definition for spellChecker bean -->
   <bean id="spellChecker" class="com.tutorialspoint.SpellChecker"/>
   
{% endhighlight %}

•	On constructor
You can apply _@Autowired_ to constructor also.  This would indicate that constructor injection is used when creating the bean, even if no <constructor-arg> element is used while configuring the bean in XML file.

{% highlight java linenos %}
public class Customer 
{
	private Person person;
	private int type;
	private String action;
	//getter and setter methods
 
	@Autowired
	public Customer(Person person) {
		this.person = person;
	}
}
{% endhighlight %}

•	On a property 
You can use @Autowired annotation on property to get rid of setter methods.

{% highlight java linenos %}
public class Customer 
{
	@Autowired
	private Person person;
	private int type;
	private String action;
	//getter and setter methods
}
{% endhighlight %}

XML config:

{% highlight xml linenos %}
	<bean id="CustomerBean" class="com.mkyong.common.Customer">
		<property name="action" value="buy" />
		<property name="type" value="1" />
	</bean>
 
	<bean id="PersonBean" class="com.mkyong.common.Person">
		<property name="name" value="mkyong" />
		<property name="address" value="address ABC" />
		<property name="age" value="29" />
	</bean>
{% endhighlight %}

•	On a method with arbitrary name and/or multiple arguments.
Note:
Even if we have used utmost care in autowiring bean dependencies, still you may find strange lookup failures.  So, to solve this problem you will need to make autowiring optional so that if no dependency found, application should not throw any exception and autowiring should be simply ignored.  This can be done in two ways.
•	If you want specific bean autowiring optional for a specific bean property user required=false attribute in @Autowired

{% highlight java linenos %}
public class Student {
   private Integer age;
   private String name;

   @Autowired(required=false)
   public void setAge(Integer age) {
      this.age = age;
   }
   
   public Integer getAge() {
      return age;
   }

   @Autowired
   public void setName(String name) {
      this.name = name;
   }
   
   public String getName() {
      return name;
   }
}
{% endhighlight %}

•	If you want to apply optional autowiring at global level for all properties in all beans, then use below configuration.

{% highlight xml linenos %}
<bean class="org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor">
    <property name="requiredParameterValue" value="false" />
</bean>
{% endhighlight %}

### **4.6	Explain @Qualifier annotation?**
@Qualifier means, which bean will qualify for autowiring on a field.  The @Qualifier annotation helps to disambiguate bean references when spring would otherwise not able to do so.
Ex:

{% highlight java linenos %}
public class Customer
{
    @Autowired
    private Person person;
}
{% endhighlight %}

{% highlight xml linenos %}
<bean id="customer" class="com.howtodoinjava.common.Customer" />
 
<bean id="personA" class="com.howtodoinjava.common.Person" >
    <property name="name" value="lokesh" />
</bean>
 
<bean id="personB" class="com.howtodoinjava.common.Person" >
    <property name="name" value="alex" />
</bean>
{% endhighlight %}

From above spring would not know which bean should be autowired. This will result in NoSuchBeanDefinitionException.  To resolve this use @Qualifier as below:
{% highlight java linenos %}
public class Customer
{
	@Autowired
	@Qualifier("personA")
	private Person person;
}
{% endhighlight %}

<hr>
## 5. Spring Data Access
<hr>

### **5.1	How can JDBC be used more efficiently in the Spring framework?**

With Spring JDBC framework user is freed from the burden of 
•	Opening and closing of connection
•	Writing unnecessary code to handle exceptions
The developer has to just define connection parameters and specify the SQL statements to be executed and do the required work for each iteration while fetching the data.

### **5.2	What are the problem of JDBC API which lead to Spring JDBC support?**

Problems with the JDBC API are as follows:
•	We need to write lot of boilerplate code before and after execution of query, such as creating connection, statement and closing connection and result set.
•	We need to perform exception handling code on the JDBC code

### **5.3	Explain JdbcTemplate?**

JdbcTemplate is a central class in Spring JDBC support classes.  
•	It takes care of creation and releasing of database resources and saving lot of work and time for us.  
•	It converts the vendor specific error messages to better understandable error messages.
•	More convenience is the usage of RowMapper which allows us to translate the SQL results into an Object(ResultSetExtractor) or List of objects(RowMapper)
	
### **5.4	What is Spring DAO support?**

The Spring DAO support is aimed at making it easy to work with data access technologies like JDBC, Hibernate and so on in consistent way.  This allows us to switch between technologies fairly easily and to code without worrying about the catching exceptions that are specific to each technology.

### **5.5	What are the ways to integrate with Hibernate using Spring?**
There are two ways to integrate Hibernate with Spring:
•	Inversion of Control with a HibernateTemplate and callback
Step 1: Configure data source and SessionFactory in configuration
{% highlight xml linenos %}
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
<property name="driverClassName" value="com.mysql.jdbc.Driver"/>
	<property name="url" value="jdbc:mysql://localhost/test"/>
	<property name="username" value="root"/>
	<property name="password" value="root"/>
</bean>
<bean id="sessionFactory" class="org.springframework.orm.hibernate4.LocalSessionFactoryBean">
	<property name="dataSource" ref="dataSource"/>
	<property name="packagesToScan" value="org.javabrain.model"/>
	<property name="hibernateProperties">
		<props>
			<prop key="dialect">>org.hibernate.dialect.MySQLDialect</prop>
		</props>
	</property>
</bean>

<bean id="circleDAO" class="org.javabrain.dao.CircleDAOImpl">
	<property name="sessionFactory" ref="sessionFactory"/>
</bean>
{% endhighlight %}

Step 2: Write DAO

{% highlight java linenos %}
public interface CircleDAO {
	public int getCircleCount();
}
{% endhighlight %}

Step 2: Implement DAO with HibernateTemplate as member and injection Session Factory

{% highlight java linenos %}
public class CircleDAOImpl implements CircleDAO{

	HibernateTemplate hibernateTemplate;	
	
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.hibernateTemplate = new HibernateTemplate(sessionFactory);
	}

	public int getCircleCount() {
		String sql = "from Circle";
		//List<Circle> cList = (List<Circle>) hibernateTemplate.find(sql);
		List<Circle> cList = (List<Circle>) hibernateTemplate.find(sql);
		return cList.size();
		
	}
}
{% endhighlight %}
•	Extending HibernateDAOSupport and applying an AOP interceptor node.
Both Step 1& 2 remains same

Step 3: Extend the DAO implementation class from HibernateDaoSupport and implement DAO interface
{% highlight java linenos %}
public class CircleDAOImpl extends HibernateDaoSupport implements CircleDAO{

	public int getCircleCount() {
		String sql = "from Circle";
		//List<Circle> cList = (List<Circle>) hibernateTemplate.find(sql);
		List<Circle> cList = (List<Circle>) getHibernateTemplate().find(sql);
		return cList.size();		
	}
}
{% endhighlight %}
<hr>
## 6.	Aspect Oriented Programming (AOP)
<hr>
### **6.1	Explain AOP?**
Application logic can be divided into two distinct areas.
* 	Core business logic – it’s a code written to satisfy a functional requirement.
* 	Cross cutting concerns – It is a utility logic that is used in several places in our system or application. Examples include logging, transaction management, performance management and security.  While none of these address function requirement, they remain fundamental parts of application.

 	There are two challenges with cross cutting concerns:
* 	They are scattered across the application which lead to considerable duplicate code
* 	They become mixed with business logic and results in code that is difficult to maintain as there is no clear separation of concerns.
AOP is a programming paradigm that aims at addressing these issues by providing a means of modularizing application logic, so that each module addresses a distinct concern.

### **6.2	Explain AOP Concepts and Terminology?**
1. ___Aspect:___ An aspect is an application concern that cuts across multiple objects or modules, such as transaction management.  Aspect can be a normal class configured through spring configuration XML or we can use spring AspectJ integration to define a class as Aspect using @Aspect annotation.
1. ___Join Point:___  A join point is the specific point in the application such as method execution, exception handling and changing object field access etc.  In spring AOP a join point is always the execution of a method.
1. ___Advice:___ Advices are actions taken for a particular join point.  In terms of programming, they are the methods that get executed when a certain join point with matching point cut is reached in the application. 
1. ___Pointcut:___ Pointcuts are expressions that are matched with join point to determine whether advice needs to be executed or not.  Spring framework uses the AspectJ pointcut expression language.
1. ___Target Object:___ They are the objects on which advices are applied.  Spring AOP is implemented using runtime proxies so these objects are always proxy objects.  What it means is that a subclass is created at runtime where target method is overridden and advices are included based on their configuration.
1. ___AOP Proxy:___ Spring AOP implementation uses JDK dynamic proxy to create the Proxy classes with target classes and advice invocations, these are called AOP proxy classes.  We can also use CGLIB proxy by adding it as dependency in the spring AOP project.
1. ___Weaving:___  It is the process of linking aspects with other objects to create the advised proxy objects.  This can be done at compile time, load time or at runtime.  Spring AOP performs this at runtime.

<hr>
## 7. Spring Model View Controller
<hr>

### **7.1	What is spring MVC framework?**

Spring come with a full featured MVC framework for building web applications.  Although spring can be integrated with other MVC frameworks like struts, spring MVC uses IoC to provide clean separation of controller logic from business objects.  It also allows to declaratively bind request parameters to business objects.

### **7.2	What is DispatchServlet?**

DispatchServlet is a servlet and spring MVC is designed around this servlet.  This handles all the HTTP requests and responses.

### **7.3	What is WebApplicationContext?**

WebApplicationContext is an extenstion of ApplicationContext that has some extra features necessary for web application.  It differs from normal ApplicationContext in that it is capable of resolving themes. 

### **7.4	What are the advantages of Spring MVC over Struts MVC?**

•	Spring can be configured with different view technologies like Freemaker, Tiles, velocity, JSP etc. and also we can create our own custom view mechanism by implementing Spring View interface.
•	In spring MVC controllers can be configured using DI (IoC) that makes testing and integration easy
•	Struts force your controller to extend a Structs Class but spring doesnot. 
•	With struts validation is usually performed (implemented) in the validate method of an Action.  In Spring MVC validators are business objects that are not dependent on the Servlet API which makes these validators to be reused in your business logic before persisting domain object to DB.

### **7.5	What is Controller in Spring MVC framework?**

Controller interprets user input and transforms it into model that is represented to the user by the view.  Spring implements Controller in very abstract way, which enables you to create wide variety of controllers.

### **7.6	What is @Controller annotation?**

The @Controller annotation indicates that a particular class serves the role of a controller.  Spring does not require us to extend any controller base class or to reference the servlet API.

### **7.7	Explain @RequestMap annotation?**

@RequestMap annotation is used to map a URL to either an entire class or a particular handler method.



<!--
DI
Ref: 
http://www.tonymarston.net/php-mysql/dependency-injection-is-evil.html#tight.coupling
http://howtodoinjava.com/2015/02/26/top-spring-core-interview-questions-with-answers/#bean_lifecycle
http://howtodoinjava.com/2013/03/19/inversion-of-control-ioc-and-dependency-injection-di-patterns-in-spring-framework-and-related-interview-questions/

http://www.tutorialspoint.com/spring/spring_injecting_inner_beans.htm

## A New Post

Enter text in [Markdown](http://daringfireball.net/projects/markdown/). Use the toolbar above, or click the **?** button for formatting help.
-->