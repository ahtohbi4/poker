define([
    'jquery'
], function ($) {
    'use strict';

    /**
     * @class
     */
    var Card = function (options) {
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
                this.rank = options.rank
            }

            this.value = options.value || this.rank;

            if (options.suit) {
                this.suit = options.suit
            }

            this.name = options.name || `${this.rank} ${this.suit}`;

            this.faceUp = options.faceUp || false;
        }

        return {
            rank: this.rank,
            value: this.value,
            suit: this.suit
        };
    };

    Card.prototype.view = function() {
        return $('div')
            .addClass('card');
    };

    return Card;
});
