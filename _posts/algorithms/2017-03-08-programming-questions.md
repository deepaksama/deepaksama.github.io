---
layout: post
title: Programming Questions
meta: 
category: algorithms
published: true
---

### **Programming Questions**

##### **1. Find next greater number using the same digits for a given number?**


### **Java Coding**

#### **1. Write an implementation for Simple ThreadPool?**

##### <span class="underline">Pictorical depiction</span>

<div class="col-md-12">
	<div class="col-md-5">
	<img src="{{site.baseurl}}/resources/images/algorithms/thread-pool.PNG" class="content-image"/>
	</div>
</div>

##### <span class="underline">Implementation</span>

**Queue.java**
{% highlight java linenos %}
package com.javaforlazyreaders.utils;

public interface Queue<T> {
	public void enqueue(T element);
	public T dequeue();
}
{% endhighlight %}

**QueueImpl.java**
{% highlight java linenos %}
package com.javaforlazyreaders.utils;

import java.util.ArrayList;
import java.util.List;

public class QueueImpl<T> implements Queue<T>{
	
	private List<T> list = new ArrayList();

	@Override
	public void enqueue(T element) {
		synchronized(list) {
			list.add(element);
			list.notifyAll();
		}		
	}

	@Override
	public T dequeue() {
		T element = null;
		synchronized(list) {
			while(list.isEmpty()) {
				try {
					list.wait();
				} catch (InterruptedException e) {
					Thread.currentThread().interrupt();
					break;
				}
			}
			
			if(!Thread.currentThread().isInterrupted())
				element = list.remove(0);
		}		
		return element;	
	}
}
{% endhighlight %}

**Task.java**

{% highlight java linenos %}
package com.javaforlazyreaders.utils;

public class Task {
	
	private Runnable runnable;
	public Task(Runnable runnable) {
		this.runnable = runnable;
	}
	
	public void run() {
		runnable.run();
	}
}
{% endhighlight %}

**WorkerThread**

{% highlight java linenos %}
package com.javaforlazyreaders.utils;

import java.util.List;

public class WorkerThread extends Thread{
	private String name;
	private boolean isStopped;
	private Queue<Task> taskList;
	public WorkerThread(String name, Queue<Task> taskList) {
		isStopped = false;
		this.taskList = taskList;
		this.name = name;
	}
	
	@Override
	public void run() {
		while(!isStopped) {
			Task t = taskList.dequeue();
			if(t != null) {
				System.out.println(name + " ");
				t.run();
			}
		}
		System.out.println("Exiting " + name);
	}
	
	public void shutdown() {
		isStopped = true;
		
		this.interrupt();
	}
}
{% endhighlight %}

**CustomThreadPool.java**

{% highlight java linenos %}
package com.javaforlazyreaders.utils;

import java.util.ArrayList;
import java.util.List;

public class CustomThreadPool {

	private WorkerThread [] threads;
	private Queue<Task> taskList = new QueueImpl<Task>();	
	private int poolSize;
	private boolean isShutdown;
	
	public CustomThreadPool(int poolSize) {
		this.poolSize = poolSize;
		isShutdown = false;
		threads = new WorkerThread[poolSize];
		for(int i = 0; i < poolSize; i++) {
			WorkerThread t = new WorkerThread("WorkerThread:" + i, taskList);
			threads[i] = t;
			threads[i].start();
			
		}
	}
	
	public void submit(Runnable runnable) {
		taskList.enqueue(new Task(runnable));
	}
	
	public void shutdown() {
		isShutdown = true;
		for(int i = 0; i < poolSize; i++) {
			threads[i].shutdown();
		}
	}	
}
{% endhighlight %}

**ThreadPoolDemo.java**

{% highlight java linenos %}
package com.javaforlazyreaders.demo;

import com.javaforlazyreaders.utils.CustomThreadPool;
import com.javaforlazyreaders.utils.QueueImpl;

public class ThreadPoolDemo {

	public static void main(String[] args) {
		
		
		CustomThreadPool threadPool = new CustomThreadPool(3);
		
		for(int i = 0; i < 20; i++) {
			threadPool.submit(new MyRunnable("T" + i));
		}
		
		try {
			Thread.sleep(30000);
		} catch(InterruptedException ie) {
			System.out.println("Main thread interrupted");
		}
		
		threadPool.shutdown();
		System.out.println("Done");
	}

}

class MyRunnable implements Runnable {

	private String name;
	
	public MyRunnable(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public void run() {
		try {
			System.out.println("Executing : " + name);
			Thread.sleep(1000);
		}catch(InterruptedException ie) {
			System.out.println("Interrupted : " + name);
		}
		System.out.println("Exiting " + name);
	}	
}
{% endhighlight %}


<!--
http://www.ideserve.co.in/learn/next-greater-number-using-same-digits
-->