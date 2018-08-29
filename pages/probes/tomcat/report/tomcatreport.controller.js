(function () {
    'use strict';
    /**
     * chaizq-neu
     * 2018.08.23
     * @group Controller
     * @name TomcatreportCtrl
     * @class
     */
    angular
        .module('inspinia')
        .controller("TomcatreportCtrl", ['$scope', '$http', '$filter', '$state', '$stateParams', '$window', 'AuthService',
            function ReportCtrl($scope, $http, $filter, $state, $stateParams, $window, authService) {
                $scope.key = $stateParams.key;
                console.log('key值：' + $scope.key);
                $scope.currentTab = "basic";
                $scope.currentPeriod = '2d';

                $scope.date = function (timestamp) {
                    return $filter("date")(timestamp, "HH:mm:ss yyyy-MM-dd ");
                };

                //本地的说明文本
                $scope.helpText_agent = [
                    {
                        content: '监测内容：监测探针对CPU资源的消耗情况，量化探针对系统性能的影响',
                        title: 'Tips 1:',
                        statusClass: 'success',
                    },
                    {
                        content: '具体指标：监测不同时刻各个探针的响应数量与响应速度，记录两者随时间的变化情况',
                        title: 'Tips 2:',
                        statusClass: 'warning',
                    },
                    {
                        content: '响应速度分级：<1s:快速响应; 1s~3s:正常响应; 3s~5s:缓慢响应; >5s:极慢响应',
                        title: 'Tips 3:',
                        statusClass: 'info',
                    }
                ];

                $scope.sortableOptions = {
                    connectWith: ".connectList"
                };

                $scope.reloadRoute = function () {
                    // $window.location.reload();
                    $state.reload()
                };


                //表格中小型pie图的配色设置
                $scope.piechartOptions = {
                    options: {
                        fill: ["#1ab394", "#d7d7d7", "#d71a60"]
                    }
                };

                //logData数据
                // $scope.logData = [
                //     {
                //         id: '1',
                //         title: 'First Item',
                //         level: 'error',
                //         pieChart: {
                //             data: [120, 120],
                //             ratio: '20%'
                //         },
                //         logText: {
                //             timestamp: '1533009871000',
                //             content: 'Log content1'
                //         }
                //     },
                //     {
                //         id: '2',
                //         title: 'Second Item',
                //         level: 'warning',
                //         pieChart: {
                //             data: [40, 120],
                //             ratio: '70%'
                //         },
                //         logText: {
                //             timestamp: '1533019871000',
                //             content: 'Log content2'
                //         }
                //     },
                //     {
                //         id: '3',
                //         title: 'Third Item',
                //         level: 'normal',
                //         pieChart: {
                //             data: [120, 70],
                //             ratio: '66%'
                //         },
                //         logText: {
                //             timestamp: '1532009871000',
                //             content: 'Lorem ipsum eget urna mollis ornare vel eu leo. Cum penatibus et magnis dis parturient montes, code nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. ' +
                //             'Sed euismod aliquet sapien consequat tincidunt.'
                //         }
                //     },
                //     {
                //         id: '4',
                //         title: 'Fourth Item',
                //         level: '',
                //         pieChart: {
                //             data: [66, 70],
                //             ratio: '45%'
                //         },
                //         logText: {
                //             timestamp: '1533002871000',
                //             content: 'Log content4'
                //         }
                //     }
                // ];

                $scope.getData = function () {
                    $http.get(
                        authService.getURL() + "/basicinfo/" + $stateParams.key,
                        {headers: authService.createAuthorizationTokenHeader()})
                        .then(function (response) {
                            $scope.basicinfo = response.data;

                            var data = response.data;
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
                            console.log('这里：' + authService.getURL() + "/report/trend/" + $stateParams.key);
                        }), function () {
                        console.log("no data: basicinfo");
                        // $state.go('login');
                    };
                };


                $scope.selectServiceInfo = function (serviceInfo) {
                    // alert(serviceInfo);
                    if (serviceInfo.serviceLibs.length > 0) {
                        $scope.currentServiceInfo = serviceInfo;
                    }
                };

                $scope.setPeriod = function (period) {
                    if (typeof period === "undefined") {
                        return;
                    }
                    $scope.currentPeriod = period;
                };

                $scope.getStyle = function (i) {
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
})();





