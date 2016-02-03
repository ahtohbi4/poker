/**
 * @module cardDeck
 */
define(function () {
    'use strict';

    /**
     * @class
     */
    function CardDeck(amount) {
        this.amount = amount || 54;

        /**
         * @const
         * @private
         */
        this._SUITS = [
            {
                name: 'Hearts',
                sign: '♥'
            },
            {
                name: 'Diams',
                sign: '♦'
            },
            {
                name: 'Clubs',
                sign: '♣'
            },
            {
                name: 'Spades',
                sign: '♠'
            }
        ];

        /**
         * @const
         * @private
         */
        this._VALUES = [
            {
                value: 2
            },
            {
                value: 3
            },
            {
                value: 4
            },
            {
                value: 5
            },
            {
                value: 6
            },
            {
                value: 7
            },
            {
                value: 8
            },
            {
                value: 9
            },
            {
                value: 10
            },
            {
                value: 11,
                name: 'J'
            },
            {
                value: 12,
                name: 'Q'
            },
            {
                value: 13,
                name: 'K'
            },
            {
                value: 14,
                name: 'A'
            }
        ];

        /**
         * @const
         * @private
         */
        this._MORE_VALUES = [
            {
                value: 0,
                name: 'Joker'
            },
            {
                value: 0,
                name: 'Joker'
            }
        ];
    }

    /**
     * @method
     * @returns {CardDeck}
     * @public
     */
    CardDeck.prototype.reset = function () {
        this.cards = [];

        this._SUITS.forEach(function (suit) {
            this._VALUES.forEach(function (value) {
                this.cards.push(`${value.name || value.value} ${suit.sign}`);
            }, this);
        }, this);

        this._MORE_VALUES.forEach(function (value) {
            this.cards.push(value.name);
        }, this);

        return this;
    };

    /**
     * @method
     * @returns {CardDeck}
     * @public
     */
    CardDeck.prototype.shuffle = function () {
        for (var i = this.cards.length - 1; i >= 0; i--) {
            var randomIndex = Math.floor(Math.random() * (i + 1));
            var itemAtIndex = this.cards[randomIndex];

            this.cards[randomIndex] = this.cards[i];
            this.cards[i] = itemAtIndex;
        }

        return this;
    };

    /**
     * @method
     * @returns {object}
     * @public
     */
    CardDeck.prototype.getCard = function () {
        var result;

        result = this.cards.pop();

        return result;
    };

    /**
     * @method
     * @param {number} amount
     * @returns {array}
     * @public
     */
    CardDeck.prototype.getCards = function (amount) {
        var result = [];

        while (amount--) {
            var topCard = this.cards.pop();

            result.push(topCard);
        }

        return result;
    };

    return CardDeck;
});
