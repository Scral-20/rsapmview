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
                $scope.route = $stateParams.route;
                console.log('key值：' + $scope.key);
                $scope.currentTab = "basic";
                $scope.currentPeriod = '1w';

                $scope.localtime = Date.parse(new Date());
                $scope.date = function (timestamp) {
                    return $filter("date")(timestamp, "HH:mm:ss yyyy-MM-dd ");
                };

                //本地的说明文本
                $scope.helpText_agent = [
                    {
                        content: '监测探针对CPU资源的消耗情况，量化探针对系统性能的影响',
                        title: '监测内容:',
                        statusClass: 'success'
                    },
                    {
                        content: '监测不同时刻各个探针的响应数量与响应速度，记录两者随时间的变化情况',
                        title: '具体指标：',
                        statusClass: 'warning'
                    },
                    {
                        content: '<1s:快速响应; 1s~3s:正常响应; 3s~5s:缓慢响应; >5s:极慢响应',
                        title: '响应速度分级：',
                        statusClass: 'info'
                    }
                ];


                $scope.helpText_app = [
                    {
                        content: '监测RPC请求次数与请求时间',
                        title: '监测内容:',
                        statusClass: 'success'
                    },
                    {
                        content: '统计正常和异常状态的链接请求，记录各链接请求时间和请求次数，并统计总数',
                        title: '具体指标：',
                        statusClass: 'warning'
                    },
                    {
                        content: '在RPC请求信息表格中的Search栏：输入日志信息可查询URL链接请求，正常请求和异常请求信息分为两个列表显示',
                        title: 'RPC请求状态查询：',
                        statusClass: 'info'
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





