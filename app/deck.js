define([
    'app/card'
], function (Card) {
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
                pip: '♥'
            },
            {
                name: 'Diams',
                pip: '♦'
            },
            {
                name: 'Clubs',
                pip: '♣'
            },
            {
                name: 'Spades',
                pip: '♠'
            }
        ];

        /**
         * @const
         * @private
         */
        this._RANKS = [
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
        this._MORE_RANKS = [
            {
                value: 0,
                name: 'Joker'
            },
            {
                value: 0,
                name: 'Joker'
            }
        ];

        this.cards = [];

        this._SUITS.forEach(function (suit) {
            this._RANKS.forEach(function (rank) {
                this.cards.push(new Card({
                    value: rank.value,
                    rank: rank.name,
                    suit: suit.pip
                }));
            }, this);
        }, this);

        this._MORE_RANKS.forEach(function (rank) {
            this.cards.push(new Card({
                value: rank.value,
                title: rank.name
            }));
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
