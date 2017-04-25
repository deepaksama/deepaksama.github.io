---
layout: post
title: Chain of Responsibility Design Pattern
meta: Spring framework has its featured spread accross 20 modules.  These modules are grouped into 
category: behaviouraldesignpatterns
published: true
comments: true
---

<div id="tableofcontents" class="col-md-6 pull-right">	
</div>

### **Intent**

Avoid coupling the sender of a request to its receiver by giving morethan on obects a chance to handle the request. Chain the receiving object and pass the request along the chain until an object handles it.

### **Applicability**

You want to issue a request to one of several object without specifying the receiver exactly ( Decouple sender of request from receiver or handler of request)
The set of objects that can handle request need to be specified dynamically.

### **UML diagram**

<div class="col-md-12">
	<div class="col-md-6">
	<!--![spring modules]({{site.baseurl}}/resources/images/spring-framework-modules.JPG)-->
	<img src="{{site.baseurl}}/resources/images/designpatterns/chainofresponsibility.JPG" class="content-image"/>
	</div>
</div>

<br>

### **Consequences**

Chain of responsibility has following benefits and liabilities: 
* Reduced Coupling :
This pattern frees an object from knowing which object handles the request. Both receiver and sender have no explicit knowledge of each other. Objects in the chain does not have to know about the chain structure. As a result, instead of objects maintaining reference to all candidate receivers, they keep a single reference to their successor.
* Added Flexibility in assigning responsibilities to objects: 
Chain of responsibility gives added flexibility in distributing responsibilities among objects. We can add or change responsibilities for handling requests by adding new objects to chain or changing the chain at runtime
* Receipt is not guaranteed: 
Since a request has no explicit receiver, there is no guarantee that it'll be handled. The request can fall off the end of the chain without ever being handled. A request can go unhandled when the chain is not configured properly.

### **Implementaion**
Implimentation related issue to consider:
1. Implementing successor :
There are two ways we can define links
* Use existing links :
In certain cases we would have already formed the chain of objects. For example in part-whole hierarchy parent reference would have already defined its successor. Using existing links would work when these links support the chain we need. It will save us from defining links explicitly in turn saving the space.
* Define new link
2. Connecting successor :
In case if there are no preexisting links for defining the chain, we'll have to introduce them ouerselves In this case Handler not only defines interface for requests, but also provides the default implementation that forwards the request to successor If the ConcreteHandler subclass is not interested in the request, it doesn't have to override the forwarding operation.
3. Representing request:
There are different options available for representing request
	* Each request is a hardcoded operation invocation.
		* **Advantage :**<br>	
			Convenience and safe.
			
		* **Disadvantage :**<br>	
			We can forward only fixed set of requests that Handler defines.
			
	* Use handler function that takes request code as parameter.
		* **Advantage :**		
			<br>Supports open-ended set of requests.

		* **Disadvantage:** 
			<br>		
			* Sender and Receiver agreen on how the request should be encoded.
			* Requires conditional statements for dispatching the request based on code.
			* There is no typesafe way to pass parameter.
		<br>
	* Use separate request objects for each request to bundle request parameters. A request class can represent request explicitly, and new kinds of requests can be defined by subclassing the Request class. Subclass can define different parameters. Each Handler must know the kind of request to which it can handle. To identify the request, Request can define an accessor function that returns an identifer for the class. Alternatively, the receiver can use RTTI (Runtime Type Identification) if the implementaion language supportes it.

### **Example Code**
**RequestLevel.java**

{% highlight java linenos %}
package com.designpatterns.chainofresponsibility;
 
public enum RequestLevel {
 
    LOW,
    MEDIUM,
    HIGH
}
{% endhighlight %}

**Request.java**

{% highlight java linenos %}
package com.designpatterns.chainofresponsibility;
 
public class Request {
 
 
    private RequestLevel requestLevel;
 
    public Request(RequestLevel requestLevel) {
        this.requestLevel = requestLevel;
    }
 
     
    public RequestLevel getRequestLevel() {
        return requestLevel;
    }
 
    public void setRequestLevel(RequestLevel requestLevel) {
        this.requestLevel = requestLevel;
    }
}
{% endhighlight %}

**Staff.java**

{% highlight java linenos %}
package com.designpatterns.chainofresponsibility;
 
public abstract class Staff {
 
    private Staff boss;
 
    public Staff getBoss() {
        return boss;
    }
 
    public void setBoss(Staff boss) {
        this.boss = boss;
    }
     
    public void  handleRequest(Request request)
    {
        getBoss().handleRequest(request);
    }
}
{% endhighlight %}

**Teacher.java**

{% highlight java linenos %}
package com.designpatterns.chainofresponsibility;
 
public class Teacher extends Staff{
     
    public void  handleRequest(Request request)
    {
        if(request.getRequestLevel() == RequestLevel.LOW)
        {
            System.out.println("Teacher : Handling Request");
            return;
        }
         
        System.out.println("Teacher : Forwarding request to Principle"); 
        getBoss().handleRequest(request);
    }
}
{% endhighlight %}

**Principle.java**

{% highlight java linenos %}
package com.designpatterns.chainofresponsibility;
 
public class Principle extends Staff {
 
    public void  handleRequest(Request request)
    {
        if(request.getRequestLevel() == RequestLevel.MEDIUM)
        {
            System.out.println("Principle : Handling Request");
            return;
        }
         
        System.out.println("Principle : Forwarding request to Director"); 
        getBoss().handleRequest(request);
    }
}
{% endhighlight %}

**Director.java**

{% highlight java linenos %}
package com.designpatterns.chainofresponsibility;
 
public class Director extends Staff{
 
    public void  handleRequest(Request request)
    {
        if(request.getRequestLevel() == RequestLevel.HIGH)
        {
            System.out.println("Director : Handling Request");
            return;
        }
         
        System.out.println("Request cannot be handled"); 
    }
}
{% endhighlight %}

**ChainOfResponsibilityDemo.java**

{% highlight java linenos %}
package com.designpatterns.chainofresponsibility;
 
public class ChainOfResponsibilityDemo {
 
    public static void main(String[] args) {
         
        Teacher teacher = new Teacher();
        Principle principle = new Principle();
        Director director = new Director();
         
        teacher.setBoss(principle);
        principle.setBoss(director);
         
        Request highRequest = new Request(RequestLevel.HIGH);
        Request mediumRequest = new Request(RequestLevel.MEDIUM);
        Request lowRequest = new Request(RequestLevel.LOW);
         
        teacher.handleRequest(highRequest);
        teacher.handleRequest(mediumRequest);
        teacher.handleRequest(lowRequest);
 
    }
 
}
{% endhighlight %}

