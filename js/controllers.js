angular.module('controllers', [])
    .controller('GlassCastAppCtrl', function GlassCastAppCtrl($scope, appId, receiverList, deviceIcon){
        "use strict";
        $scope.castApi = null;
        $scope.receiverList = receiverList;
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
        };

        // Detect API and initialize when available.
        if (window.cast != undefined && cast.isAvailable) {
            $scope.initializeApi();
        } else {
            window.addEventListener('message', $scope.onWindowMessage, false);
        }
    });
