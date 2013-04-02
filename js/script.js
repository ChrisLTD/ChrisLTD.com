// Script by Chris Johnson 
// http://chrisltd.com
// Created October 2012

$(function(){

// Make sure this isn't ie8 or older
if(!$('html').hasClass('lt-ie9')){
	
	// Add menu toggle to the top of the page
	$('header > .container').prepend('<a class="menu_toggle" data-toggle=".main_nav" title="Show/Hide Menu"><i class="ss-icon ss-standard ss-rows"></i><b>Show/Hide Menu</b></a>');  
	
	// Initialize source code highlighting
	hljs.tabReplace = '  ';
	hljs.initHighlightingOnLoad();
	
	// Duplicate menu at the bottom of the page
	$('#footer > .container').prepend('<nav class="footer_nav"></nav>');
	$('.main_nav > ul').clone().appendTo('.footer_nav');
	
}

// Toggle
$('[data-toggle]').click(function(event) {
  event.preventDefault();
  toggleTarget = $(this).data('toggle');
  $(toggleTarget).slideToggle('fast');
});

});

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());

