define([
    'jquery'
], function ($) {
    'use strict';

    /**
     * @class
     * @param {object} [options]
     * @param {string} [options.text='Button']
     * @param {function} [options.callback]
     */
    function Button(options) {
        options = options || {};

        this.text = options.text || 'Button';
        this.callback = options.callback;

        this.view = $('<button>')
            .addClass('button')
            .text(this.text);

        var _this = this;

        if (this.callback) {
            this.view.bind('click', _this.callback);
        }

        return this;
    }

    return Button;
});
