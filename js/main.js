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
		var d = ($(o).length > 0) ? true : false;
		return d;
	}

	function goToTarget(target) {
		var v = $('html, body'),
			o = $(target).offset().top - 140;
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
		magnific: function() {
			$('.mfp-image').magnificPopup({
				type: 'image',
				mainClass: 'mfp-fade'
			});
		},
		weather: function() {
			var API_ID = '1a48fcbda46ae95901f778dca061fe5b',
				el = $('#weather-summary'),
				date = new Date(),
				nav = $('.c-nav__content'),
				status = false,
				lat = 51.1078850,
				// 53.904474,
				lon = 17.0385380,
				ww; // 17.066411;

			function moveToBar() {
				el.detach();
				$('.c-topbar .o-wrap').append(el);
				status = false;
			}

			function moveToNav() {
				el.detach();
				nav.prepend(el);
				status = true;
			}
			$(window).resize(debouncer(function(e) {
				ww = $(window).width();
				if (ww <= 640) {
					if (status === false) {
						moveToNav();
					}
				} else {
					if (status === true) {
						moveToBar();
					}
				}
			}));
			if ($(window).width() <= 640) {
				moveToNav();
			}
			$.ajax('http://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + API_ID).done(function(resp) {
				$('.c-weather__icon--black').attr('src', 'img/weather/' + resp.weather[0].icon + '.png').attr('alt', resp.weather[0].description);
				$('.c-weather__icon--white').attr('src', 'img/weather/' + resp.weather[0].icon + '-w.png').attr('alt', resp.weather[0].description);
				$('#weather-temperature').html(Math.round(resp.main.temp) + '&deg;');
			});
			$('#weather-time').text(date.getHours() + ':' + date.getMinutes());
		},
		init: function() {
			$('body').removeClass('no-scroll');
			$('.o-container').removeClass('is-hidden');
			$('.c-preloader').fadeOut();
			exist('.mfp-image') && L.magnific();
			exist('.js-weather') && L.weather();
		}
	};
	var N = {
		nav: function() {
			var b = $('body'),
				el = $('.c-nav'),
				item = $('a', el),
				target, trigger = $('.c-nav-trigger'),
				nav = $('.c-nav'),
				logo = $('.c-logo'),
				social = $('.c-social'),
				status = false,
				w = $('.c-weather'),
				ww = $(window).width();
			item.on('click', function(e) {
				target = $(this).attr('href');
				b.removeClass('no-scroll');
				logo.removeClass('is-white');
				social.removeClass('is-white');
				w.removeClass('is-white');
				if (trigger.hasClass('is-active')) {
					nav.removeClass('is-active');
					trigger.removeClass('is-active');
					setTimeout(function() {
						goToTarget(target);
					}, 400);
				} else {
					goToTarget(target);
				}
			});
			trigger.on('click', function(e) {
				e.preventDefault();
				$(this).toggleClass('is-active');
				nav.toggleClass('is-active');
				b.toggleClass('no-scroll');
				logo.toggleClass('is-white');
				social.toggleClass('is-white');
				w.toggleClass('is-white');
			});

			function moveToBar() {
				social.detach();
				$('.c-topbar .o-wrap').append(social);
				status = false;
			}

			function moveToNav() {
				social.detach();
				$('.c-nav__content', nav).append(social);
				status = true;
			}
			$(window).resize(debouncer(function(e) {
				ww = $(window).width();
				if (ww > 1024) {
					trigger.removeClass('is-active');
					nav.removeClass('is-active');
					logo.removeClass('is-white');
					social.removeClass('is-white');
					w.removeClass('is-white');
					b.removeClass('no-scroll');
				}
				if (ww <= 768) {
					if (status === false) {
						moveToNav();
					}
				} else {
					if (status === true) {
						moveToBar();
					}
				}
			}));
			if ($(window).width() <= 768) {
				moveToNav();
			}
		},
		init: function() {
			N.nav();
		}
	};
	var S = {
		gallery: function() {
			var owl = $('.js-gallery .c-gallery'),
				status;

			function startOwl() {
				owl.owlCarousel({
					dots: false,
					loop: true,
					nav: false,
					smartSpeed: 450,
					stagePadding: 40,
					responsive: {
						0: {
							items: 1
						},
						641: {
							items: 2
						}
					}
				});
			}

			function init() {
				if (window_smaller_than(769)) {
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
			if (window_smaller_than(769)) {
				status = true;
				startOwl();
			} else {
				status = false;
			}
		},
		init: function() {
			exist('.js-gallery') && S.gallery();
		}
	};
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
		
		var controllerPin = new ScrollMagic.Controller();
/*
		Backgrounds
	*/
		new ScrollMagic.Scene({
			triggerElement: ".c-mountains"
		}).setTween(".c-mountains__image", {
			y: "90%",
			ease: Linear.easeNone
		}).addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: '.c-stripes--one'
		}).setTween('.c-stripes--one .c-stripes__image', {
			y: '-50%',
			ease: Linear.easeNone
		}).addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: '.c-stripes--two'
		}).setTween('.c-stripes--two .c-stripes__image', {
			y: '-50%',
			ease: Linear.easeNone
		}).addTo(controller);
/*
		Bullets
	*/
		new ScrollMagic.Scene({
			triggerElement: "#o-firmie",
			offset: 300
		}).setClassToggle("#o-firmie .o-header .c-bullet", "active").addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: "#uslugi",
			offset: 300
		}).setClassToggle("#uslugi .c-bullet", "active").addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: "#uslugi-1",
			offset: 300
		}).setClassToggle("#uslugi-1 .c-bullet", "active").addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: "#uslugi-2",
			offset: 300
		}).setClassToggle("#uslugi-2 .c-bullet", "active").addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: "#cennik",
			offset: 500
		}).setClassToggle("#cennik .c-bullet", "active").addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: "#galeria",
			offset: 300
		}).setClassToggle("#galeria .c-bullet", "active").addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: "#kontakt",
			offset: 300
		}).setClassToggle("#kontakt .c-bullet", "active").addTo(controller);
/*
		Edges
	*/
		new ScrollMagic.Scene({
			triggerElement: "#o-firmie",
			offset: 300
		}).setClassToggle("#o-firmie .o-edge", "active").addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: "#uslugi",
			offset: 300
		}).setClassToggle("#uslugi .o-edge", "active").addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: "#uslugi-2",
			offset: 300
		}).setClassToggle("#uslugi-2 .o-edge", "active").addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: "#cennik",
			offset: 500
		}).setClassToggle("#cennik .o-edge", "active").addTo(controller);
/*
		Elements
	*/
		new ScrollMagic.Scene({
			triggerElement: ".c-extras"
		}).setClassToggle(".c-extras", "active").addTo(controller);
/*
		Gallery
	*/
		new ScrollMagic.Scene({
			triggerElement: "#galeria",
			offset: 500
		}).setClassToggle("#galeria .c-gallery", "active").addTo(controller);
/*
		Sections
	*/
		new ScrollMagic.Scene({
			triggerElement: "#uslugi-1"
		}).setTween("#uslugi-1 .c-block", {
			y: "90%",
			ease: Linear.easeNone
		}).addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: "#uslugi"
		}).setTween("#uslugi .c-block", {
			y: "90%",
			ease: Linear.easeNone
		}).addTo(controller);
/*
		Numbers
	*/
		new ScrollMagic.Scene({
			triggerElement: "#o-firmie",
			offset: 400
		}).setClassToggle("#o-firmie .c-number", "active").addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: "#uslugi",
			offset: 400
		}).setClassToggle("#uslugi .c-number", "active").addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: "#cennik",
			offset: 400
		}).setClassToggle("#cennik .c-number", "active").addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: "#galeria",
			offset: 400
		}).setClassToggle("#galeria .c-number", "active").addTo(controller);
		new ScrollMagic.Scene({
			triggerElement: "#kontakt",
			offset: 400
		}).setClassToggle("#kontakt .c-number", "active").addTo(controller);
		
		
		/*
			Pin
		*/
		
		if ($('.no-mobile').length>0) {
			new ScrollMagic.Scene({
				triggerElement: "#uslugi-1",
				duration: $('#uslugi-1').height() + 200,
				offset: 100
			}).setPin('#addServices').addTo(controllerPin);
		}
	});
	
	
	
		
	
});