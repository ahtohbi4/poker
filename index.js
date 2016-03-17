requirejs.config({
    baseUrl: './',
    paths: {
        app: 'app',
        jquery: 'lib/jquery',
        underscore: 'lib/underscore-min',
        jasmine: [
            'lib/jasmine/lib/jasmine-2.4.1/jasmine'
        ],
        'jasmine-html': [
            'lib/jasmine/lib/jasmine-2.4.1/jasmine-html'
        ],
        'jasmine-boot': [
            'lib/jasmine/lib/jasmine-2.4.1/boot'
        ],
        spec: 'spec'
    },
    shim: {
        'jasmine-html': {
            deps: [
                'jasmine'
            ]
        },
        'jasmine-boot': {
            deps: [
                'jasmine',
                'jasmine-html'
            ]
        }
    }
});

if (window.location.search.match(/(?:\?|&|&amp;)spec/i)) {
    require([
        'jasmine-boot'
    ], function () {
        require([
            'jquery',
            'spec/hands.spec'
        ], function ($) {
            $('body').append('<link rel="stylesheet" href="lib/jasmine/lib/jasmine-2.4.1/jasmine.css">');

            window.onload();
        });
    });
}

requirejs([
    'app/app'
]);
