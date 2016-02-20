define([
    'jquery'
], function ($) {
    'use strict';

    function Notification() {
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
     * @returns {Notification}
     * @public
     */
    Notification.prototype.send = function(message) {
        this._getElem('container').html(message || '');

        return this;
    };

    return Notification;
});
