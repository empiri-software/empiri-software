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
                    castApi: ['$window','$q', '$interval', '$log',
                        function($window, $q, $interval, $log){
                            var deferred = $q.defer();
                            var p = $interval(function(){
                                return $window.cast;
                            }, 500, 4);
                            p.then(
                                null,
                                function handleError(err){
                                    if (err!=='canceled') {
                                        $log.error('p.error', arguments);
                                    }
                                },
                                function handleNotification(update) {
                                    if ($window.cast) {
                                        $interval.cancel(p);
                                    }
                                    return update;
                                }
                            ).finally(function(){
                                    if ($window.cast) {
                                        deferred.resolve($window.cast);
                                    } else {
                                        deferred.reject(err);
                                    }
                                });
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
