(function() {
    'use strict';
    /**
     * wub-neu
     * 2018.07.23
     * @group Controller
     * @name TomcatbasicinfoCtrl
     * @class
     */
    angular.module('inspinia')
        .controller( 'TomcatbasicinfoCtrl', ['$scope', '$http', '$state', '$stateParams', '$window', '$filter', 'AuthService',
            function ($scope, $http, $state, $stateParams, $window, $filter, authService) {
                $scope.title = $stateParams.title;
                $scope.route = $stateParams.route;
                console.log($scope.route);
                $scope.key = $stateParams.key;
                $scope.currentPeriod = '3h';
                $scope.name = '{' +
                    '    "ApplicationName":"ApplicationName",' +
                    '    "Ip":"Ip",' +
                    '    "HostName":"HostName",' +
                    '    "AgentVersion":"AgentVersion",' +
                    '    "JvmInfo":"JvmInfo",' +
                    '    "Pid":"Pid",' +
                    '    "Ports":"Ports",' +
                    '    "ServerMetaData":"ServerMetaData",' +
                    '    "Status":"Status",' +
                    '    "VmVersion":"VmVersion"' +
                    '}';

                // $scope.name2 = '{"Pid":"Pid"}';

                $scope.getData = function () {
                    $http.post(
                        authService.getURL() + "/points/" + $stateParams.key +"/pinpoint/"+$scope.currentPeriod,
                        JSON.parse($scope.name),
                        {headers : authService.createAuthorizationTokenHeader()}
                    ).then(function (response) {
                        // console.log("yes");
                        console.log(response.data.code);
                        console.log(response.data.message);
                        //console.log(response.data.message.ip);
                        var data = response.data.message[0];

                        $scope.ApplicationName=data.ApplicationName;
                        $scope.Ip = data.Ip;
                        $scope.HostName = data.HostName;
                        $scope.AgentVersion = data.AgentVersion;
                        $scope.JvmInfo = data.JvmInfo;
                        $scope.Pid = data.Pid;
                        $scope.Ports = data.Ports;
                        $scope.ServerMetaData = data.ServerMetaData;
                        $scope.Status = data.Status;
                        $scope.VmVersion = data.VmVersion;

                    }, function () {
                        console.log("basicinfo no data");
                    });

                };

                // $scope.getData1 = function () {
                //     $http.post(
                //         authService.getURL() + "/points/" + $stateParams.key +"/pinpoint/"+$scope.currentPeriod,
                //         JSON.parse($scope.name2),
                //         //authService.getURL() + "/points/" + "1685763560" +"/pinpoint/"+$scope.currentPeriod,
                //         {headers : authService.createAuthorizationTokenHeader()}
                //     ).then(function (response) {
                //         // console.log("yes");
                //         console.log(response.data.code);
                //         console.log(response.data.message);
                //         //console.log(response.data.message.ip);
                //         var data = response.data.message[0];
                //
                //         $scope.Pid = data.Pid;
                //
                //
                //     }, function () {
                //         console.log("basicinfo no data");
                //     });
                //
                // };

                $scope.selectServiceInfo = function(serviceInfo) {
                    // alert(serviceInfo);
                    if (serviceInfo.serviceLibs.length > 0) {
                        $scope.currentServiceInfo = serviceInfo;
                    }
                };

                $scope.setPeriod = function ( period ) {
                    $scope.currentPeriod = period;
                };

                $scope.date = function (timestamp) {
                    return $filter("date")(timestamp, "HH:mm:ss yyyy-MM-dd ");
                };

                $scope.getData();
                // $scope.getData1();

            }
        ]);
})();