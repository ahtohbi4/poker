define([
    'jquery'
], function ($) {
    'use strict';

    function Notification() {
        this._LIFETIME = 5000;
        this._FADING_OUT_TIME = 1000;

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
    Notification.prototype._addMessage = function (text) {
        var message = $('<div class="notification__message">').text(text);

        var removeMessage = this._removeMessage(message);
        setTimeout(removeMessage, this._LIFETIME);

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
        this._getElem('container').prepend(this._addMessage(text || ''));

        return this;
    };

    return Notification;
});
