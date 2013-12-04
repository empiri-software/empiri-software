/**
 * Created by christopherlyth on 12/3/13.
 */
"use strict";
var glassCast = angular.module('glass-cast', ['ngRoute', 'controllers'])
    .value('appId', '7a73a29f-3234-4c26-a9f9-22fa2f4da5dc_2')
    .value('deviceIcon', '../img/icons/drawable-mdpi/ic_media_route_off_holo_light.png')
    .value('launchedIcon', '../img/icons/drawable-mdpi/ic_media_route_on_holo_light.png')
    .factory('receiverList', function(){
        return [{
            id: "uuid:MOCKjSIWNhuOja-4GvlSCR2Fyag.",
            name: "Mock Chromecast",
            ipAddress: "192.168.0.99",
            isTabProjected: null
        }];
    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/list', {
                controller:'GlassCastAppCtrl',
                templateUrl:'device-list.html'
            })
//            .when('/edit/:projectId', {
//                controller:'EditCtrl',
//                templateUrl:'detail.html'
//            })
//            .when('/new', {
//                controller:'CreateCtrl',
//                templateUrl:'detail.html'
//            })
            .otherwise({
                redirectTo:'/list'
            });
    });
// ''
//
//    .factory('Projects', function(angularFireCollection, fbURL) {
//        return angularFireCollection(fbURL);
//    })
