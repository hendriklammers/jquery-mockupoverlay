/*
 * mockupOverlay plugin for jQuery
 * Display a layout image over the page to help with pixelperfect html/css coding.
 * Version 0.1
 *
 * Copyright 2012 Hendrik Lammers
 * Dual licensed under the MIT and GPL licenses.
 *
 * http://www.hendriklammers.com
 */
;(function ($, window, undefined) {
    'use strict';

    // Create the defaults once
    var pluginName = 'mockupOverlay',
        document = window.document,
        defaults = {
            top: 0,
            left: 0,
            opacity: 0.3,
            visible: false
        };

    function Plugin(element, options) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {
        var container = this;
        var isVisible = options.visible;
        var opacity = options.opacity;

        // Create a new image and wait for it to be loaded
        var image = new Image();
        image.src = url;
        image.onload = function (event) {

            // Create a new div with the image as background
            var div = $('<div id="mockup-overlay"></div>').css({
                'position': 'absolute',
                'top': options.top,
                'left': options.left,
                'width': image.width,
                'height': image.height,
                'z-index': 10000,
                'background': 'url(' + image.src + ')',
                'display': isVisible ? 'block' : 'none',
                'opacity': opacity
            });

            // Use keyboard input to control the opacity
            $(window).on('keyup', function (event) {
                var overlay = $('#mockup-overlay');
                switch (event.keyCode) {
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
                        if (isVisible && opacity.toFixed(2) > 0.1) {
                            opacity -= 0.1;
                        }
                        break;
                    case 190:
                        if (isVisible && opacity.toFixed(2) < 1) {
                            opacity += 0.1;
                        }
                        break;
                    case 191:
                        if (isVisible) {
                            opacity = options.opacity;
                        }
                }
                overlay.css({
                    'opacity': opacity
                });
            });
            return container.prepend(div);

        };
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

}(jQuery, window));