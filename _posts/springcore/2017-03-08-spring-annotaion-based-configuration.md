---
layout: post
title: Spring Annotation-based Configuration
meta: Spring Annotation-based Configuration
category: springcore
published: true
---

* Annotation base configuration is possible from ___spring 2.5___ onwords. Annotation-based configuration rely on bytecode metadata.  Instead of writing xml developer moves the configuration into the component class itself 
by using annotations on the relavent class, method or field declarations.

* Annotation injection is performed before XML injection. so xml injection will overried the properties if wired through both the approaches.

* Annotation wiring is not enabled by default.  So before using annotation based wiring we will need to enable it using component scaning.

* Once __&lt;context:annotation-config/&gt;__ is configured, 
You can use ___@Component___,___@Repository___,___@Service___ and ___@Controller___ annotation to configure bean in Spring application and 
you can start annotating your code to indicate that Spring should automatically wire values into properties, methods, and constructors.
___Ex:___

{% highlight xml linenos%}
<?xml version = "1.0" encoding = "UTF-8"?>

<beans xmlns = "http://www.springframework.org/schema/beans"
   xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
   xmlns:context = "http://www.springframework.org/schema/context"
   xsi:schemaLocation = "http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
   http://www.springframework.org/schema/context
   http://www.springframework.org/schema/context/spring-context-3.0.xsd">

   <context:annotation-config/>
   <!-- bean definitions go here -->

</beans>
{% endhighlight %}

Below are the annotations used for bean configuration:

__@Required__

* It applies to bean property setter method. 
* It indicates that the property should be populated at config time through explicit property value in bean definition or through autowiring.
* The container throws exception if the bean property is not populated.
* This avoids NullPointerException later. 

___Ex:___

{% highlight java linenos%}
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Required
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
    // ...
}
{% endhighlight %}

__@Autowired__

* For using ___@Autowired___ annotation, we have register ___AutowiredAnnotationBeanPostProcessor___ bean in spring IoC container.

{% highlight xml linenos %}
<bean class="org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor" />
{% endhighlight %}
___(OR)___
* But once the __&lt;context:annotation-config/&gt;__ element is included in configuration file, it automatically registers the below bean post processors as a result you do not need above bean to be registered seperately.
	* AutowiredAnnotationBeanPostProcessor
	* CommonAnnotationBeanPostProcessor
	* PersistenceAnnotationBeanPostProcessor
	* RequiredAnnotationBeanPostProcessor
* The ___@Autowired___ annotation can apply to bean property setter methods, non-setter methods, constructor and properties.
* Spring container can autowire a Map, List or an Array with all the beans defined in the bean configuration file whose types are compatible.

___Ex:___

{% highlight xml linenos %}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
  xsi:schemaLocation="http://www.springframework.org/schema/beans 
  http://www.springframework.org/schema/beans/spring-beans-3.0.xsd 
  http://www.springframework.org/schema/context 
  http://www.springframework.org/schema/context/spring-context-3.0.xsd">

	<context:annotation-config/>	

	<bean id="company" class="com.examples.spring.Company">
		<property name="name" value="mycompany" />
	</bean>

	<bean id="key1" class="com.examples.spring.Employee">
		<constructor-arg name="name" value="Allan Donald" />
	</bean>
	<bean id="key2" class="com.examples.spring.Employee">
		<constructor-arg name="name" value="Sachin Tendulkar" />
	</bean>
	<bean id="key3" class="com.examples.spring.Employee">
		<constructor-arg name="name" value="Steven Waugh" />
	</bean>
</beans>
{% endhighlight %}


The Company class demonstrating the use of @Autowired annotation to populate a Map, a List and an Array

{% highlight java linenos %}
package com.examples.spring;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

public class Company
{
    private String companyName;

    private Map<String, Employee> mapOfEmployees;
    private List<Employee> listOfEmployees;
    private Employee[] arrayOfEmployees;

    public void setName(String name)    {        
		this.companyName = name;
    }
    public String getName() {
        return companyName;
    }
    @Autowired
    public void setEmployees(Map<String, Employee> employees) {
        this.mapOfEmployees = employees;
    }
    @Autowired
    public void setEmployees(Employee[] employees) {
        this.arrayOfEmployees = employees;
    }
    @Autowired
    public void setEmployees(List<Employee> employees) {
        this.listOfEmployees = employees;
    }
    public Map<String, Employee> getMapOfEmployees() {
        return mapOfEmployees;
    }
    public List<Employee> getListOfEmployees() {
        return listOfEmployees;
    }
    public Employee[] getArrayOfEmployees() {
        return arrayOfEmployees;
    }
}
{% endhighlight %}
The Employee class definition
{% highlight java linenos %}
package com.examples.spring;

public class Employee {
 private String empName;

 public Employee(String name) {
  this.empName = name;
 }

 public String getName() {
  return empName;
 }
}
{% endhighlight %}
The client program prints the list of employees in the Map, List and Array populated earlier using the springs auto-wiring method.
{% highlight java linenos %}
package com.examples.spring;

import java.util.List;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App
{
    public static void main(String[] args)
    {
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        Company company = (Company)context.getBean("company");

        for (int i = 0; i < 2; ++i)
            System.out.println();

        System.out.println("Displaying Employee Map");
        Map<String, Employee> mapOfEmployees = company.getMapOfEmployees();
        for (Map.Entry<String, Employee> entry : mapOfEmployees.entrySet())
        {
            System.out.println("Key: " + entry.getKey() + " Name: " + entry.getValue().getName());
        }

        System.out.println();
        System.out.println("Displaying Employee List");
        List<Employee> listOfEmployees = company.getListOfEmployees();
        for (Employee emp : listOfEmployees)
        {
            System.out.println("Name: " + emp.getName());
        }

        System.out.println();
        System.out.println("Displaying Employee Array");
        Employee[] arrayOfEmployees = company.getArrayOfEmployees();
        for (Employee emp : arrayOfEmployees)
        {
            System.out.println("Name: " + emp.getName());
        }
    }
}
{% endhighlight %}