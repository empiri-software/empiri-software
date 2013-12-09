"use strict";
angular.module('cast.controllers', [])

    .controller('CastCtrl', [
        '$scope','castApi', '$log',
        function CastCtrl($scope, castApi, $log){
            $log.debug("castApi", castApi);
            // $location.path('/someNewPath').replace();
            $scope.checked = true;
        }
    ])
    .controller('CastScanCtrl', function CastScanCtrl($scope){
        $scope.$emit('stateMessage', 'waiting for devices');
        $scope.active = true;
//        $scope.level = 'warning';
        $scope.aria = {
            now: 20, min: 10, max: 20
        };
        $scope.progressMessage = 'No chromecasts found..';
    })
    .controller('CastListCtrl', function CastListCtrl($scope){
//        console.log('castApi:', castApi);
    })
    .controller('CastLaunchCtrl', function CastLaunchCtrl($scope){
//        console.log('castApi:', castApi);
    })
    .controller('GlassCastCtrl', function GlassCastCtrl($scope, $timeout){
        $scope.$on('stateMessage', function(evt, msg) {
            $scope.stateMessage = msg;
        });
        $scope.$emit('stateMessage', 'Waiting for cast api...');
    });
