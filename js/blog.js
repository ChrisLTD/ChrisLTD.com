$(function(){
  // Fluid videos
	$('article').fitVids();
	
	// Reformat footnotes
	$('.footnotes li > [rev="footnote"]').each(function(index) {
		appendTarget = $(this).parents('li').children('p:last-of-type');
		$(this).appendTo(appendTarget);
	}).fadeIn(200);
	
	$.bigfoot();

});