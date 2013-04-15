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
// TODO: Add options for the container and front/back
;(function ($, window, undefined) {
    'use strict';

    // Create the defaults once
    var pluginName = 'mockupOverlay',
        document = window.document,
        defaults = {
            top: 0,
            left: 0,
            opacity: 0.3,
            visible: true
        };

    function Plugin(element, url, options) {
        this.element = element;
        this.url = url;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        init: function() {

            var self = this;

            // Create a new image and wait for it to be loaded
            var image = new Image();
            image.src = this.url;
            // TODO: Add polyfill?
            image.onload = this.imageLoaded.bind(this);
        },

        imageLoaded: function(event) {
            // Create a new div with the image as background
            var div = $('<div id="mockup-overlay"></div>').css({
                'position': 'absolute',
                'top': this.options.top,
                'left': this.options.left,
                'width': event.target.width,
                'height': event.target.height,
                'z-index': 10000,
                'background': 'url(' + this.url + ')',
                'display': this.options.visible ? 'block' : 'none',
                'opacity': this.options.opacity
            });
            $('body').append(div);

            this.addKeyboardListeners();
        },

        addKeyboardListeners: function() {
            $(window).on('keyup', function(event) {
                var overlay = $('#mockup-overlay');

                // TODO: Rethink about keyboard controls
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
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

}(jQuery, window));