require([
    'jquery',
    '../app/cardDeck'
], function ($, CardDeck) {
        var cardDeck = new CardDeck(36);

        cardDeck.reset();

        $('body')
            .append(cardDeck.cards.join(', '))
            .append('<hr>');

        cardDeck.shuffle();

        $('body')
            .append(cardDeck.cards.join(', '))
            .append('<hr>');

        var cardOnHand = [];
        for(var i = 0; i < 3; i++) {
            cardOnHand.push(cardDeck.getCard());
        }

        $('body')
            .append(cardOnHand.join(', '))
            .append('<br>')
            .append(cardDeck.cards.join(', '))
            .append('<hr>');

        $('body')
            .append(cardDeck.getCards(6).join(', '))
            .append('<br>')
            .append(cardDeck.cards.join(', '))
            .append('<hr>');

        cardDeck.reset();

        $('body')
            .append(cardDeck.cards.join(', '))
            .append('<hr>');
    }
);
