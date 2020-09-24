$(function(){
	if (!$('body').hasClass('blog')) {
		return;
	}

  // Fluid videos
	$('article').fitVids();

	// Reformat footnotes
	// $('.footnotes li > [rev="footnote"]').each(function(index) {
	// 	console.log('reformating footnote');
	// 	appendTarget = $(this).parents('li').children('p:last-of-type');
	// 	$(this).appendTo(appendTarget);
	// }).fadeIn(200);

	$.bigfoot();

});