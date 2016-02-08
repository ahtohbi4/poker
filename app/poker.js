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

        this.firstHand = [];
        this.secondHand = [];

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
        var _this = this;

        this.firstHand = this.deck.getCards(5);
        this.firstHand.forEach(function (card) {
            this._getElem('hand').append(card.view);
        }, this);

        // Available bets
        this._BETS.forEach(function (bet) {
            var button = new Button('$' + bet, function () {
                _this.bet = bet;
                _this.secondDeal();
            });

            _this._getElem('controls').append(button.view);
        });

        return this;
    };

    /**
     * @method
     * @returns {Poker}
     */
    Poker.prototype.secondDeal = function() {
        this.firstHand = this.firstHand.map(function (card) {
            card.turnFaceUp(true);

            return card;
        });
        this._getElem('hand').empty();
        this.firstHand.forEach(function (card) {
            this._getElem('hand').append(card.view);
        }, this);

        var button = new Button('Change Cards');

        this._getElem('controls').html(button.view);
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
