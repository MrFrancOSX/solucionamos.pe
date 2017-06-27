$(document).ready(function(){
  var owl = $('.owl-carousel');
  owl.owlCarousel({
	loop:true,
	margin: 30,
	autoplay:true,
	autoplayTimeout:3000,
	responsiveClass:true,
	responsive:{
		768:{
			items:2
		},
		0:{
			items: 1
		}

	}
  });
  $('.dr-right').click(function() {
	owl.trigger('next.owl.carousel');
  })
  $('.dr-left').click(function() {
	owl.trigger('prev.owl.carousel');
  });

  $('html').click(function() {
  //Hide the menus if visible
	  $('.menu-menu').hide('fast');
	  $('.profile-menu').hide('fast');
  });

  	$('.menu-pro').click(function(){$('.profile-menu').slideToggle('fast'); $('.menu-menu').hide('fast');  event.stopPropagation();});
  	$('.menu-men').click(function(){$('.menu-menu').slideToggle('fast'); $('.profile-menu').hide('fast');  event.stopPropagation();});

});