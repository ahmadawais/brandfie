// == START OF PHOENIX JS ==
window.addEventListener('DOMContentLoaded', function (){
	'use strict';

	// START OF: utilities =====
	function throttle (callback, limit) {
		var wait = false;                  // Initially, we're not waiting
		return function () {               // We return a throttled function
			if (!wait) {                   // If we're not waiting
				callback.call();           // Execute users function
				wait = true;               // Prevent future invocations
				setTimeout(function () {   // After a period of time
					wait = false;          // And allow future invocations
				}, limit);
			}
		}
	}
	// ===== END OF: utilities

	// START OF: webfont loader  =====
	var fonts = (function(){
		var families = ['Playfair+Display:400,400italic,700,700italic:latin', 'Montserrat:700,400:latin'];

		function load() {
			WebFont.load({
				google: {
					families: families
				}
			});
		}
		return {
			load: load
		}
	}());
	// ===== END OF: webfont loader

	// START OF: sliders =====
	//all the sliders are configurated via attributes in the markup
	(function() {
		var $sliders = $('.js-slider');
		$sliders.on('init', function(slick){
			$('.cover__slider__dots')
				.wrap('<div class="cover__slider__dots_container"></div>');
		});

		$sliders.slick();
	})();
	// ===== END OF: sliders

	// START OF: charts =====
	var charts = (function(){
		var $charts = $('.js-round-chart');
		var init = function () {
			var chartRadius = parseInt($charts.find('circle').attr('r'), 10);
			var chartCircleLength = 2 * chartRadius * Math.PI;
			var chartsCount = $charts.length;
			for(var i = 0; i < chartsCount; i++){
				var value = parseInt($charts.eq(i).attr('data-chart-value'), 10);
				var strokeOffset = chartCircleLength * (1 - value/100);
				$charts.eq(i).css('stroke-dashoffset', strokeOffset);
			}
		};
		return {
			init: init
		}
	}());
	// ===== END OF: charts

	// START OF: show more works =====
	var showWorks = (function(){
		var bind = function () {
			$('.js-show-more-works').on('click', function(event) {
				event.preventDefault();

				$(this).fadeOut(400, function () {
					$('.state-hidden-works-row').fadeIn();
				})
			});
		};
		return {
			bind: bind
		}
	}());
	// ===== END OF: show more works

	// START OF: filterizr =====
	var filterizr = (function(){
		var bind = function () {
			var $filters = $('.js-filtering-button');
			$filters.on('click', function(event) {
				event.preventDefault();

				$filters.removeClass('button--black').addClass('button--gray');
				$(this).addClass('button--black');
			});
		};

		var init = function () {
			//bind filtering buttons color change:
			bind();

			//init plugin:
			//Default options
			var options = {
				animationDuration: 0.5, //in seconds
				filter: 'all', //Initial filter
				callbacks: {
					onFilteringStart: function() { },
					onFilteringEnd: function() { },
					onShufflingStart: function() { },
					onShufflingEnd: function() { },
					onSortingStart: function() { },
					onSortingEnd: function() { }
				},
				delay: 0, //Transition delay in ms
				delayMode: 'progressive', //'progressive' or 'alternate'
				easing: 'ease-out',
				filterOutCss: { //Filtering out animation
					opacity: 0,
					transform: 'scale(0.75)'
				},
				filterInCss: { //Filtering in animation
					opacity: 1,
					transform: 'scale(1)'
				},
				layout: 'sameSize', //See layouts
				selector: '.filtr-container',
				setupControls: true
			};
//You can override any of these options and then call...
			var filterizd = $('.filtr-container').filterizr(options);
//If you have already instantiated your Filterizr then call...
			filterizd.filterizr('setOptions', options);
		};
		return {
			init: init
		}
	}());
	// ===== END OF: filterizr

	// START OF: scroll to =====
	var scrollTo = (function(){
		var $scrollFullscreen = $('.js-scroll-fullscreen');
		var scrollFullscreen = function () {
			$('html,body').animate({scrollTop: window.innerHeight + window.scrollY}, 700);
		};
		var bindScrollFullscreen = function () {
			$scrollFullscreen.on('click', function(event) {
				event.preventDefault();
				scrollFullscreen();
			});
		};

		return {
			bindScrollFullscreen: bindScrollFullscreen
		}
	}());
	// ===== END OF: scroll to

	// START OF: content changer =====
	var contentChanger = (function(){
		var $contentTrigger = $('.js-content-trigger');
		var $contentBox = $('.js-content-box');
		var slidingTime = 400;
		var bind = function () {
			$contentTrigger.on('click', function(event) {
				event.preventDefault();
				var contentAttr = $(this).attr('data-content-index');

				$contentTrigger.removeClass('state-active');
				$(this).addClass('state-active');

				$contentBox.slideUp(slidingTime);

				setTimeout(function(){
					$('.js-content-box[data-content-index="' + contentAttr +'"]').slideDown(slidingTime);
				}, slidingTime/2);
			});
		}
		return {
			bind: bind
		}
	}());
	// ===== END OF: content changer

	// START OF: dropdowns =====
	var dropdown = {
		toggle: function ($targetDropdown) {
			$targetDropdown.toggleClass('state-visible');
		},
		collapseAll: function () {
			$('.js-dropdown').removeClass('state-visible');
		},
		bindCollapsingAll: function () {
			$(document).on('click', function(event) {
				dropdown.collapseAll();
			});
		},
		bindOpeners: function () {
			$('.js-dropdown-opener').off().on('click', function(event) {
				event.preventDefault();
				event.stopPropagation();
				var dropdownName = $(this).attr('data-dropdown-target');
				var $targetDropdown = $('[data-dropdown-name=' + dropdownName + ']');
				dropdown.toggle($targetDropdown);
			});
		},
		init: function () {
			this.bindCollapsingAll();
			this.bindOpeners();
		}
	};
	// ===== END OF: dropdowns

	// START OF: menu =====
	var menu = {
		DOM: {
			overlay: document.querySelector('.js-overlay'),
			menu: document.querySelectorAll('.js-menu'),
			body: document.querySelector('body')
		},
		bind: function () {
			var self = this;

			function scrollToTop(burger) {
				try{
					var scrollValue = $(burger).parents('.js-cover').offset().top;
					$('html,body').animate({scrollTop: scrollValue}, 400);
				}catch(e){
					console.log(e);
				}
			}

			var openers = document.querySelectorAll('.js-open-menu');
			for(var i = 0; i < openers.length; i++) {
				openers[i].addEventListener('click', function (ev) {
					ev.preventDefault();

					scrollToTop(this);
					var menuIndex = $(this).attr('data-menu-index');
					var $menu = $('.js-menu[data-menu-index="' + menuIndex + '"]');

					$(self.DOM.overlay).addClass('state-visible');
					$(self.DOM.body).addClass('state-fixed');
					$menu.addClass('state-opened');
				});
			}

			var closers = document.querySelectorAll('.js-close-menu');

			for(var i = 0; i < closers.length; i++) {
				closers[i].addEventListener('click', function (ev) {
					ev.preventDefault();

					$(self.DOM.overlay).removeClass('state-visible');
					$(self.DOM.body).removeClass('state-fixed');
					$(self.DOM.menu).removeClass('state-opened');
				});
			}
		},
		init: function () {
			this.bind();
		}
	};
	// ===== END OF: menu

	// START OF: popups =====
	var popup = {
		OPENING_DURATION: 300, //a hardcoded value. equals the CSS transition-duration.
		DOM: {
			$popups: $('.popup'),
			$openers: $('.js-open-popup'),
			$ovelay: $('.js-overlay'),
			$closers: $('.js-close-all-popups'),
			$body: $('body')
		},
		toggleOverlay: function () {
			this.DOM.$ovelay.toggleClass('state-visible');
		},
		toggleBodyFix: function () {
			this.DOM.$body.toggleClass('state-fixed-body');
		},
		open: function (name) {
			$('[data-popup-name="' + name + '"]').fadeIn(this.OPENING_DURATION).addClass('state-visible');
			this.toggleOverlay();
			this.toggleBodyFix();
		},
		closeOpened: function () {
			var self = this;
			self.DOM.$popups.fadeOut(self.OPENING_DURATION);
			setTimeout(function(){
				self.DOM.$popups.removeClass('state-visible');
			}, self.OPENING_DURATION);
			this.toggleOverlay();
			this.toggleBodyFix();
		},
		bindOverlay: function () {
			var self = this;
			self.DOM.$ovelay.on('click', function(event) {
				event.preventDefault();
				self.closeOpened();
			});
		},
		bindOpeners: function ($specificElement) {
			var self = this;
			var $triggers = $specificElement ? $specificElement : self.DOM.$openers;

			$triggers.on('click', function(event) {
				event.preventDefault();
				event.stopPropagation();

				var name = $(this).attr('data-popup-target');

				self.open(name);
			});
		},
		bindClosers: function () {
			var self = this;
			self.DOM.$closers.on('click', function(event) {
				event.preventDefault();
				self.closeOpened();
			});
		},
		init: function () {
			this.bindOverlay();
			this.bindOpeners();
			this.bindClosers();
		}
	};
	// ===== END OF: popups

	// START OF: hacks =====
	var hacks = {
		DOM: {
			$covers: $('.js-cover')
		},
		//windowHeight: $(window).outerHeight(),
		setIntroHeight: function () {
			if($(window).outerWidth() <= 1024){
				this.DOM.$covers.css('min-height', $(window).outerHeight());
			}else{
				this.DOM.$covers.css('min-height', '100vh');
			}
		},
		bind: function () {
			var self = this;

			window.addEventListener('orientationchange', function (){
				self.setIntroHeight();
			});
		},
		init: function () {
			this.bind();
		}

	};
	if (hacks.DOM.$covers.length){
		hacks.setIntroHeight();
		hacks.init();
	}
	// ===== END OF: hacks

	// START OF: presentation navigation =====
	var navigation = (function(){
		var DOM = {
			$linksBox: $('.js-navigation-links'),
			$toggler: $('.js-open-navigation-links'),
			overlay: document.querySelector('.js-overlay')
		};

		function closeMenu() {
			DOM.$toggler.removeClass('state-opened');
			DOM.$linksBox.slideUp();
			$(DOM.overlay).removeClass('state-visible');
		}

		function toggleMenu() {
			DOM.$toggler.toggleClass('state-opened');
			DOM.$linksBox.slideToggle();
			$(DOM.overlay).toggleClass('state-visible');
		}

		var bind = function() {
			DOM.$toggler.on('click', function(event) {
				event.preventDefault();
				toggleMenu();
			});

			$('.js-navigation-link').on('click', function(event) {
				event.preventDefault();
				closeMenu();
				var destination = $(this).attr('href');
				var scrollValue = $('.' + destination).offset().top - 44 /*nav bar height*/;

				$('html,body').animate({scrollTop: scrollValue}, 300);
			});

			$('.js-close-navigation').on('click', function(event) {
				event.preventDefault();
				closeMenu();
			});
		};

		return {
			bind: bind
		}
	}());
	// ===== END OF: presentation navigation

	// START OF: email form =====
	var emailSender = (function() {
		var DOM = {
			savingForm: $('.js-saving-form')
		};
		function sendData($formNode){
			var $submitButton = $formNode.find($('.js-submit-button'));
			var submitButtonValue = $formNode.find($('.js-submit-button')).text();
			$submitButton.text(submitButtonValue + '...');

			$.ajax({
				url: "/send_mail.php",
				type: 'POST',
				data: $formNode.serialize(),
			})
				.done(function(response) {
					console.log(response);
					$('.js-popup__title--success').slideToggle();
					$('.js-popup__title--initial').slideToggle();

					setTimeout(function(){
						$('.js-popup__title--success').slideToggle();
						$('.js-popup__title--initial').slideToggle();
					}, 8000);
				})
				.fail(function(response) {
					console.log("error");
					alert('Internal error ;( Please, try sending a direct email: hello@ui-market.com');
				})
				.always(function(response) {
					$submitButton.text(submitButtonValue);
					console.log($formNode.serialize());
				});
		}

		function saveEmail($formNode) {
			$.ajax({
				type: $formNode.attr('method'),
				url: $formNode.attr('additionalAction'),
				data: $formNode.serialize(),
				cache: false,
				dataType: 'json',
				contentType: "application/json; charset=utf-8"
			})
				.done(function(data) {
					if (data.result != "success") {
					} else {
					}
					$formNode.find('.js-success-message').slideDown();
				})
				.fail(function(response) {
				})
				.always(function(response) {
					console.log(response);
				});
		}
		return {
			bind: function () {
				DOM.savingForm.on('submit', function(event) {
					event.preventDefault();
					sendData($(this));
					saveEmail($(this));
				});
			}
		}
	})();
	// ===== END OF: email form

	// START OF: subscribe form =====
	var subscribeForm = (function(){
		var DOM = {
			$form: $('.js-subscribe-form')
		};
		var bind = function () {
			DOM.$form.on('submit', function(event) {
				event.preventDefault();

				register($(this));
			});
		};
		function register($form) {
			var $submitButton = $form.find($('.js-submit-button'));
			var submitButtonValue = $form.find($('.js-submit-button')).val();
			$submitButton.val(submitButtonValue + '...');

			var $successMessage = $form.find('.js-success-message');
			var $errorMessage = $form.find('.js-error-message');

			var toggleDuration = 200; //ms

			$.ajax({
				type: $form.attr('method'),
				url: $form.attr('action'),
				data: $form.serialize(),
				cache: false,
				dataType: 'json',
				contentType: "application/json; charset=utf-8"
			})
				.done(function(data) {
					function trimCode(string) {
						//cut off the mailchimp meta data code user doesn't need to see
						if(string.indexOf('0 -') === 0){
							return string.slice(4);
						}else{
							return string;
						}
					}
					if (data.result != "success") {
						console.log('err');
						$errorMessage.slideUp(toggleDuration);
						$successMessage.slideUp(toggleDuration);

						setTimeout(function(){
							$errorMessage.html(trimCode(data.msg));
							$errorMessage.slideDown(toggleDuration);
						}, toggleDuration);
					} else {
						$errorMessage.slideUp(toggleDuration, function () {
							$successMessage.slideDown(toggleDuration);
						})
					}
				})
				.fail(function(response) {
					$errorMessage.slideUp(toggleDuration);
					$successMessage.slideUp(toggleDuration, function () {
						$errorMessage.slideDown(toggleDuration, function () {
							$errorMessage.html('Could not connect to the registration server. Please try again later.');
						});
					})
				})
				.always(function(response) {
					console.log(response);
					$submitButton.val(submitButtonValue);
				});
		}

		return{
			bind: bind
		}
	}());
	// ===== END OF: subscribe form


	// START OF: lightbox init =====
	var lightboxPlugin = (function(){
		function init() {
			lightbox.option({
				'resizeDuration': 200,
				'wrapAround': true,
				'albumLabel': "%1 of %2",
				'disableScrolling': true,
				'fadeDuration': 0
			})
		}

		return {
			init: init
		}
	}());
	// ===== END OF: lightbox init

	// START OF: google maps =====
	var maps = (function(){
		//https://snazzymaps.com/style/151/ultra-light-with-labels
		var styles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];

		function isPinShifted(centerLat, centerLng, pinLat, pinLng) {
			console.log('pin shifted');
			//check if a map has shifted center position: we may want to move map center on screen resize in case a pin want to become centered
			if(centerLat !== pinLat || centerLng !== centerLng){
				return true;
			}else{
				return false;
			}
		}

		// function moveToLocation(map, lat, lng){
		// 	var center = new google.maps.LatLng(lat, lng);
		// 	map.panTo(center);
		// }

		function init($mapBoxes){
			var mapsCount = $mapBoxes.length;
			for(var i = 0; i < mapsCount; i++){
				var $currentMapBox = $mapBoxes[i];
				var zoom = parseFloat($currentMapBox.getAttribute('data-zoom'), 10);

				var centerLat = parseFloat($currentMapBox.getAttribute('data-center-lat'), 10);
				var centerLng = parseFloat($currentMapBox.getAttribute('data-center-lng'), 10);

				var pinLat = parseFloat($currentMapBox.getAttribute('data-pin-lat'), 10);
				var pinLng = parseFloat($currentMapBox.getAttribute('data-pin-lng'), 10);

				var map = new google.maps.Map($currentMapBox, {
						center: {lat: centerLat, lng: centerLng},
						zoom: zoom,
						styles: styles,
						disableDefaultUI: true,
						zoomControl: true,
						scrollwheel: false
				});

				var imageSrc = 'img/icons/i--map-pin.png';

				var marker = new google.maps.Marker({
					position: {lat: pinLat, lng: pinLng},
					map: map,
					icon: imageSrc
				});
			}
		}
		return {
			init: init
		}
	}());
	// ===== END OF: google maps


	popup.init();
	menu.init();
	dropdown.init();
	fonts.load();
	scrollTo.bindScrollFullscreen();
	contentChanger.bind();
	charts.init();
	navigation.bind();
	showWorks.bind();
	if($('.filtr-container').length > 0){
		filterizr.init();
	}

	subscribeForm.bind();
	lightboxPlugin.init();
	maps.init(document.querySelectorAll('.js-map'));
});
// == END OF PHOENIX JS ==