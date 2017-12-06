$(document).ready(function(){


   $('.atras').click(function(){
   		window.history.back();
   })

  var owl = $('#owl-carousel');
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
	  $('.menu-menu').hide(0);
	  $('.profile-menu').hide(0);
	  $('.alerts-menu').hide(0);
  });

  	$('.menu-pro').click(function(){$('.profile-menu').slideToggle(0); $('.menu-menu').hide(0); $('.alerts-menu').hide(0);  event.stopPropagation();});
  	$('.menu-men').click(function(){$('.menu-menu').slideToggle(0); $('.profile-menu').hide(0); $('.alerts-menu').hide(0);  event.stopPropagation();});
  	$('.menu-ale').click(function(){$('.alerts-menu').slideToggle(0); $('.profile-menu').hide(0); $('.menu-menu').hide(0); event.stopPropagation();});
});





var white = false
    $("#like-fill").hide();
    $("#megusta").click(function () {
        if (white = !white) {
            $(this).css("color", "red");
            $("#like-clear").css("display", "none");
            $("#like-fill").css("display", "inline-block");
        } else {
            $(this).css("color", "#666");
            $("#like-clear").css("display", "inline-block");
            $("#like-fill").css("display", "none");
        }
    });
