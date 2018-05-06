---
layout: post
title: jQuery interview questions
meta:
category: jquery
---

<br/>

#### **1. What is the deal with $ in jQuery?  What is it and what does it mean?**

$ has no special meaning in javascript.  It can be used in naming objects in any javascript based libraries.  In jQuery it is used as an alias for the jQuery object.

#### **2. How jQuery can be used in conjunction with another javascript library that also uses $for naming?**

jQuery can be used in conjunction with any javascript libraries which uses $.  Which would result in naming conflict.

There are multiple ways to relsolve it.

__Solution 1:__ use _jQuery.noConflict()_ method for this.  If you call this method jQuery release the hold on $ alias so that other library can use it. After that we can use full name'jQuery' in place of ___$___.

{% highlight javascript linenos %}
$.noConflict();
jQuery(document).ready(function(){
    jQuery("button").click(function(){
        jQuery("p").text("jQuery is still working!");
    });
});
{% endhighlight %}

__Solution 2:__ Creating shortcut is very easy for jQuery object.  jQuery.noConflict() method returns reference to jQuery object.  That can be saved into a variable and can be used as shortcut in further code in place of ___$___.

{% highlight javascript linenos %}
var jq = $.noConflict();
jq(document).ready(function(){
    jq("button").click(function(){
        jq("p").text("jQuery is still working!");
    });
});
{% endhighlight %}

__Solution 3:__ If you already have code which uses ___$___ and you do not want to change it then wrap it in closure and pass the $ as argument.

{% highlight javascript linenos %}
$.noConflict();
(function ($) {
	$("button").click(function(){
        $("p").text("jQuery is still working!");
    });
}(jQuery)); 

{% endhighlight %}

#### **3. The code below is for defining a click handler for all buttons on the page, including those buttons that may be added later dynamically.**
{% highlight javascript linenos %}
// define the click handler for all buttons
$( "button" ).bind( "click", function() {
    alert( "Button Clicked!" )
});

/* ... some time later ... */

// dynamically add another button to the page
$( "html" ).append( "<button>Click Alert!</button>" );

{% endhighlight %}

**what is wrong with this code? and how do you fix it?**

The code searches all the existing buttons on the page and binds the _click_ handler to them.  This code does not work if the buttons are added dynamically after the call to _bind()_.

This problem can be solved with functions that use __evend budding__ to match events on both current and future elements.  Earler it was done using _live()_. But _live()_ is deprecated from jquery 1.7 on.  There is _delegate()_ works similar to _live()_ but also provides control over how far the event must bubble up the DOM. But the recommended method to use is _on()_.  This is like _bind()_, _live()_, _delegate()_ depending on syntax.  The following code fixes the above issue:

{% highlight javascript linenos %}

$(document).on("click","button", function(){
	alert("button clicked");
});

// dynamically add another button to the page
$( "html" ).append( "<button>Click Alert!</button>" );

{% endhighlight %}


#### 4. What is method chaining in jQuery?  What advantages does it offer?

Method chaining is a feature of jQuery that allow multiple methods to be executed on a jQuery selection in sequence in a single code statement.

Ex:

Without Chaining:

{% highlight javascript linenos %}

$("button#play-movie").css("background-color","orange");
$("button#play-movie").on("click","playMovie");
$("button#play-movie").show();

{% endhighlight %}

With Chaining

{% highlight javascript linenos %}
$("button#play-movie").css("background-color","orange");
		  .on("click","playMovie");
		  .show();
{% endhighlight %}

If we observ the code without method chaining jQuery dives into the DOM to get the element multiple time to apply methods.  Where as with method chaining element is searched only once. So in addition to yielding more concise code, method chaining offers performance advantages also.

__Note:__  Although this can be done using a variable method chaining is still the more concise code and you are not required to cache the results in a local variable.

#### **5. What is the difference between _jQuery.get()_ and _jQuery.ajax()_ ?**

The _jQuery.ajax()_ method allows to create highly constomized ajax requests, with option to specify how long to wait for respoonse, how to handle failure, whether the request is blocking(synchronous) or non-blocking(Asynchronous), what format the response should be, and many more options.

The _jQuery.get()_ method is shorthand method that uses jQuery.ajax() under the hood, to create ajax GET request which is for retrival of information.  Other pre-built ajax requests provided by jQuery are _jQuery.post()_, _jQuery.getJSON()_ and _jQuery.getScript()_.


#### **6. Compare and contrast event.preventDefault() and event.stopPropagation()**
_event.stopPropagation()_ method stops the even from propagating up in the DOM, where as _event.preventDefault()_ only stops the browser default action on that event from occurring, but the event still propagates up the event chain.

#### **7. How to select all the elements with an ID that ends with a particulart string?**

$("[id$='string']")

#### **8. How to select all the _\<div\>_ elements with an ID that ends with a particulart string?**

$("div[id$='string'")

#### **8. What is accomplished by returning _false_ from below?**

* __a jQuery event handler:__ It is equal to calling both _stopPropagation_ and _preventDefault_ on the passed jQuery event object.

* __a regular Javascript onclick event handler for an anchor tag :__ Prevents the browser from navigating to the link address and stops the event from propagating through the DOM.

* __a regular Javascript onclick event handler for non-anchor tag :__ Will have no effect.


#### **9. What are promises in jQuery?
Promise is an object in jQuery which represent a onetime event, typically an outcome of async call like an ajax call.





<!--
http://localhost:4000/jquery/2017/04/03/jquery-interview-questions.html
-->