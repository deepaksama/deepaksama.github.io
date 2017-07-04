---
layout: post
title: PL/SQL
meta: Web Service Implementation Bottom-up approach
category: Oracle
---

<div id="tableofcontents" class="col-md-6 pull-right">	
</div>

### Introduction

PL/SQL is
* Procedural language unlike SQL which is structural language
* case Insensitive language.
* Platform independent
* Made of two distinct languages SQL + PL/SQL
	* Procedural code is executed by PL/SQL engine.
	* SQL code is sent to the SQL statement executor.
* Uses blocks.  
	* Each block makes a single request to DB server.  
	* Blocks will be stored in DB in compiled form.  
	* Recompilation of block is not required.
	* Blocks can be reused.

### Advantages
	
* Better Performance
	* SQL statementfrom application code is compiled before execution everytime it is submited to database. But in case of PL/SQL it is soted in compiled form.  This leads to better performance.
	* PL/SQL engine processes multiple SQL statements simultaneously as a single block, thereby reducing network traffic.

* Error Handling
	* PL/SQL handles errors effectively during the execution. Once an exception is caught, specific action can be taken depending on the exception.
* Intermediate Calculations
	Calculations in PL/SQL are done quickly without using orace engine which improves the performance.
* Portability : As PL/SQL is portable, Database can be moved from one platform.

### PL/SQL Block Structure

{% highlight plsql %}
DECLARE
	/*
		Declarion section
		Optional Section
	
	*/
BEGIN
	/*	Main body of block
		Mandatory section
		Allowed :
		Procedural Statements 
			+
		SQL DML + TCL
	*/
EXCEPTION
	/*
		Error handling section
		Optional section
		Allowed :
		Procedural Statements 
			+
		SQL DML + TCL
	*/
END; /* Mandatory */
{% endhighlight %}

### PL/SQL Block Types

There are two types of blocks
* Anonymous Blocks
* Named Blocks
	* These are stored in DB
	* Below are the types of named blocks
		* Sub Programs
			* Procedure
			* Function
		* Package
		* Trigger
		* Type

