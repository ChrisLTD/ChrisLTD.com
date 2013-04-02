// Script by Chris Johnson 
// http://chrisltd.com
// Created October 2012

$(function(){
  
// Toggle
$('[data-toggle]').click(function(event) {
  event.preventDefault();
  toggleTarget = $(this).data('toggle');
  $(toggleTarget).slideToggle('fast');
});

// Duplicate menu at the bottom of the page
$('#footer > .container').prepend('<nav class="footer_nav"></nav>');
$('.main_nav > ul').clone().appendTo('.footer_nav');

// Initialize source code highlighting
hljs.tabReplace = '  ';
hljs.initHighlightingOnLoad();

});

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());
