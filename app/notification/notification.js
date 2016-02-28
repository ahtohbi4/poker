define([
    'jquery'
], function ($) {
    'use strict';

    function Notification() {
        this._LIFETIME = 5000;
        this._FADING_OUT_TIME = 1000;

        this.messages = [];

        return this;
    }

    /**
     * @method
     * @returns {jQuery}
     * @private
     */
    Notification.prototype._getElem = function (elem) {
        return {
            container: $('.notification__container')
        }[elem] || null;
    };

    /**
     * @method
     * @returns {jQuery}
     * @private
     */
    Notification.prototype._createMessage = function (text) {
        var message = $('<div class="notification__message">').text(text);

        var removeMessage = this._removeMessage(message);
        setTimeout(removeMessage, this._LIFETIME);

        var lastMessage = this.messages[this.messages.length - 1];
        if (typeof lastMessage !== 'undefined') {
            lastMessage.animate({
                opacity: .3
            }, 1000);
        }
        this.messages.push(message);

        return message;
    };

    /**
     * @method
     * @returns {function}
     * @private
     */
    Notification.prototype._removeMessage = function (message) {
        var _this = this;

        return function () {
            message.fadeOut(_this._FADING_OUT_TIME, function () {
                message.remove();
            });
        };
    };

    /**
     * @method
     * @returns {Notification}
     * @public
     */
    Notification.prototype.send = function (text) {
        var message = this._createMessage(text || '');

        this._getElem('container').append(message);

        return this;
    };

    return Notification;
});
