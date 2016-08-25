/*!
Deck JS - deck.fullscreen
Copyright (c) 2016-2016 Yehonathan Sharvit
Dual licensed under the MIT license.
*/

/*
This module adds a fullscreen handler to selected elements.
*/
(function($, undefined) {
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
    var selector = options.fullscreenSelector || '.fullscreen';
    $(selector).click(launchFullScreen);
  };

  $(document).bind('deck.init', function() {
    attachFullScreen();
  });
})(jQuery, 'deck');

