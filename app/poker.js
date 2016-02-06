define([
    'jquery',
    'app/cardDeck'
], function ($, CardDeck) {
    'use strict';

    /**
     * @class
     */
    function Poker() {};

    Poker.prototype.start = function (deposit) {
        this.deposit = deposit || 1000;

        this.getElem('count').text(this.deposit);

        this.deck = new CardDeck();
        this.deck
            .new()
            .shuffle();
    };

    Poker.prototype.reset = function () {
    };

    Poker.prototype.getElem = function (elem) {
        return {
            count: $('.poker__count'),
            hand: $('.poker__hand')
        }[elem] || null;
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
