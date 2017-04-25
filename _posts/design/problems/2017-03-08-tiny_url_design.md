---
layout: post
title: Tiny URL design
meta: 
category: designproblems
published: false
---

Generation of TinyUrl

Questions:

1. Is the url generated or provided
2. Is the Url permanent or should expire  (This should give the idea on what would be the volume.)


Table desing
------------

TINY_URLS
---------
URL_KEY : This column is Primary Key. And should be unique.
URL_SHORT_CODE : This url is the tiny url generated/provided by user
TARGET_URL : This is the target URL represented by tiny url


Mapping target url with tiny url :
---------------------------------
If Question 1's answer is generated
	- you need to generate url that is unique.  This can be done by taking help of timestamp.
	  use the URL_KEY as the current timestamp 
	- Convert the URL_KEY to base 36 number which would contain ( 0-9 and a-z) and use it as Tiny url (URL_SHORT_CODE)
	- Target URL is the user provided url. 
	- Now updated the DB with values
	
If Question 1's answer is provided
	- Use the provided url as URL_SHORT_CODE
	- Assume the Short Url provided is Base 36 number and convet it to Base 10 number and use it as URL_KEY
	

Fetching the Target Url with tiny url
-------------------------------------
When user accesses the tinyurl controller has to calculate the URL_KEY and fetche the TARGET_URL from db and send the redirect request.


	





