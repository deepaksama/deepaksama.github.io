---
layout: post
title: Hibernate Interview Questions
meta: 
category: hibernate
published: true
---

#### **1.	What is Hibernate framework?**

Object relational mapping or ORM is the technique to map application domain model objects to the relational database tables.  Hibernate is a java based ORM tool that provides framework for mapping application domain model objects to the relational database objects and vice versa.

Hibernate provides reference implementation of Java Persistence API, that makes it a great choice as ORM tool with benefits of loose coupling.  We can use Hibernate persistence API for all CRUD operations.  Hibernate framework provides option to map plain old java objects to traditional database tables with the use of JPA annotations as well as XML configuration.

#### **2.	What is JPA?**

Java Persistence API (JPA) provides specification for managing the relational data in applications.  Current JPA version 1.2 was start in july 2011 as JSR 338 and was approved as final on May 2013.

JPA specifications are defined with annotation in javax.persistence package.  Using JPA annotations helps us in writing implementation independent code.

#### **3.	What are the important benefits of using Hibernate Framework?**

Some of the important benefits of using hibernate framework are:
1. Hibernate eliminates all the boiler-plate code that comes with JDBC and takes care of managing resources, so we can focus on business logic.
1. Hibernate framework provides support for XML configuration and  JPA annotations, that makes our code implementation independent.
1. Hibernate provides power full query language HQL which is similar to SQL and is fully object oriented and understands concepts like association, inheritance and polymorphism.
1. Hibernate is an open source project started by Red hat Community and used worldwide.  This makes it better choice over other ORMS as there are tons of online documentation and help easily available in forums which makes learning curve very small.
1. Hibernate can be easily integrated with other Java EE frameworks.  It’s so popular that Spring framework provides built-in support for integrating Hibernate with Spring applications.
1. Hibernate supports lazy initialization using proxy objects and performs actual database queries only when its required.
1. Hibernate cache helps us in getting better performance
1. Hibernate is suitable for vendor specific database features, because we can execute native sql queries.

Overall hibernate is the best choice in current market for ORM tool.

#### **4.	What are the advantages of Hibernate over JDBC?**

Some of the advantages of Hibernate over JDBC are:

1. Hibernate removes lot of boiler-plate code that comes with JDBC and with Hibernate code looks much cleaner and readable.
1. Hibernate supports association, inheritance, polymorphism and collection.  These features are not available with JDBC.
1. Hibernate implicitly provides transaction management.  In fact most of the queries cannot be executed outside transaction.  In JDBC we need write code for transaction management using commit and rollback.
1. JDBC API throws a checked exception SQLException. So we need to write lot of try-catch bock code.  Most of the time its redundant in every JDBC call.  Hibernate wraps JDBC exceptions and throws unchecked exceptions like JDBCException and HibernateException, so we do not need code to handle it.  Hibernate built-in transaction management removes the usage of try-catch blocks.
1. Hibernate query language HQL is more object oriented and close to java programming language.  For JDBC we need to write native sql queries.
1. Hibernate supports caching that is better for performance.  JDBC queries are not cached hence performance is low.
1. Hibernate configuration helps us in using JDBC like connection as well as JNDI Datasource for connection pool.  This is very important feature in enterprise application and completely missing in JDBC API.
1. Hibernate supports JPA annotations, so code is independent of implementation and can be easily replaced with other ORM tools.  JDBC code makes the application more tightly coupled with DB used due to the native SQL queries used.

#### **5.	Name some of the important interfaces of Hibernate framework?**

Some of the important interfaces of Hibernate Framework are:

1. __SessionFactory(org.hibernate.SessionFactory)__:  SessionFactory is an immutable thread-safe cache of compiled mappings for a single database.  We need to initialize SessionFactory once and then we can cache and reuse it.  SessionFactory is used to get the Session objects for database operations.
1. __Session(org.hibernate.Session)__:  Session is a single threaded, short lived object representing a conversation between the application and persistence data store.  It wraps JDBC __java.sql.Connection__ and works a as factory for __org.hibernate.Transaction__.  We should open session only when it is required and close it as soon as we are done using it.  Session object is an interface between the application code and hibernate framework and provides methods for CRUD operations.
1.	__Transaction(org.hibernate.Transaction)__:  Transaction is single-threaded, short lived object used by the application to specify atomic unit of work.  It abstracts the application from underlying JDBC or JTA transaction.  A __org.hibernate.Session__ might span multiple __org.hibernate.Transaction__ in some cases.

#### **6.	What is hibernate configuration file?**

Hibernate configuration file is a (___hibernate.cfg.xml___) file that contains database specific configuration and is used to initialize __SessionFactory__.  Some important information we provide is:
* Database credentials or JNDI resource information.  
* Dialect information, so that hibernate knows the SQL varient to generate.
* Size of the connection pool.
* Schema auto generation.
* Mapping file or class details.

Ex:

{% highlight xml linenos %}
<hibernate-configuration>
	<session-factory>        
		<property name="connection.driver_class">com.mysql.jdbc.Driver</property>
		<property name="connection.url">jdbc:mysql://localhost:3306/test_db</property>
		<property name="connection.username">root</property>
		<property name="connection.password">xxx</property>

		<property name="connection.pool_size">1</property>

		<property name="dialect">org.hibernate.dialect.MySQLDialect</property>

		<property name="cache.provider_class">org.hibernate.cache.NoCacheProvider</property>
		<property name="show_sql">true</property>
		<property name="hbm2ddl.auto">validate</property>

		<mapping class ="models.Category" />
	</session-factory>
</hibernate-configuration>
{% endhighlight %}


#### **7.	What is hibernate mapping file?**

Hibernate mapping file is used to define the mappings between entity bean fields and database table column.  JPA annotations can also be used for mapping but some time XML mapping file comes handy when we are using third party classes and we cannot use annotations.

You should use the file name <classname>.hbm.xml.

Ex: 
{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE hibernate-mapping PUBLIC 
 "-//Hibernate/Hibernate Mapping DTD//EN"
 "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd"> 

<hibernate-mapping>
   <class name="Employee" table="EMPLOYEE">
      <meta attribute="class-description">
         This class contains the employee detail. 
      </meta>
      <id name="id" type="int" column="id">
         <generator class="native"/>
      </id>
      <property name="firstName" column="first_name" type="string"/>
      <property name="lastName" column="last_name" type="string"/>
      <property name="salary" column="salary" type="int"/>
   </class>
</hibernate-mapping>
{% endhighlight %}

#### **8.	Name some important annotations used for Hibernate mapping?**

Hibernate supports JPA annotations and has its some additional annotation in org.hibernate.annotations package.   Some of the important JPA and Hibernate annotations are:

1. __Javax.persistence.Entity__: Used with the model classes to specify that they are entity beans
1. __Javax.persistence.Table__: Used with entity beans to define the corresponding table name in database.
1. __Javax.persistence.Access__:  
1. __Javax.persistence.Id__:  Used to define primary key in entity bean
1. __Javax.persistence.EmbeddedId__:  Used to define composite primary key in the entity bean
1. __Javax.persistence.Column__:  Used to define column name in the database table.
1. __Javax.persistence.GeneratedValue__:  Used to define a strategy to be used for generating primary key.  Used in conjunction with __javax.persistence.GenerationType__ enum.
1. __Javax.persistence.OneToOne__:  Used to define One-to-One mapping between two entity beans.  We have similar annotations as ManyToOne, OneToMany,and ManyToMany.
1. __Org.hibernate.annotations.	Cascade__:  used to define the cascading between two entity beans, used with mappings.  It works in conjunction with __org.hibernate.annotations.CascadeType__
1. __Javax.persistence.PrimaryKeyJoinColumn__:  Used to define the property for foreign key.  Used with __org.hibernate.annotations.GenericGenerator__ and __org.hibernate.annotations.Parameter__

#### **9.	What is Hibernate SessionFactory and how to configure it?**

SessionFactory is the factory used to get Session objects.  SessionFactory is responsible to read the hibernate configuration parameters and connect to the database and provide Session objects.  Usually an application will have single SessionFactory instance and threads servicing client requests obtain Session instance from this factory.

The internal state of the SessionFactory is immutable.  Once it is created its internal state is set.  This internal state includes all the metadata about Object/Relational Mapping.

SessionFactory also provides methods to get the second level cache details.

#### **10.	Is Hibernate SessionFactory is thread safe?**

Internal state of SessionFactory is immutable.  So, it is thread safe.  Multiple threads can access it simultaneously to get Session instances.

#### **11.	What is Hibernate Session and how to get it?**

Hibernate Session is a interface between java application layer and hibernate.  This is a core interface used to perform database operations.  Lifecycle of Session is bound by the beginning and end of a transaction.

Session provides methods to perform create, read, update and delete operations for a persistent object.  We can execute HQL queries, SQL native queries and create criteria using Session object.

#### **12. Is Hibernate Session thread safe?**

Hibernate Session object is not thread safe.  Every thread should get its own Session instance and close it after its work is finished.

#### **13. What is the difference between openSession(), getCurrentSession(), and openSatelessSession()?**

**getCurrentSession():**

Hibernate ___SessionFactory getCurrentSession()___ method return the session bound to the context.  But for this to work we need to configure it in hibernate configuration file like below:

{% highlight xml %}
<property name="hibernate.current_session_context_class> thread </property>
{% endhighlight %}

Since this Session object belongs to the hibernate context, we don’t need to close it.  Once the SessionFactory is closed, this session also gets closed.  Hibernate Session objects are not thread safe, so we should not use it in multi-threaded environment.  We can use it in single threaded environment because its relatively faster than opening and closing a new session every time we need one.

**openSession():**

Hibernate ___SessionFactory openSession()___ always opens a new Session.  We should close this session once we are done with all the database operations.  We should open a new session for each request in multithreaded environment.  For web application frameworks, we can choose to open a new session for each request or for each session based on the requirement.

**openStatelessSession():**

Hibernate ___SessionFactory openStatelessSession()___ method returns instance of StatelessSession.  There is another overloaded method where we can pass __java.sql.Connection__ object to get StatelessSession object from hibernate.

StatelessSession does not implement first-level cache and doesn’t interact with any second-level cache.  Since it’s stateless, it doesn’t implement transactional write-behind or automatic dirty checking or do cascading operations to associated entities.

Collections are also ignored by a StatelessSession.  Operations performed via StatelessSession bypass Hibernate’s event model and interceptors.  Its more like JDBC and does not provide any benefits that come from using hibernate framework.

However, StatelessSession can be good fit in certain situations.  For ex: where we are loading bulk data into database and we don’t want hibernate session to hold huge data in first-level cache memory.

Ex:

{% highlight java linenos %}

package com.journaldev.hibernate.main;
 
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.StatelessSession;
 
import com.journaldev.hibernate.util.HibernateUtil;
 
public class HibernateSessionExample {
 
    public static void main(String[] args) {
         
        SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
         
        //Current Session - no need to close
        Session currentSession = sessionFactory.getCurrentSession();
         
        //open new session
        Session newSession = sessionFactory.openSession();
        //perform db operations
         
        //close session
        newSession.close();
         
        //open stateless session
        StatelessSession statelessSession = sessionFactory.openStatelessSession();
        //perform stateless db operations
         
        //close session
        statelessSession.close();
         
        //close session factory
        sessionFactory.close();         
    } 
}

{% endhighlight %}

#### **14.	What is the difference between Hibernate Session get() and load() methods?**

Hibernate comes with different methods to load data from database.  get() and load() are most used methods.  The differences between them are:

* _get()_ loads the data as soon as it called whereas _load()_ returns a proxy object and loads data only when its actually required.  So _load()_ is better than _get()_ as it supports lazy loading.
* When data does not exists, _get()_ returns _null_.  As _load()_ return proxy objects it throws hibernate specific Runtime Exception __org.hibernate.ObjectNotFountException__.  
* It is suggested that we should use _load()_ only when we know data exists and use _get()_ when you are not sure of the data exists or not.

#### **15.	What is Hibernate caching? Explain Hibernate first level caching, second level caching and query caching?**

Hibernate caching is useful in gaining fast application performance.  The idea behind the caching is to reduce the number of queries made to database there by reducing the throughput time of the application.

<div class="col-md-12">
	<div class="col-md-6">
	<img src="{{site.baseurl}}/resources/images/hibernate/hibernate-cache.PNG" class="content-image"/>
	</div>
</div>


Hibernate provides three caching strategies:

a.	First level cache(Session cache): 
* In hibernate first level cache is enabled by default and we do not need to do anything to get this functionality working.  
* We cannot disable it even forcibly.
* If we issue multiple update to an object, Hibernate tries to delay doing the update as long as possible to reduce the number of queries issued to the database.  
* This cache is available during the life span of the Session object.  If session is closed cached objects are persisted or updated or lost.
* Cached objects are not shared across sessions.

b.	Query cache:  
* Queries cache is responsible for caching the results of queries or to be more precise keys of objects returned by queries.  
* When a query cache is turned on; the results of the query are stored against the combination of query and parameters.  Every time a query is fired the cache manager checks for the combination of query and parameters.  If the results are found in the cache, they are returned otherwise database query is initiated.

* In order to make use of query cache we need do below things.
	* setCacheable(true) for the query object
	* Change the hibernate configuration file to include the below line
{% highlight xml %}
	<property name="hibernate.cache.use_query_cache">true</property>
{% endhighlight %}
* Ex:
{% highlight java linenos %}
Session session = getSessionFactory().openSession();
 Transaction tx = session.beginTransaction();
 Query query = session.createQuery("from Person p where p.id=1");
 query.setCacheable(true);
 Iterator it = query.list().iterator();
 while (it.hasNext ()){
    Person p = (Person) it.next();
    System.out.println(p.getFirstName());
 }
 query = session.createQuery("from Person p where p.id=1");
 query.setCacheable(true);
 it = query.list().iterator();
 while (it.hasNext ()){
    Person p = (Person) it.next();
    System.out.println(p.getFirstName());
 }
 tx.commit();
 session.close();
{% endhighlight %}

 
c.	Second Level cache:

* The key characteristic of second level cache is that it is used across Sessions.
* Hibernate provides flexibility to exchange second level cache providers.
* A third party cache can be used with Hibernate.  An interface org.hibernate.cache.CacheProvider is provided by Hibernate which must be implemented to provide Hibernate with a handle to cache implementation
* Second level cache is configured on a per-class and per-collection basis.
* Hibernate second-level cache is setup in two steps.
	* Step 1: To activate second level cache we need to include below in hibernate configuration file. This tells the Hibernate to enable second level caching and which cache provider to use.	

	* Step 2: Concurrency strategies:  It’s a mediator which is responsible for storing items of data in cache and retrieving from the cache.  We need to decide for each persistent class and collection, which concurrency strategy to use.  Below are the strategies 
		* TRANSACTIONAL:  
		* READ_WRITE:
		* NONSTRICT_READ_WRITE:
		* READ_ONLY:  suitable for data which never change.  Use it for reference data only
	* Below are two code samples for above two steps:
	
	{% highlight xml %}
	<!-- Step 1: Use this configuration to activate the second level cache.	-->
	<property name="hibernate.cache.use_second_level_cache"> true</property>
	<property name="hibernate.cache.provider_class">
		org.hibernate.cache.EhCacheProvider
	</property>	
	{% endhighlight %}		

	{% highlight java %}
	//Step 2: Use this to annotate the persistence class.
	@Cacheable
	@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE) 
	{% endhighlight %}

* Second level cache is optional and first level cache is always consulted before any attempt is made to locate object in second level cache.


Ref: 
* http://www.tutorialsdesk.com/2014/11/caching-in-hibernate-one-of-major.html
* http://howtodoinjava.com/2013/07/02/how-hibernate-second-level-cache-works/

#### **16.	What are the different states of entity bean?**

An entity bean instance can exist in one of the states:

a.	__Transient:__  An object that is never persisted or associated with Session will be in Transient state.  A transient object can be made Persistent by calling _save()_, _persist()_ or _saveOrUpdate()_ methods.  

b.	__Persistent:__  When an object is associated with a unique session, then is called to be in Persistent state.  Any instance returned by _get()_ or _load()_ method is Persistent.  A Persistent instance can be made transient by calling _delete()_ method.

c.	__Detached:__  An object was previously Persistent but not associated with any Session any more then it is call to be in Detached state.  Detached instances can be made Persistent by calling _update()_, _saveOrUpdate()_, _lock()_ or _replicate()_ methods.  A state of a Transient or Detached instance can be made Persistent as a new Persistent instance by calling _merge()_.

<div class="col-md-12">
	<div class="col-md-8">
	<img src="{{site.baseurl}}/resources/images/hibernate/hibernate-entity-bean-state-transitions.PNG" class="content-image"/>
	</div>
</div>


#### **17.	What happens if we do not have no-args constructor in Entity Bean?**

Hibernate uses Reflection API to create instances of Entity beans, usually when get() or load()  methods are called.  The method Class.newInstance() is used for this and it requires no-args constructor.  If we do not have no-args constructor in entity beans, hibernate will fail to instantiate it and you will get __HibernateException__.

#### **18.	What are the collection types in Hibernate?**

There are five collection types in hibernate used for one-to-many relationship mapping.

* Bag
* Set
* List
* Array
* Map

#### **19.	How to implement joins in Hibernate?**

There are various ways to implement joins in hibernate:
* Using association like one-to-one, one-to-many.
* Using joins in HQL query.  There is another form “join-fetch” to load associated data simultaneously, no lazy loading.
* We can fire native sql query and use join keyword

#### **20.	Why we should not make Entity Class as final?**

Hibernate use proxy class for lazy loading.  This is done by extending the entity bean.  If entity bean is final then lazy loading will not be possible, hence low performance.

#### **21. What is HQL and what are its benefits?**

#### **22.	Can we execute native sql query in Hibernate?**

Hibernate provides a way to execute native sql queries through the use of SQLQuery object.  For normal scenarios it is not recommended approach because we loose benefits related to hibernate associations and hibernate first level caching.

#### **23.	What is benefit of native SQL query support in hibernate?**

Native SQL Query support comes in handy when we want to execute database specific queries that are not supported by Hibernate API such as query hints or the CONNECT keyword in Oracle database.

#### **24.	What is Named SQL Query? What are the benefits of Named SQL Query?**

Hibernate provides Named Query that can be defined at central location and use them anywhere in the code.  We can create Named Queries for both HQL and Native SQL.
Hibernate Named Queries can be defined in Hibernate mapping file or through JPA annotations @NameQuery or @NamedNativeQuery.

Advantages of Named Queries:
* Named Queries help us in grouping all the queries at central location rather than letting them scattered all over the code.
* Hibernate Named Query syntax is checked when the Hibernate SessionFactory is created, thus making the application fail fast in case of any error in the named queries.
* Hibernate Named Query is global, that means once defined it can be used throughout the application.

#### **25.	What is the benefit of Hibernate Criteria API?**

Hibernate provides Criteria API that is more object oriented for querying the database and getting results.  We cannot use Criteria API to run update or delete queries or any DDL statements.  Its only used to fetch results from database using more object oriented approach.

Some of the common uses of Criteria API are:
* Criteria API provides Projection that we can use for aggregate function like sum(), min(), max()  etc.
* Criteria API can be used with ProjectionList to fetch selected columns only.
* Criteria API can be used for join queries by joining multiple tables.  Useful methods are createAlias(), setFetchModel(), and setProjection().
* Criteria API can be used for fetching results with Conditions.  Useful method is add() where we can add Restrictions.
* Criteria API provides addOrder() methods that we can use for ordering results.

#### **26.	How to log hibernated generated sql queries in log files?**

We can use below property tag for hibernate configuration to log SQL queries
{% highlight xml %}
<property name=”hibernate.show_sql”>true</property>
{% endhighlight %}

However we should use it only in development and testing environments and turn it off in production.

#### **27.	What is Hibernate Proxy and how it helps in lazy loading?**

Hibernate supports proxy objects for lazy loading.  Basically when we load data from tables, hibernate doesn’t load all the mapped objects.  As soon as you reference the child or lookup object via getter methods, if he linked entity is not in the session cache, then proxy code will go to the database and load the linked object.  It uses javaassist to effectively and dynamically generate sub-classed implementation of your entity objects.

#### **28.	How to implement relationships in hibernate?**

Most of the time, database tables are associated with each other.  There are my forms of association one-to-one, one-to-many and many-to-many at the broad level.  We can easily implement one-to-one, one-to-many, many-to-many relationships in Hibernate.  It can be done using JPA annotations as well as XML configurations. 

##### **a.	OneToOne Mapping:**

<span class="underline"> Using XML Configurations: </span>

**Hibernate configuration file:**

{% highlight xml linenos %}
<mapping resource="WUserDetail.hbm.xml">
<mapping resource="WUser.hbm.xml">
{% endhighlight %}


<span class="underline"> **Mapping files:**</span>

**Parent Class (wuser.hbm.xml)**

{% highlight xml linenos %}
<hibernate-mapping>
	<class name="com.testpackage.model.WUser" table="WUSER">
		<id name="id" type="long">
			<column name="account_number" />
			<generator class="native"/>
		</id>
		<property name="name" type="name"/>
		<property name="email" type="double"/>
		<one-to-one name="details" 
		class="com.testpackage.model.WUserDetails" cascade="save-update"/>
	</class>
</hibernate-mapping>
{% endhighlight %}

**Child Class (wuserdetails.hbm.xml)**

{% highlight xml linenos %}
<hibernate-mapping>
	<class name="com.testpackage.model.WUserDetails" table="WUSER_DETAILS">
		<id name="id" type="long">
			<column name="account_number" />
			<generator class="foreign">
				<param name="property">user</param>
			</generator>
		</id>
		<property name="product_name" type="string"/>
		<property name="tax_rate" type="string"/>
		<one-to-one name="user"  class="com.testpackage.model.WUser" 
			consttrained="true" />

	</class>
</hibernate-mapping>
{% endhighlight %}

<span class="underline"> Using Annotations way: </span>

**Hibernate configuration file:**

{% highlight xml linenos %}
 	<mapping class="net.viralpatel.hibernate.WUserDetail">
   	<mapping class="net.viralpatel.hibernate.WUser">
{% endhighlight %}

<span class="underline"> **Model classes :**</span>

**WUser.java**

{% highlight java linenos %}
@Entity
 @Table(name="WUser")
 public class WUser
 {
	@Id
	@GeneratedValue
	@Column(name="account_number")
	private long id;
	private String name;
	private String email;


	@OneToOne(mappedBy = "user", cascade=CascadeType.ALL)
	private WUserDetail details;
 }
{% endhighlight %}

**WUserDetails.java**

{% highlight java linenos %}
 @Entity
 @Table(name="WUser_Detail")
 public class WUserDetails
 {
	@Id
	@Column(name="account_number", unique="true",nullable="false")
	@GeneratedValue(generator="gen")
	@GenericGenerator(name="gen",strategy="foreign",value="user"
	private long id;
	private String product;
	private long tax_rate;


	@OneToOne
	@PrimaryKeyJoinColumn
	private WUser user;
 }
{% endhighlight %}

##### **b. OneToMany Mapping**
##### **c. ManyToMany Mapping**

Ref: 
* http://viralpatel.net/blogs/hibernate-one-to-one-mapping-tutorial-using-annotation/

#### **29.	How transaction management works in Hibernate?**

Transaction management is easy in Hibernate as most of the operations are not permitted outside of the transaction.  After getting Session form SessionFactory we can call Session.beginTransaction() to start transaction.  This returns the transaction reference that we can use later on to either commit or rollback the transaction.

Overall Hibernate transaction management is better than JDBC transaction management because we do not need to rely on exceptions for rollback.  If any exception is thrown by sessions methods,  it automatically rollback the transaction.

#### **30.	What is cascading and what are different types of cascading?**

When we have relationship between entities, then we need to define how the different operations will affect the other entity.  This is done by cascading. 

Commonly used Cascading types as defined in CascadeType enum are:

* None – That means no cascading.  It’s not a type but when we don’t define any cascading then no operation in parent affect the child
* ALL
* SAVE_UPDATE
* DELETE
* DETATCH, MERGE, PERSIST, REFRESH, AND REMOVE
* LOCK
* REPLICATE

Ex:
{% highlight java linenos %}
import org.hibernate.annotations.Cascade
 import org.hibernate.annotations.CascadeType

 @Entity
 @Table(name="EMPLOYEE")
 public class Employee
 {
	@OneToOne(mappedBy = "employee")
	@Cascade(type = CascadeType.ALL)
	private Address address;
 }
{% endhighlight %}

Note:  Hibernate CascadeType enums are different from JPA java.persistence. CascadeType.  


#### **31.	How to integrate log4j logging in hibernate application?**

Hibernate uses JBoss logging rather than slf4j which is used in earlier versions.  For log4j configuration, we need to follow below steps:

* Add log4j dependencies
* Create log4j.xml configuration file or log4j.properties file and keep it in the classpath.  We can keep the file name whatever we want because in next step we can specify it.
* For standalone projects, use static block to configure log4j using DOMConfigurator or PropertiesConfigurator.  For web applications we can use ServletContextListener to configure it.
* Create  org.apache.log4j.Logger instance in the java classes and start logging it.

Ref:
http://www.journaldev.com/2984/hibernate-4-log4j-configuration-example
http://www.journaldev.com/1997/servlet-example-in-java-with-database-connection-and-log4j-integration

#### **32.	How to use application server JNDI DataSource with hibernate framework?**

Remove all the database specific properties, and use the below property to provide the JNDI DataSource name.

{% highlight xml %}
<property name=”hibernate.connection.datasource”>
	Java:comp/env/jdbc/MylocalDB
</property>
{% endhighlight %}

#### **33.	What design patterns are used in Hibernate Framework?**

Some of the design patterns used in Hibernate Framework are:

* Domain model pattern – An object model of the domain that incorporates both behaviour and data.
* Data Mapper Pattern – A layer of mappers that move data between objects and database while keeping them independent of each other and mapper itself
* Proxy Pattern – for lazy loading using Proxy objects
* Factory Pattern – in SessionFactory

Refer : <a href='/architecture/2017/06/13/architectural-patterns.html'>Architectural Patterns</a>


#### **34.	What are the best practices to follow with Hibernate Framework?**

Some of the best practices to follow in Hibernate are:

* Always check the primary key field access.  If its generated at the database layer then you should not have setter for this
* By default Hibernate set the field values directly, without using setters.  So if you want Hibernate to use setters, then make sure proper access is defined as @Access(value = AccessType.PROPERTY)
* If access type is property, make sure annotations are use on getter methods not setter methods.  Avoid mixing of using annotations on both field and getter methods.
* Use native sql queries only when it cannot be done with HQL, such as using database specific features.
* If you have to sort the collection, use ordered list rather than sorting it using Collection API.
* Use NamedQueries wisely, keep it at a single place for easy debugging.  Use them for commonly used queries only.  For entity specific query, you can keep them in the entity bean itself.
* Avoid Many-to-Many relationships, it can be easily implemented using bidirectional One-to-Many and Many-to-One relationships.
* For collections use List, Set and Map.  Avoid using Arrays as you won’t get benefit of using lazy loading.
* Do not treat exceptions as recoverable, rollback the transaction and close the Session.  If you do not do this, Hibernate cannot guarantee that in-memory state accurately represents the persistence state.
* Prefer DAO pattern for exposing the different methods that can be used with entity bean
* Prefer lazy fetching for associations.


#### **35. What is Hibernate Validator framework?**
#### **36. Examples of Criteria API?




Need to refer:

•	http://www.javainterview.in/p/hibernate-interview-questions.html#question16


