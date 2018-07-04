---
layout: post
title: Executor Framework
meta: 
category: java
published: true
comments: true
---

Creating an ExecutorService
-------------------------------

ExecutorService is an Interface. An instance of any of its implementations can be chosen from package ___java.util.concurrent___ using:

* Factory methods of Executor class or 
* ThreadPoolExecutor (Your own implementation).

Factory Methods: 
----------------

1. ___newFixedThreadPool(nThreads) :___

	Creates a thread pool that reuses a fixed number of threads operating off a shared unbounded queue. At any point, at most nThreads threads will be active processing tasks. If additional tasks are submitted when all threads are active, they will wait in the queue until a thread is available. If any thread terminates due to a failure during execution prior to shutdown, a new one will take its place if needed to execute subsequent tasks. The threads in
	the pool will exist until it is explicitly shutdown.

	```	
	Ex: 
		ExecutorService eService = Executors.newFixedThreadPool(1);
	```

2. ___newCachedThreadPool()___

	Creates a thread pool that creates new threads as needed, but will reuse previously constructed threads when they are available. These pools will typically improve the performance of programs that execute many short-lived asynchronous tasks. Calls to execute will reuse previously constructed threads if available. If no existing thread is available, a new thread will be created and added to the pool. Threads that have not been used for sixty seconds are terminated and removed from the cache. Thus, a pool that remains idle for long enough will not consume any resources. Note that pools with similar properties but different details (for example, timeout parameters) may be created using ThreadPoolExecutor constructors.

	```
	Ex:
		ExecutorService eService = Executors.newCachedThreadPool();
	```

3.  ___newSingleThreadExecutor()___

	Creates an Executor that uses a single worker thread operating off an unbounded queue. (Note however that if this single thread terminates due to a failure during execution prior to shutdown, a new one will take its place if needed to execute subsequent tasks.) Tasks are guaranteed to execute sequentially, and no more than one task will be active at any given time. Unlike the otherwise equivalent newFixedThreadPool(1) the returned executor is guaranteed not to be reconfigurable to use additional threads.
	```
	Ex: 	
		ExecutorService eService = Executors.newSingleThreadExecutor()
	```
	
Creating Thread pool directly:
------------------------------

ThreadPoolExecutor class has few constructors which can be used to configure an executor service.

___Signature:___

{% highlight java linenos %}
ThreadPoolExecutor.ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue)
{% endhighlight %}

___Parameters:___ \s\s
__corePoolSize__ - the number of threads to keep in the pool, even if they are idle, unless allowCoreThreadTimeOut is set
<br/>
__maximumPoolSize__ - the maximum number of threads to allow in the pool
<br/>
__keepAliveTime__ - when the number of threads is greater than the core, this is the maximum time that excess idle threads will wait for new tasks before terminating.
<br/>
__unit__ - the time unit for the keepAliveTime argument
<br/>
__workQueue__ - the queue to use for holding tasks before they are executed. This queue will hold only the Runnable tasks submitted by the execute method.

{% highlight java linenos %}
ExecutorService eService2 = new ThreadPoolExecutor(2, 2, 0L, TimeUnit.MILLISECONDS,
		new LinkedBlockingQueue<Runnable>());
{% endhighlight %}

Assigning Task to ExecutorService
----------------------------------

ExecutorService can execute Runnable and Callable tasks. Tasks can be assigned to the ExecutorService using several methods

	* execute() - which is inherited from the Executor interface, and also 
	* submit()
	* invokeAny()
	* invokeAll()
	* schedule ()
	* scheduleAtFixedRat()
	* scheduleWithFixedDelay()

	
	The execute() method is void, and it doesn’t give any possibility to get the result of task’s execution or to check the task’s status (is it running or executed).
	
	submit() submits a Callable or a Runnable task to an ExecutorService and returns a result of type Future
	
	invokeAny() assigns a collection of tasks to an ExecutorService, causing each to be executed, and returns the result of a successful execution of one task (if there was a successful execution).
	
	invokeAll() assigns a collection of tasks to an ExecutorService, causing each to be executed, and returns the result of all task executions in the form of a list of objects of type Future.

	scheduleAtFixedRat()
	scheduleWithFixedDelay()
	
Ref:

https://docs.oracle.com/javase/tutorial/essential/concurrency/exinter.html
http://www.baeldung.com/java-executor-service-tutorial
https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Executors.html
https://docs.oracle.com/javase/1.5.0/docs/guide/concurrency/overview.html

http://grepcode.com/file/repository.grepcode.com/java/root/jdk/openjdk/6-b14/java/util/concurrent/Executors.java#Executors.newSingleThreadExecutor%28%29
