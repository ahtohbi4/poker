define([
    'jquery',
    'underscore',
    'app/button/button',
    'app/deck/deck',
    'app/notification/notification'
], function ($, _, Button, Deck, Notification) {
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
         * @const {object}
         * @private
         */
        this._HANDS = {
            'straight-flush': {
                name: 'Straight Flash',
                index: 150
            },
            'four-of-kind': {
                name: 'Four of Kind',
                index: 25
            },
            'full-house': {
                name: 'Full House',
                index: 9
            },
            'flush': {
                name: 'Flush',
                index: 6
            },
            'straight': {
                name: 'Straight',
                index: 4
            },
            'three-of-kind': {
                name: 'Three of Kind',
                index: 3
            },
            'two-pairs': {
                name: 'Two Pair',
                index: 3
            },
            'one-pair': {
                name: 'One Pair',
                index: 1
            },
            null: {
                name: 'Nothing',
                index: 0
            }
        };

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

        this.board = this.deck.getCards(5);
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

        this.board.forEach(function (card) {
            card.view.find('.card').removeClass('poker__card_selectable poker__card_selected');
        });

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

        var combinationAlias = this._matcher();
        var combination = this._HANDS[combinationAlias];

        if (combinationAlias === null) {
            notification.send('Never mind, buddy... Try again!');
        } else {
            var congratulation = [
                'Great, Lucky! You have "<%= combination %>"! Get your $<%= payout %>.',
                'Awesome! You have "<%= combination %>". Get your $<%= payout %>.',
                '"<%= combination %>"! Get your $<%= payout %>. Let\'s try to get more?',
                'Not bad! It\'s "<%= combination %>". Get your $<%= payout %>.',
                'You have "<%= combination %>"! Get your $<%= payout %>. Play again?'
            ];

            // Calculate payout
            var payout = this.bet * combination.index;

            notification.send(_.template(congratulation[Math.floor(Math.random() * congratulation.length)])({
                combination: combination.name,
                payout: this.bet * combination.index
            }));

            this._setDeposit(this.deposit + payout);
        }

        return this;
    };

    /**
     * @method - Checks if the board match with the Poker combination
     * @returns {null|string} - One of the set [null, 'straight-flush', 'four-of-kind', 'full-house', 'flush',
     *                          'straight', 'three-of-kind', 'two-pairs', 'one-pair']
     * @private
     */
    Poker.prototype._matcher = function () {
        var result;

        switch (true) {
            case this._isStraightFlash(this.board):
                result = 'straight-flush';
                break;
            case this._isFourOfKind(this.board):
                result = 'four-of-kind';
                break;
            case this._isFullHouse(this.board):
                result = 'full-house';
                break;
            case this._isFlush(this.board):
                result = 'flush';
                break;
            case this._isStraight(this.board):
                result = 'straight';
                break;
            case this._isThreeOfKind(this.board):
                result = 'three-of-kind';
                break;
            case this._isTwoPair(this.board):
                result = 'two-pairs';
                break;
            case this._isOnePair(this.board):
                result = 'one-pair';
                break;
            default:
                result = null;
                break;
        }

        return result;
    };

    /**
     * @method - Sort array from cards passed as parameter
     * @param {array} board - Array of objects Card
     * @returns {array}
     * @private
     */
    Poker.prototype._getSortedBoard = function (board) {
        return board.sort(function (a, b) {
            return (a.value - b.value);
        });
    };

    /**
     * @method - Get array from cards passed as parameter without Jokers
     * @param {array} board - Array of objects Card
     * @returns {array}
     * @private
     */
    Poker.prototype._getNoJokersBoard = function (board) {
        return this._getSortedBoard(board).filter(function (card) {
            return (card.value !== 0);
        });
    };

    /**
     * @method - Get array of Jokers from cards passed as parameter
     * @param {array} board - Array of objects Card
     * @returns {array}
     * @private
     */
    Poker.prototype._getJokersBoard = function (board) {
        return this._getSortedBoard(board).filter(function (card) {
            return (card.value === 0);
        });
    };

    /**
     * @method - Get object of Card's value as keys and count of matches as values
     * @param {array} board - Array of objects Card
     * @returns {object}
     * @private
     */
    Poker.prototype._getMatchesOfBoard = function (board) {
        var result = {};

        this._getNoJokersBoard(board).forEach(function (card, index, noJokersBoard) {
            if (index > 0) {
                if (card.value === noJokersBoard[index - 1].value) {
                    result[card.value] = ++result[card.value] || 2;
                }
            }
        });

        if (this._getJokersBoard(board).length > 0) {
            if (Object.keys(result).length > 0) {
                var values = Object.keys(result);

                result[values[values.length - 1]] += this._getJokersBoard(board).length;
            } else {
                result[this._getNoJokersBoard(board)[this._getNoJokersBoard(board).length - 1].value] = this._getJokersBoard(board).length + 1;
            }
        }

        return result;
    };

    /**
     * @method - Check for "Straight flush"
     * @param {array} board - Array of objects Card
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isStraightFlash = function (board) {
        var result;

        result = this._isStraight(board) && this._isFlush(board);

        return result;
    };

    /**
     * @method - Check for "Four of a kind"
     * @param {array} board - Array of objects Card
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isFourOfKind = function (board) {
        var result = false;

        for (var value in this._getMatchesOfBoard(board)) {
            if (this._getMatchesOfBoard(board).hasOwnProperty(value) && this._getMatchesOfBoard(board)[value] === 4) {
                result = true;
            }
        }

        return result;
    };

    /**
     * @method - Check for "Full house"
     * @param {array} board - Array of objects Card
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isFullHouse = function (board) {
        var result,
            matchesCount = 0;

        for (var value in this._getMatchesOfBoard(board)) {
            if (this._getMatchesOfBoard(board).hasOwnProperty(value)) {
                matchesCount += this._getMatchesOfBoard(board)[value];
            }
        }

        result = (matchesCount === 5) ? true : false;

        return result;
    };

    /**
     * @method - Check for "Flush"
     * @param {array} board - Array of objects Card
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isFlush = function (board) {
        var result;

        result = this._getNoJokersBoard(board).every(function (card, index, noJokersBoard) {
            return (index === 0 || card.suit === noJokersBoard[index - 1].suit);
        });

        return result;
    };

    /**
     * @method - Check for "Straight"
     * @param {array} board - Array of objects Card
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isStraight = function (board) {
        var result = true,
            jokersBoard = this._getJokersBoard(board);

        this._getNoJokersBoard(board).forEach(function (card, index, noJokersBoard) {
            if (index > 0) {
                var prevCard = noJokersBoard[index - 1];

                if ((card.value - prevCard.value) > 0 && (card.value - prevCard.value) <= jokersBoard.length + 1) {
                    var deficit = card.value - prevCard.value - 1;
                    while (deficit--) {
                        jokersBoard.pop();
                    }

                    result = result && true;
                } else {
                    result = false;
                }
            }
        });

        return result;
    };

    /**
     * @method - Check for "Three of a kind"
     * @param {array} board - Array of objects Card
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isThreeOfKind = function (board) {
        var result;

        for (var value in this._getMatchesOfBoard(board)) {
            if (this._getMatchesOfBoard(board).hasOwnProperty(value) && this._getMatchesOfBoard(board)[value] === 3) {
                result = true;
            }
        }

        return result;
    };

    /**
     * @method - Check for "Two pair"
     * @param {array} board - Array of objects Card
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isTwoPair = function (board) {
        var result,
            pairNumber = 0;

        for (var value in this._getMatchesOfBoard(board)) {
            if (this._getMatchesOfBoard(board).hasOwnProperty(value) && this._getMatchesOfBoard(board)[value] === 2) {
                ++pairNumber;
            }
        }

        result = (pairNumber === 2) ? true : false;

        return result;
    };

    /**
     * @method - Check for "One pair"
     * @param {array} board - Array of objects Card
     * @returns {boolean}
     * @private
     */
    Poker.prototype._isOnePair = function (board) {
        var result,
            pairNumber = 0;

        for (var value in this._getMatchesOfBoard(board)) {
            if (this._getMatchesOfBoard(board).hasOwnProperty(value) && this._getMatchesOfBoard(board)[value] === 2) {
                ++pairNumber;
            }
        }

        result = (pairNumber === 1) ? true : false;

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
