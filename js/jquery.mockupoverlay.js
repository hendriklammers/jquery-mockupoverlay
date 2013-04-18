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
            visible: true,
            order: 'front',     // back
            center: 'none'      // both, vertical, horizontal
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
        width: 0,
        height: 0,

        init: function() {
            // Create a new div and add to the element which the plugin is called on
            this.overlay = $('<div id="mockup-overlay"></div>').prependTo(this.element);

            // Update the appearance of the overlay
            this.updateOverlay();

            // Create a new image and wait for it to be loaded
            var image = new Image();
            image.src = this.url;
            image.onload = $.proxy(this.imageLoaded, this);
        },

        imageLoaded: function(event) {
            // Store width and height of the image
            this.width = event.target.width;
            this.height = event.target.height;

            // Update the appearance of the overlay
            this.updateOverlay();

            this.addKeyboardListeners();
        },

        updateOverlay: function() {
            var top, left;

            switch (this.options.center) {
                case 'horizontal':
                    top = this.options.top;
                    left = ($(this.element).innerWidth() - this.width) / 2;
                    break;
                case 'vertical':
                    // TODO: Use window height when plugin is called on body
                    left = this.options.left;
                    top = ($(this.element).innerHeight() - this.height) / 2;
                    break;
                case 'both':
                    top = ($(this.element).innerHeight() - this.height) / 2;
                    left = ($(this.element).innerWidth() - this.width) / 2;
                    break;
                default:
                    top = this.options.top;
                    left = this.options.left;
                    break;
            }

            this.overlay.css({
                'position': 'absolute',
                'top': top,
                'left': left,
                // z-index only works properly when the position of siblings is set
                'z-index': this.options.order === 'back' ? 0 : 9999,
                'width': this.width,
                'height': this.height,
                'background': 'url(' + this.url + ')',
                'display': this.options.visible ? 'block' : 'none',
                'opacity': this.options.opacity
            });
        },

        addKeyboardListeners: function() {
            $(window).on('keydown', $.proxy(function(event) {
                // TODO: Add visual confirmation
                switch (event.keyCode) {
                    case 77:    // s
                        // Show/Hide toggle
                        this.options.visible = this.options.visible ? false : true;
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
                        // front/back toggle - Only works when position of sibblings/parent is set in css
                        this.options.order = this.options.order === 'front' ? 'back' : 'front';
                        break;
                }

                // Update with new settings
                this.updateOverlay();

            }, this));
        }
    };

    $.fn[pluginName] = function (url, options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, url, options));
            }
        });
    };

}(jQuery, window));