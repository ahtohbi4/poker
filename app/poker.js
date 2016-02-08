define([
    'jquery',
    'app/button',
    'app/cardDeck',
    'app/notification'
], function ($, Button, CardDeck, Notification) {
    'use strict';

    var notification = new Notification();

    /**
     * @class
     */
    function Poker(options) {
        var opts = options || {};

        /**
         * @const {array} [_BETS=[10, 50, 100, 500]]
         * @private
         */
        this._BETS = opts.bets || [10, 50, 100, 500];

        /**
         * @property {array} [firstHand=[]] - Array of the First Hand Cards
         * @private
         */
        this.firstHand = [];

        /**
         * @property {array} [secondHand=[]] - Array of the Second Hand Cards
         * @private
         */
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
            deposit: $('.poker__deposit'),
            hand: $('.poker__hand')
        }[elem] || null;
    };

    /**
     * @method
     * @returns {Poker}
     * @private
     */
    Poker.prototype._updateDeposit = function () {
        this._getElem('deposit').text(this.deposit);

        return this;
    };

    /**
     * @method
     * @returns {boolean}
     * @private
     */
    Poker.prototype._getFromDeposit = function (amount) {
        var result;

        if (amount > this.deposit) {
            result = false;
        } else {
            this.deposit = this.deposit - amount;

            this._updateDeposit();

            result = true;
        }

        return result;
    };

    /**
     * @method
     * @returns {Poker}
     * @private
     */
    Poker.prototype._firstDeal = function() {
        var _this = this;

        this.firstHand = this.deck.getCards(5);
        this.firstHand.forEach(function (card) {
            this._getElem('hand').append(card.view);
        }, this);

        // Available bets
        this._BETS.forEach(function (bet) {
            var button = new Button('$' + bet, function () {
                if (_this._getFromDeposit(bet)) {
                    _this.bet = bet;
                    _this._secondDeal();
                } else {
                    _this._notification(`Your deposit is not enough to bet ${bet}`);
                }
            });

            _this._getElem('controls').append(button.view);
        });

        notification.send('Choose your Bet..');

        return this;
    };

    /**
     * @method
     * @returns {Poker}
     * @private
     */
    Poker.prototype._secondDeal = function() {
        // Open up the cards
        this.firstHand = this.firstHand.map(function (card) {
            card
                .turnFaceUp(true)
                .selectable(true);

            return card;
        });

        var button = new Button('Change Cards');

        this._getElem('controls').html(button.view);

        notification.send('Select held cards...');

        return this;
    };

    /**
     * @method Check for "Straight flush"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isStraightFlash = function () {
        var result;

        return result;
    };

    /**
     * @method Check for "Four of a kind"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isFourOfKind = function () {
        var result;

        return result;
    };

    /**
     * @method Check for "Full house"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isFullHouse = function () {
        var result;

        return result;
    };

    /**
     * @method Check for "Flush"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isFlush = function () {
        var result;

        return result;
    };

    /**
     * @method Check for "Straight"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isStraight = function () {
        var result;

        return result;
    };

    /**
     * @method Check for "Three of a kind"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isThreeOfKind = function () {
        var result;

        return result;
    };

    /**
     * @method Check for "Two pair"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isTwoPair = function () {
        var result;

        return result;
    };

    /**
     * @method Check for "One pair"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isOnePair = function () {
        var result;

        return result;
    };

    /**
     * @method
     * @returns {Poker}
     */
    Poker.prototype.start = function (deposit) {
        this.deposit = deposit || 1000;

        this._updateDeposit();

        this.deck = new CardDeck();
        this.deck
            .new()
            .shuffle();

        this._firstDeal();

        return this;
    };

    return Poker;
});
