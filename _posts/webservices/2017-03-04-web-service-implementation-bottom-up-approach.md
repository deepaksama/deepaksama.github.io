---
layout: post
title: Web Service Implementation Bottom-up approach
meta: Web Service Implementation Bottom-up approach
category: web-service-implementation-bottom-up-approach
---

<div id="tableofcontents" class="col-md-6 pull-right">	
</div>

### **1. Create Maven Dynamic web project**

### **2. Add CXF and spring dependencies to project**

Go to pom.xml and select Dependencies tab and add the below dependencies
* spring-core
* spring-webmvc
* spring-context
* cxf-rt-frontend-jaxws
* cxf-rt-frontend-jaxrs
* cxf-rt-transports-http

<div class="col-md-12">
	<div class="col-md-6">
	<!--![spring modules]({{site.baseurl}}/resources/images/spring-framework-modules.JPG)-->
	<img src="{{site.baseurl}}/resources/images/webservices/bottom-up-impl-dependency-selection.jpg" class="content-image"/>
	</div>
</div>

<br/>

### **3. Create java endpoint interface, implementation classes and data transfer classes for Request and Response**

___Ex:___ 

**Interface**

{% highlight java linenos %}
public interface PaymentProcessor {
	public PaymentProcessorResponse processPayment(PaymentProcessorRequest request);
}
{% endhighlight %}

**Implementation:**

{% highlight java linenos %}
package com.practice.processor;

import com.practice.processor.dto.PaymentProcessorRequest;
import com.practice.processor.dto.PaymentProcessorResponse;

public class PaymentProcessorImpl implements PaymentProcessor {

	public PaymentProcessorResponse processPayment(	PaymentProcessorRequest request) {
		PaymentProcessorResponse response = new	PaymentProcessorResponse();
		response.setSucess(true);
		return response;
	}
}
{% endhighlight %}
 

**Request class**

{% highlight java linenos %}

package com.practice.processor.dto;

public class PaymentProcessorRequest {
	private CreditCardInfo creditCardInfo;
	private Double amount;
	
	public CreditCardInfo getCreditCardInfo() {
		return creditCardInfo;
	}
	public void setCreditCardInfo(CreditCardInfo creditCardInfo) {
		this.creditCardInfo = creditCardInfo;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}	
}
{% endhighlight %}


**Response class**

{% highlight java linenos %}
package com.practice.processor.dto;

public class PaymentProcessorResponse {
	private boolean sucess;

	public boolean isSucess() {
		return sucess;
	}

	public void setSucess(boolean sucess) {
		this.sucess = sucess;
	}
}

{% endhighlight %}
 

 
### **4.	Annotate web service endpoint interface with JAXWS annotations**

Use ___@WebService___ annotation for interface, ___@WebParam___ for input parameters and ___@WebResult___ for return type

___Ex:___

{% highlight java linenos %}
package com.practice.processor;

import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;

import com.practice.processor.dto.PaymentProcessorRequest;
import com.practice.processor.dto.PaymentProcessorResponse;

@WebService(name = "PaymentProcessor")
public interface PaymentProcessor {
	public @WebResult(name = "response") PaymentProcessorResponse processPayment(
			@WebParam(name = "PaymentProcessorRequest") PaymentProcessorRequest request);

}
{% endhighlight %} 

**Note:** Annotating input parameters and returns type is optional.  But can be done to control the names of the corresponding message types in WSDL.

### **5. Annotate Request and Response beans with JAXB annotations**

	This should be done so that the objects can be serialized to SOAP messages and deserialized back to Java objects

Annotate each Request and Response classes with 
{% highlight java %}
@XmlType(name="")
@XmlAccessorType(XmlAccesssType.FIELD)
{% endhighlight %}

Now annotate each field in these classes with 
{% highlight java %}
@XmlElement(name="",required=true)
{% endhighlight %}

___Ex:___ Now the above Request class will look like this.

{% highlight java linenos %}
package com.practice.processor.dto;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlType(name="PaymentProcessorRequest")
@XmlAccessorType(XmlAccessType.FIELD)
public class PaymentProcessorRequest {
	@XmlElement(name="creditCardInfo", required=true)
	private CreditCardInfo creditCardInfo;
	@XmlElement(name="amount", required=true)
	private Double amount;
	
	public CreditCardInfo getCreditCardInfo() {
		return creditCardInfo;
	}
	public void setCreditCardInfo(CreditCardInfo creditCardInfo) {
		this.creditCardInfo = creditCardInfo;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}	
}
{% endhighlight %}
 

**Note:**  Annotating fields is not mandatory for simple types.

### **6.	Configure CXFServlet in deployment descriptor**

Add the below lines to web.xml file to configure CXFServlet 

{% highlight xml linenos %} 
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xmlns="http://xmlns.jcp.org/xml/ns/javaee" 
	xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd" 
	version="3.1">
 
	<display-name>javafirstws</display-name>
	<servlet>
		<servlet-name>CXFServlet</servlet-name>
		<servlet-class>org.apache.cxf.transport.servlet.CXFServlet</servlet-class>
		<load-on-startup>1</load-on-startup>
	</servlet>
	<servlet-mapping>
		<servlet-name>CXFServlet</servlet-name>
		<url-pattern>/services/*</url-pattern>
	</servlet-mapping> 
</web-app>
{% endhighlight %}

### **7.	Add cxf-servlet.xml CXF spring bean configuration file**

Select project and press Ctrl + N.  Now select Spring Bean configuration File option and press Next

<div class="col-md-12">
	<div class="col-md-6">
	<!--![spring modules]({{site.baseurl}}/resources/images/spring-framework-modules.JPG)-->
	<img src="{{site.baseurl}}/resources/images/webservices/create-cxf-servlet-xml-part1.jpg" class="content-image"/>
	</div>
</div> 

<br>
Now give the file name as cxf-servlet.xml and click on Next

<div class="col-md-12">
	<div class="col-md-6">
	<!--![spring modules]({{site.baseurl}}/resources/images/spring-framework-modules.JPG)-->
	<img src="{{site.baseurl}}/resources/images/webservices/create-cxf-servlet-xml-part2.jpg" class="content-image"/>
	</div>
</div> 

<br>

Now select the following namespaces

* beans
* core
* jaxrs
* jaxws
* soap

<div class="col-md-12">
	<div class="col-md-6">
	<!--![spring modules]({{site.baseurl}}/resources/images/spring-framework-modules.JPG)-->
	<img src="{{site.baseurl}}/resources/images/webservices/bottom-up-impl-namespace-selection.jpg" class="content-image"/>
	</div>
</div> 

<br/>

### **8. Publish the web service endpoint as web service using _cxf-servlet.xml_ configuration file**

{% highlight xml linenos %}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:cxf="http://cxf.apache.org/core"
xmlns:jaxrs="http://cxf.apache.org/jaxrs"
xmlns:jaxws="http://cxf.apache.org/jaxws"
xmlns:soap="http://cxf.apache.org/bindings/soap"
xsi:schemaLocation="http://cxf.apache.org/jaxws http://cxf.apache.org/schemas/jaxws.xsd
http://cxf.apache.org/core http://cxf.apache.org/schemas/core.xsd
http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
http://cxf.apache.org/jaxrs http://cxf.apache.org/schemas/jaxrs-common.xsd
http://cxf.apache.org/bindings/soap http://cxf.apache.org/schemas/configuration/soap.xsd">

	<!-- 	
	<jaxws:server id="payentService" serviceClass="com.practice.processor.PaymentProcessor" address="/paymentProcessor">
			<jaxws:serviceBean>
				<bean class="com.practice.processor.PaymentProcessorImpl"/>
			</jaxws:serviceBean>
	</jaxws:server> 
	
	-->
	
	<jaxws:endpoint id="paymentService" 
		implementor="com.practice.processor.PaymentProcessorImpl"		 
		address="/paymentProcessor">
	</jaxws:endpoint>
	
	<cxf:bus>
		<cxf:features>
			<cxf:logging/>
		</cxf:features>
	</cxf:bus>
	
</beans>
{% endhighlight %}

### **9. Access the WSDL and verify everything is working**

Add ___index.jsp___ file under webapp directory.  Add the below to jsp which gives the access to the /services/ url to view all the services list.

{% highlight xml linenos %}

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<h1> Test application</h1>
<a href="${pageContext.servletContext.contextPath}/services">Available services</a>
{% endhighlight %}


### **10. Now build the application and run on server to see the below.**

<div class="col-md-12">
	<div class="col-md-6">
	<!--![spring modules]({{site.baseurl}}/resources/images/spring-framework-modules.JPG)-->
	<img src="{{site.baseurl}}/resources/images/webservices/bottom-up-impl-result1.jpg" class="content-image"/>
	</div>
</div> 
 
Clicking on link would show our web service

<div class="col-md-12">
	<div class="col-md-6">
	<!--![spring modules]({{site.baseurl}}/resources/images/spring-framework-modules.JPG)-->
	<img src="{{site.baseurl}}/resources/images/webservices/bottom-up-impl-result2.jpg" class="content-image"/>
	</div>
</div>  

