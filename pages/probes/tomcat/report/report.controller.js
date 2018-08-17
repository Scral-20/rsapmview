'use strict';
/**
 * chaizq-neu
 * 2018.08.06
 * @group Controller
 * @name ReportCtrl
 * @class
 */
angular.module('inspinia')
    .controller( "ReportCtrl", ['$scope', '$http', '$state', '$stateParams','$window', 'AuthService',
        function ($scope,$http, $state, $stateParams, $window, authService) {
            $scope.key = $stateParams.key;
            $scope.currentTab = "basic";
            $scope.currentPeriod = '1d';

            //用于测试功能的本地数据
            $scope.testnum="2,413";
            $scope.percent=["74%", "24%", "14%", "55%", "100%", "90%"];

            $scope.getData=function () {
                $http.get(
                    authService.getURL() + "/basicinfo/"+ $stateParams.key,
                    {headers : authService.createAuthorizationTokenHeader()})
                    .then(function (response) {
                        $scope.basicinfo =response.data;

                        var data=response.data;
                        $scope.applicationName = data.applicationName;
                        $scope.agentVersion = data.agentVersion;
                        $scope.agentType = data.agentId;
                        $scope.pid = data.pid;
                        $scope.hostName = data.hostName;
                        $scope.jvmInfo = data.jvmInfo;
                        $scope.ip = data.ip;
                        $scope.startTimestamp = data.startTimestamp;
                        $scope.serverMetaData = data.serverMetaData;
                        $scope.status = data.status;
                        $scope.currentServiceInfo = [];

                        for (var i = 0; i < data.serverMetaData.serviceInfos.length; i++) {
                            if (data.serverMetaData.serviceInfos[i].serviceLibs.length > 0) {
                                $scope.currentServiceInfo = data.serverMetaData.serviceInfos[i];
                                break;
                            }
                        }
                        console.log(response.data);
                    }),function () {
                    console.log("no data: basicinfo");
                    // $state.go('login');
                };
            };
            $scope.selectServiceInfo = function(serviceInfo) {
                // alert(serviceInfo);
                if (serviceInfo.serviceLibs.length > 0) {
                    $scope.currentServiceInfo = serviceInfo;
                }
            };

            $scope.setPeriod = function ( period ) {
                if(typeof period==="undefined"){
                    return ;
                }
                $scope.currentPeriod = period;
            };

            $scope.getStyle=function (i) {
               return {
                   width: $scope.percent[i]
               }
            };

            $scope.activeTab = function (tab) {
                $scope.currentTab = tab;
            };

            $scope.getData();
        }
    ]);



