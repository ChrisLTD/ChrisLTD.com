$(function(){
  
  var settings = {
		'childObject'         : '.portfolio_item',           // Targets to be filtered
		'filterObject' : '.filter'              // Next and Previous button tag
	};
  
  $('.portfolio [role="main"] .container').YoSimpleFilter(settings);
  
});