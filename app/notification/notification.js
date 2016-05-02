define([
    'jquery'
], function ($) {
    'use strict';

    /**
     * @class
     * @property {number} _OPACITY_FOR_DISABLED
     * @property {number} _LIFETIME_OF_DISABLED
     * @property {number} _FADING_OUT_SPEED
     */
    function Notification() {
        this._OPACITY_FOR_DISABLED = 0.3;
        this._LIFETIME_OF_DISABLED = 5000;
        this._FADING_OUT_SPEED = 1000;

        this.messages = [];

        return this;
    }

    /**
     * @method
     * @param {string} elem
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
     * @param {string} text
     * @returns {jQuery}
     * @private
     */
    Notification.prototype._createMessage = function (text) {
        var $message = $('<div class="notification__message">').text(text);

        /* Initialization of fading out for last message */
        this._disableMessage(this.messages[this.messages.length - 1]);

        this.messages.push($message);

        return $message;
    };

    /**
     * @method
     * @param {jQuery} $message
     * @returns {boolean}
     * @private
     */
    Notification.prototype._disableMessage = function ($message) {
        var result = false;

        if (typeof $message !== 'undefined') {
            $message.animate({
                opacity: this._OPACITY_FOR_DISABLED
            }, this._FADING_OUT_SPEED);

            var removingMessageInit = this._removeMessage($message);
            setTimeout(removingMessageInit, this._LIFETIME_OF_DISABLED);

            result = true;
        }

        return result;
    };

    /**
     * @method
     * @param {jQuery} $message
     * @returns {function}
     * @private
     */
    Notification.prototype._removeMessage = function ($message) {
        var _this = this;

        return function () {
            $message.fadeOut(_this._FADING_OUT_SPEED, function () {
                $message.remove();
                _this.messages.shift();
            });
        };
    };

    /**
     * @method
     * @param {string} text
     * @returns {Notification}
     * @public
     */
    Notification.prototype.send = function (text) {
        var $message = this._createMessage(text || '');

        this._getElem('container').append($message);

        return this;
    };

    return Notification;
});
