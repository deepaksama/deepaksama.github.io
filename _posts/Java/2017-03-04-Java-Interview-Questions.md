---
layout: post
title: Java Interview Questions
meta: Java Interview Questions
category: java
---

Core Java
Memory Management

{% highlight java %}
class Outer {
	private int item;

	private static class Nested
	{
		void someMethod() 
		{
			//Outer.this.item = 9; // erroneous statement
		}
	}

	private class Inner {
		void someMethod() {
			Outer.this.item = 9; // legal statement
		}
	}
}
{% endhighlight %}

