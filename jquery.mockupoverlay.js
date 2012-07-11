/*
 * mockupOverlay plugin for jQuery
 * Displays the layout over the page to help with pixelperfect html/css coding.
 * Version 0.8
 *
 * Copyright 2012 Hendrik Lammers
 * Dual licensed under the MIT and GPL licenses.
 *
 * http://www.hendriklammers.com
 */

(function($) {
    $.fn.mockupOverlay = function(url, customOptions) {

        // Extend default options
        var options = $.extend({
            top : 0,
            left : 0,
            opacity : 0.3,
            visible : false
        }, customOptions);

        var container = this;
        var isVisible = options.visible;
        var opacity = options.opacity;

        // Create a new image and wait for it to be loaded
        var image = new Image();
        image.src = url;
        image.onload = function(event) {

            // Create a new div with the image as background
            var div = $('<div id="mockup-overlay"></div>').css({
                'position' : 'absolute',
                'top' : options.top,
                'left' : options.left,
                'width' : image.width,
                'height' : image.height,
                'z-index' : 10000,
                'background' : 'url(' + image.src + ')',
                'display' : isVisible ? 'block' : 'none',
                'opacity' : opacity
            });

            // Use keyboard input to control the opacity
            $(window).on('keyup', function(event) {
                var overlay = $('#mockup-overlay');
                switch(event.keyCode) {
                    case 83:
                        overlay.show();
                        isVisible = true;
                        break;
                    case 72:
                        overlay.hide();
                        isVisible = false;
                        // opacity = 0.3;
                        break;
                    case 188:
                        if(isVisible && opacity.toFixed(2) > 0.1) {
                            opacity -= 0.1;
                        }
                        break;
                    case 190:
                        if(isVisible && opacity.toFixed(2) < 1) {
                            opacity += 0.1;
                        }
                        break;
                    case 191:
                        if(isVisible) {
                            opacity = options.opacity;
                        }
                }
                overlay.css({
                    'opacity' : opacity
                });
            });
            return container.prepend(div);

        }
    }
})(jQuery);
