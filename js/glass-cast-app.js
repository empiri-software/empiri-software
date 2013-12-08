"use strict";
var glassCast = angular.module('glass-cast', [
        'ui.router',
        'cast.controllers',
        'cast.directives',
        'cast.filters',
        'cast.providers',
        'cast.services'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/cast");
        var castResolver = {
            castApi: function($q, $timeout, $window){
                var deferred = $q.defer();
                if ($window.cast != undefined && $window.cast.isAvailable) {
                    deferred.resolve($window.cast);
                } else {
                    $window.addEventListener('message', function(event){
                        if (event.source == window && event.data &&
                            event.data.source && event.data.source == cast.NAME &&
                            event.data.event && event.data.event == 'Hello') {
                            deferred.resolve($window.cast);
                        }
                    }, false);
                }
                return deferred.promise;
            }
        };
        $stateProvider
            .state('cast', {
                resolve: castResolver,
                abstract: true,
                url: "/cast",
                template: "<ui-view/>"
            })
            .state('cast.scan', {
                url: "/scan",
                templateUrl: "partials/cast-scan.html",
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
