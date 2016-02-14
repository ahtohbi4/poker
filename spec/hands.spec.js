define([
    'app/card',
    'app/poker'
], function (Card, Poker){
    var SUITS = ['♥', '♦', '♣', '♠'],
        poker = new Poker();

    describe('Checking Hands with method _isOnePair()', function () {
        describe('without repeating Cards', function () {
            poker.hands = [
                new Card({ value: 10, suit: '♥' }),
                new Card({ value: 3,  suit: '♥' }),
                new Card({ value: 2,  suit: '♦' }),
                new Card({ value: 5,  suit: '♦' }),
                new Card({ value: 6,  suit: '♠' })
            ]
            it('should returns false', function () {
                expect(poker._isOnePair()).toEqual(false);
            });
        });
        describe('with pair of Cards', function () {
            poker.hands = [
                new Card({ value: 10, suit: '♥' }),
                new Card({ value: 3,  suit: '♥' }),
                new Card({ value: 10, suit: '♦' }),
                new Card({ value: 5,  suit: '♦' }),
                new Card({ value: 6,  suit: '♠' })
            ]
            it('should returns true', function () {
                expect(poker._isOnePair()).toEqual(true);
            });
        });
    });

    describe('Checking Hands with method _isTwoPair()', function () {
        describe('with one pair of Cards', function () {
            poker.hands = [
                new Card({ value: 10, suit: '♥' }),
                new Card({ value: 3,  suit: '♥' }),
                new Card({ value: 2,  suit: '♦' }),
                new Card({ value: 5,  suit: '♦' }),
                new Card({ value: 5,  suit: '♠' })
            ]
            it('should returns false', function () {
                expect(poker._isTwoPair()).toEqual(false);
            });
        });
        describe('with two pairs of Cards', function () {
            poker.hands = [
                new Card({ value: 10, suit: '♥' }),
                new Card({ value: 3,  suit: '♥' }),
                new Card({ value: 10, suit: '♦' }),
                new Card({ value: 5,  suit: '♦' }),
                new Card({ value: 3,  suit: '♠' })
            ]
            it('should returns true', function () {
                expect(poker._isTwoPair()).toEqual(true);
            });
        });
    });
});
