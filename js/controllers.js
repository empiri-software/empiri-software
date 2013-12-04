function GlassCastAppCtrl($scope) {
    $scope.castApi = null;
    $scope.appName = "7a73a29f-3234-4c26-a9f9-22fa2f4da5dc_2";
    $scope.receiverList = [];
    $scope.castApiDetected = true;
    $scope.receiversDetected = false;

    $scope.onWindowMessage = function (event) {
        if (event.source == window && event.data &&
            event.data.source && event.data.source == cast.NAME &&
            event.data.event && event.data.event == 'Hello') {
            $scope.initializeApi();
        }
    };
    $scope.initializeApi = function () {
        if (!$scope.castApi) {
            $scope.castApi = new cast.Api();
            $scope.castApi.logMessage('Cast API initialized.');
            $scope.castApi.addReceiverListener($scope.appName, $scope.onReceiverUpdate);
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
}
