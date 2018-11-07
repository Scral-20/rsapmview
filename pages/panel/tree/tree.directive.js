(function() {
    'use strict';
    /**
     * chaizq-neu
     * 2018.09.20
     * @group directive
     * @name  treeDiagram
     * @class
     */
    angular.module('inspinia')
        .directive('treeDiagram', [function() {
            return {
                restrict: 'E',
                templateUrl: 'pages/panel/tree/tree.html',
                replace: true,
                scope: true,
                controller: function ($scope, $http, $element, $attrs, AuthService) {

                    $scope.names = $attrs.names;
                    $scope.height = {
                        height:$attrs.height
                    };

                    //id为随机数，与属性并列即可,本地测试，链接数据后请删去
                    $scope._id = '_' + Math.random().toString(36).substr(2, 9);

                    $scope.getData=function () {
                        var getUrl= AuthService.getURL() + $attrs.url;
                        $http.post(
                            getUrl,
                            JSON.parse($scope.names)
                            // {headers : authService.createAuthorizationTokenHeader()}
                        ).then(function (response) {
                            console.log(response.data.message[0]);
                            $scope.chartData = response.data.message[0];
                            if (typeof($scope.chartData) !== "undefined"){
                                $scope._id = '_' + Math.random().toString(36).substr(2, 9);
                                //$scope.title = $scope.chartData.title;
                            }
                        }, function () {
                            console.log("treeDiagram no data");
                        });
                    };

                },
                link: function (scope) {
                    scope.$watch('_id', function () {
                        var myChart = echarts.init(document.getElementById(scope._id));
                        var option = {
                            tooltip: {
                                trigger: 'item',
                                triggerOn: 'mousemove'
                            },
                            legend: {
                                top: '2%',
                                left: '3%',
                                orient: 'vertical',
                                data: [{
                                    name: 'tree1',
                                    icon: 'rectangle'
                                },
                                    {
                                        name: 'tree2',
                                        icon: 'rectangle'
                                    }
                                ],
                                borderColor: '#c23531'
                            },
                            series:[
                                {
                                    type: 'tree',

                                    name: 'tree1',

                                    data: [scope.treeData],

                                    top: '5%',
                                    left: '7%',
                                    bottom: '2%',
                                    right: '50%',

                                    symbolSize: 7,

                                    label: {
                                        normal: {
                                            position: 'left',
                                            verticalAlign: 'middle',
                                            align: 'right'
                                        }
                                    },

                                    leaves: {
                                        label: {
                                            normal: {
                                                position: 'right',
                                                verticalAlign: 'middle',
                                                align: 'left'
                                            }
                                        }
                                    },

                                    expandAndCollapse: true,

                                    animationDuration: 550,
                                    animationDurationUpdate: 750

                                },
                                {
                                    type: 'tree',
                                    name: 'tree2',
                                    data: [scope.treeData2],

                                    top: '20%',
                                    left: '60%',
                                    bottom: '22%',
                                    right: '18%',

                                    symbolSize: 7,

                                    label: {
                                        normal: {
                                            position: 'left',
                                            verticalAlign: 'middle',
                                            align: 'right'
                                        }
                                    },

                                    leaves: {
                                        label: {
                                            normal: {
                                                position: 'right',
                                                verticalAlign: 'middle',
                                                align: 'left'
                                            }
                                        }
                                    },

                                    expandAndCollapse: true,

                                    animationDuration: 550,
                                    animationDurationUpdate: 750
                                }
                            ]
                        };
                        myChart.hideLoading();
                        myChart.setOption(option);
                    })
                }
            };
        }]);
})();