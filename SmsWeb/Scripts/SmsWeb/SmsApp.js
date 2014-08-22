﻿/// <reference path="../typings/angularjs/angular.d.ts"/>
var SmsApp;
(function (SmsApp) {
    SmsApp.smsApp;

    var routes = {
        'mainController': 100,
        'sendController': 75,
        'inboxController': 50
    };

    SmsApp.smsApp = angular.module('smsApp', ['ngRoute', 'ngAnimate']).run(function ($rootScope, $route, inboxService) {
        inboxService.onStatusUpdate(function (status) {
            $rootScope.ConnectionStatus = status;
            switch (status) {
                case "Connected":
                    $rootScope.ConnectionStatusIcon = 'glyphicon-ok';
                    break;
                case "Connecting":
                    $rootScope.ConnectionStatusIcon = 'glyphicon-retweet';
                    break;
                case "Closed":
                    $rootScope.ConnectionStatusIcon = 'glyphicon-remove';
                    break;
            }
            if (!$rootScope.$$phase)
                $rootScope.$apply();
        });

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (current !== undefined) {
                var pos = routes[next['$$route'].controller];

                $('body').animate({
                    'background-position': pos + '%'
                }, 500, 'linear');
            }

            if (current === undefined || routes[next['$$route'].controller] < routes[current['$$route'].controller]) {
                $('#main').addClass('left-slide');
                $('#main').removeClass('right-slide');
            } else {
                $('#main').addClass('right-slide');
                $('#main').removeClass('left-slide');
            }
        });
    });
})(SmsApp || (SmsApp = {}));
//# sourceMappingURL=SmsApp.js.map
