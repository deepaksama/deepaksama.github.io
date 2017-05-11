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

### **Steps for Serialization**

**Step 1** : Make your class implements ___Serializable___ interface <br/>
**Step 2** : Create OutputSteam object with target( If you are writing to file then __FileOutputStream__ with file name to which you want to write).<br/>
**Step 3** : Create __ObjectOutputStream__ with using OutputSteam created in step 2.<br/>
**Step 4** : Call writeObject method on ObjectOutputStream object.<br/>


Ex: 

___Employee.java___

{% highlight java linenos %}
package concepts.serialization.bean;
import java.io.Serializable;
/* Step 1 : Make your class implements Serializable interface */
public class Employee implements Serializable {
	private String EmpName;
	private Integer EmpId;
	private Integer basic;
	
	public Employee(String empName, Integer empId, Integer basic) {
		super();
		EmpName = empName;
		EmpId = empId;
		this.basic = basic;
	}	
	public String getEmpName() {
		return EmpName;
	}
	public void setEmpName(String empName) {
		EmpName = empName;
	}
	public Integer getEmpId() {
		return EmpId;
	}
	public void setEmpId(Integer empId) {
		EmpId = empId;
	}
	public Integer getBasic() {
		return basic;
	}
	public void setBasic(Integer basic) {
		this.basic = basic;
	}
}
{% endhighlight %}

___SerializationDemo.java___
{% highlight java linenos %}

package concepts.serialization.serialization;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

import concepts.serialization.bean.Employee;

public class SerializationDemo {

	public static void main(String[] args) {
		Employee emp = new Employee("Deepak", 100, 10000);

		try {
			/* Step 2: Create OutputSteam object with target */
			FileOutputStream fileOut = new FileOutputStream(new File("employee.ser"));
			/*Step 3 : Create ObjectOutputStream with using OutputSteam created in step 2 */
			ObjectOutputStream outStream = new ObjectOutputStream(fileOut);
			/*Step 4 : Call writeObject method on ObjectOutputStream object */
			outStream.writeObject(emp);
			outStream.close();
			fileOut.close();
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}
}
{% endhighlight %}

### **Steps for Deserialization**

**Step 1** : Make your class implements ___Serializable___ interface <br/>
**Step 2** : Create InputSteam object with source( If you are reading from file then __FileInputStream__ with file name to which you want read from).<br/>
**Step 3** : Create __ObjectInputStream__ with using InputSteam created in step 2.<br/>
**Step 4** : Call readObject method on ObjectInputStream object.<br/>

___Ex:___

___DeserializationDemo.java___
{% highlight java linenos %}
package concepts.serialization.serialization;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;

import concepts.serialization.bean.Employee;

public class DeserializationDemo {

	public static void main(String[] args) {
		Employee emp = null;
		try {
			/* Step 2 : Create InputSteam object with source */
			FileInputStream fileIn = new FileInputStream(new File("employee.ser"));
			/* Step 3 : Create ObjectInputStream with using InputSteam created in step 2.*/
			ObjectInputStream in = new ObjectInputStream(fileIn);
			/* Step 4 : Call readObject method on ObjectInputStream object.*/
			emp = (Employee) in.readObject();
			in.close();
			fileIn.close();
		} catch (IOException ioex) {
			ioex.printStackTrace();
			return;
		} catch (ClassNotFoundException c) {
			System.out.println("Employee class not found");
			c.printStackTrace();
			return;
		}

		System.out.println("Deserialized Employee...");
		System.out.println("Emp id: " + emp.getEmpId());
		System.out.println("Name: " + emp.getEmpName());
		System.out.println("Basic: " + emp.getBasic());
	}
}
{% endhighlight %}

### **Do not want to serialize a field ?**

* If you don’t want to serialize any field, then make it ___transient___.

___Ex:___

If you do not want to serialize password filed of User class then you mark the password field as ___trancient___ as below:

___User.java___

{% highlight java linenos %}
package concepts.serialization.transientfield;

import java.io.Serializable;

public class User implements Serializable{
	private String userName;
	transient private String password;

	public User(String userName, String password) {
		super();
		this.userName = userName;
		this.password = password;
	}	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}	
}
{% endhighlight %}

___Note:___ Values of transient fields after Deserializing would null;

### **Specific scenarios**

* You can’t serialize static variables.


### **Caching Objects in the Stream**

* By default ___ObjectOutputStream___ will maintain a reference to an object written to it.  That means that once state of an object written then further writes to same ObjectOutputStream will not be saved.  

__Ex:__

{% highlight java %}
	ObjectOutputStream out = new ObjectOutputStream(...);
	MyObjectobj = new MyObject(); // must be Serializable
	obj.setState(100);
	out.writeObject(obj); // saves object with state = 100
	obj.setState(200);
	out.writeObject(obj); // does not save new object state
{% endhighlight %}

There are two ways to control this :
* Close the stream after each write call.
* We can call ObjectOutputStream.reset() method before write object, which would tell the stream to release the cache of references it is holding.  

### **Customizing Serialization**

When an object gets serialized ObjectOutputStream looks for below methods(called ___magic methods___) which developer can provide to customize the serialization. Below are the serialization magic methods in the order they called in pipeline.

* ___writeReplace___ : This method allows the developer to provide a replacement object that will be serialized instead of original object. 
	*Signature:*
{% highlight java %}
	private Object writeReplace() throws ObjectStreamException;
{% endhighlight %}

* ___wirteObject___ : This method allow to take control over what will be serialized.  In most cases, you will just call ObjectOutputStream.defaultWriteObject() method to use default serialization process, then add some data of your choice.

	*Signature:*
{% highlight java %}
	private void writeObject (ObjectOutputStream out) throws IOException;
{% endhighlight %}


	
### **Customizing Deserialization**

When object gets deserialized ObjectInputSteam looks for below methods (called ___magic methods___) which developer can provide to customize deserialization. Below are the deserialization magic methods in the order they called in pipeline.

* ___readObject___ : This method allows to take control over how do we deserialize.  In most cases, you will just call ObjectInputStream.defaultReadObject() to use default deserialization process, then read custom data.

	*Signature:*
{% highlight java %}
	private void readObject(java.io.ObjectInputStream in) throws IOException, ClassNotFoundException
{% endhighlight %}

* ___readResolve___: It may be used to replace the deserialized object by another one of your choice.

	*Signature:*
{% highlight java %}
	private Object readResolve() throws ObjectStreamException
{% endhighlight %}

* ___validateObject___ :If serialization object implements ObjectInputValidation, you may register it as a stream validator.   This is useful to verify the stream has valid data that makes sense before handling it back to application.

	*Signature:*
{% highlight java %}
	public void validateObject() throws InvalidObjectException
{% endhighlight %}
	
### **Custom Serialization/Deserialization Example**

Assume the same example as User object where we want to serialize the password but in encripted format and decript it during deserialization.
___User.java___
{% highlight java linenos %}
package concepts.serialization.customserialization;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public class User implements Serializable{
	private String userName;
	transient private String password;

	public User(String userName, String password) {
		super();
		this.userName = userName;
		this.password = password;
	}	
	
	private void writeObject(ObjectOutputStream oos) throws IOException {
		oos.defaultWriteObject();
		oos.writeObject(encript(password));
		System.out.println("Write");
	}
	
	private void readObject(ObjectInputStream ois) throws IOException, ClassNotFoundException {
		ois.defaultReadObject();
		password = decript((String) ois.readObject());
		System.out.println("Read");
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String encript(String str) {
		StringBuffer buf = new StringBuffer(str);
		StringBuffer temp = new StringBuffer("");
		for(int i=0; i < buf.length(); i++) {
			temp.append((char)(buf.charAt(i) + 1));
		}
		return temp.toString();
	}
	
	public String decript(String str) {
		StringBuffer buf = new StringBuffer(str);
		StringBuffer temp = new StringBuffer("");
		for(int i=0; i < buf.length(); i++) {
			temp.append((char)(buf.charAt(i) - 1));
		}
		return temp.toString();		
	}
}
	
{% endhighlight %}
___CustomizedSerialization.java___
{% highlight java linenos %}
package concepts.serialization.customserialization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class CustomizedSerialization {

	public static void main(String[] args) {
		try
		{
			User user = new User("Deepak", "password");
			byte[] bytes = serialize(user);
			User dUser = (User)deSerialize(bytes);
			
			System.out.println("User Name :" + dUser.getUserName());
			System.out.println("Password :" + dUser.getPassword());
			
		} catch(IOException ioe) {
			
		}
		catch(ClassNotFoundException cnf) {
			
		}
	}

	public static byte[] serialize(Object obj) throws IOException  {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ObjectOutputStream oos = new ObjectOutputStream(baos);
		oos.writeObject(obj);
		oos.flush();
		oos.close();
		return baos.toByteArray();
	}
	
	public static Object deSerialize(byte[] bytes) throws IOException, ClassNotFoundException {
		ByteArrayInputStream bais = new ByteArrayInputStream(bytes);
        ObjectInputStream ois = new ObjectInputStream(bais);
        Object o = ois.readObject();
        ois.close();
        return o;
	}
}	
{% endhighlight %}

### **Points to remember in customization of Serialization/Deserialization**

Developer can enhance the default serialization by providing below above private methods (excluding validateObject) in their class:

* As these method are private cannot be overloaded or overridden.
* By writing these method we are not overriding/overloading existing methods.  The virtual machine will automatically check to see if either method is declared and will call using reflections API.
* This kind of customization is useful for defining pre and post process of serialization and deserialization and actual serialization and deserialization is done by default protocol.
* This method will not give full control over serialization/deserialization as default serialization/deserialization is done.

### **Inheritance**

* If super class is __Serializable__ then its subclasses are automatically Serializable.
* If super class is not __Serializable__ then all values of the instance variables inherited from super class will be initialized by calling constructor of Non-Serializable Super class during deserialization process.
* If you don’t want subclass to serializable then you need to implement ___writeObject()___ and ___readObject()___ method and need to throw __NotSerializableException__ from this methods.


### **Version control**

* ___serialVersionUID___ is used during the deserialization process to verify that the sender and receiver of serialized object have loaded class for that object which is compatible with respect to serialization.
* Defining serialVersionUID field in serializable class is not mandatory.
* If serializable class has ___serialVersionUID___ field then it should __long__ type and it should ___static___ and ___final___.
* If there is no ___serialVersionUID___ field defined explicitly, then serialization runtime will calculate default value for that class.  Which can vary based on compiler.  Hence it is advisable to define  ___serialVersionUID___.
* It is advised to use ___private___ modifier for ___serialVersionUID___.
* If there is difference between ___serialVersionUID___ of loaded receiver class and corresponding sender class then __InvalidClassException__ will be thrown.



### **Externalization**






