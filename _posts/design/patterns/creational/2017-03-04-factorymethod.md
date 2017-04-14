---
layout: post
title: Factory Method Design Pattern
meta: 
category: creationaldesignpatterns
published: true
---
### **Intent**
Define an interface for creating an object, but let subclass decide which class to instantiate.

### **Applicability**
Use the factory method pattern when:
* A class cannot anticipate the class object it must create
* The class need to delegate the responsibility to one of several helper subclasses for creation of product objects. And we want to localize the only the knowledge of which helper subclass is the delegate.

### **UML diagram**

<div class="col-md-12">
	<div class="col-md-6">	
		<img src="{{site.baseurl}}/resources/images/designpatterns/factory-method.jpg" class="content-image"/>
	</div>
</div>


### **Participants**
* Product
* ConcreteProduct
* Creator
* ConcreteCreator

### **Consequences**

* Advantages
	* Gives hooks for subclass for providing an extended version of an object.
	
* Disadvantages
	* Client might have to subclass the Creator class just to create a particular ConcreteProduct.

## **Implementation**
* There ar two major variations 
	* Creator class is an abstract class and does not provide an implementation for the factory method that it declares.  It mandates the subclass to provide an implementation.
	* Creator is Concrete class and provides a default implementation for the factory method.

* Parameterized factory methods
	In this variation factory method takes a parameter that identifies the product to create.  The factory method creates multiple kinds of products which share the Product interface.
	
### **Example Code**

#### **Implementation 1**
In this implementation for each concrete product we create a seperate concreate factory class.

**Currency.java**
{% highlight java linenos %}
package com.designpatterns.creational.factorymethod.product;

public abstract class Currency {
	private String currencyCode;

	public String getCurrencyCode() {
		return currencyCode;
	}
	public void setCurrencyCode(String currencyCode) {
		this.currencyCode = currencyCode;
	}
}
{% endhighlight %}

**SGD.java**
{% highlight java linenos %}
package com.designpatterns.creational.factorymethod.product;

public class SGD extends Currency {
	
}
{% endhighlight %}

**USD.java**

{% highlight java linenos %}
package com.designpatterns.creational.factorymethod.product;

public class USD extends Currency {
	
}
{% endhighlight %}

**CurrencyCreator.java**

{% highlight java linenos %}
package com.designpatterns.creational.factorymethod.factory;

import com.designpatterns.creational.factorymethod.product.Currency;

public abstract class CurrencyCreator {
	public abstract Currency createCurrency();
}
{% endhighlight %}

**SGCurrencyCreator.java**
{% highlight java linenos %}
package com.designpatterns.creational.factorymethod.factory;

import com.designpatterns.creational.factorymethod.product.Currency;
import com.designpatterns.creational.factorymethod.product.SGD;

public class SGCurrencyCreator extends CurrencyCreator {

	@Override
	public Currency createCurrency() {
		Currency currency = new SGD();
		currency.setCurrencyCode("SGD");
		return currency;		
	}

}

{% endhighlight %}

**USCurrencyCreator.java**
{% highlight java linenos %}
package com.designpatterns.creational.factorymethod.factory;

import com.designpatterns.creational.factorymethod.product.Currency;
import com.designpatterns.creational.factorymethod.product.SGD;

public class USCurrencyCreator extends CurrencyCreator {

	@Override
	public Currency createCurrency() {
		Currency currency = new SGD();
		currency.setCurrencyCode("USD");
		return currency;		
	}

}
{% endhighlight %}

**FactoryMedthodTest.java**

{% highlight java linenos %}
package com.designpatterns.creational.factorymethod.test;

import com.designpatterns.creational.factorymethod.factory.ParameterizedCurrencyCreator;
import com.designpatterns.creational.factorymethod.factory.SGCurrencyCreator;
import com.designpatterns.creational.factorymethod.factory.USCurrencyCreator;
import com.designpatterns.creational.factorymethod.product.Currency;

public class FactoryMedthodTest {

	public static void main(String [] args) throws Exception {
		/*Create US Currency*/
		Currency uscurrency = new USCurrencyCreator().createCurrency();
		System.out.println("Currecy Code :" + uscurrency.getCurrencyCode());
		
		Currency sgcurrency = new SGCurrencyCreator().createCurrency();
		System.out.println("Currecy Code :" + sgcurrency.getCurrencyCode());
	}
}

{% endhighlight %}

**Output**

	Currecy Code :USD 
	Currecy Code :SGD


#### **Implementation 2:**

In this implementation we parameterize the factory method and factory method will create the appropriate product based on parameter.

Note: Product classes above remains same.  No new ConcreteFactory is created for each Product to be created.

{% highlight java linenos %}
package com.designpatterns.creational.factorymethod.factory;

import com.designpatterns.creational.factorymethod.product.Currency;
import com.designpatterns.creational.factorymethod.product.SGD;
import com.designpatterns.creational.factorymethod.product.USD;

public class ParameterizedCurrencyCreator {
	public Currency createCurrency(String countryCode) {
		Currency currency = null;
		switch(countryCode) {
		case "US": 
			currency = new USD();
			currency.setCurrencyCode("USD");
			break;
		case "SG": 
			currency = new SGD();
			currency.setCurrencyCode("SGD");
			break;
		}
		return currency;
	}
}
{% endhighlight %}

{% highlight java linenos %}
package com.designpatterns.creational.factorymethod.test;

import com.designpatterns.creational.factorymethod.factory.ParameterizedCurrencyCreator;
import com.designpatterns.creational.factorymethod.factory.SGCurrencyCreator;
import com.designpatterns.creational.factorymethod.factory.USCurrencyCreator;
import com.designpatterns.creational.factorymethod.product.Currency;

public class FactoryMedthodTest {

	public static void main(String [] args) throws Exception {		
		Currency currency = new ParameterizedCurrencyCreator().createCurrency("US");
		System.out.println("Currency Code : " + currency.getCurrencyCode());
	}
}

{% endhighlight %}

**Output**

	Currecy Code :USD
