define([
    'jquery',
    'app/button',
    'app/deck',
    'app/notification'
], function ($, Button, Deck, Notification) {
    'use strict';

    var notification = new Notification();

    /**
     * @class
     * @param {object} [options]
     * @param {array} [options.bets=[10, 50, 100, 500]]
     * @see https://en.wikipedia.org/wiki/Glossary_of_card_game_terms
     * @see https://en.wikipedia.org/wiki/Glossary_of_poker_terms
     * @see https://en.wikipedia.org/wiki/List_of_poker_hands
     */
    function Poker(options) {
        options = options || {};

        /**
         * @const {array}
         * @private
         */
        this._BETS = options.bets || [10, 50, 100, 500];

        /**
         * @property {array} - Array of the Board cards
         * @private
         */
        this._board = [];

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
            board: $('.poker__board')
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
    Poker.prototype._setControls = function (controls) {
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
    Poker.prototype._toBet = function (bet) {
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
    Poker.prototype._resetBet = function () {
        this.bet = 0;

        this._getElem('bet').text('');

        return this;
    };

    /**
     * @method - First Step of Round
     * @returns {Poker}
     * @private
     */
    Poker.prototype._dealCards = function () {
        var _this = this;

        this.deck = new Deck();
        this.deck
            .new()
            .shuffle();

        this._board = this.deck.getCards(5);
        this._getElem('board').html(this._board.map(function (card) {
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
     * @method - Makes the cards available for selection or vice versa
     * @param {boolean} flag
     * @returns {Poker}
     * @private
     */
    Poker.prototype._isSelectableCards = function (flag) {
        flag = flag || true;

        var _this = this;

        this._board.forEach(function (card) {
            var c = card.view.find('.card');

            if (flag) {
                c.on('click', function () {
                    _this._selectCard(card);
                });
            } else {
                c.off('click');
            }

            c.toggleClass('poker__card_selectable', flag);
        });

        return this;
    };

    /**
     * @method - Select Card
     * @param {Card} card
     * @returns {Poker}
     * @private
     */
    Poker.prototype._selectCard = function (card) {
        card.view.find('.card').toggleClass('poker__card_selected');

        return this;
    };

    /**
     * @method - Second Step of Round
     * @returns {Poker}
     * @private
     */
    Poker.prototype._changeCards = function () {
        var _this = this;

        // Open up the cards
        this._board = this._board.map(function (card) {
            card.turnFaceUp(true);

            _this._isSelectableCards(true);

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
     * @method - Third the Finally Step of Round
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
