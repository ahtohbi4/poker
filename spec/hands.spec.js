define([
    'app/card/card',
    'app/poker/poker'
], function (Card, Poker){
    var poker = new Poker();

    describe('Matching a Poker combination', function () {
        // Straight Flush
        describe('as the "Straight Flush" for Cards', function () {
            it('5♥, 3♥, 4♥, 6♥, 2♥', function () {
                poker.board = [
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 3, suit: '♥'}),
                    new Card({value: 4, suit: '♥'}),
                    new Card({value: 6, suit: '♥'}),
                    new Card({value: 2, suit: '♥'})
                ];
                expect(poker._matcher()).toEqual('straight-flush');
            });

            it('5♥, Joker, 4♥, 6♥, 2♥', function () {
                poker.board = [
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 0}),
                    new Card({value: 4, suit: '♥'}),
                    new Card({value: 6, suit: '♥'}),
                    new Card({value: 2, suit: '♥'})
                ];
                expect(poker._matcher()).toEqual('straight-flush');
            });

            it('Joker, 3♥, 5♥, Joker, 7♥', function () {
                poker.board = [
                    new Card({value: 0}),
                    new Card({value: 3, suit: '♥'}),
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 0}),
                    new Card({value: 7, suit: '♥'})
                ];
                expect(poker._matcher()).toEqual('straight-flush');
            });
        });

        // Four of Kind
        describe('as the "Four of Kind" for Cards', function () {
            it('5♥, 5♣, 10♥, 5♦, 5♠', function () {
                poker.board = [
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 5, suit: '♣'}),
                    new Card({value: 10, suit: '♥'}),
                    new Card({value: 5, suit: '♦'}),
                    new Card({value: 5, suit: '♠'})
                ];
                expect(poker._matcher()).toEqual('four-of-kind');
            });

            it('5♥, Joker, 10♥, 5♦, 5♠', function () {
                poker.board = [
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 0}),
                    new Card({value: 10, suit: '♥'}),
                    new Card({value: 5, suit: '♦'}),
                    new Card({value: 5, suit: '♠'})
                ];
                expect(poker._matcher()).toEqual('four-of-kind');
            });

            it('Joker, 5♥, 5♠, Joker, A♥', function () {
                poker.board = [
                    new Card({value: 0}),
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 5, suit: '♠'}),
                    new Card({value: 0}),
                    new Card({value: 14, suit: '♥'})
                ];
                expect(poker._matcher()).toEqual('four-of-kind');
            });
        });

        // Full House
        describe('as the "Full House" for Cards', function () {
            it('5♥, 5♣, 10♥, 5♦, 10♠', function () {
                poker.board = [
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 5, suit: '♣'}),
                    new Card({value: 10, suit: '♥'}),
                    new Card({value: 5, suit: '♦'}),
                    new Card({value: 10, suit: '♠'})
                ];
                expect(poker._matcher()).toEqual('full-house');
            });

            it('5♥, Joker, 10♥, 5♦, 10♠', function () {
                poker.board = [
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 0}),
                    new Card({value: 10, suit: '♥'}),
                    new Card({value: 5, suit: '♦'}),
                    new Card({value: 10, suit: '♠'})
                ];
                expect(poker._matcher()).toEqual('full-house');
            });
        });

        // Flush
        describe('as the "Flush" for Cards', function () {
            it('5♥, 3♥, 10♥, A♥, 2♥', function () {
                poker.board = [
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 3, suit: '♥'}),
                    new Card({value: 10, suit: '♥'}),
                    new Card({value: 14, suit: '♥'}),
                    new Card({value: 2, suit: '♥'})
                ];
                expect(poker._matcher()).toEqual('flush');
            });

            it('5♥, Joker, 10♥, A♥, 2♥', function () {
                poker.board = [
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 0}),
                    new Card({value: 10, suit: '♥'}),
                    new Card({value: 14, suit: '♥'}),
                    new Card({value: 2, suit: '♥'})
                ];
                expect(poker._matcher()).toEqual('flush');
            });

            it('Joker, 3♥, 5♥, Joker, A♥', function () {
                poker.board = [
                    new Card({value: 0}),
                    new Card({value: 3, suit: '♥'}),
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 0}),
                    new Card({value: 14, suit: '♥'})
                ];
                expect(poker._matcher()).toEqual('flush');
            });
        });

        // Straight
        describe('as the "Straight" for Cards', function () {
            it('5♦, 3♥, 2♣, 4♥, 6♥', function () {
                poker.board = [
                    new Card({value: 5, suit: '♦'}),
                    new Card({value: 3, suit: '♥'}),
                    new Card({value: 2, suit: '♣'}),
                    new Card({value: 4, suit: '♥'}),
                    new Card({value: 6, suit: '♥'})
                ];
                expect(poker._matcher()).toEqual('straight');
            });

            it('J♠, Joker, Q♥, 10♠, A♠', function () {
                poker.board = [
                    new Card({value: 11, suit: '♠'}),
                    new Card({value: 0}),
                    new Card({value: 12, suit: '♥'}),
                    new Card({value: 10, suit: '♠'}),
                    new Card({value: 14, suit: '♠'})
                ];
                expect(poker._matcher()).toEqual('straight');
            });

            it('5♦, 3♥, Joker, 4♥, 2♠', function () {
                poker.board = [
                    new Card({value: 5, suit: '♦'}),
                    new Card({value: 3, suit: '♥'}),
                    new Card({value: 0}),
                    new Card({value: 4, suit: '♥'}),
                    new Card({value: 2, suit: '♠'})
                ];
                expect(poker._matcher()).toEqual('straight');
            });

            it('5♦, Joker, 2♠, Joker, 6♥', function () {
                poker.board = [
                    new Card({value: 5, suit: '♦'}),
                    new Card({value: 0}),
                    new Card({value: 2, suit: '♠'}),
                    new Card({value: 0}),
                    new Card({value: 6, suit: '♥'})
                ];
                expect(poker._matcher()).toEqual('straight');
            });
        });

        // Three of a Kind
        describe('as the "Three of a Kind" for Cards', function () {
            it('5♦, 5♥, 4♥, 5♣, 6♥', function () {
                poker.board = [
                    new Card({value: 5, suit: '♦'}),
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 4, suit: '♥'}),
                    new Card({value: 5, suit: '♣'}),
                    new Card({value: 6, suit: '♥'})
                ];
                expect(poker._matcher()).toEqual('three-of-kind');
            });

            it('5♦, 3♥, Joker, 5♥, 6♥', function () {
                poker.board = [
                    new Card({value: 5, suit: '♦'}),
                    new Card({value: 3, suit: '♥'}),
                    new Card({value: 0}),
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 6, suit: '♥'})
                ];
                expect(poker._matcher()).toEqual('three-of-kind');
            });

            it('5♦, Joker, 2♥, Joker, Q♥', function () {
                poker.board = [
                    new Card({value: 5, suit: '♦'}),
                    new Card({value: 0}),
                    new Card({value: 2, suit: '♥'}),
                    new Card({value: 0}),
                    new Card({value: 12, suit: '♥'})
                ];
                expect(poker._matcher()).toEqual('three-of-kind');
            });
        });

        // Two Pairs
        describe('as the "Two Pairs" for Cards', function () {
            it('5♥, 6♦, 5♣, 6♥, 2♣', function () {
                poker.board = [
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 6, suit: '♦'}),
                    new Card({value: 5, suit: '♣'}),
                    new Card({value: 6, suit: '♥'}),
                    new Card({value: 2, suit: '♣'})
                ];
                expect(poker._matcher()).toEqual('two-pairs');
            });
        });

        // One Pair
        describe('as the "One Pair" for Cards', function () {
            it('5♥, 6♦, A♥, 6♥, 2♣', function () {
                poker.board = [
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 6, suit: '♦'}),
                    new Card({value: 14, suit: '♥'}),
                    new Card({value: 6, suit: '♥'}),
                    new Card({value: 2, suit: '♣'})
                ];
                expect(poker._matcher()).toEqual('one-pair');
            });

            it('5♥, 6♦, A♥, Joker, 2♣', function () {
                poker.board = [
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 6, suit: '♦'}),
                    new Card({value: 14, suit: '♥'}),
                    new Card({value: 0}),
                    new Card({value: 2, suit: '♣'})
                ];
                expect(poker._matcher()).toEqual('one-pair');
            });

            it('Joker, 9♥, 6♣, 8♦, 4♥', function () {
                poker.board = [
                    new Card({value: 0}),
                    new Card({value: 9, suit: '♥'}),
                    new Card({value: 6, suit: '♣'}),
                    new Card({value: 8, suit: '♦'}),
                    new Card({value: 4, suit: '♥'})
                ];
                expect(poker._matcher()).toEqual('one-pair');
            });
        });

        // Nothing
        describe('as the "Nothing" for Cards', function () {
            it('5♥, 3♥, A♦, 6♣, 2♣', function () {
                poker.board = [
                    new Card({value: 5, suit: '♥'}),
                    new Card({value: 3, suit: '♥'}),
                    new Card({value: 14, suit: '♦'}),
                    new Card({value: 6, suit: '♣'}),
                    new Card({value: 2, suit: '♣'})
                ];
                expect(poker._matcher()).toEqual(null);
            });
        });
    });
});
