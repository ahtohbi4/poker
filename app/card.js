define([
    'jquery'
], function ($) {
    'use strict';

    /**
     * @class
     */
    function Card(options) {
        /**
         * @param {object} options
         * @param {number} options.value - Number value of rank (J=11, A=1 or 14 etc.).
         * @param {string|number} [options.rank=options.value] - The position of a card relative to others in the same
         * suit (5, 10, Q etc.).
         * @param {number} [options.title=<options.rank options.suit>] - Title placed on face of the Card.
         * @param {string} options.suit - Suit.
         * @param {boolean} [options.isFaceUp=false] - The Card laid on the table face-up.
         * @param {boolean} [options.isSelectable=false] - The Card is selectable.
         */
        if (typeof options == 'undefined') {
            throw new Error('Required params for object Card was missed.');
        } else {
            if (typeof options.value == 'undefined') {
                throw new Error('Required param "value" for object Card was missed.');
            } else {
                this.value = options.value;
            }

            this.rank = options.rank || this.value;

            if (options.suit) {
                this.suit = options.suit;
            }

            this.title = (options.title || this.rank + ' ' + this.suit).trim();

            this.isFaceUp = options.isFaceUp || false;

            this.isSelectable = options.isSelectable || false;

            this.view = $('<div>').addClass('card');
        }

        return this;
    }

    /**
     * @method
     * @returns {Card}
     */
    Card.prototype.turnFaceUp = function (isFaceUp) {
        var _this = this;
        this.isFaceUp = isFaceUp || this.isFaceUp;

        this.view
            .attr('data-title', function () {
                return _this.isFaceUp ? _this.title : null;
            })
            .toggleClass('card_face-up', this.isFaceUp);

        return this;
    };

    /**
     * @method
     * @returns {Card}
     */
    Card.prototype.selectable = function (isSelectable) {
        return this;
    };

    return Card;
});
