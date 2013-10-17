
/*! src/init/setup.ls - File number: 0 */

(function(){
  var isLocal, isDev, ref$, log, that, slice$ = [].slice;
  isLocal = !!(window.location.host + '').match('localhost');
  isDev = !!(window.location.host + '').match(/\.dev$/);
  Config.ALLOW_LOG = (ref$ = typeof Config != 'undefined' && Config !== null ? Config.ENABLE_LOGGING : void 8) != null
    ? ref$
    : isLocal || isDev;
  log = function(){
    if (!Config.ALLOW_LOG || (typeof console != 'undefined' && console !== null ? console.log : void 8) == null) {
      return function(){
        return arguments[0];
      };
    } else if (typeof console.log !== 'function') {
      return function(){
        var args;
        args = slice$.call(arguments);
        if (Config.ALLOW_LOG !== false) {
          console.log(args.join(' '));
          return arguments[0];
        }
      };
    } else {
      return function(){
        var args;
        args = slice$.call(arguments);
        if (Config.ALLOW_LOG !== false) {
          console.log.apply(console, args);
          return arguments[0];
        }
      };
    }
  }();
  if ((that = Config) != null) {
    log('Configuration Detected:', that);
  }
  window.log = log;
  window.Helpers = {};
  window.Controllers = {};
  jQuery.D = $(document);
  jQuery.W = $(window);
  jQuery.B = $('body');
  Controllers.runPageControllers = function(){
    var $pages;
    $pages = $('[data-page-controller]');
    return $pages.each(function(){
      var $page, ctrlName;
      $page = $(this);
      ctrlName = $page.data('page-controller');
      if (ctrlName != null) {
        log("PageController '" + ctrlName + "' requested");
        return typeof Controllers[ctrlName] === 'function' ? Controllers[ctrlName]($page, function(it){
          return $page.find(it);
        }) : void 8;
      }
    });
  };
  import$(window, prelude);
  jQuery.support.cors = true;
  Modernizr.usesAddEventListener = window.attachEvent == null;
  Modernizr.addTest('ie10', Function('/*@cc_on return document.documentMode===10@*/')());
  Modernizr.addTest('safari-table-bug', function(){
    var $test, bug;
    $test = $("<div style=\"display:table;width: 320px;visibility:hidden\">\n  <div style=\"display: table-cell; width: 160px; border-left: 5px solid\"></div>\n  <div style=\"display: table-cell; width: 160px; border-left: 5px solid\"></div>\n</div>");
    $('body').prepend($test);
    bug = $test.css({
      tableLayout: 'auto'
    }).width() !== $test.css({
      tableLayout: 'fixed'
    }).width();
    $test.remove();
    return bug;
  });
  jQuery.support.cors = true;
  TweenMax.defaultEase = Power4.easeInOut;
  CSSPlugin.defaultTransformPerspective = 600;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);


/*! src/lib/placeholder.js - File number: 1 */

/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(window, document, $) {

	var isInputSupported    = ( 'placeholder' in document.createElement('input') ),
	    isTextareaSupported = ( 'placeholder' in document.createElement('textarea') ),
	    prototype = $.fn,
	    valHooks = $.valHooks,
	    hooks,
	    placeholder;

	if ( isInputSupported && isTextareaSupported ) {

		placeholder = prototype.placeholder = function() { return this; };
		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);
				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},

			'set': function(element, value) {
				var $element = $(element);

				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}

				if (value == '') {
					element.value = value;

					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != document.activeElement) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}

				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}

				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		isInputSupported || (valHooks.input = hooks);
		isTextareaSupported || (valHooks.textarea = hooks);

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {},
		    rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this,
		    $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == document.activeElement && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement,
		    input = this,
		    $input = $(input),
		    $origInput = $input,
		    id = this.id;

		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': true,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

}(this, document, jQuery));


/*! src/init/jquery-ext.ls - File number: 2 */

console.error("Compiler Error: \n in src/init/jquery-ext.ls | line 128 \n Unexpected '+-'");

/*! src/init/onready.ls - File number: 3 */

(function(){
  $(function(){
    Helpers.installHelpers();
    PubSub.enableSpying();
    Controllers.runPageControllers();
    log("--------------------\n       READY\n--------------------");
  });
}).call(this);


/*! src/init/prelude.ls - File number: 4 */

console.error("Compiler Error: \n in src/init/prelude.ls | line 199 \n Unexpected ','");

/*! src/classes/asset-loader.ls - File number: 5 */

(function(){
  var pending;
  pending = 0;
  window.preloadImg = function(src, λ){
    var img;
    log('Preload::Load -', src);
    pending = pending + 1;
    img = new Image;
    img.onload = function(event){
      pending = pending - 1;
      if (img.naturalWidth < 1 || img.naturalHeight < 1) {
        log('Preload::NoSize -', src, 'has no dimensions');
        if (typeof img.onerror === 'function') {
          img.onerror();
        }
        return λ(img, true);
      } else {
        return λ(img, false);
      }
    };
    img.onerror = function(){
      return log('Preload::Error -', src);
    };
    return img.src = src;
  };
  window.preloadsPending = function(){
    return log(pending);
  };
  window.preloadImg = function(src, λ){
    var img;
    img = new Image;
    img.src = src;
    pending = pending + 1;
    return $(img).imagesLoaded(function($good, $bad, $all){
      pending = pending - 1;
      return λ(img, false);
    });
  };
  window.loadImages = function(images, λ){
    var total, imgData;
    total = 0;
    imgData = {};
    if (images == null) {
      log('LoadImages::Empty - no images in supplied list');
      if (typeof λ === 'function') {
        λ([], {});
      }
    }
    return flip(map)(images, function(img){
      return preloadImg(img, function(data, err){
        imgData[img] = data;
        total = total + 1;
        if (total === images.length) {
          return typeof λ === 'function' ? λ(images, imgData) : void 8;
        }
      });
    });
  };
}).call(this);


/*! src/classes/scroller.ls - File number: 6 */

(function(){
  window.Scroller = function(){
    var subs, getUpdatedScrollProgress, dispatchSubscribers;
    log('Scroller::New');
    subs = [];
    getUpdatedScrollProgress = function(scrollTop){
      var docHeight;
      docHeight = $.D.height() - $.W.height();
      return [scrollTop / docHeight, scrollTop, $.D.height()];
    };
    dispatchSubscribers = function(scrollTop){
      var i$, ref$, len$, λ, results$ = [];
      for (i$ = 0, len$ = (ref$ = subs).length; i$ < len$; ++i$) {
        λ = ref$[i$];
        results$.push(λ != null ? λ.apply(null, getUpdatedScrollProgress(scrollTop)) : void 8);
      }
      return results$;
    };
    $.W.on('scroll', function(){
      return dispatchSubscribers($.D.scrollTop());
    });
    return {
      on: function(λ){
        return subs.push(λ);
      }
    };
  };
}).call(this);


/*! src/pages/home.ls - File number: 7 */

(function(){
  Controllers.home = function($page, $$){
    return log('Page::Home - Initilaised', $page);
  };
}).call(this);
