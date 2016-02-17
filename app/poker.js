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
         * @public
         */
        this.board = [];

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
     * @returns {Poker}
     * @privet
     */
    Poker.prototype._repaintBoard = function () {
        this._getElem('board').html(this.board.map(function (card) {
            return card.view;
        }));

        return this;
    };

    /**
     * @method - Deal Cards
     * @returns {Poker}
     * @public
     */
    Poker.prototype.dealCards = function () {
        var _this = this;

        this.deck = new Deck();
        this.deck.shuffle();

        this.board = this.deck.getCards(3);
        this._repaintBoard();

        // Set Controls
        this._setControls(this._BETS.map(function (bet) {
            return {
                text: '$' + bet,
                callback: function () {
                    _this.toBet(bet);
                }
            };
        }));

        notification.send('Do your bet.');

        return this;
    };

    /**
     * @method - To make a Bet
     * @param {number} bet
     * @returns {Poker}
     * @public
     */
    Poker.prototype.toBet = function (bet) {
        if (this._setDeposit(-bet) !== false) {
            this.bet = bet;
            this._getElem('bet').text('$' + this.bet);

            this.openUpCards();
        } else {
            notification.send('Your deposit is not enough to bet $' + bet + '.');
        }

        return this;
    };

    /**
     * @method - Open up the Cards on Board
     * @returns {Poker}
     * @public
     */
    Poker.prototype.openUpCards = function () {
        this.board.forEach(function (card) {
            card.turnFaceUp(true);
        });

        this.selectCards();

        return this;
    };

    /**
     * @method - Select Cards on Board
     * @returns {Poker}
     * @public
     */
    Poker.prototype.selectCards = function () {
        var _this = this;

        this._isSelectableCards(true);

        // Set Controls
        this._setControls([
            {
                text: 'Change the Others',
                callback: function () {
                    _this.changeCards();
                }
            }
        ]);

        notification.send('Choose the cards for hold.');

        return this;
    };

    /**
     * @method - Makes the cards available for selection or vice versa
     * @param {boolean} flag
     * @returns {Poker}
     * @private
     */
    Poker.prototype._isSelectableCards = function (flag) {
        var _this = this;

        flag = flag || true;

        this.board = this.board.map(function (card) {
            if (flag) {
                card.view.find('.card').on('click', function () {
                    _this._selectCard(card);
                });
            } else {
                card.view.find('.card').off('click');
            }

            card.view.find('.card').toggleClass('poker__card_selectable', flag);

            return card;
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
        card.selected = !card.selected;

        card.view.find('.card').toggleClass('poker__card_selected', function () {
            return card.selected;
        });

        return this;
    };

    /**
     * @method - Second Step of Round
     * @returns {Poker}
     * @public
     */
    Poker.prototype.changeCards = function () {
        var _this = this;

        this.board = this.board.map(function (card) {
            if (!card.selected) {
                card = _this.deck.getCard();
                card.turnFaceUp(true);
            }

            return card;
        });

        this._repaintBoard();

        this.calculate();

        return this;
    };

    /**
     * @method - Third the Finally Step of Round
     * @returns {Poker}
     * @public
     */
    Poker.prototype.calculate = function () {
        var _this = this;

        this._setControls([
            {
                text: 'New Deal',
                callback: function () {
                    _this
                        ._resetBet()
                        .dealCards();
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
                break;
        }

        return this;
    };

    Poker.prototype._matcher = function() {
        var result,
            _this = this;

        this._sortedBoard = (function () {
            var board = _this.board;

            board.sort(function (a, b) {
                return (a.value - b.value);
            });

            return board;
        })();
        this._noJokersBoard = this._sortedBoard.filter(function (card) {
            return (card.value !== 0);
        });
        this._jokersBoard = this._sortedBoard.filter(function (card) {
            return (card.value === 0);
        });
        this._boardsMatches = (function () {
            var result = {};

            _this._noJokersBoard.forEach(function (card, index, board) {
                if (index > 0) {
                    if (card.value == board[index - 1].value) {
                        result[card.value] = ++result[card.value] || 2;
                    }
                }
            });

            if (_this._jokersBoard.length > 0) {
                if (Object.keys(result).length > 0) {
                    var values = Object.keys(result);

                    result[values[values.length - 1]] += _this._jokersBoard.length;
                } else {
                    result[_this._noJokersBoard[_this._noJokersBoard.length - 1].value] = _this._jokersBoard.length + 1;
                }
            }

            return result;
        })();

        switch (true) {
            case this._isStraightFlash():
                result = 'straight-flush';
                break;
            case this._isFourOfKind():
                result = 'four-of-kind';
                break;
            case this._isFullHouse():
                result = 'full-house';
                break;
            case this._isFlush():
                result = 'flush';
                break;
            case this._isStraight():
                result = 'straight';
                break;
            case this._isThreeOfKind():
                result = 'three-of-kind';
                break;
            case this._isTwoPair():
                result = 'two-pairs';
                break;
            case this._isOnePair():
                result = 'one-pair';
                break;
            default:
                result = null;
                break;
        }

        return result;
    };

    /**
     * @method Check for "Straight flush"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isStraightFlash = function () {
        var result;

        result = this._isStraight() && this._isFlush();

        return result;
    };

    /**
     * @method Check for "Four of a kind"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isFourOfKind = function () {
        var result = false;

        for (var value in this._boardsMatches) {
            if (this._boardsMatches[value] == 4) {
                result = true;
            }
        }

        return result;
    };

    /**
     * @method Check for "Full house"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isFullHouse = function () {
        var result,
            matchesCount = 0;

        for (var value in this._boardsMatches) {
            matchesCount += this._boardsMatches[value];
        }

        result = (matchesCount == 5) ? true : false;

        return result;
    };

    /**
     * @method Check for "Flush"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isFlush = function () {
        var result;

        result = this._noJokersBoard.every(function (card, index, board) {
            return (index === 0 || card.suit === board[index - 1].suit);
        });

        return result;
    };

    /**
     * @method Check for "Straight"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isStraight = function () {
        var result = true,
            _this = this;

        this._noJokersBoard.forEach(function (card, index, board) {
            if (index > 0) {
                    var prevCard = board[index - 1];

                    if ((card.value - prevCard.value) > 0 && (card.value - prevCard.value) <= _this._jokersBoard.length + 1) {
                        _this._jokersBoard.splice(0, card.value - prevCard.value - 1);
                        result = result && true;
                } else {
                        result = false;
                }
            }
        });

        return result;
    };

    /**
     * @method Check for "Three of a kind"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isThreeOfKind = function () {
        var result;

        for (var value in this._boardsMatches) {
            if (this._boardsMatches[value] == 3) {
                result = true;
            }
        }

        return result;
    };

    /**
     * @method Check for "Two pair"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isTwoPair = function () {
        var result,
            pairNumber = 0;

        for (var value in this._boardsMatches) {
            if (this._boardsMatches[value] == 2) {
                ++pairNumber;
            }
        }

        result = (pairNumber == 2) ? true : false;

        return result;
    };

    /**
     * @method Check for "One pair"
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isOnePair = function () {
        var result,
            pairNumber = 0;

        for (var value in this._boardsMatches) {
            if (this._boardsMatches[value] == 2) {
                ++pairNumber;
            }
        }

        result = (pairNumber == 1) ? true : false;

        return result;
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
     * @method
     * @param {number} [deposit=1000]
     * @returns {Poker}
     * @public
     */
    Poker.prototype.start = function (deposit) {
        this._setDeposit(deposit || 1000);

        this.dealCards();

        return this;
    };

    return Poker;
});
