---
layout: post
title: Spring Beans
meta: Spring Beans
category: spring
published: true
---

<hr>
## 1. Spring Beans Overview
<hr>

Spring IoC container is responsibel for intantiating, configuring and assembling a forementioned beans.
The container gets its instructions on what objects to instantiate by reading configuration metadata.

#### <span class="underline"> XML-based configuration</span>

* XML-based configuration shows these beans configured as ___&lt;bean&gt;___ elements inside toplevel ___&lt;beans&gt;___ element.
* The ___class___ attribute on bean tag ( internally its __Class__ property in __BeanDefinition__) is mandatory and typically gets created using constructor of class

**instantiation with constructor**

___Ex:___

{% highlight xml linenos%}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
		http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="myBean" class="com.example.MyBean">
        <!-- collaborators and configuration for this bean go here -->
    </bean>
</beans>
{% endhighlight %}

* Any class can be used for construction and the class does not need to implement any specific interface.
* Depending on the type of IoC  container we may need to have a default constructor in the class

**Instantiating with static factory method**

* When defining bean which is created using static factory method, factory_method attribute is used to specify the method name.

___Ex:___

{% highlight xml linenos%}
<bean id="clientService" class="examples.ClientService"
    factory-method="createInstance"/>
{% endhighlight %}

{% highlight java linenos%}
public class ClientService {
    private static ClientService clientService = new ClientService();
    private ClientService() {}

    public static ClientService createInstance() {
        return clientService;
    }
}
{% endhighlight %}

**Instantiating with factory's factory method (instance factory method)**

* When instantiating with instance factory method, container invokes non-static method on existing bean from the container to create bean.
* We specify the bean class in the container that contains the factory method using ___factory-bean___ attribute.

___Ex:___

{% highlight xml linenos%}
<!-- the factory bean, which contains a method called createInstance() -->
<bean id="serviceLocator" class="examples.DefaultServiceLocator">
    <!-- inject any dependencies required by this locator bean -->
</bean>

<!-- the bean to be created via the factory bean -->
<bean id="clientService"
    factory-bean="serviceLocator"
    factory-method="createClientServiceInstance"/>
{% endhighlight %}

{% highlight java linenos%}
public class DefaultServiceLocator {

    private static ClientService clientService = new ClientServiceImpl();
    private DefaultServiceLocator() {}

    public ClientService createClientServiceInstance() {
        return clientService;
    }
}
{% endhighlight %}


#### <span class="underline"> Annotation-based configuration</span>

* Annotation wiring is not enabled by default.  So before using annotation based wiring we will need to enable it using component scaning.
* Once __&lt;context:annotation-config/&gt;__ is configured, 
You can use ___@Component___,___@Repository___,___@Service___ and ___@Controller___ annotations to configure bean in Spring application and 
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

___Ex:___


#### <span class="underline"> Java-based configuration</span>

Java based configuration can be done in two steps

Step 1: Write your pojos in a package let's say com.example.bean
___Ex:___

{% highlight java linenos%}
package com.example.bean;

@Component 
public class Rectangle{ 
	
	private int length;
	private int breadth;
	
	Rectangle(int length,int breadth) {
		this.length = length;
		this.breadth = breadth;
	}
	
    public int area() {
		return length * breadth;
    }
}
{% endhighlight %}

{% highlight java linenos%}
package com.example.bean;

@Component 
public class Circle{ 
	private int radius;
	Circle(int radius) {
		this.radius = radius;
	}
    public int area() {
		return 3.14 * radius * radius;
    }
}
{% endhighlight %}


{% highlight java linenos%}

package com.example.config;
 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
 
import com.example.bean.Rectangle;
import com.example.bean.Circle;

@Configuration
public class MyAppConfig {
	
	@Bean(name="rectangle")
	public Rectangle getRectangle(int length,int breadth){
		return new Rectangle(length,breadth);
	}
}
{% endhighlight %}

