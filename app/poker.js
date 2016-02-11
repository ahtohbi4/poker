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
            bet: $('.poker__bet'),
            controls: $('.poker__controls'),
            deposit: $('.poker__deposit'),
            hand: $('.poker__hand')
        }[elem] || null;
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
     * @param {array|object} controls
     * @returns {Poker}
     * @private
     */
    Poker.prototype._setControls = function(controls) {
        var _this = this;

        controls = Array.isArray(controls) ? controls : [controls];

        this._controls = controls.map(function (control) {
            return new Button(control);
        });

        this._getElem('controls').html(function () {
            return _this._controls.map(function (control) {
                return control.view;
            });
        });

        return this;
    };

    /**
     * @method
     * @param {number} amount - Sets parameter "amount" as value of deposit if it is positive,
     * and decreases deposit on "amount" if negative one
     * @returns {number|boolean}
     * @private
     */
    Poker.prototype._setDeposit = function (amount) {
        var result;

        if (amount < 0) {
            result = this.deposit + amount;
        } else {
            result = amount;
        }

        if (result < 0) {
            return false;
        } else {
            this.deposit = result;
            this._getElem('deposit').text(this.deposit);

            return result;
        }
    };

    /**
     * @method
     * @param {number} bet
     * @returns {Poker}
     * @private
     */
    Poker.prototype._toBet = function(bet) {
        if (this._setDeposit(-bet) !== false) {
            this.bet = bet;
            this._getElem('bet').text('$' + this.bet);

            this._changeCards();
        } else {
            notification.send('Your deposit $' + this.deposit + ' is not enough to bet $' + bet);
        }

        return this;
    };

    /**
     * @method
     * @returns {Poker}
     * @private
     */
    Poker.prototype._resetBet = function() {
        this.bet = 0;

        this._getElem('bet').text('');

        return this;
    };

    /**
     * @method
     * @returns {Poker}
     * @private
     */
    Poker.prototype._dealCards = function () {
        var _this = this;

        this.deck = new CardDeck();
        this.deck
            .new()
            .shuffle();

        this.firstHand = this.deck.getCards(5);
        this._getElem('hand').html(this.firstHand.map(function (card) {
            return card.view;
        }));

        this._setControls(this._BETS.map(function (bet) {
            return {
                text: '$' + bet,
                callback: function () {
                    _this._toBet(bet);
                }
            };
        }));

        notification.send('Choose your Bet..');

        return this;
    };

    /**
     * @method
     * @returns {Poker}
     * @private
     */
    Poker.prototype._changeCards = function () {
        var _this = this;
        // Open up the cards
        this.firstHand = this.firstHand.map(function (card) {
            card
                .turnFaceUp(true)
                .selectable(true);

            return card;
        });

        this._setControls([
            {
                text: 'Change Cards',
                callback: function () {
                    _this._calculation();
                }
            }
        ]);

        notification.send('Select held cards...');

        return this;
    };

    /**
     * @method
     * @returns {Poker}
     * @private
     */
    Poker.prototype._calculation = function () {
        var _this = this;

        this._setControls([
            {
                text: 'New Deal!',
                callback: function () {
                    _this
                        ._resetBet()
                        ._dealCards();
                }
            }
        ]);

        switch (true) {
            case this._isStraightFlash():
                notification.send('Great, Lucky! You have "Straight Flash"!');
                break;
            case this._isFourOfKind():
                notification.send('Awesome! You get "Four of Kind".');
                break;
            case this._isFullHouse():
                notification.send('"Full House"');
                break;
            case this._isFlush():
                notification.send('"Flush"');
                break;
            case this._isStraight():
                notification.send('"Straight"');
                break;
            case this._isThreeOfKind():
                notification.send('"Three of Kind"! Let\'s try to get more?');
                break;
            case this._isTwoPair():
                notification.send('Not bad! It\'s "Two Pair".');
                break;
            case this._isOnePair():
                notification.send('You have "One Pair"! Play again?');
                break;
            default:
                notification.send('Never mind, buddy... Try again!');
        }

        return this;
    };

    /**
     * @method
     * @param {number} [deposit=1000]
     * @returns {Poker}
     * @public
     */
    Poker.prototype.start = function (deposit) {
        this._setDeposit(deposit || 1000);

        this._dealCards();

        return this;
    };

    return Poker;
});
