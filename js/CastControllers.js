"use strict";
angular.module('cast.controllers', [])

    .controller('CastCtrl', [
        '$scope','cast', '$log', 'appId','$state',
        function CastCtrl($scope, cast, $log, appId, $state){
            $scope.castApi = new cast.Api();
            $scope.onReceiverList = function(list) {
                $scope.receiverList = list;
                $state.go('cast.list');
            };
            $scope.castApi.addReceiverListener(appId, $scope.onReceiverList);
            // $location.path('/someNewPath').replace();
            $scope.checked = true;
        }
    ])
    .controller('CastScanCtrl', function CastScanCtrl($scope){
        $scope.$emit('stateMessage', 'waiting for device list');
        $scope.active = true;
//        $scope.level = 'warning';
        $scope.aria = {
            now: 20, min: 10, max: 20
        };
        $scope.progressMessage = 'No chromecasts found..';
    })
    .controller('CastListCtrl', function CastListCtrl($scope){

        $scope.$watch('receiverList', function() {
            if ($scope.receiverList && $scope.receiverList.length > 0) {
                $scope.$emit('stateMessage', 'Select a chromecast device');
            } else {
                $scope.$emit('stateMessage', 'Unable to find a chromecast device');
            }
        }); // initialize the watch
    })
    .controller('CastLaunchCtrl', function CastLaunchCtrl($scope){
//        console.log('castApi:', castApi);
    })
    .controller('GlassCastCtrl', function GlassCastCtrl($scope, $timeout){
        $scope.$on('stateMessage', function(evt, msg) {
            $scope.stateMessage = msg;
        });
        $scope.$emit('stateMessage', 'Cast api not found...');
    });
