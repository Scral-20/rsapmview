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
                $scope.ServerMetaData={
                    serviceInfos:"",
                    serviceLibs:""
                };
                $scope.names =
                {
                    "ApplicationName":"ApplicationName",
                    "Ip":"Ip",
                    "HostName":"HostName",
                    "AgentVersion":"AgentVersion",
                    "JvmInfo":"JvmInfo",
                    "Pid":"Pid",
                    "Ports":"Ports",
                    "ServerMetaData":"ServerMetaData",
                    "Status":"Status",
                    "VmVersion":"VmVersion"
                };

                $scope.getData = function () {
                    $http.post(
                        authService.getURL() + "/points/" + $stateParams.key +"/pinpoint/"+$scope.currentPeriod,
                        JSON.stringify( $scope.names),
                        // JSON.parse($scope.names),
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
                        $scope.currentServiceInfo = [];
                        $scope.VmVersion = data.VmVersion;

                        //给列表赋初值
                        for (var i = 0; i < data.ServerMetaData.serviceInfos.length; i++) {
                            if (data.ServerMetaData.serviceInfos[i].serviceLibs.length > 0) {
                                $scope.currentServiceInfo = data.ServerMetaData.serviceInfos[i];
                                break;
                            }
                        }

                    }, function () {
                        console.log("basicinfo no data");
                    });

                };

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
            }
        ]);
})();