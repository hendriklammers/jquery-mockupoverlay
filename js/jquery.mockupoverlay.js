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
// TODO: Add options for the container and front/back, fix order
// TODO: Horizontal/Vertical centering
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
            order: 'front'
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
            // Store width and height of the image
            this.width = event.target.width;
            this.height = event.target.height;
            // Create a new div with the image as background
            this.overlay = $('<div id="mockup-overlay"></div>');

            // Add newly created overlay to the selected element
            $(this.element).prepend(this.overlay);

            // Update the appearance of the overlay
            this.updateOverlay();

            this.addKeyboardListeners();
        },

        updateOverlay: function() {
            this.overlay.css({
                'position': 'absolute',
                'top': this.options.top,
                'left': this.options.left,
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
            $(window).on('keydown', function(event) {
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

            }.bind(this));
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

// Mozilla bind polyfill
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}