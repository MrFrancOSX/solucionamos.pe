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

  	$('.menu-pro').click(function(){$('.profile-menu').slideToggle('fast'); $('.menu-menu').hide('fast');});
  	$('.menu-men').click(function(){$('.menu-menu').slideToggle('fast'); $('.profile-menu').hide('fast');});

});