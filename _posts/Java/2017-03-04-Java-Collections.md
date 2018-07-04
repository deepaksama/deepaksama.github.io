---
layout: post
title: Java Collections
meta: Java Collections
category: java
published: true
---

Core Java
Memory Management



ConcurrentHashMap
-----------------

The synchronized methods of Hashtable obtain lock on the entire hashtable object during any retrieval or update operations. This can lead to very long response time under heavy load. Since the underlying data is stored in a series of buckets in a hash map (a hashtable is a hash map implementation), it is more efficient to lock only a bucket while accessing a map instead of obtaining lock on the entire map. This mechanism is called as lock striping. __ConcurrentHashMap__ uses this finer-grained locking with which it provides 16 locks by default and reduces lock contention when multiple threads access a ConcurrentHashMap object concurrently.

__ConcurrentHashMap__ is, indeed, threadsafe. But it only means that all read/write operations on such map are internally synchronized. But isn't always enough.  In certain cases like if mulple threads trying to execute a code to insert a value if the key is not already may endup inserting diffrent values for same key, if multiple threads execute it.  In such case the solution is to use methods that are atomic in nature.  Like below:
* ___computeIfAbsent()___
* ___putIfAbsent()___


http://www.baeldung.com/java-concurrent-map


