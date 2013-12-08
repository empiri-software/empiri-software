"use strict";
angular.module('cast.controllers', [])
    .controller('CastCtrl', function CastScanCtrl($scope){
        // $location.path('/someNewPath').replace();

    })
    .controller('CastScanCtrl', function CastScanCtrl($scope, castApi){
        // $location.path('/someNewPath').replace();
        console.log('castApi:', castApi);
    })
    .controller('CastListCtrl', function CastListCtrl($scope, castApi){
        console.log('castApi:', castApi);
    })
    .controller('CastLaunchCtrl', function CastLaunchCtrl($scope, castApi){
        console.log('castApi:', castApi);
    })
    .controller('GlassCastAppCtrl', function GlassCastAppCtrl($scope, appId, receiverList, deviceIcon){
        $scope.castApi = null;
        $scope.receiverList = [];
        $scope.castApiDetected = false;
        $scope.receiversDetected = false;

        $scope.onWindowMessage = function (event) {
            if (event.source == window && event.data &&
                event.data.source && event.data.source == cast.NAME &&
                event.data.event && event.data.event == 'Hello') {
                $scope.initializeApi();
            }
        };
        $scope.getImageUrl = function (receiver) {
            return deviceIcon;
        };
        $scope.initializeApi = function () {
            if (!$scope.castApi) {
                $scope.castApi = new cast.Api();
                $scope.castApi.logMessage('Cast API initialized.');
                $scope.castApi.addReceiverListener(appId, $scope.onReceiverUpdate);
                $scope.castApiDetected = true;
                $scope.$apply();
            }
        };
        $scope.onReceiverUpdate = function (receivers) {
            $scope.castApi.logMessage('Got receiver list.');
            console.log('Got receiver list.', receivers);
            $scope.receiverList = receivers;
            $scope.receiversDetected = receivers.length > 0 ? true : false;
            $scope.$apply();
        };
        $scope.selectReceiver = function (receiver) {
            $scope.castApi.logMessage('Selected receiver: ' + receiver.name);
            console.log('Selected receiver:', receiver);

            if ($scope.activityId) {
                $scope.stopActivity();
            }

            $scope.errorMessage = null;
            $scope.activityStatus = null;
            $scope.mediaStatus = null;

            var resultCallback = $scope.getResultCallback('launchActivity');

            var request = new cast.LaunchRequest($scope.appName, receiver);
            if ($scope.launchParameters) {
                request.parameters = $scope.launchParameters;
            }
            $scope.castApi.launch(request, resultCallback);

        };

        // Detect API and initialize when available.
        if (window.cast != undefined && cast.isAvailable) {
            $scope.initializeApi();
        } else {
            window.addEventListener('message', $scope.onWindowMessage, false);
        }
    });
