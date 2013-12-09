"use strict";
var glassCast = angular.module('glass-cast', [
        'ui.router',
        'ngAnimate',
        'cast.controllers',
        'cast.directives',
        'cast.filters',
        'cast.providers',
        'cast.services'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/cast/scan");
        $stateProvider
            .state('cast', {
                abstract: true,
                resolve: {
                    cast: ['$window','$q', '$interval', '$log',
                        function($window, $q, $interval, $log){
                            var deferred = $q.defer();

                            if ($window.cast && $window.cast.isAvailable) {
                                deferred.resolve($window.cast);
                            } else {
                                $window.addEventListener("message", function(event) {
                                    if (event.source == window && event.data &&
                                        event.data.source == "CastApi" &&
                                        event.data.event == "Hello"){
                                        deferred.resolve($window.cast);
                                    }
                                });
                            };
                            return deferred.promise;
                        }
                    ]
                },
                url: "/cast",
                templateUrl: "partials/cast.html",
                controller: "CastCtrl"
            })
            .state('cast.scan', {
                url: "/scan",
                templateUrl: "partials/progress.html",
                controller: "CastScanCtrl"
            })
            .state('cast.list', {
                url: "/list",
                templateUrl: "partials/cast-list.html"
            })
            .state('cast.launch', {
                url: "/launch",
                templateUrl: "partials/cast-launch.html"
            })
    });
