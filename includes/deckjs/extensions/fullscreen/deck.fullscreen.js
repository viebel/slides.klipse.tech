/*!
Deck JS - deck.fullscreen
Copyright (c) 2016-2016 Yehonathan Sharvit
Dual licensed under the MIT license.
*/

/*
This module adds a fullscreen handler to selected elements.
*/
(function($, undefined) {
  var $document = $(document);
  var rootCounter;

  var updateCurrent = function(event, from, to) {
    var options = $.deck('getOptions');
    var currentSlideNumber = to + 1;
    if (!options.countNested) {
      currentSlideNumber = $.deck('getSlide', to).data('rootSlide');
    }
    $(options.selectors.statusCurrent).text(currentSlideNumber);
  };

  var markRootSlides = function() {
    var options = $.deck('getOptions');
    var slideTest = $.map([
      options.classes.before,
      options.classes.previous,
      options.classes.current,
      options.classes.next,
      options.classes.after
    ], function(el, i) {
      return '.' + el;
    }).join(', ');

    rootCounter = 0;
    $.each($.deck('getSlides'), function(i, $slide) {
      var $parentSlides = $slide.parentsUntil(
        options.selectors.container,
        slideTest
      );

      if ($parentSlides.length) {
        $slide.data('rootSlide', $parentSlides.last().data('rootSlide'));
      }
      else {
        ++rootCounter;
        $slide.data('rootSlide', rootCounter);
      }
    });
  };

  var setInitialSlideNumber = function() {
    var slides = $.deck('getSlides');
    var $currentSlide = $.deck('getSlide');
    var index;

    $.each(slides, function(i, $slide) {
      if ($slide === $currentSlide) {
        index = i;
        return false;
      }
    });
    updateCurrent(null, index, index);
  };



  var launchFullScreen = function() {
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
  
    launchIntoFullscreen(document.documentElement);
  };


  var attachFullScreen = function() {
    var options = $.deck('getOptions');
    if (options.fullscreenSelector) {
      $(options.fullscreenSelector).click(launchFullScreen);
    }
  };

  $document.bind('deck.init', function() {
    attachFullScreen();
  });
})(jQuery, 'deck');

