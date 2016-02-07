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

            this.view = $('<div>').addClass('card');
        }

        return this;
    }

    /**
     * @method
     * @returns {Card}
     */
    Card.prototype.turnFaceUp = function(faceUp) {
        var _this = this;
        this.faceUp = faceUp || this.faceUp;

        this.view
            .attr('data-title', function () {
                return _this.faceUp ? _this.title : null;
            })
            .toggleClass('card_face-up', _this.faceUp);

        return this;
    };

    return Card;
});
