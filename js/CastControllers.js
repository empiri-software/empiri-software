"use strict";
angular.module('cast.controllers', [])

    .controller('CastCtrl', [
        '$scope','cast', '$log', 'appId',
        function CastCtrl($scope, cast, $log, appId){
            $log.debug("cast", cast);
            $scope.castApi = new cast.Api();
            $scope.onReceiverList = function(list) {
                $log.debug('recList', list);
                // If the list is non-empty, show a widget with
                // the friendly names of receivers.
                // When a receiver is picked, invoke doLaunch with the receiver.
            };
            $scope.castApi.addReceiverListener(appId, $scope.onReceiverList);

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
