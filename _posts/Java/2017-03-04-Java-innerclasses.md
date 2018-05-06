---
layout: post
title: Java Inner classes
meta: Java Inner classes
topic-image: 
category: java
---

A class is called inner class if it’s a member of another class.  There are basically 4 types of inner classes in java

1. Nested Inner class
1. Method local inner class
1. Anonymous Inner class
1. Static nested class

### 1. Nested Inner class 

* A Nested Inner class can access private members of outer class.  
* Like any other instance variable, we can have access modifier private, protected, public and default.
* Like class, interface can also be nested and can have access specifiers.

___Ex:___

{% highlight java linenos %}
class Outer {
  private int i = 10;
   // Simple nested inner class
   class Inner {
      public void show() {
           System.out.println("In a nested class method" + i);
      }
   }
}
{% endhighlight %}

{% highlight java linenos %}

class Main {
   public static void main(String[] args) {
       Outer.Inner in = new Outer().new Inner();
       in.show();
   }
}
{% endhighlight %}

* We cannot have static method in a nested inner class because inner class is implicitly associated with an object of outer class so it cannot define any static method for itself.

___Ex:  Following will not compile___

{% highlight java linenos %}
class Outer {
	void outerMethod() {
		System.out.println("inside outerMethod");
	}

	class Inner 	{
		public static void main(String[] args) {
			System.out.println("inside inner class Method");
		}
	}
}
{% endhighlight %}

### 2. Method Local inner classes:

* Inner classes defined declared within a method of an outer class.

___Ex:___

{% highlight java linenos %}
class Outer {
	void outerMethod() {
		System.out.println("inside outerMethod");
		// Inner class is local to outerMethod()
		class Inner {
			void innerMethod() {
				System.out.println("inside innerMethod");
			}
		}
		Inner y = new Inner();
		y.innerMethod();
	}
}
{% endhighlight %}

{% highlight java linenos %}
class MethodDemo {
    public static void main(String[] args) {
        Outer x = new Outer();
        x.outerMethod();
    }
}

{% endhighlight %}

* Method local inner classes can be instantiated only within the method where the inner class is defined.
* Method local inner class shares special relation with outer class and can access private members of outer class.
* Method local inner classes cannot use local variables of outer methods until the local variable is not declared as final. The reason we need to declare a local variable as a final is that local variables live on stack till method is on stack but there might be a case the object of inner class still lives on the heap.
* Method local inner class cannot be marked as private, protected, static and transient but can be marked as abstract and final but not both at the same time.
* Method local classes declared in a static method have access to only static methods of the enclosing class as there is no instance associated.

### 3. Static nested classes

* Static nested classes are not technically inner classes.  They are like static members of outer class.
* Non static inner class can access static and non-static members of outer class.  A static inner class can access only static members of outer class.
* An Inner class can reference data and methods defined in Outer class in which it nests, so we don’t need to pass reference of an object to the constructor of the Inner class. For this reason Inner classes can make program simple and concise

{% highlight java linenos %}
class Outer {
	private int item;

	private static class Nested {
		void someMethod() {
			// Outer.this.item = 9; // erroneous statement
		}
	}
}
{% endhighlight %}

___Usage:___

{% highlight java linenos %}
Outer.Inner printer = new Outer.Inner();
{% endhighlight %}

### 4. Anonymous Inner classes

* Anonymous inner classes are declared without any name at all.  They are created in two ways

i.	As a subclass of specified type

Ex:
{% highlight java linenos %}
class Demo {
	void show() {
		System.out.println("i am in show method of super class");
	}
}
{% endhighlight %}

{% highlight java linenos %}
class Flavor1Demo {
	// An anonymous class with Demo as base class
	static Demo d = new Demo() {
		void show() {
			super.show();
			System.out.println("i am in Flavor1Demo class");
		}
	};

	public static void main(String[] args) {
		d.show();
	}
}
{% endhighlight %}

In the above code, we have two classes Demo and Flavor1Demo.  Here Demo act as super class and anonymous class act as a subclass.  Both classes have a method show().  In anonymous class show() method is overridden.

ii.	As an implementer of specified interface

{% highlight java linenos %}
class Flavor2Demo {	 
    // An anonymous class that implements Hello interface
    static Hello h = new Hello() {
        public void show() {
            System.out.println("i am in anonymous class");
        }
    };
 
    public static void main(String[] args) {
        h.show();
    }
}
{% endhighlight %} 


{% highlight java linenos %}
interface Hello {
    void show();
}
{% endhighlight %}

In the above code we have created an object of anonymous class. This anonymous class is an implementer of the interface Hello.  Any anonymous inner class can implement only one interface at a time.  It can either extend a class or implement interface at a time.

**Cannot define Constructors**

Anonymous inner classes do not allow constructors since they require class name.  On the other hand they do allow __instance initializers__.  Instanace initializer is like a constructor which takes no parameters.  

__Ex:__

{% highlight java linenos %}
public class Main {
	public static void main(Stirng [] args) {
		Runnable runnable = new Runnable() {
			private static final int ARRAY_SIZE = 100;
			private int[] array = new int[ARRAY_SIZE];
			
			{
				for(int i = 0; i < ARRAY_SIZE; i++) {
					array[i] = i;
				}
			}
			
			public void run() {
				int total = 0;
				for(int i = 0; i < ARRAY_SIZE; i++) {
					total += array[i];
				}
				System.out.println(total);
			}
		}
		runnable.run();
	}
}
{% endhighlight %}

**Passing parameters to base class constructors**

You cannot create new constructor for an anonymous class. However if an anonymous class is based on a class which is already difined parameterized constructor, then we can pass parameters.

__Ex:__

**Main.java**

{% highlight java linenos %}
public class Main {

	ClassA classAObj = new ClassA("Hello") {
		public void display() {
			System.out.println("Inherited : " + getMessage());
		}
	};
	
	public static void main(String [] args) {
		Main main = new Main();
		main.classAObj.display();
	}
}


class ClassA {
	private String message;
	public ClassA(String message) {
		this.message = message;
	}
	public void display() {
		System.out.println(message);
	}
	public String getMessage() {
		return message;
	}
}
{% endhighlight %}


**Advantages:**

1. Allows to define special purpose classes which are used only once and define at the place they are useful. This is befit us from creating a names class polluting namespace unnecessarily.

2. Key benefit is that they have access to all the data and methods of their containing classes including private members.

