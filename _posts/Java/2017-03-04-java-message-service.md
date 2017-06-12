---
layout: post
title: Java Message Service (JMS)
meta: Java Message Service (JMS) is a Java Message Oriented Middleware (MOM) API for sending messages between two or more clients.
topic-image: 
category: java
---

### Introduction
Java Message Service (JMS) is a Java Message Oriented Middleware (MOM) API for sending messages between two or more clients.

### JMS API architecture

<div class="col-md-12">
	<div class="col-md-6">
	<img src="{{site.baseurl}}/resources/images/java/jms/jms-architecture.JPG" class="content-image"/>
	</div>
</div>

JMS application is composed of the following parts:
* __JMS Provider__ : Its messaging system that implements ___JMS Interface(JMS specification)___ and provides administrative and control features. A JEE Platform implementation includes JMS Provider.

* __JMS Client__ : 
	* These are programs/components written in Java programming language, that produces/consume messages.
	* Any JEE application component can act as JMS Client.

* __Messages__ :
	* These ar the objects that communicate information between JMS clients
	
* __Administered Objects__ :
	
	* JMS specification allows JMS Providers to differ significantly in their underlying messaging technology.  Therefore, for JMS client to be portable they must be isolated from the proprietary aspects of JMS provider.  This is accomplished by defining JMS Administered objects.  Administered objects encapsulate provider-specific configuration information and are created and customized by provider's administrator using provider's tools.
	
	* Administered objects are configured in JNDI (by administrator )and then accessed by a JMS client.
	
	* Two kinds of Administered objects are	
		* __Destinations ( Queue or Topic)__ : JMS Client uses this to specify the destination of a message it is sending and source of message it is receives.
		* __Connection Factories__ : Client uses this object to connect to JMS Provider.<br/>
			
	* Once configured, JNDI can be used as a level of indirection between JNDI API and the concrete API of the JMS Provider. This lookup of objects in JNDI eliminates the runtime dependency on JMS Provider and allow you to change your destination via configuration. You will need Messaging bridge within your application server to connect a source destination if you are trying to configure ___Foreign JMS Provider___ (JMS implementations other than your application JMS server) in your application server.
			
	* An alternative approch to creating administerd objects in JNDI is to just use Spring support and let DI be an alternative to JNDI.


### Messaging Domains

There are two types of messaging models/products 
1. Point-to-Point
1. Publisher / Subscriber 
	
JMS Specification provides seperate domain for each of the above products.

#### 1. Point-to-Point (P2P)
	
* The P2P messaging model consists of message senders, receivers, queues, and the messages.
* A sender sends a message to a destination called the queue.	
	
##### __Characteristics of P2P:__
* Each message has only one consumer. Once message is consumed by receiver it is removed from queue.
* Messages are ordered.  Queue delivers messages to consumers in the order in which they were placed in queue.
* Senders and receivers can be added dynamically at runtime
* A sender and a receiver has no timing dependencies. A receiver can receive message whether it was running or not when client sent the message.
* The receiver acknowledges the successfull processing of a message.


<div class="col-md-12">
	<div class="col-md-6">
	<img src="{{site.baseurl}}/resources/images/java/jms/p2p-domain.JPG" class="content-image"/>
	</div>
</div>


#### 2. Publish/Subscribe (pub/sub)

* The pub/sub model consists of message publishers, subscribers, and topics.
* A message producer is called a publisher; a message consumer is called a subscriber.
* The destination where a publisher sends messages and the subscribers retrieve the messages is called the topic.

##### __Characteristics of Publish/Subscribe:__
* Each message can have multiple consumers. Every client that subscribes to a topic will receive its own copy of the message published to topic.
* Messages are pushed to the registered subscribers without having to request them.
* Published and subscriber can be added dynamically at runtime.
* Message delivery in pub/sub is once or not at all.
* Publisher and Subscriber have a timing dependency.  A client that subscribes to a topic can consume only messages published after the client has created the subscribtion.

<div class="col-md-12">
	<div class="col-md-6">
	<img src="{{site.baseurl}}/resources/images/java/jms/pub-sub-domain.JPG" class="content-image"/>
	</div>
</div>

### Message Consumption

Messaging products are asynchronous and there is no timing dependency between production and consumption of messages. However JMS uses terms in more precise sense.  JMS Message consumers, whether P2P or Pub/sub, can choose to have messages delivered to them in one of the two ways:

1. Synchronously(pulling):
	Subscriber or Receiver explicitly fetches messages from destination by calling "receive" method.  The receive methods can block until a message arrives or can time out if a message does not arrive within a specified time. Pull delivery requires the JMS consumer to either stay connected to the JMS provider and poll the destination for messages or connect to the JMS provider and retrieve messages from the destination per regularly scheduled intervals.
	
1. Asynchronously(push): JMS provider push messages.
	A client can register a listener with a consumer. Whenever a message arrives at the destination, the JMS provider delivers a message message by calling listener's onMessage method, which acts on the contents of the message.
	
### Guaranteed Message Delivery:

_JMS messages_ can be marked as either 
* __persistent :__ The JMS Provider saves the message to disk before acknowledging to the message producer and applies save-and-forward mechanism.  If the Provider crashes before the message is delivered to Consumer, the Provider will attempt to resend the message after the Provider is rebooted.
* __nonpersistent :__ The JMS Provider does not save message to disk before acknowledging to the message producer.  If the Provider crashes before message is delivered to Consumer, the message will be lost.
	
In both cases, a JMS provider will attempt to deliver the message to the consumer until the JMS consumer either receives the message and acknowledges it, or until the message expires.
	
In a pub/sub model, a subscriber can either be :
* __Durable :__ With durable subscribers, the provider is responsible for storing the messages and will deliver unexpired messages when durable subscribers 	connect later.
* __Nondurable :__  Messages are delivered to nondurable subscribers only if they're connected to the provider. 
	
A message can be marked

* __Persistent-Durable :__ The Provider uses Save-and-forward mechanism and would delivered when subscriber is connected.
* __Nonpersistent-Durable :__ The Provider attempts to deliver the message, and if the Subscriber is not active, then Provider will save the message for future delivery attempt.  If the Provider crashes before it is able to store the message then the message will be lost and never be delivered.
	
### Loose Coupling and Asynchronous communication

* Communication between JMS Clients are asynchronous.
* Communication between Producer and JMS Provider are synchronous.
* Communication between Consumer and JMS Provider can be synchronous/asynchronous.
* When JMS Client sends/receives message from JMS Provider destinations, they go through a receive-acknowledg handshake.

### Example 

Consider the below E-commerse application design

<div class="col-md-12">
	<div class="col-md-6">
	<img src="{{site.baseurl}}/resources/images/java/jms/ecommerce-example.JPG" class="content-image"/>
	</div>
</div>



<!--
Reference:
	http://www.informit.com/articles/article.aspx?p=26266&seqNum=5
	http://docs.oracle.com/javaee/6/tutorial/doc/bncdx.html
	Ref: http://docs.oracle.com/cd/E12840_01/wls/docs103/jms_admin/advance_config.html#wp1075917

	
	Other
	https://github.com/chiragagrawal93/Lucene-Tutorials
	https://shipilev.net/blog/2016/close-encounters-of-jmm-kind/
	https://abhirockzz.wordpress.com/2014/09/06/jvm-permgen-where-art-thou/
-->
	