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
         * @param {string|number} options.rank - The position of a card relative to others in the same suit (5, 10, Q).
         * @param {number} [options.value=options.rank] - Number value of rank (J=11, A=1 or 14).
         * @param {string} options.suit - Suit.
         * @param {boolean} [options.faceUp=false] - A card laid on the table face-up.
         */
        if (typeof options == 'undefined') {
            throw new Error('Required params for object Card was missed.');
        } else{
            if (typeof options.rank == 'undefined') {
                throw new Error('Required param "rank" for object Card was missed.');
            } else{
                this.rank = options.rank;
            }

            this.value = options.value || this.rank;

            if (options.suit) {
                this.suit = options.suit;
            }

            this.title = options.title || `${this.rank} ${this.suit}`;

            this.faceUp = options.faceUp || false;
        }

        return this;
    }

    /**
     * @method
     * @returns {jQuery}
     */
    Card.prototype.view = function() {
        return $('<div>')
            .addClass('card')
            .attr('data-title', this.title);
    };

    return Card;
});
