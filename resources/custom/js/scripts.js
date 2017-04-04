$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}	

	$.fn.tableofcontents = function (options){
		var el, title, link,target,content;
		target = $(this);
		content = "<h3>Table of Content</h3><ul>";
		$("h3").each( function() {
		  el = $(this);
		  title = el.text();
		  link = "#" + el.attr("id");
		console.log(title + link);
		content = content + '<li><a href="' + link + '">' + title + '</a></li>';
		});
		content = content + '</ul>';
		target.html(content);
	}

	var accordion = new Accordion($('#accordion'), false);	
	$('#tableofcontents').tableofcontents();
});


