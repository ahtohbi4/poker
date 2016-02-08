define([
    'jquery',
    'app/button',
    'app/cardDeck'
], function ($, Button, CardDeck) {
    'use strict';

    /**
     * @class
     */
    function Poker(options) {
        var opts = options || {};

        this._BETS = opts.bets || [10, 50, 100, 500];

        return this;
    }

    /**
     * @method
     * @returns {jQuery}
     * @private
     */
    Poker.prototype._getElem = function (elem) {
        return {
            controls: $('.poker__controls'),
            count: $('.poker__count'),
            hand: $('.poker__hand')
        }[elem] || null;
    };

    /**
     * @method
     * @returns {Poker}
     */
    Poker.prototype.firstDeal = function() {
        // Firs step
        for (var i = 0; i < 5; i++) {
            var card = this.deck.getCard();

            this._getElem('hand').append(card.view);
        }

        // Available bets
        this._BETS.forEach(function (bet) {
            var button = new Button('$' + bet, function () {
                return alert('$' + bet);
            });

            this._getElem('controls').append(button.view);
        }, this);

        return this;
    };

    /**
     * @method
     * @returns {Poker}
     */
    Poker.prototype.secondDeal = function() {
        // body...
    };

    Poker.prototype.start = function (deposit) {
        this.deposit = deposit || 1000;

        this._getElem('count').text(this.deposit);

        this.deck = new CardDeck();
        this.deck
            .new()
            .shuffle();

        this.firstDeal();
    };

    Poker.prototype.reset = function () {
    };

    /**
     * @method to check for "Straight flush"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isStraightFlash = function () {
        var result;

        return result;
    };

    /**
     * Four of a kind
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isFourOfKind = function () {
        var result;

        return result;
    };

    /**
     * Full house
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isFullHouse = function () {
        var result;

        return result;
    };

    /**
     * Flush
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isFlush = function () {
        var result;

        return result;
    };

    /**
     * Straight
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isStraight = function () {
        var result;

        return result;
    };

    /**
     * Three of a kind
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isThreeOfKind = function () {
        var result;

        return result;
    };

    /**
     * Two pair
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isTwoPair = function () {
        var result;

        return result;
    };

    /**
     * One pair
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isOnePair = function () {
        var result;

        return result;
    };

    return Poker;
});
