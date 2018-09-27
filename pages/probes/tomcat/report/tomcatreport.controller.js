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
                $scope.title = $stateParams.title;
                $scope.route = $stateParams.route;
                console.log('key值：' + $scope.key);
                $scope.currentTab = "basic";
                $scope.currentPeriod = '1w';

                $scope.localtime = Date.parse(new Date());
                $scope.date = function (timestamp) {
                    return $filter("date")(timestamp, "HH:mm:ss yyyy-MM-dd ");
                };

                $scope.names = {
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

                //报表页-->探针信息--说明文本
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

                //报表页-->应用信息--说明文本
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

                //表格中小型pie图标的配色设置
                $scope.piechartOptions = {
                    options: {
                        fill: ["#1ab394", "#d7d7d7", "#d71a60"]
                    }
                };

                $scope.getData = function () {
                    var getUrl = authService.getURL() + "/points/" + $stateParams.key + "/pinpoint/" + $scope.currentPeriod;
                    console.log(getUrl);
                    $http.post(
                        getUrl,
                        JSON.stringify($scope.names),
                        //JSON.parse($scope.name),
                        {headers: authService.createAuthorizationTokenHeader()})
                        .then(function (response) {
                            var data = response.data.message[0];
                            console.log(response.data);

                            $scope.ApplicationName = data.ApplicationName;
                            $scope.Ip = data.Ip;
                            $scope.HostName = data.HostName;
                            $scope.AgentVersion = data.AgentVersion;
                            $scope.JvmInfo = data.JvmInfo;
                            $scope.Pid = data.Pid;
                            $scope.Ports = data.Ports;
                            $scope.ServerMetaData = data.ServerMetaData;
                            $scope.Status = data.Status;
                            $scope.VmVersion = data.VmVersion;
                        }), function () {
                        console.log("no data: basicinfo");
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





