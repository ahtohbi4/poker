define([
    'app/card',
    'app/poker'
], function (Card, Poker){
    var SUITS = ['♥', '♦', '♣', '♠'],
        poker = new Poker();

    describe('Checking Hands with method _isOnePair()', function () {
        describe('without repeating Cards', function () {
            it('should returns false', function () {
                poker.board = [
                    new Card({ value: 10, suit: '♥' }),
                    new Card({ value: 3,  suit: '♥' }),
                    new Card({ value: 2,  suit: '♦' }),
                    new Card({ value: 5,  suit: '♦' }),
                    new Card({ value: 6,  suit: '♠' })
                ];
                expect(poker._isOnePair()).toEqual(false);
            });
        });
        describe('without repeating Cards', function () {
            it('should returns false', function () {
                poker.board = [
                    new Card({ value: 10, suit: '♥' }),
                    new Card({ value: 3,  suit: '♥' }),
                    new Card({ value: 2,  suit: '♦' }),
                    new Card({ value: 0 }),
                    new Card({ value: 6,  suit: '♠' })
                ];
                expect(poker._isOnePair()).toEqual(true);
            });
        });
        describe('with pair of Cards', function () {
            it('should returns true', function () {
                poker.board = [
                    new Card({ value: 10, suit: '♥' }),
                    new Card({ value: 3,  suit: '♥' }),
                    new Card({ value: 10, suit: '♦' }),
                    new Card({ value: 5,  suit: '♦' }),
                    new Card({ value: 6,  suit: '♠' })
                ];
                expect(poker._isOnePair()).toEqual(true);
            });
        });
    });

    describe('Checking Hands with method _isTwoPair()', function () {
        describe('with one pair of Cards', function () {
            it('should returns false', function () {
                poker.board = [
                    new Card({ value: 10, suit: '♥' }),
                    new Card({ value: 3,  suit: '♥' }),
                    new Card({ value: 2,  suit: '♦' }),
                    new Card({ value: 5,  suit: '♦' }),
                    new Card({ value: 5,  suit: '♠' })
                ];
                expect(poker._isTwoPair()).toEqual(false);
            });
        });
        describe('with two pairs of Cards', function () {
            it('should returns true', function () {
                poker.board = [
                    new Card({ value: 10, suit: '♥' }),
                    new Card({ value: 3,  suit: '♥' }),
                    new Card({ value: 10, suit: '♦' }),
                    new Card({ value: 5,  suit: '♦' }),
                    new Card({ value: 3,  suit: '♠' })
                ];
                expect(poker._isTwoPair()).toEqual(true);
            });
        });
    });
});
