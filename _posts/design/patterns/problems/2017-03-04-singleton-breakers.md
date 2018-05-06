---
layout: post
title: Singleton Breakers and Solutions
meta: 
category: designpatternproblems
published: true
comments: true
---

Assume the below basic Singleton class code:

{% highlight java linenos %}
package singleton;

public class Singleton {
	private static Singleton instance = null;
	
	private Singleton() {
		
	}
	
	public static Singleton getInstance() {
		if(instance == null) {
			instance = new Singleton();
		}
		return instance;
	}
}

{% endhighlight %}



The above singleton code can be made to break Singleton contract by following ways:


### 1. Multi Threaded Access
The above code will break in case of multi threading when multiple threads make it to reach inside if conditon before instance is created.

#### Solution

We use double checked locking to solve this issue:

{% highlight java linenos %}
	public static Singleton getInstance() {
		if(instance == null) {
			synchronized(Singleton.class) {
				if(instance == null) {
					instance = new Singleton();
				}
			}
		}
		return instance;
	}
{% endhighlight %}

### 2. Clone

If your Singletion is Cloneable and inherits clone() method from its super class then Singleton contract will broke as user will be able to create an additional copy by calling clone on existing object.

#### Solution:

Implement its own clone() method and throw CloneNotSupportedException from the method.

{% highlight java linenos %}
	
	protected Object clone() throws CloneNotSupportedException {
		throw new CloneNotSupportedException();
	}
{% endhighlight %}


### 3. Serialization/Deserialization

Singleton contract can also be broke by constructing object using Deserialization process.

{% highlight java linenos %}

	FileOutputStream fos = new FileOutputStream(new File("file.ser"));
	ObjectOutputStream ous = new ObjectOutputStream(fos);
	
	ous.writeObject(s1);
	
	FileInputStream fis = new FileInputStream(new File("file.ser"));
	ObjectInputStream ois = new ObjectInputStream(fis);
	
	Singleton s4 = (Singleton) ois.readObject();

{% endhighlight %}

#### Solution

This can be fixed by write a code that can replace the object constructed by deserialization with the existing instance.  This code can be written in readResolve method which is gauranteed to be called during deserialization.

{% highlight java linenos %}

	private Object readResolve() throws ObjectStreamException {
		return getInstance();
	}
{% endhighlight %}

### 4. Reflections

Singleton contract can be broke if a user creates Singleton class object using reflections instead of factory method as below

{% highlight java linenos %}

	Class clazz = Class.forName("singleton.Singleton");		
	Constructor<Singleton> ctor = clazz.getDeclaredConstructor();
	ctor.setAccessible(true);
	Singleton s3 = ctor.newInstance();		

{% endhighlight %}

#### Solution:

The above code is making Singleton contract violation by setting public access to constructor and calling it.  So to fix we'll check whether the instance is already created or not and throw exception if it is already created.  This way even if the user gets the public access to constructor also we can stop creation of multiple instances.

{% highlight java linenos %}

private Singleton() {
	if(instance != null) {
		throw new RuntimeException("Cannot create, please use getInstance() method");
	}
	//Proceed creating instance
}
{% endhighlight %}
	
		
5. Multiple Class loaders


