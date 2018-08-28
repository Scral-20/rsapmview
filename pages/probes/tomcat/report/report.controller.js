(function () {
    'use strict';
    /**
     * chaizq-neu
     * 2018.08.23
     * @group Controller
     * @name ReportCtrl
     * @class
     */
    angular
        .module('inspinia')
        .controller("ReportCtrl", ['$scope', '$http', '$filter', '$state', '$stateParams', '$window', 'AuthService',
            function ReportCtrl($scope, $http, $filter, $state, $stateParams, $window, authService) {
                $scope.key = $stateParams.key;
                console.log('key值：'+$scope.key);
                $scope.currentTab = "basic";
                $scope.currentPeriod = '1w';

                $scope.date = function (timestamp) {
                    return $filter("date")(timestamp, "HH:mm:ss yyyy-MM-dd ");
                };

                //本地的说明文本
                $scope.inProgressList = [
                    {
                        content: '探针响应时间：按照时间序列监测并记录各个探针的响应时间',
                        date: 'tips 1',
                        statusClass: 'success',
                    },
                    {
                        content: '探针响应数量：按照各个探针的响应速度，将探针响应速度分为快速，标准，缓慢与极慢四种，并记录每种探针的数量',
                        date: 'tips 2',
                        statusClass: 'warning',

                    },
                    {
                        content: '探针响应数统计：记录四种探针的数量与占比',
                        date: 'tips 3',
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

                //用于测试功能的本地数据
                $scope.testnum = "2,413";
                $scope.percent = ["74%", "24%", "14%", "55%", "100%", "90%"];

                $scope.localtimestamp = '1533009271000';

                //控制表格中勾选框
                $scope.check = true;
                $scope.uncheck = false;

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
                        authService.getURL() + "/basicinfo/" + $stateParams.key ,
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
                            console.log('这里：'+authService.getURL() + "/report/trend/" + $stateParams.key);
                        }), function () {
                        console.log("no data: basicinfo");
                        // $state.go('login');
                    };
                };


                //增删勾选项
                $scope.selected = [];
                $scope.selectedTitle = [];
                $scope.selectedContent = [];
                //TABLE
                $scope.selectAll = function ($event) {
                    var checkbox = $event.target;
                    var action = (checkbox.checked ? 'add' : 'remove');
                    for (var i = 0; i < $scope.logData.length; i++) {
                        var contact = $scope.logData[i];
                        updateSelected(action, contact.id, contact.title, contact.logText.content);
                    }
                };

                $scope.isSelectedAll = function () {
                    return $scope.selected.length === $scope.logData.length;
                };

                var updateSelected = function (action, id, title, content) {
                    if (action == 'add' && $scope.selected.indexOf(id) == -1) {
                        $scope.selected.push(id);
                        console.log($scope.selected);
                        $scope.selectedTitle.push(title);
                        $scope.selectedContent.push(content)
                    }
                    if (action == 'remove' && $scope.selected.indexOf(id) != -1) {
                        var idx = $scope.selected.indexOf(id);
                        $scope.selected.splice(idx, 1);
                        console.log($scope.selected);
                        $scope.selectedTitle.splice(idx, 1);
                        $scope.selectedContent.splice(idx, 1)
                    }
                };

                $scope.updateSelection = function ($event, id, content) {
                    var checkbox = $event.target;
                    var action = (checkbox.checked ? 'add' : 'remove');
                    updateSelected(action, id, checkbox.name, content);
                };

                $scope.isSelected = function (id) {
                    return $scope.selected.indexOf(id) >= 0;
                };

                $scope.setIconClass = function (level) {
                    switch(level)
                    {
                        case 'normal':
                            return 'fa fa-check text-navy';
                            break;
                        case 'warning':
                            return 'fa fa-warning text-warning';
                            break;
                        case 'error':
                            return 'fa fa-times-circle text-danger';
                            break;
                        default:
                            return 'fa fa-minus-circle';
                    }
                };

                //TABLE以上

                $scope.close = function (id, selected) {
                    var logBox = document.getElementById(id);
                    if (logBox.style.display == "none") {
                        logBox.style.display = "block";
                    } else {
                        logBox.style.display = "none";
                    }
                };

                $scope.setLevelColor = function (level) {
                    switch (level) {
                        case 'normal':
                            return 'color: #1AB394';
                            break;
                        case 'warning':
                            return 'color: #FF8C00';
                            break;
                        case 'error':
                            return 'color: #FF1F3D';
                            break;
                        default:
                            return 'color: #000000';
                    }
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





