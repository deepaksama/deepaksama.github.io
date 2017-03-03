---
layout: post
title: Java Interview Questions
meta: Java Interview Questions
category: java
---

Core Java
Memory Management

{% highlight java linenos %}
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

<!--
https://demisx.github.io/jekyll/2014/01/13/improve-code-highlighting-in-jekyll.html
-->