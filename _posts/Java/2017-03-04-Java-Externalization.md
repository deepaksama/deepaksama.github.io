---
layout: post
title: Externalization
meta: Java Externalization
topic-image: java-serialization.jpg
category: java
---


### Introduction & Definitions

#### **Externalization**

Externalization is also a Serialization and uses Externalizable interface to read and write objects.

#### **Why Externalization**

Following issue with Serialization leads to usage of Externalization:
* Serialization serializes the entire object graph and give by less control over writing very specific fields in object graph.

* Both serialization and deserialization requires the serialization mechanism to discover information about data it is serializing.  Default serialization uses Reflections to identify the the fields to serialize and deserialize and to call customized serialization methods.  Use of reflectsion is very expensive and can slows down the application performance.

* With Serialization class meta data is also added to the stream to use during deserialization.  This excess metadata could make your steam site too huge. 

* If serialVersionUID is not set for a class JVM calculates it using entire object graph which would impact the performance.

* With Serialization during the deserialization no constructor gets called which results in unitialized filed.


### Rules of Externalization

* If you want to Eialize any class then it must implement ___Externalizable___ interface.
* Override ___readExternal()___ and ___writeExternal()___ methods
 
### How externalization happens?
* JVM check if the class implements Externalizable interface
* if the class implements externalizable, then serializes the object by calling writeExternal methods
* if the class implements externalizable, then deserializes the object by creating object by calling default constructor first and calling readExternal interface on the object.

### Example

Assume the same example as User object where we want to serialize the password but in encripted format and decript it during deserialization.

___User.java___

{% highlight java linenos %}
package concepts.serialization.externalization;

import java.io.Externalizable;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public class User implements Externalizable{
	private String userName;
	private String password;
	public User() {
		super();
		userName = "UserName";
		password = "********";
		System.out.println("Default Constructor called");
	}
	
	public User(String userName, String password) {
		super();
		this.userName = userName;
		this.password = password;
	}	
	@Override
	public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
		userName = (String) in.readObject();
		password = decript((String)in.readObject());
		System.out.println("readExternal Called");
	}

	@Override
	public void writeExternal(ObjectOutput out) throws IOException {
		out.writeObject(userName);
		out.writeObject(encript(password));
		System.out.println("writeExternal Called");
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

___ExternalizationDemo___

{% highlight java linenos %}
package concepts.serialization.externalization;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class ExternalizationDemo {

	public static void main(String []args) {
		try
		{
			User user = new User("Deepak", "password");
			byte[] bytes = serialize(user);
			User dUser = (User)deSerialize(bytes);
			
			System.out.println("User Name :" + dUser.getUserName());
			System.out.println("Password :" + dUser.getPassword());
			
		} catch(IOException ioe) {
			System.out.println(ioe.getMessage());
		}
		catch(ClassNotFoundException cnf) {
			System.out.println(cnf.getMessage());
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

### Externalization and Inheritance
* If the super class does not implement Externalizable interface then, subclass has to write the super class memebers explicitly to the stream.
* If the super class implements Externalizable interface then, subclass has to simply invoke super class writeExternal() and readExternal() methods from subclass for serialize/deserialize superclass memeber and do write its own fields to the stream.


### Limitations of Externalization

* Default serialization/deserialization adopts the changes to class definition as it extracts the metadata from class definition and metadata written to the stream. As Externalization does not write the metadata to the stream it cannot adopt to the changes in class and requires you to change the serialization and deserialization logic.

* Due to the fact that Externalization requires the class to have default constructor and calls it during the deserialization to intialize the object, Inner classes cannot be externalized as all the inner classes requires outer class instance to call the constructor.

* If your class gets derived from Externalizable class you need to invoke super class version of externalizable interface from subclass implementation.
