---
layout: post
title: Java Serialization and Deserialization
meta: Java Serialization
topic-image: java-serialization.jpg
category: java
---

### Introduction & Definitions

#### **Serialization**

Serialization is the translation of your Java object’s values/states to bytes to send it over network or save it.  

#### **Deserialization**

Deserialization is conversion of byte code to corresponding java objects.

**Note:** <br/>
> Good thing about Serialization is entire process is JVM independent, meaning that an object can be serialized on one platform and deserialized on an entirely different platform.

### **Rules**

* If you want to serialize any class then it must implement ___Serializable___ interface which is marker interface. 
>Marker interface in Java is interface with no field or methods or in simple word empty interface in java is called marker interface
* When you serialize any object and if it contains any other object reference then Java serialization serialize that object’s entire object graph.
* If you don’t want to serialize any field, then make it ___transient___.

### **Version control**

* ___serialVersionUID___ is used during the deserialization process to verify that the sender and receiver of serialized object have loaded class for that object which is compatible with respect to serialization.
* Defining serialVersionUID field in serializable class is not mandatory.
* If serializable class has ___serialVersionUID___ field then it should __long__ type and it should ___static___ and ___final___.
* If there is no ___serialVersionUID___ field defined explicitly, then serialization runtime will calculate default value for that class.  Which can vary based on compiler.  Hence it is advisable to define  ___serialVersionUID___.
* It is advised to use ___private___ modifier for ___serialVersionUID___.
* If there is difference between ___serialVersionUID___ of loaded receiver class and corresponding sender class then __InvalidClassException__ will be thrown.

### **Inheritance**

* If super class is __Serializable__ then its subclasses are automatically Serializable.
* If super class is not __Serializable__ then all values of the instance variables inherited from super class will be initialized by calling constructor of Non-Serializable Super class during deserialization process.
* If you don’t want subclass to serializable then you need to implement ___writeObject()___ and ___readObject()___ method and need to throw __NotSerializableException__ from this methods.

### **Specific scenarios**

* You can’t serialize static variables.


### **Caching Objects in the Stream**

* By default ___ObjectOutputStream___ will maintain a reference to an object written to it.  That means that once state of an object written then further writes to same ObjectOutputStream will not be saved.  

__Ex:__

ObjectOutputStream out = new ObjectOutputStream(...);
MyObjectobj = new MyObject(); // must be Serializable
obj.setState(100);
out.writeObject(obj); // saves object with state = 100
obj.setState(200);
out.writeObject(obj); // does not save new object state

There are two ways to control this :
* Close the stream after each write call.
* We can call ObjectOutputStream.reset() method before write object, which would tell the stream to release the cache of references it is holding.  

### **Customizing Serialization**

* When an object gets serialized ObjectOutputStream looks for below methods which developer can provide to customize the serialization.
* wirteObject : This method allow to take control over what will be serialized.  In most cases, you will just call ObjectOutputStream.defaultWriteObject() method to use default serialization process, then add some data of your choice.

**Signature:**
	private void writeObject (ObjectOutputStream out) throws IOException;

* writeReplace : This method allows the developer to provide a replacement object that will be serialized instead of original object. 
Sig:
	private Object writeReplace() throws ObjectStreamException;

* When object gets deserialized ObjectInputSteam looks for below methods which developer can provide to customize deserialization.

* readObject: This method allows to take control over how do we deserialize.  In most cases, you will just call ObjectInputStream.defaultReadObject() to use default deserialization process, then read custom data.
Signature:
	private void readObject(java.io.ObjectInputStream in) throws IOException, ClassNotFoundException

* validateObject:If serialization object implements ObjectInputValidation, you may register it as a stream validator.   This is useful to verify the stream has valid data that makes sense before handling it back to application.

Signature:
	public void validateObject() throws InvalidObjectException

* readResolve: It may be used to replace the deserialized object by another one of your choice.

Signature:
	private Object readResolve() throws ObjectStreamException

* Developer can enhance the default serialization by providing below two private methods in their class:

	* private void writeObject(ObjectOutputStream out) throws IOException;
	* private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException;
	* By writing these method we are not overriding/overloading existing methods.  The virtual machine will automatically check to see if either method is declared and will call using reflections API.
	* As these method are private cannot be overloaded or overridden.
	* This kind of customization is useful for defining pre and post process of serialization and deserialization and actual serialization and deserialization is done by default protocol.
	* This method will not give full control over serialization/deserialization as default serialization/deserialization is done.

### **Externalization**






