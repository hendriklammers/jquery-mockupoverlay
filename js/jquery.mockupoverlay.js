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
// TODO: Add visual controls
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

        // Extend options
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;

        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        init: function() {
            // Create a new image and wait for it to be loaded
            var image = new Image();
            image.src = this.url;
            // TODO: Add bind polyfill?
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
                'z-index': 0,
                'background': 'url(' + this.url + ')',
                'display': this.options.visible ? 'block' : 'none',
                'opacity': this.options.opacity
            });
            $(this.element).append(div);

            this.addKeyboardListeners();
        },

        addKeyboardListeners: function() {
            $(window).on('keyup', function(event) {
                var overlay = $('#mockup-overlay');

                // TODO: Rethink about keyboard controls
                switch (event.keyCode) {
                    case 83:    // s
                        overlay.show();
                        this.options.visible = true;
                        break;
                    case 72:    // h
                        overlay.hide();
                        this.options.visible = false;
                        break;
                    case 188:   // comma
                        if (this.options.visible && this.options.opacity.toFixed(2) > 0.1) {
                            this.options.opacity -= 0.1;
                        }
                        break;
                    case 190:   // period
                        if (this.options.visible && this.options.opacity.toFixed(2) < 1) {
                            this.options.opacity += 0.1;
                        }
                        break;
                    case 191:   // forward slash
                        // Reset opacity to default
                        if (this.options.visible) {
                            this.options.opacity = this._defaults.opacity;
                        }
                }

                overlay.css({
                    'opacity': this.options.opacity
                });
            }.bind(this));
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