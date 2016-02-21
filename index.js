requirejs.config({
    baseUrl: './',
    paths: {
        app: 'app',
        jquery: 'lib/jquery',
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

require([
    'jasmine-boot'
], function () {
    require([
        'spec/hands.spec'
    ], function () {
        window.onload();
    })
});

requirejs([
    'app/app'
]);
