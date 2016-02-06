require([
    'jquery',
    'app/poker'
], function ($, Poker) {
    var poker = new Poker();

    poker.start();
});
