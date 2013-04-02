$(function(){
  // Fluid videos
	$('article').fitVids();
	
	// Reformat footnotes
	$('.footnotes li > a:last-child').each(function(index) {
		appendTarget = $(this).parents('li').children('p:last-of-type');
		$(this).appendTo(appendTarget);
	});
	
});