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

  // enable slideshows
  $('.js-slideshow').cycle();

});