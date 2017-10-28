/*jshint expr:true */

function debouncer(func, timeout) {
	var timeoutID;
	timeout = timeout || 200;
	return function() {
		var scope = this,
			args = arguments;
		clearTimeout(timeoutID);
		timeoutID = setTimeout(function() {
			func.apply(scope, Array.prototype.slice.call(args));
		}, timeout);
	};
}

jQuery(function($) {
	function exist(o) {

		d = ($(o).length>0) ? true : false;
		return d;
	}
	
	function goToTarget(target) {
		var v = $('html, body'), o = $(target).offset().top - 140;

		v.animate({
			scrollTop: o
		}, {
			duration: 500,
			easing: 'easeOutCubic'
		});
	}

	function window_smaller_than(n) {
		var d = ($(window).width() < n) ? true : false;
		return d;
	}

	var L = {
		init: function() {
		
			$('body').removeClass('no-scroll');
			$('.o-container').removeClass('is-hidden');
			$('.c-preloader').fadeOut();
		
		}
	};
	
	var N = {
		nav: function() {
			var el = $('.c-nav'), item = $('a', el), target;
			
			item.on('click', function(e) {
				target = $(this).attr('href');
				goToTarget(target);
			});
		},
		
		init: function() {
			N.nav();
		}
	}

	var S = {
		gallery: function() {
			var owl = $('.js-gallery .c-gallery'),
				status;

			function startOwl() {
				owl.owlCarousel({
					dots: false,
					loop: true,
					nav: false,
					items: 1,
					smartSpeed: 450,
					stagePadding: 40
				});
			}

			function init() {
				if (window_smaller_than(641)) {
					if (status === false) {
						setTimeout(function() {
							startOwl();
						}, 10);
						status = true;
					}
					
				} else {
					if (status === true) {
						owl.trigger('destroy.owl.carousel');
						status = false;
					}
				}
			}			

			$(window).resize(debouncer(function(e) {
				init();
			}));

			if (window_smaller_than(641)) {
				status = true;
				startOwl();
				
			} else {
				status = false;
			}
		},
		
		init: function() {
			exist('.js-gallery') && S.gallery();
		}
	}
	
	
	$(document).ready(function() {
		L.init();
		N.init();
		S.init();
		
		
			var controller = new ScrollMagic.Controller({
		globalSceneOptions: {
			triggerHook: "onEnter", 
			duration: "300%"
		}
	});

	/*
		Backgrounds
	*/

	new ScrollMagic.Scene({
		triggerElement: ".c-mountains"
	})
		.setTween(".c-mountains__image", {y: "90%", ease: Linear.easeNone})
		.addTo(controller);

	new ScrollMagic.Scene({
		triggerElement: '.c-stripes--one'
	})
		.setTween('.c-stripes--one .c-stripes__image', {y: '-40%', ease: Linear.easeNone})
		.addTo(controller);
		
	new ScrollMagic.Scene({
		triggerElement: '.c-stripes--two'
	})
		.setTween('.c-stripes--two .c-stripes__image', {y: '-40%', ease: Linear.easeNone})
		.addTo(controller);

	/*
		Edges
	*/
					
	new ScrollMagic.Scene({
		triggerElement: "#o-firmie", 
		offset: 300
	})
		.setClassToggle("#o-firmie .o-edge", "active")
		.addTo(controller);

	new ScrollMagic.Scene({
		triggerElement: "#uslugi", 
		offset: 300
	})
		.setClassToggle("#uslugi .o-edge", "active")
		.addTo(controller);	
		
	/*
		Elements
	*/	
	
	new ScrollMagic.Scene({
		triggerElement: ".c-extras"
	})
		.setClassToggle(".c-extras", "active")
		.addTo(controller);
						
						

	/*
		Sections
	*/

	new ScrollMagic.Scene({
		triggerElement: "#uslugi-1"
	})
		.setTween("#uslugi-1 .c-block", {y: "90%", ease: Linear.easeNone})
		.addTo(controller);
		
	
	new ScrollMagic.Scene({
		triggerElement: "#uslugi"
	})
		.setTween("#uslugi .c-block", {y: "90%", ease: Linear.easeNone})
		.addTo(controller);

	/*
		Numbers
	*/
		
	new ScrollMagic.Scene({
		triggerElement: "#o-firmie", 
		offset: 400
	})
		.setClassToggle("#o-firmie .c-number", "active")
		.addTo(controller);

	new ScrollMagic.Scene({
		triggerElement: "#uslugi",
		offset: 400
	})
		.setClassToggle("#uslugi .c-number", "active") 
		.addTo(controller);

	new ScrollMagic.Scene({
		triggerElement: "#cennik", 
		offset: 400
	})
		.setClassToggle("#cennik .c-number", "active") 
		.addTo(controller);		
					
	new ScrollMagic.Scene({
		triggerElement: "#galeria",
		offset: 400
	})
		.setClassToggle("#galeria .c-number", "active") 
		.addTo(controller);

	new ScrollMagic.Scene({
		triggerElement: "#kontakt",
		offset: 400
	})
		.setClassToggle("#kontakt .c-number", "active") 
		.addTo(controller);
		
	});
});