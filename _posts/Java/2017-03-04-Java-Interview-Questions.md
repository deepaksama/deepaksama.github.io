---
layout: post
title: Java Interview Questions
meta: Java Interview Questions
category: java
published: true
---
Collections


### **1.	What are the basic interfaces of Java Collection framework?**

Java collections framework has 4 basic interfaces.   
a.	Collection is the root of the collections hierarchy.  Java does not provide any direct implementation of this interface.
b.	Set extends Collection interface.  This is a collection that cannot contain duplicate elements.  It basically models the mathematical set abstraction.  This can be used to represent set of objects such as deck of cards.
c.	List extends Collection interface.  This is an ordered collection and can contain duplicate elements.  We can access any element from its index.
d.	Queue extends Collection interface.
e.	Map is a collection of key , value pairs.  A map cannot contain duplicate keys.  Each key can map to at most one value.

### **2.	What are the differences between ArrayList and Vector?**


Differences can be explained in terms of three aspects 

•	Synchronization – ArryList is not thread safe whereas Vector is thread-safe.  In Vector class each method like add() , get(int i) is surrounded with a synchronized block, thus making Vector thread-safe.
•	Data growth – Internally both ArrayList and Vector hold their content using an Array.  When an element is inserted into an ArrayList or a Vector, the object needs to expand its internal array if it runs out of room for new element.  A Vector defaults to doubling its array size, while the ArrayList increases its array size by 50 percent.
•	Performance – Since vector is thread-safe, performance is slower than ArrayList.

### **3.	How and ArrayList can be synchronized without using Vector?**

An ArrayList can be synchronized using 

Collection.synchronizedList (List list)

Similarly we can synchronize other collections as:
Collection.synchronizedMap(Map map)
Collection.synchronizedCollection(Collection c)

### **4.	If an Employee class is present and its objects are added to an ArrayList.  How do I sort this list on employId of the Employee class?**

Follow below if you have to write new Employee class:

•	Implement Comparable interface for the Employee class and override the compareTo(Object obj) in which compare the employId
•	Now call the Collections.sort() passing the list as an argument.

Follow below if you already have Employee class:

•	Since Comparable interface cannot be implemented, create Comparator and override the compare(Object obj1, Object obj2) method.
•	Call the Collections.sort() on the list and pass Comparator as an argument.

### **5.	What is the difference between ArrayList and LinkedList?**


### **6.	What are the benefits of Java Collections framework?**

a.	Reduces development effort as we not need to implement our own collection classes
b.	Enhances the quality of the code with well tested framework classes Or Quality is assured as they are well tested.
c.	Reduces effort of code maintenance as they are shipped with JDK
d.	Reusability and Interoperability
7.	What are the benefits of Generics in Collection Framework?

a.	Generics allow us to specify the type of objects that collection can contain.  This ensures that you only insert correct Type in collection.  This avoids ClassCastException at Runtime because we’ll get the error at the time of compilation. 
b.	Generics make code cleaner since we do not need to use casting and instanceof operator.
8.	Why Collection does not extend Cloneable and Serializable interfaces?

If Collection extends Cloneable or Serializable, that would require all Collection implantation to be Cloneable and Serializable, but that would be mistake as it would not be meaning full for all the collection implementation.  For example what does it mean to clone a Collection that is backed by database?  Same argument is true for serialization.

### **9.	Why Map interface doesn’t extend Collection interface?**

Although Map interface and its implementations are part of collections framework, Maps are not collections and collections are not maps.  Collections are “group of elements” and Map contains key-value pairs and it does not fit into the “group of elements” paradigm.

### **10.	 What is an iterator?**

Iterator interface provides methods to iterate over any Collection. We can get iterator instance for any collection using iterator() method.  Iterator allows the caller to remove elements from underlying collection while iterating.  It implements Iterator design pattern.
11.	What is the difference between Enumeration and Iterator interface?

Both Enumeration and Iterator are used for traversing and fetching elements from collection.  Below the differences between Enumeration and Iterator

Enumeration	Iterator
1.	Acts as read only interface, because It has the methods only to travers and fetch the objects from collection.	1.	Iterator provides methods for manipulating collect like adding and removing objects from collection
2.	Has longer names for methods like
hasMoreElements()
nextElement()	2.	Shorter names when compared to methods from Enumeration like
hasNext()
next()
remove()
3.	Not safer in multi-threaded environment	3.	More safe and secure when compared to Enumeration as iterator does not allow other thread to modify the collection object while some thread is iterating over it.  It throws ConcurrentModificationException.  

### **12.	 What are differences between Iterator and ListIterator?**

a.	We can use Iterator to traverse Set and List collection.  Whereas ListIterator can be used with Lists only
b.	Iterator can traverse in forward direction only.  Whereas ListIterator can be used to traverse in both directions.
c.	ListIterator inherits from Iterator interface and comes with extra functionalities like adding an element, replacing an element, getting index positon for previous and next elements.	

### **13.	What are the different ways to iterate over list?**

We can iterate over list in two different ways:

{% highlight java linenos %}
//Fisrt
List<String> list = new ArrayList<String>();
for(String st : list) {
	System.out.println(st + " ");
}

{% endhighlight %}

{% highlight java linenos %}
//Second
Itertor<String> itr = list.iterator();
while(itr.hasNext())
{
	String obj = itr.next();
	System.out.println(obj + " ");
}

{% endhighlight %}

### **14.	What is fail-fast property of the Iterator?**

Iterator fail-fast property checks for any modification in the structure of the underlying collection every time we try to get the next element.  If there is any modification fount, it throws ConcurrentModificationException.  All the implementations 	of Iterator in Collection classes are fail-fast by design except the concurrent collection classes like ConcurrentHashMap and CopyOnWriteArrayList.

### **15.	How to avoid ConcurrentModificationException while iterating over collection?**

We can user concurrent collection classes to avoid ConcurrentModificationException.  
	
### **16.	How HashMap works in Java?**

HashMap stores key-value pair in Map.Entry static nested class implementation.  HashMap uses hashing algorithm and uses hashCode() and equals() method in put() and get() methods.  

When we call put method by passing key-value pair.  HashMap uses key hashCode() to find out the index to store the key-value pair.  They Entry is stored in LinkedList.  If there are already existing entry, it uses equals() method to check if the passed key already exists, if yes it overrides the value else it creates a new entry and stores this key-value Entry.

When we call get method by passing Key, again it uses the hashCode() to find the index in the array and then uses the equals() method to find out the correct Entry and returns its value.

The important things to note about HashMap are capacity, load factor, and threshold resizing.  HashMap initial default capacity is 16 and load factor is 0.75.  Threshold is the capacity multiplied by load factor and whenever we try to add and entry, if map size is greater than threshold, HashMap rehashes the contents of the map into a new array with larger capacity.  The capacity is always the power of 2.

### **17.	What is the importance of hashCode() and equals() methods?**

HashMap uses key Object hashCode() and equals() method to determine the index to put the key-value pair.  These methods are also used when we try to get value from HashMap.  If these methods are not implemented correctly, two different key’s might produce same hashCode() and equals() output and in that case rather than storing it at different locations,. HashMap will consider them same and overwrite them
Similarly all the collection classes that does not store duplicate data use hashCode() and equals() to find duplicates, so its very important to implement them correctly.  	 

### **18.	Why override hashCode() method when override equals()?**

When you insert an object into Hashtable hashCode() method is used to identify the buck where it should be stored.  If you do not override equals() and do not override hashCode() the contract If obj1.equals() == obj2.equals() then obj1.hashCode() should be equal to obj2.hashCode().  Due to which equal object my fall into different buckets of hash tables and while lookup you may end up looking in wrong bucket resulting in object not found.

### **19.	Can we use any class as Map key?**

We can use any class as Map key, however following points should be considered before using them.

a.	If the class overrides equals() method, it should also override hashCode() method
b.	The class should follow all the rules associated with equals() and hashCode().
c.	If a class member is not used in equals(), you should not use it in hashCode() also.
d.	Best practice 

### **20.	What are the different Collection views provided by Map interface?**

a.	Set keyset()	
b.	Collection values()
c.	Set<Map.Entry<K,V>> entrySet()

### **21.	What is difference between HashMap and Hashtable?**

HashMap and Hashtable both implement Map interface and look similar, however there are following differences between them:

a.	HashMap allows null key and values where as Hashtable does not allow null key and values.
b.	Hashtable is synchronized but HashMap is not synchronized.  HashMap is better for single threaded environment and Hashtable is suitable for multi-threaded environments.
c.	LinkedHashMap was introduced in java 1.4 as a sub class of HashMap, so in case you want iteration order, you can easily switch from HashMap to LinkedHashMap.  But this is not the case with Hashtable whose iteration order is unpredictable.
d.	HashMap provides Set of keys to iterate and hence it’s fail-fast. But Hashtable provides Enumeration of keys that does not support this feature.
e.	Hashtable is considered as legacy class and if you are looking for modification of Map while iterating, you should use ConcurrentHashMap

### **22.	How to decide between HashMap and TreeMap?**

For inserting, deleting and locating elements in a Map, the HashMap offers the best alternative.  If however you need to traverse the keys in sorted order, then TreeMap is better alternative.  

Depending on the size of your collection, it may be faster to add elements to a HashMap, then covert the map to TreeMap for sorted key traversal.

### **23.	What are the similarities and differences between ArrayList and Vector?**

Similarities:
a.	Both are index based and backed up by an array internally.
b.	Both maintain the order of insertion and we can get elements in the order of insertion.
c.	The iterator implementation is fail-fast by design for both
d.	Both allow null values and random access to elements using index number

Differences:
a.	Vector is synchronized whereas ArrayList is not synchronized.  However if you are looking for modification of list while iterating, you should use CopyOnWriteArrayList.
b.	ArrayList is faster than Vector because it doesn’t have any overhead of synchronization.
c.	ArrayList is more versatile because we can get synchronized list or read-only list from it easily using Collections utility class.

### **24.	What is difference between Array and ArrayList?  When will you use Array over ArrayList?**

Differences:

a.	Array can contain primitives and Objects where as ArrayList can contain only Objects.
b.	Arrays are fixed in size whereas ArrayList is dynamic.
c.	Array does not provide features like ArrayList, such as addAll, removeAll, iterator etc.

Although the ArrayList is the obvious choice when we work on list, there are time when Array is good to use:

a.	If the size of list is fixed and mostly used to store and traverse through them
b.	For list of primitive data types, although Collections use autoboxing to reduce the coding effort but still it makes them slow when working on fixed size primitive data types.
c.	If you are working on fixed multi-dimensional data, using [][] is far more easier than List<List<>>

### **25.	What is difference between ArrayList and LinkedList?**

ArrayList and LinkedList both implement List interface but there are some differences between them.

a.	ArrayList is index based data structure backed by Array.  So it offers random access to its elements with performance of O(1).  But LinkedList stores data as list of nodes where every node is linked to previous and next node.  So even though there is a method to get the element using index, internally it traverses from start or end of the to reach the index node and then returns the element, so performance is O(n) that is slower than ArrayList.

b.	Insertion, addition or removal of an element is faster in LinkedList compared to ArrayList because there is no concept of resizing array or updating index when element is added in middle.

c.	LinkedList consumes more memory than ArrayList because every node in LinkedList store reference of previous and next elements.

### **26.	Which collection classes provide random access of its elements?**

ArrayList, HashMap, TreeMap and Hashtable classes provide random access to its elements.

### **27.	What are concurrent Collection classes?**

Java 1.5 provided package java.util.concurrent.  This package contains thread-safe collections that allow collections to be modified while iterating.  By design iterator implementation in java.util pakage are fail-fast and throw ConcurrentModificationException..  But iterator implementation in java.util.concurrent package are fail-safe and we can modify the collection while iterating.

Some of these classes are:

•	CopyOnWriteArrayList
•	ConcurrentHashMap
•	CopyOnWriteArraySet

### **28.	What is Queue and Stack differences?**

Both Queue and Stack are used to store elements before processing.  java.util.Queue is an interface whose implementations classes are present in java concurrent package.  Queue allows retrieval of elements in order but not necessarily in FIFO order.  There is a DQueue interface that allows elements to be removed from either ends of Queue.

Stack is similar to Queue except that it allows elements to be retrieved in LIFO order.  Stack is class that extends Vector whereas Queue is an interface.

### **29.	What is Comparable and Comparator interface? What are differences?**

Java provides Comparable interface which should be implemented by any class if it wants to use Array or collections sorting method.  Comparable interface has compareTo (obj) method which is used by sorting methods.  We should implement in such a way that it should return a negative integer, zero and a positive integer if this object is less than, equal to  or greater than the object passed as argument.

In general we want sorting to be based on different parameters.  In such cases we need to use Comparator interface because Comparable.compareTo(Object o) method implementation can sort based on one field only.

Comparator interface compare(Object obj1, Object obj2) method need to be implemented in such a way that it return negetive if first argument is less than the second one and return zero if they are equal and positive if first argument is greater than second one.


Differences:

Comparable interface is used to provide the natural sorting of objects and we can use it to provide sorting based on single logic.

Comparator interface is use to provide different algorithms for.

### **30.	How can we sort list of objects?**

If we need to sort array of object, we can use Array.sort().  If we need to sort list of objects, we can use Collections.sort().  Both of these have overloaded sort() methods for natural sorting using Comparable or sorting base on criteria using Comparator.

Collections internally use Arrays sort method, so both of them have same performance except that Collections take some time to convert list to array.

### **31.	While passing collection as argument to a function how can we make sure the function will not modify it?**

We can create a read-only collection using Collections.unmodifiableCollection(Collection c) method before passing it as argument.  This will make sure that any operation to change the collection will throw UnsupportedOperationException.

### **32.	How can we create synchronized collection from a given collection?**

We can use Collections.synchronizedCollection(Collection c) to get synchronized (thread-safe) collection backed by the specified collection.



