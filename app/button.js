define([
    'jquery'
], function ($) {
    'use strict';

    /**
     * @class
     * @param {string} [text='Button']
     * @param {function} [callback]
     */
    function Button(text, callback) {
        this.text = text || 'Button';
        this.callback = callback;

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
