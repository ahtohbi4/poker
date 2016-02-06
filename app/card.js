define(function () {
    'use strict';

    var Card = function (options) {
        if (typeof options == 'undefined') {
            throw new Error('Required params for object Card was missed.');
        } else{
            if (typeof options.value == 'undefined') {
                throw new Error('Required param "value" for object Card was missed.');
            } else{
                this.value = options.value
            }

            if (options.suit) {
                this.suit = options.suit
            }

            this.name = options.name || `${this.value} ${this.suit}`;
        }

        return {
            value: this.value,
            suit: this.suit,
            name: this.name
        };
    };

    return Card;
});
