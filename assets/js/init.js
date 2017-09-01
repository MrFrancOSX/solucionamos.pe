var w;
var h;
var dw;
var dh;

function executeFunctionByName(functionName, context /*, args */) {
  var args = [].slice.call(arguments).splice(2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(this, args);
}

var changeptype = function(){
    w = $(window).width();
    h = $(window).height();
    dw = $(document).width();
    dh = $(document).height();

    if(jQuery.browser.mobile === true){
      	$("body").addClass("mobile").removeClass("fixed-left");
    }

    if(!$("#wrapper").hasClass("forced")){
	    if(w > 990){
	    	$("body").removeClass("smallscreen").addClass("widescreen");
	        $("#wrapper").removeClass("enlarged");
	    }else{
	    	$("body").removeClass("widescreen").addClass("smallscreen");
	    	$("#wrapper").addClass("enlarged");
	    	$(".left ul").removeAttr("style");
	    }
	    if($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")){
	    	$("body").removeClass("fixed-left").addClass("fixed-left-void");
	    }else if(!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")){
	    	$("body").removeClass("fixed-left-void").addClass("fixed-left");
	    }

	}
	toggle_slimscroll(".slimscrollleft");
}

$(document).ready(function(){
	FastClick.attach(document.body);
	resizefunc.push("initscrolls");
	resizefunc.push("changeptype");
	$('.sparkline').sparkline('html', { enableTagOptions: true });

	$('.animate-number').each(function(){
		$(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-duration"))); 
	})

//TOOLTIP
$('body').tooltip({
  selector: "[data-toggle=tooltip]",
  container: "body"
});

//RESPONSIVE SIDEBAR


$(".open-right").click(function(e){
	$("#wrapper").toggleClass("open-right-sidebar");
	e.stopPropagation();
	$("body").trigger("resize");
});


$(".open-left").click(function(e){
	e.stopPropagation();
    $("#wrapper").toggleClass("enlarged");
    $("#wrapper").addClass("forced");

    if($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")){
    	$("body").removeClass("fixed-left").addClass("fixed-left-void");
    }else if(!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")){
    	$("body").removeClass("fixed-left-void").addClass("fixed-left");
    }
    if($("#wrapper").hasClass("enlarged")){
      $(".left ul").removeAttr("style");
    }else{
      $(".subdrop").siblings("ul:first").show();
    }
    toggle_slimscroll(".slimscrollleft");
    $("body").trigger("resize");
});

// LEFT SIDE MAIN NAVIGATION
$("#sidebar-menu a").on('click',function(e){
  if(!$("#wrapper").hasClass("enlarged")){

    if($(this).parent().hasClass("has_sub")) {
      e.preventDefault();
    }   

    if(!$(this).hasClass("subdrop")) {
      // hide any open menus and remove all other classes
      $("ul",$(this).parents("ul:first")).slideUp(350);
      $("a",$(this).parents("ul:first")).removeClass("subdrop");
      $("#sidebar-menu .pull-right i").removeClass("fa-angle-up").addClass("fa-angle-down");
      
      // open our new menu and add the open class
      $(this).next("ul").slideDown(350);
      $(this).addClass("subdrop");
      $(".pull-right i",$(this).parents(".has_sub:last")).removeClass("fa-angle-down").addClass("fa-angle-up");
      $(".pull-right i",$(this).siblings("ul")).removeClass("fa-angle-up").addClass("fa-angle-down");
    }else if($(this).hasClass("subdrop")) {
      $(this).removeClass("subdrop");
      $(this).next("ul").slideUp(350);
      $(".pull-right i",$(this).parent()).removeClass("fa-angle-up").addClass("fa-angle-down");
      //$(".pull-right i",$(this).parents("ul:eq(1)")).removeClass("fa-chevron-down").addClass("fa-chevron-left");
    }
  } 
});

// NAVIGATION HIGHLIGHT & OPEN PARENT
$("#sidebar-menu ul li.has_sub a.active").parents("li:last").children("a:first").addClass("active").trigger("click");

//WIDGET ACTIONS
$(".widget-header .widget-close").on("click",function(event){
  event.preventDefault();
  $item = $(this).parents(".widget:first");
  bootbox.confirm("Are you sure to remove this widget?", function(result) {
    if(result === true){
      $item.addClass("animated bounceOutUp");
        window.setTimeout(function () {
          if($item.data("is-app")){
            
            $item.removeClass("animated bounceOutUp");
            if($item.hasClass("ui-draggable")){
              $item.find(".widget-popout").click();
            }
            $item.hide();
            $("a[data-app='"+$item.attr("id")+"']").addClass("clickable");
          }else{
            $item.remove();
          }
        }, 300);
    }
  }); 
});

$(document).on("click", ".widget-header .widget-toggle", function(event){
  event.preventDefault();
  $(this).toggleClass("closed").parents(".widget:first").find(".widget-content").slideToggle();
});

$(document).on("click", ".widget-header .widget-popout", function(event){
  event.preventDefault();
  var widget = $(this).parents(".widget:first");
  if(widget.hasClass("modal-widget")){
    $("i",this).removeClass("icon-window").addClass("icon-publish");
    widget.removeAttr("style").removeClass("modal-widget");
    widget.find(".widget-maximize,.widget-toggle").removeClass("nevershow");
    widget.draggable("destroy").resizable("destroy");
  }else{
    widget.removeClass("maximized");
    widget.find(".widget-maximize,.widget-toggle").addClass("nevershow");
    $("i",this).removeClass("icon-publish").addClass("icon-window");
    var w = widget.width();
    var h = widget.height();
    widget.addClass("modal-widget").removeAttr("style").width(w).height(h);
    $(widget).draggable({ handle: ".widget-header",containment: ".content-page" }).css({"left":widget.position().left-2,"top":widget.position().top-2}).resizable({minHeight: 150,minWidth: 200});
  }
  window.setTimeout(function () {
    $("body").trigger("resize");
  },300);
});

$("a[data-app]").each(function(e){
    var app = $(this).data("app");
    var status = $(this).data("status");
    $("#"+app).data("is-app",true);
    if(status == "inactive"){
      $("#"+app).hide();
      $(this).addClass("clickable");
    }
});

$(document).on("click", "a[data-app].clickable", function(event){
    event.preventDefault();
    $(this).removeClass("clickable");
    var app = $(this).data("app");
    $("#"+app).show();
    $("#"+app+" .widget-popout").click();
    topd = $("#"+app).offset().top - $(window).scrollTop();
    $("#"+app).css({"left":"10","top":-(topd-60)+"px"}).addClass("fadeInDown animated");
    window.setTimeout(function () {
      $("#"+app).removeClass("fadeInDown animated");
    }, 300);
});

$(document).on("click", ".widget", function(){
    if($(this).hasClass("modal-widget")){
      $(".modal-widget").css("z-index",5);
      $(this).css("z-index",6);
    }
});

$(document).on("click", '.widget .reload', function (event) { 
  event.preventDefault();
  var el = $(this).parents(".widget:first");
  blockUI(el);
    window.setTimeout(function () {
       unblockUI(el);
    }, 1000);
});

$(document).on("click", ".widget-header .widget-maximize", function(event){
    event.preventDefault();
    $(this).parents(".widget:first").removeAttr("style").toggleClass("maximized");
    $("i",this).toggleClass("icon-resize-full-1").toggleClass("icon-resize-small-1");
    $(this).parents(".widget:first").find(".widget-toggle").toggleClass("nevershow");
    $("body").trigger("resize");
    return false;
});

$( ".portlets" ).sortable({
    connectWith: ".portlets",
    handle: ".widget-header",
    cancel: ".modal-widget",
    opacity: 0.5,
    dropOnEmpty: true,
    forcePlaceholderSize: true,
    receive: function(event, ui) {$("body").trigger("resize")}
});

// Init Code Highlighter
prettyPrint();

//RUN RESIZE ITEMS
$(window).resize(debounce(resizeitems,100));
$("body").trigger("resize");

//SELECT
$('.selectpicker').selectpicker();


//FILE INPUT
$('input[type=file]').bootstrapFileInput();


//DATE PICKER
$('.datepicker-input').datepicker();


//ICHECK
$('input:not(.ios-switch)').iCheck({
  checkboxClass: 'icheckbox_square-aero',
  radioClass: 'iradio_square-aero',
  increaseArea: '20%' // optional
});

// IOS7 SWITCH
$(".ios-switch").each(function(){
    mySwitch = new Switch(this);
});

//GALLERY
$('.gallery-wrap').each(function() { // the containers for all your galleries
    $(this).magnificPopup({
        delegate: 'a.zooming', // the selector for gallery item
        type: 'image',
    		removalDelay: 300,
    		mainClass: 'mfp-fade',
        gallery: {
          enabled:true
        }
    });
}); 



});

var debounce = function(func, wait, immediate) {
  var timeout, result;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) result = func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) result = func.apply(context, args);
    return result;
  };
}

function resizeitems(){
  if($.isArray(resizefunc)){  
    for (i = 0; i < resizefunc.length; i++) {
        window[resizefunc[i]]();
    }
  }
}

function initscrolls(){
    if(jQuery.browser.mobile !== true){
	    //SLIM SCROLL
	    $('.slimscroller').slimscroll({
	      height: 'auto',
	      size: "5px"
	    });

	    $('.slimscrollleft').slimScroll({
	        height: 'auto',
	        position: 'left',
	        size: "5px",
	        color: '#7A868F'
	    });
	}
}
function toggle_slimscroll(item){
    if($("#wrapper").hasClass("enlarged")){
      $(item).css("overflow","inherit").parent().css("overflow","inherit");
      $(item). siblings(".slimScrollBar").css("visibility","hidden");
    }else{
      $(item).css("overflow","hidden").parent().css("overflow","hidden");
      $(item). siblings(".slimScrollBar").css("visibility","visible");
    }
}

function nifty_modal_alert(effect,header,text){
    
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();

    $modal =  '<div class="md-modal md-effect-'+effect+'" id="'+uniqid+'">';
    $modal +=    '<div class="md-content">';
    $modal +=      '<h3>'+header+'</h3>';
    $modal +=      '<div class="md-modal-body">'+text;
    $modal +=      '</div>';
    $modal +=    '</div>';
    $modal +=  '</div>';

    $("body").prepend($modal);

    window.setTimeout(function () {
        $("#"+uniqid).addClass("md-show");
        $(".md-overlay,.md-close").click(function(){
          $("#"+uniqid).removeClass("md-show");
          window.setTimeout(function () {$("#"+uniqid).remove();},500);
        });
    },100);

    return false;
}

function blockUI(item) {    
    $(item).block({
      message: '<div class="loading"></div>',
      css: {
          border: 'none',
          width: '14px',
          backgroundColor: 'none'
      },
      overlayCSS: {
          backgroundColor: '#fff',
          opacity: 0.4,
          cursor: 'wait'
      }
    });
}

function unblockUI(item) {
    $(item).unblock();
}

function toggle_fullscreen(){
    var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
    if(fullscreenEnabled){
      if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
          launchIntoFullscreen(document.documentElement);
      }else{
          exitFullscreen();
      }
    }
}


// Thanks to http://davidwalsh.name/fullscreen

function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}



(function($) {

  'use strict';

// Prefix helper
  function getCss3Prop(prefixProp) {

    var element = document.documentElement;
    var prefix = ['-o-', '-webkit-', '-moz-', ''];

    function camelCase(str) {
      return str.replace(/\-([a-z])/gi, function(match, $1) {
        return $1.toUpperCase();
      });
    }

    for (var i = prefix.length - 1; i >= 0; i--) {
      var prefixProp = camelCase(prefix[i] + prefixProp);
      if(prefixProp in element.style) {
        return prefixProp;
      }
    }

    return false;
  }


  var transform = getCss3Prop('transform');
  var transitionDuration =  getCss3Prop('transition-duration');

  var PLUGINNAME = 'WDCarusel';

   $.fn[PLUGINNAME] = function(options) {

    if(!transform) {
      throw new Error('Your browser does not support transform');
    }

    var arrowLeftIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve" width="30px" height="30px">' +
                          '<path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225   c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" fill="#D80027"/>' +
                        '</svg>';
    var arrowRightIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve" width="30px" height="30px">' +
                          '<path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z   " fill="#D80027"/>' +
                        '</svg>';
    var options = $.extend({
      itemPadding : 5,
      arrowLeft : arrowLeftIcon,
      arrowRight : arrowRightIcon,
      infinite : false,
      autoplay : false,
      autoplayDelay : 5000,
      stopInHover : false,
      containerNav : '',
      responsive : [
        {
          breakpoint: 1170,
          items: 5
        },
        {
          breakpoint: 960,
          items: 4
        },
        {
          breakpoint: 768,
          items: 3
        },
        {
          breakpoint: 480,
          items: 2
        },
        {
          breakpoint: 320,
          items: 1
        }
      ]
    }, options);

    return this.each(function(){

      var $container = $(this);
      var $items = $container.find('.wd-carusel__item');
      var itemsCount = $items.length;
      var arrowsTemplate =  '<span class="wd-carusel__nav--icon wd-carusel__nav--left">' + options.arrowLeft + '</span>' +
                            '<span class="wd-carusel__nav--icon wd-carusel__nav--right">' + options.arrowRight + '</span>';
      var containerWidth;
      var itemsWidth;
      var wrapWidth;
      var $wrap;
      var _items;
      var position = 0;
      var interval = null;

      $items.wrapAll('<div class="wd-carusel__wrap"></div>');
      $wrap = $container.find('.wd-carusel__wrap');

      //inner arrows
      if(options.containerNav.trim() !== '' && typeof options.containerNav === 'string') {
        options.containerNav = $(options.containerNav);
      }
      else {
        options.containerNav = $container;
      }

      options.containerNav.append(arrowsTemplate);
      var $arrows = options.containerNav.find('.wd-carusel__nav--icon');

      if(options.autoplay) {

        if(options.stopInHover) {
          $container.on('mouseenter', function() {
            if(interval) clearInterval(interval);
          });
          $container.on('mouseleave', function() {
            autoplay();
          });
        }

        autoplay();
      }

      if(itemsCount <= options.items) {
        $arrows.hide();
      }

      responsive();

     //bind functions
     function responsive() {

        containerWidth = $container.width();

        for(var i = 0; options.responsive.length > i; i++) {

          if(containerWidth >= options.responsive[i].breakpoint) {
            _items = options.responsive[i].items;
            dimensions();
            break;
          }

        }

      }

      function dimensions() {

        itemsWidth = containerWidth / _items;
        wrapWidth = (itemsWidth  + (options.itemPadding * 2)) * itemsCount;

        $items
        .css({
          width: itemsWidth,
          padding: options.itemPadding
        });

        position = 0;
        $wrap.css('width', wrapWidth);
        $wrap[0].style[transitionDuration] = '0s';
        $wrap[0].style[transform] = 'translate(0, 0)';
        setTimeout(function() {
          $wrap[0].style[transitionDuration] = '';
        }, 10);

      }

      function autoplay() {
        if(interval) clearInterval(interval);

        interval = setInterval(function() {
          slideTo('next');
        }, options.autoplayDelay);

      }

      function slideTo(dir) {

        var end = -itemsWidth * (itemsCount - _items);

        if(dir === 'prev') {

          if(options.infinite && position === 0) {
            position = end;
          } else {
            position = Math.min(position + itemsWidth * _items, 0);
          }

        }
        else {

          if(options.infinite && position === end) {
            position = 0;
          } else {
            position = Math.max((position - itemsWidth * _items), end);
          }

        }

        $wrap[0].style[transform] = 'translate(' + position + 'px, 0)';

      }

      function navigation() {

        if($(this).hasClass('wd-carusel__nav--left')) {
          slideTo('prev');
        } else {
          slideTo('next');
        }

      }

      // Bind events
      $(window).on('resize.' + PLUGINNAME, responsive);
      $arrows.on('click.' + PLUGINNAME, navigation);


    });

   }

 })(jQuery);

$('.wd-carusel').WDCarusel({
  infinite : true,
  autoplay : true,
  autoplayDelay : 5000,
  stopInHover : true,
});

$(document).ready(function () {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}